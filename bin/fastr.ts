#!/usr/bin/env node
import { Command } from 'commander';
import { PACKAGE_VERSION } from '../src/version.js';
import { runStdioServer } from '../src/mcp/stdio.js';
import { createFastrServerContext } from '../src/mcp/server.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';
import { syncAllModulePages } from '../src/mirror/markdown-pages.js';
import { scrubSecrets } from '../src/privacy/scrubber.js';
import { runInteractiveSetup } from '../src/installer/setup.js';
import { formatBenchmarkMarkdown } from '../src/bench/benchmark.js';
import { startUiServer } from '../src/ui/server.js';
import { installAgentHooks } from '../src/installer/hooks.js';
import { learnFromGitHistory } from '../src/learn/git-learner.js';
import { exportToObsidianVault } from '../src/export/obsidian.js';
import { runLifecycleHook, toClaudeHookStdout } from '../src/hooks/runner.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { startDaemon, stopDaemon, getDaemonStatus, getDaemonPidFile } from '../src/daemon/service.js';
import { cognitiveBlame } from '../src/git/blame.js';
import { executeMemoryCommit } from '../src/git/commit.js';
import { compressFile } from '../src/compress/markdown.js';
import { diagnoseDatabase, healDatabase } from '../src/db/doctor.js';
import { tagVisionAsset, searchVisionAssets } from '../src/vision/assets.js';
import { runTrapGuardian } from '../src/ci/guardian.js';
import { diffSnapshots, formatDiffMarkdown, replayAt } from '../src/replay/snapshot.js';
import { exportSnapshotJsonl, importSnapshotFile, snapshotFromJsonl } from '../src/replay/jsonl.js';
import { importMarkdownFile } from '../src/import/local.js';
import type { LocalImportKind } from '../src/import/local.js';
import { consolidateMemories } from '../src/db/consolidate.js';
import { runMemoryCi } from '../src/ci/memory-ci.js';

const BANNER = `
\x1b[38;2;56;189;248m   ______           __        __  ___                                \x1b[0m
\x1b[38;2;56;189;248m  / ____/___ ______/ /______ /  |/  /___  ____ ___  ____  _______  __\x1b[0m
\x1b[38;2;56;189;248m / /_  / __ \`/ ___/ __/ ___// /|_/ / __ \\/ __ \`__ \\/ __ \\/ ___/ / / /\x1b[0m
\x1b[38;2;56;189;248m/ __/ / /_/ (__  ) /_/ /   / /  / /  __/ / / / / / /_/ / /  / /_/ / \x1b[0m
\x1b[38;2;56;189;248m/_/    \\__,_/____/\\__/_/   /_/  /_/\\___/_/ /_/ /_/\\____/_/   \\__, /  \x1b[0m
\x1b[38;2;56;189;248m                                                            /____/   \x1b[0m
\x1b[2m  ⚡ Sovereign Cognitive Agent Memory • Zero Daemon • Native Node 24 WAL\x1b[0m
`;

const program = new Command();

program
  .name('fastrmemory')
  .alias('fastr')
  .description('FastrMemory: High-Performance Cognitive Agent Memory Engine')
  .version(PACKAGE_VERSION)
  .addHelpText('before', BANNER)
  .action((_opts, cmd) => {
    // A mistyped subcommand (e.g. `fastrmemory mpc`) must not fall through to setup, which edits global agent configs.
    if (cmd.args.length > 0) {
      program.error(`error: unknown command '${cmd.args[0]}'. Run \`fastrmemory --help\` for the command list.`);
    }
    console.log(BANNER);
    runInteractiveSetup();
  });

program
  .command('setup')
  .description('Run interactive auto-setup wizard for Claude Code, Cursor, and Windsurf')
  .action(() => {
    runInteractiveSetup();
  });

