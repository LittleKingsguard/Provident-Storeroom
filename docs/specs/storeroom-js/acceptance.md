# `acceptance` — the JS test layer, its LAYER label, the round-trip property and the `HO-` handoff ledger

**KIND: `carrier`.** **This part holds RELOCATED SECTIONS of `docs/specs/storeroom-js/contract.md`'s own
text — its `§4` (`§4.1`–`§4.5`) — WHOLE**: **the relocated span keeps its `§`-number, its tables, its prose
and its authority citations unchanged**, and *a relocation is not a re-derivation — no claim gains or loses
an authority by moving* (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — the kind rule, and
§C.11.9 — the ordinary cross-reference clause | requirement]`). **A citation to it names THIS part's path
plus the `§`-number**, because *a bare `§n` across two documents is not an edge* (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.9 | requirement]`). **The relocation is SPAN-BY-SPAN
and BYTE-EXACT against the baseline, and the pass's own record enumerates the citation re-spellings it
required as a REQUIREMENT list, one line per re-spelled citation, old form → new form** (`[A3
docs/specs/spec-scope-and-structure/contract.md §C.11.8 (ii)–(v), and its class (v-2) | requirement]`).

---

## §4. The acceptance layer — the runner, the pattern, and the LAYER label

**AUTHORITY NOTE FOR THIS SECTION, AND ITS RELOCATION.** **This section's whole text is carried at
`docs/specs/storeroom-js/acceptance.md` (`§1`–`§5` of this document, relocated WHOLE)**, the `carrier` part
this directory's map declares for it (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.9 |
requirement]`).

### §4.1 The runner and the pattern

1. **THE JS LAYER RUNS UNDER `node --test`.** **The suite uses `node:test` and `node:assert`; it drives the
   package through its CLAIMED ESM ENTRY POINT and never the `.node` addon directly** (`DD-18`).
   **A test that loads the addon itself is a finding: it would not drive the crossing, only the store.**
2. **THE RUST LAYER RUNS `cargo test` IN `bindings/js/`.** **The conversion core's per-class table is
   drivable there, because the crate declares the `rlib` half** (`package.md §4.1`; `DD-19`).
3. **THE SUITE'S OWN PATTERN, STATED SO IT IS CHECKABLE:** **one test per crossing row of `§1.2`/`§1.3`
   (the accepted form and each refused form), one test per verb's success shape, one test per code the
   surface can reach, one test per registry rule of `§2.4`, and one test per `HO-` row — the last asserting
   only that the package EXPOSES NO entry for that realm.**
4. **THE SUITE'S OWN FILE SET, NAMED SO NO CLOSURE-ARITHMETIC OF THIS DIRECTORY MOVES:** **the JS suite and
   the sibling crate's Rust tests live under `bindings/js/`, NOT under this spec directory and NOT under the
   store's `tests/**`** (`DD-19`) — **so the `test-cases` part of this directory is a derived INVENTORY and
   never the suite itself** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.6 binding rule 1 |
   requirement]`).
5. **THE TOOLCHAIN THE RUNNER NEEDS IS ON THE DECLARED PROBE AND IS NOT RE-MEASURED HERE:** **Node
   `v24.20.0`, which ships `node --test`; and Rust `1.98.0` with an offline-capable `cargo` for the sibling
   crate's own leg** (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`'s figure-with-its-site
   rule; docs/next-steps.md `L-4`'s probe as that record reads it | numeric or census claim]`).

### §4.2 The LAYER label — and the rule no pass may break

1. **THIS UNIT'S JS-SIDE GREEN IS `ENVELOPE/PURE`, AND THE LABEL TRAVELS WITH EVERY FIGURE.**
   **Every reported figure names its SITE (the command and the directory it ran in) and its LAYER.**
   (`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-10`; A1
   docs/specs/storeroom-js-proposal-review.md §5 — the layer discipline | numeric or census claim]`)
2. **THE ASSEMBLED/`APP` LAYER FOR THIS UNIT IS `NONE`.** **The unit delivers a LIBRARY — a sibling crate
   and a JS package — and exposes no rendered surface, no IPC and no MCP/UI tool surface; there is no
   assembled application to be green.**
3. **NO `APP`-GREEN MAY BE CLAIMED FROM A NODE TEST, AND NO `APP`-GREEN MAY BE CLAIMED FROM A `cargo test`
   EITHER.** **A node-suite green is `ENVELOPE/PURE`-green and never `APP`-green** (`DD-20`).
4. **THE STORE'S GREEN IS NOT RE-LABELLED AND NOT RE-MEASURED AS THIS UNIT'S.** **The store's suite is
   re-run, when it is re-run at all, as a NON-REGRESSION RECORD; the figure reported for it is the one the
   artifact that carries it prints, and the as-filed figures the gate-1 record names are marked HISTORICAL
   at their own sites** (`DD-31`, `DD-33`).

### §4.3 The round-trip property — the architect's directive, in JS terms

**THE DIRECTIVE'S OWN WORDS: *"passing in various JSON … expect exact match in all cases"*** (`A39`'s
neighbourhood; the store's `e2e_json_round_trip` battery is the Rust half). **THE PROPERTY THIS UNIT'S JS
LAYER ASSERTS, STATED IN THE JS-SIDE EQUALITY TERMS OF `crossing.md §1.5`:**
**for every value `v` in the layer's corpus, `read(instance, address)` after
`write(instance, address, tier, v)` must be EQUAL to `v` UNDER THE RELATION OF `crossing.md §1.5` —
member-SET equality for objects, array index order significant, and `Object.is` where sign or `NaN` matters.**
**THE CORPUS AND THE TWO EXCLUSIONS, AND NOTHING ELSE:** **the corpus is `various JSON` — a string, a
boolean, a finite number, an empty object, an empty array, a nested object, a nested array, an object
holding an array holding an object, and a value carrying an integer-like key beside a non-integer-like one;
and TWO DECLARED EXCLUSIONS stand: (i) a `file`-tier `-0` is read back as `0` after a boot — the declared
file-image normalization, asserted by the STORE's battery and NOT by this layer (`DD-5`); and (ii) object
member ORDER is not compared, because the engine re-orders integer-like keys.** **`0` other exclusion is
declared, and a third exclusion is a finding**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-14`'s round-trip property; A3
docs/specs/storeroom-native/contract.md §5.2 · P-IM-1 | requirement]`).

**AND THE ONE THING THIS PROPERTY DOES NOT CLAIM, STATED SO THE LAYER'S HONESTY IS CHECKABLE:** **the
FILE-IMAGE CANONICAL NUMBER SPELLING IS OUTSIDE THIS UNIT'S ACCEPTANCE LAYER.** **`docs/specs/storeroom-native/contract.md
§7.2` item 7 (c) says no verb returns JSON text, so a JS test can reach the canonical image only by reading
`cfg.filePath` behind the package's back — which `DD-5` REFUSES.** **The rule is therefore asserted by the
STORE's own Rust battery against the file's bytes, and this unit cites it rather than re-proving it**
(`[A1 docs/specs/storeroom-js-proposal.md §9.1 · `K4` — the canonical spelling is observable only through the
`file` bytes; A3 docs/specs/storeroom-native/contract.md §7.2 item 7 | prohibition]`).

### §4.4 The red set — authored from this contract alone, run and reported BEFORE implementation

**THIS UNIT'S RED SET IS ITS OWN, LIVES IN `bindings/js/`, IS AUTHORED FROM THIS CONTRACT ALONE, AND IS RUN
AND ITS FAILING SET REPORTED BEFORE ANY IMPLEMENTATION** (`DD-19`). **The store's `tests/**` is re-run as a
non-regression record, never rewritten, and no assertion is weakened**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.2 item 3 — the red set's ownership; A1
docs/specs/storeroom-js/implementation-plan.md §2 — `Q2`'s own phase | requirement]`).

**AND THE REGISTER'S LAYER, NAMED SO THE EXECUTION IS CHECKABLE:** **the typed register's `8` rows (`§5.1`–`§5.8`)
are executed at the gate the plan's phase table names, each row printing its strategy id and its verdict,
with `un-run` a FAILURE** (`[A1 docs/specs/storeroom-js/implementation-plan.md §4 item 8 |
requirement]`).

### §4.5 The `HO-` handoff ledger

**SEVEN ROWS — `HO-1`…`HO-7` — each with the duty, its owner, and its positive revisit condition. NO
HANDOFF IS DISCHARGED AS A PATCH, and this unit dispatches no implementer into any consumer**
(`contract.md §9`; `package.md §2`; `DD-21`, `DD-41`)
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 — `AR-7`; A1 docs/specs/storeroom-js-proposal.md §9 ·
A2 — *"integration into Provident-Electron will be delegated to that project's agents"* | requirement]`).

**AND THE LEDGER'S OWN ARITHMETIC, PRINTED WITH ITS TERMS: `7` rows = `6` unclaimed realms + `1` route —
`6 + 1 = 7` ✓ — and NO row is a bare `OWED`: each names an owner and a positive revisit condition**
(`[A1 docs/specs/storeroom-js-proposal-review.md §5.4 · `AR-7` · `AR-12` | numeric or census claim]`).

---

**END OF THIS PART.** **It carries the contract's `§4` whole and declares nothing the contract does not
already carry: the `§`-numbers, the rules, the property and every authority citation are the contract
document's own** (`[A3 docs/specs/spec-scope-and-structure/contract.md §C.11.6 — a carrier introduces no
claim of its own | requirement]`).
