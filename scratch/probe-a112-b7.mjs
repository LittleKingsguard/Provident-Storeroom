import * as storeNs from 'provident-storeroom';
import { register, commit, runAttempt } from '../bindings/js/src/constraint-kernel.mjs';

const s = storeNs.storeCreate({ journalLength: 64, listeners: [] });
try { const w = storeNs.write(s, ['a'], 'mem', 'parent'); console.log('bare write at [a] ok op=', w.op.opId); } catch (e) { console.log('bare write threw', JSON.stringify(e)); }

const anc = register(s, ['a'], 'cL', (ctx) => { console.log('ancestor body ran with ctx.address=', JSON.stringify(ctx.address)); return true; });
try { const rec = commit(s, ['a', 'b'], 'mem', 2); console.log('K-2 at [a,b] ok', JSON.stringify(rec.triggered.map(String))); } catch (e) { console.log('K-2 at [a,b] threw', JSON.stringify(e)); }
console.log('read [a] =', JSON.stringify((() => { try { return storeNs.read(s, ['a']); } catch (e) { return e; } })()));
