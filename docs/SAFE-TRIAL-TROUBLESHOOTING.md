# Safe Trial Troubleshooting

Use this page when a safe local trial gets stuck before you can decide whether to keep GSD. Start with read-only checks, keep setup files separate from product code, and use the full [Troubleshooting](TROUBLESHOOTING.md) guide for deeper install recovery.

## Quick checks

Run these from the trial repository or sandbox:

```bash
git status --short
git diff --stat
git branch --show-current
```

Expected setup files for a local Codex trial are `.codex/`, `AGENTS.md`, and `.planning/`. Product code changes should appear separately, and only when you ran a workflow that edited product code.

## Commands are missing

If `$gsd-help` or other `$gsd-*` commands do not appear after install:

1. Confirm the local install files exist under `./.codex/skills/`.
2. Close every Codex window or terminal that was open before the install.
3. Reopen Codex from the same repository and shell.
4. Run `$gsd-help` again.

If commands are still missing, use [Commands are not found after install](TROUBLESHOOTING.md#commands-are-not-found-after-install) and [Runtime restart or command discovery](TROUBLESHOOTING.md#runtime-restart-or-command-discovery) before opening an issue.

## Unexpected files changed

If `git status --short` shows more than `.codex/`, `AGENTS.md`, and `.planning/`:

1. Run `git diff --stat`.
2. Separate setup files from product files.
3. Check whether you ran `$gsd-fast`, `$gsd-quick`, `$gsd-execute-phase`, or another workflow that can edit product code.
4. Do not commit the whole list until you can explain each path.

Use [Safe Trial Discussion Starter](SAFE-TRIAL-DISCUSSION.md) if you want advice on which files to keep.

## Local versus global install confusion

Use `--local` for trial branches, team-visible repository setup, and disposable evaluations:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Use `--global` only when you want to update your user-level Codex setup under `~/.codex/`:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --global
```

If you ran the wrong scope, do not delete files blindly. Review `git status --short`, then keep or discard only the setup files you understand.

## npm or Node.js failure

If the install command fails before GSD starts, verify the shell can see Node.js and npm:

```bash
node --version
npm --version
npx --version
```

On Windows PowerShell, if script execution policy blocks `npm.ps1` or `npx.ps1`, try the `.cmd` shim from the same shell:

```powershell
npx.cmd @oisinwang/get-shit-done-codex@latest --codex --local
```

Use [Windows PowerShell first-pass diagnostics](TROUBLESHOOTING.md#windows-powershell-first-pass-diagnostics) for the longer Windows checklist.

## Stale npm cache

If `npx @latest` keeps running an older package or exits after a partial install, use the cache-safe path from the full troubleshooting guide:

```bash
npm cache verify
npm exec --yes --package @oisinwang/get-shit-done-codex@latest get-shit-done-codex -- --codex --local
```

Use [Stale npm cache or partial install](TROUBLESHOOTING.md#stale-npm-cache-or-partial-install) before deleting project files.

## When to ask in Discussions

Use GitHub Discussions when:

- You are deciding whether to keep the setup.
- Commands installed but you are unsure which workflow to run next.
- Changed paths look surprising but you do not have a minimal reproduction yet.
- You want workflow advice after filling `SAFE-TRIAL-OUTCOME.md`.

The [Safe Trial Discussion Starter](SAFE-TRIAL-DISCUSSION.md) gives you a copy-pastable post with commands, changed paths, decision notes, and a privacy check.

## When to open an issue

Open an issue when you have a reproducible bug, stale documentation, or a concrete feature proposal. Include:

- Exact install command.
- Exact error text.
- Operating system and shell.
- Node.js version.
- GSD package version or `npm view @oisinwang/get-shit-done-codex version`.
- Sanitized `git status --short` and `git diff --stat`.

Do not paste tokens, private repository names, proprietary source, customer data, usernames, or local paths that should stay private.
