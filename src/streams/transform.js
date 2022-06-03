import { Transform } from 'stream';

export const transform = async () => {
  const transformStream = new Transform({
    transform: (chunk, _encoding, callback) => {
      callback(null, `${chunk.toString().trim().split('').reverse().join('')}\n`);
    },
  });

  return process.stdin.pipe(transformStream).pipe(process.stdout);

};
