// scratch/d178-prefix-probe.mjs — the supervisor's drive, taken on the tree BEFORE the fix, and the
// four cells' readings taken at the same instant. Read-only: no byte of src/ and no test is written.
import { storeCreate } from '../bindings/js/index.mjs';
import { withAddon } from '../bindings/js/src/entry/addon-slot.mjs';

const mark = (store) => Reflect.apply(withAddon().journalMark, store, []);
const restored = (store, carrier) => {
  try {
    Reflect.apply(withAddon().restoreMark, store, [carrier === undefined ? null : carrier]);
    return 'returned';
  } catch (why) {
    return 'threw ' + (why && why.status);
  }
};
const standing = (store, address) => {
  try {
    return JSON.stringify(store.read(address));
  } catch (why) {
    return why && why.status;
  }
};

// ---- RF-1's drive -------------------------------------------------------------------------------
const store = storeCreate({ journalLength: 2, listeners: [] });
store.write(['a'], 'mem', 'A'); const m1 = mark(store);
store.write(['b'], 'mem', 'B'); const m2 = mark(store);
store.write(['c'], 'mem', 'C');
console.log('marks:', JSON.stringify(m1), JSON.stringify(m2));
console.log('before  a=', standing(store, ['a']), ' b=', standing(store, ['b']), ' c=', standing(store, ['c']));
console.log('restore m2 ->', restored(store, m2));
console.log('after   a=', standing(store, ['a']), ' b=', standing(store, ['b']), ' c=', standing(store, ['c']));

// ---- RF-3: the DROPPED mark ---------------------------------------------------------------------
const s3 = storeCreate({ journalLength: 2, listeners: [] });
s3.write(['a'], 'mem', 'A'); const d1 = mark(s3);
s3.write(['b'], 'mem', 'B');
s3.write(['c'], 'mem', 'C');
console.log('restore dropped ->', restored(s3, d1),
  ' a=', standing(s3, ['a']), ' b=', standing(s3, ['b']), ' c=', standing(s3, ['c']));

// ---- RF-4: the floor carrier, driven as the package drives it ({k:'F'} from a store whose journal
//      held no entry) ----------------------------------------------------------------------------
const empty = storeCreate({ journalLength: 2, listeners: [] });
const floorCarrier = mark(empty);
const s4 = storeCreate({ journalLength: 2, listeners: [] });
s4.write(['a'], 'mem', 'A');
s4.write(['b'], 'mem', 'B');
s4.write(['c'], 'mem', 'C');
console.log('floor carrier:', JSON.stringify(floorCarrier));
console.log('restore floor ->', restored(s4, floorCarrier),
  ' a=', standing(s4, ['a']), ' b=', standing(s4, ['b']), ' c=', standing(s4, ['c']));

// ---- RF-2: the uncompacted control --------------------------------------------------------------
const s2 = storeCreate({ journalLength: 8, listeners: [] });
s2.write(['a'], 'mem', 'A'); const c1 = mark(s2);
s2.write(['b'], 'mem', 'B'); const c2 = mark(s2);
s2.write(['c'], 'mem', 'C');
console.log('control restore m2 ->', restored(s2, c2),
  ' a=', standing(s2, ['a']), ' b=', standing(s2, ['b']), ' c=', standing(s2, ['c']));
console.log('control restore m1 ->', restored(s2, c1),
  ' a=', standing(s2, ['a']), ' b=', standing(s2, ['b']), ' c=', standing(s2, ['c']));
