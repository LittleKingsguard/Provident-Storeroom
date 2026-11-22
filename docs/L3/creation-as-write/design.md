# `P-2` · creation treated as a whole-store write — the design

**LANDED 2026-11-17 BY THE SUPERVISOR.** Written by `role_l3_designer` at this tree's `HEAD` (the tree carrying `D-193`/`D-195`/`D-196`'s `P-3` landing, `D-173`'s
file guard, `D-176`'s `WeakMap`, and `bindings/js/package.json` reading `2.0.0`); that role holds no write channel, so its returned text is landed here. **It
implements nothing, writes no cell, amends no spec and moves no other repository byte**, and every `path:line` in it was re-read at this HEAD rather than inherited —
`P-3`'s design printed a cell census that `D-196` found materially wrong and a range table that `D-192` item 6 found drifted, so **no range here is carried without a
read.**

**THE RULING, VERBATIM, AND NOT RE-OPENED** (`strata/decisions.md` · `D-191`, the architect):

> "For P-2, treat as a whole-store write, i.e. build the store, then check all constraints/repairs (because everything is new data), save, then fire all listeners
> (same reason), as with other editing actions (write/delete)"

---

## §0 · The tree met the ruling — and three of the ruling's own premises are read against it

**★ THE GOVERNING FINDING, AND IT RESHAPES THE UNIT: `D-191`'s FOUR STEPS ARE ALREADY THE SHIPPED ORDER, AND THE BREAK ITS ITEM 4(4) DESCRIBES ALREADY HAPPENED.**
`D-123`–`D-126` (2026-11-06) ruled and landed the creation's sweep, its refusal and its delivery at `1.11.0`; the tree carries them as code and as a green battery.
**So this design is not a build order — it is a conformance pin plus two defects the reading found, and the honest first paragraph of it is what is already true.**

### §0.1 · The four steps, at bytes

| `D-191` item 2's step | the shipped act | its bytes |
|---|---|---|
| **build the store** | `addon_.storeCreate(encoded)` | `bindings/js/src/entry/instance.mjs:379`, running the store's steps 2·3·3-bis·4-bis·4b·5·6·7 and ending at `store.born` (`src/store.rs:1027`) before `Ok(store)` (`:1034`) |
| **check all constraints and their repair flows** | the sweep — the carry, then rounds until a round lands no repair | `instance.mjs:2029`–`:2069`, each pair asked through `carryConstraint` at `:2045` |
| **save** | each registration's passing close | `kernel-registration.mjs:1098`–`:1116` → `delivery.mjs:776`–`:796` → `commitFile`, gated by the store's `save_owed` (`src/store.rs:1949`–`:1961`) |
| **fire all listeners** | the creation's one delivery seat | `instance.mjs:2210` → `deliverAtTheCreation` (`:234`–`:273`) → `deliver` (`delivery.mjs:189`) |

### §0.2 · The order against the arming sweep has no fork, because the arming sweep **is** the constraint pass

`carryConstraint` (`constraints.mjs:443`) does both in one act per address: it **mints the home entry and asks the body** (`:485`–`:491`). **So `D-191`'s step 2 needs no
fifth step and no re-ordering.** What is *not* one of the four and must not be read as one is the **listeners'** arming (`instance.mjs:2120`–`:2189`): it lands between
steps 3 and 4 and is **step 4's precondition** — a handle with no registered body fires nothing silently, so a seat placed before it would deliver to reservations.

### §0.3 · Three premises the reading falsifies, each named rather than absorbed

1. **`D-191` item 4(4)'s ground is stale.** The row says *"a construction that today boots and arms would start refusing and firing."* **At this HEAD a construction
   already refuses** (`CSW-04`, `CSW-09`, `CSW-10`, `CSW-20`, `CSW-03`) **and already fires** (`CSW-06`, `CSW-07`, `CSW-08`, `CSW-23`, `CSW-26`, `CSW-B1`).
