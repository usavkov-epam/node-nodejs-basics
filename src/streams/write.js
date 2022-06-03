import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'files', 'fileToWrite.txt');

export const write = async () => {
  const writable = fs.createWriteStream(filePath);

  return process.stdin.pipe(writable);
};
