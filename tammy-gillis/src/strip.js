// Removes comments from the shipped script (build helper; never served).
const acorn = require(process.argv[4] || '/opt/node-tools/node_modules/acorn');
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
const cuts = [];
acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', onComment: (b, t, s, e) => cuts.push([s, e]) });
let out = '', last = 0;
for (const [s, e] of cuts) { out += src.slice(last, s); last = e; }
out += src.slice(last);
out = out.split('\n').map(l => l.replace(/\s+$/, '')).filter(l => l.trim()).join('\n') + '\n';
fs.writeFileSync(process.argv[3], out);
