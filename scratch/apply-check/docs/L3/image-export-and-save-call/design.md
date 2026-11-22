# Design — `U-STOREROOM-03 IMAGE-EXPORT` · `U-STOREROOM-04 SAVE-CALL` (one landing)

**PROVENANCE.** `role_l3_designer`, `2026-11-17`, `HEAD` `e3136af`, landed by the supervisor because this role holds no write channel. **Its derivation:** `derivation: docs/L1/seven-key-config.md · §5 · units = U-STOREROOM-03 ("lands WITH U-04") and U-STOREROOM-04 ("with U-03") · their rulings are D-132/D-133/D-137/D-144/D-145/D-146 · the decider for every semantics is the ARCHITECT, for every pin the contract pass, for every runtime statement the DESIGN.` It designs no declaration a ruling has not made. **No code, test, spec, declaration or contract byte is written here; every cell is named by class and no cell is written.**

**READ AT THE BYTES:** `strata/decisions.md` `D-132`…`D-137`, `D-144`…`D-152` whole · `strata/proposals.md` `P-5` `§5` · `docs/L1/seven-key-config.md` `§1`…`§14` whole · `docs/specs/storeroom-delivery-settle/contract.md` whole · `src/store.rs` `:630`–`:929`, `:1450`–`:1789`, `:2930`–`:3059`, `:3330`–`:3459` · `src/args.rs` whole (329 lines) · `src/error.rs` `:160`–`:280` · `bindings/js/src/facade.rs` `:300`–`:369`, `:960`–`:1139`, `:1195`–`:1294` · `bindings/js/src/codec.rs` `:105`–`:165`, `:828`–`:868` · `bindings/js/src/crossing.rs` (signature census) · `bindings/js/src/entry/{frame,delivery,state,kernel-attempt,kernel-commit}.mjs` at the ranges printed below · `bindings/js/index.d.ts` `:215`–`:334`, `:415`–`:474`, `:600`–`:700` · `bindings/js/index.mjs` `:380`–`:460` · `docs/specs/storeroom-js/surface.md` `:1889`–`:1922`. **NOT OPENED:** `src/json.rs`, `src/value.rs`, `src/records.rs`, `src/lib.rs`, `bindings/js/src/entry/{kernel-registration,kernel-foundations,constraints}.mjs` beyond the greps printed below, `tests/**`, `typecheck/**`. **NOT DRIVEN:** every figure that needs a build, a `cargo test` or a suite run.

---

## §1 · The pair's scope, and its non-scope

**This is a STORE-SURFACE unit with a package half** — **the store authors the third `file` entry condition and its `args.rs` carrier, the export act out of `file_snapshot` → `json::encode` → `write_file`'s own re-decode, and the two verdict acts `saveSucceeded`/`saveFailed`; the package authors `encodeConfig`'s new key, the mutual exclusion's refusal, and the terminal arm's substitution of `exportImage` → `saveCall` → the verdict entry for the file write.**

**Its non-scope, named so no later pass reads it as settled here:** `U-STOREROOM-05 SEED` (`initialImage`, its install order, `SE-2`/`SE-3`/`SE-5`/`SE-7`/`SE-8`) · `U-STOREROOM-07 STATUS-23` (rank `23`'s seat in `src/error.rs` and `index.d.ts`, and the rejection's carrier) · **`U-09`'s declaration byte** — the `saveCall` key's typed line, its docblock and every census in `bindings/js/index.d.ts` are designed in §4 and written by `U-09` · **`modules.json`** (`role_l2_integration`'s; `deliver`'s row is unmoved by this pair) · the release class (`D-145` item 6, deferred with its named revisit).

---

## §2 · The store side, act by act

### (a) The construction's new input — `durable_without_path`

**Carried in `src/args.rs`, beside `FilePathArg` (`:69`), `JournalLengthArg` (`:81`) and `ConstraintsArg` (`:128`):**

```rust
pub enum DurableWithoutPathArg { Set, Absent }        // NEW — one variant per declared state, `Absent` the optional spelling
```

**It is not a `cfg` key** (`D-137` item 3): nothing of it crosses from `encodeConfig`'s six-key projection; the package sets it on the wire it hands `storeCreate`. **The construction gains a third entry point and loses no signature:**

```rust
pub fn storeCreate(cfg: &StoreConfig) -> Result<Store, StoreError>                            // :659 — UNMOVED
pub fn storeCreateWithConstraints(cfg: &StoreConfig, c: &ConstraintsArg) -> …                 // :671 — body moves out
pub fn storeCreateWithInputs(cfg: &StoreConfig, c: &ConstraintsArg,
                             durable: &DurableWithoutPathArg) -> Result<Store, StoreError>   // NEW — holds the body
```

**One line of justification:** the tree already spells the widest function as the body and the narrower ones as delegates (`:659`–`:661`), so a third entry point is that idiom and not a second construction; `storeCreateWithConstraints` keeps its name and arity, every Rust drive compiles unmoved, and the `codec.member`-read carriers keep their home. **What changes in the steps:**

- **Step 3 (`:690`–`:702`) is BYTE-UNMOVED.** The carrier cannot skip anything here: the package sets `Set` only where `filePath` is absent, so `FilePathArg::Path` and `Set` never stand together, and the probe is not reached on this arm. **The redundancy rule `D-137` item 3 left open is therefore moot and is read SILENT** — where both stand, the path wins, the probe runs, and `D-132` item 5's *"the probe never runs"* is then the package's doing and not the store's.
- **Step 4b (`:730`–`:747`) becomes three-way, and the third arm performs NO FILESYSTEM ACT:**

```rust
let register_tier = if !file_path.is_empty() { /* probe, :733–:746, byte-unmoved */ Tier::File }
                    else if durable.is_set()  { Tier::File }     // NEW: the third entry condition
                    else                      { Tier::Mem };
```

  **`register_tier` answers `Tier::File` with `file_path == ""`** (`D-132` item 1). The register root's anchor carries that tier (`Store::fresh_register` `:969`–`:986`; read back at `:3462`), so a `file`-tier write passes the monotonicity check that refused it before — **`ParentAnchorMonotonicityViolation` (rank `6`) is the code that DISAPPEARS on this arm**, and it disappears because the tier is `file`, not because a check was relaxed. **The exclusive create's two arms are skipped, so `FilePathUnreachable` (rank `13`) has no subject** (`D-132` item 5): no path is probed, created or opened.
