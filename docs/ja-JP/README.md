# GSD Codex ドキュメント

このフォルダは GSD Codex fork の日本語ドキュメント入口です。この fork は Codex-first です。公開契約の中心は `AGENTS.md`、`.codex/`、`$gsd-*`、`agents_md_path`、`generate-agents-md`、Codex のセッションパスです。

公開済みパッケージは次のコマンドでインストールします。

```bash
npx @oisinwang/get-shit-done-codex@latest
```

## セーフトライアルのクイックリンク

- [セーフトライアルのトラブルシューティング](../SAFE-TRIAL-TROUBLESHOOTING.md)
- [セーフトライアル結果テンプレート](../SAFE-TRIAL-OUTCOME.md)
- [セーフトライアル相談テンプレート](../SAFE-TRIAL-DISCUSSION.md)
- [セーフトライアル記録](../SAFE-TRIAL-TRANSCRIPT.md)

## 評価のクイックリンク

- **安全に試す:** [Evaluate](../EVALUATE.md)

## サポートのクイックリンク

- **助けを得る:** [Support](../../SUPPORT.md)
- **質問や相談をする:** [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions)

## コントリビューションのクイックリンク

- **貢献する:** [Contributing Guide](../../CONTRIBUTING.md)
- **最初のタスクを探す:** [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)

## メンテナーのクイックリンク

- **修正を公開する:** [Release Checklist](../RELEASE.md)
- **貢献者タスクを閉じる:** [Maintainer Checklist](../MAINTAINER-CHECKLIST.md)

## プロモーションのクイックリンク

- **プロジェクトを共有する:** [Promotion Assets](../PROMOTION.md)

## デモのクイックリンク

