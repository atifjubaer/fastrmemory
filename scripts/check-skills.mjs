// Validates the Agent Skills in skills/ against the MCP tools registered in src/mcp/server.ts.
//
// - Every `fastr_*` name mentioned in a SKILL.md must be a registered tool.
// - Every call example (`fastr_x({ ... })` or `{ "tool": "fastr_x", "arguments": { ... } }`) may only
//   use real parameter names, must include required parameters, and string literals for enum
//   parameters must be valid enum values.
// - Frontmatter must have `name` (lowercase-hyphen, equal to the folder) and `description`.
// - skills/skills.json must list exactly the skill folders, with the package version.
// - .cursor/skills must be a byte-for-byte copy of skills/.
//
// Plain Node ESM, no dependencies. Exit code 1 on any error.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DEFAULT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Index just past the matching close bracket for the opener at `start`; skips strings and comments. */
function matchBracket(src, start) {
  const open = src[start];
  const close = open === '{' ? '}' : open === '(' ? ')' : ']';
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      i = skipString(src, i);
      continue;
    }
    if (ch === '/' && src[i + 1] === '/') {
      const nl = src.indexOf('\n', i);
      i = nl === -1 ? src.length : nl;
      continue;
    }
    if (ch === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      i = end === -1 ? src.length : end + 1;
      continue;
    }
    if (ch === '{' || ch === '(' || ch === '[') depth++;
    else if (ch === '}' || ch === ')' || ch === ']') {
      depth--;
      if (depth === 0) {
        if (ch !== close) throw new Error(`Mismatched bracket at offset ${i}`);
        return i + 1;
      }
    }
  }
  throw new Error(`Unclosed bracket starting at offset ${start}`);
}

/** Returns the index of the closing quote of the string starting at `start`. */
function skipString(src, start) {
  const q = src[start];
  for (let i = start + 1; i < src.length; i++) {
    if (src[i] === '\\') { i++; continue; }
    if (src[i] === q) return i;
    if (q !== '`' && src[i] === '\n') return i; // unterminated single-line string
  }
  return src.length;
}

/** Splits the body of an object literal `{ ... }` into top-level `key: value` entries. */
function topLevelEntries(objText) {
  const body = objText.slice(1, -1);
  const entries = [];
  let depth = 0;
  let segStart = 0;
  const segments = [];
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === '"' || ch === "'" || ch === '`') { i = skipString(body, i); continue; }
    if (ch === '/' && body[i + 1] === '/') { const nl = body.indexOf('\n', i); i = nl === -1 ? body.length : nl; continue; }
    if (ch === '{' || ch === '(' || ch === '[') depth++;
    else if (ch === '}' || ch === ')' || ch === ']') depth--;
    else if (ch === ',' && depth === 0) { segments.push(body.slice(segStart, i)); segStart = i + 1; }
  }
  segments.push(body.slice(segStart));
  for (const seg of segments) {
    const m = seg.match(/^\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:([\s\S]*)$/);
    if (m) entries.push({ key: m[1] ?? m[2] ?? m[3], value: m[4].trim() });
    else if (seg.trim()) entries.push({ key: null, value: seg.trim() });
  }
  return entries;
}

