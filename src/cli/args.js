export const parseArgs = () => {
  const args = process.argv.slice(2);
  const output = Object
    .values(args)
    .filter(arg => arg.startsWith('--'))
    .map(arg => `${arg.slice(2)} is ${args[args.indexOf(arg) + 1]}`)
    .join(', ');

  console.log(output);
};
