import { readFile } from 'fs/promises';
import { resolve } from 'path';

import {
  getDirname,
  throwFSError,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files', 'fileToRead.txt');

export const read = async () => {
  return readFile(src, { encoding: 'utf-8' }).then(console.log, throwFSError);
};
