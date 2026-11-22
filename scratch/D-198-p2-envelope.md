# Envelope — `P-2` · creation treated as a whole-store write · the L4 landing pass · `2026-11-17` · `5e3a01f`

**THE UNIT, IN ONE LINE.** `D-191`'s four steps are the shipped order (`D-197` item 1), so this pass implements
**two repairs and their cells** — `D-198` item 1's ONE FILE RULE and `D-198` item 2's WALK'S ABSENCE CLASSES — and
nothing else. **THE PATCH IS `scratch/D-198-p2-one-file-rule-and-the-walks-absence-classes.patch`** (`git apply`-able
against `HEAD` `5e3a01f`, verified in a clean `git worktree` at that commit: `git apply --check` OK, `git apply`
clean, and all eleven files then `cmp`-identical to this tree).

**THE TREE THIS PASS LEAVES CARRIES THE PATCH ALREADY APPLIED** — the runs below were taken on it, and that is the
honest reading of *"the runs taken once after"*. A landing pass that wants to apply the patch itself should run
`git checkout -- . && rm tests/e2e/creation-as-write.test.mjs tests/e2e/creation-as-write-support.mjs` first.

---

## 1 · THE FORM GIVEN TO THE GUARD'S CALL, AND WHY IT CANNOT BE BYPASSED

**ONE FRAME, ONE `try`, ONE RE-THROW.** `bindings/js/src/entry/instance.mjs:332`–`:343`: `storeCreate` is now a
nine-line frame that holds the guard's slot, calls `constructStore(cfg, fileGuardSlot)` and, **on a throwable
alone**, calls `fileGuardSlot.guard.undo()` and re-throws the very value it caught. The construction's body moved
whole into `constructStore` (`:351`) **unmoved in order and in bytes**, and the guard is still opened where it always
was — before `addon_.storeCreate(encoded)`, the construction's one filesystem act — publishing into the slot at
`:440`–`:446`. The `undo()` that stood at old `:2063` is deleted at its own byte with a `⟶` clause saying MOVED, NOT
DROPPED (`:2131`–`:2136`).

**WHY THIS FORM AND NOT `undo()` BESIDE EACH REFUSAL.** The rule is *"the file a construction CREATED is removed on
every refusal the construction reaches after the create, and only that file"*, so the frame that owns the file's
whole lifetime states it once. **Every refusal is a THROWABLE out of `constructStore`**, so:

- **A `return` cannot bypass it** — the passing path leaves by `return instance`, and a `catch` is reached only by a
  throwable, so the undo can never run on a construction that answered. (A `finally` with a flag was refused for
  exactly the opposite reason: it runs on the passing arm too, and the flag would be a second place a later arm could
  disagree with.)
- **A `throw` cannot bypass it** — an `undo()` placed before the conversion's throw at old `:2051` would have covered
  that ONE arm, and the rank-`21` delivery seat still needed its own; the frame covers both without enumeration.
- **A new arm a later pass adds cannot bypass it** — anything added inside `constructStore` is inside the `try` by
  construction; there is no list to forget to extend, and no second file to visit.
- **A refusal that is not the package's form is covered too** — a raw host throwable or a caller's own body's throw
  is caught, the file is removed, and the value crosses **unchanged** (`caught === thrown`), because the frame
  converts nothing.

**AND THE BOUND IS UNMOVED.** `undo()` still removes a file **only where `existed === false`** — the test read before
the call (`bindings/js/index.mjs:163`–`:172`) — so a caller's own file is never touched (`CAW-3`, `CFG-2`), and the
slot is a variable of the frame that mints no member on any declared shape (`A117` (D6)).

**THE ONE COST, DECLARED.** `storeCreate` is now one call deeper, and an internal name `constructStore` exists
(non-exported; the module namespace still carries `storeCreate` alone — verified: `Object.keys(await
import(instance.mjs))` is `['storeCreate']`). `storeCreate.length` is still `1`.

## 2 · EVERY REFUSAL ARM NOW COVERED, ENUMERATED

