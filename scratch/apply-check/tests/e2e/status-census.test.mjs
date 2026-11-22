// ═════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE STATUS CENSUS — **DERIVED, NOT TRANSCRIBED** — and the shortfall it was ordered to catch
//
// **THE FACT THIS CELL ASSERTS, AND WHY IT NEEDS A DERIVED INSTRUMENT.** `bindings/js/index.d.ts` publishes
// `StoreStatus`; `src/error.rs` mints the closed set as `pub const CODES: [&str; 17]`, ranked `1`…`17`, with
// `ValueRefusedAtBoundary` last (`strata/decisions.md` · `D-17` sends the instrument to the CODE, which is where
// this cell reads it; the 2026-10-23 amendment to the contract is cited by the store's own doc comment and is
// NOT opened here). **The shipped declaration once carried SIXTEEN while the store carried SEVENTEEN, and every
// instrument that would have caught it was a hand-typed array of names** — the `greens` battery's own census
// included. A hand-typed list agrees with itself while the tree moves; **this cell holds no status name, no rank
// and no count of its own**: it parses both sides on every run and compares them, so a member added to either
// side, dropped from either side, moved in rank, or duplicated is a failure and the message names the member.
//
// **WHY THIS FILE AND WHY THIS LEG.** The two sides live in two languages: the union in the JavaScript
// declaration, the array in Rust. `npm test` (`node --test "tests/**/*.test.mjs"`) is the ONE declared leg that
// runs Node over this repository with the tree readable and no cargo build, and it is where the published
// surface's other runtime agreements are already checked. **The `typecheck` leg cannot be this instrument, and
// that is measured rather than preferred**: its fixture (`typecheck/consumer-fixture.ts`) names ZERO status
// literals — it checks the declaration's internal consistency through a package-specifier import and never reads
// `src/error.rs` — so a declaration short by one member compiles green there by construction. The Rust battery
// cannot be it either: it never opens `bindings/js/index.d.ts`, which is the file a consumer receives. So the
// comparison has to stand in the leg where both files are readable, and that leg is `npm test`.
//
// **WHAT IS OUT OF SCOPE HERE.** No `docs/**` path is read or opened by this cell: the authority is the store's
// CODE (`src/error.rs`) and the subject is the published CODE (`bindings/js/index.d.ts`). **And nothing under
// `src/**` or `bindings/js/**` is written by it** — the instrument reads two files and writes nothing.
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { assertStatusCensus, parseDeclarationCensus, parseStoreCensus } from './status-census-support.mjs';

const DECLARATION_URL = new URL('../../bindings/js/index.d.ts', import.meta.url);
const STORE_URL = new URL('../../src/error.rs', import.meta.url);

/** The two texts, read fresh on every run: a cached copy would be a hand-transcription with extra steps. */
function readBothSides() {
  return {
    declarationText: readFileSync(DECLARATION_URL, 'utf8'),
    storeText: readFileSync(STORE_URL, 'utf8'),
  };
}

test('the published StoreStatus union is the same SET as src/error.rs\'s CODES, in the same RANK order', () => {
  const sides = readBothSides();
  // **THE ONE ASSERTION.** Both sides derived; the store's array is the authority; the failure names the member.
  const census = assertStatusCensus(sides);

  // **AND THE DERIVATION IS REPORTED, NOT ASSERTED AWAY.** The count printed here is whatever the tree carries on
  // this run — this cell asserts no figure, which is the whole reason it can catch a figure that moves.
  assert.ok(census.members > 0,
    'the derivation read zero members from the store\'s own census, which would make every comparison above '
      + 'vacuous rather than green');
  assert.equal(census.escapeArm, '(string & {})',
    'the declaration\'s open escape arm must be `(string & {})` and must be counted as no member of the set');
});

test('the two sides are parsed INDEPENDENTLY, so a duplicated or reordered arm is not read as agreement', () => {
  // A structural guard on the instrument itself: each side's parser is driven against a synthetic text built by
  // MUTATING the real one, so a parser that silently returned the same answer for both inputs would be visible
  // here rather than only at the two files' current bytes.
  const { declarationText, storeText } = readBothSides();
  const store = parseStoreCensus(storeText);
  const declaration = parseDeclarationCensus(declarationText);

  // The store side: a member dropped from the real array is a shorter list, and its own annotation no longer
  // agrees — the authority's self-consistency is what the main cell checks first for exactly this reason.
  const dropped = store.members[store.members.length - 1];
  const shortened = storeText.replace(`"${dropped}",`, '');
  assert.equal(parseStoreCensus(shortened).members.length, store.members.length - 1,
    `src/error.rs's parser must see the array it was handed: with '${dropped}' removed the census must read `
      + `${store.members.length - 1}, and the parser returned `
      + `${parseStoreCensus(shortened).members.length}`);

  // The declaration side: the escape arm and the members are counted separately, so the arm cannot inflate the
  // union and a literal arm is never mistaken for the escape.
  assert.equal(declaration.nonLiterals.length, 1,
    'the declaration\'s union body must carry exactly one non-literal arm — the escape — and the parser must put '
      + `every string-literal arm in the member list; it read ${declaration.nonLiterals.length} non-literal `
      + `arm(s) and ${declaration.members.length} member(s)`);
  const droppedMember = declaration.members[declaration.members.length - 1];
  const oneLiteralFewer = declarationText.replace(`| '${droppedMember}'`, '');
  const narrowed = parseDeclarationCensus(oneLiteralFewer);
  assert.equal(narrowed.members.length, declaration.members.length - 1,
    `bindings/js/index.d.ts's parser must see the union it was handed: with '${droppedMember}' removed the `
      + `declaration must read ${declaration.members.length - 1} member(s), and the parser returned `
      + `${narrowed.members.length}`);
  assert.equal(narrowed.nonLiterals.length, 1,
    'dropping ONE literal arm must not disturb the escape arm\'s own count: the two are different arms and are '
      + 'never folded into one');

  // And the file paths are the declared ones: a cell that read the wrong file would otherwise pass by deriving
  // two empty lists from nothing.
  assert.match(fileURLToPath(DECLARATION_URL), /bindings\/js\/index\.d\.ts$/,
    'the declaration is read from `bindings/js/index.d.ts` — the file the package publishes — and from nowhere else');
  assert.match(fileURLToPath(STORE_URL), /src\/error\.rs$/,
    'the authority is read from `src/error.rs` — the store\'s own census — and from nowhere else');
});
