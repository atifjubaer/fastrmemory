#!/usr/bin/env node
import { Command } from 'commander';
import { runStdioServer } from '../src/mcp/stdio.js';
import { createFastrServerContext } from '../src/mcp/server.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';
import { syncAllModulePages } from '../src/mirror/markdown-pages.js';
import { scrubSecrets } from '../src/privacy/scrubber.js';
import { runInteractiveSetup } from '../src/installer/setup.js';
import { runBenchmarks, formatBenchmarkMarkdown } from '../src/bench/benchmark.js';
import { startUiServer } from '../src/ui/server.js';
import { installAgentHooks } from '../src/installer/hooks.js';
import { learnFromGitHistory } from '../src/learn/git-learner.js';
import { exportToObsidianVault } from '../src/export/obsidian.js';
import { runLifecycleHook } from '../src/hooks/runner.js';

const program = new Command();

program
  .name('fastrmemory')
  .alias('fastr')
  .description('FastrMemory: High-Performance Cognitive Agent Memory Engine')
  .version('0.1.0')
  .action(() => {
    // Default action when invoked with no arguments (e.g. npx fastrmemory)
    runInteractiveSetup();
  });

program
  .command('setup')
  .description('Run interactive auto-setup wizard for Claude Code and Cursor')
  .action(() => {
    runInteractiveSetup();
  });

// 1. MCP stdio command (Primary integration for Claude Code, Cursor, Antigravity)
program
  .command('mcp')
  .description('Run FastrMemory as an MCP stdio server')
  .action(async () => {
    try {
      await runStdioServer();
    } catch (err: any) {
      console.error('FastrMemory MCP Server error:', err.message);
      process.exit(1);
    }
  });

// 2. Init command
program
  .command('init')
  .description('Initialize FastrMemory in current directory')
  .action(() => {
    const ctx = createFastrServerContext();
    console.log(`FastrMemory initialized successfully.`);
    console.log(`Project ID: ${ctx.config.projectId}`);
    console.log(`Database:   ${ctx.config.dbPath}`);
    console.log(`Pages dir:  ${ctx.config.pagesDir}`);
  });

// 3. Status command
program
  .command('status')
  .description('Display active memory statistics and database health')
  .action(() => {
    const ctx = createFastrServerContext();
    const status = ctx.repo.getStatus(ctx.config.projectId);
    console.log(`\n=== FastrMemory Health (${ctx.config.projectName}) ===`);
    console.log(`- Project ID:          ${status.projectId}`);
    console.log(`- Active Memories:     ${status.activeCount}`);
    console.log(`- Staging Memories:    ${status.stagingCount}`);
    console.log(`- Superseded History:  ${status.supersededCount}`);
    console.log(`- Dormant Memories:    ${status.dormantCount}`);
    console.log(`- Ingested Events:     ${status.rawEventCount}`);
    console.log(`- Pending Spool:       ${status.pendingSpoolCount === 0 ? 'Clear (0)' : 'Pending Drain'}`);
    console.log(`- Embedding Coverage:  ${status.embeddingCoveragePercent}%`);
    console.log(`- Database File:       ${ctx.config.dbPath}\n`);
  });

// 4. Recall command
program
  .command('recall <query>')
  .description('Search memories using Triple-Stream RRF')
  .option('-f, --files <files...>', 'Related file paths')
  .option('-m, --module <module>', 'Module filter')
  .option('-b, --budget <tokens>', 'Token ceiling', '2000')
  .action(async (query: string, opts: any) => {
    const ctx = createFastrServerContext();
    const res = await searchMemories(ctx.db, {
      projectId: ctx.config.projectId,
      query,
      files: opts.files || [],
      module: opts.module,
      budgetTokens: parseInt(opts.budget, 10)
    });

    if (res.memories.length === 0) {
      console.log('No memories found matching query.');
    } else {
      console.log(`\n=== Recalled Memories (${res.memories.length} results, ~${res.totalTokens} tokens) ===\n`);
      console.log(res.text);
    }
  });

// 5. Remember command
program
  .command('remember <title>')
  .description('Record a new memory rule or trap')
  .requiredOption('-c, --content <content>', 'Detailed memory content')
  .option('-m, --module <module>', 'Module name', 'general')
  .option('-k, --kind <kind>', 'rule | decision | error_trap | workflow', 'rule')
  .option('-f, --files <files...>', 'Related file paths')
  .option('--verified', 'Mark as verified immediately', false)
  .action((title: string, opts: any) => {
    const ctx = createFastrServerContext();
    const scrubbedTitle = scrubSecrets(title);
    const scrubbedContent = scrubSecrets(opts.content);

    const mem = ctx.repo.insertMemory({
      projectId: ctx.config.projectId,
      module: opts.module,
      kind: opts.kind,
      title: scrubbedTitle,
      content: scrubbedContent,
      files: opts.files || [],
      verified: opts.verified
    });

    syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
    console.log(`Recorded [${mem.id}] (${mem.kind}) in module "${mem.module}" [${mem.status}].`);
  });

