'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');
const ISSUE_TEMPLATE_DIR = path.join(ROOT, '.github', 'ISSUE_TEMPLATE');

function readWorkflow(name) {
  return fs.readFileSync(path.join(ROOT, '.github', 'workflows', name), 'utf8');
}

function readIssueTemplate(name) {
  return fs.readFileSync(path.join(ISSUE_TEMPLATE_DIR, name), 'utf8');
}

function issueTemplateFiles() {
  return fs
    .readdirSync(ISSUE_TEMPLATE_DIR)
    .filter((name) => /\.ya?ml$/.test(name))
    .filter((name) => name !== 'config.yml')
    .sort();
}

function issueTemplateLabels(name) {
  const template = readIssueTemplate(name);
  const labelsLine = template.match(/^labels:\s*\[([^\]]*)\]/m);

  assert.ok(labelsLine, `${name} should declare template labels`);

  return labelsLine[1]
    .split(',')
    .map((label) => label.trim().replace(/^"|"$/g, ''))
    .filter(Boolean);
}

function contributingWorkflowLabels() {
  const contributing = fs.readFileSync(path.join(ROOT, 'CONTRIBUTING.md'), 'utf8');
  const labels = new Set();
  const patterns = [
    /\blabel(?:ed|s|ing)?(?:\s+the issue)?\s*:?\s*`([^`]+)`/gi,
    /`([^`]+)`\s+label\b/gi,
  ];

  for (const pattern of patterns) {
    for (const match of contributing.matchAll(pattern)) {
      labels.add(match[1]);
    }
  }

  return [...labels].sort();
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

  test('release create dry-run does not create or push a branch', () => {
    const workflow = readWorkflow('release.yml');
    const createJob = workflow.slice(workflow.indexOf('  create:'), workflow.indexOf('  rc:'));
    const createBranchStep = createJob.slice(createJob.indexOf('name: Create release branch'));

    assert.match(createBranchStep, /if: \$\{\{ !inputs\.dry_run \}\}/);
    assert.match(createJob, /name: Dry-run release branch summary/);
    assert.match(createJob, /No release branch was created/);
  });

  test('test workflow does not reference a missing Windows workflow', () => {
    const testWorkflow = readWorkflow('test.yml');
    const workflowNames = fs.readdirSync(path.join(ROOT, '.github', 'workflows'));
    const hasWindowsWorkflow = workflowNames.some((name) => /windows/i.test(name));

    if (!hasWindowsWorkflow) {
      assert.doesNotMatch(testWorkflow, /dedicated windows-compat workflow/i);
    }
  });

  test('test workflow runs a real Windows Node 24 leg', () => {
    const testWorkflow = readWorkflow('test.yml');

    assert.match(testWorkflow, /-\s+os: windows-latest\r?\n\s+node-version: 24/);
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

  test('minor release workflow verifies npm authentication before pushing release tags', () => {
    const workflow = readWorkflow('release.yml');
    const rcJob = workflow.slice(workflow.indexOf('  rc:'), workflow.indexOf('  finalize:'));
    const finalizeJob = workflow.slice(workflow.indexOf('  finalize:'));

    for (const [jobName, job] of [
      ['rc', rcJob],
      ['finalize', finalizeJob],
    ]) {
      const tokenStep = job.indexOf('name: Require npm token for publish');
      const installStep = job.indexOf('name: Install and test');
      const authStep = job.indexOf('name: Verify npm authentication');
      const tagStep = job.indexOf('name: Tag and push');

      assert.notStrictEqual(tokenStep, -1, `${jobName} should require npm token`);
      assert.notStrictEqual(installStep, -1, `${jobName} should install and test`);
      assert.notStrictEqual(authStep, -1, `${jobName} should verify npm authentication`);
      assert.notStrictEqual(tagStep, -1, `${jobName} should tag and push`);
      assert.ok(tokenStep < installStep, `${jobName} should fail early when npm token is missing`);
      assert.ok(authStep < tagStep, `${jobName} should check npm auth before pushing tags`);
    }

    assert.match(workflow, /NPM_TOKEN secret is not configured/);
    assert.match(workflow, /npm whoami/);
  });

  test('publish workflows check release state before tagging or publishing', () => {
    const releaseWorkflow = readWorkflow('release.yml');
    const jobs = [
      ['hotfix finalize', readWorkflow('hotfix.yml').slice(readWorkflow('hotfix.yml').indexOf('  finalize:'))],
      ['release rc', releaseWorkflow.slice(releaseWorkflow.indexOf('  rc:'), releaseWorkflow.indexOf('  finalize:'))],
      ['release finalize', releaseWorkflow.slice(releaseWorkflow.indexOf('  finalize:'))],
    ];

    for (const [jobName, job] of jobs) {
      const installStep = job.indexOf('name: Install and test');
      const releaseStateCheck = job.indexOf('npm run check:release-state');
      const tagStep = job.indexOf('name: Tag and push');
      const publishStep = job.indexOf('name: Publish to npm');

      assert.notStrictEqual(installStep, -1, `${jobName} should install dependencies`);
      assert.notStrictEqual(releaseStateCheck, -1, `${jobName} should check release state`);
      assert.notStrictEqual(tagStep, -1, `${jobName} should tag releases`);
      assert.notStrictEqual(publishStep, -1, `${jobName} should publish to npm`);
      assert.ok(installStep < releaseStateCheck, `${jobName} should check after npm ci`);
      assert.ok(releaseStateCheck < tagStep, `${jobName} should check before pushing tags`);
      assert.ok(releaseStateCheck < publishStep, `${jobName} should check before publishing`);
    }
  });

  test('public issue labels are declared before templates or docs reference them', () => {
    const labelContract = JSON.parse(
      fs.readFileSync(path.join(ROOT, '.github', 'labels.json'), 'utf8'),
    );
    const declaredLabels = new Set(labelContract.labels.map((label) => label.name));
    const templateFiles = issueTemplateFiles();
    const docLabels = contributingWorkflowLabels();

    assert.ok(templateFiles.length > 0, 'public issue templates should be present');
    assert.ok(docLabels.length > 0, 'CONTRIBUTING.md should mention workflow labels');

    for (const label of labelContract.labels) {
      assert.ok(label.name, 'contract labels should have names');
      assert.ok(label.description.trim(), `${label.name} should document its purpose`);
      assert.match(label.color, /^[0-9a-f]{6}$/i, `${label.name} should use a hex color`);
    }

    for (const templateName of templateFiles) {
      for (const label of issueTemplateLabels(templateName)) {
        assert.ok(
          declaredLabels.has(label),
          `${templateName} references undeclared GitHub label ${label}`,
        );
      }
    }

    for (const label of docLabels) {
      assert.ok(declaredLabels.has(label), `CONTRIBUTING.md references undeclared label ${label}`);
    }
  });

  test('new issue auto-label workflow retries transient GitHub API failures', () => {
    const workflow = readWorkflow('auto-label-issues.yml');
    const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8');

    assert.match(workflow, /actions\/github-script@[0-9a-f]{40}\s+# v9\.0\.0/);
    assert.match(workflow, /issues:\s*\n\s*types:\s*\[opened\]/);
    assert.match(workflow, /permissions:\s*\n\s*issues:\s*write/);
    assert.match(workflow, /labels:\s*\["needs-triage"\]/);
    assert.match(workflow, /\bretries:\s*[2-9]\d*/);
    assert.match(workflow, /\bretry-exempt-status-codes:\s*400,401,403,404,422\b/);
    assert.doesNotMatch(workflow, /\bretry-exempt-status-codes:[^\n]*\b500\b/);
    assert.match(changelog, /Auto-label retry hardening/);
  });
});
