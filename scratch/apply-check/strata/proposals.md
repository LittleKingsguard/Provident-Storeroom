# Proposals — the intake record for a request that is not yet a ruling

**WHAT THIS FILE IS.** The record of proposals put to this project that are **not** the architect's rulings and must never be
read as any part of them: the request, the validity pass's verdict, the critique's ledger against that verdict, the questions
the work cannot be scoped without, and the alternatives **priced and not chosen**. `strata/decisions.md` holds what the
architect has ruled and overrides this file wherever the two meet; `strata/research.md` holds the audits this file cites;
`strata/brief.md` states what is. **Nothing here is a design, a unit, a pin or a plan** — a proposal leaves this file only as
an architect's answer (which lands in `decisions.md`) or as a `REJECT` recorded here.

**PROVENANCE, AND ITS LIMIT.** Written `2026-11-06` at `HEAD` `2c2b882` by the supervisor (L0), from two delegated passes of
that date — `role_l0_validity` (gate 1) and `role_l0_critique` (its adversarial companion) — with **every `path:line` either
printed by those passes and re-read by the supervisor at the bytes, or re-read and corrected by him**. Where the supervisor
corrected a pass, the correction is marked at the sentence it corrects rather than appended beside it. **`strata/walkthrough.md`
is `DRAFT — AWAITING THE ARCHITECT'S CORRECTION` and this file claims no authority from it.**

---

# `P-1` · The durability tier of returned data

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-06`:**

> "The returned json passed to read requests, listeners, constraints, etc. should include the durability tier of the data
> object ('file', 'mem', or 'temp') as a data property (ex. '_tier' or similar)."

**ITS INTAKE, AND BY WHOSE CALL.** `strata/research.md §16` audited the record and returned **`NEVER SPECIFIED`** — the corpus
has never declared it and dropped none. **The architect then chose the intake himself: a proposal through validity and
critique, recorded here, before any design work.** So this is a request from the product's owner against a surface whose
declarations do not carry it, and **not** a defect: no clause is being violated by the tree.

## §1 · The gate-1 verdict

**`BLOCKED-ON-SEMANTICS`** · `role_l0_validity`, `2026-11-06`. **THE TOKEN STANDS ON CRITIQUE, AND ITS GROUND WAS REPLACED**
(`role_l0_critique`, same date, `C-1` and §1.2): the validity pass's headline ground — *"no clause authorizes the request"* —
**is the weakest form of its own case, because an absence invites `APPROVE-WITH-CONDITIONS`.** The record holds a stronger
one, and it is what the token rests on: **`strata/research.md §16.3`'s *"TWO REFUSALS, NOT AN OMISSION"* — two live clauses
refuse the request's shape and a third refuses the envelope — read with the fact that the four named targets have NO COMMON
CARRIER.**

**WHY NOT `APPROVE-WITH-CONDITIONS`.** The precedent exists and is a real one — `strata/envelope.md:77` records
`U-STOREROOM-REGISTRATION-OWN-MEMBERS`' gate 1 returning it with *"EIGHT FINDINGS, none blocking … two questions … with
defaults"* — and a returned datum has taken a new member **four times** without a semantics question (`op` 2026-10-27,
`discarded` 2026-10-28, `commit` 2026-10-29, `log` (`D-119`); `tests/e2e/held-listener-identity-greens.mjs:590`–`:592`, *"THIS
IS THE ROW'S FOURTH DATED RE-DERIVATION"*). **What separates this request from all four is that they each had ONE OBJECT to
put the member on.** Here each question's default moves the answer to a *different* object — a listener's whole invocation
argument is an `Address` over a record the native contract closes at two members; a constraint's record is closed at five and
its `tier` answers another question entirely; a leaf's answer is a primitive — **so the "conditions" are not narrowings within
a fraction, they are the choice of the fraction.**

**WHY NOT `REJECT`.** The request's own words leave the channel open — *"as a data property (ex. `_tier` **or similar**)"* —
and a `Symbol.for` channel, which the corpus already ships, is not a string member at all (`bindings/js/src/entry/state.mjs:99`,
*"IT IS A `Symbol.for` KEY ON THE RECORD AND NO MEMBER IS ADDED (`A117` (D6)): `Object.keys` and `Object.getOwnPropertyNames`
read past it"*). **Hardening *"or similar"* into *"a string member named `_tier`"* would be `D-76`'s failure mode** —
`strata/decisions.md:4065`, *"A PERMISSION BECAME A PROHIBITION"*. Nothing in the record makes the **need** unlawful; only the
**carrier** is undecided.

## §2 · What the corpus says against it, and why the coverage is worse than the pass first reported

**THE TWO REFUSALS, AT THE BYTES.**

1. **A read's answer carries no accompanying member** — `docs/specs/storeroom-js/contract.md:1298`: *"**a `read` or a
   `readLiteral` answers a VALUE and carries no such member** — and absence MUST NOT be read as *"nothing was discarded"*"*.
2. **The crossing forbids a package-added member** — `docs/specs/storeroom-json-crossing/contract.md:836`: a copy-out object
   *"carries exactly the stored OWN ENUMERABLE STRING-KEYED member set, **with no tag, class token or envelope in any
   member**"*; and the read's own arms agree — `docs/specs/storeroom-native/contract.md:2229`-`:2232` (`R-2` *"one member per
   key"*, `R-5` *"every register key"*), `:2228` (`R-1` *"its value, verbatim"*).
3. **And the envelope is refused where the value is a leaf** — `docs/specs/storeroom-native/contract.md:2189`–`:2192`: *"the
   admitted literal itself, exactly as written … the same absence of any wrapper … **At a `leaf` target, `readLiteral(a, t)`
   and `read(a, t)` are indistinguishable — the two forms differ ONLY in what they refuse**"*.

**THE COVERAGE FACT, CORRECTED AGAINST THE VALIDITY PASS — IT IS FOUR OF FOUR TARGETS, NOT TWO** (`role_l0_critique`, `C-3`,
re-read at the bytes by the supervisor):

| the request's target | why it cannot carry the member as stated |
|---|---|
| `read` / `readLiteral` **at a leaf** | the answer is a **primitive**: `src/store.rs:1699` mints `Node::Leaf` only from a literal (the two container arms above it at `:1685`, `:1692` mint branches), and `:2292` answers `Node::Leaf(value) => Ok(value.clone())`. A JS primitive has no own property. |
| a **listener body** | it is handed **an address and no value at all** — `bindings/js/index.d.ts:501`, `export type Listener = (address: Address) => void;`; the record the store keeps is *"the listener record's closed two-member set"* (`docs/specs/storeroom-native/contract.md:910`). |
| a **constraint body** | `context.value` **is** a zero-tier `read` and inherits its leaf arm — ARCHIVED `…/storeroom-constraints/kernel-surface.md:469`–`:470`, *"(a) A `leaf` → `R-1`'s literal, VERBATIM, the admitted literal itself with no wrapper"*; the live record is closed at five (`bindings/js/index.d.ts:1509`, *"FIVE MEMBERS AND NO SIXTH … THIS RECORD GAINS NOTHING AT ANY INSTANT"*), and its `tier` is the ACT's landing tier, *"IS NOT INFERRED FROM THE `value`'s OWN SELECTION"* (`:476`) |
| a **`write` / `delete` / `rollback` record** | **these already answer a tier and it is a different question's**: `op.tier` is where the *act* landed (`index.d.ts:530`), `receipt.tiers` is what a *delete removed* (`:631`), and `rollback`'s record carries none (`:772`–`:775`) |

**SO THE ONE ARM THAT COULD CARRY A MEMBER IS AN OBJECT-OR-ARRAY ANSWER, AND `R-2`'s *"one member per key"* MEANS A BRANCH'S
MEMBER SET IS THE CALLER'S DATA AND NOTHING ELSE.**

## §3 · The ten questions the work cannot be scoped without

**Each phrased for a one-sentence answer, each carrying the default the passes would take if he does not answer.** `Q-1`–`Q-6`
are the validity pass's; `Q-7`–`Q-10` are the critique's, added because the first six did not reach the states they name.

| `#` | the question | the default |
|---|---|---|
| `Q-1` | **On a branch whose keys are at different tiers, is the tier one value for the whole object or one per member — and if one per member, is it the addressed node's alone?** An object-level tier has no referent: `(key, tier)` is the composite key (`docs/specs/storeroom-native/contract.md:3302`). | the **addressed node's own anchor tier only**, `null` where the addressed node is a branch or the register |
| `Q-2` | **Where a shadow means two versions stand at one key, does the answer carry the tier the read landed on, or every tier standing?** | the **selected version's tier only**, singular — `R-4` answers one version per key (`:2231`) |
| `Q-3` | **Which surfaces does it reach — `read`/`readLiteral` only, or the listener's payload, the constraint's context and the three records too?** | **`read` and `readLiteral` only**; the records are unmoved; the listener gains no argument; `context.tier` is unmoved |
| `Q-4` | **Is it a member OF the caller's data or a second channel beside it — and if a member, what distinguishes it from a `_tier` the caller lawfully stored?** Any string is a legal register key, so a stored `_tier` and a minted one are one member. | **not a member of the caller's data**; a second channel, the answer staying exactly the stored value |
| `Q-5` | **If a caller writes `{_tier: 'file', a: 1}`, is it stored, refused, or stripped?** | **stored and returned verbatim** — the default that keeps the round-trip relation true, **and precisely the one that makes a minted `_tier` indistinguishable from a stored one** |
| `Q-6` | **A leaf answers a primitive — is the leaf arm exempt, does the answer become a wrapper, or does a leaf read refuse?** | **exempt** — the primitive, unwrapped; only an object or array answer carries a channel |
| `Q-7` | **At the empty address `[]`, is the tier asked for the REGISTER's own creation-fixed tier or some version's?** The store already answers there and asserts no caller's argument: `src/store.rs:2254`–`:2259`, *"the register's OWN CONDITIONAL TIER, `file` where the construction's path is provided … `mem` otherwise, FIXED AT CREATION"*. | **the register's own tier**, through the same channel as any other answer |
| `Q-8` | **Must the tier be atomic with the value it labels, or may it be a second selection over a store the caller's own code can mutate in between?** | **non-atomic is acceptable**, and the docblock says so |
| `Q-9` | **Must it survive a spread or `Object.assign`?** The corpus already declares that a spread loses a non-enumerable member (`docs/specs/storeroom-js/contract.md:1299`). | **no** — a spread loses it, declared, exactly as `discarded` is |
| `Q-10` | **Must `read` and `readLiteral` stay indistinguishable at a leaf (`docs/specs/storeroom-native/contract.md:2191`–`:2192`) after the change?** | **yes** — so any readout is a property of the value and never of the call |

**AND ONE FACT NO ANSWER REMOVES:** `read`'s declared return type is `unknown` (`bindings/js/index.d.ts:975`, `:977`), so a
typed consumer cannot read a member that is not declared — **and the declaration exists twice**, `bindings/js/index.d.ts` and
its `1680`-line copy at `typecheck/node_modules/provident-storeroom/index.d.ts`.

## §4 · The alternatives, priced, none chosen

**PRICED AGAINST `Q-1`–`Q-10`'s DEFAULTS, AND SPLIT WHERE THE VALIDITY PASS MERGED TWO PRICES INTO ONE** (`role_l0_critique`,
`C-4` and `M-6`): **an ENUMERABLE member and a non-enumerable/symbol channel are not one alternative and their prices differ by
an order of magnitude.**

| `#` | the shape | what it moves | its class, and what refuses it |
|---|---|---|---|
| **(a)** | **an envelope** `{value, tier}` | the native verb's declared return (`docs/specs/storeroom-native/contract.md:2166`, `:2174`, `:2188`–`:2192`); the read arms; `facade.rs:610`–`:611`; `index.d.ts:975`/`:977` **and its typecheck copy**; every deep-equality **even at a leaf** (a stored `1` would read `{value:1,tier:'mem'}`) | MAJOR-class; **refused at a leaf** by `:2189`–`:2192` and on the constraint path by ARCHIVED `kernel-surface.md:470` |
| **(b)** | **an enumerable member on the returned value** | the crossing's exact-member-set rule; `R-2`/`R-1`; **`67` `assert.deepEqual` sites over a `read(…)`/`readLiteral(…)` answer in `11` files** — **MEASURED this date, `grep -rEc "deepEqual\([^)]*\.read(Literal)?\(" tests/e2e/*.mjs`, `67` sites / `11` files**; the two shipped measured prose sites `RELEASE-NOTES.md:361` = `bindings/js/RELEASE-NOTES.md:361`, *"measured, `store.read(['v'])` answers its value and the object's own names are `["v"]`"*; and `docs/guides/package-use.md:2097`, whose point is that an unexpected member on a read-back is *the caller's own pollution* | **refused** by `docs/specs/storeroom-json-crossing/contract.md:836` and `R-2`; and **made durable** by the write-back arm: the copy-in walk reads `Object.keys` (`bindings/js/src/entry/carrier.mjs:364`), so `store.write(a,'mem', store.read(a))` **stores the minted member as the caller's data** |
| **(b′)** | **a NON-ENUMERABLE own member** (the `discarded`/`log` device) | **`Object.keys` moves by nothing and no deep-equality moves** — the corpus's own green cell says so (`tests/e2e/held-listener-identity-greens.mjs:586`–`:591`: *"`ownNames` … reads SEVEN names while `Object.keys` and every deep-equality over a receipt still read the FOUR enumerable members"*); it moves the `getOwnPropertyNames` census **of a read answer** — **and no cell censuses one today** (all `115` `getOwnPropertyNames` sites in `tests/` census the instance, the records or the refusals) — plus the two prose sites and one docblock | the corpus's four-times-landed **PATCH** arithmetic (`strata/envelope.md:184`, *"class unmoved, `PATCH`, `1.9.1`"*); **still impossible at a leaf**, and the copy-in walk drops it silently (`carrier.mjs:317`–`:319`) |
| **(c)** | **a second read-side verb** — a tier probe or a metadata getter | the instance's member set (`14` → `15`), ten-plus census cells (`tests/e2e/blind-package-surface.test.mjs:298`, `blind-entry-surface.test.mjs:207`, `tests/unit/js-surface/a127-surface.test.mjs:746`, the `a126`/`constraints-publication`/`convenience` families, `tests/e2e/live-drive.mjs:282`, `:1570`); the addon's export census (`bindings/js/src/facade.rs:375`, *"`9 + 2 = 11` PER-VERB AND `4 + 11 = 15` IN ALL"*); `index.d.ts` and its typecheck copy | **`MINOR`, squarely** (a member added to the declared surface); **meets `A63`'s letter** — *"NO `exists()` VERB, NO `findAddress` SHIM AND NO BINDING-SIDE RESOLVER"* (`docs/specs/storeroom-js/contract.md:2195`, `:2207`) — and its spirit only if a metadata getter is read out of the ruling, **which is a ruling away and not a prohibition** |
| **(d)** | **no change — document the tier-narrowed probe** | prose only: `docs/guides/package-use.md §5.1` | **no clause moves, no cell moves, no version cell moves**; and the readout is real today — a one-token probe answers answered-vs-refused, and `TierNotFound`'s generated message names the tiers **present** (`src/error.rs:345`–`:349`, *"{} is not a version of '{container}', versions are at {tierlist}"*), whose stability no clause declares |
| **(e)** | **a `Symbol.for` channel** — the corpus's own device, distinct from (b′) | **invisible to `Object.keys` AND to `Object.getOwnPropertyNames`** (`bindings/js/src/entry/state.mjs:99`); so it moves **no cell and no census** | the cheapest of the member shapes — **and still impossible at a leaf**, and it needs a mint after `codec.to_js_value`, so it moves a `defineProperty` arm into `facade.rs` or the entry rather than nothing |

**THE TWO CHEAPEST, AND THEY DIFFER BY WHETHER HE ANSWERS** (`role_l0_critique`, §4):

