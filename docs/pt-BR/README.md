# Documentacao GSD Codex

Esta pasta contem a documentacao em portugues do fork GSD Codex. O fork e Codex-first: `AGENTS.md`, `.codex/`, `$gsd-*`, `agents_md_path`, `generate-agents-md` e caminhos de sessao do Codex sao o contrato publico principal.

Instale o pacote publicado com:

```bash
npx @oisinwang/get-shit-done-codex@latest
```

Se o teste local inicial falhar por instalacao, comandos ausentes ou arquivos inesperados, veja [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md).
Para registrar o resultado do teste local, use [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md).

Nomes legados da era Claude continuam apenas como compatibilidade de migracao. As regras do fork estao em [CODEX-FORK.md](../CODEX-FORK.md).

## Indice da documentacao

| Documento | Publico | Descricao |
|----------|---------|-----------|
| [Notas do fork Codex](../CODEX-FORK.md) | Todos os usuarios | Escopo Codex-first, limites de nomenclatura e notas de migracao |
| [Guia do usuario](USER-GUIDE.md) | Todos os usuarios | Fluxos de trabalho, troubleshooting e recuperacao |
| [Referencia de recursos](FEATURES.md) | Todos os usuarios | Recursos, requisitos e comportamento esperado |
| [Referencia de comandos](COMMANDS.md) | Todos os usuarios | Comandos, sintaxe, flags, opcoes e exemplos |
| [Configuracao](CONFIGURATION.md) | Todos os usuarios | Schema de configuracao, toggles, perfis de modelo e git |
| [Arquitetura](ARCHITECTURE.md) | Contribuidores | Arquitetura, modelo de agentes e fluxo de dados |
| [Ferramentas CLI](CLI-TOOLS.md) | Contribuidores | API programatica `gsd-tools.cjs` |
| [Agentes](AGENTS.md) | Contribuidores | Agentes especializados, papeis e padroes de orquestracao |
| [Monitor de contexto](context-monitor.md) | Todos os usuarios | Hook de monitoramento da janela de contexto |
| [Discuss Mode](workflow-discuss-mode.md) | Todos os usuarios | Modo de entrevista e captura de suposicoes |

## Links rapidos

- **Comece aqui:** [README principal](../../README.pt-BR.md) -> instalar -> `$gsd-help`
- **Entenda o fork:** [Notas do fork Codex](../CODEX-FORK.md)
- **Execute o fluxo:** [Guia do usuario](USER-GUIDE.md)
- **Encontre um comando:** [Referencia de comandos](COMMANDS.md)
- **Configure o comportamento:** [Configuracao](CONFIGURATION.md)
- **Estenda o sistema:** [Ferramentas CLI](CLI-TOOLS.md) + [Agentes](AGENTS.md)
