// `bindings/js/test/version-stamp-r2.test.mjs` — **THE `R2` SOURCE-ASSERTION SET FOR
// `U-STOREROOM-CONSUMER-FIX`, RE-AUTHORED AFTER THE ARCHITECT REVERSED THE DESIGN AND RULED `(a)`.**
//
// THE RULING THIS FILE IS AUTHORED UNDER, IN THE ARCHITECT'S OWN WORDS, VERBATIM: **`proceed with a.
// Don't pass empty strings, generate verbose message.`** Its landing is recorded at
// `docs/specs/storeroom-publish/parameter-semantics.md §5.1` (the clause beside the divergence, dated
// `2026-10-13`) and at `docs/specs/storeroom-publish/release.md §6.10`'s four-arm clause.
//
// ---------------------------------------------------------------------------------------------
// THE OPERATIVE CLAUSE SET, READ WHOLE BEFORE ANY CELL WAS WRITTEN
// ---------------------------------------------------------------------------------------------
// ONE — `parameter-semantics.md §5.1`, outside value `(vii)` — *"A MANIFEST THAT IS READABLE BUT WHOSE
// `version` KEY IS ABSENT OR NON-STRING"* — and the clauses standing beside it, RCA-8(d) annotate-beside:
//   * **CLAUSE `(C)` IS SUPERSEDED** — *"ANY NON-STRING-FOR-STRING SUBSTITUTION IS A MISMATCH: THE
//     `version()` READ REFUSES AND THE GUARD `P-PUB-10` FAILS THE RUN"* *"DESCRIBE A CARRIER THAT EMITS
//     A SUBSTITUTE VALUE. THE RULING FORBIDS THAT CARRIER, AND IT FORBIDS THE SUBSTITUTE ITSELF: 'THE
//     EMPTY STRING IS NOT AN ANSWER FOR ANY OF THESE STATES', SO THERE IS NO `""` FOR THE READ TO
//     REFUSE AND NO MISMATCH SET FOR IT TO BE A MEMBER OF AT THESE STATES, AND THE GUARD `P-PUB-10`
//     NEVER RUNS ON THEM."*
//   * **THE FOUR-STEP READING IS SUPERSEDED AT STEPS `(1)` AND `(2)`** — *"ITS STEPS `(1)` 'THE
//     DIRECTIVE IS EMITTED AT THIS STATE' AND `(2)` 'THE `None` ARM IS NOT TAKEN ...' WERE THE
//     OPERATIVE RE-STATE OF THE SUPERSEDED READING. THEIR PLACE: AT THESE STATES THE DIRECTIVE IS NOT
//     EMITTED AND THE BUILD FAILS, so THE RUN NEVER REACHES `version()` AND NEVER REACHES THE GUARD.
//     STEPS `(3)` AND `(4)` ARE THEREFORE UNREACHED AT THESE STATES RATHER THAN FALSIFIED ... AND NO
//     CELL MAY CLAIM EITHER OF THEM BY DRIVING A RUN."*
//   * **AND THE OPERATIVE READING**: *"At the states clause `(vii)` enumerates the CARRIER ABORTS — the
//     build script stops before the directive-bearing write — so THE DIRECTIVE IS NOT EMITTED, NO
//     ARTEFACT IS BUILT, NO STAMPED VALUE EXISTS, AND THE `None` ARM IS NOT A STATE A RUN EVER OBSERVES
//     AT THESE STATES"* — and *"A CARRIER THAT EMITS `""` FOR A NON-STRING `version` IS A FINDING
//     AGAINST THIS ROW."*
//   * **AND THE LAYER, DECLARED SO THE INSTRUMENT IS NOT CHOSEN**: *"NO CELL DRIVES THIS ROW'S OUTSIDE
//     VALUE `(vii)` ... SO THE ROW'S FIRABILITY IS SATISFIED BY A SOURCE-ASSERTION CELL READING THE
//     CARRIER'S OWN BYTES, AND NO CELL WHOSE OBSERVABLE IS THE RUN MAY BE AUTHORED AGAINST IT."*
//   * **AND CLAUSE `(E)` IS RE-VERIFIED, NOT SUPERSEDED** (`:454`): a READABLE `""` is still *"A VALUE
//     THAT WAS READ WITH NO FALLBACK"*, item `5`'s own case, *"and this state is not that one — it is a
//     read that produced no value at all."* *"The two are distinguishable again, and they are
//     distinguishable in exactly one sense — one of them fails."*
// TWO — `release.md §6.10`'s four-arm clause, which DECLARES THE FOUR ABORTING STATES AND THE MESSAGE:
//   * *"THE FOUR DECLARED ABORTING STATES, EACH NAMED AS ITS OWN STATE SO A CELL MAY REACH EACH: `(N1)`
//     AT THE STATE THE KEY'S BYTE-SEQUENCE IS ABSENT FROM THE MANIFEST TEXT ... ABORTS; `(N2)` AT THE
//     STATE THE RIGHTMOST KEY OCCURRENCE CARRIES NO COLON AFTER IT ... ABORTS; `(N3)` AT THE STATE THE
//     SLOT'S VALUE'S TRIMMED TEXT DOES NOT BEGIN WITH A QUOTE — ... WHICH IS THE NON-STRING-VALUE CASE
//     AND ANY OTHER CASE WHOSE HEAD IS NOT A QUOTE — ABORTS; AND `(N4)` AT THE STATE THE VALUE BEGINS
//     WITH A QUOTE AND CARRIES NO FURTHER QUOTE ... ABORTS. EACH OF THE FOUR IS A STATE THE BUILD CAN BE
//     DRIVEN INTO ONLY AT THE CARRIER'S OWN BYTES, AND EACH PRODUCES ITS OWN ABORT RATHER THAN AN
//     ANSWER: NO DIRECTIVE IS EMITTED, NO ARTEFACT IS BUILT, AND NO STAMPED VALUE EXISTS AT ANY OF THE
//     FOUR."*
//   * **AND THE MESSAGE'S CONTENT IS REQUIRED AT `:569`** — *"THE MESSAGE EACH OF THESE FOUR STATES
//     PRODUCES MUST CARRY, AT A MINIMUM — AND THE CARRIER'S OWN PROSE IS ITS OWN — (i) WHICH OF THE FOUR
//     STATES ABORTED, EACH ONE DISTINGUISHABLE FROM EVERY OTHER, SO A READER OF THE MESSAGE CAN TELL
//     THEM APART; (ii) THE MANIFEST'S OWN PATH AS THE CARRIER READ IT, WHICH IS `bindings/js/package.json`,
//     so a reader of the message knows WHICH FILE was read; AND (iii) WHAT THE MANIFEST MUST CONTAIN FOR
//     THE BUILD TO PROCEED — a `version` KEY WHOSE VALUE IS A JSON STRING — so a reader of the message
//     knows WHAT TO FIX. THE PROSE IS THE CARRIER'S AND NO FURTHER WORDING IS REQUIRED HERE: THE
//     REQUIREMENT IS CONTENT, AND IT IS STATED AS A REQUIREMENT ON THE CARRIER."*
//   * **AND THE ONE SPELLING FIXED ELSEWHERE IS READ AT ITS OWN HOME**: the directive's name
//     `STOREROOM_JS_PACKAGE_VERSION` (item `1`). No prose spelling is fixed, so no cell below asserts
//     any prose spelling — the assertions are CONTENT assertions, as `:569` requires.
// THREE — `docs/specs/storeroom-js/package.md §6.1`, its limb `(B)` RE-CUT TO THE STATE (`:1200`):
//   * *"LIMB `(B)`, RE-CUT: a READABLE manifest whose `version` SLOT HOLDS NO STRING aborts the build at
//     `bindings/js/build.rs`'s stamp path, and the four states it covers are [the four]. IT IS READ AT
//     THE FILE'S STAMP PATH AND NOT AT A LINE RANGE, and each state aborts WITH A VERBOSE MESSAGE whose
//     content is required at `release.md §6.10`'s four-arm clause."*
//   * and `:1175`: *"at the states in which the manifest's `version` slot holds no string THE BUILD
//     FAILS"*; `:1211` (`:1203`'s own line): *"AND NO CELL MAY CLAIM TO FAIL EITHER LIMB BY DRIVING A
//     RUN: the observable is the CARRIER'S OWN BYTES, which is `A95`'s form."*
// FOUR — the ONE CONSEQUENCE THAT BINDS EVERY CELL: a state that ABORTS THE BUILD CANNOT BE REACHED BY
// A RELEASE LEG, so **NO CELL BELOW CLAIMS TO FAIL ANY OF THE FOUR BY DRIVING A RUN.** Every cell that
// touches `(vii)`/`(N1)`–`(N4)` READS THE CARRIER'S OWN BYTES. The one DRIVEN cell (`R2-05`) is the
// HAPPY-PATH CONTROL on the artefact's own declared observable, which is not a source-level refusal.
//
// ---------------------------------------------------------------------------------------------
// WHY EVERY CELL EXCEPT THE CONTROL IS A SOURCE-ASSERTION CELL — `A95`, BY THE CLAUSE'S OWN WORDS
// ---------------------------------------------------------------------------------------------
// `A95` (ACTIVE row of `2026-10-13`, with its dated amendment): **a refusal need not be failed by a run,
// provided it names the layer at which it can fail; and NO CELL MAY CLAIM TO FAIL SUCH A MEMBER BY
// DRIVING THE RUN.** The four states here declare their layer in their own clause: THE CARRIER'S OWN
// BYTES. So: every cell below except `R2-05` reads `bindings/js/build.rs` AS TEXT and asserts on its
// declarations and its shape. None of them builds anything; none of them drives a release leg.
//
// ---------------------------------------------------------------------------------------------
// THE STATE MACHINE, ENUMERATED BEFORE THE CELLS — EACH STATE WITH THE CELL THAT CARRIES IT
// ---------------------------------------------------------------------------------------------
// `PAR-PUB-35`'s domain is *"the string `bindings/js/package.json`'s `version` field holds at BUILD
// TIME, character for character"*. The states, and this set's coverage:
//   (i)     the directive is emitted and carries a value — THE REAL MANIFEST, whose byte-sequence
//           `"version"` stands ONCE at `package.json:3`, reading `0.1.1`
//           → `R2-07` (the emit site, DRIVEN answer) and `R2-05` (the value, DRIVEN through `version()`);
//   (ii)    the directive was NEVER EMITTED AT ALL — outside value `(vi)`, the `None` arm's own state
//           → NOT THIS ROW'S SUBJECT (`release.md §6.10`'s four-arm clause puts the `None` arm outside
//           it: *"NO DIRECTIVE IS EMITTED, NO ARTEFACT IS BUILT ... AT ANY OF THE FOUR"*) — NO CELL;
//   (v)     the manifest READS `""` — a value that WAS read, no fallback runs
//           → `R2-06` (no emptiness test may be introduced on a lawful value);
//   (vii-a) the manifest is READABLE and the `version` KEY IS ABSENT
//           → `R2-01` (the absence is a STATE the script HOLDS) and `R2-02` (state `(N1)` ABORTS);
//   (vii-b) the manifest is READABLE and the `version` value is NON-STRING
//           → `R2-02` (state `(N3)` ABORTS) and `R2-04` (the locator does not read another key's value);
//   (vii-c) the rightmost key occurrence carries NO COLON → `R2-02` (state `(N2)` ABORTS);
//   (vii-d) the value BEGINS WITH A QUOTE and carries NO FURTHER QUOTE → `R2-02` (state `(N4)` ABORTS);
//   (vii-e) EACH OF `(N1)`–`(N4)` CARRIES ITS OWN MESSAGE WITH THE REQUIRED CONTENT
//           → `R2-03` (the state, distinguishable; the manifest's path; what the manifest must contain);
//   (vii-)  the manifest CANNOT BE READ — the read's own abort, NOT one of the four
//           → `R2-09` (its own state, carried so it is not confused with `(N1)`–`(N4)`).
// **AND `R2-08` IS THE INSTRUMENTS' OWN TEETH, AND IT CLOSES THE GAP THE ADVERSARIAL PASS FOUND**: the
// previous set put ONLY A SYNTHETIC through its admission vector. `R2-08` runs THE SAME VECTOR OVER THE
// REAL `bindings/js/build.rs` AND REPORTS WHAT IT SAYS, guard by guard.
//
// ---------------------------------------------------------------------------------------------
// INSTRUMENT DISCIPLINE
// ---------------------------------------------------------------------------------------------
// Every cell reads the carrier ONCE, through one reader (`analyse` → a comment-stripped view `TEXT` with
// string bodies intact, for the literals the clause itself spells, and a string-blanked view `CODE` for
// structural tokens). Comments are removed before anything is searched, because a form NAMED IN A REMARK
// is not a declaration — `build.rs` comments its whole reasoning, and an unstripped search would find the
// clause's own vocabulary (including the words of this very ruling) and report a false green. Every
// span-based cell carries a READER SANITY control, so a reader that found nothing cannot report an
// absence it manufactured. Where a cell's own instrument cannot see a shape a lawful carrier might use,
// THE LIMIT IS STATED IN THE CELL rather than hidden.
//
// AND WHAT WAS NOT DONE: no byte of `bindings/js/build.rs`, `bindings/js/src/**`, the specs, the
// trackers or `.github/**` was written by this pass; no expectation below was formed by reading the
// carrier's BEHAVIOUR; and the four aborting states are reached ONLY as text.
//
// ---------------------------------------------------------------------------------------------
// ⟶ **THE CARRIER CHANGE HAS LANDED, AND EVERY CELL DERIVED FROM THE FOUR-ARM CLAUSE IS RE-READ HERE.**
// ---------------------------------------------------------------------------------------------
// AND WHAT THE PASS THAT WROTE THIS BLOCK DID NOT DO: it wrote no byte outside `bindings/js/test/**`; it
// deleted no assertion without keeping its as-filed words in the file; it weakened, retargeted or removed
// no cell the landing did not supersede; it staged nothing; and it read `bindings/js/build.rs` ONLY to
// MEASURE the figures the landing moved — every expectation below is still the clauses' own.
//
// **THE RETIRED CELL ANNOUNCED ITS OWN EXIT CONDITION, AND THAT CONDITION IS MET.** `R2-10`'s assertion
// `silentArmDefaultsOf(CARRIER).length > 0` carried, in its own message, *"IF THIS ASSERTION EVER FAILS,
// THE CARRIER CHANGE HAS LANDED — and every cell of this file derived from the four-arm clause must be
// re-read, because the finding it recorded is then discharged."* **IT FAILED, ITS MESSAGE READING
// `OBSERVED: 0 silent arm(s) in the value derivation`, AND THIS BLOCK IS THE RE-READ IT ASKED FOR.** Its
// assertion is **RETIRED AND NOT ERASED**: the cell now asserts **THE DISCHARGE**, with its as-filed words
// kept verbatim beside the new assertion at `R2-10`. `RCA-8(d)`, applied in spirit — the as-filed bytes of
// a claim are a RECORD, and a claim the world has changed is SUPERSEDED rather than deleted.
//
// THE LANDING, MEASURED, EACH FIGURE BESIDE THE COMMAND THAT PRODUCED IT:
//   * `grep -n 'None => panic!(' bindings/js/build.rs` → `:100`, `:113`, `:124`, `:135` — **THE FOUR ARMS
//     ABORT, EACH WITH ITS OWN MESSAGE**, where the pre-landing carrier answered `""` at `:92`, `:94`,
//     `:96`, `:98` (`git show e9b19cd:bindings/js/build.rs | grep -n 'None => ""'`).
//   * `node --test bindings/js/test/version-stamp-r2.test.mjs` → `10` tests, `10` pass, `0` fail. **THE RED
//     SET OF THIS FILE IS NOW EMPTY, WHICH IS WHAT A LANDED CORRECTION LOOKS LIKE** — the pre-landing red
//     set was `R2-10` alone. **AND THE TWO FIGURES THIS LANDING MOVES ARE THESE: THE REAL-CARRIER
//     ADMISSION VECTOR IS `11/11` WHERE IT WAS `7/11`, AND `R2-07`'S DRIVEN CONTROL STILL ANSWERS `0.1.1`
//     AGAINST A MANIFEST OF `0.1.1`.**
//   * **AND THE `7/11` IS RE-MEASURED WITH THIS FILE'S OWN INSTRUMENT RATHER THAN REMEMBERED, BECAUSE THE
//     ONE QUESTION THE GREEN CANNOT ANSWER BY ITSELF IS WHETHER THE INSTRUMENT LOOSENED**: the pre-landing
//     carrier read out of history and put through THIS file's own `ADMISSION` list returns `7/11 ADMIT,
//     4/11 REFUSE — ADM-3, ADM-4, ADM-5, ADM-7`; and a WRONG carrier cut from the REAL bytes' own four arms
//     (each `panic!` restored to the superseded `=> ""`) returns the IDENTICAL `7/11 ADMIT, 4/11 REFUSE`
//     set. **SO `11/11` IS THE CARRIER'S IMPROVEMENT AND NOT A LOOSENED GUARD**, and `R2-10`(d) pins that
//     demonstration inside the cell rather than printing it once and forgetting it.
//   * **TWO FIGURE SETS OF `release.md §6.10`'S FOUR-ARM CLAUSE WERE STALE AGAINST THE CARRIER, AND THEY ARE
//     NAMED HERE AS DRIFT THIS PASS MEASURED AND DID NOT EDIT (the specs are outside this wall)**: the
//     `R2`-era clause's arm sites (`:92`, `:94`, `:96`, `:98`) and its step `(5)`'s emit sites (`:105`,
//     `:106`) now read `:100`–`:135` and `:154`, `:155` — `grep -n 'None => panic!(' bindings/js/build.rs`
//     and `grep -n 'let version = slot.to_string();' bindings/js/build.rs`. **AND THE FIGURE IS NOW AT ITS
//     OWN HOME RATHER THAN ONLY IN THIS FILE**: the corpus re-cut those anchors at `release.md §6.10`'s own
//     foot — read at this pass's own reading of the file, dated `2026-10-13`, not written by it — *"AND THE
//     FOUR PANIC SITES ARE, EXACTLY: `(N4)` AT `:100` … `(N1)` AT `:135`"* and *"THE FILE'S SINGLE EMIT
//     SITE STANDS AT `:154`–`:155`"* — **and this file's own measured figures AGREE WITH THAT RE-CUT SITE
//     FOR SITE AND LINE FOR LINE.** **NO CELL BELOW ASSERTS EITHER
//     SET EITHER WAY**: the clause re-cuts its own limb to read *"IT IS READ AT THE FILE'S STAMP PATH AND
//     NOT AT A LINE RANGE"*, so the STATE and not the line is the instrument.
//   * **AND ONE FIGURE THE LANDING BROKE RATHER THAN MERELY MOVED, CORRECTED HERE WITH ITS COMMAND** — the
//     READER'S OWN. Every site this file prints was counted in the string-blanked view, and blanking a
//     string literal also blanks the `\`-newline pair of a Rust line continuation, so that view loses one
//     newline per continuation: `awk 'END{print NR}' bindings/js/build.rs` → `262` source lines against
//     `229` in that view, and the `33` lines by which they differ are exactly the continuation lines
//     (`grep -c '\\$' bindings/js/build.rs` → `33`). The drift was invisible while the arms were one-line
//     `""` answers and every reported site stood before the first continuation; **the ruling's own verbose
//     messages put it in front of the arms and the emit**, and the same reader then reported the four arms
//     at `:100`, `:106`, `:111`, `:116` and the emit at `:131` where `grep -n` measures `:100`, `:113`,
//     `:124`, `:135` and `:155`. **THE VIEW IS CORRECTED (`lineOf` counts in the view that preserves
//     source newlines) AND A READER-SANITY CONTROL NOW REFUSES A VIEW THAT LOSES THEM**; every site figure
//     then agrees with `grep` — arm for arm `100=100 113=113 124=124 135=135`, emit `155`, read `70`, slot
//     `80` — and **no assertion was weakened, retargeted or removed by the correction**, which is why
//     `R2-10`'s battery is re-run whole after it.
//
// EVERY CELL OF THIS FILE THAT DERIVED FROM THE FOUR-ARM CLAUSE, RE-READ, WITH ITS DISPOSITION:
//   `R2-01` — the state `(N1)` is HELD and ABORTS: **KEPT, AND GREEN.** `(N1)`'s own abort stands at
//     `:135` and names its state in its message; the guard, the state and the assertion are unmoved.
//   `R2-02` — the four states each abort, and `""` is emitted for none: **KEPT, AND GREEN.** All four
//     abort at `:100`, `:113`, `:124`, `:135`. **ITS COMMENT'S CLAIM THAT *"today every one of the four
//     arms ANSWERS `""`"* WAS TRUE AT AUTHORING AND IS FALSE OF THIS TREE** — corrected in place at the
//     cell, its own words kept there as the record of what it read.
//   `R2-03` — `:569`'s three contents in every message: **KEPT, AND GREEN** — four abort sites, four
//     messages, pairwise distinguishable, each naming its state.
//   `R2-05` — the directive emitted once and unguarded on the CARRIED path: **KEPT, AND GREEN.** Its
//     subject was already the carried path and not the four, so the landing does not move it; the clause's
//     stale `:105`/`:106` emit figures are corrected beside their quote.
//   `R2-04`, `R2-06`, `R2-08`, `R2-09` — **NOT derived from the four arms**: the parser domain, item `5`'s
//     carried empty read, the emitted value's provenance, and limb `(A)` at the manifest read.
//     **RE-READ AND UNMOVED; KEPT — AND EACH ONE'S SUBJECT IS COUNTED RATHER THAN ASSUMED, BECAUSE A CELL
//     THAT WAS GREEN UNDER THE OLD DESIGN CAN BE GREEN FOR A REASON THAT IS NO LONGER THERE.** `R2-04`
//     sees its subject (`2` locating steps, receivers `rest` and `body`, both absence-scoped);
//     `R2-06`'s span is `5950` characters and its emptiness guard is fired by `M4`; `R2-08`'s provenance
//     chain is `3` rows and does reach the manifest read. **AND `R2-09` IS THE ONE CELL THE LANDING
//     STRENGTHENS RATHER THAN MERELY LEAVES GREEN**: its third check reads *"every abort this reader finds
//     inside the span is a MACRO abort with no receiver"*, and with the pre-landing span holding **ZERO**
//     aborts that check was VACUOUSLY TRUE — `every` over an empty set — while it now ranges over the
//     carrier's `4` macro aborts. **A GREEN THAT WAS VACUOUS AND IS NOT ANY MORE IS REPORTED HERE SO THE
//     OLD GREEN IS NOT READ AS HAVING CERTIFIED ANYTHING.** `R2-06` is the other cell the landing makes
//     sharper rather than vacuous — *"ONE OF THEM FAILS"* is true of the carrier now — and it still reads
//     the BYTES and not a run.
//   `R2-07` — THE DRIVEN CONTROL: **KEPT, STILL DRIVEN, AND RE-DRIVEN AFTER THE LANDING** — it loads the
//     artefact this tree built and reads `0.1.1` against the manifest's `0.1.1`.
//   `R2-10` — **SUPERSEDED AT ONE ASSERTION, WHICH IS RETIRED AND RE-POINTED**: the live-finding assertion
//     now asserts its DISCHARGE, and its teeth battery is KEPT and STRENGTHENED by `(d)`.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

