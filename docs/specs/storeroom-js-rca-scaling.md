# RCA — the super-linear cost of large values through the JS boundary

**Filed 2026-10-11 by the supervisor, on the architect's request:** *"RCA where the scaling cost is coming from, this should be operating in O(1) data operations during the conversion, resulting in the iteration being O(n)."*
**Status:** root cause FOUND and named at its lines. **Not yet fixed** — the repair is the implementer's, and this file is its worklist.
**Unit:** `U-STOREROOM-JS`. **Layer:** `ENVELOPE/PURE`. **Found by:** gate 4's tasked generator `NG-JS-D-nodes`, then measured here.

## 1. THE OBSERVATION

`NG-JS-D-nodes` drives a **dense flat array** (depth 1, `n` members) through a `write` and fails two ways: the `1,000,000` state is **refused** where the declared bound admits it, and the call blows the drive's work budget. The red set's own message hypothesised *"the boundary walk is quadratic"*. **That hypothesis is wrong about WHERE, and understates the curve.**

## 2. THE MEASUREMENT (this pass, at the repository's own ESM entry, addon built)

| `n` | full `write` | a replica of `encodeValue`'s exact hot steps | remainder |
| --- | --- | --- | --- |
| `20,000` | `308 ms` | `0 ms` | `308 ms` |
| `40,000` | `2,704 ms` | `1 ms` | `2,703 ms` |
| `80,000` | `10,632 ms` | `1 ms` | `10,631 ms` |

| `n` | map-write | vec-write | map-read |
| --- | --- | --- | --- |
| `20,000` | `452 ms` | `309 ms` | `894 ms` |
| `40,000` | `3,618 ms` | `2,639 ms` | `3,824 ms` |

**Consecutive doublings cost ~8.0× (map-write), ~8.5× (vec-write), ~4.3× (map-read)** — an exponent between 2 and 3 at these sizes; the curve is noisy because every large call allocates a big tree and triggers GC, and the journal keeps a record of each. **The exponent is worse than quadratic; "super-linear" is the honest label.**

## 3. THE EXONERATED — what is NOT the cause

1. **THE JS ENCODER IS LINEAR AND NEGLIGIBLE.** `index.mjs`'s `encodeValue` — the `i in value` hole loop, the own-accessor/symbol arm, the per-member recursion — measured **0–1 ms at `80,000` members** in a faithful replica. It is not the cost.
2. **THE CORE'S NODE COUNT IS ONE LINEAR WALK.** `crossing.rs`'s `measure` (`:519`) counts depth and visited nodes in a **single pass**, called once from `to_store_value` (`:568–570`). It is not the cost.
3. **THE WIRE CONVERSION IS PER-MEMBER.** The facade's `Codec` reads the model member by member; that is O(1) per member, and its total is dominated by the store-side work below.

## 4. THE ROOT CAUSE — the store's child lookup is a LINEAR SCAN, called once per member

**Every lookup of a link's children BY KEY walks the whole child list**, and the write, the read and the purge each perform that lookup **once per member**. For a container of `n` members the total is therefore `Σ k ≈ n²/2` — and in three places it is worse than that.

| # | the operation (its line) | what it costs per call | who calls it once per member |
| --- | --- | --- | --- |
| **1** | **`refs_at(link, key)`** — `src/store.rs:308` — `self.links[link].children.iter().filter(anchor.key == key).collect()` | **O(children)** — a full scan **plus an allocation** (the `Vec` it collects into) per call | **`mint`** (`:658`, called per member by `:673`/`:676`), and **19 other sites** — `refs_at` has **20 callers** |
| **2** | **`keys_at(link)`** — `src/store.rs:296` — scans every child, **and calls `keys.contains(&key)` inside the loop**, then sorts | **O(children²)** on its own — the `contains` is a nested scan — plus a sort | the assembly (read) path, once per container |
| **3** | **`remove_refs(link, doomed)`** — `src/store.rs:322` — `children.retain(\|r\| !doomed.contains(r))` | **O(children × doomed)** — a nested scan | **`mint`** (`:661`, per member), and the purge/renumber paths |

