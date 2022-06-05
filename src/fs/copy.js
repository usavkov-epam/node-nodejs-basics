import { cp } from 'fs/promises';
import { resolve } from 'path';

import {
  checkCanBePerformed,
  fsErrorMessage,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files');
const dest = resolve(__dirname, 'files_copy');

export const copy = async () => {
  await checkCanBePerformed({
    dest,
    src,
    destErrorMessage: fsErrorMessage,
    srcErrorMessage: fsErrorMessage,
  });

  cp(src, dest, { recursive: true });
};
