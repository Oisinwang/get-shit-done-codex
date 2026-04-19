# Design: Codex-First Release Preparation

**Date:** 2026-04-19
**Status:** Approved - executing balanced release prep
**Branch:** `codex/bootstrap`

---

## Summary

Prepare `get-shit-done-codex` for an initial open-source release as an independent Codex-first fork of upstream `gsd-build/get-shit-done`.

The release must present `AGENTS.md`, `.codex`, `$gsd-*`, `agents_md_path`, `generate-agents-*`, and `~/.codex/sessions` as the primary contract while keeping the minimum Claude compatibility layer needed for migration and regression coverage.

---

## Scope

**In scope:**
- Root package identity and SDK metadata cleanup
- Contributor-facing repo links and issue templates
- Release-facing README cleanup, including multilingual root READMEs
- Canonical command and agent prompt wording that still presents Claude as the primary runtime
- Final verification for the Codex-first runtime paths and legacy aliases already under test

**Out of scope for this wave:**
- Removing legacy compatibility aliases such as `claude_md_path` or `generate-claude-*`
- Deep historical changelog cleanup
- Schema-wide renaming of every `claude_*` field embedded in templates or archival docs
- Broad changes to compatibility converters and their regression tests

---

## Release Principle

The repository must distinguish three classes of Claude-era references:

1. **Canonical release surface**
   These must become Codex-first before release.
   Examples: `README.md`, package metadata, contributor docs, installer defaults, command descriptions that present Claude as the default runtime.

2. **Compatibility bridge**
   These should remain for now.
   Examples: `generate-claude-*` aliases, `claude_md_path`, runtime conversion helpers, migration tests, explicit cross-runtime flags.

3. **Ambiguous internal schema**
   These are deferred unless they clearly leak into the public contract.
   Examples: some template field names and historical references inside prompt assets.

---

## Workstreams

### Workstream A: Repository Identity

Clean the publish-facing metadata and contributor routing so the fork no longer sends users to upstream package or repository endpoints.

Target files:
- `package.json`
- `package-lock.json`
- `sdk/package.json`
- `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/chore.yml`
- `.github/ISSUE_TEMPLATE/docs_issue.yml`
- `.github/ISSUE_TEMPLATE/enhancement.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`

### Workstream B: Public Documentation

Make the top-level release and install documentation consistently describe the fork as Codex-first, including critical localized entrypoints.

Target files:
- `README.md`
- `README.zh-CN.md`
- `README.ja-JP.md`
- `README.ko-KR.md`
- `README.pt-BR.md`
- `docs/CODEX-FORK.md`
- `docs/CONFIGURATION.md`
- `docs/COMMANDS.md`

### Workstream C: Canonical Prompt Assets

Patch the default runtime framing in high-signal prompts and installer copy without touching compatibility converters or migration tests.

Initial target files:
- `bin/install.js`
- `commands/gsd/list-phase-assumptions.md`
- `commands/gsd/ultraplan-phase.md`
- `commands/gsd/verify-work.md`
- `agents/gsd-planner.md`
- `agents/gsd-roadmapper.md`

Secondary files in the same owned directories may be updated only when they clearly present Claude as the primary runtime rather than a compatibility path.

### Workstream D: Verification and Release Checklist

Re-run the targeted Codex-first test suites and produce a concise release checklist describing what is ready, what remains deferred, and which compatibility layers are still intentional.

---

## Execution Order

1. Start Workstream A and Workstream B in parallel because they touch disjoint file sets.
2. Start Workstream C once its ownership list is locked, keeping it isolated from README and package metadata edits.
3. Run verification after the three content workstreams converge.
4. Produce a final release readiness summary with explicit deferred items.

---

## Risks

- Over-cleaning may break intentional compatibility messaging or migration behavior.
- Under-cleaning leaves obvious upstream or Claude-first signals in public release surfaces.
- README and multilingual documentation are high-noise files; edits must stay narrowly release-focused.

---

## Success Criteria

- Public package and repository metadata no longer point at upstream by default.
- Root release docs present this repository as an independent Codex-first fork.
- Clear canonical prompts no longer describe Claude as the default runtime where Codex is now primary.
- Existing Codex-first targeted tests still pass after cleanup.
- Deferred compatibility items are documented rather than left ambiguous.
