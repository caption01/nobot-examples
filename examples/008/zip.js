/* eslint-disable function-paren-newline */
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const ZLIP_BEST_COMPRESSION = 9;

// create a file for stream data archive to
const zipPath = path.join(__dirname, 'files.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: ZLIP_BEST_COMPRESSION },
});

output.on('close', () => {
  console.log(`Total bytes: ${archive.pointer()}`);
  console.log('arcgiving has now finished.');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// add files
const textPath = path.join(__dirname, 'copy.txt');
const logoPath = path.join(__dirname, 'logo.jpg');

archive.append(fs.createReadStream(textPath), {
  name: 'content.txt',
});

archive.append(fs.createReadStream(logoPath), {
  name: 'nobot.jpg',
});

// finalize the archive
archive.finalize();
