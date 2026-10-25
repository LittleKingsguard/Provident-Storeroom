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

---

### `D-5` — the strata preset's test-role write scopes are kept; the project's batteries adapt

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, answering the
model question `D-4` left open.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Keep the preset's choice

**THE QUESTION IT ANSWERS, SO THE ANSWER'S SCOPE IS NOT GUESSED.** `D-4` hands the publish shape to *"the
e2e/blind scenario testing"*, and `D-4` recorded that the project's batteries and the preset's test roles do not
share a path convention. The question put to the architect was: **does the e2e/blind battery keep
`bindings/js/test/` and `bindings/js/greens/`, with the preset's test-role scopes bending to it — or do the
batteries move under the preset's scopes?** **The answer is the second: the preset is not amended.**

**WHAT IT SETTLES.**

- **The strata preset's three test-role write scopes stand as configured and are not edited for this project:**
  `role_l1_test_writer` → **`tests/e2e/`**, `role_l2_test_writer` → **`tests/integration/<module>/`**,
  `role_l3_test_writer` → **`tests/unit/<module>/`**. **The preset is the constraint; the tree adapts to it**,
  and every alternative that bent a role's declared scope to a path this project already uses is refused by this
  ruling.
- **The battery modules' current paths are therefore PRESENT-STATE paths, not the model's homes.** The map's
  `store-battery` (`tests/`), `binding-battery` (`bindings/js/tests/`), `js-battery` (`bindings/js/test/`) and
  `greens-harness` (`bindings/js/greens/`) own what exists **today**; **when the strata model takes the batteries
  over, their content is stratified into the preset's three scopes.**

**WHAT IT DOES NOT SETTLE, AND THIS IS THE WHOLE OF THE REMAINING WORK.**

- **It does not say which file goes to which scope.** The preset's decomposition is **by layer** — e2e drives the
  built artefact through its declared entry points; integration drives one module's I/O surface; unit pins one
  module's signatures — while **this project's batteries are organised by unit and wave** (`json-crossing`,
  `held-listener-identity`, `constraints`, `file-tier-save`, `publish`, the `gate4_*` sets). **A re-cut from one
  organisation to the other is a redistribution of 75 files across three layers, and it is not a path rename.**
  **That decomposition is L1's to declare, not L0's**, and no clause here draws it.
- **It orders no migration and schedules nothing.** `D-1`…`D-4` each order no code move, and this ruling settles
  a convention rather than opening work.
- **It does not change any battery's content, coverage, or the layer each green is reported against.** The
  project's rule that *"a green on one layer does not retire a red on another"* (`strata/brief.md` §5 item 8)
  survives the move of the files that report it.
- **It does not touch `role_l1_examiner`, `role_l2_examiner` or `role_l3_examiner`**, whose scopes are reads and
  whose procedures are unchanged by where the battery lives.

**WHAT IT MEANS FOR THE TWO OPEN PIECES OF WORK, STATED SO THE ORDER IS VISIBLE.** Two pieces now stand
recorded and unscheduled: the **subdivision + kernel integration** (`D-1`, `D-2`, `D-3`, `D-4`) and the
**battery stratification** (`D-5`). **They are not independent:** `D-4` makes the publish shape a consequence of
what the e2e/blind scenarios prove, so **the scenarios' placement is upstream of delivery's manifest decision** —
which means the battery stratification is arguably the first of the two, not the second. **That ordering is L0's
own reading and is marked as such; it is not a ruling and the architect has not said it.**

---

### `D-6` — the specifier blocker is resolved: O3 for e2e publish-readiness, O4 for earlier tests

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, choosing from the
option space L0 put to him after the stratification declaration raised the blocker.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Use O3 for e2e publish-readiness, O4 for earlier tests

**THE TWO OPTIONS, RESTATED SO THIS RECORD STANDS ALONE.**

- **`O3` — STAGED INSTALL.** The cell assembles a package tree into a scratch `node_modules` — the package's own
  files as the allowlist carries them, plus a reachable addon — and imports the package **by its name from
  inside that tree**. It passes through the package's **`exports` map** *and* through an **install-shaped**
  tree. It is the project's own idiom: `publish.test.mjs`'s `coveredEnv`/`makeScratch` already assemble trees
  to drive, and `typecheck/` already stages `node_modules/provident-storeroom`.
- **`O4` — PATH ENTRY.** The cell reaches the entry by **path** (`bindings/js/index.mjs`), which resolves the
  addon ladder from the **entry's own directory** and so exercises rung 2 exactly as a name-route does, and
  which **bypasses the `exports` map** — so it cannot catch an `exports` error.

**WHAT IT SETTLES.**

- **The blocker is closed.** No cell needs a bare specifier to reach a package it cannot self-reference from
  `tests/e2e/`, because no cell is left in that position: the publish-readiness cells **stage**, and every other
  cell **reaches by path**.
- **The split criterion is PURPOSE, not layer.** It cuts across the preset's three scopes: a publish-readiness
  cell is one whose subject is *whether the package as shipped resolves and runs*, and it takes **`O3`**; every
  earlier cell takes **`O4`**. **The `exports` map is therefore asserted where the install shape is assembled,
  and nowhere else** — which is also where `D-4`'s publish-shape evidence lives.
