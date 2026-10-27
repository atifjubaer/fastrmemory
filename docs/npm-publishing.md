# FastrMemory NPM Publishing & Architecture Guide

> **Status (2026-10-28): 0.8.0 published.** The canonical unscoped package is **`fastrmemory@0.8.0`**, published **2026-10-28** from tag `v0.8.0` (`44b2d9a`) by GitHub Actions OIDC trusted publishing. `npm view fastrmemory version` returns `0.8.0`; `npm view fastrmemory dist-tags --json` returns `{"latest":"0.8.0"}`. The release workflow passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload. The npm tarball and GitHub Release asset both have SHA-256 `d40ab4467daa9bc24e2061ae86a20c3610277b9634ab242b5b7db6765e8b0ffc`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations. `0.7.2`, `0.7.1`, `0.7.0`, `0.6.0`, `0.5.0`, `0.4.0`, `0.3.1`, and `0.3.0` remain published historical versions. Do not republish `0.3.0` or either removed scoped entry; `NPM_TOKEN` is not used and the repository secret was removed after OIDC validation.

> **0.3.0 history:** `fastrmemory@0.3.0` was published on **2026-10-22 18:32 UTC** from tag `v0.3.0` (`50a7d8f`). Its npm README still points at the removed `@atifjubaer/fastrmemory@0.2.1`, which is why `0.3.1` exists.

> **0.2.1 history:** `@atifjubaer/fastrmemory@0.2.1` was published on **2026-10-22 16:51 UTC** from frozen tag `3fa2bf9` and removed from npm on **2026-10-23**. The earlier E401/E404 block is preserved below as history. The first `npm view` after publish returned E404 for about two minutes during registry propagation; it was not a failed publish. Do not republish `0.2.1`; npm rejects duplicates with E409.

This document explains why npm matters for FastrMemory, how the package is verified, and the publish protocol used for 0.2.1, 0.3.0, 0.3.1, 0.4.0, and the automated `0.5.0`, `0.6.0`, `0.7.0`, `0.7.1`, `0.7.2`, and `0.8.0` releases. The `0.8.0` publication evidence is documented below. The historical block section is retained for audit.

---

## What npm provides

1. **Registry distribution**
   - `npx -y fastrmemory@0.8.0 ui` is the canonical published command. `0.7.2`, `0.7.1`, `0.7.0`, `0.6.0`, `0.5.0`, `0.4.0`, and `0.3.1` remain available as historical releases.
   - Historical: `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr ui` worked until the scoped npm entry was removed on 2026-10-23.
   - The registry hosts the compressed tarball containing the compiled backend (`dist/`) and React dashboard (`dist-ui/`).

2. **Binary linking**
   - The `bin` map registers two shell commands:
     ```json
     "bin": {
       "fastrmemory": "bin/fastr-guard.mjs",
       "fastr": "bin/fastr-guard.mjs"
     }
     ```
   - The guard checks the Node runtime before importing the compiled CLI, so Node `< 22.16.0` gets a clear error instead of `ERR_UNKNOWN_BUILTIN_MODULE`.
   - npm creates the executable links on install.

3. **MCP runtime dependency**
   - FastrMemory uses the official `@modelcontextprotocol/server` package for the stdio MCP v2 server.

4. **Optional local model**
   - `@huggingface/transformers` is an **optional peer**, not a required dependency. It is installed only when local semantic embeddings are wanted.

5. **Build and verification**
   - `npm run build:core` compiles TypeScript.
   - `npm run build:ui` builds the React dashboard and writes the deterministic `dist-ui/build-manifest.json`.
   - `npm run check:ci` runs tests, isolation, skills, UI freshness, package-surface, docs, and benchmark checks.

---

## Release 0.8.0 (published 2026-10-28)

