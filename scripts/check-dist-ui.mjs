// Verifies that the tracked dist-ui bundle matches the current UI source.
//
// - The manifest must exist and use the supported schema.
// - Every UI build input hash and the combined source hash must match.
// - Every emitted file hash must match, with no missing or extra files.
//
// This is a freshness check, not a rebuild. Run `npm run build:ui` when it fails.
import * as fs from 'node:fs';
import {
  MANIFEST_PATH,
  MANIFEST_REL,
  MANIFEST_SCHEMA_VERSION,
  collectOutputHashes,
  collectSourceHashes,
  computeSourceHash,
  readManifest
} from './lib/dist-ui-manifest.mjs';

const errors = [];

function fail(message) {
  errors.push(message);
}

function compareMaps(label, expected, actual) {
  const expectedKeys = Object.keys(expected).sort();
  const actualKeys = Object.keys(actual).sort();
  for (const rel of expectedKeys) {
    if (!(rel in actual)) {
      fail(`${label} is missing ${rel}`);
    } else if (expected[rel] !== actual[rel]) {
      fail(`${label} changed: ${rel}`);
    }
  }
  for (const rel of actualKeys) {
    if (!(rel in expected)) {
      fail(`${label} has an unrecorded file: ${rel}`);
    }
  }
}

if (!fs.existsSync(MANIFEST_PATH)) {
  fail(`${MANIFEST_REL} is missing; run npm run build:ui`);
} else {
  let manifest;
  try {
    manifest = readManifest();
  } catch (error) {
    fail(`${MANIFEST_REL} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }

  if (manifest) {
    if (manifest.schemaVersion !== MANIFEST_SCHEMA_VERSION) {
      fail(`unsupported manifest schema ${JSON.stringify(manifest.schemaVersion)}; run npm run build:ui`);
    }
    if (!manifest.sources || typeof manifest.sources !== 'object' || Array.isArray(manifest.sources)) {
      fail('manifest sources must be an object');
    }
    if (!manifest.files || typeof manifest.files !== 'object' || Array.isArray(manifest.files)) {
      fail('manifest files must be an object');
    }

    if (manifest.sources && manifest.files) {
      const recordedSourceHash = computeSourceHash(manifest.sources);
      if (manifest.sourceHash !== recordedSourceHash) {
        fail('manifest sourceHash does not match its own sources map');
      }

      const currentSources = collectSourceHashes();
      compareMaps('UI source', manifest.sources, currentSources);
      if (manifest.sourceHash !== computeSourceHash(currentSources)) {
        fail('UI source changed since dist-ui was built; run npm run build:ui');
      }

      const currentFiles = collectOutputHashes();
      compareMaps('dist-ui output', manifest.files, currentFiles);
      if (!Object.hasOwn(manifest.files, 'index.html')) {
        fail('manifest files must include index.html');
      }
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log('UI bundle is fresh: source and output hashes match the manifest.');
