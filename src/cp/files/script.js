const args = process.argv.slice(2);

const CP = '\x1b[34m(Child)\x1b[0m';

console.log(`${CP} Total number of arguments is ${args.length}`);
console.log(`${CP} Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    process.stdout.write(`${CP} Received from master process: ${chunk.toString()}\n`)
};

process.stdin.on('data', echoInput);
