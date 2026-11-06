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
