# GSD Codex ドキュメント

このフォルダは GSD Codex fork の日本語ドキュメント入口です。この fork は Codex-first です。公開契約の中心は `AGENTS.md`、`.codex/`、`$gsd-*`、`agents_md_path`、`generate-agents-md`、Codex のセッションパスです。

公開済みパッケージは次のコマンドでインストールします。

```bash
npx @oisinwang/get-shit-done-codex@latest
```

Safe trial troubleshooting: [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md).
Safe trial outcome template: [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md).
Safe trial discussion starter: [Safe Trial Discussion Starter](../SAFE-TRIAL-DISCUSSION.md).
Safe trial transcript: [Safe Trial Transcript](../SAFE-TRIAL-TRANSCRIPT.md).

Claude 時代の名前は移行互換のためだけに残しています。fork の境界、命名規則、移行メモは [CODEX-FORK.md](../CODEX-FORK.md) を参照してください。

## ドキュメント索引

| ドキュメント | 読者 | 内容 |
|--------------|------|------|
| [Codex fork notes](../CODEX-FORK.md) | すべてのユーザー | Codex-first の範囲、命名境界、移行メモ |
| [比較ガイド](COMPARISON.md) | 新規ユーザー | 生の Codex、prompt pack、task manager、CI-only workflow との適合度比較 |
| [プロンプトレシピ](PROMPTS.md) | 新規ユーザー | Codex に貼り付けられる開始、再開、監査、小修正用プロンプト |
| [User Guide](USER-GUIDE.md) | すべてのユーザー | ワークフロー、トラブルシューティング、復旧 |
| [Feature Reference](FEATURES.md) | すべてのユーザー | 機能、要件、期待される動作 |
| [Command Reference](COMMANDS.md) | すべてのユーザー | コマンド、構文、フラグ、使用例 |
| [Configuration Reference](CONFIGURATION.md) | すべてのユーザー | 設定 schema、ワークフロートグル、モデルプロファイル |
| [Architecture](ARCHITECTURE.md) | コントリビューター | システム構造、agent モデル、データフロー |
| [CLI Tools](CLI-TOOLS.md) | コントリビューター | `gsd-tools.cjs` のプログラム API |
| [Agent Reference](AGENTS.md) | コントリビューター | 専門 agent、役割、オーケストレーション |
| [Context Monitor](context-monitor.md) | すべてのユーザー | コンテキストウィンドウ監視 hook |
| [Discuss Mode](workflow-discuss-mode.md) | すべてのユーザー | 前提確認モードとインタビューモード |

## クイックリンク

- **開始:** [root README](../../README.ja-JP.md) -> install -> `$gsd-help`
- **fork を理解する:** [Codex fork notes](../CODEX-FORK.md)
- **使うべきか判断する:** [比較ガイド](COMPARISON.md)
- **プロンプトを貼り付ける:** [プロンプトレシピ](PROMPTS.md)
- **ワークフローを実行:** [User Guide](USER-GUIDE.md)
- **コマンドを探す:** [Command Reference](COMMANDS.md)
- **設定する:** [Configuration Reference](CONFIGURATION.md)
- **拡張する:** [CLI Tools](CLI-TOOLS.md) + [Agent Reference](AGENTS.md)
