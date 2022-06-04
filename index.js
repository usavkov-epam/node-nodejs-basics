import { parseArgs } from './src/cli/args.js';
import { parseEnv } from './src/cli/env.js';

import { spawnChildProcess } from './src/cp/cp.js';

import { copy } from './src/fs/copy.js';
import { create } from './src/fs/create.js';
import { remove } from './src/fs/delete.js';
import { list } from './src/fs/list.js';
import { read } from './src/fs/read.js';
import { rename } from './src/fs/rename.js';

import { calculateHash } from './src/hash/calcHash.js';

// import { createMyServer, unknownObject } from './src/modules/cjsToEsm.mjs';

import { read as readStream } from './src/streams/read.js';
import { transform } from './src/streams/transform.js';
import { write } from './src/streams/write.js';

import { performCalculations } from './src/wt/main.js';
// import { sendResult } from './src/wt/worker.js';

import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';

const [moduleName, taskName, ...fnArgs] = process.argv.slice(2);

const wrapLog = (fn, ...args) => {
  console.log('--------------------------------------------------------------');
  fn(...args);
  console.log('--------------------------------------------------------------');
}
const logUnexistingTask = () => {
  wrapLog(() => console.log('There is no task with this params. Please check CLI arguments.'));
}

const tasksMap = {
  cli: {
    args: parseArgs,
    env: parseEnv,
  },
  cp: {
    cp: spawnChildProcess,
  },
  fs: {
    copy: copy,
    create: create,
    delete: remove,
    list: list,
    read: read,
    rename: rename,
  },
  hash: {
    calcHash: () => calculateHash().then(res => wrapLog(() => console.log(res))),
  },
  modules: {
    cjsToEsm: () => {
      import('./src/modules/cjsToEsm.mjs')
        .then(({ createMyServer, unknownObject }) => {
          createMyServer.listen(3000, () => {
            console.log();
            wrapLog(() => {
              console.log(`Unknown object: ${JSON.stringify(unknownObject)}`);
              console.log('Server is listening on port 3000. Please open http://localhost:3000/ in your browser to check result.');
              console.log('Precc Ctrl + C to exit');
            });
          })
        });
      
    },
  },
  streams: {
    read: readStream,
    transform: transform,
    write: write,
  },
  wt: {
    main: () => performCalculations().then(res => wrapLog(() => console.log(res))),
    worker: () => wrapLog(() => console.log('Please check this task manually or in scope of \'wt main\'.')),
  },
  zip: {
    compress: compress,
    decompress: decompress,
  },
}

if (!moduleName || !taskName) {
  console.log('Please provide module name and task name.');
} else if (!tasksMap[moduleName][taskName]) {
  logUnexistingTask();
} else {
  try {
    tasksMap[moduleName][taskName](...fnArgs.map(arg => {
      try {
        const parsed = JSON.parse(arg);
        return parsed;
      } catch {
        return arg;
      }
    }))
  } catch (error) {
    console.log('error', error);
  }
}