- **The 19 files that carry the bare specifier today are all re-spelled**: 17 `*.test.mjs` plus the two shared
  helpers (`constraint-kernel-helpers.mjs`, `held-listener-identity-helpers.mjs`). **Verified list, by path:**
  `a127-surface`, `addon-adoption`, `addon-surface-properties`, `addon-surface`, `constraints-publication`,
  `convenience`, `file-tier-save-properties`, `file-tier-save`, `held-listener-identity-gate4-regressions`,
  `held-listener-identity-surface`, `json-crossing-blinded`, `json-crossing-gate4-adversarial`, `json-crossing`,
  `negative-generators`, `registry`, `round-trip`, `surface` — plus the two helpers.
- **Every greens runner is ALREADY `O4`-shaped, verified:** `greens.mjs:196` is `await import('../index.mjs')`,
  `live-drive.mjs:35` is `path.resolve(HERE,'..','index.mjs')`, and `json-crossing-live.mjs:132` is
  `process.env.JC_ENTRY ?? path.join(HERE,'..','index.mjs')`. **So the move costs the greens nothing but their
  directory** — the one part of the battery `D-5` relocates most easily.

**WHAT IT DOES NOT SETTLE.**

- **Which cells are "publish-readiness".** That is the assignment the stratification declaration owes: each of
  the **33** e2e files takes a route tag, `O3` or `O4`, and **L1 declares it** — L0 does not, and this ruling
  does not list them.
- **What the staged tree contains** (`O3`'s own design): which files it copies, whether the addon is staged as
  the checkout's `build/Release` or as a platform package, and whether one tree serves several cells. **L1's to
  declare.**
- **★ WHETHER THE EARLIER SET KEEPS A PACKAGED-RESOLUTION CELL.** `O4` as L0 defined it carried *"one cell
  asserting the packaged name resolves"*. **With `O3` asserting resolution through a real staged install, a
  second such assertion in the earlier set would be a second home for one claim** — which this project treats as
  a finding rather than a redundancy. **L0's reading, marked as inference and not as the ruling: the packaged
  claim lives EXCLUSIVELY in the `O3` set, and the earlier cells use paths and claim nothing about `exports`.**
  **The architect should confirm or correct that reading.**
- **It does not answer `F3` (the labels).** Route and label are different questions: a cell can reach the entry
  by path and *still* be labelled for the layer it drives. **Whether the checkout's `.node` makes a cell
  `assembled` or leaves it `envelope` is unmoved by this ruling.**
- **It does not answer `F4`.** No route here produces an **installed-from-the-registry** green; `O3` is
  install-*shaped*, not installed. `D-4`'s installed-shape evidence still needs its own driver.
- **It orders no file move.** Like every ruling before it, it settles a mechanism and schedules nothing.

---

### Correction to `D-3` — the count was pinned in **two** cells, not one

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0's own verification while
preparing `D-6`; **a correction to `D-3`, not a ruling.**

**WHAT `D-3` SAID.** *"`bindings/js/test/publish.test.mjs`, cell `P-PUB-7`"* — named as **the** test that encodes
the retired four-entry count.

**WHAT IS ALSO TRUE, VERIFIED.** **`bindings/js/greens/greens.mjs` cell `JSG-12.18` asserts the same thing, and
more:** an **exact set equality** on `['index.mjs', 'README.md', 'index.d.ts', 'src/constraint-kernel.mjs']`
(line 1205), **the fourth entry refused any looser form**, **a fifth entry refused**, and **a `LICENSE` row
refused** (line 1211). **So retiring the count honestly fails TWO cells in TWO different batteries** —
`P-PUB-7` in `js-battery` and `JSG-12.18` in `greens-harness` — and `greens-harness` is the battery whose whole
purpose is to *report* rather than assert.

**AND THE CAUTION `D-3` STATED FOR `P-PUB-7` APPLIES HERE TOO, CELL FOR CELL.** `JSG-12.18`'s other subjects —
**no `build/Release` path, no `.node` at any entry, and no `LICENSE` row** — are **functional and licensing
rules, not shape rules**, and they survive the count's lifting exactly as `P-PUB-7`'s four do. **A pass that
retires the fourth entry must edit both cells and take neither's prohibitions with it.**

---

### Correction to `D-6` — 24 files carry the bare specifier, not 19

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the L1 route-tagging pass,
which measured the population and challenged L0's figure; **L0 verified it and was wrong.**

**WHAT `D-6` SAID.** *"The 19 files that carry the bare specifier today are all re-spelled"*, with a
seventeen-test list plus the two helpers.

**WHAT IS TRUE, VERIFIED TWO WAYS.** **24 test files carry the bare specifier as a module id.**
- **19 by static import** — the list `D-6` already prints, unchanged.
- **5 by DYNAMIC import, which `D-6` missed entirely**: `a126-constraint-methods.test.mjs`,
  `held-listener-identity-properties.test.mjs`, `package-entry.test.mjs`, `publish.test.mjs`,
  `register.test.mjs`.
- **The cause is L0's measurement, stated so it is not repeated: the grep was `from 'provident-storeroom'`,
  which finds static import declarations only, and the count was reported as though it were the population.**

**THE CONSEQUENCE, WHICH IS NOT COSMETIC.** Two of the five were already `O3`-bound (`publish`,
`package-entry`), so `O3`'s staged-name mechanism covers them. **Three were `O4`-bound and were absent from
`D-6`'s list entirely** — `a126-constraint-methods`, `held-listener-identity-properties`, `register` — **and each
carries a dynamic `import()` of the bare name that a path re-spelling must therefore rewrite.** A migration that
worked `D-6`'s list literally would have left three cells importing a name that no longer resolves, which fails
at the cell's own `import()` rather than at load — **the failure mode that reads like a red test instead of a
broken import.**

**THE RULE THIS LEAVES:** **a specifier census must count every form — static `from`, dynamic `import()`,
`require()` and `createRequire` — and must say which forms it counted.** `D-6`'s criterion is unchanged; only its
population was short.

---

### Two readings L0 puts on the record, awaiting the architect's confirmation

**Not rulings. Marked as inference, and nothing is built on either.**

**`R-1` — the `LICENSE`-row prohibition survives the lifted count.** The route-tagging pass flagged that `D-4`
lifts `§2.1` item `1`'s *"and NOTHING ELSE"* while `D-3`'s correction keeps `JSG-12.18`'s **`LICENSE`-row
refusal**, and read the two as colliding on one manifest row. **L0's reading: they do not collide. The
`LICENSE`-row prohibition has its OWN home — `§2.1` item `5`, which `JSG-12.18` cites separately from items `1`
and `6` — so it never depended on item `1`'s exclusivity, and lifting item `1` does not lift item `5`.** The cell's
`LICENSE` subject therefore stands, and the cell is editable: only its exact-set equality is obsolete.

**`R-2` — the packaged-resolution claim lives exclusively in the `O3` set.** Already recorded as `D-6`'s open
item. **Restated here only to keep it visible: it remains UNCONFIRMED, and no pass may build on it as settled.**

---

### `D-7` — the packaged-resolution claim is `O3`'s alone; `O3` is surface-facing/install only, with its own helpers

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, closing `D-6`'s open
item and the route-tagging pass's helper finding.

**THE ARCHITECT'S WORDS, VERBATIM:**

> 2. Put in 03
> 3. 03 is for surface-facing/install tests only and will have/need its own test helpers for the import/install regardless

**WHAT IT SETTLES.**

- **`R-2` IS CONFIRMED.** The packaged-resolution claim — *the name resolves through the `exports` map* — lives
  **exclusively in the `O3` set.** The earlier set claims **nothing about `exports`**: its cells reach the entry
  by path and say so. **No packaged-resolution cell is owed in the `O4` set, and a migration that adds one has
  invented work.**
- **`O3`'s membership rule is now narrower than "assembles a tree":** it is **surface-facing and install tests
  only.** A cell that assembles a tree but whose subject is a *behaviour* is not an `O3` cell — which confirms the
  tagging pass's call on `negative-generators` (an arm's subject, not the file's route) and confirms that the
  `O3`-shaped *limbs* found inside `O4` files stay limbs, not routes.
- **`O3` OWNS ITS OWN HELPERS, FOR THE IMPORT/INSTALL MECHANISM, AND WILL NEED THEM REGARDLESS.** This dissolves
  the helper constraint the tagging pass reported: an `O3` cell must **not** consume an `O4` helper, because one
  `import` statement cannot be both a name reach and a path reach. **So the shared-helper question has no
  subject: `O3`'s helpers are `O3`'s.** `O4` keeps the existing helpers, and no helper becomes a
  two-mechanism file.

**WHAT IT DOES NOT SETTLE.**

- **Which helpers `O3` needs and what they contain** — the staging helper, the install helper, the
  name-resolution assertion helper. **L1's to declare**, and `D-6` already declares the staged tree's contents.
- **The two shared helpers' fate** (`constraint-kernel-helpers.mjs`, consumed by 12 files across three scopes;
  `held-listener-identity-helpers.mjs`, by e2e + integration). Since no `O3` cell may consume them, **their
  consumption set shrinks to `O4` + integration + unit**, and the re-check at migration is a bookkeeping task,
  not a design question.
