const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../public/assets/como-frames');
const destTar = path.resolve(__dirname, '../public/assets/como-frames.tar');

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}

console.log('Bundling como-frames into como-frames.tar...');
try {
  // Use native tar. In macOS/Linux, this is standard, extremely fast, and robust.
  // We sort files to guarantee alphabetical order (frame_001.jpg, frame_002.jpg, etc.)
  execSync(`tar -cf "${destTar}" -C "${srcDir}" $(ls "${srcDir}" | sort)`);
  console.log(`Successfully bundled: ${destTar} (${fs.statSync(destTar).size} bytes)`);
} catch (error) {
  console.error('Failed to bundle using system tar:', error.message);
  process.exit(1);
}
