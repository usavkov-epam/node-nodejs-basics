import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'files', 'fileToCompress.txt');
const zipPath = path.resolve(__dirname, 'files', 'archive.gz');

export const decompress = async () => {
  const unzip = createGunzip();
  const source = createReadStream(zipPath);
  const destination = createWriteStream(filePath);

  pipeline(source, unzip, destination, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
