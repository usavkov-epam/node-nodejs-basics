import fs from 'fs/promises';
import { resolve } from 'path';

import {
  checkCanBePerformed,
  fsErrorMessage,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const filesPath = resolve(__dirname, 'files');
const src = resolve(filesPath, 'wrongFilename.txt');
const dest = resolve(filesPath, 'properFilename.md');

export const rename = async () => {
  await checkCanBePerformed({
    dest,
    src,
    destErrorMessage: fsErrorMessage,
    srcErrorMessage: fsErrorMessage,
  });

  return fs.rename(src, dest);
};
