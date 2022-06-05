import { cpus } from 'os';
import path from 'path';
import { isMainThread, Worker } from 'worker_threads';

import {
  checkCanBePerformed,
  getDirname,
} from '../utils.js';

const __dirname = getDirname(import.meta.url);

const CPU_COUNT = cpus().length;
const INIT_NUM = 10;

const src = path.resolve(__dirname, 'worker.js');

const createWorker = (n) => new Promise((resolve) => {
  const worker = new Worker(src, {
    workerData: { n },
  });

  worker.on('message', (result) => {
    resolve({
      status: 'resolved',
      data: result,
    })
  });
  worker.on('error', (error) => {
    resolve({
      status: 'error',
      data: null,
    })
  });
});

export const performCalculations = async () => {
  await checkCanBePerformed({ src });

  if (isMainThread) {
    const workers = new Array(CPU_COUNT).fill(null)
      .map((_, index) => createWorker(INIT_NUM + index));

    const results = await Promise.all(workers);
    return results;
  }
};
