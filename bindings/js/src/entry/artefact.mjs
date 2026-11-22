// `D-2` (`docs/L1/entry-subdivision.md` §1 part `3`) — and **⟶ FROM 2026-11-17 THIS FILE IS THE NODE ARM'S GLUE AND
// NOTHING ELSE** (`D-156` item 1; the loader split's step 3, `docs/L3/wasm-realm/design.md` §5). **EVERY FUNCTION
// IT USED TO CARRY HAS TWO HOMES AND THIS FILE HAS NONE OF THEM**:
//
//   * `withAddon` · `boundaryReject` · `addonLoadMessage` · `spellDottedContainer` · `generatorFilePathUnreachable`
//     stand in **`src/entry/addon-slot.mjs`**, BYTE FOR BYTE, because they are the FORM and the form is the
//     surface's: a realm that injects its bindings reads the same slot and answers the same declared absence, and
//     that file carries no `node:` specifier at all.
//   * the three `node:` imports, the module-context seam (`adoptModuleContext` and its three slots), `PLATFORM_NAMES`
//     and both of its helpers, `packageVersion()`, the three-rung walk and the attempt list it records,
//     `absentSubject` and the mismatch arm stand in **`src/entry/artefact-node.mjs`**, byte for byte, because they
//     are the host's.
//
// **WHAT THIS FILE IS FOR, IN ONE SENTENCE: IT HANDS THE NODE ARM'S OWN LOAD PATH TO THE SLOT, ONCE, AT ITS OWN
// EVALUATION.** The slot takes three functions and never a module — `loadAddon` (the walk), `absentSubject` (the
// attempt list the walk records) and `artefactPath` (the path this ENTRY derived from its own `import.meta.url`) —
// so **NOTHING IS LOOKED FOR AT LOAD**: the walk runs at the first construction, exactly where it ran when it lived
// beside the reader, and this module's evaluation performs one assignment and no filesystem act. **`I-29` /
// `PUB-DD-20` ARE UNMOVED**: the path handed over is the ENTRY's own (adopted at `index.mjs`'s evaluation through
// `adoptModuleContext`), read here as the live binding it is, and no part derives a path from its own URL.
//
// **AND THE THREE FUNCTIONS ARE THUNKS OVER LIVE BINDINGS, NOT COPIES**, which is what keeps the walk's answer and
// the slot's state the same fact at every instant: `artefact-node.mjs` owns `addon` and `addonArm`, the walk writes
// them, and this glue reads them AFTER the walk returns (`loadAddon` is idempotent — its first line answers
// immediately once any of the three states is reached — so the read is of the answer the walk gave, never of a
// half-run state). **THE SLOT'S OWN `addon` IS THEN THE WALKED MODULE ITSELF**, so every receiver-handed site in the
// parts reaches a Node-API entry with `this` as the receiver, exactly as it did.
//
// **⟶ AND `withAddon` IS RE-EXPORTED FROM HERE FOR ITS TWO READERS THAT NAME THIS PATH** — `tests/e2e/
// def-ae-restore-mark.test.mjs` and `tests/e2e/discard-witness.mjs` import it from this file and drive the store's
// own `journalMark` through it. **NO PART IMPORTS THIS FILE ANY MORE** (the seven parts and the entry's body read
// `addon-slot.mjs` directly), so this re-export moves no package byte and breaks no part; it is a test's own path
// kept working rather than a second home for the reader.
//
// **THE DIRECTION IS ONE WAY AND CLOSES NO CYCLE**: this file imports `artefact-node.mjs` and `addon-slot.mjs`, and
// neither imports it — `artefact-node.mjs` imports the slot's generator string and the kernel resolver's setter, and
// the slot imports nothing but `refusal.mjs`.
import { ADDON_PATH, absentSubject, addon, addonArm, loadAddon } from './artefact-node.mjs';
import { installAddonPath } from './addon-slot.mjs';

installAddonPath({
  // **THE WALK, THEN THE STATE IT LEFT** — the answer `withAddon`'s slot reads (the module, or `null`, beside the
  // declared arm a version mismatch answers with).
  loadAddon: () => {
    loadAddon();
    return { addon, arm: addonArm };
  },
  // **THE SUBJECT OF THE DECLARED ABSENT FORM ON THIS ARM** — the paths that were tried, in the order they were
  // tried (`artefact-node.mjs`'s `absentSubject`, unmoved).
  absentSubject,
  // **THE PATH THE BOUNDARY'S ABSENT-GENERATOR ARM NAMES** — the ENTRY's own artefact path, live: `ADDON_PATH` is
  // `adoptModuleContext`'s slot and is `null` until the entry adopts its context, which is why this is a thunk and
  // not a value.
  artefactPath: () => ADDON_PATH,
});

export { withAddon } from './addon-slot.mjs';