| `#` | the arm | its bytes | before | after |
|---|---|---|---|---|
| 1 | the store's own `storeCreate` refusal (a corrupt image: rank `22` `FileImageRefused`; a path/args refusal) | `:447`–`:454` | removed iff `existed === false` | **removed iff `existed === false`** — a corrupt file is the caller's and stands (`PIN-12`'s surviving spirit) |
| 2 | the sweep's CARRY refusal (rank `19` `ConstraintRefusedAtRegistration`) | `carryConstraint` `:2115` → `registrationCrossing` `:2137` | removed | removed |
| 3 | **the CONVERTED POST-ROUND verdict (rank `20` `ConstraintPassRefused`)** | `boundaryReject` `:2121` | **STOOD — the `undo()` was dead code below a throwing line** | **removed** (`CAW-1`) |
| 4 | a constraint / repair body that threw (rank `18` `ConstraintBodyThrew`, rank `21` at a re-run) | `registrationCrossing` `:2137` | removed | removed (`CFG-1`) |
| 5 | a store code crossing at `registrationCrossing` (`ValueNotAdmitted`, `WriteParentNotLink`, …) | `:2137` | removed | removed |
| 6 | a registration close's `FileCommitFailed` (`saveFailure` thrown out of `closeRegistrationAttempt`) | through `carryConstraint` | removed | removed |
| 7 | **any refusal met in the LISTENERS' ARMING WALK** (`instance.listen`/`register`, `:2247`/`:2260`) | inside the frame | **STOOD** | **removed** |
| 8 | **the rank-`21` `ListenerBodyThrew` DELIVERY SEAT** (`deliverAtTheCreation`, `:2283`) | inside the frame | **STOOD — no guard was reached at all** | **removed** (`CAW-2`) |
| 9 | anything after the delivery (`installAttemptSeam`/`installRegistrationSeam`) | inside the frame | STOOD | removed |
| 10 | a non-package throwable (a host error from an injected channel, a caller's own `cfg` accessor's throw) | inside the frame | STOOD | removed, and **the value crosses as itself** |

**ARMS 1 AND 2 ARE UNCHANGED IN OUTCOME**; 3, 7, 8, 9 and 10 are the ones this unit moves. **AND A REFUSAL THAT
REACHES NOTHING CREATED** (the step-2 batch checks, `PIN-9`'s function-less entry, `CSW-04`) is untouched: the slot
is `null` until the guard opens, and the guard opens after those checks.

## 3 · THE TWO ABSENCE CLASSES, AS WRITTEN

`bindings/js/src/entry/instance.mjs:203`–`:213`:

```js
function registerHolds(state, address) {
  try {
    state.receiver.read(address);
    return true;
  } catch (refused) {
    const status = ownValue(refused, 'status');
    // THE TWO ABSENT CLASSES, NAMED AT THE BYTE: `AddressNotFound` (`D-123` item 3) and `LeafHasNoDownstream`
    // (`D-198` item 2; `PIN-7`). Everything else — `ReadTargetIsBranch` included — is present.
    return status !== 'AddressNotFound' && status !== 'LeafHasNoDownstream';
  }
}
```

**ABSENCE = `AddressNotFound` + `LeafHasNoDownstream`; PRESENCE = `ReadTargetIsBranch` and a value.** The two
rulings are named at the byte: **`D-123` item 3** (*"No listener is asked to fire for a node that is not there"* —
and a leaf with segments remaining is not there: `src/store.rs:1424`–`:1430`, propagated **unconverted** by `read` at
`:2755`–`:2762`) and **`PIN-7`** (*"a listener whose watched address does not resolve is not fired, and that is not a
refusal"*). **IT IS NOT WIDENED TO *"any other code means present"*** — that sentence was the defect — and a third
absent class a later store adds is a third name there, never a default.

## 4 · THE CELLS — `CAW-1` … `CAW-8`, EACH WITH ITS REDDENING CHANGE

`tests/e2e/creation-as-write.test.mjs` (8 cells) + `tests/e2e/creation-as-write-support.mjs` (`CAW-7`'s one
instrument; it registers no cell, so the count moves by exactly `+8`).

| cell | its subject | its reddening change |
|---|---|---|
| **`CAW-1`** | a rank-`20` refusal over an ABSENT path leaves **no** file | **today's statement order** — put the `undo()` back below the throwing conversion (`:2131`) and the file stands |
| **`CAW-2`** | a rank-`21` refusal over an ABSENT path leaves **no** file | **today's bytes** — no guard reached at the delivery seat |
| **`CAW-3`** | the guard's bound at BOTH later arms: a PRE-EXISTING file's bytes unmoved | **unlink without the `existed` test** (`index.mjs:167`–`:170` made unconditional) |
| **`CAW-4`** | a boot with NO constraints still fires its adopted listener ONCE (and an absent address 0×) | **option (D)** — express the creation's set through `registration_triggered`/`triggered_for`; the `1` becomes `0` |
| **`CAW-5`** | a scalar above the watched address is SILENT; the scalar's own address still fires once | **today's `instance.mjs:198`** — absence as `AddressNotFound` alone |
| **`CAW-6`** | a `mem` repair leaves the created file at `0` bytes and a fresh boot reads nothing there | **`save_state()` at the construction's end** (design §4's priced-and-refused line) |
| **`CAW-7`** | the creation's attempts are unnameable: the count crosses, `attempt-1` answers a closed attempt while its ref lives and `KC-2` for both `log` and `report` once it is collected | **any strong holder of the ref** (a receipt on the instance, a strong `Map` for `closedIds`) |
| **`CAW-8`** | in one construction the repair's write of the STANDING literal answers `watched: []`, `triggered: []` AND the adopted listener fires once from the creation's seat | **unifying `PIN-6` (i) with (ii)** in either direction |

### The before/after readings, taken both ways and printed

**BEFORE** — `bindings/js/src/entry/instance.mjs` stashed to `HEAD`, everything else in place:
`node --test tests/e2e/creation-as-write.test.mjs` → **`tests 8 · pass 5 · fail 3`**, and the three are exactly the
three `D-198` item 3 names:

```
✖ CAW-1 … it STANDS with 0 bytes — on the bytes this unit replaces, this arm was the one the guard's `undo()`
        was dead code on                                   [assert.equal(stands, false) → true !== false]
✖ CAW-2 … it STANDS — this is the arm that reached no guard at all on the bytes this unit replaces
                                                           [assert.equal(stands, false) → true !== false]
✖ CAW-5 … the listener adopted at ['a','b'] ran 1 time(s) with [["a","b"]]
                                                           [assert.equal(0, 1) → 1 !== 0]
✔ CAW-3 · pre-existing bytes unmoved at both arms   ✔ CAW-4 · 1 fire
✔ CAW-6 · 0 bytes                                   ✔ CAW-7 · closed-empty → ["KC-2","KC-2"]
✔ CAW-8 · {"watched":[],"triggered":[],"value":"V"} beside 1 fire
```

**AFTER** — the repaired tree: **`tests 8 · pass 8 · fail 0`**, with the readings printed at the cells:

```
CAW-1 · answered "ConstraintPassRefused"; A repaired 1× and B 1×; the path afterwards reads null
CAW-2 · answered "ListenerBodyThrew"; the sibling repaired 1×; the path afterwards reads null
CAW-3 · before {"a":"the-callers-own","k":"the-callers-own-k"}; after the rank-20 arm the same; after the rank-21 arm the same
CAW-4 · returned its instance; the resolving address fired 1× [["a"]]; the absent one fired 0×
CAW-5 · read(['a','b']) answered "LeafHasNoDownstream"; the listener at ['a','b'] ran 0×; the one at ['a'] ran 1×
CAW-6 · returned its instance after 1 repair(s); the created file reads 0 byte(s) (""); a fresh boot reads
        {"present":false,"refused":"AddressNotFound"}
CAW-7 · opened 1 attempt(s) with 0 left live; attempt-1 answered "closed-empty" before the collect and
        ["KC-2","KC-2"] after it
CAW-8 · the repair's write read {"watched":[],"triggered":[],"value":"V"}; the adopted listener ran 1× [["a"]]
```

**`CAW-3` IS GREEN BEFORE AND AFTER** (`D-198` item 3's requirement): it was green in the before run and is green in
the after run, because the guard's `existed` bound is the one thing this unit does not move.

## 5 · THE THREE RE-DERIVED CELLS — WHAT EACH LOST AND WHAT IT GAINED

**All three lose the STANDING-BYTES limb** — *"the store's own CREATED file stands"*, which is `PIN-12`'s first
clause and the assertion `D-198` item 1 reverses — **and gain the PRE-EXISTING-FILE limb**: each drive now stands a
file through the product's own verb *before* the call, and reads that file afterwards. **Each carries a dated `⟶`
clause quoting `D-198` item 1 and naming the subject it keeps.**

| cell | lost | kept / gained |
|---|---|---|
| **`CSW-20`** (`tests/e2e/creation-sweep.test.mjs` — the file's FIFTH FACT re-spelt at `:42`–`:56`, the drive's seed at `:417`–`:419`, the title at `:399`, the limbs at `:488`–`:505`) | *"the created file stands"* (`PIN-12`'s first clause) | **KEPT: the subject — a fresh instance reads the LAST PASSING SAVE's bytes** (`b='seeded'`, `a='raw'`) and the second repair is in no byte. **GAINED: the caller's `seed` is still readable** from a fresh instance over that path (`{present:true,value:'the-callers-own'}`) |
| **`CSW-19`** (`tests/unit/js-constraints/creation-sweep-detector.test.mjs` — the drive's seed at `:88`–`:90`, the limbs at `:168`–`:180`; the brief's `:156` now reads `:173`) | the same limb | **KEPT: its `(d)` subject — NO SAVE WAS REACHED** (`'settled-a-second-time'` in no byte) plus the op census. **GAINED: a pre-existing file stands with the caller's datum in it** — the file read `{"a":"raw","b":"seeded","seed":"the-callers-own"}` |
| **`CSW-10`** (`tests/e2e/creation-sweep-listeners.test.mjs` — the drive's seed at `:531`–`:534`, the limbs at `:563`–`:580`; the brief's `:554` now reads `:568`) | the same limb, on the arm that reached **no guard at all** | **KEPT: the passing sibling's saved bytes stand** (`saved-by-sibling` in the image) and `PIN-10`'s *"NO ROLLBACK COMPOSES"*. **GAINED: the file those bytes are in is the caller's and is never removed** (`existed === true`), and the caller's own key survives beside them |

**AND TWO MORE TURNED THAT THE DESIGN'S CENSUS DID NOT NAME — MEASURED, NAMED, AND RE-DERIVED THE SAME WAY.**
`docs/L3/creation-as-write/design.md` §6 says *"Nothing else in the battery turns"* and lists `CSW-20`/`CSW-19`/
`CSW-10`; **the first full run after the repair went `1391 · pass 1386 · fail 5`, and the two missing ones were
`FSC-ARM1-D` and `FSC-ARM1-ONCE`** (`tests/e2e/file-save-coverage.test.mjs:157`/`:239`). Their whole evidence for
`D-106` arm 1's save is the same reversed limb — *"the created file is NOT zero-length, it carries the repaired
value"* — so they lose it and gain the pre-existing-file arm the same way (`{dd:99, seed:'the-callers-own'}` and
`{w1:1, w2:2, seed:'the-callers-own'}`), with the divergence stated at their own bytes. **Nothing else in the battery
turns**: the four other candidates the design predicted (`CSW-04`, `CSW-29`, `CSW-30`, `CSW-31`, `CSW-05`) and the
`CFG-1`/`CFG-2` pair were re-run and are green.

## 6 · THE PROSE

**`RELEASE-NOTES.md` gains its entry INSIDE the existing `§3.0.0` section** (`:71`–`:78`): a dated `⟶` clause carrying
the architect's *"Take default and continue"*, then **§7.3's class sentence** (`P-2` is `MINOR` content riding
`3.0.0` beside `P-3`'s `MAJOR`, the two classes printed separately, **no pass mints the number**) and **§7.4's
migration sentence, verbatim**, as item 5; item 6 declares the walk's absence-class repair; a closing paragraph
names every cell and every re-derivation. **`bindings/js/RELEASE-NOTES.md` is re-staged byte-for-byte** (`cmp` clean).
**`docs/guides/package-use.md` does NOT move, so `bindings/js/README.guide.md` is not re-staged** (`cmp` clean at
`2710` lines each) — see the reading below.

**WHAT THE GUIDE SAYS ABOUT A CREATION'S FIRING, AS I READ IT — AND IT DOES NOT DECLARE THAT A CREATION FIRES
NOTHING.** `docs/guides/package-use.md:547` reads *"Listeners fire on `write` and `delete`, on a `rollback`'s
judgement, and at the four REGISTRATION instants — and never on a read"*, and the `2026-11-06` clause at `:551`–`:566`
**corrected the shipped sentence in place** (`PIN-13`; `D-125` item 2 (iii)): ***"a boot DOES fire a listener where a
repair's write triggers one, and its set at that instant is your adopted listeners whose watched address exists"***,
with `D-125` item 1 quoted (*"Widen: `addConstraint`, a re-arm, the boot and the creation ALL deliver after their
repairs"*). **So `O-7`'s first named site is already answered and owed no byte.** Its phrase *"whose watched address
exists"* is also compatible with `D-198` item 2 as it stands — a leaf with segments remaining does not "exist" at that
address — so the guide is left byte-for-byte and `README.guide.md` needs no re-stage. **`O-7`'s second site
(`strata/research.md` §13.2's `C-12`) is `strata/**` and no delegate's** — named, not touched.

**`docs/L1/creation-sweep.md`: `PIN-12`'s first clause is re-spelt at `:564`–`:585`** (`:564`–`:567` stand byte-for-byte; the `⟶` clause runs `:568`–`:585`) under `D-198` item 1's own
authority — the original sentence and its grounding stand byte-for-byte and are read through the `⟶` clause, the two
halves are separated (the created-file clause **reversed**, the already-saved-sibling clause **unmoved**), the
`existed` bound named as the surviving arm, and the re-derivations listed. **`Q-7`'s answer is re-spelt in the
same row** — which is now `:939`, not the brief's `:921`, because the `PIN-12` clause inserted eighteen lines above it.

## 7 · THE TRIO, THE FIGURES, AND THE VERSIONS

| the gate | the reading | exit |
|---|---|---|
| `npm test` | **`tests 1399 · pass 1399 · fail 0 · skipped 0`** (`1391` + the 8 new cells) | `0` |
| `cargo test` (`CARGO_HOME` — see §8) | **23 `test result: ok` lines, `0` FAILED** | `0` |
| `npm run typecheck` | stage + `tsc -p tsconfig.typecheck.json` + the nodenext project, silent | `0` |
| `cargo check --target wasm32-unknown-unknown` | `0` lines matching `^error` | `0` |
| `npm run build` | native release + the addon + `stage-addon.mjs` (`1481488` bytes staged) | `0` |
| `node scripts/build-wasm-package.mjs` | `@auspicion/provident-storeroom-js-wasm @ 2.0.0` staged; **the arm's entries unmoved** — the package's `index.d.ts` differs from `bindings/js/index.d.ts` **on exactly one line** (`277`: `filePath?: string` → `filePath?: never`), which is `D-155` item 2's declared arm and not a byte of this unit, and `bindings/js/index.d.ts`, the generator and the fork are untouched | `0` |
| `bash scripts/publish.sh --figures` | **`ok` on both lines** — three shipped documents, three version lines, one generator; all agree with the manifest | `0` |

**THE VERSIONS DO NOT MOVE**: `bindings/js/package.json` still reads `2.0.0`, its five exact `optionalDependencies`
pins and the six `platforms/*/package.json` versions are untouched (`git status` shows none of them), and the three
generated version lines still read `2.0.0`. **`D-198` item 4's number is the architect's and `3.0.0` is `P-3`'s
line** — the `§3.0.0` section says so in its own head and this pass added no second number.
**`P-3`'S LANDING IS UNMOVED** (`D-193`/`D-195`/`D-196`): the literal comparison, the narrowed pass, `watched`'s
narrowing and the two accepted prices are byte-identical in `src/store.rs`, `delivery.mjs` and the guide.
**`D-173`'s GUARD ITSELF IS UNMOVED**: its `existed` bound, its channel and its `undo()` body are the bytes they were
(`bindings/js/index.mjs:163`–`:172` untouched) — only where it is CALLED FROM changed.

## 8 · WHAT I COULD NOT DO, AND WHY

1. **THE DESIGN'S CELL CENSUS IS SHORT BY TWO, AND THE TREE WOULD NOT LET IT STAND.** §6 says three cells turn and
   *"nothing else in the battery turns"*; **five did** (`FSC-ARM1-D`, `FSC-ARM1-ONCE`). The brief's *"RE-DERIVE THREE
   EXISTING CELLS"* is therefore **three plus the two the measurement found**; leaving them red was not an option
   (`npm test` must be `0` fail) and weakening them was not one either, so they are re-derived on the same principle
   and the divergence is stated at their own bytes and here. **A landing pass should land `D-197`/`D-198`'s census as
   `five`, not three.**
2. **TWO GATES NEED THE REPOSITORY'S OWN CARGO HOME IN THIS SANDBOX.** `npm run build` and `cargo test` fail with the
   default `~/.cargo` (**`no matching package named napi`** / **`Permission denied` writing the index**), and pass
   with `CARGO_HOME=$PWD/.cargo-home` (plus `--offline` for `cargo test`). **Nothing in the tree moved for this**; it is
   the environment, and the readings in §7 were taken with it.
3. **`docs/L1/creation-sweep.md`'s `Q-7` ROW IS NOW `:939`, not the brief's `:921`** — my own `PIN-12` clause inserted
   the eighteen lines above it. The re-spelling is at the row, so no citation is stale in the file; this note is so no
   reader greps `:921` and finds `Q-3`.
4. **`strata/**` IS UNTOUCHED BY CONSTRUCTION** — `D-` rows, `O-7`'s `C-12` and this envelope's home are the
   supervisor's. The envelope is returned as text and staged under `scratch/` for landing.
5. **NOTHING ELSE IN THE BRIEF WAS IMPOSSIBLE.** No clause was found that the rule makes unstatable; `PIN-12`'s
   authority was taken exactly as `D-198` item 1 grants it, and its surviving second half is asserted, not glossed.

## 9 · THE ONE EDIT MOST LIKELY TO REDDEN A CELL I DID NOT EXPECT

**`CAW-3`'s subject says it best, and the FSC discovery is the evidence: THE EDIT IS THE FILE REMOVAL ITSELF, BECAUSE
THE LIMB IT TURNS IS NOT IN THE CELL'S TITLE.** A pass grepping for cells whose *name* mentions a file finds `CFG-*`,
`CSW-10` and `CAW-*` and **misses `CSW-19` (a cycle detector), `CSW-20` (a cycle at the creation) and `FSC-ARM1-D`/
`FSC-ARM1-ONCE` (save-coverage cells)** — four of the five cells that actually turned. **The design predicted
`CSW-19`; the measurement added the two `FSC` ones, and any later pass whose fixture stands a `filePath` and then
refuses will meet the same limb.**

**AND THE SECOND, NAMED RATHER THAN LEFT AS A SURPRISE**: the wrapper's rename (`storeCreate` → `constructStore` for
the body) is the one edit that could redden a cell reading the construction's FRAME rather than its answer — an
arity/member census, a stack-trace reading, or a cell importing the body's internals. **Nothing in the battery does
any of those** (`storeCreate.length` is still `1`, the namespace still carries one name), so the risk is for cells not
yet written, not for the tree.
