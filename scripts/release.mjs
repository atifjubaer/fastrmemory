#!/usr/bin/env node
/**
 * Unattended release driver.
 *
 * This script never publishes. It bumps every manifest, runs the release gate, commits,
 * tags, and pushes. The tag push is what publishes: .github/workflows/release.yml checks
 * out the tag, re-runs the full gate, packs the tarball, installs it into a clean
 * directory, publishes over npm OIDC trusted publishing with provenance, and creates the
 * GitHub Release.
 *
 * A local `npm publish` is deliberately not offered here. It would need a 2FA code on an
 * auth-and-writes account, would carry no provenance attestation, and would make the later
 * tag run fail with E409 because npm versions are immutable.
 *
 * Usage:
 *   node scripts/release.mjs patch
 *   node scripts/release.mjs minor --registry
 *   node scripts/release.mjs 0.7.0 --dry-run
 *
 * Flags:
 *   --dry-run      Print the plan; write, commit, and push nothing.
 *   --skip-gate    Do not run `npm run check:ci` locally (CI still runs it).
 *   --no-push      Commit and tag locally, leave the push to the operator.
 *   --registry     Once the npm release succeeds, dispatch publish-mcp.yml.
 *   --co-author    Append the Claude Code co-author trailer to the release commit.
 *   --allow-dirty  Do not require a clean working tree (for --dry-run only).
 *   --branch=NAME  Branch that receives the commit and tag (default: main).
 */
import { execFileSync, execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((arg) => arg.startsWith('--')));
const positional = argv.filter((arg) => !arg.startsWith('--'));

const DRY_RUN = flags.has('--dry-run');
const SKIP_GATE = flags.has('--skip-gate');
const NO_PUSH = flags.has('--no-push');
const REGISTRY = flags.has('--registry');
const CO_AUTHOR = flags.has('--co-author');
const ALLOW_DIRTY = flags.has('--allow-dirty');
const BRANCH = (argv.find((arg) => arg.startsWith('--branch=')) ?? '--branch=main').slice('--branch='.length);
const BUMP = positional[0];

const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;
const CO_AUTHOR_TRAILER = 'Co-Authored-By: Claude Code <[EMAIL_REDACTED]>';

function fail(message) {
  console.error(`release: ${message}`);
  process.exit(1);
}

function step(message) {
  console.log(`\n== ${message}`);
}

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function tryGit(args) {
  try {
    return { ok: true, out: git(args) };
  } catch (err) {
    return { ok: false, out: String(err.stderr || err.message || '').trim() };
  }
}

