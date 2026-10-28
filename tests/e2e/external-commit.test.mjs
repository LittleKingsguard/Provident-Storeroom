// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// AN EXTERNAL CALLBACK'S CALL OPENS ITS OWN COMMIT — `D-45`: the discriminator is AUTHORSHIP, not depth.
//
// **THE RULING** (`strata/decisions.md` · `D-45`, 2026-10-26, the architect, verbatim): *"For 43, how is a
// listener supposed to be able to reuse the outer verb's commit? The listener is an externally-passed function
// and should be making calls at the package surface. It should be opening a new commit by default of entering
// at the surface."*
//
// **AND THE TWO THINGS IT DISTINGUISHES, WHICH THE JOIN RULE HAD CONFLATED:**
//   * **INTERNAL NESTING** — the package's own machinery inside its own verb (a pass's scope inside a write, a
//     store leg inside a `K-2`). **One act, one commit; joining is right**, and the count stays exact.
//   * **EXTERNAL RE-ENTRY** — **a caller's own function that the package invoked** (a listener body, a
//     constraint body) **calling a verb.** **A different act by a different author, entering the surface from
//     outside, with no claim on the outer verb's commit.**
//
// **WHAT EACH ARM PROVES.**
//   (1) THE DESCENDANT WINDOW, AT ITS ROOT (`D-42`'s window `1`) — a listener body writes at a DESCENDANT
//       address while the pair that refuses that value stands over it. **THE LISTENER'S CALL SAW ITS OWN
//       COMMIT** (the count rose by one for it, and the outer verb's count was UNCHANGED across the call);
//       **THE PAIR WAS ASKED BY THE LISTENER'S OWN ATTEMPT** — a different attempt from the outer write's, at
//       the value the listener wrote; and **THE VIOLATION WAS REFUSED**. `D-42`'s restart arms already cover
//       what a restarting check does with a request; **this cell covers the ASK**.
//   (2) THE LAWFUL SIDE — the same shape with a listener body whose write violates nothing: it ANSWERS its own
//       record, and the outer write's own outcome is unchanged.
//   (3) PRODUCTION NESTING, RE-MEASURED — **the measurement that decides whether the change is right**: an
//       ordinary write, with a pair's body and a listener's body running inside it, still opens **ONE** commit
//       for the whole write. **THE MARK DOES NOT LEAK INTO THE PACKAGE'S OWN CONTINUATION.**
//
// **D-21.** Every cell prints the readings it took at its own `t.diagnostic`; a cell that cannot reach its arm
// asserts the drive's coherence FIRST and says so instead of reporting a verdict.
//
// **D-17.** The expectation is a literal here and the citation is a comment: no `docs/**` path is opened at
// runtime. **The instruments are the declaration's own**: `openCommits` (`state.mjs`'s exported accessor over
// the index the count lives in), the kernel record's `live` map (`kernelFor(store).live`), and the
// `attempt-opened` channel (`Symbol.for('provident-storeroom.attempt-opened')`, `§4.2` item 2), which catches an
// OPENING at its own instant rather than inferring one from a later count.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeCreate } from '../../bindings/js/index.mjs';
import { kernelFor } from '../../bindings/js/src/entry/kernel-foundations.mjs';
import { openCommits } from '../../bindings/js/src/entry/state.mjs';

/** `surface.md §2.5` items 3–4: the ONE crossed form's member set, sorted ascending. */
const REFUSAL_MEMBERS = ['address', 'log', 'message', 'status'];
/** The set's rank-`20` member (`src/error.rs`'s `CODES`, `[`str; 20]`) — the ONE status both arms of a
 *  constraint refusal cross with (`DEF-H`; `D-38`). */
const PASS_REFUSED = 'ConstraintPassRefused';
/** `PAR-JS-13`: the returned record is `{op, watched, triggered}` — fresh on every call, never a view. */
const WRITE_RECORD_MEMBERS = ['op', 'triggered', 'watched'];
/** **THE COUNT'S OWN OBSERVER** (`§4.2` item 2: *"`observer` is a FUNCTION called once per commit that OPENS
 *  for that store"*) — the same `Symbol.for` key `state.mjs` installs and this drive reads. */
const ATTEMPT_OPENED = Symbol.for('provident-storeroom.attempt-opened');

