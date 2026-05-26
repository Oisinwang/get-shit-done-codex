# GSD Codex Documentation

Comprehensive documentation for the Get Shit Done Codex fork: a Codex-first workflow system for long-running AI coding sessions, explicit project state, phase planning, and verified implementation.

Language versions: [English](README.md) | [Portuguese (pt-BR)](pt-BR/README.md) | [Japanese (ja-JP)](ja-JP/README.md) | [Korean (ko-KR)](ko-KR/README.md) | [Simplified Chinese (zh-CN)](zh-CN/README.md)

## Current Fork Contract

This repository is an independent Codex-first fork. The primary public semantics are `AGENTS.md`, `.codex/`, `$gsd-*`, `agents_md_path`, `generate-agents-md`, `generate-agents-profile`, and Codex session paths.

Install the published package with:

```bash
npx @oisinwang/get-shit-done-codex@latest
```

Legacy Claude-era names remain only as compatibility shims for migration. The fork-specific release notes and migration boundaries are documented in [CODEX-FORK.md](CODEX-FORK.md).

## Documentation Index

| Document | Audience | Description |
|----------|----------|-------------|
| [Codex Fork Notes](CODEX-FORK.md) | All users | Codex-first fork scope, naming boundaries, migration notes, and release alignment |
| [Demo](DEMO.md) | New users, evaluators | A short transcript showing the first Codex workflow and the durable artifacts it creates |
| [Examples](EXAMPLES.md) | New users | Copy-pastable workflows for new projects, existing repos, quick fixes, resume, spikes, and sketches |
| [FAQ](FAQ.md) | New users, evaluators | Answers common adoption questions about scope, files, runtimes, and when not to use GSD |
| [Comparison](COMPARISON.md) | Evaluators | Decision guide comparing GSD Codex with raw Codex chat, prompt packs, task managers, and CI-only workflows |
| [Roadmap](ROADMAP.md) | Evaluators, contributors | Public status, near-term priorities, manual maintainer actions, and good first issue candidates |
| [Troubleshooting](TROUBLESHOOTING.md) | Users | Fast recovery paths for Codex config, install, Windows PowerShell, and stale npm metadata issues |
| [Promotion Assets](PROMOTION.md) | Maintainers | Launch copy, social preview setup, and public positioning snippets |
| [User Guide](USER-GUIDE.md) | All users | Workflow walkthroughs, troubleshooting, recovery, and practical usage |
| [Feature Reference](FEATURES.md) | All users | Complete feature and function documentation with requirements |
| [Command Reference](COMMANDS.md) | All users | Every command with syntax, flags, options, and examples |
| [Configuration Reference](CONFIGURATION.md) | All users | Config schema, workflow toggles, model profiles, and git branching |
| [Architecture](ARCHITECTURE.md) | Contributors, advanced users | System architecture, agent model, data flow, and internal design |
| [CLI Tools Reference](CLI-TOOLS.md) | Contributors, agent authors | `gsd-tools.cjs` programmatic API for workflows and agents |
| [Agent Reference](AGENTS.md) | Contributors, advanced users | Specialized agents, roles, tools, and spawn patterns |
| [Context Monitor](context-monitor.md) | All users | Context window monitoring hook architecture |
| [Discuss Mode](workflow-discuss-mode.md) | All users | Assumptions vs interview mode for discuss-phase |

## Quick Links

- **Start here:** [root README](../README.md) -> install -> `$gsd-help`
- **See the first run:** [Demo](DEMO.md)
- **Pick a workflow:** [Examples](EXAMPLES.md)
- **Check fit:** [FAQ](FAQ.md)
- **Compare options:** [Comparison](COMPARISON.md)
- **See direction:** [Roadmap](ROADMAP.md)
- **Recover install issues:** [Troubleshooting](TROUBLESHOOTING.md)
- **Share the project:** [Promotion Assets](PROMOTION.md)
- **Understand the fork:** [Codex Fork Notes](CODEX-FORK.md)
- **Run the workflow:** [User Guide](USER-GUIDE.md)
- **Find a command:** [Command Reference](COMMANDS.md)
- **Configure behavior:** [Configuration Reference](CONFIGURATION.md)
- **Get help:** [Support](../SUPPORT.md)
- **Ask or discuss:** [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions)
- **Contribute:** [Contributing Guide](../CONTRIBUTING.md) + [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)
- **Extend the system:** [CLI Tools Reference](CLI-TOOLS.md) + [Agent Reference](AGENTS.md)
