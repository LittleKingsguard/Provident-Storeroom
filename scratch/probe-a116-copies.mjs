import * as bare from 'provident-storeroom';
import * as direct from '../bindings/js/index.mjs';
console.log('same storeCreate?', bare.storeCreate === direct.storeCreate);
console.log('direct has settle?', typeof direct.storeCreate({journalLength:8,listeners:[]}).settle);
