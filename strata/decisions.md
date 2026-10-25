# Decisions — the architect's rulings

**WHAT THIS FILE IS.** The user's rulings, recorded verbatim, and the consequences each one carries for the
work below me. **This file is L0's authority.** A question it answers is answered; a question it does not
answer goes back to the user. **No entry here is a design decision taken by the supervisor** — an entry exists
only because the architect said it, and the ruling's own words are quoted so that no later restatement can
drift from them.

**WHAT AN ENTRY CARRIES.** The architect's words; the date and branch it was given on; the artifacts it
supersedes; **what it settles**; and **what it explicitly does not settle** — because the boundary of a ruling
is as load-bearing as the ruling.

---

## `D-1` — the constraint kernel is tightly integrated, not an external import

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, in session,
correcting a configuration made by the earlier (pre-strata) workflow's agent.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Because the constraint mechanism is a strict requirement and is checked for triggered handles automatically
> on read, the constraint kernel does not need to be an external import as with how the original agent
> mistakenly configured it, it can be tightly integrated

**WHAT IT SUPERSEDES IN THE TREE AND IN THE PLAN.** The correction is of a *configuration*, and the tree
carries it at four sites, each of which this ruling names:

1. **`bindings/js/index.mjs:5227`** — `if (KERNEL === null) KERNEL = require_('./src/constraint-kernel.mjs');`
   — the kernel is reached **lazily, inside `constraintsKernel()`, never at load**. The entry's own comments
   state the same rule in as many words (*"the entry imports no kernel at load"*).
2. **`bindings/js/package.json`** — the `files` allowlist spends a **fourth** entry on
   `src/constraint-kernel.mjs`, so the kernel ships as a separately-reachable module of the published package.
3. **`docs/L1/module-map.md`** — module **13 `js-constraints`** ("reach the kernel lazily without importing it
   at load"), module **14 `constraint-kernel`** (owning the separate file), interaction **I-11** (the lazy
   reach, declared as a call), interaction **I-23** (the four-entry `files` allowlist), interaction **I-26**
   (the battery reaching kernel cells through `../src/constraint-kernel.mjs`).
4. **`docs/L1/modules.json`** — the same two modules and their endpoints.

**WHAT IT SETTLES.**

- **The constraint mechanism is a strict requirement and is not optional**, so the lazy-and-separable
  configuration has no ground to stand on: there is nothing to defer, because the mechanism is always there.
- **The kernel is not an external import.** It is **tightly integrated**, and ownership of it therefore does
  not sit at a module boundary: the two modules above are **one** integrated ownership, and the boundary
  between them in the map is not a boundary the architect recognises.
- **The fourth `files` entry** exists only to publish a separately-reachable kernel, so **it has no subject**
  under this ruling; the published package's allowlist consequence is the ruling's, and the map carries it.
- **The kernel's export set stops being a boundary claim.** The archived unit pinned it (*"exactly five"*, now
  six) and refused a seventh by name; a tightly integrated kernel **publishes no export set at all**, so that
  pin no longer governs anything outside the code.

**WHAT IT DOES NOT SETTLE, AND MUST NOT BE READ AS SETTLING.**

- **It does not order a code move.** It rules what the constraint mechanism *is* — integrated, not imported —
  not which pass physically merges the file, nor in what order the edits land. That is an implementation
  question and it is not L0's, and this entry opens no unit.
- **It does not re-decide the `A112` ordering law.** The architect's phrase *"checked for triggered handles
  automatically on read"* is recorded above verbatim and is **not** to be re-spelled by any layer below: its
  exact mechanical reading against `A112` — constraints evaluated first, other listeners only once every
  constraint has passed — is the architect's to confirm if any pass needs it as a testable claim. **The
  distinction matters: `D-1` says the mechanism is unconditional; whether delivery already follows the pass
  remains the measurement the brief marks `OWED`.**
- **It does not move evaluation to the store side.** The ruling is about an **import** — a JS module
  boundary — and it neither requires nor forbids the Rust store evaluating constraints itself. A layer that
  reads it as a store-side mandate has invented that.