- **Step 7 (`:786`–`:789`) is BYTE-UNMOVED and its refusal arm is UNREACHABLE.** `read_file_image`'s first clause answers `FileImage::NoImage` on an empty `file_path` (`:1721`–`:1723`), so rank `22` `FileImageRefused` has no subject, `boot_load` answers `None` (`:1706`), nothing is installed at `Tier::File`, and `store.born = store.capture_register()` (`:842`) captures the empty register — **the creation state stands, which is §2(g).**

### (b) The export act — `export_image`, and the factoring of `:1516`–`:1524`

**The chain is factored once and both callers take it; no abstraction beyond one private helper.**

```rust
fn compose_verified_image(&self, address: &[Segment]) -> Result<String, StoreError>   // NEW: :1516 + :1522–:1524
fn write_file(&self, address: &[Segment]) -> Result<(), StoreError>                    // :1515–:1533 — body becomes
                                                                                       //   let text = self.compose_verified_image(address)?;
                                                                                       //   then :1525–:1531 (sibling, rename), byte-unmoved
pub fn export_image(&self, address: &[Segment]) -> Result<String, StoreError>          // NEW — answers compose_verified_image
```

**The re-decode is RETAINED and it is the same bytes** (`:1522`–`:1524`): the text it verifies is the text it hands out, and the acceptance it asks is `read_file_image`'s own `Ok(StoreValue::Object(_))` arm — *"the store's own guard on the outgoing artefact"* (`D-134` item 2). **`SC-R4` is discharged by construction, not by a second check** (`D-137` item 2).

