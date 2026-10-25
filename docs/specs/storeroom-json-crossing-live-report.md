# LIVE REPORT — the blind greens set `JC` (the crossing's bare JSON value tree, both directions, and the sixteen boundary refusals) driven against the RUNNING PACKAGE

**THE SET UNDER TEST.** `docs/specs/storeroom-json-crossing-greens.md` — the blind scenario set for
`U-STOREROOM-JSON-CROSSING`, authored from the documentation alone and landed with its runner
`bindings/js/test/json-crossing-blinded.test.mjs`: **`67` cells, groups `§A`–`§G`, declared `67` PASS / `0` FAIL**
on the `ENVELOPE/PURE` layer. **This report is the LIVE battery over the SAME `67` cells, driven against the
package as a consumer reaches it, over a REAL store on REAL disk, and it ends every round-trip cell at the
SETTLED STATE (a fresh instance reopened over the same store path).**

**THE LIVE RUNNER.** `bindings/js/greens/json-crossing-live.mjs` — an INDEPENDENT re-drive written against the
set's own cell ids so the two censuses can be diffed cell by cell. **RUN, from the repository root:
`node bindings/js/greens/json-crossing-live.mjs` for the `LIVE/CHECKOUT` reach, and the same runner with
`JC_REACH=LIVE/INSTALLED` pointed at an installed copy of the published tarball for the `LIVE/INSTALLED` reach.**
Each reach was run **twice**; the `RESULT` lines were byte-identical between the two passes of each reach, and
identical between the two reaches apart from the reach label. **EXIT `1` on both reaches — and the single
non-zero reason is the one FINDING at `LIVE-B54`, named in `§5`; no cell FAILed.**

**THE SURFACE DRIVEN.** The package's own **entry module** (`bindings/js/index.mjs`), imported exactly as a
consumer imports it, loaded against its **real built native addon**
`bindings/js/build/Release/storeroom_js_binding.node` (the evidence that THIS file loaded is the run's own
`/proc/self/maps` read, printed below), driving a **REAL store on REAL disk** (`cfg.filePath` in an
`fs.mkdtempSync` directory under the platform temp root), through the package's own **commit route**
(`src/constraint-kernel.mjs`'s `commit` + `runAttempt` — `surface.md §2.11` clause 2: the terminal arm's act is
the store's `commit_file`, the only route by which this layer writes `cfg.filePath`).

**NO REPAIR WAS MADE.** No file under `src/**`, `tests/**`, `bindings/js/src/**`, `bindings/js/index.mjs`, and
no landed test file, no spec document and no cell of the blind set was edited by this pass. **The bytes this pass
wrote in the tree are exactly two files: this report and its runner**
(`docs/specs/storeroom-json-crossing-live-report.md`, `bindings/js/greens/json-crossing-live.mjs`). The other
modifications visible in the working tree (`docs/specs/storeroom-js/crossing.md`,
`docs/specs/storeroom-js/surface.md`, the four `docs/specs/storeroom-json-crossing/*` documents and
`docs/specs/storeroom-native/implementation-plan.md`) stood there when this pass began and were **NOT touched**;
the untracked `docs/specs/storeroom-json-crossing-greens.md` and `bindings/js/test/json-crossing-blinded.test.mjs`
are the blind writer's own bytes and were **NOT touched** either.

---

## §0. THE LAYER CLAIM — two reaches, labelled, never blurred

**A. `LIVE/CHECKOUT`** — the checkout's entry module and the checkout's built native addon, in-process, over real
files on a real disk. **This is `LIVE/CHECKOUT` reach: it is evidence about THIS CHECKOUT, not about the
published package.** It is **not** `A127` / `R1` package evidence, and nothing here retires or alters an
`ENVELOPE`, `NODE` or `TRIO` row.

**B. `LIVE/INSTALLED`** — the package BYTES a consumer installs: `npm pack` of `bindings/js` produced
`provident-storeroom-0.5.0.tgz` (sha1 `4b99ba3f7c05eec86731a6baf7bd15b26a0350a6`, integrity
`sha512-/CgYAVqLkMJDfWnSO9b7CY0fZCdz0kVEm3+v+mrXz610oG/xdZvQUUnouYh3QM5LWG9ACUW0sghx9wE20BbNDQ==`,
sha256 `ec6a6d0dfa94ff16d3d2587221774b4eed276b1eb8a5adf1c56104512057fd07`, `5` files), installed with
`npm install <tgz>` into a temp project, and driven through the **installed** `index.mjs` and the **installed**
`src/constraint-kernel.mjs`. **The tarball's JS bytes are byte-identical to the checkout's** (both sha256
`0d5af1a291cddd6ecd998941eb916a92557ff58f7877d0f834a1ab7a7172f7ca` for `index.mjs`; both
`b07eb4edbb9a2215c7b69edc2c6947bee7b1aacfe6407f13e051b4d2fd9f36d8` for `constraint-kernel.mjs`), so this
reach adds the **packaging and entry-resolution** facts rather than different JavaScript.

**B's DECLARED LIMIT, STATED SO IT IS NOT OVER-READ.** The tarball **carries no native addon** (`5` files:
`index.mjs`, `index.d.ts`, `package.json`, `README.md`, `src/constraint-kernel.mjs`); the published platform
packages (`@auspicion/provident-storeroom-js-<target>`) are **not available offline** and their directories in
this checkout carry only `package.json` + `README.md`. So for reach B the runner **supplied the checkout-built
addon at the entry's own module-relative rung two** (`<package>/build/Release/storeroom_js_binding.node`), which
is exactly the layout a locally built install has. **Reach B is therefore `LIVE/INSTALLED` for the JS entry and
kernel bytes and `LIVE/CHECKOUT` for the native bytes, and this report says so wherever it is cited.** The
absent-addon state itself was **driven** and is recorded in `§6` (it answers the declared `FilePathUnreachable`
form and returns no instance) — that is the honest limit of what the tarball alone can do.

**NO `APP`-GREEN IS CLAIMED OVER THE GREENS' OWN LAYER.** The greens declare `ENVELOPE/PURE` and `APP` = `NONE`;
this pass adds the live, assembled, on-disk verification of the same cells and claims nothing over the envelope
layer. **The greens' own runner was run once for context and reproduces its declared figures on this checkout
(`node --test bindings/js/test/json-crossing-blinded.test.mjs`: `tests 67`, `pass 67`, `fail 0`); that is
`ENVELOPE/PURE` evidence and is NOT this report's evidence.**

---

## §1. THE RUN — identity, reach, determinism

| what | `LIVE/CHECKOUT` | `LIVE/INSTALLED` |
| --- | --- | --- |
| entry module | `bindings/js/index.mjs` | `<install>/node_modules/provident-storeroom/index.mjs` |
| kernel module | `bindings/js/src/constraint-kernel.mjs` | `<install>/node_modules/provident-storeroom/src/constraint-kernel.mjs` |
| addon actually mapped (`/proc/self/maps`) | `bindings/js/build/Release/storeroom_js_binding.node` — `1,371,448` bytes, md5 `96c14669e5c0fa10eb0c76d412a3c8bd` | `<install>/node_modules/provident-storeroom/build/Release/storeroom_js_binding.node` — `1,371,448` bytes, md5 `96c14669e5c0fa10eb0c76d412a3c8bd` |
| the addon's identity vs the build | md5 identical to `bindings/js/target/release/libstoreroom_js_binding.so` (staged `2026-10-23 02:32`, built `2026-10-23 02:31`, `bindings/js/src/codec.rs` mtime `2026-10-23 02:31` — the staged artefact is the current build) | same bytes, copied at the entry's rung-two path |
| node | `v24.20.0` `linux` `x64` | `v24.20.0` `linux` `x64` |
| store root | `/tmp/jcx-LIVE-CHECKOUT-kqCU3D` (pass 1) | `/tmp/jcx-LIVE-INSTALLED-Omvbbc` (pass 1) |
| store path pattern | `<root>/<cell-id>-<random>/store.json` | same |
| figures | `cells=69 pass=66 fail=0 finding=1 observed=2` | `cells=69 pass=66 fail=0 finding=1 observed=2` |
| runner exit | `1` (the one FINDING) | `1` (the one FINDING) |
| repeat pass | identical `RESULT` lines | identical `RESULT` lines |

**THE CELL COUNT IS `69` = the `67` greens cells + `2` observations of this runner's own** (`LIVE-X1`, `LIVE-X2`
in `§6`). Every one of the `67` greens cells is driven here; no cell of the set is missing from the census, and
no cell is a GAP, a LAYER-LIMIT or a PARK.