// ---------------------------------------------------------------------------------------------
// the declared constants, read at their own bytes
// ---------------------------------------------------------------------------------------------
const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = dirname(HERE); // `bindings/js`
const REPO_ROOT = resolve(PKG_DIR, '..', '..');
const BUILD_RS = join(PKG_DIR, 'build.rs');
const MANIFEST_PATH = join(PKG_DIR, 'package.json');
const CRATE_MANIFEST = join(PKG_DIR, 'Cargo.toml');
const BUILT_ARTEFACT = join(PKG_DIR, 'build', 'Release', 'storeroom_js_binding.node');

/** `release.md §6.10` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2` — **THE DIRECTIVE'S
 *  EXACT NAME**, and the manifest path the carrier reads (`release.md §6.10`'s four-arm clause, the
 *  message's content `(ii)`: *"THE MANIFEST'S OWN PATH AS THE CARRIER READ IT, WHICH IS
 *  `bindings/js/package.json`"*). */
const DIRECTIVE = 'STOREROOM_JS_PACKAGE_VERSION';
const EMIT_PREFIX = `cargo:rustc-env=${DIRECTIVE}`;
const MANIFEST_FILE = 'package.json';
const MANIFEST_AS_READ = 'bindings/js/package.json';

/** `parameter-semantics.md §5.1` — `PAR-PUB-35`'s **domain** names *"the `version` FIELD"*. The key's
 *  own name is the clause's, not the carrier's. **THE QUOTES AROUND IT MAY BE ESCAPED**: inside a Rust
 *  string that carries a JSON fragment the key is spelled `\"version\"`, so the pattern admits either
 *  spelling and a BARE `version` (an identifier, or the interior of a longer name) is never taken for
 *  the key. */
const VERSION_KEY_PATTERN = /\\?"version\\?"/;
const VERSION_KEY_SPELLED = '"version"';

const MANIFEST = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
const MANIFEST_VERSION = MANIFEST.version;

/** `release.md §1.4a` item `3` / `contract.md §5.0a` — the crate's own version is the ONE value the
 *  stamp must never answer: it is the value the `None` arm takes (`package.md §6.1` item `3`). */
const CRATE_VERSION = (() => {
  const cargo = readFileSync(CRATE_MANIFEST, 'utf8');
  const m = /^version\s*=\s*"([^"]*)"/m.exec(cargo);
  assert.ok(m !== null, 'the sibling crate\'s manifest must declare a `version` — the `None` arm\'s value');
  return m[1];
})();

// ---------------------------------------------------------------------------------------------
// THE CLAUSES THEMSELVES, READ AT THEIR OWN BYTES — so an expectation that came from a clause can be
// shown to come from one, and so a clause that MOVES is reported rather than silently absorbed.
// ---------------------------------------------------------------------------------------------
const SPEC = {
  parameterSemantics: readFileSync(join(REPO_ROOT, 'docs/specs/storeroom-publish/parameter-semantics.md'), 'utf8'),
  release: readFileSync(join(REPO_ROOT, 'docs/specs/storeroom-publish/release.md'), 'utf8'),
  package: readFileSync(join(REPO_ROOT, 'docs/specs/storeroom-js/package.md'), 'utf8'),
};

/** **THE CLAUSE-CURRENCY CONTROL — AND WHY IT IS AN ASSERTION AND NOT A COMMENT.** Every expectation in
 *  this file came from a clause; `RCA-8(d)` says a superseded reading may not be derived from. So the
 *  clauses this ruling RESTS ON are read at their own bytes, and a clause that has MOVED is reported as
 *  a FAILURE with its own site named — never absorbed into a green cell that would then be asserting the
 *  superseded reading. **THE SENTENCES BELOW ARE EXCERPTS, NOT PARAPHRASES**: a paraphrase would move
 *  when the clause moves and would certify nothing. */
const CLAUSE_CURRENCY = [
  ['the ruling itself, verbatim',
    SPEC.parameterSemantics,
    'proceed with a. Don\'t pass empty strings, generate verbose message',
    '`parameter-semantics.md §5.1`, the clause beside the divergence (`2026-10-13`)'],
  ['clause (C) is superseded — the empty string is not an answer',
    SPEC.parameterSemantics,
    'THE EMPTY STRING IS NOT AN ANSWER FOR ANY OF THESE STATES',
    '`parameter-semantics.md §5.1`, the superseding clause'],
  ['the four-step reading is superseded at its first two steps',
    SPEC.parameterSemantics,
    'AT THESE STATES THE DIRECTIVE IS **NOT** EMITTED AND THE BUILD **FAILS**',
    '`parameter-semantics.md §5.1`, the four-step clause\'s supersession'],
  ['the four arms are DECLARED ABORTING STATES',
    SPEC.release,
    'THE FOUR DECLARED ABORTING STATES, EACH NAMED AS ITS OWN STATE SO A CELL MAY REACH EACH',
    '`release.md §6.10`, the four-arm clause'],
  ['each of the four produces its own ABORT rather than an answer',
    SPEC.release,
    'EACH PRODUCES ITS OWN ABORT RATHER THAN AN ANSWER',
    '`release.md §6.10`, the four-arm clause'],
  ['the message\'s content is required',
    SPEC.release,
    'WHICH OF THE FOUR STATES ABORTED, EACH ONE DISTINGUISHABLE FROM EVERY OTHER',
    '`release.md §6.10` `:569`'],
  ['the requirement is CONTENT and the prose is the carrier\'s',
    SPEC.release,
    'THE PROSE IS THE CARRIER\'S AND NO FURTHER WORDING IS REQUIRED HERE',
    '`release.md §6.10` `:569`'],
  ['the read\'s own abort is NOT one of the four',
    SPEC.release,
    'AND THE ONE ABORT THE CLAUSE ABOVE ALREADY NAMES IS NOT ONE OF THE FOUR',
    '`release.md §6.10` `:571`'],
  ['the empty-string branch is a LIVE finding, at its own home',
    SPEC.parameterSemantics,
    'so the finding is LIVE AND NOT HISTORICAL',
    '`parameter-semantics.md §5.1` `:468` — *"THE CARRIER THAT STANDS IN THE TREE AT THIS CLAUSE\'S DATE STILL TAKES THE EMPTY-STRING BRANCH"*'],
  ['limb (B) is re-cut to the state, not to a line range',
    SPEC.package,
    'IT IS READ AT THE FILE\'S STAMP PATH AND NOT AT A LINE RANGE',
    '`docs/specs/storeroom-js/package.md §6.1` limb `(B)` re-cut'],
  ['limb (A) is a panic at the manifest read, not re-cut',
    SPEC.package,
    'AND LIMB `(A)` IS DELIBERATELY NOT RE-CUT',
    '`docs/specs/storeroom-js/package.md §6.1`'],
];
function assertClauseSetIsCurrent() {
  const moved = CLAUSE_CURRENCY.filter(([, doc, sentence]) => !doc.includes(sentence))
    .map(([what, , sentence, where]) => `${what}: ${JSON.stringify(sentence)} is NOT at its own bytes (${where})`);
  assert.deepEqual(moved, [],
    'CLAUSE-CURRENCY CONTROL — a clause this file derives from has MOVED. A cell written to a superseded reading is exactly '
    + 'the defect `RCA-8(d)` forbids, so this control refuses to certify the set rather than reading it against a clause the '
    + 'corpus no longer carries. Re-read every cell whose DERIVES FROM names the clause below.');
}