- **It does not touch the five published surface members or the failure set.** The instance's fourteen own
  members, the sixteen statuses and the single failure form are unmoved by it.

**THE STATE OF THE PLAN AT THIS RULING.** `docs/L1/module-map.md` and `docs/L1/modules.json` were committed
at `e2fcbef` **before** this ruling and still carry the superseded configuration. They are owed a revision,
and the map's own honesty conventions require the revision to say what it replaced rather than to present the
new reading as though it had always been there.

---

### `D-1-bis` — the reading of *"automatically on read"* is settled: **(a)**

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, answering a
question L0 put to him rather than interpreting the clause itself.

**THE QUESTION L0 ASKED, IN FULL — the two readings put to him, neither taken:**

> - **(a) The triggered set is what gets checked automatically** — i.e. the mechanism is unconditional on the
>   write/commit path, which is the `A112` law as it stands. This is how I read it, and it's what makes the
>   lazy import pointless.
> - **(b) Reads check constraints** — a `read` would consult registered constraints and refuse or filter. **No
>   clause in any kept contract declares this**, and it would be new law: it changes `read`, `readLiteral` and
>   the assembly's omission rules.

**THE ARCHITECT'S ANSWER, VERBATIM:**

> a is correct

**WHAT IT SETTLES.**

- **The constraint mechanism is unconditional on the write/commit path**, over the triggered handle set. There
  is nothing conditional to defer, which is the ground under `D-1`: the lazy-and-separable reach has no
  subject because the mechanism is always present.
- **★ READS CHECK NO CONSTRAINT — (b) is REFUSED BY THE ARCHITECT.** `read`, `readLiteral` and a branch's
  assembly **consult no constraint**, **refuse nothing on a constraint's verdict**, and **filter nothing** on
  one. **There is no read-side enforcement arm, none is declared, and none is owed** — this is stated as a
  refusal of a candidate reading rather than as an absence, so that no later pass "helpfully" adds one.

**WHAT IT DOES NOT SETTLE — AND THIS IS THE CLAUSE THAT WILL BE MISREAD IF IT IS NOT PRINTED.**

- **It confirms what the law IS; it does not confirm that the implementation CONFORMS.** The `A112`
  conformance question — *does delivery actually follow the constraint pass?* — **remains unmeasured on this
  branch.** The archived tracker (`docs/next-steps.md` `N7`) measured it **red** on 2026-10-15, and no pass
  since has re-measured it. **`D-1-bis` does not turn that measurement green, and no layer may report it green
  on the strength of this ruling.** The brief marks it `OWED` a measurement and that marking stands.
- **It adds no status to the closed failure set** (sixteen, plus the open escape arm) and moves no member.
- **It orders no code move and opens no unit.** It settles a reading; it schedules nothing.

**WHAT IT CHANGED BELOW ME: nothing but a prohibition.** The L1 map needs no revision for it — the module
merge, the endpoint counts and the ownership arithmetic are all `D-1`'s and are unmoved by which reading of
"on read" is true. **What it changes is what a designer may NOT build: a read-path constraint arm.**

---

### `D-1-ter` — what the lazy reach was protecting, and why the `files` entry is not a one-line delete

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **WHAT THIS IS:** not a new ruling. It is
**the verified mechanism that `D-1` dissolves**, recorded at the architect's request ("explain the files
question") so that the explanation persists rather than living in one reply.

**THE REACH ITSELF.** `bindings/js/index.mjs:5227`:
`if (KERNEL === null) KERNEL = require_('./src/constraint-kernel.mjs');`, inside `constraintsKernel()`.

**THE REASON THE SITE ITSELF GIVES FOR THE LAZINESS, VERBATIM FROM THE CODE** — and it is **not** "the
constraints are optional", which is the reading `D-1` corrects:

