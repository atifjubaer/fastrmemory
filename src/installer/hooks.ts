import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

export interface HookInstallResult {
  claudeCodeUpdated: boolean;
  cursorUpdated: boolean;
  agentsMdUpdated: boolean;
  details: string[];
}

export function installAgentHooks(projectRoot: string = process.cwd()): HookInstallResult {
  const details: string[] = [];
  let claudeCodeUpdated = false;
  let cursorUpdated = false;
  let agentsMdUpdated = false;

  const homeDir = os.homedir();

  // 1. Claude Code Settings (~/.claude/settings.json or ~/.claude.json)
  const claudeSettingsPath = path.join(homeDir, '.claude', 'settings.json');
  const claudeJsonPath = path.join(homeDir, '.claude.json');

  const targetClaudeFile = fs.existsSync(claudeSettingsPath) ? claudeSettingsPath : claudeJsonPath;
  try {
    let claudeConfig: any = {};
    if (fs.existsSync(targetClaudeFile)) {
      const content = fs.readFileSync(targetClaudeFile, 'utf-8');
      try { claudeConfig = JSON.parse(content); } catch { claudeConfig = {}; }
    }

    if (!claudeConfig.mcpServers) {
      claudeConfig.mcpServers = {};
    }

    claudeConfig.mcpServers.fastrmemory = {
      command: 'fastrmemory',
      args: ['mcp']
    };

    if (!claudeConfig.hooks) {
      claudeConfig.hooks = {};
    }
    claudeConfig.hooks.SessionStart = 'fastrmemory hook run SessionStart';
    claudeConfig.hooks.PreCompact = 'fastrmemory hook run PreCompact';
    claudeConfig.hooks.SessionEnd = 'fastrmemory hook run SessionEnd';

    const dir = path.dirname(targetClaudeFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(targetClaudeFile, JSON.stringify(claudeConfig, null, 2), 'utf-8');
    claudeCodeUpdated = true;
    details.push(`Wired FastrMemory MCP server and lifecycle hooks into ${targetClaudeFile}`);
  } catch (err: any) {
    details.push(`Failed to update Claude Code: ${err.message}`);
  }

  // 2. Cursor MCP Configuration (.cursor/mcp.json)
  const cursorDir = path.join(projectRoot, '.cursor');
  const cursorMcpFile = path.join(cursorDir, 'mcp.json');
  try {
    if (!fs.existsSync(cursorDir)) fs.mkdirSync(cursorDir, { recursive: true });
    let cursorConfig: any = { mcpServers: {} };
    if (fs.existsSync(cursorMcpFile)) {
      try { cursorConfig = JSON.parse(fs.readFileSync(cursorMcpFile, 'utf-8')); } catch {}
    }
    if (!cursorConfig.mcpServers) cursorConfig.mcpServers = {};
    cursorConfig.mcpServers.fastrmemory = {
      command: 'fastrmemory',
      args: ['mcp']
    };
    fs.writeFileSync(cursorMcpFile, JSON.stringify(cursorConfig, null, 2), 'utf-8');
    cursorUpdated = true;
    details.push(`Wired FastrMemory MCP server into .cursor/mcp.json`);
  } catch (err: any) {
    details.push(`Failed to update Cursor MCP: ${err.message}`);
  }

  // 3. Autonomous Memory Discipline in AGENTS.md / CLAUDE.md
  const agentsMdPath = path.join(projectRoot, 'AGENTS.md');
  const disciplineBlock = `\n<!-- fastrmemory:start -->
## ⚡ FastrMemory Autonomous Agent Discipline

Every AI coding agent operating in this repository MUST follow these 3 cognitive rules:
1. **Pre-Edit Error Check**: Before editing or creating files, call \`fastr_trap_recall\` with your target file paths to check for active \`[TRAP]\` warnings.
2. **Immediate Trap Logging**: The moment you diagnose a test failure, syntax bug, or library incompatibility, call \`fastr_trap_log\` to save the lesson with a 2.0x recall boost.
3. **Session Verification**: When milestones are completed, call \`fastr_handoff\` with \`verifyStaging: true\` to graduate staging memories into verified rules.
<!-- fastrmemory:end -->\n`;

  try {
    let currentContent = '';
    if (fs.existsSync(agentsMdPath)) {
      currentContent = fs.readFileSync(agentsMdPath, 'utf-8');
    }

    if (!currentContent.includes('<!-- fastrmemory:start -->')) {
      fs.writeFileSync(agentsMdPath, currentContent + disciplineBlock, 'utf-8');
      agentsMdUpdated = true;
      details.push(`Appended Autonomous Memory Discipline block to AGENTS.md`);
    } else {
      details.push(`AGENTS.md already contains FastrMemory autonomous discipline block`);
    }
  } catch (err: any) {
    details.push(`Failed to update AGENTS.md: ${err.message}`);
  }

  return {
    claudeCodeUpdated,
    cursorUpdated,
    agentsMdUpdated,
    details
  };
}