2. **`D-191` item 4(3)'s parenthetical names a boundary that does not exist.** It says `D-173`'s guard covers the arming sweep *and not* the constraint pass — **they are
   one act** (§0.2), and the guard's `undo()` is inside that act's own `catch` (`instance.mjs:2063`). The real boundary is elsewhere, and it is an accident of statement
   order (§5).
3. **`D-191` item 4(1)'s parenthetical presumes an eligibility test at an act that mints no op.** `save_owed` is a predicate over a **journal entry**, and **a creation
   mints none of its own**: the seed is *"not an act"* (`src/store.rs:960`), the boot's load is not an act (`:946`), and step 4b's `create_new` writes no datum (`:873`–`:878`).

---

## §1 · Where the four steps land, and what each judges

**THE BUILD ENDS AT `Store::born` — AND THAT FIELD IS `D-191` item 3's *"everything is new data"* GIVEN A NAME.** `store.born = store.capture_register()` (`src/store.rs:1027`),
with `floor_state` seeded from it (`:1033`): **the whole register's per-version capture, taken after the boot's load and after the seed and before any act the store will
journal** — which is exactly *"the register the construction produced"*, and the seed is **inside** it (`:965`–`:974`). The package's build ends where the addon's returns
(`instance.mjs:379`).

**THE CONSTRAINT PASS LANDS WHOLLY AFTER THE BUILD, AND ITS REFUSING ARMS ARE THREE**: the carry's or the first round's own verdict (rank `19`
`ConstraintRefusedAtRegistration`, rank `18` `ConstraintBodyThrew`, or a store code, crossing at `:2064`); **the converted post-round verdict** (`roundIndex > 0` and rank
`19` → `boundaryReject('ConstraintPassRefused', …)` at `:2051`, which **throws**); and **the cycle**, carried by the same conversion.

**THE SAVE IS NOT ONE ACT AT A CREATION.** It lands inside the pass, once per registration that moved `file`-tier data (`kernel-registration.mjs:1098`–`:1116`), keyed by
`lastFileLanding`. **So the creation's four steps interleave at exactly one place: N saves inside step 2.** **The property that keeps `D-191`'s order is negative, and it
is the one to assert: NO DELIVERY PRECEDES ANY SAVE.**

**THE DELIVERY IS ONE SEAT**, after every save and after the listeners are armed, reached only where the sweep returned (`:2196`–`:2197`); and the per-registration
delivery channel is silent during the construction by one value (`state.registrationDelivery` is `'adopted'`, `instance.mjs:476`), so **the two sets cannot double-fire at
one construction**.

**THE ORDER IN ONE SENTENCE**: `build (:379) → sweep-with-its-saves (:2029–:2069) → arm the adopted listeners (:2120–:2189) → deliver once (:2210) → install the seams →
answer (:2225)`.

---

## §2 · Which surfaces see it — the pass is `registrationAttempt`, and a creation's attempts are unnameable

