import { write as storeWrite, storeCreate } from 'provident-storeroom';
const { register, commit, runAttempt } = await import('../bindings/js/src/constraint-kernel.mjs');
const store = storeCreate({ journalLength: 8, listeners: [] });
const watch = ['ab'];
const op = ['ab', 'op'];
const runs = [];
store.on(watch, () => runs.push(1));
register(store, op, 'x', () => true);
storeWrite(store, watch, 'mem', { link: 1 });
const rec = commit(store, op, 'mem', 'v');   // K-2, NO K-3: the attempt is ABANDONED
const beforeArm = runs.length;
const out = runAttempt(store, rec);          // the LATE terminal arm
console.log('abandoned: runs before the late arm', beforeArm, '| arm', out.outcome,
  '| runs at the arm', runs.length - beforeArm, '| pending after', rec.pending.length);
const b = runs.length;
storeWrite(store, op, 'mem', 'after');
console.log('bare write after: runs', runs.length - b);
