# Handoff — `provident-storeroom 2.0.0`, for downstream agents

**WHAT THIS IS.** The state a downstream agent inherits at `2.0.0`: what changed, what you must do, what you must not break, and the facts this cycle bought
dearly. **The authority is `strata/decisions.md`** — this file summarises and points; where the two disagree, **the rulings win**. Rulings `D-150`…`D-202` are
this cycle's; everything earlier stands.

---

## 1 · The released state

| | |
|---|---|
| **version** | **`2.0.0`**, a `MAJOR` — seventeen sites (the main manifest, its five exact `optionalDependencies` pins, the six `platforms/*/package.json`, and the three generated version lines) |
| **tag** | **`v2.0.0` → `861b877`** — cut, pushed, published. **`scripts/publish.sh --verify 2.0.0 --yes` passes whole**, which no earlier version could |
| **artefacts** | **seven**: `provident-storeroom` + five native platform packages + **`@auspicion/provident-storeroom-js-wasm`** (the WebAssembly realm) |
| **workflow** | `.github/workflows/publish.yml` — `platform` (matrix of five) → `wasm` → `main`, with `main` carrying `needs: [platform, wasm]` |
| **gates** | `npm test` **1400 / 0** · `cargo test` **690 / 0** · `typecheck` `0` · `cargo check --target wasm32` `0 errors` · **`npm run greens` 11 runners, all exit `0`** · the installed battery `EXIT 0` |

---

## 2 · What changed in the surface, and what a consumer observes

**Read `RELEASE-NOTES.md`'s `§2.0.0` for the full list; these are the five an agent is most likely to trip on.**

1. **`record.op.compacted` IS GONE** (`D-189`). The record carries **seven** members: `opId, kind, address, tier, before, after, seq`. Any code reading `compacted`
   must be deleted, not defaulted — **`Object.hasOwn(op,'compacted')` is now `false`**, and several cells assert exactly that.
2. **A `write` FIRES ONLY WHERE THE LITERAL CHANGES** (`D-193`/`D-195`/`D-196`, `P-3`). The comparison is **the value an unqualified read answers at the address**
   against **the value the act lands**, by the store's own `PartialEq` — **not reference identity, not the per-tier list**. **Two accepted prices, and neither is a
   defect to repair**: `file V` then `mem V` **fires nothing** although `readTiered` moves; `0` over a standing `-0` **fires nothing** although `sameStanding` would
   call it moved. **The pass narrows with the firing** (one predicate, `D-69`), and **`watched` narrows with `triggered`**.
3. **A REFUSED CONSTRUCTION REMOVES THE FILE IT CREATED** (`D-197`/`D-198`/`D-199`, `P-2`) — on **every** refusing arm — **and never touches a file that existed
   before the call**. **A listener whose watched address sits below a scalar is no longer fired**: absence is `AddressNotFound` **and** `LeafHasNoDownstream`.
4. **A CLOSED ATTEMPT'S REPORT IS RETAINED BY REACHABILITY** (`D-175`/`D-176`) — a `WeakMap` keyed by the attempt's `ref`, with a weak id index so
   `parameter-semantics §2.15`'s **two forms both answer**. **`CLOSED_ATTEMPT_WINDOW`'s `1024` has no reader.**
5. **THE SECOND REALM** (`D-155`…`D-157`, `D-167`): `storeCreate(bindings, cfg)` from an injected module; **`filePath` refused** (`FilePathUnreachable`), **`saveCall` is
   how it saves**; **every value is deep-cloned by `structuredClone` on that arm**; a `Proxy` **at a carrier gate is not detected** (declared). **The arm's module
   exports nineteen entries; the addon's twenty** (`commitFile` absent on the arm, `storeRelease` on both).

---

## 3 · What you must do, mechanically

- **The next release begins with a bump**: `bash scripts/publish.sh --bump X.Y.Z --yes`, then `--check`, then `--tag X.Y.Z --yes` **which prints the tag commands
  and does not run them** (`release.md §4.1`: *no pass publishes, packs, tags, installs or attests*). **The architect runs the three lines.**
- **Any `run:` step you write in the workflow either declares `shell: bash` or contains no bash**: no `/dev/null`, no `then`/`fi`, no `||`, no `$( … )`, **and no
  bare `$VAR`** — `windows-2022` runs `run:` in `pwsh`, where `$VAR` is a different, usually empty, thing. **`W-STEP-1` fails locally if you get this wrong**;
  run `node --test tests/e2e/staged-install/publish.test.mjs` before you push.
- **A guard's directory comes from `GUARD_DIR`**, never an interpolated argument (`scripts/guard-publish-version.mjs`).
- **Ship-side prose has two copies**: `docs/guides/package-use.md` → `bindings/js/README.guide.md`, and `RELEASE-NOTES.md` → `bindings/js/RELEASE-NOTES.md`.
  **Copy byte-for-byte; never hand-edit the landing.** The preflight `cmp`s them.
- **After changing a version, a manifest or a generated line, rebuild**: `CARGO_HOME="$PWD/.cargo-home" npm run build` (the artefact bakes the version) **and**
  `node scripts/build-wasm-package.mjs` for the arm.

---

## 4 · What you must not break

