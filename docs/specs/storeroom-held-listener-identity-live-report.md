# LIVE REPORT — the constraints/toggle surface after `DEF-2026-10-20-F`, driven at the ASSEMBLED/PERSISTED layer over REAL stores on REAL disk

**THE SUBJECT.** The architect's ruling on `DEF-2026-10-20-F` — *"Remove the register half, `constraintOff` removes
the constraint"* — as it now stands in `bindings/js/index.mjs`: `constraintOff`'s enabled arm **purges only**
(`remove`, `entry.enabled = false`, the state-row `set`), with **no `register` loop and no `try`/`catch`**;
`constraintOn`'s own purge line **removed** (its bracket, its `entry.fn` add and its refusal wake unchanged); and the
two further held-pair purge sites — `addConstraint`'s overwrite arm and `removeConstraint`, both at a **disabled**
pair — routed through the new helper **`withdrawStanding`** (*purge only where a registration stands*). **The node
layer was green when this pass began. This report is the ASSEMBLED/PERSISTED layer's answer: the layer that had not
been driven since the change, on the path where the disable verb's effect is DURABLE STATE.**

**THE SCENARIO SOURCE.** The six items of the handoff (a constraint that refuses → disabled → a write that must be
ADMITTED; the count seam around the toggle; a disabled pair still carried and enumerated; the identity across the
cycle; the cycle not throwing; the two further held-pair purge sites). **There is no `*-greens.md` set for this
change** — `U-STOREROOM-HELD-LISTENER-IDENTITY`'s blind set (`docs/specs/storeroom-held-listener-identity-greens.md`)
is an **`ENVELOPE/PURE`** set that declares *"THE ASSEMBLED/`APP` LAYER FOR THIS CHANGE IS `NONE`, NO `APP`-GREEN IS
CLAIMED"* — so every cell below is authored **from the handoff and from the clauses the handoff's six items rest on**,
and every table row prints those clauses. `RCA-12`'s distinction is kept whole: **this file claims a `LIVE/ASSEMBLED`
result and no `APP`-green.**

**THE RUNNER.** `scratch/def-f-live/assembled-toggle-drive.mjs` — `37` cells, each with its own start point, its own
settled end point and its own evidence object; the full machine-readable output is
`scratch/def-f-live/assembled-toggle-out.json` and its section generator is
`scratch/def-f-live/make-report-sections.mjs`. **RUN, from the repository root:
`node scratch/def-f-live/assembled-toggle-drive.mjs`.**

**THE SURFACE DRIVEN, NAMED ONCE.** The package's claimed ESM entry `bindings/js/index.mjs`, imported **by its own
path** as a consumer imports it, which resolves the **real built native addon** module-relatively; the caller-facing
members the cells need (`write` · `read` · `listen` · `register` · `unlisten` · `addConstraint` · `constraintOn` ·
`constraintOff` · `constraints` · `removeConstraint`); the **declared count seam** of
`docs/specs/storeroom-addon-adoption/finalizer-and-teardown.md §4.2` (two `Symbol.for` channels on the store
instance); and **one kernel-layer control at `S5.2`, labelled as such**, which reaches
`bindings/js/src/constraint-kernel.mjs`'s `K-6 remove` to prove that the `KC-2` refusal the toggle must not reach is
still reachable where it should be. **Every store is a REAL store on REAL disk** (`cfg.filePath` inside an
`fs.mkdtempSync` directory under the platform temp root), and every durable claim is read off **the file's own bytes**
and **a FRESH instance reopened over the same `store.json`**.

**THE RUN FIGURE.** `37` cells · **`35` PASS · `0` FAIL · `1` OBSERVED · `1` FINDING**, **three consecutive runs with
byte-identical cell verdicts and byte-identical cell readings** (`RUN-2` and `RUN-3` are diffed against `RUN-1` on the
cell set, the observations, the restore proof and the addon's identity; the only differences are timestamps and temp
paths). **EXIT `0`.** The single `FINDING` is `S3.6` and the single `OBSERVED` is `S2.7` — **both are recorded below
at their cells, neither is a failure of `DEF-2026-10-20-F`, and neither is silenced.**

**NO REPAIR WAS MADE — and the bytes this pass wrote inside the repository are named at `§11`.** No byte of `src/**`,
`bindings/js/index.mjs`, `bindings/js/src/**`, any test file under `bindings/js/test/**`, the four trackers, or
`archive/**` was edited by this pass.

---

## §0. THE LAYER CLAIM — `LIVE/ASSEMBLED`, stated so no figure below is read as more than it is

**A. WHAT THIS REACH IS.** The checkout's entry module and the checkout's built native addon, in process, over real
files on a real disk. **It is evidence about THIS CHECKOUT.** It is not a published-package green, and it retires no
`ENVELOPE`, `NODE` or `TRIO` row.

**B. THE ARTEFACT THE RUN ACTUALLY LOADED, AND ITS MTIME AGAINST THE SOURCE EDITS — because an assembled green over
a STALE native artefact is not a green at all.**

| Reading | Value |
| --- | --- |
| the addon | `bindings/js/build/Release/storeroom_js_binding.node` · `1,370,856` B · md5 `bd9fbc5eed81c4e6e8a983b31fffa8a3` |
| the addon's mtime | **`2026-10-24 23:01:58.780 -0500`** |
| the path this process actually MAPPED (`/proc/self/maps`) | the same file, printed by the run |
| the newest SOURCE EDIT | **`bindings/js/index.mjs`, `2026-10-24 23:01:50.173 -0500`** |
| the addon minus that edit | **`+8.607` s — the built artefact POSTDATES the landing** |
| the newest Rust source edit | `src/error.rs`, `2026-10-24 17:27:56.433 -0500` — the addon postdates it by ~5 h 34 m |
| the kernel module | `bindings/js/src/constraint-kernel.mjs`, `2026-10-24 22:34:34.174 -0500` — postdated by the addon |

**So there is NO staleness to discount:** the JavaScript layer is imported by its own path (there is no build step
between the edit and the drive), and the native artefact the run mapped was rebuilt **after** every source edit in
the tree. **The run prints this evidence itself** (`S0.1`) rather than asserting it in prose.

**B-bis. THE SPEC SIDE HAS RECORDED THE LANDING — and two of its own claims are INDEPENDENTLY CONFIRMED here.**
`docs/specs/storeroom-js/surface.md §2.12` item 3 carries an amendment dated **2026-10-25** that states the ruling
verbatim (*"Remove the register half, `constraintOff` removes the constraint"*) and reads the clause above
*"BYTE-FOR-BYTE … THROUGH this clause"* (`RCA-8(g)`). **Its two checkable claims and this run's measurement of them:**

