import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { assertInsideDir, isWindowsReservedName } from '../mirror/markdown-pages.js';

/**
 * Turns a title into a safe note file stem (no extension). Keeps spaces and case so
 * Obsidian wikilinks stay readable, but strips path separators, characters that are
 * illegal on Windows or meaningful in wikilinks, and Windows device names.
 */
export function sanitizeNoteName(name: string): string {
  let stem = String(name ?? '')
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/[/\\?%*:|"<>#^\[\]]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80)
    .replace(/[. ]+$/g, '')
    .replace(/^\.+/, '');
  if (!stem || /^_+$/.test(stem)) stem = 'untitled';
  if (isWindowsReservedName(stem)) stem = `_${stem}`;
  return stem;
}

/** Quotes a value as a YAML double-quoted scalar (JSON strings are valid YAML). */
function yamlString(value: unknown): string {
  return JSON.stringify(value === null || value === undefined ? '' : String(value));
}

function yamlNumber(value: unknown): string {
  const n = Number(value);
  return Number.isFinite(n) ? String(n) : yamlString(value);
}

/** Display text safe to use as a wikilink alias. */
function wikilinkAlias(text: string): string {
  return String(text).replace(/[\[\]|\r\n]/g, ' ').replace(/\s+/g, ' ').trim();
}

function wikilink(stem: string, display: string): string {
  const alias = wikilinkAlias(display);
  return alias && alias !== stem ? `[[${stem}|${alias}]]` : `[[${stem}]]`;
}

/** Picks a stem not used yet (case-insensitively, since vault links and Windows/macOS are case-insensitive). */
function uniqueStem(base: string, id: string, used: Set<string>): string {
  let stem = base;
  if (used.has(stem.toLowerCase())) {
    stem = sanitizeNoteName(`${base} (${id})`);
  }
  let i = 2;
  while (used.has(stem.toLowerCase())) {
    stem = sanitizeNoteName(`${base} (${id}-${i++})`);
  }
  used.add(stem.toLowerCase());
  return stem;
}

export interface ObsidianExportResult {
  exportedCount: number;
  entitiesCount: number;
  targetDir: string;
}

export function exportToObsidianVault(
  db: DatabaseSync,
  projectId: string,
  targetDir: string
): ObsidianExportResult {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. Fetch active memories
  const memories = db.prepare(`
    SELECT id, kind, title, module, content, status, reward_score, created_at, valid_to
    FROM memories
    WHERE project_id = ?
      AND (valid_to IS NULL OR valid_to = '')
      AND status != 'superseded'
    ORDER BY kind ASC, reward_score DESC, created_at DESC
  `).all(projectId) as any[];

  // 2. Fetch entities
  const entities = db.prepare(`
    SELECT id, name, entity_type
    FROM entities
    WHERE project_id = ?
    ORDER BY name ASC
  `).all(projectId) as any[];

  // 3. Fetch file links
  const fileLinks = db.prepare(`
    SELECT memory_id, file_path, symbol_name
    FROM file_links
  `).all() as any[];

  const memoryFilesMap = new Map<string, string[]>();
  for (const fl of fileLinks) {
    const list = memoryFilesMap.get(fl.memory_id) || [];
    list.push(fl.file_path);
    memoryFilesMap.set(fl.memory_id, list);
  }

  // 4. Create subfolders by kind
  const kinds = ['rules', 'decisions', 'error_traps', 'workflows', 'entities'];
  for (const k of kinds) {
    const sub = path.join(targetDir, k);
    if (!fs.existsSync(sub)) {
      fs.mkdirSync(sub, { recursive: true });
    }
  }

  // Note stems are unique across the whole vault, since wikilinks resolve by file name
  const usedStems = new Set<string>(['moc']);
  const entityStemMap = new Map<string, string>();
  const memoryStemMap = new Map<string, string>();

  for (const ent of entities) {
    entityStemMap.set(ent.id, uniqueStem(sanitizeNoteName(ent.name), String(ent.id), usedStems));
  }
  for (const m of memories) {
    memoryStemMap.set(m.id, uniqueStem(sanitizeNoteName(m.title), String(m.id), usedStems));
  }

  // Write entity notes
  for (const ent of entities) {
    const entPath = assertInsideDir(path.join(targetDir, 'entities'), `${entityStemMap.get(ent.id)}.md`);
    const content = (
      `---\n` +
      `id: ${yamlString(ent.id)}\n` +
      `type: ${yamlString(ent.entity_type)}\n` +
      `name: ${yamlString(ent.name)}\n` +
      `---\n\n` +
      `# Entity: ${ent.name}\n\n` +
      `- **Classification**: \`${ent.entity_type}\`\n` +
      `- **Project**: \`${projectId}\`\n`
    );
    fs.writeFileSync(entPath, content, 'utf-8');
  }

  // Entity linker: one pass over all names (longest first) so links are never nested
  const linkable = entities
    .filter((ent) => typeof ent.name === 'string' && ent.name.length >= 3)
    .sort((a, b) => b.name.length - a.name.length);
  const entityByName = new Map<string, any>();
  for (const ent of linkable) {
    if (!entityByName.has(ent.name)) entityByName.set(ent.name, ent);
  }
  const entityRegex = entityByName.size > 0
    ? new RegExp(`(?<![\\w\\[])(?:${Array.from(entityByName.keys()).map(escapeRegex).join('|')})(?![\\w\\]])`, 'g')
    : null;

  const linkEntities = (text: string): string => {
    if (!entityRegex) return text;
    // Leave existing wikilinks, fenced code and inline code untouched
    return text
      .split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`|\[\[[^\]\n]*\]\])/g)
      .map((segment, idx) => {
        if (idx % 2 === 1) return segment;
        return segment.replace(entityRegex, (match) => {
          const ent = entityByName.get(match);
          return ent ? wikilink(entityStemMap.get(ent.id)!, ent.name) : match;
        });
      })
      .join('');
  };

  // Write memory markdown notes
  for (const m of memories) {
    const folder = m.kind === 'error_trap' ? 'error_traps' : `${m.kind}s`;
    const folderDir = assertInsideDir(targetDir, folder);
    if (!fs.existsSync(folderDir)) {
      fs.mkdirSync(folderDir, { recursive: true });
    }
    const filePath = assertInsideDir(folderDir, `${memoryStemMap.get(m.id)}.md`);

    const linkedFiles = memoryFilesMap.get(m.id) || [];
    const body = linkEntities(String(m.content ?? ''));

    let linksSection = '';
    if (linkedFiles.length > 0) {
      linksSection += `\n\n### Linked Code Files\n` + linkedFiles.map((f: string) => `- \`${f}\``).join('\n');
    }

    const doc = (
      `---\n` +
      `id: ${yamlString(m.id)}\n` +
      `kind: ${yamlString(m.kind)}\n` +
      `title: ${yamlString(m.title)}\n` +
      `module: ${yamlString(m.module)}\n` +
      `status: ${yamlString(m.status)}\n` +
      `reward_score: ${yamlNumber(m.reward_score)}\n` +
      `created_at: ${yamlString(m.created_at)}\n` +
      `---\n\n` +
      `# ${m.title}\n\n` +
      `> **Module**: \`${m.module}\` | **Kind**: \`${m.kind}\` | **Confidence**: \`${m.reward_score}\`\n\n` +
      `${body}` +
      `${linksSection}\n`
    );

    fs.writeFileSync(filePath, doc, 'utf-8');
  }

  // 5. Generate Index Map of Content (MOC.md)
  let moc = `# FastrMemory Knowledge Graph (MOC)\n\n`;
  moc += `*Generated for project **${projectId}** with ${memories.length} memories and ${entities.length} entities.*\n\n`;

  moc += `## Navigation by Kind\n\n`;
  for (const k of ['rule', 'decision', 'error_trap', 'workflow']) {
    const memsInKind = memories.filter((m) => m.kind === k);
    const folder = k === 'error_trap' ? 'error_traps' : `${k}s`;
    moc += `### ${k.toUpperCase()} (${memsInKind.length})\n`;
    for (const m of memsInKind.slice(0, 30)) {
      moc += `- ${wikilink(memoryStemMap.get(m.id)!, m.title)} — \`${m.module}\` (score: ${m.reward_score})\n`;
    }
    if (memsInKind.length > 30) {
      moc += `- *...and ${memsInKind.length - 30} more in \`${folder}/\`*\n`;
    }
    moc += `\n`;
  }

  moc += `## Key Entities & Architecture Symbols\n\n`;
  for (const ent of entities.slice(0, 50)) {
    moc += `- ${wikilink(entityStemMap.get(ent.id)!, ent.name)} (\`${ent.entity_type}\`)\n`;
  }
  if (entities.length > 50) {
    moc += `- *...and ${entities.length - 50} more in \`entities/\`*\n`;
  }

  fs.writeFileSync(path.join(targetDir, 'MOC.md'), moc, 'utf-8');

  return {
    exportedCount: memories.length,
    entitiesCount: entities.length,
    targetDir,
  };
}

function escapeRegex(string: string): string {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}