- **初回実行を見る:** [Demo](../DEMO.md)
- **短いデモを録画する:** [Demo Media Checklist](../DEMO.md#demo-media-checklist)

## FAQ のクイックリンク

- **よくある質問に答える:** [FAQ](../FAQ.md)

## トラブルシューティングのクイックリンク

- **インストール問題から復旧する:** [Troubleshooting](../TROUBLESHOOTING.md)

## 例のクイックリンク

- **ワークフローを選ぶ:** [Examples](../EXAMPLES.md)

## プロンプトレシピのクイックリンク

- **Codex プロンプトを貼り付ける:** [Prompt Recipes](PROMPTS.md)

## 比較のクイックリンク

- **選択肢を比較する:** [Comparison](COMPARISON.md)

## ロードマップのクイックリンク

- **方向性を見る:** [Roadmap](../ROADMAP.md)

Claude 時代の名前は移行互換のためだけに残しています。fork の境界、命名規則、移行メモは [CODEX-FORK.md](../CODEX-FORK.md) を参照してください。

## ドキュメント索引

| ドキュメント | 読者 | 内容 |
|--------------|------|------|
| [Roadmap](../ROADMAP.md) | 評価者、コントリビューター | 公開ロードマップ、直近の優先事項、メンテナーの手動作業、good first issue 候補 |
| [Evaluate](../EVALUATE.md) | 新規ユーザー、評価者 | 安全な10分トライアルのチェックリストと、成功・失敗の判断材料 |
| [FAQ](../FAQ.md) | 新規ユーザー、評価者 | スコープ、ファイル、ランタイム、GSD を使わない場面に関するよくある採用前の質問 |
| [Examples](../EXAMPLES.md) | 新規ユーザー | コピー可能なワークフロー。新規プロジェクト、既存リポジトリ、短い修正、再開、spike、sketch を扱います |
| [Demo](../DEMO.md) | 新規ユーザー、メンテナー | 60秒ワークフローのプレビュー、初回実行出力、デモ媒体チェックリスト、生成物、git status 証拠 |
| [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md) | 新規ユーザー、評価者 | コマンド不足、変更ファイル、ローカル/グローバルインストール、npm 失敗、古いキャッシュ、サポート導線の初回復旧 |
| [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md) | 新規ユーザー、評価者 | コマンド、変更パス、成功/失敗シグナル、保持/破棄の判断、フィードバック証拠を記録します |
| [Safe Trial Discussion Starter](../SAFE-TRIAL-DISCUSSION.md) | 新規ユーザー、評価者 | コマンド証拠、変更パス、プライバシーチェック、ワークフロー相談を含む GitHub Discussions 投稿テンプレート |
| [Safe Trial Transcript](../SAFE-TRIAL-TRANSCRIPT.md) | 新規ユーザー、評価者 | npm run demo:safe-trial で生成される、初回実行を確認するためのインストール不要・編集不要の記録 |
| [Support](../../SUPPORT.md) | ユーザー、評価者 | セットアップ質問、ワークフロー相談、トラブルシューティング、ローカルとグローバルインストール、bug report 導線 |
| [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions) | ユーザー、評価者 | 質問、例、安全なトライアルのフィードバック向けコミュニティサポート |
| [Contributing Guide](../../CONTRIBUTING.md) | コントリビューター、評価者 | 貢献タイプ、開発セットアップ、テスト要件、review 期待値、pull request フロー |
| [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) | コントリビューター、新規ユーザー | 現在のロードマップの穴、docs 更新、公開ローンチの磨き込みに沿った最初のタスク |
| [Security Policy](../../SECURITY.md) | Users, contributors | Private vulnerability reporting, disclosure guidance, response timeline, scope, and security boundaries |
| [Private Vulnerability Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | Security reporters | GitHub private advisory intake for vulnerabilities that should not be posted in public issues |
| [Code of Conduct](../../CODE_OF_CONDUCT.md) | Users, contributors | Community standards, acceptable behavior, enforcement responsibilities, scope, and reporting guidance |
| [Private Conduct Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | Users, contributors | Sensitive conduct reports, reporter safety, names, screenshots, and other details that should not be posted in public issues |
| [License](../../LICENSE) | Users, contributors | MIT License terms for reuse, copy, modify, distribute, and sublicense rights |
| [MIT License Terms](../../LICENSE) | Users, contributors | Permission notice, copyright notice, no warranty statement, and liability limits |
| [Package Metadata](../../package.json) | Users, evaluators, maintainers | Published npm package name, description, keywords, CLI bin, shipped files, and public publish settings |
| [SDK Package Metadata](../../sdk/package.json) | SDK users, integrators | SDK npm package name, CLI bin, shipped dist and prompts files, prepublish build, and public publish settings |
| [Installer CLI](../../bin/install.js) | Users, evaluators, maintainers | Codex-first installer entrypoint, local and global targets, runtime flags, SDK install controls, uninstall mode, and WSL path guard |
| [Hook Build Script](../../scripts/build-hooks.js) | Contributors, maintainers | Builds installer hook payloads for prepublish builds, local source installs, and test runs |
| [Safe Trial Demo Script](../../scripts/safe-trial-demo.cjs) | New users, evaluators | No-install command preview for sandbox trial and existing-repository trial flows |
| [Test Runner Script](../../scripts/run-tests.cjs) | Contributors, maintainers | Node test orchestration for public release metadata, link checks, install regressions, and coverage |
| [Hotfix Validation Script](../../scripts/validate-hotfix.cjs) | Maintainers | Hotfix release guard for version input, dry-run state, package metadata, and publish workflow checks |
| [Runtime Support Matrix](../FEATURES.md#36-multi-runtime-support) | Users, evaluators | Supported runtime list, command formats, agent formats, hook events, config shapes, and installer requirements |
| [Runtime Abstraction](../ARCHITECTURE.md#runtime-abstraction) | Contributors, integrators | Runtime command format, agent system, config location, tool mapping, hook event names, frontmatter differences, and model inheritance |
| [Compatibility Runtime Guide](../USER-GUIDE.md#using-compatibility-runtimes-opencode-gemini-cli-kilo) | Users, evaluators | How compatibility runtimes inherit model selection, use resolve_model_ids omit, and set runtime-specific model overrides |
| [Non-Claude Runtime Configuration](../CONFIGURATION.md#non-claude-runtimes-codex-opencode-gemini-cli-kilo) | Users, maintainers | Configuration behavior for Codex, OpenCode, Gemini CLI, Kilo, inherit model profiles, and runtime-selected model IDs |
| [Manual Update Runtime Flags](../manual-update.md#runtime-flags) | Users, maintainers | Runtime flag table for Codex, Claude Code, Gemini CLI, OpenCode, Kilo, Copilot, Cursor, Windsurf, Augment, Antigravity, Trae, Qwen Code, CodeBuddy, Cline, and all runtimes |
| [Test Workflow](../../.github/workflows/test.yml) | Contributors, maintainers | GitHub Actions CI matrix, Node.js versions, install dependencies, tests with coverage, and branch validation |
| [Hotfix Release Workflow](../../.github/workflows/hotfix.yml) | Maintainers | manual hotfix dispatch, dry-run mode, version input, npm-publish environment, NPM_TOKEN, and publish verification |
| [Issue Chooser](../../.github/ISSUE_TEMPLATE/config.yml) | Users, contributors | Questions, safe trial troubleshooting, code of conduct, private security reporting, and issue routing |
| [Bug Report Template](../../.github/ISSUE_TEMPLATE/bug_report.yml) | Users, contributors | Package version, runtime, Node.js version, shell, reproduction steps, error text, safe trial evidence, and privacy check |
| [Documentation Issue Template](../../.github/ISSUE_TEMPLATE/docs_issue.yml) | Readers, contributors | Incorrect, missing, or unclear docs with affected path, current problem, and expected correction |
| [Feature Request Template](../../.github/ISSUE_TEMPLATE/feature_request.yml) | Users, contributors | New feature proposals with problem statement, scope, user stories, acceptance criteria, runtime compatibility, and maintenance cost |
| [Enhancement Proposal Template](../../.github/ISSUE_TEMPLATE/enhancement.yml) | Users, contributors | Existing-feature improvements with current behavior, desired behavior, affected files, compatibility impact, alternatives, and review context |
| [Chore Template](../../.github/ISSUE_TEMPLATE/chore.yml) | Maintainers, contributors | Maintenance work for refactoring, test quality, CI/CD, dependencies, tech debt, completion criteria, and related issues |
| [Pull Request Template Chooser](../../.github/pull_request_template.md) | Contributors, maintainers | Default typed template chooser for codex/bootstrap, Codex-first contract, approved issue requirement, and no-draft rule |
| [Fix PR Template](../../.github/PULL_REQUEST_TEMPLATE/fix.md) | Contributors, maintainers | Fix PR route with confirmed-bug issue link, broken behavior, root cause, regression test, platform checks, and runtime checks |
| [Enhancement PR Template](../../.github/PULL_REQUEST_TEMPLATE/enhancement.md) | Contributors, maintainers | Enhancement PR route with approved-enhancement issue, before/after, implementation notes, scope confirmation, tests, docs, and changelog |
| [Feature PR Template](../../.github/PULL_REQUEST_TEMPLATE/feature.md) | Contributors, maintainers | Feature PR route with approved-feature issue, feature summary, changed files, acceptance criteria, platform/runtime tests, scope confirmation, and screenshots or recordings |
| [Release Workflow](../../.github/workflows/release.yml) | Maintainers | create, rc, finalize actions, version input, dry-run mode, npm-publish environment, NPM_TOKEN, npm test coverage, and dist-tag publication |
| [PR Gate Workflow](../../.github/workflows/pr-gate.yml) | Contributors, maintainers | Pull request size labels for size/S, size/M, size/L, size/XL, large PR warning, and split guidance |
| [Require Issue Link Workflow](../../.github/workflows/require-issue-link.yml) | Contributors, maintainers | Blocks PRs without Closes, Fixes, or Resolves #NNN, comments with issue chooser link, and keeps issue-first review policy visible |
| [Branch Naming Workflow](../../.github/workflows/branch-naming.yml) | Contributors, maintainers | Validates feat/, fix/, hotfix/, docs/, chore/, dependabot/, and renovate/ branch prefixes with GSD branch compatibility |
| [Branch Cleanup Workflow](../../.github/workflows/branch-cleanup.yml) | Maintainers | Deletes merged PR branches, preserves protected branches including codex/bootstrap, and runs weekly orphan branch sweeps with workflow_dispatch |
| [Close Draft PRs Workflow](../../.github/workflows/close-draft-prs.yml) | Contributors, maintainers | Rejects draft PRs, comments with test expectations, correct template, linked approved issue, and ready-for-review policy |
| [Auto-label Issues Workflow](../../.github/workflows/auto-label-issues.yml) | Maintainers | Adds needs-triage to new issues with GitHub Script retries so the triage queue stays visible |
| [Auto-branch Workflow](../../.github/workflows/auto-branch.yml) | Maintainers, contributors | Creates branches from labeled issues as fix, feat, chore, and docs branches on codex/bootstrap and comments checkout commands |
| [Security Scan Workflow](../../.github/workflows/security-scan.yml) | Contributors, maintainers | Runs prompt injection, base64 obfuscation, secret scans, and .planning runtime-data check on PRs |
| [Stale Cleanup Workflow](../../.github/workflows/stale.yml) | Maintainers | Marks inactive issues and inactive PRs after 28 days, closes after 14 days, and preserves critical, pinned, and confirmed exemptions |
| [Dependabot Config](../../.github/dependabot.yml) | Maintainers | Weekly npm and GitHub Actions dependency updates with open pull request limits, dependencies labels, and chore commit prefixes |
| [Repository Labels Contract](../../.github/labels.json) | Maintainers, contributors | Public label names, descriptions, colors, needs-triage, approved-feature, approved-enhancement, pending release, and type: chore |
| [CODEOWNERS](../../.github/CODEOWNERS) | Maintainers, contributors | Requires public fork maintainer review on all changes |
| [Funding Metadata](../../.github/FUNDING.yml) | Users, sponsors | GitHub Sponsors metadata for Oisinwang |
| [Release Checklist](../RELEASE.md) | Maintainers | npm publish setup, hotfix workflow steps, and verification for `npx @latest` recovery |
| [Maintainer Checklist](../MAINTAINER-CHECKLIST.md) | Maintainers | Close resolved good-first issues with verification, CI, labels, and public notes aligned |
| [Troubleshooting](../TROUBLESHOOTING.md) | Users | Fast recovery paths for Codex config, install, PATH, Windows PowerShell, and stale npm metadata issues |
| [Promotion Assets](../PROMOTION.md) | Maintainers | Launch copy, social preview setup, and public positioning snippets |
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