**THE CREATION'S CONSTRAINTS ARE NOT ASKED THROUGH `runAttempt`.** The ask is `carryConstraint` → `constraintsKernel().register` → `registrationAttempt`
(`kernel-registration.mjs:659`), which **mints its own attempt** (`:674`–`:676`), owns its own `CommitRecord` (*"no write's op and no write's triggered set, because a
registration lands no `K-2` of its own"*), and closes through `closeRegistrationAttempt` (`:1094`). **`runAttempt` is the WRITE's pass and the DELETE's, and a creation
reaches it not at all.**

**SO A CREATION OPENS N ATTEMPTS AND NO WRITE ATTEMPT**, and every one carries a report, a log and the repair machinery — the narrower call is not available, because the
sweep's cycle detection, its applied-repair marker and its rollback composition are all properties of that attempt's close.

**★ AND THE `attempt.ref` A CALLER COULD EVER NAME IS: NONE.** The id is guessable (`attempt-<n>`), so a caller can name the **string**; **it cannot reach the report**, and
the mechanism is `D-176`'s own: `kernel.closed` is a `WeakMap` keyed by the ref **object**, and a bare id resolves only through `closedIds`'s `WeakRef`. **At a creation no
record crosses**, so the attempt frame is the ref's only strong holder; when it pops, both `log` and `report` answer `KC-2` — **the same answer a pruned id meets, and the
same instant the report is gone.** **The only observable a caller has of a creation's attempts is the count's increment — a count, not a name.**

---

## §3 · The delivered set's extent — four candidates, and one class the shipped test misreads

**THE SHIPPED SET**: `adopted ∩ resolving`, in creation order, one `deliver` per distinct address, the running handle list across calls, one argument = the listener's own
watched address (`instance.mjs:234`–`:273`). **Its ground is `D-123` item 3** (*"fire all ones with an EXISTING address"*, *"No listener is asked to fire for a node that is
not there"*) **and `D-125` item 1's measured correction**, pinned at `docs/L1/creation-sweep.md` `PIN-6` (i) and `PIN-7`.

| `#` | the set | cost | failure |
|---|---|---|---|
| **(A)** | **every registered listener**, no test | zero reads | **refused as a reading**: it fires for an address that is not there, contradicting `D-123` item 3 and `PIN-7` |
| **(B)** | **those whose watched address RESOLVES** — *the shipped set* | one `read` per distinct address | **one class misread — see below** |
| **(C)** | **those PREFIXED by a seeded address** | the address set, which no surface offers: `read([])` assembles the whole register — the corpus's measured `O(n²)` hazard | **the same extent at an unaffordable price** |
| **(D)** | **the names the touched arm reaches** | requires each repair's `triggered` | **measured false by `D-125` item 1**: a boot carrying no constraints still fires a listener at an existing address, and (D) delivers nothing |

**AND `D-191` item 4(2)'s question is answered by (B) without a new rule**: a listener fires when **the value at its own address** is present — including when it is present
only by assembling a subtree seeded below it. That is `D-56` read forward and it is the resolution test read once.

**THE `changed` QUESTION: DERIVED, NOT WHOLESALE — AND AT THE CREATION'S OWN SET IT HAS NO POSITION AT ALL.** The creation's delivered set **never calls
`registration_triggered`/`triggered_for`/`watched_for`**; it reads the register (`instance.mjs:195`). **The repairs' writes DO consume the term**, each for itself — so a
repair landing the literal the address already answers fires nothing (`P-3`'s rule arriving through the write surface). **And were the set ever re-expressed through the
predicate, `changed` would be `true` by DERIVATION at every address** — the before literal is absent everywhere and `Undefined` is not admitted, so *"a first write is a
change"* follows from the taxonomy. **The uniformity is deduced, not asserted, and that is the difference between a derivation and a flag.**

**★★ THE ONE DEFECT THIS DESIGN FINDS IN THE SHIPPED SET: `PIN-7`'S ABSENCE TEST IS ONE CLASS SHORT, AND THE MISSING CLASS IS `LeafHasNoDownstream`.**
`registerHolds` reads absence as **`status === 'AddressNotFound'` and nothing else** (`instance.mjs:198`). **The walk has a third class and it is an absence**: a leaf with
segments remaining fails `leaf_has_no_downstream` (`src/store.rs:1424`–`:1430`), whose status is **`LeafHasNoDownstream`**, and `read` propagates it unconverted
(`:2755`–`:2762`). **SO A CREATION FIRES A LISTENER AT AN ADDRESS THAT DOES NOT RESOLVE WITHIN A SCALAR** — seeded `{"a": 5}` with an adopted listener at `['a','b']`, or a
construction over an image with that shape. **It contradicts `D-123` item 3, `PIN-7` and `D-191`'s own ground at once, and no cell catches it** (`CSW-07`'s absent case is
`['nowhere']` in an empty register — `AddressNotFound`). **Its repair is `CAW-5`, and its reddening change is today's bytes.**

---

## §4 · The save — `create_new` is not it, the terminal arm is unreachable, nothing is written twice

**`create_new` DOES NOT COUNT AS THE SAVE, AND THE REASON IS A TYPE.** Step 4b opens exclusively and **drops the handle** (`src/store.rs:878`), leaving a **zero-length**
file. **A save is answerable only over a journal entry** (`save_owed`, `:1949`–`:1961`), and step 4b mints no entry.

**NEITHER DOES THE TERMINAL ARM'S SAVE RUN BESIDE IT — IT HAS NO POSITION TO BE HANDED.** `terminalArm` is gated on the settled-on-the-passing-arm flag and reads
`state.leg`, the store verb's returned record; **a construction drives no `runAttempt`, so no `leg` exists at it.**

**THE SAVE AT A CREATION IS THE REGISTRATION CLOSE'S**, one per registration that moved `file`-tier data (`D-106` item 3). **And `D-106` arm 2 has NO SUBJECT at the
creation's own act** — the tempting *"eligible by definition"* reading would write the file for nothing on a construction that moved no durable datum (the corpus's own inert
boot arm, whose bytes are **byte-identical** after the construction).

**IS THE FILE WRITTEN TWICE? NOT BY CONSTRUCTION — AND THE "TWICE" IS ONE LINE AWAY.** Shipped: one `create_new` of zero bytes plus one save per `file`-landing
registration, so a construction of N repairing pairs writes the whole image N times. **The doubling would come from adding `Store::save_state` at the creation's end**, whose
price is one image written twice, `O(register)` per construction, and **a save on the inert boot arm where nothing moved**. **Priced and refused.**

---

## §5 · The refusal's file — the guard is real, and which arm removes the file is decided by a statement's order

**THE GUARD**: opened before the one filesystem act (`instance.mjs:374`–`:376`), `undo()` removes only a file this construction created (`state.mjs:1055`–`:1072`), and
`D-173` item 1 fixed `SS-9` with it (`CFG-1`/`CFG-2`).

**★ AND ITS REACH IS NOT THE BOUNDARY `D-191` NAMES — IT IS ONE BRANCH OF ONE `catch`, AND WHICH BRANCH IS TAKEN IS DECIDED BY A RANK TEST.** The sweep's catch is
`instance.mjs:2046`–`:2065`:

1. **`roundIndex > 0` and a rank-`19` status** → `boundaryReject('ConstraintPassRefused', …)` at `:2051`, **which throws** → **`fileGuard.undo()` at `:2063` is NEVER
   REACHED** → **the created file STANDS** (`CSW-20`, `CSW-19`).
2. **every other refusal** → falls through to `:2063` → **the created file is REMOVED**, even where a sibling's save had written bytes into it (`CFG-1`).
3. **a rank-`21` delivery refusal** (`instance.mjs:2210`) → **no guard is reached at all** → **the created file STANDS** (`CSW-10`).

**SO THE CORPUS HOLDS THREE DISPOSITIONS FOR ONE STATE, AND THE LINE BETWEEN THE FIRST TWO IS A STATUS COMPARISON IN A REFUSAL CONVERSION — a rule about WHICH CODE CROSSES
deciding WHETHER A FILE SURVIVES.** `A55` is true on arm 2 only.

**AND THE CONTRACT ALREADY SPLITS ON IT**: `contract.md:4919` reads part 5 *"at the construction's OWN acts"* and declares that **a failure reached after the exclusive create
leaves the created file standing and owes no removal (`PIN-12`)** — **while `D-173` then measured `SS-9` against `A55` and removed the file at arm 2.** **So the corpus's
newest act is a removal, its newest pin says standing, and the tree splits the difference by statement order — which is nobody's decision.**

**THE DEFAULT: ONE RULE — THE FILE A CONSTRUCTION CREATED IS REMOVED ON EVERY REFUSAL THE CONSTRUCTION REACHES AFTER THE CREATE, AND ONLY THAT FILE.** The ground is `A55`
read at *"what the construction CAUSES"*: the file's existence is caused by this call, the refusal is this call's answer, and no caller data is in it. **It is `D-173`'s
direction extended, not reversed**, and it needs no new instrument — only that the `undo()` sit where no refusal can leave the frame before it.

**ITS PRICE**: `CSW-20` (`creation-sweep.test.mjs:464`, `:472`–`:480`), `CSW-19` (`creation-sweep-detector.test.mjs:156`) and `CSW-10`
(`creation-sweep-listeners.test.mjs:554`) each turn, **and those assertions are `PIN-12`'s and not wrong**; `PIN-12`'s first clause must be re-spelt by L1 to the
*pre-existing-file* arm. **That is a pin move and therefore L1's.**

---

## §6 · The cells

**THE CENSUS OF WHAT TURNS — three cells, all from §5's one rule**, each reddened by moving the guard's `undo()` ahead of the conversion's throw (`:2051`) and onto the delivery
seat's throwing arm (`:2210`): **`CSW-20`**, **`CSW-19`**, **`CSW-10`**. **Nothing else in the battery turns**: `CSW-04` and `CSW-29` refuse before the create; `CFG-1`/`CFG-2`
are arm 2 and the `existed === true` bound; `CSW-30`'s file is the caller's; `CSW-31`/`CSW-05` never refuse; the rest read bytes on passing arms.

**THE NEW CELLS** (`CAW-1`…`CAW-8`): **`CAW-1`** a rank-20 refusal leaves **no** file (reddened by today's statement order) · **`CAW-2`** a rank-21 refusal leaves **no**
file (today's bytes) · **`CAW-3`** the guard's bound at the later arms — a pre-existing file's bytes unmoved (reddened by unlinking without `existed`) · **`CAW-4`** a boot
with no constraints still fires once (reddened by option (D)) · **`CAW-5`** a scalar above the watched address is silent (reddened by today's `instance.mjs:198`) ·
**`CAW-6`** the save count — a `mem` repair leaves the created file at `0` bytes (reddened by `save_state()`) · **`CAW-7`** the creation's attempts are unnameable (reddened
by any strong holder of the ref) · **`CAW-8`** the two sets at one instant — a repair landing the standing literal fires nothing at that write **and** the adopted listener
fires once (reddened by unifying `PIN-6` (i) with (ii)).

**AND THE INTAKE'S EXPECTATION IS NOT MET BY THE BATTERY**: there is **no** creation or boot drive asserting a zero invocation that is not paired with a live witness, so **no
turn is owed from `D-123` item 2's reversal** — that debt is prose's, not a cell's.

**★ THE CELL MOST LIKELY TO TURN THAT NOBODY EXPECTS: `CSW-19`** — its title is **the cycle detector**, and its third limb asserts the file stands, explaining the presence as
*"a passing registration saved into it (`PIN-12`)"*. **Under §5's rule that limb is red and its subject has nothing to do with the cell's title**, so a pass grepping for cells
whose *name* mentions a file finds `CFG-*` and `CSW-10` and misses it.

---

## §7 · The class and the migration sentence

**`D-191` item 4(4)'s class question is answered for what remains, not for what shipped, because the break it names shipped in `1.11.0`.** What this design changes is **one
side effect of a refusal** and **one resolution test**; **neither adds, removes nor renames a published member.**

**⟶ AND THE NUMBER IS RULED: *"Next release is 2.0.0"* (`D-200`).** **This design's `O-6` defaulted to `MINOR` content riding `3.0.0` and the paragraph below says so; the ruling
makes `2.0.0` the line, so this unit's content rides THAT one beside `P-3`'s `MAJOR`, and `O-6` is answered — the class question stands (its content adds, removes and renames no
published member) and only the number it rides changed. The sentence below is the reading the ruling supersedes.**

**SO: `MINOR`-class content, riding the next cut, and the number is the architect's.** `2.0.0` is spent; `3.0.0` is `P-3`'s. **By `D-126` item 3's own arithmetic a version is
the maximum of the moves it carries, so this unit rides `3.0.0` beside `P-3`'s `MAJOR`, with the classes printed separately.** **No pass mints the number.**

**THE MIGRATION SENTENCE**: *"If you construct with a `filePath`, carry constraints, and the construction refuses, the file used to be left behind on some refusing arms
and not others; it is now always removed — the file is the construction's own, and a file that was there before your call is never touched."*

---

## §8 · The open questions, each with a default

| `#` | the question | the default | whose |
|---|---|---|---|
| **`O-1`** | **`D-191` item 4(3): what does a refusal do to the file the construction created — one rule, or the three the tree holds?** | **ONE RULE** — remove it on every post-create refusal arm, only the file this construction made; `PIN-12`'s first clause re-spelt by L1 | **BLOCKING — it moves a pin** |
| **`O-2`** | is `adopted ∩ resolving` the creation's set, and is the `LeafHasNoDownstream` silence part of "resolving"? | **yes, and yes** — the second half is a defect repair, not a widening | the architect's / L1's |
| **`O-3`** | is the creation's save per-op, or eligible by definition? | **per-op** — a creation mints no entry | L1's |
| **`O-4`** | is a whole-register `save_state()` added at the creation's end? | **no** — the doubling is priced and refused | L1's |
| **`O-5`** | does a creation's attempt ever become nameable? | **no** — `D-58` item 2's bound and `D-176`'s `WeakMap`; a receipt would move `D-58` | the architect's |
| **`O-6`** | the class, given the break already shipped | **`MINOR` content riding `3.0.0`**; `MAJOR` if `PIN-12` is read as a consumer expectation — **the number does not move either way** | **the architect's** |
| **`O-7`** | does anything still declare that a creation fires nothing? | the two named sites re-read in the landing pass (`docs/guides/package-use.md` and `strata/research.md` §13.2's `C-12`) — **this pass did not read them and claims nothing** | the landing pass's, on L1's word |
| **`O-8`** | does a repair's own write still obey `P-3`'s narrowing at a creation? | **yes, mechanically** — no special case, because a special case would be a second predicate | settled by `D-195` |

---

## §9 · The guardrails a landing pass receives

1. **THE `undo()` GOES BEFORE THE THROW, NOT AFTER IT** — any guard after `boundaryReject` at `:2051` is dead code on that arm.
2. **DO NOT COMPUTE THE CREATION'S SET THROUGH `registration_triggered`** — route it and you buy option (D)'s measured failure.
3. **DO NOT ADD A `changed` FLAG TO ANY RECORD** — at a creation a flag would stand in for a derivation.
4. **DO NOT ADD `save_state()` ANYWHERE IN THE CONSTRUCTION.**
5. **DO NOT WIDEN `registerHolds` PAST THE WALK'S ABSENCE CLASSES** — *"any other code means present"* is the defect being repaired, not its shape.
6. **DO NOT MOVE THE DELIVERY SEAT ABOVE THE LISTENERS' ARMING** — a handle with no body fires nothing, silently.
7. **DO NOT MOVE THE SAVE AFTER THE DELIVERY** — the cells read the file at the body's own instant.
8. **DO NOT UNIFY `PIN-6` (i) WITH `PIN-6` (ii)** — two sets, two instants, one order; `CAW-8` catches the unification in either direction.
9. **AND THE ONE CLAUSE THAT COULD MAKE THIS DESIGN IMPOSSIBLE IS `PIN-12`'S**: if L1 holds *"a refused creation leaves the store's own created file standing"* for the later
   arms, then `O-1`'s default cannot land and this design reduces to §1's conformance pin plus §3's one-line repair.
