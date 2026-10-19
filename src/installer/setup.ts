import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { execSync } from 'node:child_process';
import { createFastrServerContext } from '../mcp/server.js';

export interface SetupOptions {
  autoInstall?: boolean;
}

export function getAntigravityConfigPath(): string {
  return path.join(os.homedir(), '.gemini', 'antigravity', 'mcp_config.json');
}

export function getClaudeDesktopConfigPath(): string {
  if (process.platform === 'win32') {
    const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
    return path.join(appData, 'Claude', 'claude_desktop_config.json');
  } else if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else {
    return path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
  }
}

export function resolveMcpCommand(): { command: string; args: string[] } {
  try {
    const isWindows = process.platform === 'win32';
    const checkCmd = isWindows ? 'where fastrmemory' : 'which fastrmemory';
    execSync(checkCmd, { stdio: 'ignore' });
    return { command: 'fastrmemory', args: ['mcp'] };
  } catch {
    // Check if running from local checkout where dist/bin/fastr.js exists
    const localBin = path.resolve(__dirname, '../../dist/bin/fastr.js');
    if (fs.existsSync(localBin)) {
      return { command: 'node', args: [localBin, 'mcp'] };
    }
    return { command: 'npx', args: ['-y', '@atifjubaer/fastrmemory', 'mcp'] };
  }
}

