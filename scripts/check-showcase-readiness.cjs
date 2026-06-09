#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const DEFAULT_README = path.join(ROOT, 'README.md');
const DEFAULT_DEMO = path.join(ROOT, 'docs', 'DEMO.md');
const DEFAULT_DOCS_README = path.join(ROOT, 'docs', 'README.md');
const DEMO_TRANSCRIPT_URL = 'https://github.com/Oisinwang/get-shit-done-codex/blob/codex/bootstrap/docs/DEMO-60-SECOND.md';
const DEMO_LINK = `[60-second GSD Codex demo](${DEMO_TRANSCRIPT_URL})`;
const LOCAL_TRANSCRIPT_LINKS = [
  '[Demo Transcript](DEMO-60-SECOND.md)',
  '[60-second GSD Codex demo](DEMO-60-SECOND.md)',
];
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
    docsReadmePath: DEFAULT_DOCS_README,
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

    if (arg === '--docs-readme' && next) {
      options.docsReadmePath = path.resolve(next);
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

function checkDocument({ allowLocalTranscriptLink = false, content, label, placeholderPattern }) {
  const problems = [];

  if (placeholderPattern?.test(content)) {
    problems.push(`${label} still contains placeholder text`);
  }

  const hasDemoLink = content.includes(DEMO_LINK)
    || (allowLocalTranscriptLink && LOCAL_TRANSCRIPT_LINKS.some(link => content.includes(link)));

  if (!hasDemoLink) {
    problems.push(`${label} is missing the repo-hosted 60-second GSD Codex demo transcript link`);
  }

  return problems;
}

function main() {
  const { demoPath, docsReadmePath, readmePath } = parseArgs(process.argv.slice(2));
  const readme = readFile('README.md', readmePath);
  const docsReadme = readFile('docs/README.md', docsReadmePath);
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
    ...checkDocument({
      allowLocalTranscriptLink: true,
      content: docsReadme,
      label: 'docs/README.md',
      placeholderPattern: null,
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
