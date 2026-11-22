import * as storeNs from 'provident-storeroom';
const real = storeNs.storeCreate({ journalLength: 8, listeners: [] });
const reached = [];
const watched = new Proxy(real, {
  get(t, p, r) { const v = Reflect.get(t, p, r); if (typeof v === 'function') return (...a) => { reached.push('call:' + String(p)); return v.apply(t, a); }; reached.push('read:' + String(p)); return v; },
});
console.log('instanceof-ish: isProxy =', watched !== real);
try { const w = storeNs.write(watched, ['a'], 'mem', 1); console.log('package write with proxy instance OK op=', w.op.opId); }
catch (e) { console.log('package write with proxy instance THREW', JSON.stringify(e)); }
console.log('reached =', reached);
