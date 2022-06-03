import { access, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const throwFSError = () => { throw new Error('FS operation failed') };

const baseName = 'fresh.txt';
const content = 'I am fresh and young';
const filePath = path.resolve(__dirname, 'files', baseName);

export const create = async () => {
  return access(filePath).then(throwFSError, () => writeFile(filePath, content));
};
