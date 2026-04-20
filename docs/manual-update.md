# Manual Update And Source Install

Use this procedure when you want the verified install path for this fork.

As of `v1.37.1-codex.1`, the public branch is `codex/bootstrap`, and the source installer is the release-aligned path. The `get-shit-done-codex` npm package name exists, but the registry package is not yet aligned with this fork's current public branch.

## Prerequisites

- Node.js installed
- This repo cloned locally:

```bash
git clone https://github.com/Oisinwang/get-shit-done-codex.git
cd get-shit-done-codex
git checkout codex/bootstrap
```

## Verified Paths

| Path | Status | Outcome |
|---|---|---|
| `node bin/install.js --codex --local` | Verified | Creates `./.codex/` |
| `node bin/install.js --claude --local` | Verified compatibility | Creates `./.claude/` |
| `npx get-shit-done-codex@latest --codex --local` | Not release-aligned | Registry package currently resolves to an older CLI surface |

Install alone does not generate `AGENTS.md`. In this fork, `AGENTS.md` is the primary instruction contract, but it is generated or updated later by project bootstrap and profile flows.

## Fresh Source Install

```bash
npm install
npm run build:hooks
node bin/install.js --codex --local
```

Use `--global` instead of `--local` if you want the install under `~/.codex/`.

## Update An Existing Source-Based Install

```bash
git pull --rebase origin codex/bootstrap
npm install
npm run build:hooks
node bin/install.js --codex --global
```

Restart your runtime after the install so commands, agents, and hooks are reloaded.

## Runtime Flags

Replace `--codex` with the runtime you actually want:

| Runtime | Flag | Status in this fork |
|---|---|---|
| Codex | `--codex` | primary |
| Claude Code | `--claude` | compatibility / migration |
| Gemini CLI | `--gemini` | supported |
| OpenCode | `--opencode` | supported |
| Kilo | `--kilo` | supported |
| Copilot | `--copilot` | supported |
| Cursor | `--cursor` | supported |
| Windsurf | `--windsurf` | supported |
| Augment | `--augment` | supported |
| Antigravity | `--antigravity` | supported |
| Trae | `--trae` | supported |
| Qwen Code | `--qwen` | supported |
| CodeBuddy | `--codebuddy` | supported |
| Cline | `--cline` | supported |
| All runtimes | `--all` | supported |

## What The Installer Replaces

The installer performs a clean wipe-and-replace of GSD-managed directories for the target runtime only.

For Codex, that means the managed surfaces under `~/.codex/` or `./.codex/`, including:

- `get-shit-done/`
- runtime-specific generated agents
- managed hooks
- managed skills

For Claude compatibility installs, the same rule applies under `~/.claude/` or `./.claude/`.

What is preserved:

- Custom agents not prefixed with `gsd-`
- Custom commands outside the GSD-managed command directory
- Existing `AGENTS.md` / `CLAUDE.md` project files
- Custom hooks outside the managed GSD set

Locally modified GSD files are backed up to `gsd-local-patches/` before install. Reapply them after updating only if you intentionally maintain local fork-specific changes on top of the new version.
