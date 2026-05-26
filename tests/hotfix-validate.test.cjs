'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { describe, test, afterEach } = require('node:test');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts', 'validate-hotfix.cjs');

const tmpRoots = [];

function runGit(cwd, args) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function createRepoWithRemote() {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-hotfix-'));
  tmpRoots.push(tmpRoot);

  const remote = path.join(tmpRoot, 'remote.git');
  const work = path.join(tmpRoot, 'work');

  runGit(tmpRoot, ['init', '--bare', remote]);
  fs.mkdirSync(work);
  runGit(work, ['init']);
  runGit(work, ['config', 'user.email', 'test@example.com']);
  runGit(work, ['config', 'user.name', 'Test User']);
  runGit(work, ['config', 'commit.gpgsign', 'false']);

  fs.writeFileSync(path.join(work, 'README.md'), '# test\n');
  runGit(work, ['add', 'README.md']);
  runGit(work, ['commit', '-m', 'initial']);
  runGit(work, ['remote', 'add', 'origin', remote]);
  runGit(work, ['tag', 'v1.37.2-codex.1']);
  runGit(work, ['push', 'origin', 'HEAD:codex/bootstrap']);
  runGit(work, ['push', 'origin', 'v1.37.2-codex.1']);

  return { tmpRoot, work };
}

function runValidate(work, env) {
  const outputFile = path.join(path.dirname(work), 'github-output.txt');
  let result;
  try {
    const stdout = execFileSync(process.execPath, [SCRIPT], {
      cwd: work,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, GITHUB_OUTPUT: outputFile, ...env },
    });
    result = { status: 0, stdout, stderr: '' };
  } catch (err) {
    result = {
      status: err.status || 1,
      stdout: err.stdout?.toString() || '',
      stderr: err.stderr?.toString() || err.message,
    };
  }

  result.output = fs.existsSync(outputFile)
    ? fs.readFileSync(outputFile, 'utf8')
    : '';
  return result;
}

afterEach(() => {
  while (tmpRoots.length > 0) {
    fs.rmSync(tmpRoots.pop(), { recursive: true, force: true });
  }
});

describe('hotfix workflow validation', () => {
  test('create can base a fork hotfix on a codex release tag', () => {
    const { work } = createRepoWithRemote();

    const result = runValidate(work, {
      ACTION: 'create',
      VERSION: '1.37.3',
    });

    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.output, /^base_tag=v1\.37\.2-codex\.1$/m);
    assert.match(result.output, /^branch=hotfix\/1\.37\.3$/m);
  });

  test('finalize accepts an existing hotfix branch without a strict stable tag', () => {
    const { work } = createRepoWithRemote();
    runGit(work, ['checkout', '-b', 'hotfix/1.37.3']);
    runGit(work, ['push', 'origin', 'hotfix/1.37.3']);

    const result = runValidate(work, {
      ACTION: 'finalize',
      VERSION: '1.37.3',
    });

    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.output, /^branch=hotfix\/1\.37\.3$/m);
  });
});
