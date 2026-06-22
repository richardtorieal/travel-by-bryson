const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../public/assets/como-frames');
const destTar = path.resolve(__dirname, '../public/assets/como-frames.tar');

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}

console.log('Bundling como-frames into como-frames.tar (Pure JS, Cross-Platform)...');

try {
  // Read all frame images, exclude hidden or macOS metadata files (like ._ or .DS_Store), and sort alphabetically
  const files = fs.readdirSync(srcDir)
    .filter(file => !file.startsWith('.') && !file.startsWith('._'))
    .sort();

  const outFd = fs.openSync(destTar, 'w');

  for (const fileName of files) {
    const filePath = path.join(srcDir, fileName);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const fileData = fs.readFileSync(filePath);

    // Allocate 512-byte header block
    const header = Buffer.alloc(512);

    // 1. Filename (offset 0, up to 100 bytes, null-terminated)
    header.write(fileName, 0, 'utf8');

    // 2. File mode (offset 100, 8 bytes octal)
    header.write('0000644\0', 100, 'ascii');

    // 3. Owner UID (offset 108, 8 bytes octal)
    header.write('0000000\0', 108, 'ascii');

    // 4. Group GID (offset 116, 8 bytes octal)
    header.write('0000000\0', 116, 'ascii');

    // 5. File size in octal (offset 124, 12 bytes octal, null terminated)
    const octalSize = fileData.length.toString(8).padStart(11, '0') + '\0';
    header.write(octalSize, 124, 'ascii');

    // 6. Modification time (offset 136, 12 bytes octal)
    const octalMtime = Math.floor(stat.mtimeMs / 1000).toString(8).padStart(11, '0') + '\0';
    header.write(octalMtime, 136, 'ascii');

    // 7. Checksum placeholder (offset 148, 8 bytes initialized to spaces)
    header.write('        ', 148, 'ascii');

    // 8. Type indicator '0' for regular file (offset 156)
    header.write('0', 156, 'ascii');

    // Calculate header checksum
    let checksum = 0;
    for (let i = 0; i < 512; i++) {
      checksum += header[i];
    }

    // Write computed checksum to header
    const checksumString = checksum.toString(8).padStart(6, '0') + '\0 ';
    header.write(checksumString, 148, 'ascii');

    // Write header and content blocks to output archive
    fs.writeSync(outFd, header);
    fs.writeSync(outFd, fileData);

    // Pad file data block to multiple of 512 bytes
    const remainder = fileData.length % 512;
    if (remainder > 0) {
      const padding = Buffer.alloc(512 - remainder);
      fs.writeSync(outFd, padding);
    }
  }

  // End of archive marker: 1024 bytes of nulls
  const endMarker = Buffer.alloc(1024);
  fs.writeSync(outFd, endMarker);

  fs.closeSync(outFd);
  console.log(`Successfully bundled: ${destTar} (${fs.statSync(destTar).size} bytes)`);
} catch (error) {
  console.error('Failed to bundle frames:', error.message);
  process.exit(1);
}