// 5b. Trap commands (Active Error Trap Management)
const trapCmd = program.command('trap').description('Manage active [TRAP] error warnings and 2.0x recall boost quarantine');

trapCmd
  .command('list')
  .description('List all active error traps and their recall boost multipliers')
  .action(() => {
    const ctx = createFastrServerContext();
    const traps = ctx.repo.listTraps(ctx.config.projectId);
    console.log(`\n=== FastrMemory Active Error Traps (${traps.length}) ===`);
    if (traps.length === 0) {
      console.log('No active error traps found for this project.');
    } else {
      for (const t of traps) {
        console.log(`- [${t.id}] [${t.status.toUpperCase()}] "${t.title}" (${t.module}) • Recall Boost: 2.0x`);
      }
    }
    console.log('');
  });

trapCmd
  .command('log <title>')
  .description('Log a critical error trap with 2.0x recall boost')
  .requiredOption('-c, --content <content>', 'Error cause, symptom, and preventive solution')
  .option('-m, --module <module>', 'Affected module or domain', 'general')
  .option('-f, --files <files...>', 'Related file paths')
  .action((title: string, opts: any) => {
    const ctx = createFastrServerContext();
    const mem = ctx.repo.insertMemory({
      projectId: ctx.config.projectId,
      module: opts.module,
      kind: 'error_trap',
      title: scrubSecrets(title),
      content: scrubSecrets(opts.content),
      files: opts.files || [],
      verified: false,
    });
    syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
    console.log(`⚠️ Logged error trap [${mem.id}] in module "${mem.module}" with 2.0x recall boost.`);
  });

// 6. Sync command
program
  .command('sync')
  .description('Re-render all Two-Zone Markdown pages in .fastr/pages/')
  .action(() => {
    const ctx = createFastrServerContext();
    const files = syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
    console.log(`Synced ${files.length} module markdown pages in .fastr/pages/`);
  });

// 7. Benchmark command
program
  .command('bench')
  .description('Run automated retrieval accuracy & latency benchmarks')
  .option('--markdown', 'Output results as a Markdown table')
  .option('--json', 'Output results as raw JSON')
  .action(async (options) => {
    const ctx = createFastrServerContext();
    console.log('⚡ Running FastrMemory Cognitive Retrieval Benchmarks...\n');
    const report = await runBenchmarks(ctx.db, ctx.config.projectId);
    if (options.json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log(formatBenchmarkMarkdown(report));
    }
  });

// 8. Web UI Dashboard command
program
  .command('ui')
  .description('Launch the local FastrMemory Web Dashboard in your browser')
  .option('-p, --port <number>', 'Port to listen on', '4242')
  .option('--no-open', 'Do not open browser automatically')
  .action(async (options) => {
    const ctx = createFastrServerContext();
    const port = parseInt(options.port, 10) || 4242;
    console.log(`Starting FastrMemory Web Dashboard on port ${port}...`);
    const { url } = await startUiServer(ctx.config, { port, openBrowser: options.open });
    console.log(`⚡ FastrMemory Hub live at: ${url}`);
    console.log(`Press Ctrl+C to stop.`);
  });

// 9. Snapshot command (Git-for-Memory)
const snapshotCmd = program.command('snapshot').description('Git-like point-in-time memory state snapshots and rollback');

snapshotCmd
  .command('create <tag>')
  .description('Create a new named point-in-time memory snapshot')
  .option('-d, --desc <description>', 'Optional description or commit reference')
  .action((tag, opts) => {
    const ctx = createFastrServerContext();
    const snap = ctx.repo.createSnapshot(ctx.config.projectId, tag, opts.desc);
    console.log(`Created memory snapshot [${snap.id}] tagged "${snap.tag}" (${snap.memoryCount} active memories archived).`);
  });

snapshotCmd
  .command('list')
  .description('List all point-in-time memory snapshots')
  .action(() => {
    const ctx = createFastrServerContext();
    const snapshots = ctx.repo.listSnapshots(ctx.config.projectId);
    if (snapshots.length === 0) {
      console.log('No memory snapshots found for this project.');
      return;
    }
    console.log(`\n=== FastrMemory Snapshots (${ctx.config.projectName}) ===`);
    for (const s of snapshots) {
      console.log(`- [${s.id}] "${s.tag}" (${s.memoryCount} memories) • ${s.createdAt}${s.description ? ` - ${s.description}` : ''}`);
    }
    console.log('');
  });

