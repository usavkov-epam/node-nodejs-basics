import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const throwFSError = () => { throw new Error('FS operation failed') };

const filePath = path.resolve(__dirname, 'files', 'fileToRemove.txt');

export const remove = async () => {
  return fs.rm(filePath).catch(throwFSError);
};
