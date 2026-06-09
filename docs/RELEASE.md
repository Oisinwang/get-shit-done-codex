# Release Checklist

Use this checklist when source fixes are ready but users still install an older package through `npx @latest`. The current pending example is Issue #1: the `config.toml` hook fix is in source, but the published npm package is still older until a real hotfix publish completes.

## Required maintainer setup

Only a maintainer with repository settings access can unblock npm publishing.

1. Create or confirm an npm automation token that can publish `@oisinwang/get-shit-done-codex`.
2. In GitHub, open Settings > Environments > `npm-publish`.
3. Add a secret named exactly `NPM_TOKEN`.
4. Keep required reviewers enabled if you want manual approval before publishing.
5. Confirm the workflow can request provenance with `id-token: write`.

The release and Hotfix Release workflows fail before publishing when `NPM_TOKEN` is missing. That is intentional: dry runs can validate packaging, but they do not update `latest`.

## Preflight checks

Run these before starting a release or hotfix:

```powershell
git status --short
npm.cmd run check:release-state
npm.cmd view @oisinwang/get-shit-done-codex version dist-tags time --json
npm.cmd test
npm.cmd pack --dry-run
```

`check:release-state` fails when the current package version is already published but `CHANGELOG.md` still has package-facing `[Unreleased]` entries. That means the source tree needs a new hotfix or release version before it can update `@latest`.

Use the npm metadata output to confirm whether `latest` is stale. Do not close a `pending release` issue until the published timestamp and version prove the fix is live.

## Patch hotfix flow

Use the Hotfix Release workflow for patch versions such as `1.37.3`.

Create the hotfix branch:

```bash
gh workflow run hotfix.yml --repo Oisinwang/get-shit-done-codex --ref codex/bootstrap -f action=create -f version=<next-patch> -f dry_run=false
```

Then check out `hotfix/<next-patch>`, apply only the source fix needed for the patch, and push that branch. For Issue #1, cherry-pick the installer/config fix rather than unrelated documentation or launch-surface changes.

Finalize the hotfix:

```bash
gh workflow run hotfix.yml --repo Oisinwang/get-shit-done-codex --ref codex/bootstrap -f action=finalize -f version=<next-patch> -f dry_run=false
```

The finalize job installs dependencies, runs coverage, verifies npm authentication, tags the release, publishes to npm as `latest`, creates the GitHub release, updates the `next` dist-tag, verifies the published version, and attempts a back-merge PR.

## Normal release flow

Use the Release workflow for minor or major versions ending in `.0`.

1. Run `create` for the target version.
2. Run `rc` as many times as needed to publish `next` pre-releases.
3. Run `finalize` when the release branch is ready for `latest`.

Use `dry_run=true` to validate packaging without publishing. Use `dry_run=false` only after `NPM_TOKEN` is configured and the package contents have been reviewed.

## Publish verification

After the workflow reports success, verify the public install path from a clean directory:

```powershell
npm.cmd view @oisinwang/get-shit-done-codex version dist-tags time --json
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

For the pending config hook bug, inspect the generated Codex config and confirm the GSD-owned hooks are canonical:

```toml
[features]
hooks = true

[[hooks.SessionStart]]
matcher = ""

[[hooks.SessionStart.hooks]]
command = "~/.codex/hooks/gsd-check-update.js"
```

If verification passes, comment on the issue with the npm version, publish timestamp, workflow run URL, and install check. Then remove `pending release` and close the issue.

## Failure handling

- Missing `NPM_TOKEN`: configure the secret in the `npm-publish` environment, then rerun the workflow with `dry_run=false`.
- `npm whoami` fails: replace the npm token with one that has publish rights for the scoped package.
- `npm publish --dry-run` fails: fix the package contents or build step before publishing.
- Publish verification cannot find the version: wait briefly for registry propagation, rerun the `npm.cmd view` check, then inspect the workflow logs.
- Back-merge PR creation fails: create a PR manually from `hotfix/<next-patch>` or `release/<version>` back to `codex/bootstrap`.
