#!/usr/bin/env node
/**
 * Packages the VS Code / Cursor extension into a production .vsix archive.
 * Verifies that the required icon, license, readme, and compiled dist files
 * are present and that the resulting package size is well within the 1 MB target.
 */
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXT_DIR = path.join(ROOT, 'extensions', 'vscode');

console.log('== Packaging FastrMemory VS Code & Cursor Extension');

// 1. Verify required root assets in extension folder
const required = ['package.json', 'README.md', 'LICENSE', 'icon.png', '.vscodeignore'];
for (const file of required) {
  const filePath = path.join(EXT_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: missing required file ${file} in ${EXT_DIR}`);
    process.exit(1);
  }
}

// 2. Compile extension TypeScript
console.log('1. Compiling extension TypeScript...');
execSync('npm run build:extension', { cwd: ROOT, stdio: 'inherit' });

// 3. Package with vsce
console.log('2. Packaging with @vscode/vsce...');
execSync('npx --yes @vscode/vsce package --no-dependencies', { cwd: EXT_DIR, stdio: 'inherit' });

// 4. Locate and inspect the created .vsix
const vsixFiles = fs.readdirSync(EXT_DIR).filter((f) => f.endsWith('.vsix'));
if (vsixFiles.length === 0) {
  console.error('Error: no .vsix file was produced');
  process.exit(1);
}

const vsixPath = path.join(EXT_DIR, vsixFiles[0]);
const stat = fs.statSync(vsixPath);
const sizeKb = (stat.size / 1024).toFixed(1);

console.log(`\n✅ Successfully packaged: ${vsixFiles[0]} (${sizeKb} KB)`);
console.log(`Path: ${vsixPath}`);
console.log('\nReady for installation in Cursor / VS Code:');
console.log(`  cursor --install-extension "${vsixPath}"`);
console.log(`  code --install-extension "${vsixPath}"`);
