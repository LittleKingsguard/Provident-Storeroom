# Handoff — a downstream finding at `2.0.0`: the WebAssembly arm's emitted declaration still spells the addon's one-position `storeCreate(cfg)`

**From:** `Provident-Electron`, downstream consumer, pin `provident-storeroom ^2.0.0` · **Date:** 2026-11-20 ·
**Class:** a finding, not a patch — the downstream never touches the package (`D-5`/`D-52` in its own register).

## 1 · What was measured, at the bytes

- **The guide teaches the two-position factory.** `docs/guides/package-use.md:2584-2589` (§13.1) — *"THE FACTORY TAKES TWO POSITIONS — `storeCreate(bindings, cfg)` — and the first is the module"* — with its sample `const store = storeCreate(bindings, { … })`; the sentence at `:163` states it too (*"THE BINDINGS ARE HANDED IN, NOT LOOKED FOR"*).
- **The arm's runtime takes two positions** — the same guide's §13.1 sentence and the arm's `storeCreate(bindings, cfg)` behaviour agree.
- **The arm's emitted declaration carries ONE.** `bindings/js/index.d.ts:1649` declares `export function storeCreate(cfg: StoreConfig): StoreInstance;`. The declaration pipeline generates the arm by replacing exactly one region's body: `scripts/emit-declarations.mjs` produces `index.wasm.d.ts` from the addon's bytes with the `// ⟦realm:filePath:begin⟧`…`// ⟦realm:filePath:end⟧` body replaced by `filePath?: never`, and `scripts/build-wasm-package.mjs:85-86` stages that file as the arm package's `index.d.ts`. The factory's position is not inside that region, so the arm's declared signature is the addon's.

## 2 · Symptom

A TypeScript consumer compiling against `@auspicion/provident-storeroom-js-wasm` **cannot spell the construction the guide and the runtime require**: `storeCreate(bindings, cfg)` fails the declared signature, and `storeCreate(cfg)` compiles but cannot carry the injected module. The one construction position the WebAssembly realm exists to permit is the one its declaration rejects.

## 3 · Reproduction

In the `2.0.0` tree: `grep -n "export function storeCreate" bindings/js/index.d.ts` answers `:1649` with one position; `node scripts/build-wasm-package.mjs <dest>` stages an arm whose `index.d.ts` carries the same line; a `.ts` consumer that writes `storeCreate(bindings, cfg)` — the form `docs/guides/package-use.md §13.1` prints — fails `tsc` against the staged package, while the runtime accepts it.

## 4 · Suspected root cause

The declaration pipeline's ONE arm-specific region (`⟦realm:filePath⟧`) covers the `cfg` key's body and nothing else. The factory's position is the addon's and is never specialized for the arm, so the arm's **declared** surface and its **runtime** surface disagree on the one construction the realm was created to permit — a declaration/runtime divergence of the class the release's own gates should catch, in the region the gates do not look at.

## 5 · Proposed fix shape

A second region — or a second emitted declaration — for the factory's position: the arm's declaration emits `storeCreate(bindings: unknown, cfg: StoreConfig): StoreInstance` (the module typed as the host-supplied binding, or `unknown` where the module's type belongs to the host), while the Node build keeps `storeCreate(cfg)`. Either way, the emitted arm declaration must be able to spell the construction `§13.1` teaches and a consumer's contract may name as a declared input.

## 6 · Status in the downstream

Recorded as **`H-5`** in `Provident-Electron/strata/records/modularity-unit.md` (symptom, reproduction, root cause, fix shape), upstream-owned and never patched there. The downstream's parity step (`C-16`, `S-13b`, `M-29`) cites the two-position factory as a **declared input** of its contract and cannot green its parity battery against the arm until the emitted declaration is spellable.