- **It orders no file move.**

---

### Correction to `R-1` — withdrawn: the `LICENSE`-row refusal is grounded in item 1, not item 5

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, reading the contract's own
carriage clause; **a correction to L0's reading, not a ruling.**

**WHAT `R-1` SAID.** *"The `LICENSE`-row prohibition has its OWN home — `§2.1` item `5` — so it never depended on
item `1`'s exclusivity, and lifting item `1` does not lift item `5`."*

**WHAT THE CONTRACT ACTUALLY SAYS, READ AT ITS BYTES.** `§2.1` item `1`'s carriage clause
(`docs/specs/storeroom-publish/contract.md`, the paragraph following item `1`) states the refusal's ground in
terms this reading cannot survive: **"adding a `LICENSE` entry to the main package's `files` is REFUSED because it
would contradict `§2.1` item 1 on its own face."** **So the prohibition IS grounded in item 1's *"and NOTHING
ELSE"*, and `D-4` lifted exactly that.** `R-1` is **withdrawn by name.**

**WHAT SURVIVES INDEPENDENTLY — and this is why the question is live rather than settled.** Three things are not
item 1:
1. **The CARRIAGE MECHANISM.** The main package's licence copy is landed by **the release's own assembly step**,
   which copies the repository's `LICENSE` byte-for-byte into **each of the six artefacts' tarballs**
   (`§2.3` item 2; `distribution.md §4.3` item 2; the `Q3-5` duty; `PUB-DD-11`). **A consumer who unpacks reads
   FOUR published paths while the tracked manifest names THREE, and the contract says that difference "is the
   mechanism rather than a defect".**