- **If the architect answers `Q-1`–`Q-10`: (c).** One instance member and one facade entry, against (b)'s **`67` measured cells** and a
  refused property row, (a)'s native return type, and (b′)/(e)'s dead leaf arm — **and it is the only alternative that serves
  all four named targets** (`M-7`): a probe answers the read arm after the value, `readLiteral`, the listener arm (which holds
  the address and closes over the store, which is `D-50`'s own remedy) and the constraint arm.
  **If instead he pins the readout onto the returned data and takes `Q-6`'s exempt-leaf default, then (e) is cheapest by a
  wide margin** — no cell, no census, one docblock and two prose sites.
- **If he does not answer: (d).** The only entry on the list that moves no clause at all, and today the entire lawful fraction.

**ONE PRICE THE VALIDITY PASS OVERSTATED, CORRECTED HERE RATHER THAN CARRIED** (`role_l0_critique`, `C-4`): **the pass charged
the non-enumerable shape with failing `P-SR-1`.** It does not. The relation at `docs/specs/storeroom-js/contract.md:1150` is
**member-key-set equality** and says nothing of enumerability, and the corpus's own four landings demonstrate a non-enumerable
member moving neither `Object.keys` nor *"every deep-equality"*. **`P-SR-1` fails for the ENUMERABLE shape only** — and the
request's *"or similar"* does not force enumerability.

## §5 · What would be refused, and what is merely a ruling away

**The corpus's own caveat first** (`strata/brief.md:45`–`:47`): the architect's rulings override this file, so **no shape is
beyond a ruling — each is a ruling away.** What follows is *unlawful without a fresh ruling, refused on a named clause*:

1. **An ENUMERABLE minted member on a `read`/`readLiteral` answer** — `docs/specs/storeroom-native/contract.md:2229` (`R-2`
   *"one member per key"*), `docs/specs/storeroom-json-crossing/contract.md:836`.
2. **Any wrapper or envelope at a leaf** — `docs/specs/storeroom-native/contract.md:2189`–`:2192` (*"the same absence of any
   wrapper"*; and the two verbs' declared indistinguishability) and ARCHIVED `kernel-surface.md:470`. **Not a preference:** an
   envelope makes two verbs that must agree disagree.
3. **Exposing `findAddress`, or minting an `exists()`- or metadata-shaped resolver at the JS boundary** — *"`findAddress` IS AN
   INTERNAL TOOL AND THIS UNIT DOES NOT EXPOSE IT"*, *"No `NodeRef` crosses"*, and the no-resolver clause
   (`docs/specs/storeroom-js/contract.md:2195`, `:2200`, `:2207`; `A63`).
4. **A tier on a listener's argument without moving the store's listener record** — `docs/specs/storeroom-native/contract.md:910`
   and `bindings/js/index.d.ts:501`: it needs **two** amendments, which is why it is the least reachable of the four targets.
5. **And one thing no ruling can grant:** a property on a leaf's answer. A JS `number`/`string`/`boolean` cannot carry an own
   property without becoming an object — which is refusal 2 by another route. **That is not a clause; it is the language.**

**Everything else — the non-enumerable member, the `Symbol.for` channel, a second verb, a readout on object answers — is
lawful, priced, and a ruling away.**

## §6 · The critique's ledger, so no claim here stands unchecked

**NINE validity claims were checked at the bytes; THREE do not hold as stated; TWO are understated.**

- **`C-4` — FAILED.** *"`P-SR-1` fails for the request's literal shape"*: it fails **for the enumerable shape only** (§4's
  correction). The relation at `:1150` is a member-key-set relation and the corpus's own cell (`held-listener-identity-greens`
  `:586`–`:591`) proves a non-enumerable member moves no deep-equality.
- **`C-6` — FAILED.** *"No JS-side re-wrap can satisfy the request; it reaches `src/`"*: **`src/` already answers the tier
  today** — `Store::findAddress(…) -> &NodeRef` (`src/store.rs:2231`) with a public `anchor.tier` (`src/records.rs:84`), running
  the **same** selection as `read`. **So the request reaches the addon's export census and `A63`, not `src/`** — which changes
  (c)'s size, and this is the one place the pass made an alternative look bigger than it is.
- **`C-5` — the WORD failed, the fact sharper.** The tier is not *"discarded"*: `walk` **declares a channel for it** —
  `src/store.rs:1161`, `Result<(usize, Option<Tier>), StoreError>` — and returns `None` at **both** exits (`:1166`, `:1200`),
  with all seven call sites reading `.0`. **The channel built to carry it is dead on every exit, which is why filling it needs
  no signature change.**
- **`C-1` and `C-3` — UNDERSTATED.** The ground is two refusals and not an absence (§1); and the coverage is **four of four**
  targets, not two (§2).
- **`C-2` — HOLDS, CITATION CORRECTED.** `src/value.rs:16`–`:23` enumerates `StoreValue`, which *includes* `Object` and
  `Array`; the byte that decides it is the mint, `src/store.rs:1699`, with the container arms above it. **No lawful write
  produces an object `Leaf`.**
- **`C-7` — HALF HOLDS.** The typed-consumer consequence is real; **and the pass missed that the declaration exists twice**
  (`typecheck/node_modules/provident-storeroom/index.d.ts`, `1680` lines).
- **`C-8`, `C-9` — HOLD** (`D-50` at `strata/decisions.md:3182`; the residual need is real and narrow).

**EIGHT THINGS THE VALIDITY PASS MISSED, ADDED HERE:** `M-1` the register's own creation-fixed tier at `[]` (`Q-7`); `M-2` the
constraint and repair paths break on the leaf arm too, against *"no wrapper"*; `M-3` the typecheck copy of the declaration;
`M-4` the write-back arm (enumerable ⇒ stored as the caller's data forever; non-enumerable ⇒ silently dropped by the copy-in
walk); `M-5` the two shipped measured prose sites and the assembly's refuse-on-drift; `M-6` the `Symbol.for` device is cheaper
than the `log` accessor and the pass quoted one price for both; `M-7` (c) is the only shape with four-target coverage; `M-8`
the version class — **eleven cells** (the version plus five pins plus five platform manifests, `bindings/js/package.json:3` at
`1.9.3`) and **three** generated version lines (`bindings/js/README.md:34`, `README.guide.md:33`, `RELEASE-NOTES.md:19`).

## §7 · Envelope

**VERDICT.** `BLOCKED-ON-SEMANTICS` · **`P-1` IS NOT DELEGABLE AND NO UNIT MAY OPEN.**

**BLOCKING.** **Ten questions** (`Q-1`–`Q-10`), each with a default, **and one fact no answer removes** (`read`'s declared
return type is `unknown`, in two files).

**PRICED AND UNCHOSEN.** **Six shapes** — (a) envelope · (b) enumerable member · (b′) non-enumerable member · (c) second verb ·
(d) no change · (e) `Symbol.for` channel. **Cheapest under an answering architect: (c), or (e) if he pins the readout onto the
returned data with an exempt leaf. Cheapest under a silent one: (d).**

**WHAT GATE 2 WOULD PIN, AND ONLY ONCE HE ANSWERS.** The carrier `Q-4` chooses; the arm census `Q-6` decides; the two verbs'
indistinguishability `Q-10` preserves; the two declaration files; the two prose sites; the eleven version cells; and, for any
member, one sentence the corpus has never had — **what the package does with a `_tier` the CALLER wrote.**

**NOT DECIDED HERE, AND NOT TO BE READ AS DECIDED.** The token is a gate-1 verdict and not a ruling; every default in §3 is a
default; no alternative is chosen; no clause is amended; no cell is named as owed. **The next move is the architect's answer, in
one sentence per question, and it lands in `strata/decisions.md` — not in this file.**

---

## §8 · The architect's answer, `2026-11-06` — `D-121`, and what it leaves standing

**THE ANSWER CAME AS A SHAPE RATHER THAN A ROW OF PER-QUESTION ANSWERS**, and it is recorded verbatim at `strata/decisions.md`
`D-121`: *"Add an additional read option that, when compiling to JSON, adds a `_tier` field to objects and replaces the
literals on leaf nodes with objects with a `_tier` and `value` keyset"*.

**WHAT IT DISCHARGES.**

- **THE CARRIER — `Q-4`'s subject — IS DECIDED:** **an OPT-IN option on the read**, so a caller who does not ask receives
  today's answer byte for byte. **The default arm is unmoved** — `P-SR-1`'s member-set relation (`:1150`), the **`67`** measured
  `assert.deepEqual` sites over a `read(…)` answer, and both shipped *"the object's own names are `["v"]`"* sentences stand.
  **The transformation belongs to the answer's ENCODING** (*"when compiling to JSON"*), not to the stored tree and not to the
  store's own answer: `R-1`'s *"its value, verbatim"*, `R-2`'s *"one member per key"* and `R-5` remain the default arm's law.
- **`Q-6` IS ANSWERED, BY THE WRAPPER RATHER THAN BY AN EXEMPTION:** a leaf is **replaced** by `{ _tier, value }`, so nothing is
  asked of a JS primitive — **which is the obstacle that made this record `BLOCKED-ON-SEMANTICS` removed at its root.**
- **THE NAMES ARE THE ARCHITECT'S, NOT A LAYER'S:** `_tier` and `value`.

**WHAT REMAINS OPEN — FOUR GAPS, AND THE FIRST ALONE MAKES A CONTRACT DIRECTORY UNSCOPEABLE:**

1. **ARRAYS.** **A JSON array cannot carry a `_tier` field.** The ruling names *"objects"* and *"leaf nodes"*; an array node is
   neither, and the readings (bare array · `{ _tier, value: [...] }` on arrays too · bare array with compiled elements) are three
   different contracts. **This decides whether the answer's shape is a total function of node kind.**
2. **THE REFERENT — `Q-1`/`Q-2` untouched.** A node's own anchor tier is well defined and, by the monotonic clause, is the most
   persistent in its subtree — **but the ruling does not say whether an object's `_tier` reports that** or a set, and a branch's
   keys may each hold a version at a different tier.
3. **THE COLLISION THE SPELLING CREATES — `Q-4`'s other half.** Any string is a legal register key, so a compiled object may
   carry **both** the caller's stored `_tier` and the minted one. **The ruling fixes the name and leaves the disposition unnamed** —
   and re-spelling the name is not a layer's to take.
4. **REACH AND WRITE-BACK — `Q-3`/`Q-5` untouched.** The words say *"read option"*; **the constraint's and repair's
   `context.value` is itself a zero-tier read** (`kernel-registration.mjs:427`), and the copy-in walk reads `Object.keys`
   (`carrier.mjs:364`), **so a compiled answer handed back to `write` stores `_tier` and the wrappers as the caller's data.**

**AND NO UNIT IS MINTED.** **`P-1` remains the intake and `D-121` the ruling**; the block is **partly** discharged, so no unit
opens until gap 1 is answered — and gaps 2–4 decide what gap 1's answer would be contract-shaped against. **The four are put back
to the architect in the same session, and their answers land as `D-121`'s own dated clause rather than as a second row.**

**⟶ AND ALL FOUR CLOSED IN THE SAME SESSION (`D-121-ter`), SO THE CLAUSE ABOVE IS THE READING OF ITS OWN MOMENT.** The answers:
**arrays are WRAPPED** (`{ _tier, value: [...] }`); **every node reports its OWN tier, recursively**; **the minted `_tier` wins a
collision, declared, with the default read still answering the caller's stored value**; and **the reach is a THIRD READ VERB and
nothing else — `readTiered(address, tier?)`** — his own words, not an offered option. **So `P-1`'s alternative `(c)` is the one
chosen, the default arm is unmoved by the encoding AND unreached by the verb, and the block is DISCHARGED.** **The unit is minted:
`U-STOREROOM-TIER-READOUT`, contract directory `docs/specs/storeroom-tier-readout/`, class `MINOR`, the instance at `15` members.**
**Two things this record keeps visible rather than settled:** **a stored `_tier` is not delivered by `readTiered`** (the one lossy
field, in one verb, with the truth reachable through `read`), and **a `readTiered` answer handed back to `write` stores `_tier`
and `value` as ordinary data** — `D-121-ter` declares it a consequence, rules nothing, and obliges a docblock to say so.
---

---

# `P-2` · Creation treated as an editing action

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-06`:**

> "The store creation should be treated as an editing action because it changes the existing data state, and therefore
> should check all relevant constraints (and subsequent repair flows) and fire listeners"

**ITS INTAKE, AND BY WHOSE CALL.** The supervisor put it to gate 1 on `2026-11-06` as this file's second proposal, the
owner's words carried verbatim. **UNLIKE `P-1`, THIS IS AN INSTRUCTION AND NOT A WISH** — the owner is not asking whether
creation *may* edit; he states that it *does*, and orders the consequences. **So the gate-1 question is not "is it
permitted?" but "do the words name enough to be built?"** `strata/research.md §19` carries the intake audit (landed the
same date; `role_l0_research`), and `strata/decisions.md` holds **no row** on the subject: no row treats a creation as an
editing act, and `D-106`'s rule reaches creation only because the batch's repair writes there.

**PROVENANCE, ITS LIMIT, AND ITS AMENDMENT.** Written `2026-11-06` at `HEAD` `3f24248` from `role_l0_validity`'s gate-1
pass, landed by the supervisor with the load-bearing citations re-read at the bytes, **then AMENDED in place by
`role_l0_critique`'s ledger (`§6`), which overturned three of `§1`'s grounds and one of its questions' defaults.** Each
correction is marked at the sentence it corrects with `⟶ CORRECTED (C-n)`; the ledger at `§6` carries the full argument
and the byte. **The corrections are NOT appended beside the text and are not softened: where `§1`–`§5` reads differently
from the pass's first text, the corrected text is what stands.**

## §1 · The gate-1 verdict

**`BLOCKED-ON-SEMANTICS` — THE TOKEN STANDS; ITS GROUNDS ARE REPLACED** (`role_l0_critique`, `§6`'s verdict paragraph).

**THE GROUND IS NOT *"NO CLAUSE AUTHORIZES IT."*** An absence invites `APPROVE-WITH-CONDITIONS`, and `strata/brief.md:45`–`:47`
is explicit that the architect's rulings override this file. Three findings at the bytes carry the token:

1. **THE PREMISE IS TRUE ON TWO ARMS AND UNDECIDED ON THE THIRD — NOT "PARTLY FALSE".**
   **⟶ CORRECTED (C-2, C-3, C-4, C-5):** the first text called the premise *"partly false"* and assigned the falsity to the
   exclusive-create and boot arms. **That partition was chosen to preserve the "partly", not derived.** The arms are:
   **(i) the batch arm — TRUE, and MEASURED:** a construction carrying `cfg.constraints` runs each supplied pair, runs its
   repair, and the repair's edit lands in memory and (at the `file` tier) **durably in the bytes** (`§19.4` `B1`, `C2`,
   `C3`, `C4`; `D-91` item 1). **(ii) the exclusive-create arm — TRUE as a change in the world**: *"SUCCESS CREATES THE
   STORE'S OWN FILE"* (`docs/specs/storeroom-native/contract.md:4830`), and **whether that write is in `D-106`'s scope is
   expressly UNSETTLED, not ruled out** — the sentence the first text quoted as a ruling sits inside that row's *"WHAT IT
   DOES NOT SETTLE — L1's, and no layer below may read this row as having decided them"* (`D-106`'s closing item).
   **(iii) the boot arm — TRUE, AND IT ALREADY CHECKS:** *"The batch's evaluation stays where it is — at construction, and
   at a boot over an existing `filePath` … a rank-`19` refusal keeps surfacing from `storeCreate` and from the boot"*
   (`D-91` item 1). **The one genuinely inert arm is a boot over an EXISTING file carrying NO `cfg.constraints`**
   (`contract.md:4833`: *"the file's bytes are BYTE-IDENTICAL after the construction"*).
2. **THE FIRST VERB IS LARGELY SHIPPED; THE WORD *"all"* IS THE PART THAT IS NOT — AND THE SHIPPED WALK SHORT-CIRCUITS.**
   A `storeCreate` carrying `cfg.constraints` already asks each supplied pair's body once at its own address and already
   runs the repair that follows (`bindings/js/index.mjs:1654`–`:1661`; `kernel-registration.mjs:360`, `:384`, `:398`–`:408`).
   **What the words add is a SCOPE — and the instant declares its own:** *"The scope is THAT ONE PAIR and no other: no pass
   is opened over the registry and no other registered pair is re-evaluated"* (`kernel-registration.mjs:230`–`:232`).
   **⟶ CORRECTED (C-11, C-13):** *"each supplied pair"* is not even the shipped reach **on a refusing construction** — the
   batch's `catch` calls `registrationCrossing`, which **throws**, so **the first refusing pair aborts the construction and
   every pair after it is never asked**; and under the shipped scope **a construction can return an instance whose register
   violates a pair that same call registered** (pair 1 passes, pair 3's repair breaks it, nothing re-asks pair 1).
3. **THE SECOND VERB HAS NO RECIPIENT AT THE INSTANT IT NAMES — AND ITS ABSENCE IS DECLARED, NOT UNNAMED.**
   **(i)** The adopted entries hold no callable: the store's record closes at two members (`contract.md:910`), the
   construction admits `{ address, handle }` only (`src/args.rs:302`), the entry's encoder **refuses a third key**
   (`frame.mjs:31`, `keys.length !== 2`), and the function arrives only later through `register` (`surface.md:417`–`:424`,
   whose answer is `undefined`). **The store itself never invokes anything**: *"the store RETURNS the triggered listeners'
   handles and INVOKES NOTHING"* (`src/lib.rs:15`–`:17`). **(ii)** On two arms there is no set at all: `triggered` is a
   member of the two records a verb returns (`surface.md:1650`–`:1651`) and a construction returns an instance and no
   record (`contract.md:2799`–`:2803`). **(iii)** **⟶ CORRECTED (C-20):** the registration instant's silence is
   **DECLARED** — *"IT STILL OPENS NO `K-2` AND STILL DELIVERS NO LISTENER"* (`kernel-registration.mjs:888`–`:889`),
   `PIN-6` (v) at `:510`–`:512`, and `C-12` *"VERIFIED at the bytes"*. **`D-104`'s defect was an UNDECLARED silence; this
   one is a stated fact.** So the second verb **reverses a declaration and owes the re-spelling of it** — not a filling of
   a hole.

**WHY NOT `APPROVE-WITH-CONDITIONS`.** Conditions are narrowings within one fraction. **Here the listener fork has FIVE
candidate arms, each moving a different declared surface, and one of them is "build nothing"** — so the conditions would
decide whether there is a fraction at all.

**WHY NOT `REJECT`.** Nothing makes the NEED unlawful and the owner's words are the ceiling. **Two of the shapes are already
corpus devices**: a delivery outside a caller's write (`D-117`) and a third member on a batch element (`D-26`/`D-27`;
`frame.mjs:70`–`:77` forwards it, the crossing strips it), **and `D-104` already rules that a repair's write's fired
listeners are a real recipient set** — the request is continuous with the law.

**AND THE SHARPEST FACT ABOUT THE TOKEN** (`role_l0_critique`, `§6`): **the request's cheapest honest reading lands on a
`REJECT`, and the record must not let a default take that decision on the owner's behalf** — `§3`'s `Q-4` default is
restated accordingly (`C-10`).

## §2 · What the corpus says against it — and for it

**FOR IT:**

| the request asserts | the corpus's byte |
|---|---|
| creation can change data, and does | a `cfg.constraints` repair writes at registration through `D-91`'s route; **measured**: `[b] = 7` in memory and `"repaired"` durably at the `file` tier, read back by a fresh instance (`strata/research.md §19.4` `B1`, `C2`, `C3`, `C4`) |
| the edit must survive the file tier | `D-106` item 2, *"without exception"*; the passing close is the save (`kernel-registration.mjs:930`–`:950`) |
| a refusal must undo what it landed | `D-107` item 1; the close composes it over *"EVERY OP ITS ROUTE LANDED"* (`:952`–`:965`) |
| creation already checks, and repairs follow | `index.mjs:1654`–`:1661`; `surface.md`: *"`storeCreate` REGISTERS EACH OF `cfg.constraints`' ELEMENTS THAT CARRIES ITS OWN FUNCTION AT `K-1`, AT THE INSTANCE IT IS CONSTRUCTING"*; the boot's own check at `D-91` item 1 |
| a repair's write's fired listeners are already a ruled subject | `D-104` item 1 (*"that silence is the defect, not the resolution"*) and item 2 (*"The repair's write's listeners ARE delivered"*) |

**★ THE SECOND VERB IS `D-104`'S RULING REACHED AT AN INSTANT `D-104` DID NOT NAME — AND ITS SILENCE THERE IS DECLARED.**
`D-104` delivered a repair's write's listeners in the COMMIT's delivery, at the LANDING instant. **The registration instant
has no such delivery, and the tree says so in its own words** (`kernel-registration.mjs:888`–`:889`; `C-12`). **So the request
reverses a declared fact and owes a re-spelling of BOTH that clause and the guide** — a price no shape escapes.

**AGAINST IT:**

1. **A DECLARED CLOSED LIST OF FIRING ACTS, NAMING THE BOOT** — `docs/guides/package-use.md:497`–`:499`: *"Listeners fire on
   `write` and `delete`, and never on a read. … nor does a boot or any read-driven traversal fire a listener"*. **The
   request reverses a shipped consumer sentence rather than filling a silence; lawful on an instruction, and it must be
   SAID in the same pass** — `D-106` item 5 and `D-107` item 4 are the architect's two ordered departures from
   ANNOTATE-BESIDE, and no layer may substitute the convention.
2. **THE LISTENER ELEMENT IS REFUSED A THIRD KEY WHILE THE SIBLING KEY'S THIRD MEMBER IS REQUIRED** — `frame.mjs:31`
   (`keys.length !== 2` → refused, answered `AddressMalformed` on `listeners`) against `frame.mjs:70`–`:77` (*"THE
   ELEMENT'S THIRD MEMBER IS DROPPED HERE AND ONLY HERE — the PACKAGE ARMS THE SUBSTANCE"*). **Opposite dispositions on
   one member, both deliberate.**
3. **THE ARGUMENT ORDER EXISTS SO NOTHING ARGUMENT-SHAPED IS VALIDATED AFTER THE CREATE — AND THE CONSTRAINTS ARE NOT
   AN ARGUMENT.** `contract.md:4831` (`§10.4` part 4) fixes the create as *"the LAST act of the construction's ARGUMENT
   VALIDATION"*, and part 5 draws *"EVERY CONSTRUCTION THAT FAILS LEAVES NOTHING BEHIND"* from it. **⟶ CORRECTED (C-21):**
   the first text read this as *"a constraint pass cannot precede the create"* and stopped, **which is right about the
   argument order and wrong about its reach — the batch's constraint act already runs AFTER the create, and the corpus
   nowhere says no state is judged afterwards.** **The real price is that a creation-time refusal after the exclusive
   create breaks `:4832`'s guarantee unless a removal arm is declared, and no clause prices it** (`§3` `AQ-3`).
4. **⟶ CORRECTED (C-17): CREATION HAS A JOURNAL CARRIER; WHAT IT LACKS IS THE HANDOFF.** The first text said *"creation as
   an edit has no journal carrier"*. **False of the shipped tree**: *"its `op` LANDS DURABLY … its `op` is a real
   `JournalOp` in the store's own journal, readable back through every read verb at that address, and it stands after the
   registration returns"* (`3-bis` (f), `kernel-registration.mjs:573`–`:578`, recorded at `:526`–`:533`). **`contract.md`'s
   *"the journal holds `0` entries"* (`:2802`) is itself false of a construction whose repair landed.** The smaller,
   fixable fact is: **the caller can never name that op to `rollback`** — *"ON SUCCESS NO LOG CROSSES"* (`:580`–`:583`),
   `dropHandoff` (`:986`), and `D-58` item 2's bound.
5. **THE RETAINABLE SEAT HAS ALREADY BEEN REFUSED** — `D-58` item 2: *"the resident set … is THE INSTANCE'S LIFETIME AND
   NOTHING LONGER, and within the instance it is THE OPEN COMMIT'S — not the closed one's"* — already applied to THIS key
   (`strata/envelope.md`: *"`storeCreate` with `cfg.constraints` carry nothing … the batch's only seat is the instance,
   where a closed commit's log cached is what `D-58`'s bound forbids"*).

**TWO CORRECTIONS TO THE INTAKE DELEGATION, NAMED RATHER THAN ABSORBED** (both verified by the supervisor at their bytes,
re-read by the critique as `C-22`):

- **`isLawfulListenerElement` IS NOT THE BYTE THAT MAKES A `listeners[]` ELEMENT TWO-MEMBERED** — that JS predicate tests
  membership and domain and would ADMIT a third member (`class-decision.mjs:1209`–`:1213`). **The refusing byte is the
  ENCODER, `frame.mjs:31`**, with `src/args.rs:302` as its Rust-side admission.
- **`research.md`'s `C-12` cites `kernel-registration.mjs:812`–`:840`; the close stands at `:928` today**, and that row's
  evidence column's second half (*"the synthetic attempt's close performs no store act"*) **is already false** — the close
  saves (`:930`–`:950`) and composes (`:952`–`:965`). **The claim — no terminal arm, no delivery seam — is unmoved.**

**AND ONE THING THE RECORD DOES NOT SAY, WHICH `§3` NEEDS: THE BATCH IS NOT ONE ACT.** Each element reaches `carryConstraint`
in its own `try` (`index.mjs:1654`–`:1661`); each registration opens its own synthetic attempt and its own close; that close
owes **one save per registration** and a rollback **over everything ITS route landed**. **So a `storeCreate` of N pairs is N
registration acts, and "the creation's" rollback scope, save count and delivery set are not objects the tree has** — and
because the batch throws on the first refusal, **pair N−1's `file` landing can be durable while the caller holds no instance
at all** (`:989`–`:990`: *"a caller of `storeCreate` receives it INSTEAD OF an instance"*). **⟶ THAT STATE — a durable edit
behind a construction that returned nothing — is a consequence no clause of this record prices, and it is the strongest
support the request has** (`C-6`).

## §3 · The questions the work cannot be scoped without

**Each phrased for a one-sentence answer, each carrying the default this record would take if it is not answered.**
`Q-1`–`Q-4` are the SCOPE fork; `Q-5`–`Q-9` the LISTENER fork; `Q-10`–`Q-14` the ACT fork. **Two of the first text's
questions are WITHDRAWN because the corpus already answers them** (`Q-3`'s "nothing checked" half, `C-4`; the refusal
form, `C-16`).

| `#` | question | default |
|---|---|---|
| `Q-1` | **Does *"all relevant constraints"* mean each supplied pair asked once at its own address, a sweep over every registered pair, or also the pairs a repair's write reached?** | **each supplied pair, once, at its own address** — and **stated as a READING** of `D-90` (1)–(3) read through `D-96`, not as a nullity (`C-12`) |
| `Q-2` | **On the first refusing supplied pair, are the remaining supplied pairs still asked, or does the construction short-circuit as it does today?** | **short-circuit stands** (`index.mjs:1654`–`:1661`; `constraints.mjs:523` throws) — and the record must then stop calling `(S-1)` *"each supplied pair"* (`C-11`) |
| `Q-3` | **Is the boot arm in scope — and if creation is judged, is it judged against the file's image at every boot?** | **in scope, and it already checks** (`D-91` item 1); what it does not do is deliver (`C-4`) |
| `Q-4` | **Is a construction whose pair order leaves the returned instance violating a pair it registered an accepted consequence?** | **accepted under `Q-1`'s reading, declared** — it is the shipped shape; `(S-3)` is the only arm that cannot produce it (`C-13`) |
| `Q-5` | **Which listener shape is built — `(a)` deferred to the first `register` that fills a body · `(b)` a callable on the `listeners[]` element · `(c)` fired set declared to fire at the first later act that reaches the address · `(d)` none · `(e)` `(b)` PLUS an eager firing at the creation instant?** | **⟶ CORRECTED (C-9, C-10): the first text's four-arm list omitted `(e)`, the only arm that fires AT the instant the owner named; and its default `(d) "no work"` was a silent `REJECT` wearing a default's clothes.** **The corrected default: the scope reading stands (`Q-1`) and the DELIVERY half is not built — and if he does not answer, that half is recorded as an explicit `REJECT` in this file, not applied as a default.** |
| `Q-6` | **If there is a firing set, what is the listener's ONE argument — and whose address?** | the repair's write's triggering address |
| `Q-7` | **If a creation-fired body throws, does `storeCreate` throw the caller's own value after the store exists and after a `file`-tier repair was saved?** | **it propagates** — and the closed fail set has **no member for it** (`§2`'s item on `X-16`: rank `18` reaches the caller only where the kernel MARKED the value, and no delivery site exists at that instant to set a mark) |
| `Q-8` | **May a deferred set be HELD past the registration's close, against `D-58` item 2's *"not the closed one's"*?** | **no hold past the close** |
| `Q-9` | **Where pair N−1's `file` landing was already saved and pair N refuses, does the earlier save stand — and is the durable orphan behind a construction that returned nothing an accepted consequence?** | **it stands, and the orphan is accepted and DECLARED** (`D-107`'s rollback is per route; `C-6`, `C-15`); it belongs in the record's own words |
| `Q-10` | **Does creation become ONE commit and ONE attempt, or stay N registration acts with their own closes, saves and rollback routes?** | **N acts**, unchanged; a collapse moves the save count, the rollback scope and rank `19`'s instant at once |
| `Q-11` | **Is *"the existing data state"* the register alone, or the listener home map and the registry too?** | **the register alone** |
| `Q-12` | **If a creation judges state and refuses AFTER the exclusive create, does the file it created stand, against `§10.4` part 5's *"leaves nothing behind"*?** | **it stands, declared** — the tree declares no removal arm, and that guarantee is drawn from ARGUMENT validation alone (`C-21`) |
| `Q-13` | **Which code answers a load-side validation failure now — rank `16` or rank `19` — and does a `D-90`-SKIPPED pair count as "checked" for *"all relevant"*?** | **rank `19`** (`D-91` item 1), **with row `16`'s load-side trigger declared `DECLARED, NO PRODUCER`** on `D-118`'s precedent (`C-14`) |
| `Q-14` | **What bounds the work at a creation — pair count alone, or something with the pass's guards?** | **one evaluation per supplied pair, no sweep** — and the record says the bound out loud, because at a creation the corpus's loop guards do not exist (`C-19`), and re-boot repetition has no cross-boot guard either (`C-18`) |