`fastrmemory@0.8.0` was published on **2026-10-28** from tag `v0.8.0` (`44b2d9a`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. The workflow passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload.

- `npm view fastrmemory version` -> `0.8.0`
- `npm view fastrmemory dist-tags --json` -> `{"latest":"0.8.0"}`
- `npm view fastrmemory@0.8.0 dist --json` -> 351 files, 3,124,675 bytes unpacked, shasum `9f75311c0fffda4b22e92bd587456b13bc6c4a03`, provenance attestation present
- GitHub Release asset `fastrmemory-0.8.0.tgz` -> 773,148 bytes, SHA-256 `d40ab4467daa9bc24e2061ae86a20c3610277b9634ab242b5b7db6765e8b0ffc`
- Clean registry install reports `0.8.0`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations

The release manifests agree at `0.8.0`: `package.json`, `package-lock.json`, `server.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/skills.json`, and `.cursor/skills/skills.json`. The plugin MCP args pin `fastrmemory@0.8.0`.

The release surface includes background static model pre-fetch (`fastr init --with-model`), automated VS Code / Cursor extension marketplace workflow, passive cognitive distillation (`fastr distill`), and bidirectional team memory sync (`fastr sync`). `0.7.2` and older remain published historical.

Registry listing is a separate, on-demand step: run **Actions → Publish to MCP Registry → Run workflow** with `v0.8.0` after the npm release is verified. It waits for `npm view fastrmemory@0.8.0 version`, verifies the `mcp-publisher` Sigstore bundle and SHA-256, authenticates with GitHub OIDC, publishes the root `server.json`, and polls the registry API until `io.github.atifjubaer/fastrmemory@0.8.0` appears.

## Release 0.7.2 (published 2026-10-28)

`fastrmemory@0.7.2` was published on **2026-10-28** from tag `v0.7.2` (`583223f`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. The workflow passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload.

- `npm view fastrmemory version` -> `0.7.2`
- `npm view fastrmemory dist-tags --json` -> `{"latest":"0.7.2"}`
- `npm view fastrmemory@0.7.2 dist --json` -> 343 files, 3,091,983 bytes unpacked, shasum `ba24a7aed40ed2966841c6c2e3d4d8894bf9273a`, provenance attestation present
- GitHub Release asset `fastrmemory-0.7.2.tgz` -> 764,699 bytes, SHA-256 `647e7a5facf8346ab96f053f79bc0cb207e264830c773e4421da772c7771093e`
- Clean registry install reports `0.7.2`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations

The release manifests agree at `0.7.2`: `package.json`, `package-lock.json`, `server.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/skills.json`, and `.cursor/skills/skills.json`. The plugin MCP args pin `fastrmemory@0.7.2`.

The release surface is the official Neural Synapse Core logo mark integration, clean title heading, and synced memory mirrors. `0.7.1` and older remain published historical.

Registry listing is a separate, on-demand step: run **Actions → Publish to MCP Registry → Run workflow** with `v0.7.2` after the npm release is verified. It waits for `npm view fastrmemory@0.7.2 version`, verifies the `mcp-publisher` Sigstore bundle and SHA-256, authenticates with GitHub OIDC, publishes the root `server.json`, and polls the registry API until `io.github.atifjubaer/fastrmemory@0.7.2` appears.

## Release 0.7.1 (published 2026-10-27)

`fastrmemory@0.7.1` was published on **2026-10-27** from tag `v0.7.1` (`31d8e12`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. The workflow passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload.

- `npm view fastrmemory version` -> `0.7.1`
- `npm view fastrmemory dist-tags --json` -> `{"latest":"0.7.1"}`
- `npm view fastrmemory@0.7.1 dist --json` -> 343 files, 3,091,818 bytes unpacked, shasum `8d5d4530582155ef55534d8e616a385e0ad1d95b`, provenance attestation present
- GitHub Release asset `fastrmemory-0.7.1.tgz` -> 764,638 bytes, SHA-256 `6d9044183fa0117be1a08d6ca44dcff0329ab89014581a743bf62979d2181ceb`
- Clean registry install reports `0.7.1`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations

The release manifests agree at `0.7.1`: `package.json`, `package-lock.json`, `server.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/skills.json`, and `.cursor/skills/skills.json`. The plugin MCP args pin `fastrmemory@0.7.1`.

The patch surface is the 64-bit memory and feedback ids, the `npm run soak` harness, and the documented linear recall cost. `0.7.0` and older remain published historical.

Registry listing is a separate, on-demand step: run **Actions → Publish to MCP Registry → Run workflow** with `v0.7.1` after the npm release is verified. It waits for `npm view fastrmemory@0.7.1 version`, verifies the `mcp-publisher` Sigstore bundle and SHA-256, authenticates with GitHub OIDC, publishes the root `server.json`, and polls the registry API until `io.github.atifjubaer/fastrmemory@0.7.1` appears.

## Release 0.7.0 (published 2026-10-27)

`fastrmemory@0.7.0` was published on **2026-10-27** from tag `v0.7.0` (`5512557`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. The workflow passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload.

- `npm view fastrmemory version` -> `0.7.0`
- `npm view fastrmemory dist-tags --json` -> `{"latest":"0.7.0"}`
- `npm view fastrmemory@0.7.0 dist --json` -> 343 files, 3,091,719 bytes unpacked, shasum `af5a7a438f553ffc08207e65b178fdf4344aef31`, provenance attestation present
- GitHub Release asset `fastrmemory-0.7.0.tgz` -> 764,560 bytes, SHA-256 `fb9ecea9b487edb4389598b5d514c5392d900d4a806f8b85a7ed065ec73058cc`
- Clean registry install reports `0.7.0`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations

The release manifests agree at `0.7.0`: `package.json`, `package-lock.json`, `server.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/skills.json`, and `.cursor/skills/skills.json`. The plugin MCP args pin `fastrmemory@0.7.0`.

The release surface is the code symbol index and declaration anchoring, per-turn memory injection, read-only recall, and self-verifying memories. The schema changes are additive only (`symbols`, `file_edits`, `memories.assertion`, `file_links.symbol_id` / `declaration_id`). `0.6.0` and older remain published historical.

Registry listing is a separate, on-demand step: run **Actions → Publish to MCP Registry → Run workflow** with `v0.7.0` after the npm release is verified. It waits for `npm view fastrmemory@0.7.0 version`, verifies the `mcp-publisher` Sigstore bundle and SHA-256, authenticates with GitHub OIDC, publishes the root `server.json`, and polls the registry API until `io.github.atifjubaer/fastrmemory@0.7.0` appears.

## Release 0.6.0 (published 2026-10-26)

`fastrmemory@0.6.0` was published on **2026-10-26** from tag `v0.6.0` (`a57a656`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. Release workflow run `40261328937` passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload.

- `npm view fastrmemory version` -> `0.6.0`
- `npm view fastrmemory dist-tags --json` -> `{"latest":"0.6.0"}`
- `npm view fastrmemory@0.6.0 dist --json` -> 319 files, 2,929,061 bytes unpacked, shasum `3a663105c678319cc539fe05b73ee7fe375a8115`, provenance attestation present
- GitHub Release asset `fastrmemory-0.6.0.tgz` -> 725,938 bytes, SHA-256 `17fc8071e5b2f715d5a79b0da542268606bf32dc37b034f5e8fa94c58f8e7a10`
- Clean registry install reports `0.6.0`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations

The release manifests all agree at `0.6.0`: `package.json`, `package-lock.json`, `server.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/skills.json`, and `.cursor/skills/skills.json`. The plugin MCP args pin `fastrmemory@0.6.0`.

The release surface is the deferred write path, the 12-tool MCP core profile, the optional static semantic reranker, aggregate and temporal retrieval, the cross-engine benchmark, and reversible hook installs. The schema change is additive only (three queue tables created on first open). `0.5.0` remains published historical.

Registry listing is a separate, on-demand step: run **Actions → Publish to MCP Registry → Run workflow** with `v0.6.0` after the npm release is verified. It waits for `npm view fastrmemory@0.6.0 version`, verifies the `mcp-publisher` Sigstore bundle and SHA-256, authenticates with GitHub OIDC, publishes the root `server.json`, and polls the registry API until `io.github.atifjubaer/fastrmemory@0.6.0` appears. See [mcp-registry-submission.md](mcp-registry-submission.md).

## Unattended release (tag-driven, no npm token)

The only publish trigger is a `v*` tag pushed to `origin`. `.github/workflows/release.yml`
checks out that tag, runs the full gate, audits production dependencies, packs the tarball,
installs it into a clean directory, publishes over npm OIDC trusted publishing with
provenance, verifies the registry, and creates the GitHub Release. No npm credential exists
on the machine or in the repository.

`npm run release` drives that chain end to end:

```bash
npm run release patch            # 0.6.0 -> 0.6.1
npm run release minor --registry # then dispatch publish-mcp.yml
npm run release 0.7.0 --dry-run
```

It refuses to run when the tree is dirty, the branch is not `main`, the tag already exists
locally or on `origin`, the requested version is not greater than `package.json`, or npm
already serves that version. It bumps `package.json`, `server.json` (both `version` and
`packages[0].version`), `.claude-plugin/plugin.json` (including the pinned `fastrmemory@X`
argument), `.claude-plugin/marketplace.json`, and `skills/skills.json`, then runs
`scripts/check-release-version.mjs` and `npm run check:ci` before committing.

| Flag | Effect |
|---|---|
| `--dry-run` | Print the plan; write, commit, and push nothing |
| `--skip-gate` | Skip the local `check:ci` (the workflow still runs it) |
| `--no-push` | Commit and tag locally, leave the push to the operator |
| `--registry` | Dispatch `publish-mcp.yml` once the npm release succeeds |
| `--co-author` | Append the Claude Code co-author trailer to the release commit |
| `--branch=NAME` | Branch that receives the commit and tag (default `main`) |

**Do not run `npm publish` locally.** The account is `auth-and-writes`, so it fails with
`EOTP` outside an interactive shell; it carries no provenance attestation; and it makes the
later tag run fail with `E409` because npm versions are immutable.

npm is also removing direct publish from 2FA-bypass granular access tokens, targeting
January 2027 (they reduce to staging a publish that a maintainer approves with 2FA), so OIDC
is the only durable unattended path. `scripts/publish-when-ready.mjs` remains a local-only
fallback for manual use and is not part of the release path.

## Release 0.5.0 (published 2026-10-23)

`fastrmemory@0.5.0` was published on **2026-10-23 15:20:41 UTC** from tag `v0.5.0` (`54a79ab`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. Release workflow run `39977196250` passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload.

- `npm view fastrmemory version` -> `0.5.0`
- `npm view fastrmemory dist-tags --json` -> `{"latest":"0.5.0"}`
- Registry shasum: `4f39d035dadbe48421f2a7f70a4a236fb7e21c3b`
- Registry integrity: `sha512-QUKT39MhQz7hFgFGj2S5VKtpGnsRohHIhc5sY1U31Jcv54pKOZoqx7unXg6h1nLttRhScoP/FkiUkofELK2qqg==`
- Tarball surface: 279 files, 658,738 bytes packed, 2,645,254 bytes unpacked
- GitHub Release asset SHA-256: `10420ed6c70e6db52984ad6b895949f0f1d849dff06e2cb9227b7b56540cfb0e`
- Clean registry install reports `0.5.0`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations

The release manifests all agree at `0.5.0`: `package.json`, `package-lock.json`, `server.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/skills.json`, and `.cursor/skills/skills.json`. The plugin MCP args pin `fastrmemory@0.5.0`.

The release surface is `fastr mcp init --source local`, with no schema migration. The tag-driven gate is `node scripts/check-release-version.mjs v0.5.0`, `npm run build:core`, `npm test`, and `npm run check:ci`. `0.4.0`, `0.3.1`, and `0.3.0` remain published historical versions.

## Release 0.4.0 (published 2026-10-23; historical)

`fastrmemory@0.4.0` was published on **2026-10-23 07:32:53 UTC** from tag `v0.4.0` (`bb365c2`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. Release workflow run `39918288792` passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload.

- `npm view fastrmemory version` -> `0.4.0`
- `npm view fastrmemory dist-tags --json` -> `{"latest":"0.4.0"}`
- Registry shasum: `26725f9eab1f31fd7f66398e12bb1b17c6593f31`
- Registry integrity: `sha512-jmc8TWC+wZyev4fuKjKctebv7eAzhRFB5sj97+ufoCS0b8DnHnrx37hAi9dmp0uOUP0hnhrP3q/oU7CkNTtJ8w==`
- Tarball surface: 275 files, 655,651 bytes packed, 2,631,280 bytes unpacked
- GitHub Release asset SHA-256: `b784e3e12b8a50deaee3b38dbc1f45c756bc37462f2d40433fdda5288cf554ad`
- Clean global install reports `0.4.0`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations

The release manifests all agree at `0.4.0`: `package.json`, `package-lock.json`, `server.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/skills.json`, and `.cursor/skills/skills.json`. The plugin MCP args pin `fastrmemory@0.4.0`.

The release surface is `fastr mcp init`, LF checkout enforcement, and documentation updates. There is no schema migration. The tag-driven gate is `node scripts/check-release-version.mjs v0.4.0`, `npm run build:core`, `npm test`, and `npm run check:ci`. `0.3.1` and `0.3.0` remain published historical versions.

## Release 0.3.1 (automated)

The release is tag-driven. The workflow is `.github/workflows/release.yml`:

1. Create the version commit and tag only after the full gate is green. If `package.json` is not already at the release version, run `npm version 0.3.1 --no-git-tag-version` first:
   ```powershell
   node scripts/check-release-version.mjs v0.3.1
   npm run build:core
   npm test
   npm run check:ci
   git add -A
   git commit -m "chore(release): prepare 0.3.1"
   git tag v0.3.1
   git push origin main --tags
   ```
2. The tag push runs the workflow. It checks out the tag, installs with `npm ci --ignore-scripts`, builds, runs `check:ci`, audits production dependencies, packs the tarball, installs it into a clean directory, publishes with `npm publish --provenance --access public`, verifies the registry, and creates the GitHub Release with the tarball and SHA-256 file.
3. The workflow uses npm Trusted Publishing (OIDC); no `NPM_TOKEN` is required. The npm package settings have a GitHub Actions trusted publisher for `atifjubaer` / `fastrmemory` / `release.yml`, with direct publish and dist-tag permissions. The workflow has `id-token: write`; the old `NPM_TOKEN` repository secret was deleted after the first successful OIDC publish.
4. Do not run `npm publish` manually for `0.3.1` unless the workflow is unavailable. The tag, npm version, `server.json`, plugin manifest, and pinned `fastrmemory@0.3.1` entry must agree; `scripts/check-release-version.mjs` enforces this before the gate.

### Published 0.3.1 evidence

| Check | Command | Output |
|---|---|---|
| Publish time | `npm view fastrmemory time --json` | `0.3.1`: `2026-10-22T23:02:38.532Z` |
| Publisher | `npm view fastrmemory@0.3.1 _npmUser` | `GitHub Actions <npm-oidc-no-reply@github.com>` |
| Version at publish time | `npm view fastrmemory@0.3.1 version` | `0.3.1` |
| Dist-tag at publish time | `npm view fastrmemory dist-tags --json` | `{"latest":"0.3.1"}` |
| Tarball | `npm view fastrmemory@0.3.1 dist.tarball` | `https://registry.npmjs.org/fastrmemory/-/fastrmemory-0.3.1.tgz` |
| Shasum | `npm view fastrmemory@0.3.1 dist.shasum` | `dfe5f0a2a61edad89dfc8529548488762a08ca8e` |
| Integrity | `npm view fastrmemory@0.3.1 dist.integrity` | `sha512-ACtxdyJdg0c2Bef7TE2g6Rp2xSB1P/Acbu80LhJlKkCfnK0WPIU2HkLEFj8qSob7hXat2QruVK64Wn3kNFn+3A==` |
| Files / unpacked | `npm view fastrmemory@0.3.1 dist.fileCount dist.unpackedSize` | `271`; `2599277` |
| Provenance | registry attestation API | 2 attestations: npm publish `publish/v0.1` and SLSA `provenance/v1` |
| GitHub asset | `gh release view v0.3.1 --json assets` | `fastrmemory-0.3.1.tgz`, 649,317 bytes, SHA-256 `747f61791dcb7c5694f3cf5cc8705152892a5b16cb33bec51a356fc22112a7b8` |
| Global install | `npm install -g fastrmemory@0.3.1` | `added 5 packages in 2s`; `fastr --version` = `0.3.1`; `fastrmemory --version` = `0.3.1` |
| One-shot CLI | fresh-cache `npx -y --package fastrmemory@0.3.1 fastr --version` | `0.3.1` |

Caveats: the package requires Node.js **>=22.16.0**; the release workflow run is [39868908223](https://github.com/atifjubaer/fastrmemory/actions/runs/39868908223); a local Windows `npm pack` can differ in bytes because of line endings and archive metadata. A stale npx cache can return an older version, so use the exact version and a fresh cache when verifying.

The workflow deliberately uses a release tarball for the GitHub asset. Do not advertise `npm install -g git+https://...` under npm 11: the `prepare` build does not receive dev dependencies.

## Release 0.3.0 (historical)

The unscoped package was published and was the `latest` npm release:

- **Tag and CI:** `v0.3.0` points to `50a7d8f` (merged PR #13); CI run `39831793263` is 6/6 green on that commit.
- **Publish:** `npm publish --access public` returned `+ fastrmemory@0.3.0`; the registry timestamp is **2026-10-22 18:32:58 UTC**.
- **Tarball:** 647,903 bytes packed, 270 files, 2,598,164 bytes unpacked; shasum `e17af4f854bd9231e1f4b3a8efb04d3e5b65f8e2`; integrity `sha512-a3Ruf9iqf+u+XnR/3oIUThyac6CHgGJDuDM8rAuFipJRMSYjhSAfWe6/NhLDcStBsFflskdIjlwY9YtvBnwbRw==`.
- **Global install:** `npm install -g fastrmemory@0.3.0` added 5 packages in 2 s; `fastr --version` and `fastrmemory --version` both return `0.3.0`.
- **One-shot:** `npx -y fastrmemory@0.3.0 --version` returns `0.3.0` from a neutral directory.
- **Scoped history:** `npm view @atifjubaer/fastrmemory version` returned `0.2.1`; that release was removed on 2026-10-23, and its GitHub tag remains at `3fa2bf9`.
- **Caveat:** `0.3.0` was `latest` until `0.3.1` published; both remain on npm. Pin the exact version for reproducible installs.
- **Operational note:** the publish shell was non-interactive and could not complete npm's OTP prompt. A 7-day granular token with 2FA bypass was created, used only for this publish, deleted immediately, and the original `.npmrc` login was restored. Treat that as an exception, not the default; prefer an interactive `npm publish --otp` or staged publishing.

| Check | Command | Output |
|---|---|---|
| Identity | `npm whoami` | `atifjubaer` |
| Version | `npm view fastrmemory version` | `0.3.0` |
| Dist-tag | `npm view fastrmemory dist-tags --json` | `{"latest":"0.3.0"}` |
| Tarball | `npm view fastrmemory dist.tarball` | `https://registry.npmjs.org/fastrmemory/-/fastrmemory-0.3.0.tgz` |
| Shasum | `npm view fastrmemory dist.shasum` | `e17af4f854bd9231e1f4b3a8efb04d3e5b65f8e2` |
| Integrity | `npm view fastrmemory dist.integrity` | `sha512-a3Ruf9iqf+u+XnR/3oIUThyac6CHgGJDuDM8rAuFipJRMSYjhSAfWe6/NhLDcStBsFflskdIjlwY9YtvBnwbRw==` |
| Files / unpacked | `npm view fastrmemory@0.3.0 dist.fileCount dist.unpackedSize` | `270`; `2598164` |
| Global install | `npm install -g fastrmemory@0.3.0` | `added 5 packages in 2s` |
| CLI version | `fastr --version` | `0.3.0` |
| One-shot CLI | `npx -y fastrmemory@0.3.0 --version` | `0.3.0` |
| Publish output | `npm publish --access public` from `50a7d8f` | `+ fastrmemory@0.3.0` |

## Release 0.2.1

The 0.2.1 GitHub release is attached and the tarball is verified:

- `npm pack` produced `atifjubaer-fastrmemory-0.2.1.tgz` at **591,204 bytes**.
- SHA-256: `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`.
- Clean install in an empty temp project: **1.93 s**, **16,493,075 bytes** in `node_modules`; `fastr --version` and `fastrmemory --version` both report `0.2.1`; `fastr mcp --help` lists `--profile`.
- npm published `@atifjubaer/fastrmemory@0.2.1` on **2026-10-22 16:51 UTC** and removed it on **2026-10-23**; access status was `public` while it existed.
- The removed npm tarball was **591.4 kB packed / 2.3 MB unpacked / 220 files**, shasum `352abba135ce1b0921cacbcdf9b7efd2abfc4802`, integrity `sha512-vl51HU0V7BvJ7+ctDMjumDRAt6+5ylvFJYeRPDViM2K4Li0j9fdNIPaF9IILWKdMZwP/wVDQCbM812V+iv3AVA==`. It was not byte-identical to the GitHub asset; both reported `0.2.1`.

The v0.2.1 GitHub Release asset is attached at
`https://github.com/atifjubaer/fastrmemory/releases/tag/v0.2.1` (created
2026-10-21 from `3fa2bf9`; CI 6/6 green on that commit).

## Install paths

Canonical published 0.5.0 release:

```bash
# Global CLI (latest is 0.5.0):
npm install -g fastrmemory
fastr --version

# Exact release:
npm install -g fastrmemory@0.5.0

# One-shot run from a neutral directory:
npx -y fastrmemory@0.5.0 --version
```

The matching GitHub Release asset is the safest fallback when npm is unavailable or a global Git install is blocked:

```bash
curl -L -o fastrmemory-0.5.0.tgz \
  https://github.com/atifjubaer/fastrmemory/releases/download/v0.5.0/fastrmemory-0.5.0.tgz
npm install -g ./fastrmemory-0.5.0.tgz
fastr --version
```

The previous `0.4.0` tarball remains available at
`https://github.com/atifjubaer/fastrmemory/releases/download/v0.4.0/fastrmemory-0.4.0.tgz`.
The `0.3.1` tarball remains available at
`https://github.com/atifjubaer/fastrmemory/releases/download/v0.3.1/fastrmemory-0.3.1.tgz`.

The historical 0.2.1 npm package was removed on 2026-10-23. Use its GitHub Release fallback below for that release.

Byte-verified GitHub Release fallback:

```bash
# Local project install:
npm install https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
npx fastr --version

# Global CLI:
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
fastr --version
```

The v0.2.1 GitHub asset is 591,204 bytes with SHA-256
`78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`.
The release-URL clean-install check reported `npx fastr --version` = `0.2.1`
and 16,493,121 bytes in `node_modules` in 8.35 s. The removed registry tarball
was a separate pack and was not byte-identical.

The older v0.2.0 asset remains available at
`https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz`
(571,279 bytes, SHA-256
`12B7D49546D6B904A2296724490E4D6EECE313514DA6C4BFDA6950137F309ED7`).

Source install remains available for development:

```bash
npx --yes github:atifjubaer/fastrmemory#v0.5.0 setup
npx --yes github:atifjubaer/fastrmemory#v0.5.0 ui
```

Global and local installs should use the npm package or the release tarball.
A global git install with npm 11 does not install the dev dependencies needed
by the `prepare` build.

See [CLAIMS.md](../CLAIMS.md) for the evidence rows.

---

## Historical registry block (resolved 2026-10-22)

Run these commands from the repository root:

```powershell
npm whoami
npm view @atifjubaer/fastrmemory version
```

Observed on 2026-10-21 01:51 UTC:

```text
npm error code E401
npm error 401 Unauthorized - GET https://registry.npmjs.org/-/whoami

npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/@atifjubaer%2ffastrmemory - Not found
```

Resolved on 2026-10-22: `npm whoami` returned `atifjubaer`, the 0.2.1 publish completed, and `npm view fastrmemory version` now returns `0.5.0`. The scoped 0.2.1 entry was removed on 2026-10-23. Do not disable account 2FA or force a publish while the account is blocked. The current 0.5.0 release uses GitHub Actions OIDC trusted publishing; no long-lived token is required. The token notes below are historical.

---

## Manual publish protocol (historical 0.3.0 example; use the workflow for 0.5.0)

The automated release workflow above is the primary path. This manual sequence is retained for audit and as a fallback; substitute the current tag and version when following it.

1. **Authenticate interactively**
   ```powershell
   npm login
   ```
   Complete the browser/2FA prompt. If the shell is non-interactive and cannot
   complete the prompt, use the narrowest short-lived token with publish rights,
   delete it immediately after publishing, and restore the interactive login.
   Do not disable account 2FA or leave a bypass token in place.

2. **Check out the release tag (the 0.2.1 history used `v0.2.1`)**
   ```powershell
   git fetch --tags
   git checkout v0.3.0
   git rev-parse --short HEAD
   git status --porcelain
   ```
   Expected: `50a7d8f` and an empty status. Do not publish from a feature
   branch; the release must be reproducible from the tag.

3. **Verify identity**
   ```powershell
   npm whoami
   ```
   Expected output: `atifjubaer`.

4. **Install and re-run the full local gate on the frozen tree**
   ```powershell
   npm ci
   npm --prefix ui ci
   npm run check:ci
   ```

5. **Publish from the frozen tree**
   ```powershell
   npm publish --access public
   ```
   `prepublishOnly` runs `build:core`, `npm test`, `check:dist-ui`, and
   `check:package`; it does not rebuild the tracked UI bundle. Run
   `npm run build:ui` first only when the UI source actually changed.

6. **Verify the registry result from a neutral directory**
   ```powershell
   npm view fastrmemory version
   npx -y fastrmemory@0.3.0 --version
   ```
   Both had to report `0.3.0` before the 0.3.0 install claim was published. A
   first E404 for 2-3 minutes is registry propagation; wait and retry, do
   not republish. Run the `npx` check outside the release tree so local
   resolution cannot mask a registry failure. The historical scoped
   commands no longer work after the 2026-10-23 removal.

7. **Clear the local login when finished**
   ```powershell
   npm logout
   ```
   Skip this only when the machine is trusted and another publish is
   intentionally planned.

The automated assistant is optional and must be run from the same frozen tree:

```powershell
node scripts/publish-when-ready.mjs
```

It checks `npm whoami` and runs the same publish flow. It must not bypass 2FA.

---

## Published result (0.2.1, historical)

| Check | Command | Output |
|---|---|---|
| Identity | `npm whoami` | `atifjubaer` |
| Version | `npm view @atifjubaer/fastrmemory version` | `0.2.1` |
| Tarball | `npm view @atifjubaer/fastrmemory dist.tarball` | `https://registry.npmjs.org/@atifjubaer/fastrmemory/-/fastrmemory-0.2.1.tgz` |
| Shasum | `npm view @atifjubaer/fastrmemory dist.shasum` | `352abba135ce1b0921cacbcdf9b7efd2abfc4802` |
| Integrity | `npm view @atifjubaer/fastrmemory dist.integrity` | `sha512-vl51HU0V7BvJ7+ctDMjumDRAt6+5ylvFJYeRPDViM2K4Li0j9fdNIPaF9IILWKdMZwP/wVDQCbM812V+iv3AVA==` |
| Access | `npm access get status @atifjubaer/fastrmemory` | `@atifjubaer/fastrmemory: public` |
| One-shot CLI | `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version` | `0.2.1` (historical) |
| Publish output | `npm publish --access public` from `3fa2bf9` | `+ @atifjubaer/fastrmemory@0.2.1`; 591.4 kB packed / 2.3 MB unpacked / 220 files |
| Removal | `npm view @atifjubaer/fastrmemory version` on 2026-10-23 | `E404` |

At the time of the 0.2.1 release `latest` was `0.2.1`, and it is now `0.5.0`;
the old scoped entry and the `0.0.0-stage` placeholder were removed on
2026-10-23. Use an exact version for reproducible installs. The first
`npm view` after the 0.2.1 publish returned E404 for about two minutes during
propagation; the retry succeeded.

---

## Package verification

| Check | Command |
|---|---|
| Full local gate | `npm run check:ci` |
| Package surface | `npm run check:package` |
| UI freshness | `npm run check:dist-ui` |
| Tarball contents | `npm pack --dry-run --json --ignore-scripts` |
| Clean install | `npm install <tarball> --ignore-scripts` in an empty temp project |
| CLI version | `node bin/fastr-guard.mjs --version` |
| Registry metadata | `npm view fastrmemory version dist.tarball dist.integrity` |
| Historical registry metadata (now E404) | `npm view @atifjubaer/fastrmemory version dist.tarball dist.integrity` |
| Registry one-shot | `npx -y fastrmemory@0.5.0 --version` |
| Historical one-shot (removed) | `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version` |

The package check enforces `mcpName`, bin paths, exports, the files allowlist,
absence of tests/docs/databases, and the 5 MB tarball gate. The UI manifest
records normalized hashes so Windows and Linux checkouts agree.
