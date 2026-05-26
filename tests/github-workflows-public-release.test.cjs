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

  test('hotfix workflow delegates version validation to tested script', () => {
    const workflow = readWorkflow('hotfix.yml');

    assert.match(workflow, /node scripts\/validate-hotfix\.cjs/);
  });

  test('hotfix back-merge PR creation cannot block publishing', () => {
    const workflow = readWorkflow('hotfix.yml');

    assert.match(workflow, /::warning::Unable to inspect existing hotfix back-merge PR/);
    assert.match(workflow, /::warning::Unable to create hotfix back-merge PR/);
    assert.match(workflow, /Create the PR manually from \$BRANCH to codex\/bootstrap/);

    const verifyPublishStep = workflow.indexOf('name: Verify publish');
    const prStep = workflow.indexOf('name: Create PR to merge hotfix back to main');

    assert.notStrictEqual(verifyPublishStep, -1);
    assert.notStrictEqual(prStep, -1);
    assert.ok(
      verifyPublishStep < prStep,
      'hotfix back-merge PR should only be attempted after publish verification',
    );
  });

  test('hotfix verifies npm authentication before pushing release tags', () => {
    const workflow = readWorkflow('hotfix.yml');
    const tokenStep = workflow.indexOf('name: Require npm token for publish');
    const installStep = workflow.indexOf('name: Install and test');
    const authStep = workflow.indexOf('name: Verify npm authentication');
    const tagStep = workflow.indexOf('name: Tag and push');

    assert.notStrictEqual(tokenStep, -1);
    assert.notStrictEqual(installStep, -1);
    assert.notStrictEqual(authStep, -1);
    assert.ok(tokenStep < installStep, 'missing npm token should fail before long release tests');
    assert.ok(authStep < tagStep, 'npm authentication must be checked before pushing tags');
    assert.match(workflow, /NPM_TOKEN secret is not configured/);
    assert.match(workflow, /npm whoami/);
  });
});
