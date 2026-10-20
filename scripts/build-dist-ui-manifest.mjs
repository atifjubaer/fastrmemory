// Writes dist-ui/build-manifest.json after a UI build.
//
// The manifest is deterministic: no timestamp, sorted paths, normalized text
// hashes. CI uses scripts/check-dist-ui.mjs to verify that the tracked bundle
// still matches the current UI source without rebuilding it.
import * as path from 'node:path';
import {
  MANIFEST_PATH,
  ROOT,
  buildManifest,
  writeManifest
} from './lib/dist-ui-manifest.mjs';

const manifest = buildManifest();
writeManifest(manifest);

console.log(
  `Wrote ${path.relative(ROOT, MANIFEST_PATH)}: ` +
    `${Object.keys(manifest.sources).length} source files, ` +
    `${Object.keys(manifest.files).length} output files, ` +
    `source ${manifest.sourceHash.slice(0, 12)}`
);
