# プロンプトレシピ

GSD Codex をインストールした後、これらを Codex に貼り付けて使えます。これは shell script ではなくプロンプトです。各プロンプトは、どの GSD パスを使うか、どの状態を確認するか、どの証拠を残すかを Codex に伝えます。

実行する前に、角括弧のプレースホルダーを置き換えてください。

## 新しいプロジェクトを開始する

アイデアはあるが、まだ永続的なプロジェクト状態がない場合に使います。

```text
[目標] を作りたいです。GSD Codex を使って、これを永続的なプロジェクト状態にしてください。

`$gsd-new-project --auto` を実行し、生成された `.planning/PROJECT.md`、`.planning/ROADMAP.md`、`.planning/STATE.md` を確認してから、`$gsd-next` を続けて実行してください。

最初のフェーズは小さく保ってください。検証を省略しないでください。完了したと言う前に、検証証拠と変更されたファイルを示してください。
```

## 既存リポジトリ

すでに code、tests、README があるリポジトリで使います。

```text
この既存リポジトリで新しい作業を計画する前に、まず GSD Codex でコードベースを理解してください。

最初に `$gsd-map-codebase` を実行し、次に `$gsd-new-project --auto`、その後 `$gsd-discuss-phase 1` を実行してください。実装作業を提案する前に、検出されたプロジェクト規約を使ってください。

既存のユーザー変更は保持してください。`.planning/` の状態を読みやすく保ち、commit の前に検証証拠を示してください。
```

## 小さな修正

作業範囲は狭いが、追跡可能な検証が必要な場合に使います。

```text
GSD Codex を使って小さな修正を行ってください: [具体的な bug または小さな改善]。

`$gsd-fast "[具体的な bug または小さな改善]"` を実行してください。変更は集中させ、最小限で有用な test を追加または更新し、検証を省略しないでください。

修正後に、動作変更、test evidence、残るリスクを要約してください。
```

## 作業を再開する

中断、context compaction、または別セッションからの引き継ぎ後に使います。

```text
GSD Codex で現在のプロジェクトを再開してください。

`$gsd-resume-work` を実行し、次に `$gsd-progress --forensic` を実行してください。次の action を提案する前に、`.planning/STATE.md` と active phase artifacts を読んでください。

chat memory から plan を再構築しないでください。保存済みのプロジェクト状態から続行し、私の入力が必要な blocker があれば明示してください。
```

## 監査して修正する

事前に task を選んでいないが、Codex に保守性や release readiness の問題を見つけて修正してほしい場合に使います。

```text
GSD Codex を使ってこのリポジトリを監査し、install、documentation、tests、release safety、first-user experience を悪くする実際の問題を探してください。

`$gsd-audit-fix` を実行してください。impact によって issue を分類し、confidence が高いものだけを修正してください。リスクが高い案は、無理に変更せず notes または issues として残してください。

すべての修正で patch を小さく保ち、`.planning/` evidence を残し、検証を省略せず、結果を証明した command を示してください。
```

## レシピの選び方

| 状況 | 最初に使うもの |
|------|----------------|
| 新しいアイデアまたは product goal | 新しいプロジェクトを開始する |
| 既存コードベースを先に理解したい | 既存リポジトリ |
| ひとつの focused bug または docs fix | 小さな修正 |
| 以前の GSD 作業がある | 作業を再開する |
| まだ task を選んでいない | 監査して修正する |
