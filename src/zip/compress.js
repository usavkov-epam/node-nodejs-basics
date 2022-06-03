import {
  createReadStream,
  createWriteStream,
} from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'files', 'fileToCompress.txt');
const zipPath = path.resolve(__dirname, 'files', 'archive.gz');

export const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream(filePath);
  const destination = createWriteStream(zipPath);

  pipeline(source, gzip, destination, (error) => {
    if (error) {
      console.log(error);
    }
  })
};
