import * as path from 'node:path';
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import * as os from 'node:os';

export interface FastrConfig {
  projectId: string;
  projectName: string;
  projectRoot: string;
  dbPath: string;
  globalDbPath: string;
  spoolPath: string;
  pagesDir: string;
}

export function findProjectRoot(startDir: string = process.cwd()): string {
  let cur = path.resolve(startDir);
  while (true) {
    if (
      fs.existsSync(path.join(cur, '.git')) ||
      fs.existsSync(path.join(cur, '.fastr')) ||
      fs.existsSync(path.join(cur, 'package.json'))
    ) {
      return cur;
    }
    const parent = path.dirname(cur);
    if (parent === cur) {
      return startDir;
    }
    cur = parent;
  }
}

export function resolveFastrHome(homeDir?: string): string {
  return homeDir ?? process.env.FASTR_HOME ?? os.homedir();
}

export function loadConfig(customRoot?: string, homeDir?: string): FastrConfig {
  const projectRoot = customRoot ? path.resolve(customRoot) : findProjectRoot();
  const fastrDir = path.join(projectRoot, '.fastr');
  const projectConfigFile = path.join(fastrDir, 'project.json');

  let projectId = '';
  let projectName = path.basename(projectRoot);

  if (fs.existsSync(projectConfigFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(projectConfigFile, 'utf-8'));
      if (data.projectId) projectId = data.projectId;
      if (data.projectName) projectName = data.projectName;
    } catch {}
  }

  if (!projectId) {
    // Generate deterministic projectId based on projectRoot path
    projectId = `proj_${crypto.createHash('sha256').update(projectRoot).digest('hex').slice(0, 12)}`;
    if (!fs.existsSync(fastrDir)) {
      fs.mkdirSync(fastrDir, { recursive: true });
    }
    fs.writeFileSync(
      projectConfigFile,
      JSON.stringify({ projectId, projectName }, null, 2),
      'utf-8'
    );
  }

  return {
    projectId,
    projectName,
    projectRoot,
    dbPath: path.join(fastrDir, 'fastr.db'),
    globalDbPath: path.join(resolveFastrHome(homeDir), '.fastr', 'global.db'),
    spoolPath: path.join(fastrDir, 'spool', 'pending.jsonl'),
    pagesDir: path.join(fastrDir, 'pages')
  };
}
