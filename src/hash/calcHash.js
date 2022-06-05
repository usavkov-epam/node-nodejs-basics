import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

import {
  checkCanBePerformed,
  getDirname,
} from'../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

export const calculateHash = async () => {
  await checkCanBePerformed({ src })

  const hash = createHash('sha256');

  return readFile(src).then(data => hash.update(data).digest('hex'));
};
