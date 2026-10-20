import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
// @ts-ignore -- plain ESM script without type declarations
import { checkSkills, parseServerTools, findToolCalls } from '../scripts/check-skills.mjs';

const root = path.resolve(__dirname, '..');

describe('Agent Skills validation', () => {
  it('every skill uses only registered tools and real parameters, and .cursor/skills mirrors skills/', () => {
    const res = checkSkills(root);
    expect(res.errors).toEqual([]);
    expect(res.toolCount).toBeGreaterThanOrEqual(30);
    expect(res.callCount).toBeGreaterThan(20);
  });

  it('parses tool schemas from src/mcp/server.ts', () => {
    const tools = parseServerTools(fs.readFileSync(path.join(root, 'src/mcp/server.ts'), 'utf8'));
    const handoff = tools.get('fastr_handoff');
    expect(handoff.get('action')).toEqual({ required: true, enumValues: ['save', 'latest'] });
    expect(handoff.get('verifyStaging').required).toBe(false);
    expect([...tools.get('fastr_trap_log').keys()]).toEqual(['title', 'content', 'files', 'module']);
  });

  it('flags unknown tools, unknown params, missing required params, and bad enum values', () => {
    const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-check-skills-'));
    try {
      fs.mkdirSync(path.join(sandbox, 'src', 'mcp'), { recursive: true });
      fs.copyFileSync(path.join(root, 'src/mcp/server.ts'), path.join(sandbox, 'src/mcp/server.ts'));
      fs.copyFileSync(path.join(root, 'package.json'), path.join(sandbox, 'package.json'));
      const skill = [
        '---',
        'name: bad-skill',
        'description: Use when testing the checker.',
        'triggers: x',
        '---',
        '```js',
        'fastr_trap_log({ file: "a.ts", error: "boom" })',
        'fastr_handoff({ action: "finish", taskTitle: "t" })',
        'fastr_get({ id: "mem_1" })',
        '```',
      ].join('\n');
      fs.mkdirSync(path.join(sandbox, 'skills', 'bad-skill'), { recursive: true });
      fs.writeFileSync(path.join(sandbox, 'skills', 'bad-skill', 'SKILL.md'), skill);

      const { errors } = checkSkills(sandbox);
      const text = errors.join('\n');
      expect(text).toContain('non-standard frontmatter key "triggers"');
      expect(text).toContain('fastr_trap_log has no parameter "file"');
      expect(text).toContain('fastr_trap_log is missing required parameter "title"');
      expect(text).toContain('fastr_handoff.action = "finish" is not one of save|latest');
      expect(text).toContain('unknown tool "fastr_get"');
      expect(text).toContain('.cursor/skills/bad-skill/SKILL.md: missing');
    } finally {
      fs.rmSync(sandbox, { recursive: true, force: true });
    }
  });

  it('finds both call styles in markdown', () => {
    const md = 'fastr_status({})\n```json\n{ "tool": "fastr_heal", "arguments": { "dryRun": true } }\n```';
    const calls = findToolCalls(md).map((c: { tool: string }) => c.tool);
    expect(calls).toEqual(['fastr_status', 'fastr_heal']);
  });
});

describe('installSkills upgrade cleanup', () => {
  it('removes retired fastr skills but keeps current and user-owned skills', async () => {
    const { installSkills, RETIRED_SKILLS } = await import('../src/installer/setup.js');
    const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-skill-upgrade-'));
    try {
      const claudeSkills = path.join(sandbox, 'home', '.claude', 'skills');
      for (const name of [...RETIRED_SKILLS, 'my-own-skill']) {
        fs.mkdirSync(path.join(claudeSkills, name), { recursive: true });
        fs.writeFileSync(path.join(claudeSkills, name, 'SKILL.md'), '---\nname: x\ndescription: y\n---\n');
      }
      installSkills({ homeDir: path.join(sandbox, 'home'), projectRoot: path.join(sandbox, 'project') });
      const remaining = fs.readdirSync(claudeSkills).sort();
      for (const name of RETIRED_SKILLS) expect(remaining).not.toContain(name);
      expect(remaining).toContain('my-own-skill');
      expect(remaining).toContain('fastr-memory');
    } finally {
      fs.rmSync(sandbox, { recursive: true, force: true });
    }
  });
});

describe('check-skills schema parser', () => {
  it('reads params from both raw shapes and z.object({...}) schemas', () => {
    const src = `
      server.registerTool('fastr_a', { description: 'a', inputSchema: { query: z.string(), limit: z.number().optional() } }, async () => ({}));
      server.registerTool('fastr_b', {
        description: 'b, with a comma',
        inputSchema: z.object({
          id: ID.describe('x'),
          status: z.enum(['open', 'done']).default('open'),
        }),
        annotations: { readOnlyHint: true },
      }, async () => ({}));
    `;
    const tools = parseServerTools(src);
    expect([...tools.get('fastr_a')!.keys()]).toEqual(['query', 'limit']);
    expect(tools.get('fastr_a')!.get('limit')!.required).toBe(false);
    const b = tools.get('fastr_b')!;
    expect([...b.keys()]).toEqual(['id', 'status']);
    expect(b.get('id')!.required).toBe(true);
    expect(b.get('status')!.enumValues).toEqual(['open', 'done']);
  });
});
