import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');

export const read = async () => {
  return fs.createReadStream(filePath).pipe(process.stdout);
};
