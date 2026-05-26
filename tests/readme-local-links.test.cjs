'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');
const IGNORED_DIRS = new Set(['.git', '.worktrees', 'coverage', 'node_modules']);
const LOCAL_LINK_PATTERN = /!?\[[^\]]*]\(([^)]+)\)/g;

function collectReadmes(dir) {
  const readmes = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        readmes.push(...collectReadmes(path.join(dir, entry.name)));
      }
      continue;
    }

    if (!entry.isFile()) continue;

    const absolutePath = path.join(dir, entry.name);
    const isRootLocalizedReadme =
      dir === ROOT && /^README\..+\.md$/.test(entry.name);

    if (entry.name === 'README.md' || isRootLocalizedReadme) {
      readmes.push(absolutePath);
    }
  }

  return readmes;
}

function normalizeRelativePath(fromFile, rawTarget) {
  const withoutFragment = rawTarget.trim().split(/[?#]/)[0];

  if (
    !withoutFragment
    || withoutFragment.startsWith('#')
    || withoutFragment.startsWith('/')
    || /^(?:https?:|mailto:|data:)/i.test(withoutFragment)
  ) {
    return null;
  }

  return path.resolve(
    path.dirname(fromFile),
    withoutFragment.replace(/^<|>$/g, ''),
  );
}

describe('README local links', () => {
  test('repository README files only point at existing local targets', () => {
    const brokenLinks = [];

    for (const readmePath of collectReadmes(ROOT)) {
      const readme = fs.readFileSync(readmePath, 'utf8');
      const source = path.relative(ROOT, readmePath).replace(/\\/g, '/');
      let match;

      while ((match = LOCAL_LINK_PATTERN.exec(readme))) {
        const target = normalizeRelativePath(readmePath, match[1]);

        if (!target || fs.existsSync(target)) continue;

        brokenLinks.push(
          `${source}: ${match[1]} -> ${path.relative(ROOT, target).replace(/\\/g, '/')}`,
        );
      }
    }

    assert.deepEqual(brokenLinks, []);
  });
});