// ---------------------------------------------------------------------------------------------
// `analyse` — comments removed, and a string-blanked twin of the same length
// ---------------------------------------------------------------------------------------------
/**
 * **TWO VIEWS OF ONE FILE, AND WHY BOTH ARE NEEDED.** `CODE` has every comment removed AND every
 * string/char literal's BODY blanked to spaces — so a structural token (`match`, `None`, `=>`, a brace
 * depth count) is found where it is CODE and never inside a message or a JSON name. `TEXT` has the
 * comments removed and the string bodies INTACT — because the `version` KEY, the manifest's path, the
 * directive's name and the abort messages ARE string literals, and a search for them in `CODE` would
 * find the searcher's own instrument and never the file. Both views are the SAME LENGTH, so an offset
 * found in one is the same offset in the other, and either can be turned into a line number.
 *
 * **⟶ AND THE ONE DIFFERENCE THAT DECIDES WHICH VIEW A LINE NUMBER IS COUNTED IN — MEASURED, DATED
 * `2026-10-13`, AFTER THE CARRIER CHANGE LANDED.** **`CODE` IS NOT A LINE-PRESERVING VIEW**: blanking a
 * string literal also blanks the `\`-NEWLINE pair of every Rust line continuation, so the newline is
 * REPLACED BY A SPACE and `CODE` carries FEWER LINES THAN THE SOURCE — `229` lines against this file's
 * `262` (`awk 'END{print NR}' bindings/js/build.rs` → `262`; `grep -c '\\$' bindings/js/build.rs` → `33`,
 * and the `33` lines by which the two counts differ are exactly those continuation lines). **SO A LINE
 * NUMBER COUNTED IN `CODE` DRIFTS DOWNWARD FROM THE FIRST LINE CONTINUATION INSIDE ANY STRING, AND THE
 * CARRIER'S OWN ABORT MESSAGES ARE BUILT FROM EXACTLY THOSE CONTINUATIONS.** This was invisible while the
 * four arms were one-line `""` answers: the pre-landing `bindings/js/build.rs` carried `204` `CODE` lines
 * against `213` source lines (`git show e9b19cd:bindings/js/build.rs | awk 'END{print NR}'` → `213`), and
 * every site this reader reports stood BEFORE the first continuation (`:70` and `:106` both exact).
 * **THE RULING'S OWN VERBOSE MESSAGES MOVED THE DRIFT IN FRONT OF THE ARMS AND THE EMIT SITE**, so the
 * same reader then reported the four arms at `:100`, `:106`, `:111`, `:116` and the emit at `:131` where
 * `grep -n` measures `:100`, `:113`, `:124`, `:135` and `:154`/`:155`. **`TEXT` PRESERVES EVERY SOURCE
 * NEWLINE** — the string branch writes to `code` alone — so a line number is counted in `TEXT` and nowhere
 * else, and the reader-sanity control below refuses a reader whose `TEXT` and source disagree on their
 * line count. **`CODE` REMAINS THE VIEW FOR STRUCTURE** — braces, `match`, `None`, `=>` — because a
 * brace inside a message must not be counted, and brace depth does not depend on newlines.
 */
function analyse(source) {
  const code = source.split(''); // comments blanked AND every string/char literal's BODY blanked
  const text = source.split(''); // comments blanked ONLY — literals INTACT (the key and the messages live in them)
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (c === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') { code[i] = ' '; text[i] = ' '; i += 1; }
      continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      let depth = 1;
      code[i] = ' '; text[i] = ' '; code[i + 1] = ' '; text[i + 1] = ' '; i += 2;
      while (i < source.length && depth > 0) {
        if (source[i] === '/' && source[i + 1] === '*') { depth += 1; }
        else if (source[i] === '*' && source[i + 1] === '/') {
          depth -= 1;
          if (depth === 0) { code[i] = ' '; text[i] = ' '; code[i + 1] = ' '; text[i + 1] = ' '; i += 2; break; }
        }
        code[i] = ' '; text[i] = ' '; i += 1;
      }
      continue;
    }
    if (c === '"') {
      i += 1;
      while (i < source.length) {
        if (source[i] === '\\') { code[i] = ' '; i += 1; if (i < source.length) { code[i] = ' '; i += 1; } continue; }
        if (source[i] === '"') { i += 1; break; }
        code[i] = ' '; i += 1;
      }
      continue;
    }
    if (c === "'") {
      // a CHAR LITERAL (`'x'`, `'\n'`) or a LIFETIME (`'a`); only the former has a body to blank.
      const escaped = source[i + 1] === '\\';
      const simple = source[i + 2] === "'" && source[i + 1] !== "'";
      if (escaped || simple) {
        let j = i + 1;
        while (j < source.length && source[j] !== "'") { code[j] = ' '; j += 1; }
        if (j < source.length) { code[j] = ' '; j += 1; }
        i = j + 1;
        continue;
      }
      i += 1;
      continue;
    }
    i += 1;
  }
  return { code: code.join(''), text: text.join('') };
}

// ---------------------------------------------------------------------------------------------
// THE INSTRUMENTS, NAMED ONCE — a cell and its NEGATIVE CONTROL must run THE SAME predicate, or the
// control would certify an instrument the cell does not use. `R2-08` drives each of these against a
// LAWFUL synthetic carrier, against MUTATED copies of the real one, AND — THE GAP THIS PASS CLOSES —
// against the REAL `bindings/js/build.rs` ITSELF.
// ---------------------------------------------------------------------------------------------
/** `R2-01`(A) — a TOTAL consumption of a split iterator (`rsplit(..).next()` / `split(..).next()`):
 *  total by construction, so it CANNOT report the key's absence. */
const TOTAL_SEARCH = /\.\s*(?:rsplit|split)\s*\([\s\S]{0,300}?\)\s*\.\s*next\s*\(\s*\)/;
/** `R2-01`(B) — the slot's absence HELD AS A STATE. */
const ABSENCE_HELD = /\bNone\b|\bif\s+let\b|\belse\b|\bmatch\b|\bunwrap_or\b|\bok_or\b/;
/** `R2-02` / `R2-03` — AN ABORTING CALL. **THE SET IS DECLARED AND NOT EXHAUSTIVE**: it names the forms
 *  a Rust build script reaches for when it must stop the build, and a lawful carrier using a form
 *  outside it would be refused by this cell — that LIMIT IS STATED rather than hidden. The
 *  `.expect`/`.unwrap` alternative requires a **RECEIVER** the character before it cannot extend, so a
 *  match arrow (`=> .expect(..)`) — which is not Rust — is never taken for a call; a manifest-read panic
 *  is therefore distinguishable from an arm's by its receiver.
 *  AND AN ARM THAT ANSWERS A VALUE IS AN ABORT TOO, at the clause's own terms (`:568`: `(N3) ... THE
 *  ARM `:94` HOLDS`) — but the silent-default guard above reads that shape directly, so this reader's
 *  subject is the MESSAGE-CARRYING abort. */