**AND ONE FACT NO ANSWER REMOVES — RESTATED, BECAUSE THE FIRST TEXT'S VERSION WAS FALSE.** **⟶ CORRECTED (C-7, C-8):** the
first text said *"the function a `cfg.listeners` element would name cannot exist at that instant on any reading"*, and
called it *"not a clause but the order of two acts."* **`§4`'s own lawful `(b)` falsifies that**: under `(b)` the caller
supplies the function **before** calling `storeCreate`, so a body can exist at that instant. **What is true, and is what
stands: under the corpus AS IT IS, no body can exist** — the encoder refuses the third key (`frame.mjs:31`), the store's
record has no place to put one (`contract.md:910`), and `register` is a member of the instance the call returns
(`surface.md:417`–`:424`). **So admitting a callable is a RULING AWAY, not an impossibility** — and it is the only route
by which the owner's *"fire listeners"* is satisfied at the instant he names.

## §4 · The alternatives, priced, none chosen

| `#` | the shape | what it moves | its class, and what refuses it |
|---|---|---|---|
| `(S-1)` | each supplied pair asked once at its own address | **nothing in code** — the shipped act, **minus the pairs a refusal skips** | no clause moves; **cheapest, and the only shape needing no ruling** — but it is a READING (`D-90` (1)–(3)) and must be stated as one (`C-12`) |
| `(S-2)` | the pairs a repair's write REACHED, asked too | the re-run's set (*"a re-run of a registration is not a pass over the registry"*); `D-97`'s grant shape; possibly rank `20`'s reach | the largest by bytes; `D-104` item 3 says the mechanism and the cells are re-derived with it |
| `(S-3)` | a sweep of the whole register | `D-90`'s pair-by-address rule; the instant's declared scope; `D-90` (4)'s five instants, which name no sixth | **refused as THIS act's reading**; a new row's to open. **The only arm that cannot hand back an instance violating a pair it registered** (`C-13`) |
| `(a)` | deferred/queued delivery flushed at the first `register` that fills a body | `register`'s `undefined` answer and `§2.4` rule 1; `§2.7`'s windows gain a third, caller-triggered instant; the RESERVATION reading; **and it needs a SEAT** | instant-and-rule move, no member, no type line: `MINOR` — **most expensive in rules**; **its seat refused by `D-58`** (a ruling away, not a prohibition). **`D-117` proves the corpus will place such an instant and fixes its order: ask → repairs land → re-run → SAVE → DELIVER → record** |
| `(b)` | letting `cfg.listeners` elements carry a callable | **NOT the type** (`StoreConfig.listeners` is `readonly unknown[]`); it moves the ENCODER (`frame.mjs:31`), the element's declared shape, and the arming point | **`D-26`'s own move one key over, landed once already**; the store does not move. **⟶ CORRECTED (C-8): the first text called it *"a precondition of (a) and (c), never an alternative"* — false in both directions.** `(a)` needs no callable on the element (its flush point is `register`, whose domain already admits the adopted handle, `surface.md:439`–`:442`); `(c)` needs none at all; **and `(b)` is the ONLY shape that puts a body in the caller's hand before `storeCreate` returns** |
| `(c)` | creation's fired set declared to fire at the first later act that reaches the address | **nothing in behaviour** — a later act fires that address's listeners today by its own `triggered` set; it moves the guide's sentence, not the tree | **the cheapest shape that changes any claim**, and the one most easily confused with "the creation fired it" |
| `(d)` | impossible, therefore no work | the guide's sentence, `C-12`, and `D-104`'s reach left at the landing instant all stand | **zero bytes; ⟶ CORRECTED (C-10): not a defensible DEFAULT for an instruction — only an explicit `REJECT` recorded in this file** |
| **`(e)`** | **`(b)` plus an EAGER firing at the creation instant** | `(b)`'s surfaces **plus the delivery instant** (`D-90` (4) names five and no sixth; `§2.7` item 7's instant is the pass's terminal arm; `D-94` item 3 declares the registration's caller-visible difference to be success-vs-rank-19 ALONE) | **⟶ ADDED (C-9): the only arm that satisfies *"fire listeners"* AT the instant the request names.** Not on the first text's list at all, **so the fork could not have recorded the owner's answer if it is "yes"**; `MAJOR` by the delivery instant and the refusal-surface moves, and it owes the throw question (`Q-7`) that no clause answers |

**TWO THINGS THESE PRICES SHOW, NEITHER A RECOMMENDATION.**

- **THE CRUX IS `Q-5`, AND THE ANSWER MAY LEAVE NO WORK.** `(c)` and `(d)` differ by one sentence of prose; `(S-1)` differs
  from the tree by nothing. **Three of the eight shapes are declarations; `(a)`, `(b)`, `(e)` and `(S-2)`/`(S-3)` move
  code — which is why this record neither calls the request unimplementable nor calls it implemented.**
- **THE CHEAPEST SHAPE THAT HONOURS THE OWNER'S OWN NOUN IS `(e)`, AND IT IS THE MOST EXPENSIVE ON THE LIST.** That is the
  whole shape of the block, and it is the architect's to take or decline.

**AND ONE PRICE NO SHAPE ESCAPES:** **`docs/guides/package-use.md:497`–`:499` and `C-12` must be re-spelled in the same
pass, whatever `Q-5` answers**, because both declare that a boot — and a registration — fire nothing (`C-20`).

## §5 · What would be refused, and what is merely a ruling away

`strata/brief.md:45`–`:47` first: rulings override this file, so **no shape is beyond a ruling — each is a ruling away.**
What follows is refused *as a reading of the present corpus, on a named byte*:

1. **A creation that opens a pass over the registry** — refused by the instant's own scope (`kernel-registration.mjs:230`–`:232`)
   and `D-90` (4). `Q-1`'s third arm needs a new row, not a design.
2. **A fifth key on `cfg`, or an option inside an existing one** — `surface.md` closes `cfg` at four keys (*"no FIFTH key"*);
   a caller-supplied fifth key is ignored, not read. **So the request has no config key to ride.**
3. **A `triggered` set on a construction's answer** — a construction returns an instance and no record
   (`contract.md:2799`–`:2803`); `triggered` is a member of `WriteResult` and `DeleteReceipt` alone (`surface.md:1650`–`:1651`).
4. **A creation whose refusal leaves a landed edit standing** — `D-107` item 1, which the close already honours. `Q-9` does
   not reach it: a sibling registration's already-saved landing is not *"its route"*.
5. **⟶ CORRECTED (C-7): THE FIRST TEXT'S ITEM 5 — *"no ruling can make a listener body invoked at a creation true"* — IS
   WITHDRAWN AS FALSE.** Under `(b)`, the caller supplies the callable before the call, and `(e)` then invokes it. **What
   no ruling can make true without `(b)` is that a body exists at all**, because the encoder refuses the third key and
   `register` is a member of the returned instance. **The distinction matters and the first text collapsed it.**

**Everything else — a deferred set with a seat `D-58` permits, the callable on the element, the eager firing of `(e)`, the
declaration of `(c)`, the declaration of `(d)`, and `Q-1`'s narrowing — is lawful, priced, and a ruling away.**

## §6 · The critique's ledger

**`role_l0_critique`, `2026-11-06`, against the first text of `§1`–`§5`. Read-only pass; text landed by the supervisor.**
Every row names the sentence attacked, the verdict, and the byte that decides it. **`HOLDS` rows are carried so no claim
here stands unchecked; the others are landed as corrections above.**

| `C-n` | the claim attacked | verdict | the byte that decides it |
|---|---|---|---|
| `C-1` | `§2`'s FOR-IT row citing *"`strata/research.md §19`'s drives"* | **UNSOURCED when first written** | `research.md` had no `§19` at that instant; **now resolved — `§19` landed and the figures are its `§19.4`** |
| `C-2` | Ground 1's *"`D-106` already rules that act out on its own ground"* | **OVERSTATED** | that sentence sits inside `D-106`'s *"WHAT IT DOES NOT SETTLE — L1's…"*, which names the construction write as an UNSETTLED scope question |
| `C-3` | *"an empty file and no byte"* ⇒ the create arm moves nothing | **UNDERSTATED** | `contract.md:4830`: *"SUCCESS **CREATES THE STORE'S OWN FILE**, LEAVES IT ZERO-LENGTH"* — a new file where none stood is a change |
| `C-4` | *"on the boot arm … which moves no datum"* | **OVERSTATED — and the boot is the arm the request fits best** | `D-91` item 1: the batch's evaluation stays at construction **and at a boot over an existing `filePath`**, and a rank-`19` refusal surfaces from both |
| `C-5` | the arm partition supporting *"partly false"* | **CORRECT as a count, WRONG in assignment** | the only inert arm is a boot over an existing file with no `cfg.constraints` (`contract.md:4833`) |
| `C-6` | Ground 1 vs `§2`'s durable-landing fact | **SILENT — internal contradiction** | `§2`'s own act-count paragraph (durable landing) contradicts *"partly false"*, and leaves a durable orphan behind a construction that returned nothing (`:989`–`:990`) |
| `C-7` | *"the function … cannot exist at that instant on any reading"* | **FALSIFIED by `§4`'s own `(b)`** | `(b)` puts the callable in the caller's hands before the call; the present refusal is only `frame.mjs:31` and `src/args.rs:302` |
| `C-8` | *"`(b)` is a PRECONDITION of `(a)` and `(c)`, never an alternative"* | **FALSE both ways** | `(a)`'s flush point is `register`, whose domain admits the adopted handle (`surface.md:439`, `:441`–`:442`); `(c)` needs no callable; and `(b)` alone can fire at the create |
| `C-9` | `Q-4`'s four-arm candidate set | **NOT EXHAUSTIVE** | the fifth arm — `(b)` plus eager firing — is now `§4`'s `(e)` |
| `C-10` | `Q-4`'s default `(d) NO WORK` | **A SILENT `REJECT` WEARING A DEFAULT** | `proposals.md`: a proposal leaves this file as an architect's answer **or as a `REJECT` recorded here**; a default may not take that decision for him. **Default restated at `Q-5`.** |
| `C-11` | `(S-1)` = *"each supplied pair at its own address, the shipped act"* | **UNDERSTATED — the shipped act SHORT-CIRCUITS** | `index.mjs:1654`–`:1661` + `constraints.mjs:523` (the crossing throws): the first refusing pair aborts the construction |
| `C-12` | `(S-1)` as *"nothing — the shipped act"* | **UNDERSTATED** | the list is not persisted (`contract.md:4008`), so there is no earlier session to be unfaithful to — **`(S-1)` CAN honour "all relevant", but only stated as a reading of `D-90`/`D-96`** |
| `C-13` | `(S-1)`'s real price | **SILENT** | *"a re-run of a registration is not a pass over the registry"*: an instance can return violating a pair the same call registered |
| `C-14` | the `D-90` (5) residue | **SILENT, and this request makes it load-bearing** | row `16` still names *"the validation of the loaded state against it at load"*; `D-90` (5) deleted its producer, and rank `19` replaces it skippably |
| `C-15` | the act-count claim | **HOLDS** | four bytes verified; **and the consequence is worse than stated** — the refusal returns no instance at all |
| `C-16` | `Q-3`/`Q-6` as open | **SILENT — already decided** | rank `19` `ConstraintRefusedAtRegistration`; thrown **instead of an instance** (`kernel-registration.mjs:989`–`:990`); `log` = `[]` unless a repair ran; the construction's property row closes at three outcomes |
| `C-17` | *"creation has no journal carrier"* | **OVERSTATED — the carrier exists; the HANDOFF does not** | `3-bis` (f) at `:573`–`:578`; what is missing is `:580`–`:583`, `dropHandoff`, `D-58` item 2 |
| `C-18` | re-boot idempotence | **SILENT** | the batch runs on every `storeCreate`, the boot included; the marker is per attempt and the restart budget is the pass's — **no cross-boot guard exists, and no clause declares the repetition** |
| `C-19` | the cost nobody priced | **SILENT** | the corpus's loop guards are the pass's (*"constraint/repair has loop guards while listeners don't"*); a construction has no attempt, no budget, no marker |
| `C-20` | *"an instant `D-104` did not name"* | **OVERSTATED — the silence is DECLARED** | `kernel-registration.mjs:888`–`:889`; `PIN-6` (v); `C-12`. **`D-104`'s defect was undeclared; this is stated** |
| `C-21` | *"a constraint pass cannot precede the create … so nothing is validated after"* | **OVERSTATED** | `:4831`/`:4832` bound ARGUMENT validation; the batch already runs afterwards. **The real cost: a post-create state refusal breaks "leaves nothing behind" with no removal arm declared** |
| `C-22` | `§2`'s two corrections and `§2` items 1/2/5, `§5` items 1–4 | **HOLD** | re-read and confirmed at their bytes |

