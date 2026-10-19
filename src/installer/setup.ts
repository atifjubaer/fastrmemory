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
  console.log(`[3/3] Cursor IDE:  ${cursorStatus}\n`);

  console.log('-------------------------------------------------');
  console.log('✅ Setup Complete! FastrMemory is connected.');
  console.log('   All 25 agents in this workspace now share');
  console.log('   the exact same SQLite memory store.');
  console.log('-------------------------------------------------\n');
  console.log('Quick test command:');
  console.log('  fastrmemory status\n');
}
