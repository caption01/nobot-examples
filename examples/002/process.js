process.stdout.write('Type something .. \n');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chuck = process.stdin.read();

  if (chuck !== null) {
    process.stdout.write(`You are typing ${chuck}\n`);
    process.exit(0);
  }
});