- **The two accepted prices of `D-193`** — see §2 item 2. **`CD-2`, `CD-3` and `CD-9` assert them as declared states so a later pass cannot "fix" them.**
- **`D-202`'s instruments**: the guard script, `W-STEP-1`, the idempotent publish gates, and `--verify`. **Re-run rather than reason**: a re-run skips whatever
  already published and completes the rest.
- **`A55` at a construction** — a refused construction leaves nothing behind **except a file it did not create**.
- **The tag-tag coupling rule** (`PAR-PUB-18`/`PAR-PUB-29`): **the manifest at a tag's commit must declare that tag's version**. **It judges each tag against its own
  commit**, so older tags are fine.
- **`node:` in the realm-neutral body.** `bindings/js/src/entry/**` carries **no `node:` specifier** (`CW-4`'s cell asserts the arm's whole graph). A filesystem need
  goes through a channel — `installConstructionFileGuard` is the precedent.

---

## 5 · Hard-won facts, each bought with a failed release

| the fact | what it costs to forget |
|---|---|
| **The workflow lives inside the tagged tree.** A `run:` fix is only reachable by **moving the tag**. | four tag moves in one release |
| **`require('a/b')` is a module specifier**, not a path; `./a/b` is a path. | an instant `MODULE_NOT_FOUND` on every leg |
| **`npm` is `npm.cmd` on Windows**; `execFileSync('npm', …)` cannot launch it without `shell: true`. | a refusal that looks like a registry outage |
| **An ask that failed is not an answer** (`D-21`) — the guard **refuses** rather than concluding | a "not published" conclusion from a dead network |
| **Trusted publishing is per package name**: a new artefact's **first publish is a bootstrap** with a credential, and its trusted publisher must exist afterwards. **IT IS ONE-TIME PER NAME, AND THE SIXTH ARTEFACT'S HAS HAPPENED** — `@auspicion/provident-storeroom-js-wasm` was bootstrapped at `2.0.0` and its publisher is configured, so **every later release publishes it through the federation like the other six, with provenance** (`D-205`). | `D-201`'s failure, after the build had already passed |
| **`npm stage approve`/`reject` take a `stage-id`**, not a package spec; **approve the main package LAST** (its pins must exist first). | an incomplete consumer set |
| **`git commit --amend --reset-author` resets the AUTHOR DATE too**; replay with explicit `GIT_AUTHOR_DATE`/`GIT_COMMITTER_DATE`. | a session's chronology collapsed into one minute |
| **A `FinalizationRegistry` held value is STRONG** — holding the kernel there pins the store and defeats the retirement. | a leak that a cell (`SR-01`) catches late |
| **The wasm build is deterministic**: a forced rebuild reproduces the identical `.wasm`, so a no-op `cargo` run can be *proved* correct rather than assumed. | suspecting a stale artefact, or shipping one |
| **`publish.sh --cut-claims` refuses a cut-claim phrase even inside a negation**; reword, do not argue. | a preflight refusal that reads like a false positive |

---

## 6 · Where the record is

| for | read |
|---|---|
| **this cycle's rulings** | `strata/decisions.md` · `D-150` … `D-202` — every row quotes the architect where it rests on his words |
| **the change list, for consumers** | `RELEASE-NOTES.md` · `§2.0.0` — eleven-plus entries, one `MAJOR` heading |
| **the consumer guide** | `docs/guides/package-use.md` — **§13 is the WebAssembly realm**; §5.4 is the journal's retention and §3.1 the member table |
| **this cycle's two designs** | `docs/L3/change-detection/design.md` (`P-3`) and `docs/L3/creation-as-write/design.md` (`P-2`) — **each says at its head that its own cell census was short, and by how much** (three other `docs/L3/*/design.md` files predate this cycle and are unmoved) |
| **the release machinery** | `scripts/publish.sh` (its own header is the runbook), `scripts/guard-publish-version.mjs`, `.github/workflows/publish.yml` |
| **the readiness ledger** | `docs/L1/publish-readiness.md` · **§12 is current; §2's table is a dated record and its banner says so** |
| **the authorship remap** | `docs/L1/commit-authorship-remap.md` — 42 rows, old hash → new, and the two corrections it needed |
| **the two retros' sources** | `docs/L1/journal-retention-rca.md` (the four table leaks) · `docs/L1/wasm-realm.md` (the second realm, §1–§22) |

---

## 7 · What is owed, named rather than implied

1. **`P-1`** — the durability tier of returned data: **additive**, and it still needs its ten questions answered. The only proposal left.
2. **The sixth artefact's `2.0.0`** carries **no provenance attestation** and a **bundled README predating the `readTiered` table fix** — **and both are facts about `2.0.0`
   alone**: the bootstrap is one-time, so **`2.0.1` onward publishes that arm through OIDC with provenance and the current guide**, exactly like the other six (`D-205`).
3. **A second spelling for `{k:'F'}`** — **answered by default (`D-189` item 1, the mark keeps one floor spelling)**, so this is *closed*, listed here only because
   the design docs still discuss it as open.
4. **`crossing.md`'s absent parts** — `docs/specs/storeroom-js/contract.md`'s part map declares one relocated and one **absent**, and the spec act that would close
   it is a **`role_spec_writer`'s**.
5. **`docs/specs/storeroom-publish/release.md` is cited and not tracked** — the runbook's law (`§4.1`) lives in a part this tree does not carry. **The script quotes
   it at the byte**, so nothing is lost from the code, but a reader cannot follow the citation.
