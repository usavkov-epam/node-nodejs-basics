import { createWriteStream } from 'fs';
import { resolve } from 'path';

import {
  checkCanBePerformed,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files', 'fileToWrite.txt');

export const write = async () => {
  await checkCanBePerformed({ src });

  const writable = createWriteStream(src);

  return process.stdin.pipe(writable);
};