// npm resolves through npm.cmd on Windows and spawnSync refuses that without a shell,
// so npm invocations use a static command string and never interpolate input.
function npm(command) {
  return execSync(command, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function gh(args) {
  return execFileSync('gh', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

function writeJson(rel, value) {
  fs.writeFileSync(path.join(ROOT, rel), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function parseVersion(value) {
  const match = SEMVER.exec(String(value ?? '').trim());
  return match ? { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) } : null;
}

function nextVersion(current, request) {
  const base = parseVersion(current);
  if (!base) fail(`package.json version "${current}" is not semver`);

  if (request === 'major') return `${base.major + 1}.0.0`;
  if (request === 'minor') return `${base.major}.${base.minor + 1}.0`;
  if (request === 'patch') return `${base.major}.${base.minor}.${base.patch + 1}`;

  const explicit = parseVersion(request);
  if (!explicit) fail(`unknown version argument "${request}". Use patch, minor, major, or an explicit X.Y.Z`);

  const a = [base.major, base.minor, base.patch];
  const b = [explicit.major, explicit.minor, explicit.patch];
  const newer = b[0] > a[0] || (b[0] === a[0] && (b[1] > a[1] || (b[1] === a[1] && b[2] > a[2])));
  if (!newer) fail(`${request} is not greater than the current version ${current}`);
  return request;
}

/** Bumps every manifest the release gate compares. Returns the files it touched. */
function bumpManifests(next) {
  const changed = [];

  const pkg = readJson('package.json');
  if (pkg.version !== next) {
    pkg.version = next;
    writeJson('package.json', pkg);
    changed.push('package.json');
  }

  const server = readJson('server.json');
  let serverChanged = false;
  if (server.version !== next) {
    server.version = next;
    serverChanged = true;
  }
  const serverPackage = server.packages?.[0];
  if (serverPackage && serverPackage.version !== next) {
    serverPackage.version = next;
    serverChanged = true;
  }
  if (serverChanged) {
    writeJson('server.json', server);
    changed.push('server.json');
  }

  const plugin = readJson('.claude-plugin/plugin.json');
  let pluginChanged = false;
  if (plugin.version !== next) {
    plugin.version = next;
    pluginChanged = true;
  }
  const pluginArgs = plugin.mcpServers?.fastrmemory?.args;
  if (Array.isArray(pluginArgs)) {
    const index = pluginArgs.findIndex((arg) => typeof arg === 'string' && arg.startsWith('fastrmemory@'));
    if (index >= 0 && pluginArgs[index] !== `fastrmemory@${next}`) {
      pluginArgs[index] = `fastrmemory@${next}`;
      pluginChanged = true;
    }
  }
  if (pluginChanged) {
    writeJson('.claude-plugin/plugin.json', plugin);
    changed.push('.claude-plugin/plugin.json');
  }

  const marketplace = readJson('.claude-plugin/marketplace.json');
  const marketplacePlugin = marketplace.plugins?.[0];
  if (marketplacePlugin && marketplacePlugin.version !== next) {
    marketplacePlugin.version = next;
    writeJson('.claude-plugin/marketplace.json', marketplace);
    changed.push('.claude-plugin/marketplace.json');
  }

  const skillsPath = path.join(ROOT, 'skills', 'skills.json');
  if (fs.existsSync(skillsPath)) {
    const skills = readJson('skills/skills.json');
    if (typeof skills.version === 'string' && skills.version !== next) {
      skills.version = next;
      writeJson('skills/skills.json', skills);
      changed.push('skills/skills.json');
    }
  }

  return changed;
}

/** npm refuses a duplicate version with E409, and a tag run would then fail after the fact. */
function assertVersionIsUnpublished(version) {
  try {
    const published = npm(`npm view fastrmemory@${version} version`).trim();
    if (published === version) {
      fail(`fastrmemory@${version} is already on npm. Versions are immutable; choose the next one.`);
    }
  } catch {
    // A 404 is the expected answer for an unpublished version.
  }
}

function findReleaseRun(tag) {
  try {
    const runs = JSON.parse(gh([
      'run', 'list', '--workflow=release.yml', '--limit', '20',
      '--json', 'databaseId,headBranch,status,conclusion,createdAt'
    ]));
    return runs.find((run) => run.headBranch === tag) ?? null;
  } catch {
    return null;
  }
}

async function waitForRelease(tag) {
  const deadline = Date.now() + 30 * 60 * 1000;
  let announced = false;

  while (Date.now() < deadline) {
    const run = findReleaseRun(tag);
    if (run && !announced) {
      console.log(`   watching run ${run.databaseId} (${run.status})`);
      announced = true;
    }
    if (run && run.status === 'completed') return run;
    await new Promise((resolve) => setTimeout(resolve, 15_000));
  }

  fail(`release run for ${tag} did not finish within 30 minutes. Inspect: gh run list --workflow=release.yml`);
}

async function main() {
  if (!BUMP) {
    fail('usage: node scripts/release.mjs <patch|minor|major|X.Y.Z> [--dry-run] [--skip-gate] [--no-push] [--registry]');
  }

  const current = readJson('package.json').version;
  const next = nextVersion(current, BUMP);
  const tag = `v${next}`;

  step(`Release plan: ${current} -> ${next} (tag ${tag})`);
  console.log(`   branch        ${BRANCH}`);
  console.log(`   gate          ${SKIP_GATE ? 'skipped locally (CI still runs it)' : 'npm run check:ci'}`);
  console.log(`   push          ${NO_PUSH ? 'no (local commit and tag only)' : `git push origin ${BRANCH} && git push origin ${tag}`}`);
  console.log(`   registry      ${REGISTRY ? 'dispatch publish-mcp.yml after npm succeeds' : 'not dispatched'}`);

  // 1. Refuse to release from a dirty tree or the wrong branch.
  const status = git(['status', '--porcelain']);
  if (status && !ALLOW_DIRTY) {
    fail(`working tree is not clean. Commit or stash first:\n${status}`);
  }
  if (status && ALLOW_DIRTY && !DRY_RUN) {
    fail('--allow-dirty is only valid with --dry-run');
  }

  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  if (branch !== BRANCH && !ALLOW_DIRTY) {
    fail(`current branch is "${branch}", expected "${BRANCH}". Pass --branch=${branch} if that is intended.`);
  }

  if (tryGit(['rev-parse', '-q', '--verify', `refs/tags/${tag}`]).ok) {
    fail(`tag ${tag} already exists locally`);
  }
  if (tryGit(['ls-remote', '--exit-code', '--tags', 'origin', tag]).ok) {
    fail(`tag ${tag} already exists on origin`);
  }

  assertVersionIsUnpublished(next);

  if (DRY_RUN) {
    step('Dry run: manifests that would change');
    for (const rel of ['package.json', 'server.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', 'skills/skills.json']) {
      const value = readJson(rel);
      const currentValue = rel === 'server.json' ? value.version : rel.endsWith('skills.json') ? value.version : rel.endsWith('marketplace.json') ? value.plugins?.[0]?.version : value.version;
      console.log(`   ${rel}: ${currentValue} -> ${next}`);
    }
    console.log('\nDry run complete. Nothing was written, committed, or pushed.');
    return;
  }

  // 2. Bump every manifest the gate compares.
  step('Bumping manifests');
  const changed = bumpManifests(next);
  for (const rel of changed) console.log(`   ${rel} -> ${next}`);
  if (changed.length === 0) fail('no manifest needed a bump; package.json may already be at this version');

  // 3. Same agreement check the workflow runs, before anything is committed.
  step('Verifying tag and manifest agreement');
  execFileSync('node', ['scripts/check-release-version.mjs', tag], { cwd: ROOT, stdio: 'inherit' });

  // 4. Full local gate. CI re-runs it on the tag, so this is a fast-fail, not the authority.
  if (!SKIP_GATE) {
    step('Running the local release gate (npm run check:ci)');
    execSync('npm run check:ci', { cwd: ROOT, stdio: 'inherit' });
  }

  // 5. Commit, tag, push. The push of the tag is the publish trigger.
  step('Committing and tagging');
  execFileSync('git', ['add', ...changed], { cwd: ROOT, stdio: 'inherit' });
  const message = `chore(release): ${next}${CO_AUTHOR ? `\n\n${CO_AUTHOR_TRAILER}` : ''}`;
  execFileSync('git', ['commit', '-m', message], { cwd: ROOT, stdio: 'inherit' });
  execFileSync('git', ['tag', '-a', tag, '-m', `FastrMemory ${next}`], { cwd: ROOT, stdio: 'inherit' });
  console.log(`   committed and tagged ${tag}`);

  if (NO_PUSH) {
    console.log(`\n--no-push: push when ready with:\n   git push origin ${BRANCH} && git push origin ${tag}`);
    return;
  }

  step('Pushing');
  execFileSync('git', ['push', 'origin', BRANCH], { cwd: ROOT, stdio: 'inherit' });
  execFileSync('git', ['push', 'origin', tag], { cwd: ROOT, stdio: 'inherit' });

  // 6. Follow the workflow that actually publishes.
  step('Waiting for release.yml');
  const run = await waitForRelease(tag);
  if (run.conclusion !== 'success') {
    fail(`release run ${run.databaseId} concluded "${run.conclusion}". Inspect: gh run view ${run.databaseId}`);
  }
  console.log(`   release run ${run.databaseId} succeeded`);

  // 7. Optional: refresh the official MCP registry listing.
  if (REGISTRY) {
    step('Dispatching publish-mcp.yml');
    gh(['workflow', 'run', 'publish-mcp.yml', '-f', `tag=${tag}`, '-f', `ref=${BRANCH}`]);
    console.log(`   dispatched for ${tag}; follow with: gh run list --workflow=publish-mcp.yml --limit 1`);
  }

  step('Done');
  console.log(`   fastrmemory@${next} published by release.yml (run ${run.databaseId})`);
  console.log(`   npm:      https://www.npmjs.com/package/fastrmemory/v/${next}`);
  console.log(`   release:  https://github.com/atifjubaer/fastrmemory/releases/tag/${tag}`);
}

main().catch((err) => {
  console.error(`release: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