const SEED = 5;        // the state the pair is registered against — it admits it
const OUTER = 7;       // the outer write's own value — lawful, and the state a refusal leaves standing
const VIOLATION = 9;   // the value the pair REFUSES — the listener body writes this at the descendant
const LAWFUL = 11;     // the lawful arm's listener write — the pair admits it

const make = () => storeCreate({ journalLength: 256, listeners: [] });

/** Run `fn`; answer the thrown value as a value. Every drive below is synchronous, so this is total. */
function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (caught) {
    return { ok: false, caught };
  }
}

/** The window each arm is taken in, read off the discriminator's OWN two sources. */
const windowOf = (store) => ({ open: openCommits(store), live: kernelFor(store).live.size });

/** A refusal's log as a list, or `[]` where the drive answered something else. */
function logOf(caught) {
  return caught !== null && typeof caught === 'object' && Array.isArray(caught.log) ? caught.log : [];
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE ONE DRIVE BOTH DESCENDANT ARMS TAKE — a branch at the ancestor, a pair over the descendant, and a
// listener body that writes at that descendant ONCE.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

/**
 * **THE DESCENDANT DRIVE.** `['a']` holds a BRANCH (`{b: 0}`), so `['a','b']` is writable and is a DESCENDANT of
 * the address the listener is installed at. **THE PAIR STANDS OVER THE DESCENDANT** — the exact address the
 * listener body's write enters — because a pass evaluates the pairs at THE ATTEMPT'S OWN ADDRESS and never the
 * store's prefix-selected trigger set (`kernel-attempt.mjs`'s `pairsAtAddress`; `attempt-lifecycle.md §2.4` item
 * 5 (iv)): **so the outer write's own pass, taken at `['a','b']`… is the only pass that asks it besides the
 * listener's own**, and the pair at the ANCESTOR `['a']` would be asked by no pass at all — which is why the
 * pair that can refuse the listener's write stands where the listener's write lands.
 *
 * `value` is what the listener body writes; `refuse` is the one value the pair refuses.
 */
function descendantDrive(value, refuse) {
  const store = make();
  store.write(['a'], 'mem', { b: 0 });
  store.write(['a', 'b'], 'mem', SEED);
  const asked = [];
  const registered = attempt(() => store.addConstraint({ address: ['a', 'b'], id: 'anc' }, (context) => {
    asked.push({
      address: JSON.stringify(context.address),
      value: context.value,
      attempt: context.attempt === null ? null : context.attempt.id,
      ...windowOf(store),
    });
    return context.value === refuse ? { message: 'this pair refuses the state the listener body writes' } : true;
  }));
  const facts = [];
  let fired = false;
  let inner = null;
  const handle = store.listen('desc', [['a']]);
  store.register(handle, () => {
    // **ONE NESTED WRITE ONLY**: the listener is installed over `['a']`, so its OWN write at `['a','b']` would
    // trigger it again — the guard is the drive's and takes effect BEFORE the call, so the recursion cannot
    // start (`docs/specs/storeroom-js/surface.md §2.4` rule: the snapshot is taken when the window opens).
    if (fired) return;
    fired = true;
    facts.push(windowOf(store));
    inner = attempt(() => store.write(['a', 'b'], 'mem', value));
    facts.push(windowOf(store));
  });
  let openings = 0;
  const stop = store[ATTEMPT_OPENED](() => { openings += 1; });
  const outer = attempt(() => store.write(['a', 'b'], 'mem', OUTER));
  stop();
  return { store, registered, asked, facts, outer, inner, openings, standing: store.read(['a', 'b']) };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (1) THE DESCENDANT WINDOW AT ITS ROOT — the listener's call saw its own commit, the pair was asked by the
//     listener's own attempt, and the violation was REFUSED
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-45 (1) · THE DESCENDANT WINDOW AT ITS ROOT: a listener body\'s write OPENS ITS OWN COMMIT — the count rises by one for it and the outer verb\'s count is unchanged across the call — its check runs, the pair over the descendant is asked BY THE LISTENER\'S OWN ATTEMPT, and the violation is REFUSED', (t) => {
  const drive = descendantDrive(VIOLATION, VIOLATION);
  const { registered, asked, facts, outer, inner, openings, standing, store } = drive;
  const caught = inner.ok === false ? inner.caught : null;
  const log = logOf(caught);

  // ── THE DRIVE IS COHERENT, OR THE CELL SAYS SO INSTEAD OF REPORTING A VERDICT. ──────────────
  assert.equal(registered.ok, true,
    `the pair must REGISTER (it admits the state standing then, ${SEED}): the call caught `
      + `${JSON.stringify(registered.ok === true ? null : registered.caught)}`);
  assert.equal(facts.length, 2,
    `the listener body must RUN ONCE and the drive must read the count on both sides of its write: the drive `
      + `recorded ${JSON.stringify(facts)}`);
  assert.deepEqual(facts[0], { open: 1, live: 0 },
    `the listener body must be entered with ONE OPEN COMMIT and NO LIVE ATTEMPT — the delivery instant, the `
      + `outer write's own commit — or this cell is not driving D-42's window \`1\`: the drive read `
      + `${JSON.stringify(facts[0])}`);

  // ── (a) THE LISTENER'S CALL SAW ITS OWN COMMIT. ─────────────────────────────────────────────
  assert.deepEqual(facts[1], { open: 1, live: 0 },
    `AND THE OUTER VERB'S COUNT IS UNCHANGED ACROSS THE CALL: the listener body's write opened a window of its `
      + `own and CLOSED IT ON ITS RETURN, so the count the outer write holds stands at \`1\` before the call and `
      + `\`1\` after it (\`D-45\`: *"the count rises by one for it and falls by one when it ends"*). THE DRIVE READ `
      + `${JSON.stringify(facts)}`);
  assert.equal(asked.length, 3,
    `the pair must be asked exactly THREE times — at REGISTRATION, by the OUTER write's pass, and by the `
      + `LISTENER's own attempt: the drive recorded ${JSON.stringify(asked)}`);
  assert.equal(asked[0].attempt, null,
    `the first ask is the REGISTRATION's (no attempt stands there): ${JSON.stringify(asked[0])}`);
  assert.equal(asked[0].value, SEED,
    `and it is asked at the state standing at the pair's address then: ${JSON.stringify(asked[0])}`);
  assert.notEqual(asked[1].attempt, null,
    `the second ask is the OUTER write's own pass: ${JSON.stringify(asked[1])}`);
  assert.equal(asked[1].value, OUTER,
    `and it is asked at THE OUTER WRITE'S OWN VALUE: ${JSON.stringify(asked[1])}`);
  assert.deepEqual({ open: asked[1].open, live: asked[1].live }, { open: 1, live: 1 },
    `and the pass runs with ONE OPEN COMMIT AND ONE OPEN ATTEMPT — the production window, unmoved by \`D-45\`: `
      + `${JSON.stringify(asked[1])}`);

  // ── (b) THE PAIR WAS ASKED BY THE LISTENER'S OWN ATTEMPT, AND THAT ATTEMPT SAW ITS OWN COMMIT. ─
  assert.notEqual(asked[2].attempt, null,
    `THE THIRD ASK IS THE LISTENER'S OWN ATTEMPT — the root this cell exists for (\`D-45\`: *"its check has a `
      + `window, its pass runs, the ancestor pair is asked by the listener's own attempt"*): `
      + `${JSON.stringify(asked[2])}`);
  assert.notEqual(asked[2].attempt, asked[1].attempt,
    `and it is a DIFFERENT attempt from the outer write's — the listener's write is not the outer write's act: `
      + `the outer pass ran as ${JSON.stringify(asked[1].attempt)} and the listener's as `
      + `${JSON.stringify(asked[2].attempt)}`);
  assert.equal(asked[2].value, VIOLATION,
    `and it is asked at THE VALUE THE LISTENER'S OWN BODY WROTE: ${JSON.stringify(asked[2])}`);
  assert.deepEqual({ open: asked[2].open, live: asked[2].live }, { open: 2, live: 1 },
    `AND THE COUNT ROSE BY ONE FOR IT — \`2\` where the outer write holds \`1\`, one commit for the callback's `
      + `own act beside the outer verb's (\`D-45\`'s \`1\`/\`2\`): ${JSON.stringify(asked[2])}`);
  assert.equal(openings, 2,
    `and the \`attempt-opened\` channel fired TWICE for the whole call — the outer write's own opening and the `
      + `listener's own — so the listener's commit OPENED rather than joining the outer verb's: the observer `
      + `counted ${openings}`);

  // ── (c) AND THE VIOLATION WAS REFUSED. ──────────────────────────────────────────────────────
  assert.equal(inner.ok, false,
    `the listener's write must REFUSE — the pair it asks refuses the value it lands. IT ANSWERED `
      + `${JSON.stringify(inner.ok === true ? inner.value : null)}`);
  assert.deepEqual(Object.keys(caught).sort(), REFUSAL_MEMBERS,
    `a refused pass crosses this surface as exactly ${JSON.stringify(REFUSAL_MEMBERS)} — ONE thrown plain `
      + `object (\`docs/specs/storeroom-js/surface.md §2.5\` items 3–4): the drive caught `
      + `${JSON.stringify(Object.keys(caught))}`);
  assert.equal(caught.status, PASS_REFUSED,
    `the crossed status is the set's rank-20 member ${JSON.stringify(PASS_REFUSED)}: the drive read `
      + `${JSON.stringify(caught.status)}`);
  assert.equal(log.length, 2,
    `the refusal's log carries the pair's own \`constraint-check\` and the attempt's \`outcome\`: `
      + `${JSON.stringify(log)}`);
  assert.equal(log[0].id, 'anc',
    `and the entry NAMES THE PAIR THAT REFUSED: ${JSON.stringify(log[0])}`);
  assert.equal(standing, OUTER,
    `and the violating effect DOES NOT STAND: the store is back at the state the outer write left, `
      + `${JSON.stringify(OUTER)} — the drive read ${JSON.stringify(standing)}`);
  assert.deepEqual(windowOf(store), { open: 0, live: 0 },
    `and the whole call returns at rest — no commit left standing and no attempt left open (\`§4.1\`'s failure `
      + `list): the drive read ${JSON.stringify(windowOf(store))}`);

  // ── (d) AND THE OUTER WRITE'S OWN OUTCOME IS UNCHANGED BY ITS CALLBACK'S FAILURE. ─────────────
  assert.equal(outer.ok, true,
    `the OUTER write answers its own record: the listener body caught its own refusal and returned, so nothing `
      + `of the callback's arm crossed the outer verb (\`docs/specs/storeroom-js/surface.md §2.7\` item 4): the drive `
      + `caught ${JSON.stringify(outer.ok === true ? null : outer.caught)}`);
  assert.deepEqual(Object.keys(outer.value).sort(), WRITE_RECORD_MEMBERS,
    `and it is the declared four-member record: ${JSON.stringify(Object.keys(outer.value))}`);

  t.diagnostic(`D-45 (1) · 2026-10-27 · THE DESCENDANT WINDOW AT ITS ROOT: the listener body ran at `
    + `${JSON.stringify(facts[0])} and its write at ${JSON.stringify({ open: asked[2].open, live: asked[2].live })} `
    + `— THE COUNT ROSE BY ONE FOR IT AND THE OUTER VERB'S STOOD AT \`1\` ACROSS THE CALL `
    + `(${JSON.stringify(facts[1])}); the pair at ${asked[2].address} was ASKED BY THE LISTENER'S OWN ATTEMPT `
    + `${JSON.stringify(asked[2].attempt)} (the outer write's was ${JSON.stringify(asked[1].attempt)}) at `
    + `${JSON.stringify(asked[2].value)} and REFUSED it — \`${caught.status}\`, its log naming '${log[0].id}'; `
    + `\`attempt-opened\` fired ${openings} times for the whole call; the store stands at ${JSON.stringify(standing)} `
    + `and the call returns ${JSON.stringify(windowOf(store))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (2) THE LAWFUL SIDE — a listener body's write that violates NOTHING still answers, and the outer write's own
//     outcome is unchanged
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-45 (2) · THE LAWFUL SIDE: a listener body\'s write at the same descendant that violates NOTHING still ANSWERS its own record — its own commit, its own attempt, the pair asked and passing — and the OUTER write\'s own outcome is unchanged', (t) => {
  const drive = descendantDrive(LAWFUL, VIOLATION);
  const { registered, asked, facts, outer, inner, openings, standing, store } = drive;

  assert.equal(registered.ok, true,
    `the pair must REGISTER: the call caught ${JSON.stringify(registered.ok === true ? null : registered.caught)}`);
  assert.equal(facts.length, 2,
    `the listener body must RUN ONCE on this arm too: the drive recorded ${JSON.stringify(facts)}`);
  assert.deepEqual(facts, [{ open: 1, live: 0 }, { open: 1, live: 0 }],
    `the listener's own commit OPENED and CLOSED around its write, the outer verb's count unchanged across the `
      + `call (\`D-45\`): the drive read ${JSON.stringify(facts)}`);
  assert.equal(inner.ok, true,
    `A LISTENER BODY'S WRITE THAT VIOLATES NOTHING MUST ANSWER ITS OWN RECORD — this is the half that keeps the `
      + `ruling from being a blanket refusal. IT CAUGHT ${JSON.stringify(inner.ok === true ? null : inner.caught)}`);
  assert.deepEqual(Object.keys(inner.value).sort(), WRITE_RECORD_MEMBERS,
    `and the answer is the declared four-member write record: ${JSON.stringify(Object.keys(inner.value))}`);
  assert.equal(outer.ok, true,
    `and the OUTER write answers its own record unchanged: it caught `
      + `${JSON.stringify(outer.ok === true ? null : outer.caught)}`);
  assert.deepEqual(Object.keys(outer.value).sort(), WRITE_RECORD_MEMBERS,
    `and it is the same four-member record: ${JSON.stringify(Object.keys(outer.value))}`);
  assert.equal(asked.length, 3,
    `the pair is asked at REGISTRATION, by the OUTER pass and by the LISTENER's own attempt: the drive recorded `
      + `${JSON.stringify(asked)}`);
  assert.equal(asked[2].value, LAWFUL,
    `and the listener's ask carries the value its own body wrote: ${JSON.stringify(asked[2])}`);
  assert.notEqual(asked[2].attempt, asked[1].attempt,
    `on ITS OWN attempt, not the outer write's: ${JSON.stringify([asked[1].attempt, asked[2].attempt])}`);
  assert.deepEqual({ open: asked[2].open, live: asked[2].live }, { open: 2, live: 1 },
    `and it saw its OWN commit — the count at \`2\` while the outer write's stands at \`1\`: `
      + `${JSON.stringify(asked[2])}`);
  assert.equal(openings, 2,
    `\`attempt-opened\` fired twice — the outer write's own opening and the listener's own: ${openings}`);
  assert.equal(standing, LAWFUL,
    `and the listener's write STANDS because nothing refused it: the store holds ${JSON.stringify(LAWFUL)} — the `
      + `drive read ${JSON.stringify(standing)}`);
  assert.deepEqual(windowOf(store), { open: 0, live: 0 },
    `and the call returns at rest: ${JSON.stringify(windowOf(store))}`);

  t.diagnostic(`D-45 (2) · 2026-10-27 · THE LAWFUL SIDE: the listener body's write ANSWERED `
    + `${JSON.stringify(Object.keys(inner.value).sort())} at ${asked[2].value}, asked by its OWN attempt `
    + `${JSON.stringify(asked[2].attempt)} at ${JSON.stringify({ open: asked[2].open, live: asked[2].live })} `
    + `(the outer write's attempt ${JSON.stringify(asked[1].attempt)}, count unchanged at ${JSON.stringify(facts[1])}); `
    + `\`attempt-opened\` fired ${openings} times; the outer write answered its own record; the store stands at `
    + `${JSON.stringify(standing)} and the call returns ${JSON.stringify(windowOf(store))}`);
});

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// (3) PRODUCTION NESTING, RE-MEASURED — the mark does NOT leak into the package's own continuation
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

test('D-45 (3) · PRODUCTION NESTING RE-MEASURED: an ordinary write still opens EXACTLY ONE commit for its whole length — the pass\'s scope, the store leg and the pair body join it, and a listener body that calls no verb mints nothing', (t) => {
  // **THE STORE CARRIES A PAIR AT THE ADDRESS THE WRITE LANDS AND A LISTENER OVER ITS ANCESTOR**, so ONE write
  // drives the whole machinery: the verb's own bracket, `K-2`'s store leg, the pass's own commit scope, the
  // pair's body (INVOKED, and therefore MARKED, by `D-45`) and the delivery's listener body (marked too).
  // **NOTHING IN THIS DRIVE CALLS A VERB FROM A CALLBACK** — so **the mark can have no effect at all**, and the
  // count must read exactly what it reads on a write with no callback in sight.
  const store = make();
  store.write(['a'], 'mem', { b: 0 });
  store.write(['a', 'b'], 'mem', SEED);
  const pairFacts = [];
  const registered = attempt(() => store.addConstraint({ address: ['a', 'b'], id: 'prod' }, (context) => {
    if (context.attempt !== null) pairFacts.push(windowOf(store));
    return true;
  }));
  const listenerFacts = [];
  const handle = store.listen('prod-listener', [['a']]);
  store.register(handle, () => { listenerFacts.push(windowOf(store)); });
  let openings = 0;
  const stop = store[ATTEMPT_OPENED](() => { openings += 1; });
  const written = attempt(() => store.write(['a', 'b'], 'mem', OUTER));
  stop();

  assert.equal(registered.ok, true,
    `the pair must REGISTER: the call caught ${JSON.stringify(registered.ok === true ? null : registered.caught)}`);
  assert.equal(written.ok, true,
    `the ordinary write must complete: it caught ${JSON.stringify(written.ok === true ? null : written.caught)}`);
  assert.deepEqual(Object.keys(written.value).sort(), WRITE_RECORD_MEMBERS,
    `and answer its own four-member record: ${JSON.stringify(Object.keys(written.value))}`);
  assert.equal(pairFacts.length, 1,
    `the pass must ASK the pair once, or no window was measured inside it: ${JSON.stringify(pairFacts)}`);
  assert.deepEqual(pairFacts, [{ open: 1, live: 1 }],
    `**THE MEASUREMENT THAT DECIDES WHETHER THE CHANGE IS RIGHT**: the pair's body runs with ONE OPEN COMMIT — `
      + `the write's own — and the pass's own scope JOINED it rather than opening a second, although the body `
      + `was invoked under \`D-45\`'s mark. THE DRIVE READ ${JSON.stringify(pairFacts)}; a \`2\` here is the mark `
      + `leaking into the package's own continuation`);
  assert.deepEqual(listenerFacts, [{ open: 1, live: 0 }],
    `and the listener body runs inside that same one commit — the delivery instant, the outer write's window — `
      + `and MINTS NOTHING: ${JSON.stringify(listenerFacts)}`);
  assert.equal(openings, 1,
    `**ONE COMMIT OPENED FOR THE WHOLE WRITE** — the verb's own bracket alone; the store leg, the pass's scope `
      + `and the pair's body all joined it, and the listener body that called no verb opened none. The observer `
      + `counted ${openings}`);
  assert.deepEqual(windowOf(store), { open: 0, live: 0 },
    `and the count is back at zero on the return to the client: ${JSON.stringify(windowOf(store))}`);

  // ── AND THE SAME FIGURE ON A WRITE WITH NO PAIR AND NO LISTENER AT ALL — no callback in sight. ──────────
  const plain = make();
  let plainOpenings = 0;
  const stopPlain = plain[ATTEMPT_OPENED](() => { plainOpenings += 1; });
  const plainWrite = attempt(() => plain.write(['solo'], 'mem', OUTER));
  stopPlain();
  assert.equal(plainWrite.ok, true,
    `the plain write must complete: it caught ${JSON.stringify(plainWrite.ok === true ? null : plainWrite.caught)}`);
  assert.equal(plainOpenings, 1,
    `and it opens ONE commit too — \`D-45\` moves no figure of a write that reaches no callback. The observer `
      + `counted ${plainOpenings}`);
  assert.deepEqual(windowOf(plain), { open: 0, live: 0 },
    `and returns at rest: ${JSON.stringify(windowOf(plain))}`);

  // ── AND THE MARK IS A SYMBOL-KEYED CHANNEL: NO MEMBER IS ADDED TO THE PRODUCT. ────────────────────────
  const ownNames = Object.getOwnPropertyNames(store);
  assert.equal(ownNames.length, 14,
    `the product's declared own member set is FOURTEEN and is UNMOVED — \`D-45\`'s marker is a \`Symbol.for\` `
      + `channel, invisible to \`Object.getOwnPropertyNames\` (\`A117\` (D6)): the drive read `
      + `${JSON.stringify(ownNames)}`);
  assert.equal(Object.getOwnPropertySymbols(store).includes(Symbol.for('provident-storeroom.external-call')), true,
    'and the marker stands under its own symbol key on that same object');

  t.diagnostic(`D-45 (3) · 2026-10-27 · PRODUCTION NESTING: the pair body ran at `
    + `${JSON.stringify(pairFacts[0])}, the listener body at ${JSON.stringify(listenerFacts[0])}, and `
    + `\`attempt-opened\` fired ${openings} time for the whole write — ONE COMMIT, JOINED AND NOT DOUBLED; a `
    + `write reaching no callback fired ${plainOpenings}; the product's own names read ${ownNames.length}`);
});
