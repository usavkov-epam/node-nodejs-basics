import { access, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const throwFSError = () => { throw new Error('FS operation failed') };

const filesPath = path.resolve(__dirname, 'files');

export const list = async () => {
  return access(filesPath).then(
    () => readdir(filesPath).then(console.log),
    throwFSError,
  );
};
