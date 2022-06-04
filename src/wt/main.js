import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { isMainThread, Worker } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CPU_COUNT = os.cpus().length;
const INIT_NUM = 10;

const createWorker = (n) => new Promise((resolve) => {
  const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
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
  if (isMainThread) {
    const workers = new Array(CPU_COUNT).fill(null)
      .map((_, index) => createWorker(INIT_NUM + index));

    const results = await Promise.all(workers);
    return results;
  }
};