**THE CRITIQUE'S VERDICT ON THE TOKEN, QUOTED SO IT IS NOT SUMMARISED AWAY:** **"The token stands; its grounds do not …
`BLOCKED-ON-SEMANTICS` survives because no shape in §4 satisfies the instruction without a fresh ruling — the delivery
instant, the retainable seat, the load-side code — and because the cheapest arms are a nullity that would silently decline
an instruction. … `BLOCKED-ON-SEMANTICS` also stands on a reason §1 does not give: the request's cheapest honest reading
lands on a `REJECT`, and the record must not let a default take that decision on the owner's behalf."**

## §7 · Envelope

**VERDICT.** `BLOCKED-ON-SEMANTICS` · grounds replaced by `§6`'s ledger · **⟶ ANSWERED `2026-11-06`: the token is
DISCHARGED by `§8` and `strata/decisions.md` · `D-123`, and ONE UNIT MAY BE SCOPED (L1's), carrying `D-123`'s eight
residuals as questions and never as design.**

**BLOCKING.** Fourteen questions (`Q-1`–`Q-14`), each with a default, and one restated fact that no answer removes on the
corpus as it stands.

**PRICED AND UNCHOSEN.** Eight shapes: scope `(S-1)`/`(S-2)`/`(S-3)`; listener `(a)`/`(b)`/`(c)`/`(d)`/`(e)`.
**Cheapest under an answering architect: `(S-1)` + `(c)` or nothing; the only shape that honours his own noun: `(e)`, the
most expensive on the list. Most expensive in rules: `(a)`, whose seat `D-58` refuses.**

**WHAT GATE 2 WOULD PIN, AND ONLY ONCE HE ANSWERS.** `Q-1`'s scope **stated as a reading**; `Q-5`'s shape and, if `(a)` or
`(e)`, the delivery instant and its order (`D-117`'s, instant for instant); `Q-8`'s seat; `Q-10`'s act count with the save
count and rollback scope; the construction's refusal form as already declared (rank `19`, thrown instead of an instance,
`log` = `[]` unless a repair ran) and row `16`'s load-side arm retired or given a producer; **the prose: the guide's two
firing acts and `C-12` re-spelled in the same pass, whatever the answer**; and **one sentence the corpus has never had —
what a creation-fired body's throw does to a `storeCreate` that has not yet returned**, for which the closed fail set has
no member.

**NOT DECIDED HERE, AND NOT TO BE READ AS DECIDED.** The token is a gate-1 verdict and not a ruling; every default is a
default; no alternative is chosen; no clause is amended; **no pin, no cell, no contract directory and no unit is named.**
The next move is the architect's answer, one sentence per question, landing in `strata/decisions.md`.

## §8 · The architect's answer, `2026-11-06` — `D-123`, and what it leaves standing

**LANDED AS `strata/decisions.md` · `D-123`.** The four questions that scope the work were put to him by selection and in
their own words; **HIS ANSWERS, VERBATIM:**

> **`Q-1` (scope)** — *"A sweep of the whole register, refusing an inconsistent result"* → **`§4`'s `(S-3)`**, and the
> registration instant's *"THAT ONE PAIR and no other"* scope is superseded at the creation.
>
> **`Q-5` (listeners)** — *"Refuse listeners that don't carry functions, and fire all ones with an existing address after
> constraints pass. Why would a listener that doesn't have a function to fire on the listened address be accepted?"*
> → **`(b)` + `(e)`: the element carries its callable, an entry without one is REFUSED, and the firing happens at the
> creation, after the constraints pass, for every adopted listener whose watched address exists.** **The reservation
> reading is withdrawn at this entry point.**
>
> **`Q-9` (the orphan)** — *"If constraints fail on creation, return error. Application needs to check if file data is
> corrupt or if constraints are incompatible"* → **the refusal is the contract and the DIAGNOSIS becomes a requirement on
> it**; **whether a refused creation leaves the store's own file and an earlier pair's already-saved landing standing is
> left open**, as `D-123`'s residual `7`.
>
> **`Q-7` (a body that throws)** — *"Refuse the construction with a declared code"* → **`D-73`'s asymmetry reversed at a new
> instant, and the closed fail set MOVES** (residual `4` names the member).

**WHAT THE ANSWER DOES TO THIS RECORD.** `§1`'s token is DISCHARGED — not narrowed: he took the most expensive scope, the
only firing shape that honours his own noun, and a fail-set move. **`(a)`, `(c)` and `(d)` are refused by his choice, and
their prices stand as the record of what was declined.** **`(S-1)`'s two understatements (`C-11`'s short-circuit and
`C-13`'s inconsistent instance) are closed by `(S-3)` rather than answered.**

**WHAT STANDS OWED, AND IS NOT A QUESTION THE ANSWER REACHED** (`D-123`'s eight residuals, carried here so gate 2 meets them
by name): the sweep's reach beyond the creation (`addConstraint`, a re-arm, the boot); the code for an inconsistent-state
refusal (rank `16`'s orphaned load arm, or a new member); **what address a creation-fired listener receives as its one
argument**; which member carries a thrown body's refusal; whether *"no function, refused"* also reaches the RUNTIME
`listen` + `register` surface; **the BOUND on a sweep that must converge** (a construction has no restart budget, no attempt
and no applied-repair marker); what a refused creation leaves at `filePath` and in the `file` bytes; and the release class of
the two moves (element shape and fail set are not one class).

**THE PROSE OWED IN THE SAME PASS IS NAMED AND UNMOVED:** `docs/guides/package-use.md:497`–`:499` (*"nor does a boot or any
read-driven traversal fire a listener"*) and `strata/research.md §13.2`'s `C-12` both declare the silence `D-123` reverses.

---

# `P-3` · Change detection on writes — a write of the standing value should fire nothing

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-17`:**

> "Change detection on writes so that 'writing' the current existing value at an address doesn't fire listeners (because nothing
> changed)"

**ITS INTAKE, AND BY WHOSE CALL.** **The architect's own instruction: *"Mark, analyze as proposal, but do not proceed to
implementation."*** So this is a **speculative feature request** like `P-1`, and **not a defect report**: **no clause is being
violated by the tree.** The gate-1 question is therefore *what would have to move, and whose word moves it* — not *what is broken*.
**NO UNIT, NO PIN, NO CONTRACT DIRECTORY AND NO DESIGN IS HERE**, and no line of code was touched.

**PROVENANCE, AND ITS LIMIT.** Written `2026-11-17` at `HEAD` `5cfb329` by the supervisor (L0), from **a research audit
(`strata/research.md §21`, landed the same day), a gate-1 validity pass (`role_l0_validity`) and its adversarial companion
(`role_l0_critique`)** — with **every `path:line` either printed by a pass and re-read by the supervisor at the bytes, or re-read and
corrected by him.** **Two of the gate-1 verdict's claims are WITHDRAWN BY NAME in §1** (`C-2`'s *"five referents"* as a live fork and
`C-3`'s *"no value term"* as the declared criterion), and **three of its refusals are narrowed in §7** (`C-25`, `C-17`, `C-18`).
**The one measurement in this file is the supervisor's own probe and it is marked as driven wherever it is used**
(`strata/research.md §21.7`; `bindings/js/build/Release/storeroom_js_binding.node`, mtime `2026-11-11 13:24`).

**ENVIRONMENT FACT OF THIS FILE'S OWN DATE, RECORDED SO NOTHING IS SWEPT IN SILENTLY:** `strata/research.md` gained a **different**
request's `§20` (the CJS entry request) at `11:18` today while this request's audit was in flight, and `strata/decisions.md` gained
that request's `D-127` at `11:25`. **`§20` and `D-127` are that session's; `§21` and `P-3` are this one's. Neither record absorbs
the other**, **no byte of `decisions.md` was written by this pass**, and nothing is committed by it.

---

## §1 · The gate-1 verdict, and the ground it must rest on

**`BLOCKED-ON-SEMANTICS`.** `role_l0_validity`, `2026-11-17`, **re-grounded by the critique the same day** (`role_l0_critique`
`C-1`: the token is `CONFIRMED`, its stated ground is not).

**THE GROUND, CORRECTED AND IN ONE SENTENCE.** **The record holds two sentences about ONE predicate and they disagree** — the
criterion says a firing is a **value change** (`D-66`, `strata/decisions.md:3765`–`:3766`: *"a pair is asked when the act CHANGES THE
VALUE AT THE PAIR'S ADDRESS"*, restated in the crate's own docblock at `src/store.rs:3566`–`:3570`) while the **landed** predicate
carries **no value term at all** (`src/store.rs:3571`–`:3577`: `is_prefix(registration, address) || touched.iter().any(…)`) and the
kept row declares that omission is a **failure** (`docs/specs/storeroom-native/contract.md:3028`–`:3033`, `:3149`–`:3150`) — **and
which of the two governs, at which layer, and on which of "changed"'s referents, are all the architect's words; the "conditions"
would be the choice of the fraction and not a narrowing inside one.**

**WHAT IS WITHDRAWN FROM THE GATE-1 TEXT, AT THIS LINE AND BY NAME** (`role_l0_critique`, re-read by the supervisor):

- **`C-2` — *"five candidates and the record decides none"* is OVERSTATED as a live fork.** **In the case the request names and the
  supervisor measured, four of the five coincide**: the unqualified read answers the lowest-persistence version by declared rule
  (`docs/specs/storeroom-native/contract.md:1794`, `:2237`; `src/store.rs:2564`–`:2567`'s `.min_by_key(|r| rank)`), the version at the
  written tier stood and stands at the same value, the per-tier standing is `{mem:1}` on both sides, and a `mem` write moves no
  durable byte. **The fork is REAL at a tier-crossing write and at a structured write, and not at the ordinary scalar re-write** —
  the honest figure is **"two referents that matter and three that coincide in the common case"**, not five live options.
- **`C-3` — *"the firing rule has no value term"* is FALSE AS A STATEMENT ABOUT THE CRITERION and true only of the instantiation.**
  **This is the finding that reframes `P-3`**: the owner is not asking for a semantic the corpus lacks — **he is reporting a
  disagreement between the corpus's stated criterion and its landed predicate**, and a filing that called this *"never specified"*
  would send its reader to design a rule the record already declares. **`docs/specs/storeroom-native/contract.md:3015`–`:3020` and
  `:3672`–`:3684` show `P-TP-8` has already been re-derived twice by bounded amendment**, so the row is amendable — **by him**.

**WHY NOT `APPROVE-WITH-CONDITIONS`.** The precedent is real (`strata/envelope.md:496`: *"EIGHT FINDINGS, none blocking … two
questions with defaults"*), and the test that separates it is `P-1`'s: **there, every finding was a check at a named later gate
against ONE object.** Here **the layer, the referent and the instant each move a different declared set** — the store's
`triggered` **and** `watched` **and** the pass **and** `D-105`'s repair-credit set, or none of those and the delivery instead with a
pre-act capture per delivered registration (`C-14`) — **so a "condition" would be a choice, not a narrowing.**

**WHY NOT `REJECT`.** **`REJECT` here would be `D-76`'s failure mode** (`strata/decisions.md`'s *"A PERMISSION BECAME A PROHIBITION"*,
cited at `strata/proposals.md:52`–`:53`) **for a request the record's own criterion sentence supports**, and `strata/brief.md:45`–`:47`
stands first: **rulings override this file, so every shape in §5 is a ruling away and none is a prohibition.** **`(d)` records what a
refusal would be; it does not take it.**

**AND ONE FACT NO ANSWER REMOVES.** **No layer holds the comparison today, and the two candidate layers do not hold the same data.**
The store holds the per-tier pre-state (`Captured`) and selects the version an unqualified read answers (`src/store.rs:2564`–`:2567`)
**but compares no value on the write path**; the package owns the delivery seam and **its one seam receives the set and the address
only** (`bindings/js/src/entry/delivery.mjs:105`: `export function deliver(state, triggered, triggeringAddress) {`), **and the
listener's single argument is an address and no value at all** (`bindings/js/index.d.ts:573`). **Whichever layer he names, the act
must gain an input it does not have — and at a shadowed address that input is a per-tier LIST**
(`src/store.rs:2036`–`:2038`), **not the value a read answers.** That survives every answer to §4.

---

## §2 · What the corpus says AGAINST it, and what it says FOR it

**THE HONEST SHAPE OF THIS SECTION: the record's stated purpose is FOR the request and its landed clauses are AGAINST it, and the
two are three days and one instant apart.**

**FOR IT — AND IN THE ARCHITECT'S OWN WORDS, WHICH IS THE STRONGEST GROUND THIS RECORD CAN OFFER.**

1. **THE LISTENER'S DECLARED USE CASE IS UPDATING EXTERNAL CODE WITH NEW DATA.** `strata/decisions.md:3879`, verbatim: *"The use case
   for listeners is for updating external code with new data, ex. changing the rendered information on screen"*. **An invocation
   that carries no new data is that sentence spent on nothing** — and a listener's one argument is an address, so the body cannot
   even tell that the firing was a re-write.
2. **THE CRITERION SENTENCE IS A CHANGE TEST.** `strata/decisions.md:3765`–`:3766` (`D-66`) and `src/store.rs:3566`–`:3570` —
   quoted in full at `strata/research.md §21.2 (i)`. **The record does not merely tolerate the request's predicate; it states it.**
3. **THE PREDICATE THE REQUEST ASKS FOR ALREADY SHIPS ON ANOTHER INSTANT.** `bindings/js/src/entry/constraints.mjs:2534`–`:2545`, the
   reversal's judgement — *"A STANDING THIS REVERSAL DID NOT MOVE IS NOT A STANDING IT LEFT"* — implemented as
   `if (sameStanding(one.before, after) === true) continue;`, with `sameStanding` structural over the store's decoded values
   (`:3483`–`:3490`), declared at `docs/specs/storeroom-js/contract.md:1826`, **and guided at `docs/guides/package-use.md:1284`**
   (*"a request whose watch shows no moved address is consumed and asks nothing"*) with `:1219` beside it — **⟶ CORRECTED AT THIS
   LINE: the gate-1 and critique passes both carried `package-use.md:490` for this site, which is the refused-reversal clause and
   states no change test; the supervisor re-read both files and the two sites named here are the guide's own.**
   **So the mechanism, its equality relation and its idiom all exist in the product; the request extends one to a second instant.**
4. **THE STORE ALREADY OWNS A "NOTHING DURABLE MOVED" TEST, ON THE SAVE PATH.** `src/store.rs:1666`–`:1674`'s `save_owed`, whose own
   docblock speaks the request's language (`:1659`–`:1660`: *"written a byte for a datum nothing durable moved"*). **Its ground is a
   version's DEPARTURE and not a value's equality — which is the third candidate referent, and the only one with a shipped
   implementation inside `src/`.**

**AGAINST IT — AND EACH ONE IS A KEPT CLAUSE OR A DECLARED INSTANT.**

1. **THE ROW THAT COUNTS A MISSING HANDLE AS A RED.** `docs/specs/storeroom-native/contract.md:3028`–`:3033` and `:3149`–`:3150`,
   quoted at `strata/research.md §21.1 (i)`. **A suppression makes a declared failure the behaviour, and that is an amendment and not
   an implementation.**
2. **ONE PREDICATE, IN THE STORE, AND THE CONVERGENCE THAT COST A DEFECT TO WIN.** `strata/decisions.md:3861`–`:3863` (`D-69`'s
   move: *"the PASS becomes a FILTER over `triggered` … **ONE PREDICATE, in the store, where the per-tier versions live**"*), and
   `D-67`'s filed asymmetry at `:3803` (*"A CONSTRAINT AT A TOUCHED DESCENDANT IS ASKED; A LISTENER AT THE SAME ADDRESS IS NEVER
   TOLD."*). **A package-side second predicate re-creates that asymmetry one layer up**, which is why §5's `(b)` is dearer than it
   looks.
3. **THE GUIDE'S CLOSED FIRING LIST.** `docs/guides/package-use.md:497`–`:499`: *"Listeners fire on `write` and `delete`, on a
   `rollback`'s judgement, and at the four REGISTRATION instants — and never on a read"* — **re-spelled in place on `2026-11-06` by
   `D-125` item 2 (iii), which is the proof that this class of sentence moves when a firing set moves, and that it is rewritten
   rather than left standing.** Its generated landing `bindings/js/README.guide.md` is `scripts/publish.sh`'s and is **never
   hand-edited**.
4. **THE RE-ENTRANCY CLAUSE, WHICH DECLARES THE PER-ACT COMPUTATION DELIBERATE.** `docs/specs/storeroom-js/contract.md:2109`–`:2111`:
   *"**RE-ENTRANCY IS UNAVOIDABLY OPEN**: a listener that writes at the address it was delivered for fires itself again, because the
   store's trigger set is computed per act; **nothing detects it and nothing is meant to**."* **Its subject is a listener's own
   write and not value equality** — but **a persisted change test would partially detect one form of the very re-entry this clause
   declares undetected**, and that is a sentence a landing pass would have to re-spell in the same pass, not a sentence it can leave.
5. **`triggered: []` WOULD COME TO MEAN TWO THINGS, AND THIS CORPUS HAS ALREADY RULED THAT DEFECT CLASS.** `docs/specs/storeroom-js/surface.md:230`
   and `:235`–`:236` (`D-75`/`D-78`: *"`undefined` IS NOT `[]`"*, and a member present *"to say so"*): under any suppression `[]` reads
   both *"no registration stood at a prefix"* and *"registrations stood and nothing moved"*, **and the store's existing `[]` on a
   write means the first** (`N-2`'s delete arm, `contract.md:3040`–`:3041`). **The request owes that sentence and does not name it.**
6. **ONE LIVE CELL ASSERTS THE OPPOSITE, IN ITS OWN STATE TABLE.** `tests/e2e/json-crossing.test.mjs:4357` (*"a second identical
   write at the same address | a SECOND invocation"*), asserted at `:4520`. **⟶ NARROWED (`C-16`): the cell's SUBJECT is the
   listener's ARGUMENT freshness** (`:4522`–`:4534`), so it is **a token to re-derive**, not a semantic the suite defends. **A price,
   and a small one.**

---

## §3 · The measurement — the one driven figure in this proposal

**BY THE SUPERVISOR, `2026-11-17`, through the checkout's own entry and the `1.11.0` cut's prebuilt addon; the full table is
`strata/research.md §21.7`.** **Two facts from it and no more:**

1. **An identical write fires, and so does a changed one** — four `mem` writes at `['a']` (`1`, `1`, `2`, `2`) returned
   `triggered: [{handle:'w-a', address:['a']}]` **every time**, `op.seq` moved `1 → 4`, and the listener body ran **four** times; the
   second answer's `before` and `after` both read `{present:true, value:1}`. **The set carries no value term in either direction.**
2. **A `file`-tier identical write rewrote the file: the bytes identical, the mtime moved** — so **the durable save is performed for an
   act that moved no durable datum**, which is `save_owed`'s `file`-tier short-circuit (`src/store.rs:1668`) measured, **not a
   change test**.

**WHAT IT DOES NOT SETTLE, AND THIS FILE DOES NOT PRETEND OTHERWISE:** one address, scalar values, no constraint pair, no repair, no
two tiers at one address. **The touched arm on a structured value, a repair's landing and a shadowed `before` are all outside it** —
they are `Q-3`, `Q-7` and `Q-8` below.

---

## §4 · The nine questions the work cannot be scoped without

**EVERY ONE IS THE ARCHITECT'S. Every default is a default and none is a recommendation.** **Two of gate 1's questions are
DISCHARGED BY DERIVATION and are not asked here** — *does `watched` narrow with `triggered`* is answered by the one-predicate
projection law (`src/store.rs:2221`–`:2225`; `contract.md:3048`–`:3051`), and *does a tier purge count as change* is answered by the
criterion sentence itself (`src/store.rs:3568`: *"a node the act CREATED OR PURGED has a value that changed"*) — **both are
consequences of `Q-2` and neither may be taken by a default as a free move.**

| `#` | the question | the default if he does not answer | disposition |
|---|---|---|---|
| `Q-1` | **WHICH SENTENCE GOVERNS THE PREDICATE** — `D-66`'s stated criterion (*"the act CHANGES THE VALUE"*) or `P-TP-8` (a)'s landed one (*"any successful `write`"*, prefix + touched, no value term)? **This is the reconciliation `strata/research.md §21.2` found, and it is the whole contract.** | **the landed row stands and nothing lands** — a layer may not prefer the criterion to its instantiation on its own authority | **BLOCKING** |
| `Q-2` | **AT WHICH LAYER** — the store's predicate (`D-69`'s one predicate, and the only place the per-tier versions are) or the package's delivery (a second predicate over the store's set)? | **the store** — `contract.md:3678`: *"ONLY THE STORE HOLDS THE PER-TIER VERSIONS"*, and `D-67`'s asymmetry is what a delivery-side test re-creates | **BLOCKING**, and it decides §5's price |
| `Q-3` | **THE REFERENT OF "CHANGED"** — the value an unqualified read answers · the version at the written tier · the whole per-tier standing · `seq`/the journal · the durable bytes. **The fork is REAL at a tier-crossing write** (a `file` write of the `file` value purges a `mem` shadow and moves what a read answers) **and at a structured write** (whose members are *touched* by construction, `src/store.rs:2247`–`:2250`). | **the value an unqualified read answers, and nothing else** — the only referent the criterion sentence names | **BLOCKING** |
| `Q-4` | **DOES THE RULE REACH THE TOUCHED ARM?** A second identical `write(['a','b'],'mem',{c:1,d:2})` **touches** `['a','b','c']` and `['a','b','d']` by its `written` arm, **where neither value changed.** Applied as its words say, the request narrows `D-66`'s descendant arm too — **a whole family of fires no version of the request mentions.** | **the touched arm is NOT narrowed** — its fires stand, because a registration there was told by `D-66`'s ruling and not by this request | **BLOCKING** |
| `Q-5` | **WHAT MAY A CALLER CONCLUDE FROM `triggered: []`, AND HOW DOES IT TELL THE TWO CASES APART** (`D-75`/`D-78`'s class: `undefined` is not `[]`, and a member exists *"to say so"*)? | **the sentence is owed in the same pass** and the two cases are declared to be indistinguishable from `[]` alone | **a debt that a landing pass may not leave** |
| `Q-6` | **DOES `D-1-bis`'s *"unconditional on the write/commit path"* BIND THE SET'S INPUT PREDICATE?** The word's subject at all three of its sites is the mechanism's PRESENCE (`strata/decisions.md:97`–`:99`, `:42`–`:43`, `:62`–`:63`), and its input is *"the triggered handle set"* — **whether the predicate is included is a reading no row answers.** | **the mechanism stays present and its input may narrow** — the reading that keeps `D-1-bis` about the mechanism, which is what its own ground sentence says | **the architect's reading; a layer may not take it** |
| `Q-7` | **AT WHICH INSTANT — the spelled value before a repair, or the landed value after it?** A pair may repair a write into a *different* value; and the corpus's one terminal-state precedent points the other way (`docs/specs/storeroom-js/contract.md:1811`: *"A REVERSAL IS JUDGED AT THE TERMINAL STATE IT LEAVES, AND NEVER PER UNWINDING STEP"*), with the re-run unconditional (`kernel-registration.mjs:879`–`:882`, `D-94`: *"Always rerun after a repair"*). | **the landing, before any repair** — the set is computed inside the write (`src/store.rs:2652`–`:2657`) and the save and the pass follow it (`:2658`–`:2663`) | **BLOCKING**, because it decides whether a repair can be silenced by the value it was asked to fix |
| `Q-8` | **HOW WIDE IS THE RULE** — `write` alone · also a repair's `write` (whose fired set `D-104` item 2 ORDERS delivered, `strata/decisions.md:5321`–`:5323`) · also a `delete` (which already has a removal-conditioned arm, `D-3`) · also the four registration instants (`D-123` item 2, `D-125` item 1) · also a reversal's judgement (**already** change-conditioned, `N-6`). | **`write` alone, in the caller's own hand** — every other arm unmoved; **a wider reading is a fresh ruling and not a narrowing** | **BLOCKING for scope** |
| `Q-9` | **IS THE SHIPPED DEFAULT FLIPPED, OR IS THE BEHAVIOUR OPT-IN?** The request names no flag; flipping a shipped default on a wish is the one move no layer may take (`P-2`'s `C-10`, `strata/proposals.md:496`). **AND THIS OWNER'S OWN PRECEDENT ON THE SAME FORK IS OPT-IN**: `P-1` came back as *"an additional read option"* and discharged as a **third verb** (`D-121`, `D-121-ter`; `strata/proposals.md:212`–`:214`, `:248`–`:251`). | **the shipped default STANDS and nothing lands** — under silence the record says so explicitly rather than taking the flip on his behalf | **BLOCKING**, and it is the question whose default is a silent ruling if it is not named |

---

## §5 · The alternatives, priced, none chosen

**No class is CLAIMED — `D-124` item 3's discipline is that the class is the architect's until he names it — so each class is the
one the SHAPE implies by the corpus's own ordering, offered as a price.**

| `#` | the shape | what it moves | `P-TP-8` (a) + failure list | the cell | class |
|---|---|---|---|---|---|
| **(a)** | **suppress at the store's predicate** — a value comparison in `src/store.rs` before `:2657` | `triggered_for`/`watched_for` and the one-predicate projection; **the constraint pass by construction** (`kernel-attempt.mjs:648`–`:649`, `index.d.ts:971`); **and `D-105`'s repair-credit set** (`kernel-attempt.mjs:656`–`:658`); every cell that censuses a write's `triggered`/`watched`; the guide's closed firing list and the re-entrancy clause; `brief.md:255` | **CONTRADICTED** — *"NO MEMBER is added and none omitted"* and *"a MISSING handle …"* become the ruled behaviour; **the row needs a bounded amendment, which it has had twice** (`contract.md:3015`–`:3020`, `:3672`–`:3684`) | RED, and **cheaply re-derived** (`C-16`) | **MAJOR** — a returned member's meaning moves on a shipped verb, and four declared sets move with it |
| **(a′)** | **the same comparison, framed as `Q-1`'s reconciliation** — the store's predicate is brought into line with `D-66`'s stated criterion | as `(a)`, **plus one thing `(a)` cannot avoid saying: the corpus's criterion sentence and its instantiation disagree, and this shape chooses the criterion.** **It is the only shape that can honour `Q-3`'s per-tier and purge referents at all** (`contract.md:3678`) | as `(a)` | as `(a)` | **MAJOR**, and it is `(a)` filed honestly |
| **(b)** | **suppress at the package's delivery** — a comparison in `delivery.mjs`/the kernel's terminal arm, the store's returned set intact | **NOT the store's members** (`triggered`, `watched`, the pass, `D-105` all stand) — **but the seam gains an input it does not carry** (`delivery.mjs:105`), **and an ANCESTOR registration's address has no `op.before`/`op.after` in the act's op**, so the shape needs a **pre-act capture over every delivered registration's address, per act** (`C-14`; the reversal's own device, `constraints.mjs:2516`–`:2545`); `kernel-commit.mjs:186`–`:188` and the terminal arm; the guide's list; the re-entrancy clause | **STANDS BYTE-FOR-BYTE** | RED, cheaply re-derived | **MINOR** at best and **not `PATCH`** — **`D-104` item 4 is a release-CLASS precedent over an UNDECLARED silence** (`strata/decisions.md:5319`–`:5320`), **where this reverses a declared one** (`strata/proposals.md:316`–`:321`'s own distinction) |
| **(c)** | **opt-in** — a new opt-in verb or an option on an existing one, in `D-121`'s shape | **the default arm unmoved and the existing cell green**; a **third write verb** (the tier readout's own discharged shape) or **`write`'s optional fifth position** — which leaves `Function.length` at `4` (`tests/e2e/addon-surface.test.mjs:1377`–`:1380`) — or a caller-supplied key, of which `surface.md:171` says the package *"adds NO KEY the caller did not supply"* and the store **ignores** at `contract.md §7.1`; the declaration **exists twice** (`bindings/js/index.d.ts:1121` and `typecheck/node_modules/provident-storeroom/index.d.ts:1121`, `1809` lines each) **and re-stages, never hand-edited** | STANDS (the flagged arm only) | GREEN | **MINOR** — a declared-surface addition, and the cheapest shape that keeps every shipped default |
| **(d)** | **refuse the request** | nothing; **a `REJECT` recorded in this file is the one death a proposal may have** (`:7`–`:8`) | stands | GREEN | **NONE** — no release |
| **(e)** | **declare it as the CALLER's act** — read, compare, then write or not | **prose only**: a guide sentence; **the equality relation a consumer needs already exists as the corpus's own `sameStanding` idiom** and is expressible in consumer code; zero clause, zero cell, zero version line | stands | GREEN | **NONE** |

**TWO PRICES THESE SHAPES SHOW, STATED AS PRICES AND NOT AS ADVICE.**

- **`(a′)` and `(b)` are not two spellings of one idea: they answer different questions.** `(a′)` **reconciles the record with
  itself** and is the only shape that can see a tier purge or a per-tier standing; `(b)` **leaves the record's row standing** and can
  only ever see the act's own address. **Whichever is chosen, the one the corpus's own convergence law favours is `(a′)`** —
  `D-69`'s *"ONE PREDICATE, in the store, where the per-tier versions live"* — **and the one that costs least is `(b)` or `(c)`.**
  **That tension is the decision and it is `Q-1` + `Q-2`, not a preference this file may hold.**
- **`(c)` IS THE ONLY SHAPE THAT KEEPS THE SHIPPED DEFAULT AND THE ONE EXISTING CELL GREEN, AND IT ANSWERS A DIFFERENT QUESTION FROM
  THE ONE HE ASKED** — he asked for behaviour, not for an option. **`(e)` is the same observation at zero cost and zero
  behaviour.**

---

## §6 · The critique's ledger, so no claim here stands unchecked

**`role_l0_critique`, `2026-11-17`, `25` findings — `CONFIRMED` 3 · `OVERSTATED` 7 · `UNDERSTATED` 3 · `FALSE` 6 · `MISSED` 6.**
**Every finding the supervisor could re-read at the bytes is applied in this file at the sentence it corrects; the ones that
changed the record are these eight, and the rest stand in the pass's ledger as its own.**

1. **`C-3` (`FALSE`) — the criterion IS a change test.** Applied at §1 and §2: the proposal is a **reconciliation**, not a gap.
2. **`C-7` (`MISSED`) — the requested predicate SHIPS on the reversal's judgement.** Applied at §2's third *for* and §4's `Q-8`.
3. **`C-8` (`MISSED`) — `save_owed` is a second change test on the write path, and its ground is DEPARTURE.** Applied at `§2`'s
   fourth *for* and `strata/research.md §21.3 (b)` (where the audit's own sentence is corrected in place).
4. **`C-5` (`OVERSTATED`) — `(b)` is not clean: it is a SECOND predicate, which is `D-67`'s asymmetry one layer up.** Applied at
   §2's second *against* and §5's `(b)`.
5. **`C-9` (`MISSED`) — the TOUCHED arm fires members whose values did not change.** Applied as `Q-4`, which no earlier text had.
6. **`C-10` (`MISSED`) — `triggered: []` would come to mean two things, and `D-75`/`D-78` is the declared class for that debt.**
   Applied as `Q-5`.
7. **`C-16` (`OVERSTATED`) — the one green cell's SUBJECT is argument freshness.** Applied at §2's sixth *against* and §5's price
   column, so the cell is priced as a re-derivation and not as a defended semantic.
8. **`C-14`/`C-15` (`UNDERSTATED`) — `(b)` needs a pre-act capture per delivered registration, and `(a)` also narrows `D-105`'s
   repair-credit set.** Both applied in §5's price cells.

**AND THREE THAT NARROW THIS FILE'S OWN REFUSALS, APPLIED AT §7:** **`C-25`** (a member on a closed record is a ruling away, four
times landed), **`C-17`** (`brief.md:255`'s *"and by nothing else"* is outstripped by the touched arm), **`C-18`** (`D-1-bis`'s
*"unconditional"* is about the mechanism's presence and is not touched by a store-side narrowing — **so `(a)`'s price does not
include it**).

**AND ONE ROW THE SUPERVISOR WITHDRAWS FROM THE CRITIQUE ITSELF, BY NAME:** **`C-22`'s target** — *"an equal-value write is the
product's only re-check lever"* — **was never in this file and must not enter it**: `addConstraint` and its re-arm re-run the pair
unconditionally over the op they land (`kernel-registration.mjs:513`–`:517`, `:533`; `D-94`), **so the corpus declares a dedicated
re-check lever and the request removes no capability of that kind.** It is recorded here so a later reader does not re-import the
argument.

---

## §7 · What would be refused, and what is merely a ruling away

**`strata/brief.md:45`–`:47` governs this section: rulings override this file, so NOTHING below is beyond a ruling — each is a
ruling away. What follows is what is unlawful WITHOUT one, on a named byte.**

1. **A narrowed `triggered` with `P-TP-8` (a) left as it stands.** `contract.md:3028`–`:3033` and `:3149`–`:3150` name the suppressed
   member a **failure of the row**; a layer may not land a behaviour the register row counts as a defect. **A bounded amendment
   away, and not a prohibition** (the row has had two).
2. **A `triggered` that narrows while `watched` does not.** The projection is declared (`src/store.rs:2221`–`:2225`;
   `contract.md:3048`–`:3051`): the two lists are one predicate or the projection is false. **Refused as an incoherence**, and the
   request does not mention `watched` at all.
3. **A read-side arm of any kind** — a probe reporting whether a value *would* change. `strata/decisions.md:100`–`:103`'s *"READS
   CHECK NO CONSTRAINT … There is no read-side enforcement arm, none is declared, and none is owed"* is stated as a **refusal of a
   candidate reading**, and it reaches this one.
4. **Silently flipping the shipped default for every existing caller.** **Refused as a DEFAULT and lawful as his ruling** — which is
   exactly `Q-9`.
5. **Applying the rule to the creation, the boot, `addConstraint` or a re-arm.** `D-123` item 2 ordered those firings
   (`strata/decisions.md:6317`; `D-125` item 1) and `package-use.md:504`–`:509`'s corrected list is four terms; **a generalized
   change test repeals that ordering — a fresh ruling, not a narrowing.**
6. **A fifth `cfg` key or a fifth `write` position presented as a free move.** Lawful on a ruling; **not** an implementation detail
   (`surface.md:171`; `addon-surface.test.mjs:1377`–`:1380`). **⟶ NARROWED (`C-19`): an OPTIONAL fifth position leaves
   `Function.length` at `4`, so that assertion does not bite; what moves is the declaration twice and the `typecheck` fixture.**

**⟶ AND THREE OF GATE 1's REFUSALS ARE NARROWED HERE, BY NAME (`C-25`, `C-17`, `C-18`):** **a member added to a closed record is a
RULING away and not a prohibition** — the non-enumerable own accessor is the device `op`, `discarded`, `commit` and `log` landed
with, four times (`tests/e2e/held-listener-identity-greens.mjs:583`–`:592`; `bindings/js/index.d.ts:632`–`:636`), **and `P-1` §4
priced it as `(b′)`**; **`brief.md:255` is not a ground, because the tree has outstripped it**; **and `D-1-bis` is not touched by a
store-side narrowing.** **Everything else — `(a′)`, `(b)`, `(c)`, `(e)`, and any referent or instant he names — is lawful, priced,
and a ruling away.**

---

## §8 · Envelope

**VERDICT.** `BLOCKED-ON-SEMANTICS` · **`P-3` IS NOT DELEGABLE AND NO UNIT MAY OPEN.** The block is **not** an absence in the record:
**it is a disagreement inside it** (`D-66`'s criterion against `P-TP-8` (a)'s instantiation), plus three choices only the architect
can make — the layer, the referent, and whether the shipped default moves.

**BLOCKING.** **Nine questions** (`Q-1`–`Q-9`), each with a default; **two of gate 1's ten are discharged by derivation** and named so
no default takes them as free moves; **and one fact no answer removes** — whichever layer is chosen, the act must gain an input it
does not have, and at a shadowed address that input is a per-tier list.

**PRICED AND UNCHOSEN.** **Six shapes** — `(a)` store-side suppression · `(a′)` the same as the criterion's reconciliation ·
`(b)` package-side suppression · `(c)` opt-in · `(d)` refuse · `(e)` declare it as the caller's act. **The corpus's own convergence
law favours `(a′)`; the cheapest shapes that move nothing shipped are `(c)` and `(e)`; the two that flip behaviour are both `MAJOR`'s
at `(a′)` and `MINOR`'s at `(b)` — and `(b)` buys that class by putting a second predicate beside the one `D-67` cost a defect to
unify.**

**WHAT GATE 2 WOULD PIN, AND ONLY ONCE HE ANSWERS.** `Q-1`'s sentence and `Q-2`'s layer as one decision · `Q-3`'s referent and the
comparison's relation (the corpus's `sameStanding` versus the store's `PartialEq`, which differ at `-0`) · `Q-4`'s touched-arm scope ·
`Q-5`'s sentence about `[]` · `Q-6`'s reading of `D-1-bis` · `Q-7`'s instant · `Q-8`'s verb list · `Q-9`'s default; **and the prose
that moves in the same pass whatever he answers** — `docs/guides/package-use.md:497`–`:499` and its generated landing
`bindings/js/README.guide.md`, `docs/specs/storeroom-js/contract.md:2109`–`:2111`, and `strata/brief.md:255`.

**NOT DECIDED HERE, AND NOT TO BE READ AS DECIDED.** **This is a gate-1 verdict and not a ruling; every default in §4 is a default;
no alternative is chosen; no clause is amended; no cell is named as owed; no pin, no unit, no contract directory.** **The next move
is the architect's answer, one sentence per question, and it lands in `strata/decisions.md` — not in this file.**

---

# `P-4` · Async listener support — the write's answer awaited until the delivered set settles

**THE REQUEST, VERBATIM FROM THE PRODUCT'S OWNER, `2026-11-17`:**

> "Add async listener support"

**AND HIS ANSWER TO THE ONE QUESTION THAT MADE THE REQUEST UNAMBIGUOUS, THE SAME DAY — CHOOSING ONE OF FIVE READINGS PUT TO
HIM, VERBATIM:**

> "Await listeners before the write answers"

**So this proposal's subject is ONE shape and no other: delivery made genuinely asynchronous, with the write's answer
withheld until the delivered set has settled.** **The four readings he did NOT choose are named once, so that no reader
takes them as withdrawn rather than unchosen: keep the invocation synchronous and `await` in place; keep it synchronous and
`catch` and report; refuse async bodies at `register`; leave the disposition to the caller.**

**PROVENANCE, AND ITS LIMIT.** Written **`2026-11-17`** at **`HEAD` `e3136af`** by the **supervisor (L0)**, from **an intake
audit (`strata/research.md §22`, landed the same day) and its supervisor postscript (`§22.12`), a gate-1 validity pass
(`role_l0_validity`) and its adversarial companion (`role_l0_critique`)** — with **every `path:line` either printed by a pass
and re-read by the supervisor at the bytes, or re-read and corrected by him.** **THE VALIDITY PASS'S EIGHT SENTENCES ARE
WITHDRAWN BY NAME AT `§2`** (`W-1`…`W-8`), on the critique's ledger **`C-1`…`C-17`**; **the critique's five new rows `N-1`…`N-5`
are folded in at `§7`**, and **one of them (`N-2`) is corrected there by the supervisor's own drive, which REFUTES its scope
as filed while confirming its mechanism.** **The drives in `§7` are the supervisor's and are marked as driven wherever used**
(Node `v24.20.0`; addon `bindings/js/build/Release/storeroom_js_binding.node`, `1,456,712` bytes, mtime `2026-11-17
22:46:21.806 −0600`; every drive ran in a `mktemp -d` outside the repository, so **no byte of the tree was written**).

**ENVIRONMENT FACT OF THIS FILE'S OWN DATE, RECORDED SO NOTHING IS SWEPT IN SILENTLY:** `strata/research.md` gained **`§20`** at
`11:18`, `§21` at a later pass, and **`§22` + `§22.12` are this request's**; `strata/decisions.md` gained **`D-127`…`D-129`**
for a *different* session's request at `11:25`. **`§20`/`§21`/`D-127`…`D-129` are those sessions'; `§22` and `P-4` are this
one's. Neither record absorbs the other**, **no byte of `decisions.md` was written by this pass**, and nothing is committed.

---

## §1 · The gate-1 verdict, and the ground it must rest on

**`BLOCKED-ON-SEMANTICS`.** `role_l0_validity`, `2026-11-17`, **re-grounded rather than softened by the critique the same day**
(`role_l0_critique`: the token is `CONFIRMED`, **and its ground is HARDER than the validity pass stated it** — `C-1`).

**THE GROUND, IN ONE SENTENCE.** **The shape the owner chose stands on one of `DD-22`'s own PRICED ALTERNATIVES and on nothing
less: that row declares the package invokes *"SYNCHRONOUSLY AFTER the verb's own call has returned"* and REFUSES three things —
*"a declared invocation order; an invocation before the verb returns; **an asynchronous invocation with an undeclared
scheduler**"* — and in the same row it prices *"an async delivery … it needs a queue, a flush rule and a failure channel for a
throwing body, none of which any ruling names; **both available with a fresh ruling**"*, naming its instrument as *"a fresh
ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment"* (`docs/specs/storeroom-js/contract.md:602`,
read whole at the bytes by this pass).** **So the record is not silent about this request: it answered it once, refused it
pending a ruling, and priced the ruling. Gate 1 cannot manufacture that ruling, and it must not read the refusal as a wall.**