**SO THE PER-DATUM OPERATION IS `O(members so far)`, NOT `O(1)`** — which is exactly the standard the architect's requirement names: *"this should be operating in O(1) data operations during the conversion, resulting in the iteration being O(n)."* **The conversion itself is already O(1) per datum; the store's keyed child access is not.**

**AND IT EXPLAINS THE READ'S SYMMETRY.** The read-back is comparably expensive (`894 → 3,824 ms`) because the assembly path needs the same keyed access: `keys_at` per container (cost 2) and `refs_at` per key (cost 1). It is not a write-path or journal-only artefact — it is the container's own addressing.

## 5. THE FIX DIRECTION (the implementer's; named so the repair is bounded)

**Give each link an `O(1)`-amortized keyed index over its children and maintain it on every push and removal** — so that:
- **`refs_at`** becomes `O(1) + O(matching)` (a map lookup returning the reference list for that key), instead of a scan **and an allocation** per call;
- **`keys_at`** becomes `O(distinct keys)` with no nested `contains` (the map's own key set), instead of `O(children²)`;
- **`remove_refs`** becomes `O(doomed)` per doomed reference (removing by key from the index), instead of a `retain` × `contains` product.

**THE KEY'S TYPE IS THE ONLY DESIGN CHOICE:** `Segment` is `Key(String) | Index(u64)` and `keys_at` already sorts by `Segment::spelling()`, so **a `BTreeMap` keyed by the segment's own ordering is the least invasive** (it needs no `Hash` on `Segment` and preserves the existing order), with a `HashMap<Segment, Vec<usize>>` the alternative where `Hash` is derived. **Either way the index must be maintained at every site that mutates `links[link].children`** — and the store's own `:340`-area renumbering, the purge, the re-mint and the boot's load path are the sites to sweep.

**ACCEPTANCE FOR THE REPAIR:** the same value at `200,000` members completes in **linear** time (the measured curve flat at 2× per doubling, not 8×), `1,000,000` members is **admitted** (the declared node bound is the core's, and it is satisfied), and **the store's own suite stays green at `377` pass · `0` fail** with the sibling crate's `223` and the JS leg's cells unmoved.

## 5-bis. THE ARCHITECT'S CORRECTION OF §5 — the write need not look up its SIBLINGS at all

**⟶ APPENDED 2026-10-11, on the architect's observation:** *"This is a write operation, correct? The write doesn't have to look up the written siblings, it only has to check the index/tier the write occurs at, which is O(1)."* **HE IS RIGHT, AND THE READING CONFIRMS IT IN TWO STEPS — the §5 index is still owed, but it is NOT what the hot path needs:**

**(1) IN THE CONTAINER-MINT RECURSION THE LOOKUP IS VACUOUS — PROVABLY.** `mint`'s object branch (`src/store.rs:671–677`) creates a **brand-new** child link (`new_link(Kind::Map)` / `Kind::Vec`, `:268` — `children: Vec::new()`) and then calls `self.mint(child_link, key_i, tier, member_i)` **once per member**. Each of those calls runs `refs_at(child_link, &key_i)` (`:657–660`) and `remove_refs` (`:661`). **BUT THE LINK WAS CREATED BY THIS SAME CALL AND EVERY KEY IT IS ASKED ABOUT IS A MEMBER OF THE VALUE BEING WRITTEN — distinct map names, contiguous VEC indices — so the pair `(key_i, tier)` CANNOT exist when the lookup runs.** The scan therefore walks only the `k − 1` members this same write has already minted, all of them at OTHER keys, and **its result is empty by construction**: the `refs_at` scan, the `Vec` it allocates per member, and the `remove_refs` call are **pure waste** — `Σ k ≈ n²/2` spent proving nothing. **This is the architect's point exactly: the write knows the index/tier it writes at, and it does not have to consult the siblings to do so.**

**(2) WHERE A LOOKUP IS OWED, THE CONTRACT BOUNDS IT TO `O(1)`.** Writing at an address whose container **already exists** does owe the same-pair check — but **(key, tier) is the composite key and AT MOST ONE child anchor stands at one pair** (`contract.md §5.3`'s composite-key clause, `P: §15 · A34`; `DD-10`). So the answer is **at most one reference, determined by the address's own key and the write's tier** — bounded by the **tier count (`3`)**, never by the sibling count (`n`). A per-link keyed index resolves it in `O(1)`; **a scan resolves it in `O(children)` for an answer that can only be `0` or `1`.**

**THE CORRECTED FIX DIRECTION — the hot path needs NO data-structure change at all:**
- **(a) THE VACUOUS LOOKUP IS REMOVED BY CONSTRUCTION** — when `mint` recurses into a link **it has just created**, the same-pair lookup and the removal are skipped (nothing can stand there). **This alone deletes the `n²/2` from the container path**, and it is a bounded, local change at `:655–663` plus the two recursion sites at `:673`/`:676`.
- **(b) THE GENUINE LOOKUP IS RESOLVED BY THE ADDRESS'S KEY + TIER** — an `O(1)`-amortized per-link keyed index returns the pair's own reference (one, or none), so `refs_at` stops scanning **and stops allocating a `Vec` per call**.
- **(c) THE READ PATH'S `keys_at` IS THE SAME FIX** — with the pair unique, the index's own key set replaces the `keys.contains` dedup scan (cost 2 in §4), and `assemble_at_tier` iterates the index's keys directly instead of scanning per key (cost 1). **That is the read's `894 → 3,824 ms` resolved by the same index — and it is a read, so (a) does not help it; (c) is what it needs.**

**WHAT THIS CHANGES IN §5:** the index's justification is **narrowed** — it is not needed to make the container WRITE linear (step (a) does that with no data structure), it is needed for **(b)** the genuine same-pair lookup at an existing container and **(c)** the assembly's per-key access. **The acceptance in §5 stands unchanged: per-datum `O(1)`, iteration `O(n)`, `200,000` linear, `1,000,000` admitted, the store's suite still `377` with the sibling crate's `223`.**

## 5-ter. IS THE CHILD LIST ALREADY AN INDEX? — NO. IT IS POSITIONAL OVER ARENA IDS

**⟶ APPENDED 2026-10-11, on the architect's question:** *"Aren't the link's children already indexed by virtue of being stored in a vec/hashmap?"* **THE ANSWER, FROM THE DECLARATION AND THE MODEL'S OWN VOCABULARY: there is no keyed index anywhere, and position is not a key.**

**(1) THE FIELD'S OWN COMMENT SAYS WHAT THE VECTOR INDEXES.** `src/store.rs:59–62`:

```rust
struct Link {
    container: Kind,
    /// The child anchors the container holds, as indices into the instance's reference arena.
    children: Vec<usize>,
    …
}
```

**`children` is a `Vec` of REFERENCE IDS into the instance's arena (`refs`); the KEY lives in the anchor (`refs[reference].anchor.key`) and NOT in the vector.** So the vector is indexable **by position**, and the only key lookup it offers is the scan the three functions perform. **No `HashMap` and no `BTreeMap` stands anywhere in the structure.**

**(2) POSITION CANNOT STAND IN FOR THE KEY, IN EITHER CONTAINER KIND.**
- **`MAP`:** the model declares **no order** over a `MAP`'s children (`store-model.md §1.3`'s container table: *"`MAP` … **unordered** — the store declares no order over a `MAP`'s children"*), so a member's position carries **no** information about its name.
- **`VEC`:** indices are minted contiguously from `0` (`§1.3`/`R-3`), so position `n` **would** align with `Index(n)` while exactly ONE anchor stands at each key — **but the composite-key rule allows up to THREE (`DD-10`; `contract.md §5.3`'s composite-key clause, `P: §15 · A34`: *"at most ONE child anchor stands at one pair"*, one pair per tier)**, and the moment two tiers stand at one index the alignment breaks and every later position is shifted. **And the code does not use position anyway — it always compares `anchor.key == *key`.**

**(3) THE MODEL'S OWN WORD FOR A KEYED CONTAINER IS A HASHMAP.** `store-model.md §1.6`: *"The register — **keyed by names, always a hashmap**, no parent anchor"*. **So the model names the keyed structure; the implementation stores a positional `Vec` of arena ids. The index does not exist — it was never built.**

**(4) WHAT THE REPAIR ADDS, AND WHAT IT MUST KEEP.** **ADD** a key→reference index beside the `Vec` (a `BTreeMap` keyed by the segment's own ordering is least invasive — `keys_at` already sorts by `Segment::spelling()`, so no `Hash` derivation is needed; a `HashMap` is the alternative), **maintained at every site that pushes, removes or renumbers a child.** **KEEP** the `Vec`: it is load-bearing for deterministic iteration and for the VEC's renumbering pass, so the index is **additive** — the flat list stays as the arena's own ordering, and the map becomes the keyed accessor. **WITH §5-bis STEP (a), the write path does not depend on the new index at all; the index serves the genuine same-pair lookup (step (b)) and the assembly's per-key access (step (c)).**

## 5-quater. THE ARCHITECT'S CLARIFICATION — THE LINK WAS *EXPLICITLY* RULED A HASHMAP, AND THE SHIPPED STRUCTURE IS NOT IT

**⟶ APPENDED 2026-10-11, on the architect's statement:** *"Link was **explicitly** defined by architect decision to use a hashmap for storing keyed data."* **CONFIRMED AT ITS OWN BYTES — AND IT MAKES THE ROOT CAUSE A CONTRACT-VS-BUILD DIVERGENCE RATHER THAN A SUBOPTIMAL CHOICE.**

**(1) THE DECISION IS IN THE DIRECTIVE, VERBATIM (`docs/specs/storeroom-native-proposal.md`):**
- **`§1` line 42:** *"**Links have exactly one parent anchor and a hashmap xor vec of child anchors.** A link cannot have more than one child anchor with the same index/key."*
- **`§1` line 81:** *"…branch's descendant link in its **hashmap**. If array, populate **vec**. This repeats recursively."*
- **`§1` line 96 (the read's own assembly):** *"**hashmap, convert to an object**, using the same keys."*
- **`A22`:** *"Decided at write, inferred from contents on read. Write attempting to add to vec when hashmap is used, or vice versa, **fails**."*
- **`A23`:** *"Registry is **always** hashmap."* — carried into the contract's model as `store-model.md §1.6`: *"The register — **keyed by names, always a hashmap**."*

**(2) WHAT THE BUILD HOLDS.** `src/store.rs:59–62`: **one** structural shape for BOTH kinds — `Link { container: Kind, children: Vec<usize>, is_register }` — **a positional list of arena reference ids**, with every keyed access performed by the scans of `refs_at`/`keys_at`/`remove_refs` (§4). **The `Kind` marker is stored; the keyed container the decision ruled is NOT.** So:
- **the "hashmap xor vec" is, in the build, "vec either way"** — the declared structure is not what runs;
- **and the O(1) keyed access the decision implies by construction is absent**, which is the whole of the cost §4 measures.

**(3) THIS SUPERSEDES §5-TER's ADDITIVE RECOMMENDATION.** An index bolted beside the positional `Vec` would produce the right asymptotics **without** restoring the declared structure — **and the decision rules the structure.** **THE REPAIR IS THEREFORE: for a keyed link, the children ARE the hashmap (the key to its child anchor(s)); for an array link, they ARE the vec (positional, contiguous).** The declared model's own words settle every design question §5 and §5-ter left open — the mapping's key domain, whether one anchor per key or a list (the directive's *"cannot have more than one child anchor with the same index/key"* bounds it by the TIER: one pair per tier, `DD-10`/`A34`), and how the read assembles (*"hashmap, convert to an object, using the same keys"*).

**(4) WHY NO TEST COULD HAVE CAUGHT IT — AND WHAT THAT SAYS ABOUT THE REGISTER.** **The divergence is INVISIBLE THROUGH THE DECLARED SURFACE: every verb returns the same answers either way, so all `377` store cells and all `223`+`101` JS cells pass under both structures** (`A22`'s *"write attempting to add to vec when hashmap is used … fails"* is about the WRITE ARM, which IS tested — the link's INTERNAL storage is not). **It is the same unobservability class `DD-41` names for the optional per-node index, and it took the architect's own question about scaling to surface it.** **A structural claim needs a declared observable to be failable — otherwise a register row can assert it and never fail** (the class gate 4's PBT audit flagged twice).

**(5) WHAT THIS CHANGES IN THE WORKLIST, IN ORDER:** **(a)** remove the vacuous recursion lookup (§5-bis) — **independent of the structure, and it alone deletes the `n²/2` from the container write**; **(b)** **restore the declared structure** — a keyed link's children become the hashmap the decision ruled, which makes every keyed access O(1) **by construction** and removes the per-call `Vec` allocation with it; **(c)** the read's assembly then follows the directive's own sentence (*"hashmap, convert to an object, using the same keys"*) instead of scanning. **Acceptance unchanged: per-datum O(1), iteration O(n), `200,000` linear, `1,000,000` admitted, the store's suite still `377` with the sibling crate's `223`.**

## 7. A FIGURE NOTE (2026-10-11)

**THIS RCA'S MEASUREMENTS ARE OF THE TREE IT MEASURED AND DO NOT MOVE; the STORE'S ROOT SUITE FIGURE it quotes as the acceptance, however, is now `379` PASS (was `377`), the `+2` being the listener cells `write-and-read.md §6.5` item 14 (d)–(e) required — `watched_addresses.rs` `19` → `21`.** **The scaling curves this file reports are unaffected: the repair it drove took the write from ~`8×` per doubling to ~`2×`, and the two added cells touch the listener surface, not the crossing.**

## 6. WHAT THIS RCA DOES NOT CLAIM

1. It does not claim the JS boundary or the conversion needs changing — **they are measured linear** and their design is `O(1)` per datum already.
2. It does not claim the `1,000,000` refusal and the cost curve are one defect — **they are two**: the refusal is a **bound placed in the core while the package's walk has none** (`crossing.rs`'s `visited > 1_000_000` against `encodeValue`'s depth-only bound), and the curve is the store's child access. The repair above addresses the curve; **the bound's home is the separate CODE finding the generator filed.**
3. It does not measure the deep-chain or deeply-nested shapes — **only flat and one-level containers**, which is what the failing drive uses. A nested shape multiplies the same per-level cost, so the repair's effect there is **strictly greater**, not smaller.
4. Every figure here is this pass's own measurement, taken outside the repository (`/tmp/quad-probe*.mjs`); **no byte of the tree was touched by the RCA.**

---

**⟶ RECONCILED 2026-10-11 — THE `U-STOREROOM-JS` GATE-7 PROOFREADING PASS (`role_proofreader`): `§5-QUATER` (2)'s
"WHAT THE BUILD HOLDS" IS THIS RCA'S MEASUREMENT DATE, AND THE TREE HAS MOVED SINCE IT WAS TAKEN.** `RCA-8(d)`
ANNOTATE-BESIDE: **every clause above stands byte-for-byte — `§5-quater` (2)'s one-shape finding, its (3), its
(4) and its (5) worklist included — and each is read THROUGH this clause; THIS CLAUSE IS A PURE INSERTION, it
re-measures nothing and withdraws no figure of the RCA.**

- **`§5-QUATER` (2) READS** *"`src/store.rs:59–62`: ONE structural shape for BOTH kinds — `Link { container: Kind, children: Vec<usize>, is_register }` — a positional list of arena reference ids, with every keyed access performed by the scans of `refs_at`/`keys_at`/`remove_refs` … the `Kind` marker is stored; the keyed container the decision ruled is NOT."* **THE OPERATIVE STATE OF THE TREE: THE REPAIR THIS RCA'S (5) NAMES HAS LANDED — the keyed link's children ARE the declared hashmap and the array link's ARE the declared vec, at `Children::Map(HashMap<Segment, HashMap<Tier, usize>>)` (`src/store.rs:105`–`:108`) and `Children::Vec(Vec<HashMap<Tier, usize>>)` (`:109`–`:112`), the `(key, tier)` bound being STRUCTURAL in the inner `HashMap<Tier, usize>`; the stored `Kind` marker is DERIVED from the variant and its redundant copy is gone; the vacuous same-pair recursion lookup is gone (the `fresh` flag); and `ContainerKindConflict` is the one declared failure for both kind directions.** **So (5)(a), (5)(b) and (5)(c) are all TAKEN, and the divergence this RCA filed as `DEF-18` is CLOSED (`docs/defects.md` `DEF-18`'s dated clause, `docs/specs/storeroom-native/store-model.md`'s own reconciliation).**
- **AND (4)'s REGISTER LESSON IS UNMOVED AND IS THE REASON THIS CLAUSE EXISTS: the divergence was INVISIBLE THROUGH THE DECLARED SURFACE, so the `377` store cells and the `223`+`101` JS cells passed under both structures — A STRUCTURAL CLAIM NEEDS A DECLARED OBSERVABLE TO BE FAILABLE.** **THE FIGURES THIS FILE PRINTS ARE THE OPERATIVE ONES AT THEIR TREES: the store's root suite `377` PASS · `0` FAIL (its root `Cargo.toml` byte-identical), the sibling crate `223` PASS · `0` FAIL at the named manifest, and this unit's JS suite `101` tests · `101` pass · `0` fail.**
- **AND THE ACCEPTANCE STANDS UNCHANGED AND UNMET, SO IT IS READ AS A CONDITION AND NOT AS A GREEN: per-datum `O(1)`, iteration `O(n)`, `200,000` linear, `1,000,000` admitted — with the store's suite green at `377` and the sibling crate's `223` unmoved** (`[T: this RCA's structural finding against the tree that now carries the repair, its figures each with the tree it describes | CENSUS]`).

**⟶ AND THE THREE CITATIONS INTO SIBLING PARTS THAT THIS FILE HAD PLANTED BY LINE ANCHOR ARE RE-POINTED, DATED `2026-10-13`, BY THE CLAUSE EACH ONE NAMES.** `RCA-8(d)` ANNOTATE-BESIDE: **no other byte of this file moves; THIS clause re-decides no rule, re-measures nothing and withdraws no figure.**
**THE REPOINTS, EACH WITH WHAT THE OLD ANCHOR NOW RESOLVED TO: `store-model.md:242` → `store-model.md §1.3`'s container table (the old anchor now stands at the CHILD-ANCHOR MONOTONICITY clause under `§1.2`, and not at the `MAP`-is-unordered row the citation quotes); `contract.md:2811` → `contract.md §5.3`'s composite-key clause (the old anchor now stands in `§5`'s listener-registration property and not at *"at most ONE child anchor stands at one pair"*); and `store-model.md:441` → `store-model.md §1.6` (the old anchor now stands in `§1.5`'s segment domain and not at *"always a hashmap"* — the section name was ALREADY printed beside the anchor in this file's own sentence).**
**AND THE ANCHORS THIS FILE PLANTS INTO `src/store.rs` ARE NOT LINE ANCHORS INTO A SPEC PART AND ARE UNMOVED BY THIS CLAUSE: they name the CARRIER's own bytes, and the carrier's own reconciliation clauses at `§5-quater` (2) above are their operative home** (`contract.md §0.1` item 2's own rule that an appended file's line anchors drift; `[T: the sibling citations, repointed by name so a mechanical sweep is not the instrument | CROSS-REF]`).
