# Promotion Assets

## One-Line Positioning

An independent Codex-first fork of GSD that treats `AGENTS.md`, `.codex/`, and `$gsd-*` as the primary workflow contract.

## 50-Word Summary

This fork takes upstream GSD and makes Codex the release-facing default. `AGENTS.md`, `.codex/`, `agents_md_path`, `generate-agents-*`, and `~/.codex/sessions` are the primary semantics. Legacy Claude-era names still work only as migration shims, so existing installs can move forward without making Claude-first naming the public story.

## Launch Post Bullets

- Codex-first semantics are now the primary public contract.
- Legacy Claude naming remains only as a migration shim.
- The default public branch and first fork release are live on GitHub.
- Source-based Codex install is the verified path for the current public branch.

## Why Not Upstream?

Upstream supports Codex, but this fork makes Codex the primary semantic contract instead of treating it as one runtime among many.

## Who This Is For

- Codex users who want `AGENTS.md`, `.codex/`, and `$gsd-*` to be the first-class default.
- Users migrating from older Claude-based GSD installs who still need compatibility during the transition.
- Developers who want a public fork whose docs, defaults, and release story all point at Codex-first semantics.

## Compatibility Still Kept

- `claude_md_path`
- `generate-claude-md`
- `generate-claude-profile`
- legacy `.claude/` install paths where they are explicitly documented as migration-only

## Install Positioning

- Verified now: source checkout on `codex/bootstrap`
- Verified compatibility: source-based Claude local install for migration
- Not yet release-aligned: `npx get-shit-done-codex@latest`
