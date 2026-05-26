# Security Policy

## Reporting a Vulnerability

This is the security policy for the `Oisinwang/get-shit-done-codex` Codex-first fork.

**Please do not report security vulnerabilities through public GitHub issues.**

Use GitHub's private vulnerability reporting / security advisory flow for this repository:

https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new

Do not disclose vulnerability details in public issues, pull requests, discussions, or social channels. If the private advisory form is unavailable, open a public issue that says only "I need to report a security vulnerability privately" and wait for a maintainer response.

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (optional)

## Response Timeline

- **Acknowledgment**: best effort within 48 hours
- **Initial assessment**: best effort within 1 week
- **Fix timeline**: depends on severity, but the target is:
  - Critical: 24-48 hours
  - High: 1 week
  - Medium/Low: Next release

## Scope

Security issues in this Codex-first fork that could:
- Execute arbitrary code on user machines
- Expose sensitive data (API keys, credentials)
- Compromise the integrity of generated plans/code
- Break the intended `AGENTS.md`, `.codex/`, or `$gsd-*` security boundaries

## Recognition

We appreciate responsible disclosure and will credit reporters in release notes (unless you prefer to remain anonymous).
