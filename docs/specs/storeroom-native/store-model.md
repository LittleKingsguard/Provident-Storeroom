# Part — `store-model` (`U-STOREROOM-NATIVE`, prefix `D-GP-SNST`): the record shapes, the address grammar, and the walk

- **Status:** **CARRIER PART of the unit's contract directory `docs/specs/storeroom-native/`** — authored at
  the gate-2 spec gate in the **same pass** as the contract document's index region and part map, whose
  `store-model` row declares it **KIND `carrier`** at the path `docs/specs/storeroom-native/store-model.md`.
- **The derivation clause this part reads through — one clause, carried by
  the contract document and NOT re-spelled here:**
  `derivation: docs/specs/storeroom-native-proposal-review.md · decomposition · disposition = SPLIT-NOW · decider = the user`
  (`docs/specs/storeroom-native/contract.md`, its status block; the middle dot `·` separates the slots). **Its
  authority is the FILED gate-1 record itself (that record's `decomposition` row and its `§4.1`); no unfiled
  process-rule path is cited, per `contract.md §0.1` item 7.**
- **WHAT A `carrier` PART IS, AND WHAT THIS ONE HOLDS.** **A `carrier` part holds RELOCATED SECTIONS of the
  contract's own text**, and **those sections keep the authority citations they carried in the contract
  document** — *a relocation is not a re-derivation: no claim gains or loses an authority by moving*
  (`docs/specs/storeroom-native/contract.md` §0.1 item 10(a), which states the relocation rule in this
  directory's own bytes). **This part's relocated spans are
  `contract.md §1` (its §1.1–§1.7) and `contract.md §2` (its §2.1–§2.3), WHOLE, each keeping its `§`-numbers,
  its tables and its authority citations unchanged.** **This part declares NO new claim, NO new parameter,
  NO new fail-state, NO new `§`-number, no `DD` row, no `PAR` row and no `P-*` register row.**
  `[T: this part's own scope boundary | CONTRACT]`

## Scope boundary — the two regions this part carries

**The relocated spans, named by their contract `§`-numbers:**

| Relocated section | Its home in the contract document | What it carries |
| --- | --- | --- |
| **`§1`** (with `§1.1`–`§1.7`) | `docs/specs/storeroom-native/contract.md §1` | the two node kinds · the parent and child anchors and the monotonic clause's carrier · the link and its `MAP`-xor-`VEC` container with the `(key, tier)` uniqueness rule · the admitted value taxonomy and the node-kind decision a value forces · the address grammar, the segment domain and the empty address · the register · the tier as a PROPERTY and not a data structure |
| **`§2`** (with `§2.1`–`§2.3`) | `docs/specs/storeroom-native/contract.md §2` | the `findAddress` signature and its reference return · the walk's arm table, arm by arm, with its fail-closure · the tier-argument selection rule the walk runs on |

**RECORDED OMISSIONS (what this part does NOT carry, and why).** **This part carries no record shape,
no field, no fail-state and no parameter that the contract document does not already declare.** **In
particular it does NOT carry, and does not restate:** the tier domain, the rank, the lifetime and the purge
chain (they are `§5`, and the contract's clause order puts them after the verbs, per the adopted build
order) · the verbs' arms (`§3`–`§4`, at `write-and-read.md`) · the closed fail-code set with its generated
messages (`§8`, at `seams-and-lifecycle.md`) · the parameter-semantics rows (`§9`, at
`parameter-semantics.md`). **A reader seeking one of those is pointed, never served a second copy here** —
a **second copy** of a `§`-numbered section is the shadow-home defect the closure predicate forbids
(`docs/specs/storeroom-native/contract.md` §0.1 item 10(a) and §0.1 item 10(c); the contract's own
`property-register` omission row). **An omitted part is ABSENT, never written
empty** (`docs/specs/storeroom-native/contract.md` §0.1 item 10(b), the omission rule; the contract
document's own scope boundary).

## The closure predicate, read off this part alone — one arithmetic, with its terms

**A part's presence enters the unit's single arithmetic; a part does not have one of its own.**
**`{part-map PART entries}` = `{rows of the part map} − {the contract-document row}` = `5`;
`{files present in docs/specs/storeroom-native/} − {contract.md}` = `5`
(`store-model.md` · `write-and-read.md` · `seams-and-lifecycle.md` · `parameter-semantics.md` ·
`implementation-plan.md`); the `3` recorded omissions contribute to NEITHER side — so `5 = 5` and the unit's
state is `CLOSED`** (`docs/specs/storeroom-native/contract.md` §0.1 item 10(c), the closure predicate's home
in this directory's own bytes; the contract's index region carries the operative closure line).
`[T: contract.md §0.1 item 10(c); the arithmetic is a CENSUS observation about the file set | CENSUS]`

## The relocated spans

**Everything below this line is the contract document's `§1` and `§2`, relocated WHOLE** — its headings, its
tables, its prose, its authority citations and its `§`-numbers, unchanged. **The only edit is structural:
the relocated spans are printed here under their own `##`-level headings in a second document, which
`docs/specs/storeroom-native/contract.md` §0.1 item 10(a)'s relocation rule permits and which changes no rule
text.**
`[T: the relocation note | CONTRACT]`

---

## §1. The store's record shapes — leaf · branch · anchor · link · registry · the tier property

**AUTHORITY NOTE FOR THIS SECTION.** The directive's five components and their clauses stand at
`P: §1`; the rulings that read them stand at `P: §12`–`P: §13`. **A `P`-tagged citation names the
in-project ruled artifact as the record of the architect's words**, and **no clause below is derived from
any adjacent-project text** (`P: §11 · A9`).

### §1.1 The two node kinds — `leaf` and `branch`

**`leaf` and `branch` are TWO NODE KINDS** (`P: §11 · A13`: *"I explicitly said they're two different node
types"*; `L: §1-bis · leaf/branch`). **They are not one record with two member kinds.**

| Kind | Its members, and nothing else | What it REFUSES |
| --- | --- | --- |
| **`leaf`** | **`value`** — exactly one **admitted literal** (`§1.4`); **`anchor`** — the one `AnchorRef` that points to it (a leaf *"is pointed to by an anchor or the register, and must point back"*, `P: §1`); **`active`** and **`carried`** — the two LISTENER REFERENCE LISTS of this amendment's `⟶ AMENDED` clause below (`A47`), **each holding not listener data but REFERENCES INTO THE ONE HOME MAP (`A45`), so neither is a copy and neither is a second home (`A48`)** | any child anchor; any downstream link; a value outside `§1.4`; more than one anchor; **a listener record or a callable held ON the node** (the node borrows and never owns, `A45`/`A48`; `DD-32`) |
| **`branch`** | **`anchor`** — its one parent-side `AnchorRef`; **`container`** — exactly one `Link` (`MAP` or `VEC`, `§1.3`); **`address`** — the path from the register by which it is reachable (`P: §12`'s reachability reading, `DD-6`); **`active`** and **`carried`** — the same two LISTENER REFERENCE LISTS (`A47`) | a readable value of its own (*"They do not contain any readable value"*, `P: §1`); more than one container; a container of zero anchors unless the write installed an empty object (`DD-1`); **a listener record or a callable held ON the node** (`A45`/`A48`; `DD-32`) |

**⟶ AMENDED 2026-10-11 — THE PER-NODE MEMBER TABLES ABOVE GAIN TWO MEMBERS EACH, AND THE AMENDMENT'S OWN
CLAUSES FOR THEM STAND AT `write-and-read.md §6.5` (the home, the borrows, the two lists and the firing
model)** (`RCA-8(d)` ANNOTATE-BESIDE: **both as-filed rows stand byte-for-byte and the amendment's two
members are added to each of them, in the same pass as the clauses that read them — which is exactly what
`AR-6` requires: *"no per-node member is added unless `§1.1`'s member tables and `§0.4`'s spelling table move
in the same pass"*, and both have**; the map and the walk's own clause order is `contract.md §0.1` item 5's
and `implementation-plan.md §2`'s). **THE FOUR RULINGS THESE MEMBERS READ, EACH AT ITS OWN WORDS:** **`A45`**
— *"the top-level listener map is the home and the nodes borrow. this is used to limit the number of lookups
required to check for a listener"* — **so `active`/`carried` are an INDEX FOR LOOKUP COST and hold REFERENCES,
never copies, and the home stays the ONE authoritative registration state**; **`A47`** — *"Two lists to keep
active listeners separate from ones that are being passed to children"* — **so the two lists STAY TWO and
neither collapses into the other**; **`A46`** — *"The borrow is removed on node change actions because they
destroy and replace nodes"* — **so a node's two lists are DROPPED WITH THE NODE, and neither outlives a
change action** (`write-and-read.md §6.5` item 9 states the lifetime clause, and its `P-SM-4` row's own half
carries it as a failable property); and **`A48`** — *"The home listener map (the one that owns the listener
data) **only** contains listeners, it is separate from the register and the graph"* — **so the home is NOT a
sixth graph component, NOT a member of this part's five-component closure, and NOT inside a read at `[]`**
(`§1.7`'s *"There is NO sixth component"* stands **unweakened**: the closure counts the GRAPH's record
shapes, and a peer structure outside the graph adds nothing to that count — exactly as the journal and the
superseded watch collection already sit beside it).
**AND THE LEAF'S CARRIED LIST, STATED SO THE `AR-6` CONDITION'S SECOND HALF IS ANSWERED AND NOT SKIPPED:**
**the `leaf` row's member table now carries BOTH lists, and a `leaf`'s `carried` list is EMPTY BY
CONSTRUCTION** — *"leaf nodes cannot have downstream anchors"* (`P: §1`; `L-4`'s own ground), so a leaf has no
descendant to inherit anything, and **a NON-EMPTY `carried` list on a leaf is a state the model cannot reach
and a defect if observed.** **The `active` list is NOT thereby empty on a leaf: a listener addressed AT a
leaf fires on the write or the delete that resolves to that very address (`A43`), so the leaf's `active` list
carries the references of the listeners bound exactly there.** **The two facts are stated together because a
member table that reads *"and nothing else"* admits a member only with its own reachable states named.**
`[P: §1, §11 · A13, §12 · A17 · A18, §13 · A21; T: the two members and their own states, taken at this
contract's sixth bounded amendment (the listener amendment) | CONTRACT]`

**⟶ AMENDED 2026-10-11 — THE TWO ADDED MEMBERS ARE CONDITIONAL ON THE PER-NODE INDEX'S OWN
MATERIALIZATION, AND THE CONDITION IS STATED AT THE CLAUSE THAT ADDS THEM** (`RCA-8(d)` ANNOTATE-BESIDE:
**every sentence above stands byte-for-byte, the member tables' own *"gain two members each"* included, and
THIS clause is the operative statement of WHEN the two members exist; the gate-4 adversarial pass's `AM-2`
found that the clauses above, `DD-32`'s borrow spelling and `P-SM-4`'s `(f)` have NO STATE in a node shape
that carries neither list, and this clause answers it**; `A45`; `A46`; `A47`; `A48`; `DD-41`;
`contract.md §5.8` (d)'s dated clause; `write-and-read.md §6.5` item 9's dated clause; `parameter-semantics.md
§2.14`). **THE CLAUSE, IN FOUR PARTS AND NOTHING ELSE:**
1. **THE INDEX IS OPTIONAL, AND ITS PRESENCE IS A SPELLING OF THE LOOKUP PATH AND NOT A SECOND HOME.** **The
   per-node listener index (the `active`/`carried` pair) is an INDEX FOR LOOKUP COST: a store MAY MATERIALIZE
   it on its nodes, and a store MAY INSTEAD PRODUCE the same returned sets by scanning the ONE HOME map at
   each trigger.** **Either spelling satisfies every clause of this directory that reads the two lists**,
   because **`contract.md §5.8` (d) licenses exactly that omission** (*"the same two sets must be produced
   whether the index is consulted or the home is scanned"*) **and `A45`'s stated purpose is the lookup count
   and never a second authoritative registration state.**
2. **WHERE THE INDEX IS NOT MATERIALIZED, A NODE CARRIES NEITHER LIST — AND ITS RECORD SHAPE IS THE SHAPE
   WITHOUT THEM.** **A node of such a store is the node kind's OTHERWISE-DECLARED record (a `leaf`'s `value`
   and its one pointing `anchor`; a `branch`'s `anchor`, its one `container` and its `address`), and `DD-32`'s
   pinned SPELLING OF THE BORROW (`Rc<ListenerEntry>` — *"the node holds a cheap handle"*) **HAS NO SUBJECT
   THERE**: **there is no borrow to spell, and that absence is DECLARED here rather than left to be inferred
   from a missing member.** **The register's carrier node of `§1.6` item 4 (b) is the ONE case this part
   states separately:** with the index materialized it carries its `active` list; without the index **IT
   CARRIES NO LIST, AND THE HANDLE SETS ARE PRODUCED FROM THE HOME THAT `seams-and-lifecycle.md §7.1` STEP 5
   POPULATED BEFORE THE REGISTRY WAS GENERATED** — so **the order `A56` rules stays OBSERVABLE through the
   sets, and not through a node-side member.**
3. **WHERE THE INDEX IS MATERIALIZED, THE CLAUSES ABOVE BIND IT WHOLE** — the tables' two members, `A45`'s
   references-into-the-home rule, `A47`'s two-lists partition, `A46`'s dropped-with-the-node lifetime, the
   leaf's EMPTY-by-construction `carried` list, and `contract.md §5.4`'s `(f)` property as this amendment's
   dated clause re-states it. **A materialized index that DISAGREES with the home — a stale reference, a
   reference whose listener is bound at another address, a duplicated handle, a reference outliving its node
   — is a DEFECT and FAILS `P-SM-4`'s `(f)`, whose premise the index therefore SATISFIES.**
4. **`§1.7`'S CLOSURE IS UNMOVED IN BOTH STATES.** **Neither list is a graph record, neither is addressable,
   neither is inside a read at `[]`, and a store WITHOUT the index closes at exactly the same five components
   as one with it** (part 2 above states the record shape; `P-IM-3`'s CLOSURE pass observes it either way).
**ITS `alt`, PRICED, AND ITS REVERSAL POINT** (`[T: the OPTIONALITY's own `DECLARED-DEFAULT` carriage, per
`contract.md §0.1` item 3 — *"always with its alternative priced"* — and `contract.md §0.1` item 11's closed
class set | DECLARED-DEFAULT]`): **the alternative — KEEPING the index MANDATORY, so that every node of every
store carries `active` and `carried` and no scan path exists — is priced: under the built record shape it
makes `(f)`'s premise FALSE-BY-ABSENCE (the row would print `HELD` over a state that cannot be exhibited,
which is the very defect `AM-2` filed), and it would make the store's own node shape owe two members whose
ONLY declared purpose is the lookup count `A45` names — so the alternative is available only with `A45`
re-read and a host pass that materializes the index.** **REVERSAL POINT: `DD-41`'s — a bounded amendment of
`docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded.**
`[P: §11 · A45, §12 · A46 · A47, §13 · A48; T: the optionality of the per-node index, so no clause carries a
list a node shape cannot exhibit | DECLARED-DEFAULT]`

**⟶ ADDED 2026-10-11 — THE BOUNDED `A78` RE-HOMING PASS (`role_spec_writer`), ON THE ARCHITECT'S RULING
***"Listener behavior is part of store."***: THIS PART'S HOME CLAUSES, READ UNDER THE FIRING'S OWN
AUTHORITY.** `RCA-8(d)` ANNOTATE-BESIDE: **every sentence above — the two member tables and their amendment,
the optionality clause and its four parts, and the leaf's empty-`carried` clause — stands byte-for-byte and is
read THROUGH this clause; THIS clause is a PURE INSERTION, it adds no member to any node kind, no `§`-number,
no `DD` row and no register row, and it re-decides no rule.** **THE RULING, VERBATIM:** ***"Listener behavior is
part of store."*** (`P: docs/specs/storeroom-js-proposal.md §19 · A78`). **WHAT IT SETTLES AT THIS PART'S OWN
CELLS, IN FOUR PARTS:**
1. **THE HOME THIS PART READS IS THE ONE AUTHORITATIVE REGISTRATION STATE, AND ITS RULE IS `A45`'s AND
   `A48`'s.** **THE STORE'S `address`-KEYED HOME MAP IS THE ONE HOME, SEPARATE FROM THE REGISTER AND THE
   GRAPH** (`A45`; `A48`) — **so this part's `active`/`carried` members are an INDEX FOR LOOKUP COST, they hold
   REFERENCES INTO the home and never a copy, and a node never owns registration state** (the `⟶ AMENDED`
   clauses above, each byte-for-byte).
2. **THE FIRING'S SEMANTICS ARE THE STORE'S AND THE STORE'S CONTRACT IS THEIR AUTHORITY.** **WHICH listener
   fires, WHEN it fires, WHAT it is bound to, WHICH ids a trigger returns, the home's registration semantics
   (`listen`/`unlisten`), the address-prefix rule and the process-scoped handle are STORE BEHAVIOUR** — **and
   no consumer's artifact is their home** (**`write-and-read.md §6.5` items 8–13** are the clauses; **item 14**
   there is the authority's own statement and the store-side reading of the registration's effect timing).
3. **WHAT THIS PART'S TWO LISTS MAY AND MAY NOT CARRY, SO THE AUTHORITY IS NOT READ AS A SECOND HOME.**
   **They carry REFERENCES a node's own address-scoped sets are produced from, and they carry NO listener
   record, NO callable, NO address stored as a list entry and NO copy of any home entry** (this part's member
   tables; `A45`; `A48`; `A47`). **A node's two lists DISAGREEING with the home is a defect wherever the index
   is materialized** (part 3 of the optionality clause above).
4. **AND ONE CONSEQUENCE FOR THIS PART'S OWN RELOCATED CLAUSES, NAMED SO NO SECOND HOME ARISES:** **the
   `active`/`carried` pair is a LOOKUP SPELLING and this part declares nothing about WHICH listener a trigger
   returns or WHEN a registration takes effect** — **those are `write-and-read.md §6.5`'s, where the one home is
   declared and where `A78`'s authority is stated** — **so a reader seeking the firing's rules is pointed to
   that section and is served no second copy here** (`docs/specs/storeroom-native/contract.md` §0.1 item 10(a),
   the relocation rule; `A45`; `A47`; `A48`).
`[P: docs/specs/storeroom-js-proposal.md §19 · A78 — *"Listener behavior is part of store."*; P: §11 · A45,
§12 · A46 · A47, §13 · A48; T: the home clauses read under the firing's own authority, so this part's two
members are a lookup spelling and never a second home | CONTRACT]`

**A `branch`'s container may hold `0` child anchors and is still a `branch`** — the empty case is `DD-1`'s.
**THE RE-MINT ARM, RULED — AND IT CARRIES NO TIER CARVE-OUT:** a write whose target resolves to a **leaf**
and whose value is an object or an array destroys that leaf's **pointing anchor** and places a **new anchor
on the SAME link** (`P: §13 · A21`: *"destroy and replace with a new anchor on the same link"*); the old
leaf's `value` and the old anchor are **gone**, and **the destroyed anchor's tier does not survive onto the
new one — the write's tier is the new anchor's tier, WHATEVER TIER THE DESTROYED ANCHOR CARRIED: a leaf at a
MORE persistent tier than the write's is re-minted exactly as one at the write's own tier is, because
`A21`'s words name no tier and this clause reads none into them** (`§5.4`'s `P-SM-4` row, arm `W-2` — **⟶ REPOINTED 2026-10-11: this cell's as-filed text read *"`§5.4` arm `W-2`, whose table's home is …"*, whose bare `§5.4` is printed twice in the contract document (`§5.2`'s dual-mapping disclosure); the row id is named so the arm resolves** — that arm table's home is
`docs/specs/storeroom-native/write-and-read.md §3.4` and whose reconciliation clause states the one rule this
clause and that arm share; **`W-5` is the SHADOW arm and is reserved to a target that is NOT the leaf this
write re-mints**) (`[P: §13 · A21 (its printed silence read with `A24`'s single write tier, and read
UNCONDITIONALLY: the ruling's own words name no tier and its transcription names the residual it answered as
*"the fate of the anchor a branch overwrites when a write re-mints a leaf"*) | CONTRACT]`).
`[P: §1, §11 · A13, §13 · A21; L: §1-bis · leaf/branch | CONTRACT]`

### §1.2 The anchor — parent side and child side, and where the tier lives

**The `anchor` is the INTERFACE between a node and a link** (`P: §12 · A18`: *"The anchor interfaces
between the node and the link"*), and **`parent anchor` and `child anchor` are TWO IDENTIFIERS**
(`P: §14 · A30`: *"Two identifiers"`; `L: §1-ter`, `L: §1-bis · anchor`).

| Side | Its members, and nothing else |
| --- | --- |
| **`ChildAnchor`** | **`key`** — a string (the register's and a `MAP`'s key domain) **or** an index — a non-negative integer (a `VEC`'s key domain); **`tier`** — a **tier property** (`§5.1`; **the tier is carried BY ANCHORS**, `P: §14 · A27`); **`node`** — the `NodeRef` it points to |
| **`ParentAnchor`** | **`link`** — the `LinkRef` it belongs to; **`node`** — the `NodeRef` that owns it (**`branch.anchor`** points back, and for a register-held root the register **acts as a link**, so the interface is complete, `P: §12 · A18`) |

**⟶ AMENDED 2026-10-11 — THE `ChildAnchor` ROW ABOVE GAINS A FOURTH MEMBER, BECAUSE `§0.4`'s MARKER CLAUSE
AND `DD-44` READ IT AS THE ANCHOR'S OWN** (`RCA-8(d)` ANNOTATE-BESIDE: **the table's `ChildAnchor` row stands
byte-for-byte — *"`key` — a string … **or** an index … ; `tier` — a **tier property** … ; `node` — the
`NodeRef` it points to"* included, and the header's *"Its members, and nothing else"* included — and THIS clause
is the operative statement of that row's member SET; the `leaf`/`branch` member tables of `§1.1` gained
`active`/`carried` the same way and in the pass that read them**; `A41`; `AM-11`; `DD-44`;
`[T: the anchor's member set, so no clause reads a member the declared shape does not carry | CONTRACT]`):
**`ChildAnchor`'s members are `key` · `tier` · `node` · **`register_marker`** — and the fourth is
`register_marker: bool`, TRUE on exactly ONE reference in a store, the register's, and FALSE on every reference
a segment reaches.** **The member is a property of the ANCHOR and NOT a `Segment` variant, so this part's
`§1.5` item 1 (the segment domain closed at exactly two classes) and `§1.7` (the five-component closure) are
UNMOVED** — and **the clauses that read it are exactly these: `contract.md §0.4`'s marker clause, `DD-44`'s
dated clause, `§1.5` item 1's dated clause, `§1.6` item 4 (c)'s dated clause and `§2.1`'s fifth correction.**
**NO NEW `DD` ROW, NO FAIL-STATE, NO `PAR` ROW, NO `P-*` ROW AND NO `§`-NUMBER IS AUTHORED BY THIS CLAUSE, and
the part map and the closure arithmetic are unmoved.** **`contract.md §1.2`'s copy of this table is the
pre-amendment layer and is read through this clause, exactly as `contract.md §1.1`'s as-filed rows are read
through `§1.1`'s `⟶ AMENDED` clause.**

**⟶ AMENDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING — `key` LEAVES THE `ChildAnchor`
MEMBER SET, AND THE MEMBER COUNT MOVES `4 → 3`** (`A129` (3)'s classifying instrument read at this site: **a
clause that at its own bytes bears its superseding date and the ruling it reads is QUOTED-AS-SUPERSEDED
HISTORY and not a live ordering** — so the table's row above, the `⟶ AMENDED 2026-10-11` clause above it and
`contract.md §1.2`'s copy of the row are all read THROUGH this clause, and **NOT ONE BYTE OF ANY OF THEM IS
REWRITTEN, DELETED OR RE-SPELLED**; `DEF-2026-10-02` bars a whole-file rewrite and `A131` bars `replace_all`;
the ruling is recorded at `docs/decisions.md`; `[T: the anchor's member set, so no clause reads a member the
declared shape does not carry | CONTRACT]`):

**THE ARCHITECT'S TWO DIRECTIVES, VERBATIM: *"Remove key and derive it during read while compiling vec -->
JS array"* and *"Key isn't needed locally on the node. The use case for it is in assembling arrays during the
JS conversion, but the codec can infer the key from the vec index directly"*.**

**THE OPERATIVE MEMBER SET, STATED AS THE `⟶ AMENDED 2026-10-11` CLAUSE ABOVE STATED ITS OWN — the table's
row stands byte-for-byte and THIS clause is the operative statement of the row's member SET: `ChildAnchor`'s
members are `tier` · `node` · `register_marker`, and `key` IS NOT AMONG THEM.** **THE COUNT MOVES WITH IT:
the set is `3` members where the `⟶ AMENDED 2026-10-11` clause above printed `4` — `4 − 1 = 3`, the one
subtracted term being `key` — and the three standing terms are `tier` (the tier property, `§5.1`), `node` (the
`NodeRef` it points to) and `register_marker` (the register's own identity carrier, `§0.4`'s marker clause;
`DD-44`).** **NO OTHER COUNT OF THIS PART MOVES: the part map, the closure predicate's `5 = 5` arithmetic
(`§0.1` item 10(c)) and every `DD`/`PAR`/`P-*` census are UNMOVED, because this clause authors no row and
removes no row — it removes ONE MEMBER from ONE ROW's declared set.** **NO NEW `DD` ROW, NO FAIL-STATE, NO
`PAR` ROW, NO `P-*` ROW AND NO `§`-NUMBER IS AUTHORED BY THIS CLAUSE** (the same licence the `⟶ AMENDED
2026-10-11` clause above states, and it holds here for the same reason: `§1.5` item 1's closed segment domain
and `§1.7`'s five-component closure are untouched, since this member was never a `Segment` variant and never
a graph component).

**THE GROUND, AT THE MEASUREMENT AND NOT IN THE ABSTRACT: the member was a CACHE of something derivable —
the container's position — kept in sync by ONE write and read by NOTHING.** **Measured at `src/`'s own bytes:
the ONLY write in the whole crate is `src/store.rs:990` — `self.refs[reference].anchor.key =
Segment::Index(index);`, inside `renumber_vec` — and THERE IS NO READ of it anywhere in `src/`.** **The
field's removal from the shape and the retirement of the one test that asserts its VALUE are the
implementer's and the test-writer's acts, in their own passes; THIS clause declares the member set those
passes will make true and touches no `src/**`, `tests/**` or `bindings/**` byte.**

**THE DERIVATION'S EXACTNESS, STATED AT ITS GATE SO A LATER READER CAN VERIFY IT RATHER THAN TRUST IT.** **The
gate is the crate's own predicate, `src/store.rs:2341`:**

```rust
fn key_fits(container: Kind, key: &Segment) -> bool {
    Kind::Map => matches!(key, Segment::Key(_)),
    Kind::Vec => matches!(key, Segment::Index(_)),
}
```

**A `Vec` container admits ONLY `Segment::Index` keys and a `Map` container ONLY `Segment::Key` keys, so the
key a container holds is a FUNCTION OF THE CONTAINER KIND AND THE POSITION AND OF NOTHING ELSE:** **for a
`Vec`, `Segment::Index(position)` REPRODUCES THE STORED VALUE EXACTLY** (the container's positions ARE its
contiguous indices, `§1.3`/`R-3`, so no second reading can disagree); **for a `Map`, the key is the
`HashMap`'s own key**, which the container already holds and which no derived value could improve on. **The
crate ALREADY performs the `Vec` half of this derivation in three places, which is the derivation's own
corroboration rather than this clause's inference: `Children::renumber` (`src/store.rs:262–275`) computes
`position as u64` per surviving reference; and BOTH assembler `Kind::Vec` arms (`src/store.rs:1166` and
`:1234`) loop `Segment::Index(index as u64)` off the loop index, the first carrying at its own site the
comment that the walk *"needs no key test to know it holds one"*.** **The JS codec never sees a key at all:
`StoreValue::Array(items)` is a plain `Vec<StoreValue>` and `bindings/js/src/facade.rs:949–950` converts it
positionally — `items.iter().map(…).collect()` — so the array's indices ARE the positions, exactly as the
architect's second directive says.** **AND `findAddress`'s boundary is unmoved by the derivation, because it
returns `&NodeRef` (`src/store.rs:1817`) and a derived key is still answerable at that boundary: the
reference's position within its container is what a derivation reads, and no caller receives a key the
container cannot hold.**

**AND THIS CLAUSE DOES NOT WEAKEN `register_marker` — THE REGISTER'S IDENTITY WAS NEVER CARRIED BY THE KEY.**
**`§0.4`'s marker clause and `DD-44`'s dated clause already declare the marker's `key` spelling to be *"a
MARKER and not a key"* (`src/records.rs:67–68`), the non-confusability carrier being
`register_marker` ALONE — `true` on exactly one reference in a store and `false` on every reference a
segment reaches.** **The member's departure REMOVES the collision those clauses declared rather than
disturbing the carrier:** the register's reference and a reference reached by the legal `""` key COINCIDE in
their `tier` and in their `node` shape, and they were ALREADY distinguished by `register_marker` and by
nothing else, so the property that carries the distinction is exactly the property this clause keeps.**

**WHAT READS THROUGH THIS CLAUSE, NAMED ONE SITE AT A TIME, SO NO LIVE STATEMENT IS LEFT ASSERTING A MEMBER
NO CODE CARRIES.** **`store-model.md`'s own sites:** **the table's `ChildAnchor` row above and the `⟶
AMENDED 2026-10-11` clause above it** stand byte-for-byte and are read through THIS clause — `key` is theirs
and is not the type's; **`§1.6` item 4 (c)'s dated clause** (its `NodeRef.anchor = ChildAnchor { key, tier,
register_marker }` spelling and its two `anchor.key` observables) is a QUOTATION of the 2026-10-11 filing and
is read through this clause, the operative carrier of the register's reference being `register_marker` and the
reference's `tier` (item (d)); and **`§2.1`'s *"THE REFERENCE'S OWN DRIVABLE OBSERVABLE"* clause**, which
spells `NodeRef.anchor.key` (the segment it is held at), is a LIVE OPERATIVE STATEMENT and is amended AT ITS
OWN SITE below. **`store-model.md`'s third site: `§2.1`'s fifth-correction clause** (the `⟶ AMENDED
2026-10-11` clause that reads the as-filed *"EMPTY segment marker"* as a `NodeRef.anchor.key` spelling) is
likewise a LIVE OPERATIVE STATEMENT — it declares itself *"the operative statement of the reference's
MARKER"* — and is amended AT ITS OWN SITE below, its non-confusability sentences standing as the whole of it.
**`contract.md`'s sites:** `§1.2`'s copy of the row and its dated clause (the pre-amendment
layer, read through this clause, which that clause itself declares); `§0.4`'s spelling-table `NodeRef` row and
its `⟶ AMENDED 2026-10-11` clause; `§0.4`'s marker clause and its second dated clause — all QUOTATIONS of
as-filed clauses, each read through this clause; `§5.7`'s `⟶ AMENDED 2026-10-11` clause; and `DD-44`'s and
`DD-53`'s `alt`/`what it REFUSES` cells, which are QUOTATIONS standing at their own rows. **(The sites in
this part that are NOT quotations — `§2.1`'s observable clause and `§2.1`'s fifth-correction clause — each
carry their own dated clause immediately below this one; the companion sites at `contract.md` are
dispositioned there at their own bytes.)**

**THE MONOTONIC CLAUSE, STATED OVER ANCHORS** (`P: §14 · A27`): **`rank(childAnchor.tier) ≤
rank(parentAnchor.tier)`**, read with `M-1` of **`contract.md §5.1`** — **⟶ REPOINTED 2026-10-11: this
citation's as-filed form was a bare `§5.1`; the tier clause is NOT a relocated span of this part (`§5` stays
in the contract document), so `§0.1` item 10(a)'s relocation rule does not apply to it and the section is
named with its path, which is what the citation resolves through either way.** **A child anchor whose tier outranks its parent's
fails: `ParentAnchorMonotonicityViolation` (`§8.1`).** **The register has no parent anchor and therefore
imposes no upper bound on its children — any of the three tiers may stand at a register key**
(`[P: §1 (the register is used for the tree's top-level nodes) + §12 · A18 | CONTRACT]`).
`[P: §1, §12 · A18, §14 · A27 · A30; L: §1-bis · anchor | CONTRACT]`

**⟶ AMENDED 2026-10-11 — THE REGISTER IS A PARENT ANCHOR AND ITS BOUND IS REAL: `§1.6` ITEM 3'S
NO-PARENT-ANCHOR CLAUSE IS SUPERSEDED, AND THE CLAUSE ABOVE'S LAST SENTENCE IS THEREBY WITHDRAWN**
(`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed clause stands byte-for-byte above and nothing is deleted**;
`A41`, `A42`, `A49`, `A50` and `A51` at `docs/specs/storeroom-listeners-proposal.md` `§9`/`§15`; the operative
clauses are `store-model.md §1.6`'s carrier-node clause and item 4 of it, and `contract.md §5.6`'s
`P-TP-6` row re-derivation). **THE AS-FILED CELL READ:** *"**The register has no parent anchor and therefore
imposes no upper bound on its children — any of the three tiers may stand at a register key.**"*
**THE OPERATIVE READING, IN THREE CLAUSES:** **(1) THE REGISTER HAS A PARENT ANCHOR, whose NODE is a DISTINCT
CARRIER NODE sitting ON THE REGISTER-AS-A-LINK and having no parent of its own** (`A41`; stated whole at
`§1.6`). **(2) THE REGISTER'S TIER STANDS ON THAT PARENT ANCHOR and is CONDITIONAL — `file` when the
construction's path is provided and passes the reachability test, `mem` otherwise — and it is FIXATED AT
CREATION** (`A42`, `A49`, `A50`; `DD-34`). **⟶ AMENDED 2026-10-13 — *"PASSES THE REACHABILITY TEST"* IS RE-READ AT ITS OPERATIVE FORM, AND A PATH THAT PASSES NOW LEAVES THE STORE'S OWN ZERO-LENGTH FILE BEHIND** (`RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands byte-for-byte and is read THROUGH this clause, which is the operative statement of WHAT PASSING THE TEST MEANS and OF WHAT PASSING IT LEAVES ON THE FILESYSTEM**; `contract.md §10.4`; `contract.md §7.1` steps 3-bis and 4b; `seams-and-lifecycle.md §7.1` step 3's dated clauses and step 4b; `DD-40`; `DD-45`; the `docs/decisions.md` rows of `2026-10-13`; `[T: the conditional tier's instrument and its filesystem footprint, at the cell that states the condition | CONTRACT]`): **A PROVIDED PATH PASSES IFF THE REACHABILITY PREDICATE'S TWO KERNEL-DECIDED ARMS ANSWER *"REACHABLE"* — a WRITE-MODE OPEN of the path where it EXISTS, and an EXCLUSIVE CREATE at it where the path is ABSENT — and the create is a REAL, ONCE-PER-CONSTRUCTION ACT rather than a dry run, so a provided path that passes IS LEFT AS A ZERO-LENGTH FILE: AN EMPTY FILE AND NO BYTE.** **IT IS THE STORE'S OWN STORAGE AND NOT A PROBE'S LITTER, its success IS the reachability answer, and it is NOT a second durability route — `contract.md §10.4` part 6 states the whole of that half.** **AND THE FAILURE ARM MOVES WITH THE INSTRUMENT: `EROFS` (a read-only mount), `EACCES` (an ACL deny or an ownership mismatch) and an absent parent directory each REFUSE the construction with `FilePathUnreachable` and return NO instance, so the register is never fixed at `file` over a path the exclusive create could not take** (`contract.md §8.1` #13; `contract.md §10.4` parts 1 and 5). **(3) THEREFORE THE MONOTONIC CLAUSE ABOVE REACHES THE OUTERMOST
BOUNDARY AND ITS BOUND IS REAL: a write whose tier outranks the register's own tier FAILS
`ParentAnchorMonotonicityViolation`, exactly as at any other link** — *"Fails as usual for an unpermitted
write"* (`A51`) — **so in a store created WITHOUT a path (register at `mem`) the `file` tier is UNREACHABLE
at register keys and, through the chain, below them**, and **in a store created WITH a reachable path
(register at `file`) all three tiers may stand at a register key** (`rank ≤ rank(file)` in each case).
**NOTHING ELSE IN THIS SECTION MOVES: the clause's own statement over two anchors, its `M-1` rank, the code
`ParentAnchorMonotonicityViolation` and the arm `F-6` are exactly as filed** (`[T: the re-read, with the
as-filed form named and nothing deleted, at this contract's sixth bounded amendment | CONTRACT]`).

### §1.3 The link and its container — `MAP` xor `VEC`, write-decided and read-inferred

**A `Link` has exactly one parent anchor and a container of child anchors** (`P: §1`). **The container is
one of exactly two kinds, and the kind is a property of the link:**

| Kind | Its key domain | Its iteration order | Where it may stand |
| --- | --- | --- | --- |
| **`MAP`** | string keys | **unordered** — the store declares **no order** over a `MAP`'s children | anywhere |
| **`VEC`** | index keys — non-negative integers, **contiguous from `0`** | the index order | **never at the register** (`P: §13 · A23`) |

**THE CONTAINER'S KIND IS DECIDED AT WRITE AND INFERRED FROM CONTENTS ON READ** (`P: §13 · A22`):
a write of a JSON **object** decides/uses `MAP`; a write of a JSON **array** decides/uses `VEC`; **a read
infers the kind from what the container holds** — the read does not carry a stored kind flag as its
authority. **A WRITE WHOSE KIND CONTRADICTS THE EXISTING CONTAINER FAILS**
(`P: §13 · A22`: *"Write attempting to add to vec when hashmap is used, or vice versa, fails"*), with
**`ContainerKindConflict`**, and **the failed write leaves the container, the node and the journal
untouched** (`DD-19`). **THE UNIQUENESS KEY IS THE PAIR `(key, tier)`:** **at most ONE child anchor per key
and tier** (`P: §15 · A34`), so **two versions of one key are two anchors**, one per tier.
**AND THE SEGMENT CLASS'S CONTRADICTION WITH THE PARENT CONTAINER'S KEY DOMAIN — THE STATE THIS CONTRACT
ANSWERS WITH A MEMBER OF `§8.1`'s CLOSED SET, AND NOT WITH A SILENT COERCION OR A SILENT MINT:** **the
container's key domain is part of the container's kind (`MAP` = string keys; `VEC` = index keys,
contiguous from `0`), so a write whose LAST segment's CLASS contradicts the resolved parent container's key
domain — a `string` segment aimed at a `VEC`, or an integer segment aimed at a `MAP` — is a KIND
CONTRADICTION, and its answer is the SAME member the value's kind contradiction answers:
`ContainerKindConflict`, with NOTHING INSTALLED (no anchor, no coercion, no container-kind change, and no
journal entry)** (`docs/specs/storeroom-native/write-and-read.md §3.4` arm `F-4`; `§8.1` #7; `§1.5`
items 2–3: **NO COERCION OCCURS**, and `"0"` is never `0`) (`[T: the key-domain arm, stated at this
contract's third bounded amendment — the gate-4 adversarial pass's `H-2`/`S-2` found no arm and no code for
the state, and the existing member is extended rather than a new one minted | CONTRACT]`).
**AND THE KIND TEST'S SUBJECT, STATED SO THE PARENT-VS-TARGET AMBIGUITY IS CLOSED HERE WHERE THE RULE
LIVES:** **the KIND a write's value must match is the kind of the TARGET SLOT — the value standing at the
`key` the write installs under — and NOT a sibling's or the container's other members'; so a parent whose
container holds NO anchor at `key` gives NO KIND TEST A SUBJECT (the write's own value decides the kind at
that slot, `W-4`), while a parent whose container DOES hold an anchor at `key` lets the value standing there
decide (`F-4` on a contradiction)** (`docs/specs/storeroom-native/write-and-read.md §3.4` arms `W-4`/`F-4`
and that section's target-slot clause; `DD-1`'s empty-container clause) (`[T: the kind test's subject,
stated here at this contract's third bounded amendment so the reading is where the rule is | CONTRACT]`).

**⟶ AMENDED 2026-10-11 — WHICH VERSION DECIDES WHEN SEVERAL STAND AT THE ADDRESSED KEY** (`RCA-8(d)`
ANNOTATE-BESIDE: **every sentence of the kind-test clause above stands byte-for-byte, its *"the value standing
at the `key`"* included; THIS clause is the operative statement of WHICH of several standing values the test
runs against**; the gate-4 adversarial pass's `AM-13`; `contract.md §2.3`; `P: §11 · A11`; `P: §14 · A28`;
`P: §13 · A21`; `write-and-read.md §3.4` arms `W-2`/`W-4`/`W-5`/`F-4` and that section's target-slot clause).
**THE STATE THIS DECIDES:** **two versions of one key are TWO ANCHORS** (`§1.3`'s `(key, tier)` uniqueness
rule, `P: §15 · A34`), **so a `MAP`-shaped `file` version and a literal `temp` version can stand at ONE key —
and the clause above, read in the singular (*"the value standing there"*), does not say which of them gives
the test its subject, while the answer is BEHAVIOUR-BEARING** (the `temp` version answering would let a `mem`
array write purge that version and mint a `VEC` beside the `MAP`). **THE RULE: the version that decides is
THE ONE THE WALK'S ZERO-TIER ARM SELECTS — THE LOWEST-PERSISTENCE ANCHOR AT THE KEY (`rank` ascending, `A11`'s
one predicate), exactly the version an UNQUALIFIED READ THERE WOULD ANSWER, and exactly the version `W-2`'s
re-mint resolves (`§2.3`; `P: §14 · A28`).** **So: a key holding ONLY one version tests against that version;
a key holding several tests against the LOWEST-PERSISTENCE one — the `temp` version of the example above —
and the OTHER versions at the key are NOT its subject; and where the write's own value kind contradicts that
selected version's node kind the write fails `F-4` and installs NOTHING** (`write-and-read.md §3.4`'s `F-4`
designation, which is evaluated BEFORE any pair-set mutation — `W-6`'s purge included). **TWO CONSEQUENCES,
STATED SO NEITHER IS DISCOVERED FROM A DRIVE:** **(i)** the test's subject is the SAME selection rule the read
runs, so *"the kind a write must match"* and *"the version a read answers"* are ONE rule and not two; **(ii)**
the subject is TIER-AGNOSTIC IN ITS RULE AND TIER-DECIDED IN ITS RESULT — no caller-passed tier qualifies a
write's kind test, because a write carries exactly one tier and that tier is the minted anchor's, not a
selection filter** (`§3.1` item 1; `A24`).
**NO `DECLARED-DEFAULT` ROW IS AUTHORED BY THIS CLAUSE AND THE DEFAULTS TABLE'S CENSUS STANDS UNMOVED: the
rule is `§2.3`'s OWN selection applied where the walk already applies it, so it takes no new default and
prices none.** **AND THIS CLAUSE'S REVERSAL INSTRUMENT, WHERE IT EVER NEEDS ONE: a bounded amendment of
`docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded** — **and a
reversal of `§2.3`'s own selection rule would first need a fresh ruling of the architect recorded as an ACTIVE
`docs/decisions.md` row** (`A28` rules it).
`[P: §1, §13 · A21 · A22 · A23, §15 · A34; T: the deciding version, stated where the kind test lives |
CONTRACT]`
`[P: §1, §13 · A22 · A23, §15 · A34; L: §1-bis · link/registry | CONTRACT]`

### §1.4 The admitted value taxonomy, and the node-kind decision a value forces

**A leaf's `value` is a primitive/literal — *"any primitive/literal format, but not objects/dicts/arrays or
other collections"*** (`P: §1`). **The admitted set is closed at exactly four classes:**

| # | Admitted | A write of it mints |
| --- | --- | --- |
| 1 | **`string`** | a `leaf` |
| 2 | **`boolean`** | a `leaf` |
| 3 | **a finite JSON number** (integral or fractional) | a `leaf` |
| 4 | **a JSON object** `{}`-form, **or** a JSON array `[]`-form | a **`branch`** whose container is `MAP`, resp. `VEC` |

**OUTSIDE the set, and each is a write-time failure rather than a silent coercion:** **`null`** ·
**`undefined`** · **a function** · **a symbol** · **a `BigInt`** · **a non-finite number (`NaN`,
`±Infinity`)** · **a cyclic object** · **a class instance, a `Map`/`Set`/typed array or any other
non-plain collection**. **The answer for each outside value is the SAME: `ValueNotAdmitted`, and no node
is minted** (`[T: §1.4's taxonomy is this contract's closure of the directive's own admission set (`P: §1`);
its carrier `A14`'s closed code set | DECLARED-DEFAULT]`, priced in `DD-24(e)`).
**THE KIND-CONTRADICTING VALUE IS A DIFFERENT FAILURE:** a value that *is* admitted but whose container
kind contradicts the target's is **`ContainerKindConflict`**, not `ValueNotAdmitted` — the taxonomy decides
*what may be stored at all*, the kind rule decides *whether it fits here*.
`[P: §1, §13 · A22; T: §1.4's closure | CONTRACT]`

**⟶ AMENDED 2026-10-11 — CLASS 3 IS NARROWED TO THE `f64`-EXACT RANGE, THE REFUSAL IS THE
OUT-OF-BOUNDS VALUE'S DECLARED ANSWER, AND THE BOUND'S PRECISE PREDICATE IS CARRIED AT THIS PART'S OWN
COPY OF THE TAXONOMY** (`RCA-8(d)` ANNOTATE-BESIDE: **the table's four rows, the OUTSIDE list and the
kind-contradiction paragraph above all stand BYTE-FOR-BYTE** — *a relocation is not a re-derivation*, and
this clause adds no class, drops none and moves no `§`-number; **the ruling: *"Refuse out-of-bounds
numbers"*, transcribed as `A60` at the FILED proposal `docs/specs/storeroom-listeners-proposal.md` `§21`,
whose resolving citation form is `P: §21 · A60`**; `contract.md §1.4` is the taxonomy's own home and this
clause is that clause's CARRIER copy, read together with it; `seams-and-lifecycle.md §7.2`'s added item 7;
`contract.md §5.2`'s `P-IM-1` scope clause; `DD-46`). **THE NARROWED CLASS 3, IN FOUR PARTS:**
1. **THE DOMAIN.** **Class 3 admits a FINITE JSON number IFF its `f64` carrier is EXACT** — the value the
   literal denotes and the value `contract.md §0.4`'s `Num(f64)` holds being the SAME value — **so the
   class is narrowed from *"a finite JSON number"* UNBOUNDED to *"a finite JSON number whose value the
   carrier holds exactly"*.**
2. **THE PREDICATE, IN ONE LINE.** **`n` is IN DOMAIN iff `n` is finite AND (`n` is not integral, OR
   `|n| ≤ 2^53`)** — **the `f64`-exact integral range**: every integer of magnitude at most `2^53` has an
   exact carrier, and an integral literal whose magnitude exceeds `2^53` is the ONE SHAPE whose value the
   carrier cannot hold (`9007199254740993` rounds to `9007199254740992`), **so `A60`'s own parenthetical
   (*"whether `2^53 + 1` is the ONLY shape refused"*) is answered YES.**
**AND THE BOUND'S PREDICATE IS RESTATED UNDER ITEM 1's OWN HEAD — THE EXACT REPRESENTABILITY READING —
SO THE BOUND AND ITS TRIGGER ARE ONE RULE AND NOT TWO** (`RCA-8(d)` ANNOTATE-BESIDE: **every clause above
stands BYTE-FOR-BYTE, and THIS addition is the predicate's own operative restatement**; `P: §21 · A60`;
item 1 above; `contract.md §1.4`'s clause 1; `DD-46`): **a number is IN DOMAIN if and only if its `f64`
CARRIER HOLDS IT EXACTLY, and an INTEGRAL LITERAL THE CARRIER CANNOT REPRESENT EXACTLY is the shape the
bound REFUSES `ValueNotAdmitted`** (`contract.md §8.1` #14) — **so the shape that falls OUTSIDE is
`2^53 + 1`** (`9007199254740993`, the integral literal just past the exact boundary, whose carrier rounds
it to `2^53`), **and the shapes that fall INSIDE are `2^53 + 2` and `2^53 + 4`**
(`9007199254740994` / `9007199254740996` — both ABOVE `2^53`, both integral, and each one HELD EXACTLY by
the carrier, the `f64` spacing at `2^53` being `2`) — **so the `|n| ≤ 2^53` spelling above is the bound's
DECIDABLE FORM and is not a wall at `2^53`: every integer of magnitude AT MOST `2^53` is exact and
therefore inside it, and an integer ABOVE `2^53` lies outside that spelling's range while the bound still
ADMITS it whenever the carrier HOLDS ITS VALUE.** **AND THE COARSER READING STANDS PRICED AND IS NOT THE
OPERATIVE ONE: refusing every integral magnitude above `2^53`** — which would refuse `2^53 + 2` and
`2^53 + 4` although each is exactly representable — **remains `contract.md`'s `DD-46` PRICED ALTERNATIVE,
priced at its `(b)` cell beside `A60`'s second candidate predicate and the wider-carrier alternative, and
reading THIS item that way is refused.** `[P: §21 · A60; T: the bound predicate under the exact-representability
reading, carried at this part's own taxonomy | DECLARED-DEFAULT]`
3. **THE DECIDING POINT.** **The predicate is decided over the value a JSON TEXT denotes AT THE MOMENT OF
   CONVERSION into the carrier — which is this directory's `seams-and-lifecycle.md §7.2` item 6 boot, where
   the `file` tier's text is converted — because a `Num(f64)` has ALREADY crossed that point: every value
   this part's own `StoreValue::Num` variant can hold is in range by construction, so no out-of-range
   number is presentable to the write arm on the surface `contract.md §0.4` declares.**
4. **THE DECLARED ANSWER, WHERE THE CONVERSION HAPPENS.** **Where a WRITE's value is outside the domain the
   answer is the EXISTING member `ValueNotAdmitted`, and NO node is minted, no anchor is installed and no
   journal entry is appended** (`contract.md §8.1` #14; `contract.md §1.4` clause 3); **where the `file`
   tier's TEXT carries the out-of-range integral literal — the one conversion this directory performs —
   the boot's answer is `DD-29`'s: that register key is DROPPED from the boot's register, the rest of the
   content loads, the instance IS returned, and NO code is produced for the dropped key.** **The two
   states' answers are DIFFERENT AND EACH DECLARED, and no member is added, no rank moves and the set's
   algebra stands (`11 + 2 + 1 + 1 = 15` ✓ — **⟶ RE-SPELLED 2026-10-15 BY THE `CODES`-CLASS SWEEP (`role_spec_writer`): this part's FILING-TIME algebra stands BYTE-FOR-BYTE above and is read THROUGH this clause; the LIVE ALGEBRA OF THE SET IS `11 + 2 + 1 + 1 + 1 = 16` ✓, the fifth term being `ConstraintListInvalid` at rank `16` (`§8.1`'s dated clause of 2026-10-15, the ONE home of the set's size)** — a NARROWED TRIGGER IS NOT A NEW MEMBER).**
**THE FIVE COMPONENTS, THE SEGMENT DOMAIN AND THIS PART'S CLOSURE ARE UNMOVED: the narrowing is a statement
about ONE class's DOMAIN and adds no record shape, no member and no `§`-number** (`§1.7`'s closure at
exactly five, `§1.5` item 1's two-class segment domain, and the closure arithmetic `5 = 5` all stand as
filed). **ITS `alt`, PRICED, AND ITS REVERSAL POINT ARE `contract.md`'s `DD-46`** — whose `(b)` cell prices
`A60`'s second candidate predicate (*"every number whose literal the carrier cannot represent exactly"*,
which would additionally refuse every non-integral spelling that is not a terminating binary fraction, a
class THIS TABLE'S ROW 3 admits in its own words *"integral or fractional"*) and the wider-carrier
alternative, and whose reversal cell names the instrument.
`[P: §21 · A60; T: class 3's narrowed domain, its predicate and its declared answer, carried at this
part's own taxonomy | DECLARED-DEFAULT]`

### §1.5 The address — grammar, segments, and the empty address

**AN ADDRESS IS A JS/JSON ARRAY OF SEGMENTS** — *"a JS/JSON array containing the path to walk through the
tree, starting from the register"* (`P: §1`) — and **not a delimited string** (`DD-24(d)`).

1. **The segment domain is closed at exactly two classes:** a **`string`** (a key) and a **non-negative
   integer** (an index). **A negative integer, a non-integer number, `null`, `undefined`, a boolean, an
   object, an array or a function as a segment is OUTSIDE the domain and fails `AddressMalformed`.**
   **The empty string `""` is a legal `string` segment and is a legal key** (`[T | DECLARED-DEFAULT]`;
   its alternative — refusing `""` — is priced at `DD-24(c)`).
   **⟶ AMENDED 2026-10-11 — THE LEGALITY ABOVE STANDS WHOLE, AND IT IS THE COLLIDING VALUE THE REGISTER'S OWN
   REFERENCE CARRIES** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed sentence stands byte-for-byte and this
   clause adds NO restriction on it**; `AM-11`; `§1.6` item 4 (c)'s dated clause; `§2.1`'s fifth correction;
   `DD-44`'s dated clause; `[T: item 1's legality, read beside the register's own reference | CONTRACT]`):
   **`""` remains a legal `string` segment, a legal key and a LEGAL, WRITABLE register key at the register's own
   tier — and the register's OWN reference's `anchor.key` is that SAME value (`Segment::Key(String::new())`),
   which is why the register's reference and a reference reached by the legal key `""` are distinguished by the
   `register_marker` member and NOT by the key value** (`§0.4`'s marker clause is the ONE home of the marker's
   spelling and of the collision's declaration). **No segment-class is added, the domain stays closed at
   exactly two classes, and the alternative priced above (*"refusing `""`"*, `DD-24(c)`) stays priced and
   UNADOPTED.**
   **⟶ ADDED 2026-10-11 — THE SEGMENT DOMAIN'S OWN UPPER BOUND, DECLARED AS A CLAUSE OF THE DOMAIN AND READ
   BESIDE THE AS-FILED SENTENCE IT COMPLETES.** `RCA-8(d)` ANNOTATE-BESIDE: **the as-filed sentence above —
   *"The segment domain is closed at exactly two classes: a `string` (a key) and a non-negative integer (an
   index)"* — stands BYTE-FOR-BYTE and is RE-EMITTED here because this clause completes it and never replaces
   it; THIS clause is a PURE INSERTION: it adds no class, drops none, mints no code, opens no `§`-number, no
   `DD` row, no `PAR` row and no `P-*` row, and it re-decides no ruling.** **THE BOUND, AS THE DOMAIN'S OWN
   DECLARATION — ONE LINE, AND IT IS THE WHOLE OF THIS CLAUSE'S NEW TEXT:** **an index `n` is IN DOMAIN iff
   `0 ≤ n ≤ Number.MAX_SAFE_INTEGER` (`9_007_199_254_740_991`, `2^53 − 1`, INCLUSIVE); THE INDEX CLASS'S DOMAIN
   IS BOUNDED ABOVE, and an INTEGRAL SEGMENT ABOVE THAT BOUND IS **OUTSIDE** THE SEGMENT DOMAIN.** **The
   as-filed `string` half, the as-filed non-negative-integer half's lower bound (`0`) and every other outside
   class (`negative integer` · `non-integer number` · `null` · `undefined` · `boolean` · `object` · `array` ·
   `function`) stand exactly as the sentence above prints them** — **so ONE clause is added to item 1 and the
   item's two classes stay TWO.** **AND THE ANSWER, NAMED SO THE DOMAIN'S HOME AND THE ANSWER'S HOME ARE
   DISTINCT AND BOTH RESOLVE:** **an out-of-range integral segment is answered by the WALK's own `L-1` arm —
   `store-model.md §2.2`'s arm table, whose code is `AddressMalformed`** — **and by every verb route that
   reaches its target through that walk.** **THE ENFORCING SITE, NAMED AS EVIDENCE AND NEVER AS THE RULE'S
   HOME:** **the code asks this ONE shared question at `src/value.rs`'s `Segment::is_in_domain`, whose `Index`
   arm is `n <= 9_007_199_254_740_991`** — **the predicate the walk's `L-1` step, `write`'s target-segment arm,
   `delete`'s target-segment arm, `listen`'s per-segment loop and the construction's `listeners[]`
   classification each ask, so ONE bound is the bound every route agrees on.** **The site is where the rule is
   ENFORCED; this item is where it is DECLARED** — **a code comment is not a claim's authority, and this
   directory's clauses are.** **AND WHAT THE BOUND'S CARRIER IS, STATED SO THE TWO ARE NOT READ AS ONE: the
   bound is the JS consumer's EXACT integral range (`Number.MAX_SAFE_INTEGER`, the largest integral `number` a
   JS consumer can hold, compare and transmit exactly), and it is DELIBERATELY NARROWER than the `u64` the
   `Segment::Index` carrier could hold** — **so the clause is about the DOMAIN and not about the carrier's
   width.** **AND ONE CELL THIS CLAUSE LEAVES WHERE IT STANDS, NAMED SO THE BOUND IS NOT READ AS ITS HOME: the
   admitted VALUE taxonomy's own numeric bound — class 3's `f64`-exact range, `store-model.md §1.4`'s narrowed
   class 3 — is a rule about a VALUE and is `§1.4`'s; this clause is a rule about a SEGMENT and is item 1's.
   Two subjects, two clauses, no second home.**
   `[P: §1 (the address clause: *"a JS/JSON array containing the path to walk through the tree"*); T: the index
   class's upper bound, declared as the domain's own clause at the bounded declaration pass of 2026-10-11, which
   authors no `DD` row and moves no id family
   | DECLARED-DEFAULT]` **ITS `alt`, PRICED, AND ITS REVERSAL POINT** (`contract.md §0.1` item 3 — *"always with
   its alternative priced"* — and item 11's closed class set): **the alternative — leaving the index class
   UNBOUNDED BELOW `u64::MAX`, so the domain is exactly `0 ≤ n ≤ u64::MAX` and an integral segment above
   `2^53 − 1` is IN DOMAIN — is priced at `crossing.md §1.3`'s `AddressArg` row 3 range clause, where it was the
   filed reading: it admits a `number` no JS consumer can spell exactly, and it is the state in which two
   distinct spellings of one address share ONE store address through the carrier's saturating cast, which
   `A76`'s second part and `§1.8`'s no-repair prohibition forbid. The alternative is available only with a
   fresh ruling of the architect recorded as an ACTIVE `docs/decisions.md` row, followed by a bounded amendment
   of `docs/specs/storeroom-native/`.** **REVERSAL POINT of the operative clause: a bounded amendment of
   `docs/specs/storeroom-native/`, owned by `role_spec_writer`, with the amendment row recorded.**
2. **NO COERCION OCCURS.** `"0"` is a **string key**; `0` is **an index**. They are never the same
   segment, and **the store never coerces one into the other** — that separation is what keeps `MAP` and
   `VEC` distinguishable on read (`DD-24(c)`).
3. **A `string` segment resolves against a `MAP` and against the register; it resolves NOWHERE against a
   `VEC`** (the `VEC`'s key domain is indices). **An integer segment resolves against a `VEC`, and NOWHERE
   against the register** — *"the REGISTRY IS ALWAYS A HASHMAP, so it carries no ordered-vector form and an
   index-shaped segment has no index semantics to reach"* (`P: §13 · A23`), so **an integer segment aimed
   at the register fails `AddressNotFound`** — the register is not a contradicted container, it is a
   container that does not hold that key (`[T: §2.2's arm `L-INT-REG`, whose code is `AddressNotFound` and
   not `ContainerKindConflict` | CONTRACT]`).
4. **THE EMPTY ADDRESS (`address.length === 0`) IS A VALID ADDRESS** (`P: §13 · A25`: *"Empty address
   resolves to register"*), **and it resolves to the REGISTER.** **The directive's own earlier phrase
   *"An address.len == 0 resolves to the parent node of the register (which otherwise cannot be addressed)"*
   (`P: §1`) is SUPERSEDED IN REFERENT, NOT IN EXISTENCE** (`R: §16.2`'s `O-7` row): the register's
   *"parent node"* under `A18` is the register-as-link itself, and the later ruling's words are operative.
   **⟶ AMENDED 2026-10-11 — THE REFERENT THIS ITEM'S RE-READING NAMED IS NOW A REAL ANCHOR AND A REAL NODE,
   AND THE ITEM IS READ THROUGH `§1.6` ITEM 4** (`A41` + `A42`; `RCA-8(d)` ANNOTATE-BESIDE: **every sentence
   above stands byte-for-byte**): **the register's *"parent node"* is the DISTINCT CARRIER NODE `A41`
   rules, sitting on the register-as-a-link and having no parent of its own — so the phrase is not merely
   superseded in referent, it HAS the referent the later ruling names — and the register's PARENT ANCHOR,
   whose address is the empty set, is the anchor on which its own CONDITIONAL tier stands (`§1.6` item 4).**
   **A read at the empty address returns an object containing the ENTIRE registry** (`P: §13 · A25`) —
   **and the HOME map is NOT inside that object** (`A48`; `write-and-read.md §6.5` item 8).
   **The address is NOT malformed for being empty** — this is the one place where this unit's contract
   **intentionally differs** from the corpus's *"AN ADDRESS IS A NON-EMPTY SEGMENT LIST"*
   (`[P: §4 · X-6 (the directive's clause beside the corpus's, a conflict the architect ruled
   intentional); P: §11 · A9 | NEGATIVE]`).
5. **A single address reaches exactly one node.** **Every minted node is reachable by exactly one address
   path** (`DD-6`), and **no two distinct addresses resolve to one node**.

`[P: §1, §4 · X-6, §11 · A9, §13 · A23 · A25; L: §1-bis · address | CONTRACT]`

### §1.6 The register — keyed by names, always a hashmap, no parent anchor

**The `registry` (the register) is the root container.** **It acts as a link** (`P: §12 · A18`), and it
differs from an ordinary link in exactly three ways, all of them ruled:

1. **its child anchors are associated with KEYS, not indices** (`P: §1`;
   `L: §1-bis · link/registry`);
2. **it is ALWAYS A HASHMAP** (`P: §13 · A23`) — **no ordered-vector form and no index semantics**;
3. **it has NO parent anchor** — it is the walk's start, and a register-held root node's anchor interfaces
   that node and the register-as-link exactly as any other anchor does (`P: §12 · A18`). **⟶ SUPERSEDED
   2026-10-11 BY `A41` — the as-filed words above stand byte-for-byte and are read through item 4 below,
   which is the operative clause: the register HAS a parent anchor, and this item's *"NO parent anchor"* is
   WITHDRAWN as a statement about the register-as-a-link's own parent anchor while its SECOND half — *"it is
   the walk's start"* and the root node's anchor interface — stands unchanged.**
4. **⟶ ADDED 2026-10-11 — THE REGISTER'S PARENT ANCHOR, ITS DISTINCT CARRIER NODE, AND ITS OWN
   CONDITIONAL TIER, FIXED AT CREATION** (`A41` + `A42` + `A49` + `A50` + `A51`;
   `docs/specs/storeroom-listeners-proposal.md` `§9`, `§15` and `§17`; **the operative re-read this item
   makes of item 3 above and of `§1.5` item 4**). **THE CLAUSE, IN FOUR PARTS:**
   - **(a) THE PARENT ANCHOR.** **The register ACTS AS A LINK (`A18`) and, being a link, it CARRIES ITS OWN
     PARENT ANCHOR** (`A41`: *"Register has a parent carrier node (which sits on the register-as-a-link, and
     does not itself have a parent)"*). **The anchor's ADDRESS IS THE EMPTY SET `[]`** — the architect's own
     clarification, filed at the proposal's `§8`: *"Register has a parent anchor, whose address is an empty
     set (i.e.[])"*.
   - **(b) THE CARRIER NODE, AND IT IS DISTINCT.** **That parent anchor's `node` is a DISTINCT CARRIER NODE,
     which SITS ON THE REGISTER-AS-A-LINK and HAS NO PARENT OF ITS OWN** (`A41`). **It carries the listener
     references** — the proposal's third sentence (*"When the register is created, its parent node carries
     all listener references"*) is thereby given its referent, and **the register's carrier node borrows
     from the home map (`A45`), which the construction has already populated (`A56`; `§7.1` of the
     `seams-and-lifecycle` part) — so it carries the listener references FROM THE OUTSET.**
   - **(c) ITS OWN RECORD SHAPE, DECLARED SO THE COUNT OF `§1.7` DOES NOT MOVE.** **The carrier node is a node
     at the empty address carrying the listener references and NOTHING ELSE this part reads as a graph
     record: no readable value, no container, no child anchor of its own key, and no tier of its own** —
     **the register's tier stands on the register's PARENT ANCHOR (`A27`'s carrier rule) and never on the
     carrier node** (`DD-33`). **`§1.7`'s closure at exactly five components and its *"There is NO sixth
     component"* therefore stand UNWEAKENED**, and a read at `[]` still answers the whole register (`A43`,
     which CONFIRMS `§1.5` item 4's second half). **⟶ AMENDED 2026-10-11 — THE MARKER THAT REFERENCE CARRIES,
     DECLARED AT THIS ITEM SO THE DRIVE'S AND `DD-44`'s CITATION OF (c) RESOLVES** (`RCA-8(d)`
     ANNOTATE-BESIDE: **every sentence of (c) above stands byte-for-byte, its *"nothing else this part reads as
     a graph record"* included**; `AM-11`; `A41`; `§1.5` item 1's dated clause; `DD-44`'s dated clause;
     `[T: item (c)'s marker, stated beside its carrier-node clause | CONTRACT]`): **the register's own
     reference — the one whose address IS the empty set (item (a)) — carries
     `NodeRef.anchor = ChildAnchor { key, tier, register_marker }` as the reference's anchor: its `key` is
     `Segment::Key(String::new())` (the EMPTY segment marker — the SAME value the LEGAL register key `""`
     carries, `§1.5` item 1), its `tier` is the register's own CREATION-FIXED conditional one (item (d)), and
     its `register_marker` is `true` — TRUE on exactly ONE reference in a store, this one — while every
     reference a segment reaches carries `false`.** **The carrier node's OWN record shape is UNMOVED by that:
     the marker is a property of the ANCHOR and not a member of the carrier node, (c)'s *"no readable value, no
     container, no child anchor of its own key, and no tier of its own"* stands whole, and `§1.7`'s closure at
     exactly five components stands UNWEAKENED.** **The two references' declared observables, in one line: the
     `anchor.key` values COINCIDE (`findAddress([], t).anchor.key == findAddress([""], t).anchor.key`, both
     spelling `Segment::Key(String::new())`) and the `anchor.register_marker` values DIFFER
     (`findAddress([], t).anchor.register_marker == true` against
     `findAddress([""], t).anchor.register_marker == false`) in a store whose register holds a `""` key**
     (`§2.1`'s fifth correction; `contract.md §0.4`'s marker clause).
   - **(d) ITS CONDITIONAL TIER AND THE FIXITY OF IT.** **The register's tier is `file` when the
     construction's path is PROVIDED AND PASSES the reachability test, and `mem` OTHERWISE; and it is FIXED
     AT CREATION and NEVER MOVES** (`A42`. *"Register has the file tier, if a configured save file is
     present, or mem otherwise"*; `A49`'s *"then create the registry at `file` tier. Otherwise, create at
     `mem`"*; `A50`'s *"Fix at creation"*). **Its consequences, each stated because each is observable:**
     **⟶ AMENDED 2026-10-13 — THE CONDITION IS DECIDED BY THE KERNEL, AND PASSING IT LEAVES A ZERO-LENGTH FILE: this item's *"PROVIDED AND PASSES"* is re-read at the operative form `contract.md §10.4` states — the two kernel-decided arms and the construction's own exclusive create at a provided, absent path — so a `file` register now means the store LEAVES ITS OWN ZERO-LENGTH FILE at the path (AN EMPTY FILE AND NO BYTE, and not a second durability route), while the tier's FIXITY, the item's two consequences (i)/(ii) below and every other word of this item are UNMOVED** (`RCA-8(d)` ANNOTATE-BESIDE: **the item stands byte-for-byte and is read THROUGH this clause**; `contract.md §10.4`; `contract.md §7.1` step 4b; `seams-and-lifecycle.md §7.1` step 4b; `[T: this item's reconciliation, so this part and the contract document do not drift | CROSS-REF]`). **(i)** **the empty-address reference must now answer THE REGISTER'S OWN TIER, whatever `t` the caller
     passed** — **`§1.5` item 4's *"`findAddress([], file)` and `findAddress([], temp)` answer the SAME
     reference"* is SUPERSEDED IN ITS TIER HALF by this clause and is read through it** (the reference is
     still ONE reference, the register's — **what changes is that the tier it asserts is the register's own
     conditional one and never the caller's `t`**); and **(ii)** **the register's bound is REAL (`A51`): a
     write whose tier outranks the register's own tier FAILS `ParentAnchorMonotonicityViolation`, exactly as
     at any other link** (`contract.md §5.6`'s `P-TP-6` row, re-derived by this amendment); **so in a
     `mem`-register store the `file` tier is UNREACHABLE at register keys and, through the monotonic chain,
     at every address below them** — the state `A19`'s purge chain and `A15`'s `temp`→`mem`→`file` chain make
     meaningful, stated here rather than left to be discovered.
   **AND THE TWO THINGS THIS ITEM DOES NOT MOVE, NAMED SO ITS SCOPE IS NOT OVER-READ:** **item 1 (the
   register's keys are KEYS, not indices), item 2 (`it is ALWAYS A HASHMAP`) and item 3's second half (the
   walk's start and the root node's anchor interface) stand exactly as filed**, and **the register's
   read — the whole registry as an object (`§4.2` `R-5`, `A25`) — is untouched: the HOME map is outside the
   graph and is not inside that read** (`A48`; `write-and-read.md §6.5` item 8).
   `[P: §1, §8 (the clarification), §9 · A41 · A42, §11 · A18 · A23, §13 · A23, §15 · A49 · A50 · A51,
   §17 · A56; T: item 4's own statement | CONTRACT]`

**A register key's child anchor carries a tier exactly as any other child anchor does**, and **the register
imposes no monotonicity bound on it** (`§1.2`). **The register's key domain is the caller's own strings**
(`P: §13 · A23`'s printed silence read with the directive's keyed-not-indexed clause
`[P: §1, §13 · A23 | DECLARED-DEFAULT]`, priced at `§1.5` item 3).
**⟶ AMENDED 2026-10-11 — THE SENTENCE *"the register imposes no monotonicity bound on it"* IS SUPERSEDED BY
`A51`, AND ITS AS-FILED WORDS STAND ABOVE BYTE-FOR-BYTE** (`A42` + `A51`; `RCA-8(d)` ANNOTATE-BESIDE): **the
register's parent anchor CARRIES a tier (`§1.6` item 4 (d)) and the register's bound is therefore REAL** —
*"Fails as usual for an unpermitted write"* (`A51`) — **so the operative reading of the sentence above is
ITEM 4 (d)'s: with a `file` register all three tiers may stand at a register key (`rank ≤ 2` in each case),
and with a `mem` register a `file`-tier write at a register key FAILS `ParentAnchorMonotonicityViolation`.**
**The FIRST half of the as-filed sentence — *"a register key's child anchor carries a tier exactly as any
other child anchor does"* — is unweakened and stands** (`A27`; `contract.md §5.6`'s `P-TP-6` row re-derivation).
`[T: the supersession, with the as-filed form named and nothing deleted | CONTRACT]`
`[P: §1, §12 · A18, §13 · A23; L: §1-ter, §1-bis · link/registry | CONTRACT]`

### §1.7 The tier is a PROPERTY, not a data structure

**`tier` is not a record kind.** *"Tier is not a data structure, it is a property"* (`P: §12 · A17`), so
**the store's data structures close at exactly five — `leaf` · `branch` · `anchor` · `link` · `registry`**
— and **the tier is carried as the child anchor's `tier` property** (`§1.2`; `P: §12 · A17` read with
`P: §14 · A27`). **There is NO sixth component, no `Tier` record type, and no tier node.**
**The domain, the rank and the lifetime are `§5.1`'s.**
`[P: §12 · A17, §14 · A27; L: §1-bis · tier | CONTRACT]`

---

## §2. `findAddress` and the walk — the shared resolver

### §2.1 The resolver's signature and return shape

**`findAddress(address, tier?) → NodeRef`.** **`findAddress` RETURNS A REFERENCE** (`P: §13 · A26`:
*"find address returns reference"*) — **a `NodeRef`, which is the store's own handle to a node and NOT a
copy of it.** **It is the ONE shared resolution function** (`P: §1`: *"Use a shared `findAddress`
function"*), and **`read`, `write`, `delete` and `watch` each reach their target through it and through no
second resolver.** **A `NodeRef` is a reference and not a value**: mutating through it mutates the store,
and **it is not addressable, not enumerable and not serializable** — its boundary crossing is parked
(`R: §17.1`; `[T: §2.1 names the REFERENCE the ruling requires and declares no boundary shape | CONTRACT]`).
**THE REFERENCE'S OWN DRIVABLE OBSERVABLE, STATED SO THE CLAUSE IS NOT READ AS UNCHECKED:** **the returned
`NodeRef` carries the anchor's OWN properties — `NodeRef.anchor.key` (the segment it is held at) and
`NodeRef.anchor.tier`** (`§1.2`'s `ChildAnchor`; `§0.4`'s spelling) — **and `findAddress(address, t)`
answers a reference whose `anchor.tier` is `t` in exactly the states **`§5.4`'s `P-SM-4` row (a)** declares**
(**⟶ REPOINTED 2026-10-11: the as-filed form was the bare `§5.4` (a); `§5.4` is printed twice in the contract
document and this citation names the ROW's half, so the row id is named — `§5.2`'s dual-mapping disclosure**).
**⟶ AMENDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING: `NodeRef.anchor.key` IS RE-SPELLED
`NodeRef.anchor.tier` BESIDE `NodeRef.anchor.register_marker`, AND THE REFERENCE'S DRIVABLE OBSERVABLES ARE
THOSE TWO.** **This is a LIVE OPERATIVE STATEMENT and not a quotation, so it is amended rather than merely
read through: `key` having LEFT the `ChildAnchor` member set (`§1.2`'s dated clause of this date), an
observable spelled `NodeRef.anchor.key` would assert a member the declared shape does not carry.** **THE
CLAUSE'S SUBSTANCE IS UNMOVED: the reference still carries the anchor's OWN properties, `findAddress(address,
t)` still answers a reference whose `anchor.tier` is `t` in exactly `P-SM-4` row (a)'s states, and the
mutation half below stands whole.** **WHAT REPLACES THE KEY AS THE REFERENCE'S SECOND DRIVABLE OBSERVABLE IS
THE TIER'S OWN COMPANION, `register_marker` — the property `§1.2`'s dated clause and `§0.4`'s marker clause
declare TRUE on the register's own reference alone and FALSE on every reference a segment reaches** — **so
every state this clause makes drivable stays drivable, and the address-derived identity a caller might have
read from a key is derived from the ADDRESS the caller supplied and not from a member the shape carries**
(`§1.2`'s dated clause of 2026-10-21; `§1.6` item 4 (c)'s dated clause, read through it; `DD-44`;
`[T: the reference's drivable observables, re-spelled so no clause reads a member the declared shape does not
carry | CONTRACT]`).
**THE CLAUSE'S
MUTATION HALF — *"mutating through it mutates the store"* — HAS NO DRIVE IN THIS UNIT'S SURFACE, because
the contract declares NO mutating API taking a `NodeRef`; it is carried as an `OWED` item with its owner and
its positive revisit condition at `§0.2 · O-1`, NOT dropped and NOT weakened.** (`[T: the reference
discipline's drivable half, stated at this contract's second bounded amendment | CONTRACT]`)

**THE EMPTY ADDRESS'S REFERENCE — THE STATE THE RESOLVER CANNOT ANSWER WITH AN ANCHOR'S OWN PROPERTIES, SO
THE REGISTER'S OWN RULE DECIDES IT** (`[T: the empty address's reference, stated at this contract's third
bounded amendment — the gate-4 adversarial pass's `H-9`/`S-4` found the state undeclared and a fabricated
anchor standing at it | CONTRACT]`): **`findAddress([], t)` — and every walk at the empty address, `L-0`'s
own state — resolves to the REGISTER, which HAS NO PARENT ANCHOR (`§1.6`), so NO ANCHOR OF A CALLER-NAMED
KEY AND NO CALLER-PASSED TIER IS READ INTO THE RETURNED REFERENCE: the returned `NodeRef` is the store's
handle to the REGISTER itself, and its `anchor` carries the register's OWN identity marker — the register is
the walk's start and is reached by NO segment, so its reference carries the EMPTY segment marker, and its
`tier` member is the one `§1.6` item 3's no-parent-anchor rule leaves **`§5.4`'s `P-SM-4` row (a)** unable to assert — and
NEVER the caller's `t`.** **A `tier` a caller passes with the empty address is therefore NOT an observed
property of the answer: it selects nothing, because `L-0` terminates before any step consults a container for
a tier, and the register carries no tier of its own (`§1.6` item 3; `P: §13 · A23`).** **Consequence, stated
so it cannot be read as a fabricated anchor: `findAddress([], file)` and `findAddress([], temp)` answer the
SAME reference — the register's — and neither answer asserts a floor or a tier the register does not have.**

**⟶ AMENDED 2026-10-11 — THE REGISTER'S EMPTY-ADDRESS REFERENCE, RE-READ THROUGH `§1.6` ITEM 4: the block
above stands byte-for-byte with FOUR corrections, and not one of them moves its CONCLUSIONS** (`A41` +
`A42` + `A49` + `A50`; `RCA-8(d)` ANNOTATE-BESIDE). **THE FOUR CORRECTIONS, EACH IN THE BLOCK'S OWN TERMS:**
**(1)** the as-filed clause *"resolves to the REGISTER, which HAS NO PARENT ANCHOR (`§1.6`)"* is
**SUPERSEDED** — the register HAS a parent anchor, whose node is the distinct carrier node and whose address
is the empty set (`§1.6` item 4 (a)/(b)) — **and the block's conclusion still holds, now grounded on THAT
anchor rather than on its absence: the reference carries NO ANCHOR OF A CALLER-NAMED KEY and NEVER the
caller's `t`.** **(2)** the as-filed clause *"its `tier` member is the one `§1.6` item 3's no-parent-anchor rule
leaves `§5.4`'s `P-SM-4` row (a) unable to assert"* is **SUPERSEDED**: **its `tier` member IS the register's
OWN CONDITIONAL TIER — `file` or `mem`, FIXED AT CREATION (`A42`/`A49`/`A50`; `DD-34`) — and it IS
assertable.** **(3)** the as-filed clause *"the register carries no tier of its own (`§1.6` item 3;
`P: §13 · A23`)"* is **SUPERSEDED** for the same reason: **`A23` rules the register's CONTAINER KIND and says
nothing about its tier, and `§1.6` item 4 gives it one.** **(4)** the consequence sentence is **RE-STATED**,
because it is now a different and READABLE observable: **`findAddress([], file)` and `findAddress([], temp)`
still answer the SAME reference — the register's — and that one reference's `anchor.tier` is THE REGISTER'S
OWN TIER in every case**, so a caller's `t` still selects nothing (unchanged), **while
`findAddress([], mem).anchor.tier == Tier::Mem` holds in a `mem`-register store and
`findAddress([], file).anchor.tier == Tier::File` holds in a `file`-register store.** **THE PROOFREADING
GATE'S AS-BUILT RECORD, PRINTED IN THE CONTRACT DOCUMENT'S `§2.1` BESIDE THIS CLAUSE, IS THEREBY ANSWERED
RATHER THAN LEFT OPEN** — it found the as-filed cell *"SILENT ON `mem` AND ASSERTIVE ON `file`/`temp`"* and
its *"NEVER the caller's `t`"* reading *"contradicted by the register's own case at `mem`"*: **with `A42` read
in, the `mem` case is exactly the register's own tier in a path-less store and the `file` case is the
register's own tier in a pathed store, and NEITHER case is the caller's `t`.** **The rows that observe it are
`P-TP-6`'s register half and `P-TP-7`'s register-reference cell** — **⟶ REPOINTED 2026-10-11: the as-filed
form read *"`P-TP-7`'s register-reference cell and `P-TP-6`'s register half"*, and this part's two citations
now name the ROWS THE CONTRACT CARRIES THE CELLS IN: the register's own tier is observed by `P-TP-7`'s
REGISTER-REFERENCE CELL — `findAddress([], t)` answering the register's own creation-fixed tier — which is
authored at that row's `§5.7` at this contract's sixth bounded amendment, and by `P-TP-6`'s REGISTER DRIVES,
which are the six register drives of its `S-MONO` census (`9 + 6 = 15`); the as-filed order of the two names
is kept and each name is now printed beside the `§` that carries it** (`[T: the four corrections, with the
as-filed forms named and nothing deleted, taken at this contract's sixth bounded amendment | CONTRACT]`).

**⟶ AMENDED 2026-10-11 — THE FIFTH CORRECTION: THE EMPTY-ADDRESS REFERENCE'S MARKER SPELLED, AND THE
OBSERVABLE THAT CARRIES ITS NON-COLLISION** (`RCA-8(d)` ANNOTATE-BESIDE: **the block above and its FOUR
corrections stand byte-for-byte, and this clause is the operative statement of the reference's MARKER; it moves
none of the four's conclusions and re-states none of them**; `AM-11`; `§1.5` item 1's dated clause; `§1.6` item
4 (c)'s dated clause; `§0.4`'s marker clause; `DD-44`'s dated clause; `[T: the fifth correction, with the
as-filed reading named | CONTRACT]`): **the as-filed clause *"its reference carries the EMPTY segment marker"*
reads through this clause as `NodeRef.anchor.key = Segment::Key(String::new())` — a spelling a reference
reached by the LEGAL register key `""` ALSO carries (`§1.5` item 1, which stands UNMOVED: `""` is a legal
`string` segment, a legal key and a legal writable register key) — so the register's own reference and the
reference of a store's `""` register key spell the SAME `anchor.key`, and THAT COINCIDENCE IS DECLARED HERE
AND NOT DENIED.** **The reference's non-confusability is carried by the `register_marker` member ALONE:
`findAddress([], t).anchor.register_marker == true` and `findAddress([""], t).anchor.register_marker == false`
in a store whose register holds a `""` key, with the pair `(register_marker, tier)` beside it — so
`findAddress([], t)` and `findAddress([""], t)` are two DISTINGUISHED references at a DECLARED OBSERVABLE that
a drive FAILS them on.** **The reference's `tier` half stands exactly as the FOUR corrections state it (the
register's own creation-fixed tier, whatever `t` the caller passed), the register is still the walk's start and
is reached by NO segment, and no member of this clause is readable off the carrier NODE (`§1.6` item 4 (c)).**

**⟶ AMENDED 2026-10-21 (`role_spec_writer`) ON THE ARCHITECT'S RULING — THIS CLAUSE'S SPELLING SENTENCE IS
WITHDRAWN WITH THE MEMBER IT SPELLED, AND ITS NON-CONFUSABILITY SENTENCES STAND AS THE WHOLE OF IT**
(`§1.2`'s dated clause of this date; the architect's two directives, verbatim, stand there; `A129` (3)'s
classifying instrument). **THIS SITE IS A LIVE OPERATIVE STATEMENT AND NOT A QUOTATION — it declares itself
*"the operative statement of the reference's MARKER"* — so it is amended HERE rather than merely cited,
because a sentence spelling `NodeRef.anchor.key` would assert a member the declared shape does not carry.**
**EVERY BYTE OF THE CLAUSE ABOVE STANDS AND IS READ THROUGH THIS ONE; NOT ONE WORD IS DELETED.** **WHAT
MOVES: the as-filed clause *"its reference carries the EMPTY segment marker"* no longer READS AS a
`NodeRef.anchor.key = Segment::Key(String::new())` SPELLING, because the register's own reference carries NO
`key` member — so the declared COINCIDENCE of two `anchor.key` values does not arise and needs no
declaration.** **THE CLAUSE'S OWN CONCLUDING SENTENCES ALREADY STOOD WITHOUT IT — *"The reference's
non-confusability is carried by the `register_marker` member ALONE"* — which is this amendment's whole
content read at the clause's own words, and the surviving observable, repeated here so no reader must reach
for the withdrawn half, is `findAddress([], t).anchor.register_marker == true` against
`findAddress([""], t).anchor.register_marker == false` in a store whose register holds a `""` key.** **THE
CLAUSE'S OTHER HALVES ARE UNMOVED: the `tier` half, the register's standing as the walk's start reached by NO
segment, the four corrections above, and item 4 (c)'s rule that no member is readable off the carrier NODE**
(`§1.2`'s dated clause of 2026-10-21; `DD-44`'s dated clause; `[T: the fifth correction's spelling half
withdrawn with the member it spelled, its non-confusability carrier unmoved | CONTRACT]`).
**`tests/gate4_red_set_fix.rs`'s `ng_l_the_register_marker_against_the_legal_empty_key` — the drive that
carries this state — is the TEST's to re-author: it asserts the MARKER pair above and the DECLARED key-value
collision, and it asserts NO anchor-key inequality (`DD-44`'s dated clause; `src/**` untouched).**

**THE SHARED RESOLVER'S CONSUMER SET, AMENDED SO THE `§6.5` CLAUSES' CITATION RESOLVES**
(`[T: the consumer set's restatement, with the as-filed form named, at this contract's sixth bounded
amendment | CROSS-REF]`): **the sentence above reads *"`read`, `write`, `delete` and `watch` each reach their
target through it and through no second resolver"* — and by `A58`'s stopgap ruling the verb `watch` is
SUPERSEDED by the listener surface (`write-and-read.md §6.5`), so the consumer set is
**`read` · `write` · `delete` · `listen` · `unlisten`**, and NO VERB of this contract reaches an address
through a second resolver.** **The HOME MAP is not addressed and is reached by no walk** (`A48`: *"separate
from the register and the graph"*) — a registration's address is the WALKED address the listener binds to,
and the home's own entries are reached by their handle and never by an address.

**⟶ RE-SPELLED 2026-10-11 — THE HOME IS ADDRESS-KEYED AND ITS ENTRIES ARE REACHED BY THEIR ADDRESS; IT IS NOT A
RESOLVER CONSUMER AND NO WALK TRAVERSES IT — SO BOTH HALVES OF THE SENTENCE ABOVE SURVIVE, THE SECOND OF THEM
KEEPING A NAMED `§2.1` CLAUSE WHOLE** (`RCA-8(d)` ANNOTATE-BESIDE: **the sentence above stands byte-for-byte
and is read THROUGH this clause; nothing above is re-worded, moved or withdrawn**; the finding's home
`archive/reviews/2026-10-11-structural-compliance.md` `§3` · `F-9` — whose smallest repair names THIS sentence
and `write-and-read.md §6.5` item 8 (a) together — and its `§6`; `P: §11 · A45` · `P: §13 · A48`; the home's own
re-declaration at `src/store.rs`; `[T: the home's two structural halves, stated together so the ruling's own
words and this subsection's consumer-set clause are read as ONE declaration | CONTRACT]`).
**THE AS-FILED WORDING, RE-EMITTED BECAUSE THIS CLAUSE RE-SPELLS IT AND NEVER REPLACES IT:** *"**The HOME MAP is
not addressed and is reached by no walk** (`A48`: *"separate from the register and the graph"*) — a
registration's address is the WALKED address the listener binds to, and **the home's own entries are reached by
their handle and never by an address**."* **IT CARRIED ONE HALF THAT IS FALSE OF THE STRUCTURE THE RULING NAMES
AND ONE THAT IS TRUE AND IS THE HALF THIS SUBSECTION'S CONSUMER SET NEEDS; BOTH ARE STATED HERE:**
1. **THE HOME IS ADDRESS-KEYED, AND ITS OWN ENTRIES ARE REACHED BY THEIR ADDRESS.** **The home's PRIMARY
   structure is a MAP WHOSE KEY IS THE REGISTRATION'S `address`** — the same address `write-and-read.md §6.5`
   item 10 (b) declares as what a listener *"binds by"* — **so a registration is reached BY ITS ADDRESS, and
   that key is exactly what `A45`'s *"the top-level listener map is the home"* makes of it, the ruling's own
   stated purpose being the LOOKUP COUNT.** **A registration's entry carries `A57`'s record and no anonymous
   shape standing beside it.** **A SECOND, LOOKUP-ONLY INDEX INSIDE THE HOME carries the handle→address
   direction (a token to its address and its position in that address's bucket), so a withdrawal reaches the
   entry the caller named without scanning the home** — **its declaration is the defaults table's
   (`contract.md §0.2` · `DD-51`, the row carrying the handle-mint's collision rule's new form), and `DD-42`'s rule is
   unmoved by it: the mint SKIPS a token the home already holds either way.**
2. **THE HOME IS NOT A RESOLVER CONSUMER, AND NO WALK TRAVERSES IT.** **The home is reached by no walk, by no
   segment path, by no `findAddress`, by no read (`[]`'s read included), and no verb resolves THROUGH it**
   (`write-and-read.md §6.5` item 8 (b); `A48`) — **so the WALKED address a registration binds to is the
   CONSUMER's own key and is never the home's own address on any walk, and the as-filed half that read
   *"reached by no walk"* is TRUE and stands.** **THE `§2.1` CLAUSE THIS HALF KEEPS INTACT, NAMED: this very
   subsection's consumer-set clause — *"the consumer set is **`read` · `write` · `delete` · `listen` ·
   `unlisten`**, and NO VERB of this contract reaches an address through a second resolver."* **Unmoved by
   this clause: the home is no SECOND RESOLVER, and no member of the consumer set reaches an address THROUGH
   it** — the `listen`/`unlisten` pair carries a registration's own address TO the home, whose structure is
   the map above, and neither verb resolves a node through it. **AND THE DRIVE THAT ALREADY CARRIES THIS HALF
   IS `contract.md §5.8`'s `(v)` cell of the `P-TP-8` row (`S-WATCH`'s HOME-IS-NOT-A-GRAPH-STRUCTURE drive:
   `read([])` carries no listener entry, `findAddress` reaches no home entry at any address, and a fresh
   instance over an equal `cfg.filePath` begins with `triggered: []`) — that cell asserts exactly this half
   and is UNMOVED by this clause.**

**Its failure is a THROWN `StoreError`** (`§8.3`), carrying a **closed status code** and a **generated
message naming the mismatch that blocked resolution** (`P: §11 · A14`; `DD-24(b)`).
**The walk's failure codes are exactly three: `AddressMalformed`, `AddressNotFound` and
`LeafHasNoDownstream`** (`§8.1`) — plus `OutOfDomainTier` when the tier argument is outside **`contract.md §5.1`**'s domain,
which fails before the walk begins.
**⟶ REPOINTED 2026-10-11: the two cells this part's clause above cites are printed with the ROWS AND `§`s
THAT CARRY THEM, so neither citation points at a cell a row does not carry:** **the register's own tier is
observed by `P-TP-7`'s REGISTER-REFERENCE CELL (`contract.md §5.7` — the cell that row's re-derivation names
by that name, printed beside the row's property) and by `P-TP-6`'s REGISTER DRIVES (`contract.md §5.6`, the
`3` at a `file` register + the `3` at a `mem` register, `3 + 3 = 6`, inside its `9 + 6 = 15` census)** — **and
the `P-TP-7` row's own citation to this section is the register-reference cell's clause** (`[T: the
citation's resolving form, at this contract's sixth bounded amendment | CROSS-REF]`).
`[P: §1, §11 · A14, §13 · A26; L: §1-bis · findAddress | CONTRACT]`

### §2.2 The walk, arm by arm

**The walk starts at the REGISTER** (`P: §1`) and **repeats, consuming exactly one segment per step, until
it terminates.** Let `a` be the address, `i` the index of the segment currently consumed, and `c` the
container currently held (the register at `i = 0`).

| Arm | The state it fires at | The answer |
| --- | --- | --- |
| **`L-0`** | **`a.length === 0`** | **the walk terminates immediately and resolves to the REGISTER** (`P: §13 · A25`) — **not** a sentinel, **not** a failure (`§1.5` item 4) |
| **`L-1`** | `a[i]` is outside the segment domain (`§1.5` item 1) | **fails `AddressMalformed`**, and **no further segment is consumed** |
| **`L-2`** | `c` holds a child anchor whose `key` equals `a[i]` **and**, when a tier argument is passed, whose `tier` is **one of the passed tiers** | **descends**: `c` becomes the node that anchor points to, `i` advances by `1` |
| **`L-INT-REG`** | `c` is the **register** and `a[i]` is an **integer** | **fails `AddressNotFound`** — the register holds no index semantics (`P: §13 · A23`) |
| **`L-3`** | `c` holds **no** anchor matching the key **and** the passed tier (or holds no anchor at that key at all) | **fails `AddressNotFound`**, and **the address's remaining segments are consumed by no further step** |
| **`L-TIER`** | `c` holds an anchor at key `a[i]` but **no** passed tier matches its tier | **fails `TierNotFound`** — distinct from `L-3`, because the key exists and the tier does not (`DD-12`) |
| **`L-4`** | `i` advances and the node now held is a **`leaf`** while `a.length - i > 0` | **fails `LeafHasNoDownstream`** — *"leaf nodes cannot have downstream anchors, thus the walk cannot continue and fails verbosely"* (`P: §1`) |
| **`L-5`** | `i === a.length` (the address is exhausted) | **succeeds**: the currently held anchored node **is the addressed target and is returned as its `NodeRef`** |

**THE TIER FILTER'S SCOPE — ONE CLAUSE, SO `L-TIER` IS NEVER READ AS ADDRESSED-STEP-ONLY:** **when the walk
IS passed a tier argument, the passed-tier filter is applied AT EVERY STEP OF THE WALK — at the ADDRESSED
step (`i = a.length − 1`) AND at every PASS-THROUGH step before it — and `L-TIER` therefore answers
`TierNotFound` at EVERY step at which the container holds an anchor whose `key` equals `a[i]` but whose
`tier` is in NO passed tier, whether or not that step is the addressed one; the only step at which the filter
has no subject is `L-0`'s empty address, where the register is reached before any segment is consumed**
(`[T: the scope clause, stated at this contract's third bounded amendment — the gate-4 adversarial pass's
`H-1`/`S-1` found the per-step wording readable as addressed-step-only, and this clause fixes the reading the
register row `P-SM-4`, the arms `L-2`/`L-3`/`L-TIER` and `§4.2` `R-4` all apply | CONTRACT]`).
**AND THE ONE THING THIS SCOPE CLAUSE IS **NOT** — SO `L-TIER` IS NOT READ INTO THE READ'S ASSEMBLY** (`[T:
the scope's second half, stated at this contract's FIFTH bounded amendment; the dated reconciliation below,
and its priced home `DD-31` in the contract document's `§0.2` | CONTRACT]`): **the clause above governs THE
WALK — the act that consumes the caller's address to resolve the node the caller named — and NOTHING ELSE.**
**THE READ'S ASSEMBLY IS A SECOND AND DIFFERENT ACT** (`write-and-read.md §4.2`; `P: §1`: *"The descendant
node values are read in the same manner recursively"*), **and the passed set governs it in exactly one
respect: WHICH VERSION EACH ADDRESS ANSWERS — applied per address at every address the walk visits and at
every address the assembly's recursion reaches** (`§2.3`; `P: §13 · A24`; `P: §14 · A28`), **while a step of
the ASSEMBLY at which a key's container holds an anchor but the set selects NO version for it CONTRIBUTES NO
MEMBER to the assembled value — it is OMITTED, and it is NOT `TierNotFound`, NOT an out-of-set substitution
and NOT a fall-back to the lowest-persistence arm** (`DD-31`'s omission half; `write-and-read.md §4.2`'s
assembly clause and its reconciliation). **WHY THE TWO ACTS DIFFER, STATED SO THE WALK'S PER-STEP FILTER IS
NOT READ AS WEAKENED:** **the WALK's step must resolve the node it will descend through, so a step that
matches no passed tier MUST FAIL (`L-TIER`; the gate-4 adversarial pass's `H-1`/`S-1`, whose reading stands
UNCHANGED here); the ASSEMBLY has no node to descend through — it produces each member from the anchor it
selects — so where it can select nothing it OMITS, because `TierNotFound` for a member the caller never
addressed would make the contract's own legal states unreadable at the address that WAS named** (`A19`'s
purge and `A27`'s monotonic clause admit a child less persistent than its parent, and `§5.6`'s `3 × 3` census
makes it reachable).
**⟶ RECONCILED 2026-10-11 — THE SCOPE OF THE PASSED-TIER FILTER, EXTENDED TO THE ASSEMBLY WITH ONE CLAUSE AND
NOW SPLIT INTO ITS TWO ACTS** (`RCA-8(d)` ANNOTATE-BESIDE: **the as-filed text stands byte-for-byte above and
nothing is deleted**; the determination is the contract document's `§4.2`/`§2.2` bounded assembly-scope
pass, dated `2026-10-11` and carried at its `§0.2 · DD-31`). **THE AS-FILED CELL READ:** *"when the walk IS
passed a tier argument, the passed-tier filter is applied AT EVERY STEP OF THE WALK — at the ADDRESSED step
(`i = a.length − 1`) AND at every PASS-THROUGH step before it — and `L-TIER` therefore answers `TierNotFound`
at EVERY step at which the container holds an anchor whose `key` equals `a[i]` but whose `tier` is in NO
passed tier, whether or not that step is the addressed one"*. **WHAT THIS PASS SETTLES, ITS THREE QUESTIONS
ONE BY ONE:** **(a) a tier-set read of an address whose descendant holds a version OUTSIDE the set: the set
is applied at every step of the ASSEMBLY as a PER-ADDRESS SELECTOR — the descendant's version is selected
when its tier is in the set and the descendant is OMITTED when it is not; the read answers, and answers
NOTHING for that member, rather than failing `TierNotFound` and assembling nothing** (the as-filed `§4.2`
clause's *"`TierNotFound` … for that step"* reading is withdrawn; its SUBSTITUTION half — the assembly never
translating an out-of-set anchor — stands, and it is `H-1`'s). **(b) the zero-tier read: it behaves
differently and it is the ONLY arm with no selection to run — `tier` absent and a `0`-token set are `§2.3`'s
zero-tier arm, so `A28`'s lowest-persistence anchor is selected at EVERY address, nothing is omitted and no
address can fail on its tier.** **(c) a descendant whose own version is MORE persistent than its parent's:
it is versioned exactly like every other address — the set selects it when its tier is in the set and omits
it when it is not, its persistence RELATIVE TO ITS PARENT being no part of a read's selection** (`A27`'s
monotone bound runs downward over the anchors a write mints and is no read-time filter). **THE WALK HALF OF
THE AS-FILED CELL IS NOT MOVED: the per-step filter, the ADDRESSED step, the PASS-THROUGH steps and
`L-TIER`'s answer at each of them STAND UNCHANGED** (`H-1` answered a genuine STOP-GRADE finding; the contract
document's `§3.2`'s closing clause carries the same boundary) (`[T: the reconciliation, with the as-filed
form named and nothing deleted | CONTRACT]`).
**THE WALK NEVER THROWS ANY CODE OTHER THAN `L-1`/`L-3`/`L-TIER`/`L-4`'s four and the tier-domain failure
that precedes it** (`[T: the walk's fail-closure, every member with a trigger | CONTRACT]`). **The walk
never mutates the store**, and **it never installs anything on its way down**.
`[P: §1, §13 · A23 · A25 | CONTRACT]`

**⟶ ADDED 2026-10-11 — THE ARM THAT ANSWERS THE OUT-OF-RANGE INTEGRAL SEGMENT: `L-1`, AT THIS ARM TABLE,
WITH THE DOMAIN'S HOME NAMED BESIDE THE ANSWER'S.** `RCA-8(d)` ANNOTATE-BESIDE: **the arm table above, its
scope clause, its reconciliation clause, its fail-closure sentence and its two closing sentences stand
BYTE-FOR-BYTE — this clause RE-EMITS the table's `L-1` row and the fail-closure sentence and never replaces
either; THIS clause is a PURE INSERTION: it adds no arm to the table, mints no code, opens no `§`-number, no
`DD` row and no `PAR` row, and re-decides no rule.** **THE ROW, RE-EMITTED AS IT STANDS ABOVE: `L-1` fires
where *"`a[i]` is outside the segment domain (`§1.5` item 1)"* and it *"fails `AddressMalformed`"*, consuming
no further segment.** **AND THE STATE THIS CLAUSE NAMES BECAUSE IT IS THE ONE THE DOMAIN'S BOUND CREATES: an
INTEGRAL SEGMENT ABOVE `Number.MAX_SAFE_INTEGER` (`2^53 − 1`) IS OUTSIDE THE SEGMENT DOMAIN, so `L-1` IS
ITS ARM AND `AddressMalformed` IS ITS ANSWER** — **on every route that reaches its target through this walk:
`read`, `readLiteral` and `findAddress` behind it, `write`'s target-segment arm and its parents' walk,
`delete`'s target-segment arm and its parents' walk, `listen`'s own per-segment loop, and the construction's
`listeners[]` classification.** **TWO HOMES, NAMED SO A READER OF EITHER RESOLVES FROM THIS ONE LINE: THE
DOMAIN'S HOME IS `store-model.md §1.5` ITEM 1** — where the bound `0 ≤ n ≤ Number.MAX_SAFE_INTEGER` is
DECLARED, with its carrier, its priced alternative and its reversal point — **and THE ANSWER'S HOME IS THIS
SECTION, whose `L-1` row and whose fail-closure sentence are the clauses that carry the code.** **THE
ENFORCING SITE, NAMED AS EVIDENCE AND NEVER AS EITHER HOME:** **the code asks the domain question at
`src/value.rs`'s `Segment::is_in_domain`, whose `Index` arm is `n <= 9_007_199_254_740_991`, and every route
above asks THAT ONE predicate** — **so one bound is the bound every route agrees on, and no verb carries a
second copy of the rule.** **AND WHAT DOES NOT MOVE, NAMED SO THE ARM ORDER IS NOT READ AS EDITED: `L-1`
still fires BEFORE `L-INT-REG`, `L-2`, `L-3`, `L-TIER`, `L-4` and `L-5` at the same step, an out-of-range
integral segment therefore never reaches `L-INT-REG`'s `AddressNotFound` and never reaches the register, and
the walk's fail-closure sentence above is UNMOVED — it is `AddressMalformed` that is `L-1`'s, and `L-1`'s alone,
among the walk's four codes.** **NO COERCION, NO SATURATION AND NO SILENT FOLD IS DECLARED OR PERMITTED BY THIS
CLAUSE: the carrier's own `u64` read of an out-of-range `number` is a state no admitted address reaches,
because the segment never enters the domain.**
`[P: §1 (the address clause); T: `L-1`'s carriage of the domain's bound, at the bounded declaration pass of
2026-10-11 | CONTRACT]`

### §2.3 The tier argument at a step — the selection rule the walk runs on

**On each descent step the walk consults the container for `a[i]` and, when a tier argument is passed,
for that tier.** **The two arms the ruling fixes** (`P: §13 · A24`, `P: §14 · A28`):

- **ZERO tiers passed (`tier` absent, or an empty set — `§3.1`/`§4.1`):** **the walk selects the
  LOWEST-PERSISTENCE anchor at that key** (`P: §1`: *"it resolves the lowest-persistence anchor with that
  key"*; `P: §14 · A28`: *"Confirmed"*). **"Lowest persistence" and "lowest tier" are ONE predicate**, not
  two: *"a lower-tier one **IS** a lower persistence one because the tiers are defined by persistence"*
  (`P: §11 · A11`). **So the selection is by `rank` ascending, and `temp` (`rank 0`) is selected before
  `mem` (`rank 1`) before `file` (`rank 2`).**
- **ONE OR MORE tiers passed:** **the walk reads ANY node whose tier is ONE OF THE PASSED TIERS** (`P: §13
  · A24`: *"accepts zero to many tiers, reading any node that matches one if any tier is passed"*).
  **The set is an ANY-MATCH set: it is not a union of values, not an ordered preference and not a filter**
  (`R: §15.2`'s `O-5` row: *"the array form is thus neither a union nor a filter: it is an ANY-MATCH
  set"*). **When a key holds more than one passed tier, the walk applies the SAME lowest-persistence rule
  to the passed subset** — because the rule's ground is the one predicate, and no ruling gives a passed set
  an order of its own (`[P: §11 · A11 + §14 · A28 applied to the matched subset | DECLARED-DEFAULT]`,
  priced at `DD-12`'s neighbourhood; reversal point: a fresh ruling). **AND THE PASSED SET BINDS EVERY STEP
  OF THE WALK — NOT THE ADDRESSED STEP ALONE:** **at each step, the container is consulted for `a[i]` and
  for the passed tiers TOGETHER, exactly as `L-2` states them, so a pass-through step at which the key exists
  and no passed tier matches answers `L-TIER`'s `TierNotFound` — the scope clause of `§2.2` says so at the
  arm table and this clause repeats it for the selection rule** (`[T: the scope, restated at the selection
  rule so the two homes of `L-TIER` agree | CONTRACT]`).
- **No anchor at the key at all** → `L-3`'s `AddressNotFound`. **An anchor at the key but no passed tier
  matching — at ANY step of the walk —** → `L-TIER`'s `TierNotFound` (`DD-12`).

`[P: §1, §11 · A11, §13 · A24, §14 · A28; L: §1-bis · tier | CONTRACT]`

**⟶ RECONCILED 2026-10-11 — THE SELECTION RULE'S OWN SCOPE, STATED FOR BOTH ACTS** (`RCA-8(d)`
ANNOTATE-BESIDE: **the as-filed bullet above stands byte-for-byte and nothing is deleted**; the contract
document's bounded assembly-scope determination, dated and priced at its `§0.2 · DD-31`). **THE AS-FILED
SUBJECT OF THE BULLET THAT READS *"AND THE PASSED SET BINDS EVERY STEP OF THE WALK — NOT THE ADDRESSED STEP
ALONE"* WAS:** *"at each step, the container is consulted for `a[i]` and for the passed tiers TOGETHER, exactly
as `L-2` states them, so a pass-through step at which the key exists and no passed tier matches answers
`L-TIER`'s `TierNotFound`"*. **THE OPERATIVE READING, PER ACT — the selection rule is ONE rule and the acts it
runs over are TWO:** **(i) AT A WALK STEP** the container is consulted for `a[i]` and for the passed tiers
together, exactly as the as-filed bullet says — the ADDRESSED step and every PASS-THROUGH step alike — **and a
step at which the key exists and no passed tier matches answers `L-TIER`'s `TierNotFound`** (`§2.2`'s scope
clause, whose walk half this bullet states and whose per-step filter STANDS UNCHANGED). **(ii) AT AN ASSEMBLY
STEP** (`write-and-read.md §4.2`) **the same rule selects the version the member answers, the
lowest-persistence member of the passed subset answering where a key holds more than one passed tier — and a
key for which the set selects NO version contributes NO MEMBER: it is OMITTED, and the read does NOT answer
`TierNotFound` and does NOT assemble an out-of-set anchor** (`DD-31`; `write-and-read.md §4.2`'s assembly
clause and its reconciliation). **THE AS-FILED BULLET REACHED FURTHER THAN THIS IN ONE RESPECT ONLY: it said
*"a pass-through step"* while the read's assembly was already covered by the contract document's `§4.2`, so
the two homes could be read as ONE walk and the assembly as one of its steps — this clause separates them,
and the separation is the whole of the determination.** **NOTHING ELSE MOVES: the ZERO-TIER arm (`temp`
before `mem` before `file`, by `rank` ascending) is untouched, the any-match reading of the set is untouched,
the lowest-persistence rule applied to the matched subset is untouched, and `L-3`'s `AddressNotFound` at a key
with no anchor at all is untouched** (`[T: the reconciliation, with the as-filed form named and nothing
deleted | CONTRACT]`).

---

**END OF THE `store-model` PART.** **Its relocated spans are `contract.md §1` and `contract.md §2`, whole.**
**This part adds no claim, no `§`-number, no citation and no cell; the two spans' `§`-numbers and authority
citations are exactly those of the contract document, and a citation to either is written with this part's
path** (`docs/specs/storeroom-native/store-model.md §1.5`, etc.) — *a bare `§n` across documents is not an
edge* (`docs/specs/storeroom-native/contract.md` §3.6, which states the cross-document citation form; §0.1
item 10(a); `[T: contract.md §3.6 and §0.1 item 10(a) | CROSS-REF]`).
