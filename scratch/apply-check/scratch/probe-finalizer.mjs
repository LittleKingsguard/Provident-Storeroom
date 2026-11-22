import { storeCreate } from '../bindings/js/index.mjs';
import { createRequire } from 'node:module';
const addon = createRequire(import.meta.url)('../bindings/js/build/Release/storeroom_js_binding.node');

const fired = [];
const reg = new FinalizationRegistry((v) => { fired.push(v); });

const N = 20;
const ids = [];
for (let i = 0; i < N; i += 1) {
  const s = storeCreate({ journalLength: 8, listeners: [] });
  ids.push(s[Symbol.for('provident-storeroom.storeIndex')]);
  reg.register(s, i);
}
global.gc(); global.gc();
await new Promise((r) => setTimeout(r, 30));
global.gc();
console.log('control finalizer fired:', fired.length, 'of', N);

// Did the addon release them? A released index answers AddressNotFound.
const already = [];
for (const id of ids) {
  try { addon.storeRelease(id); } catch (e) { already.push([id, e.status]); }
}
console.log('still-live (released by us now):', ids.length - already.length, 'already-released:', already.length, JSON.stringify(already));
