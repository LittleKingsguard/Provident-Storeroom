# PROPOSAL — the native Rust storage plugin for `Provident-Storeroom` (`U-STOREROOM-NATIVE`)

**Role of this file.** The artifact-under-review for this project's FIRST unit's proposal-review gate
(gate 1). **Filed by the supervisor** (the orchestrating role; it reads the process rules, decides the
gate, delegates each unit to a role tool and verifies the gate passed). **A FILING, NOT A CONTRACT:** it
asserts **no** behaviour clause, **no** signature, **no** return shape and **no** fail-state; it licenses
**no** code task; it admits **no** unit row; it moves **no** ledger count; it edits **no** byte of the
adjacent project.

**⟶ THIS FILE NOW CARRIES AN APPENDED AMENDMENT: `§8`, the architect's modification of 2026-10-11 — *"Write
and delete ops are journaled and can be rolled back by walking back through journal changes … to check
constraint violations while preserving the original data in case of failure"* — filed verbatim, dated, and
consumed by step 4 in a dated supplementary pass recorded at the gate-1 record's `§8`.** **It moves nothing
above it and it answers none of the four bubble questions; it ADDS five open subjects (`J-1`–`J-5`) whose
answers are owed IN ADDITION to them.**

**Unit id / prefix (proposed, and the gate-2 spec writer may move it only with a recorded conversion).**
**`U-STOREROOM-NATIVE` is the unit id** (the directory name at the spec gate: `docs/specs/storeroom-native/`,
pattern C). **Prefix: none declared by this filing** — the unit's ids (`P-SN-*` register rows, `PAR-n`
parameters, `DD-n` defaults) are owed by the spec gate and are not minted here.

**Gate state at filing.** **GATE 1 — THE PROPOSAL-REVIEW GATE — OPENED, NOT PASSED.** The four-step chain
(step 1 `role_validity` ∥ step 2 `role_critique` → step 3 `role_architecture_review` → step 4
`role_change_analysis`, with the **STEP-0 semantics block folded into step 4**) runs on **this file and on
nothing else**, and the **architect's go-ahead is required before any later gate**.

---

## §1. THE ARCHITECT'S DIRECTIVE, VERBATIM (unedited, unedited punctuation, the whole message)

