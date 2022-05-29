const { platform } = require('os');
const { exec } = require('child_process');

const WINDOW = 'win32';

const osPlatform = platform();
const args = process.argv.slice(2);
const [url] = args;

if (url === undefined) {
  console.error('Please enter a URL');
  process.exit(0);
}

let command;

if (osPlatform === WINDOW) {
  command = `start microsoft-edge:${url}`;
} else {
  command = `open -a "Google Chrome" ${url}`;
}

console.log(`executing command: ${command}`);

exec(command);
// node open.js "https://www.google.com"
