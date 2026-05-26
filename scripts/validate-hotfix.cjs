#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const { execFileSync, spawnSync } = require('node:child_process');

function actionError(message) {
  console.error(`::error::${message}`);
  process.exit(1);
}

function runGit(args) {
  try {
    return execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch (err) {
    const stderr = err.stderr?.toString().trim();
    actionError(stderr || err.message);
  }
}

function parseVersion(version) {
  const match = /^([0-9]+)\.([0-9]+)\.([1-9][0-9]*)$/.exec(version || '');
  if (!match) {
    actionError('Version must be a patch release (e.g., 1.27.1, not 1.28.0)');
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function parseReleaseTag(tag) {
  const match = /^v([0-9]+)\.([0-9]+)\.([0-9]+)(?:-codex\.([0-9]+))?$/.exec(tag);
  if (!match) return null;
  return {
    tag,
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    codexPatch: match[4] === undefined ? 0 : Number(match[4]),
  };
}

function compareTag(a, b) {
  for (const key of ['major', 'minor', 'patch', 'codexPatch']) {
    if (a[key] !== b[key]) return a[key] - b[key];
  }
  return 0;
}

function findBaseTag(versionParts) {
  const target = { ...versionParts, codexPatch: 0 };
  const pattern = `v${versionParts.major}.${versionParts.minor}.*`;
  const tags = runGit(['tag', '-l', pattern])
    .split(/\r?\n/)
    .map(tag => tag.trim())
    .filter(Boolean)
    .map(parseReleaseTag)
    .filter(tag => tag
      && tag.major === versionParts.major
      && tag.minor === versionParts.minor
      && compareTag({ ...tag, codexPatch: 0 }, target) < 0);

  tags.sort(compareTag);
  return tags.length > 0 ? tags[tags.length - 1].tag : '';
}

function remoteBranchExists(branch) {
  const result = spawnSync('git', [
    'ls-remote',
    '--exit-code',
    'origin',
    `refs/heads/${branch}`,
  ], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status === 0) return true;
  if (result.status === 2) return false;

  const stderr = result.stderr?.trim();
  actionError(stderr || `Unable to inspect remote branch ${branch}`);
}

function writeOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath) {
    fs.appendFileSync(outputPath, `${name}=${value}\n`);
  } else {
    console.log(`${name}=${value}`);
  }
}

function main() {
  const action = process.env.ACTION || process.argv[2] || '';
  const version = process.env.VERSION || process.argv[3] || '';
  const versionParts = parseVersion(version);
  const branch = `hotfix/${version}`;
  const baseTag = findBaseTag(versionParts);

  if (action === 'finalize') {
    if (!remoteBranchExists(branch)) {
      actionError(`Branch ${branch} does not exist. Run create first or push the hotfix branch.`);
    }
  } else if (action === 'create') {
    if (!baseTag) {
      actionError(`No prior release tag found for ${versionParts.major}.${versionParts.minor}.x before v${version}`);
    }
  } else {
    actionError('Action must be create or finalize');
  }

  writeOutput('base_tag', baseTag);
  writeOutput('branch', branch);
}

if (require.main === module) {
  main();
}

module.exports = {
  findBaseTag,
  parseReleaseTag,
  parseVersion,
  remoteBranchExists,
};