**It marks nothing** (`D-137` item 2): it sets no `Entry::saved`, appends no journal entry, writes no byte, takes `&self` and never `&mut self`, and creates no sibling and performs no rename — the two filesystem acts are on the far side of the factoring and belong to `write_file` alone. **Its subject is the register (`&[]`, `D-55` item 2's spelling of the root), which is `save_file_delta`'s own subject** (`:3410`–`:3423`), so a refusal names what the state-keyed save already names (`:1626`–`:1629`).

**The refusal's seat is the one place `D-137` item 2 and `SC-R4` meet, and the design takes the arm that needs no new byte:** the export answers `Result`, and its refusal row is `FileCommitFailed` (rank `15`) — the same seat and the same two-member store form `write_file` already answers with at `:1523`, because the check is `write_file`'s and is merely inherited. Two readings stand and one is priced in §7: **(A) the inherited refusal** (taken: no code minted, one form, and the caller's own failure arm already handles rank `15` on this path) versus **(B) `D-137`'s literal *"becomes an assertion"*** — a `debug_assert!` and a release-mode pass-through, which hands the caller an image the loader would refuse and re-opens `SC-R4` at exactly the class `write_file`'s own clause was authored for (`:1497`–`:1513`: a depth-`127` value committed as success and lost at the next boot). **The sentence the refusal prints is not this design's:** `:460`–`:466` still speaks of a path twice and on this arm there is no path — that is `D-145` item 1 of its unsettled, a spec byte.

### (c) `saveSucceeded(opId)` — arity `1`, answers `undefined`, three arms

```rust
pub fn save_succeeded(&mut self, op_id: &str) -> Result<(), StoreError>
```

**It sets `journal[index].saved = true` and does nothing else** — no `write_file`, no image composition, no journal append, no sequence move, **no byte** (`D-144` item 6). `Entry::saved` is read at `:1592` and written at `:1598` and nowhere else (verified by search: two hits), so the mark's only reader is `commit_file`'s already-saved gate.

| arm | today's `commit_file` | this act |
|---|---|---|
| **op not in the journal** (`:1582`–`:1588`) | silent `Ok(())` | **REFUSES** at `JournalOpUnknown` (rank `10`) — *"a `saveSucceeded` naming an op this store does not hold REFUSES"* (`D-145` item 3), on the op-keyed failure's existing seat |
| **the entry owes no save** (`:1589`–`:1591`) | silent `Ok(())` | **STANDS, and the design DROPS the gate:** the call is honoured, the mark is set, the answer is `undefined` |
| **already saved** (`:1592`–`:1594`) | silent `Ok(())`, no byte | **STANDS — idempotent**, and this is the arm `D-145` item 3 FLAGGED and left open |

**Why the `save_owed` gate is dropped, said so it can be falsified:** `save_owed` is *"the eligibility ground of one standing entry"* (`:1640`–`:1665`) and answers *"WHERE a save is owed"*, never *"whether one has run"* — and `commit_file` asks it **before** it asks `saved` (`:1589` then `:1592`), so for an entry it answers `false` for, the mark is read by nothing on any path, on either arm. Dropping the gate also avoids the only alternative: a refusal at `JournalOpUnknown` for an op the store plainly holds would print rank `10`'s sentence about an unknown op — a false first sentence. **Falsifier: a driven state in which `saved` on a `save_owed == false` entry changes a later answer.** None exists as the tree stands, because `filePath` and `saveCall` are mutually exclusive (`D-144` item 7) and no `commit_file` can ever see this mark.

**The already-saved arm is flagged and not chosen** (`D-145` item 3's last sentence reads *"answer with refusal"* as reaching the unknown-op arm **and not** the idempotent one). The design takes the ruling's own reading — the second call answers `undefined` and writes nothing — and **no cell may pin it without naming the word it rests on** (§7 `O-2`).

### (d) `saveFailed(opId)` — arity `1`, answers `undefined`, the five steps, no byte

```rust
pub fn save_failed(&mut self, op_id: &str) -> Result<(), StoreError>
```

**Exactly `commit_file`'s failure arm and nothing else** (`:1601`–`:1608`, in the tree's own order): the entry is removed from the journal · `if let Some(home) = &entry.home { self.restore(home, &entry.captured) }` · `self.restore_compaction(&entry.compacted)` · `self.last_seq -= 1` · **answer `Ok(())`.** `D-146` item 1's *"answer"* is the `Err(failure)` the arm performs today; here the failure belongs to the caller's saver and not to this store, so the fifth step answers `undefined` and **the rank `15` form the caller receives is the package's** (`D-144` item 4). **It writes no byte, it never reaches `write_file`, and it keeps the journal the STORE's** (`D-146` item 1).

**It asks no gate.** Position, then the five steps: no `save_owed`, no `saved`, no tier test. The mirror of `saveSucceeded`'s gates would be `save_owed`/`saved` tests, and a failure that *conditionally* unwound would leave standing a record the store's own writer would have removed.

**The unknown-op arm is left open by `D-146` item 1 of its unsettled, and both readings are priced, neither chosen:**

- **(a) REFUSE at `JournalOpUnknown`** — the exact mirror of `saveSucceeded`. **Cost:** a save that failed would cross with a *second* failure that pre-empts the first; the arm's own `catch` (`delivery.mjs:1207`–`:1213`) would have to choose between rank `10`'s sentence and rank `15`'s, and `D-144` item 4's passthrough would be defeated by its own cure.
- **(b) ANSWER `undefined` as a no-op** — `commit_file`'s own silent arm, and the reading that there is nothing to unwind where the store holds nothing. **Cost:** a failure with no unwind is silent, and *"the rollback happens and the caller receives the failure AFTER it"* (`§2.11` cl. 5) becomes unobservable on that arm — a driven cell could not tell it from a lost entry.

**Whether the answer carries the unwound state** (`D-146` item 2 of its unsettled) is the design's to price: the design answers `undefined` (`facade.rs:1020`'s declared form; no member is minted for a signal nobody asked for), and the unwound state is already observable through `read` — which is what §6's cell reads.

### (e) The writer's suppression, and what the store answers if it IS called — `SC-3`

**The declaration is `D-133` item 3's and the design implements it literally: `commit_file` (`:1581`–`:1611`) MOVES NO BYTE, and the suppression is the PACKAGE's abstention at its one call site (`delivery.mjs:1206`).** No guard, no early return, no fourth silent arm: *"the store's own writer is NOT USED"*, and *"what the store does instead of entering `write_file` is the carrier's own question"* — the answer is §2(b)'s export.

**And `SC-3`'s required declaration is answered as a MEASUREMENT of the reachable path, because "never called" is a promise and not a structure.** On a path-less `file` register the writer is still reachable through the addon entry `commitFile` itself (`facade.rs:1034`, a `pub fn` on a shipped crate) and through the reversal's two state-keyed saves (`constraints.mjs:2789`, `:3109`). **If it is called there, the store answers `FileCommitFailed` (rank `15`) and rolls the entry back (`:1601`–`:1608`) — and it first performs ONE filesystem act nobody declared:** `write_file`'s sibling name is `format!("{}.snst-commit-{}", self.file_path, std::process::id())` (`:1525`), which on an empty path is the RELATIVE name `.snst-commit-<pid>`; the write of it lands in the PROCESS'S WORKING DIRECTORY, the `rename` onto `""` fails, and `:1529` removes it. **No durable byte survives; a transient file at a path no clause names is created.** *"What the store answers if it is called"* is therefore: rank `15`, the entry unwound, and a stray sibling in the cwd — `NOT DRIVEN`. **The alternative is priced, not taken:** a one-line early answer before `:1582` (`if self.file_path.is_empty() { return Ok(()) }`) — a fourth silent arm beside the three `D-145` item 3 declines to inherit, costing nothing declared (`saveSucceeded` keeps the mark on this arm) and removing the stray sibling. **The design does not take it because `D-133` item 3 answered *suppressed*, and a guard is a second answer to a question already answered; if the architect reads *suppressed* as *structurally unreachable*, the guard is the arm** (§7 `O-3`).

### (f) No file reconstruction — the four sites where the store would rebuild, and what each answers

**`D-144` item 5's *"error as if it's a mem-tier store would"* is already the store's behaviour at every site, and the mechanism is one clause: every reconstruction passes through `file_path.is_empty()`.**

| the site where the store would rebuild from a path | its answer on this arm |
|---|---|
| the boot's `read_file_image` (`:1720`–`:1739`) | `FileImage::NoImage` at the FIRST clause (`:1721`–`:1723`) — the path is never opened, so `NoImage`/`Members`/`Refused` are not reached and rank `22` has no subject |
| the regeneration's base, `durable_projection` (`:3434`–`:3440`) with `save_file_delta` (`:3410`–`:3423`) | `NoImage` ⇒ `Some(born_projection())`, the CREATION STATE (`:3445`–`:3456`, `D-108` item 1's mem-tier ground), and the save answers `Ok(())` at `:3411`–`:3413` without touching the path |
| `RollbackCompacted`'s reach (`:2975`–`:2985` → `regenerate` `:3277`) | the token has **no producer in this tree at all** (`:2941`–`:2943`, `D-118` item 1); the regeneration's base is the creation state and *"the regeneration refuses on no state of the path"* — the mem-tier answer exactly |
| `commit_file` (`:1581`) | the writer the package never calls — §2(e) |

**So the client's rebuild is fed back through `initialImage`** (`D-134`/`D-135`) and nothing in this pair reads a file. **What this does NOT do:** it does not *remove* the reconstruction code — a `filePath` store keeps all four sites, they are its own, and `U-05`'s seed is where the client's rebuild re-enters.

### (g) The boot with no `filePath` and no seed

**The creation state is the empty register at `Tier::File`, zero journal entries, `0` registrations, no code** (`:757`, `:789`–`:842`; `DD-38`). **And the data-loss hazard `D-145` item 4 declared is NAMED AND NOT GUARDED, by his word: a store that boots empty and then saves persists an empty image over whatever the client's backend held** — the first `file`-tier write exports the image of nothing and `saveCall` stores it. **No cross-key refusal is owed and `{saveCall, initialImage}` is not enforced as a pair** (`D-145` item 4); the duty is documentary — the declaration's prose and the guides (`D-147` item 1's three duties, `D-145` item 5's fourth). **The design adds no guard, no warning code and no second act, and the pair's own cells assert no protection.**

---

## §3 · The addon side — three entries

