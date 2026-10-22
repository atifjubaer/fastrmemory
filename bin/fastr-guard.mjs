#!/usr/bin/env node
// Friendly runtime gate for the CLI entry point. This file must stay dependency-free:
// it runs before the CLI is loaded, including on Node versions without node:sqlite.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const MIN_NODE_VERSION = '22.16.0';

export function parseNodeVersion(version) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(version).trim());
  if (!match) {
    throw new Error(`Invalid Node.js version: ${version}`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

export function isSupportedNodeVersion(version) {
  const current = parseNodeVersion(version);
  const minimum = parseNodeVersion(MIN_NODE_VERSION);
  if (current.major !== minimum.major) return current.major > minimum.major;
  if (current.minor !== minimum.minor) return current.minor > minimum.minor;
  return current.patch >= minimum.patch;
}

export function assertSupportedNode(version = process.versions.node) {
  if (isSupportedNodeVersion(version)) return;
  const error = new Error(
    `FastrMemory requires Node.js ${MIN_NODE_VERSION} or newer; you are running ${version}.\n` +
    'Node 22.16+ provides the built-in node:sqlite module. Node 24 LTS is recommended: https://nodejs.org/en/download'
  );
  error.code = 'ERR_FASTR_UNSUPPORTED_NODE';
  throw error;
}

function isMainModule() {
  if (!process.argv[1]) return false;
  try {
    return fs.realpathSync(path.resolve(process.argv[1])) === fs.realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isMainModule()) {
  try {
    assertSupportedNode();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  // Resolve through symlinks so npm's .bin shim still finds the package's dist directory.
  const guardPath = fs.realpathSync(fileURLToPath(import.meta.url));
  const cliPath = path.resolve(path.dirname(guardPath), '..', 'dist', 'bin', 'fastr.js');
  await import(pathToFileURL(cliPath).href);
}
