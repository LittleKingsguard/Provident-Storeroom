# E2E-C-9 re-derivation — the runs, taken once with scratch/E2E-C-9-rederivation.patch applied

## node tests/e2e/blind-constraints-v2.mjs

CELLS THAT DID NOT EXECUTE (neither PASS nor FAIL — `D-21`):
  none

EXIT 0 (exit 0 iff no cell FAILed, none was NOT-DRIVABLE-BLIND and none was NONRUN) :: FAIL=0 NONRUN=0 NOT-DRIVABLE-BLIND=0
TOTALS: rows=17 cells=125 PASS=125 FAIL=0 NOT-DRIVABLE-BLIND=0 NONRUN=0 DECLARED=125

## npm test
tests 1364 · pass 1363 · fail 0 · skipped 1

## cargo test --offline (CARGO_HOME=$PWD/.cargo-home)
EXIT=0 · 22 'test result: ok' targets · 0 FAILED · 675 cells

## cargo check --target wasm32-unknown-unknown
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.01s
EXIT=0
