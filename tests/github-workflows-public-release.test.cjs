'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');

function readWorkflow(name) {
  return fs.readFileSync(path.join(ROOT, '.github', 'workflows', name), 'utf8');
}

describe('GitHub workflows public release configuration', () => {
  test('default branch CI runs on codex/bootstrap', () => {
    const testWorkflow = readWorkflow('test.yml');
    const securityWorkflow = readWorkflow('security-scan.yml');

    assert.match(testWorkflow, /branches:\s*\n\s*- codex\/bootstrap/);
    assert.match(testWorkflow, /pull_request:\s*\n\s*branches:\s*\n\s*- codex\/bootstrap/);
    assert.match(securityWorkflow, /branches:\s*\n\s*- codex\/bootstrap/);
  });

  test('branch automation protects and branches from codex/bootstrap', () => {
    const autoBranch = readWorkflow('auto-branch.yml');
    const cleanup = readWorkflow('branch-cleanup.yml');

    assert.match(autoBranch, /heads\/codex\/bootstrap/);
    assert.doesNotMatch(autoBranch, /heads\/main/);
    assert.match(cleanup, /codex\/bootstrap/);
  });

  test('release workflows publish and verify the scoped npm package', () => {
    for (const workflowName of ['release.yml', 'hotfix.yml']) {
      const workflow = readWorkflow(workflowName);

      assert.doesNotMatch(workflow, /--base main/);
      assert.match(workflow, /--base codex\/bootstrap/);
      assert.doesNotMatch(workflow, /get-shit-done-cc/);
      assert.doesNotMatch(workflow, /npx get-shit-done-codex/);
      assert.match(workflow, /@oisinwang\/get-shit-done-codex/);
    }
  });
});
