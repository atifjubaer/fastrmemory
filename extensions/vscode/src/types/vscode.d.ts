declare module 'vscode' {
  export interface ExtensionContext {
    subscriptions: { dispose(): any }[];
    extensionPath: string;
    extensionUri: Uri;
  }

  export enum StatusBarAlignment {
    Left = 1,
    Right = 2,
  }

  export interface StatusBarItem {
    alignment: StatusBarAlignment;
    priority: number;
    text: string;
    tooltip: string | undefined;
    color: string | undefined;
    command: string | undefined;
    show(): void;
    hide(): void;
    dispose(): void;
  }

  export enum OverviewRulerLane {
    Left = 1,
    Center = 2,
    Right = 4,
    Full = 7,
  }

  export interface DecorationRenderOptions {
    overviewRulerColor?: string;
    overviewRulerLane?: OverviewRulerLane;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    isWholeLine?: boolean;
    light?: DecorationRenderOptions;
    dark?: DecorationRenderOptions;
  }

  export interface TextEditorDecorationType {
    key: string;
    dispose(): void;
  }

  export interface DecorationOptions {
    range: Range;
    hoverMessage?: string | string[];
  }

  export class Position {
    readonly line: number;
    readonly character: number;
    constructor(line: number, character: number);
  }

  export class Range {
    readonly start: Position;
    readonly end: Position;
    constructor(start: Position, end: Position);
    constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number);
  }

  export class Uri {
    readonly scheme: string;
    readonly authority: string;
    readonly path: string;
    readonly fsPath: string;
    static file(path: string): Uri;
    static parse(value: string, strict?: boolean): Uri;
  }

  export enum DiagnosticSeverity {
    Error = 0,
    Warning = 1,
    Information = 2,
    Hint = 3,
  }

  export class Diagnostic {
    range: Range;
    message: string;
    severity: DiagnosticSeverity;
    source?: string;
    code?: string | number;
    constructor(range: Range, message: string, severity?: DiagnosticSeverity);
  }

  export interface DiagnosticCollection {
    name: string;
    set(uri: Uri, diagnostics: ReadonlyArray<Diagnostic> | undefined): void;
    delete(uri: Uri): void;
    clear(): void;
    dispose(): void;
  }

  export interface TextDocument {
    readonly uri: Uri;
    readonly fileName: string;
    readonly lineCount: number;
    lineAt(line: number): { range: Range; text: string };
  }

  export interface TextEditor {
    readonly document: TextDocument;
    setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: Range[] | DecorationOptions[]): void;
  }

  export interface WorkspaceFolder {
    readonly uri: Uri;
    readonly name: string;
    readonly index: number;
  }

  export interface WorkspaceConfiguration {
    get<T>(section: string, defaultValue?: T): T;
  }

  export namespace window {
    export let activeTextEditor: TextEditor | undefined;
    export function createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem;
    export function createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType;
    export function showInformationMessage(message: string, ...items: string[]): Thenable<string | undefined>;
    export function showWarningMessage(message: string, ...items: string[]): Thenable<string | undefined>;
    export function showErrorMessage(message: string, ...items: string[]): Thenable<string | undefined>;
    export function showQuickPick<T extends string | QuickPickItem>(items: T[] | Thenable<T[]>, options?: QuickPickOptions): Thenable<T | undefined>;
    export function onDidChangeActiveTextEditor(listener: (editor: TextEditor | undefined) => any): { dispose(): any };
    export function createOutputChannel(name: string): OutputChannel;
  }

  export interface QuickPickItem {
    label: string;
    description?: string;
    detail?: string;
    picked?: boolean;
    alwaysShow?: boolean;
  }

  export interface QuickPickOptions {
    title?: string;
    matchOnDescription?: boolean;
    matchOnDetail?: boolean;
    placeHolder?: string;
  }

  export interface OutputChannel {
    name: string;
    append(value: string): void;
    appendLine(value: string): void;
    clear(): void;
    show(preserveFocus?: boolean): void;
    dispose(): void;
  }

  export namespace workspace {
    export let workspaceFolders: readonly WorkspaceFolder[] | undefined;
    export function getConfiguration(section?: string): WorkspaceConfiguration;
    export function onDidSaveTextDocument(listener: (document: TextDocument) => any): { dispose(): any };
    export function openTextDocument(uri: Uri): Thenable<TextDocument>;
  }

  export namespace languages {
    export function createDiagnosticCollection(name?: string): DiagnosticCollection;
  }

  export namespace commands {
    export function registerCommand(command: string, callback: (...args: any[]) => any): { dispose(): any };
    export function executeCommand<T = unknown>(command: string, ...rest: any[]): Thenable<T>;
  }

  export namespace env {
    export function openExternal(target: Uri): Thenable<boolean>;
  }
}
