import { access, cp } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const throwFSError = () => { throw new Error('FS operation failed') };

const src = path.resolve(__dirname, 'files');
const dest = path.resolve(__dirname, 'files_copy');

export const copy = async () => {
  return access(src).then(
    () => access(dest).then(throwFSError, () => cp(src, dest, { recursive: true })),
    throwFSError,
  );
};
