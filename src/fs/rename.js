import fs, { access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const throwFSError = () => { throw new Error('FS operation failed') };

const filesPath = path.resolve(__dirname, 'files');
const oldFile = path.resolve(filesPath, 'wrongFilename.txt');
const newFile = path.resolve(filesPath, 'properFilename.md');

export const rename = async () => {
  return access(oldFile).then(
    () => access(newFile).then(throwFSError, () => fs.rename(oldFile, newFile)),
    throwFSError,
  );
};