**WHY THE BLOCK IS NOT AN ABSENCE — THE FIVE SETS IT LANDS ON AT ONCE.** A "condition" is a check at a named later gate against
ONE object; here **five open choices sit on five different declared sets**, and a condition would be one of them taken on the
owner's behalf:

1. **the invocation's instant and its scheduler** — `DD-22`'s refusal, above;
2. **the failure's form** — `DD-23` declares a throwing body *"NOT caught, NOT retried and NOT reported"* and REFUSES *"catching
   and reporting a throwing body"*, priced on the ground that *"the report would need a failure channel the package does not
   own"* (`contract.md:603`) — **and four live sites declare that a rejection is not the failure form at all**
   (`bindings/js/index.d.ts:498`–`:499`; `docs/specs/storeroom-js/surface.md:1275`–`:1278`, whose parenthetical is
   **"(every verb is synchronous)"** — i.e. **the clause's own premise is the shape's subject**; `contract.md:591`, the
   operative `DD-12` row; `strata/brief.md:287`–`:289`);
3. **whether the answer may carry the settlement** — `D-71`'s ruling verbatim: *"A listener is independent of the commit record
   of the triggering caller. The caller does not need to know about the outcome of the listeners"*, with `D-76` item 1's
   correction declaring the record's member set **UNMOVED** (`surface.md:1757`–`:1758`) — **the shape puts the caller's LATENCY
   inside the listener's execution, which is the one property `D-71`'s neighbourhood says a chain exposes upward: *"ITS COST
   AND ITS THROW"*** (`surface.md:1745`–`:1748`);
