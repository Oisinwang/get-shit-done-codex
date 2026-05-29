#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const DEFAULT_README = path.join(ROOT, 'README.md');
const DEFAULT_DEMO = path.join(ROOT, 'docs', 'DEMO.md');
const DEMO_LINK_PATTERN = /\[60-second GSD Codex demo\]\(https?:\/\/[^)\s]+[^)]*\)/;
const PLACEHOLDERS = [
  {
    label: 'README.md',
    pattern: /Finished demo link: place a published `60-second GSD Codex demo` link/,
  },
  {
    label: 'docs/DEMO.md',
    pattern: /When the recording is ready, place the finished demo link/,
  },
];

function parseArgs(argv) {
  const options = {
    demoPath: DEFAULT_DEMO,
    readmePath: DEFAULT_README,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--readme' && next) {
      options.readmePath = path.resolve(next);
      index += 1;
      continue;
    }

    if (arg === '--demo' && next) {
      options.demoPath = path.resolve(next);
      index += 1;
      continue;
    }

    throw new Error(`Unknown or incomplete argument: ${arg}`);
  }

  return options;
}

function readFile(label, filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`${label} could not be read at ${filePath}: ${error.message}`);
  }
}

function checkDocument({ content, label, placeholderPattern }) {
  const problems = [];

  if (placeholderPattern.test(content)) {
    problems.push(`${label} still contains placeholder text`);
  }

  if (!DEMO_LINK_PATTERN.test(content)) {
    problems.push(`${label} is missing a public 60-second GSD Codex demo link`);
  }

  return problems;
}

function main() {
  const { demoPath, readmePath } = parseArgs(process.argv.slice(2));
  const readme = readFile('README.md', readmePath);
  const demo = readFile('docs/DEMO.md', demoPath);

  const problems = [
    ...checkDocument({
      content: readme,
      label: 'README.md',
      placeholderPattern: PLACEHOLDERS[0].pattern,
    }),
    ...checkDocument({
      content: demo,
      label: 'docs/DEMO.md',
      placeholderPattern: PLACEHOLDERS[1].pattern,
    }),
  ];

  if (problems.length > 0) {
    console.error('Showcase readiness check failed:');
    for (const problem of problems) {
      console.error(`- ${problem}`);
    }
    process.exit(1);
  }

  console.log('Showcase readiness check passed.');
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