* *"`constraintOff`'s arm is `remove`-only (`bindings/js/index.mjs:4113-4173`, measured)"* — **CONFIRMED by
  `S2.3` at the two acts it instruments:** during one disable `listen` and `register` are each reached **`0`** times
  (while the same pair's enable reaches `2` and `2`), so **the arm stands no store-side registration at either
  address** — which is the whole of what *"remove-only"* denies. **The other half of the word is a READ of the
  landed module and not a measurement here:** the arm's only kernel call is `remove` (`:4156`).
* *"the kernel holds no row there, and `constraintParked` (`:5514`) is the element the pair's REGISTRY RECORD
  carries for enumeration, registered as a store listener only at `restoreHeldPair`'s refusal wake (`:5597`)"* —
  **CONFIRMED at its observable end:** a disabled pair enumerates as `{address, id}` with **no store-side listener
  anywhere** (`S3.8`'s member set, `S2.3`'s `register=0`), which is why a caller's `register` at that address is
  refused in the disabled polarity TOO (`S2.6`)  — **and the ground of that refusal is named exactly, because it is
  NOT a kernel row:** `registerOn`'s conflict test reads **`constraintAtAnyAddress(state, handle)`
  (`bindings/js/index.mjs:4921`'s `const conflicted = …` line, over the definition at `:4999`), which walks the package's own READ MODEL
  (`state.constraints`) and never the kernel**, so the refusal is **polarity-blind by construction** (`S2.6`: the
  same `TypeError`, `status` absent, `log: []`, in both polarities) and it is no evidence that a kernel row stands
  there. **The same reading is why the refusal wake — the only site that puts a function back — has nothing to wake
  for on the disable arm** (`§10.A` (i)).

**What the amendment does NOT do, and this pass did not do either:** it edits no clause's substance, and it does not
move `docs/defects.md` or `docs/pending.md` — see `O-1` at `§10.C`.

**C. THE NODE LAYER'S OWN FIGURE, RE-MEASURED RATHER THAN ACCEPTED.** `node --test bindings/js/test/*.test.mjs`:
**`851` tests · `850` pass · `0` fail · `1` skip** — the handoff's figure exactly. **One caveat, recorded because a
first run printed a different figure and the difference is not this unit's:** the FIRST full run of this pass read
`849` pass · `1` fail · `1` skip, the failure being `P-PUB-7::S-MANIFEST no secret, token or credential is written
into a tracked byte` with `ENOENT … bindings/js/test/.jc-tc-60-qzJmvQ/drive.mjs`. **That is a pre-existing order race
and not a regression:** `publish.test.mjs:2290`'s tracked-tree walk reads every file under `bindings/js` at test
time, while `json-crossing.test.mjs` **creates and removes four `.jc-tc-*` directories INSIDE `bindings/js/test/`**
during the same run (`:1754` · `:2363` · `:2870` · `:5061` — the failing `ENOENT` names the `.jc-tc-60-*` one at
`:2363`); `publish.test.mjs` alone is **`64`/`64` pass**, and a second full run is `850`/`0`/`1`. **It is reported, not
worked around: no test file was touched.**

**D. THE `P-ADA-5` WALK — the cell `DEF-2026-10-20-F`'s own row called *"RED and must stay red"* — IS GREEN.**
`ada_pada5_s_commit_open_every_bracketing_verb_moves_the_count_and_every_other_does_not` passes in both full runs.
**That is the node-side counterpart of `S2.1`–`S2.3` below, and the two layers agree on it.**

**E. THE UNIT'S OWN BLIND SET, RE-RUN AT THIS TREE (read-only evidence, `§10` names why it is safe).**
`node bindings/js/greens/held-listener-identity-greens.mjs`: **`174` authored · `174` executed · `174` PASS · `0`
FAIL**, `14` scenarios, all fourteen `0` FAIL. **The set's one standing FAIL — `HLI-13.1`, which asserted the kernel
module's export set closes at SIX names — now PASSES, and the greens' `F-1` (*"the kernel module's own export set
carries a seventh name, and no clause of the corpus names it"*, recorded `OPEN`) is RESOLVED at the live tree:** the
export set measured here is exactly **`[commit, log, register, remove, report, runAttempt]` — `6` names, no
`isKernelHandle`** (`S0.2`).

**F. `ENVELOPE`/`NODE` ARE NOT `ASSEMBLED`.** Nothing in this file is evidence that the pure modules are correct; it
is evidence that the **product a consumer reaches** behaves as the clauses say **at the state a real store settles
to**. Where the two disagree, the disagreement is printed as a `FINDING` (`S3.6`) rather than folded into a pass.

---

## §1. ITEM 1 — a constraint that REFUSES, is DISABLED, ADMITS a write (durably), is RE-ENABLED, and REFUSES again

**The fixture, stated once.** A real store at `<tmp>/item1-N/store.json` (`journalLength: 32`), a baseline
`file`-tier write at `['keep']`, and one pair `{ address: [['g']], id: 'g1' }` whose body **passes at the
registration-time evaluation** (`{tier: null, op: null}` — `docs/specs/storeroom-native/contract.md §7.3` (b)
state 1, `A135` (3)) and **refuses only the value `'bad'` at a landing**, with the message
`the value "bad" is outside this pair's domain`.

| Cell | Scenario | Start point | Settled end point | Verdict |
| --- | --- | --- | --- | --- |
| `S1.1` | item 1 · the fixture is a real store on a real disk path | an empty temp directory | the construction has performed its own exclusive create (an EMPTY file, no byte: `storeroom-native/contract.md` DD-28 amended), and a baseline `file`-tier write lands | **PASS** |
| `S1.2` | item 1 · the pair is CARRIED at the address the write will be refused at | the fixture above | the entry carries one pair whose `address` is the whole set `[['g']]`, and `addConstraint` answered an opaque identity | **PASS** |
| `S1.3` | item 1 · a write the pair refuses is REFUSED, with its class/status/positions/subject, and NO byte moves | the pair carried at ['g'] and a standing image carrying keep='K' | the write throws the surface's single three-member form; the image is BYTE-IDENTICAL; nothing landed | **PASS** |
| `S1.4` | item 1 · while ENABLED, an admitted write lands durably | the pair carried and the image carrying keep='K' | the write returns the WriteResult and the image carries `g='ok1'` | **PASS** |
| `S1.5` | item 1 · `constraintOff` answers undefined, keeps the pair CARRIED, and performs NO file I/O | the pair ENABLED and the image carrying g='ok1' | undefined returned; `constraints()` unmoved; the image BYTE-IDENTICAL; the read channel answers 0 | **PASS** |
| `S1.6` | item 1 · the SAME write at the DISABLED pair is ADMITTED, and it is DURABLE | the pair DISABLED (the disable arm's remove-only path) and the image carrying g='ok1' | the write returns; the pair's body runs ZERO times; the image carries `g='bad'` | **PASS** |
| `S1.7` | item 1 · a FRESH INSTANCE over the same store.json reads the admitted value (the image carries no pair) | the image carrying g='bad', keep='K' | the fresh boot reads `g='bad'` and the whole register; its `constraints()` is `[]` — the image carries values only, so a pair's boot route is `cfg.constraints` | **PASS** |
| `S1.8` | item 1 · a FRESH INSTANCE booted WITH `cfg.constraints` carries the pair and refuses the same write | the same image, plus `cfg.constraints` naming the pair (the declared construction route) | the boot carries the pair at its whole address set; writing `bad` is refused with the SAME form; the image is unchanged | **PASS** |
| `S1.9` | item 1 · `constraintOn` re-enables the pair, and the write is REFUSED again — with its declared class/status/positions/subject | the pair DISABLED, the image carrying g='bad' | `constraintOn` answers undefined; the next `bad` write throws {status:"FileCommitFailed", message:<pair's own>, log:[constraint-check g1 null, outcome KC-3]}; the image is byte-identical; the body runs for the refusal | **PASS** |
| `S1.10` | item 1 · THE SETTLED END STATE: a fresh boot over the same store.json reaches the same state | the image carrying g='bad', keep='K' | a fresh instance booted with `cfg.constraints` reads the same register and refuses the same write identically | **PASS** |

### §1.1 the measured reading of each cell

* **`S1.1` — PASS.** bytes@create=0B · bytes@baseline="{\"keep\":\"K\"}" · WriteResult members=["op","triggered","watched"]
* **`S1.2` — PASS.** identity typeof=object · constraints()=[{"address":[["g"]],"id":"g1"}] · bodyRuns=["registration"]
* **`S1.3` — PASS.** class=plain-object(not Error) status="FileCommitFailed" positions=[1/constraint-check/id:"g1"/state:null | 2/outcome/id:null/state:"KC-3"] message="the value \"bad\" is outside this pair's domain" · image byte-identical=true
* **`S1.4` — PASS.** image={"g":"ok1","keep":"K"} · bodyRuns=["registration","landing:\"bad\"","landing:\"ok1\""]
* **`S1.5` — PASS.** returned=undefined opened=0 channel=0->0 constraints()=[{"address":[["g"]],"id":"g1"}] image-identical=true
* **`S1.6` — PASS.** admitted=true bodyRuns=3->3 image={"g":"bad","keep":"K"}
* **`S1.7` — PASS.** read(['g'])="bad" read([])={"g":"bad","keep":"K"} constraints()=[] (the pair is NOT in the image)
* **`S1.8` — PASS.** constraints()=[{"address":[["g"]],"id":"g1"}] status="FileCommitFailed" positions=[1/constraint-check/id:"g1"/state:null | 2/outcome/id:null/state:"KC-3"] image-identical=true
* **`S1.9` — PASS.** constraintOn=undefined · status="FileCommitFailed" positions=[1/constraint-check/id:"g1"/state:null | 2/outcome/id:null/state:"KC-3"] message="the value \"bad\" is outside this pair's domain" image-identical=true bodyRuns=4->5
* **`S1.10` — PASS.** register={"g":"bad","keep":"K"} image={"g":"bad","keep":"K"} refusal="FileCommitFailed"/"the value \"bad\" is outside this pair's domain"

### §1.2 the four readings the handoff asks for, as measured

* **CLASS.** A constraint-refused write at this surface throws a **PLAIN OBJECT, not an `Error`** — own member set
  exactly `["log","message","status"]`, `constructor === Object`, `instanceof Error === false`. That is the surface's
  single declared three-member failure form (`docs/specs/storeroom-js/surface.md §2.5` items 4 and 9).
* **STATUS.** **`FileCommitFailed`** — the file tier's commit refusal (`docs/specs/storeroom-native/contract.md §8.1`
  `#15`; `DD-25`). **Reported as measured, with the greens' own standing note kept visible:** the greens' `§3.3`
  recorded that *no clause fixes this status for a constraint-refused write*, so the cell asserts the three-member
  form, the non-empty generated message and the two log positions, and **records** the status the store actually
  answers. It is the same status before the disable (`S1.3`), at a fresh boot (`S1.8`) and after the re-enable
  (`S1.9`) — **the landing's status does not move with the toggle.**
* **POSITION.** The log's two entries at their declared positions, both carrying the refused op's own `opId`:
  `1/constraint-check/id:"g1"/state:null` and `2/outcome/id:null/state:"KC-3"` (`docs/specs/storeroom-constraints/
  kernel-surface.md §2.5` items 1–3; `fail-surface.md §1.1` item 3). **No argument position is named by the refusal**
  — the store's form carries no position member, and this pass does not invent one.
* **SUBJECT.** `message` is the pair's **own message, verbatim** (`the value "bad" is outside this pair's domain`),
  never a re-spelling and never a minted code (`DD-52`).

### §1.3 the durable bytes at each step

| Step | `store.json`'s own bytes |
| --- | --- |
| after the construction | `''` (an empty file, no byte — `DD-28` amended, the construction's exclusive create) |
| after the baseline write | `{"keep":"K"}` |
| after the REFUSED write (pair enabled) | `{"keep":"K"}` — **byte-identical to the pre-write bytes** (§2.11 clause 4 (i)) |
| after the ADMITTED write (pair enabled) | `{"g":"ok1","keep":"K"}` |
| after `constraintOff` | `{"g":"ok1","keep":"K"}` — **byte-identical** (the disable performs no file I/O) |
| after the write at the DISABLED pair | `{"g":"bad","keep":"K"}` — **the write the pair used to refuse is DURABLE** |
| after `constraintOn` + the REFUSED write | `{"g":"bad","keep":"K"}` — **byte-identical** |
| a fresh boot over that path | reads `['g'] → "bad"`, the whole register `{g:'bad',keep:'K'}`, and `constraints() → []` (the image carries NO pair — see `S1.7`) |
| a fresh boot WITH `cfg.constraints` | the pair is carried again and refuses `bad` identically; the image is unchanged |

**And the one fact a reader must NOT mis-take from that table: the image does not carry the constraint list.** A
fresh instance over the same `store.json` with no `cfg.constraints` carries **no pair at all** (`S1.7`, measured) —
so *"a fresh instance reaching the same state"* is read at **two** things and both are asserted: **the durable
register** (which is the image's own content) and **the pair's carriage through the declared construction route**
(`cfg.constraints` — `docs/specs/storeroom-js/surface.md §2.12` item 1 clause (b)), which is the only route a fresh
instance has. **The disabled POLARITY is not persisted either** — a booted pair is enabled, and a booted pair
therefore refuses `bad` again (`S1.8`, `S1.10`). **The handoff's item 1 does not claim otherwise, and this report
does not either.**

### §1.4 the clauses each cell reads

* `S1.1` — seams-and-lifecycle.md §7.1 step 4b; storeroom-native/contract.md DD-28 (amended 2026-10-13); file-tier-save live report
* `S1.2` — storeroom-js/surface.md §2.12 item 3; constraint-identity.md §1 item 3; contract.md §2.6 items 1–2
* `S1.3` — storeroom-js/surface.md §2.5 items 4 and 9 (the three-member set); §2.11 clause 4 (i); kernel-surface.md §2.5 items 1–3; fail-surface.md §1.1 item 3; storeroom-native/contract.md §8.1 #15 (FileCommitFailed)
* `S1.4` — surface.md §2.11 clause 2; seams-and-lifecycle.md §7.2; storeroom-native/contract.md §7.2 item 1
* `S1.5` — DEF-2026-10-20-F grounds 1–4; surface.md §2.12 item 3 clause 5; finalizer-and-teardown.md §4.1 table 2 ("disabling cannot fire — nothing runs"); §4.2 (the read channel)
* `S1.6` — DEF-2026-10-20-F ("the mask is a passing function rather than an absent one" — now ABSENT); storeroom-js/surface.md §2.12 item 3 clause 5; finalizer-and-teardown.md §4.1 table 2
* `S1.7` — seams-and-lifecycle.md §7.2 item 6; file-tier-save.test.mjs F1 (the persisted form of `cfg.constraints` is undeclared — measured here rather than assumed)
* `S1.8` — storeroom-js/surface.md §2.12 item 1 clause (b) and item 3 clause (a); contract.md §2.6; A135 (3) state 1
* `S1.9` — surface.md §2.12 item 3 (the enable half); §2.5 items 4/9; kernel-surface.md §2.5; fail-surface.md §1.1 item 3
* `S1.10` — seams-and-lifecycle.md §7.2 item 6; surface.md §2.12 item 1 clause (b)

**ITEM 1 — DOES THE ASSEMBLED LAYER CONFIRM THE NODE LAYER? YES.** Ten cells, `10` PASS, `0` FAIL: the refusal's
class/status/positions/subject are the same on both sides of the toggle, the disabled pair **admits and durably
keeps** the value it refused, and no step of the cycle moves a byte it must not move. **No contradiction.**

---

## §2. ITEM 2 — the COUNT SEAM around the toggle, and the listener at the pair

**The fixture, stated once.** Real stores on real disk. The seam is the declared one and it is **counter-
instrumented, not inferred**: the opening MOMENT is read by
`instance[Symbol.for('provident-storeroom.attempt-opened')](observer)` and the standing count by
`instance[Symbol.for('provident-storeroom.attempt-count')]()`
(`finalizer-and-teardown.md §4.2`; `contract.md`'s `P-ADA-5` clause of 2026-10-20). **The MECHANISM is
counter-instrumented too**: `S2.3` wraps the instance's own `listen` and `register` — the two store-side acts `K-1`
performs — for the duration of one disable and one enable, **and restores both descriptors in a `finally` with the
restore's proof printed**.

| Cell | Scenario | Start point | Settled end point | Verdict |
| --- | --- | --- | --- | --- |
| `S2.1` | item 2 · `constraintOff` at an ENABLED pair opens NO commit (opened=0) | one ENABLED pair at ['g'] on a real store | the observer counts 0 openings; the read channel answers 0 before and after; the call answers undefined | **PASS** |
| `S2.2` | item 2 · `constraintOn` at a DISABLED pair opens EXACTLY ONE commit (opened=1) | the same pair, now disabled | the observer counts 1 opening; the read channel is back to 0 after the return; the call answers undefined | **PASS** |
| `S2.3` | item 2 · the MECHANISM: `constraintOff` reaches NO `listen` and NO `register`; `constraintOn` reaches one of each per address | a second store carrying a TWO-ADDRESS pair ([['a'],['c']]) | counter-instrumenting the instance's own `listen`/`register`: the disable reaches 0 and 0; the enable reaches 2 and 2 (the pair's two addresses, one K-1 call each) | **PASS** |
| `S2.4` | item 2 · a write at an ENABLED pair opens exactly one commit (control for the seam reading) | the item-2 single-address store, the pair enabled | the opening observer counts 1 and the channel returns to 0 | **PASS** |
| `S2.5` | item 2 · a LISTENER REGISTERED AT THE PAIR does NOT fire for a disabled pair and DOES fire for an enabled one | the item-2 store carrying one pair at ['g']; the pair's own registration is the listener K-1 stands at that address | a write at the disabled pair invokes the pair's body 0 times; the same write at the enabled pair invokes it exactly once | **PASS** |
| `S2.6` | item 2 · the LITERAL reading — a CALLER's listener at the pair's address — is refused by the declared conflict test, in BOTH polarities | the item-2 store; a handle `h` created by `listen(h, [['g']])` at the pair's own address | `listen` SUCCEEDS (there is no conflict test at `listen`) and `register` is REFUSED with the package-side `TypeError` carrying NO status and `log: []` — with the pair enabled AND with it disabled, because the read model still carries the pair | **PASS** |
| `S2.7` | item 2 · OBSERVED (recorded, NOT asserted): a CALLER listener standing at the pair's address — the `addConstraint`-at-a-listener direction — fires in BOTH polarities | a store whose caller listener is registered at ['c'] BEFORE the pair is added there | the `addConstraint` is ADMITTED and both registrations stand; the caller listener fires for a write at that address with the pair ENABLED and, measured, also with it DISABLED | **OBSERVED** |
| `S2.8` | item 2 · the seam is RESTORED: after the observer is removed it fires for nothing, and one store's seam never answers for another's | the item-2 store, no observer of ours standing | a write with no observer registered drives a local counter to 0; an observer registered on THIS store does not fire for ANOTHER store's opening; the read channel is 0 | **PASS** |

### §2.1 the measured reading of each cell

* **`S2.1` — PASS.** constraintOff opened=0 channel=0->0
* **`S2.2` — PASS.** constraintOn opened=1 channel=0->0
* **`S2.3` — PASS.** disable listen=0 register=0 · enable listen=2 register=2
* **`S2.4` — PASS.** write opened=1 channel 0 after return
* **`S2.5` — PASS.** enabled delta=1 · disabled delta=0 · bodyRuns=["registration","registration","landing:\"ok2\"","landing:\"passes-1\"","registration"]
* **`S2.6` — PASS.** listen=ok · register@enabled=TypeError · register@disabled=TypeError · messages="the listener 'h@g' cannot be registered at [\"g\"]: the constraint 'b1' stands at that address, and a listener and a constraint do not share one"
* **`S2.7` — OBSERVED.** addConstraint=ADMITTED · caller listener fired 1 time(s) with the pair enabled and 1 time(s) with it disabled · listener argument="[\"c\"]"
* **`S2.8` — PASS.** standing=1 after-removal=0 cross-store=0 channels=0/0

### §2.2 what the seam and the instrumentation say, in one place

* **`constraintOff` at an ENABLED pair: `opened=0`** (`S2.1`) — the handoff's measurement, at the assembled layer,
  **confirming the landing**: the defect's symptom was `opened=1`.
* **`constraintOn` at a DISABLED pair: `opened=1`** (`S2.2`), and the standing count is back to `0` on the return.
* **THE MECHANISM, WHICH IS THE PART A COUNT ALONE CANNOT SHOW:** during `constraintOff`, **`listen` is called `0`
  times and `register` `0` times**; during `constraintOn` at a TWO-ADDRESS pair, **`listen` is called `2` times and
  `register` `2` times** (one `K-1` per address, `contract.md §2.6` item 4). **The register half is gone, and the
  enable half is intact — measured at the two verbs `K-1` reaches, not inferred from the count.** (`S2.3`)
* **A write at an enabled pair: `opened=1`** (`S2.4`) — the control that the seam reads openings at all.
* **THE LISTENER AT THE PAIR.** The reading that is drivable and that the handoff's words carry at the mechanism is
  the pair's **own registration** — the listener `K-1` stands at that address: **it fires EXACTLY ONCE for a write at
  the enabled pair and ZERO times for a write at the disabled pair** (`S2.5`). **The literal `register` reading is not
  constructible, and that is measured, not assumed:** a caller's `register` at the pair's address is refused by the
  declared constraint/listener conflict **in BOTH polarities** (`TypeError`, `status` absent, `log: []` — `S2.6`),
  because the read model still carries the pair. **Recorded as `S2.6a`.**
* **AND THE ONE READING THAT IS NOT WHAT THE WORDS SAY, RECORDED RATHER THAN ASSERTED (`S2.7`).** A **caller's**
  listener that stands at the pair's address because it was registered **before** the pair was added there — the
  direction `addConstraint` ADMITS, which the corpus prints **opposite arrows** about (`contract.md §2.3` item 8's
  first sentence vs `constraint-sites.md §5` item 2; the greens record the same observation at their `HLI-11`) —
  **fires for a write at that address with the pair ENABLED *and* with it DISABLED.** That is a fact about TWO
  registrations and not about the pair's own: the disable withdraws the pair's registration (`S2.3`, `S2.5`) and
  touches no other handle. **It is OBSERVED, NOT ASSERTED**, exactly as the greens set takes no side.

### §2.3 the clauses each cell reads

* `S2.1` — finalizer-and-teardown.md §4.1 (table 2: "disabling cannot fire — nothing runs") and §4.2 (the two channels); DEF-2026-10-20-F measured `opened=1` BEFORE the landing
* `S2.2` — finalizer-and-teardown.md §4.1 table 1 (`constraintOn` — "opens one — enabling") and §4.2
* `S2.3` — DEF-2026-10-20-F cause ("K-1 calls store.listen unconditionally"); bindings/js/index.mjs:4032 (the enable method) and :4113 (the remove-only disable arm); contract.md §2.6 item 4 (one pair, N registry rows)
* `S2.4` — finalizer-and-teardown.md §4.1 table 1 (`write` — "opens one") and §4.2
* `S2.5` — DEF-2026-10-20-F symptom ("a listener registered at that pair does not fire during the call") read at the write; finalizer-and-teardown.md §4.1 table 2; constraint-kernel.mjs:561 (K-1 → store.listen) and :2111 (K-6 withdraws through removeListener)
* `S2.6` — constraint-sites.md §5 items 1–6; contract.md §2.3 items 8–9; P: docs/pending.md · (C-1)/(C-2)/(C-3)
* `S2.7` — contract.md §2.3 item 8 first sentence (refusing act at `addConstraint`) vs constraint-sites.md §5 item 2 (at the caller's registration) — the corpus prints OPPOSITE ARROWS; greens §3.2 item 1 records the same observation
* `S2.8` — finalizer-and-teardown.md §4.2 items 2–4 (the unsubscribe removes the observer; the wait is per store; the read is pure)

**ITEM 2 — DOES THE ASSEMBLED LAYER CONFIRM THE NODE LAYER? YES on every asserted cell.** `7` PASS · `1` OBSERVED ·
`0` FAIL: `opened=0` for the disable and `opened=1` for the enable, the register half measurably absent from the
disable, the listener at the pair silent while disabled and firing while enabled, and the seam restored. **No
contradiction; one reading recorded and not asserted (`S2.7`).**

---

## §3. ITEM 3 — a DISABLED pair is STILL CARRIED and STILL ENUMERATED, with its WHOLE ADDRESS SET, before and after a fresh boot

**The fixture, stated once.** One real store, one pair whose `address` is the set `[['a'],['b']]` (two addresses),
two durable writes (`a='A2'`, `b='B2'`), then the disable.

| Cell | Scenario | Start point | Settled end point | Verdict |
| --- | --- | --- | --- | --- |
| `S3.1` | item 3 · a DISABLED two-address pair is STILL CARRIED and STILL ENUMERATED with its whole address set | a carried pair whose `address` is the set [['a'],['b']] | `constraintOff` answers undefined and `constraints()` still lists ONE row carrying BOTH addresses | **PASS** |
| `S3.2` | item 3 · the disabled pair is still ENFORCED-NOTHING and its addresses still take durable writes | the disabled two-address pair | a write at ['a'] and one at ['b'] are both admitted and both durable | **PASS** |
| `S3.3` | item 3 · BEFORE a fresh boot: the disabled pair is enumerated with its whole address set | the disabled pair and the image carrying both values | `constraints()` is exactly one row at [['a'],['b']] | **PASS** |
| `S3.4` | item 3 · the boot route's OWN element shape: a SET-valued `cfg.constraints` element is REFUSED | the same image, booted with ONE element whose `address` is the pair's whole set [['a'],['b']] | the construction refuses with the store's own `ConstraintListInvalid` — the element's `address` is a SEGMENT ARRAY and not a set (so N addresses need N elements) | **PASS** |
| `S3.5` | item 3 · AFTER a fresh boot (one element per address): the pair IS CARRIED, IS ENUMERATED, and IS ENFORCED at BOTH addresses | a new instance over the same store.json, booted with TWO elements — one per address, the SAME constraint function | the boot enumerates the pair at both addresses; a refusing body refuses a `bad` write at BOTH addresses; the image stays byte-identical | **PASS** |
| `S3.6` | item 3 · FINDING: after a fresh boot the enumeration carries the pair as N ROWS (one address each) and NOT as ONE row carrying the whole set | the live instance's disabled pair (ONE row at [['a'],['b']]) and the booted instance (TWO elements, one address each) | the booted `constraints()` is `[{[a],c1},{[b],c1}]` — the whole-set row shape the ADD route produces is NOT reproduced by the boot route, which is the only route a fresh instance has | **FINDING** |
| `S3.7` | item 3 · a DISABLED pair is STILL CARRIED in the second sense: a second `constraintOff` is idempotent success | the pair already disabled | the second disable answers undefined, opens no commit, and moves neither the enumeration nor the image | **PASS** |
| `S3.8` | item 3 · the enumeration's elements carry EXACTLY {address, id} — no identity, no enabled flag, for a disabled pair either | the disabled pair | every element's own member set is exactly [address, id] | **PASS** |

### §3.1 the measured reading of each cell

* **`S3.1` — PASS.** after=[{"address":[["a"],["b"]],"id":"c1"}]
* **`S3.2` — PASS.** image={"a":"A2","b":"B2"} · constraints()=[{"address":[["a"],["b"]],"id":"c1"}]
* **`S3.3` — PASS.** constraints()=[{"address":[["a"],["b"]],"id":"c1"}]
* **`S3.4` — PASS.** class=Object keys=[log,message,status] status="ConstraintListInvalid" message=" and an Array at position 0 is not a valid constraint entry in 'constraints', a constraint entry is an address and an id, and the address is a segment array" log=[]
* **`S3.5` — PASS.** constraints()=[{"address":[["a"]],"id":"c1"},{"address":[["b"]],"id":"c1"}] · refused@a=true refused@b=true · register={"a":"A2","b":"B2"} · image identical=true
* **`S3.6` — FINDING.** before the boot: [{"address":[["a"],["b"]],"id":"c1"}] · after the boot: [{"address":[["a"]],"id":"c1"},{"address":[["b"]],"id":"c1"}] — the pair IS carried and IS enumerated (S3.5), but the whole-set ROW is not re-derivable at the boot boundary, whose element carries ONE address (S3.4). PRE-EXISTING and independent of DEF-2026-10-20-F.
* **`S3.7` — PASS.** opened=0 constraints()=[{"address":[["a"],["b"]],"id":"c1"}] image-identical=true
* **`S3.8` — PASS.** member sets=["address,id"]

### §3.2 THE FINDING — `S3.6`, stated plainly and separated from the passes

**What the handoff's item 3 says:** *"A disabled pair is STILL CARRIED and STILL ENUMERATED — the enumeration
includes it with its whole address set, before and after a fresh boot."*

**What the assembled layer measures:**

* **BEFORE a fresh boot: the claim holds exactly.** The live instance's `constraints()` is ONE row —
  `[{"address":[["a"],["b"]],"id":"c1"}]` — with the pair disabled, its body silent, and both addresses still taking
  durable writes (`S3.1`–`S3.3`, `S3.7`, `S3.8`).
* **AFTER a fresh boot the pair IS carried and IS enumerated and IS enforced at both addresses — but NOT as ONE row
  carrying the whole set.** The boot's only route is `cfg.constraints`, and that route's element carries **ONE
  address, not a set**: a SET-valued element is **REFUSED** with `ConstraintListInvalid` (*"…the address is a segment
  array"* — `S3.4`), and two elements (one per address, the SAME function) boot into **TWO rows** —
  `[{"address":[["a"]],"id":"c1"},{"address":[["b"]],"id":"c1"}]` (`S3.5`, `S3.6`). **The pair is carried, is
  enumerated, and refuses a `bad` write at BOTH addresses; the ONE-row-with-the-whole-set SHAPE does not survive the
  boot.**

**Disposition: `FINDING`, PRE-EXISTING, and INDEPENDENT of `DEF-2026-10-20-F`.** It is a mismatch between
`docs/specs/storeroom-js/surface.md §2.4` item 9 (f)'s `constraints` clause (ONE row per carried pair at its whole
`address` set, whose read is the one home of the enumeration's shape) and `docs/specs/storeroom-js/parameter-semantics.md §2.21` (`PAR-JS-21`, *"one element per `{ address, id }`
pair"*, whose element's `address` is a segment array). **The disable path is not its cause**: the same two-element
boot over an ENABLED pair produces the same two rows (measured at `S3.6`'s own boot, whose pair is enabled), and the
defect under test is a `constraintOff` change. **Nothing was patched; no cell was relaxed.** **Owner: the spec
writer's (the two clauses must agree, or the boot route must be granted a set-valued element).**

### §3.3 the clauses each cell reads

* `S3.1` — surface.md §2.12 item 3 clause 5 ("a disabled pair is STILL CARRIED and STILL ENUMERATED"); contract.md §2.6 item 5; constraint-identity.md §3 item 3
* `S3.2` — DEF-2026-10-20-F (the pair is inert while disabled); seams-and-lifecycle.md §7.2
* `S3.3` — surface.md §2.12 item 3 clause 5; contract.md §2.6 item 5
* `S3.4` — parameter-semantics.md §2.21 (`PAR-JS-21`: "one element per { address, id } pair"); surface.md §2.12 item 1 clause (b); storeroom-native/contract.md §8.1 #16
* `S3.5` — surface.md §2.12 item 1 clause (b) and item 3 clause 5; contract.md §2.6 item 4 (one pair, N registry rows); A135 (3) state 1
* `S3.6` — surface.md §2.4 item 9 (f)'s `constraints` clause (ONE row per carried pair at its whole `address` set, the DISABLED pair appearing) and §2.12 item 3 clause 5 (`the toggle is NOT a removal`), against parameter-semantics.md §2.21 (`PAR-JS-21`: one element, its `address` a segment array)
* `S3.7` — surface.md §2.12 item 3 (idempotent success where the pair already stands in the state it asks for); finalizer-and-teardown.md §4.2
* `S3.8` — surface.md §2.4 item 9 (f) items 3–4 (no function, no identity) and §2.12 item 3 clause 5 (no third member)

**ITEM 3 — DOES THE ASSEMBLED LAYER CONFIRM THE NODE LAYER? YES on carriage and enumeration, WITH ONE FINDING on
the boot's row shape.** `7` PASS · `1` FINDING · `0` FAIL. The pair survives the disable whole (identity,
enumeration, address set, member set) and survives a fresh boot as a carried, enumerated, enforced pair; **the
single-row-whole-set shape is an ADD-route shape and is not re-derivable at the boot boundary.**

---

## §4. ITEM 4 — the IDENTITY survives the cycle

**The fixture, stated once.** One real store, two pairs (`['i']/i1` and `['j']/i2`), the identities held from
`addConstraint`'s own returns.

| Cell | Scenario | Start point | Settled end point | Verdict |
| --- | --- | --- | --- | --- |
| `S4.1` | item 4 · a second `addConstraint` at the SAME pair is EQUAL TO ITSELF (`===` the first identity) | the pair carried at ['i'] with a held identity | the return of a second `addConstraint` at the same pair is `===` the first | **PASS** |
| `S4.2` | item 4 · the identity survives an off→on cycle (`===` itself across the cycle) | the same pair, after `constraintOff` then `constraintOn` | `addConstraint` at the pair after the cycle answers the SAME identity value | **PASS** |
| `S4.3` | item 4 · two DIFFERENT pairs answer two UNEQUAL identities (the control) | a second pair carried at ['j'] | the two identities are not `===` | **PASS** |

### §4.1 the measured reading of each cell

* **`S4.1` — PASS.** first === again: true
* **`S4.2` — PASS.** after cycle: true · constraints()=[{"address":[["j"]],"id":"i2"},{"address":[["i"]],"id":"i1"}]
* **`S4.3` — PASS.** first !== second: true

### §4.2 the clauses each cell reads

* `S4.1` — contract-identity.md §2 item 2 ("equal to itself on a second addConstraint at the SAME pair"); contract.md §2.6 item 2; PAR-JS-25
* `S4.2` — constraint-identity.md §3 item 3 and §5 IF-5; contract.md §2.6 items 2–3; surface.md §2.12 item 3 clause 5
* `S4.3` — constraint-identity.md §2 item 3; contract.md §2.6 item 2

**ITEM 4 — DOES THE ASSEMBLED LAYER CONFIRM THE NODE LAYER? YES.** `3` PASS · `0` FAIL: a second `addConstraint` at
the same pair answers **`===`** the first (`S4.1`), the identity is **`===` itself across an off→on cycle**
(`S4.2`), and two different pairs answer **unequal** identities (`S4.3` — the control that makes the first two
readings mean something).

---

## §5. ITEM 5 — a DISABLE→ENABLE cycle does NOT throw

**The fixture, stated once.** One real store, one pair `['k']/k1`.

| Cell | Scenario | Start point | Settled end point | Verdict |
| --- | --- | --- | --- | --- |
| `S5.1` | item 5 · `constraintOff` then `constraintOn` at the same pair completes WITHOUT a throw, and never the kernel's KC-2 | the pair carried at ['k'] and enabled | both calls answer undefined; no throwable whose status is `KC-2` or whose message matches /no constraint pair answers to/ is produced | **PASS** |
| `S5.2` | item 5 · the KC-2 refusal the toggle must NOT reach is STILL REACHABLE where the kernel holds no row (kernel-layer control) | `K-6 remove` at a pair the kernel carries no row for, reached through the kernel module's declared home | the kernel throws its own KC-2 with the declared message — so S5.1's success is not the disappearance of the refusal | **PASS** |
| `S5.3` | item 5 · TWO full cycles in a row complete without a throw (the cycle is repeatable) | the pair carried and enabled | four calls (off/on/off/on) answer undefined and none throws | **PASS** |

### §5.1 the measured reading of each cell

* **`S5.1` — PASS.** off=undefined on=undefined kc2=false
* **`S5.2` — PASS.** class=Object keys=[log,message,status] status="KC-2" message="no constraint pair answers to 'absent'" log=[]
* **`S5.3` — PASS.** cycles=[{"offThrew":false,"onThrew":false},{"offThrew":false,"onThrew":false}] constraints()=[{"address":[["k"]],"id":"k1"}]

### §5.2 the clauses each cell reads

* `S5.1` — contract.md §2.9 item 2 (K-6 is not a no-op: it refuses KC-2); surface.md §2.12 item 3 (the toggle is not a removal); DEF-2026-10-20-F consequence ("a re-enable would throw where the clause declares a toggle")
* `S5.2` — remove-member.md §4 item 2 (ii); contract.md §4 F-12; constraint-kernel.mjs:2159
* `S5.3` — surface.md §2.12 item 3; contract.md §2.9 item 2; DEF-2026-10-20-F

**ITEM 5 — DOES THE ASSEMBLED LAYER CONFIRM THE NODE LAYER? YES.** `3` PASS · `0` FAIL: `constraintOff` then
`constraintOn` at the same pair answers `undefined` twice and throws nothing, **and no `KC-2` is produced** — while
the control at `S5.2` proves the refusal still exists and is still reachable (`KC-2`, *"no constraint pair answers to
'absent'"*). **The cycle completes without the kernel's refusal, and not because the refusal has gone away.**

---

## §6. ITEM 6 — `addConstraint`'s OVERWRITE at a DISABLED pair, and `removeConstraint` at a DISABLED pair

**The fixture, stated once.** One real store, one pair `['m']/m1` carried, written, and **disabled**; then the
overwrite; then a second disable and the removal; then the two control acts at an enabled pair.

| Cell | Scenario | Start point | Settled end point | Verdict |
| --- | --- | --- | --- | --- |
| `S6.1` | item 6 · `addConstraint`'s OVERWRITE at a DISABLED pair answers the pair's own identity, in place, with no host error | the pair carried at ['m'] and DISABLED (no kernel row for K-6 to find) | the call answers the SAME identity (`===`); one row still stands; the NEW body is the one evaluated (a write invokes it) | **PASS** |
| `S6.2` | item 6 · `removeConstraint` at a DISABLED pair REMOVES the pair, with no host error, and the address is no longer enforced | the pair carried at ['m'] (re-enabled by S6.1's overwrite) then DISABLED again | the removal answers undefined; `constraints()` loses the pair; a write the pair would have refused is admitted and durable | **PASS** |
| `S6.3` | item 6 · after the removal, the address is plain: a caller listener may be registered there, and a second removal is the DECLARED refusal (not a host error) | the pair removed from ['m'] and a handle created at that address | `listen` + `register` at the address SUCCEED (no constraint stands); a second `removeConstraint` throws the package-side TypeError with status ABSENT and log [] | **PASS** |
| `S6.4` | item 6 · the CONTROL: the same two acts at an ENABLED pair answer as declared | a fresh pair at ['n'] on the same store, ENABLED | the overwrite keeps identity and the removal removes — so the disabled-pair answers are not a weakened route | **PASS** |

### §6.1 the measured reading of each cell

* **`S6.1` — PASS.** identity===first: true · constraints()=[{"address":[["m"]],"id":"m1"}] · new body runs=["registration","landing:\"M2\""] · image={"m":"M2"}
* **`S6.2` — PASS.** removal=undefined · constraints()=[] · write admitted=true · image={"m":"M3"}
* **`S6.3` — PASS.** register=ok · second removal=TypeError · message="the pair at the first argument of `removeConstraint` is 'm1' at [[\"m\"]], and this instance holds no constraint pair there"
* **`S6.4` — PASS.** overwrite identity===first: true · removed: true

### §6.2 the clauses each cell reads

* `S6.1` — DEF-2026-10-20-F consequence ("`withdrawStanding`: purge only where a registration stands"); contract.md §2.3 items 2–4 and §2.6 item 2; constraint-sites.md §1 rows 2–3
* `S6.2` — DEF-2026-10-20-F consequence ("`removeConstraint` at a disabled pair ... must still delete one"); contract.md §2.6 item 3 and §2.9 item 2; removal-members.md §3–§4
* `S6.3` — constraint-sites.md §5 (the conflict is keyed on a standing constraint); removal-members.md §5 row 1 and §6 item 2; contract.md §4 F-8
* `S6.4` — contract.md §2.3 items 2–4 and §2.6 item 3; removal-members.md §4 item 1

**ITEM 6 — DOES THE ASSEMBLED LAYER CONFIRM THE NODE LAYER? YES.** `4` PASS · `0` FAIL: at a **disabled** pair the
overwrite answers **the pair's own identity (`===` the first)**, stands one row still, and the NEW body is the one
evaluated by the next write (`S6.1`); and the removal answers `undefined`, drops the pair from the enumeration, and
the address stops being enforced — with the admitted value durable (`S6.2`). **Neither act raises a host error, and
the two control acts at an ENABLED pair answer identically (`S6.4`), so the disabled-pair answers are not a weaker
route.** **This is `withdrawStanding`'s rule measured on both of its sites.**

---

## §7. THE RESTORES — every intrinsic, every descriptor and every registry state, in a `finally`, with the proof

**What this run touched, and how each touch was undone.**

| Touch | Instrument | Restore | Proof |
| --- | --- | --- | --- |
| the opening observer (`Symbol.for('…attempt-opened')`) | registered per measurement | every unsubscribe called in the `finally` of its measurement and again in the run's own `finally` | **`7` observers removed**; `S2.8` proves the removal by driving a later opening and reading **`0`** firings, and proves the seam is per store by observing **another** store's opening and reading **`0`** |
| the instance's own `listen` / `register` (`S2.3`) | wrapped to count, `this` preserved | each descriptor re-installed from the descriptor captured before the wrap, in the cell's own `finally` | `S2.3`'s restore proof is printed: **every descriptor's `value === original`, `writable`, `enumerable` and `configurable` unchanged** |
| each instance's own `listen` / `register` / `unlisten` descriptors | captured at construction | re-installed in the run's `finally` | **`14` instances, every descriptor restored** (all `true`) |
| the constraint registry of every instance (including every boot instance) | `addConstraint` / `cfg.constraints` | `removeConstraint` on every pair the run added | **`16` pairs removed** (`12` by the run's own restore, `4` already gone by the cells' own removals); **every instance answers `constraints() === []`** |
| the listener registry (`listen`/`register` at caller handles) | `h@g`, `caller@c`, `after@m` | `removeListener` on each handle | **`3` caller listener entries removed and PROVED gone** — after each removal a `register` at that handle is refused with *"this instance holds no listener entry for it"* |
| the count index | the two channels read | no state written by a read; the observers above are its only mutation | **every instance's read channel answers `0`** |
| the temp root | `fs.mkdtempSync` | `fs.rmSync` in the run's `finally` | **`tmpRootRemoved = true`** |
| the module namespaces | imported, never written | nothing to restore | the package's export set is **`["storeCreate"]`** and the kernel's is the six `K-1`–`K-6` names, both read **before and after** |

| Cell | Scenario | Start point | Settled end point | Verdict |
| --- | --- | --- | --- | --- |
| `R1` | the RESTORE: every registry state, every descriptor and every observer this run touched is restored | the run's own touch list (per-instance observers, instrumented descriptors, carried pairs, the temp root) | every instance answers `constraints() === []`, its read channel answers 0, every touched descriptor is byte-identical to its original, and the temp root is gone | **PASS** |

### §7.1 the measured reading of each restore cell

* **`R1` — PASS.** 14 instances · 12 pairs removed (4 already gone) · 7 observers removed · 3 caller listener entries removed and proved gone · descriptors restored on all · tempRootRemoved=true

**THE RESTORE'S PROOF OBJECT, verbatim from the run:**

```json
{
  "instances": [
    {
      "tag": "item1",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item1-boot-plain",
      "pairsRemoved": 0,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item1-boot-pair",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item1-settled",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item2-single",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {
        "h@g": {
          "removed": true,
          "entryGone": true
        }
      }
    },
    {
      "tag": "item2-two-address",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item2-caller-listener",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {
        "caller@c": {
          "removed": true,
          "entryGone": true
        }
      }
    },
    {
      "tag": "item2-other",
      "pairsRemoved": 0,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item3",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item3-boot",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 1,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item3-shape",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 1,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item4",
      "pairsRemoved": 2,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item5",
      "pairsRemoved": 1,
      "pairsAlreadyGone": 0,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {}
    },
    {
      "tag": "item6",
      "pairsRemoved": 0,
      "pairsAlreadyGone": 2,
      "failures": [],
      "descriptorsRestored": {
        "listen": true,
        "register": true,
        "unlisten": true
      },
      "constraintsAfter": [],
      "channelAfter": 0,
      "handlesRestored": {
        "after@m": {
          "removed": true,
          "entryGone": true
        }
      }
    }
  ],
  "observersRemoved": 7,
  "tmpRootRemoved": true
}
```

---

## §8. THE MACHINE-READABLE SUMMARY

```json
{
  "reach": "LIVE/ASSEMBLED (checkout entry + checkout built addon, real stores on real disk)",
  "run": {
    "startedAt": "2026-10-25T04:08:37.948Z",
    "finishedAt": "2026-10-25T04:08:37.966Z",
    "node": "v24.20.0",
    "platform": "linux x64",
    "runs": 3,
    "deterministic": true
  },
  "cells": 37,
  "PASS": 35,
  "FAIL": 0,
  "OBSERVED": 1,
  "FINDING": 1,
  "perCell": [
    {
      "id": "S1.1",
      "verdict": "PASS"
    },
    {
      "id": "S1.2",
      "verdict": "PASS"
    },
    {
      "id": "S1.3",
      "verdict": "PASS"
    },
    {
      "id": "S1.4",
      "verdict": "PASS"
    },
    {
      "id": "S1.5",
      "verdict": "PASS"
    },
    {
      "id": "S1.6",
      "verdict": "PASS"
    },
    {
      "id": "S1.7",
      "verdict": "PASS"
    },
    {
      "id": "S1.8",
      "verdict": "PASS"
    },
    {
      "id": "S1.9",
      "verdict": "PASS"
    },
    {
      "id": "S1.10",
      "verdict": "PASS"
    },
    {
      "id": "S2.1",
      "verdict": "PASS"
    },
    {
      "id": "S2.2",
      "verdict": "PASS"
    },
    {
      "id": "S2.3",
      "verdict": "PASS"
    },
    {
      "id": "S2.4",
      "verdict": "PASS"
    },
    {
      "id": "S2.5",
      "verdict": "PASS"
    },
    {
      "id": "S2.6",
      "verdict": "PASS"
    },
    {
      "id": "S2.7",
      "verdict": "OBSERVED"
    },
    {
      "id": "S2.8",
      "verdict": "PASS"
    },
    {
      "id": "S3.1",
      "verdict": "PASS"
    },
    {
      "id": "S3.2",
      "verdict": "PASS"
    },
    {
      "id": "S3.3",
      "verdict": "PASS"
    },
    {
      "id": "S3.4",
      "verdict": "PASS"
    },
    {
      "id": "S3.5",
      "verdict": "PASS"
    },
    {
      "id": "S3.6",
      "verdict": "FINDING"
    },
    {
      "id": "S3.7",
      "verdict": "PASS"
    },
    {
      "id": "S3.8",
      "verdict": "PASS"
    },
    {
      "id": "S4.1",
      "verdict": "PASS"
    },
    {
      "id": "S4.2",
      "verdict": "PASS"
    },
    {
      "id": "S4.3",
      "verdict": "PASS"
    },
    {
      "id": "S5.1",
      "verdict": "PASS"
    },
    {
      "id": "S5.2",
      "verdict": "PASS"
    },
    {
      "id": "S5.3",
      "verdict": "PASS"
    },
    {
      "id": "S6.1",
      "verdict": "PASS"
    },
    {
      "id": "S6.2",
      "verdict": "PASS"
    },
    {
      "id": "S6.3",
      "verdict": "PASS"
    },
    {
      "id": "S6.4",
      "verdict": "PASS"
    },
    {
      "id": "R1",
      "verdict": "PASS"
    }
  ],
  "items": {
    "item 1 — refuse → disable → admit (durable) → enable → refuse": "CONFIRMS",
    "item 2 — the count seam around the toggle, and the listener at the pair": "CONFIRMS",
    "item 3 — a disabled pair is still carried and enumerated": "CONFIRMS + FINDING",
    "item 4 — the identity survives the cycle": "CONFIRMS",
    "item 5 — a disable→enable cycle does not throw": "CONFIRMS",
    "item 6 — the two further held-pair purge sites": "CONFIRMS",
    "the restore": "CONFIRMS"
  },
  "addon": {
    "path": "bindings/js/build/Release/storeroom_js_binding.node",
    "size": 1370856,
    "md5": "bd9fbc5eed81c4e6e8a983b31fffa8a3",
    "mtime": "2026-10-25T04:01:58.780Z",
    "mappedByThisProcess": "Files/Projects/Provident-Storeroom/bindings/js/build/Release/storeroom_js_binding.node",
    "exportSet": [
      "commitFile",
      "delete",
      "errorMessage",
      "listen",
      "read",
      "readLiteral",
      "register",
      "removeListener",
      "rollback",
      "storeCreate",
      "unlisten",
      "version",
      "write"
    ]
  },
  "addonVsSource": {
    "addonMtime": "2026-10-25T04:01:58.780Z",
    "newestSourceEdit": {
      "path": "bindings/js/index.mjs",
      "mtime": "2026-10-25T04:01:50.173Z"
    },
    "addonPostdatesEverySourceEdit": true,
    "addonMinusIndexMjsSeconds": "8.607"
  },
  "kernelExportSet": [
    "commit",
    "log",
    "register",
    "remove",
    "report",
    "runAttempt"
  ],
  "restoreFailures": []
}
```

**The per-cell evidence — the expected/observed pair of every `37` cells — is in
`scratch/def-f-live/assembled-toggle-out.json`**, which is the run's own output and is regenerated byte-for-byte
(modulo timestamps and temp paths) by `node scratch/def-f-live/assembled-toggle-drive.mjs`.

---

## §9. THE PER-ITEM LINES — DOES THE ASSEMBLED LAYER CONFIRM OR CONTRADICT THE NODE LAYER?

| Item | The assembled layer's verdict | The measurement that settles it |
| --- | --- | --- |
| **1** — refuse → disable → admit → enable → refuse | **CONFIRMS** | the refused write's form is unchanged on both sides of the toggle (`FileCommitFailed`, the pair's own message, the two log positions), and the disabled pair **admits the same value and keeps it durably** (`{"g":"bad"}` on disk, read back by a fresh instance) |
| **2** — the count seam around the toggle | **CONFIRMS** | `constraintOff` **`opened=0`** and **`listen=0`/`register=0`**; `constraintOn` **`opened=1`** and **`listen=2`/`register=2`** at a two-address pair; the listener at the pair fires `1` while enabled and `0` while disabled; the seam's removal is proved |
| **3** — a disabled pair is carried and enumerated | **CONFIRMS the carriage and the enumeration; ONE FINDING on the boot's row shape** | disabled: ONE row at `[['a'],['b']]`, body silent, both addresses durable; booted: carried, enumerated at both addresses, enforced at both — **but as TWO rows, one address each (`S3.6`)** |
| **4** — the identity survives the cycle | **CONFIRMS** | `identity === identity` at a second `addConstraint`, **across the off→on cycle**, and two pairs answer unequal identities |
| **5** — the cycle does not throw | **CONFIRMS** | `off`/`on` answer `undefined` with **no `KC-2`**, twice in a row, while the `KC-2` control at `S5.2` still throws |
| **6** — the two further held-pair purge sites | **CONFIRMS** | the overwrite at a disabled pair answers **`===` the same identity** and the new body is the one evaluated; the removal at a disabled pair removes and stops enforcement — **neither raises a host error**, and the enabled-pair controls agree |
| **the restores** | **CONFIRMS** | `14` instances, `16` pairs, `7` observers, `3` handles, every descriptor, and the temp root — all restored and proved |

**PLAIN STATEMENT: THE ASSEMBLED/PERSISTED LAYER CONFIRMS THE NODE LAYER.** On all six items the state a real store
settles to agrees with the node layer's green: the disable verb now performs **no bracketing act and no store-side
registration** (`opened=0`, `listen=0`, `register=0`), the constraint it disables **stops refusing a write and the
write's value becomes durable**, the pair stays carried and enumerated with its identity intact, the enable restores
enforcement with the same refusal and the same status, and neither the overwrite nor the removal at a disabled pair
raises the `KC-2` the pre-landing code would have raised. **The one FINDING (`S3.6`) is a boot-route row shape that
predates this change and is independent of it; the one OBSERVED (`S2.7`) is a corpus ambiguity recorded, not
asserted. Neither contradicts the node layer, and neither is folded into a pass.**

---

## §10. WHAT THIS PASS COULD NOT DRIVE, AND WHAT IT OBSERVED

**A. THE TWO CONSEQUENCES THE DEFECT ROW SAID THE LANDING PASS MUST SETTLE, AS THE ASSEMBLED LAYER SEES THEM.**

* **(i) `restoreHeldPair`'s refusal wake is UNREACHABLE on the disable arm — CONFIRMED AT THE MECHANISM.** The wake
  exists to put back a registration a refusal took; the disable arm reaches **neither `listen` nor `register`**
  (`S2.3`), so no registration can be attempted, so no refusal can be raised and the wake cannot be entered from
  that arm. **The wake remains reachable from `constraintOn`'s arm** (a refused re-registration) — that is the
  greens' `HLI-14`/refusal-restore subject at the `ENVELOPE/PURE` layer, and **this pass does not re-drive it** (it is
  not one of the six items; its envelope cells are green at `§0.E`).
* **(ii) The toggle cells pinning *"the toggle is not a removal"* and the pair's continued enumeration — GREEN**, at
  both layers: `S3.1`–`S3.3`/`S3.7` here, and `a126_constraintOff_disables_a_carried_pair_and_constraintOn_reenables_it`
  plus the `P-ADA-5` walk at `§0.C`–`§0.D`.

**B. WHAT COULD NOT BE DRIVEN, AND WHY — stated so the coverage is not read as wider than it is.**

* **The disabled POLARITY across a boot.** `cfg.constraints` carries a pair and a function; **it carries no
  polarity**, so a booted pair is always enabled. This is not a defect found; it is a state the declared route does
  not express, and **every boot cell here asserts the ENABLED boot** (`S1.8`, `S1.10`, `S3.5`, `S3.6`). **What a
  persisted disabled pair would even mean is a spec question this pass does not answer and does not invent.**
* **A persisted constraint list.** Measured, not assumed: the image carries **values only** — `{"g":"bad","keep":"K"}`
  — and a fresh boot over it enumerates `[]` (`S1.7`). This agrees with the landed `file-tier-save` finding (`F1`)
  that no clause declares the persisted form of `cfg.constraints`.
* **A `KC-2` produced by the PRODUCT's own surface.** There is no caller-side route to `K-6` at an absent row other
  than `removeConstraint`, whose declared refusal is its own `TypeError` (`S6.3`); the `KC-2` control therefore
  reaches the kernel module directly and is labelled a **kernel-layer control** (`S5.2`).

**C. OBSERVATIONS THIS PASS OWES THE SUPERVISOR (named, not acted on).**

* **`O-1` THE LANDING IS RECORDED IN THE SPEC AND STILL NOT IN THE TRACKERS — a PARTIAL recording, and the
  asymmetry is the finding.** `docs/specs/storeroom-js/surface.md §2.12` item 3 carries a clause **dated
  2026-10-25** that states the architect's ruling verbatim and reads the prohibition through it (`§0` B-bis),
  **while `docs/defects.md`'s `DEF-2026-10-20-F` row still reads `STATUS: OPEN — PARKED` with *"THE FIX IS NOT
  TAKEN AND MUST NOT BE TAKEN BY A PASS"* and `docs/pending.md`'s `G-14` still parks it** (read at this pass's tree:
  `docs/defects.md:214-215`, file mtime `2026-10-24 21:03:51 -0500` — **before the landing**). **The contradiction is
  not merely stale wording: the tracker row's own instruction forbids a pass taking the fix, and the fix is taken and
  green.** **This pass did not touch either tracker (forbidden); `O-1` needs the tracker owner's disposition — either
  the row moves to a landed state, or the landing's authority is recorded there.** **And the record is not uniform in
  the other direction either:** the landed `bindings/js/index.mjs` comments are dated `2026-10-22`, the artefact was
  rebuilt `2026-10-24 23:01:58`, and the spec clause is dated `2026-10-25` — **three dates for one act**, two of them
  *local* `-0500` and one of them **UTC** (`2026-10-25T04:0xZ` is `2026-10-24T23:0x-0500`, the same evening), which a
  reader of any single one of them cannot reconcile with the other two without this note.
* **`O-2` THE GREENS' `F-1` IS RESOLVED AT THE LIVE TREE.** The kernel module's export set is **`6`** names
  (`S0.2`); the seventh (`isKernelHandle`) the greens recorded `OPEN` is gone, and their `HLI-13.1` — the unit's only
  standing FAIL — now passes (`§0.E`). The greens document still prints `1 FAIL`; that is a stale figure, not a
  live contradiction.
* **`O-3` THE CONSTRAINT/LISTENER DIRECTION IS STILL PRINTED TWO WAYS.** `S2.7` drives the
  `addConstraint`-at-a-listener's-address direction and measures it **ADMITTED**, while the `register`-at-a-pair's-
  address direction is **REFUSED** (`S2.6`); the corpus prints opposite arrows (`contract.md §2.3` item 8 vs
  `constraint-sites.md §5` item 2) and the greens take no side (`HLI-11`, recorded). **Neither cell asserts a side.**
* **`O-4` THE NODE SUITE HAS A PRE-EXISTING ORDER RACE** (`§0.C`): a full run can fail
  `P-PUB-7::S-MANIFEST` with `ENOENT` on a `.jc-tc-*` temp directory that `json-crossing.test.mjs` removes
  concurrently. Two of three full runs of this pass read the handoff's `850`/`0`/`1`; one read `849`/`1`/`1`. **Not
  a regression of this change and not worked around.**

**D. A NOTE ON THE UNIT'S OWN `greens` FILE BEING RE-RUN.** It was run **read-only as evidence** (`§0.E`) because
its `HLI-13.1` bears on whether the assembled layer contradicts the unit's envelope set. It writes only its own
scratch directory; **no assertion of it was edited, relaxed or added to.**

---

## §11. THE BYTES THIS PASS WROTE

**Inside `docs/`:** this file — **`docs/specs/storeroom-held-listener-identity-live-report.md`, NEW** (the unit had
no live report; the two existing live reports in `docs/specs/` belong to other units — `storeroom-json-crossing-live-
report.md` and `storeroom-json-acceptance-set-live-report.md` — so this pass **created** rather than appended, and
says so here).

**In `scratch/` (the run's own workspace, named so nothing is hidden):**
`scratch/def-f-live/assembled-toggle-drive.mjs` (the runner) · `assembled-toggle-out.json` (its output, the LAST of
the three runs) · `out-run1.json` · `out-run2.json` · `out-run3.json` (the three determinism copies, the first of
which is diffed against the other two) · `run-2.txt` · `run-3.txt` · `run-4.txt` (the console transcripts — the
`run-4` transcript is the first of the final trio, kept because it carries the corrected `S3.6` citation) ·
`make-report-sections.mjs` (this report's section generator) · `report-sections.json` (its output) ·
`node-suite.txt` · `node-suite-run2.txt` (the two full node-suite runs) · `hli-greens.txt` (the blind set's re-run) ·
`probe1.mjs`–`probe4.mjs` (the exploratory probes).

**NOT written:** `src/**`, `bindings/js/index.mjs`, `bindings/js/src/**`, any file under `bindings/js/test/**`, the
four trackers (`docs/pending.md`, `docs/defects.md`, `docs/decisions.md`, `docs/status.md` — wherever they stand),
`archive/**`, and no spec document of any unit.

**AND ONE FACT A READER MUST NOT TAKE FROM `git status`:** the working tree carries OTHER agents' changes to
`bindings/js/index.mjs`, `bindings/js/test/**`, `bindings/js/greens/**` and several `docs/specs/**` files, **and a
concurrent pass amended `docs/specs/storeroom-js/surface.md` during this pass's own window** (`§0` B-bis, `O-1`).
**None of those bytes is this pass's**; this pass's own writes are the two lists above, and the run's evidence about
them is `S0.1`'s md5/mtime pair plus the `§7` restore object.

---

**`run: 2026-10-24 — node scratch/def-f-live/assembled-toggle-drive.mjs, three consecutive runs, IDENTICAL counts:
37 cells · 35 PASS · 0 FAIL · 1 OBSERVED · 1 FINDING. Reach LIVE/ASSEMBLED (checkout entry + checkout built
addon, real stores on real disk). The addon the run mapped is md5 bd9fbc5eed81c4e6e8a983b31fffa8a3, mtime
2026-10-24 23:01:58.780 -0500 — 8.607 s NEWER than the landing's last edit. THE ASSEMBLED/PERSISTED LAYER CONFIRMS
THE NODE LAYER on all six items; its one FINDING (S3.6) is a pre-existing boot-route row shape independent of the
change, and its one OBSERVED (S2.7) is a corpus ambiguity recorded and not asserted.`**