4. **whether `A112` and `D-72` survive a suspension** — `A112` orders constraints before listeners and **its conformance on
   this branch is `OWED` a measurement** (`strata/brief.md:344`–`:358`); `D-72`'s premise sentence is *"every level a
   **synchronous call on one thread**"* with *"`A`'s whole chain completes before the window that fired it invokes its next
   listener"* (`strata/decisions.md:3937`–`:3944`);
5. **where a body's post-`await` write names its commit** — `D-46`'s declared rule (*"It should be opening a new commit by
   default of entering at the surface"*) reaches a body that has not suspended; the bracket that carries the name is restored
   in a `finally` that runs at **the body's first suspension** (`bindings/js/src/entry/state.mjs:811`–`:845`, `:667`).

**WHY NOT `APPROVE-WITH-CONDITIONS`.** The precedent is real (`strata/envelope.md:496`) and the test is `P-3`'s: **there, every
finding was a check at a named later gate against ONE object.** Here each of the five above moves a different declared set with
a different reversal instrument — **so the "conditions" would be the five choices, not narrowings inside one of them.**

**WHY NOT `REJECT`.** **`REJECT` here would be `D-76`'s recorded failure mode — *"A PERMISSION BECAME A PROHIBITION"*
(`strata/decisions.md:4065`–`:4073`) — for a request the record's own `alt` cell prices as AVAILABLE.** **`strata/brief.md:45`–`:47`
stands first: rulings override the brief and the contracts, so every shape in `§5` is a ruling away and none is a prohibition.**
**`(d)` records what a refusal would be; it does not take it.**

---

## §2 · THE EIGHT WITHDRAWALS, BY NAME — the gate-1 text's sentences that do not survive the bytes

**Each is quoted from `role_l0_validity`'s own text of this date and is withdrawn HERE rather than left beside its correction**
(`strata/walkthrough.md §4`: **a superseded cell leaves byte-exactly and leaves one pointer**; it does not stay beside a mark).

| `#` | the withdrawn sentence, quoted | what replaces it, and at which byte |
|---|---|---|
| **`W-1`** | `§5 (d)`: *"**lands in a declared hole rather than against a declared wall**"*; *"needing a `DECLARATION` (`RM-2`) and **not** a `REVERSAL` (`RM-1`)"*; *"because `DD-22` pins an invocation 'SYNCHRONOUSLY AFTER the verb's own call has returned' and refuses only 'an invocation before the verb returns'"* | **THE DECLARATION-HOLE CLAIM IS FALSE.** `DD-22`'s refusal cell carries **three** items, the third being *"an asynchronous invocation with an undeclared scheduler"*, and the same row prices async delivery **as available with a fresh ruling** (`contract.md:602`). **A caller-driven delivery is a priced alternative of `DD-22`, NOT a hole beside it: it owes a REVERSAL, and `RM-1`/`RM-2` collapse into `RM-1`.** **What SURVIVES of `(d)` is the temporal half only** — its instant is measured from the store call, which a caller-driven call satisfies — **and that half is not the obstacle.** |
| **`W-2`** | `FR-6`: *"a failure channel from the delivery instant to the caller **already exists and is the synchronous throw**"*, carried as a `CARRIED` row | **`OVERSTATED` at three points**: it exists as a throw at **three of the seven delivery instants** and is **caught and converted to rank `21`** at the four registration instants (`bindings/js/src/entry/delivery.mjs:572`–`:582`; `bindings/js/index.mjs:333`–`:337`; `surface.md:1670`–`:1681`); **it cannot carry a rejection at any of them**; **and for this shape it is the thing BROKEN, not the thing carried** — measured, `§7` `M-2`: `write` answers, then the process dies. |
| **`W-3`** | `NQ-1`: *"the entry holds ONE leg slot (`index.mjs:854`, `:914`) that the terminal arm reads for the triggering address"*, and *"a suspended body can actually read a leg that belongs to another write"* | **The slot is real and single, and the crossing claim is FALSE**: the terminal arm reads the slot into **locals before any body runs** (`delivery.mjs:887`'s `const answer = state.leg`; `:975`–`:977`), and a body reaches no package state — it is handed one decoded address (`:206`). **The slots that genuinely cross are `N-4`'s.** |
| **`W-4`** | `NQ-3`: *"a rejecting body's rollback is declared for a throwing body only … silent for a rejection"* | **A negative declaration leaves no gap**: the throwing arm's rule is *"the throw neither rolls back nor alters anything the store did"* (`surface.md:1668`–`:1669`), and at the registration instants *"NO ROLLBACK COMPOSES"* (`:1677`). **The real silence is the REJECTION'S DISPOSITION (`AL-2`/`AL-3`) and its fatality (`M-2`) — not a rollback.** |
| **`W-5`** | `X-5`: *"its operative sentence survives only as **quotation**"*; and the reading that `PAR-JS-12`'s reversal instrument is *"unreachable"* because no row governs a listener's return value | **The rule is declared in its own right at a kept contract** — `surface.md §2.7` item 5, *"NO OTHER ARGUMENT IS DECLARED AND NO RETURN VALUE IS READ"* (`:1716`–`:1717`) — **so the bounded amendment every `DD` row names is available at that home.** **What is lost is the REGISTER row's home** (`docs/specs/storeroom-js/parameter-semantics.md`, absent from the tree; a filed citation condition at `docs/specs/storeroom-corpus-citation-integrity-proposal-review.md:30`) — **not an enforcement gap.** |
| **`W-6`** | `X-2`: *"`§2.7` item 9 (ii) (`surface.md:1757`–`:1758`)"*; *"two further members … (`:621`–`:643`)"* | **The quoted sentence is the tail of clause (i)**; item (ii) at `:1758` is a different sentence. **And the accessors are `discarded` (`index.d.ts:621`–`:644`) AND `log` (`:645`–`:680`)** — two, not one. |
| **`W-7`** | `FR-3`: *"an `async` function is already an admissible body at both registration routes (`delivery.mjs:188` …; `frame.mjs:45`–`:47`)"* | **The conclusion stands; the citation does not.** `frame.mjs:39`–`:60` is the passage that says the encoder **does not test** the function's presence or type — *"the function's presence is not tested here … decided one layer up"*; the admission site is `admittedListenerBatch`, one layer up. |
| **`W-8`** | `DQ-2`, whole — *"does the chosen shape touch the store, move `A57`, or make an addon verb asynchronous?"* | **`UNVERIFIABLE` AS THE CRITIQUE SAW IT, because its content was not on the tree at the critique's date** (`P-4` was unlanded and the critique was handed the ledger without this row's text). **RESTORED HERE AS DISCHARGED, its bytes named**: **NO — on three declarations** (`surface.md:387`; `frame.mjs:42`–`:44`; `contract.md:2507`–`:2508`). **The critique's objection is answered by this filing and not overruled.** |

**AND ONE ROW RE-FILED RATHER THAN WITHDRAWN.** **`RM-6`** (where a post-`await` listener write names its commit) was filed as
**SILENCE**. **It is `DECLARED-CONTRADICTED-BY-MECHANISM, SUBJECT TO ONE DRIVE`** — see `§7` `N-2`, where the criterion is
derived and the drive shows what today's tree does.

---

## §3 · What the corpus says AGAINST the chosen shape, and what it says FOR it

**AGAINST — five, each a kept clause or a declared refusal.**

1. **`DD-22` refuses the async invocation and prices its reversal** (`contract.md:602`) — `§1` above.
2. **`DD-23` refuses catching and reporting, and declares the throwing body uncaught** (`contract.md:603`; law at
   `surface.md:1667`–`:1669`) — **and the shape needs SOME channel for a body that settles into a failure.**
3. **Four sites declare a rejection is not the form, and one grounds that on synchrony itself** (`index.d.ts:498`–`:499`;
   `surface.md:1275`–`:1278`; `contract.md:591`; `brief.md:287`–`:289`).
4. **`§2.7` item 2 declares the invocation synchronous and, in its own words, *"A BODY THAT RAN AFTER THE PACKAGE'S VERB
   RETURNED TO THE CALLER HAS RUN AT AN INSTANT THIS ITEM DOES NOT DECLARE"*** (`surface.md:1654`–`:1663`) — **read at the bytes
   as a SCOPE LIMIT on the item and not as a granted instant (`C-2`); a body running there fails the item's own observable,
   which is *"the package's verb not yet returned"* (`:1659`–`:1661`).** **It is reachable TODAY — measured, `§7` `M-3` — and
   reachability is not permission.**
5. **`D-71`/`D-72`'s independence and nesting premises.** `D-71` verbatim: *"A listener is independent of the commit record of
   the triggering caller. The caller does not need to know about the outcome of the listeners."* `D-72`'s premise:
   *"every level a synchronous call on one thread"*, whose guarantee *"the machine provides"* and **no clause promises**
   (`strata/decisions.md:3937`–`:3953`). **Under an awaited delivery that machine-provided nesting stops being a machine
   property: the loop's `await` covers only what the body itself returns, so a body that fires an un-awaited chain returns
   early and the nesting guarantee has no subject (`C-15`).**

**AND ONE FACT THAT IS NOT AGAINST THE SHAPE AND IS WORSE THAN AN OBJECTION: `A112`'s conformance is `OWED` on this branch**
(`brief.md:344`–`:358`; **the archived tracker measured it red on 2026-10-15**). **The shape moves an ordering law whose green
nobody has taken.**

**FOR IT — five, and the first two are the record's own sentences.**

1. **THE ORDER THE OWNER ASKS FOR IS ALREADY THE DECLARED ORDER.** SAVE (`delivery.mjs:939`) → DELIVER (`:987`) → the member's
   answer; `D-117`'s *"ask → repairs land → re-run → SAVE → DELIVER → the member's record"* (`decisions.md:6034`); and the
   shipped chain at five bytes (`bindings/js/index.mjs:658` → `src/entry/constraints.mjs:810`, `:817` →
   `src/entry/kernel-attempt.mjs:452` → `:550` → `delivery.mjs:987`). **What the record does not carry is a body that has not
   SETTLED by then — because a synchronous body always has.** **The order survives; its TERMINUS moves (`C-13`).**
2. **THE STORE IS UNTOUCHED AND `A57` IS UNMOVED.** *"THE STORE RETURNS HANDLES AND INVOKES NOTHING"* (`surface.md:387`); a
   function cannot cross into Rust at any depth (`frame.mjs:42`–`:44`); the store *"runs NO background work … and COMMITS
   SYNCHRONOUSLY"* (`contract.md:2507`–`:2508`). **No part of this shape reaches Rust, and no addon verb becomes
   asynchronous.**
3. **A CALLER-SUPPLIED `async` FUNCTION IS ALREADY ADMITTED AT BOTH REGISTRATION ROUTES** (`delivery.mjs:188`'s
   `typeof listener === 'function'`; the construction's third member stripped at the crossing, `frame.mjs:39`–`:60`).
   **The TypeScript half — whether an `async` function is assignable to `Listener = (address: Address) => void`
   (`index.d.ts:572`–`:573`) — is `NOT VERIFIED` by any pass: `tsc` has not been run.**
4. **THREE OF THE FOUR MEMBERSHIP RULES SURVIVE AN AWAIT WHOLE.** Snapshot at the window's open, one invocation per distinct
   handle deduped on `entry.handle`, and no order asserted (`delivery.mjs:107`–`:183`; `surface.md:1664`–`:1666`). **Only
   rule 2 — *"a registration made during the window takes effect at the next trigger"* — becomes ambiguous once the window
   spans a suspension (`AL-8`).**
5. **THE RECORD ALREADY HANDS ONE SET TO ONE INSTANT, AT EVERY INSTANT** (`D-104` item 2 at `decisions.md:5321`–`:5326`;
   `D-125` item 1 at `:6520`–`:6535`; `surface.md:1728`).

---

## §4 · The fraction and the remainder — NINE CARRIED, NINE OWED, TWO DISCHARGED

**THE FRACTION IS A SET OF NAMED ELEMENTS AND NOT A RATIO.** A percentage here would be a figure with no instrument
(`strata/walkthrough.md:64`–`:66`), so none is printed.

**CARRIED — the record already answers these, and no ruling is owed.**

| `#` | the element | the byte |
|---|---|---|
| `FR-1` | the store is untouched; `A57` unmoved; a function cannot cross; the store commits synchronously | `surface.md:387`; `frame.mjs:42`–`:44`; `contract.md:2507`–`:2508` |
| `FR-2` | the addon's verbs remain synchronous package-side calls | `delivery.mjs:939`; `index.mjs:862`; `constraints.mjs:810` |
| `FR-3` | an `async` body is already admitted at both registration routes (`Listener`'s TS half `NOT VERIFIED`) | `delivery.mjs:188`; `frame.mjs:39`–`:60`; `index.d.ts:572`–`:573` |
| `FR-4` | the set's snapshot, its dedupe on `entry.handle`, and its orderlessness (rule 2 → `AL-8`) | `delivery.mjs:107`–`:183`; `surface.md:1664`–`:1666` |
| `FR-5` | **the order the owner asks for is already declared and shipped — SAVE, DELIVER, then the answer** | `delivery.mjs:939`, `:987`; `decisions.md:6034` |
| `FR-6` | **a failure channel exists as the SYNCHRONOUS THROW at three of the seven instants and as rank `21` `ListenerBodyThrew` at the four registration instants — and it carries no rejection anywhere** (`W-2`) | `surface.md:1667`–`:1669`, `:1670`–`:1681`, `:1791`–`:1815`; `delivery.mjs:572`–`:582` |
| `FR-7` | one delivered set per instant, at every declared instant | `decisions.md:5321`–`:5326`, `:6520`–`:6535` |
| `FR-8` | the synchronous-graph law does not forbid the request; it constrains the mechanism at LOAD time only | `contract.md:2379`; `decisions.md:6720` |
| `FR-9` | **`file`-tier durability precedes every delivered body, at five separate arms** (`§7` `C-3`) | `delivery.mjs:939`→`:987`; `:980`–`:981`; `constraints.mjs:2989`→`:3037`; `delivery.mjs:494`–`:585`; `index.mjs:1902`→`:2171` |

**OWED — a fresh ACTIVE ruling, each with the instrument the record itself names.**

| `#` | the element | the instrument |
|---|---|---|
| `RM-1` | **the reversal of `DD-22`'s async refusal, and the declaring of the SCHEDULER, the FLUSH RULE and the failure channel the `alt` prices** | *"a fresh ruling recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment"* — `contract.md:602` |
| `RM-2` | **`§2.7` item 2's instant**: what a body that runs after the verb returned is declared to be | a bounded amendment of `docs/specs/storeroom-js/` — `surface.md:1654`–`:1663` |
| `RM-3` | **a rejecting body's disposition**, and whether a rejection carrying the store's own `{status, message, log, address}` is the ONE form in a second delivery mode or a SECOND form | `DD-23`'s and `DD-12`'s own bounded amendments — `contract.md:603`, `:591`; the four sites at `§3` item 3 |
| `RM-4` | **whether the answer may carry the settlement** — `WriteRecord` `3 → 4` (typed) or a fourth non-enumerable accessor (census unmoved, `A117` (D6)'s device, `D-119` item 3), or a new instance member (`StoreInstance` `15 → 16`) | a bounded amendment; `surface.md:1757`–`:1758`; `index.d.ts:621`–`:680` |
| `RM-5` | **whether `A112` and `D-72` survive a suspension** | a fresh ruling **plus a measurement** — two acts, and neither substitutes for the other (`brief.md:344`–`:358`) |
| `RM-6` | **where a post-`await` body's write names its commit** (re-filed from SILENCE — `§2`) | a fresh ruling; `state.mjs:667`, `:674`–`:675`, `:811`–`:845`; `§7` `N-2` |
| `RM-7` | **which verbs/instants the shape reaches** — `write` alone, or `delete` (`index.mjs:887`), a `rollback`'s judgement (`constraints.mjs:3037`), the four registration instants (`surface.md:1728`), the creation (`index.mjs:2171`) | a fresh ruling; **the record is SILENT on scope** |
| `RM-8` | **`PAR-JS-12`'s *"no return value is read"*** — amended at `surface.md §2.7` item 5, and the register row's absent home named (`W-5`) | a bounded amendment at `:1716`–`:1717` |
| `RM-9` | **the release class** — no class is claimed here (`D-124` item 3's discipline) | the architect's, once he names it |

**DISCHARGED BY DERIVATION, and named so no default takes them.** **`DQ-1`** — durability precedes the delivered set on every arm
(`§7` `C-3`), **with its ground carried by the arm and NOT by `surface.md:1819`–`:1823`, which still declares that a `delete`
and a `rollback` perform no file I/O while the tree contradicts it** — **a stale clause and not this unit's to cure.** **`DQ-2`**
— the shape does not touch the store, `A57`, or any addon verb (`FR-1`/`FR-2`).

---

## §5 · The four forms inside the chosen shape — priced, NONE CHOSEN

**The owner chose one INTENT. It has at least four forms, and the record treats them differently enough that the price is not
the same question. No status is minted by this section; where one is owed, `AL-3` opens the rank question and leaves it open.**

| `#` | the form | what the caller sees | what moves |
|---|---|---|---|
| **`(a)`** | **`write` and `delete` answer a `Promise` of the record** | `await store.write(…)` | `index.d.ts:1121`, `:1140`; `surface.md:1276`'s *"(every verb is synchronous)"*; **the 21 test files whose docblock argues totality FROM synchrony (`AL-28`, `C-11`)**; `RM-1`…`RM-8` all. **Status set unmoved (22); instance set unmoved (15); `WriteRecord` unmoved (3).** **The dearest for callers: every call site gains an `await`.** |
| **`(b1)`** | **a new INSTANCE member** that awaits the delivery | `await store.settled()` | `StoreInstance` **15 → 16** and every census over it; `RM-1`…`RM-6`. **Namespace unmoved (`storeCreate` alone).** |
| **`(b2)`** | **a member on the ANSWER** — `WriteRecord` `3 → 4` typed, **or a fourth non-enumerable own accessor, census unmoved** | `const r = store.write(…); await r.settled;` | `surface.md:1757`–`:1758`; `index.d.ts:616`–`:620`; the accessor device is `A117` (D6)'s and `D-119` item 3's precedent. **This is the form that moves the FEWEST declared sentences.** |
| **`(c)`** | **an async twin beside the synchronous verb** | two verbs; the present arm byte-for-byte | the instance set **15 → 16** (or 17); **the synchronous arm's five declarations untouched**, and the twin needs its own failure channel. **Moves the fewest declared sentences and the most surface.** |
| **`(d)`** | **the write stays synchronous; delivery is awaited by a caller-driven act** | today's `write`, plus one more act the caller must remember | **`RM-1` after all — `W-1`** — plus a member (`15 → 16`), or a module export that moves §2.9's one-name namespace. **The cheapest form on the board and, on the plain reading of his sentence, NOT his sentence** — a shape where the answer arrives first satisfies it only under a reading in which *"the write answers"* names that second act. **That reading is his to give; this file does not assume it away in either direction.** |

**ONE PRICE NONE OF THE FOUR AVOIDS, STATED BECAUSE IT IS THE SAME FOR ALL OF THEM: THE WAITING MUST CHOOSE BETWEEN SERIALISING
AND CONCURRENCY.** **Awaiting body `n` before invoking body `n+1` makes the invocation SEQUENCE observable, where `§2.7`
item 3 declares *"NO ORDER IS ASSERTED … a drive compares sets, never sequences"* (`surface.md:1664`–`:1666`); invoking them
together keeps the set and breaks `D-72`'s premise sentence.** **That fork is `NQ-1`/`NQ-2` and it is not a preference this file
may hold.**

---

## §6 · The critique ledger, so no claim here stands unchecked

**`role_l0_critique`, `2026-11-17`, against the bytes. Its token is `CONFIRMED` — the gate-1 verdict survives, and `C-1` makes
the block HARDER rather than softer.** **Every row is one of `CONFIRMED` / `OVERSTATED` / `FALSE` / `UNVERIFIABLE`, and the
withdrawals at `§2` are this ledger's product.**

| `#` | subject | verdict |
|---|---|---|
| `C-1` | `§5 (d)`'s *"declared hole, not a declared wall"* | **`FALSE`** → **`W-1`**. `DD-22` refuses three items; the third is the case; the `alt` prices it with a fresh ruling. **`P-4` was handing the architect a REVERSAL labelled a DECLARATION.** |
| `C-2` | `§2.7` item 2 — hole or silence? | **`CONFIRMED` as SILENCE, not a granted instant; and not load-bearing for `(d)`** (the item's own observable is *"the package's verb not yet returned"*). **Reachability is not permission.** |
| `C-3` | `DQ-1`'s airtightness, arm by arm | **`CONFIRMED` at five arms (a write, the residue+checked-off, a `delete`, a `rollback`'s judgement, the four registration instants, the creation), with one named condition**: its ground must NOT be read off `surface.md:1819`–`:1823`, which is **stale of the tree** (post-`D-106`). |
| `C-4` | `NQ-1`'s "one leg slot" | **`CONFIRMED` as a hazard; `FALSE` as to mechanism** → **`W-3`**. The arm captures the slot into locals **before** any body runs; **a body reaches no package state**. The slots that DO cross are `N-4`'s. |
| `C-5` | `X-1`'s absence and four sites | **`CONFIRMED` for the absence and all four quotes; `OVERSTATED` on one citation** (`DD-12`'s operative row is `:591`); **`UNVERIFIABLE`** for the content claim about the absent `seams-and-lifecycle.md`. |
| `C-6` | `X-5` — *"survives only as quotation"* | **absence `CONFIRMED`; both strong claims `OVERSTATED`/`FALSE`** → **`W-5`**. The rule is declared at `surface.md §2.7` item 5 in its own right; **`DD-30` settles that `CLOSED` is directory-completeness and never a content freeze.** |
| `C-7` | `X-2`'s member sets | **`CONFIRMED`** — `WriteRecord` **three** (`:616`–`:620`), `CommitRecord` **four** (`:962`–`:993`), the quoted sentence carries no numeral; **two citation corrections** → **`W-6`**. |
| `C-8` | `X-3`'s `15 → 16` | **`CONFIRMED` as a distinction; its `3 → 4` is a READING, not a declared set** — the record already carries two non-enumerable members, so "three" and "five" are both true at different censuses. |
| `C-9` | `X-4`'s numbers, recounted | **`CONFIRMED` at the critique's own count**: `CODES` **22** (`src/error.rs:171`–`:196`), `StoreStatus` **22 + one escape arm** (`index.d.ts:421`–`:444`), `StoreInstance` **15** own members (`:1047`–`:1416`) — **and the interface's own prose still says FOURTEEN at `:997`–`:999` and `:1333`**, the same stale class, another row's to re-derive. |
| `C-10` | `FR-6` | **`OVERSTATED` at three points** → **`W-2`**. **The channel is a `try`/`catch` at four of seven instants; it carries no rejection anywhere; and it is the thing the shape breaks.** |
| `C-11` | `AL-28`'s twenty-one | **`CONFIRMED`, recounted file by file at `research.md:2488`–`:2497`; the MECHANISM corrected**: the wrappers break because **the answer becomes a thenable** — `captured(fn)` answers `{ok: true, value: <promise>}` and a red leg silently reads green — **not because a rejection escapes a `try`.** |
| `C-12` | `DQ-2` | **`UNVERIFIABLE`** at the critique's date (no content on the tree) → **answered by this filing, `W-8`**. |
| `C-13` | `FR-5` | **`CONFIRMED`** — and its TERMINUS moves: *"the member's answer"* becomes a fifth position after settlement. |
| `C-14` | `FR-3` | **conclusion `CONFIRMED`; citation `OVERSTATED`** → **`W-7`**. |
| `C-15` | `NQ-2` | **`CONFIRMED`, and worse than stated**: `D-72`'s nesting is a **machine-provided** guarantee, and under the shape it becomes the caller body's to provide. **A declared property silently demoted.** |
| `C-16` | `NQ-3` | **`OVERSTATED`** → **`W-4`**. A negative declaration leaves no gap. |
| `C-17` | `X-6`, the synchronous-graph law | **`CONFIRMED`** — it does not forbid the request — **with one qualification this file carries**: the shape must **not** put a top-level `await` in the entry's graph (`contract.md:2379`; `decisions.md:6720`), **and that law's only declared instrument (`NEW-1`) is declared by a clause marked *"NOT ENFORCED BY ANY CELL OF THIS PASS"*.** |

---

## §7 · What the critique ADDED, and the ONE DRIVE the supervisor took

### `N-1` · THE RECORD HAS ALREADY RULED ON A SETTLEMENT SEAM, AND THE SHAPE FALSIFIES ITS GROUND

**The gate-1 pass never mentioned `settle`. It is the single most important omission the critique found, and its bytes are in
the entry itself** (`bindings/js/src/entry/delivery.mjs:992`–`:1008`; `bindings/js/src/entry/kernel-commit.mjs:115`–`:119`;
`bindings/js/index.mjs:508`, `:1772`–`:1775`).

**⟶ AND ONE OF THE CRITIQUE'S OWN CITATIONS IS CORRECTED AT THIS LINE, BECAUSE IT DOES NOT RESOLVE AT THE BYTES**
(`strata/walkthrough.md §3` exit question 5: **a citation that does not resolve at its subject is a defect by definition**):
**the critique placed the seam's declaration at `bindings/js/index.mjs:351`, and that line is about the object the construction
once returned (`{ register, on, off }`, *"THREE OWN MEMBERS"*) and says nothing of `A116`.** **The seam is declared at
`bindings/js/src/entry/kernel-commit.mjs:115`–`:119`, verbatim: *"`docs/decisions.md` · `A116` (D1)/(D2) declares the seam — a
member of the object `storeCreate` returned, which THE KERNEL CALLS and THE ENTRY IMPLEMENTS"*** — read with
`delivery.mjs:992`'s `REMOVED-WHOLE` pointer and `index.mjs:508`'s own count line (*`10 + 1 + 1 + 2 + 1 = 15` ✓*, **the fifth
independent confirmation of the fifteen-member set**).

- **What `settle` was**: that `A116` seam, carrying **the adoption, the ledger, the delivered mark and the withhold set**
  (`delivery.mjs:1003`–`:1006`). **So the honest answer is NO for a caller-awaitable settlement surface and YES for the seam** —
  and the ruling that removed it states its ground verbatim: *"because **ONE ACTOR drives every write and there is nothing to
  marshal**"* (`delivery.mjs:1006`–`:1007`), with *"Any occasion where the write path is not governed by the kernel is a
  hallucination"* (`:997`–`:999`).
- **The shape creates the second actor that ground denies**: the kernel's pass continues (its drain sits after the terminal
  arm, `kernel-attempt.mjs:270`) while delivered bodies still run. **That is exactly the marshalling the removal declared
  unnecessary.** **So the question is not merely *"may the answer wait?"* but *"does waiting reinstate the seam the architect
  removed, and if so in which form?"*** — **`RM-4`, with `N-1` as its ground.**
- **`A116`/`A117`'s own home `docs/decisions.md` is absent from the tree** (only `archive/` and `.tracker-reflow-backup/` copies).
  **The rows are cited at eight live sites and their home is not readable — a filed citation condition, marked here and not
  manufactured into a clause.**

### `N-2` · THE POST-`await` COMMIT — DERIVED, THEN DRIVEN, AND ITS SCOPE CORRECTED BY THE DRIVE

**The critique derived that a suspended body's write might **JOIN** the triggering caller's commit instead of opening its own,
which would reverse `D-45`/`D-46`'s declared rule (*"It should be opening a new commit by default of entering at the
surface"*).** **The mechanism it read is real** (`state.mjs:667`, `:674`–`:675`: with a commit open and no name standing, the
depth fallback returns `false` — the JOIN arm — and `EXTERNAL_DEPTH -= 1` runs in the bracket's `finally` at the body's first
suspension, `:837`). **But the critique marked it as what the SHIPPED tree does. THE SUPERVISOR DRANK THAT QUESTION AND THE
TREE DOES THE OTHER THING — the critique's SCOPE is wrong; its mechanism is right and bites the CHOSEN SHAPE.**

**THE DRIVE, `2026-11-17`, the supervisor's own, verbatim (outside the repository, `mem` tier, no file I/O):**

```
T=$(mktemp -d); cd "$T"
cat > join.mjs <<'EOF'
const { storeCreate } = await import('/…/bindings/js/index.mjs');
const tag = process.argv[2];
const store = storeCreate({ journalLength: 16, listeners: [] });
const fired = [];
store.listen('hw', [['a']]);  store.listen('hb', [['b']]);
store.register('hb', (addr) => { fired.push('b:' + JSON.stringify(addr)); });
if (tag === 'sync') store.register('hw', (addr) => { store.write(['b'], 'mem', 9); });
else                store.register('hw', async (addr) => { await null; store.write(['b'], 'mem', 9); });
process.on('unhandledRejection', () => {});
const rec = store.write(['a'], 'mem', 1);
await new Promise((r) => setImmediate(r));  await new Promise((r) => setImmediate(r));
console.log(`[${tag}] hb fired = ${JSON.stringify(fired)}`);
console.log(`[${tag}] outer.triggered = ${JSON.stringify(rec.triggered.map(t => t.handle))} outer.log.len = ${…}`);
console.log(`[${tag}] b version present = ${JSON.stringify(store.read(['b']))}`);
EOF
for arm in sync async; do echo "=== $arm ==="; node join.mjs $arm 2>&1; echo "[exit=$?]"; done
```

```
=== sync ===
[sync] hb fired = ["b:[\"b\"]"]
[sync] outer.triggered = ["hw"] outer.log.len = no-accessor
[sync] b version present = 9
[exit=0]
=== async ===
[async] hb fired = ["b:[\"b\"]"]
[async] outer.triggered = ["hw"] outer.log.len = no-accessor
[async] b version present = 9
[exit=0]
```

**WHAT IT MEASURES.** **The post-`await` body's write OPENED ITS OWN COMMIT AND ITS OWN PASS RAN** — the listener registered at
the inner address fired in **both** arms. **`D-45`/`D-46` hold TODAY, for a body that runs after the write returned, because the
triggering commit has CLOSED by then** (`openCommit`'s `index.open > 0` guard is not satisfied, `state.mjs:665`), **and the
bracket's early restore changes nothing by itself.**

**WHAT IT MEANS FOR THE SHAPE — AND THIS IS THE FINDING THE SHAPE OWES A RULING FOR.** **Under an AWAITED delivery the triggering
commit is still OPEN while the body is suspended**, so the same write arrives at `openCommit` with `index.open > 0`, no name
standing, and `EXTERNAL_DEPTH` already decremented — **and takes the JOIN arm.** **The declared rule would silently invert, and
the observable consequence would be `D-53`'s and `D-76` item 1's containment read downward: a listener's entries would land in
the caller's own log.** **THIS IS DERIVED FROM THE MECHANISM AND IS NOT DRIVEN — no implementation exists to drive it — so it is
filed as `RM-6` and `NQ-1`'s own ground, NOT as a defect of the shipped tree.**

### `N-3` · IF THAT ARM HOLDS, A DECLARED PROPERTY BREAKS — so `RM-6` is not SILENCE

`D-76` item 1's correction declares that *"neither `triggered` nor the log gains one"* (`surface.md:1757`–`:1758`), and `D-53`'s
ground is *"A LISTENER'S WRITE IS THE ONE THAT STARTS A FRESH LIST"* (`index.d.ts:458`–`:467`). **A joined post-`await` body's
entries would append to the CALLER's list.** **This is why `RM-6` is re-filed at `§2` as `DECLARED-CONTRADICTED-BY-MECHANISM,
SUBJECT TO ONE DRIVE` and not as silence.**

### `N-4` · THE SLOTS THAT ACTUALLY CROSS UNDER INTERLEAVING

**Named because `NQ-1` stops at the leg slot (`W-3`), and these four do not stop at a local.** `state.legDelivery` — set
`'member'` at `index.mjs:858`, read at `delivery.mjs:984`, restored at `index.mjs:915`: **a suspended delete's delivery would
make an interleaved write's terminal arm SKIP its own delivery, silently, with no code and no log.** `state.listenerFailure` —
one slot (`delivery.mjs:580`): **two interleaved registration deliveries overwrite each other's throwable.**
`witnessDiscardedReversal(instance, window)` (`index.mjs:905`) — **read AFTER the delivery**, so a raise from an interleaved act
can be attributed to, or consumed by, the wrong window (`D-75`'s list, `:900`–`:904`). **`REPAIR_LEGS_LAST`** — set at the early
`finally` (`state.mjs:836`) and read by the kernel's next repair arm. **Mechanism read at the bytes; every consequence is
`NOT DRIVEN` — no implementation exists.**

### `N-5` · THE RE-ENTRANCY LAW THE SHAPE MAKES WORSE, AND THE FILE-TIER QUESTION ANSWERED

**`D-72` property 3: *"RE-ENTRANCY IS UNAVOIDABLY OPEN — a listener that writes at the address it was delivered for fires itself
again"* (`:3954`–`:3956`).** **The shape changes the SHAPE of the re-entry and this file must say so: today the re-entry is a
NESTED chain inside one live stack (`:3941`); under an awaited delivery the window that fired a body has released its stack
position, so the body's re-entrant write is no longer nested in its own invocation — it is a second delivery running while the
first is suspended. SILENT in the record and newly reachable (`NQ-1`).**

**And the file tier answers cleanly: once per ARM, never once per pass** — one `commitFile` per terminal arm (`delivery.mjs:889`–`:947`),
one per judgement (`constraints.mjs:2989`), one per registration close (`delivery.mjs:494`–`:500`). **The shape does not move it,
and no ruling is owed — `FR-9`/`DQ-1`.**

---

## §8 · The questions that must be answered before any design — NO DEFAULT ON ANY

**`AL-2`…`AL-12` are carried forward from `strata/research.md §22.10` with their own numbering; `NQ-1`…`NQ-6` are this shape's;
`AL-1` is ANSWERED by the owner and is not re-asked.** **Not one of the rows below carries a default, not even a *"the record
says nothing, so nothing moves"* — `P-3`'s lesson is that a default on the wrong fork is a silent ruling.**

| `#` | the question |
|---|---|
| **`AL-2`** | Is a listener's REJECTION a refusal (a status), a warning, or silence? |
| **`AL-3`** | If a status: which rank, and which channel — a new `23`, `ListenerBodyThrew` (`21`) widened, or none? |
| **`AL-4`** | Is a post-`await` listener write in scope, and what does its commit name? (Now `RM-6`/`N-2`.) |
| **`AL-5`** | May the write's answer carry delivery outcomes? (Now `RM-4`, grounded by `N-1`.) |
| **`AL-6`** | Does the ordering law survive a suspension — does the window wait for a suspended chain, or does the next listener run at the suspension? |
| **`AL-7`** | What does *"one invocation per distinct handle"* mean for a body that has not settled? |
| **`AL-8`** | Which window does a suspended body's registration belong to? |
| **`AL-9`** | Does the request reach the four registration instants (`D-125` item 1)? |
| **`AL-10`** | Is the synchronous-graph law read as reaching a runtime invocation? (The audit's reading is that it does not; **that reading is not the architect's word**.) |
| **`AL-11`** | Which verbs and instants are in scope? (Now `RM-7`.) |
| **`AL-12`** | The release class. |
| **`NQ-1`** | **CONCURRENCY.** Two writes in flight at one store: what declares it, and does the waiting invoke bodies serially or together? (`N-4`'s four crossing slots; `D-72`'s premise.) |
| **`NQ-2`** | Does awaiting a body before invoking the next ASSERT an order the record refuses to assert — and if so, what replaces *"a drive compares sets, never sequences"*? |
| **`NQ-3`** | Does a rejecting body roll back anything? (It must not — **but say who declares that**.) |
| **`NQ-4`** | May a suspended body's own write commit to the SAME `filePath` between the save and the answer? (Declared for two INSTANCES — `contract.md:2512`–`:2517` — and declared nowhere for two ACTS on one instance.) |
| **`NQ-5`** | At the four registration instants, whose answer waits — at `storeCreate` and a boot there is no caller to await, and at `addConstraint`/a re-arm the answer is an identity, not a record (`decisions.md:6548`–`:6549`). |
| **`NQ-6`** | Where does the ruling put the amendment of `PAR-JS-12` and `Listener` — and what home does it name, given `W-5`? |

---

## §9 · Summary, and what this file does not do

**The record has a subject here and it is not silence.** **`DD-22` refused the async invocation and priced its own reversal in
three nouns and one clause; `DD-23` refused the failure channel such a delivery needs; four live sites declare that a rejection
is not the failure form, and one of them grounds that on synchrony itself.** **The owner's sentence asks for the order the
record already declares — SAVE, then DELIVER, then the answer — and for the one thing the record has never had: a body that has
not settled at that instant.** **So the shape is NINE CARRIED ELEMENTS and NINE RULINGS, ONE of them (`RM-1`) a reversal the
architect must give in his own words, and the verdict is `BLOCKED-ON-SEMANTICS` — not `REJECT`, because every shape is a ruling
away and `D-76` is the record of what happens when an L0 pass mistakes a permission for one.**

**WHAT THIS FILE DOES NOT DO.** It designs no mechanism, names no module, part or pin, opens no unit, mints no status, writes no
cell, amends no clause, claims no release class, and re-prices nothing `§22` priced. **The next move is the architect's: one
sentence per question at `§8`, landing in `strata/decisions.md` — which this pass did not touch.** **The one measurement it owes
beyond `§7` is `A112`'s conformance, `OWED` before this pass and `OWED` after it.**

---

# `P-5` · The consolidated shape — async delivery, `saveCall`, `channel` and an initial-data seed, gate-1 CLOSED and the design opened

**WHAT THIS FILE IS.** The **gate-1 record for the consolidated shape**, filed `2026-11-17` at `HEAD` `e3136af` by the **supervisor (L0)**,
from **`role_l0_validity`'s gate pass and `role_l0_critique`'s adversarial companion, both of this date**, on the intake at
`strata/research.md §22`/`§22.12`/`§23`/`§23.16` and the **seven rulings `D-130`…`D-136`**. **Its verdict is `APPROVE-WITH-CONDITIONS` and
its scope is a store-surface unit with a package half.** **It supersedes nothing**: `P-4` stands as the async half's own gate record, and
this file reads it through the rulings.

**THE SEVEN WITHDRAWALS THE CRITIQUE MADE, NAMED AT `§2`; ITS NINE NEW ROWS AT `§4`; ITS TOKEN MOVEMENT AT `§1`.** **The validity pass's
token was `APPROVE-WITH-CONDITIONS` while its own body carried *"the ONE BLOCKING ITEM"*; the critique moved it to
`BLOCKED-ON-SEMANTICS` on that one item, and `D-136` — the architect's answer, given before this file was written — removed it.** **So the
token below is issued on a closed blocker and not on a hopeful one, and the sequence the record ordered (`D-130:6768`: *"L0's explanation
of it is owed before anything is designed"*) is discharged.**

---

## §1 · The verdict, and what the token now rests on

**`APPROVE-WITH-CONDITIONS` · `2026-11-17` · `HEAD` `e3136af` · the design may open.**

**THE GROUND, IN ONE SENTENCE.** **Seven ACTIVE rulings of one date have moved this shape from *nine open choices* to *no open choice but
a set of priceable declarations*, its one blocking question was answered by the architect in the same session
(`D-136`: *"Ride beside it, under its own name"*), and what remains is either a design's pricing act or a later gate's measurement.**

**WHY NOT `REJECT`.** `D-76` records what happens when an L0 pass mistakes a permission for a prohibition (`strata/decisions.md:4065`–`:4073`);
`brief.md:45`–`:47` puts every ruling above the contracts; and every residual here is a ruling away.

**WHY NOT `BLOCKED-ON-SEMANTICS`.** The critique's argument for the token was exact while it stood — **`D-131` item 5's headline said
*"the channel's answer IS the receipt"* while its own body withdrew the reading (`:6801`), and the `replace` arm would reverse `D-119`
item 4, which no layer below the architect may do** — **and it stopped standing when `D-136` took the second arm and withdrew the first as a
reading.** **The block was one exchange wide; the exchange happened.**

**THE SCOPE FACT, AND IT MUST BE THE UNIT'S FIRST SENTENCE.** **This is a STORE-SURFACE unit with a package half.** **The delivery half
leaves the store untouched** (`D-130` moves no store byte; `surface.md:387`; `frame.mjs:42`–`:44`) **and `A57` is unmoved by both keys**
(`D-131` item 7). **But `D-132` requires the addon's construction to learn a new input — no caller-spellable state means *"durable,
pathless"* — and `D-131` item 2 with `D-133` item 1 require the store to hand its image OUT.** **A design that carries *"the store is
untouched"* into its first sentence would mis-scope the delivery work as store surgery.** *(This is the critique's `V-2`/`V-5` withdrawal:
`P-4`'s `FR-1` holds of the DELIVERY half; the consolidated unit is what fails it, not `FR-1`.)*

---

## §2 · The withdrawals, by name

**Each is a sentence the two passes printed and the critique did not let stand** (`strata/walkthrough.md §4`: a superseded cell leaves and
leaves one pointer).

| `#` | withdrawn | replaced by |
|---|---|---|
| **`V1-w`** | *"`P-4`'s `FR-1` … **half fails**"* | `FR-1` holds of the delivery half; **the consolidated unit** is store-surface + package, on `D-131` item 2, `D-133` item 1, `D-132` item 1 (§1). |
| **`V2-w`** | *"it blocks because it fixes the unit's SCOPE"* (the ground for `RM-4`) | **it blocked because `D-131` item 5's headline and body disagreed and the `replace` arm reverses `D-119` item 4** — a declaration below him, not a scope preference. **Now moot: `D-136`.** |
| **`V3-w`** | *"`(b2)` and `(d)` satisfy `D-130` item 4's sentence only under a reading"* | **`(d)` is FORECLOSED, not strained**: under it the write answers before any waiting exists, and `D-130` item 4 is the owner's *"await listeners before the write answers"* read through. |
| **`V4-w`** | *"the four live 'never a `Promise` rejection' sites"* | **three sites carry that phrase** (`index.d.ts:498`–`:499`; `contract.md:591`; `surface.md:1275`–`:1278`) **and a fourth says something stronger**: `brief.md:287`–`:289`'s *"thrown synchronously … never a rejection"*, which also prints a two-member form and *"SEVENTEEN"* — doubly stale and the strongest wall. |
| **`V5-w`** | `RM-6` *"left standing by name"* | **standing as to the MECHANISM, closed as to the OUTCOME** by `D-45`/`D-46`: the JOIN arm is forbidden, so what remains is keeping the bracket off a suspended body (`N-4`'s five slots). |
| **`V6-w`** | *"may not parse the image in the package (`brief.md:333`)"* | **`D-135` struck that ground at its own bytes.** The prohibition stands on **`D-135` item 5's** *"OPAQUE … transported verbatim, never hand-edited"* with `src/store.rs:1714`'s one decoder. **Right prohibition, wrong byte.** |
| **`V7-w`** | *"may not push `{listenerHandle: data}` into `triggered`/`pending` (`surface.md:1731`)"* | **that line is `§2.7` item 7 (a).** The totality is the declaration's own type: `TriggerPair = { handle, address }` (`index.d.ts:695`–`:698`), `pending: readonly TriggerPair[]` (`:993`). **Same defect class the pass filed against `D-130` — on its own list.** |
| **`V8-w`** | *"an ignored `cfg` key is not a refusal"* (a `MUST NOT`) | **true of the four keys `frame.mjs:211`–`:221` ignores TODAY; SILENT for a key the `cfg` type declares** — and `D-132` item 4 says so: *"a `saveCall` that is present but not a function … has no declared answer"*. **`SC-2`'s three candidates stand; the design may not delete two of them.** |
| **`V9-w`** | *"its symmetric import carrier"* | **`symmetric` is `D-135`'s word and a carried figure, not a measurement**: the two carriers `D-112` leaves are **export-shaped** and neither accepts text inward. **See `VN-8`.** |

---

## §3 · The fraction and the remainder — printed, because gate 1 owes both

**CARRIED — what the seven rulings put beyond doubt** (each at its ruling): `cfg` is `7` keys and the three new ones are `cfg` keys
(`D-131` item 1, **by context and not by his word** — the ruling says so; `D-134` item 3) · a `saveCall` store with no `filePath` is
`file`-tier and `saveCall` alone is a complete durability configuration (`D-132` item 1, **a reversal of `contract.md:4868`'s *"NO SECOND
PREDICATE IS AUTHORED"***) · the payload is the store's own whole-state image, composed by the store and never `read([])` (`D-131` item 2;
`D-133` item 2) · `saveCall` and `filePath` coexist with `saveCall` prevailing (`D-131` item 3, as narrowed by `D-132`) · the store's own
writer is **suppressed** on that arm (`D-133` item 3) · the export's direction is addon → package and `D-112`'s three carriers narrow to
two (`D-133` item 1) · an image-text seed is possible and cheaper, its failure arm already seated at `FileImageRefused` rank `22`
(`D-135` items 1–3) · delivery starts all bodies together, the answer is withheld until the set settles, no order is asserted, a body may
suspend (`D-130` items 3–4) · interference between a caller's own async bodies is the caller's hazard (`D-130` item 5) · a rejection is a
refusal, carries the ONE form, and appends a new 23rd status (`D-130` items 1–2) · the channel is per-write, receives
`{listenerHandle: <that listener's value>}`, and its answer **rides beside** the receipt under its own accessor (`D-131` items 4–6;
`D-136`) · `A57` unmoved (`D-131` item 7) · one-invocation-per-handle and window membership whole (`D-130`'s carried clause).

**REMAINDER — `PRICEABLE`, and the design may present each as two or three declared alternatives:** `RM-2` (the `§2.7` item 2 instant)
· `RM-3`/`CH-4` (how a failure crosses; the four sites owe the amendment) · `RM-6`'s mechanism (the five package slots) · `RM-7`/`CH-2`
(which verbs and delivery instants — narrowed to `write` and `delete` for the channel by the *"with the write receipt"* sentence) · `RM-8`
(the `PAR-JS-12` amendment and its home) · `NQ-3`, `NQ-4`, `NQ-5`, `NQ-6` · `SC-2`, `SC-3`, `SC-6`, `SC-7`'s residue, `SC-10`, `SC-R1`'s
carrier, `SC-R2`, `SC-R4` · `SE-1`…`SE-6`, `SE-8` · `CH-3`, `CH-7`, `CH-8`.

**REMAINDER — `DEFERRED`**: `SE-7` and the async save's ordering region · `SC-9`'s cells · `A112`'s conformance · `NEW-1` (the
sync-graph law's only declared instrument, **owed before any tag**) · `Listener`'s `tsc` assignability · `SC-8` (the WASM reading) · the
`INV-6` amendment in his name · the release class (`RM-9`/`SC-11`/`CH-11`).

---

## §4 · The nine rows the critique added — `VN-1` … `VN-9`, carried whole

1. **`VN-1` · THE RULINGS ORDER THE ANSWER BEFORE THE DESIGN, and every such sentence is the LAST line of its row** (`D-130:6768`; the five
   closings at `:6809`, `:6877`, `:6942`, `:7021`, `:7074`). **Discharged by `D-136` and this file's `§1`; recorded because the shape of the
   miss — a boilerplate-looking last line — will recur.**
2. **`VN-2` · THE `save-failed-at-the-terminal-arm` SYMBOL LOSES ITS PRODUCER.** `surface.md:1919`–`:1922` declares it set *"at clause 2's
   own act — the terminal arm's `file`-tier save — and on the failing arm of that act alone"*, carrying *"the very throwable the store's
   `commit_file` rethrew"*, and **it is what distinguishes a failed save from a body that threw.** **A package-performed save has no
   rethrow, so the mark is never set and a failed `saveCall` crosses as something the kernel cannot classify.** **`S`, and unowned.**
3. **`VN-3` · THE SAVE'S DECLARED DURABILITY OBSERVABLE HAS NO SUBJECT.** `surface.md:1898` (clause 4 (ii)): *"the observable is the file's
   own bytes read from a FRESH instance over an equal `cfg.filePath`"*. **Under `saveCall` a fresh instance over an equal path reads the
   STALE file** (`D-133` item 4). **So the save's TEST is gone, not only its mechanism — and no gate-3 cell may be written for durability
   until it is answered.**
4. **`VN-4` · THE CONTRADICTION AMONG THE RULINGS, NOW CORRECTED AT ITS BYTE.** `D-131` item 3's last clause (*"`SC-7`'s reversal is NOT
   taken"*) against `D-132` item 2 (which takes it). **Corrected `2026-11-17` at `D-131` item 3 with a one-clause pointer; `D-132` governs.**
   **A design reading the old clause would conclude no new construction input is owed — the exact negation of this file's scope fact.**
5. **`VN-5` · THE SEED DECODES TEXT THE STORE DID NOT COMPOSE.** `D-134` item 2's ground (*"the store never has to parse text it did not
   compose"*) is **falsified by `D-135`'s own route** (the DB's text into the store's decoder), and `D-135`'s *"the DB stores exactly the
   bytes the store emitted"* is **a claim about the DB that no byte of the tree enforces**. `read_file_image` filters through
   `is_admitted()` and answers `NoImage`/`Members`/`Refused` — **an admissible but foreign or older image installs silently.** **The seed's
   PROVENANCE is undeclared; `S`.**
6. **`VN-6` · THE WORD `channel` HAS THREE DECLARED REFERENTS AND THE `cfg` KEY IS A FOURTH.** `DD-12`/`DD-23`'s *failure* channel
   (`contract.md:591`, `:603`) · `EXTERNAL_CALL = Symbol.for('provident-storeroom.external-call')` (`state.mjs:315`) · the *repair-leg*
   channel (`state.mjs:833`–`:836`, whose own docblock says *"THE CHANNEL"* and means that one). **A landing hazard, not a rule question.**
7. **`VN-7` · `saveCall` IS DECLARED `(async optional)` AND `channel` IS NOT.** **If a channel may return a promise, the receipt's
   accessor is a promise of data and the answer gains a second wait `D-130` item 4 does not declare; if it may not, an `async` channel's
   promise crosses as the caller's data.** **`S`, and `CH-10` does not carry it.**
8. **`VN-8` · EXPORT AND IMPORT ARE NOT SYMMETRIC, AND `SE-1` DECIDES WHETHER AN IMPORT CARRIER IS OWED AT ALL.** `D-112`'s two surviving
   forms are export-shaped (an entry that ANSWERS the image; a position on `commitFile` whose answer moves off `undefined`), **and neither
   accepts text inward**. **So the count of new addon inputs is `{1, 2, 3}` under two undeclared choices** — a range, not a figure.
9. **`VN-9` · FOUR OPEN ITEMS THAT FIX DECLARED SURFACE ARE MISSING FROM THE GATE'S EIGHT.** `SC-2`'s answer form AND outside form ·
   `CH-8` (*a second non-store `TypeError` site is a second failure form — a `DD-12` refusal*) · `SC-R2` (whether the path-less writer is
   reachable at all) · `D-133` item 4's stale-file arm, which **the ordinary configuration produces from the first write**.

---

## §5 · The design's brief — what it may assume and what it may not

**MAY ASSUME**, without hedging: the fifteen items of the gate's assumption list, **with `D-136`'s receipt added and `D-131` item 3 read
through `D-131`'s corrected clause**. In one line: **seven `cfg` keys · `saveCall` alone is durability · the payload is the store's own
whole-state image · suppressed writer on that arm · an image-text seed with `FileImageRefused` as its failure seat · all bodies started
together, the answer withheld until the set settles, no order asserted · a rejection is a refusal appending status 23 · the channel is
per-write, the caller receives its answer **beside** the receipt under its own accessor · `A57` unmoved.**

**MUST NOT**, each at its byte: invent a flush boundary (`D-131` item 4; `contract.md:602`) · put a top-level `await` in the entry's
load-time graph (`contract.md:2379`; `D-129` item 4) · mint a status name, slug, rank or message (`D-130` item 2) · let a body's write join
the triggering caller's commit (`D-45`/`D-46`; `D-53`; `D-76` item 1) · parse the image in the package — **on `D-135` item 5's ground, not
`brief.md:333`'s** · push `{listenerHandle: data}` into `triggered`/`pending` — **on the declaration's own type, `index.d.ts:695`–`:698`,
`:993`** — nor treat that map as the channel's RETURN (`D-131` item 5's own sentence is *"The channel receives …"*), **nor as complete or
well-keyed (`CH-3` is open)** · answer with a `Promise` rejection as the failure form (`RM-3`'s four sites) · catch or roll back a body's
throw (`DD-23`) · take any pending declaration (the carriers, `SC-2`, `SC-6`, the key spellings, the seed's shape) · refuse a second
instance over one path or backend (`docs/specs/storeroom-js/contract.md:2512`–`:2517`, `:3256` — **extended in subject, never defended
against**) · delete `SC-2`'s candidates on the ground that an undeclared `cfg` key is ignored.

**AND THE SIX `S` PROBLEMS THE DESIGN MUST ANSWER OR PRICE**: the export carrier and the import route (`VN-8`'s range) · the receipt's
accessor (`D-136`) · the new status's seat and both plurality rules · **the five package slots under suspension, which `D-130` names as the
design's own obligation** (`EXTERNAL_COMMIT`/`EXTERNAL_DEPTH` `state.mjs:319`, `:822`, `:837`; `state.legDelivery` `index.mjs:858`,
`delivery.mjs:984`, `index.mjs:915`; `state.listenerFailure` `delivery.mjs:580`; `witnessDiscardedReversal` `index.mjs:905`;
`REPAIR_LEGS_LAST` `state.mjs:836`) · **the save's failure machinery: `VN-2`'s lost symbol mark, `§2.11` cl. 5's rollback producer, and
`Entry::saved`'s keeper** (`store.rs:1592`, `:1601`–`:1609`) · **`VN-3`'s lost durability observable.**

---

## §6 · Envelope

**VERDICT.** `APPROVE-WITH-CONDITIONS`, the design opened, the one blocker closed by `D-136`. **WRITE SET:** `strata/research.md`
(`§22`, `§22.12`, `§23`, `§23.16` landed), `strata/proposals.md` (`P-4`, `P-5`), `strata/decisions.md` (`D-130`…`D-136` and one correction
at `D-130`, one supersession at `D-131`). **No code, no test, no contract and no guide moved; nothing committed.**

**NOT DECIDED HERE.** Any carrier, any spelling, any status's name, any priceable choice, any release class. **The design is a design
pass's; the rulings are his; the measurements are the gates'.**
