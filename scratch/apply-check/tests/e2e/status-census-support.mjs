// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE STATUS CENSUS'S DERIVATION — TWO PARSERS AND ONE ASSERTION, AND **NO MEMBER LIST IS TRANSCRIBED HERE**
//
// **WHY THIS FILE EXISTS AT ALL.** The declaration shortfall this instrument was ordered to catch was *seventeen
// codes in the store and sixteen in `bindings/js/index.d.ts`*, and the reason no leg saw it is that **every
// census that could have seen it was written by hand**: a hand-typed array of names in one battery and a
// hand-typed array in another, each of which agrees with itself while the tree moves under it. **So this module
// carries no status name, no rank and no count.** The expectation is `src/error.rs`'s `CODES` array, read as
// CODE at run time; the subject is the published union in `bindings/js/index.d.ts`. Both are parsed, both are
// compared, and every failure message names the member that moved.
//
// **THE AUTHORITY IS THE STORE'S OWN ARRAY** — `pub const CODES: [&str; 17]`, ranked `1`…`17`, `ValueRefusedAtBoundary`
// at `17` (`strata/decisions.md` · `D-17` requires the code read; the 2026-10-23 amendment is the contract's and
// is NOT opened by this module or by the cell that uses it — no `docs/**` path is read anywhere in this
// instrument). The array is not a second statement of the set: it is the set's own census, and
// `src/error.rs`'s `storeErrorMessage` resolves its clause by lookup in it. **A published union that disagrees
// with it is the shortfall, whichever side moved.**
//
// **THE DECLARATION'S OPEN ESCAPE ARM IS NOT A MEMBER.** `StoreStatus` closes with `| (string & {})` so a consumer
// may carry a status forward without narrowing. It is required to be present, exactly once, in the last position
// — and it is counted as ZERO members. A census that counted it would read `18` against a store of `17` and
// would be wrong in the other direction.
//
// The three exports are pure functions of text so the cell and this proof can drive them against a MUTATED copy
// of the same two files (`/tmp` probe, reported at `strata/` handoff) without the cell reading anything but the
// real tree.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';

/** How many times `needle` occurs in `haystack` — a count, not a search, so a duplicated block is visible. */
function occurrences(haystack, needle) {
  let count = 0;
  let at = haystack.indexOf(needle);
  while (at !== -1) {
    count += 1;
    at = haystack.indexOf(needle, at + needle.length);
  }
  return count;
}

/**
 * THE DECLARATION'S UNION, PARSED OUT OF `bindings/js/index.d.ts`.
 *
 * Finds the ONE `export type StoreStatus =` declaration, reads its union body up to the terminating `;`, and
 * splits the arms. A `'literal'` arm is a member and keeps its position. **Any other arm is collected
 * separately, because it carries no member** — the published set has exactly one and it is the escape arm.
 */
export function parseDeclarationCensus(text) {
  const marker = 'export type StoreStatus =';
  const blocks = occurrences(text, marker);
  assert.equal(blocks, 1,
    `bindings/js/index.d.ts must declare \`export type StoreStatus\` exactly once; the file carries it ${blocks} `
      + 'time(s), so the published set cannot be derived from it');

  const open = text.indexOf(marker) + marker.length;
  const close = text.indexOf(';', open);
  assert.notEqual(close, -1, 'bindings/js/index.d.ts\'s `StoreStatus` union is not terminated by `;`');

  const body = text.slice(open, close);
  const members = [];
  const nonLiterals = [];
  for (const rawArm of body.split('|')) {
    const arm = rawArm.trim();
    if (arm === '') continue;
    const literal = /^'([^'\n]*)'$/.exec(arm);
    if (literal === null) {
      nonLiterals.push(arm);
      continue;
    }
    members.push(literal[1]);
  }
  return { members, nonLiterals, body };
}

/**
 * THE STORE'S OWN CENSUS, PARSED OUT OF `src/error.rs`.
 *
 * `pub const CODES: [&str; N] = [ "…", … ];` — the array's members in rank order, plus `N` as the array's own
 * annotation. The annotation is read because it is a second printed figure of the same set inside the same
 * declaration, and the instrument that only counts the members cannot see an annotation left behind.
 */
export function parseStoreCensus(text) {
  const marker = 'pub const CODES';
  const blocks = occurrences(text, marker);
  assert.equal(blocks, 1,
    `src/error.rs must declare \`pub const CODES\` exactly once; the file carries it ${blocks} time(s), so the `
      + "store's own census cannot be derived from it");

  const at = text.indexOf(marker) + marker.length;
  const header = text.slice(at, text.indexOf('=', at));
  const annotation = /\[\s*&(?:\s*'static\s*)?\s*str\s*;\s*(\d+)\s*\]/.exec(header);
  assert.notEqual(annotation, null,
    'src/error.rs\'s `CODES` no longer prints a `[&str; N]` annotation, so the declared length is underivable: '
      + `the header reads ${JSON.stringify(header.trim())}`);

  const open = text.indexOf('[', text.indexOf('=', at));
  assert.notEqual(open, -1, 'src/error.rs\'s `CODES` carries no array literal');
  const close = text.indexOf('];', open);
  assert.notEqual(close, -1, 'src/error.rs\'s `CODES` array literal is not terminated by `];`');

  const members = [];
  for (const line of text.slice(open + 1, close).split('\n')) {
    const member = /^\s*"([^"\n]*)",\s*$/.exec(line);
    if (member !== null) members.push(member[1]);
  }
  return { members, declaredLength: Number(annotation[1]) };
}

/** Every spelling that occurs more than once in a list, in first-appearance order. */
function duplicatesOf(list) {
  const seen = new Set();
  const out = [];
  for (const member of list) {
    if (seen.has(member) && !out.includes(member)) out.push(member);
    seen.add(member);
  }
  return out;
}

