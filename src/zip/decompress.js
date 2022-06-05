import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream';
import { createGunzip } from 'zlib';

import {
  checkCanBePerformed,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const src = resolve(__dirname, 'files', 'archive.gz');
const dest = resolve(__dirname, 'files', 'fileToCompress.txt');

export const decompress = async () => {
  await checkCanBePerformed({ src, dest });

  const unzip = createGunzip();
  const source = createReadStream(src);
  const destination = createWriteStream(dest);

  pipeline(source, unzip, destination, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
