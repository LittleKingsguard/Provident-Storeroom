import { storeCreate } from 'provident-storeroom';
import { register, commit, runAttempt } from '../../bindings/js/src/constraint-kernel.mjs';
const s = storeCreate({ listeners: [], journalLength: 32 });
register(s, ['a'], 'x', () => undefined);
const c = commit(s, ['a'], 'mem', 1);
console.log('resolved ok', Object.keys(c).join(','));
console.log(runAttempt(s, c).outcome);