> This is a project meant to replace the implemented storage tree for the adjacent Provident-Electron
> project (/media/ryanr/Shared Files/Projects/Provident-Electron/docs/specs/store-rederive) with a native
> code plugin using Rust
> The structure has five components:
> - leaf nodes store data. The data can be any primitive/literal format, but not objects/dicts/arrays or
>   other collections. A leaf node is pointed to by an anchor or the register, and must point back.
> - branch nodes store anchors. They do not contain any readable value, but an address can calculate
>   through them. A branch node contains a downstream anchor (marking it as a parent on a link) and a
>   reference to its own pointing anchor (which marks it as a child on its parent's link).
> - anchors connect nodes to links. An anchor can be either a parent or a child. Child anchors must contain
>   a node reference and have a tier value (file, mem, or temp).
> - Links have exactly one parent anchor and a hashmap xor vec of child anchors. A link cannot have more
>   than one child anchor with the same key/index and tier (key/order+ tier is a composite key)
> - The registry behaves as a link, except requiring child anchors to be associated with keys, not indexes.
>   It is used for holding the top-level nodes of a tree.
>
> Tier behavior:
> There are three tiers, ranked by their persistence in descending order: file, mem, and temp
> A child anchor cannot be created with higher persistence than the parent anchor on its link (ex. a
> `file` anchor cannot be a descendant of a `temp` anchor)
> - `file` is meant to be saved to a json file in a persistent, external location.
> - `mem` is meant to be persistent until the end of the application session
> - `temp` is meant for storing placeholder or pre-committed data
>
> Interface functions:
> All interface functions expect an optional tier or tier[] and a required address, which is a JS/JSON
> array containing the path to walk through the tree, starting from the register. Use a shared
> `findAddress` function for this resolution, returning either the addressed node or an error message
> stating the mismatch that blocked address resolution.
> The address resolution starts at the register. An address.len == 0 resolves to the parent node of the
> register (which otherwise cannot be addressed).
> Otherwise, the search pops address and checks for a key matching the popped value and, if any, passed
> tier. If no tier is passed, then it resolves the lowest-persistence anchor with that key.
> If an anchor is resolved, this repeats until:
> - the address is exhausted (popped until len == 0) - the current anchored node is the addressed target
>   to be returned
> - the search encounters a leaf node - leaf nodes cannot have downstream anchors, thus the walk cannot
>   continue and fails verbosely
> - the search encounters a link that does not contain the next address segment in its keys/indices (and,
>   if tier passed, is of that tier) - walk cannot continue, fail verbosely
>
> Write - receives the above address/tier params, singular tier required, and a value to write, which can
> be a primitive/literal or a JSON
> The write function first attempts to resolve the address one level lower than the target, i.e. the
> target's parent, unless it is already len == 0 (resolving the register)
> If found, it then checks if the resolved node is a leaf or branch.
> If it is a leaf, it creates a new branch node and descendant link (which will overwrite the leaf later)
> It then creates a new node with the passed data. If it is a literal (ex. int, string, bool), it creates
> a leaf node containing that value. If it is a JSON, it creates a branch.
> If a branch is created, check if the JSON's top-level is an object or array. If object, populate the
> branch's descendant link in its hashmap. If array, populate vec. This repeats recursively, turning any
> key/index that is a literal into a leaf node and turning objects/arrays into branches until all keys have
> been mapped.
> If the creation is successful (fail verbosely if not), the new node is added to the child links of the
> address-resolved node found in the first step, unless the resolved node was a leaf. If the resolved node
> was a leaf, that node is overwritten as above. If there is a node already under that key/index on the
> address-resolved node, then it is overwritten.
> 'Overwritten', in this context, means the existing node is literally removed and replaced by the new node
> (this cascades to all downstream nodes), if its persistence is the same or less than the new node, or,
> if the written node is of lower persistence, simply added alongside so it shadows on read.
>
> Read - receives the above address/tier params, tier optional.
> If the read address resolves, the read checks if it resolved to a leaf or branch node
> If leaf: return the leaf's stored value.
> If branch: create JSON. If the downstream link is a vec, convert to array. If the link stores in the
> hashmap, convert to an object, using the same keys. If more than one anchor has the same index/key,
> translate only the node of the lowest-persistence anchor. The descendant node values are read in the same
> manner recursively, so a anchor that points to a leaf node converts to a JSON key:value of the anchor's
> key + leaf node's value, while an anchor that points to a branch node has a value of an object formed
> from the branch node
>
> Delete - receives the above address/tier params, tier optional
> If the address resolves, delete the resolved node and all downstream. If the tier is specified, delete
> only that tier(s), otherwise, delete all.

---

## §2. THE CONSUMING CONTEXT AND THE FILING FACTS (measured this pass; citations, not opinions)

1. **THE PROJECT THIS FILING LANDS IN IS EMPTY OF PROCESS ARTIFACTS.** At filing time this repository
   carries `README.md` (2 lines: *"# Provident-Storeroom"* / *"Centralized storage plugin for
   Provident-Electron apps"*), `LICENSE`, `.gitignore` and one commit (`6846d38 Initial commit`). **There
   is no `docs/`, no `src/`, no `test`/`tests/`, no `package.json`, no toolchain config and no tracker.**
   **This filing's own pass creates the tracker skeleton** (`docs/next-steps.md`, `docs/decisions.md`,
   `docs/pending.md`, `docs/defects.md`) because launching a proposal is a tracker-gate event; **the gate-1
   artifacts themselves are the deliverables above the skeleton.** **⟶ DISCHARGED BESIDE 2026-10-11 (STEP 1'S
   CONDITION `V-3` / FINDING `F-3`, which read the tree BEFORE the skeleton existed):** **all four trackers
   are PRESENT in the same pass as this filing** (`docs/next-steps.md`, `docs/decisions.md`, `docs/pending.md`,
   `docs/defects.md`), and **`docs/next-steps.md` is the citable record of this gate** (its `## OPEN` row `N1`
   and its non-unit rows `L-1`–`L-4`). **`F-3` is closed by their presence, not by argument.**
2. **THE TOOLCHAIN, MEASURED ON THIS MACHINE (a feasibility fact, not a design claim):** `rustc 1.98.0
   (88d9e12ae 2026-08-18)` and `cargo 1.98.0` at `/home/ryanr/.cargo/bin`, host triple
   `x86_64-unknown-linux-gnu` · `node v24.20.0` · `npm 12.0.2` · `pnpm` present. **No `napi` CLI is on
   `PATH`.** **⟶ LANDED BESIDE 2026-10-11 (STEP 1'S CONDITION `V-1` / FINDING `F-2`): the four probe figures
   are carried by a REPO-RESIDENT row — `docs/next-steps.md`'s non-unit row `L-4`, with the probe each figure
   came from named there — so a later pass re-checks them from this repository without a shell.**
3. **THE CORPUS THE DIRECTIVE NAMES, BY PATH, AT ITS OWN STATUS.** `Provident-Electron/docs/specs/store-rederive/`
   — **10 files: `contract.md` plus 9 declared `carrier` parts** (`store-model.md`, `write-and-read.md`,
   `seams-and-lifecycle.md`, `layer-honesty.md`, `census.md`, `property-register.md`,
   `parameter-semantics.md`, `owed-and-cross-references.md`, `implementation-plan.md`), unit id
   `U-STORE-REDERIVE`. **Its operative status line reads `FILED — SPEC GATE APPROVED; THE CYCLE IS
   STARTED`** (the architect's `R13`/`R14` ruling and his lifted hold, dated 2026-10-11 in the contract's
   head block).
4. **THE CORPUS'S OWN IMPLEMENTATION IS IN FLIGHT IN THE ADJACENT PROJECT, AND THIS FILING DOES NOT TOUCH
   IT.** `Provident-Electron` HEAD at filing is `4a5c087`; `src/renderer/store.ts` is **2311 lines**, and
   gate 3 is mid-cycle at **red set `183 rows · 181 PASS · 2 FAIL`; register `288/288` attempts · `27/27`
   rows · `26 held · 1 broken · STOP RULE not fired`.** **⟶ CORRECTED BESIDE 2026-10-11 (STEP 1'S FINDING
   `F-1`, A REFUTED ATTRIBUTION — the as-filed cell stands byte-for-byte and THIS clause is the operative
   statement):** **the figures are NOT carried by *"the unit's queue cell"*; that cell carries the unit's
   STATUS and its phase-`P0` freeze instead.** **The figures stand in the adjacent project's GATE-BOUNDARY
   COMMIT RECORD — six recorded gate-3 passes between `be5dfb6` and `4a5c087`, read at
   `Provident-Electron/.git/logs/HEAD` — and the register's `288` additionally stands in
   `Provident-Electron/docs/decisions.md`'s two `2026-10-11` successor rows and in
   `store-rederive/property-register.md §5.5.1`.** **A later pass citing these figures cites one of THOSE
   sites, not the queue cell** (step 1's condition `V-2`). **The directive's verb
   is *"replace the implemented storage tree … with a native code plugin using Rust"*** — **what that verb
   does to that in-flight cycle (its unit row, its frozen artifact, its register, its licence) is a
   semantic question this filing carries to the gate and does not answer** (`§4` item 8).
5. **THE HOST'S BUILD SHAPE (a measured boundary, quoted from the adjacent project's `package.json`):**
   `main` is bundled **`--platform=node --format=cjs`**; **the renderer is bundled
   `--platform=browser --format=esm`** (`esbuild src/renderer/renderer.ts --bundle --platform=browser
   --format=esm` **⟶ CORRECTED BESIDE 2026-10-11 (STEP 1'S FINDING `F-4`): the as-filed quotation dropped
   the `--format=esm` token, which the script carries; the token is RESTORED here and the as-filed
   truncation stands visible**).
   **The corpus's landed store lives in the RENDERER realm** (`src/renderer/store.ts`), and its declared
   `FsSurface` is a `node:fs`-shaped seam (`parameter-semantics.md §6` `PAR-11`). **A native addon's
   loadability in each realm is therefore a boundary fact the gate must read, not a detail this filing may
   assume.**
6. **THE DIRECTIVE IS THE ARCHITECT'S OWN WORDS, AND THE CORPUS'S NEAREST ANCESTOR IS ALSO HIS.** The
   corpus's `C1`–`C24` are *"the architect's own words, transcribed verbatim and unedited"*
   (`Provident-Electron/docs/specs/store-constraint-rederivation-proposal.md` §2 — **⟶ CORRECTED BESIDE
   2026-10-11 (STEP 1'S FINDING `F-5`): the as-filed citation names §2 alone, while that file's ruling set
   runs from `§2` through `§12` (`C1`–`C24` at `§2`–`§3`, `R1`–`R4` at `§4`, `R5`–`R8` at `§5`, `R9` at `§6`,
   `R10`–`R12` at `§7`–`§8`, `R13`–`R15` at `§9`–`§10`, `R16`–`R17` at `§11`–`§12`), so the citation reads
   `§2`–`§12`**), and `R1`–`R17` are his
   rulings on that transcription. **The directive above is a second, later statement over the same
   subject matter.** **Whether the directive RE-DERIVES, AMENDS, or ADOPTS the corpus is a semantic
   question for the gate; the filing records that both texts are in-project-in-origin for ONE project and
   externally-sourced for THIS one.**

---

## §3. THE FILING'S OWN BOUNDS

1. **IT ASSERTS NOTHING ABOUT THE ADJACENT PROJECT'S TEXT.** No byte of `Provident-Electron/**` is read as
   authority here; every corpus clause cited below is **quoted with its path and its `§`/row id** and is
   evidence **for the gate's use**, never a premise of this filing.
2. **IT LICENSES NO CODE TASK AND ADMITS NO UNIT ROW.** No red set is delegated, no implementer is
   dispatched, no property-layer row is executed, no `src/**` byte of either project is written, and **no
   ledger count moves**.
3. **IT IS NOT THE CONTRACT.** Every behaviour clause the unit needs is owed at gate 2 by
   `role_spec_writer`, in the directory form (`docs/specs/storeroom-native/contract.md` plus its parts),
   with the typed `§5.x` property register for a code-bearing unit.
4. **IT CARRIES NO RULING ON ANY SEMANTIC QUESTION.** §4's table prints **the directive's clause beside the
   corpus's own clause, as quotations, with NO reading taken** — **whether two rows are in conflict, and
   which text governs, is the gate's to determine** (steps 1–4 and the architect's answers), not this
   filing's.
5. **NOTHING WAS RUN BY THIS FILING'S AUTHOR BEYOND READ-ONLY INSPECTION.** No `cargo`, no `npm`, no test,
   no build, no typecheck, no application boot and no writing `git` command. **The three measurements in
   §2 are reads** (`--version` probes and file/git inspection). **Layer discipline (`RCA-12`): every claim
   here is `[T]` (text/contract/tracker) or a named measurement; no `APP` claim is made, and no claim is
   made about the Rust plugin's behaviour because it does not yet exist.**

---

## §4. THE DIRECTIVE'S PROSE BESIDE THE CORPUS'S OWN CLAUSES — QUOTATIONS ONLY, NO READING TAKEN

**The form is deliberate: each row prints (i) a fragment of the directive VERBATIM, (ii) the nearest
corpus clause VERBATIM with its path + `§`/row id, and (iii) a NOTE that contains only the quotations'
own terms. NO row says "conflict", "supersedes", "governs" or "adopt" — those are the gate's words to
write, and a reader must not find them here.** The corpus paths are abbreviated: `store-rederive/…` =
`Provident-Electron/docs/specs/store-rederive/…`.

| # | The directive's fragment (verbatim) | The corpus's own clause (path + `§`/row id, verbatim) | Note — the two quotations' own terms |
| --- | --- | --- | --- |
| **`X-1`** | *"There are three tiers, ranked by their persistence in descending order: file, mem, and temp"* | `store-rederive/store-model.md §2.2` item 1: *"FOUR TIERS — `secure`, `file`, `mem`, `temp`"*, terms `4 = 1 (secure, outside every order) + 3 (the ranked tiers: file · mem · temp)`; `store-rederive/census.md §4.1` prints the same `4 = 1 + 3` | the directive names three; the corpus names four, with the fourth `secure` **outside every ordering** and carried by **its own separate functions and its own separate file** (`C6`; `store-rederive/seams-and-lifecycle.md §2.9`) |
| **`X-2`** | *"leaf nodes store data … but not objects/dicts/arrays or other collections"* / *"branch nodes store anchors. They do not contain any readable value"* | `store-rederive/store-model.md §2.3` item 4's record shape: `Node = { tier, literals: {[member]: StoreValue}, anchors: Anchor[] }`; `§2.4` item 6: *"A node holds EXACTLY THREE KINDS OF MEMBER, and there is no fourth"* — literal members · anchor members · the reserved `_value` | the directive is a **two-kind** partition (leaf / branch, a node carrying either data or anchors); the corpus's node carries **literals and anchors in one record**, and its member-kind distinction is **which table the key stands in** |
| **`X-3`** | *"Child anchors must contain a node reference and have a tier value (file, mem, or temp)"* | `store-rederive/store-model.md §2.3` item 4: `Node = { tier: Tier, … }` — *"`C11` — the tier of the store it is in"*; `§2.2` item 3: *"A NODE MAY NOT BE MORE PERSISTENT THAN ITS PARENT"* with `rank(child node's tier) ≤ rank(parent node's tier)` | the directive's tier carrier is the **child anchor**; the corpus's is the **node**, and the corpus's monotonic clause is stated over **node tiers** |
| **`X-4`** | *"Links have exactly one parent anchor and a hashmap xor vec of child anchors. A link cannot have more than one child anchor with the same key/index and tier"* | `store-rederive/store-model.md §2.3` item 4: `Link = { parent: AnchorRef, child: AnchorRef, constraints: ConstraintRegistration[] }`; `§2.3` item 2's `D-LINK`/`E-CHILD`: *"among the anchor's links, the walk must select a link whose child-side node exists"*; `§2.3` item 4: the anchor carries `key: string` **and** `order: number` | the corpus's link is the **interface between one parent-side anchor and one child-side anchor** (`C12`), **one link per instance**, so two tier instances of one key stand as **two links under one anchor**; the directive's link holds **a map-or-vector of child anchors**, with `(key/order, tier)` a **composite key** |
| **`X-5`** | *"The registry behaves as a link, except requiring child anchors to be associated with keys, not indexes"* | `store-rederive/store-model.md §2.3` item 3: *"An entry is `{ name: string, node: Node, constraints: ConstraintRegistration[] }` — the root name as the entry's child order/key, the root node as its child, and the link-functionality's constraint list; and NO parent reference"* (`C14`) | both texts make the register a **link without a parent**; the corpus's entry carries the root's **name and node and constraint list**, and the directive's register carries **child anchors keyed by name** |
| **`X-6`** | *"An address.len == 0 resolves to the parent node of the register (which otherwise cannot be addressed)"* | `store-rederive/store-model.md §2.3` item 1: *"AN ADDRESS IS A NON-EMPTY SEGMENT LIST"*, with **an empty array** listed among the `4` malformed arms, all refused `'malformed-address'` at step `A-ADDRESS`; `§2.3` item 3: the register carries **no parent** (`C14`'s own subtraction) | the directive assigns the length-0 address a **referent** (the register's parent node); the corpus makes a length-0 address **outside the domain** and declares the register **parentless** |
| **`X-7`** | *"fail verbosely"* / *"returning either the addressed node or an error message stating the mismatch that blocked address resolution"* | `store-rederive/store-model.md §2.14` + `§2.1`: **the CLOSED `22`-token `Reason` union** (`'malformed-address'` … `'node-location-container'`), carried on `interface Refusal { status: 'refused'; reason; step; segment; messages }`; `§2.1` item 4: *"EVERY FUNCTION IS TOTAL: it answers one of its declared records and NEVER THROWS"* | the directive names an **error message**; the corpus names a **closed token union** plus a **resolution step id**, a **segment**, and a **message list** (`R15`'s `StoreMessage[]`), **never a throw** |
| **`X-8`** | *"the existing node is literally removed and replaced by the new node (this cascades to all downstream nodes) … if the written node is of lower persistence, simply added alongside so it shadows on read"* | `store-rederive/write-and-read.md §2.5` item 7 declares **the COMPLETE write-arm table** — **`10` arms** (`A1`–`A10`) per `census.md §4.9b`; `R10`–`R12` (tombstoning on write, the tombstone's read semantics, the file-tier tombstone's lifecycle); `R17`(a) `'node-location-container'`; `R17`(b) *"No property deletion — only whole-node tombstones exist"*; `C19`'s purge | the directive's instrument is **literal removal and replacement**; the corpus's is a **tombstone** (`R10`) whose reads and file-tier lifecycle `R11`/`R12` govern, with the purge driven by a **higher-tier write** (`C19`) |
| **`X-9`** | *"If branch: create JSON. If the downstream link is a vec, convert to array … If more than one anchor has the same index/key, translate only the node of the lowest-persistence anchor"* | `store-rederive/write-and-read.md §2.8` item 7 declares **the READ's four arms** (`4 = 1 + 1 + 1 + 1`) per `census.md §4.9b`; `R9`: *"If a specific tier is passed, read that tier specifically. Otherwise, read the lowest-persistence node at the targeted address and all downstream addresses"*; `R16`(e)/`R17`(c) `_value` transparency and exclusivity | the directive's read **assembles JSON per shape** (vec→array, map→object) with the **lowest-persistence** node per key; the corpus's read is **arm-selected at `M-PROP`** (node location · literal property · absent property · no resolution) with the tier-qualified and unqualified forms **differing**, and a reserved-key node **condensing to its literal** |
| **`X-10`** | *"Delete - … delete the resolved node and all downstream. If the tier is specified, delete only that tier(s), otherwise, delete all."* | `store-rederive/write-and-read.md §2.6` (the tombstone clause) item 6 (the property-address tombstone); `R11` (the tombstone's **read** semantics, token `'tombstoned'`); `C19` (the purge of lower tiers on a higher-tier write, `purge(temp) = 0` · `purge(mem) = 1` · `purge(file) = 2`, `census.md §4.4`) | the directive names a **delete verb** with tier-scoped reach; the corpus declares **no delete verb** and **no property deletion** — deletion is the **tombstone write**, and the tier-scoped reduction is the **purge** a higher-tier write drives |
| **`X-11`** | *"All interface functions expect an optional tier or tier[] and a required address"* — and, in the same breath, *"Write - … singular tier required"* | `store-rederive/store-model.md §2.1` items 1–3: `read(address, tier?)` **optional** tier; `write(address, tier, payload)` **required** tier (`R6`); **`listen`/`constrain`/`load` take NO tier**; `R9`/`C21`'s read selection | the directive's parameter set is **(address, optional tier-or-tier[], value)** on every function; the corpus's is **per-function** — and `tier[]` (a tier **array** argument) appears in **no** corpus row, whose tier domain is the `3` ranked tokens, one per call |
| **`X-12`** | *"Use a shared `findAddress` function for this resolution"* (the directive names **five** components and **four** verbs: write · read · delete, plus resolution) | `store-rederive/store-model.md §2.1`: **the GENERIC SURFACE is `5` functions** — `read` · `write` · `listen` · `constrain` · `load` — **plus the `secure` counterpart `5`**, *"The store's functions in total: `10 = 5 + 5`"* (`census.md §4.3`) | the directive enumerates **no** listener surface, **no** constraint registration, **no** load/boot verb and **no** `secure` family; the corpus's `C13`/`R4` constraint seam, `C22`–`C24` event surface and `C24` load are **named in its own surface table** |

**AND ONE POSITIVE CONVERGENCE, PRINTED SO THE TABLE IS NOT READ AS A CONTRADICTION LIST:** **`X-4`'s
`(key/order, tier)` composite key and the corpus's `E-CHILD` selection among an anchor's links both make
**one key reachable at more than one tier**, and **`X-9`'s *"the lowest-persistence anchor"* and `R9`'s
*"the lowest-persistence node at the targeted address"* both name lowest-persistence as the unqualified
selection rule.** **The two texts agree on the SHAPE of the problem here; whether they agree on its
carrier is the gate's to say.**

---

## §5. WHAT NEITHER THE DIRECTIVE NOR THE CORPUS NAMES (neighbours, listed; no ruling, no preference)

**This list is a MAP OF ADJACENCIES, not a question list and not a defect list.** **Each entry is a
subject on which the directive above is silent and the corpus above is silent-or-inapplicable because it
is a TypeScript module rather than a native plugin.** **A row here may become a gate-1 finding, an
open-semantics entry, a dossier row, or nothing at all; that determination is the gate's.**

| # | The adjacent subject | Why it is adjacent (a fact, not a claim) |
| --- | --- | --- |
| **`N-1`** | **the native binding mechanism** | a Rust library reaches Node/Electron through some carrier (Node-API addon · subprocess · FFI over a shared library · WebAssembly) — **the directive names none, and no `.cargo`, `napi`, `bindgen` or `build.rs` artifact exists in this repository or the adjacent one** |
| **`N-2`** | **the realm the plugin runs in** | measured (`§2` item 5): the host's `main` is node-CJS and its **renderer is browser-ESM**, while the corpus's landed store is a **renderer** module (`src/renderer/store.ts`) |
| **`N-3`** | **the boundary's value representation** | the directive admits *"any primitive/literal format"* and *"a JSON"*; the corpus's admission set is **`6` admitted classes and `16` refused** (`store-rederive/census.md §4.6`, `DD-5`), each refusal derived from a JSON round-trip argument — **the Rust-side representation of that taxonomy is named nowhere** |
| **`N-4`** | **module-supplied functions across the boundary** | the corpus's constraint carrier is **JS functions** (`store-rederive/store-model.md §2.1`: `ConstraintFn`/`RepairFn`/`ListenerBody`; `R4`: *"modules must be able to add additional constraints and repair functions"*), and its listener body is a **JS function** (`C22`) — **how either reaches a native core is named nowhere** |
| **`N-5`** | **the `file` tier's external location** | the directive says *"a persistent, external location"* and names no path; the corpus takes `file: { path }` as a **construction option** (`store-model.md §2.1` `StoreOptions`) and declares a `node:fs`-shaped seam (`parameter-semantics.md §6` `PAR-11`) — **a native core must be told which of these shapes it inherits** |
| **`N-6`** | **the plugin's own packaging, install path and ABI matrix** | `git`/`npm`/`cargo` publishing, prebuilt-artifact policy, rebuild-on-install, the Electron ABI, and the host's `@napi-rs`-style dependency edge — **none is named, and the adjacent `package.json` carries no native dependency** |
| **`N-7`** | **who owns the JS-facing surface and its name** | the corpus's surface is `createStore(options): Store` (`store-model.md §2.1`); the directive names *"interface functions"* and one shared `findAddress` — **whether the plugin's exported surface is that same `Store` shape, a new one, or an internal core beneath a JS shim is named nowhere** |
| **`N-8`** | **the relationship to the adjacent project's IN-FLIGHT cycle** | measured (`§2` item 4): `U-STORE-REDERIVE` is mid-cycle at gate 3 with a **frozen surface artifact, a register and a four-path licence**; the directive's verb is *"replace the implemented storage tree"* — **what that verb does to that unit's rows, artifacts and licence is named nowhere** |
| **`N-9`** | **`temp`'s rollback and the session lifetime** | the directive says `temp` is *"for storing placeholder or pre-committed data"* and `mem` *"persistent until the end of the application session"*; the corpus carries a **ruling** on `temp` (*`R7`: "Automatic — dropping the temp node restores the retained lower-tier state"*) and a boot/lifetime clause (`store-rederive/seams-and-lifecycle.md §2.12`/`§2.13`) — **which the directive neither cites nor repeats** |
| **`N-10`** | **the `secure` tier's presence at all** | `X-1`'s three tiers against `C6`'s fourth — **and the corpus's `secure` carries a **gate** (`secureAccess`, `PAR-10`) and a **MCP mutual-exclusion** condition; the directive names no security tier** |

---

## §6. THE ADOPTION TRIGGER — THE PREMISE RECORDED, THE DETERMINATION LEFT TO THE GATE

**The STEP-0 determination is `role_change_analysis`'s, folded into step 4 of this gate** (no new role
tool, no new tool row). **This filing does not make it.** **It records the premise the determination turns
on, so the gate can test it against a stated object rather than an assumed one:**

1. **The identifiers the directive names** — `leaf` · `branch` · `anchor` · `link` · `registry` · `tier` ·
   `file`/`mem`/`temp` · `address` · `findAddress` · *"parent anchor"*/*"child anchor"* · *"hashmap xor
   vec"* — **are ALSO carried by an artifact OUTSIDE this project**:
   `Provident-Electron/docs/specs/store-rederive/` (its `store-model.md §2.1`–`§2.4` record shapes and
   tier table), **whose own rows pin a meaning for several of them that §4 prints beside the directive's
   use** (`X-2` · `X-3` · `X-4` · `X-9`).
2. **Whether that makes the unit's contract names, parameters or vocabulary *originate outside this
   project* within STEP-0's terms is the gate's to determine**, together with the two consequences the
   determination carries either way: **the dossier's identifier rows (≤ 8, each with its source citation
   and its `defined`/`undefined-until-answered` STATUS) with a populated collision block over the
   CONSUMING repository's prohibition/vocabulary rows, OR the zero-row exemption carried with a WRITTEN
   rationale naming the unit's declared surface** — and **a unit with any `undefined-until-answered` row
   may not receive a delegable verdict: the verdict is `BLOCKED-ON-SEMANTICS` with the open list attached,
   escalated to the architect IN THIS PASS.**
3. **The collision sweep's checked set is not obvious from this repository's own state and is itself a
   gate finding to state**: this project is **empty** (`§2` item 1) and therefore carries **no landed
   prohibition or vocabulary rows of its own**; the adjacent project carries a large prohibition corpus
   (`docs/decisions.md`, `docs/specs/zones.md` `§2.2` `P-1`/`P-3`/`P-4`/`P-5`, `docs/specs/store-core.md`
   `§3.4` `R-9`/`P-9`, `docs/specs/container.md` `P-CT-1`, `docs/specs/mcp-endpoint.md` `§6.4`), **and
   whether that corpus is the consuming repository's for this purpose — with the two-project split it
   implies — is a determination this filing flags and does not make.**

---

## §7. PROVENANCE — WHAT THIS FILING'S AUTHOR READ, AND WHAT IT DID NOT

1. **READ AT ITS OWN BYTES (this pass):** this project's `README.md`, `LICENSE`, `.gitignore` and `git`
   log/branch state · the adjacent project's `docs/specs/store-rederive/` file list, its `contract.md`
   head + index region + `§0`/`§0.1`/`§0.2`/`§0.3`/`§0.4` (the `DD-1`–`DD-24` default table and the claim
   ledger rules), `census.md §4` whole, `layer-honesty.md §3` whole, `store-model.md §2.1`–`§2.4` whole and
   the heading list of that file · the adjacent project's `docs/specs/store-constraint-rederivation-review.md`
   `§1`/`§2`/`§5`/`§10` regions and its `grep`-level `Semantics`/`decomposition`/`dossier` hits ·
   `docs/specs/store-core-adoption-dossier.md` whole · the adjacent `package.json` build/script/dependency
   regions · the adjacent `docs/next-steps.md`, `docs/decisions.md`, `docs/pending.md`, `docs/defects.md`
   heads · the harness project's `docs/specs/adoption-semantics-gate/contract.md` head and
   `docs/specs/` file listing.
2. **NOT READ AT ALL, AND THEREFORE NOT EVIDENCE FOR ANYTHING THIS FILE SAYS:**
   `store-rederive/write-and-read.md`, `seams-and-lifecycle.md`, `property-register.md`,
   `parameter-semantics.md`, `owed-and-cross-references.md`, `implementation-plan.md` **at their own
   bytes** (every citation to them in §3/§4 is quoted **from `census.md §4`, `contract.md`'s own
   clauses, or `store-model.md`**, and each is labelled with the artifact it was quoted from) · the
   adjacent project's `src/**` and `tests/**` (the `src/renderer/store.ts` line count is a `wc -l`
   measurement of a path, not a read of its bytes) · `archive/**` of either project · every `*-greens.md`,
   `*-live-battery.md` and other `*-review.md` · the fork tree; `node_modules/**`; the other sibling
   projects. **No `AGENTS.md` of the adjacent project was read as a rule source — this unit's process
   rules are this session's own.**
3. **NOTHING WAS RUN AND NOTHING WAS COMMITTED BY THIS PASS.** Read-only inspection only (`--version`
   probes, `ls`, `wc -l`, `git log`/`git status`, `grep`). **The one thing this pass creates besides this
   file is the tracker skeleton of `§2` item 1 and the gate-1 step reports.**

---

## §8. THE ARCHITECT'S AMENDMENT OF 2026-10-11 — the journaled write and delete, with rollback by walking the journal back

**APPENDED, DATED, AND FILED IN THE SAME PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE).** **NOTHING ABOVE THIS
SECTION MOVES: not `§1`'s transcription, not a `§2` measurement, not an `§4` quotation, not `§5`'s adjacency
row, not `§6`'s premise. §1 remains the architect's first directive, byte-for-byte, and a reader who treats
§8 as an edit of §1 has mis-read this file.**

**A GATE-1 AMENDMENT, NOT A RULING, NOT AN ANSWER, AND NOT A CONTRACT.** **This section asserts no behaviour
clause, no signature, no return shape and no fail-state; it licenses no code task; it admits no unit row; it
moves no ledger count; and it answers NONE of the four bubble questions the gate-1 record fired.** **It is
the architect's own words transcribed verbatim, with a table naming the subjects it touches and taking no
reading of them.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited).**

> Modification: Write and delete ops are journaled and can be rolled back by walking back through journal
> changes. This is needed to check constraint violations while preserving the original data in case of
> failure

**ITS PROVENANCE AND ITS ARRIVAL.** Delivered by the architect as a modification to the directive **after**
this gate's steps 1, 2 and 3 had returned and **after** step 4 had issued the gate-1 verdict — so **steps 1–3
never saw it**, and **step 4 consumed it in a dated SUPPLEMENTARY PASS whose record is the gate-1 record's
`§8`** (this filing's own counterpart). **`§8` is dated `2026-10-11` and is the amendment's only home; the
precedent for a mid-gate amendment is the adjacent project's `R1`–`R4` and `R16`–`R17`, each appended and
consumed by the step that owned the verdict.**

**WHAT IT ADDS, STATED AS A SUBJECT AND NOT AS A READING.** **One new mechanism is named: a JOURNAL of write
and delete operations, whose entries can be walked BACKWARD to restore the state that stood before an
operation, and whose stated purpose is to check CONSTRAINT VIOLATIONS while PRESERVING the original data on
failure.** **The following subjects are therefore in the unit's declared surface that were not there before,
and each is a NEIGHBOUR of a union row this gate already carries:**

| # | The subject the amendment names | The union row(s) it neighbours (gate-1 record `§3`) | What the amendment does NOT say |
| --- | --- | --- | --- |
| **`J-1`** | **the journal itself** — its existence, its scope (which operations write an entry: write · delete · both tiers · the `file` tier's commit), its carrier and lifetime, and whether it is itself tier-bound | `U-11` (the overwrite arm table) · `U-12` (the delete verb) · `U-28` (isolation and reentrancy) | it names no carrier, no scope, no lifetime and no entry shape |
| **`J-2`** | **rollback by walking the journal back** — the direction, the depth of a single step, whether a rollback is total or partial, and what a rollback restores when the journal holds entries from more than one operation | `U-11` · `U-21` (the `file` tier's commit protocol and failure arm) · `U-33` (`temp`'s *"pre-committed"*) | it names no direction rule beyond *"walking back"*, no depth and no partial arm |
| **`J-3`** | **the constraint-checking interaction** — that constraints are checked in the window the journal exists to make reversible, and that a constraint violation is the FAILURE the rollback preserves data against | `U-22` (the failure channel and the closed fail set) · `U-11`'s arm ordering · the corpus's constraint seam (`C13`/`R4`, a `5`-function surface) — **and the corpus's own `R15` ruling (*"Repeat constraints, do not repeat repairs … if a repair breaks a prior constraint, fail instead to prevent loops"*), which the corpus's constraint phase serves WITHOUT a journal** | it names no evaluation point, no pass structure, no repair interaction and no failure record |
| **`J-4`** | **"preserving the original data in case of failure"** — the durability of the preserved data across the failure, and which tier's data is meant | `U-21` · `U-33`; the corpus's neighbouring instrument is `R7` (*"Automatic — dropping the temp node restores the retained lower-tier state"*) and `C7`/`R3`'s save-failure rollback | it names no tier, no durability claim and no failure taxonomy |
| **`J-5`** | **the journal as an OBSERVABLE** — whether the journal is readable by a caller, addressable, deletable, or internal only | `U-1` (the surface enumeration) · `U-26` (who owns the JS-facing surface) · `U-34` (the boundary's value representation) | it names no reader, no address, no seam and no exposure |

**AND THREE THINGS THIS FILING STATES PLAINLY SO NO PASS MIS-READS THE AMENDMENT.** **(1) IT IS NOT A
CORPUS CLAUSE.** **`../Provident-Electron/docs/specs/store-rederive/` declares NO journal and NO
rollback-by-walk: its deletion instrument is the TOMBSTONE (`R10`–`R12`), its failure posture is *"the
operation does not land"* (`R8`) with the file's bytes protected by an atomic replace, and its constraint
phase evaluates BEFORE anything lands (`C13`/`R4`, `R15`)** — so **the amendment's mechanism is a
neighbour of that corpus's clauses and NOT derivable from them** (`U-46`'s relation question governs whether
they are evidence or authority for this unit, and it is still open). **(2) IT DOES NOT CHANGE THE VERDICT
THIS GATE ALREADY ISSUED.** **`BLOCKED-ON-SEMANTICS` / `NOT-DELEGABLE` stands, and the amendment can only
add open rows to a verdict that is already blocked; the supplementary pass records it rather than
re-opening the gate.** **(3) IT DOES NOT DISCHARGE ANY OF THE FOUR BUBBLE QUESTIONS.** **The
`decomposition` row's disposition stays `BUBBLE-TO-USER`, `decider = the user`, `bubble = yes`, and the
go-ahead stays WITHHELD.** **THE ONE THING IT DOES CHANGE, RECORDED SO A FRESH SUPERVISOR NEEDS IT: the
amendment's `J-1`–`J-5` are NEW OPEN SUBJECTS that the four bubble questions do not cover, so the
architect's answers to them are owed IN ADDITION to the four questions already fired.**

---

## §9. THE ARCHITECT'S ANSWERS OF 2026-10-11 — the rulings the gate's `10` questions were asked for

**APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION
MOVES** — not `§1`'s transcription, not a `§2` measurement, not an `§4` quotation, not `§5`'s adjacency
row, not `§6`'s premise, not `§8`'s amendment. **`§1` and `§8` remain the architect's words, byte-for-byte;
a reader who treats `§9` as an edit of either has mis-read this file.**

**A GATE-1 ANSWER SET, NOT A CONTRACT.** **This section asserts no behaviour clause beyond transcribing the
architect's own, no signature, no return shape and no fail-state; it licenses no code task; it admits no
unit row; it moves no ledger count; and it edits no byte of the adjacent project.** **THE MAPPING COLUMN
NAMES THE ROWS EACH RULING LANDS ON; THE DISPOSITION OF EACH ROW — `ANSWERED` / `PART-ANSWERED` /
`CARRIED-OPEN` — is the supplementary pass's (`docs/specs/storeroom-native-proposal-review.md` `§9`), not
this filing's.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited).**

> Node-API, but integration into Provident-Electron will be delegated to that project's agents
> Test write-->read consistency in isolation
> Secure will be a separate instance of this store that is blocked on the node side from addressing less than `file`, not an inbuilt tier
> Journal track store changes (write/delete), expires at end of session, older entries above a configured length compress to a base state
> Constraints/repairs are evaluated node-side
> A write passes back the journal op that it produced so that node can instruct the rollback if needed
>
> Also track the event listeners and pass a list of watched addresses that should be called after a successful write.

**THE SEVEN RULINGS, EACH MAPPED — transcription only, no reading taken of what a ruling does not say.**

| # | The ruling (the architect's own fragment, verbatim) | The rows it lands on (this gate's union, `U-*`; the amendment's `J-*`) | What the fragment does NOT say, stated so no pass invents it |
| --- | --- | --- | --- |
| **`A1`** | *"Node-API"* | **`U-8`** (the native binding mechanism) — and it settles step 3's `ALT-0` carrier: a **Node-API addon** | **it names NO realm** (the host's two bundle targets are `main` node-CJS and renderer browser-ESM, `docs/specs/storeroom-native-proposal.md` `§2` item 5), **no builder** (the `napi` CLI is absent from this machine, `docs/next-steps.md` `L-4`), **no ABI/prebuild policy** (`U-25`), and **no package/install path** |
| **`A2`** | *"integration into Provident-Electron will be delegated to that project's agents"* | **`U-45`** (this unit's relationship to the adjacent project's in-flight cycle) and **`U-26`** (who owns the JS-facing surface) — **and it SETS THIS UNIT'S SCOPE BOUNDARY: the host wiring is NOT this unit's work; the boundary must nonetheless be PROVEN in this repository** | it does **not** say what happens to that project's in-flight `U-STORE-REDERIVE` unit, its frozen artifact, its register or its licence — **that unit's disposition is still unruled**, and a *delegated integration* is not the same fact as *the in-flight unit's fate* |
| **`A3`** | *"Test write-->read consistency in isolation"* | **`U-23`** (the resolver's return shape's observable) · **`U-30`** (the read's selection scope) · **`U-42`** (the read's copy discipline) · **the verification layer itself** — **and it fixes a SCOPE: the verification runs IN ISOLATION (this repository's own suite), not against the assembled host application** | it does **not** say what "consistency" is measured against (byte equality? structural equality? the `file` tier's bytes?) and it does **not** withdraw any of the other rows' questions — **it is a scope and a primary property, not a closure** |
| **`A4`** | *"Secure will be a separate instance of this store that is blocked on the node side from addressing less than `file`, not an inbuilt tier"* | **`U-27`** (the tier domain and `secure`'s presence) — **answered: there is NO fourth inbuilt tier; `secure` is a SEPARATE INSTANCE with a tier FLOOR of `file`** · **`U-38`** (whether the adjacent project consumes the plugin, and `secure` in scope) · **`U-7`/`U-9`** (the tier carrier and the tier parameter's domain), which gain the floor rule's neighbourhood | it does **not** say **how the floor is enforced** (a construction parameter, a separate crate feature, a wrapper), **who blocks** (`"on the node side"`), **what an address below the floor answers** (a refusal token? a throw?), or **whether the floor-bearing instance shares the same journal, listeners and file path** |
| **`A5`** | *"Journal track store changes (write/delete), expires at end of session, older entries above a configured length compress to a base state"* | **`J-1`** (the journal itself) — **PART-ANSWERED: the tracked operations are WRITE and DELETE; the lifetime is the SESSION (it expires at end of session)** · **`J-2`** (rollback by walking back) — **PART-ANSWERED: a CONFIGURED LENGTH bounds the entries, and entries older than it COMPRESS TO A BASE STATE** · **`U-33`** (`temp`'s *"pre-committed"* and the session lifetime) · **`U-11`** (the overwrite arm table) | it names **no configured length VALUE, no default, and no unit of measure**; **no base-state's FORM** (a snapshot of the whole store? the `file` tier's bytes? a compressed operation log?); **no compression trigger semantics** (on append, on read, on rollback?); **no interaction with the `file` tier's own commit duty**, and **no answer to whether a rollback may walk PAST a compressed base** |
| **`A6`** | *"Constraints/repairs are evaluated node-side"* | **`J-3`** (the constraint-checking interaction) — **ANSWERED IN PLACE: evaluation is NODE-SIDE, so the core carries no constraint or repair implementation** · **`U-24`** (module-supplied functions crossing the boundary) — its **carrier** is answered and its **crossing** is not · **`U-39`** (the event/listener surface, the constraint seam and the load verb) | it does **not** say **when** node-side evaluation runs relative to the landing (before? after? provisional?), **what the core must expose for it** (an evaluation record? a state readout?), **what a refusal then does** (the journal op of `A7` is the visible instrument), or **whether repair functions write through the same journaled write path** |
| **`A7`** | *"A write passes back the journal op that it produced so that node can instruct the rollback if needed"* — **and, in the same message,** *"Also track the event listeners and pass a list of watched addresses that should be called after a successful write."* | **`J-5`** (the journal as an observable) — **ANSWERED: the journal op CROSSES as a returned value on every write** · **`J-2`** (rollback by walking back) — **the INSTRUCTION is NODE'S, so the rollback is a CALL the core exposes** · **`U-39`** and **`U-24`**'s listener half — **the core TRACKS the registered listeners and RETURNS, on a successful write, the list of watched addresses whose callbacks node should invoke** | it does **not** say **the returned op's shape** (an id? a record? an opaque handle?), **whether a rollback is by op or by address/time**, **the cost of an unrolled-back op**, **whether a rollback itself writes a journal entry**, **how the watched-address list is computed** (exact match? ancestry? descendants? the corpus's own three position classes? — `store-rederive/seams-and-lifecycle.md` `§2.11`, `census.md §4.8`), **whether a listener is attached by address or by identity**, **whether the list is exhaustive or ordered**, or **what a listener that throws does** |

**AND FOUR THINGS THIS FILING STATES PLAINLY, SO NO PASS MIS-READS §9.** **(1) THESE ARE ANSWERS, NOT
AMENDMENTS OF `§1` OR `§8`** — they settle questions those texts raised and they change no word of either.
**(2) THEY CLOSE SOME ROWS AND OPEN NEIGHBOURS OF THEIR OWN** — `A5`/`A6`/`A7` each name a mechanism whose
parameters are unstated, so their rows become `PART-ANSWERED` with named residuals rather than `ANSWERED`
outright; **the supplementary pass counts them and may not smooth that.** **(3) THE BUBBLE IS NOW
ANSWERED IN PART** — the `decomposition` row's four original questions are answered by `A1`/`A2`/`A3` and
the amendment's by `A5`/`A6`/`A7`, so the row's `disposition` cell may move to a `BUBBLE-ANSWERED` form;
**whether the go-ahead becomes grantable is the supplementary pass's to determine against the residual open
list, and the architect's own go-ahead is a separate act this filing does not infer.** **(4) NOTHING THE
ADJACENT PROJECT CARRIES ANSWERS THESE** — `secure`-as-a-separate-instance, the journal's session expiry
and base-state compression, node-side constraint evaluation, the returned journal op and the
watched-address list are **all new mechanisms** relative to `store-rederive/`, whose constraint phase
evaluates store-side before anything lands, whose deletion instrument is a tombstone, and whose listener
surface carries **no payload, no address list and no unsubscribe** (`store-rederive/contract.md` `§0A`
`DD-17`).

---

## §10. THE ARCHITECT'S SCOPE RULING OF 2026-10-11 — THE UNIT IS THE STORE; THE JS INTEGRATION IS DEFERRED UNTIL THE STORE PASSES TESTING

**APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS SECTION
MOVES** — not `§1`'s directive, not `§8`'s amendment, not `§9`'s answer set, not a single mapped row. **A
reader who treats `§10` as an edit of `§1`, `§8` or `§9` has mis-read this file.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited).**

> Stop asking questions about the JS integration. This is to build the store. Defer the integration until
> the store passes testing

**THE RULING, TRANSCRIBED AS `A8` AND MAPPED — transcription only; what it does not say is printed beside
it.**

| # | The ruling (verbatim fragments) | What it settles | What it does NOT say |
| --- | --- | --- | --- |
| **`A8`** | *"Stop asking questions about the JS integration."* · *"This is to build the store."* · *"Defer the integration until the store passes testing"* | **THREE THINGS, AND EACH IS A DIRECTION TO THIS GATE: (1) a PROCESS ruling — the architect is not to be asked further questions about the JS integration, so a gate-1 record whose open list is dominated by integration rows is asking the wrong question; (2) a SCOPE ruling — this unit's deliverable is THE STORE, not its host wiring, not its packaging, not its load path, not the realm it will one day run in; (3) a DEFERRAL ruling with its own REVISIT CONDITION — the integration is deferred UNTIL THE STORE PASSES TESTING, so the park's exit is an event (the store's own suite green), never a later pass's preference.** | **it does NOT name WHICH rows are "the JS integration"** — in particular it does not say whether the boundary-crossing SHAPES the store produces (the returned journal op, the watched-address list) are deferred WITH the crossing or are store-side deliverables whose shapes the store still owes; **it does NOT say what "the store passes testing" means as an acceptance set** (`A3`'s *"write-->read consistency in isolation"* is the neighbouring clause and the pass must read them together); **it does NOT withdraw `A1`'s carrier ruling, `A4`'s secure-instance ruling or `A5`/`A6`/`A7`'s mechanisms; and it does NOT lift the STEP-0 open rows about the STORE's own vocabulary.** |

**WHAT THIS RULING DOES TO THIS GATE'S OPEN LIST, STATED AS A PARTITION AND NOT AS A COUNT.** **The union
partitions into (i) STORE-SIDE rows — the address grammar, the tier carrier and the monotonic clause, the
instance discipline, the write/read/delete arms, the journal's own behaviour, the constraint-evaluation
seam the store must EXPOSE, the fail-state union, the value taxonomy and the round-trip property — and
(ii) INTEGRATION rows — the realm, the builder/ABI and packaging path, the host handoff, the crossing of
each produced value into JS, and the attachment/throwing rules that only exist once a JS listener exists.
**`A8` puts the whole of (ii) into a PARK whose revisit condition is the store's own green. The COUNT of
each class, and whether any row moves class between them, is the third supplementary pass's determination
(`docs/specs/storeroom-native-proposal-review.md` `§10`) — this filing does not count them.**

**AND THE PARK'S OWN FORM, NAMED SO IT IS NOT IMPROVISED:** a deferral under this project's process is a
**`docs/pending.md` park** — **`OPEN`, NEVER green, with a NAMED OWNER and a POSITIVE REVISIT CONDITION** —
so the integration set is parked there with **revisit condition: *the store passes its own test suite*** and
**owner: the architect (who decides when the deferral lifts) with the supervisor named as the pass that
will surface the green.** **A parked item is not a dismissed item, and the gate-1 verdict may not treat the
park as a closure of the rows it carries.**

**AND ONE CONSEQUENCE FOR THE PLAN, STATED SO NO PASS READS THE PLAN AS UNCHANGED:** the proposal-stage plan
(`docs/specs/storeroom-native-implementation-plan.md`) carries phases whose `BLOCKED-BY` sets are integration
rows; under `A8` those phases are **DEFERRED, not deleted** — they move behind the park, and **the plan's
acceptance criterion narrows to the store's own in-isolation properties until the park lifts.** **The
reconciliation is the supervisor's, and the plan's as-filed text is annotated, never rewritten.**

---

## §11. THE ARCHITECT'S STORE RULINGS OF 2026-10-11 — the eight answers, and the poisoning of the adjacent corpus as a source

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS
SECTION MOVES** — not `§1`, `§8`, `§9` or `§10`, and not one mapped row. **`§1` remains the directive,
byte-for-byte; a reader who treats `§11` as an edit of `§1` has mis-read this file.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited, including the numbering of the question set they answer).**

> 1. The other project files are provided for additional context. They are to be considered poisoned by hallucinated constraints and/or malformed data structuring and not to be mined for direct copying. Where my instructions conflict with the existing work is intentional.
> 2. See above
> 3. Those are the same thing. A lower-tier one *is* a lower persistence one because the tiers are defined by persistence
> 4. See above
> 5. I explicitly said they're two different node types
> 6. Closed set of codes, with generated messages (ex. status: 'AddressNotFound', message: "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'"
> 7. temp has same behavior as mem, except that is shadows mem and is purged on writes to mem, like mem is to file. It is used to distinguish unapplied data (ex. a UI change the user should be able to see for trial purposes, but is not willing to save yet) from long-term data. Mem is lost when app is closed, I said that.
> 8. File path is passed to store on first creation. File rolls back change in journal automatically on failure, then passes failure back to caller.

**THE EIGHT RULINGS, TRANSCRIBED AS `A9`–`A16` AND MAPPED — transcription only; each ruling's own silences
are printed beside it, and NO disposition is taken here (that is the fourth supplementary pass's).**

| # | The ruling (verbatim fragments) | The rows it lands on | What the fragment does NOT say |
| --- | --- | --- | --- |
| **`A9`** | *"The other project files are provided for additional context. They are to be considered poisoned by hallucinated constraints and/or malformed data structuring and not to be mined for direct copying. Where my instructions conflict with the existing work is intentional."* | **`U-31`** (authority) · **`U-32`** (the identifiers' meanings) · **`U-46`** (authority) — **the three AUTHORITY rows** — and, through them, **EVERY ROW WHOSE DISPOSITION WAS GROUNDED IN A CORPUS CLAUSE**, including the record's `DERIVABLE` set and the dossier's collision block | **it does NOT name which individual clauses are poisoned** (the ruling is categorical — *"considered poisoned"*, *"not to be mined for direct copying"* — with no exception list), **and it does NOT say whether the adjacent project remains the CONSUMING repository for the collision sweep or whether its prohibition rows may still be SITED** (citing a prohibition is not mining it for copying, but the ruling does not draw that line) |
| **`A10`** | *"See above"* (answering the tier-carrier question) | **`U-6`** · **`U-7`** — **the tier CARRIER: the DIRECTIVE governs, so the tier is carried as the directive states it, and the corpus's node-tier clause is a poisoned divergence, INTENTIONAL per `A9`** | it adds no clause of its own; the directive's own sentence is the whole of the answer |
| **`A11`** | *"Those are the same thing. A lower-tier one **is** a lower persistence one because the tiers are defined by persistence"* | **`U-10`** (the composite key vs the shadow rule) · **`U-11`** (the overwrite arm table) · **`U-6`** (the tier order) · **`U-43`** (reachability) — **the instance discipline is RECONCILED: "lower tier" and "lower persistence" are ONE predicate, not two, so an anchor at a lower tier IS the shadowing one, and the directive's two sentences (`"key/order + tier is a composite key"` and `"added alongside so it shadows on read"`) describe one rule** | it does **not** state the arm for a SAME-TIER write over an occupied key (the directive's *"if its persistence is the same or less … literally removed and replaced"* is the neighbouring sentence) and it does **not** state whether a shadow may be REMOVED while its higher-tier sibling stands |
| **`A12`** | *"See above"* (answering the delete question) | **`U-12`** (the delete verb's existence and granularity) — **the directive's delete verb STANDS, and its tier-scoped arm reads through `A11`: "delete only that tier(s)" removes the instance at that tier, and the surviving lower- or higher-tier instance at the same key is unaffected unless its tier is named** | it does not restate the cascade's scope (`"and all downstream"` is the directive's own sentence) and does not say what a delete answers to the caller |
| **`A13`** | *"I explicitly said they're two different node types"* | **`U-1`** · **`U-2`** · **`U-4`** · **`U-5`** — **the leaf/branch partition is TWO NODE KINDS as the directive states; the corpus's single mixed node record is a poisoned divergence** | it does not re-state the leaf's back-reference or the fate of the anchor a branch overwrites; **the directive's own words remain those questions' only source** |
| **`A14`** | *"Closed set of codes, with generated messages (ex. `status: 'AddressNotFound'`, `message: "'LandingPage' does not exist in 'window.tabs', tabs are 'doc1', 'searchbar'"`"* | **`U-22`** (the failure channel and the fail-set's closure) — **ANSWERED IN FORM: a CLOSED SET of STATUS CODES plus a GENERATED message carrying the mismatch, in the directive's own words** | it does **not enumerate the codes** (the example names one: `'AddressNotFound'`) and does not say whether a code is a string token, an enum member or a numeric id; **the set's membership is the spec's to close OR the architect's to name, and this filing takes no position** |
| **`A15`** | *"temp has same behavior as mem, except that is shadows mem and is purged on writes to mem, like mem is to file. It is used to distinguish unapplied data (ex. a UI change the user should be able to see for trial purposes, but is not willing to save yet) from long-term data. Mem is lost when app is closed, I said that."* | **`U-33`** (*"pre-committed"*'s content) · **`U-41`** (lifetime across a reload) · **`J-4`** (what preservation, for which tier) · **`J-1`**/**`J-2`** (the journal's own session lifetime, by analogy) — **the tier semantics are ANSWERED: `temp` shadows `mem` and is purged on writes to `mem`, exactly as `mem` shadows `file` and is purged on writes to `file`; `temp` carries UNAPPLIED (trial/unsaved) data; `mem` is LOST WHEN THE APP IS CLOSED** | it does **not** say whether "app is closed" is a process exit or a window/realm teardown, and it does **not** say whether a `temp` purge fires on a `mem` write at the SAME address, the same subtree, or globally |
| **`A16`** | *"File path is passed to store on first creation. File rolls back change in journal automatically on failure, then passes failure back to caller."* | **`U-18`**/**`U-37`** (whose path the `file` tier writes) — **ANSWERED: the path is a CONSTRUCTION INPUT, passed on the store's FIRST CREATION** · **`J-4`** (what a failure preserves) · **the write's failure arm** — **the FILE tier ROLLS BACK THE CHANGE IN THE JOURNAL AUTOMATICALLY on failure, and THEN passes the failure back to the caller** | it does **not** say where that path comes from at first creation (the caller, the app, a configuration), **what "failure" comprises** (the file write alone, the journal's own append, or both), **whether the rollback precedes or follows the caller's own `A7`-ruled journal-op instruction**, or **whether the automatic rollback itself journals** |

**AND FOUR CONSEQUENCES THIS FILING STATES PLAINLY, SO NO PASS MIS-READS `§11`.** **(1) `A9` IS NOT AN
AMENDMENT OF THE PROPOSAL'S `§4`/`§5` QUOTATION AND MAPPING TABLES — IT IS A RULING ABOUT THEIR EVIDENTIAL
STANDING.** The tables' quotations remain as filed and remain **accurate quotations**; **what `A9` decides
is that they are NOT AUTHORITY and never were: the adjacent project's clauses may be SITED as context and
may not be MINED — no clause of this unit may be derived from them, and a row whose only ground was such a
clause is a row with NO lawful ground until it is re-derived from the directive or ruled.** **(2) `A9`
THEREFORE REACHES THE EXISTING `DERIVABLE` DISPOSITIONS**: each `DERIVABLE` row named a corpus clause as its
governing authority, and **the fourth supplementary pass must re-ground each one in the directive alone or
move it back to the architect; a `DERIVABLE` that survives only because a corpus clause said so does not
survive `A9`.** **(3) `A9` ALSO BEARS ON THE STEP-0 DETERMINATION ITSELF**, because the trigger fired on the
premise that this unit's vocabulary *"originates outside this project"* — and the architect has now ruled
that the outside artifact is **poisoned context, not a source**; **whether the trigger still fires, and
whether the dossier's `8` rows and `13` entries are thereby re-grounded or re-statused, is the fourth
supplementary pass's determination and is NOT taken here.** **(4) NO RULING ABOVE ANSWERS A PARKED
INTEGRATION ROW, AND `A8` STANDS**: `A16` names *"passed to store on first creation"* as the STORE's own
construction input, so the path's ORIGIN may be integration-side and parked; **`A15`'s app-closure sentence
is a store-side lifetime clause and is NOT parked.**

---

## §12. THE ARCHITECT'S CLOSING RULINGS OF 2026-10-11 — the last four store questions answered

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS
SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited, with the numbering of the question set they answer).**

> 1. Tier is not a data structure, it is a property.
> 2. The register acts as a link. The anchor interfaces between the node and the link. What is the conflict?
> 3. Process exit. Purge is the write deleting any versions of the addressed node with the same or less persistence.
> 4. Yes, recommended order

**THE FOUR RULINGS, TRANSCRIBED AS `A17`–`A20` AND MAPPED — transcription only; each fragment's silences
are printed beside it, and NO disposition is taken here.**

| # | The ruling (verbatim fragments) | The rows it lands on | What the fragment does NOT say |
| --- | --- | --- | --- |
| **`A17`** | *"Tier is not a data structure, it is a property."* | **`U-1`** (whether the verb enumeration closes) — **ANSWERED: the directive's *"five components"* are the FIVE DATA STRUCTURES — leaf · branch · anchor · link · registry — and TIER BEHAVIOR IS NOT A SIXTH COMPONENT but a PROPERTY, so the enumeration CLOSES at five and the sixth bullet is a property table.** **It also reads through `A10`/`A11` as the carrier's own nature: the tier is a PROPERTY (of the directive's own carrier, the child anchor), never a record kind of its own.** | it does **not** say which record carries the property (the directive's own child-anchor sentence and `A10` are the carrier's source) |
| **`A18`** | *"The register acts as a link. The anchor interfaces between the node and the link. What is the conflict?"* | **`U-2`** (the leaf's back-reference at the register) — **ANSWERED, AND ANSWERED AS A NON-CONFLICT: the back-reference is the ANCHOR's (`"The anchor interfaces between the node and the link"`), and the REGISTER'S case is covered because the register ACTS AS A LINK — so a register-held root node's anchor interfaces that node and the register-as-link exactly as any other anchor does, and nothing is left without a referent.** The architect's counter-question is itself the finding: **no conflict is recorded, and the row is closed on the directive's own words read together (`"A leaf node is pointed to by an anchor or the register, and must point back"` + `"The registry behaves as a link"`).** | it does not restate whether the register-as-link's child anchors carry `order` members (the register's own keyed-not-indexed clause is the directive's) |
| **`A19`** | *"Process exit. Purge is the write deleting any versions of the addressed node with the same or less persistence."* | **`U-33`'s remaining half** — **COMPLETELY ANSWERED, BOTH LIMBS: (a) *"Process exit"* fixes the `mem` lifetime — `mem` is lost when the PROCESS EXITS** (`A15`'s *"app is closed"* is thereby read at its narrow arm, not at a realm or window teardown) **; (b) PURGE IS DEFINED, AND IT IS A **WRITE**'S ACT: the write deletes ANY VERSIONS OF THE **ADDRESSED NODE** — the same address — whose PERSISTENCE IS THE SAME AS OR LESS THAN the writing tier; so purge's scope is THE ADDRESSED NODE'S OWN VERSIONS and not a subtree and not the store.** **The directive's own overwrite sentence is thereby reconciled with `A11`: *"if its persistence is the same or less than the new node"* IS the purge, and *"if the written node is of lower persistence, simply added alongside so it shadows on read"* is the arm where a HIGHER-persistence version survives; the `temp`-on-`mem` and `mem`-on-`file` purge chain of `A15` is this rule's own special case.** | it does **not** say whether a purged version's DOWNSTREAM nodes go with it (the directive's *"cascades to all downstream nodes"* is that sentence's own, and whether it reaches a purge or only a same-tier replacement is the spec's to state or the architect's to rule) |
| **`A20`** | *"Yes, recommended order"* | **`Q4`** (the store's internal build order) — **ANSWERED: the recommended chain is ADOPTED — record shapes → the walk and the resolver → the write/read/delete arms → tiers and purge → the journal and rollback → persistence** | it adopts a SCHEDULE; it does not state what the ordering constrains (the recommended order's own authority is as a plan sequence, not as a dependency proof) |

**AND TWO CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) `A17`–`A20` ANSWER, OR COMPLETE THE ANSWER TO,
FOUR ROWS THAT WERE STILL THE ARCHITECT'S — `U-1`, `U-2`, `U-33` (both limbs) and the bubble's `Q4` — and
THEIR DISPOSITION, AND WHAT FOLLOWS FOR THE DOSSIER'S IDENTIFIER ROWS AND THE OPEN-SEMANTICS ENTRIES, IS THE
FIFTH SUPPLEMENTARY PASS'S DETERMINATION.** **(2) THE RULINGS ABOVE ARE ANSWERS ABOUT THE STORE AND NONE OF
THEM REACHES A PARKED INTEGRATION ROW: `A8` STANDS, `P-1` STANDS (`28` rows, revisit condition: *the store
passes its own test suite*), and no integration question is asked (`AR-42`).**

---

## §13. THE ARCHITECT'S FINAL VOCABULARY RULINGS OF 2026-10-11 — the six answers that close the dossier

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS
SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited, with the numbering of the question set they answer).**

> 1. destroy and replace with a new anchor on the same link
> 2. Decided at write, inferred from contents on read. Write attempting to add to vec when hashmap is used, or vice versa, fails
> 3. Registry is always hashmap
> 4. Optional on read, accepts zero to many tiers, reading any node that matches one if any tier is passed. Exactly one required on write.
> 5. The parent node of the register 'link', ex. read returns object containing the entire registry. Empty address resolves to register.
> 6. find address returns reference.

**THE SIX RULINGS, TRANSCRIBED AS `A21`–`A26` AND MAPPED — transcription only; each fragment's silences
are printed beside it, and NO disposition is taken here.**

| # | The ruling (verbatim fragments) | The rows it lands on | What the fragment does NOT say |
| --- | --- | --- | --- |
| **`A21`** | *"destroy and replace with a new anchor on the same link"* | **`U-5`** and the residual **`J-35`** (the fate of the anchor a branch overwrites when a write re-mints a leaf) — **ANSWERED: the leaf's pointing anchor is DESTROYED and a NEW ANCHOR is placed on the SAME LINK** | it does not say whether the destroyed anchor's tier survives onto the new one (the write's own tier is the directive's carrier, and `A21` does not restate it) |
| **`A22`** | *"Decided at write, inferred from contents on read. Write attempting to add to vec when hashmap is used, or vice versa, fails"* | **`U-13`**/**`J-33`** (the link's container shape and its mutation rule) — **ANSWERED: the container kind is DECIDED AT WRITE and INFERRED FROM CONTENTS ON READ, and a write whose kind CONTRADICTS the existing container FAILS** | it does not name the failure's code (the code set is `A14`'s closed set with generated messages) and does not say whether the failed write leaves the container, the node or the journal untouched (the last is `A16`'s and the write-arm table's) |
| **`A23`** | *"Registry is always hashmap"* | **`U-14`** (the register's order and the integer-segment case) — **ANSWERED: the register is ALWAYS A HASHMAP, so it carries no ordered-vector form and an index-shaped segment has no index semantics to reach** | it does not say whether a numeric-looking segment is a legal KEY as written (the directive's key domain is the caller's own strings, and the corpus's index/order clause is poisoned context) |
| **`A24`** | *"Optional on read, accepts zero to many tiers, reading any node that matches one if any tier is passed. Exactly one required on write."* | **`U-9`** (the tier argument's arity and `tier[]`'s meaning) — **ANSWERED: on read the argument is OPTIONAL and accepts ZERO TO MANY tiers, and a read with tiers passed answers a node whose tier is ONE OF THEM; on write EXACTLY ONE tier is required** | it does **not** restate the ZERO-tier arm's selection rule (the directive's *"lowest-persistence anchor"* + `A11`'s one-predicate discipline are that arm's own source), and does not say whether a passed tier that matches NO version is a miss or a refusal code |
| **`A25`** | *"The parent node of the register 'link', ex. read returns object containing the entire registry. Empty address resolves to register."* | **`U-3`**/**`O-7`** (the `len == 0` referent and the empty array's standing) — **ANSWERED: THE EMPTY ADDRESS RESOLVES TO THE REGISTER, and a read there RETURNS AN OBJECT CONTAINING THE ENTIRE REGISTRY; the empty array is therefore a VALID address and not a malformed one** | **⟶ AND ONE TENSION THIS FILING RECORDS RATHER THAN SMOOTHS: the directive's own sentence reads *"An address.len == 0 resolves to the parent node of the register (which otherwise cannot be addressed)"*, while `A25` says the empty address *"resolves to register"* and that a read there returns the whole registry. The two are the SAME ARCHITECT'S WORDS, dated apart, and the later one is operative on its face; whether the earlier sentence is SUPERSEDED by it or names the same object under a different name is the sixth supplementary pass's determination, NOT this filing's.** It also does not say whether the register-read's object is a deep copy (`A3`'s isolation round-trip is the neighbouring clause) |
| **`A26`** | *"find address returns reference."* | **`U-23`** (the resolver's return shape) — **ANSWERED: `findAddress` RETURNS A REFERENCE** (to the addressed node; the shared resolver of the directive) | it does not say whether that reference crosses a boundary as a value (that crossing is `A8`'s parked integration side), whether it is opaque or inspectable, or how a caller distinguishes it from a value |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) WITH `A21`–`A26` THE DIRECTIVE'S OWN VOCABULARY HAS
AN ANSWER ON EVERY POINT THE GATE'S QUESTION SETS REACHED, AND THE SIX ROWS THEY LAND ON ARE THE LAST THE
ARCHITECT NAMED — their DISPOSITION, and the dossier's resulting statuses, are the SIXTH SUPPLEMENTARY
PASS'S.** **(2) THE CORPUS'S POISONED CONTEXT IS UNTOUCHED BY ALL SIX and no clause above is derived from
it: `A21` contradicts the corpus's tombstone instrument, `A23` contradicts its order-bearing register, and
`A26` contradicts its no-live-reference rule — EACH BY THE ARCHITECT'S OWN WORD, AND EACH INTENTIONAL PER
`A9`.** **(3) `A8` STANDS: the `28` parked integration rows are untouched, `P-1`'s revisit condition is
unchanged, and no integration question is asked (`AR-42`).**

---

## §14. THE ARCHITECT'S RESIDUAL RULINGS OF 2026-10-11 — the eight items, answered

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS
SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited, numbered as the question set they answer; item 2 — *"nothing left beyond the failure code"* — carries NO answer because the supervisor recorded nothing left to answer).**

> 1. Anchors, so they can be read by links more easily
> 3. Confirmed
> 4. Fail on out-of-domain
> 5. Two identifiers
> 6. Required as args on store creation
> 7. Client-side
> 8. Alerts if a write resolves to or through the matched address

**THE RULINGS, TRANSCRIBED AS `A27`–`A32` AND MAPPED — transcription only; each fragment's silences are
printed beside it, and NO disposition is taken here.**

| # | The question it answers | The ruling (verbatim) | The rows/entries it lands on | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A27`** | the tier carrier and the monotonic clause's carrier | ***"Anchors, so they can be read by links more easily"*** | **`U-6`**/**`J-40`** (the monotonic pair rule) and the dossier's `O-2` — **ANSWERED: the TIER IS CARRIED BY ANCHORS, and the monotonic clause `rank(child) ≤ rank(parent)` is therefore stated OVER ANCHORS** (`A10`'s directive carrier + `A17`'s property reading stand beside it) | it does not restate where the WRITE's tier argument lands on the minted anchor set |
| **`A28`** | the tier-free read's selection rule | ***"Confirmed"*** | **`U-9`**'s residual — **CONFIRMED: with NO tier passed, the read selects the LOWEST-PERSISTENCE instance (the directive's own rule, read with `A11`'s one-predicate discipline)** | it does not restate the rule's application at downstream addresses (the per-address assembly is `A11`'s and `J-42`'s neighbourhood) |
| **`A29`** | an out-of-domain tier argument | ***"Fail on out-of-domain"*** | the dossier's **`O-6`**'s remaining half — **ANSWERED: a tier argument OUTSIDE the three tokens FAILS** (the failure's CARRIER is `A14`'s closed code set with a generated message) | it does not name the code (the set's membership is `A14`'s) |
| **`A30`** | whether parent and child anchors are one identifier or two | ***"Two identifiers"*** | the dossier's **`O-9`** — **ANSWERED: `parent anchor` and `child anchor` are TWO IDENTIFIERS, needing their own rows** — **AND THIS RULING CARRIES A SCHEMA CONSEQUENCE THIS FILING STATES PLAINLY RATHER THAN RESOLVES: the dossier's identifier-row cap is FULL (`8` rows, cap `8`), and the adoption contract's own rule is that a NINTH IDENTIFIER ROW IS NEVER LAWFUL — the lawful resolutions are CONSOLIDATION INTO `≤ 8` ROWS or A UNIT SPLIT, and WHICH ONE IS TAKEN IS THE EIGHTH SUPPLEMENTARY PASS'S DETERMINATION** | it does not say WHICH consolidation or split the architect intends; **it does not authorise a ninth row** |
| **`A31`** | the journal's own parameters | ***"Required as args on store creation"*** | **`J-16`** (the configured length) — **ANSWERED: the journal's parameters are REQUIRED CONSTRUCTION ARGUMENTS, passed on store creation** (the same instrument `A16` gives the `file` path) | it does not name WHICH parameters are required (the length alone, or the base state and the compression trigger with it), does not give the length's unit or default-less-ness, and does not say whether a missing argument is a construction failure |
| **`A32`** | the `secure` instance's mechanics | ***"Client-side"*** | **`J-9`**/**`J-11`** (the floor's enforcement and who blocks) — **ANSWERED: the FLOOR IS ENFORCED CLIENT-SIDE — the store does not police it, the consumer does** — and the dossier's `O-12`'s first half | it does not say what the INSTANCE itself does when an address below the floor reaches it anyway, whether that instance shares the journal, listeners and file path, or whether the client-side enforcement is a `HO-` handoff to the consuming project |
| **`A33`** | the watched addresses and the listener alert rule | ***"Alerts if a write resolves to or through the matched address"*** | **`J-26`** (the watched-address list's rule) — **ANSWERED: a listener attached at an address is ALERTED IF A WRITE RESOLVES TO THAT ADDRESS OR PASSES THROUGH IT** — and the dossier's `O-13`'s live half | it does not say whether "through" means ANCESTRY only or ancestry-plus-descendants, whether the alerted list is ordered, how a listener attaches (by address or identity), or what a throwing listener does (`J-27`/`J-28`) |

**AND FOUR CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) THE EIGHT ITEMS I PLACED BEFORE THE ARCHITECT ARE
ANSWERED: three narrowed entries (`O-2`, `O-5`, `O-6`) close, one standing entry (`O-9`) is answered with a
SCHEMA CONSEQUENCE, and the two remaining standing entries (`O-12`, `O-13`) lose their principal halves —
their DISPOSITIONS, the CONSOLIDATION-or-SPLIT determination `A30` forces, and the VERDICT are the eighth
supplementary pass's.** **(2) `A30` IS THE ONE RULING THAT IS NOT A DETAIL: it makes the dossier's row
table overflow unless something is consolidated or the unit is split, and the pass must decide which —
WITHOUT authoring a ninth row.** **(3) THE PARK IS UNTOUCHED: `A32`'s *"client-side"* names the CONSUMER of a
floor, not this unit's work, and a client-side enforcement duty is a `HO-` handoff row, never a step of this
unit (`A8`, `AR-21`/`AR-42`).** **(4) THE GO-AHEAD REMAINS THE ARCHITECT'S SEPARATE, UN-INFERRED ACT.**

---

## §15. THE ARCHITECT'S FINAL FOUR ANSWERS OF 2026-10-11 — the entry list emptied

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS
SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited, numbered as the question set they answer).**

> 1. At most one child anchor per key/index and tier
> 2. Every operation touching the same subtree. If it is old enough to be compacted it's out of scope.
> 3. Not see it
> 4. Op must store enough data to reconstruct the original tree and resolve the current state, and be id'ed for rollback. Listener fires if the address or any of its descendants is resolved on write

**THE FOUR RULINGS, TRANSCRIBED AS `A34`–`A37` AND MAPPED — transcription only; each fragment's silences
are printed beside it, and NO disposition is taken here.**

| # | The question it answers (the entry) | The ruling (verbatim) | What it settles | What the fragment does NOT say |
| --- | --- | --- | --- | --- |
| **`A34`** | the uniqueness key (`O-3`'s remaining half) | ***"At most one child anchor per key/index and tier"*** | **the link's composite key is CONFIRMED at the anchor level: AT MOST ONE CHILD ANCHOR PER `(key/index, tier)` PAIR — so two versions of one key are TWO ANCHORS, and `A11`'s *"a lower-tier one IS a lower persistence one"* reads as the selection rule over precisely those anchors** | it does not restate the container's kind rule (`A22`'s) or name the code a contradicting write fails with (`A14`'s set) |
| **`A35`** | the rollback's reach (`O-11`) | ***"Every operation touching the same subtree. If it is old enough to be compacted it's out of scope."*** | **a rollback UNDOES EVERY OPERATION TOUCHING THE SAME SUBTREE — not merely the last op and not the failing operation's ops alone — and an operation TOUCHING THAT SUBTREE IS UNDOABLE ONLY WHILE IT IS UNCOMPACTED: once an entry is old enough to be COMPACTED into the base state (`A5`), it is OUT OF SCOPE and the rollback does not reach it** | it does not say what "the same subtree" is measured against (the write's address? the addressed node's descendants too?), nor whether a PARTIAL rollback (a subset of that set) is available, nor what a rollback answers when its scope includes a compacted operation |
| **`A36`** | what the `secure` instance does with a sub-floor address, and its sharing (`O-12`) | ***"Not see it"*** | **an address below the `file` floor is INVISIBLE to that instance — the instance does NOT see it at all (no error, no refusal record, no empty answer for a known address: it does not see it).** **Read with `A32`: the client-side block and the instance's own blindness are the SAME fact from two sides.** | it does not say whether the shared journal/listeners/file-path question is thereby moot or still open, and does not say what a WRITE at a sub-floor address does (invisible to the same reading, or refused) |
| **`A37`** | the returned journal op and the listener alert rule (`O-13`) | ***"Op must store enough data to reconstruct the original tree and resolve the current state, and be id'ed for rollback. Listener fires if the address or any of its descendants is resolved on write"*** | **the JOURNAL OP'S CONTENT AND IDENTITY ARE ANSWERED: each write's returned op CARRIES ENOUGH DATA TO RECONSTRUCT THE ORIGINAL TREE AND TO RESOLVE THE CURRENT STATE, AND CARRIES AN ID for rollback** — and **the ALERT RULE is answered: a listener fires if ITS ADDRESS **or ANY OF ITS DESCENDANTS** is resolved on the write (so the watched set is the address's subtree, and `A33`'s *"through"* is therefore DESCENDANT-INCLUSIVE from the watched address downward)** | it does not say the op's concrete record shape or its id's type, does not say whether the alerted list is ORDERED, and does not state how a listener attaches (by address or identity) or what a throwing listener does |

**AND THREE CONSEQUENCES THIS FILING STATES PLAINLY.** **(1) WITH `A34`–`A37` THE LAST FOUR ITEMS I PLACED
BEFORE THE ARCHITECT ARE ANSWERED, AND THE OPEN-SEMANTICS ENTRY LIST HAS NO NON-`ANSWERED` MEMBER LEFT: the
FIFTH, AND FINAL, DISPOSITIONS, the ENTRIES' OUTCOME SET, the VERDICT and the LANDING DUTIES are the NINTH
SUPPLEMENTARY PASS'S.** **(2) `A37` IS THE RICHEST RULING OF THE SET AND IT MAKES THE JOURNAL OP A
STORE-SIDE VALUE WITH A NAMED DUTY (reconstruct-the-original + resolve-the-current + an id) — its concrete
RECORD SHAPE stays the CONTRACT's to state, which is gate 2's carriage and not a further question for the
architect.** **(3) `A8` STANDS: the parked `28` integration rows are untouched, no integration question is
asked, and `A36`'s client-side duty remains a `HO-` handoff row and never a step of this unit.**

---

## §16. THE ARCHITECT'S CLOSING DIRECTIVE OF 2026-10-11 — the listener deferred, and the GO-AHEAD

**<⟶ APPENDED, DATED, FILED IN THE PASS IT ARRIVED (`RCA-8(d)` ANNOTATE-BESIDE). NOTHING ABOVE THIS
SECTION MOVES.**

**THE ARCHITECT'S WORDS, VERBATIM (unedited).**

> Defer listener implementation. Just build the damn thing

**THE TWO RULINGS, TRANSCRIBED AS `A38` AND `A39` — the second of which is the GO-AHEAD THIS GATE HAS BEEN
WAITING FOR.**

| # | The ruling (verbatim fragment) | What it settles | What it does NOT say |
| --- | --- | --- | --- |
| **`A38`** | ***"Defer listener implementation."*** | **THE LISTENER IMPLEMENTATION IS DEFERRED — the alert mechanism (`A33`'s *"resolves to or through the matched address"* and `A37`'s *"or any of its descendants is resolved on write"*) is NOT BUILT in this unit.** **It is PARKED in the shape `A8` gave the integration: a `docs/pending.md` park — `OPEN`, never green, with a named owner and a POSITIVE REVISIT CONDITION — and NOT a dismissal.** **Its consequence for the dossier's `O-13`: the LISTENER limbs (the alerted list's ORDER and a THROWING listener body) are PARKED RATHER THAN ANSWERED, and the op's record shape and the journal's configured length remain CONTRACT CARRIAGE — so `O-13` closes as `ANSWERED`-for-carriage plus PARKED-for-listeners, WHICH IS THE TENTH PASS'S DETERMINATION, NOT THIS FILING'S.** | it does not say whether the STORE still TRACKS listener registrations and RETURNS the watched-address list (the *"pass a list of watched addresses"* half of the earlier directive) or whether that too is deferred; **the tenth pass must determine the park's exact boundary from these words, and a park is not permission to drop the subject silently** |
| **`A39`** | ***"Just build the damn thing"*** | **THE ARCHITECT'S GO-AHEAD: THE UNIT MAY PROCEED — gate 2 (the CONTRACT) may be entered.** **Read with `A8` (*"This is to build the store… defer the integration until the store passes testing"*), the directive is the architect's own instruction to STOP ASKING and START BUILDING: the store is to be specified and implemented, with every unresolved detail carried as a REVERSIBLE `DECLARED-DEFAULT` row rather than escalated.** **`G-1`'s condition — *"the architect gives the go-ahead"* — is SATISFIED by these words, recorded here verbatim.** | it does not lift the ADOPTION TRIGGER's rules, does not answer a residual, and does not authorise a gate SKIP: **gate 2's own gates — the contract directory, the typed register, the red set, the green, the adversarial pass, the blind greens, the documentation gates and the trio — all still run**, and the park `P-1` and the new listener park each keep their revisit conditions |

**AND ONE CONSEQUENCE THIS FILING STATES PLAINLY, BECAUSE IT IS THE ARCHITECT'S OWN INSTRUCTION AND NOT A PASS'S
CHOICE.** **FROM THIS POINT THE UNIT IS BUILT: the SPEC WRITER authors the contract against these rulings, and
every residual this gate carried — the `7` store-side rows, `J-53`–`J-67`, `O-13`'s carriage limbs — becomes a
REVERSIBLE `DECLARED-DEFAULT` ROW in that contract, with its alternative priced and its reversal point named,
NEVER A FURTHER QUESTION TO THE ARCHITECT.** **NO GATE IS SKIPPED AND NO GATE COUNT MOVES (`0 DONE / 1 open`
UNITS = `1`): the path from here is the one `docs/specs/storeroom-native-implementation-plan.md` prints —
contract → register → red → green → adversarial → blind greens → doc gates → trio → DONE.**

---

**END OF THE PROPOSAL.** **§1 is the architect's own text, byte-for-byte. §2 is the measured context. §3
is the filing's bounds. §4 is a quotation table with no reading taken. §5 is a map of adjacent subjects
with no ruling. §6 records the adoption trigger's premise and leaves its determination to the gate. §7 is
the provenance. §8 is the architect's APPENDED AMENDMENT of 2026-10-11 — the journaled write and delete with
rollback by walking the journal back. §9 is the architect's APPENDED ANSWER SET of 2026-10-11 — the seven
rulings the gate's questions were asked for. §10 is the architect's APPENDED SCOPE RULING (`A8`): this unit
builds THE STORE, the JS integration is DEFERRED until the store passes testing, and no integration
question is to be asked. §11 is the architect's APPENDED STORE RULINGS (`A9`–`A16`) — the poisoning of the
adjacent corpus as a SOURCE (`A9`: context only, never mined; conflicts intentional), the tier carrier
(`A10`), the instance discipline as one predicate (`A11`), the delete verb (`A12`), the two node types
(`A13`), the closed failure codes with generated messages (`A14`), the `temp`/`mem` semantics and purge
chain (`A15`), and the `file` path as a first-creation input with an automatic journal rollback on
failure (`A16`). No behaviour clause beyond a transcription, no signature, no return shape, no fail-state
§12 is the architect's APPENDED CLOSING RULINGS (`A17`–`A20`): TIER IS A PROPERTY AND NOT A DATA STRUCTURE (so the directive's *"five components"* close at leaf · branch · anchor · link · registry), the leaf's back-reference IS the anchor's and the register's case is covered because the register ACTS AS A LINK (no conflict — the architect's own counter-question), `mem` is lost on PROCESS EXIT and PURGE IS THE WRITE DELETING ANY VERSIONS OF THE ADDRESSED NODE WITH THE SAME OR LESS PERSISTENCE, and the RECOMMENDED BUILD ORDER IS ADOPTED (record shapes → the walk and resolver → write/read/delete arms → tiers and purge → journal and rollback → persistence). §13 is the architect's APPENDED FINAL VOCABULARY RULINGS (`A21`–`A26`): the overwritten anchor is DESTROYED AND REPLACED BY A NEW ANCHOR ON THE SAME LINK (`A21`); the link's container is DECIDED AT WRITE AND INFERRED FROM CONTENTS ON READ, and a kind-contradicting write FAILS (`A22`); the REGISTRY IS ALWAYS A HASHMAP (`A23`); the tier argument is OPTIONAL ON READ AND ACCEPTS ZERO TO MANY TIERS, with EXACTLY ONE REQUIRED ON WRITE (`A24`); the EMPTY ADDRESS RESOLVES TO THE REGISTER and a read there returns the entire registry (`A25`, with the tension against the directive's *"parent node of the register"* phrasing recorded rather than smoothed); and `findAddress` RETURNS A REFERENCE (`A26`). 
§14 is the architect's APPENDED RESIDUAL RULINGS (`A27`–`A33`): THE TIER IS CARRIED BY ANCHORS (so the monotonic clause is stated over anchors) · the tier-free read selects the LOWEST-PERSISTENCE instance (confirmed) · an OUT-OF-DOMAIN TIER FAILS · `PARENT ANCHOR` AND `CHILD ANCHOR` ARE **TWO IDENTIFIERS** (a ruling that carries the dossier's row-cap consequence) · THE JOURNAL'S PARAMETERS ARE REQUIRED CONSTRUCTION ARGUMENTS · THE `secure` FLOOR IS ENFORCED **CLIENT-SIDE** · and A LISTENER IS ALERTED **IF A WRITE RESOLVES TO ITS ADDRESS OR PASSES THROUGH IT**. §15 is the architect's APPENDED FINAL FOUR ANSWERS (`A34`–`A37`): AT MOST ONE CHILD ANCHOR PER KEY/INDEX AND TIER (`A34`) · a ROLLBACK UNDOES EVERY OPERATION TOUCHING THE SAME SUBTREE, and an operation OLD ENOUGH TO BE COMPACTED IS OUT OF SCOPE (`A35`) · a sub-floor address is **NOT SEEN** by the `secure` instance (`A36`) · and the JOURNAL OP **STORES ENOUGH DATA TO RECONSTRUCT THE ORIGINAL TREE AND RESOLVE THE CURRENT STATE, IS ID'ED FOR ROLLBACK**, while a LISTENER FIRES IF **ITS ADDRESS OR ANY OF ITS DESCENDANTS IS RESOLVED ON THE WRITE** (`A37`). §16 is the architect's APPENDED CLOSING DIRECTIVE (`A38` + `A39`): **THE LISTENER IMPLEMENTATION IS DEFERRED** (a park, `OPEN` never green, with its own revisit condition) and **THE GO-AHEAD IS GIVEN** — *"Just build the damn thing"* — so gate 2 (the contract) may be entered and every unresolved detail is carried as a reversible `DECLARED-DEFAULT` row rather than escalated. and no ruling beyond the architect's own is asserted anywhere in this file.**
