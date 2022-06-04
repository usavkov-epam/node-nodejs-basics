import { rm } from 'fs/promises';
import { resolve } from 'path';

import {
  getDirname,
  throwFSError,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files', 'fileToRemove.txt');

export const remove = async () => {
  return rm(src).catch(throwFSError);
};
