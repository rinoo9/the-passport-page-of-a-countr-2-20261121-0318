// the-passport-page-of-a-countr-2-20261121-0318 entry: copy the
// invented passport spread to the output dir.
// Node 22, standard library only. The grader runs this twice and both
// runs must write the same bytes, so the program does a plain file copy
// and nothing else: no network, no clock, no randomness.
//
// Before copying, the PNG is validated so a corrupt or wrong-sized image
// fails loudly instead of shipping silently: the 8-byte PNG signature must
// match, the IHDR chunk must declare exactly 1024x1024, and the file must
// stay within the bounty cap of 1 MiB. After writing, the output is read
// back and compared byte for byte with the source.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
const MAX_BYTES = 1024 * 1024;

const png = readFileSync(join(here, 'entry.png'));

if (png.length > MAX_BYTES) {
  throw new Error(
    `entry.png: ${png.length} bytes exceeds the 1 MiB cap`,
  );
}
// PNG signature: 137 80 78 71 13 10 26 10.
const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
for (let i = 0; i < signature.length; i++) {
  if (png[i] !== signature[i]) {
    throw new Error(`entry.png: bad PNG signature at byte ${i}`);
  }
}
// IHDR chunk: length (4 bytes) + "IHDR" (4 bytes) + width (4 bytes BE)
// + height (4 bytes BE). It starts at byte 8.
if (png.toString('ascii', 12, 16) !== 'IHDR') {
  throw new Error('entry.png: first chunk is not IHDR');
}
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error(
    `entry.png: expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}, got ${width}x${height}`,
  );
}
// IHDR continues: bit depth (1 byte) + color type (1 byte) at bytes
// 24-25. The spread is drawn as 8-bit RGB, so anything else means the
// source image was replaced by something the composer never wrote.
const bitDepth = png[24];
const colorType = png[25];
if (bitDepth !== 8 || colorType !== 2) {
  throw new Error(
    `entry.png: expected 8-bit RGB, got bit depth ${bitDepth}, color type ${colorType}`,
  );
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
writeFileSync(outPath, png);
const written = readFileSync(outPath);
if (!written.equals(png)) {
  throw new Error('entry.png: written bytes differ from source');
}
console.log(`entry.png written (${png.length} bytes, ${width}x${height})`);
