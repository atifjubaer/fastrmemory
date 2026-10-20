import * as vscode from 'vscode';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { execFile } from 'node:child_process';
// Type-only: erased at compile time. node:sqlite is loaded lazily (see loadSqlite) because older
// VS Code / Cursor builds run the extension host on Node < 22.5, where the module does not exist.
import type { DatabaseSync as DatabaseSyncType } from 'node:sqlite';
import {
  ACTIVE_TRAPS_SQL,
  ActiveTrap,
  TrapRow,
  buildTrapIndex,
  normalizeTrapPath,
  parseTrapListOutput,
  resolveCliInvocation,
} from './traps.js';

type SqliteModule = { DatabaseSync: typeof DatabaseSyncType };

let sqliteLoad: Promise<SqliteModule | undefined> | undefined;
let sqliteLoadError: string | undefined;

function loadSqlite(): Promise<SqliteModule | undefined> {
  if (!sqliteLoad) {
    sqliteLoad = import('node:sqlite').then(
      (m) => m as unknown as SqliteModule,
      (err: any) => {
        sqliteLoadError = err?.message ?? String(err);
        return undefined;
      }
    );
  }
  return sqliteLoad;
}

interface TrapPickItem extends vscode.QuickPickItem {
  trap: ActiveTrap;
}

