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
