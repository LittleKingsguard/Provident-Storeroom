# CONSUMER VERIFICATION — `provident-storeroom@0.1.2`

## The retry against the published bytes: the load-path blocker is CLEARED, and the store works end to end

| | |
| --- | --- |
| **From** | `Provident-Electron` (the consumer) — the retry of `docs/handoffs/2026-10-11-storeroom-sibling-build-and-file-creation.md` |
| **To** | the `Provident-Storeroom` repository |
| **Dated** | `2026-10-12` |
| **The handoff being retried** | `docs/handoffs/2026-10-11-storeroom-sibling-build-and-file-creation.md` (its sibling-side copy: `docs/handoffs/2026-10-11-incoming-from-provident-electron.md`) — **its bytes stand unamended; this document is the dated retry, not a rewrite of it** |
| **Sibling revision examined** | `4101f05` (`the release is complete and nothing is open`) — the release that shipped `0.1.2` |
| **Artefacts under test** | `provident-storeroom@0.1.2` + `@auspicion/provident-storeroom-js-linux-x64-gnu@0.1.2`, installed from the registry on `linux-x64-gnu` |
| **Result** | **ITEM 1 — CLOSED.** The package loads, constructs and stores data. **ITEM 2 — UNCHANGED at `0.1.2`, and correctly re-filed by the sibling as a DECISION CONFLICT (`DEF-20`) rather than a code defect — our own filing is corrected in §3.** **ITEM 3 — unchanged (latent).** |

---

## §0. THE RESULT IN ONE LINE

**`0.1.2`'s artefact self-report is stamped at build time (`option_env!("STOREROOM_JS_PACKAGE_VERSION")` with the crate's version as its fallback), so `version()` answers `"0.1.2"`, the artefact equals its own manifest, the version read passes, rung one loads — and the consumer's full battery goes green: construction, `mem` writes, `read`, `rollback`, `file`-tier commit, `readLiteral`, and a boot-load round trip all work against the published tarballs.**

**AND THE ONE PRECONDITION OUR OWN HARD STOP NAMED IS THEREBY DISCHARGED:** `Provident-Electron`'s residual **`R-3`** (the artefact's `version()` must equal the wrapper manifest's) **is CLEARED**. Only **`R-4`** (its own collision clause `P-9`, an architect act in the consumer repo) still holds the consumer's binding unit behind the stop.

---

## §1. THE BATTERY RUN (every line below is a command's own output, taken `2026-10-12` on `linux-x64-gnu`)

**Install — clean directory, no prior package:**

```
$ npm install provident-storeroom@0.1.2
added 2 packages in 796ms
```

**§1.1 Identity — the observable `acceptance.md §3.1` row `4` names, read from the published bytes:**

| Read | Value |
| --- | --- |
| wrapper manifest `version` | `0.1.2` |
| the wrapper's five `optionalDependencies` pins | all five at exactly `"0.1.2"` — no range, no caret, no wildcard |
| platform package directory | `LICENSE`, `README.md`, `package.json`, `storeroom_js_binding.node` |
| platform manifest `version` | `0.1.2` |
| **the artefact's own `version()`** | **`"0.1.2"` — `MATCH_MANIFEST = true`** |
| the artefact's export set | `version`, `errorMessage`, `storeCreate`, `call`, `register` |
| the wrapper's export set after `import` | the eight verbs — `storeCreate`, `read`, `readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten` |

**§1.2 The construction matrix — the same five configurations that threw under `0.1.1`:**

| `storeCreate` configuration | Under `0.1.1` | **Under `0.1.2`** |
| --- | --- | --- |
| `{ journalLength: 8, listeners: [] }` (no `filePath`) | throws `FilePathUnreachable`, subject the package name | **constructs** — instance carries `on`, `off`, `register` |
| `filePath: '/tmp/psr012-store.json'` (writable parent, file absent) | throws (load) | **constructs** |
| `filePath: '/tmp/nope-dir-xyz/store.json'` (absent parent) | throws (load) | **`FilePathUnreachable`, subject the PATH** — `DD-40` (a), as declared ✓ |
| `filePath: '/tmp'` (a directory) | throws (load) | **`FilePathUnreachable`, subject `/tmp`** — `DD-40` (b), as declared ✓ |
| `filePath: '/usr/bin/psr012-probe.json'` (root-owned `0755`) | throws (load) | **constructs** — see §3 |

