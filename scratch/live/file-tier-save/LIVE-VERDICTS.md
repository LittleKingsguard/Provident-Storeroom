# GATE 6 — LIVE BATTERY FOR THE `file`-TIER SAVE — verdict record

**ROLE.** `role_live_scenario_runner`. **LAYER OF EVERY ROW BELOW: `LIVE / ASSEMBLED PACKAGE`** — the BUILT
package entry `bindings/js/index.mjs`, the BUILT addon `bindings/js/build/Release/storeroom_js_binding.node`
(loaded only through the claimed entry, plus the addon's five exports for `FTS-10.2`–`FTS-10.4`), the
constraint kernel at its declared caller-side entry `bindings/js/src/constraint-kernel.mjs`, in Node
`v24.20.0`, over REAL files on a REAL filesystem. **`ENVELOPE/PURE` is a different layer and none of this
retires a node-green or vice versa.**

**THE RUN.** `node scratch/live/file-tier-save/live-file-tier-save.mjs` from the repository root.
**FIGURES AS FIRST EXECUTED: `91` cells = `77` PASS + `1` FAIL + `2` CONFLICT + `9` OBSERVED + `2` NOT DRIVABLE
LIVE, over `13` scenario blocks (`FTS-01`…`FTS-12` + this pass's second failing-save route `FTS-04b`), IDENTICAL
IN FOUR CONSECUTIVE RUNS, exit `1`.**

**⟶ RE-DERIVED AND RE-EXECUTED 2026-10-16 (`role_live_scenario_runner`, on the supervisor's re-run finding that
three of thirteen scenarios contradicted the SPEC rather than the build): THE EXECUTED FIGURES ARE NOW `95`
CELLS = `86` PASS + `9` OBSERVED + `0` FAIL + `0` CONFLICT + `0` NOT DRIVABLE LIVE, over the same `13` scenario
blocks, over `2` consecutive runs whose `95` `RESULT` lines are identical after run-path normalisation, exit `0`.
**EVERY ONE OF THESE FIGURES IS FROM THE EXECUTED RUNS `live-run-6.txt` / `live-run-7.txt`; the `91`/`77`/`1`/`2`
figures above stay as the as-filed record of the first execution and are NOT the current totals.** THE FIVE
RE-DERIVATIONS ARE ITEMISED AT `§5` BELOW, EACH WITH THE CLAUSE THAT SUPERSEDED THE OLD EXPECTATION.**
*The blind set's own declared figures were `89` cells = `75` PASS + `1` FAIL + `2` CONFLICT + `9` OBSERVED +
`2` NOT DRIVABLE. The two extra cells are `FTS-04b.1`/`FTS-04b.2` — this pass's own independent route to a
failing save, added so the one red is not read as an artefact of one event.*

**THE ARTIFACTS AS DRIVEN, WITH THEIR HASHES.**

| the artifact | its digest | its mtime |
| --- | --- | --- |
| `bindings/js/build/Release/storeroom_js_binding.node` | `b922a8b9632d08a81006627b0ea4450f7b0358e6123057daf90a494a7d17fbb7` | 2026-10-15 20:23:03 |
| `bindings/js/src/constraint-kernel.mjs` | `f101f068ef9bbbc2b6cf48e2092961374aeeac55098529490d403060fa541176` | 2026-10-15 **20:49:40** |
| `bindings/js/index.mjs` | `b30952d874fd73903dae8f80a494b9584e0a30a18b82517482eadd778f3d4f8a` | 2026-10-15 **20:49:05** |
| `bindings/js/greens/file-tier-save/scenarios.mjs` (the blind runner, NOT run by this pass) | `f7ef12c7acd36b57e31e5e0bddbb0d9e2e98a779105311bc4c8f3e7e8466b688` | 2026-10-15 20:38:41 |

**⟶ THE ARTIFACTS AS DRIVEN BY THE 2026-10-16 RE-EXECUTION — the three that moved are re-hashed here and the
entry's own mtime is LATER than every figure in the table above.**

| the artifact | its digest | its mtime |
| --- | --- | --- |
| `bindings/js/build/Release/storeroom_js_binding.node` | `b922a8b9632d08a81006627b0ea4450f7b0358e6123057daf90a494a7d17fbb7` | 2026-10-15 20:23:03 |
| `bindings/js/src/constraint-kernel.mjs` | `a3a3cc3bf0e5de8cd6b1a35951a1a2d5f0760c5642a7d22e505abecb0a919b28` | 2026-10-15 **21:08:24** |
| `bindings/js/index.mjs` | `e61a6734823baf4edd3ed8079c74b49ffd793cc55df4fc48f1397fc9b0a1cc59` | 2026-10-15 **22:41:16** |
| `scratch/live/file-tier-save/live-file-tier-save.mjs` (this battery's own driver) | `b355f679e06186c97ffeae72b5770da1b811a85677c9e97446659884b0843a50` | 2026-10-16 |

**AND THE ADDON IS CURRENT, CHECKED RATHER THAN ASSUMED: no file under `bindings/js/src/**` or `src/**` is newer
than `storeroom_js_binding.node` (20:23:03), so no rebuild is owed and the addon under this run is the addon
those Rust bytes built.**

**THE TIMELINE IS PART OF EVERY FINDING BELOW: the kernel and the entry were written AFTER the blind set's
bytes. The blind set's own record was measured against the pre-edit kernel; this battery is measured against
the tree as it stands.**

---

## §1. THE VERDICTS

`FTS-01` — **PASS** (7 cells). The terminal arm, driven end to end from the caller's own `storeCreate` +
kernel `register` + `commit` + `runAttempt`: the constraint body ran with the file reading `""` (the
construction's zero-byte image), the listener body ran with the file reading `{"c":42}`, ordinals exactly
`[["constraint",""],["listener","{\"c\":42}"]]`, one invocation with `["c"]`, `outcome="passed"`,
`rollback=[]`, and the durable image `{"c":42}` at
`scratch/live/file-tier-save/fs/run-*/c00/store.json`. **The order `constraints → save → listeners` holds.**
`FTS-02` — **PASS** (6). The refusal: bytes byte-identical to the pre-image `{"p":111}`, ZERO listener
invocations, thrown `{status:"KC-3",message:"refused by the application",log}`, `AddressNotFound` at `['e']`,
and the thrown log's `outcome` entry state `KC-3`. **No save on the refusing arm.**
`FTS-03` — **PASS** (3). A FRESH instance booted INSIDE the delivered body read `4242`; the image is
`{"c":4242}`. **The save precedes the first body.**
`FTS-04` — **PASS on every cell including `04.9`** (9 cells; the blind set's one FAIL does not reproduce — see
`§2` finding 1). Observed at the failing save: caught `{status:"FileCommitFailed",message:"'b' could not be
committed to '<the fixture path>', the file write failed at '<the fixture path>'"}`; bytes byte-identical to
`{"a":111}`; inside the caller's own `catch` `read ['b']` → `AddressNotFound` and `read ['a']` → `111` (rollback
FIRST); zero listener invocations; `#15` ≠ `#16`; `log` ended
`[["constraint-check",null,…],["commit",null,"every constraint registered at [\"b\"] passed; the commit
stands"],["outcome","KC-8","the per-op rollback met the store's own JournalOpUnknown at op-6"]]` and
`report.outcome="failed"` with `report.rollback` carrying one entry.
`FTS-04b` — **PASS** (2). The second, independent route (the image's place replaced by a DIRECTORY between
the construction and the save; the direct write into it fails): the same `FileCommitFailed`, the same
`["outcome","KC-8"]` entry, the same non-passing report. **The reporting behaviour is reproducible off two
independent events.**
`FTS-05` — **PASS** (4). A bare caller-made `file` write performed NO I/O (`image=""`); a `mem` write through
`commit`+`runAttempt` saved nothing and still delivered its listener; a `file` write through the kernel moved
`""` → `{"c":5}`; a re-drive was refused `KC-2` with the bytes standing at `{"c":6}`.
`FTS-06` — **PASS** (5). Four arguments proceed; `undefined` at position 5 is refused with
`TypeError: the write's fifth argument is undefined, and the commit position takes an object carrying a
\`pending\` member`, `status` ABSENT, no store call.
`FTS-07` — **PASS** (11). All eight outside classes and the `Proxy` refused; the plain `{pending: []}` proceeds.
`FTS-08` — **PASS** (22). All four legal forms make an instance with no `constraints` key in the register; all
twelve outside forms answer `ConstraintListInvalid` with no instance; the refused construction leaves no file
behind; `OBSERVED`: an empty-string `id` is refused, `[]` and `[0]` are admitted, a third member is ignored, a
fifth `cfg` key is ignored.
`FTS-09` — **PASS** (6) + **1 CONFLICT** (`09.5`) + 1 NOT DRIVABLE LIVE (`09.7`). The two-key image booted with
both keys loaded; `['zz']` and a malformed element each answered `ConstraintListInvalid`; the refused boot left
the image byte-identical; the two-byte `{}` image WAS refused.
`FTS-10` — **PASS** (4) + 1 OBSERVED (10.5). The addon's exports are exactly
`["call","errorMessage","register","storeCreate","version"]`; all sixteen codes render a
placeholder-free message; a name outside the set answers the outside-the-set sentence.
`FTS-11` — **FAIL** (11.1) with `11.2`–`11.4` PASS, `11.5` CONFLICT, `11.6` OBSERVED. See `§2` finding 3.
`FTS-12` — **PASS** (4). Instance members `["off","on","register","settle"]`; the module namespace exactly the
eight verbs; the kernel exactly its five items; `OBSERVED`: `kernel.register === PKG.listen` → `true`.

---

## §2. THE LIVE CONTRADICTIONS — EACH A FINDING

**(1) `FTS-04.9` IS GREEN LIVE AND WAS RED BLIND — THE FAILED SAVE IS NOW REPORTED.** The blind set's one
`FAIL` recorded an attempt whose `log` carried no `outcome` entry and whose `report()` answered
`outcome="passed"` with `rollback=[]`. **Driven live, on two independent routes and in four consecutive runs,
the same call reports its own failure** (`log`'s third entry `["outcome","KC-8"]`, `report.outcome="failed"`,
`report.rollback` non-empty). **Measured with the kernel at `f101f068…` (mtime 20:49:40), which is LATER than
the blind set's own bytes (20:38:41).** The blind red is not reproduced by this tree; **it is retired only by a
re-measurement of the set, not by this battery.** The residue that survives verbatim: **the `commit` entry
still reads *"every constraint registered at `["b"]` passed; the commit stands"* on a save that did not
stand** — a message that contradicts the record's own `outcome` entry and the caller's own catch.

**(2) THE SAVE'S OWN RECORD CARRIES A DIFFERENT TOKEN CLASS FROM THE THROWN FORM.** The thrown value's
`status` is the STORE's `FileCommitFailed` (and carries `{status,message}` only, no `log`), while the attempt's
`outcome` entry carries the KERNEL's `KC-8`, whose message names the store's own `JournalOpUnknown`. Read
against `fail-surface.md §2`'s `KC-8` row this is the DECLARED reading (*"where a recorded throwing step's
`answer` carries a store code that is NEITHER, this member is still the kernel's own answer and that code is
named in the message"*), so it is **not scored red** — it is reported because the kernel's `THROWS` clause
(`kernel-surface.md §2.1` item 3) ties the `outcome` entry's `state` to *"the `KC` token the form's `status`
carries"*, and here no `status` carries any `KC` token at all on the caller's side. **A doc-side tension for
the supervisor, not a package defect.**

**(3) `FTS-11.1` IS RED LIVE — THE `RepairContext` NOW CARRIES A SIXTH MEMBER, `pending`, AND IS THEREFORE
LAWFUL AT THE FIFTH POSITION.** Live, the context a repair is handed has
`Object.getOwnPropertyNames(rc).sort().join(',') === "address,id,op,pending,tier,value"` with
`rc.pending = [{}]` (a one-entry array). The blind set recorded the five-member set and `rc.pending`
`undefined`. **Consequence, driven: `FTS-11.5`'s CONFLICT is LIVE-DISSOLVED — `PKG.write(s, ['c'], 'file', 10,
rc)` with the context AS THE KERNEL HANDED IT proceeds (`"op-4"`), while the five-member literal
`{op,address,id,value,tier}` is REFUSED (`TypeError … takes an object carrying a \`pending\` member`).**
**So the clause's own route is reachable live: the repair's write lands as a second op in the SAME commit**
(`ops = [["op-1",["c"]],["op-2",["c"]]]`), the log carries `repair-run` and a second `constraint-check`, and
the terminal arm's save lands the repaired image `{"c":10}` — with the listener firing twice, **first with the
file reading `""` and then with `{"c":10}`**. The five-member literal being refused is no longer a
documentation conflict: `kernel-surface.md §1` item 5 (dated) declares *"`RepairContext`'s member count at
`§1` item 4 is `6` FROM THIS DATE — `5 + 1 = 6` ✓, the sixth member `pending: Handle[]`"*. **The blind set's
`11.1` expectation and its `11.5` conflict are both stale against the tree; the live set is red where the
blind set was green and green where the blind set was red — the SAME finding from two sides, and it is a
BLIND-vs-LIVE divergence to be ruled on, not a live regression this battery can adjudicate.**

**(4) `FTS-09.5` REPRODUCES LIVE, UNCHANGED.** A zero-byte image (what the construction leaves over a fresh
path) against a supplied non-empty list still answers an INSTANCE with no validation; a two-byte `{}` against
the same list IS refused. **The exemption is keyed on the file's bytes.** The doc-versus-doc disagreement the
blind set named stands.

**(5) THE SPEC'S `OPEN` WIDER CLASS IS DRIVEN AND FOUND ADMITTING, NOT REFUSING.** `surface.md §2.4` item 9 (g)
item 2 leaves open the class of *"an object carrying `pending` that this instance was never handed by the
kernel"*. Live: `{ pending: [<a handle minted by another instance>] }` and `{ pending: [{ notAHandle: true }] }`
both PROCEED. **Recorded as an observation of what the boundary does where the spec is silent** — the reading
the blind set could not reach.

**(6) ONE MORE OBSERVATION, NAMED SO IT IS NOT READ AS A CONFLICT.** `FTS-05.4`: a re-drive of a settled record
is refused by the KERNEL (`KC-2`, *"no open constraint attempt answers to attempt-N"*) before any second save
is attempted, so the store's own once-per-record guard is not reached on this route; the bytes stand either
way. And the `commit` entry that names the repair's opId (`op-4`) while the ops list carries both `op-3` and
`op-4` is the log's own residue, recorded and not asserted.

---

## §3. THE UI PREDICATE, AND THE PARKS

**THE MECHANICAL `dom-shim`-BLINDNESS / UI-OVERHAUL PREDICATE DOES NOT TRIGGER — AND IT CANNOT BE EVALUATED
MECHANICALLY IN THIS REPOSITORY.** `docs/specs/user-flow-audit.md` **does not exist** (`0` files match
`*user-flow*` anywhere in the tree, `docs/**` included — re-checked by this pass), so `§7.1`'s predicate, the
`§5.U` matrix, the `§6.1` coverage report and the `§6.2` audit have no home here. **This agrees with the
gate-6 record already on file** (`archive/gate6/storeroom-js-live-determination.md` `§10.7` item 5, `§11.7`
item 4, `§12.7` item 6: *"the user-flow-audit duty does not fire"*). Substantively, nothing in the driven
change set is a UI-overhaul / UI-rendering row: this battery drove a store, a kernel and a file, and drove
**no rendered surface at all**; `scripts/live-drive.mjs` does not exist here (`scripts/` carries `publish.sh`
alone) and no display or DOM driver is present. **No `§5.U` delta-matrix and no `§6.1` report are emitted, and
none is owed; `§6.2` is not owed either.**

**PARKS — the two `NOT DRIVABLE LIVE` cells, each with its reason, each `OPEN`, neither green:**
- **`FTS-07.11`** — `surface.md §2.4` item 9 (g) item 2: the specification declares the row `OPEN` by its own
  words, so no run's value can be a pass. (This pass DID drive the class as an observation — `§2` finding 5.)
- **`FTS-09.7`** — `contract.md §7.2` item 6 as amended names *"the loaded state no longer satisfies the
  supplied list"* and never fixes the predicate; an address-presence reading and a key-coverage reading both
  fit the words and differ on an image carrying a key the list does not name. A spec-side open row.
- **CLOSED AS EXERCISABLE, for the record:** the `chmod 0o555` parent-withdrawal event for a failing save is
  drivable in this environment (`uid=1000`; the direct write into the withdrawn directory was DENIED, probed
  before the drive) — so **no park was taken there**, and the second route (`FTS-04b`, the directory-valued
  image path) was driven as well.

---

## §4. WHAT THIS PASS WROTE

`scratch/live/file-tier-save/live-file-tier-save.mjs` (the live battery), `live-run-2.txt`…`live-run-5.txt`
(the four identical transcripts; `live-run-1.txt` is a superseded interleaved run and is kept only as
provenance), `live-probe-fts04-fts11.mjs` + `live-probe-run-1.txt`, `live-probe-join-and-fifth.mjs` +
`live-probe-run-2.txt`, `LIVE-VERDICTS.md` (this record), and the fixtures themselves under
`scratch/live/file-tier-save/fs/` — **left in place as evidence of the bytes on disk.** **No spec, test,
implementation, tracker, greens, `src/**`, `bindings/js/index.mjs`, `bindings/js/src/**`,
`bindings/js/test/**`, `bindings/js/greens/**`, `docs/**` or `archive/**` byte was written or edited by this
pass.** The blind runner `bindings/js/greens/file-tier-save/scenarios.mjs` was **read as the script of this
battery and was NOT run**; its cells were re-driven in this pass's own runner.

---

## §5. THE 2026-10-16 RE-DERIVATION PASS — each stale expectation, the clause that superseded it, and the executed verdict

**WHY THIS PASS RAN.** The supervisor's re-run against the settled tree reproduced `91`/`77`/`1`/`2` — and
established that three of the thirteen scenario verdicts contradicted the SPEC rather than the build: the
driver's cells had been written BEFORE the sixth `RepairContext` member, the re-spelled fifth-position law, the
`commit`-entry ordering clause and the load-predicate spelling landed. **THE WHOLE DRIVER WAS SWEPT; the FIVE
expectations below were superseded and each is re-derived to its clause. NOT ONE CELL WAS RETARGETED SILENTLY,
and no cell was deleted: five cells were re-derived in place and four were ADDED (`FTS-01.8`, `FTS-11.6`,
`FTS-11.7`, `FTS-09.8`) so the new law is asserted rather than only described.**

| cell (as filed) | the superseded expectation | the clause that supersedes it | re-derived to | executed |
| --- | --- | --- | --- | --- |
| `FTS-11.1` | the repair context carries *"exactly the FIVE declared members"*, `members=["address,id,op,tier,value"]` | `kernel-surface.md §2.3` item 2 as dated **2026-10-15** — the SIXTH member `pending: Handle[]` — with `§1` item 4's `5 + 1 = 6` ✓ and `parameter-semantics.md §2.16`'s re-derived `domain` cell | six members, `pending` among them | **PASS** — `members=["address,id,op,pending,tier,value"]`, `rc.pending` an array of `1` |
| `FTS-11.5` | built **its own five-member literal** and offered THAT at the fifth position, then scored the refusal as a CONFLICT | `surface.md §2.4` item 9 (g) item 1 **AS RULED 2026-10-16** (`docs/decisions.md` · `A120` (1): the position ADMITS any value carrying a `pending` member) read with `§2.11` clause 6 | the KERNEL-HANDED CONTEXT ITSELF, offered at the fifth position, and the join driven by the repair's own write | **PASS** — the handed context PROCEEDED (`op-20`), `object{address,id,op,pending,tier,value}` |
| `FTS-09.5` | scored CONFLICT: `parameter-semantics.md §2.21` read without a length qualifier against `§7.2` item 6's zero-length clause | **`storeroom-native/contract.md §7.2` items 3–4 (ADDED 2026-10-16)** — the exemption keyed on the FILE'S BYTES — with `§2.21`'s observable **AS RECONCILED 2026-10-16** (*"a boot over an existing, NON-ZERO-LENGTH `cfg.filePath`"*) and `A119` | the zero-byte file boots an INSTANCE, register `{}`, file still `0` bytes | **PASS** — the two clauses that met at this class now agree in their own bytes |
| `FTS-07.11` | `NOT DRIVABLE LIVE` — *"this row is declared OPEN by the spec itself"* | `surface.md §2.4` item 9 (g) item 1 as ruled 2026-10-16 (`A120` (1)), whose own clause **lifts the bar by name** (*"NO DRIVE MAY ASSERT THIS ROW"* is withdrawn) | the wider class driven: a foreign instance's handle, and a member that is not a handle at all | **PASS** — both PROCEEDED (`op-16`, `op-17`) |
| `FTS-09.7` | `NOT DRIVABLE LIVE` — *"'satisfies' is spelled nowhere"* | **`contract.md §7.2` item 1 (ADDED 2026-10-16)** — the ADDRESS-PRESENCE reading, with the differing state decided (`A119`) | a loaded key no supplied pair names boots (resolution required, coverage not) | **PASS** — register `{"named":1,"other":2}` |
| `FTS-04.9` / `FTS-04b.2` | read the failing arm's log and asserted NO ordering clause; the pre-fix build's log carried a `commit` entry BEFORE the `outcome` entry and both cells still passed | `kernel-surface.md §2.1` item 3's `LogKind` table **AS AMENDED 2026-10-16** — *"the failing arm carries the one `outcome` entry and **NO** `commit` entry at all"* — and `§2.5` item 1's ordering clause (the `commit` entry appended after the save has stood, exactly once and last) | both cells now also assert `commit entries = 0` | **PASS** — `commit entries=0` on both routes; `FTS-01.8` (added) pins the passing arm's entry exactly once and last |

**THE FIVE ADDED CELLS, so the new law is ASSERTED and not merely described:** `FTS-01.8` (the passing arm's
`commit` entry exactly once, last, and carrying the attempt's last op — `["constraint-check","commit"]`,
`opId=op-1` for `last op=op-1`); `FTS-11.6` (the discriminating half on the SAME object: the handed context
stripped of `pending` is REFUSED — `object{op,address,id,value,tier}` → `TypeError: … takes an object carrying a
pending member`); `FTS-11.7` (the join read off the identity the 2026-10-16 discriminator clause names — the op
the repair RETURNED is the commit's own second entry: returned `op-21`, `ops=["op-20","op-21"]`); `FTS-09.8`
(the same image with one supplied address unresolved → `ConstraintListInvalid`, so `FTS-09.7` is discriminating
and not vacuous).

**NOTHING WAS FOUND THAT CONTRADICTS THE BUILD.** Every re-derived expectation is answered by the tree as it
stands, and the `2` cells that were `NOT DRIVABLE LIVE` are both DRIVEN here — so the `FAIL`/`CONFLICT`/park
columns of the as-filed record are now empty because each was a stale expectation, not because a cell was
softened. **THE ONE THING THIS PASS DID NOT SETTLE, AND DOES NOT CLAIM TO:** the two clause-tension rows the
supervisor reserved — `FTS-11.5`'s (now law per `A120` (1)) and `FTS-09.5`'s (now reconciled at `§7.2` items 3–4
and `§2.21`'s own amendment) — were settled by the SPEC PASSES' own bytes, which this pass READ and did not
author; the supervisor's *"not yours to settle"* reservation on `§2.21`/`§7.2` item 6 stands as the record of
that reservation, and no byte of `docs/**` was touched here to make the two cells pass.

**THE TOTALS AS EXECUTED, ONE LINE, AND THEIR PROVENANCE:** `live-run-6.txt` and `live-run-7.txt` (both exit `0`,
`95` cells, `86` PASS, `9` OBSERVED, `0` FAIL, `0` CONFLICT, `0` NOT DRIVABLE, all `13` scenarios `PASS`); the two
runs' `RESULT` lines are identical after run-path normalisation. **`live-run-pass0-original.txt`** is the
pre-edit driver's own run on this tree (exit `1`, `91` cells, the old `1` FAIL + `2` CONFLICT) and is kept as the
before→after evidence, together with the pre-edit driver's own driver file kept under the name
`live-file-tier-save.prepass1.mjs`. **⟶ AND THAT PRE-EDIT DRIVER FILE WAS REMOVED LATER IN THIS SAME PASS, ON
THE RECORD: `live-run-pass0-original.txt` already carries its whole executed output, its own text records which
driver produced it, and two identical copies of the battery in one directory invited a later run to load the
stale one. NOTHING ELSE WAS REMOVED AND NO BYTE OF THE CURRENT DRIVER'S OWN RECORD MOVED.** **NO spec, test,
implementation, tracker, greens, `src/**`, `bindings/js/index.mjs`, `bindings/js/src/**`,
`bindings/js/test/**`, `bindings/js/greens/**`, `docs/**` or `archive/**` byte was written or edited by this
pass: every byte written by it stands under `scratch/live/file-tier-save/`.**