/** Returns the `{ ... }` shape of an inputSchema written as a raw shape or as `z.object({ ... })`. */
function schemaShapeText(value) {
  if (value.startsWith('{')) return value.slice(0, matchBracket(value, 0));
  const m = value.match(/^z\.(?:strictObject|object|looseObject)\(\s*\{/);
  if (!m) return null;
  const start = m[0].length - 1;
  return value.slice(start, matchBracket(value, start));
}

/** Parses `server.registerTool('name', { ..., inputSchema: { ... } | z.object({ ... }) }, handler)` blocks. */
export function parseServerTools(serverSrc) {
  const tools = new Map();
  const re = /registerTool\(\s*(['"])(\w+)\1\s*,\s*\{/g;
  let m;
  while ((m = re.exec(serverSrc))) {
    const name = m[2];
    const cfgStart = m.index + m[0].length - 1;
    const cfgEnd = matchBracket(serverSrc, cfgStart);
    const cfg = serverSrc.slice(cfgStart, cfgEnd);
    const params = new Map();
    const schemaEntry = topLevelEntries(cfg).find((e) => e.key === 'inputSchema');
    const shape = schemaEntry ? schemaShapeText(schemaEntry.value) : null;
    if (schemaEntry && !shape) {
      throw new Error(`Cannot parse inputSchema of ${name} (expected { ... } or z.object({ ... }))`);
    }
    if (shape) {
      for (const { key, value } of topLevelEntries(shape)) {
        if (!key) continue;
        const required = !/\.optional\(\)|\.default\(/.test(value);
        const enumMatch = value.match(/z\.enum\(\s*\[([^\]]*)\]/);
        const enumValues = enumMatch ? [...enumMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]) : null;
        params.set(key, { required, enumValues });
      }
    }
    tools.set(name, params);
    re.lastIndex = cfgEnd;
  }
  return tools;
}

/** Parses YAML-ish frontmatter (flat `key: value` lines). */
export function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

/** Finds tool call examples in a SKILL.md: `fastr_x({...})`, `fastr_x {...}`, and `{"tool": "fastr_x", "arguments": {...}}`. */
export function findToolCalls(md) {
  const calls = [];
  const direct = /\b(fastr_\w+)\s*(?:\(\s*)?(?=\{)/g;
  let m;
  while ((m = direct.exec(md))) {
    const start = m.index + m[0].length;
    try {
      const end = matchBracket(md, start);
      calls.push({ tool: m[1], obj: md.slice(start, end), offset: m.index });
    } catch {
      calls.push({ tool: m[1], obj: null, offset: m.index });
    }
  }
  const wrapped = /"tool"\s*:\s*"(fastr_\w+)"\s*,\s*"arguments"\s*:\s*(?=\{)/g;
  while ((m = wrapped.exec(md))) {
    const start = m.index + m[0].length;
    try {
      const end = matchBracket(md, start);
      calls.push({ tool: m[1], obj: md.slice(start, end), offset: m.index });
    } catch {
      calls.push({ tool: m[1], obj: null, offset: m.index });
    }
  }
  return calls;
}

function lineOf(text, offset) {
  return text.slice(0, offset).split('\n').length;
}

function listFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p, base));
    else if (e.isFile()) out.push(path.relative(base, p).split(path.sep).join('/'));
  }
  return out.sort();
}

export function checkSkills(root = DEFAULT_ROOT) {
  const errors = [];
  const serverPath = path.join(root, 'src', 'mcp', 'server.ts');
  const tools = parseServerTools(fs.readFileSync(serverPath, 'utf8'));
  if (tools.size === 0) errors.push('src/mcp/server.ts: no registerTool(...) calls found (parser out of date?)');

  const skillsDir = path.join(root, 'skills');
  const skillNames = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory()).map((e) => e.name).sort();
  let callCount = 0;

  for (const skill of skillNames) {
    const rel = `skills/${skill}/SKILL.md`;
    const file = path.join(skillsDir, skill, 'SKILL.md');
    if (!fs.existsSync(file)) { errors.push(`${rel}: missing`); continue; }
    const md = fs.readFileSync(file, 'utf8');

    const fm = parseFrontmatter(md);
    if (!fm) errors.push(`${rel}: missing frontmatter`);
    else {
      if (!fm.name) errors.push(`${rel}: frontmatter missing "name"`);
      else if (fm.name !== skill) errors.push(`${rel}: frontmatter name "${fm.name}" does not match folder "${skill}"`);
      if (fm.name && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name)) errors.push(`${rel}: name must be lowercase-hyphen`);
      if (!fm.description) errors.push(`${rel}: frontmatter missing "description"`);
      for (const key of Object.keys(fm)) {
        if (!['name', 'description', 'license', 'allowed-tools', 'metadata'].includes(key)) {
          errors.push(`${rel}: non-standard frontmatter key "${key}"`);
        }
      }
    }

    for (const mm of md.matchAll(/\bfastr_\w+/g)) {
      if (!tools.has(mm[0])) errors.push(`${rel}:${lineOf(md, mm.index)}: unknown tool "${mm[0]}"`);
    }

    for (const call of findToolCalls(md)) {
      const where = `${rel}:${lineOf(md, call.offset)}`;
      const params = tools.get(call.tool);
      if (!params) continue; // already reported as unknown tool
      callCount++;
      if (call.obj === null) { errors.push(`${where}: could not parse arguments for ${call.tool}`); continue; }
      const entries = topLevelEntries(call.obj);
      const keys = new Set();
      for (const { key, value } of entries) {
        if (!key) { errors.push(`${where}: ${call.tool} has an unparseable argument "${value}"`); continue; }
        keys.add(key);
        const spec = params.get(key);
        if (!spec) {
          errors.push(`${where}: ${call.tool} has no parameter "${key}" (valid: ${[...params.keys()].join(', ') || 'none'})`);
          continue;
        }
        const lit = value.match(/^(['"])(.*)\1$/);
        if (spec.enumValues && lit && !spec.enumValues.includes(lit[2])) {
          errors.push(`${where}: ${call.tool}.${key} = "${lit[2]}" is not one of ${spec.enumValues.join('|')}`);
        }
      }
      for (const [key, spec] of params) {
        if (spec.required && !keys.has(key)) errors.push(`${where}: ${call.tool} is missing required parameter "${key}"`);
      }
    }
  }

  // skills.json manifest
  const manifestPath = path.join(skillsDir, 'skills.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    if (manifest.version !== pkg.version) errors.push(`skills/skills.json: version ${manifest.version} != package.json ${pkg.version}`);
    const listed = (manifest.skills || []).map((s) => s.name).sort();
    if (JSON.stringify(listed) !== JSON.stringify(skillNames)) {
      errors.push(`skills/skills.json: lists [${listed.join(', ')}] but folders are [${skillNames.join(', ')}]`);
    }
    for (const s of manifest.skills || []) {
      if (s.path && !fs.existsSync(path.join(root, s.path))) errors.push(`skills/skills.json: path ${s.path} does not exist`);
    }
  }

  // .cursor/skills mirror
  const cursorDir = path.join(root, '.cursor', 'skills');
  const a = listFiles(skillsDir);
  const b = listFiles(cursorDir);
  for (const f of a) {
    if (!b.includes(f)) errors.push(`.cursor/skills/${f}: missing (must mirror skills/)`);
    else if (!fs.readFileSync(path.join(skillsDir, f)).equals(fs.readFileSync(path.join(cursorDir, f)))) {
      errors.push(`.cursor/skills/${f}: differs from skills/${f}`);
    }
  }
  for (const f of b) if (!a.includes(f)) errors.push(`.cursor/skills/${f}: not present in skills/`);

  return { errors, toolCount: tools.size, skillCount: skillNames.length, callCount };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const res = checkSkills(process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_ROOT);
  if (res.errors.length > 0) {
    for (const e of res.errors) console.error(`ERROR ${e}`);
    console.error(`\ncheck-skills: ${res.errors.length} error(s)`);
    process.exit(1);
  }
  console.log(`check-skills: OK (${res.skillCount} skills, ${res.callCount} tool calls checked against ${res.toolCount} tools)`);
}
