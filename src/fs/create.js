import { access, writeFile } from 'fs/promises';
import { resolve } from 'path';

import {
  checkCanBePerformed,
  fsErrorMessage,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const baseName = 'fresh.txt';
const content = 'I am fresh and young';

const dest = resolve(__dirname, 'files', baseName);

export const create = async () => {
  await checkCanBePerformed({
    dest,
    destErrorMessage: fsErrorMessage,
  });

  return writeFile(dest, content);
};
