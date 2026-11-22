// **⟶ THE KERNEL'S LAZY REACH, HELD BY THE REALM AND INSTALLED INTO THIS PART — ADDED 2026-11-17** (`D-156` item 1;
// the loader split's row for `constraints.mjs`, `docs/L3/wasm-realm/design.md` §5: *"`constraints.mjs:100` (lazy
// `require_` of the barrel) | **a static import**: a browser build ships the package, so the laziness has no subject
// — and an `await import()` would make the first constraint act asynchronous and break `DD-17` | **neutralised**,
// and the WASM arm is *closer* to `D-1`'s *"tightly integrated"* than the Node arm"*).
//
// **WHAT IT IS, AT THE BYTE: ONE MODULE-LEVEL RESOLVER AND NOTHING ELSE.** Until this pass `constraints.mjs` imported
// `require_` from `artefact-node.mjs` — the HUB's own `createRequire(import.meta.url)` — and asked it for the barrel
// on the first constraint act. **THAT IMPORT WAS THE LAST `node:`-SHAPED EDGE IN A PART**: `require_` is a
// `createRequire` answer, it is `null` until the entry adopts its module context, and a realm that has neither cannot
// reach it at all — so the second realm's entry would have carried `artefact-node.mjs` (and with it `node:fs`,
// `node:path` and `node:url`) into its own transitive set. **THE PART DOES NOT MOVE ITS LAZINESS: it asks THIS slot
// instead**, and each entry fills the slot at its own evaluation:
//
//   * **THE NODE ARM** installs the hub's own loader — `() => require_('./src/constraint-kernel.mjs')` — so the
//     barrel is still resolved FROM THE HUB'S DIRECTORY and still only on the first constraint act (`D-14`'s
//     resolution base; `kernel-surface.md` §1 item 1; `A121`, `A122`). **NOT ONE BYTE OF ITS BEHAVIOUR MOVES.**
//   * **THE INJECTED ARM** installs a resolver answering a STATIC namespace import of the same barrel, which is what
//     the design's row asks for: a browser build ships the package, the barrel is in its graph from the start, and
//     **the laziness has no subject there** — while an `await import()` would make the first constraint act
//     asynchronous and break `DD-17`.
//
// ★ **THE DEFAULT IS `null`, AND IT IS THE SAME STATE `require_` IS IN TODAY BEFORE THE ENTRY ADOPTS ITS CONTEXT**:
// a caller that reaches a constraint act through a tree whose entry never installed a resolver gets a raw
// `TypeError` from this slot, exactly as it got one from `require_(...)` on a `null` loader. **IT IS A WIRING DEFECT
// AND NOT A STORE STATE, so it mints no status and is not a refusal** (`DD-40`): the entry installs its resolver at
// its own evaluation, before any part can ask, and **no shipped arm can reach the default**.
//
// **NO `node:` SPECIFIER APPEARS IN THIS FILE AND NONE MAY** — that is the whole of the seam.

/// **THE INSTALLED RESOLVER, OR `null` BEFORE AN ENTRY INSTALLS ONE.** Module-level, unexported and not a member of
/// anything (`A117` (D6)); `installKernelResolver` is its only writer and `requireKernel` its only reader.
let resolver = null;

/// **THE ONE SETTER, CALLED BY AN ENTRY AT ITS OWN LOAD.** **A NON-FUNCTION IS REFUSED** rather than held: a truthy
/// non-function stored here would throw at the first constraint act instead of at the install, which is a host
/// `TypeError` out of a caller's first `addConstraint` and a second failure form on a path `DD-12` allows none. The
/// refusal is a load-time programming error and is a plain `TypeError` on purpose — **it is NOT a store refusal, it
/// mints no status (`DD-40`) and it can reach no caller**, because the only caller is an entry's own evaluation.
export function installKernelResolver(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('installKernelResolver: the kernel resolver is a function');
  }
  resolver = fn;
}

/// **THE ONE READ THE PART MAKES** (`constraints.mjs`'s `constraintsKernel`, and no second reader anywhere) — the
/// installed resolver's answer, which is the kernel's own barrel module. **THE LAZINESS IS THE PART'S AND NOT THIS
/// FILE'S**: `constraintsKernel` calls this only when its own cache is empty, so a drive that never asks for a
/// constraint reaches no byte of the kernel on either arm.
export function requireKernel() {
  return resolver();
}
