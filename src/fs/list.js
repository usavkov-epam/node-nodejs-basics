import { readdir } from 'fs/promises';
import { resolve } from 'path';

import {
  checkCanBePerformed,
  fsErrorMessage,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files');

export const list = async () => {
  await checkCanBePerformed({
    src,
    srcErrorMessage: fsErrorMessage,
  });

  return readdir(src).then(console.log);
};
