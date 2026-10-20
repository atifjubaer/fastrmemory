// Validates the committed 10k-write crash-test report.
//
// The report is produced by `npm run test:crash`; this gate keeps the evidence
// from silently disappearing or regressing while `check:ci` stays fast.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORT = path.join(ROOT, 'bench', 'results', 'crash-test.json');

const errors = [];
function fail(message) {
  errors.push(message);
}

if (!fs.existsSync(REPORT)) {
  fail('missing bench/results/crash-test.json; run `npm run test:crash`');
} else {
  let report;
  try {
    report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
  } catch (err) {
    fail(`invalid crash-test JSON: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (report) {
    if (report.schemaVersion !== 1) fail('crash-test schemaVersion must be 1');
    if (report.runs !== 10) fail(`crash-test must report 10 runs, got ${report.runs}`);
    if (!(report.totalAcknowledged >= 10_000)) {
      fail(`crash-test must acknowledge at least 10,000 writes, got ${report.totalAcknowledged}`);
    }
    if (report.missing !== 0) fail(`crash-test lost ${report.missing} acknowledged writes`);
    if (report.duplicateIds !== 0) fail(`crash-test found ${report.duplicateIds} duplicate ids`);
    if (report.duplicateTitles !== 0) fail(`crash-test found ${report.duplicateTitles} duplicate titles`);
    if (report.integrity !== 'ok') fail(`crash-test integrity is ${report.integrity}`);
    if (report.pass !== true) fail('crash-test did not pass');
    if (!Array.isArray(report.perRun) || report.perRun.length !== report.runs) {
      fail('crash-test perRun length does not match runs');
    } else {
      for (const run of report.perRun) {
        if (run.missing !== 0) fail(`run ${run.run} lost ${run.missing} acknowledged writes`);
        if (run.duplicateIds !== 0) fail(`run ${run.run} found duplicate ids`);
        if (run.duplicateTitles !== 0) fail(`run ${run.run} found duplicate titles`);
        if (run.integrity !== 'ok') fail(`run ${run.run} integrity is ${run.integrity}`);
      }
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
console.log(
  `Crash evidence passed: ${report.runs} runs, ${report.totalAcknowledged} acknowledged writes, ` +
    `${report.totalRows} committed rows, 0 lost, 0 duplicates, integrity ${report.integrity}.`
);