2. **`PUB-DD-11`** — a per-artefact copy is *"the licence's TEXT travelling with an artefact"* and **not a fifth
   declaration site**.
3. **`PUB-DD-12` / `DD-43`** — a `LICENSE` byte **written under `bindings/js/`** is refused as a *tracked or
   persisting* file; the pack-time transient copy is reconciled separately and is lawful.

**AND THE FACT THAT DECIDES WHAT THE CHOICE IS WORTH: A `files` ROW CHANGES NO BYTE OF THE TARBALL HERE.** The
licence copy is landed by the assembly step **regardless of the allowlist**, and npm includes a `LICENSE` file
when one is present **regardless of `files`** (npm's own always-included set — general npm behaviour, **not
measured on this branch**). **So the row is PURELY DECLARATIVE: it changes what the manifest says, never what
publishes.** The project has met the neighbouring hazard and has the scar: `publish.yml`'s pre-publish `test -e`
guards exist because **npm omits a missing `files` entry silently** — a declared path that no tarball carries
packs green.

**THE THREE READINGS, PUT TO THE ARCHITECT RATHER THAN DECIDED.**

- **(i) The row stays refused** — on the carriage ground: a row would be **redundant with the assembly step** and
  would make the manifest a second declaration of how the licence travels. `JSG-12.18`'s `LICENSE` subject then
  **stands**, and only its exact-set equality is obsolete.
- **(ii) The row is now LAWFUL** — because its only stated ground is lifted, and a declarative row that cannot
  change the tarball costs nothing.
- **(iii) The row is lawful ONLY IF EVIDENCE REQUIRES IT** — `D-4`'s own criterion: if an e2e/install scenario
  shows a consumer or a scanner needs the row, `delivery` adds it; otherwise it stays out. **L0's reading is
  (iii)**, because it is the only one that does not re-introduce a fixed manifest rule in the place of the one
  `D-4` lifted. **It is marked as inference and nothing is built on it.**

**WHAT THIS CHANGES BELOW ME: one cell's editability.** `JSG-12.18` is the second pin on the retired count
(`D-3`'s correction), and **whether its `LICENSE` subject survives is now an architect's call rather than a
restatement of an existing clause.** Until it is answered, that cell cannot be edited safely.

---

### The path move owes two amendments, and one of them names the move itself

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0's reading of the publish
contract while elaborating `F3`; **a finding, not a ruling.**

**`PUB-DD-24` is the clause that pins the red set's home, its command AND its layer**, and `D-5`'s relocation of
the batteries collides with all three: it declares that **the red set is `bindings/js/test/publish.test.mjs`,
inside the directory the landed JS leg's command globs (`node --test bindings/js/test/*.test.mjs`, taken at the
repository root)**, because *"a red set under `docs/specs/**` would be executed by NO COMMAND THIS PROJECT
RUNS"*, and that **"the unit's own node legs are that same command at that same site, at `ENVELOPE/PURE`"**

**AND ITS OWN `alt` IS THE MOVE, ALREADY PRICED:** *"A SEPARATE COMMAND AND DIRECTORY FOR THE PUBLISH CELLS —
priced: the project's landed legs both run at the repository root, so a third command would need its own tracker
leg, its own record cell and its own layer statement, while the existing command already globs the file; available
with a fresh ruling"*, **followed by a bounded amendment of `docs/specs/storeroom-publish/` together with
`docs/specs/storeroom-js/implementation-plan.md`'s leg declaration, which names the command.**

**SO THE MOVE'S REAL COST IS NOW NAMED, AND IT IS NOT THE FILES:** `tests/e2e/` needs **a third command, its own
tracker leg, its own record cell and its own layer statement**, and two spec directories owe bounded amendments.
**The spec corpus is unowned, so who performs those amendments remains the open question the route pass put to
the architect — this clause is the thing they must amend.** And its finding list also carries **"a rewritten
existing test file"**, which a re-spelling pass must be reconciled against rather than ignored.

---

### `D-8` — `LICENSE` reading **(iii)**: the row is lawful only if evidence requires it

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, choosing among the
three readings `D-4`'s correction put to him.

**THE ARCHITECT'S WORDS, VERBATIM:**

> License - iii

**WHAT IT SETTLES.** **The `LICENSE` row is not refused by rule any more, and it is not granted by rule either:**
`delivery` adds it **only if an e2e/install scenario shows a consumer or a scanner needs the row**, and otherwise
it stays out. **That is `D-4`'s criterion applied to the one manifest row that was still rule-bound** — the shape
follows evidence, and no fixed manifest rule replaces the one `D-4` lifted.

**WHAT THIS DOES TO `JSG-12.18`.** Its `LICENSE` subject asserted an **unconditional** refusal. **An
unconditional refusal no longer exists, so that assertion has no subject** — it is owed **retirement or
re-derivation as evidence-conditional by its owner**, and which of the two is a test-layer declaration, not L0's.
**Its exact-set equality is obsolete separately (`D-3`'s correction), so the cell owes two edits, not one**, and a
pass that makes only the equality edit leaves an assertion standing on a rule that is gone.

**WHAT STANDS, UNMOVED.** The **carriage mechanism** — the assembly step lands the licence byte-for-byte into all
six tarballs, and the manifest's three names against the tarball's four paths *"is the mechanism rather than a
defect"*. `PUB-DD-11` (*not a fifth declaration site*) and `PUB-DD-12`/`DD-43` (**no persisting `LICENSE` byte under
`bindings/js/`**; the pack-time transient copy lawful). **And the fact that makes the choice cheap: the row changes
no byte of the tarball — it is purely declarative.**

