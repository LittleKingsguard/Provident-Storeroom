# L1 module plan — the seven-key config: `saveCall`, `channel`, the seed and the awaited delivery

**PROVENANCE.** Written `2026-11-17` at `HEAD` `e3136af` by **`role_l1_architect`**, landed by the supervisor because that role holds no
write channel. **Its gate is `strata/proposals.md` `P-5` (`APPROVE-WITH-CONDITIONS`, design opened) and its rulings are
`strata/decisions.md` `D-130`…`D-136`.** **It designs no declaration that a ruling has not made: every priceable choice is priced and
none is chosen.** Cells are named by class and not written; no code, test or spec byte was moved by it.

**READ AT THE BYTES:** `strata/proposals.md` (`P-5` §1–§6 whole, `P-4` §1–§9) · `strata/decisions.md` `D-130`–`D-136` whole ·
`strata/research.md` §23.0–§23.16 whole · `src/store.rs` `:660`–`:790`, `:769`–`:899`, `:1470`–`:1769` · `src/args.rs` `:150`–`:189` ·
`src/error.rs` `:160`–`:209` · `bindings/js/src/facade.rs` `:990`–`:1109`, `:1266`–`:1367` · `bindings/js/src/entry/frame.mjs`
`:150`–`:269` · `bindings/js/src/entry/delivery.mjs` `:90`–`:309`, `:490`–`:589`, `:840`–`:1039` · `bindings/js/src/entry/state.mjs`
`:290`–`:359`, `:640`–`:719`, `:790`–`:939` · `bindings/js/src/entry/constraints.mjs` `:2975`–`:3044` · `bindings/js/index.mjs`
`:440`–`:559`, `:845`–`:924` · `bindings/js/index.d.ts` `:200`–`:319`, `:415`–`:484`, `:490`–`:584`, `:600`–`:689`, `:955`–`:1049`,
`:1265`–`:1304` · `docs/specs/storeroom-js/surface.md` `:1645`–`:1739`, `:1880`–`:1922` · `docs/specs/storeroom-js/contract.md`
`:582`–`:626` · `docs/L1/modules.json`.

**NOT OPENED:** `src/lib.rs`, `src/json.rs`, `src/value.rs`, `src/records.rs`, `bindings/js/src/crossing.rs`, `bindings/js/src/codec.rs`,
`bindings/js/src/entry/{class-decision,carrier,refusal,artefact,constraint-kernel}.mjs`, `bindings/js/src/entry/kernel-*.mjs`,
`tests/**` (every cell figure below is carried from a citation, none re-read), `typecheck/node_modules/provident-storeroom/index.d.ts`.

---

## §1 · The scope statement

**1.** **This is a STORE-SURFACE unit with a package half** — the store side authors `D-132`'s new construction input (a carried fact
meaning *`file` tier, no path*, spelling unruled = `SC-R2`), the image export route out of `file_snapshot` → `json::encode` →
`write_file`'s own re-decode (`src/store.rs:1482`–`:1524`; `D-133` items 1–2), the seed's decode-and-install at construction
(`src/store.rs:1714`–`:1755`; `D-135` items 1–3), the treatment of the store's own writer on that arm (`D-133` item 3), and the appended
23rd member of the closed set (`src/error.rs:171`–`:196`; `D-130` item 2, unnamed = `SC-STATUS`); and the package side, beside them, puts
the three new `cfg` keys through `encodeConfig`, replaces the terminal arm's file write with the `saveCall` invocation on the image the
store hands out, starts all delivered bodies together and withholds the answer until the set settles, invokes `channel` per write and
attaches its data **beside** the receipt under its own accessor, and carries the declaration.
**2.** **Not in this design:** every priceable declaration — `SC-2`'s answer and outside form, `SC-R2`'s spelling, `SC-3`'s
path-less-writer answer, `SC-6`'s rollback producer, `SE-1`…`SE-8`, `CH-2`/`CH-3`/`CH-4`/`CH-7`/`CH-8`, the accessor's name and
emptiness, the status's name/rank/message, both carriers, the release class — and every deferred measurement — `A112`'s conformance,
`SE-7`'s ordering region, `SC-9`'s cells, `NEW-1`'s instrument, `Listener`'s `tsc` assignability, `SC-8`, and `VN-3`'s replacement
observable's own drive.

---

## §2 · The module division

### 2.1 The store side — `store-core`, `store-args`, `store-value`, `store-fail-set`

| file · existing name | the act it gains | what it costs there |
|---|---|---|
| `src/args.rs` · `StoreConfig` (`:156`–`:162`), `FilePathArg` (`:69`), `JournalLengthArg` (`:81`), `ConstraintsArg` (`:128`) | **the *file tier, no path* carrier** (`D-132` item 1) and **the seed's carrier** (`SE-1`, two shapes) | two placements, priced: **(i)** a field on `StoreConfig` — refused today for `constraints`, whose own clause says a fourth field *"would refuse to compile every Rust drive"* (`src/store.rs:666`–`:670`); **(ii)** a carrier **beside**, on `ConstraintsArg`'s own precedent (a third argument, or `storeCreateWithConstraints` widened) — the shape the corpus already uses for `cfg`'s fourth key. The seed's carrier enum is `SE-1`'s; its name is not minted here |
| `src/store.rs` · `storeCreateWithConstraints` step 3 (`:690`–`:702`) | **the probe is SKIPPED** where the new input says so — a new act, and `D-132` item 2's REVERSAL of `contract.md:4868`'s *"NO SECOND PREDICATE IS AUTHORED"* | `path_is_reachable` (`:884`–`:899`) keeps its bytes and loses one caller on that arm |
| `src/store.rs` · step 4b (`:730`–`:747`) | `register_tier` answers `Tier::File` with `file_path` empty — **the third entry condition** | the exclusive create's two arms are skipped, so `FilePathUnreachable` (rank `13`) has no subject on this arm (`D-132`'s own item 5) |
| `src/store.rs` · step 7 (`:786`–`:789`), `store.born` (`:842`) | **the seed's decode then `install_file_image`** (`:1747`) | the seed sits at one of two instants and the choice is `SE-4`'s; **`born = store.capture_register()` at `:842` is the replay floor**, so a seed installed after it is outside the floor (`SE-8`) |
| `src/store.rs` · `commit_file` (`:1581`–`:1611`) | **the path-less writer's answer** (`SC-3`, promoted to required by `D-132` item 2; `D-133` item 3 answers it *suppressed*) | mechanism priced: **(i)** a carried bit read at `:1582` (a store early return — which leaves `Entry::saved` `false` forever, §4 (v)); **(ii)** no store byte, the package's abstention at `delivery.mjs:939`, leaving the writer reachable from the one other caller (`constraints.mjs:2989`) |
| `src/store.rs` · `file_snapshot` (`:1482`) + `write_file` (`:1515`–`:1533`) | **the export act**: the same chain answers the TEXT instead of reaching `:1525`'s sibling and `:1527`'s rename | no new abstraction: `:1516`–`:1524` (compose → re-decode → accept) is factored so both callers take it, which discharges `SC-R4` by construction; the factoring's name is the implementation's |
| `src/store.rs` · `read_file_image` (`:1714`–`:1739`) | **the seed decodes through the store's one decoder** — its TAIL only (`json::decode` `:1730` + the `is_admitted()` filter `:1734`), because the function reads `self.file_path` | `FileImage::Refused` (`:1737`) is the seed's arm → rank `22` (`D-135` item 3). No parser enters the package |
| `src/store.rs` · `save_owed` (`:1666`–`:1678`), `Entry::saved` (`:1592`, `:1598`) | **the journal's treatment of a seed**: SILENT (`SE-3`, `SE-7`) | the bytes that bind it: `save_owed` keys on a DEPARTURE, so a seeded store owes nothing until an act moves a `file`-tier version; `saved` is set on one arm only |
| `src/error.rs` · `CODES` (`:171`–`:196`) + `storeErrorMessage`'s lookup (`:168`–`:170`) | **the appended 23rd member** and its generated clause | `[&str; 22]` → `[&str; 23]`; the name, rank and message are `SC-STATUS`, **the architect's** |
| `src/lib.rs` | any re-export a new carrier type needs | **NOT OPENED — SILENT** |

### 2.2 The addon — `binding-crossing`, `binding-codec`, `binding-facade`. Two priced alternatives; none chosen

**The export carrier (`D-133` item 1's two survivors).**

- **(a) a tenth entry.** Moves the addon's export set — and **the figure `surface.md:1917` prints for that set (`5`, at
  `facade.rs:1577`–`:1581`) DOES NOT RESOLVE at this tree**: `facade.rs` is `1367` lines and the hand-built export table with every shim is
  deleted at `:1348`–`:1367`. What this pass re-derived at these bytes is twelve `#[napi(js_name = …)]` entries (`:581`, `:627`, `:669`,
  `:713`, `:752`, `:786`, `:852`, `:895`, `:920`, `:951`, `:986`, `:1034`) and four `pub fn` names (`:329`, `:1139`, `:1216`, `:1266`).
  **So arm (a)'s price is `NOT DRIVEN` until the export set is re-derived by a pass with a built artefact.**
