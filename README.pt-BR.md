<div align="center">

# GET SHIT DONE CODEX

[English](README.md) · **Português** · [简体中文](README.zh-CN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md)

**Um sistema de workflow Codex-first para transformar objetivos em implementação planejada, verificável e recuperável em sessões longas de programação com IA.**

**Mantém contexto, decisões, planos de fase, verificações de validação e estado de recuperação explícitos em vez de torcer para o modelo lembrar de tudo.**

[![npm version](https://img.shields.io/npm/v/@oisinwang/get-shit-done-codex?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/@oisinwang/get-shit-done-codex)
[![npm downloads](https://img.shields.io/npm/dm/@oisinwang/get-shit-done-codex?style=for-the-badge&logo=npm&logoColor=white&color=0B7285)](https://www.npmjs.com/package/@oisinwang/get-shit-done-codex)
[![Tests](https://github.com/Oisinwang/get-shit-done-codex/actions/workflows/test.yml/badge.svg?branch=codex/bootstrap)](https://github.com/Oisinwang/get-shit-done-codex/actions/workflows/test.yml)
[![GitHub stars](https://img.shields.io/github/stars/Oisinwang/get-shit-done-codex?style=for-the-badge&logo=github&color=111827)](https://github.com/Oisinwang/get-shit-done-codex/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

<br>

```bash
npx @oisinwang/get-shit-done-codex@latest
```

**Funciona em Mac, Windows e Linux.**

<br>

![GSD Install](assets/terminal.svg)

<br>

*"Se você sabe claramente o que quer, isto ajuda o Codex a continuar construindo até o resultado ser verificável."*

*"Spec, plan, execute, review e resume sem importar um processo corporativo inteiro."*

*"Codex é o runtime principal; outros CLIs de agente continuam disponíveis por compatibilidade."*

<br>

**Publicado no npm como `@oisinwang/get-shit-done-codex`. Branch de release testada: `codex/bootstrap`.**

**Fork GSD independente e Codex-first.** Use este fork quando quiser `AGENTS.md`, `.codex/`, `$gsd-*` e caminhos de sessão do Codex como padrão público, não como detalhes de migração.

**Higiene de segurança e release:** pacote npm scoped, metadados do repositório, CI, workflows de release e templates de issue apontam para este fork. Nomes antigos da era Claude permanecem apenas como shims de compatibilidade.

[Por que este fork existe](#por-que-este-fork-existe) · [Como funciona](#como-funciona) · [Comandos](#comandos) · [Por que funciona](#por-que-funciona) · [Guia do usuário](docs/pt-BR/USER-GUIDE.md)

</div>

---

> [!IMPORTANT]
> Este repositório é um fork independente e Codex-first.
>
> Semântica principal neste fork:
> - `AGENTS.md`
> - `.codex/`
> - `$gsd-*`
> - `agents_md_path`
> - `generate-agents-md`
> - `generate-agents-profile`
> - `~/.codex/sessions`
>
> Nomes antigos Claude-first permanecem apenas como shims de compatibilidade. Notas de migração e release ficam em [docs/CODEX-FORK.md](docs/CODEX-FORK.md).

---

## Por que este fork existe

Este fork transforma o GSD em um workflow Codex-first. O contrato canônico do projeto é `AGENTS.md`, `.codex/` e comandos `$gsd-*`. Nomes antigos Claude-first ainda existem para migração, mas não são mais a semântica pública padrão.

O objetivo é simples: manter o desenvolvimento assistido por IA coerente depois do primeiro prompt. O GSD captura o objetivo, mapeia o código, planeja fases, executa com checkpoints de verificação, registra decisões e deixa estado suficiente para o Codex retomar depois.

Ele é para builders solo e times pequenos que querem planejamento e validação sérios sem adotar teatro de processo corporativo. Você descreve o resultado; o sistema preserva requisitos, verifica o trabalho e deixa a próxima ação óbvia.

---

## Para quem é

Para quem quer descrever o resultado desejado e receber uma implementação correta sem fingir que está rodando uma organização de engenharia de 50 pessoas.

Quality gates embutidos capturam problemas reais: detecção de schema drift sinaliza mudanças ORM sem migrations, segurança ancora verificação a modelos de ameaça, e detecção de redução de escopo impede o planner de descartar requisitos silenciosamente.

### Destaques atuais

- **Contrato Codex-first** - `AGENTS.md`, `.codex/`, `$gsd-*` e caminhos de sessão do Codex são a semântica principal.
- **Spiking e sketching** - `$gsd-spike` e `$gsd-sketch` capturam experimentos e variantes de design como artefatos de planejamento duráveis.
- **Orçamento de tamanho dos agentes** - limites por tier mantêm prompts enxutos e visíveis no CI.
- **Extração de boilerplate compartilhado** - lógica comum de reading e descoberta de project skills é centralizada em vez de duplicada.

---

## Primeiros passos

```bash
npx @oisinwang/get-shit-done-codex@latest
```

O instalador pede:
1. **Runtime** — Claude Code, OpenCode, Gemini, Kilo, Codex, Copilot, Cursor, Windsurf, Antigravity, Augment, Trae, Cline, ou todos
2. **Local** — Global (todos os projetos) ou local (apenas projeto atual)

Verifique com:
- Claude Code / Gemini / Copilot / Antigravity: `/gsd-help`
- OpenCode / Kilo / Augment / Trae: `/gsd-help`
- Codex: `$gsd-help`
- Cline: GSD instala via `.clinerules` — verifique se `.clinerules` existe

> [!NOTE]
> Claude Code 2.1.88+ e Codex instalam como skills (`skills/gsd-*/SKILL.md`). Cline usa `.clinerules`. O instalador lida com todos os formatos automaticamente.

> [!TIP]
> Para instalação a partir do código-fonte ou ambientes sem npm, consulte **[docs/manual-update.md](docs/manual-update.md)**.

### Mantendo atualizado

```bash
npx @oisinwang/get-shit-done-codex@latest
```

<details>
<summary><strong>Instalação não interativa (Docker, CI, Scripts)</strong></summary>

```bash
# Claude Code
npx @oisinwang/get-shit-done-codex --claude --global
npx @oisinwang/get-shit-done-codex --claude --local

# OpenCode
npx @oisinwang/get-shit-done-codex --opencode --global

# Gemini CLI
npx @oisinwang/get-shit-done-codex --gemini --global

# Kilo
npx @oisinwang/get-shit-done-codex --kilo --global
npx @oisinwang/get-shit-done-codex --kilo --local

# Codex
npx @oisinwang/get-shit-done-codex --codex --global
npx @oisinwang/get-shit-done-codex --codex --local

# Copilot
npx @oisinwang/get-shit-done-codex --copilot --global
npx @oisinwang/get-shit-done-codex --copilot --local

# Cursor
npx @oisinwang/get-shit-done-codex --cursor --global
npx @oisinwang/get-shit-done-codex --cursor --local

# Antigravity
npx @oisinwang/get-shit-done-codex --antigravity --global
npx @oisinwang/get-shit-done-codex --antigravity --local

# Augment
npx @oisinwang/get-shit-done-codex --augment --global     # Install to ~/.augment/
npx @oisinwang/get-shit-done-codex --augment --local      # Install to ./.augment/

# Trae
npx @oisinwang/get-shit-done-codex --trae --global        # Install to ~/.trae/
npx @oisinwang/get-shit-done-codex --trae --local         # Install to ./.trae/

# Cline
npx @oisinwang/get-shit-done-codex --cline --global       # Install to ~/.cline/
npx @oisinwang/get-shit-done-codex --cline --local        # Install to ./.clinerules

# Todos
npx @oisinwang/get-shit-done-codex --all --global
```

Use `--global` (`-g`) ou `--local` (`-l`) para pular a pergunta de local.
Use `--claude`, `--opencode`, `--gemini`, `--kilo`, `--codex`, `--copilot`, `--cursor`, `--windsurf`, `--antigravity`, `--augment`, `--trae`, `--cline` ou `--all` para pular a pergunta de runtime.

</details>

### Recomendado: modo sem permissões

```bash
claude --dangerously-skip-permissions
```

> [!TIP]
> Esse é o modo pensado para o GSD: aprovar `date` e `git commit` 50 vezes mata a produtividade.

---

## Como funciona

> **Já tem código?** Rode `$gsd-map-codebase` primeiro para analisar stack, arquitetura, convenções e riscos.

### 1. Inicializar projeto

```
$gsd-new-project
```

O sistema:
1. **Pergunta** até entender seu objetivo
2. **Pesquisa** o domínio com agentes em paralelo
3. **Extrai requisitos** (v1, v2 e fora de escopo)
4. **Monta roadmap** por fases

**Cria:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `.planning/research/`

### 2. Discutir fase

```
$gsd-discuss-phase 1
```

Captura suas preferências de implementação antes do planejamento.

**Cria:** `{phase_num}-CONTEXT.md`

### 3. Planejar fase

```
$gsd-plan-phase 1
```

1. Pesquisa abordagens
2. Cria 2-3 planos atômicos em XML
3. Verifica contra os requisitos

**Cria:** `{phase_num}-RESEARCH.md`, `{phase_num}-{N}-PLAN.md`

### 4. Executar fase

```
$gsd-execute-phase 1
```

1. Executa planos em ondas
2. Contexto novo por plano
3. Commit atômico por tarefa
4. Verifica contra objetivos

**Cria:** `{phase_num}-{N}-SUMMARY.md`, `{phase_num}-VERIFICATION.md`

### 5. Verificar trabalho

```
$gsd-verify-work 1
```

Validação manual orientada para confirmar que a feature realmente funciona como esperado.

**Cria:** `{phase_num}-UAT.md` e planos de correção se necessário

### 6. Repetir -> Entregar -> Completar

```
$gsd-discuss-phase 2
$gsd-plan-phase 2
$gsd-execute-phase 2
$gsd-verify-work 2
$gsd-ship 2
$gsd-complete-milestone
$gsd-new-milestone
```

Ou deixe o GSD decidir:

```
$gsd-next
```

### Modo rápido

```
$gsd-quick
```

Para tarefas ad-hoc sem ciclo completo de planejamento.

---

## Por que funciona

### Engenharia de contexto

| Arquivo | Papel |
|---------|-------|
| `PROJECT.md` | Visão do projeto |
| `research/` | Conhecimento do ecossistema |
| `REQUIREMENTS.md` | Escopo v1/v2 |
| `ROADMAP.md` | Direção e progresso |
| `STATE.md` | Memória entre sessões |
| `PLAN.md` | Tarefa atômica com XML |
| `SUMMARY.md` | O que mudou |
| `todos/` | Ideias para depois |
| `threads/` | Contexto persistente |
| `seeds/` | Ideias para próximos marcos |

### Formato XML de prompt

```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>
    Use jose for JWT (not jsonwebtoken - CommonJS issues).
    Validate credentials against users table.
    Return httpOnly cookie on success.
  </action>
  <verify>curl -X POST localhost:3000/api/auth/login returns 200 + Set-Cookie</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

### Orquestração multiagente

Um orquestrador leve chama agentes especializados para pesquisa, planejamento, execução e verificação.

### Commits atômicos

Cada tarefa gera commit próprio, facilitando `git bisect`, rollback e rastreabilidade.

---

## Comandos

### Fluxo principal

| Comando | O que faz |
|---------|-----------|
| `$gsd-new-project [--auto]` | Inicializa projeto completo |
| `$gsd-discuss-phase [N] [--auto] [--analyze] [--chain]` | Captura decisões antes do plano (`--chain` encadeia automaticamente em plan+execute) |
| `$gsd-plan-phase [N] [--auto] [--reviews]` | Pesquisa + plano + validação |
| `$gsd-execute-phase <N>` | Executa planos em ondas paralelas |
| `$gsd-verify-work [N]` | UAT manual |
| `$gsd-ship [N] [--draft]` | Cria PR da fase validada |
| `$gsd-next` | Avança automaticamente para o próximo passo |
| `$gsd-fast <text>` | Tarefas triviais sem planejamento |
| `$gsd-complete-milestone` | Fecha o marco e marca release |
| `$gsd-new-milestone [name]` | Inicia próximo marco |

### Qualidade e utilidades

| Comando | O que faz |
|---------|-----------|
| `$gsd-review` | Peer review com múltiplas IAs |
| `$gsd-pr-branch` | Cria branch limpa para PR |
| `$gsd-settings` | Configura perfis e agentes |
| `$gsd-set-profile <profile>` | Troca perfil (quality/balanced/budget/inherit) |
| `$gsd-quick [--full] [--discuss] [--research]` | Execução rápida com garantias do GSD (`--full` ativa todas as etapas, `--validate` ativa apenas verificação) |
| `$gsd-health [--repair]` | Verifica e repara `.planning/` |
| `$gsd-join-discord` | Abrir a comunidade no GitHub Discussions |

> Para a lista completa de comandos e opções, use `$gsd-help`.

---

## Configuração

As configurações do projeto ficam em `.planning/config.json`.
Você pode configurar no `$gsd-new-project` ou ajustar depois com `$gsd-settings`.

### Ajustes principais

| Configuração | Opções | Padrão | Controle |
|--------------|--------|--------|----------|
| `mode` | `yolo`, `interactive` | `interactive` | Autoaprovar vs confirmar etapas |
| `granularity` | `coarse`, `standard`, `fine` | `standard` | Granularidade de fases/planos |

### Perfis de modelo

| Perfil | Planejamento | Execução | Verificação |
|--------|--------------|----------|-------------|
| `quality` | Opus | Opus | Sonnet |
| `balanced` | Opus | Sonnet | Sonnet |
| `budget` | Sonnet | Sonnet | Haiku |
| `inherit` | Inherit | Inherit | Inherit |

Troca rápida:
```
$gsd-set-profile budget
```

---

## Segurança

### Endurecimento embutido

O GSD inclui proteções como:
- prevenção de path traversal
- detecção de prompt injection
- validação de argumentos de shell
- parsing seguro de JSON
- scanner de injeção para CI

### Protegendo arquivos sensíveis

Adicione padrões sensíveis ao deny list do Claude Code:

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Read(**/secrets/*)",
      "Read(**/*credential*)",
      "Read(**/*.pem)",
      "Read(**/*.key)"
    ]
  }
}
```

---

## Solução de problemas

**Comandos não apareceram após instalar?**
- Reinicie o runtime
- Verifique se os arquivos foram instalados no diretório correto

**Comandos não funcionam como esperado?**
- Rode `$gsd-help`
- Reinstale com `npx @oisinwang/get-shit-done-codex@latest`

**Em Docker/container?**
- Defina `CLAUDE_CONFIG_DIR` antes da instalação:

```bash
CLAUDE_CONFIG_DIR=<legacy-claude-path> npx @oisinwang/get-shit-done-codex --global
```

### Desinstalar

```bash
# Instalações globais
npx @oisinwang/get-shit-done-codex --claude --global --uninstall
npx @oisinwang/get-shit-done-codex --opencode --global --uninstall
npx @oisinwang/get-shit-done-codex --gemini --global --uninstall
npx @oisinwang/get-shit-done-codex --kilo --global --uninstall
npx @oisinwang/get-shit-done-codex --codex --global --uninstall
npx @oisinwang/get-shit-done-codex --copilot --global --uninstall
npx @oisinwang/get-shit-done-codex --cursor --global --uninstall
npx @oisinwang/get-shit-done-codex --antigravity --global --uninstall
npx @oisinwang/get-shit-done-codex --augment --global --uninstall
npx @oisinwang/get-shit-done-codex --trae --global --uninstall
npx @oisinwang/get-shit-done-codex --cline --global --uninstall

# Instalações locais (projeto atual)
npx @oisinwang/get-shit-done-codex --claude --local --uninstall
npx @oisinwang/get-shit-done-codex --opencode --local --uninstall
npx @oisinwang/get-shit-done-codex --gemini --local --uninstall
npx @oisinwang/get-shit-done-codex --kilo --local --uninstall
npx @oisinwang/get-shit-done-codex --codex --local --uninstall
npx @oisinwang/get-shit-done-codex --copilot --local --uninstall
npx @oisinwang/get-shit-done-codex --cursor --local --uninstall
npx @oisinwang/get-shit-done-codex --antigravity --local --uninstall
npx @oisinwang/get-shit-done-codex --augment --local --uninstall
npx @oisinwang/get-shit-done-codex --trae --local --uninstall
npx @oisinwang/get-shit-done-codex --cline --local --uninstall
```

---

## Linhagem multi-runtime

Codex é o runtime principal neste fork. Instalações de compatibilidade estão disponíveis via `npx @oisinwang/get-shit-done-codex` para Claude Code, OpenCode, Gemini CLI, Kilo, Copilot, Cursor, Windsurf, Antigravity, Augment, Trae, Qwen Code, CodeBuddy e Cline.

Esses ports anteriores ajudaram a provar a demanda por múltiplos runtimes:

| Projeto | Plataforma | Descrição |
|---------|------------|-----------|
| [gsd-opencode](https://github.com/rokicool/gsd-opencode) | OpenCode | Adaptação original para OpenCode |
| gsd-gemini (archived) | Gemini CLI | Adaptação original para Gemini por uberfuzzy |

---

## Star History

<a href="https://star-history.com/#Oisinwang/get-shit-done-codex&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Oisinwang/get-shit-done-codex&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Oisinwang/get-shit-done-codex&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Oisinwang/get-shit-done-codex&type=Date" />
 </picture>
</a>

---

## Licença

Licença MIT. Veja [LICENSE](LICENSE).

---

<div align="center">

**Claude Code é poderoso. O GSD o torna confiável.**

</div>
