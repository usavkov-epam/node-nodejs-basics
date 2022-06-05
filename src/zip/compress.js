import {
  createReadStream,
  createWriteStream,
} from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream';
import { createGzip } from 'zlib';

import {
  checkCanBePerformed,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files', 'fileToCompress.txt');
const dest = resolve(__dirname, 'files', 'archive.gz');

export const compress = async () => {
  await checkCanBePerformed({ src, dest });

  const gzip = createGzip();
  const source = createReadStream(src);
  const destination = createWriteStream(dest);

  pipeline(source, gzip, destination, (error) => {
    if (error) {
      console.log(error);
    }
  })
};
