// scratch/d178-floor-boot.mjs — **THE BOOTED FLOOR, DRIVEN**: a store whose `born` is a booted `file`-tier image
// takes the same floor advance as a path-less one, and a restoral to a retained mark keeps the version the cap
// dropped. Read-only: no byte of src/ and no test is written; every file lives under the temp directory.
import { copyFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { storeCreate } from '../bindings/js/index.mjs';
import { withAddon } from '../bindings/js/src/entry/addon-slot.mjs';

const mark = (store) => Reflect.apply(withAddon().journalMark, store, []);
const restore = (store, m) => {
  try {
    Reflect.apply(withAddon().restoreMark, store, [m]);
    return 'ok';
  } catch (why) {
    return 'threw ' + (why && why.status);
  }
};
const commit = (store, opId) => {
  try {
    Reflect.apply(withAddon().commitFile, store, [opId]);
    return 'committed';
  } catch (why) {
    return 'refused ' + (why && why.status);
  }
};
const standing = (store, address) => {
  try {
    return JSON.stringify(store.read(address));
  } catch (why) {
    return 'refused ' + (why && why.status);
  }
};

const dir = mkdtempSync(join(tmpdir(), 'd178-floor-boot-'));
const origin = join(dir, 'origin.json');
const controlPath = join(dir, 'control.json');
// (1) An image at `file`: a = 1 and b = 2, committed.
const first = storeCreate({ filePath: origin, journalLength: 8, listeners: [] });
const wrote = first.write(['a'], 'file', 1);
console.log('commit a:', commit(first, wrote.op.opId));
const wroteB = first.write(['b'], 'file', 2);
console.log('commit b:', commit(first, wroteB.op.opId));
// (2) The two stores the drive compares, booted from the SAME bytes.
copyFileSync(origin, controlPath);
const compacted = storeCreate({ filePath: origin, journalLength: 2, listeners: [] });
const control = storeCreate({ filePath: controlPath, journalLength: 64, listeners: [] });
console.log('booted compacted born:', standing(compacted, []));
console.log('booted control born:  ', standing(control, []));

// (3) The same record on both: a `mem` write over the FILE version of `a`, then two more so the cap drops the first.
const drive = (store) => {
  store.write(['a'], 'mem', 3);
  const afterFirst = mark(store);
  store.write(['c'], 'mem', 4);
  const afterSecond = mark(store);
  store.write(['d'], 'mem', 5);
  return { afterFirst, afterSecond };
};
const mine = drive(compacted);
const theirs = drive(control);
console.log('compacted  after the third write:', standing(compacted, ['a']), standing(compacted, ['c']),
  standing(compacted, ['d']));

// (4) The retained mark: the state at the second write, whose predecessor the cap dropped.
console.log('compacted restore retained:', restore(compacted, mine.afterSecond));
console.log('control   restore retained:', restore(control, theirs.afterSecond));
console.log('compacted:', standing(compacted, ['a']), standing(compacted, ['b']), standing(compacted, ['c']),
  standing(compacted, ['d']));
console.log('control:  ', standing(control, ['a']), standing(control, ['b']), standing(control, ['c']),
  standing(control, ['d']));
console.log('compacted bytes still say a =', JSON.stringify(JSON.parse(JSON.stringify(
  storeCreate({ filePath: origin, journalLength: 8, listeners: [] }).read(['a']) ?? null))));