> **IT IS NOT AN EXPORT AND NOT A SUBPATH**: the module is reached as a FILE, at the path the allowlist
> publishes it at. **AND THE RESOLUTION IS LAZY ON PURPOSE**: the entry must still LOAD where nothing is staged
> beside it — the publish and negative drives assemble trees carrying `index.mjs` alone — and a load-time
> import of `./src/` would make every one of those trees unable to reach the artefact they were built to drive.

**So the laziness protects the PROJECT'S OWN TEST DRIVES, not a caller's optionality.** That is why removing it
is a coupled change and not a deletion, and the coupling is **three layers deep, each verified on this branch:**

| layer | what pins the fourth entry | where |
|---|---|---|
| **the code** | the entry reaches the kernel by **path**, so a package published without the file throws at the **first constraint act** | `bindings/js/index.mjs:5227` |
| **the publish gate** | the kernel is deliberately **not** an `exports` arm — `exports` publishes `"."` alone — so `files` is the **only** gate that puts it in the tarball | `bindings/js/package.json`, the `exports` map |
| **the test** | a cell asserts **exactly four** entries, the fourth named by path, and that no `.node` and no `build/Release` is among them | `bindings/js/test/publish.test.mjs`, cell `P-PUB-7` |
| **the contract** | the allowlist's own count is a **declared clause**, not an implementation detail | `docs/specs/storeroom-publish/contract.md §2.1` item **6**, which `P-PUB-7` cites |

**THE FOURTH CONSEQUENCE, AND THE ONE THAT MAKES IT A WAVE RATHER THAN AN EDIT.** When the kernel stops being
a separately-reached file, **the drives that assemble `index.mjs`-alone trees stop being lawful as they stand** —
they must either stage the integrated set or drop their kernel-only limbs. So the change touches **source, the
publish drive fixtures, a test assertion and a contract clause**, and the ordering is forced: **the code
integrates first, the allowlist and the clause follow it, and no release may be cut in between**, because a
tarball cut in between is a tarball whose first constraint act throws.

**WHAT THIS ENTRY DOES NOT DO.** It does not order that wave, schedule it, or open a unit — `D-1` and `D-1-bis`
both say no code move is ordered. It records what the move would have to touch, so that the question "who lands
the fourth entry's removal" has a factual answer instead of a guess: **whoever owns a wave that spans the entry,
the drives, the assertion and the clause — which is a unit, and no unit is open.**

---

### `D-2` — `index.mjs` is to be subdivided for readability

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, answering L0's
question about `D-1`'s end state (whether one module owning two files satisfied *"tightly integrated"*
indefinitely, or whether the kernel was intended eventually to be inlined into `index.mjs`).

**THE ARCHITECT'S WORDS, VERBATIM:**

> 1. Index.mjs is already too long and should be subdivided anyway for readability

**WHAT IT SETTLES.**

- **The subdivision of `bindings/js/index.mjs` (5,903 lines) is sanctioned by the architect, on its own ground
  of readability** — not as a consequence of `D-1`, and not conditional on it. It is owed as legibility work
  even if the kernel question had never arisen.
- **`D-1`'s end state is thereby answered, and the answer is neither of the two L0 put to the plan:** the
  kernel is **not** appended to `index.mjs` as it stands, because a file already too long is the wrong
  destination for 2,203 more lines. **`D-1` and `D-2` compose: the tight integration lands inside a
  subdivided entry**, and `D-2` is the shape in which `D-1` is realised rather than a competing direction.
- **The L1 map's co-ownership of `index.mjs` stops being a standoff.** `docs/L1/module-map.md §5.1` records
  that *"no single module can own `index.mjs` until the regions are physically separable"* and that **"this map
  does not order the separation."** **The architect now does.** §6's question 2 asked two things and its second
  half — *should the split be taken?* — is **CLOSED: yes, for readability.**

**WHAT IT DOES NOT SETTLE, AND MUST NOT BE READ AS SETTLING.**

- **The cut lines.** How many parts, where the boundaries fall, and what they are called is **L1's** to declare
  and an implementation wave's to land. **`D-2` sanctions the subdivision; it does not draw it**, and a layer
  that treats this ruling as a file plan has invented one.
