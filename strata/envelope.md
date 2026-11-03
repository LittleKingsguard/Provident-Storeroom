# Envelope — `U-STOREROOM-FILE-SAVE-COVERAGE` · L1 declaration of `α`, `β`, `γ` · 2026-11-02 · `1a0d252`+landing

## 1 · VERDICT

**`DECLARED`.** Three further arms, at `arms.md` (`PIN-15`–`PIN-17`), closing `D-106` item 2's *"without
exception"* over `α` and `γ` whole. **`β` lands as a DECLARATION correction, not a mechanism: its unregenerable
half is `OPEN-BY-RULING` under one question (`Q-2`, §7).** Figures read with `read`/`grep`, this date; no shell
here, so no leg was run.

## 2 · THE THREE ARMS

- **`α` — a constraint body that throws at the synthetic attempt's RE-RUN now composes the registration's
  rollback, closes its attempt and withdraws its row.** `bindings/js/src/entry/kernel-registration.mjs`
  `:660`–`:664` (compose+close, then re-throw), `:246`–`:253` (withdraw, re-throw), `:844`–`:846` (four refusing
  arms, not three); `bindings/js/src/entry/constraints.mjs` `:1337`–`:1343` (one sentence; `recorded` stays
  `false`).
- **`β` — the composition's floor is `PIN-14` (ii)'s own falsification.** `kernel-terminal.mjs` `:237`–`:240`
  (one clause: **both** floor codes fire), plus `PIN-14` (ii), `PIN-10` (iv)/(v), `PIN-13` (vi) corrected in
  place. **Zero behaviour bytes.**
- **`γ` — a lower-persistence write of a CONTAINER that purges a `file`-tier version owes a save.**
  `src/store.rs` `:1517`–`:1529` (`save_owed`'s second disjunct: cardinality → **departure**);
  `bindings/js/src/entry/delivery.mjs` `:779`–`:793` (the tier conjunct leaves the gate);
  `kernel-registration.mjs` `:503`–`:524`, `:938`–`:947` (the close names a purging landing).

## 3 · `α`'S CALLER-VISIBLE ANSWER, AND THE BODY-THROW RULE

**Rank `18` `ConstraintBodyThrew` on every arm — never the floor's token in `status`.** The `log` is the
synthetic attempt's list **carried by reference** (`markBodyThrow`), so a rollback code appears as **one
`outcome` entry, `state: null`** (`PIN-10` (iv)), in a list the crossing already carries. Bytes are made right
by the composition's own reversal; **this arm adds no save** (`D-107` item 2). **The body-throw rule is
unchanged**: the kernel marks, the entry's crossing alone converts, and the fix is a `catch` **beside** the
throw — it re-throws the value it received (`caught === thrown`), never re-marks, wraps or re-words, and a
frozen/sealed value still crosses through `markBodyThrow`'s carrier.

## 4 · `β`'S CURE CHOSEN AND ITS PRICE

**The regeneration the composition already inherits** (cure (ii)): the reversal's rebuild is `Store::rollback`'s
own arm, reached through the same entry `composeRollback` calls — **the finding is a declaration gap, not a code
gap.** Price: **one code clause, two corrected pins, zero behaviour bytes.** Cure (i) — *"refuse the landing
before it lands"* — is **refused and priced**: it needs a read-only store answer the tree lacks (minting an
addon entry; the `15` moves), it refuses lawful registrations for a store-wide condition, and it is not
knowable before the route's ops exist.

## 5 · `γ`'S GATE SUBSTITUTION AND THE SHADOW

**What leaves: the tier conjunct whole** (`answer.op.tier === 'file' || answer.op.tier === null`, `:792`, with
its clause at `:785`–`:791`); the four tests above it and the one `commitFile(record.op.opId)` stand, and **the
store's `save_owed` is asked directly.** **Not a second mechanism**: `save_owed` **is** the unit's ground; the
conjunct was a pre-filter approximating it (`PIN-4` (ii)'s own words) whose last sound class `γ` falsifies; and
the store's negative answer still writes nothing, so `PIN-6` (iii)'s controls stay green. **The shadow, stated**:
a lower-tier SCALAR write leaves the `file` version standing, moves nothing durable, **owes nothing**; a `mem`
**container** write at an address holding one **purges** it and **owes a save**.

## 6 · WRITE SET, CELLS, RELEASE CLASS

**`8` code positions inside the ten files already named; `5` prose positions inside the eight already named; no
path added or removed; `4` new cells and one block that turns** (`P-FSC-1`'s boundary block). New cells:
`FSC-ARM1-REFUSED-THREW`, `FSC-ARM1-REFUSED-COMPACTED`, `FSC-ARM0-CONTAINER-PURGE`,
`FSC-ARM1-MEM-CONTAINER`, two native departure cells, one unit cell for the close's candidate filter. Register:
`P-FSC-1` gains a limb (container-purge saving arm · scalar shadow silent control), `P-FSC-2` gains the class,
`P-FSC-3` gains `α`'s refusal arm, `P-FSC-4` unmoved — and **the register IS landed and green, so
`verification.md §4`'s "no landed home" is superseded.** **Release class `PATCH`; `1.9.1` stands**; no declared
surface moves, and the note owes three lines.

## 7 · QUESTIONS FOR THE ARCHITECT

**One — `Q-2`.** *What does a refusal do on the one state where the store's reversal cannot run at all* (a
compacted candidate set **and** a `filePath` image the loader refuses)? The landed edit stands there, and
`D-107` item 1's *"without exception"* gains an exception **this contract may not grant**. **(a)** grant it in
writing (no code, no cell turns; a false universal removed). **(b) — recommended** — the store's floor narrows
again: the reversal walks what it can reach and reports the compacted entries **unperformed** (`M-8`'s own
totality), which undoes the landing and **retires `RollbackCompacted`'s last producer** (price: the
`Q-1`-reading-(i) census turn, `M-6` moved a second time). **`§9.4` stays out — no arm's failed save needs it.**
