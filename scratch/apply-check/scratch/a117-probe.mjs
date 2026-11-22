// A117 IMPLEMENTER PROBE — measure the two fixtures' geometry. Scratch only; no assertion, no test.
import { storeCreate, write as storeWrite } from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const tag = (s) => s;
const mk = (o = {}) => storeCreate({ journalLength: 16, listeners: o.listeners ?? [] });

function probe(name, { withPrefixReg, pairFirst }) {
  const store = mk();
  const prefix = [tag(name + 'p')];
  const own = [...prefix, tag(name + 'o')];
  storeWrite(store, prefix, 'mem', { seed: 1 });
  const out = { name };
  let pairHandle;
  const regPair = () => {
    pairHandle = register(store, own, 'x', () => true);
  };
  let prefixHandle;
  const regPrefix = () => { prefixHandle = store.on(prefix, () => {}); };
  if (pairFirst) { regPair(); if (withPrefixReg) regPrefix(); }
  else { if (withPrefixReg) regPrefix(); regPair(); }
  const appRuns = [];
  const appHandle = store.on(own, (a) => { appRuns.push(a); });
  const record = commit(store, own, 'mem', 'v');
  out.triggeredLen = record.triggered.length;
  out.triggeredIsPair = record.triggered.map((h) => h === pairHandle);
  out.appIsPair = appHandle === pairHandle;
  out.prefixIsPair = prefixHandle === undefined ? null : prefixHandle === pairHandle;
  out.pendingAtK2 = record.pending.length;
  const report = runAttempt(store, record);
  out.outcome = report.outcome;
  out.pendingAfterPass = record.pending.length;
  out.pendingAfterPassIsPair = record.pending.map((h) => h === pairHandle);
  out.appRuns = appRuns.length;
  return out;
}

console.log('DM-10 shape (pair first, sibling at prefix, app on at own):',
  JSON.stringify(probe('d10', { withPrefixReg: true, pairFirst: true })));
console.log('DM-06 shape (same, named dm06):',
  JSON.stringify(probe('d06', { withPrefixReg: true, pairFirst: true })));
console.log('sibling first then pair:',
  JSON.stringify(probe('d06b', { withPrefixReg: false, pairFirst: false })));
console.log('bare pair only (DM-02 shape):',
  JSON.stringify(probe('d02', { withPrefixReg: false, pairFirst: true })));
