import { write as storeWrite } from 'provident-storeroom';
const { register, commit, runAttempt, report } = await import('../bindings/js/src/constraint-kernel.mjs');
import { storeCreate } from 'provident-storeroom';

const store = storeCreate({ journalLength: 8, listeners: [] });
const addr = ['blast'];
const calls = [];
store.on(addr, (a) => calls.push(a));
register(store, addr, 'x', () => true);
const rec = commit(store, addr, 'mem', 'v');
console.log('after commit: pending', rec.pending.map((h)=>calls.length), 'calls', calls.length);
const held = rec.triggered[0];
// the adversarial caller: settle(rec) BEFORE runAttempt
const before = calls.length;
store.settle(rec);
console.log('after caller settle: invocations', calls.length - before, 'calls', calls.length);
const b2 = calls.length;
const out = runAttempt(store, rec);
console.log('outcome', out.outcome, 'invocations at terminal arm', calls.length - b2, 'pending', rec.pending.length, 'withheldStrand?');
console.log('report rollback', out.rollback.length, 'log kinds', out.log.map(e=>e.kind).join(','));
