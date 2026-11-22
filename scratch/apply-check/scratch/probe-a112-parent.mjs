import * as storeNs from 'provident-storeroom';

function trial(label, parentValue) {
  const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
  let w1; try { w1 = storeNs.write(s, ['a'], 'mem', parentValue); } catch (e) { console.log(label, 'parent write threw', JSON.stringify(e)); return; }
  try { const w2 = storeNs.write(s, ['a', 'b'], 'mem', 2); console.log(label, 'child write OK op=', w2.op.opId); }
  catch (e) { console.log(label, 'child write threw', JSON.stringify(e)); }
}
trial('scalar', 'parent');
trial('object', { k: 1 });
trial('array', [1, 2]);
trial('nested-object-parent-then-child', { b: {} });

// and the shape the docs' E2E-C-16 uses: register at ['a'], write at ['a','b'] as the FIRST write
const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
try { const w = storeNs.write(s, ['a', 'b'], 'mem', 2); console.log('first write at [a,b]: OK', w.op.opId); }
catch (e) { console.log('first write at [a,b] threw', JSON.stringify(e)); }