**VERDICT TOKENS (this report's own, printed by the runner):** `PASS` = the cell's declared observable AND its
settled state hold; `FAIL` = the greens' own observable was not produced; `FINDING` = the greens' observable held
on the in-memory route but the SETTLED state contradicts the cell's claim (reported, never repaired);
`OBSERVED` = a live observation of the runner's own, recorded not asserted.

---

## §2. THE SETTLED STATE — what every round-trip cell had to reach

For every admitted-value cell the runner did all five steps, and the cell is a `PASS` only if all five hold:

1. **create** a store over a real path (`PKG.storeCreate({ filePath: <dir>/store.json, journalLength: 8, listeners: [] })`);
2. **write** the caller's value through the public surface (`K.commit` → the instance's own `write`);
3. **commit** it to disk (the package's own terminal arm, `K.runAttempt`; `outcome === "passed"` asserted);
4. **REOPEN a fresh instance over that same store path** and `read` the value back at the `file` tier;
5. **assert** (a) the read-back is the same bare tree (deep-equal on the contract's own equality: member SET for
   objects, index order for arrays, `Object.is` for numbers, prototypes not part of the tree), (b) the whole
   register the fresh boot reads is the bare tree, (c) **the store's own file on disk exists, is non-empty, is a
   JSON image, and that image's value at the address IS that bare tree** — i.e. no tag, no `{"v":…}` envelope,
   no `{"e":…}` side-channel in what the store actually wrote.

For every refused cell the settled state is the **unchanged** store: the write throws the declared refusal, the
file's bytes on disk are **byte-identical** before and after, a fresh instance over that path reads an **empty**
register (`{}`), and a `read` at the refused address answers **`AddressNotFound`** (nothing landed as data).

**THE WRITE ROUTE, NAMED ONCE.** `instance.write(address, tier, value)` is the public verb where the walk and the
crossing refusals live; the `file` tier's durability is reached by the package's own kernel terminal arm (the
same route the corpus's `file-tier-save` suite and the `JAS` live report drive). A **bare** `write` on the `file`
tier performs no file I/O (the store's own clause), so a round trip that stopped at `write` + `read` on the SAME
instance would not be a settled state; **this battery therefore commits and reopens, and would have caught any
value that only exists in the live instance's memory.**

**ONE TIER SUBSTITUTION, DECLARED.** The greens' round-trip cells print the `mem` tier (`write(['a'], 'mem', …)`);
this pass drives the same cells at the **`file`** tier, because the settled state the live battery demands is a
store ON DISK and `mem`/`temp` carry no disk state (`temp` was driven: a `temp`-tier value is readable only on
the instance that wrote it — `§6`). The tier is outside this contract's subject (`contract.md §1`'s subject
caption: the contract governs the value tree, "it does not govern carrier addresses, tiers, …"), so the
substitution changes no expectation of the crossing; where the tier DOES change the answer, `§5` reports it.

---

## §3. THE SCENARIO CENSUS — `67` cells, one row each

**Reach column legend: `C·I` = identically `LIVE/CHECKOUT` and `LIVE/INSTALLED`** (both reaches produced identical
read-backs, identical on-disk images and identical verdicts; only the store paths differ, and those are per-run
temp paths).

### §A — the admitted tree, both directions, with nesting and deep copy (`19` cells)

| id | greens cell | scenario | reach | verdict | observed (the settled state) |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B01` | `JC-B01` | `write(['a'], 'x')` → commit → reopen → `read(['a'])` | C·I | PASS | read-back `"x"`; image `{"a":"x"}` (9 B); fresh register `{"a":"x"}` |
| `LIVE-B02` | `JC-B02` | a multi-byte string and an astral pair (U+1D11E U+1F600), both across the reopen | C·I | PASS | both strings cross byte-for-byte (code-unit equality); image 32 B carries both |
| `LIVE-B03` | `JC-B03` | the empty string | C·I | PASS | read-back `""`; image `{"a":""}` (8 B) |
| `LIVE-B04` | `JC-B04` | `true` and `false` | C·I | PASS | both return as booleans; image 20 B carries both |
| `LIVE-B05` | `JC-B05` | `0`, `1.5`, `-2`, `9007199254740991`, `-0.125`, `1e300` | C·I | PASS | all six return as finite numbers and `Object.is`-equal; image 401 B carries all six as themselves |
| `LIVE-B06` | `JC-B06` | the empty array | C·I | PASS | read-back is a dense array, length `0`, no extra keys |
| `LIVE-B07` | `JC-B07` | `[1,'a',false,[2,[3]],{k:'v'}]` | C·I | PASS | index order preserved; image `{"a":[1,"a",false,[2,[3]],{"k":"v"}]}` (37 B) |
| `LIVE-B08` | `JC-B08` | the empty object | C·I | PASS | read-back is a plain object with no members |
| `LIVE-B09` | `JC-B09` | `{a:1,b:'x',c:true,d:[1,2]}` | C·I | PASS | same member set and values (40 B image) |
| `LIVE-B10` | `JC-B10` | `{a:[{b:[1,'s',false,{c:'deep'}]}]}` | C·I | PASS | the whole tree crosses (46 B image) |
| `LIVE-B11` | `JC-B11` | a plain object built in another realm (`node:vm`) | C·I | PASS | the foreign realm's prototype differs; the same tree comes back (31 B image) |
| `LIVE-B12` | `JC-B12` | a null-prototype object with two members | C·I | PASS | admitted; the same member set comes back (24 B image) |
| `LIVE-B13` | `JC-B13` | an acyclic diamond `{x:s, y:s}` | C·I | PASS | admitted — the ancestor stack refuses cycles, not shared ancestry (37 B image) |
| `LIVE-B14` | `JC-B14` | write, read, mutate the read result (push a member, add a key), read again | C·I | PASS | the second read is the stored tree; the mutation reached no store-owned data |
| `LIVE-B15` | `JC-B15` | the diamond read back: identity at the two positions | C·I | PASS | `back.x !== back.y` is `true`; both are `{leaf:1}` |
| `LIVE-B16` | `JC-B16` | write `{a:{deep:[1]}}`, mutate the argument at both depths AFTER the write, commit, read | C·I | PASS | read-back `{"a":{"deep":[1]}}`; `outcome=passed`; image `{"a":{"deep":[1]}}` (24 B) |
| `LIVE-B17` | `JC-B17` | two reads of one stored value | C·I | PASS | distinct objects at every level (`!==` at the root, at `a`, at `a.b` and at `a.b[1]`); same tree both times |
| `LIVE-B18` | `JC-B18` | write `{a: nested}`, read back | C·I | PASS | `back.a !== nested` and `back.a[1] !== nested[1]`; same tree (28 B image) |
| `LIVE-B19` | `JC-B19` | write `{a:[{b:leaf}]}`, mutate `leaf` and the intermediate array, then read | C·I | PASS | read-back `{"a":[{"b":{"v":1}}]}`; the stored tree is unmoved at every depth |

### §B — the `-0` pin (`2` cells)

| id | greens cell | scenario | reach | verdict | observed (the settled state) |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B20` | `JC-B20` | `write(['a'], -0)` → commit → reopen → read | C·I | PASS | read-back is `0`: `Object.is(back,0)` true, `Object.is(back,-0)` false; the image spells `0` (`{"a":0}`, 7 B) |
| `LIVE-B21` | `JC-B21` | `{a:-0, b:[-0,1]}` | C·I | PASS | `a=0`, `b[0]=0`, `b[1]=1`; image `{"a":0,"b":[0,1]}` (23 B) |

### §C — the sixteen classes at their declared positions (`30` cells)

**All `30` cells share the same settled state and it holds in every one:** the write throws
`ValueRefusedAtBoundary` with the store's generated PART ONE plus the package's PART TWO, the store's file on
disk is **byte-identical** to the 0-byte file the construction created, a **fresh** instance over that path reads
`{}`, and the refused address answers `AddressNotFound`.

| id | greens cell | scenario | reach | verdict | observed position · class |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B22` | `JC-B22` | `null` at the value position | C·I | PASS | `the write's value argument` · `null` |
| `LIVE-B23` | `JC-B23` | `undefined` at the value position | C·I | PASS | `the write's value argument` · `undefined` |
| `LIVE-B24` | `JC-B24` | `function () {}` at the value position | C·I | PASS | `the write's value argument` · `a function` |
| `LIVE-B25` | `JC-B25` | `Symbol('s')` at the value position | C·I | PASS | `the write's value argument` · `a symbol` |
| `LIVE-B26` | `JC-B26` | `{ [Symbol('s')]: 1 }` — the CONTAINING object's position | C·I | PASS | `the write's value argument` · `a value carrying a Symbol-keyed own member` |
| `LIVE-B27` | `JC-B27` | `{a: 10n}` — the message equals the declared worked example, character for character | C·I | PASS | `member 'a' of the write's value argument` · `a bigint`; message `'10n' is not a value the JavaScript crossing admits, the crossing carries strings, booleans, finite numbers, plain objects and arrays, the value at member 'a' of the write's value argument is a bigint` — **exact** |
| `LIVE-B28` | `JC-B28` | `NaN` | C·I | PASS | `the write's value argument` · `a non-finite number` |
| `LIVE-B29` | `JC-B29` | `Infinity` and `-Infinity` (both driven) | C·I | PASS | both: `the write's value argument` · `a non-finite number` |
| `LIVE-B30` | `JC-B30` | a nesting of `129` | C·I | PASS | a **declared value position** (`member 0/0/…/0`, 129 segments, segments joined by `/` with the index bare) · `a value over the walk ceiling` |
| `LIVE-B31` | `JC-B31` | `'\uD800'` at a value position | C·I | PASS | `the write's value argument` · `a string carrying a lone surrogate` |
| `LIVE-B32` | `JC-B32` | `{'\uD800': 1}` — the key position | C·I | PASS | `member '<key: a string carrying a lone surrogate>' of the write's value argument` · `a string carrying a lone surrogate`; read at the address answers `AddressNotFound` |
| `LIVE-B33` | `JC-B33` | `const c = {}; c.self = c` | C·I | PASS | `member 'self' of the write's value argument` · `a value that contains itself` |
| `LIVE-B34` | `JC-B34` | `new Proxy({}, {})` | C·I | PASS | `the write's value argument` · `a Proxy` |
| `LIVE-B35` | `JC-B35` | `new (class extends Array {})()` | C·I | PASS | `the write's value argument` · `a class extending Array` |
| `LIVE-B36` | `JC-B36` | `new (class C {})()` | C·I | PASS | `the write's value argument` · `a class instance or another prototype-carrying non-plain object` |
| `LIVE-B37` | `JC-B37` | an own accessor on the ROOT object | C·I | PASS | `the write's value argument` · `a value carrying an own accessor member` |
| `LIVE-B38` | `JC-B38` | `[1, , 3]` | C·I | PASS | `the write's value argument` · `a sparse array` |
| `LIVE-B39` | `JC-B39` | a `Map` | C·I | PASS | `the write's value argument` · `a class instance or another prototype-carrying non-plain object` |
| `LIVE-B40` | `JC-B40` | `new String('a')` | C·I | PASS | `the write's value argument` · `a class instance or another prototype-carrying non-plain object` (the wrapper is not a primitive) |
| `LIVE-B41` | `JC-B41` | `{a: 10n}` | C·I | PASS | `member 'a' of the write's value argument` · `a bigint` |
| `LIVE-B42` | `JC-B42` | `{a: 1, b: null}` | C·I | PASS | `member 'b' of the write's value argument` · `null` |
| `LIVE-B43` | `JC-B43` | `[1, null]` — the index is BARE | C·I | PASS | `member 1 of the write's value argument` · `null` |
| `LIVE-B44` | `JC-B44` | `{a:{b:[0, 10n]}}` | C·I | PASS | `member 'a'/'b'/1 of the write's value argument` · `a bigint` |
| `LIVE-B45` | `JC-B45` | `{ok: 1, bad: 10n}` — the whole value refused | C·I | PASS | `member 'bad' of the write's value argument` · `a bigint`; read at the address answers `AddressNotFound` (no member landed as data) |
| `LIVE-B46` | `JC-B46` | `{'\uD800': 1, ok: 2}` | C·I | PASS | `member '<key: a string carrying a lone surrogate>' of the write's value argument`; read at the address answers `AddressNotFound` (the surviving `ok` member is not stored alone) |
| `LIVE-B47` | `JC-B47` | `{a: {[Symbol('s')]: 1}}` | C·I | PASS | `member 'a' of the write's value argument` · `a value carrying a Symbol-keyed own member` |
| `LIVE-B48` | `JC-B48` | an own accessor on a MEMBER value | C·I | PASS | `member 'a' of the write's value argument` · `a value carrying an own accessor member` |
| `LIVE-B49` | `JC-B49` | `[1, new Proxy({}, {})]` | C·I | PASS | `member 1 of the write's value argument` · `a Proxy` |
| `LIVE-B50` | `JC-B50` | the status of a refusal | C·I | PASS | `ValueRefusedAtBoundary` (rank `17`); `ValueNotAdmitted` is **not** the answer on this route |
| `LIVE-B51` | `JC-B51` | the `{a:10n}` message's two parts | C·I | PASS | PART ONE's bytes stand exactly; PART TWO is appended beside them with no slot between; the message is exactly PART ONE + PART TWO; no unsubstituted `<…>` placeholder |

### §D — the ceilings (`6` cells)

| id | greens cell | scenario | reach | verdict | observed (the settled state) |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B52` | `JC-B52` | a nesting of `65` | C·I | PASS | admitted by the live walk and read back; **persisted and reopened**: image 137 B, read-back the same nesting |
| `LIVE-B53` | `JC-B53` | a nesting of `66` | C·I | PASS | admitted and read back; **persisted and reopened**: image 139 B |
| `LIVE-B54` | `JC-B54` | a nesting of `128` — the declared ceiling's last value | C·I | **FINDING** | the in-memory observable holds (admitted and read back) — **but the settled round trip THROWS `FileCommitFailed` and NOTHING is written**: see `§5` |
| `LIVE-B55` | `JC-B55` | a nesting of `130` | C·I | PASS | `a value over the walk ceiling` at a declared value position; file unchanged; register `{}` |
| `LIVE-B56` | `JC-B56` | a dense array of `1,000,001` elements | C·I | PASS | `ValueRefusedAtBoundary` · `a value over the walk ceiling` at `the write's value argument`; file unchanged; register `{}` |
| `LIVE-B57` | `JC-B57` | a dense `10,000`-element array | C·I | PASS | 10,000 elements read back with the last intact (`9,999`); image 48,897 B carries all 10,000 as themselves |

### §E — the retired forms and `null` (`4` cells)

| id | greens cell | scenario | reach | verdict | observed (the settled state) |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B58` | `JC-B58` | write a string, read it | C·I | PASS | read-back `"x"`; the image's value at the address is the string itself (`{"a":"x"}`, 9 B) — **no `{"v":…}` envelope in the stored image** |
| `LIVE-B59` | `JC-B59` | write a bigint | C·I | PASS | the refusal is THROWN; its own members are `["status","message","log"]`; **no `e` member and no `v` member** — no `{"e":…}` side-channel is returned |
| `LIVE-B60` | `JC-B60` | a plain object whose own members are `v`, `e`, `k`, `L`, `T` | C·I | PASS | crosses as DATA: read-back `{"L":[3],"T":{"t":"mem"},"e":2,"k":"s","v":1}`, same member set, image 51 B — nothing is read as an envelope, a class token or a carrier tag |
| `LIVE-B61` | `JC-B61` | `JSON.parse('null')` written | C·I | PASS | premise `JSON.stringify(null) === 'null'` holds; the value is refused as `null` at `the write's value argument`; nothing stored |

### §F — the carriers this contract does not govern (`4` cells)

| id | greens cell | scenario | reach | verdict | observed (the settled state) |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B62` | `JC-B62` | a two-segment address carrier, a single tier token, a tier ARRAY at read | C·I | PASS | the parent anchor minted, then `['car','rier']` = `'found'`: found via token `"found"`, via the array `["file"]` `"found"`, and with the tier absent `"found"`; image 24 B carries the nested value |
| `LIVE-B63` | `JC-B63` | `write(['tier'], 'disk', 1)` — the TIER carrier's own protocol | C·I | PASS | the store's own `OutOfDomainTier` (not `ValueRefusedAtBoundary`); file unchanged; register `{}` |
| `LIVE-B64` | `JC-B64` | `write([-1], 'mem', 1)` — the ADDRESS carrier's own protocol | C·I | PASS | the store's own `AddressMalformed` (not `ValueRefusedAtBoundary`); file unchanged |
| `LIVE-B65` | `JC-B65` | a value tree containing no carrier | C·I | PASS | the tree crosses as itself (`{"a":1,"b":[true,"x"],"c":{"d":2}}`, 40 B image) and **no tag member (`k`, `v`, `e`, `L`, `T`) is introduced** anywhere in the read-back or the image |

### §G — the one refusal form (`2` cells)

| id | greens cell | scenario | reach | verdict | observed |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B66` | `JC-B66` | a sparse-array refusal's form | C·I | PASS | a THROWN caller-realm plain object (not an `Error`), a string `status`, a non-empty string `message` (193 characters) |
| `LIVE-B67` | `JC-B67` | the refusal form's member census | C·I | PASS | `status` and `message` both present; **census `["status","message","log"]`, arity `3`** — recorded, not asserted (the declared drift the green names) |

---

## §4. THE TWO REACHES AGREE, CELL BY CELL

The two runs' `RESULT` lines were diffed after normalising only the per-run temp paths and the reach label:
**identical**. There is no cell whose verdict or read-back differs between the checkout reach and the installed
reach — which is what the byte-identity of the tarball's `index.mjs` and `constraint-kernel.mjs` with the
checkout's predicts. **The installed reach therefore confirms the same behaviour through the packaging route; it
does not add a second, independent behavioural reading, and it is not presented as one.**

---

## §5. THE FINDING — `LIVE-B54` / `JC-B54`: a nesting of `128` is admitted by the crossing and REFUSED by the store's commit

**THE GREEN'S CLAIM (`docs/specs/storeroom-json-crossing-greens.md`, `§D`, `JC-B54`).** *"A nesting of `128` —
the declared ceiling's last value, `ADMITTED` and it round-trips (`contract.md §4`'s depth row, `§5`, with the
amendment's reading instruction applied: `64` read `128`)."*

**THE LIVE RESULT — TWO HALVES, BOTH RECORDED.**

1. **The greens' own observable HOLDS.** On a live instance the walk admits a nesting of `128` and the read
   returns the same tree. (This is the route the greens' runner drives, and its declared `PASS` is not
   contradicted on its own layer.)
2. **THE SETTLED STATE CONTRADICTS THE ROUND-TRIP CLAIM.** Written to a REAL store on REAL disk and committed,
   the same value **is never written**: the commit throws

   > `status` `FileCommitFailed` · `message` `'a' could not be committed to '<path>', the file write failed at '<path>'` (members `["status","message","log"]`)

   and the store's file on disk stays **0 bytes**; a fresh instance over that same path **boots to an instance**
   (not an error) whose register is `{}`, and `read(['a'])` answers **`AddressNotFound`**. **There is no store to
   reopen: the settled state does not exist.** The same is true at depth `127`.

**WHY — MEASURED, NOT INFERRED (`LIVE-X1`, this runner's own observation).**

| walk depth | `file`-tier commit | file on disk | fresh boot `read(['a'])` |
| --- | --- | --- | --- |
| `125` | PASSED | 257 B | value |
| `126` | PASSED | 259 B | value |
| `127` | THREW `FileCommitFailed` | **0 B** | `AddressNotFound` |
| `128` | THREW `FileCommitFailed` | **0 B** | `AddressNotFound` |

So **the effective persistent depth ceiling of this layer is `126`, not the crossing's declared `128`.** The two
container ceilings do not compose: the crossing admits depth `0…128` (`contract.md §8` row 7;
`parameter-semantics.md §1` row 7; `A148` Q6), and the store's own image is the register — one root object — with
the value at its key, so an admitted value of depth `127` or `128` becomes an image of `128` or `129` containers,
which the **loader** refuses (the `JAS-07` reading of `A144` (1): `128` nested containers refused, the root
counted). The store's commit re-decodes the image it is about to land and refuses with `FileCommitFailed`; the
file is left untouched and the value never lands. **No other tier can rescue it:** `temp` and `mem` do not
persist to disk (driven: a `temp`-tier value is readable only on the instance that wrote it, and a fresh boot over
the same path answers `AddressNotFound` for it), so the `file` tier is the only durable route this package has.

**WHAT THIS FINDING IS, AND IS NOT.**

- **It is a live LAYER-BOUNDARY contradiction of `JC-B54`'s round-trip claim, and it is reported as such.**
  `JC-B54` is **not** recorded as a PASS here, the green is **not** weakened, and no implementation byte was
  touched to make it pass.
- **It is NOT a failure of the crossing's own walk.** The walk admitted depth `128` exactly as `§4` declares, the
  `129`/`130` refusals answer the declared class, and `65`/`66` round-trip through disk intact.
- **It is NOT a contradiction of `JC-B55`/`JC-B56`.** The refused classes still answer `ValueRefusedAtBoundary`
  with the walk-ceiling class at a declared value position.
- **The doc-level gap it exposes is a reconciliation question, not a code question, and it is the supervisor's
  to place:** the crossing's ceiling (`depth 128`, `nodes 1,000,000`) and the store image's container ceiling
  (`127` containers admitted, the register root counted) are each documented, and the pair yields a persistent
  depth ceiling of `126` — a figure **no document in this unit's input set names**. **This report does not
  choose a disposition**: it records the live observation, the measured boundary, and the exact failure, so the
  owning pass can decide whether the crossing's ceiling, the loader's ceiling, or the unit's claim needs the
  reconciliation (a depth-`128` value that cannot be stored is not a store-side bug in the crossing; it is an
  unstated interaction between two declared ceilings).

**NO OTHER CONTRADICTION EXISTS.** Every other one of the `67` cells was driven to its settled state and its
result either matches the greens or is a strictly stronger observation (the round trip through a real store on
disk, plus the image on disk). **This section names the only contradiction in the battery; there is no second.**

---

## §6. THE RUNNER'S OWN OBSERVATIONS (`2`, recorded not asserted, not greens cells)

| id | observation | observed |
| --- | --- | --- |
| `LIVE-X1` | the LAST depths at the `file` tier: which nestings the store's own commit can persist | `125` passed (257 B) · `126` passed (259 B) · `127` THREW `FileCommitFailed` (0 B) · `128` THREW `FileCommitFailed` (0 B); in each refused case the fresh boot read `AddressNotFound` |
| `LIVE-X2` | the node ceiling, measured by bisection on dense top-level arrays | `999,998` ADMITTED · `999,999` ADMITTED · `1,000,000` REFUSED (`ValueRefusedAtBoundary`) · `1,000,001` REFUSED — i.e. **the ceiling is `1,000,000` nodes INCLUDING the root**, so a top-level array's last admitted length is `999,999` |

**AND THE INSTALLED PACKAGE'S OWN ANSWERS (`LIVE/INSTALLED`, driven before the battery, recorded here).**

- **The published tarball alone cannot construct a store**: with no platform package installed and no addon at
  the module-relative rung, `storeCreate` throws the declared absent-addon form —
  `status` `FilePathUnreachable`, message `''@auspicion/provident-storeroom-js-linux-x64-gnu', '<pkg>/build/Release/storeroom_js_binding.node'' is not reachable at construction, the path must exist or the application must be able to write it`,
  members `["status","message","log"]` — **no instance is returned, no silent JS store**. This is the honest
  boundary of the installed reach: the addon bytes had to come from the checkout build (`§0`).
- With the checkout-built addon placed at the entry's **rung two**, the installed package constructs, reads and
  answers the crossing refusal exactly as the checkout does — and that is what the `LIVE/INSTALLED` column of
  `§3` records.

---

## §7. WHAT THE LIVE RUN DID NOT REACH — declared, not hidden

- **The native copy-out site `to_js_value` was not driven directly.** It is inside the addon and is reached by no
  package call; this battery observes the same tree at the package's own copy-out route (`decodeValue`'s route,
  `JC-B58` / `JC-B65`) and through the round trip. **The greens' own `JC-B65` layer-limit clause is thereby
  respected, not widened.**
- **The internal wire's shape was not asserted.** Tags, the envelope's absence and the side-channel's absence are
  asserted only where a consumer can see them: in what `read` returns, in what the store's file on disk carries,
  and in what a refusal carries (`§E`, `§F`).
- **No `APP`-level (rendered UI) surface exists for this unit and none was needed.** This unit's live surface IS
  the package; there was no MCP tool, no browser surface and no DOM driver in the scenario set, so **no pending
  scenario battery is written for this pass** — nothing is parked, nothing is pending, and every one of the `67`
  cells was exercised.
- **The `file` tier is the only durable tier.** The greens print `mem` in their round-trip cells; the settled
  state was reached at the `file` tier (declared in `§2`), and `temp`/`mem` durability was itself checked (`§6`).

---

## §8. THE STORE PATHS AND THE CLEANUP

**Every store of this run lived in one `fs.mkdtempSync` root per reach, at a deterministic per-cell path:**

- `LIVE/CHECKOUT`: root `/tmp/jcx-LIVE-CHECKOUT-kqCU3D` (pass 1; pass 2 used a fresh root of the same shape),
  store files `/tmp/jcx-LIVE-CHECKOUT-kqCU3D/<cell-id>-<random>/store.json` — e.g.
  `/tmp/jcx-LIVE-CHECKOUT-kqCU3D/LIVE-B01-…/store.json`, …/`LIVE-B67-…/store.json`, plus
  `LIVE-B29-Infinity-…`, `LIVE-B29-negInfinity-…`, `LIVE-B52-mem-…`, `LIVE-X1-125-…` … `LIVE-X1-128-…`,
  `LIVE-X2-<n>-…`.
- `LIVE/INSTALLED`: root `/tmp/jcx-LIVE-INSTALLED-Omvbbc` (pass 1; same pattern), with the same directory set.

**The exact per-cell `cfg.filePath` was printed by the runner before the cleanup** — `STORE <cell-id> <path>`
lines, **`68` of them per reach** (one per store-owning cell; `LIVE-B29` contributes two, one per infinity; the
two observations own no persisted store) — and the root's directory count was recorded:
`CLEANUP root=… dirs=79 removed=true` on both reaches, on both passes. **Nothing of this run remains under the
temp root after each pass.** The installed reach's own scratch (`/tmp/jcx-installed-phase`: the `npm pack` output
and the temp project) was removed after the battery. **Nothing was written inside the repository by the run** —
the only bytes written in the tree are the runner and this report.

---

## §9. TOTALS

| reach | cells driven | greens cells | PASS | FAIL | FINDING | OBSERVED | runner exit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `LIVE/CHECKOUT` | `69` | `67` | `66` | `0` | `1` | `2` | `1` (the FINDING only) |
| `LIVE/INSTALLED` (JS+kernel bytes from the published tarball; addon from the checkout build) | `69` | `67` | `66` | `0` | `1` | `2` | `1` (the FINDING only) |

**Green-cell totals: `67` driven · `66` PASS · `0` FAIL · `1` FINDING (`LIVE-B54`) · `0` GAP · `0` PARKED ·
`0` PENDING.**

---

## §10. NO REPAIR, AND THE ONE THING THE SUPERVISOR MUST PLACE

**No green was weakened, no green was re-derived, no implementation byte was changed, and no landed test was
touched.** The one live contradiction of a green (`LIVE-B54` / `JC-B54`) stands in `§5` with its measured boundary
(`§6`'s `LIVE-X1`) and the doc-level reconciliation it exposes is named for the owning pass. **The unit is not
"live-green" while that row is a FINDING: the honest state is `66` of `67` green cells PASS with `1` live FINDING
at the settled state of the depth-`128` cell.**

**A NOTE ON THE DOCUMENTS' OWN BYTES — an amendment landed WHILE this run was in progress.**
`docs/specs/storeroom-json-crossing/contract.md` and
`docs/specs/storeroom-json-crossing/parameter-semantics.md` were amended at `17:23` on 2026-10-24 (the gate-3
proofreading pass's `RCA-8(g)` insertions) while this battery was being prepared and run. The inserted clauses
(a) name the three `<subject>` spellings that are **not** target spellings — the node-ceiling arm hands the
class spelling, the array-subclass arm renders empty, the member-key arm names the value argument — and (b)
re-spell one citation (`A148 Q6`). **No cell of this battery asserts a `<subject>` spelling**: every refusal cell
asserts the STATUS, PART ONE's fixed bytes, PART TWO and the position·class pair, so **no expectation moved**.
The subjects the live surface actually rendered at those arms are exactly the three the inserted clause
declares — measured on the same addon — `'a value over the walk ceiling'` at `LIVE-B56`, `''` at `LIVE-B35`,
`'the write's value argument'` at `LIVE-B32`/`LIVE-B46` — and the depth arm's subject (`LIVE-B30`/`LIVE-B55`) is
an ordinary target spelling (`'0'`, the leaf at depth `129`), which no amended clause re-spells. **This pass
wrote no byte of either document.**

**run: 2026-10-24 — `node bindings/js/greens/json-crossing-live.mjs` from the repository root, twice, and the
same runner twice more with `JC_REACH=LIVE/INSTALLED` against the installed tarball: `69` cells · `66` PASS · `0`
FAIL · `1` FINDING · `2` OBSERVED per reach, `RESULT` lines byte-identical across repeats and across reaches
apart from the reach label. Layers: `LIVE/CHECKOUT` (checkout entry + checkout-built addon) and `LIVE/INSTALLED`
(published tarball's entry and kernel bytes + the checkout-built addon at the entry's rung two), over real stores
on real disk — **ADDITIVE; no `ENVELOPE` / `NODE` / `TRIO` row is retired and no `APP`-green is claimed.****

---

## §11. THE RE-DRIVE OF 2026-10-24 (AFTER `A149`) — `LIVE-B54` / `JC-B54` **CLEARED** AT ITS SETTLED STATE

**THE RULING THIS SECTION IS READ THROUGH.** `docs/decisions.md` · **`A149`** (ACTIVE, `2026-10-23`), read at its
bytes: **the crossing's operative admission depth is `126` ON BOTH ROUTES; depth `127` and beyond is REFUSED AT
THE PACKAGE'S WALK, BEFORE ANY STORE VERB, with the class `a value over the walk ceiling` and the status
`ValueRefusedAtBoundary` — never admitted and then failed at commit — and the node range is `0…999,999`, with
`1,000,000` refused as the same class.** **The implementation landed it:** `const ENCODER_CEILING = 126` at
`bindings/js/index.mjs:1042` (the source edit, mtime **`2026-10-24 19:09:06`**, file sha256
`00442f81d9901fdaf21dc5c387a697369737e018c4690d466195b149e222b0cc`), and the native addon was **rebuilt and
restaged** — `bindings/js/build/Release/storeroom_js_binding.node`, mtime **`2026-10-24 19:09:51`**,
`1,370,856` bytes, md5 `bd9fbc5eed81c4e6e8a983b31fffa8a3`, identical to
`bindings/js/target/release/libstoreroom_js_binding.so` (built `19:09:49`). **The addon postdates the source edit
by `45` seconds, and the `/proc/self/maps` read below proves the run mapped exactly those bytes.**

**§11.1 THE DISPOSITION, IN ONE LINE.** **`LIVE-B54` / `JC-B54` IS CLEARED as a live contradiction: the state the
finding filed no longer exists on either route, the RULED settled state holds, and the greens writer's `§D`
re-derivation of the same date gives the set the same figures — so the set is `67`/`67` PASS against the live
package, with its three boundary cells driven at their re-derived text.** `§5` above stands **byte-for-byte** and
is read THROUGH this section; nothing in `§0`–`§10` was rewritten, and the finding is neither weakened nor
softened — it is measured again at its own failure points and found **no longer reachable**.

**§11.2 THE TIMELINE, AND WHY THE SAME MEASUREMENTS SURVIVE BOTH TEXTS.** This re-drive ran **twice against the
same application bytes**, and the document moved between the two drives, not the app:

1. **`19:12`, the first drive.** The greens document still carried its pre-`A149` `§D` text (`128` admitted,
   `1,000,001` refused). The runner drove that text and recorded, beside it, the ruling's own cells. **The
   physical measurements were:** depth `126` commits and reopens (`259` B); `127` and `128` are refused at the
   walk with `ValueRefusedAtBoundary` / `a value over the walk ceiling` (not `FileCommitFailed`), the file stays
   `0` B and a fresh boot answers `AddressNotFound`; `999,999` nodes commit and reopen (`2,000,005` B);
   `1,000,000` is refused at the root position.
2. **`19:13:38`, the greens writer's amendment landed** — `docs/specs/storeroom-json-crossing-greens.md`'s `§D`
   clause *"⟶ AMENDED 2026-10-23 (`A149`, ACTIVE — filed as `DEF-2026-10-23-A`)"*, re-deriving `JC-B54` to depth
   `126` admitted/committed/reopened, `JC-B55` to depth `127` refused-at-the-walk, and `JC-B56` to `999,999`
   admitted / `1,000,000` refused at the root (no cell added, none removed: the set stays at `67`, `§D` at `6`).
3. **The re-drive was then re-expressed to the settled text and re-run** (`19:14`): the same `70`-cell battery,
   the same physical measurements, **every greens cell PASS** — the re-expression is a change of the DOCUMENT's
   text, not of the application's behaviour, and the application's bytes were not touched by this pass.

**§11.3 WHAT WAS DRIVEN, AND WHERE EVERY CELL ENDS.** Every re-driven cell starts at a **real user input** — a
caller's value handed to the package's own `write`/`commit` surface on a **REAL store on REAL disk**
(`cfg.filePath` in an `fs.mkdtempSync` directory) — and ends at the **SETTLED state**, never at the in-memory
answer:

- **For an admitted value** (`LIVE-B54` at `126`, `LIVE-B56`'s `999,999` side, `LIVE-B52`, `LIVE-B53`,
  `LIVE-B57`): `write` → commit (`K.commit` → `K.runAttempt`; `outcome="passed"` asserted) → **a FRESH instance
  reopened over the same `store.json`** → `read` → the tree equals what was written **and** the image on disk
  carries that tree. `LIVE-B54` drives **both routes**: the `mem` route (the greens' own in-memory form) and the
  `file` route with the reopen.
- **For a refused value** (`LIVE-B55` at `127`, `LIVE-B56`'s `1,000,000` side, `LIVE-R1` at `128`, `LIVE-B30` at
  `129`): the walk throws `ValueRefusedAtBoundary` with the class `a value over the walk ceiling` at a declared
  position; **the store file's bytes are byte-identical before and after**; a **fresh boot** over that path reads
  an empty register (`{}`) and `read(address)` answers **`AddressNotFound`**. Every refusal cell additionally
  hands the **same value to the package's own COMMIT ROUTE**: the walk refuses *inside `K.commit`*, so
  `K.runAttempt` **never runs** and **`FileCommitFailed` is never the answer** — the negative the ruling pins
  (`A149` (2)) and the exact answer the finding filed.

**§11.4 THE AFFECTED CELLS — one row each, with the measurement behind its verdict.**

| cell | greens row | scenario (the real input) | verdict | measurement at the settled end state |
| --- | --- | --- | --- | --- |
| `LIVE-B30` | `JC-B30` (`§C`) — `129` stands under `A149` (2)'s *"`127` and beyond"* | a nesting of `129` | PASS | class `a value over the walk ceiling` at a `127`-segment member position (`member 0/0/…/0 of the write's value argument`); file `0` B **unchanged**; register `{}` |
| `LIVE-B52` | `JC-B52` (`§D`, unmoved by `A149`) | a nesting of `65` | PASS | commit `outcome="passed"`; **fresh instance over the same `store.json` reads the same tree**; image `137` B |
| `LIVE-B53` | `JC-B53` (`§D`, unmoved) | a nesting of `66` | PASS | commit `passed`; reopened: same tree; image `139` B |
| `LIVE-B54` | `JC-B54` (**re-derived**: depth `126`) | a nesting of `126`, **both routes** | PASS | `mem` route ADMITTED and read back; `file` route commit `outcome="passed"`; **fresh instance over the same `store.json` reads the same tree**; image **`259` B** |
| `LIVE-B55` | `JC-B55` (**re-derived**: depth `127`) | a nesting of `127` | PASS | `mem` route THREW `ValueRefusedAtBoundary` [class `a value over the walk ceiling`]; `file` route: status `ValueRefusedAtBoundary` (**not `FileCommitFailed`**), `127`-segment member position, **file `0` B unchanged**, register `{}`; **commit route** THREW the same walk refusal, file unchanged, fresh boot `AddressNotFound` |
| `LIVE-B56` | `JC-B56` (**re-derived**: nodes `999,999` / `1,000,000`) | a dense array of `999,999` (admitted) and a dense array of `1,000,000` (refused) | PASS | admitted side: commit `passed`; **fresh instance reads `length=999999 last=0`**; image **`2,000,005` B**. Refused side: status `ValueRefusedAtBoundary` (not `FileCommitFailed`), class `a value over the walk ceiling` at the **root** position (`the write's value argument`), **file `0` B unchanged**, register `{}`, commit route THREW the same walk refusal, fresh boot `AddressNotFound` |
| `LIVE-B57` | `JC-B57` (`§D` control, unmoved) | a dense `10,000`-element array | PASS | commit `passed`; reopened: `length=10000 last=9999`; image `48,897` B |
| `LIVE-R1` | `A149` (2) — **this runner's own cell, not a greens cell** | a nesting of `128` — the crate's CONVERSION bound, the depth the finding filed | PASS | status `ValueRefusedAtBoundary` (**not `FileCommitFailed`**), class `a value over the walk ceiling`, `127`-segment member position; file `0` B unchanged; register `{}`; commit route THREW the same walk refusal, fresh boot `AddressNotFound` |
| `LIVE-X1` | this runner's own observation | `125` / `126` / `127` / `128` / `130` at the `file` tier, probed through the package's commit route | OBSERVED | `125`: commit PASSED, `257` B, fresh read VALUE · `126`: commit PASSED, `259` B, fresh read VALUE · `127`: THREW `ValueRefusedAtBoundary` [class walk ceiling], **file `0` B unchanged**, fresh read `AddressNotFound` · `128`: identical to `127` · `130`: identical to `127` |
| `LIVE-X2` | this runner's own observation | the node ceiling on dense top-level arrays | OBSERVED | `999,998` ADMITTED · `999,999` ADMITTED · `1,000,000` REFUSED (`ValueRefusedAtBoundary`) · `1,000,001` REFUSED — the admitted node range is `0…999,999`, the root counted |

**AND THE FINDING'S OWN FAILURE POINTS, MEASURED AGAIN AND NO LONGER REACHABLE.** The state `§5` filed was
*"admitted in memory, then the commit threw `FileCommitFailed`, the file stayed `0` bytes, a fresh boot answered
`AddressNotFound`"*. On the bytes driven here: **no route admits a nesting of `128` at all** (the `mem` route
throws the walk refusal), **no commit act is ever reached for it** (the commit route throws inside `K.commit`),
**`FileCommitFailed` is answered nowhere in this battery**, and the file's `0` bytes are the **unchanged
construction-time file**, not a failed write. **The persistent depth ceiling is `126` and it is now enforced at
the WALK — one ceiling, both routes, which is exactly what `A149` rules.** The two depths the ruling names as
passing (`125`, `126`) commit and reopen intact; the two it names as refused (`127`, `128`) are refused before
any store verb. **`AddressNotFound` at the refused address is still the answer — and it is now the answer for the
right reason: nothing was ever admitted.**

**§11.5 THE WHOLE BATTERY — three runs, and the totals.**

| run | reach | store root | cells | greens cells | PASS | FAIL | FINDING | OBSERVED | runner exit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| pass 1 | `LIVE/CHECKOUT` | `/tmp/jcx-LIVE-CHECKOUT-cpRRFA` | `70` | `67` | `68` | `0` | `0` | `2` | `0` |
| pass 2 | `LIVE/CHECKOUT` | `/tmp/jcx-LIVE-CHECKOUT-ZIykPk` | `70` | `67` | `68` | `0` | `0` | `2` | `0` |
| `LIVE/INSTALLED` | published-tarball entry+kernel bytes, checkout-built addon | `/tmp/jcx-LIVE-INSTALLED-TWlgZn` | `70` | `67` | `68` | `0` | `0` | `2` | `0` |

**THE CENSUS IS `70` = the `67` greens cells + ONE `A149` cell of the runner's own (`LIVE-R1`, depth `128`) + `2`
observations of the runner's own (`LIVE-X1`, `LIVE-X2`).** **Greens-cell totals: `67` driven · `67` PASS · `0`
FAIL · `0` FINDING · `0` GAP · `0` PARKED · `0` PENDING.** **No cell that PASSed in `§3` changed verdict:** every
one of the other `64` greens cells re-produced its `§3` observable and its settled state, and the three boundary
cells re-produced the re-derived ones. **The `3` runs' `RESULT` lines are byte-identical** (diffed without
normalisation: the `RESULT` lines carry no per-run temp path); **the `3` runs' store roots were removed**
(`CLEANUP … dirs=86 removed=true` on each). **For context only — `ENVELOPE/PURE` evidence, NOT this report's
evidence — the greens' own runner reproduces its declared figures on the settled set: `node --test
bindings/js/test/json-crossing-blinded.test.mjs` → `tests 67`, `pass 67`, `fail 0`.**

**§11.6 THE BYTES DRIVEN — identity, and the installed reach's declared caveat.**

| what | evidence |
| --- | --- |
| addon actually mapped (`/proc/self/maps`) | `bindings/js/build/Release/storeroom_js_binding.node` — `1,370,856` bytes, md5 `bd9fbc5eed81c4e6e8a983b31fffa8a3`, mtime **`2026-10-24 19:09:51`** |
| addon vs the build | md5 identical to `bindings/js/target/release/libstoreroom_js_binding.so` (built `19:09:49`) |
| addon vs the source edit | addon `19:09:51` **postdates** `bindings/js/index.mjs` `19:09:06` (`ENCODER_CEILING = 126`) by `45` s; `src/error.rs` `17:27`, `src/json.rs` `2026-10-22 02:31`, `src/store.rs` `2026-10-22 05:22` — all older than the build |
| `LIVE/INSTALLED` tarball | `provident-storeroom-0.5.0.tgz`, sha256 `15e0436ba77a1e63f52a25638c6e31a11d73c80af13389237a3d9a70511812e3`, shasum `aa2e28cad7f0da8d2f5ef0755b41611163186a14`, `5` files (`index.mjs`, `index.d.ts`, `package.json`, `README.md`, `src/constraint-kernel.mjs`); the pack is reproducible — the second pack carried the same sha256 |
| `LIVE/INSTALLED` JS bytes | installed `index.mjs` sha256 `00442f81…e222b0cc` **= the checkout's**; installed `src/constraint-kernel.mjs` sha256 `b07eb4ed…d9f36d8` **= the checkout's** — so the installed reach carries the SAME new ceiling, through the packaging route |
| `LIVE/INSTALLED` native bytes | the tarball carries **no addon**; the published platform packages are **not available offline** (their checkout directories carry only `package.json` + `README.md`), so the checkout-built addon was supplied at the entry's module-relative rung two — md5 `bd9fbc5eed81c4e6e8a983b31fffa8a3`, i.e. the SAME rebuilt bytes. **`LIVE/INSTALLED` is therefore `INSTALLED` for the JS entry and kernel bytes and `CHECKOUT` for the native bytes, and this row says so.** |
| the absent-addon state, re-driven | with the rung-two addon moved aside, the installed package answers the declared form — status `FilePathUnreachable`, members `["status","message","log"]`, message `''@auspicion/provident-storeroom-js-linux-x64-gnu', '<pkg>/build/Release/storeroom_js_binding.node'' is not reachable at construction, the path must exist or the application must be able to write it`, **no instance returned** |

**§11.7 THE STRUCTURED COVERAGE EVIDENCE (the `D-GP-UFA` §6.1 duty, applied to this re-drive).** **This unit has
no `§5.U` user-flow-audit matrix** (`docs/specs/user-flow-audit.md` does not exist in this repository), so the
matrix rows this section binds to are the greens set's own rows plus `A149`'s clauses. **The report's row set is
exactly the `10` re-driven cells below, and `summary.total` is `10` = that row count; every row was driven by a
real input through the live surface mapped in `§11.6`, every end point is the settled state, and `proxy_pass` is
`false` throughout — no module-level, envelope-level or computed-style substitute stands in for the live result.**

| cell | matrix row | scenario | start point (real input / external event) | END point (final resolved state) | verdict |
| --- | --- | --- | --- | --- | --- |
| `LIVE-B30` | `JC-B30` (greens `§C`) | nesting `129` | caller's value → `write(['a'],'file',v)` on a real store | walk refusal at a `127`-segment position; file `0` B unchanged; register `{}` | PASS |
| `LIVE-B52` | `JC-B52` (greens `§D`) | nesting `65` | same | commit `passed`; **fresh instance over the same path** reads the same tree; image `137` B | PASS |
| `LIVE-B53` | `JC-B53` (greens `§D`) | nesting `66` | same | commit `passed`; fresh instance same tree; image `139` B | PASS |
| `LIVE-B54` | `JC-B54` (greens `§D`, re-derived `A149` (1)) | nesting `126`, both routes | `mem` route and `file` route (`write` → `K.commit` → `K.runAttempt`) | `mem` admitted + read back; commit `passed`; **fresh instance over the same `store.json` reads the same tree**; image `259` B | PASS |
| `LIVE-B55` | `JC-B55` (greens `§D`, re-derived `A149` (2)) | nesting `127` | `mem` route, `file` route and the commit route | walk refusal `ValueRefusedAtBoundary` / `a value over the walk ceiling`; file `0` B byte-identical; **fresh boot `AddressNotFound`**; commit act never ran; `FileCommitFailed` never answered | PASS |
| `LIVE-B56` | `JC-B56` (greens `§D`, re-derived `A149` (3)) | dense `999,999` (admitted) / `1,000,000` (refused) | `write(['v'],'file',v)` and the commit route | admitted side: commit `passed`; fresh instance `length=999999 last=0`; image `2,000,005` B. Refused side: walk refusal at the root position; file `0` B unchanged; fresh boot `AddressNotFound` | PASS |
| `LIVE-B57` | `JC-B57` (greens `§D` control) | dense `10,000` | `write(['a'],'file',v)` | commit `passed`; fresh instance `length=10000 last=9999`; image `48,897` B | PASS |
| `LIVE-R1` | `A149` (2) — runner cell | nesting `128` | `write` + `K.commit`→`K.runAttempt` | walk refusal at a `127`-segment position; file `0` B unchanged; fresh boot `AddressNotFound`; no `FileCommitFailed` | PASS |
| `LIVE-X1` | runner observation — depth boundary | `125`/`126`/`127`/`128`/`130` at the `file` tier | caller values through `K.commit`→`K.runAttempt` | `125`/`126` commit+reopen intact (`257` B / `259` B); `127`/`128`/`130` refused at the walk, `0` B unchanged, fresh boot `AddressNotFound` | OBSERVED |
| `LIVE-X2` | runner observation — node boundary | dense `999,998`–`1,000,001` | caller values through `write(['v'],'mem',v)` | `999,998`/`999,999` ADMITTED; `1,000,000`/`1,000,001` REFUSED (`ValueRefusedAtBoundary`) | OBSERVED |

```json
{
  "unit": "U-STOREROOM-JSON-CROSSING",
  "drive": "re-drive-2026-10-24-after-A149",
  "ruling": "docs/decisions.md A149",
  "live_surface": {
    "entry": "bindings/js/index.mjs",
    "kernel": "bindings/js/src/constraint-kernel.mjs",
    "addon": "bindings/js/build/Release/storeroom_js_binding.node",
    "addon_md5": "bd9fbc5eed81c4e6e8a983b31fffa8a3",
    "addon_mtime": "2026-10-24 19:09:51",
    "source_edit_mtime": "2026-10-24 19:09:06"
  },
  "rows": [
    { "cell": "LIVE-B30", "matrix_row": "JC-B30 (greens §C)", "scenario": "nesting 129", "start": "write(['a'],'file',v) on a real store", "end": "walk refusal at a 127-segment position; file 0 B unchanged; register {}", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-B52", "matrix_row": "JC-B52 (greens §D)", "scenario": "nesting 65", "start": "write(['a'],'file',v) on a real store", "end": "commit passed; fresh instance over the same store.json reads the same tree; image 137 B", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-B53", "matrix_row": "JC-B53 (greens §D)", "scenario": "nesting 66", "start": "write(['a'],'file',v) on a real store", "end": "commit passed; fresh instance same tree; image 139 B", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-B54", "matrix_row": "JC-B54 (greens §D, re-derived A149 (1))", "scenario": "nesting 126, both routes", "start": "mem route and file route (write -> K.commit -> K.runAttempt)", "end": "mem admitted + read back; commit passed; fresh instance over the same store.json reads the same tree; image 259 B", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-B55", "matrix_row": "JC-B55 (greens §D, re-derived A149 (2))", "scenario": "nesting 127", "start": "mem route, file route and the commit route", "end": "walk refusal ValueRefusedAtBoundary / a value over the walk ceiling; file 0 B byte-identical; fresh boot AddressNotFound; commit act never ran; FileCommitFailed never answered", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-B56", "matrix_row": "JC-B56 (greens §D, re-derived A149 (3))", "scenario": "dense 999,999 (admitted) / 1,000,000 (refused)", "start": "write(['v'],'file',v) and the commit route", "end": "admitted side: commit passed; fresh instance length=999999 last=0; image 2,000,005 B; refused side: walk refusal at the root position; file 0 B unchanged; fresh boot AddressNotFound", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-B57", "matrix_row": "JC-B57 (greens §D control)", "scenario": "dense 10,000", "start": "write(['a'],'file',v) on a real store", "end": "commit passed; fresh instance length=10000 last=9999; image 48,897 B", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-R1", "matrix_row": "A149 (2) — runner cell", "scenario": "nesting 128", "start": "write + K.commit->K.runAttempt", "end": "walk refusal at a 127-segment position; file 0 B unchanged; fresh boot AddressNotFound; no FileCommitFailed", "verdict": "PASS", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-X1", "matrix_row": "runner observation — depth boundary", "scenario": "125/126/127/128/130 at the file tier", "start": "caller values through K.commit->K.runAttempt", "end": "125/126 commit+reopen intact (257 B / 259 B); 127/128/130 refused at the walk, 0 B unchanged, fresh boot AddressNotFound", "verdict": "OBSERVED", "real_input": true, "proxy_pass": false },
    { "cell": "LIVE-X2", "matrix_row": "runner observation — node boundary", "scenario": "dense 999,998..1,000,001", "start": "caller values through write(['v'],'mem',v)", "end": "999,998/999,999 ADMITTED; 1,000,000/1,000,001 REFUSED (ValueRefusedAtBoundary)", "verdict": "OBSERVED", "real_input": true, "proxy_pass": false }
  ],
  "summary": { "total": 10, "pass": 8, "observed": 2, "fail": 0, "findings": 0, "parked": 0 }
}
```

**§11.8 NO REPAIR, AND WHAT THIS PASS WROTE.** **No implementation byte, no test file, no spec document other
than this appended section, and no cell of the blind set was edited to move a verdict.** The re-drive's only
change to the runner is the re-expression of its `§D` cells to the settled text and the single `A149` cell
(`LIVE-R1`) — a change to the OBSERVER, never to the observed; the application's `index.mjs` and the addon were
byte-identical across every drive. **The bytes this pass wrote in the tree are exactly two files:
`bindings/js/greens/json-crossing-live.mjs` (this role's own runner) and this appended section.** The other
working-tree modifications stood there when the pass began and were **NOT touched** (the implementer's
`bindings/js/index.mjs`, `src/error.rs`, `tests/support/mod.rs`, the `bindings/js/test/**` files,
`docs/decisions.md`, `docs/defects.md`, `docs/next-steps.md`, the `docs/specs/storeroom-js/*` and
`docs/specs/storeroom-json-crossing/*` documents and `docs/specs/storeroom-native/implementation-plan.md`); the
untracked `docs/specs/storeroom-json-crossing-greens.md` and `bindings/js/test/json-crossing-blinded.test.mjs`
are the blind writer's bytes and were **NOT touched** either — **including the `§D` amendment of `19:13:38`,
which is the greens writer's.** **Every store of this re-drive lived in one `fs.mkdtempSync` root per run and was
removed at the end of it** (`CLEANUP root=/tmp/jcx-LIVE-CHECKOUT-cpRRFA dirs=86 removed=true`,
`…-ZIykPk dirs=86 removed=true`, `/tmp/jcx-LIVE-INSTALLED-TWlgZn dirs=86 removed=true`); the installed reach's
own scratch (the `npm pack` output, its cache and the temp project) was removed after the battery.

**run: 2026-10-24, after `19:09:51` — `node bindings/js/greens/json-crossing-live.mjs` from the repository root
twice (`LIVE/CHECKOUT`) and once with `JC_REACH=LIVE/INSTALLED` against the re-packed and re-installed tarball:
`70` cells · `68` PASS · `0` FAIL · `0` FINDING · `2` OBSERVED per run, exit `0`, `RESULT` lines identical across
all three runs. **The live contradiction at `LIVE-B54` is CLEARED; the set is `67`/`67` PASS live with its three
boundary cells at their `A149` re-derived text. ADDITIVE: no `ENVELOPE` / `NODE` / `TRIO` row is retired and no
`APP`-green is claimed.****

---

## §12. THE DOCUMENTATION REVIEW OF 2026-10-24 — THE PHANTOM CITATION, THE CELL CENSUS, THE PRE-`A149` RECORD AND THE DATE, RECONCILED (`role_documentation_reviewer`; `RCA-8(g)`)

**THIS SECTION IS THE ONE READING INSTRUCTION THIS REPORT WAS MISSING.** **`§0`–`§10` stand byte-for-byte — they are the FIRST run's record and are not rewritten — and every figure in them that the re-drive moved is read THROUGH `§11` and through this section. Nothing here weakens a finding, re-derives a green, or claims a result the runner did not measure.**

**§12.1 THE PHANTOM CITATION IS RE-SPELLED, AT ITS ONE SITE IN THIS DOCUMENT.** `§5`'s *"the crossing admits depth `0…128` (`contract.md §8` row 7; `parameter-semantics.md §1` row 7; `A148` Q6)"* cites a question that does not exist: **`docs/decisions.md` · `A148` records five gate-1 questions, `Q1`–`Q5`, plus two follow-ups.** **`A148 Q6` is therefore read as `A148`'s ceiling FOLLOW-UP**, carried at `docs/specs/storeroom-json-crossing-proposal-review.md §4`'s answer table, its third `Follow-up` row (*"Crate `128` governs"*) — exactly the re-spelling `docs/specs/storeroom-json-crossing/contract.md §4`'s clause of the gate-3 proofreading pass and `parameter-semantics.md §4`'s clause of the same date take. **`§10`'s mention of `A148 Q6` is a REPORT of that re-spelling and not a second citation, so no other byte of this report needs the correction.** `[A2 docs/decisions.md · A148 | its `Q1`–`Q5` and two follow-ups; A2 docs/specs/storeroom-json-crossing-proposal-review.md §4 — its answer table's three `Follow-up` rows | cross-reference]`

**§12.2 THE CELL CENSUS IS `70`, AND `§1`'s `69` IS THE FIRST RUN'S NUMBER.** Measured by counting, not by trusting a printed figure: `bindings/js/greens/json-crossing-live.mjs` defines **`70`** cells — `53` by an `id:` field (of which `LIVE-X1` and `LIVE-X2` are the two `observedCell`s) plus **`17`** by its two factories (`15` `valueCell` + `2` `admittedDepthCell`) — and the greens mapping gives the same total: **`67` greens cells + `LIVE-R1` (the `A149` (2) cell this re-drive added) + the `2` observations = `70`** ✓. **SO `§1`'s `cells=69`, its sentence *"the cell count is `69` = the `67` greens cells + `2` observations of this runner's own"*, `§9`'s two totals rows (`69` · `67` · `66` · `0` · `1` · `2`, exit `1`), `§10`'s *"the honest state is `66` of `67`"* and its run record are the FIRST run's and are read THROUGH `§11`: the OPERATIVE figures are `§11.5`'s **`70` cells · `68` PASS · `0` FAIL · `0` FINDING · `2` OBSERVED per reach, exit `0`**, on both `LIVE/CHECKOUT` and `LIVE/INSTALLED`.** `[A1 bindings/js/greens/json-crossing-live.mjs | the cell census, counted at this pass's read; A2 §11.5 | the re-drive's figures | numeric or census claim]`

**§12.3 THE PRE-`A149` RECORD OF `§3` AND `§5` IS READ THROUGH `§11.4`, CELL BY CELL, AND `§5`'s FIVE FIRST-RUN PRINTS ARE NAMED RATHER THAN LEFT TO BE FOUND.** `§3`'s `§D` rows print the `128` law as it stood at the first drive — `LIVE-B54` *"a nesting of `128` … the declared ceiling's last value"* with verdict `FINDING`, `LIVE-B55` at `130`, `LIVE-B56` at `1,000,001`, and `LIVE-B30`'s `129`-segment position — and `§5` narrates the same state. **All of it is the first run's measurement and none of it is operative: `§11.4` re-drives those cells and `§11.5` prints their verdicts — `LIVE-B54` at `126` PASS (commit `passed`, fresh instance reads the same tree, image `259` B), `LIVE-B55` at `127` PASS (walk refusal `ValueRefusedAtBoundary` / `a value over the walk ceiling` at a `127`-segment position, file `0` B, fresh boot `AddressNotFound`, `FileCommitFailed` never answered), `LIVE-B56` PASS at `999,999` admitted / `1,000,000` refused, `LIVE-B30` PASS at a `127`-segment position, and `LIVE-R1` PASS at the crate's `128`, refused at the walk.** **AND `§5`'s FIVE FIRST-RUN PRINTS ARE READ AS FOLLOWS, EACH AT ITS OWN BYTES:**
1. **`§5`'s quotation of the greens' `JC-B54` cell carries *"(with the amendment's reading instruction applied: `64` read `128`)"*** — **that instruction is SUPERSEDED:** `docs/specs/storeroom-js/crossing.md §1`'s `A149` clause item `1` reads `64` as `126` (`docs/specs/storeroom-json-crossing-greens.md §1`'s reading is reconciled in the greens set's own reconciled clause, item (b)).
2. ***"the crossing admits depth `0…128`"*** and ***"the effective persistent depth ceiling of this layer is `126`, not the crossing's declared `128`"*** — **both read `0…126` / `126` from `2026-10-24`, and the second sentence's contrast is void:** the crossing's DECLARED operative ceiling IS `126` (`contract.md §4`'s clause), so `126` is the declaration and not a shortfall against it, and the `128` the sentence contrasts is the `[A2]` crate-side CONVERSION's bound (`bindings/js/src/crossing.rs:665`), which the crossing's own walk refuses first. (The citation the first sentence carries is re-spelled at `§12.1`.)
3. ***"an admitted value of depth `127` or `128` becomes an image of `128` or `129` containers, which the loader refuses"*** — **no value of those depths is admitted on the JavaScript route:** the walk refuses `127` and beyond before any verb, which is what `LIVE-B55` and `LIVE-B30` now drive; the observation stands only for the CRATE-side conversion's own `128`.
4. ***"The walk admitted depth `128` exactly as `§4` declares"*** — **the walk admits `126` and refuses `127`, and `§4` declares exactly that from `2026-10-24`** (`bindings/js/index.mjs:1042` · `:1111`).
5. ***"a depth-`128` value that cannot be stored"*** — **the depth that cannot be stored is `128` only on the crate-side conversion's bound; on the crossing's own rule the value is refused at the walk and the store is never reached**, the store's persistent depth ceiling being `126` and its image `127` containers.
**So no cell and no sentence of this report states the `128` law as operative, and the finding's SUBSTANCE — that a value admitted by the walk must be storable — is unmoved: it is now asserted for exactly the boundary the ruling set.** `[A2 §11.4 · §11.5 — the re-driven cells and their verdicts; A2 docs/specs/storeroom-json-crossing-greens.md §5.2 | the same three re-derivations; A2 docs/specs/storeroom-js/crossing.md §1 — `A149` clause, item `1` | numeric or census claim]`

**§12.4 THE DATE — THIS SECTION, `§11` AND THE RUN ARE `2026-10-24`, AND THE CLAUSE THIS REPORT CITES AS `2026-10-23` IS A `2026-10-24` FILING.** `§11`'s heading, its ruling line and the run record above it are dated `2026-10-24` and are unmoved; **the greens clause this report quotes at `§11.2` as the `§D` *"`⟶ AMENDED 2026-10-23 (A149)`"* clause is that clause's marker and not its filing date — the filing is `2026-10-24`**, which this report's own `§11.2` timeline and the runner's own reading (*"the greens writer's amendment of `2026-10-24`"*) both record. **No marker in this report is rewritten; the resolution of record for the one-day-early markers elsewhere in the unit is `docs/defects.md` · `DEF-2026-10-24-A`, and this report's own dates are the true ones.** `[A2 §11 · §11.2; docs/defects.md · `DEF-2026-10-24-A` | cross-reference]`