```rust
#[napi(js_name = "exportImage")]      // NEW, position-less
fn verb_export_image(env: Env, receiver: This<Object<'_>>) -> NapiRet<'static>                         // answers make_string(&env, &text)
#[napi(js_name = "saveSucceeded")]    // NEW, ONE position — the op id
fn verb_save_succeeded(env: Env, receiver: This<Object<'_>>, op_id_pos: JsVal<'_>) -> NapiRet<'static>  // answers undefined
#[napi(js_name = "saveFailed")]       // NEW, ONE position — the op id
fn verb_save_failed(env: Env, receiver: This<Object<'_>>, op_id_pos: JsVal<'_>) -> NapiRet<'static>     // answers undefined
```

**Positions.** `exportImage` takes NONE — `D-137` item 2's spelling; if a later pass finds it needs the op's identity, that is a second declaration and it returns to the architect (`D-137` item 2 of its unsettled). The two verdicts take **one** position, the op id, on `commitFile`'s own declared form (`facade.rs:1028`–`:1030`: *"its one argument is an op id and its answer is `undefined`"*) — **and that sentence is exactly why the pair is landable**: both new entries satisfy it verbatim, and `commitFile`'s own answer does not move.

**Answers and crossings.** The export's `string` crosses OUT on the device the tree already has: `codec.rs:841`'s `string_value` → `make_string` (`:123`, already `pub(crate)` and imported by `facade.rs`) → `ToNapiValue`. Nothing new is minted for a text-out and no value crosses IN. The two verdicts answer `codec.undefined_value()` (`codec.rs:853`), the same landing every per-verb entry takes through `answer_or_throw` (`facade.rs:1114`).

**The fifth code position, named because the facade cannot reach the store without it.** `crossing::Instance` gains three forwarding delegates beside `commit_file` (`crossing.rs:1117`) and `save_state` (`:1128`) — `export_image(&self)`, `save_succeeded(&mut self, op_id: &str)`, `save_failed(&mut self, op_id: &str)` — **exactly the one-delegate grant the tier-readout unit measured as necessary** (`E0599`/`E0616` both ways). The malformed-position classifier is the store's own (`args.rs:322`–`:328`: a blank, absent or non-string op id answers `AddressMalformed` naming `opId`) and **not** `commitFile`'s hand-authored `JournalOpUnknown` arm (`facade.rs:1066`–`:1073`); the asymmetry is priced in §7 `O-6`.

