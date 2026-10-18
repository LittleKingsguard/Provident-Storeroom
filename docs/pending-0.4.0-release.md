# PENDING WORK TO GET THE THREE RULINGS INTO A RELEASE (2026-10-17)

**MEASURED STATE, SUPERVISOR'S OWN SHELL. THE SPEC SIDE OF ALL THREE RULINGS IS LANDED; THE CODE SIDE IS NOT.**

## THE THREE RULINGS AND WHERE EACH STANDS

| # | Ruling (architect's words) | Spec | Code |
|---|---|---|---|
| 1 | *"Bubble the message log to the client on failure, override any clauses that forbid this."* | **LANDED** — `surface.md §2.5`'s 2026-10-16 clause: the thrown form is `{status, message, log}`, arity `2 → 3`; the forbidding clause withdrawn at its own cell; the twelve-member set and the one-name namespace UNMOVED | **NOT IMPLEMENTED** |
| 2 | *"catch a throw from a repair and encapsulate the message to distinguish forgeries"* | clause read: `surface.md §2.5` item 5 (e) | **IMPLEMENTED AND VERIFIED** — `encodeConfig` moved outside the boundary try + a provenance guard on `fail`; four shapes now surface as themselves; the store's refusal still exactly `[status, message]` |
| 3 | *"run constraints against the store when they are added…"* + *"If a constraint can produce a valid repair, attempt the repair. The client is trusted to know the side-effect behavior of their constraints."* | **LANDED** — `contract.md §7.3` (b) states 1/2/`3-bis`; `ConstraintListInvalid` (#16) reused, NO 17th member, `11 + 2 + 1 + 1 + 1 = 16` ✓ and `CODES` length UNMOVED; mechanism = a SYNTHETIC ATTEMPT; `A135` recorded | **NOT IMPLEMENTED** |

**RULING 3'S CONSEQUENCE, WHICH MUST BE STATED IN THE RELEASE NOTES: REGISTRATION IS NOW A MUTATING ACT.** A constraint registered against an already-violating state can **edit the store durably**, as a side effect of being registered — licensed by the trust clause and by no other. **A consumer holding a read expectation while registering must be told; the guide owes it.**

## THE BUILD WORK OWED (spec is law; nothing below is written yet)

1. **The log on the thrown form** — three own enumerable members on every arm, an object literal (not `defineProperty`, not a getter, not a prototype entry); `[]` where no attempt exists; **taken BEFORE the attempt is disposed of, never read afterwards.** Where the kernel produced the failure, its own three-member object crosses unchanged; where a store act produced it, the store's `status`/`message` are preserved byte-for-byte and `log` is attached beside them.
2. **The registration-time evaluation and the synthetic attempt** — `K-2`-shaped, nine `AttemptRecord` members unchanged, kernel-minted `ref`, `address` the pair's own, `checkpoint` `null`, a real log, `ops`/`ran`/`appliedRepairs` written only where a repair was attempted. **Rust and JS together.**
3. **The repair at registration lands a durable `JournalOp`** — readable back, not a dry run.

## THE THREE RED CELLS — ALL CONSEQUENCES, NONE A DEFECT

| cell | cause | owner |
|---|---|---|
| `bindings/js/test/file-tier-save.test.mjs`'s `fts_S_CENSUS_no_rank_moves…` (`:1311`) | **the log route authored a `PAR-JS-26` row, so the parameter count moved `25 → 26`; the cell pins `25`** — assertion reads `26 !== 25` | **test writer re-derives the cell** |
| `NG-PUB-J::the version equals a resolved tag…` | **`v0.3.0` was left behind at the `0.3.1` cut; `assertTagCoupling` reads EVERY tag the repository carries** (`DEF-2026-10-17-F`) | **ARCHITECT'S ACT — retire `v0.3.0` locally AND remotely as was done at `0.3.0`'s cut, or rule trailing tags acceptable and re-derive the coupling cells** |
| `P-PUB-8::S-TAG no publish verb…` | same cause | same |

**THE SUITE READS `499` TESTS / `496` PASS / **`3` FAIL** — supervisor-measured. NO PASS MAY REPORT IT GREEN.**

## THE RE-DERIVATION SET THE TEST WRITER OWES — LINES CORRECTED BY THE SUPERVISOR

`§70`'s four caught-object census cells are **NOT** at the lines it reported; the spec pass's own edits shifted them. **Supervisor-verified today: `file-tier-save.test.mjs:186`, `:879`, `:934`** (and a fourth reading the same shape), each re-deriving to `{log, message, status}` sorted, length `3`. **Plus `surface.md:1613`** (the two-member crossing assertion), **`docs/specs/storeroom-js-greens.md`'s `JSG-10.19`** (the pass called this path missing; **IT RESOLVES — the path was spelled without its directory**), **and the additions `§72` names** (`surface.md:1707`, `contract.md:3783`/`:3794`, `kernel-surface.md:122`/`:177`, `attempt-lifecycle.md:131`/`:198`, `fail-surface.md:32`, `composition-and-states.md:213`).

## THE RELEASE ACT

**VERSION — NEEDS THE ARCHITECT'S FIAT.** These changes **ADD SURFACE**: a third member on the thrown failure form, and a registration that can mutate. **`MINOR` is "a member ADDED"; `0.4.0` is therefore the class — confirmed by fiat as `0.3.0` was (`A128`).**
**THEN, IN `release.md §2.5`'s BINDING ORDER:** the carriage sentence names the version → the ELEVEN version cells move TOGETHER → **the tag is cut and pushed only after both.** `scripts/publish.sh` is a RUNBOOK: its `--bump`/`--tag` refuse without `--yes`, and it PRINTS the tag commands rather than running them. **Auth-bearing steps (yours): the push, the tag push, and npm auth (`npm whoami` is `E401`).**
**AND THE ACCEPTANCE TEST MUST RE-RUN ON THE PUBLISHED BYTES** — the clean-install drive that found `DEF-2026-10-17-A` on `0.3.0`, extended to the four new shapes. **Every green above will be CHECKOUT evidence only; `APP` layer is `NONE`.**

## OPEN ITEMS THAT TRAVEL WITH THE RELEASE AND DO NOT BLOCK IT

- **`DEF-2026-10-16-O`** — the retired-spelling re-close needs an UNCAPPED enumeration (`516` sites in four paths; `1,088` across `docs/`).
- **`DEF-2026-10-16-S`** — two units declare the same eight property ids; the contract itself asks for *"a fresh ruling on the row-id family"*.
- **`DEF-2026-10-17-G`** — a repair returning `{message, repair}` reported success while the value was unchanged (silent non-repair). **Ruling 3's attempted-repair path may subsume this — verify rather than assume.**
- **The `<mismatch clause>` per-instant message** for `#16` — `OWED` to the architect (`contract.md:4039`); the attempted-repair route uses the same generator and phrase.
- **The route's ceiling** — a nested repair attempt's own log is `OWED`.
- **`typecheck/consumer-fixture.ts` does not exercise the caller-throw path**, so ruling 2's behaviour is not type-exercised.
