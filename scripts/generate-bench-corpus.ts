import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildBenchmarkCorpus, summarizeCorpus } from '../src/bench/corpus.js';

const corpus = buildBenchmarkCorpus();
const summary = summarizeCorpus(corpus);
const outDir = path.resolve('bench');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'corpus.json');
fs.writeFileSync(outFile, `${JSON.stringify(corpus, null, 2)}\n`, 'utf-8');
console.log(
  `Wrote ${outFile}: ${summary.memories} memories, ${summary.cases} cases ` +
    `(${summary.train} train / ${summary.holdout} holdout)`
);
console.log(JSON.stringify(summary.byCategory, null, 2));
