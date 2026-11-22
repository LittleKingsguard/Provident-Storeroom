// scratch/d178-floor-equivalence.mjs — **THE FLOOR'S EQUIVALENCE, DRIVEN RATHER THAN ARGUED**: a store the
// compaction has dropped from answers, at every RETAINED mark, exactly what a store that dropped nothing answers
// at the same position of the same record. Read-only: no byte of src/ and no test is written.
//
// The subject is the claim that `Store::floor_state` — one state, advanced once per drop, by the dropped entry's
// own `after` snapshots — is the fold of every dropped entry from `born`, so `floor + retained[0..=k]` equals
// `born + every[0..=k]`. Two records are driven, each on two stores: `journalLength: CAP` (drops) against
// `journalLength: 64` (drops nothing). The first covers nested shadows, purge-and-replace, an array's `close_up`,
// deletes at depth and a register-level delete; **the second is the one the `under` carrier is about** — the same
// pair standing at TWO tiers, and writes BELOW it, which is where a re-based capture lies about which parent
// version holds a child.
//
// Usage: node scratch/d178-floor-equivalence.mjs [cap]
import { storeCreate } from '../bindings/js/index.mjs';
import { withAddon } from '../bindings/js/src/entry/addon-slot.mjs';

const CAP = Number(process.argv[2] ?? 4);
const FULL = 64;

const mark = (store) => Reflect.apply(withAddon().journalMark, store, []);
const at = (store, m) => {
  try {
    Reflect.apply(withAddon().restoreMark, store, [m]);
    return { ok: true };
  } catch (why) {
    return { ok: false, status: why && why.status };
  }
};
const whole = (store) => {
  try {
    return JSON.stringify(store.read([]));
  } catch (why) {
    return 'read([]) threw ' + (why && why.status);
  }
};

// A row is [tier, address, value-or-'DELETE']; `tier === null` names no tier at all.
const NESTED = [
  ['mem', ['a'], { x: 1, y: { z: 'deep' } }],      // 0  a structured shadow
  ['mem', ['a', 'x'], 2],                          // 1  a nested write
  ['mem', ['a', 'y', 'z'], 'deeper'],              // 2  and one deeper
  ['mem', ['b'], [1, 2, 3]],                       // 3  an array
  ['mem', ['b', 1], 'mid'],                        // 4  an array position, replaced
  ['mem', ['b', 0], 'DELETE'],                     // 5  close_up: positions shift
  ['mem', ['a'], 'scalar'],                        // 6  purge-and-replace at the top
  ['mem', ['b'], 'DELETE'],                        // 7  the array goes whole
  ['mem', ['a'], { q: { r: [1, 2] } }],            // 8  a new shadow under a scalar
  ['mem', ['a', 'q', 'r', 0], 9],                  // 9  an array element inside the shadow
  ['mem', ['a', 'q'], { r: [3, 4], s: 'kept' }],   // 10 an inner node, replaced whole
  ['mem', ['c'], { deep: { chain: { of: ['keys'] } } }],  // 11
  ['mem', ['c', 'deep', 'chain', 'of', 0], 'x'],  // 12
  ['mem', ['a', 'q', 'r', 1], 44],                 // 13
  ['mem', ['a'], 'DELETE'],                        // 14 the shadow goes
  ['mem', ['c'], 'DELETE'],                        // 15 and the other
  [null, [], 'DELETE'],                            // 16 no tier: the whole register
  ['mem', ['z'], 'last'],                          // 17
  ['mem', ['y'], { k: 1 }],                        // 18
  ['mem', ['y', 'k'], 2],                          // 19
];

// **THE `under` RECORD**: one pair standing at `mem` AND `temp`, writes below it (whose parent version the walk
// picks by LOWEST persistence, i.e. `temp`), a purge at `mem` that leaves the `temp` version standing, and a
// delete of the `temp` version with its children.
const SHADOW = [
  ['mem', ['s'], { a: 1, b: { c: 2 } }],           // 0  s at mem
  ['temp', ['s'], { a: 10, b: { c: 20 } }],        // 1  and at temp: a shadow of two versions
  ['temp', ['s', 'a'], 5],                         // 2  below it — the walk picks the temp version
  ['temp', ['s', 'b', 'c'], 7],                    // 3  deeper, under the temp version's own chain
  ['mem', ['t'], 'x'],                             // 4
  ['temp', ['s', 'zz'], 1],                        // 5  a NEW pair below the shadow
  ['temp', ['s', 'zz'], 'DELETE'],                 // 6  and it goes
  ['mem', ['u'], { deep: { er: 1 } }],             // 7
  ['mem', ['u', 'deep', 'er'], 2],                 // 8
  ['temp', ['s'], 'DELETE'],                       // 9  the temp version goes with its children
  ['mem', ['v'], 'end'],                           // 10 and the mem version of `s` still stands
];

const drive = (rows, journalLength) => {
  const store = storeCreate({ journalLength, listeners: [] });
  const marks = [];
  for (const [tier, address, value] of rows) {
    if (value === 'DELETE') {
      if (tier === null) store.delete(address); else store.delete(address, tier);
    } else store.write(address, tier, value);
    marks.push(mark(store));
  }
  return { store, marks };
};

const report = (name, rows) => {
  const compacted = drive(rows, CAP);
  const control = drive(rows, FULL);
  let compared = 0;
  let dropped = 0;
  let disagreed = 0;
  for (let row = 0; row < rows.length; row += 1) {
    const mine = compacted.marks[row];
    const theirs = control.marks[row];
    // THE MEMBERSHIP TEST IS THE STORE'S OWN: a mark it no longer holds answers `JournalOpUnknown`, which is the
    // refusal `D-160` item 3 gives that class — so nothing here re-derives the window's arithmetic.
    if (at(compacted.store, mine).status === 'JournalOpUnknown') {
      dropped += 1;
      if (at(control.store, theirs).ok !== true) console.log(`${name} row ${row}: the CONTROL refused its own mark`);
      continue;
    }
    const left = whole(compacted.store);
    at(control.store, theirs);
    const right = whole(control.store);
    compared += 1;
    if (left !== right) {
      disagreed += 1;
      console.log(`${name} row ${row}: compacted ${left}`);
      console.log(`${name} row ${row}: control   ${right}`);
    }
  }
  console.log(`${name}: ${dropped} rows dropped, ${compared} retained positions compared, ${disagreed} disagreements`);
};

report('nested', NESTED);
report('shadow', SHADOW);