---

### `D-9` — `F3`: make the change — and the label is per-run, which makes this structural

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect: *"F3 - Make change"*.

**WHAT IT SETTLES.** **The `O3` cells are to be labelled `assembled`, and the `O4` cells keep `ENVELOPE/PURE`** —
on the ground `D-6` established: an `O3` cell stages a package tree and a platform package and **must not lean on
rung two**, while an `O4` cell is the *"package layer, in-process"* that `§2.1` item 2 says rung two carries.

**★ AND THE STRUCTURAL FINDING L0 MET WHILE PREPARING IT — THE LABEL CANNOT BE CHANGED FOR FIVE CELLS IN PLACE.**
**The layer is declared PER RUN, not per cell:** each runner carries one `const LAYER`
(`greens.mjs:70`, `held-listener-identity-greens.mjs:20`, `json-acceptance-set-greens.mjs:58`,
`json-acceptance-set-live.mjs:54`), and **`greens.mjs` states the coupling in its own words** — *"`const LAYER` AND
`const APP_LAYER` ABOVE, THE HEAD COMMENT AND THE PRINT ARE BYTE-IDENTICAL: a cell of
`bindings/js/test/register.test.mjs` reads them, and a change there would manufacture a false green."*
**So relabelling a subset requires one of exactly two structural moves: (a) per-cell layer labels, or (b) the `O3`
cells separated into their own run carrying its own label.** **Neither is drawn here; L1 declares which.** The
consequence of missing this is the one the code warns about: a half-relabelled run that still prints one label
manufactures a false green in `register.test.mjs`.

**THE SITES ANY PLAN MUST NAME, ALL FOUR ASSERTED RATHER THAN DISPLAYED.** `greens.mjs`'s constant and its two
asserting cells `JSG-12.15`/`JSG-12.16`; `register.test.mjs`'s extraction from `greens.mjs` by path;
`package-entry.test.mjs:345`'s pin against `DD-20`; and `json-acceptance-set-live.mjs:54`'s own glossed label.

**AND THE VOCABULARY'S DEFINITIONAL HOME IS NOW ARCHIVED.** The publish contract cites
`docs/specs/storeroom-js/acceptance.md §4.2` as *"the sibling LAYER label, cited and never re-labelled"* — and
**that file is at `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/acceptance.md`** after this
branch's archival pass, because the keep-set was one `contract.md` per module. **So the relabel's documentary
home sits outside the kept corpus**, and a pass must cite the archived path rather than pretend the citation
resolves.

**WHAT IT DOES NOT SETTLE.** Which structural move (a) or (b); whether the four `O3` *greens* runners are split
from `greens.mjs` or labelled per cell; whether the publish-side vocabulary must move with the JS-side label; and
**no file move is ordered.**

**AND THE PLACEMENT, RECORDED BECAUSE IT GOVERNS WHEN THIS CAN LAND.** `bindings/js/test/` and
`bindings/js/greens/` are **present-state paths that no strata role may write** — the preset's test roles write
`tests/e2e/`, `tests/integration/<module>/` and `tests/unit/<module>/` (`D-5`). **So the relabel lands with the
migration wave, in the battery's new home, and not before** — editing the batteries in place would be L0 doing
implementation outside the model, which is the one thing the wall exists to prevent.

---

### `D-10` — `F4` is in scope, for the local-environment-compatible import

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect: *"F4 - In scope for
the local-env-compatible import"*.

**WHAT IT SETTLES.** **The installed-layer battery is in scope, and it is driven by a LOCALLY PACKED tarball** —
the `LIVE/INSTALL` instrument's own *"packed or released tarball"* arm (`§4.2` item 1), in a directory with no
repository in its ancestry and no `build/Release` beside the entry, with one real Node process. **A registry
release is not required, and nothing here authorises one.**

**WHY THIS IS THE RIGHT ARM, RECORDED BECAUSE IT CLOSES A GAP `F4` DESCRIBED WRONGLY AT FIRST.** L0 called the
situation a circularity — shape determined by installed evidence, but nothing installable before it is shaped.
**It is not a circularity: the declared instrument already accepts `npm pack` output, so the shape can be
determined before any release.** `F4`'s gap was a **missing battery**, not a missing ruling — and `D-4`'s evidence
base is now available: **a packed-tarball install is the instrument that falsifies the allowlist, which is exactly
what the lifted count no longer constrains by rule.**

**WHAT IT BECOMES IN THE STRATIFICATION.** It is **`O3`'s strongest cell set** — surface-facing/install, staged,
name-resolved — and under `D-7` it **carries `O3`'s own import/install helpers and consumes no `O4` helper.** It
is the one battery that reaches **rung one**, so the five platform names are falsified there and nowhere else
today.

**WHAT IT MUST NOT CLAIM — both already priced, and neither is optional.** **`PUB-DD-13`:** a **local tarball's
digest is NOT the released artefact's tie** — a consumer verifying against it meets a mismatch on a correct
package, so the battery takes **shape** evidence and mints **no digest figure**. **`PUB-DD-14`:** it is **not**
*"a consumer has loaded this package"* — that universal negative is unfalsifiable by this topology, and
`LIVE/INSTALL` drives a clean directory and one Node process, **not an application**. **And `APP` stays `NONE`**: an
installed green is not an `APP`-green.

