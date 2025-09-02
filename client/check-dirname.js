// check-dirname.js
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

function scanDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      scanDir(fullPath);
    } else if (file.isFile() && /\.(js|ts|mjs|tsx|jsx)$/.test(file.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('__dirname') || content.includes('fileURLToPath')) {
        console.log(`[POTENTIAL ISSUE] ${fullPath}`);
      }
    }
  }
}

console.log('Scanning for __dirname or fileURLToPath usage...');
scanDir(rootDir);
console.log('Scan complete.');
