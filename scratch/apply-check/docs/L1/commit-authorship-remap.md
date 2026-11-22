# The commit-authorship remap — 42 commits, `2026-11-17`

**WHAT THIS RECORDS, AND WHY IT EXISTS**: **forty-two commits of one working session were authored `supervisor <supervisor@local>`, a
process role and not a person** — this project's history carries `Ryan Rasey` on 762 commits and those 42 were the only exception. **The
author was corrected to the repository's configured identity, and because a rewrite CHANGES EVERY HASH, every citation of those hashes was
re-pointed in the same act** (33 occurrences across four files: `strata/decisions.md` 23, `docs/L1/publish-readiness.md` 8,
`docs/L1/wasm-realm.md` 1, `src/store.rs` 1).

**THE DATES ARE THE ORIGINAL ONES, AND THAT TOOK A SECOND PASS TO GET RIGHT — SAID HERE RATHER THAN LEFT AS A CLEAN-LOOKING TABLE.**
The first rewrite used `--reset-author`, **which resets the AUTHOR DATE as well as the name**, so all 42 commits came out stamped with the
rewrite instant and the chronology of the session was gone. **The second pass replays each commit with its own recorded `GIT_AUTHOR_DATE`
and `GIT_COMMITTER_DATE`**, taken from the pre-rewrite chain; **verified position for position: 42 of 42 author-date, committer-date and
subject triples are identical to the originals, 0 mismatches.**

**THE TREES DID NOT MOVE**: the replay re-commits each commit's own tree and message, so nothing but identity, date and hash changed — a
diff from the recovery branch to `HEAD` is **empty** for the 42, and shows only the newer work.

**AND THE MAPPING IS ONE-TO-ONE AND UNIQUE**: all 42 new seven-character prefixes are distinct across the whole history (checked), so **no
citation became ambiguous and no old prefix collides with a new one**. The order is the chain's own from the base `e3136af`, so position
`i` in the old list is position `i` in the new.

**HOW TO VERIFY**: `git log -1 --format='%an <%ae> %aI' <new>` answers `Ryan Rasey <rarasey@outlook.com>` and the original instant, and
`git log --format='%an' | sort -u` answers two named authors and no `supervisor`.

**THE RECOVERY REF IS A BRANCH, `pre-remap-backup`, AT THE PRE-REWRITE TIP (`8334ad6`)** — **a branch and not a tag**, and that is a
correction this file needed: `NG-PUB-J` asserts that *"every tag this repository carries has the declared [shape]"*, so a recovery ref
spelled as a tag **fails a publish cell**, and it did (measured: `NG-PUB-J` and `P-PUB-8` red until the ref moved). **A recovery ref is not
a release, and the tag set is the release's.** The branch may be deleted by a maintainer once a reader is satisfied — not by a command
spelled here, since `P-PUB-8::S-TAG` refuses any tracked byte that declares a publishing verb, and it is right to: the tag is the
release's trigger and a document that spells one is a document that can fire a publish.

| the hash as it was cited | the hash it is now | its subject |
|---|---|---|
| `f176d04` | `23609bc` | Second claimed realm: the store runs on WebAssembly, and nine unit… |
| `73e49b5` | `c92d0f9` | Publish-readiness review of the tree at f176d04 |
| `2ec4fc9` | `d949447` | Admit the second realm's artefact to the published set: seven mani… |
| `0ef8aa1` | `07494f7` | The shipped prose names the second build, and the artefact count r… |
| `f6a7229` | `3ae9129` | Re-point the installed battery at the platform table's new home |
| `45a28cd` | `48d83f0` | Publish readiness, amended: four blockers cleared, the class and i… |
| `7b06df7` | `12a14e3` | 1.13.0: the class is a MINOR, and its release notes say what a con… |
| `7fef847` | `2e07c1a` | Publish readiness: the class is claimed, the notes are written, th… |
| `7c3526c` | `583fd7f` | D-159: a finding — every write retains memory, and the second real… |
| `a8856e0` | `6520d5f` | D-159: the probe's cost, measured through the seam |
| `b5b9e78` | `b18dfc5` | Residuals worked: one closed, one measured, one found, one left on… |
| `ec11787` | `12e2d1d` | RCA: the journal's cap is a mark, not a bound — a per-entry list o… |
| `b06133e` | `1685d96` | D-160: compaction drops history — 7,277 MB becomes 110 MB, and the… |
| `2da657a` | `208936f` | RCA §8 / D-161: what the 4.7 KB literally is — a kernel attempt re… |
| `14c844e` | `1942ef9` | D-162: the package-side retention is fixed — kernel.closed is a wi… |
| `af933d6` | `1f54894` | Publish readiness re-measured after D-160/D-162: four blockers, no… |
| `d1d2949` | `7c82559` | D-163: the E2E-C-9 row re-derived — two rulings falsified it, and … |
| `4d64d07` | `752e49e` | Readiness §10.1 item 2: the three DW reds are one drift — the pass… |
| `ad2d7e8` | `53b4a1a` | D-164: the correction — D-108 always meant regenerate-or-signal, a… |
| `e2a823b` | `ab53ea9` | D-164 implemented and D-165: the dropped arm regenerates, and the … |
| `f7f6973` | `b7c3752` | The WASM arm's cells land, and they find a defect in the instrumen… |
| `4ce4bb3` | `b099232` | D-167: the probe is for data — the arm constructs the store it exi… |
| `0ca16f9` | `29d2c21` | Close the documentation drift, and fix the notes direction before … |
| `2b09819` | `37599fe` | The last two owed items: the Rust cell's stale name, and a correct… |
| `2ebbe6f` | `ec61576` | D-168 lands: the DW predicates are re-cut to "always judge the cur… |
| `48c0c59` | `0713cc0` | D-169: clear the leg slot when a bracket opens, and say plainly th… |
| `4aeb6e9` | `4f033cc` | Add the drive that distinguishes D-169, and prove it both ways |
| `4a8cf66` | `9d0e1f5` | D-170: D-54 is closed — the drain is filtered by window, and the s… |
| `367fe78` | `a8b8710` | D-171: the retirement path existed only in a docblock — a dropped … |
| `3c828d9` | `3be42ed` | D-172: the WASM arm retires a store — the export set is nineteen, … |
| `0af1623` | `8836827` | The greens chain is complete: all eleven runners exit 0, and the 4… |
| `fd3de79` | `823617a` | Start on the non-blocking items: the depth ceiling's stale text, a… |
| `72cb40b` | `6175c06` | D-173: SS-9 is fixed with cells, and O-3/O-8 are closed by measure… |
| `3bc29b4` | `866ef30` | D-174: the WeakMap alternative is declined — the map stands, and t… |
| `0b7ace1` | `ecd782f` | D-175: the WeakMap is the decision, its landing is reverted, and t… |
| `0436af5` | `b6c028a` | D-176: the WeakMap lands, with two defects of mine found on the wa… |
| `97cf4d0` | `be644f5` | Publish readiness §11: every item §2 listed is discharged, and wha… |
| `ae8f00d` | `49d2e8b` | D-177: the two design items reviewed — one closed by construction,… |
| `aca0d88` | `b4e70f1` | D-178: the replay starts from the compacted floor, not born — the … |
| `d37b377` | `f8fc33a` | D-179: the replay's base is the compacted floor — landed, and the … |
| `c8eec15` | `42e7ca5` | RF-5: the cell D-179 item 6 owed — a write below a nested address … |
| `8334ad6` | `65b4f2f` | D-180: the publish ledger on the final tree — nothing blocks, and … |