**WHAT IT DOES NOT SETTLE.** Its cells, their count, its own label string, its helpers' contents, and its command —
**L1 declares all of it.** And it orders no build: the battery is declared before it runs, like every unit here.

---

### Correction to `D-9` — the `O4` set is LEFT UNTOUCHED, not "kept at `ENVELOPE/PURE`"

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, against the tree, after the
declaration pass reported its four-site reading.

**WHAT `D-9` SAID.** *"The `O3` cells are to be labelled `assembled`, and the `O4` cells keep `ENVELOPE/PURE`."*

**WHAT THE TREE SHOWS.** **`live-drive.mjs` already declares `LIVE / ASSEMBLED PACKAGE`** — its head comment
reads *"this run is a LIVE run of the ASSEMBLED PACKAGE — the real artifact, a real process, real file I/O, real
caller"* and it prints the same at `:1296` — **and it is an `O4` cell** (`O4` = path entry, which says nothing
about the layer). **So `D-9`'s second half, read literally, would have DOWNGRADED a run that already reports the
stronger layer.** That was L0's over-specification, not the architect's instruction, and it is corrected here.

**THE OPERATIVE READING.** **`D-9` moves the `O3` cells to `assembled` and LEAVES THE `O4` SET ALONE** — whatever
each `O4` run already declares stays declared, `ENVELOPE/PURE` where it says so and `LIVE / ASSEMBLED PACKAGE`
where `live-drive.mjs` says so. **Route and label are independent axes (`D-6`), and `D-9` moves one of them.**

**AND THE DECLARATION PASS'S STRUCTURAL CHOICE IS THEREBY CONFIRMED ON EVIDENCE, NOT ON PREFERENCE.** It measured
that **no `O3` cell sits inside any of the four files that carry a run-level `const LAYER`**, so the relabel is
**not** an edit to any existing runner: the `O3` label gets its home in the new `O3` helper
(`tests/e2e/staged-install/staged-install-support.mjs`), and **`greens.mjs`'s constant, `JSG-12.15`/`12.16`, and
`register.test.mjs`'s two extraction cells are not edited at all** — which is what keeps the trap the code warns
about (`"a change there would manufacture a false green"`) from ever being approached.

**`Q14` AND `Q18`, ANSWERED AS CONSEQUENCES RATHER THAN PUT TO THE ARCHITECT.** **`Q14`:** yes — `publish` and
`publish-generators` are `O3` cells, so `D-9` reaches them; **what they conflict with is `PUB-DD-24`'s text, and
that clause's amendment is already recorded as owed**, so the relabel waits on the amendment rather than on a
ruling. **`Q18`:** `D-8` (iii) makes the `LICENSE` row's antecedent *"does a consumer or a scanner need it?"* an
**install observation**, so its evidence lives in the installed battery — declared as `INSTALL-11` (the carriage
as a **positive** observable, where a refusal used to stand) and `INSTALL-12` (the conditional, citing its
evidence). **A greens cell is a blind instance off documentary bytes and cannot carry an install observation,
which is why the disposal is retire-here / re-derive-there and not a rewrite of `JSG-12.18`.**

---

### `D-11` — the third leg, its tracker entry and its layer statement are owned by the battery/greens module

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, answering the
ownership question `D-9`'s amendment note left open.

**THE ARCHITECT'S WORDS, VERBATIM:**

> 1. Owned by battery/greens module

**WHAT IT SETTLES.** **The `tests/e2e/` command, its tracker leg and its own layer statement are owned by the
battery/greens modules** — `js-battery` and `greens-harness`, the two modules that own the batteries being moved
(map §2.4). **The e2e set spans both batteries, so the leg follows the battery that carries it rather than a
project-level harness.**

**AND THE SPEC-CORPUS GAP IS CLOSED FOR THIS CLAUSE BY ITS OWN SUBJECT, which is why the earlier
"unowned corpus" objection does not block this move.** `PUB-DD-24` declares **exactly those three things** — the
red set's *site*, the *command* that globs it, and the *layer* it reports — **so the module that owns the
battery owns the clause's subject**, and the amendment is read through that module's declaration rather than
through an unowned corpus. **This is a narrow resolution and it does not make the corpus owned in general**: it
says that a clause whose entire subject is a module's site, command and layer follows that module. **L0's reading
of the architect's words, recorded as such.**

**WHAT IT DOES NOT SETTLE.** **Where the split falls between `js-battery` and `greens-harness`** when one leg
spans both — L1 declares it if a single owner is needed. **Who amends
`docs/specs/storeroom-js/implementation-plan.md`'s leg declaration** — the second amendment `PUB-DD-24`'s `alt`
names, whose subject is a *command* the sibling unit declares rather than a battery's own site. **And the root
manifest's `scripts`** (the private harness manifest, unowned by design): the leg's *declaration* is the battery
module's, while the root `package.json` byte that spells it is still harness — **a pass that adds the script edits
an unowned file, and that is declared rather than glossed.**

---

### `D-12` — the installed battery MAY pack a local platform tarball

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect: *"2. Yes"*, to the
question whether the battery may pack a local platform tarball.

