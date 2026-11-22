import { storeCreate, __dbgState } from 'provident-storeroom';
const store = storeCreate({ journalLength: 8, listeners: [] });
const st = __dbgState(store);
console.log('before settle: withheld', st.withheld.size, 'has add?', typeof st.withheld.add);
const rec = { attempt: { id: 'x' }, op: null, triggered: [], pending: [] };
store.settle(rec);
console.log('after settle: withheld', st.withheld.size, 'adopted', st.adopted.size, 'answered', st.answered.size);
console.log('values', [...st.withheld].length, [...st.adopted].length);
