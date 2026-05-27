# 비교 가이드

저장소에 GSD Codex를 추가할 가치가 있는지, 또는 더 가벼운 workflow로 충분한지 판단할 때 이 문서를 사용하세요.

## 짧은 결론

GSD Codex는 오래 이어지는 AI 코딩 세션에서 지속적인 프로젝트 기억, 단계별 계획, 검증, 재개 지원이 필요한 작업에 맞습니다. Codex 자체의 대체품이 아닙니다. 범용 task manager나 CI 시스템의 대체품도 아닙니다.

## 적합도 비교

| 선택지 | 가장 잘 맞는 상황 | GSD Codex가 메우는 주요 간격 |
|--------|-------------------|------------------------------|
| 원시 Codex chat | 작고 명확한 수정이며 한 세션 안에서 검증할 수 있음 | context reset 뒤에도 목표, 결정, 계획, 검증을 보존 |
| prompt pack | 반복되는 코딩 작업에 재사용할 문구가 필요함 | prompt를 프로젝트 파일, phase artifact, 복구 메모가 있는 stateful workflow로 전환 |
| task manager | 사람이 backlog 소유권, 담당자, 일정을 관리해야 함 | coding agent가 `AGENTS.md`, `.codex/`, `.planning/` 아래 실행 가능한 프로젝트 context를 갖게 함 |
| CI-only workflow | 테스트가 전체 acceptance contract를 이미 정의함 | 테스트가 모든 것을 덮기 전에 요구사항, risk, 설계 결정, 수동 UAT를 기록 |
| 완전한 엔터프라이즈 프로세스 | 큰 팀에 공식 승인과 program governance가 필요함 | solo 또는 small-team AI 작업을 무거운 process 없이 구조화 |

## GSD Codex를 선택할 때

- 기능이 한 번의 prompt로 끝내기에는 크거나 위험합니다.
- context compaction 또는 새 세션 뒤에도 Codex가 작업을 이어가야 합니다.
- 요구사항을 적어두지 않으면 중간에 drift될 가능성이 큽니다.
- 여러 파일, command, agent, workstream을 조율해야 합니다.
- 검증에 test, 수동 확인, security note, UAT evidence가 포함되어야 합니다.
- git에서 review할 수 있는 planning artifact가 필요합니다.

## GSD Codex를 사용하지 않을 때

- 작업이 한 줄 수정이고 필요한 patch를 이미 정확히 알고 있습니다.
- `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` 같은 planning file을 원하지 않습니다.
- review 가능한 결정이나 검증 기록 없이 agent가 바로 변경하길 원합니다.
- 팀에 이미 더 강한 project workflow가 있고 필요한 것은 몇 개의 재사용 prompt뿐입니다.

## 실제로 추가되는 것

Codex-first install은 local install의 경우 `.codex/`, global install의 경우 `~/.codex/` 아래에 command와 skill을 추가합니다. 프로젝트 안에서 GSD는 `.planning/` 아래에 plain Markdown과 JSON planning artifact를 씁니다. 이 artifact는 읽기 쉽고, git에 올리기 쉬우며, 저장소 정책상 local planning state를 보관하지 않는 경우 제거하기 쉽게 설계되어 있습니다.

핵심 contract는 다음과 같습니다.

- `AGENTS.md`: 프로젝트 지침
- `.codex/`: Codex-native command와 skill surface
- `.planning/`: 지속적인 프로젝트 상태
- `$gsd-*`: workflow entry point

## 실용적인 판단 기준

빠른 수정에는 원시 Codex를 사용하세요. context를 잃거나, 계획을 건너뛰거나, 검증을 잊는 비용이 workflow state를 적는 비용보다 클 때 GSD Codex를 사용하세요.
