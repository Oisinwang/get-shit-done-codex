# Roadmap

This is the public roadmap for the Codex-first fork. It is intentionally shorter than the internal planning artifacts: readers should be able to scan where the project is going without reading `.planning/`.

## Current focus

The current focus is making GSD Codex easy to evaluate, install, trust, and share:

- Keep Codex-first semantics visible in the README, docs, package metadata, and GitHub settings.
- Keep the public install path stable: `npx @oisinwang/get-shit-done-codex@latest`.
- Make first-time evaluation fast with examples, FAQ, comparison, support routing, and public promotion assets.
- Keep release workflows guarded by tests before publishing.

## Stable now

- Codex-first package identity: `@oisinwang/get-shit-done-codex`.
- Public default branch: `codex/bootstrap`.
- Runtime contract: `AGENTS.md`, `.codex/`, `$gsd-*`, and Codex session paths.
- Community health files: README, license, code of conduct, contributing guide, support guide, security policy, issue templates, and pull request template.
- GitHub Discussions support route.
- Public docs for examples, FAQ, comparison, user guide, command reference, architecture, and promotion assets.

## Near-term priorities

1. Finish npm release alignment once the `NPM_TOKEN` secret exists in the `npm-publish` environment. See the [Release Checklist](RELEASE.md).
2. Upload `assets/social-preview.png` as the GitHub repository social preview.
3. Add short demo media for the 60-second workflow after the npm metadata is refreshed.
4. Expand public examples with real-world scenarios from user questions.
5. Keep localized README files aligned with the English public launch surface.

## Contributor-sized work

These are intentionally small enough to become a good first issue:

- Add localized docs index promotion table links.

## Manual maintainer actions

Some public-surface work cannot be fully completed from a normal code commit:

- Upload `assets/social-preview.png` in GitHub repository Settings > General > Social preview.
- Set the `NPM_TOKEN` secret in the `npm-publish` environment so the hotfix release workflow can publish refreshed npm metadata. Follow the [Release Checklist](RELEASE.md).
- Re-run the hotfix release workflow after the npm token is configured.

## Not planned

- Rebranding this fork as the upstream project.
- Removing compatibility shims before migration paths are clearly documented.
- Adding heavy enterprise approval workflows that would make solo Codex usage slower.
- Promising unattended agent changes without reviewable plans, tests, or verification.
