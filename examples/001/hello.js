const args = process.argv.slice(2);

const [name] = args;

if (name === undefined) {
  console.log('Sorry we not found a name');
  process.exit(0);
}

console.log(`Good day ${name}`);