// 1. MCP stdio command (Primary integration for Claude Code, Cursor, Antigravity)
program
  .command('mcp')
  .description('Run FastrMemory as an MCP stdio server')
  .option('--profile <profile>', 'Tool surface: full (default) or core (12 tools)')
  .action(async (options: { profile?: string }) => {
    try {
      await runStdioServer(undefined, options.profile);
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

trapCmd
  .command('resolve <id>')
  .description('Mark an error trap as dormant / resolved so it no longer blocks pre-merge CI')
  .option('-r, --reason <reason>', 'Resolution reason or commit link', 'Bug permanently resolved and verified')
  .action((id: string, opts: any) => {
    const ctx = createFastrServerContext();
    const trap = ctx.db.prepare('SELECT id, title FROM memories WHERE id = ?').get(id) as any;
    if (!trap) {
      console.error(`Error: Trap [${id}] not found.`);
      process.exit(1);
    }
    ctx.db.prepare("UPDATE memories SET status = 'dormant', superseded_reason = ? WHERE id = ?").run(opts.reason, id);
    syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
    console.log(`✅ Trap [${id}] "${trap.title}" marked as dormant (${opts.reason}).`);
  });

// 6. Conflict inspection and resolution
const conflictCmd = program.command('conflict').description('Inspect and resolve contradictory memories');

conflictCmd
  .command('list')
  .description('List detected memory conflicts')
  .option('-s, --status <status>', 'open | resolved | ignored', 'open')
  .option('--json', 'Print raw JSON', false)
  .action((opts: any) => {
    const status = String(opts.status || 'open').toLowerCase();
    if (!['open', 'resolved', 'ignored'].includes(status)) {
      console.error('Error: --status must be one of: open, resolved, ignored.');
      process.exit(1);
    }

    const ctx = createFastrServerContext();
    const conflicts = ctx.repo.listConflicts(ctx.config.projectId, status as 'open' | 'resolved' | 'ignored');
    if (opts.json) {
      console.log(JSON.stringify(conflicts, null, 2));
      return;
    }
    if (conflicts.length === 0) {
      console.log(`No ${status} memory conflicts for ${ctx.config.projectName}.`);
      return;
    }

    console.log(`\n=== FastrMemory Conflicts (${conflicts.length} ${status}) ===`);
    for (const conflict of conflicts) {
      const a = ctx.repo.getMemory(conflict.memory_a_id);
      const b = ctx.repo.getMemory(conflict.memory_b_id);
      console.log(`- Conflict #${conflict.id} [${conflict.status}] score ${Number(conflict.score).toFixed(2)}`);
      console.log(`  A: [${conflict.memory_a_id}] "${a?.title ?? 'missing memory'}"`);
      console.log(`  B: [${conflict.memory_b_id}] "${b?.title ?? 'missing memory'}"`);
      console.log(`  Reason: ${conflict.reason}`);
      if (conflict.status === 'open') {
        console.log(`  Resolve: fastr conflict resolve ${conflict.id} --keep <memory-id> [--forget]`);
      }
    }
    console.log('');
  });

conflictCmd
  .command('resolve <id>')
  .description('Resolve a memory conflict by keeping one side')
  .requiredOption('-k, --keep <memoryId>', 'Memory ID to keep')
  .option('--forget', 'Supersede the losing memory instead of only weakening its score', false)
  .option('-r, --reason <reason>', 'Resolution rationale')
  .action((id: string, opts: any) => {
    const conflictId = Number.parseInt(id, 10);
    if (!Number.isInteger(conflictId) || conflictId < 1) {
      console.error('Error: conflict id must be a positive integer.');
      process.exit(1);
    }

    const ctx = createFastrServerContext();
    try {
      const res = ctx.repo.resolveConflict(conflictId, opts.keep, Boolean(opts.forget), opts.reason);
      syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
      console.log(`✅ Conflict #${conflictId} resolved. Kept [${res.keptId}]; loser [${res.loserId}] ${opts.forget ? 'superseded' : 'weakened'}.`);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// 7. Sync command
program
  .command('sync')
  .description('Re-render all Two-Zone Markdown pages in .fastr/pages/')
  .action(() => {
    const ctx = createFastrServerContext();
    const files = syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
    console.log(`Synced ${files.length} module markdown pages in .fastr/pages/`);
  });

// 7. Local memory import (JSONL snapshot or Markdown rules)
program
  .command('import <file>')
  .description('Import local memory sources (JSONL snapshot or Markdown rules)')
  .option('--from <format>', 'jsonl | markdown | agents-md | cursor-rules | claude-md', 'jsonl')
  .option('-m, --module <module>', 'Module for Markdown imports', 'imported')
  .option('-k, --kind <kind>', 'rule | decision | error_trap | workflow', 'rule')
  .option('--verified', 'Mark imported Markdown memories verified', false)
  .option('--dry-run', 'Report counts without writing', false)
  .action((file: string, opts: any) => {
    const ctx = createFastrServerContext();
    const target = path.resolve(file);
    const format = String(opts.from || 'jsonl').toLowerCase();

    if (format === 'jsonl') {
      const result = importSnapshotFile(ctx.db, target, { dryRun: opts.dryRun });
      console.log(`${result.dryRun ? 'Verified' : 'Imported'} ${target}`);
      console.log(`Memories: ${result.memories} | Events: ${result.events} | File links: ${result.fileLinks} | Conflicts: ${result.conflicts} | Skipped: ${result.skipped}`);
      console.log(`Content hash: ${result.contentHash}`);
      return;
    }

    const markdownFormats = new Set(['markdown', 'agents-md', 'cursor-rules', 'claude-md']);
    if (!markdownFormats.has(format)) {
      console.error('Error: --from must be one of: jsonl, markdown, agents-md, cursor-rules, claude-md.');
      process.exit(1);
    }
    const kinds: LocalImportKind[] = ['rule', 'decision', 'error_trap', 'workflow'];
    if (!kinds.includes(opts.kind)) {
      console.error('Error: --kind must be one of: rule, decision, error_trap, workflow.');
      process.exit(1);
    }

    try {
      const result = importMarkdownFile(ctx.repo, ctx.db, target, {
        projectId: ctx.config.projectId,
        module: opts.module,
        kind: opts.kind,
        verified: Boolean(opts.verified),
        dryRun: Boolean(opts.dryRun)
      });
      if (!result.dryRun && result.imported > 0) {
        syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
      }
      console.log(`${result.dryRun ? 'Would import' : 'Imported'} ${result.imported} of ${result.total} sections from ${target}`);
      console.log(`Skipped duplicates: ${result.skipped}${result.dryRun ? ' (dry run)' : ''}`);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// 8. Benchmark command
program
  .command('bench')
  .description('Run automated retrieval accuracy & latency benchmarks')
  .option('--markdown', 'Output results as a Markdown table')
  .option('--json', 'Output results as raw JSON')
  .option('--save <file>', 'Save benchmark report to a file')
  .action(async (options) => {
    // Runs on an isolated in-memory database: never writes benchmark fixtures into the user's DB.
    const { runIsolatedBenchmarks } = await import('../src/bench/benchmark.js');
    console.log('⚡ Running FastrMemory retrieval benchmarks on synthetic cases against simulated baselines (not the real projects)...\n');
    const report = await runIsolatedBenchmarks('bench_proj');
    const md = formatBenchmarkMarkdown(report);
    if (options.json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log(md);
    }
    if (options.save) {
      fs.writeFileSync(path.resolve(options.save), md, 'utf-8');
      console.log(`\n📄 Saved benchmark report to ${options.save}`);
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

snapshotCmd
  .command('export <file>')
  .description('Export a portable, content-hashed JSONL snapshot (safe to commit; no SQLite files)')
  .option('--at <iso>', 'Stable export timestamp used for the snapshot header')
  .option('-f, --force', 'Overwrite an existing file', false)
  .action((file: string, opts: any) => {
    const ctx = createFastrServerContext();
    const target = path.resolve(file);
    if (fs.existsSync(target) && !opts.force) {
      console.error(`Error: ${target} already exists. Pass --force to overwrite.`);
      process.exit(1);
    }
    const result = exportSnapshotJsonl(ctx.db, ctx.config.projectId, opts.at);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, result.jsonl, 'utf8');
    console.log(`Exported ${result.records} hashed records to ${target}`);
    console.log(`Memories: ${result.memories} | Events: ${result.events} | File links: ${result.fileLinks} | Conflicts: ${result.conflicts}`);
    console.log(`Content hash: ${result.contentHash}`);
  });

snapshotCmd
  .command('import <file>')
  .description('Import a hash-verified JSONL snapshot (idempotent; existing rows are kept)')
  .option('--dry-run', 'Verify the file and report counts without writing', false)
  .action((file: string, opts: any) => {
    const ctx = createFastrServerContext();
    const result = importSnapshotFile(ctx.db, path.resolve(file), { dryRun: opts.dryRun });
    console.log(`${result.dryRun ? 'Verified' : 'Imported'} ${path.resolve(file)}`);
    console.log(`Memories: ${result.memories} | Events: ${result.events} | File links: ${result.fileLinks} | Conflicts: ${result.conflicts} | Skipped: ${result.skipped}`);
    console.log(`Content hash: ${result.contentHash}`);
  });

// 9b. Replay and memory diff commands (bi-temporal state reconstruction)
function loadReplayState(ctx: ReturnType<typeof createFastrServerContext>, ref: string) {
  const resolved = ref === 'now' ? new Date().toISOString() : ref;
  if (resolved !== 'now' && fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
    return snapshotFromJsonl(fs.readFileSync(resolved, 'utf8'));
  }
  return replayAt(ctx.db, ctx.config.projectId, resolved);
}

program
  .command('replay')
  .description('Reconstruct the exact active memory set at an ISO timestamp')
  .option('--at <iso>', 'ISO timestamp (default: now)')
  .option('--json', 'Print the full snapshot as JSON', false)
  .option('-o, --out <file>', 'Write the full snapshot JSON to a file')
  .action((opts: any) => {
    const ctx = createFastrServerContext();
    const snapshot = replayAt(ctx.db, ctx.config.projectId, opts.at || new Date().toISOString());
    const json = JSON.stringify(snapshot, null, 2);
    if (opts.out) {
      fs.writeFileSync(path.resolve(opts.out), json, 'utf8');
    }
    if (opts.json || opts.out) {
      console.log(json);
      return;
    }

    console.log(`\n=== Replay at ${snapshot.at} ===`);
    console.log(`Hash: ${snapshot.contentHash}`);
    for (const memory of snapshot.memories) {
      console.log(`- [${memory.id}] ${memory.title} (${memory.module}, ${memory.kind}, ${memory.status})`);
    }
    console.log(`\n${snapshot.memories.length} active | ${snapshot.history.length} history | ${snapshot.events.length} raw events | ~${snapshot.tokenCount} tokens\n`);
  });

program
  .command('diff')
  .description('Diff two replay timestamps or two portable JSONL snapshots')
  .requiredOption('--from <ref>', 'ISO timestamp, "now", or a JSONL snapshot file')
  .requiredOption('--to <ref>', 'ISO timestamp, "now", or a JSONL snapshot file')
  .option('--json', 'Print the diff as JSON', false)
  .option('-o, --out <file>', 'Write the Markdown diff to a file')
  .action((opts: any) => {
    const ctx = createFastrServerContext();
    const from = loadReplayState(ctx, opts.from);
    const to = loadReplayState(ctx, opts.to);
    const diff = diffSnapshots(from, to);
    const markdown = formatDiffMarkdown(diff);
    if (opts.out) fs.writeFileSync(path.resolve(opts.out), markdown, 'utf8');
    console.log(opts.json ? JSON.stringify(diff, null, 2) : markdown);
  });

// 9c. Non-lossy consolidation command (Phase 3)
program
  .command('consolidate')
  .description('Write a linked summary memory without deleting or mutating any originals')
  .option('-m, --module <module>', 'Only consolidate active memories in this module')
  .option('-t, --title <title>', 'Summary memory title')
  .option('--dry-run', 'Preview the summary and counts without writing', false)
  .option('--json', 'Print the result as JSON', false)
  .action((opts: any) => {
    const ctx = createFastrServerContext();
    const result = consolidateMemories(ctx.db, ctx.repo, {
      projectId: ctx.config.projectId,
      module: opts.module,
      title: opts.title,
      dryRun: opts.dryRun
    });

    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    console.log(`${result.dryRun ? 'Previewed' : 'Consolidated'} ${result.sourceMemoryIds.length} source memories.`);
    console.log(`Summary: ${result.summaryId ?? '(dry run)'} ${result.summaryTitle}`);
    console.log(`Active memories: ${result.activeMemoryCountBefore} -> ${result.activeMemoryCountAfter}`);
    console.log(`Raw events: ${result.rawEventCountBefore} -> ${result.rawEventCountAfter}`);
    console.log(`Source events linked: ${result.sourceEventIds.length}`);
    if (result.dryRun) console.log('\n--- Summary preview ---\n' + result.summaryContent);
  });

// 9d. Memory CI command (Phase 4)
program
  .command('memory-ci')
  .description('Compare base and head portable snapshots and emit a PR-ready memory diff')
  .requiredOption('--base <file>', 'Base JSONL snapshot')
  .requiredOption('--head <file>', 'Head JSONL snapshot')
  .option('--comment <file>', 'Write the Markdown comment body to a file')
  .option('--fail-on-new-traps', 'Exit 1 when the head adds an active error trap', false)
  .option('--json', 'Print the result as JSON', false)
  .action((opts: any) => {
    const result = runMemoryCi({
      baseJsonl: fs.readFileSync(path.resolve(opts.base), 'utf8'),
      headJsonl: fs.readFileSync(path.resolve(opts.head), 'utf8'),
      failOnNewTraps: opts.failOnNewTraps
    });
    if (opts.comment) fs.writeFileSync(path.resolve(opts.comment), result.markdown, 'utf8');
    console.log(opts.json ? JSON.stringify(result, null, 2) : result.markdown);
    process.exitCode = result.exitCode;
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
  .option('-p, --payload <json>', 'JSON payload with tool or session context (defaults to the hook JSON on stdin)')
  .option('--verbose', 'Print status messages (for manual runs; Claude Code hooks stay quiet)')
  .action((event, opts) => {
    let payload: Record<string, any> = {};
    try {
      // Claude Code pipes the hook input as JSON on stdin; --payload is for manual runs.
      const raw = opts.payload ?? (process.stdin.isTTY ? '' : fs.readFileSync(0, 'utf-8'));
      if (raw && raw.trim()) payload = JSON.parse(raw);
    } catch {}
    // Hooks run from the session's cwd; prefer the project dir Claude Code reports.
    const projectDir = process.env.CLAUDE_PROJECT_DIR || (typeof payload.cwd === 'string' ? payload.cwd : undefined);
    const ctx = createFastrServerContext(projectDir);
    const res = runLifecycleHook(ctx, event, payload);
    const stdout = toClaudeHookStdout(event, res);
    if (stdout) {
      console.log(stdout);
    } else if (opts.verbose || opts.payload !== undefined) {
      console.log(res.output ?? res.message);
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

// 14. Hybrid Background Daemon commands
const daemonCmd = program.command('daemon').description('Manage hybrid background REST API & SSE daemon service');

daemonCmd
  .command('start')
  .description('Start FastrMemory daemon in the background')
  .option('-p, --port <number>', 'Port to listen on', '4242')
  .action(async (opts) => {
    const port = parseInt(opts.port, 10) || 4242;
    console.log(`Starting FastrMemory hybrid background daemon on port ${port}...`);
    try {
      const res = await startDaemon({ port });
      if (res.newlyStarted) {
        console.log(`⚡ FastrMemory daemon started in background (PID ${res.pid}).`);
        console.log(`   Web Observatory & REST API: ${res.url}`);
      } else {
        console.log(`FastrMemory daemon is already running (PID ${res.pid}) at ${res.url}.`);
      }
    } catch (err: any) {
      console.error(`Failed to start daemon: ${err.message}`);
      process.exit(1);
    }
  });

daemonCmd
  .command('stop')
  .description('Stop running FastrMemory background daemon')
  .action(async () => {
    const res = await stopDaemon();
    console.log(res.message);
  });

daemonCmd
  .command('status')
  .description('Check FastrMemory background daemon status and health')
  .action(async () => {
    const status = await getDaemonStatus();
    if (!status.running) {
      console.log('FastrMemory daemon is NOT running.');
      console.log('To start: fastrmemory daemon start');
    } else {
      console.log(`\n=== FastrMemory Daemon Status ===`);
      console.log(`- Status:   ONLINE`);
      console.log(`- PID:      ${status.pid}`);
      console.log(`- Port:     ${status.port}`);
      console.log(`- URL:      ${status.url}`);
      console.log(`- Started:  ${status.startedAt}`);
      console.log(`- Uptime:   ${status.uptimeSeconds}s`);
      if (status.health) {
        console.log(`- Health:   Project ${status.health.projectName || status.health.projectId || 'OK'}`);
      }
      console.log('');
    }
  });

daemonCmd
  .command('run')
  .description('Internal worker process for running the daemon server loop')
  .option('-p, --port <number>', 'Port to listen on', '4242')
  .action(async (opts) => {
    const ctx = createFastrServerContext();
    const port = parseInt(opts.port, 10) || 4242;

    try {
      const logPath = path.join(ctx.config.projectRoot, '.fastr', 'daemon.log');
      const logFile = fs.createWriteStream(logPath, { flags: 'a' });
      process.stdout.write = logFile.write.bind(logFile) as any;
      process.stderr.write = logFile.write.bind(logFile) as any;
    } catch {}

    const { url } = await startUiServer(ctx.config, { port, openBrowser: false });

    // Write daemon.json with this worker's actual PID
    const pidFile = getDaemonPidFile(ctx.config.projectRoot);
    const info = {
      pid: process.pid,
      port,
      url,
      startedAt: new Date().toISOString()
    };
    fs.writeFileSync(pidFile, JSON.stringify(info, null, 2), 'utf-8');

    // Keep process alive indefinitely
    setInterval(() => {}, 60000);
  });

// 15. Cognitive Blame command (Memory-Aware Git Blame)
program
  .command('blame <target>')
  .description('Cognitive git blame linking code lines to memory rationale and error traps')
  .option('-L, --line <number>', 'Line number to inspect')
  .action((target: string, opts: any) => {
    const line = opts.line ? parseInt(opts.line, 10) : undefined;
    try {
      const res = cognitiveBlame(target, line);
      console.log(`\n=== FastrMemory Cognitive Blame ===`);
      console.log(`File:    ${res.filePath}:${res.lineNumber}`);
      console.log(`Line:    ${res.lineContent.trim()}`);
      console.log(`Commit:  ${res.commitHash.slice(0, 10)} ("${res.summary}")`);
      console.log(`Author:  ${res.author} (${res.authorTime})`);
      console.log(`Rationale: ${res.cognitiveRationale}`);
      if (res.governingTraps.length > 0) {
        console.log(`\n⚠️ Active Error Traps Protecting This Line:`);
        for (const t of res.governingTraps) {
          console.log(`  - [${t.id}] "${t.title}" (${t.module}) [2.0x RECALL BOOST]`);
        }
      }
      if (res.associatedMemories.length > 0) {
        console.log(`\n🧠 Associated Memory Rules:`);
        for (const m of res.associatedMemories) {
          console.log(`  - [${m.id}] (${m.kind}) "${m.title}"`);
        }
      }
      console.log('');
    } catch (err: any) {
      console.error(`Blame error: ${err.message}`);
      process.exit(1);
    }
  });

// 16. Memory-Aware Conventional Commit command
program
  .command('commit')
  .description('Execute memory-aware git commit with 2.0x error trap verification')
  .option('-m, --message <msg>', 'Commit message (auto-synthesized if omitted)')
  .option('-f, --force', 'Force commit even if active traps are detected', false)
  .action((opts: any) => {
    try {
      const res = executeMemoryCommit({ message: opts.message, force: opts.force });
      console.log(`\n=== FastrMemory Conventional Commit ===`);
      console.log(`Commit:  ${res.commitHash.slice(0, 10)}`);
      console.log(`Summary: ${res.summary}`);
      console.log(`Files:   ${res.stagedFiles.length} file(s) committed`);
      if (res.trapWarnings.length > 0) {
        console.log(`\n⚠️ Active Error Traps Checked (${res.trapWarnings.length}):`);
        for (const w of res.trapWarnings) {
          console.log(`  - [TRAP ${w.trapId}] "${w.trapTitle}" on ${w.matchedFile}`);
        }
      } else {
        console.log(`Traps:   Passed (0 active trap violations)`);
      }
      console.log(`Provenance ledger updated with cryptographic signature.\n`);
    } catch (err: any) {
      console.error(`Commit error: ${err.message}`);
      process.exit(1);
    }
  });

// 17. Compress command
program
  .command('compress <filePath>')
  .description('Compress markdown or text file while preserving headings, URLs, and code blocks')
  .option('-d, --dry-run', 'Preview compression without modifying disk files', false)
  .action((filePath: string, opts: any) => {
    try {
      const res = compressFile(filePath, { dryRun: opts.dryRun });
      if (!res.success) {
        console.error(`❌ Compression failed: ${res.error}`);
        process.exit(1);
      }
      console.log(`\n=== FastrMemory Token Compression ===`);
      console.log(`File:       ${filePath}`);
      console.log(`Original:   ${res.originalChars} characters`);
      console.log(`Compressed: ${res.compressedChars} characters`);
      console.log(`Savings:    ${(res.savingsRatio * 100).toFixed(1)}%`);
      if (res.backupPath) {
        console.log(`Backup:     ${res.backupPath}`);
      }
      if (opts.dryRun) {
        console.log(`Mode:       Dry run (file unchanged)\n`);
      } else {
        console.log(`Status:     File compressed successfully.\n`);
      }
    } catch (err: any) {
      console.error(`Compress error: ${err.message}`);
      process.exit(1);
    }
  });

// 18. Diagnose command
program
  .command('diagnose')
  .description('Run deep health check across SQLite, FTS5 indices, file links, and task DAGs')
  .action(() => {
    try {
      const ctx = createFastrServerContext();
      const report = diagnoseDatabase(ctx.db, ctx.config.projectId);
      console.log(`\n=== FastrMemory Health Diagnostic ===`);
      console.log(`Status:    ${report.healthy ? '✅ HEALTHY' : '⚠️ ISSUES DETECTED'}`);
      console.log(`Issues:    ${report.totalIssues} (${report.fixableIssues} fixable)`);
      console.log(`Memories:  ${report.metrics.memoryCount}`);
      console.log(`FTS5 Rows: ${report.metrics.ftsRowCount}`);
      console.log(`Links:     ${report.metrics.fileLinkCount}`);
      console.log(`Actions:   ${report.metrics.actionCount}`);
      console.log(`Mode:      ${report.metrics.walMode}`);
      if (report.issues.length > 0) {
        console.log(`\nIssues List:`);
        for (const i of report.issues) {
          console.log(`  - [${i.category.toUpperCase()}] ${i.description}`);
        }
        console.log(`\nRun 'fastrmemory heal' to auto-repair fixable issues.\n`);
      } else {
        console.log(`\nAll database tables and indices are 100% consistent.\n`);
      }
    } catch (err: any) {
      console.error(`Diagnose error: ${err.message}`);
      process.exit(1);
    }
  });

// 19. Heal command
program
  .command('heal')
  .description('Auto-repair database indices, orphaned file links, and WAL fragmentation')
  .option('-d, --dry-run', 'Preview repairs without modifying database', false)
  .action((opts: any) => {
    try {
      const ctx = createFastrServerContext();
      const res = healDatabase(ctx.db, ctx.config.projectId, { dryRun: opts.dryRun });
      console.log(`\n=== FastrMemory Self-Healing Doctor ===`);
      console.log(`Mode:      ${res.dryRun ? '🔍 DRY RUN' : '⚡ LIVE REPAIR'}`);
      console.log(`Fixed:     ${res.fixedCount} issue(s)`);
      console.log(`Remaining: ${res.remainingIssues} issue(s)`);
      if (res.actionsTaken.length > 0) {
        console.log(`\nActions:`);
        for (const a of res.actionsTaken) {
          console.log(`  - ${a}`);
        }
      }
      console.log('');
    } catch (err: any) {
      console.error(`Heal error: ${err.message}`);
      process.exit(1);
    }
  });

// 20. Vision commands
const visionCmd = program
  .command('vision')
  .description('Multimodal visual memory engine for screenshots and diagrams');

visionCmd
  .command('tag <filePath>')
  .description('Tag and index a screenshot image or diagram')
  .requiredOption('-d, --desc <description>', 'Visual description of image')
  .option('--ocr <text>', 'OCR or visible error text in image')
  .option('-m, --memory <id>', 'Linked memory rule or trap ID')
  .option('-t, --task <id>', 'Linked action task ID')
  .action(async (filePath: string, opts: any) => {
    try {
      const ctx = createFastrServerContext();
      const asset = await tagVisionAsset(ctx.db, {
        projectId: ctx.config.projectId,
        filePath,
        description: opts.desc,
        ocrText: opts.ocr,
        memoryId: opts.memory,
        taskId: opts.task
      });
      console.log(`\n=== FastrMemory Vision Asset Tagged ===`);
      console.log(`ID:          ${asset.id}`);
      console.log(`File:        ${asset.file_path}`);
      console.log(`Description: ${asset.description}`);
      if (asset.ocr_text) console.log(`OCR Text:    ${asset.ocr_text}`);
      if (asset.memory_id) console.log(`Memory ID:   ${asset.memory_id}`);
      console.log(`Vector:      Indexed (384-dim embedding)\n`);
    } catch (err: any) {
      console.error(`Vision tag error: ${err.message}`);
      process.exit(1);
    }
  });

visionCmd
  .command('search <query>')
  .description('Semantic search across screenshots and diagrams')
  .option('-l, --limit <n>', 'Max results to return', '10')
  .option('-m, --memory <id>', 'Filter by memory ID')
  .action(async (query: string, opts: any) => {
    try {
      const ctx = createFastrServerContext();
      const results = await searchVisionAssets(ctx.db, ctx.config.projectId, query, {
        limit: parseInt(opts.limit, 10),
        memoryId: opts.memory
      });
      console.log(`\n=== FastrMemory Vision Search (${results.length} results) ===`);
      for (const r of results) {
        console.log(`[${r.id}] Score: ${r.score} | ${r.description}`);
        console.log(`  Path: ${r.filePath}`);
        if (r.ocrText) console.log(`  OCR:  ${r.ocrText}`);
        if (r.memoryId) console.log(`  Memory: ${r.memoryId}`);
      }
      console.log('');
    } catch (err: any) {
      console.error(`Vision search error: ${err.message}`);
      process.exit(1);
    }
  });

// 21. Trap Guardian command (CI/CD and local pre-merge gate)
program
  .command('guard')
  .description('Run Pre-Merge Trap Guardian to detect error traps protecting modified files')
  .option('-b, --base <branch>', 'Base branch to diff against', 'origin/main')
  .option('-s, --strict', 'Fail CI with exit code 1 if active traps are detected on modified files', false)
  .option('-o, --output <file>', 'Write markdown report to file (e.g. for GITHUB_STEP_SUMMARY)')
  .option('-f, --files <fileList>', 'Comma-separated list of files to check (overrides git diff)')
  .action((opts: any) => {
    try {
      const customFiles = opts.files ? opts.files.split(',').map((f: string) => f.trim()).filter(Boolean) : undefined;
      const res = runTrapGuardian({
        baseBranch: opts.base,
        strict: opts.strict,
        customFiles
      });

      console.log(res.markdownReport);

      if (opts.output) {
        fs.writeFileSync(opts.output, res.markdownReport, 'utf-8');
      }

      if (!res.success) {
        process.exit(1);
      }
    } catch (err: any) {
      console.error(`Guardian error: ${err.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