/**
 * **THE ONE ASSERTION.** `src/error.rs` is the authority; `bindings/js/index.d.ts` is the subject. Both sides are
 * derived, so this function holds no status name of its own.
 *
 * The seven limbs, in the order they are checked — the ORDER IS THE POINT, because the failure that happened must
 * be REPORTED AS ITSELF and not as a count that moved:
 *   1. the authority is self-consistent (`[&str; N]` equals the members it annotates);
 *   2. neither side repeats a member (a repeat leaves the SET equal while the array is wrong);
 *   3. the escape arm is present, exactly once, and is not counted as a member;
 *   4. **no member of the store's array is missing from the declaration** — named;
 *   5. **no member of the declaration is missing from the store's array** — named;
 *   6. the two counts agree (the set-equality limbs above cannot see a duplicate, and the duplicate limb cannot
 *      see a count that moved on both sides at once);
 *   7. **the two rank orders agree** — the first divergence names both spellings and its rank.
 */
export function assertStatusCensus({ declarationText, storeText }) {
  const store = parseStoreCensus(storeText);
  const declaration = parseDeclarationCensus(declarationText);

  // 1 — THE AUTHORITY IS SELF-CONSISTENT.
  assert.equal(store.members.length, store.declaredLength,
    `src/error.rs's \`CODES\` is annotated \`[&str; ${store.declaredLength}]\` and carries `
      + `${store.members.length} member(s): the annotation and the array inside the same declaration disagree, so `
      + 'the authority this cell derives from is not self-consistent and no comparison against it is worth a '
      + 'verdict');

  // 2 — NEITHER SIDE REPEATS A MEMBER.
  const storeDuplicates = duplicatesOf(store.members);
  assert.deepEqual(storeDuplicates, [],
    `src/error.rs's \`CODES\` repeats ${storeDuplicates.map((m) => `'${m}'`).join(', ')}: a repeated member is a `
      + 'rank that stands twice and a set that stands one short');
  const declarationDuplicates = duplicatesOf(declaration.members);
  assert.deepEqual(declarationDuplicates, [],
    `bindings/js/index.d.ts's \`StoreStatus\` repeats ${declarationDuplicates.map((m) => `'${m}'`).join(', ')}: a `
      + 'repeated member is a rank that stands twice and a set that stands one short');

  // 3 — THE ESCAPE ARM IS PRESENT EXACTLY ONCE AND IS NOT A MEMBER.
  assert.deepEqual(declaration.nonLiterals, ['(string & {})'],
    'bindings/js/index.d.ts\'s `StoreStatus` must close with the ONE open escape arm `(string & {})` and carry '
      + 'no other non-literal arm; the arms this parser read as non-members are '
      + `${JSON.stringify(declaration.nonLiterals)} — the escape arm widens the union for a consumer and is not a `
      + 'status, so it is counted as zero members here (and its absence would narrow the published surface while '
      + 'a second one would be a second widening)');

  // 4 — NOTHING THE STORE CARRIES IS MISSING FROM THE DECLARATION. **THE FAILURE THIS CELL EXISTS FOR.**
  const missingFromDeclaration = store.members.filter((member) => !declaration.members.includes(member));
  assert.deepEqual(missingFromDeclaration, [],
    'THE DECLARATION IS SHORT OF THE STORE. src/error.rs\'s `CODES` carries '
      + `${missingFromDeclaration.map((m) => `'${m}' (rank ${store.members.indexOf(m) + 1})`).join(', ')}, and `
      + `bindings/js/index.d.ts's \`StoreStatus\` does not: the published union is ${declaration.members.length} `
      + `and the store's own census is ${store.members.length}. This is the shortfall a hand-written census cannot `
      + 'see, reported by member rather than by count');

  // 5 — NOTHING THE DECLARATION CARRIES IS MISSING FROM THE STORE.
  const missingFromStore = declaration.members.filter((member) => !store.members.includes(member));
  assert.deepEqual(missingFromStore, [],
    'THE STORE IS SHORT OF THE DECLARATION. bindings/js/index.d.ts\'s `StoreStatus` publishes '
      + `${missingFromStore.map((m) => `'${m}' (rank ${declaration.members.indexOf(m) + 1})`).join(', ')}, and `
      + `src/error.rs's \`CODES\` does not carry it: the store's own census is ${store.members.length} and the `
      + `published union is ${declaration.members.length}. A member published but never minted is a consumer's `
      + 'branch that can never be reached');

  // 6 — THE TWO COUNTS AGREE.
  assert.equal(declaration.members.length, store.members.length,
    `the published union carries ${declaration.members.length} member(s) and src/error.rs's \`CODES\` carries `
      + `${store.members.length}: the two sides name the same members and not the same number of ranks, which no `
      + 'set-equality limb above can see');

  // 7 — THE TWO RANK ORDERS AGREE. `src/error.rs`'s position is the rank.
  const firstDivergence = declaration.members.findIndex((member, index) => member !== store.members[index]);
  assert.equal(firstDivergence, -1,
    'THE TWO SIDES RANK THE SAME MEMBERS DIFFERENTLY. At rank ' + `${firstDivergence + 1}: src/error.rs's \`CODES\` `
      + `carries ${JSON.stringify(store.members[firstDivergence])} and bindings/js/index.d.ts's \`StoreStatus\` `
      + `carries ${JSON.stringify(declaration.members[firstDivergence])}. The rank order is the set's own order — `
      + 'rank `1`…`n` — so a member that moved is a different census even where both lists name it');

  return {
    members: store.members.length,
    ranks: store.members.map((member, index) => `${index + 1}:${member}`),
    escapeArm: declaration.nonLiterals[0],
  };
}
