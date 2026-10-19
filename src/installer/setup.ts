import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { execSync } from 'node:child_process';
import { createFastrServerContext } from '../mcp/server.js';

export interface SetupOptions {
  autoInstall?: boolean;
}

export function resolveMcpCommand(): { command: string; args: string[] } {
  try {
    const isWindows = process.platform === 'win32';
    const checkCmd = isWindows ? 'where fastrmemory' : 'which fastrmemory';
    execSync(checkCmd, { stdio: 'ignore' });
    return { command: 'fastrmemory', args: ['mcp'] };
  } catch {
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
    console.log(`[1/3] Local project initialized:`);
    console.log(`      - Project ID: ${ctx.config.projectId}`);
    console.log(`      - Database:   ${ctx.config.dbPath}`);
    console.log(`      - Pages:      ${ctx.config.pagesDir}\n`);
  } catch (err: any) {
    console.log(`[1/3] Project init note: ${err.message}\n`);
  }

  // 2. Wire Claude Code (~/.claude.json)
  const homeDir = os.homedir();
  const claudeConfigPath = path.join(homeDir, '.claude.json');
  let claudeStatus = 'Skipped (file not found)';

  const mcpTarget = resolveMcpCommand();

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
      args: mcpTarget.args
    };

    fs.writeFileSync(claudeConfigPath, JSON.stringify(claudeConfig, null, 2), 'utf-8');
    claudeStatus = `Connected (${claudeConfigPath})`;
  } catch (err: any) {
    claudeStatus = `Failed (${err.message})`;
  }
  console.log(`[2/3] Claude Code: ${claudeStatus}`);

  // 3. Wire Cursor in current workspace (.cursor/mcp.json)
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
      args: mcpTarget.args
    };

    fs.writeFileSync(cursorConfigPath, JSON.stringify(cursorConfig, null, 2), 'utf-8');
    cursorStatus = `Connected (${cursorConfigPath})`;
  } catch (err: any) {
    cursorStatus = `Failed (${err.message})`;
  }
  console.log(`[3/5] Cursor IDE:  ${cursorStatus}`);

  // 4. Wire Windsurf IDE (~/.codeium/windsurf/mcp_config.json)
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
  console.log(`[4/5] Windsurf:    ${windsurfStatus}`);

  // 5. Wire Autonomous Agent Discipline in AGENTS.md & Auto-Seed Git Traps
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
  console.log(`[5/5] Agent Rules: ${agentStatus}\n`);

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