const ABORT_CALL = /(?:^|[^=!<>A-Za-z0-9_.)])([A-Za-z_][A-Za-z0-9_.]*)\s*\.\s*(?:expect|unwrap)\s*\(|(?:^|[^A-Za-z0-9_])(panic|unreachable|todo|unimplemented|bail|fail|abort|assert|assert_eq|assert_ne)!\s*\(|\bprocess\s*::\s*exit\s*\(/g;
/** `R2-02` — a SILENT DEFAULT: a match arm that ANSWERS a value instead of aborting. The clause's own
 *  words for the superseded shape are *"EVERY ONE OF THEM ANSWERS THE EMPTY STRING"*, so the empty
 *  string is the default this guard reads; a non-empty literal default is the same defect (`(N3)`
 *  spells *"ANY OTHER CASE WHOSE HEAD IS NOT A QUOTE"`). **THE BODY IS READ UP TO THE FIRST `,` OR `}`
 *  — NOT ACROSS IT**, because a pattern like `Some(end) => &body[..end], None => ""` would otherwise be
 *  read WHOLE and would report a lawful arm as a silent default; the first draft of this guard did
 *  exactly that and the arms it reported were the carried path's own. */
/** `R2-02` — a SILENT DEFAULT: a match arm that ANSWERS a value instead of aborting. The clause's own
 *  words for the superseded shape are *"EVERY ONE OF THEM ANSWERS THE EMPTY STRING"*.
 *  **THE BODY IS READ UP TO THE FIRST `,` OR `}` AND NEVER ACROSS ONE**, and a match's own nested
 *  patterns are `match ... {` and so are stopped at the `{` rather than consumed. **THREE DRAFTS OF
 *  THIS GUARD ARE RECORDED BECAUSE EACH FAILED IN A WAY THAT REPORTED ZERO**: (1) a body that could be
 *  EMPTY made the match advance past an arm's own `=>`, so the arms after a nested `match` read as zero;
 *  (2) a literal pattern that stopped at the first inner quote mis-read the arms after `strip_prefix('"')`
 *  — a carrier spells that quote ESCAPED, as `'\\"'` in the source; (3) a body read up to the first
 *  `,`/`}` WITHOUT the `[^,}]` head consumed the whole tail to the next `}` when a message contained a
 *  (3) a body read to the first `,`/`}` WITHOUT a same-line bound over-reached whenever a message carried
 *  a brace or a comma inside a literal. **THE ARM IS THEREFORE READ ONE LINE AT A TIME** — an abort whose
 *  arguments span lines is not a silent default, and a silent default is always a single-line arm. */
const SILENT_ARM_DEFAULT = /=>[ \t]*([^\s,}][^,}\n]*)/g;
/** **THE BODY THAT IS A SILENT DEFAULT** — the clause's own shapes. **THE LIMIT IS STATED**: a default
 *  spelled in a form outside this set is not seen, and a block body is deliberately not read. */
const IS_SILENT_DEFAULT = (body) => /^"/.test(body) || /^'/.test(body)
  || /^String\s*::\s*(?:new|from|default)\s*\(/.test(body)
  || /^Default\s*::\s*default\s*\(/.test(body)
  || /^Vec\s*::\s*new\s*\(\s*\)/.test(body) || /^vec!\s*\[/.test(body)
  || /^\.to_owned\s*\(\s*\)/.test(body);
/** `R2-02` — the four states' own identifiers, as the clause names them (`release.md §6.10`'s four-arm
 *  clause). A lawful carrier that names its states differently cannot be read by this guard, AND THE
 *  CELL SAYS SO rather than reporting a false absence. */
const STATE_NAMES = ['N1', 'N2', 'N3', 'N4'];
const HAS_STATE_NAME = Object.fromEntries(STATE_NAMES.map((s) => [s, new RegExp(`(?:^|[^A-Za-z0-9_])${s}(?:[^A-Za-z0-9_]|$)`)]));
/** `R2-04` — a step that LOCATES the value (a colon split or a quote scan) TOGETHER WITH ITS RECEIVER.
 *  **THE RECEIVER IS THE SUBJECT, NOT THE STATEMENT**: in a lawful carrier the colon split stands in the
 *  same statement as the key search, so a statement-level test would refuse a lawful shape. */
const LOCATOR = /([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*split(?:_once)?\s*\(\s*':'|([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*find\s*\(\s*'"/g;
/** `R2-04` — evidence that a piece of text is SCOPED to the slot: a search that can answer `None` whose
 *  absence is handled. */
const SCOPE_EVIDENCE = /\bsplit_once\s*\(|\bfind\s*\(|\.nth\s*\(|\bstrip_prefix\s*\(|\bunwrap_or\b|\bok_or\b|\bmatch\b|\bif\s+let\b|\belse\b/;
/** `R2-06` — a test of the VALUE's EMPTINESS, which is the test a fallback from a PRESENT value would be
 *  hung on (the widening `(b)` the row refused). */
const EMPTINESS_TEST = /\bis_empty\s*\(|\.len\s*\(\s*\)\s*==\s*0|==\s*""|!=\s*""/;
/** `R2-03` — the CONTENT `(ii)` requires: the manifest's path AS THE CARRIER READ IT, either spelled in
 *  the message or reached through the binding the carrier built it from. */
const MESSAGE_HAS_PATH = /package\.json|[A-Za-z_]*manifest[A-Za-z_]*/;
/** `R2-03` — the CONTENT `(iii)` requires, at its minimum: the KEY, the fact that its value is a STRING,
 *  and the JSON form the clause names. The PROSE is the carrier's (`:569`), so this reads CONTENT TOKENS
 *  and never a sentence. */
const MESSAGE_HAS_KEY = /\bversion\b/;
const MESSAGE_HAS_STRING = /\bstring\b/i;
const MESSAGE_HAS_JSON = /\bjson\b/i;

const snippet = (s, n = 190) => s.replace(/\s+/g, ' ').trim().slice(0, n);

/** `R2-04` — the whole-text taint, run over ONE carrier's own statements: a binding is
 *  WHOLE-TEXT-POSSIBLE if it holds the manifest read, or if it is derived from a whole-text-possible
 *  binding WITHOUT a step that can answer `None` and handle it. **THE CLAUSE THAT SURVIVES THE RULING
 *  UNCHANGED** (`release.md §6.10` item 2's parser-domain clause, *"THE STAMP THEN CARRIES THAT
 *  OCCURRENCE'S VALUE RATHER THAN THE DECLARED FIELD'S"*): at no state may a NEIGHBOURING KEY'S VALUE be
 *  stamped. A LOCATOR whose RECEIVER is whole-text-possible is the defect. */
function locatorViolations(c) {
  if (c.READ_STMT === null) return [];
  const tainted = new Set();
  for (const b of (c.READ_STMT.lhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [])) tainted.add(b);
  const violations = [];
  for (const stmt of c.STATEMENTS) {
    LOCATOR.lastIndex = 0;
    let m;
    while ((m = LOCATOR.exec(stmt.text)) !== null) {
      const receiver = m[1] ?? m[2];
      if (tainted.has(receiver)) violations.push({ line: stmt.line, receiver, text: snippet(stmt.text, 210) });
    }
    const idents = (stmt.rhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []);
    if (idents.some((n) => tainted.has(n)) && !SCOPE_EVIDENCE.test(stmt.rhs)) {
      for (const n of (stmt.lhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [])) {
        if (!['mut', 'Some', 'Ok', 'Err', 'None', 'ref'].includes(n)) tainted.add(n);
      }
    }
  }
  return violations;
}

/** `R2-07` — the emit site stands INSIDE a conditional, so a path can skip the directive. **READ WITH
 *  THE RULING: at the four aborting states the directive IS skipped because the BUILD FAILS, and that is
 *  the declared shape — so this cell's subject is the CARRIED path (the real manifest), where the clause
 *  requires *"EXACTLY ONE EMIT SITE"* (`release.md §6.10`'s five-step locator clause, its step `(5)`). */
const emitIsGuarded = (c) => c.EMIT !== null && c.READ_STMT !== null && c.EMIT.depth !== c.depthAt(c.READ_STMT.start);
const emitSiteCount = (c) => c.EMIT_SITES.length;

/** `R2-05` — the emit's provenance reaching the crate's `Cargo.toml` version (the `None` arm's value). */
const fallbackRowsInProvenance = (c) => (c.EMIT_BINDING === null ? [] : c.provenanceOf(c.EMIT_BINDING).filter((r) => /CARGO_PKG_VERSION|Cargo\.toml/.test(r.rhs)));
const ambientReadOfDirective = (c) => new RegExp(`env::var(?:_os)?\\s*\\(\\s*"${DIRECTIVE}"`).test(c.TEXT);

// ---------------------------------------------------------------------------------------------
// THE ABORT READER — the region the four states live in, and the abort sites inside it
// ---------------------------------------------------------------------------------------------
/** **THE SPAN IS THE CARRIER'S OWN VALUE-DERIVATION REGION**: from the statement that names the key
 *  `"version"` to the statement that emits the directive. It OPENS at the key's own name, so the
 *  MANIFEST READ's own abort — the one abort `release.md §6.10`'s four-arm clause names and EXCLUDES
 *  from the four (`:571`: *"THE ONE ABORT THE CLAUSE ABOVE ALREADY NAMES IS NOT ONE OF THE FOUR"*) —
 *  stands OUTSIDE it, and a carrier's read panic can never be mistaken for an arm's. */
function abortSitesOf(c) {
  const re = new RegExp(ABORT_CALL.source, 'g');
  const sites = [];
  let m;
  while ((m = re.exec(c.SPAN)) !== null) {
    const at = m.index;
    const line = c.lineOf(c.SPAN_START + at);
    const receiver = m[1] ?? null;
    // the message/argument region opens at THIS match's own `(`, so the offset is taken from the match's
    // LENGTH and never from a fixed step — the match may carry a leading boundary character.
    const open = c.SPAN.indexOf('(', at + m[0].length - 1);
    let depth = 0;
    let end = -1;
    for (let i = open; i >= 0 && i < c.SPAN.length; i += 1) {
      if (c.SPAN[i] === '(') depth += 1;
      else if (c.SPAN[i] === ')') { depth -= 1; if (depth === 0) { end = i; break; } }
    }
    if (receiver !== null) {
      // the RECEIVER, read out of the comment-stripped, string-intact view — so the report says WHICH
      // object the aborting call hangs on, and the manifest read's own panic is identifiable by name.
      const before = c.SPAN_TEXT.slice(Math.max(0, at - 90), at + m[0].length);
      sites.push({ at, line, form: receiver, receiver, text: snippet(before, 220), message: null });
      continue;
    }
    const message = open === -1 ? null : (end === -1 ? null : c.SPAN_TEXT.slice(open + 1, end));
    sites.push({
      at, line, form: `${m[2]}!`, receiver: null,
      text: snippet(c.SPAN_TEXT.slice(at, end === -1 ? at + 160 : end + 1), 300),
      message,
    });
  }
  return sites;
}

/** **THE FOUR ARMS THAT ANSWER A VALUE INSTEAD OF ABORTING** — the SUPERSEDED shape, read at the
 *  carrier's own bytes. The clause names it by its own words (*"EVERY ONE OF THEM ANSWERS THE EMPTY
 *  STRING"*), so the guard reads a match arm whose body is a literal/default expression. */
function silentArmDefaultsOf(c) {
  const re = new RegExp(SILENT_ARM_DEFAULT.source, 'g');
  const hits = [];
  let m;
  while ((m = re.exec(c.SPAN)) !== null) {
    const body = m[1].trim();
    if (!IS_SILENT_DEFAULT(body)) continue; // the carried path and a block body are not defaults; the limit is stated at the pattern
    hits.push({ line: c.lineOf(c.SPAN_START + m.index), body, text: snippet(c.SPAN_TEXT.slice(Math.max(0, m.index - 70), m.index + m[0].length), 180) });
  }
  return hits;
}

/** **THE STATE EACH ARM ANSWERS, read at the arm's own identifier.** `release.md §6.10` names the four
 *  states `(N1)`–`(N4)`; a lawful carrier names each where it aborts. The guard reads the identifier
 *  beside each abort, and **WHERE A CARRIER NAMES ITS STATES DIFFERENTLY THE GUARD CANNOT SEE THEM —
 *  that limit is reported by the cell rather than converted into a pass.** */
/** **THE MESSAGES THE FOUR STATES PRODUCE, ONE PER ABORT — AND THE STATE NAMED IN EACH.** The state's
 *  identifier is looked for in the abort's own text (the call and its argument), **AND ALSO IN THE
 *  MESSAGE ITSELF**, because a lawful carrier may build its message through a helper that takes the
 *  state as its argument — `panic!` inside the helper then carries the state in its ARGUMENT rather than
 *  in a literal. **THE LIMIT IS STATED**: a helper whose messages this reader cannot follow refuses
 *  rather than passes, and the cell reports it. */
function abortMessagesOf(c) {
  const rows = [];
  for (const s of abortSitesOf(c)) {
    const text = `${s.text} ${s.message ?? ''}`;
    const state = STATE_NAMES.find((n) => HAS_STATE_NAME[n].test(text)) ?? null;
    rows.push({ line: s.line, form: s.form, state, message: s.message === null ? null : s.message.replace(/\s+/g, ' ').trim() });
  }
  return rows;
}

/** `ADM-5` — the four states, each present as its own state. */
function abortStatesOfSites(c) {
  return new Set(abortMessagesOf(c).map((r) => r.state).filter((s) => s !== null));
}

/** `ADM-7` — the messages' PAIRWISE DISTINCTNESS: a carrier whose four states produce one and the same
 *  message cannot satisfy `:569`'s content `(i)` (*"EACH ONE DISTINGUISHABLE FROM EVERY OTHER, SO A
 *  READER OF THE MESSAGE CAN TELL THEM APART"*), however verbose that one message is. */
function distinctAbortMessagesOf(c) {
  return new Set(abortMessagesOf(c).map((r) => r.message).filter((m) => m !== null && m !== ''));
}

/** **THE ADMISSION VECTOR — THE GUARDS, DECLARED ONCE.** `R2-08` runs THIS list over the lawful
 *  synthetic AND over the real carrier, so the two verdicts are comparable and neither can drift. */
const ADMISSION = [
  ['ADM-1 no TOTAL rightmost-occurrence search (the absence CAN be answered)', (c) => c.SPAN !== '' && !TOTAL_SEARCH.test(c.SPAN)],
  ['ADM-2 the absence is HELD AS A STATE', (c) => ABSENCE_HELD.test(c.SPAN)],
  ['ADM-3 NO SILENT DEFAULT answers any arm instead of aborting', (c) => silentArmDefaultsOf(c).length === 0],
  ['ADM-4 EVERY abort is MESSAGE-CARRYING (the verbose requirement, at the carrier)', (c) => {
    const sites = abortSitesOf(c);
    return sites.length > 0 && sites.every((s) => s.message !== null);
  }],
  ['ADM-5 all FOUR states abort, each present as its own state', (c) => abortStatesOfSites(c).size === 4],
  ['ADM-6 each arm\'s message carries the THREE REQUIRED CONTENTS',
    (c) => messageContentsOf(c).every((r) => r.hasPath && r.hasKey && r.hasString && r.hasJson)],
  ['ADM-7 the four states\' messages are PAIRWISE DISTINGUISHABLE, and every one of them IDENTIFIES ITS STATE',
    (c) => {
      const messages = distinctAbortMessagesOf(c);
      if (messages.size < 4) return false;
      const named = new Set();
      for (const m of messages) for (const n of STATE_NAMES) if (HAS_STATE_NAME[n].test(m)) named.add(n);
      return named.size === 4;
    }],
  ['ADM-8 ONE emit site, standing UNGUARDED (the carried path)', (c) => emitSiteCount(c) === 1 && c.EMIT !== null && !emitIsGuarded(c)],
  ['ADM-9 provenance is the MANIFEST (no crate version, no ambient read)', (c) => fallbackRowsInProvenance(c).length === 0 && !ambientReadOfDirective(c)],
  ['ADM-10 every value LOCATOR reads ABSENCE-SCOPED text (no other key\'s value)', (c) => locatorViolations(c).length === 0],
  ['ADM-11 NO emptiness test on a lawful value', (c) => !EMPTINESS_TEST.test(c.SPAN)],
];

/** `ADM-6`'s per-message detail, reported so a failure says WHICH required content is missing. */
function messageContentsOf(c) {
  return abortMessagesOf(c).filter((r) => r.message !== null).map((r) => ({
    line: r.line,
    state: r.state ?? '(unnamed state)',
    hasPath: MESSAGE_HAS_PATH.test(r.message),
    hasKey: MESSAGE_HAS_KEY.test(r.message),
    hasString: MESSAGE_HAS_STRING.test(r.message),
    hasJson: MESSAGE_HAS_JSON.test(r.message),
    text: snippet(r.message, 150),
  }));
}

// ---------------------------------------------------------------------------------------------
// THE READER — ONE CARRIER AT A TIME, so a control can read a MUTATED COPY — or a SYNTHETIC — through
// the very same instruments. `CARRIER` is `bindings/js/build.rs` itself.
// ---------------------------------------------------------------------------------------------
function readCarrier(source) {
  const { code: CODE, text: TEXT } = analyse(source);

  // **⟶ THE LINE NUMBERS THIS READER REPORTS ARE COUNTED IN `TEXT`, NOT IN `CODE`, AND THAT IS A
  // CORRECTION THE LANDING MADE NECESSARY RATHER THAN A PREFERENCE**: `CODE` loses one newline per
  // `\`-continuation inside a string literal, so counting in it reported the four arms at `:100`, `:106`,
  // `:111`, `:116` and the emit at `:131` where the source has `:100`, `:113`, `:124`, `:135` and `:155`.
  // The old counting is named here so the figure it produced is not taken for a measurement; `TEXT`
  // preserves every source newline and is the same length as `CODE`, so an offset is a position in both.
  const lineOf = (index) => TEXT.slice(0, index).split('\n').length;
  const depthAt = (index) => {
    let d = 0;
    for (let i = 0; i < index; i += 1) { if (CODE[i] === '{') d += 1; else if (CODE[i] === '}') d -= 1; }
    return d;
  };

  const statementEnd = (from) => {
    let depth = 0;
    for (let i = from; i < CODE.length; i += 1) {
      const ch = CODE[i];
      if ('([{'.includes(ch)) depth += 1;
      else if (')]}'.includes(ch)) depth -= 1;
      else if (ch === ';' && depth <= 0) return i;
    }
    return -1;
  };

  const STATEMENTS = (() => {
    const out = [];
    const re = /\blet\b/g;
    let m;
    while ((m = re.exec(CODE)) !== null) {
      let j = m.index + 3;
      let depth = 0;
      let eq = -1;
      while (j < CODE.length) {
        const ch = CODE[j];
        if ('([{'.includes(ch)) depth += 1;
        else if (')]}'.includes(ch)) depth -= 1;
        else if (ch === ';' && depth === 0) break;
        else if (ch === '=' && depth === 0 && CODE[j + 1] !== '=' && CODE[j - 1] !== '=' && CODE[j - 1] !== '!'
          && CODE[j - 1] !== '<' && CODE[j - 1] !== '>') { eq = j; break; }
        j += 1;
      }
      if (eq === -1) continue;
      const end = statementEnd(eq);
      if (end === -1) continue;
      out.push({
        start: m.index,
        end,
        lhs: CODE.slice(m.index + 3, eq),
        rhs: CODE.slice(eq + 1, end),
        text: TEXT.slice(m.index, end + 1),
        line: lineOf(m.index),
      });
      re.lastIndex = end + 1;
    }
    return out;
  })();

  const READ_STMT = STATEMENTS.find((st) => /read_to_string\s*\(/.test(st.rhs)) ?? null;
  const SEARCH_STMT = STATEMENTS.find((st) => VERSION_KEY_PATTERN.test(st.text)) ?? null;

  const EMIT_SITES = (() => {
    const sites = [];
    const re = new RegExp(`cargo:rustc-env=${DIRECTIVE}`, 'g');
    let m;
    while ((m = re.exec(TEXT)) !== null) {
      const call = TEXT.lastIndexOf('println!', m.index);
      if (call === -1) continue;
      const open = CODE.indexOf('(', call);
      let depth = 0;
      let end = -1;
      for (let i = open; i < CODE.length; i += 1) {
        if (CODE[i] === '(') depth += 1;
        else if (CODE[i] === ')') { depth -= 1; if (depth === 0) { end = i; break; } }
      }
      sites.push({ start: call, end: end === -1 ? m.index + 80 : end, depth: depthAt(call), line: lineOf(call) });
    }
    return sites;
  })();
  const EMIT = EMIT_SITES[0] ?? null;

  const EMIT_BINDING = (() => {
    if (EMIT === null) return null;
    const m = /\{\s*([A-Za-z_][A-Za-z0-9_]*)/.exec(TEXT.slice(EMIT.start, EMIT.end + 1));
    return m ? m[1] : null;
  })();

  const SPAN_START = SEARCH_STMT !== null ? SEARCH_STMT.start : (READ_STMT !== null ? READ_STMT.end + 1 : 0);
  const SPAN_MODE = SEARCH_STMT !== null
    ? `from the statement that names the key ${VERSION_KEY_SPELLED} (build.rs:${SEARCH_STMT.line})`
    : `POST-READ FALLBACK: no statement names the key ${VERSION_KEY_SPELLED}, so the span opens after the manifest read (build.rs:${READ_STMT ? READ_STMT.line : '?'})`;
  const SPAN = CODE.slice(SPAN_START, EMIT !== null ? EMIT.end + 1 : CODE.length);
  const SPAN_TEXT = TEXT.slice(SPAN_START, EMIT !== null ? EMIT.end + 1 : TEXT.length);

  /** **THE REGION THE READ'S OWN ABORT IS EXCLUDED FROM** — named so a reader can see WHY the manifest
   *  read's `.expect` is never counted among the four states (`release.md §6.10`, its `:571` clause). */
  const READ_ABORT_NOTE = SEARCH_STMT !== null
    ? `the manifest read's own abort (build.rs:${READ_STMT ? READ_STMT.line : '?'}) stands BEFORE the span and is excluded from it`
    : `the span opens AFTER the manifest read, so the read's own abort is excluded from it`;

  const spanReport = () => `[span: ${SPAN_MODE}; ${SPAN.trim().length} characters from build.rs:${lineOf(SPAN_START)} `
    + `to build.rs:${EMIT ? EMIT.line : '?'}; ${READ_ABORT_NOTE}]\n  span: ${snippet(SPAN_TEXT, 460)}`;

  const provenanceOf = (name) => {
    const seen = new Set();
    const rows = [];
    const queue = [name];
    let guard = 0;
    while (queue.length > 0 && guard < 60) {
      guard += 1;
      const n = queue.shift();
      if (seen.has(n)) continue;
      seen.add(n);
      const stmt = [...STATEMENTS].reverse().find((st) => st.end < (EMIT ? EMIT.start : CODE.length)
        && new RegExp(`\\b${n}\\b`).test(st.lhs));
      if (stmt === undefined) continue;
      rows.push({ name: n, line: stmt.line, rhs: stmt.text });
      for (const ident of stmt.rhs.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []) queue.push(ident);
    }
    return rows;
  };

  return {
    CODE, TEXT, STATEMENTS, READ_STMT, SEARCH_STMT, EMIT_SITES, EMIT, EMIT_BINDING,
    SPAN_START, SPAN_MODE, SPAN, SPAN_TEXT, READ_ABORT_NOTE,
    SOURCE_LINE_COUNT: source.split('\n').length,
    TEXT_LINE_COUNT: TEXT.split('\n').length,
    CODE_LINE_COUNT: CODE.split('\n').length,
    lineOf, depthAt, spanReport, provenanceOf,
  };
}

const CARRIER = readCarrier(readFileSync(BUILD_RS, 'utf8'));
const {
  TEXT, STATEMENTS, READ_STMT, SEARCH_STMT, EMIT_SITES, EMIT, EMIT_BINDING,
  SPAN, SPAN_TEXT, SPAN_START, SPAN_MODE,
} = CARRIER;
const lineOf = CARRIER.lineOf;
const depthAt = CARRIER.depthAt;
const spanReport = CARRIER.spanReport;
const provenanceOf = CARRIER.provenanceOf;

/** **A READER THAT FOUND NOTHING MUST NEVER REPORT AN ABSENCE IT MANUFACTURED.** */
function assertReaderIsSaneOf(c) {
  assert.ok(c.READ_STMT !== null,
    'READER SANITY: the carrier must READ the manifest itself — no statement calling `read_to_string` was found in '
    + '`bindings/js/build.rs` (`release.md §2.4` item 1: the build script *"READS `bindings/js/package.json`\'s '
    + '`version` ITSELF"*). Observed: 0 statements whose right-hand side calls `read_to_string`.');
  assert.ok(c.EMIT !== null,
    `READER SANITY: no EMIT SITE of the directive \`${EMIT_PREFIX}\` was found in \`bindings/js/build.rs\` — ` +
    '`docs/specs/storeroom-js/package.md §6.1` item 2 / `release.md §6.10` item 1: the carrier EMITS that directive on '
    + 'the carried path. Observed: 0 sites.');
  assert.ok(c.SPAN.trim().length > 40,
    `READER SANITY: the value-derivation span is degenerate (${c.SPAN.trim().length} characters), so an absence inside it `
    + `would be the instrument's and not the carrier's. Span: [${c.SPAN_MODE}]`);
  // **AND EVERY LINE NUMBER THIS READER PRINTS IS COUNTED IN `TEXT`, SO THE VIEW IT COUNTS IN MUST CARRY
  // ONE NEWLINE PER SOURCE LINE.** Without this control a view that silently lost newlines would report
  // sites at line numbers that no `grep` reproduces, and every cell whose message names a site would print
  // a figure that is not a measurement. **THE DRIFT IS NAMED AND NOT HIDDEN**: `CODE` legitimately carries
  // FEWER lines than the source, because blanking a string literal blanks the `\`-newline pair of every
  // continuation — which is exactly why it is not the view a line is counted in.
  assert.equal(c.TEXT_LINE_COUNT, c.SOURCE_LINE_COUNT,
    `READER SANITY: the view every reported line number is counted in carries ${c.TEXT_LINE_COUNT} lines against the source's `
    + `${c.SOURCE_LINE_COUNT}, so a site this reader names would be reported at a line no reader of the file could find. ` +
    `(For the record, the string-blanked view carries ${c.CODE_LINE_COUNT} lines; it is not a line-preserving view and is used for structure only.)`);
}
const assertReaderIsSane = () => assertReaderIsSaneOf(CARRIER);

// =============================================================================================
// THE CELLS
// =============================================================================================

// ---------------------------------------------------------------------------------------------
// `R2-01` — the KEY'S ABSENCE is a STATE THE SCRIPT HOLDS, and it aborts — WAS RED; GREEN SINCE THE
// CARRIER CHANGE LANDED (`(N1)` aborts at `build.rs` `:135`)
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii-a) SOURCE :: R2-01 — the `version` KEY\'S ABSENCE is a STATE THE SCRIPT HOLDS, and it ABORTS', () => {
  // DERIVES FROM: `release.md §6.10`'s four-arm clause, state `(N1)` — *"(N1) AT `:98` — THE KEY'S
  // BYTE-SEQUENCE IS ABSENT FROM THE MANIFEST TEXT READ WHOLE AT `:70`; `rsplit_once` ANSWERS `None`,
  // AND THE ABSENCE IS A STATE THIS SCRIPT HOLDS RATHER THAN A PANIC — the arm carries no `.next()` and
  // no `.expect`, which the total `rsplit(..).next()` it replaced could not have held, since a split
  // iterator cannot answer absence and yielded the whole file text instead"* — read with the same
  // clause's declaration that state `(N1)` **ABORTS** (*"EACH PRODUCES ITS OWN ABORT RATHER THAN AN
  // ANSWER"*), with `parameter-semantics.md §5.1` clause `(E)` (*"it is a read that produced no value at
  // all"*), and with `package.md §6.1` limb `(B)` re-cut (`:1200`).
  //
  // **WHAT THIS CELL ASSERTS, AND IN WHAT ORDER, BECAUSE THE REQUIREMENT HAS THREE PARTS.**
  //   (A) THE ABSENCE IS ANSWERABLE AND HELD: the search is NOT a TOTAL consumption of a split iterator
  //       (`rsplit(..).next()`), which cannot answer absence — with the key absent it yields THE WHOLE
  //       FILE TEXT; and the derivation DECLARES a branch in which absence is a state (`None`, `if let`,
  //       `else`, `match`, `unwrap_or`, `ok_or`). Under the ruling the absence is still a STATE the
  //       script holds — it is NOT asserted away.
  //   (B) AND THAT STATE ABORTS: **the held-absence shape must not ANSWER A VALUE.** The superseded
  //       design is named by the superseded clause's own words — *"EVERY ONE OF THEM ANSWERS THE EMPTY
  //       STRING"* — so a match arm whose body is a literal/default (`=> ""` and its kin) is the
  //       SUPERSEDED ANSWER, and the operative one is an ABORT. **THE EMPTY STRING IS NOT AN ANSWER FOR
  //       THIS STATE** (ruling `(a)`, verbatim: *"Don't pass empty strings"*).
  assertReaderIsSane();
  const observedSpan = spanReport();
  const failures = [];

  const total = TOTAL_SEARCH.exec(SPAN);
  if (total !== null) {
    failures.push(`(A-i) THE SEARCH CANNOT ANSWER "ABSENT": the value derivation consumes a split iterator with \`.next()\`, which is `
      + `TOTAL BY CONSTRUCTION — with the key absent it yields ONE item, THE WHOLE FILE TEXT. observed at build.rs:${lineOf(SPAN_START + total.index)}`);
  }
  if (!ABSENCE_HELD.test(SPAN)) {
    failures.push('(A-ii) THE ABSENT STATE IS NOT HELD: no branch in which the slot\'s absence is a value — no `None`, no `if let`, '
      + 'no `else`, no `match`, no `unwrap_or`, no `ok_or`.');
  }

  const silent = silentArmDefaultsOf(CARRIER);
  if (silent.length > 0) {
    failures.push(`(B) THE HELD ABSENCE ANSWERS A VALUE INSTEAD OF ABORTING THE BUILD: ${silent.length} match arm(s) in the derivation `
      + `answer a literal/default rather than aborting, at build.rs:${silent.map((s) => s.line).join(', :')} `
      + `(${silent.map((s) => `\`${s.text}\``).join(' ')}). State \`(N1)\` \\u2014 and every one of the clause's four states \\u2014 MUST ABORT: `
      + '`release.md §6.10`\'s four-arm clause declares *"EACH PRODUCES ITS OWN ABORT RATHER THAN AN ANSWER: NO DIRECTIVE IS EMITTED, '
      + 'NO ARTEFACT IS BUILT, AND NO STAMPED VALUE EXISTS AT ANY OF THE FOUR"*, and the ruling says *"Don\'t pass empty strings"*.');
  }

  const sites = abortSitesOf(CARRIER);
  const states = abortStatesOfSites(CARRIER);
  if (!states.has('N1')) {
    failures.push(`(B) AND STATE \`(N1)\` CARRIES NO ABORT OF ITS OWN: ${sites.length} abort site(s) stand in the derivation and none `
      + `carries the identifier \`N1\` — the state the key's absence reaches has no abort. **THE ONE LIMIT OF THIS GUARD, STATED: a lawful `
      + 'carrier that names its states differently cannot be seen by it, so a zero here is reported and never softened.**');
  }

  assert.ok(failures.length === 0,
    'CLAUSE `release.md §6.10`\'s four-arm clause, state `(N1)` — *"THE ABSENCE IS A STATE THIS SCRIPT HOLDS RATHER THAN A PANIC"* — read '
    + 'with its own four-state declaration (*"EACH PRODUCES ITS OWN ABORT RATHER THAN AN ANSWER"*) and with the architect\'s ruling `(a)`: '
    + '*"proceed with a. Don\'t pass empty strings, generate verbose message."* DECLARED: the key\'s absence is a state the script HOLDS, '
    + 'and AT THAT STATE THE BUILD ABORTS. '
    + `OBSERVED: ${failures.length} of this cell's 4 assertions fail.\n  ` + failures.join('\n  ') + '\n  ' + observedSpan);
});

// ---------------------------------------------------------------------------------------------
// `R2-02` — the FOUR ABORTING STATES, each named as its own state — WAS RED; GREEN SINCE THE CARRIER
// CHANGE LANDED (`build.rs` `:100`, `:113`, `:124`, `:135`)
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii) SOURCE :: R2-02 — A NON-STRING, AN UNTERMINATED VALUE, A VALUE WITH NO COLON AND AN ABSENT KEY EACH ABORT THE BUILD, AND THE EMPTY STRING IS EMITTED FOR NONE', () => {
  // DERIVES FROM: `release.md §6.10`'s four-arm clause, READ WHOLE — *"THE FOUR DECLARED ABORTING
  // STATES, EACH NAMED AS ITS OWN STATE SO A CELL MAY REACH EACH: `(N1)` AT THE STATE THE KEY'S
  // BYTE-SEQUENCE IS ABSENT FROM THE MANIFEST TEXT ... ABORTS; `(N2)` AT THE STATE THE RIGHTMOST KEY
  // OCCURRENCE CARRIES NO COLON AFTER IT ... ABORTS; `(N3)` AT THE STATE THE SLOT'S VALUE'S TRIMMED TEXT
  // DOES NOT BEGIN WITH A QUOTE — ... WHICH IS THE NON-STRING-VALUE CASE AND ANY OTHER CASE WHOSE HEAD
  // IS NOT A QUOTE — ABORTS; AND `(N4)` AT THE STATE THE VALUE BEGINS WITH A QUOTE AND CARRIES NO
  // FURTHER QUOTE ... ABORTS"* — read with `parameter-semantics.md §5.1`'s supersession clause (*"THE
  // EMPTY STRING IS NOT AN ANSWER FOR ANY OF THESE STATES"*), with `package.md §6.1` limb `(B)` re-cut
  // (the four states, read at the STAMP PATH rather than at a dead line range), and with the ruling's
  // own words: *"Don't pass empty strings, generate verbose message."*
  //
  // **THE FOUR STATES ARE ENUMERATED HERE, EACH WITH THE ARM THE CLAUSE NAMES, BEFORE THE ASSERTION** —
  // because a cell that cannot say WHICH state it read is a cell that cannot be falsified at the right
  // place:
  //   (vii-a) / `(N1)` — the `version` key's byte-sequence is ABSENT from the manifest text;
  //   (vii-c) / `(N2)` — the rightmost key occurrence carries NO COLON after it;
  //   (vii-b) / `(N3)` — the slot's value's trimmed text DOES NOT BEGIN WITH A QUOTE (the non-string case);
  //   (vii-d) / `(N4)` — the value BEGINS WITH A QUOTE and carries NO FURTHER QUOTE (unterminated).
  // **⟶ AND THE CELL'S OWN STATUS, CORRECTED BECAUSE THE FIGURE IT CARRIED HAS MOVED.** IT WAS AUTHORED
  // RED, AND ITS OWN WORDS FOR WHY ARE KEPT HERE AS THE RECORD: *"THE ASSERTED PROPERTY IS THE OPPOSITE OF
  // TODAY'S CARRIER, WHICH IS WHY THIS CELL IS RED: today every one of the four arms ANSWERS `""` and the
  // build FINISHES; the clause requires all four to ABORT with a message."* **THAT "TODAY" WAS THE
  // PRE-LANDING TREE AND IS NOW FALSE OF THIS ONE**: the four arms ABORT — `grep -n 'None => panic!('
  // bindings/js/build.rs` → `:100`, `:113`, `:124`, `:135` — so this cell is GREEN, and it is green
  // because the carrier moved rather than because the clause moved. The `(A)` guard still reads the
  // superseded shape directly, which is what makes the cell falsifiable if that shape returns; the `(B)`
  // and `(C)` guards read the required one.
  assertReaderIsSane();
  const observedSpan = spanReport();
  const failures = [];

  const silent = silentArmDefaultsOf(CARRIER);
  if (silent.length > 0) {
    failures.push(`(A) AN ARM ANSWERS THE EMPTY STRING (or another literal/default) INSTEAD OF ABORTING: ${silent.length} arm(s) at `
      + `build.rs:${silent.map((s) => s.line).join(', :')} — ${silent.map((s) => `\`${s.text}\``).join('; ')}. The clause requires an `
      + 'ABORT at each of the four states, and the ruling forbids the empty string as an answer for any of them.');
  }
  const sites = abortSitesOf(CARRIER);
  if (sites.length === 0) {
    failures.push('(B) NO ABORT STANDS IN THE VALUE DERIVATION AT ALL: 0 aborting calls were found between the statement that names the '
      + 'key and the statement that emits the directive — so NONE of the four declared aborting states aborts, and the build finishes at '
      + 'every one of them. **AND THE ABORT SEARCH IS EXCLUSIVE OF THE MANIFEST READ\'S OWN PANIC BY CONSTRUCTION** (`release.md §6.10`, '
      + `its \`:571\` clause: *"THE ONE ABORT THE CLAUSE ABOVE ALREADY NAMES IS NOT ONE OF THE FOUR"*) — the span opens AT the key's own `
      + `name; ${CARRIER.READ_ABORT_NOTE}.`);
  }
  const states = abortStatesOfSites(CARRIER);
  const missing = STATE_NAMES.filter((n) => !states.has(n));
  if (sites.length > 0 && missing.length > 0) {
    failures.push(`(C) THE FOUR STATES ARE NOT EACH REACHED: abort sites stand at build.rs:${sites.map((s) => s.line).join(', :')} but the `
      + `states [${missing.join(', ')}] carry no abort. A state the clause NAMES and the carrier never reaches is a state the build cannot `
      + 'be driven into — the clause\'s own words are *"EACH NAMED AS ITS OWN STATE SO A CELL MAY REACH EACH"*. **THE ONE LIMIT OF THIS '
      + 'GUARD, STATED: it reads the identifiers `N1`–`N4`, which the CLAUSE supplies; a lawful carrier that names its states otherwise '
      + 'would be refused by it, and this zero is reported rather than softened.**');
  }

  assert.ok(failures.length === 0,
    'CLAUSE `release.md §6.10`\'s four-arm clause + `parameter-semantics.md §5.1`\'s supersession clause + `docs/specs/storeroom-js/package.md '
    + '§6.1` limb `(B)` re-cut. DECLARED: a NON-STRING `version` `(N3)`, an UNTERMINATED value `(N4)`, a value with NO COLON after the key '
    + '`(N2)` and an ABSENT key `(N1)` EACH ABORT THE BUILD — *"NO DIRECTIVE IS EMITTED, NO ARTEFACT IS BUILT, AND NO STAMPED VALUE EXISTS '
    + 'AT ANY OF THE FOUR"* — and THE EMPTY STRING IS EMITTED FOR NONE OF THEM. '
    + `OBSERVED: ${failures.length} of this cell's 3 assertions fail.\n  ` + failures.join('\n  ') + '\n  ' + observedSpan);
});

// ---------------------------------------------------------------------------------------------
// `R2-03` — the ABORT'S MESSAGE carries the THREE REQUIRED CONTENTS — WAS RED; GREEN SINCE THE CARRIER
// CHANGE LANDED
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii) SOURCE :: R2-03 — the ABORT\'S MESSAGE carries the THREE REQUIRED CONTENTS: the STATE (distinguishable), the MANIFEST\'S PATH, and what the MANIFEST MUST CONTAIN', () => {
  // DERIVES FROM: `release.md §6.10`'s message-content clause at `:569`, READ WHOLE — *"THE MESSAGE EACH
  // OF THESE FOUR STATES PRODUCES MUST CARRY, AT A MINIMUM — AND THE CARRIER'S OWN PROSE IS ITS OWN —
  // (i) WHICH OF THE FOUR STATES ABORTED, EACH ONE DISTINGUISHABLE FROM EVERY OTHER, SO A READER OF THE
  // MESSAGE CAN TELL THEM APART; (ii) THE MANIFEST'S OWN PATH AS THE CARRIER READ IT, WHICH IS
  // `bindings/js/package.json`, so a reader of the message knows WHICH FILE was read; AND (iii) WHAT THE
  // MANIFEST MUST CONTAIN FOR THE BUILD TO PROCEED — a `version` KEY WHOSE VALUE IS A JSON STRING — so a
  // reader of the message knows WHAT TO FIX. THE PROSE IS THE CARRIER'S AND NO FURTHER WORDING IS
  // REQUIRED HERE: THE REQUIREMENT IS CONTENT"* — read with `package.md §6.1` (`:1176`, `:1182`, each
  // repeating the three contents) and with the ruling's own words, *"generate verbose message"*.
  //
  // **ASSERT THE CONTENT, NOT THE WORDING — AND THIS CELL DOES EXACTLY THAT.** `:569` fixes the CONTENT
  // and says in its own words that *"THE PROSE IS THE CARRIER'S"*; the only spelling fixed anywhere is
  // the DIRECTIVE'S NAME, at item `1`. So no cell below reads a sentence. What is read, per message:
  //   (i)   the state's own identifier (`N1`–`N4`, the clause's names) AND the pairwise distinctness of
  //         the four messages — which is the clause's own operational test of *"DISTINGUISHABLE FROM
  //         EVERY OTHER"*;
  //   (ii)  the manifest's path, either literally or through the binding the carrier read it from;
  //   (iii) the key word `version`, the fact that the value is a `string`, and the `JSON` form named.
  //   **THE LIMITS ARE STATED, NOT HIDDEN**: a carrier whose message text is assembled wholly inside a
  //   helper the reader cannot follow would be refused here, and (i)'s distinctness test is read on the
  //   message the reader CAN see.
  assertReaderIsSane();
  const observedSpan = spanReport();
  const failures = [];

  const sites = abortSitesOf(CARRIER);
  if (sites.length === 0) {
    failures.push('(A) THERE IS NO MESSAGE TO READ: 0 aborting calls stand in the value derivation, so no state produces a message at '
      + 'all. `release.md §6.10` requires the message\'s CONTENT *"EACH OF THESE FOUR STATES PRODUCES"*, so the requirement has no '
      + 'subject in today\'s carrier.');
  } else {
    const messageless = sites.filter((s) => s.message === null);
    if (messageless.length > 0) {
      failures.push(`(B) ${messageless.length} ABORT(S) CARRY NO MESSAGE: at build.rs:${messageless.map((s) => s.line).join(', :')}. `
        + '*"generate verbose message"* is a requirement on the carrier, so an abort with no message satisfies no part of it.');
    }
    const rows = messageContentsOf(CARRIER);
    for (const r of rows) {
      const missing = ['hasPath', 'hasKey', 'hasString', 'hasJson'].filter((k) => !r[k]);
      if (missing.length > 0) {
        failures.push(`(C) THE MESSAGE AT build.rs:${r.line} (state ${r.state}) LACKS REQUIRED CONTENT: [${missing.join(', ')}] `
          + `— content (ii) is the manifest's own path and content (iii) is *"a \`version\` KEY WHOSE VALUE IS A JSON STRING"*. `
          + `message read: \`${r.text}\``);
      }
    }
    const byState = new Map();
    for (const s of sites) if (s.message !== null) for (const n of STATE_NAMES) if (HAS_STATE_NAME[n].test(s.text)) byState.set(n, s.message.trim());
    if (byState.size < 4) {
      failures.push(`(D) THE FOUR STATES ARE NOT EACH IDENTIFIED IN A MESSAGE: ${byState.size} of 4 state identifiers stand beside a `
        + 'message — content (i) is *"WHICH OF THE FOUR STATES ABORTED, EACH ONE DISTINGUISHABLE FROM EVERY OTHER"*.');
    } else if (new Set(byState.values()).size !== byState.size) {
      failures.push('(D) TWO STATES PRODUCE THE SAME MESSAGE: the four messages are not pairwise distinguishable, so a reader of the '
        + 'message CANNOT tell which of the four states aborted — which is the whole of content (i).');
    }
  }

  assert.ok(failures.length === 0,
    'CLAUSE `release.md §6.10`\'s message-content clause at `:569` read with the architect\'s ruling `(a)` (*"generate verbose message"*) and '
    + 'with `docs/specs/storeroom-js/package.md §6.1` (`:1176`, `:1182`). DECLARED: each of the four aborting states\' messages carries WHICH '
    + 'STATE aborted (each distinguishable), THE MANIFEST\'S OWN PATH as the carrier read it, and WHAT THE MANIFEST MUST CONTAIN (a `version` '
    + 'key whose value is a JSON string). PROSE IS NOT ASSERTED — no sentence of the carrier is read. '
    + `OBSERVED: ${failures.length} of this cell's content checks fail.\n  ` + failures.join('\n  ') + '\n  ' + observedSpan);
});

// ---------------------------------------------------------------------------------------------
// `R2-04` — the VALUE LOCATOR does not read ANOTHER KEY'S VALUE — GREEN (and must stay)
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii) SOURCE :: R2-04 — the value LOCATOR reads only ABSENCE-SCOPED text: no OTHER key\'s value is stamped where the slot holds no string', () => {
  // DERIVES FROM: `release.md §6.10` item `2`'s parser-domain clause, whose own words are the measured
  // defect — *"WHERE THAT PIN STILL HOLDS A PREVIOUS VERSION THE ARTEFACT ANSWERS THAT STALE VALUE"* —
  // and its hazard sentence *"THE STAMP THEN CARRIES THAT OCCURRENCE'S VALUE RATHER THAN THE DECLARED
  // FIELD'S"*; read with `PAR-PUB-35`'s **domain** (*"the string `bindings/js/package.json`'s `version`
  // field holds at BUILD TIME"*). **THIS CLAUSE IS NOT SUPERSEDED BY RULING `(a)`: the ruling changed
  // WHAT HAPPENS AT THE FOUR STATES (an abort, not a substitution) and changes nothing about WHICH TEXT
  // the locator may read. A carrier that located the value in whole-file text would stamp a neighbouring
  // key's value even in a carrier that aborts elsewhere.**
  //
  // **WHAT IS ASSERTED.** Every step that LOCATES the value — a colon split and a quote scan — must be
  // fed text the version-key search SCOPED, never text that may be THE WHOLE MANIFEST. The property is
  // stated as a data-flow fact over the carrier's own statements: a binding is WHOLE-TEXT-POSSIBLE if it
  // holds the manifest read, or if it is derived from a whole-text-possible binding WITHOUT any step
  // that answers `None`. A locating step applied to a whole-text-possible binding is the defect.
  assertReaderIsSane();
  const observedSpan = spanReport();
  const violations = locatorViolations(CARRIER);
  assert.ok(violations.length === 0,
    'CLAUSE `release.md §6.10` item `2`\'s parser-domain clause read with `PAR-PUB-35`\'s domain (*"the `version` FIELD"*). DECLARED: the '
    + 'value may not be located in text that may be THE WHOLE MANIFEST — with the key ABSENT the unreachable-absence search returns THE '
    + 'WHOLE FILE, so the colon taken is THE FIRST COLON IN THE FILE and the value stamped is ANOTHER KEY\'S. '
    + `OBSERVED: ${violations.length} locating step(s) read WHOLE-TEXT-POSSIBLE text`
    + `${violations.length === 0 ? '' : `, at build.rs:${violations.map((v) => v.line).join(', :')}`}.\n`
    + `  observed: ${violations.map((v) => `build.rs:${v.line} [receiver \`${v.receiver}\` is WHOLE-TEXT-POSSIBLE] \`${v.text}\``).join('\n            ')}\n`
    + `  ${observedSpan}`);
});

// ---------------------------------------------------------------------------------------------
// `R2-05` — step `(1)`'s SURVIVING HALF: the directive is emitted for the REAL manifest, once
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii) SOURCE :: R2-05 — the directive IS EMITTED FOR THE REAL MANIFEST: ONE emit site, standing UNCONDITIONAL on the carried path', () => {
  // DERIVES FROM: `release.md §6.10`'s five-step locator clause, its own step `(5)` — *"AND THERE IS
  // EXACTLY ONE EMIT SITE: `let version = slot.to_string();` AT `:105` AND THE SINGLE
  // `println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}")` AT `:106` — THE FILE CARRIES ONE
  // `rustc-env` DIRECTIVE AND NO SECOND"* — read with `release.md §6.10` item `1` / `package.md §6.1`
  // item `2` (the carrier EMITS the directive from the manifest it read), with `package.md §6.1` item
  // `3`'s precedence (*"`package.json`'s `version` WINS WHEREVER THE MANIFEST CAN BE READ"*), and with
  // the four-arm clause's own consequence (*"NO DIRECTIVE IS EMITTED ... AT ANY OF THE FOUR"*) — so the
  // emission is asserted ON THE CARRIED PATH, **which is the only path on which the ruling leaves an
  // emission to assert**.
  //
  // **⟶ AND THE TWO LINE FIGURES THAT QUOTE CARRIES ARE STALE AGAINST THE CARRIER, MEASURED HERE AND
  // REPORTED RATHER THAN ABSORBED**: after the carrier change landed, `grep -n 'let version =
  // slot.to_string();' bindings/js/build.rs` → `:154`, and `grep -n
  // 'rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}' bindings/js/build.rs` → `:155`. **THE CELL BELOW
  // ASSERTS NEITHER FIGURE**, and it does not need to: its instrument is the ONE emit site and its brace
  // depth, which is what the clause's own step `(5)` fixes as the operative half of that sentence. **THE
  // STALE FIGURE IS NAMED HERE SO A LATER READER DOES NOT READ THE QUOTE AS A MEASUREMENT OF THIS TREE.**
  //
  // **⟶ THE SUPERSEDED HALF OF THE CELL THIS REPLACES IS NAMED, NOT SILENTLY DROPPED.** The cell that
  // stood here asserted the four-step reading's step `(1)` AT BOTH `(vii)` STATES — *"THE DIRECTIVE IS
  // EMITTED AT THIS STATE"* — which ruling `(a)` SUPERSEDES at that state (*"AT THESE STATES THE
  // DIRECTIVE IS NOT EMITTED AND THE BUILD FAILS"*). So the step-`(1)` assertion is RETARGETED from
  // *"emitted at both states"* to *"emitted on the carried path, and only there"*, which is what
  // survives. **THE ASSERTION IS NOT WEAKENED IN SUBSTANCE**: one emit site, and no conditional between
  // the manifest read and it — the guard that a "writes nothing" fix would still have to pass.
  assertReaderIsSane();

  assert.equal(EMIT_SITES.length, 1,
    `CLAUSE \`release.md §6.10\`'s five-step locator clause, step \`(5)\`. DECLARED: THE FILE CARRIES ONE \`rustc-env\` DIRECTIVE AND NO `
    + `SECOND. OBSERVED: ${EMIT_SITES.length} emit site(s) of \`${EMIT_PREFIX}\` in \`bindings/js/build.rs\`. `
    + `Sites: ${EMIT_SITES.map((s) => `build.rs:${s.line}`).join(', ') || 'none'}`);

  assert.equal(EMIT.depth, depthAt(READ_STMT.start),
    'CLAUSE `release.md §6.10` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2`, read with the four-arm clause\'s consequence '
    + '(*"NO DIRECTIVE IS EMITTED ... AT ANY OF THE FOUR"*, which is the ABORT\'s doing and not a conditional\'s). DECLARED: on the CARRIED '
    + 'path the emission is not guarded. OBSERVED: the emit site stands INSIDE a conditional '
    + `(brace depth ${EMIT.depth} at build.rs:${EMIT.line}) while the manifest read stands at depth ${depthAt(READ_STMT.start)} `
    + `(build.rs:${READ_STMT.line}) — a branch exists that can skip the directive WITHOUT the build failing, which the clause's own words for `
    + 'the four states do not sanction: there the build FAILS and produces no artefact, it does not finish without the directive.');
});

// ---------------------------------------------------------------------------------------------
// `R2-06` — state `(v)`: the EMPTY string is a value that was read — GREEN (and must stay)
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (v) SOURCE :: R2-06 — the EMPTY string is a VALUE THAT WAS READ: no fallback and no emptiness test stands in the derivation', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1`'s outside value `""` → **REFUSED: *"it is a member of the
  // version read's own mismatch set ... the STAMP MUST NOT FALL BACK FROM IT — an empty string is a value
  // that WAS READ, not a manifest that could not be read"***, read with the row's clause `(E)`
  // RE-VERIFICATION (`:454`) — *"WHAT RULING `(a)` RESTORES ... A MANIFEST THAT DECLARES `\"version\": \"\"`
  // STILL STAMPS THE EMPTY STRING AND STILL REACHES THE ARTEFACT, which is item `5`'s own case; a READ
  // THAT PRODUCED NO VALUE AT ALL ABORTS THE BUILD"* — and with `package.md §6.1` item `5` and
  // `release.md §6.10` item `3`.
  //
  // **AND THE RULING DOES NOT MOVE IT, WHICH IS WHY IT IS A CONTROL AND NOT A RETARGET**: the empty case
  // is *"a value THAT WAS READ"*; the four aborting states are *"a read that produced no value at all"*.
  // *"THE TWO ARE DISTINGUISHABLE AGAIN, AND THEY ARE DISTINGUISHABLE IN EXACTLY ONE SENSE — ONE OF THEM
  // FAILS."* A carrier that ABORTS ON A LAWFUL EMPTY VALUE would collapse the very distinction the
  // clause set rests on.
  //
  // **WHAT IS ASSERTED.** No EMPTINESS TEST stands in the value derivation — no `is_empty()`, no
  // `.len() == 0`, no `== ""` / `!= ""` — because that is the test a fallback FROM A PRESENT VALUE would
  // be hung on, and under the ruling it is also the test that would turn the lawful empty string into an
  // abort. **THE LIMIT IS STATED**: a carrier that compared the extracted value against an empty string
  // by some other spelling would not be seen by this guard.
  assertReaderIsSane();

  const hit = EMPTINESS_TEST.exec(SPAN);
  assert.ok(hit === null,
    'CLAUSE `parameter-semantics.md §5.1` (outside value `""`) read with its clause `(E)` re-verification at `:454`, `package.md §6.1` item `5` '
    + 'and `release.md §6.10` item `3`. DECLARED: where the manifest reads `""` the stamped value IS the empty string and NO fallback runs — '
    + 'the empty string is a value that WAS read, and it is NOT one of the four aborting states. OBSERVED: the value derivation tests the '
    + `value for EMPTINESS${hit === null ? '' : ` at build.rs:${lineOf(SPAN_START + hit.index)} (\`${snippet(hit[0], 60)}\`)`}, which is the `
    + 'test a fallback from a PRESENT value would be hung on — and the test that would ABORT the lawful empty case the ruling leaves stamping.\n  '
    + spanReport());
});

// ---------------------------------------------------------------------------------------------
// `R2-07` — THE DRIVEN CONTROL on state `(i)`: the value is the MANIFEST's, character for character
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (i) DRIVEN :: R2-07 — THE CONTROL: the real manifest still stamps `0.1.1` character for character, through the artefact\'s OWN `version()`', () => {
  // DERIVES FROM: `parameter-semantics.md §5.1` — the row's **observable**, *"the artefact's own
  // `version()`, returned through the facade"*, and its **domain**, *"the string
  // `bindings/js/package.json`'s `version` field holds at BUILD TIME — character for character"* — read
  // with `contract.md §5.0a` (`P-PUB-9`: *"every released native artefact's `version()` answers the main
  // package manifest's `version` CHARACTER FOR CHARACTER"*), with `package.md §6.1` item `1`, and with
  // the read-mechanism clause's states `(i)`/`(ii)`: *"`Some(that value)`, and NO fallback runs ... (ii)
  // THE DIRECTIVE WAS NOT EMITTED AT ALL — `None`, AND THIS IS THE ONLY BRANCH WHERE THE CRATE'S VERSION
  // IS TAKEN."* **STATE `(i)` IS NOT A SOURCE-LEVEL REFUSAL, so `A95`'s prohibition does not reach this
  // cell** — it is the DRIVEN happy-path control: *"a red set that cannot show the correct path intact is
  // a red set that a wrong fix would satisfy."*
  //
  // **IT DRIVES NO RELEASE LEG AND BUILDS NOTHING**: it loads the host target's own build product
  // (`distribution.md §3.1`: *"NO BINARY IS EVER COMMITTED"*, so the file is a gitignored build product)
  // and calls the declared observable. **AND IT RE-RUNS THE `"version"` COUNT THE CLAUSES THEMSELVES
  // PRINT — CORRECTED TO THE MEASURED FIGURE**: the count is `1`, measured with `grep -o '"version"
  // bindings/js/package.json | wc -l` → `1` (and `grep -c` → `1`, at line `3`). A prior pass recorded
  // `6` BY COUNTING A DIFFERENT TOKEN and the stale premise is corrected here, beside the instrument.
  const measured = (readFileSync(MANIFEST_PATH, 'utf8').match(/"version"/g) ?? []).length;
  assert.equal(measured, 1,
    'CLAUSE `release.md §6.10` item `2`\'s parser-domain clause, whose own instrument this control re-runs: *"THE BYTE-SEQUENCE `"version"` '
    + 'OCCURS EXACTLY ONCE IN THIS MANIFEST — `grep -c \'"version"\' bindings/js/package.json` returns `1`, at line `3`"*. THE MEASURED FIGURE '
    + `IS \`1\` (\`grep -o '"version"' bindings/js/package.json | wc -l\` → \`1\`; the count of \`6\` one pass recorded is the number of `
    + 'PLATFORM MANIFESTS, not of occurrences in this file, and is corrected here). OBSERVED: '
    + `${measured} occurrence(s) — the correct path this control certifies is then not the path the clause declared, so the control reports the `
    + 'divergence instead of certifying a shape the clause does not carry.');

  if (!existsSync(BUILT_ARTEFACT)) {
    console.log('[version-stamp-r2] SKIP R2-07 the control — no artefact at ' + BUILT_ARTEFACT
      + ': the tracked tree carries no binary (`distribution.md §3.1`) and this pass runs no `cargo`. '
      + 'REBUILD TO MAKE THIS CONTROL ACTIVE.');
    return;
  }
  const require_ = createRequire(import.meta.url);
  const native = require_(BUILT_ARTEFACT);
  assert.equal(typeof native.version, 'function',
    '`contract.md §5.0a`: a `version` that is not callable at all is a member of the failure list, so the artefact\'s own read must be '
    + 'callable. OBSERVED: the loaded artefact exposes no callable `version`.');
  const answer = native.version();
  assert.equal(typeof answer, 'string',
    '`parameter-semantics.md §5.1` (outside value: *"a stamped value that is not a `string` at the artefact\'s own export"* → REFUSED) / '
    + `\`contract.md §5.0a\`. DECLARED: a semantic version string, the exact string the manifest carries. OBSERVED: `
    + `\`typeof version() === '${typeof answer}'\` (${JSON.stringify(answer)}).`);
  assert.equal(answer, MANIFEST_VERSION,
    'CLAUSE `parameter-semantics.md §5.1` domain + `contract.md §5.0a`. DECLARED: the artefact\'s `version()` answers the package manifest\'s '
    + `\`version\` CHARACTER FOR CHARACTER — \`0.1.1\` today. OBSERVED: artefact=${JSON.stringify(answer)} `
    + `(${[...answer].length} characters), manifest=${JSON.stringify(MANIFEST_VERSION)} (${[...MANIFEST_VERSION].length} characters).`);
  assert.notEqual(answer, CRATE_VERSION,
    'CLAUSE `package.md §6.1` read-mechanism clause state `(ii)` read with `release.md §6.10` item `2`: the crate\'s `Cargo.toml` version is '
    + 'the `None` arm\'s value and is NOT the stamped value wherever the manifest could be read. OBSERVED: the artefact answers the crate\'s '
    + `own version (${JSON.stringify(CRATE_VERSION)}), which is \`DEF-19\` reproduced — a fallback-sourced artefact.`);
  console.log(`[version-stamp-r2] R2-07 DRIVEN (the control): artefact version()=${JSON.stringify(answer)} `
    + `(${[...answer].length} chars), manifest=${JSON.stringify(MANIFEST_VERSION)} (${[...MANIFEST_VERSION].length} chars), `
    + `crate=${JSON.stringify(CRATE_VERSION)} — the correct path is intact. And the measured "version" occurrence count is ${measured} `
    + '(the corrected figure; the count of 6 was a different token).');
});

// ---------------------------------------------------------------------------------------------
// `R2-08` — the provenance of the emitted value: the MANIFEST, never the crate version — GREEN
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 SOURCE :: R2-08 — the emitted value\'s provenance reaches the MANIFEST read: no crate version and no ambient environment path leads to the directive', () => {
  // DERIVES FROM: `release.md §6.10` item `2` (the absent case is *"WHERE THE MANIFEST CANNOT BE READ AT
  // BUILD TIME"*, and the fallback *"REPRODUCES `DEF-19` EXACTLY"*), `package.md §6.1` item `3`'s
  // precedence (*"`package.json`'s `version` WINS WHEREVER THE MANIFEST CAN BE READ"*) and item `2`'s
  // refusal (*"THE BUILD SCRIPT CONSULTS NO AMBIENT ENVIRONMENT VARIABLE AT ALL"*), and
  // `contract.md §5.0a`'s first failure member (*"a released artefact whose `version()` answers the
  // crate's `Cargo.toml` version"*) with its ambient-read member's own declared source-level falsifier.
  // **THE FOUR-STEP READING'S STEP `(2)` IS SUPERSEDED AT THE `(vii)` STATES** (*"STEPS `(3)` AND `(4)`
  // ARE THEREFORE UNREACHED AT THESE STATES"*, and `(2)`'s own premise belongs to the superseded
  // reading), so this cell asserts the surviving control — THE CARRIED PATH's provenance — and asserts
  // it of the real manifest, where the clause's precedence is unmoved: *"a readable `\"\"` ... still
  // reaches the artefact"* and the crate version is taken *"IN ONE CASE ONLY, THE MANIFEST THAT CANNOT
  // BE READ"*.
  //
  // **WHAT IS ASSERTED.** The binding the directive interpolates has a provenance that reaches no
  // `CARGO_PKG_VERSION` / `Cargo.toml` row; the carrier consults no ambient variable under the
  // directive's own name; and the provenance does reach the manifest read built through
  // `CARGO_MANIFEST_DIR` (`package.md §6.1` item `7`).
  assertReaderIsSane();

  const chain = provenanceOf(EMIT_BINDING);
  const fallbackRows = chain.filter((r) => /CARGO_PKG_VERSION|Cargo\.toml/.test(r.rhs));
  assert.equal(fallbackRows.length, 0,
    'CLAUSE `release.md §6.10` item `2` read with `package.md §6.1` item `3`. DECLARED: the crate\'s `Cargo.toml` version is taken in ONE '
    + 'case only — the manifest that cannot be read — and is NOT the value the directive carries on the carried path. OBSERVED: the emit '
    + `interpolates \`${EMIT_BINDING}\`, whose provenance reaches \`CARGO_PKG_VERSION\`/\`Cargo.toml\` at build.rs:`
    + `${fallbackRows.map((r) => r.line).join(', :')}.\n  chain: ` + chain.map((r) => `build.rs:${r.line} [${r.name}]`).join(' ← '));

  assert.ok(chain.some((r) => /read_to_string\s*\(/.test(r.rhs)),
    'CLAUSE `release.md §2.4` item `1` / `docs/specs/storeroom-js/package.md §6.1` item `2`. DECLARED: the directive\'s value is DERIVED '
    + 'FROM THE MANIFEST THE CARRIER READS — *"`bindings/js/build.rs` READS THE MANIFEST ITSELF"*. OBSERVED: the provenance of the emitted '
    + `binding reaches NO \`read_to_string\` statement, so the value printed is not derived from the manifest read.\n  chain: `
    + chain.map((r) => `build.rs:${r.line} [${r.name}]`).join(' ← '));

  assert.equal(ambientReadOfDirective(CARRIER), false,
    'CLAUSE `package.md §6.1` item `2` / `release.md §2.4` item `1` and `contract.md §5.0a`\'s ambient-read member (whose falsifier is '
    + 'declared as a source-level check). DECLARED: the value the directive carries is the one THIS BUILD read from the manifest — the '
    + 'directive is a TRANSPORT and never a source set from outside the build. OBSERVED: the carrier CONSULTS THE AMBIENT ENVIRONMENT for the '
    + `directive's own name (\`${DIRECTIVE}\`), so the stamped value could be supplied from outside this build — the refused workflow-env form.`);
});

// ---------------------------------------------------------------------------------------------
// `R2-09` — the manifest that CANNOT BE READ: its own state, carried so it is not confused with the four
// ---------------------------------------------------------------------------------------------
test('PAR-PUB-35 (vii-) SOURCE :: R2-09 — THE MANIFEST THAT CANNOT BE READ aborts AT ITS OWN SITE: its own state, distinct from the four arms', () => {
  // DERIVES FROM: `docs/specs/storeroom-js/package.md §6.1` limb `(A)` — DELIBERATELY NOT RE-CUT, and
  // said to be so at `:1201`: *"AND LIMB `(A)` IS DELIBERATELY NOT RE-CUT ... its anchor and its
  // mechanism both still stand at `:70`–`:71`"*, with `:1202` — *"`(A)` is a panic at the manifest read
  // and `(B)` is an abort at the slot; BOTH ARE THE BUILD'S OWN FAILURE"* — and with `:1203`'s own words:
  // *"(A) A MANIFEST THAT CANNOT BE READ PANICS AT `bindings/js/build.rs` `:70`–`:71`
  // (`fs::read_to_string(...).expect(...)`)"*; read with `release.md §6.10`'s delimitation clause at
  // `:571` — *"AND THE ONE ABORT THE CLAUSE ABOVE ALREADY NAMES IS NOT ONE OF THE FOUR: the manifest read
  // at `:70`–`:71` still aborts where the file cannot be read, and that state is neither `(N1)` nor any
  // of the other three"* — and with `parameter-semantics.md §5.1`'s reconciliation clause (`:482`,
  // `:483`): *"A MISSING OR UNREADABLE MANIFEST PANICS AND THAT STATE NEVER REACHES THE FALLBACK
  // EITHER ... SO THE FALLBACK'S SUBJECT IS NARROWER"*.
  //
  // **IS IT DECLARED CLEARLY ENOUGH FOR A CELL? — YES, AND THE TEST OF "CLEARLY ENOUGH" IS WHETHER THE
  // CELL CAN BE STATED WITHOUT INVENTING A DETAIL.** The clause fixes: the SITE (the manifest read),
  // the MECHANISM (`fs::read_to_string(...)` followed by a panicking call), the LAYER (the carrier's own
  // bytes — *"AND NO CELL MAY CLAIM TO FAIL EITHER LIMB BY DRIVING A RUN: the observable is the
  // CARRIER'S OWN BYTES"*, `:1203`), and the STATE'S DISTINCTNESS from the four (`:571`). **WHAT IT DOES
  // NOT FIX IS ANY PROSE** — and no cell below asserts any. What it does NOT fix is also why the
  // message-content requirement at `release.md §6.10` `:569` is NOT read onto this state: `:569` is
  // *"THE MESSAGE EACH OF THESE FOUR STATES PRODUCES"*, and this is not one of the four.
  //
  // **IT HOLDS TODAY AND MUST KEEP HOLDING.** The read aborts; what the ruling does at the four arms
  // does not move this limb, and a fix that replaced the four arms' aborts while removing this one would
  // falsify this cell.
  assertReaderIsSane();

  assert.ok(READ_STMT !== null && /read_to_string\s*\(/.test(READ_STMT.rhs),
    'CLAUSE `docs/specs/storeroom-js/package.md §6.1` limb `(A)` (`:1201`, `:1203`) read with `release.md §6.10`\'s `:571` delimitation. '
    + 'DECLARED: the carrier reads the manifest itself with `fs::read_to_string(...)`. OBSERVED: no read statement carrying '
    + '`read_to_string` stands in the carrier.');

  const readText = READ_STMT.text;
  assert.ok(/\.\s*(?:expect|unwrap)\s*\(/.test(readText),
    'CLAUSE `package.md §6.1` limb `(A)` — *"(A) A MANIFEST THAT CANNOT BE READ PANICS AT `bindings/js/build.rs` `:70`–`:71` '
    + '(`fs::read_to_string(...).expect(...)`)"* — read with `release.md §6.10`\'s `:571`. DECLARED: the manifest read ABORTS AT ITS OWN SITE '
    + 'where the file cannot be read, and that state is NEITHER `(N1)` NOR ANY OF THE OTHER THREE. OBSERVED: the read statement carries no '
    + `abort, so the unreadable state would fall through to a value or to a later state rather than aborting where the clause declares. `
    + `read statement: \`${snippet(readText, 240)}\``);

  const readSites = abortSitesOf(CARRIER);
  assert.ok(readSites.every((s) => s.receiver === null),
    'and the read\'s own abort is EXCLUDED from the four-state span BY CONSTRUCTION, so it can never be counted among `(N1)`–`(N4)`: '
    + 'every abort this reader finds inside the span is a MACRO abort with no receiver, and the read\'s own panic — '
    + '`fs::read_to_string(..).expect(..)`, which HAS a receiver — lies outside the span. '
    + `(${CARRIER.READ_ABORT_NOTE}).`);
});

// =============================================================================================
// `R2-10` — THE INSTRUMENTS' OWN TEETH, AND THE REAL-CARRIER ADMISSION VECTOR
// =============================================================================================
/** **A SYNTHETIC CARRIER THAT CARRIES THE CLAUSE'S OWN ANSWER UNDER RULING `(a)`** — the shape the four
 *  states and `:569`'s content requirement spell, written the way a build script would write it: it
 *  reads the manifest itself, identifies the slot by its own key, HOLDS THE ABSENCE AS A STATE, and AT
 *  EACH OF THE FOUR STATES **ABORTS WITH ITS OWN MESSAGE CARRYING WHICH STATE, THE MANIFEST'S PATH, AND
 *  WHAT THE MANIFEST MUST CONTAIN**. Its emit site stands UNGUARDED on the carried path.
 *  **THE PROSE IS THIS TEMPLATE'S AND IS ASSERTED NOWHERE**: `:569` fixes the CONTENT and says *"THE
 *  PROSE IS THE CARRIER'S"*, so no cell of this set reads a sentence of it. */
function syntheticCarrier({ silenceArms = false, guardEmit = false, crateVersion = false, totalSearch = false, emptinessTest = false, shapeConsulted = true } = {}) {
  // **THE FOUR ARMS' OWN BODIES, ONE PER STATE.** The aborting shape is a `panic!` in the SPAN — no
  // `.expect` from a helper — and the silent shape is a SINGLE-LINE `X => ""` arm, which is how the
  // superseded reading's own arm reads at the carrier's bytes. **THE ARROW AND ITS BODY ARE ON THE SAME
  // LINE IN THE SILENT FORM ON PURPOSE**: a guard reads an arm as the text after its arrow, so a
  // generator that put `""` on its own line would produce a mutation no arm-reading guard could see.
  const arm = (indent, pattern, state) => (silenceArms
    ? [`${indent}${pattern} => "",`]
    : [`${indent}${pattern} => {`,
       `${indent}    panic!(`,
       `${indent}        "the stamp's read reached state ${state}: the manifest {MANIFEST} must declare a version "`,
       `${indent}        + "key whose value is a JSON string, and this one does not"`,
       `${indent}    );`,
       `${indent}},`]);
  const emit = '    println!("cargo:rustc-env=STOREROOM_JS_PACKAGE_VERSION={version}");';
  const search = totalSearch
    ? ['    let tail = declared.rsplit("\\"version\\"").next().expect("the manifest declares a `version` field");',
       "    let rest = tail.split_once(':').expect(\"the `version` field is a key with a value\").1;",
       '    let version = rest.trim_start();']
    : ['    let version = match declared.rsplit_once("\\"version\\"") {',
       '        Some((_, rest)) => match rest.split_once(\':\') {',
       shapeConsulted
         ? '            Some((_, value)) => match value.trim_start().strip_prefix(\'"\') {'
         : '            Some((_, value)) => match value.find(\'"\') {',
       shapeConsulted
         ? ['                Some(body) => match body.find(\'"\') {',
            '                    Some(end) => &body[..end],',
            ...arm('                    ', 'None', 'N4'),
            '                },',
            ...arm('                ', 'None', 'N3'),
            '            },']
         : ['                Some(body) => &body[..end],',
            ...arm('                ', 'None', 'N3'),
            '            },'],
       '            None => match () {',
       ...arm('                ', '()', 'N2'),
       '            },',
       '        },',
       '        None => match () {',
       ...arm('            ', '()', 'N1'),
       '        },',
       '    };'];
  const fallback = crateVersion ? ['    let version = env!("CARGO_PKG_VERSION");'] : [];
  const emptiness = emptinessTest ? ['    let version = if version.is_empty() { String::new() } else { version };'] : [];
  const emitBlock = guardEmit ? ['    if declared.len() > 0 {', `    ${emit}`, '    }'] : [emit];
  return [
    'use std::env; use std::fs;',
    'fn main() {',
    '    let manifest = env::var("CARGO_MANIFEST_DIR").expect("set by cargo for every build script");',
    '    let declared = fs::read_to_string(format!("{manifest}/package.json"))',
    '        .expect("bindings/js/package.json is the crate\'s sibling manifest and is readable");',
    ...fallback,
    ...search,
    ...emptiness,
    ...emitBlock,
    '}',
    '',
  ].flat(Infinity).join('\n');
}

test('THE R2 INSTRUMENTS\' OWN TEETH :: R2-10 — a LAWFUL carrier is ADMITTED by every guard, each guard FIRES on its mutation, AND THE SAME VECTOR IS RUN OVER THE REAL `bindings/js/build.rs`', () => {
  // **WHY THIS CELL EXISTS, IN `A95`'S OWN TERMS.** `A95` allows a SOURCE-LEVEL refusal to stand on the
  // source rather than on a run, PROVIDED it names that layer — and a guard that cannot fail is worth
  // nothing as firability. **AND THIS CELL CLOSES THE GAP THE ADVERSARIAL PASS FOUND**: the previous set
  // put ONLY A SYNTHETIC through its admission vector — `8/8` admissions ran on a synthetic — and the
  // SHIPPED BYTES WERE NEVER TESTED AGAINST THEM, which is exactly where a contradiction hid. **SO THE
  // SAME VECTOR RUNS OVER THE REAL CARRIER HERE, AND ITS VERDICT IS PRINTED GUARD BY GUARD.**
  //
  // **EACH MUTATION IS A CARRIER OF THIS CELL'S OWN MAKING, AND NONE IS THE REAL CARRIER**: a battery
  // that took the real carrier as its red mutation would turn RED ITSELF the moment the correction lands.
  // **THE CLAUSE-CURRENCY CONTROL RUNS HERE, ONCE, BESIDE THE INSTRUMENTS** — every cell of this file
  // derives from one of the sentences it reads, so a clause that has MOVED is reported before any
  // instrument's verdict is trusted.
  assertClauseSetIsCurrent();

  const REAL = readFileSync(BUILD_RS, 'utf8');

  const LAWFUL = syntheticCarrier({});
  const lawful = readCarrier(LAWFUL);
  assertReaderIsSaneOf(lawful); // the synthetic is read by the SAME reader, or nothing below means anything

  const verdictsOf = (c) => ADMISSION.map(([id, guard]) => ({ id, admitted: (() => { try { return Boolean(guard(c)); } catch (e) { return `THREW: ${e.message}`; } })() }));

  // (a) THE SYNTHETIC THAT CARRIES THE CLAUSE'S ANSWER MUST BE ADMITTED BY EVERY GUARD.
  const syntheticVerdicts = verdictsOf(lawful);
  const syntheticRefused = syntheticVerdicts.filter((v) => v.admitted !== true);

  // (b) EACH GUARD MUST FIRE ON ITS OWN ONE-RESPECT MUTATION.
  const mutations = [
    ['M1 → ADM-3/5/6/7', syntheticCarrier({ silenceArms: true }),
      (c) => silentArmDefaultsOf(c).length > 0, 'the arms ANSWER the empty string instead of aborting — the shape the shipped carrier carried UNTIL THE CHANGE LANDED (build.rs `:92`, `:94`, `:96`, `:98`, where the four arms now `panic!` at `:100`, `:113`, `:124`, `:135`) and the shape the ruling forbids'],
    ['M2 → ADM-8', syntheticCarrier({ guardEmit: true }),
      (c) => emitIsGuarded(c), 'the directive stands INSIDE a conditional on the carried path'],
    ['M3 → ADM-9', REAL.slice(0, EMIT.start)
      + `    let ${EMIT_BINDING} = env!("CARGO_PKG_VERSION").to_string();\n` + REAL.slice(EMIT.start),
      (c) => fallbackRowsInProvenance(c).length > 0, 'the stamped value is taken from the crate version — the `None` arm'],
    ['M4 → ADM-11', syntheticCarrier({ emptinessTest: true }),
      (c) => EMPTINESS_TEST.test(c.SPAN), 'a fallback from an EMPTY string — the widening `(b)` the row refused, and now also the test that would abort the lawful empty case'],
    ['M5 → ADM-10', syntheticCarrier({ totalSearch: true }),
      (c) => locatorViolations(c).length > 0, 'a value LOCATOR reading WHOLE-TEXT-POSSIBLE text — made whole-text-possible by the TOTAL search'],
    ['M6 → ADM-1', syntheticCarrier({ totalSearch: true }),
      (c) => TOTAL_SEARCH.test(c.SPAN), 'the TOTAL rightmost-occurrence search — the shape that cannot answer absence'],
    ['M7 → ADM-9', REAL.slice(0, EMIT.start)
      + `    let ${EMIT_BINDING} = env::var("${DIRECTIVE}").expect("set outside the build");\n` + REAL.slice(EMIT.start),
      (c) => ambientReadOfDirective(c), 'the directive\'s value taken from the AMBIENT environment — the refused workflow-env form'],
  ];
  const fired = [];
  const unfired = [];
  for (const [id, source, fires, what] of mutations) {
    let carried;
    try { carried = readCarrier(source); } catch (e) { unfired.push(`${id}: the reader threw on the mutation (${e.message})`); continue; }
    if (fires(carried)) fired.push(id.split(' → ')[1]);
    else unfired.push(`${id} DID NOT FIRE ON ITS OWN MUTATION: ${what}. A guard that cannot fail is not firability.`);
  }

  // (c) **THE REAL-CARRIER ADMISSION VECTOR — THE GAP THIS PASS CLOSES.** Its verdict is REPORTED, never
  // silently dropped, and it is NOT turned into a failure of this cell: the real carrier is the SUBJECT
  // OF THE RED SET, and a cell that failed on it would turn RED the moment the correction lands.
  const realVerdicts = verdictsOf(CARRIER);
  const realRefused = realVerdicts.filter((v) => v.admitted !== true);
  console.log('[version-stamp-r2] R2-10 THE ADMISSION VECTOR OVER THE REAL `bindings/js/build.rs` — '
    + `${realVerdicts.length - realRefused.length}/${realVerdicts.length} guards ADMIT the shipped bytes, `
    + `${realRefused.length}/${realVerdicts.length} REFUSE them (${realRefused.map((v) => v.id).join(', ') || 'none'}).`);
  for (const v of realVerdicts) console.log(`[version-stamp-r2]   ${v.admitted === true ? 'ADMITTED' : 'REFUSED '} ${v.id}`);
  console.log(`[version-stamp-r2] R2-10 SYNTHETIC: ${syntheticVerdicts.length - syntheticRefused.length}/${syntheticVerdicts.length} guards ADMIT the clause-shaped carrier; `
    + `${fired.length}/${mutations.length} guards FIRE on their mutation (${fired.join(', ')}).`);

  const failed = [];
  for (const v of syntheticRefused) failed.push(`THE LAWFUL CARRIER IS REFUSED BY ${v.id}: a guard that refuses the clause's own answer would block the correction it exists to serve.`);
  failed.push(...unfired);

  // (d) **THE TEETH ARE CONFIRMED UNDER THE NEW CARRIER RATHER THAN INFERRED FROM THE GREEN — WHICH IS THE
  // ONE QUESTION `11/11` CANNOT ANSWER BY ITSELF**: a guard that admits everything after a correction is a
  // guard that has stopped testing, and if `11/11` stood because the instrument loosened the whole of this
  // cell would be worth less than the green it prints. **SO THE SAME VECTOR IS RUN OVER A WRONG CARRIER CUT
  // FROM THE REAL BYTES' OWN FOUR ARMS** — each `panic!` restored to the superseded `=> ""` answer — **AND
  // IT MUST REFUSE IT.** The wrong carrier is a mutation of this cell's own making and never the real
  // carrier, so this cell cannot turn RED on a correction landing; and the number of applied substitutions
  // is COUNTED, so a mutation that quietly failed to apply cannot certify the guard by a vacuous pass.
  // **MEASURED, AND RECORDED HERE BECAUSE IT IS THE FIGURE THE GREEN RESTS ON**: the pre-landing carrier
  // read out of history and this wrong carrier BOTH return `7/11 ADMIT, 4/11 REFUSE — ADM-3, ADM-4, ADM-5,
  // ADM-7`, which is the same four guards and the same verdicts, so the `11/11` over the shipped bytes is
  // the CARRIER'S IMPROVEMENT and not a loosened instrument.
  const ARM_ABORT = /None => panic!\([\s\S]*?\n\s*\),/g;
  const wrongCarrier = REAL.replace(ARM_ABORT, 'None => "",');
  const substitutions = (wrongCarrier.match(/None => "",/g) ?? []).length;
  if (substitutions !== 4) {
    failed.push(`(d) THE WRONG-CARRIER MUTATION DID NOT APPLY: ${substitutions} of the four arms were restored to the superseded `
      + 'answer, so the refusal asserted below would certify nothing.');
  } else {
    const wrong = readCarrier(wrongCarrier);
    const wrongVerdicts = verdictsOf(wrong);
    const wrongRefused = wrongVerdicts.filter((v) => v.admitted !== true);
    console.log('[version-stamp-r2] R2-10 (d) A WRONG CARRIER CUT FROM THE REAL BYTES\' OWN FOUR ARMS — '
      + `${wrongVerdicts.length - wrongRefused.length}/${wrongVerdicts.length} guards ADMIT it, ${wrongRefused.length}/${wrongVerdicts.length} REFUSE it `
      + `(${wrongRefused.map((v) => v.id).join(', ') || 'none'}).`);
    if (!wrongRefused.some((v) => v.id.startsWith('ADM-3'))) {
      failed.push('(d) THE ARMS-AS-DEFAULTS GUARD ADMITS A CARRIER WHOSE FOUR ARMS ANSWER `""` — the shape `parameter-semantics.md §5.1` `:468` '
        + 'recorded and `release.md §6.10`\'s four-arm clause forbids. A guard that no longer refuses it has stopped testing, and `11/11` over the '
        + 'shipped bytes then certifies nothing. **THIS OUTRANKS ANY GREEN THIS CELL PRINTS.**');
    }
    const wrongSilent = silentArmDefaultsOf(wrong);
    if (wrongSilent.length !== 4) {
      failed.push(`(d) THE WRONG CARRIER DOES NOT CARRY THE SUPERSEDED SHAPE: ${wrongSilent.length} silent arm(s) read where 4 were written, so the `
        + 'refusal above cannot be attributed to the arms-as-defaults guard.');
    }
  }

  // **⟶ THE DISCHARGED ASSERTION, RETIRED HERE AND NOT ERASED — ITS AS-FILED WORDS ARE KEPT FIRST.**
  //
  // WHAT THIS CELL ASSERTED UNTIL THIS PASS, VERBATIM AND WHOLE, SO THAT NO READER HAS TO RECONSTRUCT IT:
  //     const silentArms = silentArmDefaultsOf(CARRIER);
  //     assert.ok(silentArms.length > 0,
  //       'THE CLAUSE\'S LIVE FINDING, ASSERTED AND NOT ONLY PRINTED. `parameter-semantics.md §5.1`
  //        `:468`: *"A SHIPPED CARRIER THAT EMITS `""` FOR A NON-STRING `version` IS STILL A FINDING
  //        AGAINST THIS ROW ... AND IT IS A FINDING UNTIL THE CARRIER\'S CHANGE LANDS. THE CARRIER THAT
  //        STANDS IN THE TREE AT THIS CLAUSE\'S DATE STILL TAKES THE EMPTY-STRING BRANCH — the four arms
  //        and the one carried path answer `""` ... — so the finding is LIVE AND NOT HISTORICAL."* The
  //        arms-as-defaults guard must REFUSE the shipped bytes while the ruling is unlanded. **IF THIS
  //        ASSERTION EVER FAILS, THE CARRIER CHANGE HAS LANDED** — and every cell of this file derived
  //        from the four-arm clause must be re-read, because the finding it recorded is then discharged.
  //        OBSERVED: ${silentArms.length} silent arm(s) in the value derivation.');
  // **AND THAT ASSERTION PASSED AT THAT DATE AND IS NOW FALSE OF THIS TREE: THE VERY EXIT CONDITION IT
  // NAMED HAS HAPPENED.** The clause it rests on bounds its own liveness in its own words — *"AND IT IS A
  // FINDING UNTIL THE CARRIER'S CHANGE LANDS"* — and scopes it to its own date: *"THE CARRIER THAT STANDS
  // IN THE TREE AT THIS CLAUSE'S DATE STILL TAKES THE EMPTY-STRING BRANCH"*. **THE CARRIER CHANGE HAS
  // LANDED**, so the finding is discharged BY THE CLAUSE'S OWN TERM, by a change outside this file's wall.
  // **SO THIS CELL IS RE-POINTED FROM THE FINDING'S LIVENESS TO ITS DISCHARGE, WHICH IS A POSITIVE
  // ASSERTION OF WHAT IS NOW TRUE AND NOT A DELETION.** `RCA-8(d)`: the as-filed assertion is a record; a
  // claim the world has changed is SUPERSEDED, not erased. **AND THE REPLACEMENT KEEPS TEETH**: if any arm
  // is ever restored to a literal/default answer — the shape `release.md §6.10`'s four-arm clause forbids
  // and the `:468` finding named — this cell fails, and `(d)` below shows the guard that carries it still
  // REFUSING that shape when it is present in a carrier cut from these very bytes.
  const silentArms = silentArmDefaultsOf(CARRIER);
  assert.equal(silentArms.length, 0,
    'THE CLAUSE\'S FINDING, NOW DISCHARGED AND ASSERTED AS DISCHARGED — where this cell until this pass asserted its LIVENESS. '
    + '`parameter-semantics.md §5.1` `:468` recorded the finding as *"LIVE AND NOT HISTORICAL"* AT ITS OWN DATE and bounded it with its own term, '
    + '*"AND IT IS A FINDING UNTIL THE CARRIER\'S CHANGE LANDS"*, because *"THE CARRIER THAT STANDS IN THE TREE AT THIS CLAUSE\'S DATE STILL TAKES THE '
    + 'EMPTY-STRING BRANCH — the four arms and the one carried path answer `""`"*. **THE CARRIER CHANGE HAS LANDED** '
    + '(`grep -n \'None => panic!(\' bindings/js/build.rs` → `:100`, `:113`, `:124`, `:135`), so NO ARM ANSWERS A SILENT DEFAULT AND NO ARM EMITS `""` '
    + 'FOR A NON-STRING `version` — the shape `release.md §6.10`\'s four-arm clause declares must ABORT (*"EACH PRODUCES ITS OWN ABORT RATHER THAN AN '
    + 'ANSWER"*). **THE ASSERTION THAT STOOD HERE READ `silentArms.length > 0` AND ANNOUNCED ITS OWN EXIT CONDITION; ITS WORDS ARE KEPT ABOVE BESIDE '
    + `THIS ONE (\`RCA-8(d)\`). OBSERVED: ${silentArms.length} silent arm(s) in the value derivation — the discharge, asserted.`);

  assert.ok(failed.length === 0,
    'THE R2 INSTRUMENTS\' OWN TEETH — `A95` read with `release.md §6.10`\'s four-arm clause and `:569`\'s message-content clause. Declared: every '
    + 'guard above ADMITS a carrier that carries the clause\'s own answer, FIRES on the mutation it exists to catch, AND REFUSES a WRONG carrier cut '
    + 'from the real bytes\' own four arms.\n  '
    + `OBSERVED: ${failed.length} of ${syntheticVerdicts.length + mutations.length + 2} instrument checks fail.\n  ` + failed.join('\n  '));
});
