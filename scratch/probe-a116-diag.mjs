import { storeCreate } from 'provident-storeroom';
const store = storeCreate({ journalLength: 8, listeners: [] });
store.settle({ attempt: { id: 'x' }, op: null, triggered: [], pending: [] });
console.log('probe sees withheld?', globalThis.__wh ? globalThis.__wh.size : 'no __wh');
