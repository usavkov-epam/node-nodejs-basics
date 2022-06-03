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
import { nthFibonacci, sendResult } from './src/wt/worker.js';

import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';

const [moduleName, taskName, ...fnArgs] = process.argv.slice(2);

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
    calcHash: () => calculateHash().then(console.log),
  },
  modules: {
    cjsToEsm: () => import('./src/modules/cjsToEsm.mjs'),
  },
  streams: {
    read: readStream,
    transform: transform,
    write: write,
  },
  wt: {
    main: performCalculations,
    worker: {
      nthFibonacci: nthFibonacci,
      sendResult: sendResult,
    },
  },
  zip: {
    compress: compress,
    decompress: decompress,
  },
}

const logUnexistingTask = () => {
  console.log('--------------------------------------------------------------');
  console.log('There is no task with this params. Please check CLI arguments.');
  console.log('--------------------------------------------------------------');
}

if (!moduleName || !taskName) {
  console.log('Please provide module name and task name.');
} else if (!tasksMap[moduleName][taskName]) {
  logUnexistingTask();
} else {
  try {
    tasksMap[moduleName][taskName](...fnArgs)
  } catch (error) {
    console.log('error', error);
  }
}
