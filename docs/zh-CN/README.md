# GSD Codex 文档

这里是 GSD Codex fork 的中文文档入口。本 fork 是 Codex-first：`AGENTS.md`、`.codex/`、`$gsd-*`、`agents_md_path`、`generate-agents-md` 和 Codex 会话路径是主要公开契约。

使用已发布的 npm 包安装：

```bash
npx @oisinwang/get-shit-done-codex@latest
```

## Safe trial quick links

- [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md)
- [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md)
- [Safe Trial Discussion Starter](../SAFE-TRIAL-DISCUSSION.md)
- [Safe Trial Transcript](../SAFE-TRIAL-TRANSCRIPT.md)

## Support quick links

- **Get help:** [Support](../../SUPPORT.md)
- **Ask or discuss:** [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions)

Claude 时代的旧名称只作为迁移兼容层保留。fork 的边界、命名规则和迁移说明见 [CODEX-FORK.md](../CODEX-FORK.md)。

## 文档索引

| 文档 | 读者 | 内容 |
|------|------|------|
| [Codex fork 说明](../CODEX-FORK.md) | 所有用户 | Codex-first 范围、命名边界、迁移说明和发布状态 |
| [对比指南](COMPARISON.md) | 评估者 | 何时使用 GSD Codex，而不是原始 Codex chat、prompt pack、task manager 或 CI-only workflow |
| [提示词配方](PROMPTS.md) | 新用户 | 可直接粘贴到 Codex 的提示词，用于启动、恢复、审计和小修复 |
| [用户指南](USER-GUIDE.md) | 所有用户 | 工作流演练、故障排查和恢复 |
| [功能参考](../FEATURES.md) | 所有用户 | 功能、需求和行为说明 |
| [命令参考](../COMMANDS.md) | 所有用户 | 命令、参数、标志和示例 |
| [配置参考](../CONFIGURATION.md) | 所有用户 | 配置 schema、工作流开关、模型配置和 git 策略 |
| [架构说明](../ARCHITECTURE.md) | 贡献者 | 系统架构、agent 模型和数据流 |
| [CLI 工具](../CLI-TOOLS.md) | 贡献者 | `gsd-tools.cjs` 编程接口 |
| [Agent 参考](../AGENTS.md) | 贡献者 | 专用 agents、职责和编排模式 |
| [上下文监控](../context-monitor.md) | 所有用户 | 上下文窗口监控 hook 架构 |
| [Discuss Mode](../workflow-discuss-mode.md) | 所有用户 | 假设模式与访谈模式 |

## 快速链接

- **从这里开始：** [根 README](../../README.zh-CN.md) -> 安装 -> `$gsd-help`
- **理解 fork：** [Codex fork 说明](../CODEX-FORK.md)
- **粘贴提示词：** [提示词配方](PROMPTS.md)
- **运行工作流：** [用户指南](USER-GUIDE.md)
- **查找命令：** [命令参考](../COMMANDS.md)
- **配置行为：** [配置参考](../CONFIGURATION.md)
- **扩展系统：** [CLI 工具](../CLI-TOOLS.md) + [Agent 参考](../AGENTS.md)
