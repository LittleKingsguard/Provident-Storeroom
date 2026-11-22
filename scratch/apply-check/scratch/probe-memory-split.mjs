import { storeCreate } from '../bindings/js/index.mjs';
import { createRequire } from 'node:module';
const addon = createRequire(import.meta.url)('../bindings/js/build/Release/storeroom_js_binding.node');
const STORE_INDEX = Symbol.for('provident-storeroom.storeIndex');
const N = Number(process.argv[2] ?? 1000);
const B = Number(process.argv[3] ?? 4);
const settle = async () => { global.gc(); global.gc(); await new Promise((r) => setTimeout(r, 25)); global.gc(); };
const snap = () => { const m = process.memoryUsage(); return { rss: m.rss, heapTotal: m.heapTotal, heapUsed: m.heapUsed, external: m.external, arrayBuffers: m.arrayBuffers }; };
const fmt = (a, b) => Object.fromEntries(Object.keys(a).map((k) => [k, Math.round((b[k] - a[k]) / N)]));
await settle();
let prev = snap();
for (let b = 0; b < B; b += 1) {
  const ids = [];
  for (let i = 0; i < N; i += 1) { const s = storeCreate({ journalLength: 8, listeners: [] }); ids.push(s[STORE_INDEX]); }
  await settle();
  const now = snap();
  console.log(JSON.stringify({ batch: b + 1, perStoreBytes: fmt(prev, now) }));
  prev = now;
}
// and the plain-object control: N small objects with a few closures, dropped
await settle();
let prev2 = snap();
for (let i = 0; i < N; i += 1) { const o = { a: () => 1, b: () => 2, c: () => 3 }; void o; }
await settle();
console.log(JSON.stringify({ controlClosures: fmt(prev2, snap()) }));