- **(b) a position on `commitFile`.** Moves `facade.rs:1028`–`:1033`'s *"NO POSITION IS MINTED AND NO ARITY MOVES"* and its
  `10 + 2 = 12` / `4 + 12 = 16`; `surface.md:1915`'s *"its one argument is an op id and its answer is `undefined`"*; `delivery.mjs:939`'s
  call. It makes one entry answer a string on one reading and `undefined` on the other two. **The dispatcher-token set `surface.md:1915`
  fixes at `8` is likewise stale of the tree** (`:1269`–`:1337` is `errorMessage`'s body, read whole): record it, do not price it.

**The import route (`VN-8`'s `{1,2,3}`).** **(i) none** — the seed rides the construction and a `saveCall` store never reads back
(`D-134` item 1). **(ii)** a new entry accepting text. **(iii)** a third reading of `commitFile`'s ABSENT carrier, which is today the
reversal's `save_state` (`facade.rs:1063`–`:1074`) — a declared-answer change on a position that already carries two readings, and the
dearest. If any carrier accepts text, `binding-codec` gains a text conversion; whether a general text carrier exists today is
**NOT VERIFIED** (only `codec.op_id`'s string read was seen).

### 2.3 The package — which existing part owns each new behaviour

| part · name | owns | the neighbour it does NOT own |
|---|---|---|
| `frame.mjs` · `encodeConfig` (`:203`–`:222`) | the three new keys' membership tests, **split by whether the value can cross**: `saveCall` and `channel` are caller FUNCTIONS and **must not cross** (`:42`–`:44`), so their handling is the STRIP shipped twice already (`cfg.listeners[].listener`, `cfg.constraints[].constraint`, `D-26`); the **seed** and the **`D-132` bit** DO cross, so they are this file's members + `carrier.mjs`'s encoders (`encodeFilePath`'s string shape, or `encodeValue` under `SE-1`) | the two functions' *consumers* — the construction and the terminal arm — are not this file's |
| `delivery.mjs` · `deliver` (`:105`–`:209`) | **the awaiting**: start-all + the settle wait. Its snapshot (`:154`–`:183`), its dedupe on `entry.handle` (`:160`) and its one-argument invocation (`:206`) are UNMOVED | its declared answer in `modules.json` is `void` — **the one endpoint signature this plan moves** |
| `delivery.mjs` · `terminalArm` (`:875`–`:990`) | the ORDER (SAVE `:939` → DELIVER `:987`), which SURVIVES (`D-117`; `FR-5`); the save's ACT changes identity, `:944`'s mark loses its producer, `:987` becomes awaited | the store's own writer (§2.1) |
| `delivery.mjs` · `installRegistrationSeam` (`:271`), `registerOn`, `registrationDelivery` (`:524`–`:585`) | unchanged in shape; `:575` is one of `CH-2`'s five sites, `:580`'s slot one of §4 (iv)'s five | — |
| `state.mjs` · `openCommit` (`:664`–`:702`), the bracket (`:811`–`:845`) | **§4 (iv)** — and only §4 (iv) | the registry, the delivery loop |
| `constraints.mjs` · the accessor family `defineDiscardWitness` (`:1924`) / `defineResolutionLog` (`:1961`) | **the receipt's accessor** is the THIRD of this family; `judgeReversal`'s save (`:2989`) and its per-leg `deliver` (`:3037`) are `CH-2`'s sites | — |
| `index.mjs` · the member frames (`:906`'s `defineProperty` precedent, `legDelivery`/`listenerFailure`/`registrationDelivery` `:484`/`:496`/`:492`, `deliverAtTheCreation` `:301`/`:2171`) | where a receipt is built and where the five slots are declared | — |
| `index.d.ts` (`js-declaration`) | §3, whole | — |

**The overloaded part, named.** `deliver` today owns **one** behaviour. Under a naive division it would own **five** — invocation,
start-all, settlement, the channel's invocation and both plurality rules — and would become the only place a correctness property lives
and the only place a caller's return value is read. **That is the failure this section exists to prevent.** The division splits it at its
own seam: `deliver` keeps invocation + settlement; **the plurality device is either factored into one new file inside
`js-registry-delivery`** — one line: *hold the delivered set's settlement: the running count, the start-all, the one rejection that crosses
and the per-handle value map, answered to the arm that attaches them* — **or stays inside `deliver` and pays by `deliver`'s answer ceasing
to be `void`.** No new module id is minted either way (`docs/L1/modules.json` stays at `19` modules; endpoint counts go through
`role_l2_integration`).

---

## §3 · The declaration's delta (`bindings/js/index.d.ts`)

**`StoreConfig` — BEFORE (4 keys, `:220`–`:319`):** `journalLength: number` · `listeners: readonly unknown[]` · `filePath?: string` ·
`constraints?: readonly {address: Address; id: string; constraint: Constraint}[]`.
**AFTER (7 keys):** the four above, **unmoved**, plus:

| new key | its domain, priced | its outside form, priced |
|---|---|---|
| `saveCall?` — the spelling is the architect's own word (`D-131`) | **`SC-2` is unruled**: (a) `(image: string) => boolean`; (b) `=> unknown` read for truthiness (*"expecting a return of `True`"*); (c) `=> {ok: …}` outcome record. `(async optional)` is the request's own word, so a `Promise` answer is in the domain | absent (in domain, `D-132` aside); present-not-a-function → **three arms**: `cfg`'s class gate `AddressMalformed` (`frame.mjs:204`–`:210`) / `PAR-JS-12`'s one non-store `TypeError` (`CH-8`'s class) / ignored like a key beyond the four (`contract.md:3981`) |
| `channel?` — the architect's own word | `(values: {readonly [handle: string]: unknown}) => unknown`; the answer rides **beside** the receipt (`D-136`) | absent (in domain); non-function → `CH-8`: a **second** non-store `TypeError` site is a second failure form and `DD-12`'s one-form law is a declared refusal (`contract.md:591`) |
| the seed key — **name not the design's** (`D-134`'s terms) | `SE-1` splits: (a) the store's image TEXT (`string`) — the cheaper, `D-135` item 2; (b) the caller's own DATA (`unknown`, the crossing's domain and ceilings); (c) both | absent; empty string; a non-string where a string is declared; and `SE-5`'s *is it legal without `saveCall`* |
| *(and the `D-132` bit — a fourth input, `SC-R2`)* | **not necessarily a `cfg` key**: (i) the package DERIVES it from `saveCall`'s presence — but a key the package injects is `DD-36`'s declared refusal (`:617`); (ii) a caller-spellable key — which moves `D-131` item 1's seven; (iii) a `filePath` sentinel — measured refused, `AddressMalformed` (`D-132` item 1) | — |

**The receipt's accessor (`D-136`).** `WriteRecord` **BEFORE — 3 typed + 2 non-enumerable accessors:** typed `op` (`:617`) · `watched`
(`:618`) · `triggered` (`:620`); accessors `discarded` (`:621`–`:644`) · `log` (`:645`–`:680`). **AFTER — 3 typed + 3 accessors:** the same
three typed (**unmoved, `Object.keys` stays `["op","watched","triggered"]`**), the same two accessors, plus **one third non-enumerable own
accessor** whose **name is a hole (`CH-NAME`)** and whose **emptiness is a hole (`CH-EMPTY`)**: absent where no channel stands vs
present-and-empty (`:670`–`:672`'s `log` precedent; `D-136` item 1). `Object.getOwnPropertyNames` moves `5 → 6` — the only census that moves.

**`CommitRecord` — unmoved at 4 typed** (`:964`, `:966`, `:968`, `:993`); **`triggered`/`pending` stay `TriggerPair[]`** — the map does not go
in them (`P-5`'s MUST NOT).

**`StoreInstance` — unmoved at 15 own members** (`:1047`, `:1049`, `:1087`, `:1121`, `:1140`, `:1148`, `:1213`, `:1228`, `:1273`, `:1287`,
`:1292`, `:1325`, `:1327`, `:1329`, `:1416`) under `D-131` item 1 read by context (`channel` is a `cfg` key); it moves `15 → 16` **iff
`CH-1` reads otherwise**.

**`Listener` and the return-value type (`RM-8`).** BEFORE: `export type Listener = (address: Address) => void;` (`:573`). AFTER: a
**non-`void`** return, priced: `=> unknown` (the widening that keeps every existing function assignable) vs `=> unknown | Promise<unknown>`
(which declares the suspension in the type). **`RM-8`'s amendment home is `surface.md §2.7` item 5 (`:1716`–`:1717`'s *"NO RETURN VALUE IS
READ"*) and `PAR-JS-12`'s row has no live home** (`W-5`).

**`StoreStatus` `22 → 23`.** BEFORE: 22 literals `'AddressMalformed'` (`:422`) … `'FileImageRefused'` (`:443`) plus `(string & {})` (`:444`).
AFTER: 23 literals + the escape arm. **The appended literal is `SC-STATUS` — name, rank and message the architect's; none minted here.**
Union order carries no rank (rank is `CODES`'s order, `src/error.rs:171`–`:196`), so appending at `:443`'s tail is spelling-neutral and
leaves all 22 unmoved.

**And the four sites that still declare a rejection is not the failure form** (`index.d.ts:498`–`:499`; `surface.md:1275`–`:1278`;
`contract.md:591`; `brief.md:287`–`:289`) — the declaration's own is `:498`–`:499`, and it moves **or the 23rd status is unreachable from a
typed consumer.**

---

## §4 · The six contracts the code must hold

**(i) The export/import carriers — lands §2.1's export act + §2.2.** Cost: two priced carriers whose census figures **do not currently
resolve** (§2.2), `SC-R4`'s self-verification (discharged by reusing `:1522`–`:1524`), and the import route's `{1,2,3}` range — a range, not
a figure.

**(ii) The receipt's accessor — lands `constraints.mjs`'s define-family + `index.mjs`'s receipt frame + `index.d.ts`.** Cost:
`getOwnPropertyNames` `5 → 6`; `Object.keys` unmoved; the shipped accessor-census cells (`index.d.ts:638` names
`blind-entry-module.test.mjs` and `surface.test.mjs`); and the name/emptiness pair, two different observables.

**(iii) The 23rd status's seat, and both plurality rules — priced once.** Seat: `CODES`'s append + the generator clause + `StoreStatus`'s
literal. The two rules are one question at two ends of one window: with `start all`, `N` bodies settle into `N` **values** and `N` bodies can
reject into **one** `{status, message, log, address}`. **A map answers the values by construction** — one entry per handle, and `deliver`'s
dedupe (`:160`) means one trigger set never yields two entries for one handle — **and answers the rejection not at all.** Four priced arms
for what crosses on a rejection: **first-to-settle** / **a declared order** (which needs a monotonic ordinal the store's record does not
carry — `DD-22`'s own `alt`, `contract.md:602`; a collision stated as a price, not a recommendation) / **a list** (which makes the form's
`log` and the form's one-ness disagree) / **one refusal per call** (which changes what an answer *is*).

**(iv) The five slots under suspension — `D-130` item 5 makes this the design's own obligation, and a crossed slot is a defect.** The
slots: `EXTERNAL_COMMIT`/`EXTERNAL_DEPTH` (`state.mjs:319`, `:328`; bracket `:811`–`:845`) · `state.legDelivery` (`index.mjs:484`, set
`:858`, restored `:915`, read `delivery.mjs:984`) · `state.listenerFailure` (`delivery.mjs:580`, declared `index.mjs:496`) ·
`witnessDiscardedReversal` (`index.mjs:905`) · `REPAIR_LEGS_LAST` (`state.mjs:836`, read `:886`).

**The device, and its price.**

- **A stack discipline is the arm the mechanism REFUSES.** The stack already exists (`windows`/`externalAt`/`marks` are *"one stack read
  three ways"*, `state.mjs:713`–`:716`) — and **the bracket's `finally` runs at the body's first suspension** (`:826`–`:839`), so the pop
  happens while the body has not finished and a second body's push lands on the first's frame. Price of the arm: it is already shipped and
  already defeated.
- **Arm (A) — per-window state on the attempt.** The per-instance index already mints a window identity at the opening (`index.windows`,
  `:681`) and stands `externalAt`/`marks` beside it; the five facts move onto that window entry, so a second window's body reads its own.
  Cost: the index's window value widens (invisible to every census) **and** `EXTERNAL_COMMIT`/`EXTERNAL_DEPTH` cease to be read/written at
  `:667` and `:675` and are read off the window the call belongs to. The dearest arm, and the only one that makes two concurrent windows
  sound.
- **Arm (C) — an ownership rule: everything the arm needs is CAPTURED INTO LOCALS BEFORE ANY BODY RUNS.** The terminal arm already does it
  (`const answer = state.leg` `:887`; `:975`–`:977`) and `W-3` proves it sufficient for the leg slot. Extended, it kills `legDelivery`'s read
  at `:984` (a suspended `delete`'s `finally` restores `'arm'` early and an interleaved write's arm then delivers into the delete's window,
  silently, no code, no log), `listenerFailure`'s two overwriting throwables, and `witnessDiscardedReversal`'s mis-attribution. Cost: one
  local per slot plus the removal of each slot's *second* reader — the cheapest arm, and the one that does not survive a body reading package
  state across its own suspension.
- **This is the one place the deliverable is a correctness property.** Recommended device (an ORDER of work, not a declaration): **(C)
  first, wherever a slot has one reader; (A) for the two `EXTERNAL_*` slots, which no capture can save.**

**(v) The save's failure machinery.** `VN-2`: `Symbol.for('provident-storeroom.save-failed-at-the-terminal-arm')` (`surface.md:1919`–`:1922`,
set at `delivery.mjs:944`) carries *"the very throwable the store's `commit_file` rethrew"*; a `saveCall` refusal is not a rethrow, so either
the mark's sentence is amended to the package's own throwable (same device, one layer up, no member moved) or the kernel's classification has
no subject. `§2.11` cl. 5's rollback producer (`surface.md:1899`) is `commit_file`'s `Err` arm (`store.rs:1601`–`:1609`) and a package save
has no such arm — `SC-6`'s three classes (a store entry · a package second mechanism, which the corpus's one-mechanism discipline makes a
`DD` refusal · the declaration loses its mechanism). `Entry::saved`'s keeper (`:1592`, `:1598`): on the suppressed arm the store never sets
it, so *"once per record"* (`:1573`–`:1580`) has no subject; its home is priced (a package mark under `A117` / a store mark kept by whichever
act saves / `save_state`'s image comparison at `:3418`–`:3421`, which writes no byte for an identical image).

**(vi) `VN-3`'s lost durability observable.** `surface.md:1898` (ii)'s observable is *"the file's own bytes read from a fresh instance over an
equal `cfg.filePath`"*; under `saveCall` that instance reads the **stale** file (`D-133` item 4). The test's **subject** is gone, not just its
mechanism. Replacement priced: **(a)** the argument's identity — the text `saveCall` received is byte-identical to `file_snapshot` →
`encode` of the register at that instant (`D-133` item 4 measured this for the ordinary state, and the two texts **diverge** wherever a
`mem`/`temp` version shadows a `file` one); **(b)** the caller's own backend, which the package may not read (`A57`; `P-SR-7`) and which makes
the arm's durability unobservable in this repository — to be said in the declaration rather than discovered.

---

## §5 · The unit division and its order

| unit | one-line scope | file set | depends on | deliberately does not | landing |
|---|---|---|---|---|---|
| **`U-STOREROOM-01 TIER-WITHOUT-PATH`** | the third `file` entry condition and its carrier, end to end | `src/args.rs`; `src/store.rs` (`:690`–`:747`); `bindings/js/src/{crossing,codec,facade}.rs`; `entry/frame.mjs` (`encodeConfig`) | nothing | mint `SC-R2`'s spelling; invoke anything; touch the status set | **BLOCKED on `SC-R2`**; **lands WITH `U-02`** |
| **`U-STOREROOM-02 WRITER-ON-THE-PATHLESS-ARM`** | what the store's writer answers on a register with no path | `src/store.rs` (`commit_file` `:1581`–`:1611`); `entry/delivery.mjs` (`:939`, `:944`) | `U-01` | perform any save; roll anything back | **with `U-01`** (the bit alone makes the writer reachable — `D-132` item 2) |
| **`U-STOREROOM-03 IMAGE-EXPORT`** | `file_snapshot`+`encode`+re-decode, handed out | `src/store.rs` (factoring of `:1516`–`:1524`); `bindings/js/src/{crossing,codec,facade}.rs`; `entry/state.mjs`/`index.mjs` if a frame is owed | `U-01` for the path-less arm only (a `filePath` store's export is drivable before it) | choose the carrier; parse in the package | independently drivable; **lands WITH `U-04`** |
| **`U-STOREROOM-04 SAVE-CALL`** | the package performs the durable save instead of the file write | `entry/{frame,delivery}.mjs`; `index.mjs`; the declaration's key | `U-03` (no payload otherwise), `U-02` | roll back (`SC-6`); mint an answer form (`SC-2`) | **with `U-03`** |
| **`U-STOREROOM-05 SEED`** | the construction begins with content | `src/store.rs` (decode tail + step 7); `src/args.rs`; addon; `entry/{frame,carrier}.mjs`; `index.mjs` | `U-01`; `SE-1`; `SE-2`/`SE-4` ruled | parse in the package; mint a code (rank `22` is the seat) | **BLOCKED on `SE-1`** |
| **`U-STOREROOM-06 DELIVERY-SETTLE`** | start all bodies together; withhold the answer until the set settles; no slot crosses | `entry/{delivery,state}.mjs`; `index.mjs` (`:484`, `:496`); `entry/constraints.mjs` | nothing store-side | assert an order; catch a body's throw (`DD-23`); reach Rust | **independent; lands FIRST** |
| **`U-STOREROOM-07 STATUS-23`** | the appended member, its seat, and what crosses on a rejection | `src/error.rs`; `index.d.ts`; `entry/{delivery,refusal}.mjs` or the factored settlement file | `SC-STATUS`; §4 (iii)'s plurality ruling | widen rank `21` | **BLOCKED on `SC-STATUS`** |
| **`U-STOREROOM-08 CHANNEL`** | per-write invocation, the map, the accessor beside the receipt | `entry/{frame,delivery,constraints}.mjs`; `index.mjs`; `index.d.ts` | `U-06`; `U-07` | replace the receipt (`D-136` item 2); push into `triggered`/`pending`; batch | after `U-06` and `U-07` |
| **`U-STOREROOM-09 DECLARATION-AND-CELLS`** | the whole §3 delta and §6's cells | `index.d.ts`; `tests/e2e/**`; `tests/unit/**`; `tests/integration/store-core/*` | every unit above whose face it declares | amend any spec | **last** |

**The order, and why no landing breaks the tree:** store-side inputs (`01`+`02`) → the artefact (`03`+`04`) → the seed (`05`) → the delivery
machinery (`06`) → the status (`07`) → the channel that rides on it (`08`) → the declaration with the tests (`09`). **Independent:** `U-06`
alone, and `U-03`'s `filePath` half. **Must land together:** `{01,02}`, `{03,04}`, and `09` after all.

**Owed amendments these units carry and do not write** (`role_spec_writer`'s): `surface.md:1654`–`:1663` (`RM-2`) · `:1716`–`:1717` (`RM-8`) ·
`:1915` (*"its answer is `undefined`"*) · `:1899` (cl. 5's producer) · `:1897` (cl. 3 (ii)) · `:1919`–`:1922` (the mark's subject) ·
`contract.md:591`/`:602`/`:603` (`DD-12`/`DD-22`/`DD-23`) · `brief.md:333`'s INVARIANT 6 (`D-133` item 5).

---

## §6 · The cells the units owe — by class, not written

| class | the cell | the clause it answers |
|---|---|---|
| **`S-TIER-3RD`** | the third entry condition: `{saveCall, no filePath}` enters `file` (a `file`-tier write passes, a body runs, `saveCall` is reached); and `{no saveCall, no filePath}` stays `mem` (today's measured `ParentAnchorMonotonicityViolation`) | `D-132` items 1–2 |
| **`S-EXPORT-BYTES`** | the export's text is byte-identical to the bytes the writer would place for the same state, and equals `JSON.stringify(read([]))` **only where no `mem`/`temp` version shadows a `file` one** | `D-133` item 4 |
| **`S-EXPORT-REFUSES`** | an image the loader would refuse is refused **at the export**, so `SC-R4`'s check has a producer | `D-133` unresolved item 2 |
| **`S-SEED-INSTALL`** | a seeded store reads the seeded member at `file` tier, whole, with no op journaled for it | `D-135` items 1–2 |
| **`S-SEED-REFUSED`** | an admissible-but-foreign image answers rank `22` `FileImageRefused`, no instance, nothing left behind | `D-135` item 3 |
| **`S-SETTLE`** | every member of the delivered set ran before the answer **and the bodies were started together** — one body suspending does not delay a sibling. **No order is asserted: a drive compares sets, never sequences** | `D-130` items 3–4; `surface.md:1664`–`:1666` |
| **`S-REJECTED-BODY`** | a rejecting body crosses as the 23rd status's one four-member form, the store's record stands, nothing rolls back | `D-130` items 1–3 |
| **`S-RECEIPT-ACCESSOR`** | `Object.keys(record)` is `["op","watched","triggered"]`; the descriptor exists with `enumerable: false`; `getOwnPropertyNames` reads one more than today; and the absent-channel arm per `CH-EMPTY` | `D-136` items 1, 4 |
| **`S-SLOTS`** | five cells, each with **two suspended bodies**: both bodies' writes open their own commits; a suspended `delete` does not make an interleaved write's terminal arm skip its delivery; two registration deliveries keep their own throwables; a discarded reversal is attributed to its own window; a repair's legs are not read by the wrong arm's judgement | `D-130` item 5's last sentence; `N-4` |
| **`S-A112`** | **`OWED`, and it stays `OWED`** — constraints-before-listeners under a suspension is not measurable until `RM-5`'s instrument exists. Named here; no cell is written. | `brief.md:344`–`:358` |

---

## §7 · The priceable choices — what moves, for each arm, nothing recommended

| `#` | the arms | what moves |
|---|---|---|
| **the export carrier** | **(a)** a tenth entry · **(b)** a position on `commitFile` | (a) the addon's export set — figure unresolved (`NOT DRIVEN`), two stale citations recorded · (b) `facade.rs:1028`–`:1033`; `surface.md:1915`; `delivery.mjs:939` |
| **the import route** | **(i)** none · **(ii)** a new entry accepting text · **(iii)** a third reading of `commitFile`'s ABSENT carrier | (i) nothing, `D-134` item 1's direction stands · (ii) the export set again · (iii) `facade.rs:1063`–`:1074`; `constraints.mjs:2989` |
| **`SC-2`** — `saveCall`'s answer | **(a)** `boolean` · **(b)** truthiness · **(c)** an outcome record | (a) `frame.mjs`'s boundary + `delivery.mjs:939`'s catch · (b) *"verbose error log"* makes the arm observable-ambiguous · (c) a record shape the corpus lacks for a `cfg` callback |
| **`SC-2`** — its outside form | **(a)** `cfg`'s class gate · **(b)** `PAR-JS-12`'s `TypeError` · **(c)** ignored | (a) `frame.mjs:204`–`:210` · (b) a second non-store form vs `contract.md:591` · (c) `contract.md:3981`; `frame.mjs:218` |
| **`SC-R2`** — the tier input's spelling | **(a)** package-derived · **(b)** a caller key · **(c)** a `filePath` sentinel | (a) `contract.md:617`'s fifth-key refusal · (b) `D-131` item 1's seven · (c) measured refused |
| **`SC-3`/`SC-R3`** — the path-less writer | **(i)** a carried bit in `commit_file` · **(ii)** the package's abstention | (i) `store.rs:1581`–`:1611` gains a guard with an answer, `saved` never sets · (ii) no store byte; `constraints.mjs:2989` remains |
| **`SC-6`** — who rolls a failed save back | **(a)** a store entry · **(b)** a package mechanism · **(c)** the declaration loses its mechanism | (a) a new act beside `save_state` · (b) a second mechanism, a `DD`-class refusal · (c) `surface.md:1899` + `store.rs:1601`–`:1609` |
| **`SE-1`** — the seed's shape | **(a)** image text · **(b)** caller data · **(c)** both | (a) `:1730`+`:1734` factored, rank `22` as the arm · (b) the crossing's whole construction validation + a branch-tree mint · (c) both arm sets |
| **`SE-2`/`SE-3`/`SE-4`/`SE-5`/`SE-6`/`SE-8`** | tier · op-or-base-state · vs a readable file · legal without `saveCall` · instant & code · undo window | `install_file_image:1751` · `:842`'s `born` · `:786`/`:789` · `frame.mjs`'s membership · `error.rs:195` vs `:185` · `journalLength` + `born` |
| **`CH-2`** | the channel's instants | `delivery.mjs:987` · `index.mjs:887` · `constraints.mjs:3037` · `index.mjs:334` · `delivery.mjs:575` |
| **`CH-4`** | a channel failure | (a) refused with the 23rd · (b) caught and reported — `DD-23`'s refused act · (c) thrown through |
| **`CH-7`** | invoked only when a listener returned a value | a condition with no declared home |
| **`CH-8`** | the channel's answer + the non-function channel | a second non-store `TypeError` is a second failure form — `DD-12`'s refusal |
| **the receipt accessor** | `CH-NAME` · `CH-EMPTY` | `index.d.ts:662`–`:663`; `:670`–`:672`'s `log` precedent |
| **`Listener`'s return** | `=> unknown` · `=> unknown \| Promise<unknown>` | `index.d.ts:573`; `surface.md:1716`–`:1717`; `PAR-JS-12` has no live home |
| **the plurality device** | first-to-settle · a declared order · a list · one refusal per call | §4 (iii) |

**`NOT DRIVEN`:** every census figure a build would re-derive; the `file`-tier cells' redness (`SC-9`); `A112`'s conformance;
`Listener`'s `tsc` assignability; `SE-7`'s ordering region. **No drive, no build and no `tsc` was run by this pass.**

---

## Envelope

**Two findings against the record, both `path:line`:** (1) **`surface.md:1917`'s addon-export citation does not resolve** —
`facade.rs:1577`–`:1581` is past the end of a `1367`-line file, and the export table those lines named was deleted at `:1348`–`:1367`;
(2) **`surface.md:1915`'s dispatcher table does not resolve either** — `:1269`–`:1337` is `errorMessage`'s body. Both are the class
`strata/walkthrough.md §3` exit question 5 calls a defect by definition. **Neither is priced here.**

**The unit's first sentence must read:** *"This is a STORE-SURFACE unit with a package half — `D-132`'s new construction input, the image
export, the seed's decode-and-install and the 23rd member are the store's, and the three `cfg` keys, the awaited delivery, the `saveCall`
substitution and the channel's accessor are the package's."*

**The three units to land first, in this order (ordering is the architect's; no declaration is):** **`U-06 DELIVERY-SETTLE`** — the only
unit needing no unruled declaration to start, and the only one whose deliverable is a correctness property; **`U-03 IMAGE-EXPORT` on a
`filePath` store** — drivable today without `SC-R2`, discharges `SC-R4` by construction, and is the payload `U-04` cannot exist without;
**`U-01` + `U-02` as one landing** — the bit alone makes a path-less writer reachable (`D-132` item 2's own hazard), and they are the gate
every `saveCall` cell passes through.

---

## §8 · AMENDED `2026-11-17` — the four choices `D-137` took, and what they change in this plan

**This section is later than §1–§7 above and supersedes them where they meet.** Each change is named with the section it lands on.

| `#` | what `D-137` decided | what it changes here |
|---|---|---|
| **1** | **the export carrier is a NEW ADDON ENTRY** (not a position on `commitFile`) | **§2.2's two alternatives collapse to one.** Arm (a) governs; arm (b) and its census cost (`facade.rs:1028`–`:1033`, `surface.md:1915`, `delivery.mjs:939`) are **not moved at all**. **The addon's entry set moves `12 → 13`, counted at this tree** — the twelve `#[napi(js_name = …)]` at `facade.rs:581`, `:627`, `:669`, `:713`, `:752`, `:786`, `:852`, `:895`, `:920`, `:951`, `:986`, `:1034` — **and `surface.md:1917`'s figure of `5` is a recorded defect, not a price.** |
| **2** | **the entry is `exportImage`: position-less, answers the image text, marks nothing** | **§2.1's export act gains a name and loses an ambiguity.** It writes no byte, sets no `saved`, appends no journal entry, and the re-decode at `src/store.rs:1522`–`:1524` becomes an assertion inside it — **`SC-R4` discharged by construction.** **Its arity is the architect's spelling and not a ruling** (`D-137` item 2 of its unsettled): a design needing the op's identity must return to him. |
| **3** | **the tier-without-path input is `durable_without_path`, an ARGS carrier, not a `cfg` key** | **§2.1's `src/args.rs` row is decided**: the flag lands beside `FilePathArg`/`JournalLengthArg`/`ConstraintsArg`, **and the package sets it when `saveCall` is present and `filePath` is absent**. **§3's `cfg` delta stays at SEVEN keys** — the fourth row of its table (the `D-132` bit) is **deleted as a `cfg` question** and becomes an args question. **`SC-R2` closed.** |
| **4** | **the seed is IMAGE TEXT ONLY and its key is `initialImage`** | **§3's seed row collapses to one arm**: `initialImage?: string`, decoded by the store's own tail (`json::decode` + `is_admitted()`), refused at rank `22` `FileImageRefused`. **`SE-1` closed; the caller-data arm and its crossing-validation cost are deleted, not priced.** **`SE-5` (legal without `saveCall`), `SE-2`/`SE-4` (tier and instant) and `SE-7` (an immediate save) stay open** — `D-137` item 4 of its unsettled. |
| **5** | **the 23rd status is rank `23` `ListenerBodyRejected`**, subject = the watched address's spelling, message generated | **§3's `SC-STATUS` hole is filled**; `StoreStatus` reads twenty-three literals plus the escape arm. **`§4 (iii)`'s seat is decided and its PLURALITY is not** — which rejection crosses when several bodies reject remains the four priced arms. **The status's CARRIER is still open** (`RM-3`): the four *"never a `Promise` rejection"* sites stand and the amendment is owed in his name. |

**What this plan's unit order now reads.** **`U-06 DELIVERY-SETTLE` and `U-03 IMAGE-EXPORT` are unblocked** — the first needs no unruled
declaration, the second now has both its carrier and its name. **`U-01`+`U-02` are unblocked too** (`durable_without_path` is spelled), **and
`U-05 SEED` is unblocked on its shape** while `SE-4`/`SE-7` remain the seed's own open questions. **`U-07 STATUS-23` is unblocked on its seat
and blocked on its plurality and its carrier.** **`U-08 CHANNEL` is unblocked except for `CH-2`/`CH-4`/`CH-7`/`CH-8` and the receipt
accessor's name and emptiness.** **`U-04 SAVE-CALL` is unblocked except for `SC-2` (its answer form) and `SC-6` (its failure arm).**

**The one item that blocks the DECLARATION and nothing else is `RM-3`'s carrier** — the question *"by what route does a rejected body's
status reach the caller, given four live sites that declare a `Promise` rejection is not the failure form?"* **Every other open item is a
unit's own price.**

---

## §9 · AMENDED `2026-11-17` — `D-138` moves the failure's carrier, and closes the last declaration

**Later than §1–§8 and superseding where they meet.**

| `#` | what `D-138` decided | what it changes here |
|---|---|---|
| **1** | **a rejecting body's status does NOT cross as a rejection — the write resolves and the status rides on the receipt** | **§4 (iii)'s seat is unchanged (rank `23` `ListenerBodyRejected`, `D-137`) and its CARRIER is now the receipt**, so **`RM-3` is closed and the four *"never a `Promise` rejection"* sites stand unamended** — the amendment §5's owed list carries at `index.d.ts:498`–`:499` is **withdrawn**, and `contract.md:591`/`surface.md:1275`–`:1278`/`brief.md:287`–`:289` keep their bytes. |
| **2** | **the reason is a durability fact, and the plan must state it** | **the delivered set runs after the terminal arm's SAVE** (this file §2.3; `delivery.mjs:939` → `:987`), **so any rejection of the awaited answer would report a durable success as a failure.** **A design that reaches for the rejection arm has mis-read the order this plan's own §2.3 declares.** |
| **3** | **the receipt now carries two data at one seat — the channel's values (`D-136`) and the delivery's failures (`D-138`)** | **§3's receipt row widens**: one accessor or two, and `getOwnPropertyNames` moves `5 → 6` or `5 → 7` accordingly. **The plurality of §4 (iii) becomes a SHAPE and not a choice among bad arms**: **a datum carrying one entry per handle drops nothing, so no rule is owed for which rejection crosses** — **priced by the design, confirmed by the architect.** **`CH-EMPTY` is now forced toward *present always*, because a body's failure must be readable exactly when no channel stands.** |
| **4** | **the synchronous throw keeps its own channel, and the asymmetry is declared** | **§4 (v)'s `VN-2` is unchanged; §1's scope gains nothing.** **No pass may harmonise the two arms**: a throw leaves the write **unanswered** (`D-73`), a rejection leaves it **answered with a datum** (`D-138` item 4). |

**THE UNITS, AFTER THIS.** **`U-06 DELIVERY-SETTLE` and `U-03 IMAGE-EXPORT` are fully unblocked** — the two the plan lands first. **`U-07 STATUS-23`
is unblocked on seat and carrier** and owes only the receipt accessor's shape. **`U-04 SAVE-CALL` remains blocked on `SC-2` and `SC-6`; `U-05
SEED` on `SE-2`/`SE-4`/`SE-7`; `U-08 CHANNEL` on `CH-2`/`CH-4`/`CH-7`/`CH-8`; `U-01`+`U-02` are unblocked and land together.**

---

## §10 · AMENDED `2026-11-17` — `D-144` closes the `saveCall` cluster, and two of this plan's rows dissolve

**Later than §1–§9 and superseding where they meet.**

| `#` | what `D-144` decided | what it changes here |
|---|---|---|
| **1** | **`saveCall`'s answer is `{success: boolean, message: string[]}`** | **§3's `saveCall` row loses its three-arm price**: one declared answer. **§7's `SC-2` rows collapse to one line.** |
| **2** | **a non-function `saveCall` is BROKEN CONFIG — refused at `cfg`'s class gate before any filesystem act** | **§3's outside-form row collapses; `§7`'s three outsides become one. `CH-8`'s one-form question is left for the CHANNEL alone.** |
| **3** | **a failed save rolls the commit back and the package sends the signal; the refusal passes through to the kernel** | **§4 (v)'s "who rolls a failed save back" is closed in direction** — `SC-6` becomes a MECHANISM question (`commit_file`'s `Err` arm, `src/store.rs:1601`–`:1609`, reached by a route the design names), **and `VN-2` gains a source.** **§7's `SC-6` row becomes "the route, and the failure's status seat".** |
| **4** | **no file reconstruction on this arm: where the store would rebuild from a file it errors as a mem-tier store would, and the client rebuilds** | **§2.1's seed row and `§4 (vi)` change**: `read_file_image`'s three classes and `D-108`'s creation-state fallback **are not reached**, and **`VN-3`'s durability observable has no subject at all on this arm** — it is **declared unobservable in this repository**, not silently missing. |
| **5** | **a second addon entry, `saveSucceeded(opId)`, tells the store the save succeeded** | **§2.1's export row gains a companion act; §2.2's entry set moves `13 → 14`** (`D-137` took it `12 → 13`); **`Entry::saved`'s keeper gap is closed.** |
| **6** | **`filePath` and `saveCall` are MUTUALLY EXCLUSIVE** | **§2.1's `durable_without_path` and the probe are the ONLY route into `file` for a `saveCall` store** — the redundancy rule is moot, **`FilePathUnreachable` has no subject on this arm**, and **§9's stale-file item DISSOLVES** (no file is written, none is read). **`D-131` item 3 is superseded; `SE-4` (seed versus a readable file) dissolves with it.** |

**The units, after this.** **`U-04 SAVE-CALL` is unblocked except for three: the rollback's store-side route and the failed save's status seat, the `message: string[]`'s rendering, and `saveSucceeded`'s arity.** **`U-05 SEED` keeps `SE-2`/`SE-3`/`SE-5`/`SE-7`/`SE-8` and `VN-5`, and gains one: what a `saveCall` store answers at boot with no `initialImage`.** **`U-08 CHANNEL` is unchanged** (`CH-3`, `CH-4`, `CH-7`, `CH-8`, the accessor's name, `VN-7`). **`U-06` is unaffected — it touches no save byte.**

---

## §11 · AMENDED `2026-11-17` — `D-145`/`D-146` close `SC-6`, and the addon's surface is a TRIO

**§2.2's two-alternative table is now a settled set of three entries**, and the failure route `U-04` was missing is one of them:

| entry | what it does | what it moves |
|---|---|---|
| **`exportImage()`** (`D-137`) | answers the store's own image text; marks nothing; writes no byte | `12 → 13` |
| **`saveSucceeded(opId)`** (`D-144` item 6) | marks the record saved — `commit_file`'s `Ok` arm, `src/store.rs:1596` | `13 → 14` |
| **`saveFailed(opId)`** (`D-146`) | **unwinds the commit — `commit_file`'s failure arm, `:1601`–`:1608` — and writes no byte** | `14 → 15` |

**So the addon's entry set is `15`, and `SC-6` is closed in full: the route is `saveFailed`, the seat is rank `15` `FileCommitFailed` widened
(`D-145` item 1), and `§2.11` clause 5's order — rollback first, the failure second — is kept verbatim.**

**Two details this plan hands to the design and neither to a ruling:** `saveFailed`'s arms where the op is unknown or owes nothing (`saveSucceeded`
refuses; the mirror of a refusal is not a refusal, and no pass may assume either), and whether its answer carries the unwound state.

---

## §12 · AMENDED `2026-11-17` — `D-147` closes the seed cluster

| `#` | what `D-147` decided | what it changes here |
|---|---|---|
| **1** | **`initialImage` is in domain on EVERY arm** (seeded `filePath` stores, seeded `mem` stores, and the `saveCall` bootstrap) | **§3's seed row is settled, and §2.1's step-7 act gains a second caller class**: **the guides owe the overwrite warning** — *"a `file`-pathed store's bytes are in danger of being overwritten"* — and **a store enforces its defaults with REPAIRS, not by refusing the seed**. |
| **2** | **NO immediate save at a seeded construction** | **§4 (vi)/§2.1 are unchanged in bytes and gain a declared consequence**: store and backend agree at instant zero, diverge after a `mem` act until the next `file`-tier write, **and the construction stays synchronous** (`DD-17` whole). |
| **3** | **provenance DECLARED AND LEFT — the image carries no identity** | **§6's `S-SEED-REFUSED` cell stands for the `Refused` class only**; **no provenance cell is owed, and a documentary duty replaces it.** **A format marker is REFUSED** (it would change every durable byte). |
| **4** | **an empty-string seed is BROKEN CONFIG** | **§3's outside forms gain one**: `''` refused at `cfg`'s class gate (`AddressMalformed`, the seat `filePath: ''` already takes — measured), **absence alone means *no seed***. |

**Still the design's, and not a ruling:** the **install order** when a `filePath` store carries both a seed and a file that holds state — a seed before
`born` (`src/store.rs:842`) and the boot's own load are two installs at `Tier::File` over one home, and the last one wins. **The guides must say which
the design runs second.**

**And the open set is now ONE cluster: the channel's five** (`CH-3`, `CH-4`, `CH-7`, `CH-8`, the accessor's name, and `VN-7`'s async-ness).

---

## §13 · AMENDED `2026-11-17` — `D-149` REMOVES `channel` AND PUTS THE VALUES ON THE RECEIPT

**This supersedes §2.2's channel column, §4 (ii)'s second accessor, §5's `U-08 CHANNEL`, and every forged-receipt row of §9–§12.**

| `#` | what changed | the plan's response |
|---|---|---|
| **1** | **`channel` is not a `cfg` key — the set is SIX** | **§3's `StoreConfig` delta drops the `channel` row.** `journalLength` · `listeners` · `filePath` · `constraints` · `saveCall` · `initialImage`. |
| **2** | **the receipt carries the listeners' return values — a fourth non-enumerable accessor, keyed by handle, valued-only** | **§4 (ii)'s accessor family grows to four** (`discarded` · `log` · `bodyFailures` · this one), **`getOwnPropertyNames` `6 → 7`**, `Object.keys` unchanged. **The name is `U-09`'s byte and the one identifier still owed.** |
| **3** | **nothing is forged; the package invokes only listeners** | **§6's forged-receipt treatment and `U-08`'s brief leave the board.** The creation and the four registration instants **ship no values**: their answers are an instance and an identity, and the caller is the one who acted. |
| **4** | **rank `24` `ChannelThrew` is withdrawn, never implemented** | **the status set stays `23`.** |
| **5** | **`U-08 CHANNEL` becomes `U-08 RETURN-VALUES`** | **one line: *carry the delivered set's settled return values on the act's receipt, one entry per handle that returned one, and nothing anywhere else*.** **It depends on `U-06` alone; its cells replace the channel's.** |

**The unit ladder, as it now stands:** `U-06` (designed) → `U-03`/`U-04` → `U-01`+`U-02` → `U-05` → `U-07` → **`U-08 RETURN-VALUES`** → `U-09` (declaration and cells).

---

## §14 · LANDED `2026-11-17` — `U-08 RETURN-VALUES`, its drive, and the one gap it carries

**THE UNIT IS IMPLEMENTED** (twelve edits: `state.mjs` ×1, `constraints.mjs` ×3, `delivery.mjs` ×5, `index.mjs` ×3), and **the battery is green: `1108` tests, `1107` pass, `0` fail.** Its shape, at its rulings:

- **`state.mjs`** mints `RETURNED_VALUES` (a `Symbol.for`) and `RETURNED_VALUES_EMPTY` (one frozen `{}`) beside `BODY_FAILURES`' pair.
- **`constraints.mjs`** gains `defineReturnedValues` — the family's **fourth** accessor, non-enumerable, `configurable`, a getter over the symbol-keyed datum, answering the frozen empty map where the key is absent — installed at the **write's** receipt build.
- **`delivery.mjs`**: `settledAnswer` installs the value map in the same frame it installs the failure datum, from the same settled list — **`bodyFailures` hands that list out with the failure map it already computed, so there is no second wait and no second settle**. A new `returnedValues(settled, invoked)` reads the **fulfilled half only**, skips a fulfilled `undefined`, and defines each row by own-property define.
- **`index.mjs`** installs the accessor at the **delete's** receipt and the **reversal's** record as well, so the member is present on every arm.

**THE DRIVE, RUN BY THE SUPERVISOR ON THE LANDED TREE (a `mktemp -d`, the checkout's own entry, `mem` tier):**

```
keys      = ["op","watched","triggered"]                      ← D-150 item 1: Object.keys unmoved
ownNames  = ["op","watched","triggered","discarded","log","bodyFailures","returnedValues"]   ← 6 → 7
descriptor= {enumerable:false, configurable:true, get:function}
map       = {"h1":{"data":1},"h2":"two"}   | h3 present = false   ← the undefined-returner contributes no entry
sync arm  = record? true | returnedValues = {} | frozen identity = true | ownNames = 7
delete    = has member? true | ownNames = 9                       ← the delete's 8 → 9
```

**Every reading the rulings name is there**: the three enumerable members unmoved; the fourth accessor a non-enumerable `configurable` getter; the map's identity for a returned object and strict equality for a string; the `undefined`-returner absent rather than present-and-`undefined`; the all-synchronous arm answering a **record** with the **shared frozen `{}`** (the same object on two reads); and the delete's receipt carrying it at `8 → 9`.

**AND THE ONE GAP, NAMED RATHER THAN GLOSSED: THE UNIT HAS NO CELLS OF ITS OWN.** **Seven were commissioned and returned, and the file did not parse** — its author wrote markdown code spans inside template literals, and sixty mechanical repair rounds left it still unbalanced. **The file was dropped rather than landed broken**, so **the only assertions of this unit's behaviour at this tree are the three re-pinned census cells** (`tests/e2e/delivery-settle.test.mjs`'s write `6 → 7` and rollback, `tests/e2e/surface.test.mjs`'s delete `8 → 9`) **plus the supervisor's drive transcript above, which is a measurement and not a cell.** **⟶ AND THE CELLS PASS LANDED THE SAME DAY, SECOND ATTEMPT, WITH THE BACKTICK HAZARD FORBIDDEN BY THE BRIEF:**
**`tests/e2e/returned-values.test.mjs`, `730` lines, seven cells `RV-1`…`RV-7`, `7` pass and `0` fail.** The file carries
**zero backtick characters and no template literal** — single-quoted strings throughout, rulings cited as plain prose — which
is the whole of what the first attempt got wrong. **So `U-STOREROOM-08` IS CLOSED: implemented, seven cells green, its
censuses re-pinned, and nothing owed.**

---

## §15 · `U-03` + `U-04` DESIGNED `2026-11-17` — `docs/L3/image-export-and-save-call/design.md`, and the TWO BLOCKING DECLARATIONS it stops on

**The design is landed (266 lines) and it plans the store-side surgery in one document because the two units land together:** the `file` tier's third entry condition and its `args.rs` carrier (`DurableWithoutPathArg`) · `compose_verified_image`, factored out of `write_file` so the export keeps the writer's own re-decode and **marks nothing** (`D-137` item 2, `SC-R4`) · `save_succeeded` and `save_failed` as the two verdict acts (`D-144` item 6, `D-146`) · the writer's suppression as the package's abstention, with every reconstruction site already answering the mem-tier way through one `file_path.is_empty()` clause (`D-144` item 5) · and the package's three `cfg`/arm acts (the exclusion's refusal, the terminal arm's `exportImage → saveCall → saveSucceeded | saveFailed` substitution, the `message[]` passthrough).

### Two figures this design CORRECTS, and both were mine

1. **THE ADDON'S ENTRY SET IS TWELVE, NOT THIRTEEN.** `exportImage` is **planned by `D-137` and not built** — `U-03` builds it. The tree carries **12 `#[napi(js_name = …)]` entries plus 4 unnamed `#[napi]` = 16 exports**, and this pair takes the named set `12 → 13 → 14 → 15` (built: `16 → 19`). **`D-137` item 1's *"the addon's entry set moves `12 → 13`"* and `D-144` item 6's *"`13 → 14`"* and `D-146` item 3's *"`14 → 15`"* are PLANNED arithmetic and not built figures** — each is true at its own landing and none is true at the tree today.
2. **THE CLOSED STATUS SET IS TWENTY-TWO IN THE ARRAYS AND TWENTY-THREE BY DECLARATION.** `src/error.rs:171` reads `[&str; 22]` and `index.d.ts:421`–`:444` lists twenty-two literals plus the escape arm; **rank `23` `ListenerBodyRejected` is USED where it crosses (`bindings/js/src/entry/delivery.mjs`) and carried by NEITHER array, because that byte is `U-07 STATUS-23`'s and `U-06`/`U-08` minted nothing.** **Every sentence of mine that said *"`CODES` moves `22 → 23`"* in the past tense was reading a ruling as a landed byte** — `D-137` item 5 and `D-145` item 1 are correct in the future tense they were written in, and the arrays are owed the member by `U-07`.

### ★ AND THE TWO DECLARATIONS THE DESIGN CANNOT TAKE

- **`O-1` — `BLOCKING` · WHERE THE SAVER'S `message: string[]` RIDES.** `D-145` item 2 requires it **in the `log`**, and **the `LogEntry` kind set is closed at four and none of them fits**. Three arms, priced by the design: **(i)** mint a **fifth `LogKind`** (`'save'`) — moves `kernel-foundations.mjs` and `index.d.ts`, two bytes outside this pair's write set, and a declared census moves; **(ii)** **join the strings into the kernel's one `outcome` entry's `message`** — no new byte, but `D-145` item 2's list shape is defeated and the kernel's composition sentence edits; **(iii)** reuse the `commit` kind — **refused**, since that kind is *"the attempt's SUCCESS arm, appended once"*. **No cell asserting the messages in the log can go green until one is taken.**
- **`O-5` — `BLOCKING`, THE ASYNC ARM ONLY · A FAILED ASYNC SAVE HAS NO ROUTE TO THE CALLER'S ANSWER.** A thenable answer is **in domain** (`D-144` item 1's *"(async optional)"*), and `settledAnswer` *"cannot reject on any arm"* while `constraints.mjs`'s branch has no third arm — **so one byte of `U-06`'s landed file is owed, or the domain narrows to a synchronous answer.** **Either way it is a declaration this design may not make.**

**Everything else the design prices and chooses nothing:** `O-2` the already-saved arm · `O-3` the path-less writer's stray sibling · `O-4` the answer's validation · `O-6` a malformed op id at the new entries · `O-8` the export's refusal seat and `FileCommitFailed`'s path slot · `O-9` the per-passing-op saver cost · `O-10` the verdict entries' reachability on a `filePath` store.

---

## §16 · LANDED `2026-11-17` — `U-03` + `U-04`, both halves, and the drive that closes the `saveCall` cluster

**BOTH UNITS ARE IMPLEMENTED AND GREEN.** The store half (16 edits: `args.rs` · `store.rs` ×4 · `lib.rs` ×2 · `crossing.rs` · `codec.rs` · `facade.rs` ×2) and the package half (`crossing.rs` · `codec.rs` · `facade.rs` · `frame.mjs` · `kernel-foundations.mjs` · `index.mjs` ×2 · `delivery.mjs` ×5 · `constraints.mjs` ×2 · `index.d.ts` ×3), with **two declaration census cells and three addon-surface cells re-pinned** where the moved figures belong.

**THE DRIVE, run by the supervisor on the landed tree (a `mktemp -d`, the checkout's own entry, `file` tier):**

```
1 non-function  -> "AddressMalformed"          ← D-144 item 2: broken config, before any filesystem act
2 both keys     -> "AddressMalformed"          ← D-144 item 7: filePath ∧ saveCall mutually exclusive
3 sync saver    -> answered a record | saver got string 7B JSON=true
   read back    -> 1                           ← the register is file-tier with no path (D-132 item 1)
4 failing saver -> threw FileCommitFailed      ← D-145 item 1: rank 15, widened
   form         -> status=FileCommitFailed | log kinds=["save","save","outcome"]
                   saver words=["backend down","retry later"]   ← D-145 item 2 + D-153 item 1
   read after   -> {"ok":false,"s":"AddressNotFound"}           ← D-144 item 3: the commit was ROLLED BACK
5 async saver   -> thenable=true | settles into -> record       ← D-144 item 1 + D-153 item 2
```

**What each line proves, at its ruling.** A non-function is refused at `cfg`'s own class gate · the pair is refused at the same instant · the saver is handed **the store's own composed image** (7 bytes, JSON-parseable — the whole state, and `read([])`'s own text exactly where no lower tier shadows it) · a failed save **rolls the commit back first and answers second**, with the caller's `message[]` riding as one `'save'` entry per string **ahead of the kernel's single `outcome` entry** · and an awaited saver's answer is a thenable that settles into the record.

**MEASURED WITH ITS INVOCATIONS.** `npm test` (root): **`1344` tests, `1343` pass, `0` fail** · `npm run typecheck`: **exit `0`** · `npm run build` with `CARGO_HOME="$PWD/.cargo-home"`: **exit `0`**, artefact `1,469,488` bytes, **19 exports** · `cargo test` legs: green.

**THE ONE READING THE IMPLEMENTATION HAD TO TAKE, NAMED FOR THE ARCHITECT.** On the **awaited** arm a failed save reaches the caller as a **rejection of the write's thenable** — the tail throws the datum the settle resolved into. `PIN-5` forbids *"a `Promise` rejection as a failure form on any arm"*; the reading taken is that `D-153` item 2's *"never a rejection of the promise"* governs **the settle** (which always resolves), while the throw is the surface's one declared channel discharged at the only frame that can still throw it. **The alternative is that the async arm cannot carry a failure at all**, which `D-153`'s keeping the async domain in scope would not allow. **A single `await write(…)` whose `catch` sees `{status: 'FileCommitFailed', log: [… 'save' …]}` confirms the reading**; if the architect reads it the other way, this is the sentence to correct.

**AND THREE THINGS THIS LANDING DOES NOT DO, carried as residuals:** the registration instant's save still reaches the store's writer on a `saveCall` store (`design.md` `O-10`, untaken) · a `delete` on a `saveCall` store with an **async** saver has no reader for its settle (its settle is a local, not `state.legSettle`) · and on the awaited arm the pass has already closed when the saver answers, so the commit's list is sealed and the saver's entries ride a **copy** of it — the `outcome` entry is therefore present on the synchronous arm's log and absent from the awaited one's.

---

## §17 · `U-01` + `U-02` CLOSED BY THE PAIR THAT LANDED THEM, WITH THEIR EVIDENCE

**The ladder listed them as separate units.** They are not separable from `U-03`/`U-04` in the code that landed, so they are **recorded as landed with it** rather than planned twice:

- **`U-STOREROOM-01 TIER-WITHOUT-PATH`** — `DurableWithoutPathArg` (`src/args.rs`) · `storeCreateWithInputs` (`src/store.rs`) · **step 4b three-way, its third arm performing no filesystem act** · the two `pub use` lines (`src/lib.rs`) · the package's wire bit (`index.mjs`) and its read (`facade.rs`), which is how the package sets it without the caller spelling anything.
  **ITS EVIDENCE IS THE DRIVE `§16` PRINTS**: *"3 sync saver → answered a record | saver got string 7B JSON=true; read back → 1"* — **a `file`-tier write on a register with no path LANDED and read back**, which is the one observable the third entry condition exists for, and it was `ParentAnchorMonotonicityViolation` before it.
- **`U-STOREROOM-02 WRITER-ON-THE-PATHLESS-ARM`** — `D-133` item 3's *suppressed* is implemented as **the package's abstention**: `terminalArm`'s save block calls `commitFile` only where `state.saveCall === null`, so the store's writer is never reached on that arm, `commit_file` moves no byte, and the journal stays the store's.
  **`O-3` — the one-line guard that would also stop a stray relative sibling — remains UNTAKEN** (`PRICEABLE`, `design.md` `O-3`): a `commitFile` reached on a path-less register would still answer rank `15` after unwinding and leave a `.snst-commit-<pid>` in the process's cwd. **No shipped path reaches it**, because the package never calls it there.

**So the ladder is now:** `U-06` ✅ · `U-08` ✅ · `U-03`+`U-04` ✅ · `U-01`+`U-02` ✅ (with `O-3` carried) · **remaining: `U-07` STATUS-23 · `U-05` SEED · `U-09` DECLARATION.**

---

## §18 · LANDED `2026-11-17` — `U-07 STATUS-23`, the last status byte, and its drive

**The set is twenty-three, ranked `1`…`23`, with `ListenerBodyRejected` appended after `FileImageRefused`** — in the crate's `CODES` (`[&str; 22] → [&str; 23]`), in the declaration's `StoreStatus` (twenty-third literal, before the escape arm), and in the generator's own clause.

**THE GENERATED SENTENCE, DRIVEN THROUGH THE ADDON:**

```
errorMessage('ListenerBodyRejected', 'tabs[0]')
  -> 'tabs[0]' was refused by a listener body that rejected, a fired listener body's rejection refuses the act that fired it
errorMessage('NotAStatus', 'x')
  -> 'x' is a failure of the code a code outside the closed set, no clause is declared here
```

**So the member renders the sentence `D-137` item 5 declared, byte for byte with the entry the delivery already writes** (`delivery.mjs`'s `bodyFailures` puts the same literal and the same subject beside it), and an unknown code still answers the outside-the-set arm.

**SEVEN CENSUS SITES MOVED WITH IT, AND EACH WAS RE-PINNED AT THE SITE THAT COUNTS IT** — the two declaration cells (`blind-entry-module`'s `StoreStatus` table and its count), the rank-order list and both counts (`blind-entry-surface`), the two `S-CENSUS` cells (`file-tier-save`: the length, the algebra's twelfth term, and the written-out rank list), the declaration-arity regex (`json-crossing`'s `JC-TC-48`), and **three Rust sites** (`fail_codes.rs`'s count and its hand-written rank pin, `surface_verbs.rs`'s reachable count `16 → 17` with its algebra re-derived as `23 − 5 − 1 = 17`, and `support/mod.rs`'s per-member drive, which gains the `ListenerBodyRejected` arm as a member with **no producer in this crate**).

**MEASURED, EVERY LEG.** `npm test`: **`1344` tests, `1343` pass, `0` fail.** `cargo test`: **twenty-two result lines, every one `ok`, no `FAILED`** — including the store's own `fail_codes` drive at 29/29 and the crossing's `surface_verbs` at 63/63. `npm run typecheck`: exit `0`. `npm run build`: exit `0`.

**ONE THING THIS UNIT DID NOT DO, AND NO CELL CAN SEE.** The prose in `docs/specs/storeroom-native/contract.md` `§8.1`/`§8.2` still prints the set's older figures — the clause's own citation (`§8.1` #23, `§8.2`'s row of 2026-11-17) points at a row **a documentation pass still owes**. **No drive reads a spec figure**; the arrays and the declaration are the operative census and they now read twenty-three.

**The ladder:** `U-06` ✅ · `U-08` ✅ · `U-03`+`U-04` ✅ · `U-01`+`U-02` ✅ · **`U-07` ✅** · **remaining: `U-05 SEED` and `U-09 DECLARATION`.**

---

## §19 · LANDED `2026-11-17` — `U-05 SEED`, and the drive that closes the functional ladder

**The seed is implemented** (15 edits: `args.rs` · `store.rs` ×5 · `lib.rs` · `crossing.rs` ×4 · `facade.rs` · `frame.mjs` · `index.d.ts`), and **its instant is the unit's design constraint**: the register's tier is fixed at step 4b, the boot's own load has run, and **`store.born` is not yet taken** — so a seed stands **inside the born floor**, which is the replay's floor and the regeneration's construction image. **No `rollback` can reach behind a seeded construction.** The decode is `classify_image`, factored from `read_file_image`'s own tail (`json::decode` + `is_admitted()`), so the boot's class, the regeneration's class and the seed's class are **one decode**.

**THE DRIVE, run by the supervisor on the landed tree:**

```
image exported?  string 16 B                     ← a saveCall store's own image, from exportImage
seeded read      -> {"a":1}                      ← a FRESH store seeded with that text, holding the caller's data
empty string     -> "AddressMalformed"           ← D-147 item 4: intentional emptiness is omitting the param
non-string       -> "AddressMalformed"           ← the same class gate
not an image     -> "FileImageRefused"           ← D-135 item 3: rank 22, no instance, nothing left behind
```

**So the round trip the whole request was for is closed by measurement**: a `saveCall` store exports its image, and a store built from that image begins life holding the same state — **image text out through `exportImage`, image text in through `initialImage`, and the store's own decoder on both sides.**

**MEASURED, EVERY LEG.** `npm test`: **`1344` tests, `1343` pass, `0` fail** · `cargo test`: **twenty-two result lines, every one `ok`** · `npm run typecheck`: **exit `0`** · `npm run build`: **exit `0`**, artefact `1,471,184` bytes, **19 exports** (this unit mints no addon entry). **One census cell re-pinned** — `blind-entry-module`'s `StoreConfig`, five keys → six.

**TWO RESIDUALS, NAMED.** **The seed's refusal names a path a path-less store does not have** — `file_image_refused` takes the `filePath`'s spelling and a `mem`/`saveCall` store passes `''`, so the sentence reads *"'' is not an image this store reads …"*; the remedy is a sentence edit in `error.rs` and not a second code, and it is `U-07`'s settled byte. **And a seeded `mem` store now holds `Tier::File` versions under a `Mem` register** — which is what `S-SEED-INSTALL` reads and what `D-147` item 1 puts in domain; nothing moves durably for it (`save_file_delta` returns early on an empty path), but `file_snapshot()` would project those members if a later pass made a `mem` store export.

**The ladder: `U-06` ✅ · `U-08` ✅ · `U-03`+`U-04` ✅ · `U-01`+`U-02` ✅ · `U-07` ✅ · `U-05` ✅ — ONE LEFT: `U-09 DECLARATION`, which owes `WriteRecord`'s two accessor docblocks (`bodyFailures`, `returnedValues`) and the cells for the three units that landed without them (`U-03`/`U-04`'s eighteen named classes and `U-05`'s five).**

---

## §20 · LANDED `2026-11-17` — `U-09 DECLARATION`, and THE LADDER IS CLOSED

**THE LAST UNIT IS LANDED, AND WITH IT ALL NINE.** `U-09` owed two things and neither is a behaviour:

1. **`WriteRecord`'s two accessor docblocks** — `bodyFailures` and `returnedValues`, each declared by **name, shape and
   semantics** and carried at runtime, **exactly as `discarded` and `log` already are**: a non-enumerable, `configurable`
   **getter** over a symbol-keyed datum, `Object.keys` unmoved at the three typed members and
   `Object.getOwnPropertyNames` reading **seven**, the empty value the one shared frozen `{}`, and **the same owed-typed-line
   clause** the two older accessors carry. **NEITHER IS A TYPED MEMBER**, so the record's declared census is untouched.
2. **The twelve cells the three units landed without** — **`tests/e2e/seed-and-save.test.mjs`, `12` cells `SS-1`…`SS-12`,
   `12` pass and `0` fail on the first landing**, with **no backtick character and no template literal** (the format rule the
   first attempt taught). They discharge `D-144` items 1, 2, 3 and 7 · `D-145` items 1–2 · `D-146` items 1–2 · `D-153`
   item 2 · `D-132` item 1 with `D-133` item 3 · `D-137` items 2 and 4 · `D-147` items 1–4 · `D-135` items 1 and 3 · and
   `surface.md` section 2.11 clause 2.

**THE TWO CELLS THAT MATTER MOST, AND WHAT THEY MEASURED.** **`SS-11` — the seed is inside the born floor**: a seeded store,
a `mem`-tier write at the seeded address (proved to shadow it: the read answers `2`), and that op's rollback → **the seeded
`{a:1}` stands again**, with the rollback's own record answering `restoredTo: {present: true, value: {a: 1}}`.
**`SS-12` — the save precedes the delivered set on both arms**: a synchronous saver's body observes `calls === 1`, and on an
**awaited** saver the body has **not fired at all** while the save is unsettled and observes `1` once the gate opens.

**MEASURED, THE WHOLE TRIO, WITH ITS INVOCATIONS.**

| leg | command | result |
|---|---|---|
| `test` | `npm test` (`node --test "tests/**/*.test.mjs"`) | **`1356` tests · `1355` pass · `0` fail** |
| `typecheck` | `npm run typecheck` (stage + both `tsc` projects) | **exit `0`** |
| `build` | `npm run build` with `CARGO_HOME="$PWD/.cargo-home"` | **exit `0`**, artefact `1,471,184` bytes, **19 exports** |
| Rust | `cargo test` | **twenty-two result lines, every one `ok`, no `FAILED`** |

**THE LADDER, CLOSED.** `U-06` ✅ · `U-08` ✅ · `U-03`+`U-04` ✅ · `U-01`+`U-02` ✅ · `U-07` ✅ · `U-05` ✅ · **`U-09` ✅**.
**Twenty-four rulings (`D-130`…`D-153`), two gate records (`P-4`, `P-5`), one module plan, three L3 designs, two unit
contracts and `49` cells** (`U-06`'s twelve, `U-08`'s seven, `U-09`'s twelve, plus the ten census cells re-pinned as the figures
moved) — **every one of them measured green on this tree.**

**AND TWO FINDINGS THE CELLS THEMSELVES RAISED, named so they are not read as clean.** **The seed's "nothing left behind" does
not hold literally**: the store's own construction runs the `file`-tier entry probe — an exclusive create at an absent path —
**before** the seed is decoded, so after an unreadable seed at a `filePath` a **zero-byte file** stands there. `SS-9` therefore
pins the honest observable (rank `22`, an empty log, no instance, **no seed byte and no image** at the path) and prints whether
the file is absent or empty; `SS-1`'s stricter "no file at all" does hold, because the `cfg` gate precedes the probe.
**And on the failed-save arm the kernel's `outcome` entry appends a sentence about meeting `JournalOpUnknown`** — the verdict
entry's rollback has already removed the journal entry, so the kernel's composition meets an unknown op **while the state is
correctly unwound`**; `SS-4` pins the `KC-9` token and the rollback's observable and does not assert that sentence.

---

## §21 · THE DEMO THE ARCHITECT ASKED FOR, AND THE DEFECT IT FOUND `2026-11-17`

**THE SCENARIO.** A source store composes an image whose state violates a constraint (`{"tabs":{"a":1,"b":"keep"}}`); a **seeded** store is then constructed from it with a `saveCall` **and** a constraint whose check refuses `tabs.a === 1` and whose **repair writes at `file` tier** — so the repair's write happens **during the construction**, which is the registration instant's save path.

**THE TRANSCRIPT.**

```
STEP 1 · the seed image = {"tabs":{"a":1,"b":"keep"}}
  ask #1 · value = {"a":1,"b":"keep"} · tier = null · members = ["address","attempt","op","tier","value"]
  repair #1 LANDED · op = op-2 · tier = "file"
  ask #2 · value = {"a":2,"b":"keep"} · tier = "file"

STEP 3 · storeCreate -> THREW FileCommitFailed
RESULT · asks = 2 | repairs = 1 | repair outcome = landed | repair ops = ["op-2"] | saver calls = 0
```

**WHAT WORKED, EXACTLY.** The seed was decoded and installed (ask #1 read the seeded value) · the constraint's check ran at construction and refused · **the repair landed a `file`-tier write through the declared three-position route** (`op-2`, `tier: "file"`) · **the re-run asked again on the repaired value and passed** (ask #2, `{a:2}`). **Four of the five acts of a seeded repair path are correct.**

**WHAT FAILED — AND IT IS `O-10`, NOW MEASURED AS BLOCKING.** **The construction then threw rank `15` `FileCommitFailed`, and the caller's saver was NEVER CALLED** (`saver calls = 0`). **The cause is one byte and it is named by the controls:**

| # | the store | the repair's tier | result |
|---|---|---|---|
| **A** | `saveCall`, no `filePath` | **`file`** | ✗ **`THREW FileCommitFailed`** |
| **B** | `saveCall`, no `filePath` | `mem` | ✓ instance built, repaired state reads back |
| **C** | `filePath` | `file` | ✓ instance built (the store's own writer works) |

**So the discriminator is exactly `saveCall` ∧ a `file`-tier write at the registration instant.** `delivery.mjs`'s `installRegistrationSave`'s channel body is `commitFile(state.receiver, opId)` **and it consults nothing else** (`:749`): **it does not ask whether `state.saveCall` stands.** On a path-less register the store's writer answers rank `15` and unwinds, so **a seeded `saveCall` store whose constraint lands a `file`-tier repair CANNOT BE CONSTRUCTED AT ALL** — the caller's saver, which would have succeeded, is never reached.

**THE FIX IS THE ONE `O-10` PRICED AND LEFT UNTAKEN, AND ITS SHAPE IS NOW FIXED BY THE TERMINAL ARM'S OWN PRECEDENT**: `installRegistrationSave`'s channel must take **the same branch the terminal arm takes** — `state.saveCall === null ? commitFile(...) : (export → saveCall → saveSucceeded | saveFailed)` — so the registration instant's save is performed by the caller's saver exactly as a write's is. **It is a package-side edit and no store byte.** **It is NOT taken here**: `O-10` priced it `PRICEABLE` and the architect has not ruled it, and this record does not take a decision by fixing a demo.

---

## §22 · THE DEFECT FIXED `2026-11-17` — THE REGISTRATION INSTANT'S SAVE NOW TAKES THE TERMINAL ARM'S BRANCH

**`O-10` IS CLOSED, AND WITH IT THE LAST PATH WHERE `D-133` ITEM 3'S *"the store's own writer is NOT USED"* WAS FALSE.** `delivery.mjs`'s `installRegistrationSave` channel body was `commitFile(state.receiver, opId)` **and consulted nothing else**; it now branches on `state.saveCall` exactly as the terminal arm does: `state.saveCall === null ? commitFile(...) : saveAtRegistration(state, opId)`, **with the `file` arm's bytes unmoved**.

**`saveAtRegistration` IS THE TERMINAL ARM'S TRIO AT THE INSTANT'S OWN SHAPE** — the export, the caller's function at ONE position, the verdict entry — **and no delivery**, because the instant's delivery is `registrationDelivery`'s own and a second one would invoke a body twice. **A failed save is `saveFailed(opId)` first and rank `15` second** (`§2.11` clause 5), with the caller's words as the fifth kind's entries.

**★ AND ONE BOUNDARY IT DECLARES RATHER THAN HIDES.** A construction is SYNCHRONOUS (`D-147` item 2), so this frame cannot wait for a thenable: **an awaited saver's answer takes the failed arm and refuses at rank `15`**, because a save this frame cannot confirm must not be claimed. **The asynchrony is a WRITE's by construction; a construction's save is synchronous.**

**THE DEMO, RE-RUN ON THE FIXED TREE — the whole scenario you asked for, end to end:**

```
  ask #1 · value = {"a":1,"b":"keep"} · tier = null          ← the seeded value, violating
  repair #1 LANDED · op = op-1 · tier = "file"               ← the repair's file-tier write, through the declared route
  ask #2 · value = {"a":2,"b":"keep"} · tier = "file"        ← the re-run passes on the repaired value
  >> saveCall #1 · 27B · {"tabs":{"a":2,"b":"keep"}}         ← ★ THE CALLER'S SAVER GETS THE REPAIRED IMAGE, AT CONSTRUCTION
STEP 3 · storeCreate -> instance built
RESULT · final read(["tabs"]) = {"a":2,"b":"keep"}           ← the repaired state stands
RESULT · the saver's image carries the REPAIRED state = true
  >> saveCall #2 · 27B · {"tabs":{"a":3,"b":"keep"}}         ← and a post-construction write saves through it too
```

**Five acts, all correct now: the seed decoded and installed · the constraint's check run on the seeded value · the repair landed at `file` tier through the declared three-position route · the re-run passed · and the save went to the caller's saver with the repaired image, before the instant's delivery.**

**MEASURED.** `npm test`: **`1356` tests, `1355` pass, `0` fail** · `npm run typecheck`: **exit `0`** · `npm run build`: **exit `0`** · `cargo test`: **twenty-two result lines, every one `ok`, no `FAILED`**.

---

## §23 · THE POST-CREATION DEMO `2026-11-17` — `addConstraint`, a WRITE, and a RE-ARM, EACH SAVING THROUGH THE CALLER'S SAVER

**THE SCENARIO THE ARCHITECT ASKED FOR, AND ITS EXTENSION.** `§22`'s demo certified the CONSTRUCTION instant. This one registers a repairing constraint **after creation** and then trips the same pair three more ways, so the on-register commit logic is exercised at **every instant that has one**.

**THE TRANSCRIPT, ONE CONSTRAINT THAT REPAIRS AT BOTH SHAPES.**

```
STEP 1 · state = {"a":1,"b":"keep"} | saver calls = 1                     ← the violating value, saved

STEP 2 · addConstraint            (the ON-REGISTER instant)
  ask #1 · value = {"a":1,"b":"keep"} · tier = null
  repair #1 LANDED (route) · op = op-2 · tier = "file"                    ← the route the registration hands a repair
  ask #2 · value = {"a":2,"b":"keep"} · tier = "file"                     ← the re-run passes
  >> saveCall #2 · 27B · {"tabs":{"a":2,"b":"keep"}}                      ← ★ THE SAVER GETS THE REPAIRED IMAGE
  addConstraint -> identity | state = {"a":2,"b":"keep"} | saver calls = 2

STEP 3 · a WRITE that trips the same pair   (the write-time repair)
  ask #3 · repair #2 LANDED (record) · op = op-4 · tier = "file"
  ask #4 · value = {"a":2,"b":"keep"}
  >> saveCall #3 · 27B · {"tabs":{"a":2,"b":"keep"}}
  violating write -> ok | state = {"a":2,"b":"keep"} | saver calls = 3

STEP 4 · constraintOff · delete · rewrite · constraintOn   (the RE-ARM instant)
  >> saveCall #4 · 2B · {}                                                ← the delete's own save: the empty register
  >> saveCall #5 · 27B · {"tabs":{"a":1,"b":"keep"}}                      ← with the pair off, the bad value stands
  ask #5 · repair #3 LANDED (route) · op = op-7 · tier = "file"
  ask #6 · value = {"a":2,"b":"keep"}
  >> saveCall #6 · 27B · {"tabs":{"a":2,"b":"keep"}}                      ← ★ THE RE-ARM'S SAVE GOES TO THE SAVER TOO

RESULT · asks = 6 | repairs = 3 | saver calls = 6
RESULT · saver images in order = ["{a:1}", "{a:2}", "{a:2}", "{}", "{a:1}", "{a:2}"]
```

**WHAT IT CERTIFIES.** **`addConstraint` and `constraintOn` both land their repair, re-ask, and SAVE THROUGH THE CALLER'S FUNCTION with the repaired image** — so `§22`'s fix covers all three registration instants and not only the construction. **And the write-time repair takes the same saver**, so one `saveCall` sees every durable departure whichever instant produced it.

**TWO API FACTS THE DEMO EXPOSED, RECORDED BECAUSE A CALLER WILL MEET THEM.**
1. **A repair's ARGUMENT differs by instant**: at a REGISTRATION it is the context carrying **`write`** (three positions, the commit implicit — `registrationRepairContext`'s seventh member), and at a WRITE it is the **commit record** (`{address, id, op, tier, value, pending}`, no route). **A constraint that must repair at both instants has to read which shape it was handed** — the demo's own body does exactly that (`typeof arg.write === 'function'`), and a body that assumes one shape fails at the other with `rc.write is not a function`. **That is the package's declared shape and not a defect**, but it is the kind of fact that belongs in the guides beside the repair route.
2. **A `file`-tier DELETE on a `saveCall` store saves `{}`** — the image is the WHOLE STATE, so a delete that departs at `file` tier owes a save and the register is empty (`D-131` item 2's whole-state artefact read at its smallest). **Correct by declaration, and worth a caller knowing**: a backend that treats the image as a row will see it emptied, which is what the store's state is.
