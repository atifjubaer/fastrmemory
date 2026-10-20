import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Human-readable MCP server name exposed during initialize. Registry identity lives in package.json `mcpName`. */
export const MCP_SERVER_NAME = 'fastrmemory';

/**
 * Reads the package version from the nearest package.json.
 *
 * Source runs from `src/` or `bin/`; compiled output runs from `dist/src/` or
 * `dist/bin/`. Both layouts resolve to the package root with one of the two
 * candidate paths. The fallback keeps an unexpected layout from crashing the CLI.
 */
function readPackageVersion(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, '../../package.json'),
    path.resolve(here, '../package.json')
  ];
  for (const candidate of candidates) {
    try {
      const pkg = JSON.parse(fs.readFileSync(candidate, 'utf8')) as { version?: unknown };
      if (typeof pkg.version === 'string' && /^\d+\.\d+\.\d+/.test(pkg.version)) {
        return pkg.version;
      }
    } catch {
      // Try the next layout.
    }
  }
  return '0.0.0';
}

export const PACKAGE_VERSION = readPackageVersion();
