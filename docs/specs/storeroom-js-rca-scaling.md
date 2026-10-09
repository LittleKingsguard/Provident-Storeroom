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

**(2) WHERE A LOOKUP IS OWED, THE CONTRACT BOUNDS IT TO `O(1)`.** Writing at an address whose container **already exists** does owe the same-pair check — but **(key, tier) is the composite key and AT MOST ONE child anchor stands at one pair** (`contract.md:2811`, `P: §15 · A34`; `DD-10`). So the answer is **at most one reference, determined by the address's own key and the write's tier** — bounded by the **tier count (`3`)**, never by the sibling count (`n`). A per-link keyed index resolves it in `O(1)`; **a scan resolves it in `O(children)` for an answer that can only be `0` or `1`.**

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
- **`MAP`:** the model declares **no order** over a `MAP`'s children (`store-model.md:242`: *"`MAP` … **unordered** — the store declares no order over a `MAP`'s children"*), so a member's position carries **no** information about its name.
- **`VEC`:** indices are minted contiguously from `0` (`§1.3`/`R-3`), so position `n` **would** align with `Index(n)` while exactly ONE anchor stands at each key — **but the composite-key rule allows up to THREE (`DD-10`; `contract.md:2811`, `P: §15 · A34`: *"at most ONE child anchor stands at one pair"*, one pair per tier)**, and the moment two tiers stand at one index the alignment breaks and every later position is shifted. **And the code does not use position anyway — it always compares `anchor.key == *key`.**

**(3) THE MODEL'S OWN WORD FOR A KEYED CONTAINER IS A HASHMAP.** `store-model.md:441` (`§1.6`): *"The register — **keyed by names, always a hashmap**, no parent anchor"*. **So the model names the keyed structure; the implementation stores a positional `Vec` of arena ids. The index does not exist — it was never built.**

**(4) WHAT THE REPAIR ADDS, AND WHAT IT MUST KEEP.** **ADD** a key→reference index beside the `Vec` (a `BTreeMap` keyed by the segment's own ordering is least invasive — `keys_at` already sorts by `Segment::spelling()`, so no `Hash` derivation is needed; a `HashMap` is the alternative), **maintained at every site that pushes, removes or renumbers a child.** **KEEP** the `Vec`: it is load-bearing for deterministic iteration and for the VEC's renumbering pass, so the index is **additive** — the flat list stays as the arena's own ordering, and the map becomes the keyed accessor. **WITH §5-bis STEP (a), the write path does not depend on the new index at all; the index serves the genuine same-pair lookup (step (b)) and the assembly's per-key access (step (c)).**

## 6. WHAT THIS RCA DOES NOT CLAIM

1. It does not claim the JS boundary or the conversion needs changing — **they are measured linear** and their design is `O(1)` per datum already.
2. It does not claim the `1,000,000` refusal and the cost curve are one defect — **they are two**: the refusal is a **bound placed in the core while the package's walk has none** (`crossing.rs`'s `visited > 1_000_000` against `encodeValue`'s depth-only bound), and the curve is the store's child access. The repair above addresses the curve; **the bound's home is the separate CODE finding the generator filed.**
3. It does not measure the deep-chain or deeply-nested shapes — **only flat and one-level containers**, which is what the failing drive uses. A nested shape multiplies the same per-level cost, so the repair's effect there is **strictly greater**, not smaller.
4. Every figure here is this pass's own measurement, taken outside the repository (`/tmp/quad-probe*.mjs`); **no byte of the tree was touched by the RCA.**
