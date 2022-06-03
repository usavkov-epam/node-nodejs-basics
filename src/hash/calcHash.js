import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const calculateHash = async () => {
  const hash = createHash('sha256');

  return readFile(path.resolve(__dirname, 'files', 'fileToCalculateHashFor.txt'))
    .then(data => hash.update(data).digest('hex'));
};
