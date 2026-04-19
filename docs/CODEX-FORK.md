# Codex-First Fork Notes

This repository is the independent Codex-first fork of upstream `gsd-build/get-shit-done`.

## Primary Contract

The fork treats the following as the canonical interface:

- `AGENTS.md`
- `.codex/`
- `$gsd-*`
- `agents_md_path`
- `generate-agents-md`
- `generate-agents-profile`
- `~/.codex/sessions`

These are the defaults used by project bootstrap, profile generation, session analysis, and generated agent guidance.
`AGENTS.md`, `.codex/`, `agents_md_path`, and `generate-agents-*` are the release-facing contract; Claude-era names remain compatibility shims only.

## Compatibility Matrix

| Canonical | Legacy alias | Status |
|-----------|--------------|--------|
| `AGENTS.md` | `CLAUDE.md` | compatibility only |
| `agents_md_path` | `claude_md_path` | compatibility only |
| `generate-agents-md` | `generate-claude-md` | compatibility only |
| `generate-agents-profile` | `generate-claude-profile` | compatibility only |
| `./.codex/skills/` | `./.claude/skills/` | compatibility / migration |

## Compatibility Shims

The fork still accepts a minimal compatibility layer so existing installs can migrate safely:

- `claude_md_path` is still read as a legacy alias for `agents_md_path`
- `generate-claude-md` still dispatches to `generate-agents-md`
- `generate-claude-profile` still dispatches to `generate-agents-profile`
- Legacy Claude skill and command locations are still recognized when present during migration

These shims exist to keep older projects usable while the Codex-first naming becomes the only public contract.

## Allowed Legacy-Reference Zones

Legacy Claude wording is acceptable only when it is explicitly scoped to:

- runtime-specific Claude install instructions
- migration notes
- compatibility registry code and alias tests
- historical changelog entries
- upstream-reference docs that explicitly say "upstream"

## Migration From Installed Artifacts

If you previously validated changes directly under `~/.codex/get-shit-done` or `~/.codex/skills`, migrate them into source here instead of continuing to patch installed output.

Recommended migration path:

1. Pull the upstream source baseline into this fork.
2. Port runtime changes into source files under `get-shit-done/bin/`, `templates/`, and `sdk/src/`.
3. Add tests before removing any compatibility path.
4. Regenerate your local install from this repository with `node bin/install.js --codex --local` or `--global`.

## Publish Checklist

The fork is close to open-source-ready when these items are true:

1. Source and SDK tests cover the Codex-first paths.
2. Top-level docs describe the fork as independent rather than as an upstream patch set.
3. Package metadata and remote URLs point to the final fork repository.
4. Any remaining `.claude` references are either compatibility-only, runtime-specific, or intentionally documented as legacy.
5. `AGENTS.md`, `.codex/`, and `$gsd-*` are described as the primary contract in release docs.

## Release Status

**Ready now:**
- Codex-first runtime paths and alias coverage are under targeted test.
- Release-facing docs describe `AGENTS.md`, `.codex/`, and `$gsd-*` as the primary contract.
- Package metadata and contributor entrypoints no longer default to upstream repository links.

**Compatibility kept on purpose:**
- `get-shit-done-cc` remains as a CLI/package compatibility alias in the root manifest.
- `claude_md_path` and `generate-claude-*` remain as migration shims.
- Legacy `.claude` examples may still appear where they are explicitly documented as migration context.

**Deferred intentionally:**
- Deep historical changelog and archival doc cleanup.
- Broad schema-level renames inside prompt assets where compatibility impact is ambiguous.
- Removal of legacy Claude compatibility code and regression coverage.

**Maintainer inputs still needed:**
- Final SDK package namespace if `@get-shit-done-codex/sdk` is not the intended publish target
- Decision on when to remove the remaining legacy aliases

**Resolved fork identity:**
- Public repository URL: `https://github.com/Oisinwang/get-shit-done-codex`

## Planned Compatibility Removals

The following can be removed in a later cleanup release once downstream users have migrated:

- `claude_md_path`
- `generate-claude-md`
- `generate-claude-profile`
- Legacy Claude command installation under `~/.claude/commands/gsd/`
- Legacy documentation that still presents Claude-first naming as the default
