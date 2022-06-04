import { spawn } from 'child_process';
import { join } from 'path';

import {
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const MAIN_PROCESS = '\x1b[32m(Main)\x1b[0m'

export const spawnChildProcess = async (args) => {
  if (!Array.isArray(args)) throw new Error('First argument must be an array');

  const childProcess = spawn(
    'node',
    [join(__dirname, 'files', 'script.js'), ...args],
    { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] }
  );

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  childProcess.stdout.on('data', (data) => {
    process.stdout.write(`${MAIN_PROCESS} From child process \x1b[1mstdout\x1b[0m: \x1b[4m${data.toString()}\x1b[0m\n`);
  });
};
