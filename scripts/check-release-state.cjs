#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const DEFAULT_PACKAGE_JSON = path.join(ROOT, 'package.json');
const DEFAULT_CHANGELOG = path.join(ROOT, 'CHANGELOG.md');

function parseArgs(argv) {
  const options = {
    changelogPath: DEFAULT_CHANGELOG,
    metadataPath: '',
    packageJsonPath: DEFAULT_PACKAGE_JSON,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--package-json' && next) {
      options.packageJsonPath = path.resolve(next);
      index += 1;
      continue;
    }

    if (arg === '--changelog' && next) {
      options.changelogPath = path.resolve(next);
      index += 1;
      continue;
    }

    if (arg === '--npm-metadata' && next) {
      options.metadataPath = path.resolve(next);
      index += 1;
      continue;
    }

    throw new Error(`Unknown or incomplete argument: ${arg}`);
  }

  return options;
}

function readJson(label, filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`${label} could not be read at ${filePath}: ${error.message}`);
  }
}

function readFile(label, filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`${label} could not be read at ${filePath}: ${error.message}`);
  }
}

function buildNpmViewInvocation(packageName, platform = process.platform) {
  const npmArgs = [
    'view',
    packageName,
    'version',
    'dist-tags',
    'time',
    '--json',
  ];

  if (platform === 'win32') {
    return {
      command: 'cmd.exe',
      args: ['/d', '/s', '/c', 'npm.cmd', ...npmArgs],
    };
  }

  return {
    command: 'npm',
    args: npmArgs,
  };
}

function readNpmMetadata(packageName, metadataPath) {
  if (metadataPath) {
    return readJson('npm metadata', metadataPath);
  }

  try {
    const invocation = buildNpmViewInvocation(packageName);
    const output = execFileSync(invocation.command, invocation.args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return JSON.parse(output);
  } catch (error) {
    const stderr = error.stderr?.toString().trim();
    throw new Error(stderr || error.message);
  }
}

function versionParts(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(version || '');
  if (!match) {
    throw new Error(`Invalid semver version: ${version || '(empty)'}`);
  }

  return match.slice(1, 4).map(Number);
}

function compareSemver(a, b) {
  const left = versionParts(a);
  const right = versionParts(b);

  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] - right[index];
    }
  }

  return 0;
}

function nextPatchVersion(version) {
  const [major, minor, patch] = versionParts(version);
  return `${major}.${minor}.${patch + 1}`;
}

function unreleasedSection(changelog) {
  const marker = /^## \[Unreleased\][^\n]*(?:\r?\n)?/m.exec(changelog);
  if (!marker) return '';

  const sectionStart = marker.index + marker[0].length;
  const remainder = changelog.slice(sectionStart);
  const nextSectionIndex = remainder.search(/^## \[/m);

  return nextSectionIndex === -1 ? remainder : remainder.slice(0, nextSectionIndex);
}

function hasPackageFacingUnreleasedEntries(changelog) {
  const section = unreleasedSection(changelog);
  return /^\s*[-*]\s+\S/m.test(section);
}

function validate({ changelog, metadata, packageJson }) {
  const problems = [];
  const notes = [];
  const packageName = packageJson.name;
  const localVersion = packageJson.version;
  const latestVersion = metadata?.['dist-tags']?.latest || metadata?.version || '';
  const publishedVersions = metadata?.time || {};
  const localVersionAlreadyPublished = Boolean(publishedVersions[localVersion]);
  const hasUnreleasedEntries = hasPackageFacingUnreleasedEntries(changelog);

  if (!packageName) problems.push('package.json is missing name');
  if (!localVersion) problems.push('package.json is missing version');
  if (!latestVersion) problems.push('npm metadata is missing latest version');

  if (localVersion && latestVersion) {
    const comparison = compareSemver(localVersion, latestVersion);
    if (comparison < 0) {
      problems.push(`Local package version ${localVersion} is behind npm latest ${latestVersion}`);
    }
  }

  if (localVersionAlreadyPublished && hasUnreleasedEntries) {
    problems.push(
      `${packageName}@${localVersion} is already published, but CHANGELOG [Unreleased] has package-facing entries; the next patch version is ${nextPatchVersion(localVersion)}`,
    );
  }

  if (!hasUnreleasedEntries) {
    notes.push('No package-facing [Unreleased] entries detected.');
  }

  return {
    hasUnreleasedEntries,
    latestVersion,
    localVersion,
    notes,
    packageName,
    problems,
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const packageJson = readJson('package.json', options.packageJsonPath);
  const changelog = readFile('CHANGELOG.md', options.changelogPath);
  const metadata = readNpmMetadata(packageJson.name, options.metadataPath);
  const result = validate({ changelog, metadata, packageJson });

  console.log(`Local package: ${result.packageName}@${result.localVersion}`);
  console.log(`npm latest: ${result.latestVersion}`);
  console.log(`Unreleased entries: ${result.hasUnreleasedEntries ? 'yes' : 'no'}`);

  for (const note of result.notes) {
    console.log(note);
  }

  if (result.problems.length > 0) {
    console.error('Release state check failed:');
    for (const problem of result.problems) {
      console.error(`- ${problem}`);
    }
    process.exit(1);
  }

  console.log('Release state check passed.');
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  buildNpmViewInvocation,
  compareSemver,
  hasPackageFacingUnreleasedEntries,
  nextPatchVersion,
  validate,
};