**★ THE ENTRY-SET CENSUS, MEASURED, AND ONE CARRIED FIGURE CORRECTED.** At this tree `facade.rs` carries **TWELVE** `#[napi(js_name = …)]` entries (`:581 · :627 · :669 · :713 · :752 · :786 · :852 · :895 · :920 · :951 · :986 · :1034`) and **FOUR** unnamed `#[napi]` entries (`storeCreate :329`, `register :1139`, `version :1216`, `errorMessage :1266`) — **sixteen exported names, which is the figure the `1.10.0` landing's own build reported.** `exportImage`, `saveSucceeded` and `saveFailed` **are not in the tree**: no `js_name` and no `fn` of either name exists, and the only occurrences of the three words are the rulings' and the plan's. **So the declared set's arithmetic is `12 → 13` (`U-03`) → `14` → `15` (`U-04`'s two), and the built export figure reads `16 → 19`. The brief's *"thirteen today, `13 → 16`"* counts `exportImage` twice and lands one entry short of the declared set; it is corrected here at its own sentence.** **No existing entry's declared answer moves:** `commitFile` stays `undefined` on both its readings, the nine per-verb entries are byte-unmoved, and `surface.md:1917`'s *"the ADDON's own export set is `5`"* remains the recorded defect `seven-key-config.md §2.2` filed (that citation does not resolve at this file).

---

## §4 · The package side, act by act

### `encodeConfig` (`frame.mjs:203`–`:222`) — one key, one class gate, one cross-key refusal

- **`saveCall` never crosses.** A JS function cannot cross into Rust at any depth (`frame.mjs:42`–`:44`, the rule that strips `cfg.listeners[].listener` and `cfg.constraints[].constraint`), so `encodeConfig` **tests it and does not project it into `out`**: `if (Object.hasOwn(cfg, 'saveCall') && typeof cfg.saveCall !== 'function') boundaryReject('AddressMalformed', 'saveCall', …)` — **`D-144` item 2's broken config, at the class gate `:204`–`:210` already carries**, before any filesystem act, because the construction's first filesystem act is inside `addon_.storeCreate(encoded)` (`index.mjs:397`–`:402`). **The status is the one a bad `cfg` already answers and the package mints no code** (`PAR-JS-1`). **Membership is `Object.hasOwn` and never `in`** (`A76`/`JS-5`, `:190`–`:191`), so `saveCall: undefined` is the key's own outside form and not its absence.
- **`durable_without_path` is not a key and is not read here.** The wire bit is set where both facts are known — at the hand-on (`index.mjs:391`–`:426`): `if (Object.hasOwn(cfg, 'saveCall') && !Object.hasOwn(cfg, 'filePath')) encoded.durable_without_path = true`. **That is the package's own call shape (`D-137` item 3) and not a caller key, so `DD-36`'s refusal of a key the CALLER supplies is not engaged.**
- **The mutual exclusion refuses at the same gate, in the same instant, with the same status** (`D-144` item 7, item 2's arm): after `:220`, `if (Object.hasOwn(cfg, 'filePath') && Object.hasOwn(cfg, 'saveCall')) boundaryReject('AddressMalformed', 'cfg', …)`. **A cross-KEY rule has no per-key subject, so the target is the carrier `'cfg'`** — the same target `:207` uses for the carrier's own class test — and the sentence names both keys. **It stands after the two per-key class tests and before the construction**, so a `cfg` that is both excluded and malformed answers the malformed key's own refusal (the least-information-first order `frame.mjs:236`–`:245` states).
- **The function itself is armed at construction, beside `state.receiver`:** `state.saveCall` is a **ninth** slot on the `state` literal (`index.mjs:480`–`:498`, whose eighth is `legSettle` at `:498`), set once at construction and read once at the terminal arm. **No member is added to the instance** — fifteen stays fifteen.

### The terminal arm's substitution (`delivery.mjs:1142`–`:1276`)

**The save's ACT changes identity; its PLACE does not.** Inside the arm's existing gate (`:1155`–`:1173`) and its existing `try` (`:1174`–`:1213`), the one store call at `:1206` is replaced by this order:

```js
if (state.saveCall !== undefined) {                                    // the saveCall arm
  const image = exportImage(state.receiver);                           // §2(b) — synchronous, may refuse rank 15
  const verdict = state.saveCall.call(undefined, image);               // the caller's function, ONE position — the image
  if (verdict.success === true) { saveSucceeded(state.receiver, opId); }    // §2(c) — then DELIVER at :1273
  else { saveFailed(state.receiver, opId); throw <the one form>; }     // §2(d) — then the mark and rethrow at :1211
} else {
  carryRefusal(() => commitFile(state.receiver, answer.op.opId), …);  // TODAY'S BYTES, UNMOVED
}
```

**What crosses on failure.** `FileCommitFailed` at **rank `15`, WIDENED and not joined** (`D-145` item 1; `CODES` stays `23` declared — §7 `O-7`): the package raises **the surface's one three-member form** `{status, message, log}` (`surface.md:1896`; `facade.rs`'s `Refusal`), its `message` **asked of the store's own generator** through the `errorMessage` entry (`facade.rs:1265`) so **no call site authors a sentence** (`§2.5` item 2), and its `log` carrying the commit's entries plus the saver's words. It then sets `record[SAVE_FAILED_AT_THE_TERMINAL_ARM]` and **rethrows**, exactly as `:1211` does, so the kernel's `runAttempt` catch (`kernel-attempt.mjs:451`–`:486`) recognises the arm by the mark, releases the pin, and performs `terminalComposed(…, KC.saveFailed, …)` — **which is how the refusal reaches the kernel** (`D-144` item 4). **The caller receives the failure AFTER the rollback**, because `saveFailed` returned before the throw (`§2.11` cl. 5, verbatim).

**Where the caller's `message[]` goes, and the seat it does not have (`D-145` item 2).** The design's reading is **one `LogEntry` per string**, appended to **the commit's own list** — `commitLogOf(record)` (`state.mjs:114`–`:119`), which IS `attempt.log` (`kernel-commit.mjs:351`–`:352` defines the symbol key with `value: attempt.log`), so the entries ride into the exact array the refusal carries and the kernel's `outcome` entry is appended after them — **`opId` = the op the save was for, `state` = `null` (only the `outcome` kind carries a `KC` token), `id` = the op's address spelling.** **★ AND THERE IS NO LAWFUL KIND FOR THEM.** `LogEntry.kind` is the kernel's **closed four-member** set — `constraint-check · repair-run · commit · outcome` (`kernel-foundations.mjs:1020`; `index.d.ts:455`) — and none fits: `commit` is *"the attempt's SUCCESS arm, appended once"* and the two one-shot arms never stand in one log (`kernel-attempt.mjs:487`–`:503`), `outcome` is the kernel's ONE entry whose `message` the composition already authors (`:481`–`:484`), and `constraint-check`/`repair-run` name a pair and a repair. **So the passthrough has no seat inside this pair's write set: it needs a fifth `LogKind` in `kernel-foundations.mjs` and `index.d.ts`** (§7 `O-1` — BLOCKING for this one arm and for no other part of the pair). The three arms are priced in §7.

### The `saveCall` answer's validation — priced, not chosen

**A function's ANSWER is not a construction argument, so `D-144` item 2's class gate cannot reach it: the answer exists only at the terminal arm, after the write has landed and after `exportImage`.** Two readings stand:

- **(a) A runtime refusal in the one form.** It requires a member of the closed set that names *"the saver's answer was malformed"* — **none exists, and `P-5` `§5`'s MUST NOT forbids minting one** — so every candidate would borrow a sentence about something else.
- **(b) Every non-`{success: true}` answer is a FAILED SAVE, read tolerantly** — a non-object, a missing `success`, a thenable settling to something else: each takes the failure arm at rank `15`, with `message` read **only where it is an array**, each string crossing as one log entry and a non-array `message` read as `[]`. **No member is minted, and the arm needs no byte the record has not already declared.**

**The design does not choose** (`D-144` item 1 declares the answer's shape and not its enforcement); **(b) is the always-available default, and a cell may be written to either only by naming which** (§7 `O-4`).

---

## §5 · The order and its invariants

**`D-117`'s chain stands whole: ASK → REPAIRS → RE-RUN → SAVE → DELIVER → the answer.** The pair touches **SAVE only**, and `U-06`'s settle sits between SAVE and the answer, inside the tail at `constraints.mjs:862`–`:863` and `:956`.

| instant | today | under this pair |
|---|---|---|
| A SK · REPAIRS · RE-RUN | kernel | **UNMOVED** |
| **SAVE** | `carryRefusal(() => commitFile(…))` (`:1206`) — one store call | **export (sync) → the `saveCall` invocation → the verdict entry**; on the `file` arm, today's bytes |
| DELIVER | `state.legSettle = deliver(state, triggered, triggeringAddress, true)` (`:1273`) | **UNMOVED, and reached on the success arm only** |
| **the settle** | `settledAnswer(settle, recordOut)` (`constraints.mjs:956`) | **UNMOVED** |
| the answer | the record, or the refusal | **UNMOVED** |

**The save still precedes every body of the delivered set, on BOTH arms — and the failure arm is stronger than the clause asks.**

- **success:** `saveSucceeded` returns before `:1273` executes. The delivery is the arm's LAST statement and the arm's gate (`:1155`–`:1173`) is unchanged, so `§2.11` clause 2's *"the act is the first thing that arm does, before any body of the delivered set is invoked"* holds by construction on the `file` arm and the `saveCall` arm alike.
- **failure:** the throw at `:1211`–`:1212` leaves `terminalArm` before `:1273` is reached, so **NO body of the delivered set is started at all** — `state.legSettle` is never written and the write answers the refusal. `D-138` item 1's premise (*"the delivered set runs AFTER the terminal arm's SAVE"*) therefore stands on both arms, and `D-138` item 2's refusal of a rejection-as-failure is untouched: the failure crosses as a **throw**, which is `D-73`'s channel and not a rejection.

**`saveCall` may be `async` (`D-144` item 1's *"(async optional)"*) — and this is where the pair meets a wall it must name.**

- **A non-thenable answer (the ordinary case) keeps the whole arm SYNCHRONOUS:** the verdict runs, `:1273` runs, `deliver` answers `null` on an all-synchronous set (`delivery.mjs:318`), `state.legSettle` stays `null`, and `PIN-6`'s *"no thenable anywhere"* holds byte for byte.
- **A thenable answer makes the arm WAIT, and the wait cannot leave `delivery.mjs` + `index.mjs`.** `settleArm` (`kernel-attempt.mjs:542`–`:551`) discards the arm's answer at `:550`, so a promise returned by `terminalArm` is dropped; the only route from a later microtask to the CALLER'S ANSWER is `state.legSettle`'s one reader (`constraints.mjs:862`–`:863` → `:956`). **What the arm does while it waits: it holds the image text and the op id, starts no delivery, and hands the slot a COMPOSED promise that (i) awaits the saver's answer, (ii) runs the verdict entry, and (iii) starts the delivered set and answers a settle-shaped value `settledAnswer` can read** — `settledAnswer`'s `await settle` reads `.failures`/`.settled`/`.invoked` at `:351`–`:353`, so the composed value must be `bodyFailures`-shaped and not a bare promise. **The delivered set is therefore started AFTER the save settles on the async arm too — never before.**
- **★ AND AN ASYNC SAVE THAT FAILS CANNOT BE REFUSED INSIDE THIS PAIR'S WRITE SET.** `settledAnswer` *"cannot reject on any arm"* (`:336`–`:340`) and `constraints.mjs:956`'s branch is `settle === null ? recordOut : settledAnswer(settle, recordOut)` — two arms and no third. The failure would therefore have to cross as a resolved datum (which makes a failed save an answered write, contradicting `§2.11` cl. 5) or as a rejection (which `PIN-5` and `RM-3`'s four sites forbid). **The missing byte is `constraints.mjs:956`'s third arm — `U-06`'s file and not this pair's** (§7 `O-5`; envelope, the collision).

---

## §6 · The cells, named by class and not written

| class | the cell | the clause |
|---|---|---|
| **`SC-EXPORT-BYTES`** | over a `filePath` store and over a path-less `file` register: the text `exportImage()` answers is **byte-identical** to the bytes the writer placed for the same state (compared with the file read back, and with `file_snapshot`+`encode` by construction), and equals `JSON.stringify(store.read([]))` **only** where no `mem`/`temp` version shadows a `file` one | `D-133` items 2, 4; `D-137` item 2 |
| **`SC-EXPORT-REFUSES`** | an image the loader would refuse is refused **at the export** with `FileCommitFailed` (rank `15`), **no byte written, no `saved` set**, the standing file unchanged — `SC-R4`'s producer | `D-133` item 2 of its unsettled; `D-134` item 2 |
| **`SC-EXPORT-MARKS-NOTHING`** | `exportImage()` thrice: the journal length, `journalMark()`, `saved`, the file's bytes and `last_seq` are unmoved | `D-137` item 2 |
| **`SC-TIER-3RD`** | `{saveCall, no filePath}` enters `file`: a `file`-tier write **passes**, a registered body runs, `saveCall` is reached once; the control `{no saveCall, no filePath}` stays `mem` and answers `ParentAnchorMonotonicityViolation` | `D-132` items 1–2 |
| **`SC-TIER-3RD-NOFILE`** | the path-less construction leaves **nothing behind** — no file created, no path probed — and `read_file_image`'s refusal (rank `22`) is unreachable | `D-132` item 5; `§10.4` part 5 |
| **`SC-SUCCEEDED-UNKNOWN`** | `saveSucceeded('no-such-op')` refuses at `JournalOpUnknown` (rank `10`), writes no byte and marks nothing | `D-145` item 3 |
| **`SC-SUCCEEDED-IDEMPOTENT`** | a second `saveSucceeded(opId)` answers `undefined`, writes no byte and changes no observable — **pinned to `D-145` item 3's unflagged reading, and a cell asserting either arm names the word it rests on** | `D-145` item 3's flag; `commit_file:1592`–`:1594` |
| **`SC-SUCCEEDED-OWES-NOTHING`** | an op that moved nothing at `Tier::File` is marked and answered `undefined`, and **no later answer moves** | §2(c)'s dropped gate |
| **`SC-FAILED-UNWINDS`** | `read(address)` and the journal are read **before and after** `saveFailed(opId)`: the pre-state is restored, the entry is gone, `last_seq` is one lower, a later `read` of the written address answers `AddressNotFound`, **and no byte moved** | `D-146` item 1; `store.rs:1601`–`:1608` |
| **`SC-EXCLUSION`** | `storeCreate({journalLength, listeners, filePath, saveCall})` answers `AddressMalformed`, names `cfg`, **throws before any filesystem act** (no file created) and returns no instance; and `{saveCall}` alone constructs | `D-144` item 7 |
| **`SC-SAVE-SUCCEEDS`** | a passing write exports once and the saver receives the text; `success: true, message: ['…']` → `saveSucceeded` marked the record, the delivered set followed, the answer is the record, `Object.keys` is the three | `D-144` items 1, 6 |
| **`SC-SAVE-FAILS`** | `success: false, message: ['a','b']` → the act answers rank `15` `FileCommitFailed`, the log carries `a` and `b` **and** the kernel's `outcome` entry (`KC-9`), the journal entry is gone and `read` answers `AddressNotFound`, **and no body of the delivered set ran** (a listener at the address recorded zero invocations) | `D-144` items 3–4; `D-145` items 1–2; `D-146` item 4 |
| **`SC-SAVE-THROWS`** | a `saveCall` that throws a sentinel synchronously: the write answers rank `15` (a throw is a failed save, not the saver's own throwable crossing), the entry is unwound, `SAVE_FAILED_AT_THE_TERMINAL_ARM` carries the package's own failure datum and not the sentinel, and the sentinel never reaches the caller | `D-144` items 2–3; `surface.md:1919`–`:1922` |
| **`SC-SAVE-NEVER-SETTLES`** | a `saveCall` answering a promise that never settles: the answer never arrives, **no delivery is started, no timer is armed and no flush boundary exists**, and a later `write` on the same instance still works | §5's wall; `D-131` item 4 |
| **`SC-ORDER-BOTH-ARMS`** | on both arms a listener body's first statement reads `journalMark()` and the saver's recorded call order and sees the save **already performed** (success) or **never started** (failure); and the failure arm's delivered set is empty | `§2.11` cl. 2; `D-138` item 1 |
| **`SC-NO-RECONSTRUCTION`** | on a path-less store a failing save is followed by a `rollback` whose candidate set would have had to rebuild: the answer is the creation state, **no file is read, rank `11` is not raised** | `D-144` item 5 |
| **`SC-BOOT-EMPTY`** | `{saveCall, no initialImage}` boots empty, a write exports an image the client can see is empty, and **the pair refuses nothing** | `D-145` item 4 |
| **`SC-P-BLIND`** | written before the pair exists: the export's text re-enters a fresh store through `initialImage` **byte for byte** (a forward-only property, written when `U-05` lands the reader) | `D-133` item 3 of its unsettled; `D-134` item 2 |

**Every cell is a statement of a declared behaviour; none asserts an invocation ORDER among bodies, and the two `saveCall` timing cells read `NOT DRIVEN` until §5's wall is granted.**

---

## §7 · What this design does not settle

**Carried by name from the two `D`-rows' own open items, each marked, and nothing else claimed closed.**

1. **`O-1` — `BLOCKING` (the failure arm's log).** `D-145` item 2 requires the saver's `message[]` to ride in the `log`; the `LogEntry` kind set is closed at four and none fits (§4). Three arms, priced: **(i)** a fifth `LogKind` (`'save'`) — `kernel-foundations.mjs` + `index.d.ts`, two bytes outside this pair's set, and a declared census moves; **(ii)** the strings ride inside the kernel's ONE `outcome` entry's `message`, joined — no new byte, but item 2's list shape is defeated and the kernel's composition line edits one sentence; **(iii)** one entry per string carrying the `commit` kind — a contradiction of *"the attempt's SUCCESS arm, appended once"*, refused. **No cell asserting the messages in the log may go green until one is taken.**
2. **`O-2` — `PRICEABLE`.** `saveSucceeded`'s **already-saved** arm (`D-145` item 3 and item 3 of its unsettled; `D-146` item 3 of its unsettled). The design takes the ruling's own reading (idempotent `undefined`); one word reverses it and the once-per-record law's observable moves with it.
3. **`O-3` — `PRICEABLE`.** `SC-3`, the path-less writer's answer: *suppressed* is implemented as the package's abstention and the store moves no byte; a one-line early answer would remove §2(e)'s stray sibling. **`D-132` item 2 called `SC-3` a REQUIRED declaration and `D-133` item 3 gave it; the guard is the residual shape of the same question.**
4. **`O-4` — `PRICEABLE`.** The `saveCall` answer's validation: a runtime refusal (no member exists and none may be minted) versus the tolerant read (every non-`{success: true}` answer is a failed save). Priced, not chosen (§4).
5. **`O-5` — `BLOCKING` (the async arm only).** A thenable answer is in domain (`D-144` item 1's *"(async optional)"*) and a failed async save has **no route to the caller's answer inside this pair's write set**: `settledAnswer` cannot reject and `constraints.mjs:956` has no third arm (§5). One byte of `U-06`'s file is owed, or the architect narrows the domain to a synchronous answer — **a declaration this design may not make.**
6. **`O-6` — `PRICEABLE`.** A malformed op id at the two new entries answers `AddressMalformed` through the store's own classifier, where `commitFile` answers a hand-authored `JournalOpUnknown` (`facade.rs:1066`–`:1073`). The mirror is one word; the design prefers one classifier over two.
7. **`O-7` — `PRICEABLE` (a carried figure, corrected).** **The closed status set is TWENTY-THREE DECLARED and TWENTY-TWO IN `CODES`:** `src/error.rs:171` is `[&str; 22]` (its last two members are `ListenerBodyThrew` `:193` and `FileImageRefused` `:195`) and `index.d.ts:421`–`:444` lists twenty-two literals plus the escape arm — **rank `23` `ListenerBodyRejected` is USED at `delivery.mjs:431` and carried by neither array, which is `U-07 STATUS-23`'s byte.** This pair **widens rank `15` and mints nothing**, so the figures are unmoved by it either way.
8. **`O-8` — `PRICEABLE`.** Whether `exportImage`'s refusal crosses as rank `15` (taken, §2(b) arm A) or as `D-137` item 2's literal *"assertion"* (arm B, which re-opens `SC-R4`); **and `FileCommitFailed`'s `path` slot on an arm with no path** — `src/error.rs:460`–`:466` prints it twice and the widened sentence is a spec byte (`D-145` item 1 of its unsettled).
9. **`O-9` — `PRICEABLE`.** The **per-passing-op cost** of the caller's saver: `save_owed` is the store's predicate and has no entry, so the package invokes `saveCall` once per passing write's/delete's op, including ops that moved nothing at `Tier::File` — `N` backend writes for `N` passing acts, most carrying text identical to the last. The alternatives (an entry that answers `save_owed`, or a store-side last-exported comparison) are a member or a byte this pair does not mint.
10. **`O-10` — `PRICEABLE`.** The **reachability of both verdict entries on a `filePath` store** (§2(c), §2(e)): the addon's export set is not a published API (`docs/specs/storeroom-js/surface.md:1917`; `C-13`) and the package is the only caller — a Rust drive calling `saveSucceeded` on a `filePath` store would defeat the writer silently. No guard is taken; the guard is one line if the architect wants it.
11. **`SILENT`.** `D-137` item 3's redundancy rule (moot, §2(a)) · `D-145` item 5's backend hazard and item 6's release class (not this pair's) · `SE-*` and `VN-5` (`U-05`'s) · the channel's remains (dissolved by `D-149`).

---

## Envelope

**WHAT I READ:** the eight documents named in the head, and every `path:line` printed above was opened at this tree on this date. **WHAT I COULD NOT OPEN:** `src/json.rs` and `src/value.rs` — so *"`json::encode` emits exactly what `read_to_string` decoded"* is a carried assumption; `src/lib.rs` — the re-export of any new carrier type is SILENT; `tests/**` and `typecheck/**` — no cell figure and no suite count of mine is a run transcript. **`NOT DRIVEN`: every figure needing a build; `SC-9`'s redness; §2(e)'s stray sibling; the async arm's composed slot; `errorMessage('FileCommitFailed', …)`'s rendering with `path: None`.**

**THE THREE ACTS RISKIEST TO IMPLEMENT, in order.** **1 — the terminal arm's substitution for an `async` saver.** It threads a new suspension through a slot `U-06` built with *"one writer, one reader, `null` at every microtask boundary"* (`PIN-8`), and its failure has no route to the answer (`O-5`); the implementer will be tempted to (i) `await` inside `terminalArm` — which makes the arm's answer a promise the kernel discards at `kernel-attempt.mjs:550` — or (ii) let `settledAnswer` reject — which puts a `Promise` rejection in the failure form, the one thing `PIN-5` forbids. **Both are silently plausible and both are wrong.** **2 — the export's factoring.** `write_file`'s body is a three-act chain (`:1516` compose, `:1522` re-decode, `:1525`–`:1531` sibling+rename) whose first two acts are the export's whole; splitting it wrongly either loses the re-decode (`SC-R4` gone, and no cell can see it because the caller's image is the same bytes) or lets `export_image` reach the rename — a read that writes. **3 — `saveFailed`'s five steps without `commit_file`'s guards.** `:1602`–`:1607` reads `entry.home`, `entry.captured` and `entry.compacted` and mutates the journal, the graph and `last_seq`; an implementer who reuses `commit_file`'s head (the `save_owed`/`saved` gates) gets a failure that silently does not unwind, and one who forgets `restore_compaction` leaves the compression floor ahead of the replayed journal — an inconsistency no `read` shows and a later `rollback` does.

**THE ONE PLACE THESE TWO UNITS MAY COLLIDE WITH `U-06`'s LANDED SETTLE.** **`constraints.mjs:956`'s branch (`settle === null ? recordOut : settledAnswer(settle, recordOut)`) and its read-and-clear at `:862`–`:863`.** `U-06` owns both bytes and its `PIN-8` says the slot's lifetime is one synchronous span with `null` at every microtask boundary; the `saveCall` arm must put a NON-null, suspending value in that slot and must make its rejection into a refusal — a third arm at `:956` and a wider lifetime at `:862`. **The collision is structural, not textual: one slot carries two units' instants (the save and the delivery) and one `await` serves both.** The cheapest lawful shape: **one composed promise, its head the save and its tail the settle**, with the tail's third arm refusing at rank `15`; `PIN-8`'s *"one writer, one reader"* survives (the terminal arm writes once, the tail reads and clears once) and only its *"`null` at every microtask boundary"* clause needs re-pricing — **and that clause is `U-06`'s pin, so the re-price is `U-06`'s to grant and not this pair's to take.**

**THE DESIGN'S RISKIEST LINE, AND WHAT WOULD FALSIFY IT.** **"On the failure arm no body of the delivered set is started, so the save precedes the delivery on both arms by construction rather than by ordering."** Falsified by any driven state in which a `saveCall` answering `success: false` still reaches a listener body — which happens if the failing arm's throw is caught inside `terminalArm` (it must not be: the `try` at `:1174` wraps the substitution and the delivery stands outside it at `:1273`), or if a caller-supplied `saveCall` re-enters the store (`store.write` from inside the saver) and that nested write's own terminal arm delivers — a state `D-130` item 5's caller hazard names and no clause forbids. **The instrument: one cell, one `success: false` saver, one listener registered at the written address, and an invocation counter that must read `0`.**

---

## §8 · AMENDED `2026-11-17` — `D-153` takes both `BLOCKING` items, and the write set widens by three files

**Later than §1–§7 and superseding them where they meet.**

| `#` | what `D-153` decided | what it changes here |
|---|---|---|
| **1** | **`O-1` — ARM (i): a FIFTH `LogKind`, spelled `'save'`** | **§4's "no lawful seat" paragraph is superseded.** The saver's `message[]` rides as **one entry per string, in the commit's own list**, under a kind the set now carries. **The pair's write set gains `bindings/js/src/entry/kernel-foundations.mjs` and `bindings/js/index.d.ts`** — the kind's mint and its declaration — and no other file. **The census of `LogKind` moves `4 → 5`, and that is the one declared census this pair moves.** |
| **2** | **`O-5` — THE THIRD ARM** | **§5's *"an async save that fails has no route to the answer inside this file set"* is superseded.** `constraints.mjs`'s tail gains its third arm: **a settle that settles into a REFUSAL answers the refusal** — `FileCommitFailed` at rank `15` with the saver's messages as the fifth kind's entries. **The domain is NOT narrowed: a thenable answer stays in domain.** **`settledAnswer` still cannot reject** (`PIN-5`) — the refusal is a datum the settle resolves into, never a rejection. **This authorises the one byte `D-152`'s landed state did not.** |
| **3** | **the `PRICEABLE` list is untouched** | `O-2`, `O-3`, `O-4`, `O-6`, `O-8`, `O-9`, `O-10` stand exactly as §7 priced them. |

**And the pair's write set, stated in one line so a later pass cannot read it wider than it is:** `DurableWithoutPathArg` (`src/args.rs`) · the construction's third entry condition and the export/success/failure acts (`src/store.rs`) · the three entries and their crossing (`bindings/js/src/{facade,crossing,codec}.rs`) · **the `LogKind` fifth member (`kernel-foundations.mjs`)** · the package's `cfg`/arm acts (`frame.mjs`, `delivery.mjs`, **`constraints.mjs`'s tail — the third arm**), and `index.mjs`'s state slot · **the declaration's `LogKind` literal and `StoreConfig`'s key (`index.d.ts`)**. **Nothing else.**
