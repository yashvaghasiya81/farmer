
const fs = require('fs');
const archiver = require('archiver');

// Create a file to stream archive data to
const output = fs.createWriteStream('farmmarketplace.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('Archive created successfully!');
  console.log('Total bytes: ' + archive.pointer());
  console.log('Download your zip file from the Files panel');
});

// Handle archiving errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories
// Exclude node_modules and other unnecessary files
archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    '.git/**',
    'farmmarketplace.zip',
    '.breakpoints',
    'create-zip.js'
  ]
});

// Finalize the archive
archive.finalize();
