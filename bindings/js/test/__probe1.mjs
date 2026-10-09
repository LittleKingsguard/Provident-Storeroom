import { storeCreate, read, write, rollback, listen, unlisten } from '@provident-storeroom/js';
const mem = (l=[]) => storeCreate({journalLength:8, listeners:l});
function deep(n){ let v = 1; for(let i=0;i<n;i++) v = {a:v}; return v; }
const inst = mem();
for (const d of [63,64,65,66,67]) {
  try { write(inst, ['d'], 'mem', deep(d)); console.log('depth', d, 'ADMITTED'); }
  catch(e) { console.log('depth', d, 'REFUSED', e.status, '|', String(e.message).slice(0,150)); }
}
for (const n of [999999, 1000000, 1000001]) {
  const arr = new Array(n).fill(0);
  try { write(inst, ['c'], 'mem', arr); console.log('nodes', n, 'ADMITTED'); }
  catch(e) { console.log('nodes', n, 'REFUSED', e.status, '|', String(e.message).slice(0,130)); }
}
const i2 = mem([{address:['a'],handle:'l1'}]);
const held = write(i2,['a'],'mem',1).triggered[0];
for (const [name, fn] of [
  ['listener 42', () => i2.register(held, 42)],
  ['listener null', () => i2.register(held, null)],
  ['handle null', () => i2.register(null, ()=>{})],
  ['handle bare string', () => i2.register('l1', ()=>{})],
  ['handle Symbol', () => i2.register(Symbol('s'), ()=>{})],
  ['handle 10n', () => i2.register(10n, ()=>{})],
  ['handle array', () => i2.register([], ()=>{})],
  ['handle frozen {}', () => i2.register(Object.freeze({}), ()=>{})],
  ['handle absent', () => i2.register(undefined, ()=>{})],
]) {
  try { fn(); console.log(name, 'NO THROW'); } catch(e) { console.log(name, '=>', e.status, '|', JSON.stringify(e.message), '| keys', Object.keys(e).sort().join(','), '| plain', Object.getPrototypeOf(e)===Object.prototype); }
}
for (const [name, v] of [['Symbol()',Symbol()],['Symbol.iterator',Symbol.iterator],['10n',10n],['{}',{}],['[]',[]],['null',null],['undefined',undefined],['""',''],['number 1',1],['Proxy',new Proxy({},{get(){throw new Error('boom')}})]]) {
  try { rollback(inst, v); console.log('rollback', name, 'NO THROW'); } catch(e) { console.log('rollback', name, '=>', e.status, '|', JSON.stringify(String(e.message)).slice(0,170)); }
}
// Array subclass
class V extends Array {}
const vs = mem();
try { write(vs, ['x'], 'mem', new V(1,2)); console.log('array subclass as VALUE: ADMITTED'); } catch(e){ console.log('array subclass as VALUE =>', e.status, '|', JSON.stringify(String(e.message)).slice(0,170)); }
try { write(vs, ['x'], 'mem', 1); read(vs, new V('x')); console.log('array subclass as ADDRESS: ADMITTED'); } catch(e){ console.log('array subclass as ADDRESS =>', e.status, '|', JSON.stringify(String(e.message)).slice(0,170)); }
