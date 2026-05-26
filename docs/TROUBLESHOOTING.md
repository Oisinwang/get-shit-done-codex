# Troubleshooting

Use this page when installation succeeds but the runtime does not behave as expected. Prefer the recovery steps here before opening a bug report.

## Codex stops responding after install

If Codex warns about `~/.codex/config.toml` after a fresh install, check whether the file contains an old flat hooks block:

```toml
[[hooks]]
event = "SessionStart"
command = "~/.codex/hooks/gsd-check-update.js"
```

That flat `[[hooks]]` block is not the Codex-first hook shape this fork now writes. The expected shape is:

```toml
[features]
hooks = true

[[hooks.SessionStart]]
matcher = "*"

[[hooks.SessionStart.hooks]]
command = "~/.codex/hooks/gsd-check-update.js"
```

The important marker is `[features].hooks = true` plus nested `[[hooks.SessionStart]]` entries, not a top-level `[[hooks]]` array.

Recovery:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --global
```

Then restart Codex and run:

```bash
$gsd-help
```

If the warning remains, remove only the old GSD-owned flat `[[hooks]]` block and rerun the installer. Do not delete unrelated user configuration.

## Commands are not found after install

Check the install location:

- Global Codex install: `~/.codex/skills/gsd-*/SKILL.md`
- Local Codex install: `./.codex/skills/gsd-*/SKILL.md`
- Legacy Claude compatibility install: `~/.claude/skills/` or `./.claude/skills/`

Then run:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --global
```

For local project installs, run:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Restart the runtime after reinstalling.

## Windows PowerShell path confusion

On Windows, PowerShell may display `~` paths differently from the expanded filesystem path. To inspect the Codex config directly:

```powershell
notepad "$env:USERPROFILE\.codex\config.toml"
```

For local installs, inspect the current repository:

```powershell
Get-ChildItem .\.codex -Recurse | Select-Object -First 20 FullName
```

## npm page looks stale

The repository may be ahead of the npm package when a release workflow is waiting for maintainer secrets. The source checkout on `codex/bootstrap` is the authoritative development state. The npm package is refreshed by the hotfix release workflow after `NPM_TOKEN` is configured in the `npm-publish` environment.

## Still blocked

Open an issue with:

- Runtime and install command
- Operating system and shell
- Node.js version
- Exact warning or error text
- Relevant `config.toml` snippet with secrets removed

For setup questions without a reproducible bug, use GitHub Discussions instead.
