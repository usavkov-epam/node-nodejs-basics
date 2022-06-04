import path from 'path';
import { createServer as createServerHttp } from 'http';
import { createRequire } from 'module';
import { release, version } from 'os';
import { fileURLToPath } from 'url';

import './files/c.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const random = Math.random();
const importFile = createRequire(import.meta.url);

export const unknownObject = random > 0.5 
  ? importFile('./files/a.json')
  : importFile('./files/b.json');

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});
