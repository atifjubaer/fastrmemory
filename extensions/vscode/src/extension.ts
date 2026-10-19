import * as vscode from 'vscode';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

interface ActiveTrap {
  id: string;
  title: string;
  content: string;
  module: string;
  reward_score: number;
  filePath?: string;
}

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

  // Helper: Find workspace root
  const getWorkspaceRoot = (): string | undefined => {
    return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  };

  // Helper: Normalize file path
  const normalizePath = (p: string): string => {
    return p.replace(/\\/g, '/').toLowerCase();
  };

  // Helper: Query SQLite database for active error traps
  const refreshTraps = () => {
    const root = getWorkspaceRoot();
    if (!root) {
      allTraps = [];
      trapsByFile.clear();
      updatePillAndDecorations();
      return;
    }

    const dbPath = path.join(root, '.fastr', 'fastr.db');
    if (!fs.existsSync(dbPath)) {
      allTraps = [];
      trapsByFile.clear();
      updatePillAndDecorations();
      return;
    }

    try {
      const db = new DatabaseSync(dbPath, { readOnly: true } as any);
      const rows = db.prepare(`
        SELECT 
          m.id, 
          m.title, 
          m.content, 
          m.module, 
          m.reward_score, 
          fl.file_path
        FROM memories m
        LEFT JOIN file_links fl ON m.id = fl.memory_id
        WHERE m.kind = 'error_trap' AND m.status = 'verified'
      `).all() as any[];

      const map = new Map<string, ActiveTrap[]>();
      const distinctMap = new Map<string, ActiveTrap>();

      for (const r of rows) {
        const trap: ActiveTrap = {
          id: r.id,
          title: r.title,
          content: r.content,
          module: r.module,
          reward_score: Number(r.reward_score || 2.0),
          filePath: r.file_path || undefined,
        };

        distinctMap.set(trap.id, trap);

        if (trap.filePath) {
          const norm = normalizePath(trap.filePath);
          const list = map.get(norm) || [];
          list.push(trap);
          map.set(norm, list);
        }
      }

      allTraps = Array.from(distinctMap.values());
      trapsByFile = map;
      db.close();
    } catch (err: any) {
      outputChannel.appendLine(`[FastrMemory] Failed to read database: ${err.message}`);
    }

    updatePillAndDecorations();
  };

  // Helper: Update Status Bar Pill & Editor Amber Underlines
  const updatePillAndDecorations = () => {
    const editor = vscode.window.activeTextEditor;
    const root = getWorkspaceRoot();
    const config = vscode.workspace.getConfiguration('fastrmemory');
    const enableUnderlines = config.get<boolean>('enableUnderlines', true);

    diagnosticCollection.clear();

    if (!editor || !root) {
      if (allTraps.length > 0) {
        statusBarItem.text = `⚡ ${allTraps.length} Traps Active`;
        statusBarItem.color = '#fbbf24';
        statusBarItem.tooltip = `FastrMemory Guardian: ${allTraps.length} active error traps protecting workspace (2.0x boost)`;
      } else {
        statusBarItem.text = `⚡ Fastr: Clean`;
        statusBarItem.color = '#38bdf8';
        statusBarItem.tooltip = `FastrMemory Guardian: Zero active error traps`;
      }
      statusBarItem.show();
      return;
    }

    const currentDocPath = editor.document.uri.fsPath;
    const relPath = normalizePath(path.relative(root, currentDocPath));
    const matchingTraps = trapsByFile.get(relPath) || [];

    if (matchingTraps.length > 0) {
      const topTrap = matchingTraps[0];
      statusBarItem.text = `⚡ ${matchingTraps.length} Trap${matchingTraps.length > 1 ? 's' : ''} on File`;
      statusBarItem.color = '#fbbf24';
      statusBarItem.tooltip = `⚠️ PROTECTED BY FASTR TRAP [${topTrap.id}]: "${topTrap.title}"\n${topTrap.content}\n\nClick to inspect all active traps.`;

      // Apply amber underlines & hover diagnostic to file
      if (enableUnderlines) {
        const decorations: vscode.DecorationOptions[] = [];
        const diagnostics: vscode.Diagnostic[] = [];

        matchingTraps.forEach((trap) => {
          const hoverText = [
            `### ⚠️ FastrMemory Error Trap [${trap.id}]`,
            `**${trap.title}** (Reward Boost: ${trap.reward_score.toFixed(1)}x)`,
            '',
            `> ${trap.content}`,
            '',
            `_File protected by FastrMemory Zero-Regression Discipline._`,
          ].join('\n');

          const range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, Math.max(1, editor.document.lineAt(0).text.length)));
          decorations.push({
            range,
            hoverMessage: hoverText,
          });

          const diagnostic = new vscode.Diagnostic(
            range,
            `[TRAP] [${trap.id}] ${trap.title}: ${trap.content} (2.0x boost)`,
            vscode.DiagnosticSeverity.Warning
          );
          diagnostic.source = 'FastrMemory';
          diagnostic.code = trap.id;
          diagnostics.push(diagnostic);
        });

        editor.setDecorations(trapDecorationType, decorations);
        diagnosticCollection.set(editor.document.uri, diagnostics);
      } else {
        editor.setDecorations(trapDecorationType, []);
      }
    } else {
      if (allTraps.length > 0) {
        statusBarItem.text = `⚡ ${allTraps.length} Traps Active`;
        statusBarItem.color = '#38bdf8';
        statusBarItem.tooltip = `FastrMemory Guardian: ${allTraps.length} active error traps in workspace. Current file has 0 traps.`;
      } else {
        statusBarItem.text = `⚡ Fastr: Clean`;
        statusBarItem.color = '#38bdf8';
        statusBarItem.tooltip = `FastrMemory Guardian: Zero active error traps in project`;
      }
      editor.setDecorations(trapDecorationType, []);
    }

    statusBarItem.show();
  };

  // Event Listeners
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => updatePillAndDecorations()),
    vscode.workspace.onDidSaveTextDocument(() => refreshTraps())
  );

  // Command: Show Active Error Traps QuickPick
  context.subscriptions.push(
    vscode.commands.registerCommand('fastrmemory.showTraps', async () => {
      refreshTraps();
      if (allTraps.length === 0) {
        vscode.window.showInformationMessage('✨ FastrMemory: No active error traps in this workspace.');
        return;
      }

      const items: vscode.QuickPickItem[] = allTraps.map((t) => ({
        label: `⚡ [${t.id}] ${t.title}`,
        description: `${t.reward_score.toFixed(1)}x boost &bull; Module: ${t.module}`,
        detail: t.filePath ? `Protects: ${t.filePath}` : 'Global project trap',
      }));

      const selection = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select an active error trap to inspect lesson or open protected file',
        matchOnDescription: true,
        matchOnDetail: true,
      });

      if (!selection) return;

      const trapId = selection.label.match(/\[(.*?)\]/)?.[1];
      const found = allTraps.find((t) => t.id === trapId);
      if (!found) return;

      const action = await vscode.window.showWarningMessage(
        `[TRAP] [${found.id}] ${found.title}\n\n${found.content}`,
        found.filePath ? 'Open Protected File' : 'Open 3D Observatory',
        'Close'
      );

      if (action === 'Open Protected File' && found.filePath) {
        const root = getWorkspaceRoot();
        if (root) {
          const targetUri = vscode.Uri.file(path.join(root, found.filePath));
          const doc = await vscode.workspace.openTextDocument(targetUri);
          await vscode.window.activeTextEditor?.document;
        }
      } else if (action === 'Open 3D Observatory') {
        vscode.commands.executeCommand('fastrmemory.openDashboard');
      }
    })
  );

  // Command: Open 3D Brain Observatory
  context.subscriptions.push(
    vscode.commands.registerCommand('fastrmemory.openDashboard', async () => {
      const config = vscode.workspace.getConfiguration('fastrmemory');
      const port = config.get<number>('serverPort', 4242);
      const url = vscode.Uri.parse(`http://localhost:${port}/#/observatory`);
      await vscode.env.openExternal(url);
    })
  );

  // Command: Run Pre-Merge Trap Guardian
  context.subscriptions.push(
    vscode.commands.registerCommand('fastrmemory.guardWorkspace', async () => {
      refreshTraps();
      outputChannel.clear();
      outputChannel.appendLine('========================================');
      outputChannel.appendLine('⚡ FastrMemory Pre-Merge Trap Guardian');
      outputChannel.appendLine('========================================');
      outputChannel.appendLine(`Active Traps In Workspace: ${allTraps.length}`);
      outputChannel.appendLine('');

      if (allTraps.length === 0) {
        outputChannel.appendLine('✅ All clear! Zero active error traps protecting repository.');
        vscode.window.showInformationMessage('✅ FastrMemory Guardian: All files safe to merge.');
      } else {
        allTraps.forEach((t) => {
          outputChannel.appendLine(`- [${t.id}] ${t.title} (${t.reward_score.toFixed(1)}x boost)`);
          if (t.filePath) outputChannel.appendLine(`  File: ${t.filePath}`);
          outputChannel.appendLine(`  Lesson: ${t.content}`);
          outputChannel.appendLine('');
        });
        vscode.window.showWarningMessage(`⚡ FastrMemory Guardian: ${allTraps.length} active error trap(s) active.`);
      }
      outputChannel.show(true);
    })
  );

  // Initial load
  refreshTraps();
  outputChannel.appendLine('[FastrMemory Guardian] Extension activated successfully.');
}

export function deactivate() {}
