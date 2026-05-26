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
- **Understand the fork:** [Codex Fork Notes](CODEX-FORK.md)
- **Run the workflow:** [User Guide](USER-GUIDE.md)
- **Find a command:** [Command Reference](COMMANDS.md)
- **Configure behavior:** [Configuration Reference](CONFIGURATION.md)
- **Extend the system:** [CLI Tools Reference](CLI-TOOLS.md) + [Agent Reference](AGENTS.md)
