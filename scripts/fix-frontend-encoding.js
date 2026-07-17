const fs = require("fs");
const path = require("path");

const roots = ["frontend/app", "frontend/components"];

const s = (...codes) => String.fromCodePoint(...codes);

const replacements = [
  [s(0x00c3, 0x00a1), s(0x00e1)], // á
  [s(0x00c3, 0x00a0), s(0x00e0)], // à
  [s(0x00c3, 0x00a9), s(0x00e9)], // é
  [s(0x00c3, 0x00aa), s(0x00ea)], // ê
  [s(0x00c3, 0x00ad), s(0x00ed)], // í
  [s(0x00c3, 0x00b3), s(0x00f3)], // ó
  [s(0x00c3, 0x00b4), s(0x00f4)], // ô
  [s(0x00c3, 0x00ba), s(0x00fa)], // ú
  [s(0x00c3, 0x00a7), s(0x00e7)], // ç
  [s(0x00c3, 0x00a3), s(0x00e3)], // ã
  [s(0x00c3, 0x00b5), s(0x00f5)], // õ

  [s(0x00c3, 0x0081), s(0x00c1)], // Á
  [s(0x00c3, 0x0089), s(0x00c9)], // É
  [s(0x00c3, 0x008d), s(0x00cd)], // Í
  [s(0x00c3, 0x0093), s(0x00d3)], // Ó
  [s(0x00c3, 0x009a), s(0x00da)], // Ú
  [s(0x00c3, 0x0087), s(0x00c7)], // Ç
  [s(0x00c3, 0x0083), s(0x00c3)], // Ã

  [s(0x00e2, 0x20ac, 0x0153), s(0x201c)], // “
  [s(0x00e2, 0x20ac, 0x009d), s(0x201d)], // ”
  [s(0x00e2, 0x20ac, 0xfffd), s(0x201d)], // ”
  [s(0x00e2, 0x20ac, 0x201d), s(0x2014)], // —
  [s(0x00e2, 0x20ac, 0x201c), s(0x2013)], // –
  [s(0x00e2, 0x2020, 0x2019), s(0x2192)], // →
  [s(0x00e2, 0x2020, 0x0090), s(0x2190)], // ←

  [s(0x00c2, 0x00a0), " "],
];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    if (entry.isFile() && fullPath.endsWith(".tsx")) {
      return [fullPath];
    }

    return [];
  });
}

const files = roots.flatMap(walk);

let totalChangedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    totalChangedFiles += 1;
    console.log(`Cleaned ${file}`);
  }
}

console.log(`Done. Changed ${totalChangedFiles} file(s).`);