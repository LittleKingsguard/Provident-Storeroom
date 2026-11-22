// Blind surface probe (A112 re-run). Reads NO implementation source: it imports the two
// modules the docs name and reports their runtime shapes.
import * as store from 'provident-storeroom';
import * as kernel from '../bindings/js/src/constraint-kernel.mjs';

const report = {
  storeExports: Object.keys(store).sort(),
  storeExportTypes: Object.fromEntries(Object.entries(store).map(([k, v]) => [k, typeof v])),
  kernelExports: Object.keys(kernel).sort(),
  kernelExportTypes: Object.fromEntries(Object.entries(kernel).map(([k, v]) => [k, typeof v])),
};

try {
  const inst = store.storeCreate({ journalLength: 8, listeners: [] });
  report.instanceKeys = Object.keys(inst).sort();
  report.storeCreateOk = true;
} catch (e) {
  report.storeCreateOk = false;
  report.storeCreateError = { status: e && e.status, message: e && e.message, name: e && e.name };
}

console.log(JSON.stringify(report, null, 2));
