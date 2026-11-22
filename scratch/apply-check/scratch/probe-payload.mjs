import { storeCreate } from '../bindings/js/index.mjs';
import { createRequire } from 'node:module';
const addon = createRequire(import.meta.url)('../bindings/js/build/Release/storeroom_js_binding.node');
const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');
const N = Number(process.argv[2] ?? 300);
const B = Number(process.argv[3] ?? 3);
const WARM = Number(process.argv[4] ?? 1);
const PAYLOAD_CHARS = Number(process.argv[5] ?? 131072);
const PAYLOAD = 'x'.repeat(PAYLOAD_CHARS);
const settle = async () => { global.gc(); global.gc(); await new Promise((r) => setTimeout(r, 25)); global.gc(); };
async function batch() {
  const ids = [];
  for (let i = 0; i < N; i += 1) {
    const s = storeCreate({ journalLength: 8, listeners: [] });
    s.write(['p'], 'mem', PAYLOAD);
    ids.push(s[STORE_INDEX]);
  }
  await settle();
  return ids;
}
await settle();
for (let w = 0; w < WARM; w += 1) await batch();
let prev = process.memoryUsage().rss;
const perBatch = [];
let firstIds = [];
for (let b = 0; b < B; b += 1) {
  const ids = await batch();
  if (b === 0) firstIds = ids;
  const now = process.memoryUsage().rss;
  perBatch.push(Math.round((now - prev) / N));
  prev = now;
}
let released = 0; let absent = false; let held = 0;
for (const id of firstIds) {
  try { addon.storeRelease(id); held += 1; } catch (e) { if (e && e.status === 'AddressNotFound') released += 1; else absent = true; }
}
console.log(JSON.stringify({ N, PAYLOAD_CHARS, perBatchPerStore: perBatch, released, held, absent }));