**§1.3 The store itself — the eight verbs exercised through the published wrapper:**

| Step | Result |
| --- | --- |
| `read(s, ['a'])` on an empty store | throws `AddressNotFound` — *"'a' does not exist in '', it holds no keys"*, as declared |
| `write(s, ['a'], 'mem', 42)` | `WriteRecord` with `op.opId = op-1`, `watched = []`, `triggered = 0`; `op` carries `opId · kind · address · tier · before · after · seq · compacted` |
| `read(s, ['a'], 'mem')` after the write | `42` |
| the `file` after a **`mem`** write | **does not exist** — the tier parameter governs, as declared |
| `rollback(s, 'op-1')` | `{ opId: 'op-1', undoneOps: ['op-1'], restoredTo: { present: false } }` |
| `read(s, ['a'])` after the rollback | `AddressNotFound` — the write is undone |
| `write(s2, ['b'], 'file', 'v')` | `op.opId = op-2` |
| the file after the **`file`** write | **exists, 9 bytes** |
| `read(s2, ['b'])` / `readLiteral(s2, ['b'])` | `"v"` / `"v"` |
| **a fresh `storeCreate` over the same path, then `read(['b'])`** | **`"v"`** — the boot-load round trip works |

**That is a working package.** The three declared failure arms exercised here (`AddressNotFound`, `FilePathUnreachable` on both `DD-40` states, and §3's `FileCommitFailed`) each answered with the declared status and a subject naming its own site.

---

## §2. ITEM 1 — CLOSED, AND WHY THE CLOSURE IS OURS TO REPORT

The sibling's own release record names the carrier: `docs/decisions.md` — *"**`DEF-19`**'s REMEDY IS `(a2)` — **THE RELEASED ARTEFACT'S SELF-REPORT IS STAMPED AT BUILD TIME FROM THE PACKAGE MANIFEST, AND THE CRATE'S OWN VERSION STAYS INDEPENDENT IN SOURCE**"* — and the code agrees (`bindings/js/src/facade.rs` :1434: `option_env!("STOREROOM_JS_PACKAGE_VERSION").unwrap_or(env!("CARGO_PKG_VERSION"))`, with `bindings/js/Cargo.toml` :3 still `0.1.0`).

**That is remedy (a) in its build-stamp form — the cheaper of the two forms our handoff priced — and it preserves `PAR-PUB-32`'s substitution guard, which remedy (b) would have weakened.** We record the adoption explicitly because the alternative was live and the choice was the sibling's to make.

**Why this verification could only come from here:** `acceptance.md §3.1` row `3` says it — *no in-place battery can reach the rung-one observable* — and row `4`'s agreement is *"a fact of the published bytes rather than of the tree"*. The battery in §1 was run against **the registry's tarballs in a clean directory**, which is the only place those two rows can be observed.

---

## §3. ITEM 2 — UNCHANGED AT `0.1.2`, AND OUR FILING IS CORRECTED

**Measured at `0.1.2`, on the same instance that constructs successfully:**

```
/usr/bin/psr012-probe.json  (root-owned 0755, uid 1000)
  storeCreate(...)          ->  constructs (register tier fixed at `file`)
  write(su, ['c'], 'file', 1) ->  THROW { status: 'FileCommitFailed',
        message: "'c' could not be committed to '/usr/bin/psr012-probe.json', the file write failed at '/usr/bin/psr012-probe.json'" }
  /usr/bin file created     ->  false
  write(su, ['c'], 'mem', 1)  ->  op-4   (the mem tier owes no file and succeeds)
```

**THIS MEASUREMENT CLOSES THE ONE GAP OUR HANDOFF LEFT OPEN.** Our §3 labelled the deferred consequence *"derived, not measured"* — we could not drive it, because the addon's `call` argument encoding is the package's own and the wrapper was unloadable. **It is now measured: the misconfiguration surfaces at the FIRST COMMIT as `FileCommitFailed`, exactly as `DD-45`/`DD-40` declare the deferred state, and the construction-time dry run does not catch it.**

**AND OUR FILING IS CORRECTED, on the sibling's own re-file — which we accept and record here rather than leave in silence:**

| Our handoff said | The sibling's re-file says |
| --- | --- |
| the probe *"contradicts `A52`/`A55`/`DD-40`'s own rule"* — presented as a **code defect** | **`DEF-20` is re-filed as a DECISION CONFLICT, NOT A CODE DEFECT: `DD-45` (mode bits, ACTIVE) against `A52`/`A55`/`DD-40` (write access is required); the code implements `DD-45` faithfully.** It splits out of the sibling's fix unit, because *"a decision reversal is not a defect repair"* |
| — | **our handoff cited only one side of that conflict and never cited `DD-45`** — so our finding was right about the **behaviour** and incomplete about the **authority**: the sibling's contract contains two ACTIVE rows that cannot both govern one probe, and that internal contradiction is the real finding |

**What we measured stands** (the false pass, the deferred `FileCommitFailed`, the `mem`-tier control). **What we mis-assigned was its class.** The correction is the sibling's, and we adopt it: a fresh ruling plus a bounded amendment is owed, not a patch.

---

## §4. ITEM 3 — UNCHANGED (LATENT)

The load-path refusal's clause still speaks of a path that *"must exist or the application must be able to write it"* while naming a package, and the store's `filePath` refusal emits the same clause naming a filesystem path. **With `0.1.2` loading correctly the confusion is latent rather than live** — it returns only if an artefact ever mismatches again, which is exactly the state `PAR-PUB-32` keeps terminal. Filed as a wording finding; the single-arm design is respected and no sixteenth status is proposed.

---

## §5. THE REVISED ACCEPTANCE BATTERY

Every assertion is one line, and all but the last are now demonstrably executable from a clean directory:

1. **Install and import by name** — the eight verbs export. *(rows 1–2)* ✓ measured
2. **`require(platformName).version() === manifest.version`, read from the published tarballs** — **this is the assertion that would have caught `0.1.1`; it is now `true`.** *(row 4)* ✓ measured
3. **A store constructs with no `filePath`, in `mem`** — no throw. ✓ measured
4. **The full verb round trip** — `write` → `read` → `rollback` → gone; `file`-tier write → file created → boot-load returns the value. ✓ measured
5. **The probe matrix, asserted for effective access** — a parent the process cannot write must be refused at construction (**today it is not: §3**); an absent parent and a directory each answer `FilePathUnreachable` ✓ measured; a writable parent with an absent file constructs **and creates nothing** ✓ measured.
6. **The two failure subjects are distinguishable without parsing the subject** — open (§4).

---

## §6. WHAT REMAINS OPEN, EACH WITH ITS OWNER

| Item | Owner | State |
| --- | --- | --- |
| `DEF-20` — the mode-bit probe conflict (`DD-45` vs `A52`/`A55`/`DD-40`) | **the sibling's architect** — a fresh ruling plus a bounded amendment of `contract.md`, split out of the sibling's existing fix unit | OPEN (upstream) |
| The clause ambiguity (our item 3) | the sibling, at its own discretion | OPEN — LOW, latent |
| The consumer's hard stop | **`Provident-Electron`'s architect** — the residue is `P-9`'s collision clause alone | **`R-3` CLEARED by `0.1.2`; `R-4` stands** |

---

## §7. EVIDENCE AND PROVENANCE

| What | Where |
| --- | --- |
| The handoff this document retries (bytes unamended) | `docs/handoffs/2026-10-11-storeroom-sibling-build-and-file-creation.md`; sibling copy `docs/handoffs/2026-10-11-incoming-from-provident-electron.md` |
| The consumer's defect catalogue | `docs/defects.md` — `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH` (**now RESOLVED by `0.1.2`**) and `STOREROOM-FILE-PROBE-FALSE-PASS` (**OPEN, upstream**) |
| The consumer's gate-1 record and residual conditions | `docs/specs/storeroom-binding-review.md` (`R-3` in §2A; the hard stop in §7) |
| The sibling's own dispositions | `docs/defects.md` `DEF-19`/`DEF-20`; `docs/decisions.md` (`DEF-19`'s remedy `(a2)`; the `DEF-20` decision-conflict re-file); `docs/specs/storeroom-publish/U-STOREROOM-CONSUMER-FIX-greens.md`; `docs/specs/storeroom-native/contract.md` `DD-45`; `bindings/js/src/facade.rs` :1424–:1434 |

**All measurements were taken `2026-10-12` on `linux-x64-gnu`, in `/tmp/psr012/probe`, against the registry's `0.1.2` tarballs, by this repo's supervisor. Labels are honoured: measured = a command's own output; derived = a consequence reasoned from a citation (there is one such label left, and it is named as such where it appears). Nothing was patched, stubbed or vendored in either repository.**