const statusTag = (t: ActiveTrap): string => (t.status === 'staging' ? ' [STAGING]' : '');

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('FastrMemory Guardian');
  context.subscriptions.push(outputChannel);

  // 1. Status Bar Pill (Right side, high priority)
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.command = 'fastrmemory.showTraps';
  context.subscriptions.push(statusBarItem);

  // 2. Traps Diagnostic Collection (Problems Tab integration)
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('fastrmemory-traps');
  context.subscriptions.push(diagnosticCollection);

  // 3. Amber Underline Decoration Type
  const trapDecorationType = vscode.window.createTextEditorDecorationType({
    overviewRulerColor: '#fbbf24',
    overviewRulerLane: vscode.OverviewRulerLane.Right,
    borderStyle: 'solid',
    borderWidth: '0 0 2px 0',
    borderColor: '#fbbf24',
    isWholeLine: true,
    light: {
      borderColor: '#d97706',
    },
  });
  context.subscriptions.push(trapDecorationType);

  // Cache of active traps
  let allTraps: ActiveTrap[] = [];
  let trapsByFile = new Map<string, ActiveTrap[]>();
  let usingCliFallback = false;
  let fallbackNoticeShown = false;

  const getWorkspaceRoot = (): string | undefined => vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  const resolveCli = (root: string | undefined) =>
    resolveCliInvocation({
      configuredPath: vscode.workspace.getConfiguration('fastrmemory').get<string>('cliPath', ''),
      workspaceRoot: root,
      envPath: process.env.PATH ?? process.env.Path,
      exists: (p) => {
        try {
          return fs.existsSync(p);
        } catch {
          return false;
        }
      },
      packageName: (p) => {
        try {
          return JSON.parse(fs.readFileSync(p, 'utf-8')).name;
        } catch {
          return undefined;
        }
      },
    });

  // Run the FastrMemory CLI without a shell. Resolves even on non-zero exit.
  const runCli = (root: string, cliArgs: string[]) =>
    new Promise<{ code: number; stdout: string; stderr: string; spawnError?: string }>((resolve) => {
      const inv = resolveCli(root);
      execFile(
        inv.command,
        [...inv.args, ...cliArgs],
        { cwd: root, windowsHide: true, maxBuffer: 10 * 1024 * 1024, env: { ...process.env, NO_COLOR: '1' } },
        (err: any, stdout, stderr) => {
          const spawnError = err && typeof err.code === 'string' ? `${err.message} (command: ${inv.command})` : undefined;
          const code = err ? (typeof err.code === 'number' ? err.code : 1) : 0;
          resolve({ code, stdout: String(stdout ?? ''), stderr: String(stderr ?? ''), spawnError });
        }
      );
    });

  const readTrapsFromDb = (sqlite: SqliteModule, dbPath: string): TrapRow[] => {
    const db = new sqlite.DatabaseSync(dbPath, { readOnly: true } as any);
    try {
      return db.prepare(ACTIVE_TRAPS_SQL).all() as unknown as TrapRow[];
    } finally {
      db.close();
    }
  };

  const showFallbackNoticeOnce = () => {
    if (fallbackNoticeShown) return;
    fallbackNoticeShown = true;
    outputChannel.appendLine(
      `[FastrMemory] node:sqlite unavailable in this extension host (Node ${process.versions.node}): ${sqliteLoadError ?? 'unknown error'}. Falling back to the fastrmemory CLI.`
    );
    vscode.window.showInformationMessage(
      `FastrMemory: direct database access needs an editor whose extension host runs Node >= 22.5 (this one runs Node ${process.versions.node}). ` +
        'Using the fastrmemory CLI instead: trap counts and the trap list work, but per-file underlines are disabled.'
    );
  };

  let refreshSeq = 0;
  const refreshTraps = async (): Promise<void> => {
    const seq = ++refreshSeq;
    const root = getWorkspaceRoot();
    const dbPath = root ? path.join(root, '.fastr', 'fastr.db') : undefined;

    let traps: ActiveTrap[] = [];
    let byFile = new Map<string, ActiveTrap[]>();

    if (root && dbPath && fs.existsSync(dbPath)) {
      const sqlite = await loadSqlite();
      if (sqlite) {
        usingCliFallback = false;
        try {
          const index = buildTrapIndex(readTrapsFromDb(sqlite, dbPath), root);
          traps = index.traps;
          byFile = index.byFile;
        } catch (err: any) {
          outputChannel.appendLine(`[FastrMemory] Failed to read database: ${err.message}`);
          return; // keep previous cache
        }
      } else {
        usingCliFallback = true;
        showFallbackNoticeOnce();
        const res = await runCli(root, ['trap', 'list']);
        if (res.spawnError || res.code !== 0) {
          outputChannel.appendLine(
            `[FastrMemory] \`fastrmemory trap list\` failed: ${res.spawnError || res.stderr.trim() || `exit ${res.code}`}`
          );
          return;
        }
        traps = parseTrapListOutput(res.stdout);
      }
    }

    if (seq !== refreshSeq) return; // a newer refresh superseded this one
    allTraps = traps;
    trapsByFile = byFile;
    updatePillAndDecorations();
  };

  const safeRefresh = () => {
    refreshTraps().catch((err: any) => outputChannel.appendLine(`[FastrMemory] Refresh failed: ${err?.message ?? err}`));
  };

  const countLabel = (traps: ActiveTrap[]): string => {
    const staging = traps.filter((t) => t.status === 'staging').length;
    return staging > 0 ? ` (${staging} staging)` : '';
  };

  // Helper: Update Status Bar Pill & Editor Amber Underlines
  const updatePillAndDecorations = () => {
    const editor = vscode.window.activeTextEditor;
    const root = getWorkspaceRoot();
    const enableUnderlines = vscode.workspace.getConfiguration('fastrmemory').get<boolean>('enableUnderlines', true);
    const fallbackNote = usingCliFallback ? '\n(CLI fallback mode: per-file trap links unavailable)' : '';

    diagnosticCollection.clear();

    const matchingTraps = editor && root ? trapsByFile.get(normalizeTrapPath(editor.document.uri.fsPath, root)) ?? [] : [];

    if (editor && matchingTraps.length > 0) {
      const topTrap = matchingTraps[0];
      statusBarItem.text = `⚡ ${matchingTraps.length} Trap${matchingTraps.length > 1 ? 's' : ''} on File`;
      statusBarItem.color = '#fbbf24';
      statusBarItem.tooltip = `⚠️ PROTECTED BY FASTR TRAP [${topTrap.id}]${statusTag(topTrap)}: "${topTrap.title}"\n${topTrap.content}\n\nClick to inspect all active traps.`;

      if (enableUnderlines) {
        const decorations: vscode.DecorationOptions[] = [];
        const diagnostics: vscode.Diagnostic[] = [];
        const firstLine = editor.document.lineAt(0);
        const range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, Math.max(1, firstLine.text.length)));

        for (const trap of matchingTraps) {
          const hoverText = [
            `### ⚠️ FastrMemory Error Trap [${trap.id}]${statusTag(trap)}`,
            `**${trap.title}** (Reward Boost: ${trap.reward_score.toFixed(1)}x)`,
            ...(trap.status === 'staging' ? ['', '_Staging trap: not yet verified (e.g. learned from git history)._'] : []),
            '',
            `> ${trap.content}`,
            '',
            `_File protected by FastrMemory Zero-Regression Discipline._`,
          ].join('\n');

          decorations.push({ range, hoverMessage: new vscode.MarkdownString(hoverText) });

          const diagnostic = new vscode.Diagnostic(
            range,
            `[TRAP]${statusTag(trap)} [${trap.id}] ${trap.title}: ${trap.content} (${trap.reward_score.toFixed(1)}x boost)`,
            trap.status === 'staging' ? vscode.DiagnosticSeverity.Information : vscode.DiagnosticSeverity.Warning
          );
          diagnostic.source = 'FastrMemory';
          diagnostic.code = trap.id;
          diagnostics.push(diagnostic);
        }

        editor.setDecorations(trapDecorationType, decorations);
        diagnosticCollection.set(editor.document.uri, diagnostics);
      } else {
        editor.setDecorations(trapDecorationType, []);
      }
    } else {
      if (allTraps.length > 0) {
        statusBarItem.text = `⚡ ${allTraps.length} Traps Active`;
        statusBarItem.color = editor ? '#38bdf8' : '#fbbf24';
        statusBarItem.tooltip = `FastrMemory Guardian: ${allTraps.length} active error traps${countLabel(allTraps)} in workspace.${editor ? ' Current file has 0 traps.' : ''}${fallbackNote}`;
      } else {
        statusBarItem.text = `⚡ Fastr: Clean`;
        statusBarItem.color = '#38bdf8';
        statusBarItem.tooltip = `FastrMemory Guardian: Zero active error traps in project${fallbackNote}`;
      }
      editor?.setDecorations(trapDecorationType, []);
    }

    statusBarItem.show();
  };

  // Event listeners & watchers (all disposed via context.subscriptions)
  let debounce: ReturnType<typeof setTimeout> | undefined;
  const scheduleRefresh = () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      debounce = undefined;
      safeRefresh();
    }, 500);
  };
  const dbWatcher = vscode.workspace.createFileSystemWatcher('**/.fastr/fastr.db*');
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => updatePillAndDecorations()),
    vscode.workspace.onDidSaveTextDocument(() => scheduleRefresh()),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('fastrmemory')) updatePillAndDecorations();
    }),
    vscode.workspace.onDidChangeWorkspaceFolders(() => safeRefresh()),
    dbWatcher,
    dbWatcher.onDidChange(scheduleRefresh),
    dbWatcher.onDidCreate(scheduleRefresh),
    dbWatcher.onDidDelete(scheduleRefresh),
    { dispose: () => debounce && clearTimeout(debounce) }
  );

  // Command: Show Active Error Traps QuickPick
  context.subscriptions.push(
    vscode.commands.registerCommand('fastrmemory.showTraps', async () => {
      await refreshTraps();
      if (allTraps.length === 0) {
        vscode.window.showInformationMessage('✨ FastrMemory: No active error traps in this workspace.');
        return;
      }

      const items: TrapPickItem[] = allTraps.map((t) => ({
        label: `⚡ [${t.id}]${statusTag(t)} ${t.title}`,
        description: `${t.status === 'staging' ? 'staging • ' : ''}${t.reward_score.toFixed(1)}x boost • Module: ${t.module}`,
        detail: t.filePaths.length > 0 ? `Protects: ${t.filePaths.join(', ')}` : usingCliFallback ? 'File links unavailable in CLI fallback mode' : 'Global project trap',
        trap: t,
      }));

      const selection = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select an active error trap to inspect lesson or open protected file',
        matchOnDescription: true,
        matchOnDetail: true,
      });
      if (!selection) return;

      const found = selection.trap;
      const filePath = found.filePaths[0];
      const action = await vscode.window.showWarningMessage(
        `[TRAP]${statusTag(found)} [${found.id}] ${found.title}${found.content ? `\n\n${found.content}` : ''}`,
        filePath ? 'Open Protected File' : 'Open 3D Observatory',
        'Close'
      );

      if (action === 'Open Protected File' && filePath) {
        const root = getWorkspaceRoot();
        if (!root) return;
        const target = path.isAbsolute(filePath) ? filePath : path.join(root, ...filePath.split(/[\\/]/));
        try {
          const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(target));
          await vscode.window.showTextDocument(doc);
        } catch (err: any) {
          vscode.window.showErrorMessage(`FastrMemory: could not open ${filePath}: ${err?.message ?? err}`);
        }
      } else if (action === 'Open 3D Observatory') {
        vscode.commands.executeCommand('fastrmemory.openDashboard');
      }
    })
  );

  // Command: Open 3D Brain Observatory
  context.subscriptions.push(
    vscode.commands.registerCommand('fastrmemory.openDashboard', async () => {
      const port = vscode.workspace.getConfiguration('fastrmemory').get<number>('serverPort', 4242);
      await vscode.env.openExternal(vscode.Uri.parse(`http://localhost:${port}/#/observatory`));
    })
  );

  // Command: Run Pre-Merge Trap Guardian (`fastrmemory guard` on files changed vs the base branch)
  context.subscriptions.push(
    vscode.commands.registerCommand('fastrmemory.guardWorkspace', async () => {
      const root = getWorkspaceRoot();
      if (!root) {
        vscode.window.showWarningMessage('FastrMemory Guardian: open a workspace folder first.');
        return;
      }
      const base = vscode.workspace.getConfiguration('fastrmemory').get<string>('guardBaseBranch', 'origin/main') || 'origin/main';

      outputChannel.clear();
      outputChannel.appendLine(`$ fastrmemory guard --base ${base}   (cwd: ${root})`);
      outputChannel.appendLine('');
      outputChannel.show(true);

      const res = await runCli(root, ['guard', '--base', base]);
      if (res.stdout) outputChannel.appendLine(res.stdout.trimEnd());
      if (res.stderr) outputChannel.appendLine(res.stderr.trimEnd());

      if (res.spawnError) {
        outputChannel.appendLine(`\nCould not run the fastrmemory CLI: ${res.spawnError}`);
        vscode.window.showErrorMessage(
          'FastrMemory Guardian: could not run the fastrmemory CLI. Install it (npm i -g fastrmemory) or set "fastrmemory.cliPath".'
        );
      } else if (res.code !== 0) {
        vscode.window.showWarningMessage(`⚡ FastrMemory Guardian failed (exit ${res.code}). See the "FastrMemory Guardian" output.`);
      } else if (/Failed to initialize FastrMemory context/.test(res.stdout)) {
        vscode.window.showWarningMessage('FastrMemory Guardian could not open the memory database. See the "FastrMemory Guardian" output.');
      } else if (/^###\s*⚠️\s*\[`/m.test(res.stdout)) {
        vscode.window.showWarningMessage('⚡ FastrMemory Guardian: error traps protect modified files. See the "FastrMemory Guardian" output.');
      } else {
        vscode.window.showInformationMessage('✅ FastrMemory Guardian: no traps protect the modified files.');
      }
    })
  );

  // Initial load
  safeRefresh();
  outputChannel.appendLine('[FastrMemory Guardian] Extension activated successfully.');
}

export function deactivate() {}
