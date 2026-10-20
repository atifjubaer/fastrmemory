import * as fs from 'node:fs';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';

const dbPath = process.argv[2];
const runId = process.argv[3] || '0';

if (!dbPath) {
  console.error('usage: crash-test-child.ts <db-path> <run-id>');
  process.exit(2);
}

const db = initDatabase(dbPath);
const repo = new FastrRepository(db);

function writeLine(line: string): void {
  const data = Buffer.from(`${line}\n`);
  let offset = 0;
  while (offset < data.length) {
    try {
      offset += fs.writeSync(1, data, offset);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'EAGAIN') throw err;
    }
  }
}

writeLine(`READY ${process.pid}`);

let seq = 0;
for (;;) {
  const memory = repo.insertMemory({
    projectId: 'crash-test',
    module: 'crash',
    kind: 'rule',
    title: `crash-${runId}-${seq}`,
    content: `Crash-test payload for run ${runId}, sequence ${seq}.`,
  });
  writeLine(`ACK ${runId} ${seq} ${memory.id}`);
  seq += 1;
}
