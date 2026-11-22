import { storeCreate, write } from 'provident-storeroom';
const s = storeCreate({ journalLength: 8, listeners: [] });
const calls = [];
const h = s.on(['m'], () => calls.push(1));
const rec = { attempt: { id: 'x' }, op: null, triggered: [], pending: [] };
s.settle(rec);
console.log('AFTER SETTLE calls', calls.length);
const w = write(s, ['m'], 'mem', 1);
console.log('AFTER WRITE calls', calls.length, 'triggered', w.triggered.length, 'is h?', w.triggered[0] === h);
