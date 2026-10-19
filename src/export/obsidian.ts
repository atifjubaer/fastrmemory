import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

function sanitizeFilename(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, '_').trim().slice(0, 80);
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

  const memoryFilenameMap = new Map<string, string>();

  // Write entity notes
  for (const ent of entities) {
    const entFilename = `${sanitizeFilename(ent.name)}.md`;
    const entPath = path.join(targetDir, 'entities', entFilename);
    const content = (
      `---\n` +
      `id: ${ent.id}\n` +
      `type: ${ent.entity_type}\n` +
      `name: "${ent.name.replace(/"/g, '\\"')}"\n` +
      `---\n\n` +
      `# Entity: ${ent.name}\n\n` +
      `- **Classification**: \`${ent.entity_type}\`\n` +
      `- **Project**: \`${projectId}\`\n`
    );
    fs.writeFileSync(entPath, content, 'utf-8');
  }

  // Map titles
  for (const m of memories) {
    const filename = `${sanitizeFilename(m.title)}.md`;
    memoryFilenameMap.set(m.id, filename);
  }

  // Write memory markdown notes
  for (const m of memories) {
    const folder = m.kind === 'error_trap' ? 'error_traps' : `${m.kind}s`;
    const filename = memoryFilenameMap.get(m.id)!;
    const filePath = path.join(targetDir, folder, filename);

    const linkedFiles = memoryFilesMap.get(m.id) || [];
    let body = m.content;

    // Link recognized entities as [[Entity Name]]
    for (const ent of entities) {
      if (ent.name.length >= 3 && body.includes(ent.name)) {
        const regex = new RegExp(`(?<!\\[\\[)\\b${escapeRegex(ent.name)}\\b(?!\\]\\])`, 'g');
        body = body.replace(regex, `[[${ent.name}]]`);
      }
    }

    let linksSection = '';
    if (linkedFiles.length > 0) {
      linksSection += `\n\n### Linked Code Files\n` + linkedFiles.map((f: string) => `- \`${f}\``).join('\n');
    }

    const doc = (
      `---\n` +
      `id: ${m.id}\n` +
      `kind: ${m.kind}\n` +
      `title: "${m.title.replace(/"/g, '\\"')}"\n` +
      `module: ${m.module}\n` +
      `status: ${m.status}\n` +
      `reward_score: ${m.reward_score}\n` +
      `created_at: ${m.created_at}\n` +
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
      moc += `- [[${m.title}]] — \`${m.module}\` (score: ${m.reward_score})\n`;
    }
    if (memsInKind.length > 30) {
      moc += `- *...and ${memsInKind.length - 30} more in \`${folder}/\`*\n`;
    }
    moc += `\n`;
  }

  moc += `## Key Entities & Architecture Symbols\n\n`;
  for (const ent of entities.slice(0, 50)) {
    moc += `- [[${ent.name}]] (\`${ent.entity_type}\`)\n`;
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