- **§6 question 2's first half** — *are the five declared line-regions right?* — **stays open.** The regions
  that exist are the ones the current file implies, and nothing in `D-2` blesses them as the cuts to take.
- **It orders no pass, opens no unit, and moves no code today.** Like `D-1`, it settles a direction and
  schedules nothing.
- **It licenses no change to the published surface:** the one `exports` arm, the fourteen own members, the
  sixteen statuses, the single failure form and the `files` allowlist's ordering are all outside it. The
  allowlist question is `D-1`'s and `D-1-ter`'s.

**WHAT IT CHANGED BELOW ME.** The map is owed a revision at two sites (`§5.1` and `§6` question 2) so that it
stops saying the separation is unordered. That revision is delegated; the map's module count, endpoint count
and ownership arithmetic are unmoved by it, because `D-2` reclassifies a standoff and draws no boundary.

---

### `D-1-quater` — the `files` question was L0's mis-framing: `delivery` already owns it

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect's challenge —
*"Wouldn't this already be handled by the delivery module?"* — and it is, so this entry records a **correction to
L0's own framing, not a ruling of the architect's.**

**WHAT L0 GOT WRONG.** `D-1-ter` closed with *"whoever owns a wave that spans the entry, the drives, the
assertion and the clause — which is a unit, and no unit is open."* **That sentence implies an ownership gap, and
there is none.** The map already assigns every one of those artifacts:

| artifact | owner |
|---|---|
| `bindings/js/package.json` — **the `files` allowlist itself** | **`delivery`**, whose declared responsibility is *"Own the package manifest, the five per-platform packages, both crate manifests, the shipped README and the release pipeline"* |
| `bindings/js/index.mjs` region `L5202–L5903` and `src/constraint-kernel.mjs` | `js-constraints` |
| `bindings/js/test/publish.test.mjs` (cell `P-PUB-7`) and `publish-generators.test.mjs` — the `index.mjs`-alone drive fixtures | `js-battery` |

**So the answer to "who lands the fourth entry's removal" is: `delivery`. It always was.** No module needed
declaring, no boundary needed drawing, and **no separate unit is owed for it.**

**WHAT IS STILL TRUE FROM `D-1-ter`, AND THE DISTINCTION THAT MAKES BOTH CORRECT.** Ownership and sequencing are
different questions.
- **Ownership is complete and was never in doubt.** `delivery` owns the artifact and performs the edit.
- **What `delivery` cannot do is decide the count alone.** The allowlist's *value* — **exactly four, the fourth
  being the kernel** — is declared at `docs/specs/storeroom-publish/contract.md §2.1` item **6** and asserted at
  `P-PUB-7`. **A contract is deliberately owned by no module** (map §5.3: *"no code module owns its own
  specification: a module that owned its contract could amend what it is measured against"*), so **moving that
  declared surface is a spec act**, not an implementer's edit.
- **The order is a property of the dependency, not a negotiation:** the file the allowlist names must exist and
  be reachable, so `js-constraints` integrates, `js-battery` re-points its fixtures and its assertion, and
  **`delivery` retires the entry last**.

**THE PRACTICAL UPSHIFT, WHICH IS WHAT THE CHALLENGE WAS POINTING AT.** The `files` step is **not a question
standing on its own** — it is **`delivery`'s step in an integration wave**, and it needs no separate open item,
no separate unit and no separate owner. **`D-1-ter`'s facts stand** (four pins, forced ordering, no release cut
mid-way); **its closing question does not, and is withdrawn here by name.**

**WHAT THIS ENTRY CHANGES BELOW ME: nothing.** No map revision, no module, no endpoint, no boundary — and that
no-change is itself the answer: when the integration wave is opened, `delivery` already owns its part of it.

---

### `D-3` — the "exactly four" constraint on the `files` allowlist is OBSOLETE

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, in session.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Obsolete the constraint on 'exactly four'

