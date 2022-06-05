import { parentPort, workerData } from 'worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  if (workerData.n) {
    const result = nthFibonacci(workerData.n);

    parentPort.postMessage(result);
  } else {
    throw new Error('No \'n\' param in workerData');
  }
};

if (parentPort && workerData) sendResult();
