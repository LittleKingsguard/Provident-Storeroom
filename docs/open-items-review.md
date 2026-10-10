# OPEN ITEMS REVIEW — the whole project, at `U-STOREROOM-JS`'s close-out

**Filed 2026-10-11 by the supervisor, on the architect's request: *"Review open defects."*** **Every row is read at its own bytes in `docs/defects.md`, `docs/pending.md`, `docs/next-steps.md` and the gate records. Owner, severity, and the smallest disposition for each. `DEF-1`…`DEF-16` are CLOSED; `DEF-18` is CLOSED (the link-structure repair).**

## §1. OPEN DEFECTS — `1` of `18`

**`DEF-17` — OPEN · owner the `TestWriter` · severity MINOR/cosmetic, with one substantive half.** `tests/walk_and_resolver.rs`'s segment-domain drive compiles a message as a plain string literal (`"§2.2 L-1: {what} is outside the segment domain"`) where a `format!` injection was meant, so a reader sees the literal `{what}` and the binding is unused (`unused_variables`). **THE SUBSTANTIVE HALF, RECORDED WITH IT: no `clippy --tests` leg exists among the trio's legs**, so `cargo test`'s warnings from `tests/**` (unused imports, `unused_mut`, a `non_snake_case`) are surfaced by no gate — the red set's own warning hygiene is currently unmeasured. **Smallest disposition: the one-line `format!` fix by the file's author role, plus a decision on whether the trio gains a `clippy --tests` leg** (that is a process decision, not a defect fix).

## §2. OPEN CONTRACT / PROCESS ITEMS

| # | Item | Owner | Severity | Smallest disposition |
| --- | --- | --- | --- | --- |
| **1** | **`CF-DUP-3` — an unpinned delivery-window corner** (an identity registered *during* the same delivery window by an earlier listener's body: is it invoked at its second occurrence? The implemented reading is that the dedup is over the array's identity set, so it is **not**) | the architect (one line) or a priced default | MINOR (no drive; unreachable by any shipped cell) | **one line from the architect, or carry the implemented reading as a priced `DECLARED-DEFAULT`** with its three recorded revisit conditions |
| **2** | **`LIVE-F1` / `LIVE-OBS-2` — the gate-5 record's `233 PASS · 3 FAIL`** is the gate-5 tree's **historical** figure; the operative run is **`236/236`** (commit `9707ee9`), and `surface.md`'s citation was corrected at gate 8 | the gate-5 record's pass / the supervisor | MINOR (a stale figure in a record; the operative figure is named in the `DONE` row) | a dated correction clause **in the record** (it is gitignored archive, so it is record hygiene, not a reader-facing error) |
| **3** | **the proofreader's three undecidables**: (a) the greens head's *"`236` assertions over `13` scenarios"* census phrasing; (b) `110` vs `103` on the store's JSON battery; (c) `P-TP-8` is **driven JS-side only** | (a) the greens set's author · (b) both readings already carry their trees · (c) **by design** (a JS-side register row is driven by the JS runner) | MINOR each | (a) a phrasing fix; (b) **leave as carried** — each figure names its tree; (c) **record as a coverage note, not a gap** |
| **4** | **`napi_is_exception_pending`** — an unused Node-API declaration in the sibling crate | the implementer | MINOR (dead ABI surface) | delete it, or declare why it stays |
| **5** | **`S-PROBE-DRY`'s PID-keyed scratch directory** — a latent flake of the same class the `DrivePath` repair closed for its siblings | the `TestWriter` | MINOR (latent; green serially) | move it onto the drive-owned path helper, as its siblings were |
| **6** | **three cells still print the pre-close-out ledger figure** (`test-cases.md` row 71; `storeroom-js-proposal.md`; `storeroom-js-proposal-review.md`) | the supervisor's tracker pass | MINOR (a stale citation) | one dated clause per cell naming the operative figure |
| **7** | **the ledger's own unit-census question: does the listener AMENDMENT count as a unit?** Under `2 DONE / 1 open` = `3` (rows-as-units, the tracker's carried reading) vs `1 DONE / 1 open` = `2` (units = `U-STOREROOM-NATIVE` + `U-STOREROOM-JS` only, per the amendment's own close-out wording) | **the architect (one line)** | MINOR (arithmetic only; both readings are printed in the tracker) | **one line**, and the tracker adopts it |
| **8** | **the store's `N1` `DONE` row's pre-amendment figures** (`374`/`8-of-8`/`318`) still stand where they describe the amendment-time tree | the supervisor's tracker pass | MINOR (each names its tree) | a dated clause re-reading them against `377`/`8-of-8`/`395`+`107` |

## §3. HANDOFFS — `HO-1`…`HO-7` (open by construction, each with an owner and a revisit condition)

**CJS** (no arm published; non-exposure measured live) · **Electron `main`** · **Electron `preload`** (no host or ABI here) · **Electron renderer** (the `.node` is unloadable with `nodeIntegration` off) · **browser** (false by construction) · **workers** (no worker entry or transferable plan shipped) · **any IPC route** (**a second crossing** — another unit's work, needing its own serialization contract). **Owner for the first six: the consumer's agents (`A2`; `A9` read-only).** Each revisit condition: a ruling claiming the realm, or a consumer that installs the package.

## §4. THE TWO THINGS NO GREEN RETIRES

1. **NO CONSUMER APPLICATION HAS EVER LOADED THIS PACKAGE.** The `APP` layer is `NONE`; the live battery verifies the real artifact in a real process with real file I/O — **not** a consuming application.
2. **THE PUBLISH/PREBUILD STORY IS DECLARED BUT UNEXERCISED** — the registry identity, the five-target matrix, the CI that would build it and the hosting decision are contract clauses; nothing resolves or loads a published artifact.

## §5. PARKS — none is a defect; all read correctly

**`P-1` LIFTED** (`A66`, *"this is the unpark of the integration"*) · **`P-3` LIFTED** (`A44`) · **`P-2`'s surfacing duty MET**. **`G-1`/`G-2`** are process rules whose subjects have moved; `G-2`'s escalation duty is satisfied by the architect's own answer sets. **No park reads as a closure, and `CF-DUP-3` is the only `OPEN` row carried in `pending.md`.**

## §6. THE COUNT, WITH ITS TERMS

**Open defects `1` of `18`** (`DEF-17`) · **open contract/process items `8`** · **handoffs `7`** · **the two unretired statements `2`** · **parks lifted `2`, duty met `1`, none open as a closure.** **Of the eight contract/process items, THREE need a human decision (the `CF-DUP-3` line, the ledger's census line, and the `clippy --tests` leg question); FIVE are one-line repairs any author role can take.** 