snapshotCmd
  .command('rollback <snapshotId>')
  .description('Revert memory state back to a previous snapshot point in time')
  .action((snapshotId) => {
    const ctx = createFastrServerContext();
    const res = ctx.repo.rollbackToSnapshot(ctx.config.projectId, snapshotId);
    syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
    console.log(`Rolled back to snapshot "${res.snapshotTag}". Restored ${res.restoredCount} memories.`);
  });

// 10. Hook command (Autonomous Agent Lifecycle)
const hookCmd = program.command('hook').description('Autonomous agent lifecycle hook management');

hookCmd
  .command('install')
  .description('Auto-detect and install FastrMemory hooks into Claude Code, Cursor, and AGENTS.md')
  .action(() => {
    const ctx = createFastrServerContext();
    const res = installAgentHooks(ctx.config.projectRoot);
    console.log(`\n=== FastrMemory Autonomous Hook Installation ===`);
    for (const d of res.details) {
      console.log(`- ${d}`);
    }
    console.log(`\nAgent autonomous discipline active.\n`);
  });

hookCmd
  .command('run <event>')
  .description('Direct sub-3ms execution of agent lifecycle hooks (SessionStart, PreToolUse, PreCompact, SessionEnd)')
  .option('-p, --payload <json>', 'JSON payload with tool or session context', '{}')
  .action((event, opts) => {
    const ctx = createFastrServerContext();
    let payload = {};
    try {
      payload = JSON.parse(opts.payload);
    } catch {}
    const res = runLifecycleHook(ctx, event, payload);
    if (res.output) {
      console.log(res.output);
    } else {
      console.log(res.message);
    }
  });

// 11. Learn command (Git-History Auto-Learner)
program
  .command('learn')
  .description('Extract error traps and lessons from git commit history')
  .option('-n, --limit <number>', 'Number of recent commits to inspect', '30')
  .option('--days <number>', 'Inspect commits from the last N days')
  .action((opts) => {
    const ctx = createFastrServerContext();
    const limit = parseInt(opts.limit, 10) || 30;
    const days = opts.days ? parseInt(opts.days, 10) : undefined;
    console.log(`Scanning git history for bug fix patterns...`);
    const res = learnFromGitHistory(ctx.repo, ctx.config.projectId, { limit, days, cwd: ctx.config.projectRoot });
    console.log(`Inspected ${res.commitsInspected} commits. Extracted ${res.trapsExtracted} error traps into staging quarantine.`);
    for (const l of res.lessons) {
      console.log(`- [${l.commitHash}] (${l.module}): ${l.title}`);
    }
  });

// 12. Export command (Obsidian Vault & Markdown)
program
  .command('export')
  .description('Export memories into external formats (Obsidian vault with wikilinks and YAML frontmatter)')
  .requiredOption('--obsidian <dir>', 'Directory path to write Obsidian markdown vault')
  .action((opts) => {
    const ctx = createFastrServerContext();
    console.log(`Exporting memories to Obsidian vault at: ${opts.obsidian}...`);
    const res = exportToObsidianVault(ctx.db, ctx.config.projectId, opts.obsidian);
    console.log(`Exported ${res.exportedCount} memories and ${res.entitiesCount} entities to ${res.targetDir}.`);
    console.log(`Vault ready with YAML frontmatter, [[wikilinks]], and MOC.md index.`);
  });

// 13. Global federation command (Cross-repo organization memory)
const globalCmd = program.command('global').description('Manage organization-wide shared rules and error traps');

globalCmd
  .command('list')
  .description('List all global organization memories')
  .action(() => {
    const ctx = createFastrServerContext();
    const list = ctx.repo.listGlobalMemories();
    console.log(`\n=== FastrMemory Global Shared Rules (${list.length}) ===`);
    if (list.length === 0) {
      console.log('No global organization rules currently recorded.');
    } else {
      for (const m of list) {
        console.log(`- [${m.id}] (${m.kind.toUpperCase()}) "${m.title}" [${m.module}] (score: ${m.reward_score})`);
      }
    }
    console.log('');
  });

globalCmd
  .command('remember <title>')
  .description('Record an organization-wide global rule or error trap')
  .requiredOption('-c, --content <content>', 'Detailed memory content')
  .option('-m, --module <module>', 'Module name', 'general')
  .option('-k, --kind <kind>', 'rule | decision | error_trap | workflow', 'rule')
  .action((title, opts) => {
    const ctx = createFastrServerContext();
    const mem = ctx.repo.insertMemory({
      projectId: ctx.config.projectId,
      scope: 'global',
      module: opts.module,
      kind: opts.kind,
      title: scrubSecrets(title),
      content: scrubSecrets(opts.content),
      verified: true,
    });
    console.log(`Recorded global organization memory [${mem.id}] "${mem.title}". Applies across all projects.`);
  });

program.parse(process.argv);
