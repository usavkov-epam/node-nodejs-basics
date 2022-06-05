import { createReadStream } from 'fs';
import { resolve } from 'path';

import {
  checkCanBePerformed,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files', 'fileToRead.txt');

export const read = async () => {
  await checkCanBePerformed({ src });

  return createReadStream(src).pipe(process.stdout);
};