export function runInteractiveSetup(options: SetupOptions = {}): void {
  console.log('\n=================================================');
  console.log('⚡ FastrMemory: Interactive Agent Setup Wizard');
  console.log('   High-Performance Cognitive Agent Memory Engine');
  console.log('=================================================\n');

  // 1. Initialize local project database
  try {
    const ctx = createFastrServerContext();
    console.log(`[1/7] Local project initialized:`);
    console.log(`      - Project ID: ${ctx.config.projectId}`);
    console.log(`      - Database:   ${ctx.config.dbPath}`);
    console.log(`      - Pages:      ${ctx.config.pagesDir}\n`);
  } catch (err: any) {
    console.log(`[1/7] Project init note: ${err.message}\n`);
  }

  const mcpTarget = resolveMcpCommand();
  const homeDir = os.homedir();

  // 2. Wire Antigravity IDE (~/.gemini/antigravity/mcp_config.json)
  const antigravityConfigPath = getAntigravityConfigPath();
  let antigravityStatus = 'Skipped';
  try {
    const antigravityDir = path.dirname(antigravityConfigPath);
    if (!fs.existsSync(antigravityDir)) {
      fs.mkdirSync(antigravityDir, { recursive: true });
    }
    let agConfig: any = {};
    if (fs.existsSync(antigravityConfigPath)) {
      try {
        agConfig = JSON.parse(fs.readFileSync(antigravityConfigPath, 'utf-8'));
      } catch {
        agConfig = {};
      }
    }
    if (!agConfig.mcpServers) {
      agConfig.mcpServers = {};
    }
    agConfig.mcpServers.fastrmemory = {
      command: mcpTarget.command,
      args: mcpTarget.args,
    };
    fs.writeFileSync(antigravityConfigPath, JSON.stringify(agConfig, null, 2), 'utf-8');
    antigravityStatus = `Connected (${antigravityConfigPath})`;
  } catch (err: any) {
    antigravityStatus = `Failed (${err.message})`;
  }
  console.log(`[2/7] Antigravity IDE: ${antigravityStatus}`);

  // 3. Wire Claude Desktop
  const claudeDesktopPath = getClaudeDesktopConfigPath();
  let claudeDesktopStatus = 'Skipped';
  try {
    const claudeDesktopDir = path.dirname(claudeDesktopPath);
    if (!fs.existsSync(claudeDesktopDir)) {
      fs.mkdirSync(claudeDesktopDir, { recursive: true });
    }
    let cdConfig: any = {};
    if (fs.existsSync(claudeDesktopPath)) {
      try {
        cdConfig = JSON.parse(fs.readFileSync(claudeDesktopPath, 'utf-8'));
      } catch {
        cdConfig = {};
      }
    }
    if (!cdConfig.mcpServers) {
      cdConfig.mcpServers = {};
    }
    cdConfig.mcpServers.fastrmemory = {
      command: mcpTarget.command,
      args: mcpTarget.args,
    };
    fs.writeFileSync(claudeDesktopPath, JSON.stringify(cdConfig, null, 2), 'utf-8');
    claudeDesktopStatus = `Connected (${claudeDesktopPath})`;
  } catch (err: any) {
    claudeDesktopStatus = `Failed (${err.message})`;
  }
  console.log(`[3/7] Claude Desktop:  ${claudeDesktopStatus}`);

  // 4. Wire Cursor in current workspace (.cursor/mcp.json)
  const cursorDir = path.join(process.cwd(), '.cursor');
  const cursorConfigPath = path.join(cursorDir, 'mcp.json');
  let cursorStatus = 'Configured';
  try {
    if (!fs.existsSync(cursorDir)) {
      fs.mkdirSync(cursorDir, { recursive: true });
    }
    let cursorConfig: any = {};
    if (fs.existsSync(cursorConfigPath)) {
      try {
        cursorConfig = JSON.parse(fs.readFileSync(cursorConfigPath, 'utf-8'));
      } catch {
        cursorConfig = {};
      }
    }
    if (!cursorConfig.mcpServers) {
      cursorConfig.mcpServers = {};
    }
    cursorConfig.mcpServers.fastrmemory = {
      command: mcpTarget.command,
      args: mcpTarget.args,
    };
    fs.writeFileSync(cursorConfigPath, JSON.stringify(cursorConfig, null, 2), 'utf-8');
    cursorStatus = `Connected (${cursorConfigPath})`;
  } catch (err: any) {
    cursorStatus = `Failed (${err.message})`;
  }
  console.log(`[4/7] Cursor IDE:      ${cursorStatus}`);

  // 5. Wire Claude Code (~/.claude.json)
  const claudeConfigPath = path.join(homeDir, '.claude.json');
  let claudeStatus = 'Skipped (file not found)';
  try {
    let claudeConfig: any = {};
    if (fs.existsSync(claudeConfigPath)) {
      try {
        claudeConfig = JSON.parse(fs.readFileSync(claudeConfigPath, 'utf-8'));
      } catch {
        claudeConfig = {};
      }
    }
    if (!claudeConfig.mcpServers) {
      claudeConfig.mcpServers = {};
    }
    claudeConfig.mcpServers.fastrmemory = {
      command: mcpTarget.command,
      args: mcpTarget.args,
    };
    fs.writeFileSync(claudeConfigPath, JSON.stringify(claudeConfig, null, 2), 'utf-8');
    claudeStatus = `Connected (${claudeConfigPath})`;
  } catch (err: any) {
    claudeStatus = `Failed (${err.message})`;
  }
  console.log(`[5/7] Claude Code:     ${claudeStatus}`);

  // 6. Wire Windsurf IDE (~/.codeium/windsurf/mcp_config.json)
  const windsurfDir = path.join(homeDir, '.codeium', 'windsurf');
  const windsurfConfigPath = path.join(windsurfDir, 'mcp_config.json');
  let windsurfStatus = 'Skipped (directory not present)';
  if (fs.existsSync(windsurfDir)) {
    try {
      let windsurfConfig: any = {};
      if (fs.existsSync(windsurfConfigPath)) {
        try {
          windsurfConfig = JSON.parse(fs.readFileSync(windsurfConfigPath, 'utf-8'));
        } catch {
          windsurfConfig = {};
        }
      }
      if (!windsurfConfig.mcpServers) {
        windsurfConfig.mcpServers = {};
      }
      windsurfConfig.mcpServers.fastrmemory = {
        command: mcpTarget.command,
        args: mcpTarget.args,
      };
      fs.writeFileSync(windsurfConfigPath, JSON.stringify(windsurfConfig, null, 2), 'utf-8');
      windsurfStatus = `Connected (${windsurfConfigPath})`;
    } catch (err: any) {
      windsurfStatus = `Failed (${err.message})`;
    }
  }
  console.log(`[6/7] Windsurf:        ${windsurfStatus}`);

  // 7. Wire Autonomous Agent Discipline in AGENTS.md
  let agentStatus = 'Configured';
  try {
    const agentsPath = path.join(process.cwd(), 'AGENTS.md');
    const disciplineBlock = `
<!-- fastrmemory:start -->
## ⚡ FastrMemory Autonomous Agent Discipline

Every AI coding agent operating in this repository MUST follow these 3 cognitive rules:
1. **Pre-Edit Error Check**: Before editing or creating files, call \`fastr_trap_recall\` with your target file paths to check for active \`[TRAP]\` warnings.
2. **Immediate Trap Logging**: The moment you diagnose a test failure, syntax bug, or library incompatibility, call \`fastr_trap_log\` to save the lesson with a 2.0x recall boost.
3. **Session Verification**: When milestones are completed, call \`fastr_handoff\` with \`verifyStaging: true\` to graduate staging memories into verified rules.
<!-- fastrmemory:end -->
`;
    let currentContent = '';
    if (fs.existsSync(agentsPath)) {
      currentContent = fs.readFileSync(agentsPath, 'utf-8');
    }
    if (!currentContent.includes('<!-- fastrmemory:start -->')) {
      fs.writeFileSync(agentsPath, (currentContent ? currentContent.trimEnd() + '\n' : '') + disciplineBlock, 'utf-8');
      agentStatus = `Injected rules into AGENTS.md`;
    } else {
      agentStatus = `Discipline rules already present in AGENTS.md`;
    }
  } catch (err: any) {
    agentStatus = `Notice: ${err.message}`;
  }
  console.log(`[7/7] Agent Rules:     ${agentStatus}\n`);

  console.log('-------------------------------------------------');
  console.log('✅ Setup Complete! FastrMemory is connected.');
  console.log('   All agents in this workspace now share the');
  console.log('   exact same high-speed SQLite memory store.');
  console.log('-------------------------------------------------\n');
  console.log('Quick verification commands:');
  console.log('  fastrmemory status    # Inspect database health');
  console.log('  fastrmemory trap list # Check active 2.0x error traps');
  console.log('  fastrmemory ui        # Launch local Web Dashboard\n');
}
