# Promotion Assets

## One-Line Positioning

An independent Codex-first fork of GSD with a verified scoped npm package, Codex-native project semantics, and release-facing docs built around `AGENTS.md`, `.codex/`, and `$gsd-*`.

## 50-Word Summary

This fork takes GSD and makes Codex the release-facing default. `AGENTS.md`, `.codex/`, `agents_md_path`, `generate-agents-*`, and `~/.codex/sessions` are the primary semantics. The verified install path is `npx @oisinwang/get-shit-done-codex@latest`; legacy Claude-era names remain only as migration shims.

## GitHub Social Preview

Use `assets/social-preview.png` as the repository social preview image.

Manual upload path:

1. Open the GitHub repository.
2. Go to Settings > General > Social preview.
3. Click Edit, then Upload an image.
4. Upload `assets/social-preview.png`.

The image is a solid-background PNG at 1280 x 640 pixels and must stay under 1 MB. That follows GitHub's current recommendation for best display quality: <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview>.

Suggested caption and alt text:

Social preview caption: Get Shit Done Codex, a Codex-first workflow system for planned, resumable, verified AI coding.

Terminal preview caption: verified `npx` install plus `$gsd-help` discovery for Codex users.

> Get Shit Done Codex: Codex-first workflows for planned, resumable, verified AI coding.

## Launch Post Bullets

- Codex-first semantics are now the primary public contract.
- Legacy Claude naming remains only as a migration shim.
- The default public branch and scoped npm release are live.
- Verified install path: `npx @oisinwang/get-shit-done-codex@latest`.
- README, package metadata, issue templates, and release workflows point at this fork.

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

- Verified install path: `npx @oisinwang/get-shit-done-codex@latest`
- Verified development path: source checkout on `codex/bootstrap`
- Verified compatibility: source-based Claude local install for migration
- Avoid promoting unscoped npm names for this fork
