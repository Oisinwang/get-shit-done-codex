# Maintainer Checklist

Use this before closing resolved good-first-issue tasks so public issue history stays useful to contributors and evaluators.

## Closing Good-First Issues

1. Confirm the issue scope is actually satisfied. Check the original acceptance criteria, linked files, and any follow-up comments.
2. Capture Verification evidence. Include the focused test command, full test command when run, and any manual checks that prove the issue is handled.
3. Confirm the CI run URL. Link the successful GitHub Actions run for the commit that closes the issue.
4. Leave an issue comment before closing when context would help future readers. Mention the commit, verification evidence, and any remaining maintainer action.
5. Do label cleanup. Remove `needs-triage` when the task is scoped, remove `help wanted` and `good first issue` when the work is complete, and keep `pending release` only when users still need a published package.
6. Check for a roadmap or backlog update. Remove completed contributor-sized work from `docs/ROADMAP.md` and update backlog notes when a deferred idea was promoted or finished.
7. Update `CHANGELOG.md` when the change affects public docs, install behavior, workflow behavior, release process, or contributor experience.
8. If the task is tied to a package fix, verify whether it is still pending release. Do not close an install bug just because source is fixed when `npx @latest` still installs an older package.
9. Close the issue only after the pushed branch, CI run URL, issue comment, label cleanup, and roadmap or backlog update are consistent.

## Public Hygiene

- Keep [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) scoped enough for a newcomer to start without private context.
- Prefer small documentation, test, localization, and example tasks for first contributions.
- Leave at least one ready contributor issue open when possible so visitors can see a clear path to help.
- Keep manual-only work explicit in `docs/ROADMAP.md` instead of disguising it as a normal code task.
