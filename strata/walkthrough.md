# Walkthrough — the checks a unit is put through before it is reported

**WHAT THIS FILE IS.** The exit walkthrough: what is read, in what order, and what makes the difference between a unit
that may be reported and one that may not. It is written for the layer that reports a unit, and it is a procedure and
not a design: it decides no module, ranks no work, and opens no unit.

**PROVENANCE, AND ITS LIMIT — READ THIS BEFORE OBEYING ANY LINE OF IT.** **This file is DERIVED, dated `2026-11-02`,
from the ladder ONE unit actually ran** — `U-STOREROOM-REPAIR-FAILURE-PATH`, its gates `1`–`12` and its own
`docs/specs/storeroom-repair-failure-path/verification.md` rungs `V-1`…`V-10` — **and from nothing else.** The preset's
own walkthrough is **not in this checkout** (`strata/` holds `brief.md`, `decisions.md` and this file), so **every rule
below is a reading of one unit's practice and not a duty inherited from the preset.** **Where this file and the preset
differ, the preset governs; where neither decides, the question goes to the architect and to nobody else.** **Its status
is `DRAFT — AWAITING THE ARCHITECT'S CORRECTION`**, and no pass may cite it as authority for widening its own scope.

---

## §1 · The rule the rest of the file serves

**A unit is not reported until every gate in its ladder carries a verdict, and a red gate blocks the report.** A verdict
is recorded **with what it read** — the file, the line, the bytes, the command and its exit — and not only with what it
concluded. "Passed" without its evidence is not a verdict; it is a claim about a verdict.

**A CORRECTION PASS VOIDS THE VERDICT OF THE GATE THAT FAILED, AND THAT GATE RE-RUNS.** The pass that corrects is never
the pass that certifies: a gate that returned `FAIL` re-reads the corrected bytes and issues a fresh verdict, and a
finding is not disposed of because a sentence saying it was fixed has appeared somewhere. **This is the rule the whole
file exists to enforce**, because every failure this unit paid for was a correction that was believed rather than
re-read.

---

## §2 · The gates, one line each

| gate | what it owes | tokens it may return |
|---|---|---|
| **1 — validity** | the request read against the project's own record; a fraction, a remainder and its disposition | `APPROVE-WITH-CONDITIONS` · `BLOCKED-ON-SEMANTICS` · `REJECT` |
| **2 — the spec** | the contract directory, its pins, its part map, its closure predicate, `STEP 0` | `CLOSED` (the predicate) · the pin range |
| **3 — the landing** | the bytes at their sites, the generated copy restored, and the records the unit owes | `no red set by construction` or a measured green |
| **4 — the adversarial re-read of the LANDED bytes** | the pins re-derived **against the code**, not against the draft | `SHIP` · `SHIP-WITH-CONDITIONS` · `DO-NOT-SHIP` |
| **5 — blind greens** | whether the battery can turn at all | `NONE OWED`, with its reason |
| **6 — the live battery** | the documented-versus-code re-read, and any drive the unit's own bytes can fail | `NO DRIVE OWED`, with its reason |
| **7 — proofread** | the landed bytes against their own contract, rung by rung | `PASS` · `PASS-WITH-CONDITIONS` · `FAIL` |
| **8 — documentation review** | the documents against each other, the records against the tree, the closure | `PASS` · `PASS-WITH-CONDITIONS` · `FAIL` |
| **9 — the trio** | `test` · `typecheck` · `build`, measured, with the invocation that produced each | exit codes and counts |
| **10 — the landing restore and the DONE entry** | the generated copy byte-identical, and the unit's tracker entry | the entry itself |
| **11 — the property register** | whether any property is falsifiable of what the unit ships | `ZERO-ROW EXEMPTION`, recorded with its reason and not defaulted |
| **12 — the layer statement** | which layer each verification covers, and which layer it does not | one sentence per layer |

---

## §3 · The exit questions — run these in this order before the report

1. **Is every gate's verdict on the record with its evidence?** If a gate ran and its verdict is not written down, the
   gate did not run.
2. **Did any gate return red, and was it re-run by the gate that failed?** A closed finding is a re-read, never a
   correction's own account of itself.
3. **Is the write set exactly what the unit declared?** `git status` and `git diff` against the declared set, path by
   path. **A file that is untracked is read directly, never through `git diff`** — an untracked corpus has no diff, so a
   check that reads only diffs has not read it.
4. **Are the generated copies identical to their authored homes?** `cmp`, one `sha256` for two files, the generated
   version line agreeing with the manifest. A landed copy edited by hand is a finding whatever else is true.
5. **Does every `path:line` a shipped byte prints resolve, at the bytes, at the pass's date?** **A citation past the end
   of the file is a defect by definition** — the file was shorter when the figure was computed, and the figure outlived
   its bytes.
6. **Was every figure re-read, or carried?** **A figure carried forward from another document is not a measurement**; a
   count without its instrument and its date is not one either.
7. **Is anything designated "what a check uses"?** **That designation is itself a defect class**: a reading is a reading
   of a date, and a column that calls itself authoritative will be obeyed after it has gone stale.
8. **Does every universal quantifier name its exceptions?** A property that says *every* line of a range is disposed of
   exactly once, over a range that contains lines disposed of by a stated exception, is false — and it makes the rung
   that checks it unpasseable.
9. **Does every requirement have a part that discharges it?** A pin no part executes is a pin the unit did not meet.
10. **Was the trio measured with its invocation?** An environment requirement that the repository carries (a local
    dependency store, a toolchain home) is recorded as **an environment fact**, never as a green.
11. **Are other passes' uncommitted records left uncommitted?** A shared file carrying another pass's row is staged at
    the unit's hunks only; sweeping it in silently takes a decision that was not this unit's.
12. **Does the DONE entry record what the unit does NOT repair?** Each residual needs a named owner and a positive
    revisit condition, or it will be read later as something the unit settled.

---

## §4 · The two spellings that decide whether a correction is lawful

**A SUPERSEDED CELL LEAVES BYTE-EXACTLY AND LEAVES ONE POINTER — it does not stay beside a mark.** The retained form is
the accretion that produced, on one clause, ten items of which six inverted the sentence above them: a reader had to hold
every sentence in mind and invert six before knowing what the clause said. The instrument is the **move-out**: the
withdrawn bytes leave for an archive record whose head carries the source path, the pre-move line or range, the date, a
**computed** `sha256`, and why they moved; the delivered text states the corrected reading as its own content.

**AND THE CONSEQUENCE FOR ANY CORRECTION PASS:** a pass that adds a correction round and re-derives the figures its own
last round printed is repeating the mistake; a pass that adds one and does NOT re-derive them leaves them false. **The
figures that describe a correction are the first casualties of the correction**, and the pass that fixes a range must
re-read every figure that ranged over it.

---

## §5 · What this file does not do

- **It decides nothing.** It states no position on a unit's scope, its pins, its fractions or its rulings.
- **It carries no authority over the corpus.** Where a unit's own contract states how it is checked, that contract
  governs its own rungs; this file's questions are additive and may not be read as repealing one.
- **It does not replace the preset.** It is `DRAFT — AWAITING THE ARCHITECT'S CORRECTION`, derived from one unit, and a
  rule here that the preset contradicts is wrong and not an amendment.
