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

## Runtime restart or command discovery

If installation succeeds and GSD files exist but `$gsd-help` or other `$gsd-*` commands do not appear, Codex may keep an in-memory command and skill index from before the install. Confirm the files are present before reinstalling again.

For a global Windows Codex install:

```powershell
Get-ChildItem "$env:USERPROFILE\.codex\skills" -Recurse -Filter SKILL.md | Select-Object -First 20 FullName
```

For a local project install:

```powershell
Get-ChildItem ".\.codex\skills" -Recurse -Filter SKILL.md | Select-Object -First 20 FullName
```

Then fully restart the runtime:

1. Close every Codex window or terminal session that was open before the install.
2. Open Codex from the same shell and repository where you installed GSD.
3. Run `$gsd-help`.

If the files exist but commands still do not appear after a full restart, rerun the installer with the intended scope and include the command-discovery checks when opening an issue.

## Windows PowerShell path confusion

On Windows, PowerShell may display `~` paths differently from the expanded filesystem path. To inspect the Codex config directly:

```powershell
notepad "$env:USERPROFILE\.codex\config.toml"
```

For local installs, inspect the current repository:

```powershell
Get-ChildItem .\.codex -Recurse | Select-Object -First 20 FullName
```

## WSL and Windows shell path mismatch

Windows PowerShell and WSL use different home directories. A GSD install from PowerShell writes to `C:\Users\<you>\.codex` for global installs, while a GSD install from WSL writes to `/home/<you>/.codex`. If Codex starts in one shell but the installer ran in the other shell, commands can look missing even though installation succeeded.

Check which environment owns the current session before reinstalling.

In Windows PowerShell:

```powershell
$env:USERPROFILE
where.exe node
where.exe npm
Test-Path "$env:USERPROFILE\.codex"
Test-Path ".\.codex"
```

In WSL:

```bash
pwd
echo "$HOME"
which node || true
which npm || true
which npx || true
ls -la "$HOME/.codex"
test -d ./.codex && find ./.codex -maxdepth 2 -type f | head
```

Run the installer from the same shell that starts Codex. For a project-local trial inside WSL, run:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Use `--global` only when the Codex runtime you actually start reads that shell's home directory. Do not copy `.codex/` between Windows and WSL unless your repository policy already treats that directory as shared project state.

## Windows PowerShell blocks npm.ps1

If PowerShell reports `npm.ps1 cannot be loaded because running scripts is disabled`, the Node install may still be fine. PowerShell is blocking the shim script, not necessarily npm itself.

Use the `.cmd` shims from the same terminal:

```powershell
node --version
npm.cmd --version
npx.cmd --version
npm.cmd view @oisinwang/get-shit-done-codex version
```

Then rerun the installer with `npx.cmd`:

```powershell
npx.cmd @oisinwang/get-shit-done-codex@latest --codex --local
```

Use `--global` instead of `--local` only when you want to update the user-level Codex install under `$env:USERPROFILE\.codex`. You do not need to change PowerShell execution policy just to run these diagnostics.

## Corporate proxy or certificate failures

Corporate networks can intercept TLS or require a proxy before npm can reach the registry. Common npm symptoms include `SELF_SIGNED_CERT_IN_CHAIN`, `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, `ECONNRESET`, `ETIMEDOUT`, or repeated registry fetch retries.

Collect npm network settings before changing them:

```bash
npm config get registry
npm config get proxy
npm config get https-proxy
npm config get cafile
npm config get strict-ssl
npm ping --registry=https://registry.npmjs.org/
npm view @oisinwang/get-shit-done-codex version --registry=https://registry.npmjs.org/
```

If your organization provides an npm proxy or certificate authority file, configure the values your IT team gives you, then rerun:

```bash
npm ping
npm view @oisinwang/get-shit-done-codex version
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Do not use `npm config set strict-ssl false` as the first fix. Disabling TLS validation can hide a real network or certificate problem. If you must use it temporarily for diagnosis, reset it before installing tools you intend to keep:

```bash
npm config set strict-ssl true
```

## Stale npm cache or partial install

If `npx @oisinwang/get-shit-done-codex@latest` keeps running an older package, exits midway, or reports files missing after an interrupted install, verify the npm cache and force a fresh package execution before deleting project files.

Start with read-only checks:

```bash
npm cache verify
npm view @oisinwang/get-shit-done-codex version
npm view @oisinwang/get-shit-done-codex dist-tags
```

Then run the package through `npm exec`, which makes the requested package version explicit:

```bash
npm exec --yes --package @oisinwang/get-shit-done-codex@latest get-shit-done-codex -- --codex --local
```

For a global Codex reinstall, use the same form with `--global`:

```bash
npm exec --yes --package @oisinwang/get-shit-done-codex@latest get-shit-done-codex -- --codex --global
```

Use cache clean only after cache verify or a fresh exec still fails:

```bash
npm cache clean --force
npm exec --yes --package @oisinwang/get-shit-done-codex@latest get-shit-done-codex -- --codex --local
```

Do not remove `.codex/`, `AGENTS.md`, or `.planning/` as a cache fix. Those are project or runtime artifacts, not npm cache entries.

## Windows PowerShell first-pass diagnostics

When an install fails on Windows, collect read-only evidence before repairing anything. Start with toolchain versions and the package metadata PowerShell can see:

```powershell
node --version
npm --version
npx --version
npm view @oisinwang/get-shit-done-codex version
```

If `npm` or `npx` fails with a PowerShell script policy error, use the `npm.cmd` / `npx.cmd` commands above.

Then inspect the Codex surfaces without changing files:

```powershell
Get-ChildItem "$env:USERPROFILE\.codex" -Force | Select-Object Name,Mode,LastWriteTime
Test-Path ".\.codex"
Get-ChildItem ".\.codex" -Recurse -Force -ErrorAction SilentlyContinue | Select-Object -First 30 FullName
```

Do not delete or rewrite files before reading this output. If Node, npm, npx, and the scoped package metadata are visible, rerun the installer with the intended scope:

```powershell
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Use `--global` instead of `--local` only when you want to update the user-level Codex install under `$env:USERPROFILE\.codex`.

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
