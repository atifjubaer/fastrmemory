// Fails the release workflow when the tag, package version, and registry manifest disagree.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tag = process.argv[2];

if (!tag) {
  console.error('Usage: node scripts/check-release-version.mjs <vX.Y.Z>');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const expectedTag = `v${pkg.version}`;
const errors = [];

if (tag !== expectedTag) {
  errors.push(`tag ${tag} does not match package.json version (${expectedTag})`);
}

const serverPath = path.join(ROOT, 'server.json');
if (fs.existsSync(serverPath)) {
  const server = JSON.parse(fs.readFileSync(serverPath, 'utf8'));
  if (server.version !== pkg.version) {
    errors.push(`server.json version ${server.version} != package.json ${pkg.version}`);
  }
}

const pluginPath = path.join(ROOT, '.claude-plugin', 'plugin.json');
if (fs.existsSync(pluginPath)) {
  const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  if (plugin.version !== pkg.version) {
    errors.push(`plugin.json version ${plugin.version} != package.json ${pkg.version}`);
  }
  const args = plugin.mcpServers?.fastrmemory?.args ?? [];
  if (!args.includes(`fastrmemory@${pkg.version}`)) {
    errors.push(`plugin.json does not pin fastrmemory@${pkg.version}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`Release check failed: ${error}`);
  process.exit(1);
}

console.log(`Release version check passed: ${tag} (fastrmemory@${pkg.version})`);
