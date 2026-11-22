# `U-STOREROOM-STORE-RETIREMENT` — the measurements, as taken

**Every figure below is a run transcript on THIS tree, taken by `role_l4_implementer` on 2026-11-19, with the
command printed beside it. The landing itself is `scratch/store-retirement.patch`.**

## 1 · The instrument, and why the finding's own instrument was replaced

The finding was filed on a **single-batch zero-payload `rss`** reading: construct `N` stores, drop every one,
`gc()` twice, read `rss` — `+17.8 / +17.3 / +36.4 MB` at `N = 200 / 800 / 2000`, `~18–21 KB/store`, linear.

**THAT INSTRUMENT CANNOT SEE THE FIX, AND IT WAS MEASURED BOTH WAYS BEFORE THIS CELL WAS WRITTEN.**

```
node --expose-gc scratch/measure-store-retirement.mjs 200 / 800 / 2000      # single-batch, zero payload
  BEFORE: 65.5 / 22.2 / 15.2 KB per store
  AFTER : 53.0 / 22.9 / 15.1 KB per store          <- identical to the noise
```

`rss` is a **high-water mark**. Measured by segment (`scratch/probe-memory-split.mjs`, 1000 stores x 4 batches,
after the landing):

```
{"batch":1,"perStoreBytes":{"rss":17895,"heapTotal":13107,"heapUsed":326,...}}
{"batch":2,"perStoreBytes":{"rss":9634,"heapTotal":-262,"heapUsed":5,...}}
{"batch":3,"perStoreBytes":{"rss":8454,"heapTotal":17039,"heapUsed":3,...}}
{"batch":4,"perStoreBytes":{"rss":8651,"heapTotal":-262,"heapUsed":211,...}}
{"controlClosures":{"rss":0,"heapTotal":0,"heapUsed":1,...}}
```

**`heapUsed` moves ~0 B/store in both trees; `heapTotal` (hence `rss`) grows in 17–32 MB chunks that are never
handed back.** So a zero-payload `rss` ceiling would pass a returning leak.

## 2 · The two figures the cell is declared from — payload-bearing, three runs each way

Each store is told to keep a 128 KiB `mem` value (the SAME string instance is written into every store) and then
dropped. The measured batch is the one AFTER a discarded warm-up batch (the first batch pays the runtime's own
heap reservation in both trees: `~880–900 KB/store`).

```
node --expose-gc scratch/probe-payload.mjs 400 2 1 131072

BEFORE the landing (facade.rs stashed, rebuilt, exports 19)
  {"perBatchPerStore":[579502,573112],"released":0,"held":0,"absent":true}
  {"perBatchPerStore":[579502,573112],"released":0,"held":0,"absent":true}
  {"perBatchPerStore":[591790,574587],"released":0,"held":0,"absent":true}

AFTER the landing (exports 20)
  {"perBatchPerStore":[42025,36628],"released":400,"held":0,"absent":false}
  {"perBatchPerStore":[43930,34058],"released":400,"held":0,"absent":false}
  {"perBatchPerStore":[42977,36557],"released":400,"held":0,"absent":false}
  {"perBatchPerStore":[41452,35922],"released":400,"held":0,"absent":false}
  {"perBatchPerStore":[41605,34959],"released":400,"held":0,"absent":false}
```

**BEFORE `~573112`–`~574587` bytes/store, AFTER `~41452`–`~43930` bytes/store, ceiling `131072` bytes/store
(the payload itself).** The defected figure sits `4.4x` over the line, the fixed figure `3x` under it.

**The second observable is not memory and is exact**: `released` is the count of the batch's own indexes that
`storeRelease(id)` answered `AddressNotFound` for — the release, read at the addon's own answer. `0 of 400`
before (the entry did not exist; every call threw a host `TypeError`), `400 of 400` after.

## 3 · The entry's own contract, at its answers (measured live, `exports 20`)

```
storeRelease(0)      -> undefined
storeRelease(0)      -> THREW {"status":"AddressNotFound","message":"the package holds no instance at that id"}
storeRelease(9999)   -> THREW {"status":"AddressNotFound","message":"the package holds no instance at that id"}
storeRelease('x')    -> THREW {"status":"AddressMalformed","message":"the position is not the store index this
                                                         addon's storeCreate returned"}
storeRelease(NaN)    -> THREW {"status":"AddressMalformed", ...}
```

## 4 · The trio, taken once on the landed tree

| leg | invocation | reading |
|---|---|---|
| `test` | `npm test` | **`1377` tests · `1376` pass · `0` fail · `1` skip**, exit `0` (baseline `1374 / 1373 / 0 / 1`; `+3` = `SR-01`–`SR-03`) |
| `typecheck` | `npm run typecheck` | **exit `0`** |
| `build` | `CARGO_HOME=$PWD/.cargo-home npm run build` | **exit `0`**, artefact exports **20** |
| the crate's own | `CARGO_HOME=$PWD/.cargo-home cargo test` | **`22` targets `ok` · `0` `FAILED`** |
| the wasm arm | `cargo check --target wasm32-unknown-unknown --manifest-path bindings/js/Cargo.toml` | **`0` errors, `0` warnings** |
| the greens runners | `node tests/e2e/greens.mjs` | **`254` executed · `254` pass · `0` fail** |
| the file-tier-save runner | `node tests/e2e/file-tier-save/scenarios.mjs` | **`91` pass / `1` fail** (`90 / 2` at the pre-fix tree: `FTS-10.2` was stale at sixteen names and is re-cut to the twenty; `FTS-10.1`'s status-set defect is **pre-existing and not this pass's**) |
| the greens chain | `npm run greens` | breaks at `tests/e2e/consumer-fix/scenarios.mjs` — **`CF-09` FAIL, reproduced byte-identically on the stashed pre-fix tree**, so it is pre-existing and touches neither `scripts/publish.sh` nor the release parts this pass did not move |

## 5 · Red first

`SR-01`–`SR-03` on the pre-fix artefact (sources stashed, rebuilt, exports `19`): **`0` pass / `3` fail**, each
for its own reason (`SR-01` measured `573604` against the `131072` ceiling; `SR-02` found the entry absent).

The census re-cut was driven the other way too — **the declarations carrying 20 against an artefact carrying 19**
(`facade.rs` alone stashed): `sas_d1_s_export_set_the_artefacts_own_keyset_…`,
`sas_d1_s_export_set_no_verb_is_missing_…`, `sas_d2_s_arity_every_entry_exists_…`,
`sas_d2_s_arity_the_declared_arity_…` and `sas_d2_s_no_instance_…` all **red**, the first printing
`The artefact exports 19 name(s): [...]` against the twenty-name set.
