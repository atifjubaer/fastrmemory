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

program.parse(process.argv);
