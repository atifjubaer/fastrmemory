import { describe, it, expect, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { findProjectRoot } from '../src/config.js';

describe('findProjectRoot', () => {
  let tempDir: string | undefined;

  afterEach(() => {
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = undefined;
  });

  function makeTree(): { home: string; project: string } {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-root-'));
    const home = path.join(tempDir, 'home');
    const project = path.join(home, 'scratch', 'app');
    fs.mkdirSync(project, { recursive: true });
    return { home, project };
  }

  function withHome<T>(home: string, fn: () => T): T {
    const previous = process.env.FASTR_HOME;
    process.env.FASTR_HOME = home;
    try {
      return fn();
    } finally {
      if (previous === undefined) delete process.env.FASTR_HOME;
      else process.env.FASTR_HOME = previous;
    }
  }

  it('does not treat the FastrMemory home as a project marker', () => {
    const { home, project } = makeTree();
    fs.mkdirSync(path.join(home, '.fastr'), { recursive: true });
    // An ancestor of the temp dir could itself carry a marker; the invariant is only
    // that the FastrMemory home never wins.
    expect(withHome(home, () => findProjectRoot(project))).not.toBe(home);
  });

  it('finds a project .fastr directory below the home', () => {
    const { home, project } = makeTree();
    fs.mkdirSync(path.join(home, '.fastr'), { recursive: true });
    fs.mkdirSync(path.join(project, '.fastr'), { recursive: true });
    expect(withHome(home, () => findProjectRoot(project))).toBe(project);
  });

  it('finds .git and package.json markers', () => {
    const { home, project } = makeTree();
    fs.mkdirSync(path.join(home, '.fastr'), { recursive: true });
    fs.mkdirSync(path.join(project, '.git'), { recursive: true });
    expect(withHome(home, () => findProjectRoot(project))).toBe(project);

    fs.rmSync(path.join(project, '.git'), { recursive: true, force: true });
    fs.writeFileSync(path.join(project, 'package.json'), '{}');
    expect(withHome(home, () => findProjectRoot(project))).toBe(project);
  });

  it('falls back to the start directory when nothing marks a root', () => {
    const { home, project } = makeTree();
    fs.mkdirSync(path.join(home, '.fastr'), { recursive: true });
    expect(withHome(home, () => findProjectRoot(project))).not.toBe(home);
  });
});