**WHAT "OBSOLETE" IS TAKEN TO MEAN, STATED SO IT IS NOT OVER- OR UNDER-READ:** the project **no longer holds
itself to a declared count** on the package's `files` allowlist. The count is not replaced by another count —
**the constraint is retired**, and what remains binding is the *function* the allowlist serves: **whatever the
entry requires by path must ship in the tarball.**

**WHAT IS OBSOLETED, BY NAME.** Two artifacts encode the retired constraint, and they are **not the same kind of
thing**, so they do not retire the same way:

1. **`docs/specs/storeroom-publish/contract.md` `§2.1` item `6`** — the clause that landed 2026-10-16 and
   declares *"exactly FOUR entries, the fourth being the constraint kernel's own module"* (`A122`, `A121`).
   **It stands as text and is read through this ruling**, which is this project's own supersession convention
   (`RCA-8(d)` ANNOTATE-BESIDE). **No role in this workflow owns the spec corpus** — the nine kept contracts are
   declared inputs, deliberately unowned (map §5.3: *"a module that owned its contract could amend what it is
   measured against"*) — **so this file, the authority log, is what supersedes it. The clause is not rewritten,
   and no pass is ordered to rewrite it.**
2. **`bindings/js/test/publish.test.mjs`, cell `P-PUB-7`** — whose `assert.deepEqual` compares the allowlist
   against the sorted four-name array. **That equality *is* the count constraint; it cannot be narrowed, only
   removed or replaced.** **A test cannot be superseded by a ruling — it passes or it fails** — so this cell is
   **owed a change by its owner (`js-battery`)**, and until that change lands it **encodes an obsolete
   constraint** and would fail the moment the fourth entry is honestly retired.

**AND THE RULE THAT DOES NOT RETIRE WITH IT, NAMED BECAUSE IT LIVES IN THE SAME CELL.** `P-PUB-7` asserts four
further things beside the equality, and **none of them is a count constraint**: `build/Release` leaves `files`;
**no `.node` is published**; no `postinstall` build-on-install route (`PUB-DD-1`); and a tracked-tree walk for a
shipped binary. **They stand, and any change to that cell must keep them** — a pass that deletes the equality and
takes the prohibitions with it has destroyed the load-bearing half of the cell.

**AND ONE ANCESTOR CLAUSE THIS RULING LEAVES STRANDED, RECORDED RATHER THAN RESOLVED.** `§2.1` **item `1`** is
the earlier and stricter rule — *"the allowlist is `index.mjs` · `README.md` · `index.d.ts` and **NOTHING
ELSE**"* — and `P-PUB-7`'s own comment records that item `6` was landed as **item 1's operative reading**. **With
item `6` obsoleted, item `1` has no operative successor in that family, and whether "NOTHING ELSE" retires with
the count or survives as a separate prohibition is a question this ruling does not answer.** It is put to the
architect below rather than decided here.

**WHAT IT SETTLES.**

- **The allowlist stops being an independently declared surface with an arity.** It becomes a **consequence of
  reachability**: the entry requires `./src/constraint-kernel.mjs` by path **today**, so that path must ship
  **today**; when it requires nothing by path, nothing is owed. **The count follows the code; the code no longer
  follows the count.**
- **The spec gate `D-1-quater` described is gone.** `delivery` no longer needs a contract amendment to change the
  allowlist. **The only remaining pin is mechanical** — do not publish a tarball in which an entry-required
  file is absent, because its first constraint act fails — **and that is a consequence of the code, not a rule
  about arity.**

**WHAT IT DOES NOT SETTLE.**

- **It orders no code move.** `D-1` and `D-2` still order none, and this ruling removes a constraint rather than
  scheduling the removal of the entry it constrained. **Retiring the fourth entry before the code stops
  requiring the file publishes a tarball that breaks at the first constraint act** (`D-1-ter`).
- **It does not decide what `P-PUB-7` should assert instead, or whether it should assert anything.** Reachability
  rather than arity is the obvious candidate and **L0 does not write it and must not invent it** — the assertion
  is the test layer's to declare, and the cell's four surviving assertions are its floor.
- **It does not address a glob, a wildcard, or a directory entry in the allowlist.** Whether those are lawful is
  a separate question, and **nothing here licenses one.**
- **It moves no module, no endpoint and no boundary.** The map's I-23 statement of the tree stays true — the
  manifest carries four entries today — and only its *binding force* is retired; the map carries the pointer.

---

### `D-4` — the strict count is lifted, and the publish shape is determined by `delivery` and the e2e/blind scenarios

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, in session,
answering the question `D-3` left open rather than deciding it.

**THE ARCHITECT'S WORDS, VERBATIM:**

> The strict count is lifted, the delivery module and the e2e/blind scenario testing will determine the required
> publish shape

**WHAT IT SETTLES.**

- **`D-3`'s stranded ancestor is closed, and on the wider side: the STRICT COUNT IS LIFTED — the whole family.**
  `§2.1` **item `1`**'s *"`index.mjs` · `README.md` · `index.d.ts` and **NOTHING ELSE**"* retires with item `6`'s
  *"exactly FOUR entries"*. **No declared arity and no declared exclusivity binds the `files` allowlist.** The
  question `D-3` put to the architect — *does "NOTHING ELSE" survive as a separate prohibition?* — is answered:
  **it does not survive.**
- **The publish shape has a named authority, and it is empirical.** **`delivery` — the manifest's owner — and
  the e2e/blind scenario testing together determine the required publish shape.** So the shape is a
  **consequence of what the scenarios prove is required**, and **no allowlist question needs to be put to the
  architect again**: a pass that needs to know the shape runs the instruments that determine it, and `delivery`
  declares the answer in the manifest.
- **This is the replacement for the clause, and it is not another clause.** The count was a *declared* surface;
  its successor is **an evidence-derived one**. A pass that keeps a hand-maintained list in a specification has
  re-created the constraint this ruling lifted.

**WHAT IT DOES NOT SETTLE.**

- **It names no scenario** and does not say that a new one must be written. Which cells carry the evidence, and
  whether the existing e2e/blind set is sufficient to determine the shape, is a test-layer question.
- **It orders no wave and schedules nothing.** `D-1`, `D-2` and `D-3` each order no code move, and this ruling
  assigns authority rather than opening work. **Retiring the fourth entry still requires the code to stop
  requiring it by path** (`D-1-ter`).
- **It changes no prohibition.** `P-PUB-7`'s four surviving assertions — no `.node`, no `build/Release`, no
  `postinstall` route, and the tracked-tree walk — are **functional and security rules, not shape rules**, and
  the lifted count does not touch them.
- **It does not reach the `exports` map or the five exact `optionalDependencies` pins.** Those are not the
  allowlist's shape: `exports` is the resolution surface and the pins are the dedupe guard.

**THE CROSS-WALK THIS RULING OWES THE MODEL, RECORDED BECAUSE IT IS A LIVE COLLISION.** The ruling hands the
shape to *"the delivery module and the e2e/blind scenario testing"*, and **in this tree those are not one layer's
artifacts:**

| the ruling's instrument | the module that owns it today | the strata role that would own it |
|---|---|---|
| the manifest | **`delivery`** | L2 `delivery` |
| the e2e/blind scenarios | **`js-battery`** (`bindings/js/test/*.test.mjs`, incl. `json-crossing-blinded.test.mjs`) and **`greens-harness`** (`bindings/js/greens/blind-constraints-v2.mjs`) | **`role_l1_test_writer`**, whose declared write scope is **`tests/e2e/`**, and `role_l2_test_writer` (`tests/integration/<module>/`) |

**So the authority the architect has named spans two modules and one strata role that do not yet share a path
convention:** this project keeps its batteries at `bindings/js/test/` and `bindings/js/greens/`, while the strata
preset's test roles are declared to write under `tests/e2e/`, `tests/integration/<module>/` and
`tests/unit/<module>/`. **That is a real open question for the model — not for the publish shape** — and it is
put to the architect below rather than resolved here.