**WHAT IT SETTLES.** **The installed battery is SELF-CONTAINED: it packs the main package AND the host platform
package and installs both, so RUNG ONE FIRES WITHOUT A REGISTRY.** `D-10`'s local-env-compatible arm is therefore
fully drivable off-line, and `INSTALL-08` (this host's name as a **load**) becomes a green the battery can reach
rather than a claim it can only restate.

**AND IT BUYS A FALSIFIER THE PROJECT HAS PAID FOR ONCE ALREADY.** Packing the platform artefact locally puts
**that artefact's own `files` allowlist** under the battery's observation — the exact surface whose defect made
`0.1.0`'s five platform tarballs **publish green while each carried `README.md` and `package.json` alone**, its
`files` naming a `.node` and a `LICENSE` that were *"NAMED BUT ABSENT"* (`docs/specs/storeroom-publish/contract.md`
§3's failure list; the reason `publish.yml` grew its pre-publish `test -e` guards). **A local pack + install sees
that defect at the artefact rather than at the registry.**

**THE MECHANICAL RISK, DECLARED SO IT IS NOT DISCOVERED IN THE CELL.** The main package's five
`optionalDependencies` are **pinned exactly**, so a plain `npm install` of the packed main tarball will attempt to
**resolve the platform package from the registry** unless the pin is satisfied locally. **Which route solves that
— install order, `--omit=optional` then a manual placement, a local resolution route, or a rewritten dependency —
is L1's and L2's to declare; the permission this ruling gives is to pack and install locally, not a mechanism.**

**WHAT IT DOES NOT SETTLE.** Whether the battery packs **all five** platform artefacts or **the host's alone**;
whether a **registry-named** install is also driven to show the pinned-dependency route; the platform artefact's
own cells; and how the local install is isolated from the repository ancestry `§4.2` item 1 requires absent.

---

### `D-13` — the kernel is cut too, and `bindings/js/src/entry/` is the parts' home

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, answering the
subdivision declaration's first two questions.

**THE ARCHITECT'S WORDS, VERBATIM:**

> 1. Kernel can be cut
> 2. That works

**WHAT IT SETTLES.**

- **`bindings/js/src/constraint-kernel.mjs` (2,203 lines) IS TO BE CUT**, on `D-2`'s own ground: **it is longer
  than every one of the eight entry parts**, so leaving it whole would reproduce in miniature the problem `D-2`
  exists to fix. **The entry's cut and the kernel's cut are one readability decision, not two.**
- **`bindings/js/src/entry/` is the parts' home** — confirmed, so the entry's parts ship **inside `src/`** rather
  than at the package root or a sibling `parts/`. **That is also the reachability fact the allowlist inherits:**
  with the parts under `src/`, a published tarball must carry `src/entry/**`, which is the third time this branch
  has found the allowlist to be a consequence of the code rather than a declaration (`D-3`, `D-4`).

**WHAT IT DOES NOT SETTLE — and the first is a precondition rather than a detail.**

- **The kernel's cut lines.** The subdivision pass **did not measure the kernel's internal graph** and said so;
  **its cut must be declared against a measurement of that file, not guessed from its length.** A kernel cut
  declared from the outside would be exactly the kind of invented boundary `D-2` was told not to draw.
- **Whether the kernel's parts live under `src/entry/`** (the entry's home) **or their own directory** — the
  kernel is not part of the entry's I/O surface, so "the parts' home" answers the entry's question and not
  necessarily the kernel's.
- **The module and endpoint arithmetic after both cuts.** Whether a kernel part becomes its own module or stays
  internal to `js-constraints` moves the counts the map now holds at 19 modules / 61 endpoints.
- **It orders no code move**, like `D-1` and `D-2`.

**FACT THAT MAKES THE KERNEL CUT CHEAP, MEASURED ON THIS BRANCH:** `constraint-kernel.mjs` has **zero imports**
(`D-2`'s pass measured it, and L0 re-measured it here). **It is internally self-contained, so its parts can be cut
without creating an import cycle among them** — the one hazard a cut of a 2,203-line file most often meets.

---

### `D-14` — the four drives re-stage by GLOB plus an explicit kernel path

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, choosing among the
three re-staging mechanisms L0 put to him.

**THE ARCHITECT'S WORDS, VERBATIM:**

> 3

**WHAT IT SETTLES.**

- **The re-staging mechanism is the GLOB of the parts directory, paired with an EXPLICIT KERNEL PATH.** No
  hand-maintained part list is written into any drive: `src/entry/` is a **closed set by construction**, so a glob
  is stable, **and the kernel's path is named explicitly because a glob cannot express it.**
- **The four drives stop claiming an entry-only tree.** `publish`, `publish-generators`, `version-stamp` and
  `negative-generators` each stage **the part set** instead of `index.mjs` alone, so **the claim that a tree
  carrying the entry by itself still loads retires with `D-1`'s lazy seam** — it is not repaired, it is withdrawn.
- **It is the option that does not re-introduce a list**, which was the ground: `D-3` and `D-4` removed a
  hand-maintained manifest rule from this project, and a hand-listed part set would have put one back one
  directory over.

**WHAT IT DOES NOT SETTLE.**

- **The glob's exact form** — which directory it walks, whether it is recursive, and what a drive does if it
  matches nothing (an empty match must be a **loud** failure, not a silently smaller tree).
- **The explicit kernel path after the kernel's cut**, which `D-13` left unmeasured: the path named today
  (`src/constraint-kernel.mjs`) is the path of a file the cut is about to change.
- **Whether the kernel's parts belong under `src/entry/`** — if they do, the glob covers them and the explicit
  path is belt-and-braces; **if they do not, the explicit path is load-bearing** (`D-14`'s pairing).
- **How `publish`'s fault-injection arms stay orthogonal.** That drive writes a **deliberately faulty** entry
  source, and its subjects are the absent-addon and wrong-version arms. **A globbed part set must not let a shape
  fault and an injected fault be read as one another** — a finding to declare, not to discover at the assertion.
- **It orders no code move.** The cut and these four drives land as one wave (`D-14`'s own ordering fact), and no
  wave is opened by this ruling.

---

### `D-15` — the kernel cut is accepted (five parts + a barrel), and three of its findings corrected

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the kernel-cut declaration pass,
validated by L0 against the tree; **the rulings it needed resolved are L0's readings, marked as such.**

**THE CUT, VERIFIED RATHER THAN ACCEPTED.** Five parts and a barrel, tiling `constraint-kernel.mjs` exactly:
**2,195 lines in assigned regions + 8 separator lines, and L0 measured all eight of those separators to be BLANK**
(`482 · 1154 · 1363 · 1418 · 1776 · 1803 · 2059 · 2090`) — so `2,195 + 8 = 2,203` closes with no gap and no
overlap. The DAG is `9a→∅ · 9b→9a · 9c→9a · 9d→9a,9e · 9e→9a`: **the root has no out-edge, exactly one part reaches a
second part, depth is three** — no cycle, and two candidate cuts were refused with the cycle that would have
followed. **The file's measured zero-import footprint is what let the cut avoid the usual hazard.**

**★ THE BARREL IS NOT A CONVENIENCE — THE ARCHIVED CLAUSE REQUIRES IT. L0's reading of `kernel-surface.md §1`
item 1** (now at `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-constraints/kernel-surface.md`):
**"the kernel module's ONE checkout home is the ESM SOURCE FILE `bindings/js/src/constraint-kernel.mjs`, and the
import spelling a red set at `bindings/js/test/**` uses is `import { register, commit, runAttempt, log, report }
from '../src/constraint-kernel.mjs'`."** **A barrel at that path preserves BOTH the one home and that spelling, so
the five parts sit *behind* the home rather than becoming five new homes.** **That answers the pass's questions 2
and 4 at once: the barrel is required, and five internal relative imports do not violate the clause — it governs
where the surface is REACHED from a red set, not the edges inside the package.** **Marked as L0's reading of an
archived clause; the architect may overrule it.**

**`src/entry/` with a `kernel-` prefix is confirmed BY `D-14`, not by taste:** one glob plus one explicit path
stages a loadable tree **only if the parts share the globbed directory**, so a nested `src/entry/kernel/` would
need a recursive glob or a second one. **The barrel stays at its old path one level up, which is precisely why
`D-14` pairs the glob with an explicit kernel path — the glob cannot express the barrel.**

**THE PASS'S QUESTION 1 IS ANSWERED BY ITS OWN ARITHMETIC: `9a` at 561 lines is NOT the largest part.** `9b` is
`634`; `9a` is second and comparable to `9d`'s `565`. **The premise "9a is too large" does not survive the
figures, so no further cut is owed on that ground.**

**★ AND TWO OF THE PASS'S FINDINGS ARE WRONG, CORRECTED HERE ON MEASUREMENT.**

- **It reported `held-listener-identity-greens.mjs:909`'s cell `HLI-13.1` as FALSE on this tree, "for an ordering
  reason". IT IS GREEN.** The cell compares `Object.keys(kernel).sort()` to `KERNEL_ITEMS`, and **the greens file
  declares its OWN `KERNEL_ITEMS` at `:31` — sorted, six names** — which **shadows** the helper's unsorted constant
  the pass attributed to it. **A fixer sent to "the ordering bug" would have edited a file that has no bug.**
- **So exactly ONE cell is red, not two: `blind-constraints-v2.mjs:1139`'s `SURFACE` cell 1**, which pins the
  kernel's namespace to **five** names (`commit,log,register,report,runAttempt`) and is **false at HEAD** because
  `K-6` (`remove`) landed. **That is a stale blind cell, red before this branch's rulings touched anything.**

**AND THE INCONSISTENCY THE PASS FOUND IS REAL AND IS NOT THE SAME FINDING: TWO SHARED HELPERS DISAGREE ABOUT THE
KERNEL'S EXTENT.** `bindings/js/test/constraint-kernel-helpers.mjs:48` declares **five** names;
`bindings/js/test/held-listener-identity-helpers.mjs:163` declares **six**. **Both are consumed across scopes, so
the disagreement is a live hazard for the migration** — and under `D-7` the `O3` set will carry its own helpers,
which is where this must be settled rather than copied forward.

**ARITHMETIC, WITH THE PASS'S OWN CORRECTION APPLIED.** **19 modules / 61 endpoints, unmoved** — the kernel's parts
are files inside `js-constraints` and every new edge is intra-module, so no interaction is minted. **Tracked paths:
`126 → 133` after the entry cut** (the pass corrected `entry-subdivision.md`'s `134`, which had counted part 1 as
new) **and `138` after both cuts.** **The allowlist by reachability becomes 16 rows** — the barrel, the five kernel
parts, the entry's own file, and the entry's parts.
