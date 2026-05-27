#!/usr/bin/env node
'use strict';

const PACKAGE_NAME = '@oisinwang/get-shit-done-codex';

const payload = {
  name: 'safe-trial-demo',
  package: PACKAGE_NAME,
  expectedChangedPaths: ['.codex/', 'AGENTS.md', '.planning/'],
  flows: {
    sandbox: {
      title: 'Sandbox trial',
      commands: [
        'mkdir gsd-codex-trial',
        'cd gsd-codex-trial',
        'git init',
        `npx ${PACKAGE_NAME}@latest --codex --local`,
        '$gsd-new-project --auto',
        '$gsd-next',
        'git status --short',
      ],
    },
    existingRepository: {
      title: 'Existing repository trial',
      commands: [
        'git status --short',
        'git switch -c evaluate-gsd-codex',
        `npx ${PACKAGE_NAME}@latest --codex --local`,
        '$gsd-new-project --auto',
        '$gsd-next',
        'git status --short',
      ],
    },
  },
  notes: [
    'This script prints commands only; it does not install or modify files.',
    'Expected setup files are .codex/, AGENTS.md, and .planning/.',
    'Remove the throwaway directory or delete the trial branch when you are done evaluating.',
  ],
};

function printFlow(flow) {
  console.log(`${flow.title}:`);
  for (const command of flow.commands) {
    console.log(`  ${command}`);
  }
  console.log('');
}

function printText() {
  console.log('GSD Codex safe trial demo');
  console.log('=========================');
  console.log('');
  console.log(payload.notes[0]);
  console.log('');
  printFlow(payload.flows.sandbox);
  printFlow(payload.flows.existingRepository);
  console.log(`Expected changed paths: ${payload.expectedChangedPaths.join(', ')}`);
  console.log(payload.notes[2]);
}

function printHelp() {
  console.log('Usage: node scripts/safe-trial-demo.cjs [--json]');
  console.log('');
  console.log('Prints the safe GSD Codex trial flow without running any commands.');
}

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    return;
  }

  if (argv.includes('--json')) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const unknownArgs = argv.filter(arg => arg !== '--json');
  if (unknownArgs.length > 0) {
    console.error(`Unknown argument: ${unknownArgs[0]}`);
    console.error('Run with --help for usage.');
    process.exit(1);
  }

  printText();
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = {
  payload,
};
