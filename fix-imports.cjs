const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory() && d.name !== 'node_modules') {
      walk(p);
    } else if (/\.tsx?$/.test(d.name)) {
      let s = fs.readFileSync(p, 'utf8');
      let t = s.replace(/\bimport\s*\{\s*Token\s*\}\s*from/g, 'import type { Token } from');
      if (t !== s) {
        fs.writeFileSync(p, t, 'utf8');
        console.log('patched', p);
      }
    }
  }
}

walk(process.cwd());
console.log('Done!');
