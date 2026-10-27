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

---

### `D-16` — the stale red cell is fixed in the wave, and the wave's executor is named

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect: *"Fix in the wave"*.

**WHAT IT SETTLES.** **`blind-constraints-v2.mjs:1139`'s five-name census is corrected inside the wave**, not
carried as a red. **So the wave's green is unambiguous: it starts from a known red and ends with none.**

**WHICH STAGE, STATED BECAUSE THE WAVE HAS TWO.** The wave is **(1) the kernel cut** — five parts plus a barrel,
source only — and **(2) the entry cut with the four drives' re-staging**, which `D-14` couples. **The red cell
censuses the kernel's NAMESPACE, so it belongs to the stage that touches that namespace: stage 1.** But its file
is a **test**, and no strata role may write `bindings/js/greens/` — the preset's test roles write `tests/e2e/`,
`tests/integration/<module>/` and `tests/unit/<module>/` (`D-5`), and the greens are still at their present-state
path. **So the fix lands AT THE MOMENT THE BATTERY REACHES A PATH A TEST ROLE MAY WRITE — with the migration —
and not in stage 1.** Both readings are the architect's instruction honoured; the second is the only one the
model's own walls permit, and saying so is preferable to inventing a role.

**THE EXECUTOR QUESTION, ANSWERED AND RECORDED AS A MODEL FINDING.** **The strata preset has no role for a
mechanical refactor of existing, working code.** `role_l4_implementer`'s persona is *"you receive pseudocode,
signatures, guardrail notes and the exact command that must go green"* and *"your write scope is the source files
of your module only"* — which fits a pure move exactly. **`role_l2_integration` and `role_l3_designer` design
SURFACES and SIGNATURES, and a move designs neither: the cut lines, the DAG, the barrel and the six exports are
already declared at L1, and L2/L3 would be re-deriving an existing surface.** **So stage 1 is delegated to L4
directly, on the declared design, with the command it must keep green** — and this deviation is stated rather than
hidden, because the first real test of this workflow on this project is worth recording as such.

---

### FINDING — the archival pass broke the batteries, and the wave's baseline is red because of it

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0's own baseline run, taken before
opening the implementation wave. **Not a ruling: an error of L0's, recorded at the size it actually is.**

**WHAT THE BASELINE SAYS.** `npm test` (the repository's own leg, `node --test bindings/js/test/*.test.mjs`) exits
**`1`** with **21 failing cells** — all in `publish.test.mjs` (`P-PUB-2`, `-3`, `-6` ×2, `-7`, `-8` ×2) and in
`version-stamp-r2.test.mjs` — and **every one is an `ENOENT` on a document this branch moved to the archive**:
`storeroom-publish/{acceptance,parameter-semantics,release,resolution,implementation-plan}.md`,
`storeroom-js/package.md`, `storeroom-native/implementation-plan.md`, and others.

**THE SIZE OF IT.** The batteries read **52** `docs/**` paths. **44 of them were in the archived set.** **42 have
archive copies and are restorable — 4,293,789 bytes.**

**THE MISTAKE, STATED SO IT IS NOT REPEATED.** When the archival's keep-set was proposed, **L0 measured what
`src/`, `bindings/` and `tests/` CITE in code, and did not measure what the `.mjs` batteries READ at runtime.** The
citations were the wrong population. **A battery that opens a document is not citing it — it is using it as an
oracle**, and the difference is the whole of this failure. **And the pass committed a 201-file documentation move
without running the suite, which was the one check that would have caught it.** The exit walkthrough asks for
exactly that check and it was not taken.

**WHY RE-POINTING AT THE ARCHIVE IS NOT AN OPTION.** `archive/` is **gitignored by this project's own rule**
(`.gitignore:172`), which the architect chose to keep. **A battery reading `archive/...` fails on every fresh
checkout and in any CI** — it would replace a documentary dependency with a local-only one. **That route is closed
by a decision already taken, not by preference.**

**WHY THE KEEP-SET WAS MIS-SPECIFIED RATHER THAN THE INSTRUCTION MIS-READ.** The instruction was to keep *"the
project surface behavior"*. **These batteries are blind instances off documentary bytes** — `D-8`'s own ground for
retiring the `LICENSE` limb says so in as many words — **so the documents they read ARE behavior-defining, and
they fall inside the exception rather than outside it.** **Restoring them honours the instruction; the earlier
keep-set was L0's misreading of where "surface behavior" stops.**

**AND THE SECOND BASELINE, NAMED BECAUSE IT IS A DIFFERENT LEG.** The stale blind cell `D-16` fixes
(`blind-constraints-v2.mjs:1139`) lives in **`bindings/js/greens/`**, which `npm test` does not run — it belongs to
**`npm run greens`**, whose baseline **L0 has not taken**. **So this branch has two oracles and only one has been
measured**, and a wave verified against `npm test` alone would leave the greens unmeasured.

---

### `D-17` — tests are for code: the documentary-read assertions are rewritten or retired

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, answering the
restore question with a different disposition entirely.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Rewrite or retire the tests that point at docs. Tests are for code.

**WHAT IT SETTLES.**

- **The archival STANDS.** `D-17` is the opposite disposition to the restore L0 proposed: **the documents stay
  archived, and the cells that read them are the thing that changes.**
- **A battery cell's subject must be CODE.** A cell whose expectation is produced by opening a document is
  **either rewritten to assert a code fact, or retired.** **Which of the two, per cell, is the test layer's
  declaration** — L0 does not choose between rewrite and retire, and a cell is not retired merely because
  rewriting is harder.
- **It also retires a stated ground, and that is recorded rather than glossed.** `D-8`'s disposal of
  `JSG-12.18`'s `LICENSE` limb reasoned that *"a greens cell is a blind instance off documentary bytes and cannot
  carry an install observation."* **Under `D-17` the premise still holds for the retirement — a greens cell
  cannot carry an install observation — but its REASON changes: a greens cell asserts code, not that the
  documentary bytes it used to read are archived.** The disposal stands; the sentence that justified it is read
  through `D-17`.

**THE SCOPE, MEASURED, SO NOBODY GUESSES AT IT.** **12 direct open-sites across four files** — `publish.test.mjs`
(6), `version-stamp-r2.test.mjs` (3), `file-tier-save.test.mjs` (2), `greens/json-acceptance-set-live.mjs` (1) —
**plus three swallowed reads behind a helper** at `json-acceptance-set-live.mjs:175–178`
(`readDoc` with `catch → return ''`). **That helper is the dangerous one and `D-17` must reach it first: it turns
an `ENOENT` into an EMPTY STRING, so its cells assert against nothing and may be reporting FALSE GREENS on this
tree right now.** **A read that cannot fail cannot be trusted to have passed.**
- **The 52 `docs/**` paths the batteries MENTION are not the scope.** A path inside a cell's name or clause
  string is a **citation**, and citations are how this project records provenance; **only a call that OPENS a file
  is a documentary read.** L0's first count conflated the two and would have overstated the work fourfold.

**WHAT IT DOES NOT SETTLE.** Per cell: rewrite or retire. **And where a rewrite's code fact comes from** — a
declared surface, an observable behaviour, a property — **is the test layer's to declare, with one standing
constraint from `D-18`: the rewrite may not read a document to obtain it.**

---

### `D-18` — L0's standing duty: baseline before any archival move

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on L0's own process
failure.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Add to my duties: baseline before any archival move

**WHAT IT ESTABLISHES.** **A documentation move of any size runs the project's own verification legs FIRST — `npm
test` and `npm run greens` where they apply — and records the pass/fail counts BEFORE it commits.** **The counts go
into the move's own record, so the move can be judged against the tree it changed.** **This duty is L0's, it is
standing, and a brief that omits it is incomplete.**
**WHY IT EXISTS:** this branch's archival moved 201 files and committed, and **the suite was the one check that
would have caught the 21 cells it broke.** The exit walkthrough asks for the check; the check was not taken; the
duty is now written down so that the asking is not the only thing standing between a pass and that failure.

---

### FINDING — the greens leg is RED AND CRASHES on the pre-existing tree, and this is not L0's damage

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0's baseline of the second leg,
`npm run greens`, taken under `D-18`. **A finding, not a ruling — and the most consequential one on this branch.**

**WHAT THE SECOND BASELINE SAYS.** `npm run greens` (`greens.mjs` → `live-drive.mjs` → `file-tier-save/scenarios.mjs`)
exits **`1`** after **40 `FAIL` cells**, and **crashes before reaching its second and third legs** — the process dies
on an **uncaught `{status:'AddressMalformed', …}`** thrown out of `greens.mjs`. **So two of the three runners the
project's own `greens` script names were not executed at all.**

**AND NONE OF IT IS THE ARCHIVAL'S DOING. Verified by cause, not by absence:** the failures are **member-set and
signature** failures with **no `ENOENT` and no documentary read anywhere in the log**, and `greens.mjs` is **not one
of the four files that open a document** (`D-17`'s measured 12 sites).

**THE TWO STALE SUBJECTS, EACH NAMED FROM THE LOG'S OWN OBSERVED LINE.**
1. **`JSG-01.9` expects TWELVE own members and the code carries FOURTEEN.** Its observed list is
   `addConstraint,constraintOff,constraintOn,constraints,delete,listen,read,readLiteral,register,removeConstraint,removeListener,rollback,unlisten,write`.
   **`removeListener` and `removeConstraint` are the `+ 2` the held-listener-identity unit landed on 2026-10-19**
   (`contract.md §2.7` item 9's `12 → 14`), **and the greens were never re-derived.**
2. **`JSG-01.16`/`JSG-01.17` drive the SUPERSEDED `listen(address)` signature.** The code's `listen` takes
   `(handle, addresses)` with the handle spelled by the caller, so the greens' call throws
   `AddressMalformed … listen's first argument is an Array, and a listener's handle is a non-empty string this
   caller spells`. **The same wave that moved the member count moved this signature, and the greens still drive
   the old one.**

**WHY THIS MATTERS MORE THAN ITS OWN SIZE.**

- **`D-4` hands the publish shape to "the e2e/blind scenario testing". Those instruments are currently STALE AND
  RED.** `F4` established that no green reports an installed layer; this establishes that the existing greens do not
  run green at all. **The evidence base `D-4` names does not merely have a gap — it has a failing instrument.**
- **`D-17`'s scope was understated by L0 twice, and both times in the same direction.** First as 52 documentary
  citations (measured down to 12 open-sites), and now again: **`D-17` says a cell's subject must be code, which
  makes every stale greens cell — 40 of them and counting — part of the same rewrite-or-retire work**, not just the
  twelve that read documents. **The greens' staleness and the documentaries are one problem wearing two costumes:
  cells whose expectation no longer comes from the code.**
- **A crashed runner is worse than a failing cell.** `greens.mjs`'s uncaught refusal means `live-drive.mjs` and
  `file-tier-save/scenarios.mjs` never ran, **so a reader of the exit code learns "red" and not "two thirds of this
  leg did not execute".**

**THE BASELINE THIS BRANCH NOW CARRIES, STATED AS ONE LEDGER.**

| leg | result at HEAD | cause |
|---|---|---|
| `npm test` | **21 red cells** | **L0's archival** — 12 documentary open-sites, `D-17` retires or rewrites them |
| `npm run greens` | **40 red cells, then a CRASH** | **pre-existing staleness** — a 12-member expectation against a 14-member surface, and a superseded `listen` signature |
| `npm run typecheck` | **not taken** | owed under `D-18` |
| `cargo test` | **not taken** | owed under `D-18` |

**AND THE CONSEQUENCE FOR THE WAVE, WHICH IS THE POINT OF TAKING A BASELINE.** **The implementation wave cannot be
verified against a green oracle, because there is no green oracle.** Its bar is therefore **"no new red, every red
accounted for"** — and **the first item in it is not the entry cut**: it is **re-deriving the batteries that are
supposed to judge the entry cut** (`D-17`), because using a stale instrument to judge a refactor produces two
findings and no information.

---

### Addendum — the remaining two legs are GREEN, and the baseline ledger is now complete

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, completing the baselines `D-18`
requires. **A measurement, not a ruling.**

| leg | result at HEAD | cause |
|---|---|---|
| `npm test` | **21 red cells** | **L0's archival** — the 12 documentary open-sites `D-17` retires or rewrites |
| `npm run greens` | **40 red cells, then a CRASH** | **pre-existing staleness** — a 12-member expectation against a 14-member surface, and a superseded `listen` signature |
| `npm run typecheck` | **GREEN** (exit `0`) | — |
| `cargo test --offline` | **GREEN** (exit `0`) | — |

**WHAT THIS LEDGER BUYS, AND IT IS NOT SYMMETRICAL.** **The Rust side and the type declarations are green; the
JavaScript battery carries L0's 21 and the greens carry 40 of their own.** **So the damage is confined to two legs
and neither of them is the compiled side** — which is why the entry cut, a JavaScript restructure, **cannot be
verified by the leg it most needs, and can be verified by the one it needs least.**

**AND ONE CONSEQUENCE FOR `D-17` THAT THE LEDGER MAKES UNAVOIDABLE.** The stale greens cells and the documentary
cells are **one class**: cells whose expectation no longer comes from the code. **`D-17`'s rewrite-or-retire work
is therefore 21 + 40 and not 12**, and the greens' crash means **two of that leg's three runners have never been
measured on this tree at all** — so the 40 is a floor, not a total.

---

### `D-19` — the batteries are the test writers' to review, and L0 grants the transitional scope

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the executor
question L0 put to him after the baseline ledger.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Fix crash. Have test writers review existing suites and determine which they can keep, rewrite for new code shape,
> or discard/replace entirely

**WHAT IT SETTLES.**

- **The crash is FIXED, not worked around.** `greens.mjs`'s uncaught `AddressMalformed` — the one that kills the
  run before `live-drive.mjs` and `file-tier-save/scenarios.mjs` execute — is repaired in the same pass as the
  review, so both of the leg's unmeasured runners become measurable.
- **The disposition of every existing cell is a TEST-WRITER determination, in three classes:** **KEEP** (still
  true of the current code), **REWRITE** (true of the code as it now stands), **DISCARD/REPLACE** (its subject is
  gone). **L0 does not class a single cell.**
- **★ AND IT ANSWERS THE EXECUTOR QUESTION L0 LEFT OPEN, ON THE ONLY SIDE THE MODEL PERMITS.** L0 granted no
  exception and the architect has not overridden `D-5` (the preset's scopes are kept): **the work goes to the
  strata test writers**, and **the review is a read-and-determine act they may perform on the present-state paths
  wherever those paths sit.** **An edit is still confined to a scope a role may write** — so **L0 records a
  transitional scope grant for this pass only: `bindings/js/test/` and `bindings/js/greens/` are the paths this
  pass may write, because the batteries have no strata home until the migration and the crash cannot be fixed
  from inside a directory that does not exist yet.** **The grant is L0's, it is time-boxed to this pass, and it is
  recorded here so that no later pass inherits it by silence.**

**WHAT IT DOES NOT SETTLE.** **How many cells land in each class** — that is the determination itself. **And
whether a REWRITE's new expectation comes from a declared surface, an observable behaviour or a property** — the
test writer's declaration, under `D-17`'s one standing constraint: **it may not come from opening a document.**

---

### `D-20` — the battery work is staged: crash and determination first, execution second

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, reading `D-19`'s two verbs.

**WHAT IT ORDERS.** **`D-19` names two acts and L0 stages them:**

1. **THIS PASS:** **the crash fix and the determination** — every existing JS cell classified KEEP / REWRITE /
   DISCARD-REPLACE **with the evidence for its class**, and **the record written where this project already keeps
   such records** (a review document beside the battery, matching `REMEASURE-2026-10-18.md`'s precedent).
2. **THE NEXT PASS:** **execution** — the REWRITE and DISCARD-REPLACE classes performed, and the legs re-run
   against the ledger.

**WHY STAGE RATHER THAN ONE PASS.** **53 JS battery files and at least 61 failing cells is not a review and a
rewrite a single pass can do honestly** — and `D-17`'s own standard says a cell is not retired merely because
rewriting is harder. **A determination the architect can read is worth more than a rewrite nobody classified.**
**And the crash comes first inside the stage, because until it is fixed two thirds of the greens leg cannot be
measured at all, so the determination would be made blind on those two runners.**

---

### FINDING — the batteries are stale in SIX declared ways, and the published declaration is missing a status

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the test-writer review `D-19`
commissioned, **validated by L0 by re-running both legs and by reading the kept contract.**

**THE CRASH IS FIXED. VERIFIED BY L0, NOT TAKEN ON TRUST.** `greens.mjs` died on an **unguarded** superseded call
(`:731`, `i8.listen(['ev'])` — the old one-argument form) that sat outside the file's own `thrown()` helper, and the
same defect killed `live-drive.mjs` at `LIVE-2` and one `scenarios.mjs` scenario. **All three runners now complete**
(L0 measured: `greens.mjs` **48 FAIL** over all 16 scenarios; `live-drive.mjs` **13 FAIL** over 13/13;
`scenarios.mjs` reaches `CLEANUP`). **No `try/catch` was added and no cell was retired by the fix.**

**AND THE CRASH WAS HIDING RED, WHICH IS WHY THE COUNT WENT UP.** 40 FAIL before, 48 after — **because the run used
to die at `JSG-08` and ten scenarios never executed.** **`npm run greens` still exits `1`**: the script chains its
three runners with `&&` and each exits `1` on honest reds, so runner 2 and 3 are reachable only by direct
invocation until the REWRITEs land (`Q5`, and it belongs to the battery/greens module under `D-11`).

**`npm test` RE-MEASURED BY L0: `841` tests, `830` pass, `10` fail, `1` skipped.** **The agent's correction of
L0's own count is accepted:** L0's "21" was `✖`-mark counting, which double-lists failures in the summary; **the true
red set is nine cells plus one whole file**, and **`version-stamp-r2.test.mjs` dies at IMPORT on three
`readFileSync` calls, so its eleven cells never run at all** — a dying file is not eleven red cells and not a green.

**★ `Q4` IS ANSWERED BY THE KEPT CORPUS, AND IT IS A DEFECT RATHER THAN A QUESTION.** `docs/specs/storeroom-native/
contract.md` was **amended 2026-10-23** (`A148` Q3, folded into `U-STOREROOM-JSON-CROSSING`): **the closed set widens
`16 → 17` with `ValueRefusedAtBoundary` at rank `17`, and no rank `1`…`16` moves** — *"the operative set is `17`
members ranked `1`…`17`"*, the spelling moves to `[&'static str; 17]`. **The store implements seventeen
(`src/error.rs`'s `CODES` = 17, measured). But `bindings/js/index.d.ts` declares SIXTEEN — and the greens' census
cells assert sixteen.** **So the published type declaration omits a status the store emits and the contract
declares.** The `(string & {})` escape arm means a consumer is not mis-typed fatally, but **every census claim in
the declaration and in the batteries is false as written**, and this project's own discipline is that the
declaration declares the closed set. **That is a code artifact (`delivery`'s and `js-declaration`'s subject) and not
a battery question, and this branch's brief said "sixteen" too — corrected below.**

**THE SIX MOVED FIGURES BEHIND THE 81 REWRITES, EACH A WAVE THE BATTERY MISSED.** **own members `12 → 14`**;
**the `listen` signature** (`listen(address)` → `listen(handle, addresses)`, with `on`/`off` merged away);
**`ValueNotAdmitted` → `ValueRefusedAtBoundary` and the set `16 → 17`**; **the walk ceiling `65 → 126`**;
**the addon's exports `5 → 13`**; **the kernel's exports `5 → 6`**. **A battery written against a surface that
moved six times and was never re-derived does not verify the code — it verifies a memory of it.**

**THE DETERMINATION, ACCEPTED AS `D-19` REQUIRED.** **KEEP `43` groups (≥`1,244` cells) · REWRITE `25` groups
(≥`101` cells) · DISCARD/REPLACE `6` groups (`12` cells) · unclassified `2` cells.** Record:
`bindings/js/test/REVIEW-2026-10-24.md`. **The two unclassified cells and the four open behaviour questions
(`Q1`–`Q3`, and the undeliverable-register question) are put to the architect.**

**AND ONE FINDING THAT IS WORSE THAN A FALSE GREEN: CELL EVAPORATION.** Behind `json-acceptance-set-live.mjs`'s
`readDoc` helper (`catch → return ''`), **a guard `return`s before one cell ever runs, one records
`AMENDMENT-PENDING` and one records `GAP` — and both scenarios still print `PASS` and exit `0`.** **A runner that
exits zero while its cells never executed is a broken instrument in the one direction a red cannot be.** (`Q7`:
`blind-constraints-v2.mjs` exits `0` with **21** FAIL for the same reason — a reporting runner whose exit code does
not carry its red.)

---

### `R-3` — three of the review's seven questions are answered by the kept corpus; recorded as L0 readings

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, reading
`bindings/js/test/REVIEW-2026-10-24.md §7` against `docs/specs/**`. **READINGS, NOT RULINGS — each awaits the
architect's confirm or correct, and nothing is built on one.**

**`Q1` — THE TWO "UNCLASSIFIABLE" CELLS ARE CLASSIFIABLE, AND THE CODE IS RIGHT.** The review asked whether
`JSG-05.7`/`JSG-10.2` are stale or the code is out of order. **The rank-17 amendment answers it:** the native
contract's `ValueRefusedAtBoundary` row says **"the store never receives those values on the JavaScript route; the
package's walk decides the class BEFORE ANY VERB IS CALLED"** (`docs/specs/storeroom-native/contract.md` §8.1, the
2026-10-23 amendment). **So on a call whose value position is absent, the walk refuses before the carrier positions
are ever converted — which is exactly what the code answers.** **Both the two cells and `index.mjs:1947`–`1957`'s
comment are STALE, and the comment names `ValueNotAdmitted`, a status that has not existed since rank 17 landed.**
**Reading: REWRITE the two cells to `ValueRefusedAtBoundary`; the comment is a finding for whoever owns the
walk.** `Q1` therefore stops blocking the determination — **the two unclassified cells become REWRITE.**

**`Q3` — THE DECLARATION IS LAW AND THE CODE IS THE DEFECT.** The review found three cells red on whether a
`file`-tier write's **verb** or its **terminal arm** performs the save. **`docs/specs/storeroom-js/surface.md §2.11`
clause 2 declares it without ambiguity**: *"ON THE PASSING ARM … THE TERMINAL ARM PERFORMS THE STORE'S
`commit_file` ACT AS ITS OWN STEP, AND THE ACT IS THE FIRST THING THAT ARM DOES, before any body of the delivered
set is invoked."* **Reading: `LIVE-4.8`, `FTS-05.1` and `FTS-05.2` are RIGHT and stay KEEP-AND-RED; the code owes
the fix, and `REMEASURE-2026-10-18.md`'s conflict is a defect that has stood for six days rather than a
question.**

**`Q4` — ALREADY SETTLED AND ALREADY RECORDED (`FINDING`, above).** The set is **`17`**, the store implements
seventeen, and **`index.d.ts` declaring sixteen is the defect.** `Q4` needs no answer; it needs an edit `delivery`
and `js-declaration` owe.

**WHAT REMAINS GENUINELY THE ARCHITECT'S.** **`Q2`** — is a `register` accepted at a handle it will never deliver
to a defect, or is it the caller's spelling to get right? **No clause L0 could find decides it**, the measured
asymmetry is real, and four cells turn on it. **`Q5`** — may the greens leg stay chained with `&&` and be measured
runner by runner, or must the manifest change? **`D-11` gives the leg to the battery/greens module, so this is
theirs to declare unless the architect rules otherwise.** **`Q7`** — must a reporting runner's exit code carry its
red, given `blind-constraints-v2.mjs` exits `0` with 21 FAIL? **L0's reading: yes — a runner that exits zero while
its cells never ran is broken in the one direction a red cannot be — but the exit contract is the leg owner's to
declare.** **`Q6` is answered by `D-8` itself**: the three functional prohibitions stand and the reachability
assertion the review declared is consistent with it; **L0 confirms it as already-recorded rather than as a new
ruling.**

---

### `D-21` — a reporting runner's exit code MUST carry its red

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, taking L0's
recommendation on `Q7` of the battery review.

**WHAT IT SETTLES.** **A greens/live runner that reports a `FAIL` exits NON-ZERO.** A runner whose cells are red, or
whose cells **never ran**, may not exit `0`. **The exit code is part of the instrument**, and a reporting runner
that exits zero while its cells failed is broken in the one direction a red cannot be seen from.
**WHAT IT OBLIGATES, MEASURED:** `blind-constraints-v2.mjs` **exits `0` with `21` `FAIL`**; and
`json-acceptance-set-live.mjs` **exits `0`** while one cell's guard `return`s before it runs and two record
`AMENDMENT-PENDING` and `GAP`. **Both are owed a non-zero exit, and the "cell never ran" case is owed an explicit
third state — neither `PASS` nor `FAIL` may be printed for a cell that did not execute.**
**WHO EXECUTES IT:** the test writers, in `D-20`'s execution pass (`D-19`'s grant). **Not L0, and not by editing a
cell** — a runner's exit contract is the runner's, which is the leg owner's under `D-11`.

---

### `R-4` — what the `register`/`listen` asymmetry actually is (elaboration of `Q2`, for the architect's call)

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, reading the three members at the
code. **A reading, not a ruling; `Q2` remains the architect's.**

**THE THREE PARTS, AND WHAT EACH OWNS.**
1. **`listen(handle, addresses)`** — the store-facing half. **The CALLER spells the handle**, the address position
   is a **set**, and the store's home entry is keyed by that spelling. It answers `undefined`.
2. **`register(handle, listener)`** — the package's own registry, a **handle → listener-function** map. It answers
   `undefined` and **performs no deliverability check**: it accepts any handle it is handed.
3. **`K.register(store, address, id, constraint)`** — the **kernel's** registration. It registers a constraint pair
   and **returns `home`**, the store-side handle **the kernel itself spelled** — `constraint@<JSON address>`, the
   spelling `index.mjs:4916`–`4918` names as *"the identity the two layers can both read"*.

**HOW DELIVERY IS SUPPOSED TO WORK.** A write returns `triggered` — the **handles** whose home entry prefix-matches
the write's address. `deliver` then snapshots `registry.get(handle)` **per distinct identity, at the window's
opening**, and invokes each known function **once**. **An identity the registry holds no function for fires NOTHING,
SILENTLY** (`surface.md §2.4` rule 1) — no warning, no log, no code.

**★ AND THE DOOR THAT LETS THE MEASURED CALL THROUGH IS NAMED IN THE CODE.** `registerOn` refuses a listener at a
handle where a **constraint** stands — *"a listener and a constraint do not share one"* — **but the refusal is
SKIPPED for any handle that starts with `constraint@`** (`index.mjs:4916`–`4924`, the `conflicted = null` arm).
**The exemption exists for exactly one consumer**: the kernel arming **its own noop** at **its own handle** without
tripping the rule, and its comment says so — *"the predicate determined no behaviour of its own"*, the one behaviour
its consumer wanted being that structural comparison. **It was never written for an application caller, and nothing
distinguishes the two.**

**THE TWO READINGS `Q2` PUTS.**
- **(A) THE ASYMMETRY IS DELIBERATE.** The kernel's handle is the **constraint layer's** identity; an application
  listener belongs in the **listener layer** under **its own** handle. `register` accepting it is harmless — the map
  is keyed by handle and delivery needs the handle in `triggered`. **Under (A) the four cells are REWRITE: the app
  arms its own handle (`listen(h, …)` + `register(h, fn)`), which the review measured DOES deliver on the same route.**
- **(B) IT IS A DEFECT.** A `register` that **accepts** a handle it can never deliver to is a silent no-op that looks
  like success — the one shape this project keeps filing against. **Under (B) the four cells are KEEP-and-RED and the
  code owes a refusal** (or a delivery), not a doc note.

**L0'S READING, MARKED AS INFERENCE: (A) FOR THE CELLS, (B) FOR A DEFECT ROW.** The exemption's provenance makes the
*acceptance* deliberate and its *purpose* the kernel's; **an application caller reaching it is an unintended use of
a deliberate door, which makes the four cells REWRITE (they are testing the app's route through the kernel's handle)
and the undeliverable-acceptance a HAZARD worth a defect row** — the narrowest honest repair being to exempt **only
the kernel's own call**, not every kernel-prefixed handle. **That is a code change in `js-registry-delivery`'s
subject, not a battery change, and it is the architect's to order or refuse.**

---

### FINDING — the `constraint@` handle is not a declared design; it is a seam the caller-spelled-handle move created

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, asked by the architect why the
kernel creates that handle at all. **A finding, not a ruling — and it is the root `Q2` was standing on.**

**WHAT THE DECLARED DESIGN SAYS, at `kernel-surface.md` (archived: `archive/pre-strata-docs-2026-10-24/docs/specs/
storeroom-constraints/kernel-surface.md`).**

1. **THE HANDLE IS *ADOPTED*, "NEVER MINTED BY THE KERNEL".** *"A second `register` at an address the store already
   holds returns the SAME handle, because the store's `listen` is idempotent at the address level and returns the
   existing entry's handle."*
2. **ITS ONE DECLARED PURPOSE IS SET MEMBERSHIP, not the kernel's own work:** *"the entry appears in the store's
   `triggered`/`watched` handle set for exactly the operations its address is a PREFIX of … WHATEVER CALLER'S
   OPERATION IT IS."*
3. **AND THE KERNEL NEVER NEEDS IT AGAIN:** *"the kernel **ADOPTS the handle the store returned at `K-1` and never
   consults it again**, so an entry the APP removes through `unlisten` stops appearing in later returned sets
   **while the registry pair keeps being evaluated** — this unit declares NO arm for that state."*
   **L0 verified the evaluation half at the code:** `evaluate` reads `pairsAtAddress(kernel, attempt.address)` — the
   kernel's **own** registry at the attempt's address — and the code's comment cites `attempt-lifecycle.md §2.4`
   item 5 (iv) for it: *"the kernel evaluates the pairs it registered at the attempt's own address … and NOT the
   union of the store's prefix-selected addresses."* **So the handle is not in the kernel's path at all.**

**★ AND THE API IT WAS DECLARED AGAINST NO LONGER EXISTS. `listen` is now `listen(handle, addresses) => void`** —
arity `2`, **the caller spells the handle**, and it **returns `void`** (`index.d.ts:596`). **Adoption is therefore
IMPOSSIBLE: there is no returned handle to adopt.** **So the kernel does the only thing left to it — it spells one —
and `noopHandleFor(address)` is that spelling: `constraint@` + `JSON.stringify(address)`**
(`constraint-kernel.mjs:1001`), armed at `store.listen(home, set)` and `store.register(home, noopListener)`
(`:565`–`566`).

**SO THE ANSWER TO "WHY DOES IT CREATE THE `constraint@` HANDLE" HAS TWO HALVES, AND ONLY THE FIRST IS A DESIGN.**

- **THE NEED THAT IS REAL:** the pair must occupy a **store-side home entry** so it appears in the caller-visible
  `triggered`/`watched` sets, and so the two-layer delivery can be stated over one set. **That need survives any
  signature.**
- **THE MINTING THAT IS NOT:** the *spelling* — a prefix in the same string namespace application handles live in —
  exists **only because `listen` stopped returning a handle.** **It is a seam, not a decision**, and **`Q2`'s
  hazard is downstream of it**: because the kernel's handles and an app's handles share one namespace, the entry's
  *"a listener and a constraint do not share one"* refusal had to be **exempted for the whole `constraint@` prefix**
  to let the kernel arm its noop — **and that blanket exemption is the door an app caller walks through to get an
  accepted-but-never-delivered registration.**

**AND ONE MORE STALE CELL THIS ADDS TO THE DETERMINATION.** `FTS-12.4` (in
`greens/file-tier-save/file-tier-save-greens.md`) asserts **`store.listen(addr) === kernel.register(store, addr, id,
fn)`** — the **adoption** observable, by reference equality. **`listen` returns `void`, so that assertion is not
stale about a figure; it is unsatisfiable by the API.** **It belongs to the REWRITE class with a subject that has
moved, and its clause's own sentence (*"adopted, never minted"*) is a documentary statement the code has
contradicted since the caller-spelled-handle move.**

---

### `D-22` — `listen` returns the handle on success, and the `constraint@` noop prefix is discarded

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, ruling on the root
`FINDING` above.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Listen should return the handle on success, or error message on fail. Discard the noop prefix

**WHAT IT SETTLES.**

- **`listen`'s return shape moves `undefined → Handle` on success**, and **failure stays the ONE thrown form**
  (`{status, message}` — the project has exactly one failure channel and this ruling mints no second one).
- **THE NOOP PREFIX IS DISCARDED.** The kernel's `constraint@<JSON address>` spelling, its `noopHandleFor` and its
  `noopListener` (`constraint-kernel.mjs:970`, `:983`, `:1001`) all go, **and with them the entry's blanket
  exemption for kernel-prefixed handles** (`index.mjs:4916`–`4924`). **`Q2`'s hazard dissolves with its cause: no
  reserved namespace means no door for an application caller to walk through into a silently undeliverable
  registration.**
- **AND THE KERNEL'S HANDLE BECOMES ADOPTED AGAIN, which is what `kernel-surface.md` declared all along** —
  *"adopted, never minted by the kernel"* — **and what `FTS-12.4`'s adoption observable (`store.listen(addr) ===
  kernel.register(...)`) has been unable to assert since `listen` stopped returning anything.** **That cell moves
  from unsatisfiable to assertable.**

**WHAT IT SUPERSEDES, NAMED AT ITS OWN BYTES.** `docs/specs/storeroom-held-listener-identity/contract.md` **§2.2
item `10`**, verbatim: *"`listen(handle, addresses) -> undefined`. **This is a DECLARED CHANGE of the return shape
(`Handle` → `undefined`) and it is FORCED: the caller supplied the handle, so returning it would be a second
spelling of the caller's own datum**"* — **the architect now overrules exactly that ground, so the return is a
success signal that CARRIES the identity rather than an echo to be suppressed.** The clause stands as text and is
read through this ruling; **the four clause sites item `1` declares for the `1 → 2` arity figure are not touched,
and item `7`'s *"no conflict test"* for `listen` is unaffected.**

**WHAT IT DOES NOT SETTLE — TWO, AND THE FIRST IS LOAD-BEARING.**

1. **WHAT HANDLE THE KERNEL PASSES TO `listen` NOW THAT IT MAY NOT MINT A PREFIX.** It must still spell *something*
   to occupy the pair's home entry, and it must still learn the standing identity. **The candidates are L1's to
   declare against the code, not L0's:** the address spelled plainly; the handle the store already answers at that
   address; or the returned value treated as the adoption point whatever the caller supplied.
2. **★ AND THE CLAUSE THE PREFIX WAS QUIETLY PAPERING OVER: §2.2 ITEM `7`'s UNCONDITIONAL PURGE.** *"`listen` does not
   test whether the entry it destroys belongs to another actor, and no clause exempts a kernel-held entry."* **So
   a kernel occupancy at an address destroys whatever entry stood there**, and once the kernel has no reserved
   namespace it is, at the store's own rule, **an ordinary actor with an unconditional purge.** Whether that is
   acceptable — the pair's home entry replacing an app listener's — **is the design question the prefix hid, and
   discarding the prefix surfaces it rather than creating it.**

**THE SURFACE CONSEQUENCES, ALL DECLARED AND NONE OF THEM EXECUTED.** `bindings/js/index.d.ts`'s `listen` gains its
`Handle` return (`js-declaration`); the entry loses its prefix exemption (`js-surface` / `js-registry-delivery`);
the kernel loses its three symbols (`js-constraints`); the `listen → undefined` cells across the batteries move to
REWRITE; and `PUB-DD-9`'s semantics are satisfied additively — a caller that ignores the return is unaffected by
widening `void → Handle`. **No unit is open and no code is moved by this ruling.**

---

### `D-23` — setting a constraint expects a handle NAME, used as the handle and for process/error logging

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the question `D-22`
left open (what handle the kernel passes now that it may not mint a prefix).

**THE ARCHITECT'S WORDS, VERBATIM:**

> Setting a constraint should expect a handle name to be used for handle and process/error logging purposes

**WHAT IT SETTLES.**

- **THE CALLER NAMES THE CONSTRAINT'S HANDLE, exactly as the caller already names a listener's.**
  `cfg.listeners`' elements are `{ address, handle }` records today — **the caller spells those** — and this ruling
  gives constraints the same footing: **the set-a-constraint act expects a handle name, that name IS the store-side
  handle for the pair, and it is what process and error logging identifies the constraint by.**
- **IT ANSWERS `D-22`'S QUESTION `1`, AND IN THE CALLER'S FAVOUR:** the kernel neither mints a spelling nor derives
  one from the address. **There is no kernel-authored identity left to reserve, so the prefix is not merely
  discarded — it has nothing left to name.**
- **IT CARRIES A LOGGING SUBJECT, which is a real surface move and not a courtesy.** A name that appears in process
  and error logging is an **observable**, so it is declared, not incidental.

**WHAT IT DOES NOT SETTLE — FIVE, EACH WITH THE EVIDENCE THAT BEARS ON IT, AND ALL OF THEM L1'S.**

1. **A NEW MEMBER, OR THE EXISTING `id` PROMOTED?** **The evidence points one way but does not decide it for you:**
   **`id` is scoped WITHIN A PAIR** — the pair is `(address, id)`, and two pairs at different addresses may lawfully
   reuse one `id` — **while a HANDLE is INSTANCE-SCOPED.** **A bare `id` therefore cannot lawfully be the handle the
   moment two addresses share one id.** A separate member survives that fact; `id`-as-handle does not.
2. **WHAT THE BATCH ELEMENT BECOMES.** The published declaration's element is **TWO members** —
   `readonly constraints?: readonly { readonly address: Address; readonly id: string }[]` — and its own comment says
   the element type is **"the caller's own shape and not a narrowed record here"**, validated by the store.
   **Note the divergence this sits on: the `D-8` era's record and the use-case record both describe the element as
   `{ address, id, constraint }` with the function as the substance, while this declaration names no function at
   all.** The name member lands on a shape whose functional member is already disputed, and L1 must say what the
   element is before adding to it.
3. **WHETHER THE NAME FLOWS INTO `constraints()`.** That read returns **`{address, id}`** and declares **four
   exclusions** — no function, no opaque identity, no order, no `enabled`. **A name is a fifth candidate and one of
   the four exclusions does not cover it**, so its exclusion or inclusion is a declaration rather than an omission.
4. **WHETHER IT FLOWS INTO `LogEntry`.** The kernel's entry has **EXACTLY SIX members** — `seq` · `kind` · `id` ·
   `message` · `opId` · `state` — **and already carries `id`.** **So the name's logging role must say whether `id`
   is already the name it means, or whether the entry's member set moves.** A member-set move is a declared count;
   an undeclared seventh member is exactly what this project files as a finding.
5. **THE DOMAIN RULE AND THE COLLISION ARM.** A handle is a **non-empty string**; a pair is unique by
   `(address, id)`. **A caller-supplied name is INSTANCE-SCOPED, so a collision across two pairs becomes possible
   for the first time** — and no clause declares what a repeated name answers. **That arm is owed before the name
   ships.**

**AND ONE THING IT MAKES BETTER THAN IT FOUND IT.** With the caller naming the handle, **the kernel's occupancy of
the pair's home entry stops being an anonymous intrusion**: the name it occupies under is the application's own
word for that constraint, so `D-22`'s surfaced question (a kernel occupancy purging an app's entry, §2.2 item 7)
becomes **visible in the caller's own vocabulary** rather than hidden behind a reserved prefix. **It does not
resolve that question; it makes it legible.**

---

### `D-24` — the handle IS the `id`; handles are unique; a duplicate handle is an overwrite

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the two questions
`D-23` left open (a new member or `id` promoted, and the collision arm).

**THE ARCHITECT'S WORDS, VERBATIM:**

> The handle becomes the id - the handle needs to be unique regardless, and setting a duplicate handle is an
> overwrite

**WHAT IT SETTLES, AND IT SETTLES FOUR OF `D-23`'S FIVE.**

1. **NO NEW MEMBER.** The constraint's `id` **is** the handle. `ConstraintPair`'s shape is unchanged, the batch
   element gains no third field from this ruling, and the kernel's spelling problem is gone by identity rather than
   by derivation: **the handle the pair occupies under is the caller's own word for the constraint.**
2. **`constraints()` NEEDS NOTHING NEW.** That read already returns `{ address, id }`, and **the `id` is now the
   handle**, so the four declared exclusions (no function · no identity · no order · no `enabled`) stand exactly as
   written.
3. **`LogEntry` NEEDS NO SEVENTH MEMBER — the sharpest of `D-23`'s questions answers itself.** The kernel's entry
   already carries **`id`**, and `D-23` made the name the logging subject; **with the name and the `id` the same
   datum, the entry's six members already carry it.** **No member-set move is owed and no undeclared seventh
   member exists to file.**
4. **THE COLLISION ARM IS `OVERWRITE`, and it is the rule `addConstraint` already declares** — *"adding an id that
   already exists OVERWRITES: it does not refuse and it throws nothing for the mere fact that the id was held."*
   **So a repeated name is a replacement, uniformly, and not a new refusal to mint.**

**AND THE RULING IS COHERENT WITH THE MODEL ALREADY DECLARED, which is why it needs no new vocabulary:** the pair's
own key is **`(id, address-set)`** — `contract.md §2.6` item 4, *"a pair standing over N addresses occupies N
registry rows and **ONE identity**"*, the keying ruling *"one id, N addresses"* — **so one `id` already names one
pair, one identity and one handle. The handle and the pair's key become the same string, which is the whole of the
ruling.**

**WHAT IT LEAVES — TWO, AND THE FIRST IS A CONTRADICTION THAT MUST NOW BE RECONCILED RATHER THAN DECIDED.**

- **★ `register`'s CONFLICT TEST LOSES ITS SUBJECT.** `registerOn` currently REFUSES a listener at a handle where a
  constraint stands — *"a listener and a constraint do not share one"* — and the kernel-prefix exemption existed
  only to get the kernel past it. **`D-24` says the two DO share one: a duplicate handle is an OVERWRITE.** **So the
  refusal and the overwrite rule cannot both hold**, and the refusal is the one the architect's words contradict.
  **L1 declares the reconciliation** (the exemption already died in `D-22`; this may take the refusal with it), and
  L0 does not.
- **`D-22`'s SURFACED QUESTION IS NOW UNIFORM, WHICH IS BETTER THAN IT WAS.** An app listener's handle and a
  constraint's `id` at one address are **one handle**, and the later set overwrites the earlier — **so `§2.2` item
  7's unconditional purge is no longer a kernel-shaped special case; it is the ordinary handle rule applied to one
  namespace.** **The behaviour is still a silent loss for whoever is overwritten, and that remains the architect's
  to accept or refuse — but it is now one rule rather than two.**

**WHAT IT DOES NOT SETTLE.** `D-23`'s remaining question stands untouched: **what the batch element's functional
member is** — the declaration names `{ address, id }` and no function, while the use-case record describes
`{ address, id, constraint }` with the function as the substance. **And whether `id`-as-handle forces a stricter
`id` domain**: an `id` is a non-empty string and so is a handle, so the domains already agree, but a name that is now
an instance-scoped handle is a stronger thing than a pair-local id was, and a pass must say whether any further
rule (length, characters) is owed.

---

### `D-25` — a cross-KIND overwrite is REJECTED; the overwrite rule is same-kind only

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, reconciling the
contradiction `D-24` created.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Attempting to overwrite a listener with a constraint or vice versa is rejected

**WHAT IT SETTLES, AND IT IS THE RECONCILIATION `D-24` OWED.**

- **THE OVERWRITE RULE IS SCOPED BY KIND.** A duplicate handle **of the same kind** is an overwrite (`D-24`). **A
  duplicate handle ACROSS kinds — a listener where a constraint stands, or a constraint where a listener stands — is
  REJECTED.**
- **`register`'s CONFLICT TEST THEREFORE KEEPS ITS SUBJECT, and gets a better one.** It is no longer a rule that
  needed a reserved-namespace exemption to be survivable — **it is the cross-kind rule itself**, and **the prefix
  exemption stays dead for an independent reason: under `D-22` the kernel registers nothing, so nothing needs to
  get past the test.**
- **AND THE RULE IS SYMMETRIC, WHICH IS WHERE AN ARM IS OWED.** The built surface tests **only one direction** —
  `register(handle, listener)` refuses when a constraint stands at that handle/address. **The other direction —
  setting a constraint whose `id` equals a live listener's handle at one of the pair's addresses — has no test at
  either population route**, and `D-25`'s *"or vice versa"* requires one. **That arm is owed and it is L1's and L2's
  to declare: which act refuses, at which instant, and with which status.**
- **ONE OBSERVATION ON THE REFUSAL'S FORM, NOT A RULING.** The built conflict refusal is
  `throw withEmptyLog(new TypeError(…))` — **a `TypeError` carrying a `log` member**, which is neither the one plain
  `{status, message}` form the surface declares for every refusal nor a bare `TypeError`. **The surface's own
  comment calls a `TypeError` from a store-reaching verb a finding while exempting the registration site; the
  conflict arm sits between those two readings.** **L1 declares which form the cross-kind rejection takes**; L0 does
  not choose it here.

---

### FINDING — the "batch element" carries `{address, id}` only, and the FUNCTION a caller puts on it is DROPPED

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, asked to clarify what "batch
element" means; the answer required reading both ends.

**WHAT "BATCH ELEMENT" MEANS — THE TWO POPULATION ROUTES, NAMED.** A constraint can be populated at **exactly two**
sites, and the surface declares that neither substitutes for the other:

1. **THE BATCH AT CONSTRUCTION** — `cfg.constraints`, the **fourth declared key** of `StoreConfig`, *"an array of
   `{ address, id }` pairs"*. **One "batch element" is one element of that array.**
2. **THE POST-CREATION ADD ROUTE** — `addConstraint(pair, constraint)`, whose **second argument is the function**.

**AND THE BATCH ELEMENT IS VERIFIED, AT BOTH ENDS, TO CARRY TWO MEMBERS AND NO FUNCTION.**

- **THE DECLARATION:** `readonly constraints?: readonly { readonly address: Address; readonly id: string }[]`.
- **THE JS ENCODER:** `constraintEntry(entry, position)` reads `entry.address` and `entry.id` **and returns
  `{ address, id: entry.id }`** — **nothing else is forwarded, so a `constraint` member a caller attaches to an
  element is DROPPED at the crossing, silently** (`index.mjs`, the element encoder).
- **THE STORE:** the batch's Rust carrier is **`ConstraintEntry::Pair { address, id }`** (`src/args.rs`), with a
  `ConstraintEntry::Invalid(subject)` arm for a malformed element — **two fields, no function.**

**★ SO THE FINDING IS THIS, AND IT CONTRADICTS THE RECORDED SURFACE:** the use-case record states, dated
2026-10-16, that **the element is `{ address, id, constraint }`, that *"the pair is its addressing and THE FUNCTION
IS ITS SUBSTANCE"*, and that *"the list you supply carries the constraint function at each element"*.** **The code
carries no such thing.** A caller who supplies `{ address, id, constraint }` today gets **a pair with no function**
— and the surface's own rule then applies: *"a well-formed element that carried no function IS admitted by the
store's list rule and is NOT a CARRIED pair, which is why the toggles refuse at it."* **The batch can therefore
register an IDENTITY but cannot arm a constraint, and the function arrives only through `addConstraint`.**

**WHAT THIS MEANS FOR THE RULINGS NOW STANDING.** `D-23`/`D-24` make the `id` the handle; **the batch is therefore
the route that names a handle under which nothing is armed yet** — legitimate, but a state the surface must declare,
because it is exactly the state `D-24`'s overwrite rule will act on when the function later arrives. **Whether the
batch SHOULD carry the function — and so whether this is a code gap or a documentation error — is the architect's
call and L1's to declare; L0 records that the two disagree and that the code is the looser one.**

---

### `D-26` — the batch in `cfg.constraints` MUST supply functions

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the question the
`FINDING` above put to him (is the batch's dropped function a code gap or a documentation error).

**THE ARCHITECT'S WORDS, VERBATIM:**

> The batch in cfg.constraints must supply functions

**WHAT IT SETTLES.**

1. **THE BATCH ELEMENT IS THREE MEMBERS — `{ address, id, constraint }` — AND THE FUNCTION IS REQUIRED.** **This
   confirms the recorded surface over the code:** the use-case record's dated clause said *"the pair is its
   addressing and THE FUNCTION IS ITS SUBSTANCE … the list you supply carries the constraint function at each
   element"*, and **the encoder's silent drop is therefore a DEFECT and not a design.** **`strata/brief.md`'s UC-9
   already reads this way** — **so this is a rare direction: the declaration of record is right and the
   implementation is the thing that moves.**
2. **`bindings/js/index.d.ts`'s element type gains the member** — `constraint: Constraint` — where `Constraint` is
   already declared as `(context: unknown) => unknown`. That is `js-declaration`'s edit.
3. **THE STORE'S CARRIER DOES NOT GAIN IT, AND THAT IS NOT A GAP.** `ConstraintEntry::Pair { address, id }` stays two
   fields in `src/args.rs` **because a JavaScript function cannot cross into Rust at all.** **So the boundary carries
   the PAIR and the package arms the SUBSTANCE**, through the same act the add route performs, at construction.
4. **★ THE "IDENTITY WITHOUT ARMING" STATE DISAPPEARS FROM THE BATCH ROUTE.** The surface's rule *"a well-formed
   element that carried no function … is NOT a CARRIED pair, which is why the toggles refuse at it"* **had the batch
   as its only source of an uncarried pair. Under `D-26` every batch element is carried**, so that rule's subject
   moves to pairs whose function was never supplied — **which the batch can no longer produce.**
5. **AND IT OWES A REFUSAL THE PACKAGE MUST OWN.** A missing, `undefined` or non-function `constraint` member cannot
   be seen by the store, **so the PACKAGE refuses it** — and it may mint no new code, so it must use an existing set
   member (`ConstraintListInvalid` is the natural one, being the list's own validation code at rank `16`), **in the
   one thrown form, at construction, and BEFORE ANY FILESYSTEM ACT** — the order `contract.md §10.4` part `4`
   already fixed for the other construction arguments.

**WHAT IT DOES NOT SETTLE.** **Where in the construction's argument order the function check joins** (it must precede
the create; `D-26` does not place it relative to `journalLength`, `listeners` or the list's own shape walk). **Whether
the boot route arms functions the same way** — the list is supplied at every startup, so it should, and a pass must
say so. **And how it composes with `D-25` at construction**: if the boot's adopted listeners are in place before the
list arms, **a batch `id` colliding with an adopted listener's handle is a cross-kind overwrite and must be
REJECTED** — **which makes the construction's argument order a correctness matter rather than a tidiness one.**

---

### `D-27` — the batch arms its functions, REJECTS duplicate handles regardless of kind, and the check placement is delegated

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the three questions
`D-26` left open.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Functions are armed
> Reject duplicate handles in batch - regardless of listener/constraint type
> Leave function check placement to agent decision

**WHAT EACH SETTLES.**

1. **"FUNCTIONS ARE ARMED."** At construction, **each batch element's `constraint` is registered as the pair's
   substance** — not merely validated and deferred to a later add call. **So the batch is a population route in the
   full sense the surface always claimed:** it delivers a pair that is *carried*, and `D-26`'s "identity without
   arming" state is not merely narrowed but **absent from this route entirely.**
2. **★ "REJECT DUPLICATE HANDLES IN BATCH — REGARDLESS OF LISTENER/CONSTRAINT TYPE."** **The batch's uniqueness rule is
   STRICTER than the add route's, and by design:**
   - **within the batch**, two elements naming one handle → **REJECTED**;
   - **against the construction's adopted listeners**, a batch `id` equal to an adopted `handle` → **REJECTED**,
     cross-kind included — **which is `D-25`'s cross-kind rejection applied at the one instant it can be checked
     wholesale.**
   **★ AND THIS MAKES THE TWO RULES EXPLICIT, BECAUSE A PASS THAT CONFLATES THEM WILL GET BOTH WRONG:**

   | act | a repeated handle |
   |---|---|
   | **the batch, `cfg.constraints`** | **REJECTED** — the list is ONE supplied act, so an internal ambiguity is malformed input and not a second write |
   | **the add route, `addConstraint(pair, constraint)`** | **OVERWRITE** (`D-24`) — acts are separate in time, so a later one replaces the earlier |

   **The distinction is whether the two namings arrive in ONE act or in two, and that is why both rules can be right
   at once.**
3. **"LEAVE FUNCTION CHECK PLACEMENT TO AGENT DECISION."** Where the function check sits in the construction's
   argument order is **delegated to L1/L2** — **with `D-27`'s own two constraints surviving the delegation: the
   check precedes any filesystem act, and it precedes the uniqueness check that must see the adopted listeners.**

**WHAT FOLLOWS FROM THESE THREE, AND IT IS PACKAGE-SIDE WORK.** **Neither the function check nor the uniqueness check
can be performed by the store**: a JavaScript function cannot cross to Rust, and the store cannot see the package's
adopted listener handles. **So both arms are the PACKAGE's**, refusing in the one thrown form with an existing set
member (`ConstraintListInvalid` remains the natural one). **The store's own list validation keeps its subject — shape,
address domain, `id` domain — and gains no arm.**

**AND ONE ORDERING FACT THIS SETTLES THAT `D-26` COULD NOT.** A batch `id` colliding with an adopted listener's handle
must be **rejected**, so **the construction must know its adopted listeners before the list's collision check runs**
— **the correctness question `D-26` raised is thereby answered, and it is answered by requiring the information
rather than by fixing a sequence.** **L1/L2 may still choose where the check sits; the information dependency is not
theirs to move.**

**WHAT IT DOES NOT SETTLE.** **The refusal's code, its form and its exact instant** (the agent's, within the two
constraints above). **Whether the boot route's list is held to the same strictness** — it is the same route by the
surface's own word (*"the list is supplied at every startup"*), so it should be, and a pass must say so. **And whether
a duplicate inside the batch is reported per element or per pair** — a receipt shape, not a rule.

---

### `D-28` — the remaining work's order, recorded as L0's sequencing and not as a ruling

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, on the architect's *"Proceed"*.

**THE ORDER, AND WHY IT IS THIS ORDER.**

1. **THE SURFACE'S DECLARATIONS, THEN THE SURFACE'S CODE** (`D-22`…`D-27`). **The seven rulings interlock and one of
   them resolves a contradiction inside the code** (`D-25` against the built conflict refusal), so **they must land
   as one coherent change or the tree is left holding two rules that cannot both be true.** An L1 declaration of the
   refusal arms, codes, forms and the construction order comes first, so the implementer invents nothing.
2. **THE BATTERIES' RE-DERIVATION** (`D-17`, `D-19`, `D-20`), against the **post-ruling** shape. **This reverses L0's
   earlier plan, and on purpose:** re-deriving the 25 REWRITE groups before the rulings land would have written
   cells against a surface that is about to move a second time — the exact rework the review's classification exists
   to prevent.
3. **THE ENTRY AND KERNEL SUBDIVISION** (`D-1`, `D-2`, `D-13`, `D-14`). A pure move, verified by an oracle that is
   finally trustworthy because step 2 made it so.
4. **THE MIGRATION** — the 75 files to their strata homes, with the route re-spellings, the relabel (`D-9`) and the
   installed battery (`D-10`).

**AND THE VERIFICATION BAR FOR EVERY STEP, STATED ONCE.** **`npm run typecheck` and `cargo test --offline` are green
today** and must stay green. **`npm test` and `npm run greens` are red for catalogued reasons** — so their bar is
**"no new red, every red accounted for"**, with every red attributable to `REVIEW-2026-10-24.md`'s classification or
to a ruling that has not landed yet. **A red that is neither is the finding.**

---

### `D-29` — `listen` may overwrite only listeners; the HANDLE becomes the INTERNAL ID; the boot is held to the same strictness

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the four questions
`docs/L1/surface-deltas.md` raised.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Listen cannot overwrite constraint, only other listeners
> Handle becomes the internal ID
> Q3 - no
> Q4 - Yes

**WHAT EACH SETTLES.**

1. **`listen` GAINS EXACTLY ONE CROSS-KIND TEST, AND IT SUPERSEDES A KEPT CLAUSE.**
   `docs/specs/storeroom-held-listener-identity/contract.md` **§2.2 item `7`** declares *"`listen` GAINS NO CONFLICT
   TEST AT ALL"*. **`D-29` narrows that to: `listen` gains no conflict test against ANOTHER LISTENER, and gains one
   against a CONSTRAINT.** **Overwriting a listener with a listener stays lawful — that is `D-24`'s same-kind rule —
   and overwriting a constraint with a listener is now REJECTED.** **The kept clause stands as text and is read
   through this ruling; its sentence is narrowed and not withdrawn.**
2. **★ "HANDLE BECOMES THE INTERNAL ID" — THE PAIR'S IDENTITY KEY IS THE `id`, OUTRIGHT.** This supersedes two
   things at once: the `(id, address-set)` keying (`index.mjs:5237`, `contract.md §2.6` item 4's *"one id, N
   addresses"*) **is now simply "one id, ONE PAIR"**, and **`K-1`'s *"a second `register` at the same `id` begins a
   pair of its own"* is superseded — it does not, because there is only ever one pair per `id`.** **The agent's
   collision (`D-29`'s own question `Q-2`: a later `removeConstraint` deleting the other pair) is thereby not
   refused but made IMPOSSIBLE.**
3. **`Q3` — no: the prefix removal may not ship before the pair-key question is answered. IT IS NOW ANSWERED, so the
   gate `Q3` set is satisfied and the prefix removal ships with the pair-key change as one act.**
4. **`Q4` — yes: the boot route's list is held to `D-27`'s strictness in full** — functions required, handles unique
   within the list and against the adopted listeners, cross-kind rejected.

**THE SIXTH ARM THIS CREATES, AND ITS MEMBER IS DERIVED RATHER THAN CHOSEN.** **`listen`'s cross-kind rejection is a
SIXTH refusal arm** (`B-6`). **Its `StoreStatus` member follows the principle `surface-deltas.md` already declared —
*the member follows the act's subject*: `listen` is a SINGLE REGISTRATION, so it takes the handle domain's member,
`AddressMalformed`, exactly as `B-5` (`register`) does.** **Its instant: after the handle's class test and the set's
domain test, and BEFORE the purge — the act must not destroy what it may not overwrite.** **No state moves.**

**WHAT REMAINS OPEN, AND IT IS ONE MECHANISM QUESTION.** **Is `listen`'s cross-kind test IDENTITY-based (the handle
equals a constraint's `id`), ADDRESS-based (the set names an address a constraint's home entry occupies, so the
purge would reach it), or BOTH?** **The ruling's intent is settled — no cross-kind overwrite — and the address
dimension is NECESSARY, because §2.2 item `7`'s purge is address-reaching; whether the identity dimension is also
tested is L1/L2's to declare against `Home::purge`.** **L0's reading: both, because under `D-29` the handle and the id
are one string and an identity collision names the same entry an address collision does.**

**AND ONE CONSEQUENCE FOR THE DECLARATION'S OWN TEXT.** `surface-deltas.md` was committed with five arms; **it is owed
`B-6`'s row and the pair-key restatement.** **The implementer implements `B-6` from this ruling and reports its exact
shape**; L1 adds the row when it next touches the file.

---

### `D-30` — the attempt registry is INSTANCE-SCOPED: a new store is a new stack

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the `KC-7` defect
L0 confirmed at the code.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Make it instance-scoped - Creating a new store should create a new stack

**WHAT IT SETTLES.** **The live and closed attempt records belong to the STORE INSTANCE, not to the module.** The
defect L0 verified: `KERNELS` is a `WeakMap` keyed by the store (`constraint-kernel.mjs:297`) **while `LIVE` and
`CLOSED` are MODULE-LEVEL `Map`s (`:302`–`:303`)**, and `attemptHeldAt` (`:1387`) iterates `LIVE.values()` with
**no store filter — only an address comparison** — so **a live attempt in one instance refuses a `K-2`, and the
entry's `write`, at that address in a DIFFERENT, FRESH instance.** **That defeats `A137`'s own ruling** (*"it can get
that by creating multiple stores"*: *"the registries and the journals are independent and a constraint on one store
does not refuse a write to the same address on another"*) **and every other registration structure in that file is
already instance-scoped.**

**AND IT IS CONSISTENT WITH THE DECLARED ID RULE RATHER THAN A DEPARTURE FROM IT.** The attempt's `id` is *"unique
within the kernel instance"* — **a per-instance counter and a per-instance map are the same statement.** The
module-level counter over-satisfied uniqueness while the module-level map broke scoping; both move together.

**WHAT IT DOES NOT DO.** **It changes no behaviour other than that scope**: the `KC-7` refusal stands, a second `K-2`
at a held address **within one instance** is still refused, and no arm, message or record member moves.

---

### `D-31` — an UNTESTABLE behaviour's cell is REMOVED

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the second defect
L0 reported (`B-6`'s address dimension is blind on the kernel's own route).

**THE ARCHITECT'S WORDS, VERBATIM:**

> If it's not testable behavior remove the test

**WHAT IT SETTLES.** **When a cell asserts a behaviour that no declared surface can expose, the CELL goes — it is
neither rewritten nor carried as a permanent red.** **The removal is recorded with what it asserted and why nothing
can observe it**, so the absence is legible rather than a gap.

**★ AND THE BOUNDARY IS THE WHOLE OF THE RULING, because this must not become a licence to delete reds.**

| the state | what it is | the disposition |
|---|---|---|
| **UNTESTABLE** | the behaviour cannot be observed through **any declared surface** — no getter, no record member, no thrown form, no return: **there is no lawful instrument** | **REMOVE the cell**, and record what it asserted |
| **OBSERVABLE BUT WRONG** | the behaviour is reachable and the code does it wrong — `LIVE-4.8`/`FTS-05.1`'s `file`-tier save, for instance | **KEEP IT RED** and the code owes the fix (`R-3`'s standing rule, `D-17`'s rewrite-or-retire) |
| **HARD** | observable, but the cell is awkward or expensive to write | **REWRITE it.** Difficulty is not untestability |

**WHAT IT DOES NOT SETTLE.** **Which cells are untestable** — that is the test layer's determination, cell by cell,
with the instrument named and its absence argued. **And `D-31` does not reach a cell whose subject is gone** — that
is `D-17`'s DISCARD class; **`D-31` is for a subject that EXISTS and cannot be SEEN.**

---

### `R-5` — the last red is a CONTRADICTION BETWEEN TWO KEPT CONTRACTS, and `R-3`'s disposition of it is withdrawn

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, gathering facts to brief the
fix the architect ordered with *"Proceed"* — and finding that the fix's direction is not L0's to choose.

**WHAT THE TWO CELLS ASSERT.** `LIVE-4.8` and `FTS-05.1` (and `FTS-05.2` in the same family) assert that **a `file`-tier
`write` does NOT persist**: *"the write VERB performs NO file commit: the write succeeds and the address does NOT
resolve after a fresh boot — the save being §2.11 clause 2's terminal-arm act."* **They drive a BARE write** — no
`K-2`, no `K-3`, no kernel attempt at all — and measured on this tree, **that bare write leaves the image at 13
bytes**, so the cell is red.

**★ AND THE TWO KEPT CONTRACTS SAY OPPOSITE THINGS ABOUT THAT EXACT ACT.**

| contract | its declaration |
|---|---|
| **`docs/specs/storeroom-native/contract.md` `DD-28`** | **"`file`-TIER DURABILITY IS PRODUCED BY A SUCCESSFUL `file`-TIER `write` ONLY"** — *"the `delete` and the `rollback` DO NOT COMMIT THE FILE, and the `file` tier's durability is a WRITE's act alone"* |
| **`docs/specs/storeroom-js/surface.md` §2.11 clause 1** | **"THE LIFT IS FOR THE `file` TIER, THE TERMINAL ARM AND THE PASSING ARM ALONE, AND FOR NOTHING ELSE"** — with clause 2 putting the save on the **terminal arm**, as `commit_file`, before any delivered body |

**THE STORE IMPLEMENTS BOTH ACTS**, which is why nothing in the code looks wrong from either side alone:
`src/store.rs` has a private **`write_file` (`:1300`)** that a file-tier `write` reaches, **and** a public
**`commit_file` (`:1343`)** that the terminal arm calls through the addon's `commitFile` dispatch. **So the bare
write commits under `DD-28`, and the terminal arm also commits via `commit_file` — the cells test the second and
the store implements the first.**

**SO `R-3`'S DISPOSITION IS WITHDRAWN, AND THE WITHDRAWAL IS L0'S OWN ERROR.** `R-3` recorded *"`LIVE-4.8`,
`FTS-05.1` and `FTS-05.2` are RIGHT and stay KEEP-AND-RED; the code owes the fix"* — **and it reached that from
`surface.md` ALONE, without reading `DD-28`, whose subject is the same act.** **A cell cannot be adjudicated against
one of two contracts that disagree**, and the battery's authors wrote theirs from the JS side.

**AND THE EVIDENCE TILTS, WHICH IS WORTH KNOWING EVEN THOUGH THE CHOICE IS THE ARCHITECT'S.**
**`strata/brief.md`'s UC-6 already states the native reading**: *"durability is a property of `file`-tier WRITES
only"* — and the store's own Rust battery is **green** while asserting it.

**THE TWO BRANCHES, PRICED.**

- **(A) THE NATIVE READING GOVERNS — no code change, two cells move.** A bare file-tier write persists; `§2.11`
  clause 1 is read as *"the write verb performs no file I/O **of its own** beyond the store's declared write"*, and
  the terminal arm's `commit_file` is the **kernel path's** save of a whole attempt. **Cost: the three cells are
  REWRITE (`D-17`), and a JS-side clause re-spelling. Nothing in `src/**` moves.**
- **(B) THE JS READING GOVERNS — a Rust change, a `DD-28` amendment, and a consumer-visible semantic.**
  `src/store.rs`'s file-tier `write` must stop reaching `write_file`, **`DD-28` must be amended**, **the Rust
  battery must be re-derived** (`cargo test` is green today asserting the opposite), and **a bare JS file-tier write
  would then never persist** — which contradicts the brief's UC-6 and the consumer guide's whole durability story.
  **Cost: the largest of any single decision on this branch, and it moves a published semantic.**

**L0 has ordered no fix.** The architect said *"Proceed"* to a fix whose target turned out to be two contracts in
conflict, and **a pass that picked one side would be inventing the ruling it was asked to implement.**

---

### `D-32` — a bare `file`-tier write PERSISTS: `DD-28` governs, and `§2.11` clause 1 is read through it

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the contradiction
`R-5` put to him.

**THE ARCHITECT'S WORDS, VERBATIM:**

> a

**WHAT IT SETTLES, AND THE PRECEDENT IT USES.** **(A): the NATIVE contract governs the act a bare `file`-tier write
performs.** **`DD-28`'s sentence is law: *"`file`-TIER DURABILITY IS PRODUCED BY A SUCCESSFUL `file`-TIER `write`
ONLY."*** **So `write(addr, 'file', v)` commits, with no kernel attempt and no terminal arm in the path, and a fresh
`storeCreate` over the same `filePath` resolves the address.**

**WHAT IT SUPERSEDES, AND WHAT IT DOES NOT.** **`docs/specs/storeroom-js/surface.md` §2.11 CLAUSE `1` IS READ THROUGH
THIS RULING**: its *"the verb performs no file I/O on any of its arms"* becomes **"the write verb performs no file
I/O OF ITS OWN beyond the store's declared write"** — **the clause still governs the PACKAGE's layer (it adds no
second write path, no scratch copy and no package-authored image), and it no longer denies the store's own declared
act.** **CLAUSE `2` IS UNTOUCHED AND STILL BINDS**: **the terminal arm performs `commit_file` as its first act on
the passing arm, before any delivered body** — **and that is now the KERNEL path's save of a whole attempt, which is
exactly what it was for.** **Both acts stand; the bare write's and the terminal arm's are different saves of
different scopes, and the same bytes may lawfully be committed by both.**
**AND THE CLAUSE IS NOT EDITED.** The spec corpus is unowned (`D-11`'s narrow rule); **this log is what supersedes
it, exactly as `D-3` superseded `§2.1` item `6` without touching the file.**

**WHAT IT OBLIGATES — THREE CELLS, AND NOTHING ELSE.** `LIVE-4.8`, `FTS-05.1` and `FTS-05.2` asserted the opposite
reading and are now **REWRITE (`D-17`)**, not KEEP-and-red: **`R-3`'s *"the code owes the fix"* is dead, and `R-5`
had already withdrawn it.** **Each cell re-derives to the native reading: the bare write persists, and its boot
resolves.** **NO CODE MOVES — `src/**` is untouched, the store keeps `write_file` and `commit_file`, and the Rust
battery keeps asserting `DD-28` and stays green.**

**AND THE CONSEQUENCE FOR THE BRIEF'S OWN HISTORY, RECORDED BECAUSE IT IS THE LESSON.** **`strata/brief.md`'s UC-6
already said *"durability is a property of `file`-tier WRITES only"*** — **the brief was right the whole time, and the
cells were written from the other contract.** **A contradiction between two kept contracts is not resolvable by the
corpus; it needs the architect, and this one took a direct question to surface.**

---

### FINDING — both subdivision declarations went STALE before they were executed, and the cause is the sequencing L0 chose

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the L4 pass refused to execute the
kernel cut, reporting the declared regions false at HEAD; **L0 verified every claim and the refusal is correct.**

**WHAT THE PASS MEASURED, AND WHAT L0 CONFIRMED.**

| declared (at `D-15`, commit `fe66387`) | at HEAD |
|---|---|
| the file is **2,203** lines | **2,213** |
| **8 blank separators** at `482 · 1154 · 1363 · 1418 · 1776 · 1803 · 2059 · 2090` | **all eight NON-BLANK** — `482` is `if (!inDomainId(id) …`, `1418` is `return false;`, `2059` is `return { present: false …` |
| `export function register` at `486` | **`472`** — so the declared boundary at `481`/`482`/`483` falls **inside `register`** |
| the six export sites at `486 · 1008 · 1158 · 2063 · 2075 · 2111` | **`472 · 1001 · 1155 · 2066 · 2082 · 2121`** |
| `9a` owns `pairKey` · `PAIR_KEYS` · `pairKeyOf` · `pairRowCarrying` | **`D-29` deleted all four** |
| `9a` owns a module-scope `LIVE`/`CLOSED`/`ATTEMPTS` block | **`D-30` moved all three into the per-store record** |

**★ THE CAUSE, STATED PLAINLY BECAUSE IT IS L0'S OWN SEQUENCING.** `D-28` ordered **the surface work first and the
subdivision last** — correct for the oracle, and **wrong for the declaration's shelf life**: **twenty-four commits
touched that file after `D-15` accepted the cut**, so every line region in `docs/L1/kernel-subdivision.md` describes
a file that no longer exists. **A declaration of LINE REGIONS has a shelf life, and it expires with the next commit
that touches the file it measures.** **`docs/L1/entry-subdivision.md` is stale by the same cause and to the same
degree**: `index.mjs` was the file the seven rulings rewrote most heavily.

**AND TWO OF THE STALEHOODS ARE SUBSTANTIVE RATHER THAN NUMERICAL.** The cut's premise for `9a` — *"shared writes to
one home, not edges"* — **no longer describes the file**, because `D-30` moved the attempt state out of module scope.
And **the one carve the declaration added to break a cycle (`9a` taking `attemptHeldAt`) was justified against a
function whose signature and consumers `D-30` then changed.**

**THE CORRECT RESPONSE IS THE ONE `D-13` ITSELF NAMES AS ITS PRECONDITION:** *"its cut must be declared against a
MEASUREMENT of that file, not guessed from its length."* **The declarations are re-issued against HEAD; no code
moves until they are.** **The L4 pass was right to stop, and it is recorded as having been right.**

---

### `D-33` — take the entry's clean seam, and the subdivision executes in two stages

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect: *"Split"*.

**WHAT IT SETTLES.** **Entry part 6 (`the walk`, 1,337 lines) SPLITS at `L2799` into `927 + 410`** — the seam the
re-measurement found clean — **so the entry becomes NINE parts and the subdivision's target set becomes thirteen
paths plus the barrel, not twelve.** **`D-14`'s enumeration is restated accordingly, and the four drives' re-staging
is declared against thirteen.** **Part 5 keeps its size**: its natural seam is a **measured cycle**, so splitting it
would need a code change and not a move.
**The split serves `D-2`'s own ground.** Part 6 was the second-largest at **1,337**; `927 + 410` puts every entry
part under 1,000 **except part 1 at 1,400, which is irreducible by a pure move** (1,310 is `storeCreate` with
fourteen members closing over one local state).

**AND THE EXECUTION IS STAGED, BECAUSE THE MODEL'S OWN WALL SPLITS IT.**

1. **STAGE 1 — THE KERNEL CUT (L4, source only).** Five parts under `src/entry/kernel-*.mjs` plus a re-export barrel
   at the old path. **Independently verifiable and verifiable to GREEN**: the barrel keeps the path every importer
   uses, and `index.mjs` is untouched — **so all four legs must stay green and any red is the pass's own.**
2. **STAGE 2 — THE ENTRY CUT (L4, source only) THEN THE FOUR DRIVES RE-STAGED (test writer).** **These two are
   COUPLED and the tree is transiently RED between them**: once `index.mjs` imports parts, the drives' staged trees —
   which carry `index.mjs` alone — cannot load (`D-14`), and **`role_l4_implementer` may not edit tests.** **So stage
   2's source move lands with four known load failures, and the very next pass repairs them.** **That transient red
   is DECLARED here rather than discovered**, and the two passes must land back to back.

---

### FINDING — the kernel cut is implementable and byte-verified, and ONE PATH-PINNED TEST blocks it

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the second L4 pass, which built the
cut, verified it, and stopped rather than edit a test. **L0 confirmed the tree was restored and the blocker is real.**

**WHAT THE PASS PROVED BEFORE STOPPING.** The five parts were built and **their bodies are byte-identical to
`git show HEAD:…constraint-kernel.mjs`** — only 24 lines differ, each by an added `export ` prefix that the siblings'
imports cannot resolve without. **Line counts land exactly on the declaration: `528 · 642 · 154 · 567 · 322`; the
declaration census `24/11/1/7/9 = 52` holds; the DAG was built with no edge the declaration did not have; and there
are ZERO temporal-dead-zone sites**, because all 52 top-level lines are declarations with no top-level executable
statement and every cross-part use sits inside a function body. **A pure move, demonstrated rather than asserted.**

**AND WITH THE CUT IN PLACE, THREE LEGS STAY GREEN AND ONE DOES NOT: `npm test` falls to 846 pass / 4 fail.**
**The four are `JC-TC-63`, `-64`, `-65`, `-66`, and the cause is a single predicate:**
`bindings/js/test/json-crossing.test.mjs:3941` declares
**`CROSSING_KERNEL_FILE_SUFFIX = '/bindings/js/src/constraint-kernel.mjs'`** and `:4003` classifies a take by
**the file its own stack frame names** — `frame.file.endsWith(CROSSING_KERNEL_FILE_SUFFIX)`. **After the cut, a
kernel frame names `src/entry/kernel-*.mjs`, so takes that were `ROUTED_KERNEL` become `UNATTRIBUTED`, which is a
violation by that cell's own design.** The failures name the parts: `kernel-foundations.mjs:179 inDomainAddress`,
`kernel-foundations.mjs:371 append`, `kernel-attempt.mjs:256 evaluate`, `kernel-attempt.mjs:525 releasePending`.

**★ THE GENERAL LESSON, WHICH IS THE REASON THIS IS A FINDING AND NOT A NUISANCE: A TEST THAT IDENTIFIES A MODULE BY
ITS FILE PATH IS A COUPLING ON THAT FILE'S PARTITION.** **It is invisible while the file is whole**, which is why
nothing in the declaration or the map saw it — and **it is the class of coupling a subdivision is most likely to
meet, because a partition is exactly what a path identity cannot survive.** **The repair is a predicate that
recognises the module's identity by its HOME rather than by one file**: the barrel's own path **or** the parts'
directory pattern, so it is **correct before the cut and after it** — which means it can land FIRST, with the tree
green throughout.

**AND ONE STALE CLAIM THE RE-ISSUED DECLARATION INHERITED, RECORDED FOR L1 TO FIX.** `kernel-subdivision.md §4.2`
still says `blind-constraints-v2.mjs:1139` **pins five kernel names and is red**. **At HEAD that cell is at `:1251`
and it is GREEN on six** — the battery's re-derivation moved it. **A declaration that inherits a claim without
re-measuring it is how the last stale declaration happened; this one is small and is named rather than repeated.**

---

### FINDING — a subdivision meets THREE coupling classes, and the declaration named ONE

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the entry cut, measured by L0.
**A finding about what a partition costs, not about a mistake.**

**WHAT LANDED.** `index.mjs` went from **6,350 to 1,409 lines**, with **eight new parts** in `src/entry/` — so the
directory now holds **thirteen files** (8 entry + 5 kernel), exactly `D-33`'s target. **Byte-identity held**: the
reassembled bodies are the same sha256 as `git show HEAD:…index.mjs`, with 73 `export ` prefixes and exactly one
enumerated edit. **`D-33`'s split was taken** as `carrier.mjs` (927, the carrier tree's encoders) and `frame.mjs`
(410, the construction's frame and answers), with the edge `frame → carrier` derived from the seam: above `L2799`
nothing calls anything declared below it.

**★ AND THE RED IS WIDER THAN `D-33` DECLARED, IN A WAY THAT GENERALISES.** `npm test` is **842 · 785 · 56** and
`live-drive` is **95/100**. **The four drives `D-33` named are only one class:**

| class | the coupling | what broke |
|---|---|---|
| **(1) STAGED-TREE COPIES** | a tree that copies `index.mjs` **alone** and drives it there | the four declared drives **and `live-drive.mjs`** — a GREENS runner that copies `index.mjs` + `package.json` alone (`LIVE-8.2/.3/.4/.5/.7`) |
| **(2) PATH-IDENTITY PREDICATES** | a cell that classifies a take by the file its stack frame names | `json-crossing.test.mjs`'s `JC-TC-65`: the classifier was widened to the barrel **and the kernel parts**, and entry-part frames — `state.mjs:386`, `constraints.mjs:95` — are `UNATTRIBUTED` |
| **(3) SOURCE-TEXT COUPLINGS** | a cell that greps **the file's text** | `addon-surface.test.mjs`'s `sas_d6_` and `addon-surface-properties.test.mjs`'s `sas_prop_P_SAS_6_` (both grep `index.mjs` for `commitFile`), and `publish-generators.test.mjs`'s control, which fails **at load** because *"the rung-one success site moved"* — `tried.push(ADDON_PATH)` now lives in `artefact.mjs` |

**SO A PARTITION COSTS THREE KINDS OF REPAIR, AND ONLY THE FIRST IS OBVIOUS.** **Class (2) had already bitten once
(before the kernel cut) and was repaired for the KERNEL's parts — and that repair did not generalise, because it
named a prefix rather than the directory.** **Class (3) is the one nobody predicts: a test that asserts what a file
SAYS couples to where the file IS.** **All three are test-side repairs, and all three are the next pass's.**

**AND THE MOVE NEEDED THREE THINGS THE DECLARATION DID NOT HAVE, EACH REPORTED RATHER THAN ABSORBED.**

1. **TWO CYCLE-FORMING EDGES the DAG lacked**, each closed by a **pure-move carve**: `class-decision → walk` through
   a **constant reference** (`NODE_CEILING`, invisible to a `name(`-shaped scan) and `walk → delivery` through a plain
   call (`isLawfulListenerElement`), so a one-line declaration and a 35-line block moved into `class-decision.mjs`.
2. **THE HUB HANDS ITS CONTEXT IN.** `artefact.mjs` cannot derive `ADDON_PATH`, `require_` or the manifest path from
   its own URL, so the hub passes them: `adoptModuleContext(import.meta.url, require_, ADDON_PATH)`. **One expression
   had to follow** — `packageVersion`'s `import.meta.url` became `entryUrl` — **and the pass reports that its own
   first build carried a silent defect this closed.** That is the shape of a finding worth having.
3. **THE LAZY KERNEL REACH STAYS.** `§4.2`'s retirement is **not a move** — it is a behaviour change — so the hub
   still reaches the kernel lazily, and **the retirement belongs with the drives' re-staging, where the trees that
   needed it stop existing.**

---

### FINDING — the subdivision broke the PACKAGE, and every test is green anyway

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the coupling-repair pass, which
reported the gap; **L0 verified it and it is a shipping blocker.**

**WHAT IS TRUE RIGHT NOW.** `bindings/js/package.json`'s `files` names **four entries** —
`index.mjs` · `README.md` · `index.d.ts` · `src/constraint-kernel.mjs` — and **the hub imports EIGHT parts from
`./src/entry/`** while **the barrel imports five more from `./entry/`.** **So a tarball built from this manifest
carries the hub and the barrel and NONE of the thirteen parts they import: THE PUBLISHED PACKAGE CANNOT LOAD.**
**`ERR_MODULE_NOT_FOUND` at import time, on every platform, for every consumer.**

**AND IT IS THE EXACT SHAPE OF THE PROJECT'S OWN OLDEST SCAR.** **`0.1.0`'s five platform tarballs published GREEN
while each carried `README.md` and `package.json` alone**, their `files` naming a `.node` and a `LICENSE` that were
*"NAMED BUT ABSENT"* — **the reason `publish.yml` grew its pre-publish `test -e` guards.** **The lesson was applied to
the platform artefacts and never to the main package's own import graph**, so this is the same defect one level up.

**WHY EVERY LEG IS GREEN WHILE IT IS BROKEN.** **Every battery drives the CHECKOUT, where all thirteen parts sit on
disk beside the hub** — the parts are simply there, so nothing notices. **The only instrument that would see this is
one that installs what the manifest actually packs**, and **that is `D-10`'s installed battery, which is declared and
not built.** **So the defect is invisible to the whole current apparatus by construction.**

**AND THREE CELLS ARE STILL ENFORCING THE CONSTRAINT THAT WOULD PREVENT THE FIX.** `constraints-publication`'s
`cp_allowlist_…`, `greens.mjs`'s `JSG-12.18` and `publish-generators`' `NG-PUB-I` (`assertAllowlistIsFour`) **all pin
the four-entry allowlist** — **the very constraint `D-3` retired and `D-4` replaced with reachability.** **They were
kept in the re-derivations because their *other* limbs (no `.node`, no `build/Release`, no `LICENSE` row) are
functional rules that stand — and the count limb went with them.**

**AND THE INVARIANT THAT MATTERS HAS NO CELL AT ALL: *every file reachable from the hub and the barrel must be
packed*.** **`D-4` handed the shape to reachability and evidence, and nothing asserts reachability.** **A cell for it
would have caught this on the commit that made it.**

**THE FIX IS TWO SUBJECTS, AND NEITHER IS L0'S.** **`delivery`'s manifest** gains the parts — **as a consequence of
reachability, which is what `D-4` says the shape is** — and **the three count-limb cells re-derive to the reachability
invariant**, with a cell added for the invariant itself. **`D-14`'s declared re-staging is not the fix**: a staged tree
is not a packed one.

---

### FINDING — the allowlist is by reachability now, and FIVE cells pinned the count, not three

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the manifest pass; **L0 verified the
form, the co-tenancy fact and the packed arithmetic.**

**THE FORM CHOSEN, AND ITS REASON IS A MEASUREMENT RATHER THAN A PREFERENCE.** `files` is now
**`index.mjs` · `README.md` · `index.d.ts` · `src/entry/` · `src/constraint-kernel.mjs`** — **a DIRECTORY entry for
the parts' home plus the barrel's EXPLICIT path**, which is **`D-14`'s recorded mechanism** (a glob cannot express a
path one level up) applied to the manifest. **A bare `"src/"` was refused ON EVIDENCE: `bindings/js/src/` is
CO-TENANTED by the Rust crate** — `codec.rs` · `crossing.rs` · `facade.rs` · `lib.rs` sit beside `entry/` and the
barrel — **so `"src/"` would pack four files nothing imports** (22 members / 934,346 B against **18 members /
739,304 B**). **L0 confirmed the co-tenancy at the directory listing.** **A directory entry also cannot drift when a
fourteenth part arrives, which is why the enumerated alternative was refused.**

**AND THE PACKED SET IS CLOSED UNDER IMPORT — PROVEN, NOT ARGUED.** **40 relative specifiers** taken from the hub,
the barrel and all thirteen parts resolve against the packed list, **13 distinct part targets, 0 MISSING**; and **the
18 packed members staged into a scratch tree load**: the hub's namespace is `['storeCreate']`, the barrel answers its
six names, and `storeCreate()` refuses in the **declared absent-addon form** (`FilePathUnreachable`) because the
platform package is not packed. **That last detail is the one that distinguishes "the packed set is closed" from
"the package is complete" — and only an installed battery can tell them apart (`D-10`, still unbuilt).**

**★ AND THE RED IS FIVE CELLS, WHERE `D-3`'s CORRECTION NAMED ONE AND L0 EXPECTED THREE.** `D-3`'s correction said
*"`P-PUB-7`"*; **`publish.test.mjs` holds TWO equalities that pin the four-entry allowlist**, and they are
`P-PUB-7::S-MANIFEST \`build/Release\` leaves \`files\`…` **and** `P-PUB-7::S-MANIFEST the licence notice travels with
all six artefacts`. **So the count was enforced in FIVE places across THREE batteries** — `constraints-publication`'s
`cp_allowlist_…`, `publish-generators`' `NG-PUB-I`, **two** `P-PUB-7` cells, and greens' `JSG-12.18`. **A retired
constraint had five homes, and every earlier count of its homes was short.**

**WHAT REMAINS IS THE INVARIANT ITSELF.** **No cell asserts *"every file reachable from the hub and the barrel is
packed"*** — **the reachability rule `D-4` declared, with no instrument.** **The five count cells re-derive to it, and
the invariant gets its own cell** — which must resolve a **directory row through the packlist rather than by path
equality**, and must allow `package.json`, which npm always packs. **That cell is the one that would have caught this
defect on the commit that made it.**

---

### FINDING — the stratification's RUST half is not executable as declared, and it needs the architect

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** L0, taking the last migration piece.
**This is the one item L0 is pausing on: it is a design decision, not an information gap.**

**WHAT IS TRUE.** The stratification assigns **22 Rust files** to the preset's scopes: the store crate's fifteen to
`tests/integration/store-core/…` and `store-fail-set`/`store-args`, and the binding crate's seven to
`tests/integration/binding-crossing/…` and `tests/unit/binding-crossing/…`.

**AND THE TWO CRATES ARE NOT ONE PACKAGE.** **`bindings/js/Cargo.toml` states it in its own words:** *"It is NOT a
workspace member … the root `Cargo.toml` carries no `[workspace]` and this manifest declares none."* **L0 confirmed
that at both manifests.** **So `bindings/js/` is a STANDALONE Cargo package with a path dependency on the root crate,
and Cargo's integration tests must live INSIDE their package's directory.**

**THE CONSEQUENCE, SPLIT BY CRATE.**
- **THE STORE CRATE`S FIFTEEN ARE MOVABLE** — `tests/integration/store-core/…` is inside the root package, reachable by
  `[[test]] name = … path = …` entries plus the `mod support;` resolution the move disturbs. **Mechanical.**
- **THE BINDING CRATE'S SEVEN ARE NOT.** `tests/integration/binding-crossing/…` at the **repository root** is
  **outside the binding package**, so those files cannot be that package's test targets. **Three routes exist and
  every one of them is a decision rather than a mechanism:**

**(A) THE PRESET BENDS FOR A RUST CRATE — the crate's battery lives at the crate.** `bindings/js/tests/**` stays, and
the preset's scopes cover the batteries a crate can host: the 47 JS files and the store crate's 15. **Cost:** `D-5`
(*"keep the preset's choice"*) is narrowed and must say so. **Cost of the alternative:** none in code, none in Cargo,
and the seven files' green is untouched. **L0's reading — the least invasive and the most honest**, because the preset
was written for a project with one `tests/` tree and this repository has two standalone packages; a scope convention
cannot outrank a language's packaging rule, and saying that plainly is better than a `[[test]]` path that escapes its
own package.**

**(B) A WORKSPACE RESTRUCTURE.** The root gains `[workspace]` and the binding crate becomes a member, so one `tests/`
tree at the root can host both crates' batteries. **Cost:** it **reverses the packaging decision the binding
manifest states in as many words**, it changes the release's build topology (the workflow builds the binding with its
own `--manifest-path`), and it puts a workspace layer under a package that ships a native artefact. **The largest of
the three and the only one that moves a build.**

**(C) CARGO TARGET PATHS THAT ESCAPE THE PACKAGE.**
`[[test]] name = "crossing_copy" path = "../../tests/integration/binding-crossing/crossing_copy.rs"` in
`bindings/js/Cargo.toml`. **Cost:** unverified — Cargo's tolerance for a path outside the package root must be
measured before it is relied on, and even if it works the files would sit **outside the package while remaining its
targets**, which every tool that walks a package directory would then mis-read.

**L0 HAS NOT CHOSEN.** The JS migration is complete and green; **this is the last piece, and the choice between (A),
(B) and (C) is the architect's.**

---

### `D-34` — the separate-crate requirement is LIFTED, and the technical assessment behind that

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect: *"Lift the separate crate
requirement unless a technical reason for keeping it is present."*

**THE ASSESSMENT, MADE BEFORE THE LIFT, BECAUSE THE INSTRUCTION MAKES THE LIFT CONDITIONAL.** **L0 measured what a
workspace would actually collide with, and there is NO BLOCKING TECHNICAL REASON.** The three claims that could have
been technical, each tested:

| the claim | is it technical? |
|---|---|
| *"a root `cargo test` keeps its single-package meaning"* | **NO — a convention.** `-p storeroom-native` restores exactly that meaning inside a workspace. |
| *"the `rlib` half is load-bearing so this crate's own tests link the crossing"* | **NO — and it is not a reason to stay separate at all.** `rlib` and workspace membership are independent; a member may be `["cdylib","rlib"]` and host its own tests. |
| *"the store builds `--offline`, the binding fetches at build time"* | **A CONSEQUENCE, NOT A BLOCKER.** `cargo build --offline --release` at a workspace root builds **every member** — including the binding's `napi`/`napi-build` registry deps — so the `build` script would need `-p storeroom-native` on its offline half. **One flag.** |

**AND TWO FACTS CONFIRMED AT THE MANIFESTS.** The `build` script is
**`cargo build --offline --release && cargo build --release --manifest-path bindings/js/Cargo.toml`** — **the asymmetry
is already in the commands, so scoping is a command property and not a crate property.** And **`bindings/js/Cargo.lock`
exists but is UNTRACKED** (`DD-27`: *"its OWN `Cargo.lock` is NOT committed"*), so a workspace's single committed lock
**changes a declared property and blocks nothing.**

**SO `§3.4` ITEM `2` IS LIFTED** — *"IT IS NOT A WORKSPACE MEMBER"* — **as a requirement.** **The clause survives as
history and is read through this ruling**, exactly as `D-3` superseded `§2.1` item 6 without editing the file; **the
spec corpus is unowned and this log is what supersedes it.** **`§3.4` item `1`'s layout stands** (an independent
crate, its own manifest, `crate-type = ["cdylib","rlib"]`, one path dependency) — **what is lifted is the
NOT-A-MEMBER requirement, not the crate's existence.** And **item `3`'s `rlib` finding is untouched**, because
nothing in this ruling changes how the crate is built.

**WHAT IT UNLOCKS, WHICH IS WHY IT WAS ASKED FOR.** The binding's seven Rust test files could not reach
`tests/integration/binding-crossing/…` while the crate was outside every workspace, because **Cargo requires a
package's integration tests to live inside that package.** **With membership available, a THIRD PACKAGE can host
them** — a tests package at the repository root that depends on both crates and owns `tests/integration/<module>/…`
and `tests/unit/<module>/…` as its own targets. **That is the only shape that puts the Rust batteries at the
preset's scopes without contradicting a language rule, and it is what this ruling makes possible.**

**WHAT IT DOES NOT DECIDE.** **Whether to take that restructure at all** — the architect lifted the requirement; L0
proposes the tests package as the shape that serves `D-5`'s goal, and **the next pass stops rather than accept a red
Rust battery.**

---

### FINDING — there is a SEVENTH leg, it is RED, and L0's verification was incomplete

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the workspace pass refused to land a
red member and measured why; **L0 confirmed it at the command.** **This is L0's own error of coverage.**

**WHAT IS TRUE.** **`cargo test --manifest-path bindings/js/Cargo.toml` exits `101`.** **`surface_verbs.rs` does not
compile (19 errors), `crossing_carriers.rs` does not compile (4), `register_layer.rs` fails one test, and
`crossing_values.rs` fails two** — and **four of the seven are unbuildable because `listen` now takes `(handle,
addresses)`** (`D-22`/`D-29` made the caller spell the handle, so the Rust-facing signature is `&JsHandleArg,
&JsAddressArg`) **while the Rust battery still drives the one-argument form.** `WriteResult.triggered` is
`Vec<JsListenerTrigger>` where `support::js_set_equal` takes `&[JsHandle]`, so the carriers file fails on types as
well as arity.

**AND IT IS A DECLARED CI LEG, NOT A DORMANT DIRECTORY:** `.github/workflows/publish.yml:171` runs
`cargo test --manifest-path bindings/js/Cargo.toml --no-fail-fast`, and line `174` builds it for every target.

**★ SO L0'S "ALL FOUR LEGS GREEN" WAS SIX LEGS, AND THE SEVENTH WAS RED THE WHOLE TIME.** **The root
`cargo test --offline` tests the STORE only — 415 tests — and the binding's battery is a SEPARATE COMMAND that no
pass in this session ran.** **Every report of this branch's health since the surface landed has been true of the six
legs measured and silent about a leg that was failing.** **That is the same defect the whole session has been
finding in others' work — a verification that names what it measured and does not name what it left out — and it is
recorded here at its own size rather than folded into a passing summary.**

**THE CAUSE IS THE SAME ONE THE JS BATTERY HAD.** The seven surface rulings changed the published shape and **the
batteries were re-derived against it — the JS ones.** **The binding crate's Rust battery drives the same surface
through `crossing` and was not re-derived, because it is reached by a command the session never ran.**

**AND IT BLOCKS THE WORKSPACE.** The workspace pass measured the restructure, derived it fully (members, the tests
package, `mod support` resolution per group, `default-members = [".", "tests"]`, the `-p storeroom-native` scoping
that keeps `--offline` honest), **and refused to put a red member inside the root command's path.** **It was right:
the Rust batteries must be re-derived BEFORE they move.**

---

### FINDING — the relocation is measured, sound, and blocked on FOUR decisions, three of them the architect's

**DATE:** 2026-10-24. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the relocation pass, which measured
the shape in a scratch workspace and stopped rather than change a declared property. **L0's tree is clean and green.**

**THE SHAPE IS SOUND AND MEASURED.** A tests-only package with no `src/lib.rs` is lawful; `[workspace] members =
[".", "tests"]` beside a root package is accepted; `#[path = "../support/mod.rs"]` resolves as derived; **`cargo test`
at the workspace root runs both packages.** Baselines before: **store 415** (14 targets), **binding 235** (6 targets).

**★ A — THE TWO NAMED LEGS STOP MEANING WHAT THEY MEAN, AND THAT IS THE REAL COST.** **After the move: root
`cargo test --offline` = 650 (415 + 235), not 415; `cargo test --manifest-path bindings/js/Cargo.toml` = 0, because
the binding's only test targets were the six files that leave; and `-p storeroom-native` = 0, because the battery now
lives in `storeroom-tests`.** **Nothing vanishes — but two commands this project's own verification names would name
nothing.** **`default-members = [".", "tests"]` is exactly WHY the root command covers both, so the design's virtue
is the verification's contradiction.** **The question is the architect's: what are the legs after the move?**
**L0's proposal: the store's leg becomes `cargo test -p storeroom-native` (415, unchanged meaning), the binding's
becomes `cargo test -p storeroom-tests` (235), and the root's plain `cargo test` is declared as the both-of-them
command.** That is a leg-naming decision, not a mechanism.

**★ B — THE `-p` SCOPING TURNS AN EXECUTED CELL RED, AND THE CELL IS PINNING A DECLARED COMMAND.**
`tests/e2e/addon-adoption.test.mjs:1972`–`1977` asserts **`storeHalf === ['cargo build --offline --release']`**
exactly, and `command-sites-and-residue.md §3` declares that half **"THE STORE'S AND UNMOVED — it does not appear in
the site table at all"**. **So adding `-p storeroom-native` breaks a declared command spelling, measured: `npm test`
goes 851 · 1.** **Architect's: amend the pinned command, or keep the spelling and accept that an `--offline` root
build would pull the binding's registry crates.**

**★ C — THE LOCK IS `DD-27`'s PRICED ALTERNATIVE.** The root `Cargo.lock` is **tracked**; under one workspace lock the
next commit **pins the binding's 38 registry crates**, and `DD-27`'s alt cell says *"a committed `Cargo.lock` …
available with a bounded amendment"*, while `bindings/js/.gitignore:6` goes dead. **Untracking breaks `--locked` on a
fresh clone, which `preflight_pkgs` depends on.** **Both branches change a declared property → architect.**

**D — TWO RELEASE PATHS DIE AND THEY ARE OUTSIDE THE PASS'S SCOPE.** `scripts/publish.sh:193`–`194` copies
`bindings/js/target/release/…`, and **a member's target dir is the workspace root**, so the path goes stale and its
`|| true` **silently stages the old `.node`**. `.github/workflows/publish.yml:171` runs the binding command that now
runs **0 tests and exits 0** — **a declared CI leg gone silently vacuous** — and `:188` builds from the same stale
path. **These are the release's, and they are the reason a relocation cannot be called done until they move too.**

---

### FINDING — the blind instrument runs in NO leg, and no examiner role ran in this session

**DATE:** 2026-10-25. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect's question, answered
from the tree. **L0's own coverage finding, and the third of its kind.**

**THREE BLIND/ADVERSARIAL INSTRUMENTS EXIST, AND TWO OF THEM RUN.**

| instrument | in a leg? | state |
|---|---|---|
| `tests/e2e/json-crossing-blinded.test.mjs` | **yes** — `npm test`'s glob | **passing** |
| `tests/e2e/json-crossing-gate4-adversarial.test.mjs` | **yes** — same glob | **passing** |
| **`tests/e2e/blind-constraints-v2.mjs`** | **NO LEG RUNS IT** | **RED: exit 1 · FAIL 25 · NONRUN 17 · NOT-DRIVABLE-BLIND 10** |

**WHY IT IS IN NO LEG, NAMED PRECISELY:** `npm test` globs **`*.test.mjs`** and this file is `.mjs`; `npm run greens`
chains **three named runners** and this is not one of them; `npm run test:e2e` runs **the installed battery alone**.
**So the largest blind instrument in the project is invoked only when somebody remembers to, and it has been red since
the surface rulings landed** — its 25 FAIL and 17 NONRUN measured at HEAD.

**★ AND THE PROCESS GAP IS WORSE THAN THE INSTRUMENT GAP: NO EXAMINER ROLE RAN IN THIS SESSION.** The strata preset
gives **`role_l1_examiner`, `role_l2_examiner` and `role_l3_examiner`** a procedure (`strata/examiner.md`) whose first
duty is *"validate the battery before the code, then diagnose."* **Not one of them was used.** Every validation this
session was either **L0's own shell check** or **a test writer re-deriving a battery the rulings had moved** — and
**the two are not the same act: a writer re-derives against a shape, an examiner asks whether the battery could have
CAUGHT the defect.** **That question was asked by nobody, and this branch found nine defects — several of which a
battery existed for and did not catch.** **A green battery validated by its own author is the weakest evidence this
model has, and it is the evidence most of this session rested on.**

---

### THE EXAMINER'S FINDINGS — the first examiner pass on this branch, and it overturns the reading of "green"

**DATE:** 2026-10-25. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** `role_l1_examiner`, read-only, the model's
own procedure applied for the first time. **Nothing written; its findings are recorded here because they are
perishable and they are the most consequential of the session.**

**1 · THE BLIND INSTRUMENT'S 52 CELLS: `0` REAL DEFECT · `20` STALE · `0` UNTESTABLE · `32` BATTERY FAULT.**
**The 25 FAIL are not the code failing.** **Twenty are stale against four rulings already re-derived in KEPT files and
never in this one** — and **one cause sits behind twelve of them**: `triggered`/`pending` elements are the pair
`{handle, address}`, so `includes(handle)` is *always* false (`register.test.mjs:48–56` spells that out). **The other
32 are the INSTRUMENT breaking**: `E2E-C-2`'s fixture write is itself refused `FileCommitFailed`, so its own setup
cannot be admitted and `2.9` — cited by three other cells — never runs; and **`E2E-C-12`'s `landingOnly` shield wraps
`'not-a-function'` into a function, so `KC-2` never fires — the shield that saved seven scenarios in `D-20` created the
blind spot in the one row that tests the refusal to *be* a function.** **And one cell — `16.5` — is green no drive
earned: `loop.every(kind !== 'constraint')` is vacuous because every loop entry is unresolved.**

**2 · LEG BY LEG, THE DEFECT EACH LEG MISSED — AND TWO GAPS THAT ARE STILL OPEN.**

| leg | the history defect it missed | closed? |
|---|---|---|
| `test` 851 | the partition broke the package, 851 green | **in another leg** (`INSTALL-02`), not this one |
| `greens` 254 | exited `0` with 21 FAIL | by `D-21`'s contract |
| `test:e2e` 15 | a tarball that could not load | **by a cell with a control** |
| **`typecheck`** | `index.d.ts` missing rank 17 | **NOT CLOSED HERE — the fixture names zero status literals**, and the gap is caught in `greens` by a HAND-TRANSCRIBED array, not a derivation from `src/error.rs`'s `CODES` |
| `test:store` 29 | 127/128 admit-then-fail | by a cell |
| **`test:battery` 235** | **the address set replacing instead of extending** | **NO CELL EXISTS** |

**3 · THE BLIND INSTRUMENT BELONGS IN THE `greens` CHAIN — ONE TOKEN — AND `greens` GOES RED WHEN IT DOES.**
**That is the point, not the cost.** Renaming it to `.test.mjs` would drag it onto `node:test` and lose `D-21`'s
four-state report; **a reporting runner outside every leg is a document that fails when read.**

**4 · FOUR DEFECTS NO PASS FOUND, EACH MEASURED BY THE EXAMINER.**
1. **The constraint pass runs at landing on the bare-write route but NOT on `K-2`'s** — `store.write` evaluated the
   pair and then refused the caller's own write; `commit(...)` left the counter unchanged. **An asymmetry claimed
   nowhere.**
2. **The pair carries the REGISTERED address, not the written one** (`{address:['a']}` for a write at `['a','b']`), so
   an ancestor listener is handed its watch address as the trigger.
3. **`E2E-C-2`'s own title names an unreachable behaviour** — a successful rollback marks the entry `compacted`, so the
   second same-address call meets `M-6` and never `C-2`.
4. **`greens`'s status census is hand-written**, so the declaration-shortfall direction is caught only because someone
   widened it by hand.

**5 · ADDED TO `D-10`'S CEILING, WHICH IS THE EXAMINER'S MOST USEFUL LINE.** **`scripts/publish.sh` — 22 KB, the
release's whole assembly — runs in NO leg and NO workflow.** **No leg runs `build`**, so `stage-addon.mjs` guards only
when invoked. **No leg drives concurrency or interleaving** — every battery is synchronous and single-process, **which
is exactly the `D-30` class the defect belonged to.** **A skip is not a green: `skipped 1` is a cell that did not run.**

**L0's SUMMARY, AND IT BELONGS IN THE RECORD RATHER THAN IN A REPORT:** **this branch's "all legs green" was true of
the legs, and the examiner has now shown that two of them cannot catch what they exist for, one instrument with 52
cells runs in no leg, and a third of that instrument is broken in a way that hides its own subject.** **The code is in
good shape. The VERIFICATION is not, and it was never examined until now.**

---

### THE SECOND REVIEW — the instance-owned kernel REGRESSED three things, and my agreement with it was wrong

**DATE:** 2026-10-25. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** `role_l1_examiner`, read-only, against
the tree as it stood after `cdd2467`. **L0's own error, recorded at its size.**

**THE HEADLINE, WHICH IS THE REASON THIS ENTRY COMES FIRST:** **`cdd2467` — deleting `KERNELS` and moving the kernel
record onto the store object — introduced THREE regressions, one of which defeats the `F8-2` class this branch had just
spent two passes closing and another of which lets a caller bypass a constraint.** **The examiner measured all three
against a `/tmp` copy of `HEAD~1` with the `WeakMap` restored.**

1. **A FROZEN, SEALED OR NON-EXTENSIBLE STORE NOW THROWS A RAW HOST `TypeError`.** `Object.freeze(store)` **before**
   the store's first kernel act, then a lawful `write` or `addConstraint` → **`TypeError: Cannot define property
   Symbol(provident-storeroom.kernel), object is not extensible`** — `status` absent, not one of the seventeen, not
   the one form. **Order-dependent**: freeze *after* any kernel act and the same write succeeds. **`WeakMap.set` on a
   non-extensible object cannot fail; `defineProperty` on one always does.** **No clause forbids freezing a store, and
   nothing in the tree freezes one — so no cell tried it, and none does now.**
2. **THE KERNEL RECORD IS NOW REACHABLE *AND MUTABLE* FROM THE STORE.** `Object.getOwnPropertySymbols(store)` yields
   the slot; the record carries `pairs`, `handles`, `live`, `closed`, `store`. **`store[SYM].pairs.clear()` makes an
   armed constraint stop refusing — the value lands — while `constraints()` still reports the pair.** Unreachable
   under the `WeakMap`; new in `cdd2467`. **That is a constraint bypass, not a tidiness regression.**
3. **PROTOTYPE FORGERY: A GETTER AT `Object.prototype[SYM]` SUPPLIES ONE RECORD TO EVERY STORE.** Measured
   `a[SYM] === b[SYM]`, shared `attempts` = 2 after one write each. **`Symbol.for` is a REGISTERED symbol, so the key
   is guessable; and `store[SLOT]` is a plain read that walks the chain.** **This is the `F8-2` class by a third
   vector — and `appendOwn` cannot help, because it is a read, not an append.** **Ownership held for writes only.**

**WHY THE PROPOSAL LOOKED RIGHT AND WASN'T.** **`KERNELS` was not indirection-for-nothing: it was PRIVATE STATE.** A
`WeakMap` is not enumerable, is not inherited, and works on a frozen object. **An own property of a caller-visible
object is none of those three** — and the three regressions are exactly those three properties, lost. **The kernel's
own clause (*"holds no instance handle … carries no module-level store"*) is about not *holding* a store strongly, and
a `WeakMap` key is weak — so the clause was already satisfied.** **L0 read "the instance should own it" as "the
instance should carry it", and those are different claims.**

**RECOMMENDATION, AND L0 DOES NOT ACT ON IT WITHOUT THE ARCHITECT: REVERT `cdd2467`.** The change bought a conceptual
tidy-up and cost a raw host error on a lawful call, a reachable mutable record, and a forged shared kernel. **Restoring
the `WeakMap` restores all three protections and no test changes** — the nine call sites never moved, so the revert is
one file.

**AND FIVE MORE FINDINGS NO EARLIER PASS MADE, EACH MEASURED.**
- **`facade.rs:170`/`:173` is worse than reported**: at the addon the own `status` IS dropped, and at the surface
  `fail()` **re-reads `refusal.status` through the prototype and rebuilds the form** — so the caller gets three own
  keys whose `status` and `message` are **prototype strings**: a status outside the closed set and a caller-authored
  message. No cell installs those accessors.
- **`index.mjs:1261`'s clone claim is falsified** — a spread clone carries no index and no slot, and the file's own
  message contradicts it.
- **`strata/brief.md` still says `index.d.ts` declares sixteen and calls its census claims false** — the declaration
  carries all seventeen. **L0's own file, stale since the surface pass.**
- **Two of the five document corrections left their superseded prints at four other normative sites** (the
  `Object.keys` order at `surface.md:1213` and `json-crossing contract:477`; the sixteen-algebra at four lines of the
  native contract), **and correction 4's own "one other site" census is false.**
- **The kernel slot has NO CELL AT ALL** — its descriptor, its own-symbol census: `enumerable: true` left six census
  files green.

**AND THE CELLS ARE HONEST.** Every new family was mutated in a `/tmp` copy and went red: instance-independence
(module-scope kernel), both prototype cells, status-census, address-extension, and **all six blind instances** by one
targeted mutation each. **The one exception is the family that has no cell: the kernel slot.**

---

### `D-35` — JS is CLIENT SCOPE; the defence is PARAMETER ACCESS and the RUST BOUNDARY

**DATE:** 2026-10-25. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the architect, on the examiner's three
"regressions".

**THE ARCHITECT'S WORDS, VERBATIM:**

> The client will be able to break the JS code if they want to, the node_modules import is still in client scope
> Guard against parameter access and at the Rust boundary

**WHAT IT SETTLES, AND IT RECLASSIFIES FIVE FINDINGS.**

- **THE THREE `cdd2467` "REGRESSIONS" ARE NOT DEFECTS.** A client who **freezes** their own store, who reaches
  `Object.getOwnPropertySymbols(store)` and mutates the record, or who plants a getter on `Object.prototype` for a
  registered symbol, **is breaking their own code inside their own realm** — **the package lives in `node_modules` and
  is entirely client-scope.** **`cdd2467` STANDS; the recommended revert is DECLINED by this ruling.** The examiner's
  findings were true and the classification was L0's error: **client-scope breakage is not a defect of the package.
  **
- **THE DEFENCE MOVES TO TWO PLACES, AND THEY ARE THE ONLY TWO:**
  1. **PARAMETER ACCESS.** What the package **reads off a value the caller supplied** must not be decided by a
     mutable prototype. **The `F8-2` class is this, and it is the right class** — `appendOwn`, the index loops and the
     native `define_properties` all serve it. **`fail()`'s re-read of `refusal.status` through the prototype and
     `facade.rs:170/173`'s dropped own `status` are PARAMETER-ACCESS holes and are therefore still defects** — a
     caller gets a status outside the closed set and a caller-authored message, not because they broke anything but
     because **the package read a supplied object through a chain it should not consult.**
  2. **THE RUST BOUNDARY.** **Nothing crossing into Rust may be trusted.** Every JS-supplied value must be validated
     by the crate's own carriers, whose *"outside-value arms make each refusal reachable"* — **so the boundary is
     designed to validate, and any site that assumes instead is a defect.**

**WHAT IT DOES NOT SETTLE.** **The frozen-store TypeError's FORM** — accepted as client-scope breakage, but a raw host
`TypeError` where a lawful call used to answer is still worth a note, not a fix. **And the boundary audit itself** —
which sites assume rather than validate is a measurement, not a ruling.

---

### FINDING — the declaration pass: the twelve blind instances' named-and-unclosed list, closed or deferred

**DATE:** 2026-10-25. **BRANCH:** `docs/pre-strata-consolidation`. **SOURCE:** the `strata` L1 declaration pass
(`docs/L1/**`, this file, and `docs/specs/**` by `RCA-8(g)` annotate-beside only). **A RECORD AND NOT A RULING:** no
entry below decides anything; the one decision lives at the closing paragraph and is put to the architect.

**ITS LIMIT, STATED FIRST BECAUSE EVERY FIGURE BELOW CARRIES IT.** **This pass's OWN session had NO SHELL**: every
number it prints was read from a file at its own last line with a file-reading tool, and no count of its §1–§4 is a
transcript of a run. **THE LEGS WERE RUN BY DELEGATED READ-ONLY PROBES**, which executed them in this same tree after
every edit, made no edit, no commit and no branch change, and returned their raw output: **`npm test` `1053 · 1051 ·
1 · 1` exit `1` — the one fail being the held disagreement, `tests/e2e/blind-constraints-unit.test.mjs:172`'s
*"`KC-8` !== `KC-4`"`, which STAYS RED**; **store `415` exit `0`**; **battery `235` exit `0`**; **plain `cargo test`
`650` exit `0`** (`415 + 235 = 650` ✓); **`greens` exit `0`** (`AUTHORED 100 · EXECUTED 100 · PASS 100 · FAIL 0`, ten
runners, `APP` `NONE`); **`test:e2e` exit `0`** (`14 PASS · 0 FAIL · 1 LAYER-LIMIT` of fifteen cells, `APP` `NONE`);
**`typecheck` exit `0`**. **AND BOTH JSON FILES PARSED** (`docs/L1/modules.json`, `docs/L1/test-stratification.json` —
`JSON.parse` `OK`, neither edited, 19 modules / 61 endpoints unmoved). **The working tree carries DOCUMENTATION ALONE**
— five modified files and one untracked addition, **no source, no test, no manifest byte**.

**1 · THE ADDON'S EXPORT SET: THIRTEEN, NO `call`; A STALE DECLARATION AND NOT A CODE DIVERGENCE.** `bindings/js/src/
facade.rs` declares **thirteen line-initial `#[napi]` sites** — `4` bare (`storeCreate` · `register` · `version` ·
`errorMessage`) plus `9` per-verb (`read` · `readLiteral` · `write` · `delete` · `rollback` · `listen` · `unlisten` ·
`removeListener` · `commitFile`), `4 + 9 = 13` ✓ — **and no `call`.** The kept row of record already says so:
`docs/specs/storeroom-addon-surface/contract.md`'s `P-SAS-1` (*"exactly the thirteen declared names … and `call` is
absent"*). **So the `5` is TRUE WHEN EACH SITE PRINTED IT and was never re-derived when the addon-surface split
re-cut the boundary.** **The sites: the archived `package.md §1.3` item 4 does not move** (archived, gitignored, no
role writes it; it is read through `P-SAS-1`); **`surface.md`'s 2026-10-16 counter-pass print and `docs/specs/
storeroom-js/contract.md`'s two prints take an annotate-beside clause each** (landed by this pass); **`bindings/js/
src/lib.rs`'s closing comment is a source comment** whose exact replacement is printed at `docs/L1/
open-items-2026-10-25.md §1` and owed to whoever next edits that file — **no behaviour byte moves with it.** **AND ONE
RECORD THAT IS SIMPLY WRONG, NAMED HERE BECAUSE THE BRIEF REPEATED IT: `A150` DID NOT RETIRE `call`.** `A150`
(2026-10-25) is *"Remove the register half, `constraintOff` removes the constraint"*; **the `call` deletion's
authority is the addon-surface split** (`export-set-and-dispatch.md §2`, *"`call` IS DELETED"*). **Two citations in
`tests/integration/binding-crossing/addon_adoption.rs` (`:84`, `:129`–`:131`) mis-attribute it to `A150`** and are
owed a re-point by the test's owner.

**2 · THE FIVE `OWED`s: FOUR ANSWERED, ONE ANSWERED WITH A NAMED RESIDUE.** **(a) The escape arm's runtime
observable — NONE, and none is owed:** the arm is type-level (`index.d.ts:292`–`:310`), the store's `CODES` is
closed at seventeen, the package mints no member, and `surface.md §2.12` item 3 forbids a cell naming a token on the
kernel-produced arm. **(b) The symbol-keyed question — the rule does not reach a symbol-keyed own property as a
declared census** (`Object.getOwnPropertyNames`; `A117` (D6)'s *"invisible to both"* at `surface.md §2.11` clause 9)
**and no symbol slot carries register state**, so `D-35`'s client-scope classification leaves nothing owed; **the
literal reading would make `cdd2467`'s slot a violation and `D-35` refused exactly that, so no cell may assert it.**
**(c) The reload arm's message — the refusal cannot name the deletion**, because a deleted handle and a never-
registered one are ONE row of `§2.1` item 5's table, the entry is removed WHOLE, and nothing retains what the removal
destroys; the message names the position and the class (`A134`; `§2.1` item 6). **(d) `removeConstraint`'s
uncarried-pair form — the constraint methods' `TypeError` with `status` ABSENT and a verbose message**, because
`PAR-HL-16`'s outside cell puts *"a well-formed pair the entry does not carry"* in that row (`surface.md:1063` rule
(ii); `§2.7` item 6; the build agrees at `index.mjs:1155`–`:1163`) — **with one residue DEFERRED: the `TypeError` is
thrown carrying `log` and no clause declares that member set** (owner `role_spec_writer`). **(e) The empty-address
receipt's array identity — a FRESH array on every arm including `[]`**, because `§4.4`'s `DeleteReceipt` declares
*"the store returns a fresh array"* unconditionally and the crossing is a deep copy in both directions.

**3 · THE FOUR DECLARATION-VERSUS-BUILD DISAGREEMENTS: THREE CLOSED BY A DOCUMENT, ONE OPEN AGAINST THE CODE.**
**CLOSED** — `§8.1`'s `16` heading (`17`; the heading's own 2026-10-25 insertion, which also corrected its *"one
other site"* census to five); `surface.md §2.5` item 9's `Object.keys` order (`["status","message","log"]`, the
literal's own source order; item 9's 2026-10-25 clause and the two downstream prints it had left stale); `publish
contract.md §2.1` item 1's three-entry allowlist (five rows, `5 = 3 + 2` ✓). **OPEN** — **the `KC-4`/`KC-8` repair
arm**: `PAR-C-8`'s `observable` cell and `§7.3` (b) `3-bis` (d) declare that a repair returning `{ok: true, op}`
whose `op` is **not the one it landed** has carried no op and fires arm `(d)` with `KC-4`; **the kernel credits it
and the attempt fails `KC-8`** through the per-op rollback meeting `JournalOpUnknown`. **The red cell
`tests/e2e/blind-constraints-unit.test.mjs:172` is the one fail in the leg and MUST STAY RED.** **WHAT A FIX WOULD
REQUIRE, AND WHY IT IS A DESIGN DECISION AND NOT A DECLARATION ONE:** *"not the one it landed"* is a comparison
against **the ops the repair's own invocation landed**, and **no such carrier exists** — `A110` deleted every route by
which the kernel could learn it, so `landedOp` (`bindings/js/src/entry/kernel-foundations.mjs:497`–`:510`) has only
two provable grounds (an identity the attempt already holds; a `seq` above the invoked-for op's). A fix therefore
needs **a per-invocation landed-op record (which re-opens `A110`), or a repair `op` domain that carries the store's
`seq` (a declared shape move), or a narrowed clause (a withdrawn arm)** — **the answer `KC-4` is already declared;
what is undeclared is the instrument that makes it observable.**

**4 · THE TWO STALE RECORDS A REVIEW LEFT.** **`bindings/js/index.mjs:1233`** opens *"**AND IT IS THE ROW A CLONED
STORE OBJECT CARRIES TOO**"* before its own correct half (*"a clone carries NO index and therefore resolves NO
store"*), and `:1261` was corrected last pass while this one was not; **it should read *"AND A CLONED STORE OBJECT
DOES NOT CARRY THE ROW"*** — the exact edit, and the adjacent stale *twelve*-member figures at `:1202` and `:1231`,
are printed at `docs/L1/open-items-2026-10-25.md §4.1`; **this pass has no source scope.** **`strata/brief.md`** is
**outside this pass's write scope**, and **it carries figures the branch has moved past** — re-measured at each
file's own last line: **`index.mjs` 1,409 → 1,417**; the entry parts **`refusal.mjs` 82 → 161 · `artefact.mjs` 355 →
376 · `state.mjs` 600 → 602 · `class-decision.mjs` 1,204 → 1,214 · `carrier.mjs` 960 → 986 · `frame.mjs` 416 → 417 ·
`kernel-foundations.mjs` 529 → 597**; **`codec.rs` 966 → 1,030 · `facade.rs` 1,105 → 1,136**; and **`tests/` 83 files
→ 104**, its `e2e/` row **44 → 65** with the breakdown **23/11/6/1/3 → 42/11/8/1/3**. **Every other figure it prints
was checked and stands** (the `src/` seven, `index.d.ts` 891, the ten unmoved part sizes, `crossing.rs` 1,216, the
barrel 4, thirteen entry files, five `files` rows, `0.5.0`, 14 members, 17 statuses, 126 / 1,000,000, and the three
Rust legs). **The brief is the file every L1 reads, so the correction is owed to its owner rather than absorbed.**

**THE LEDGER.** **§1 CLOSED** (a stale declaration; one mis-citation named for its owner) · **§2 CLOSED** (four
answered, one answered with a residue that has an owner) · **§3 CLOSED/THE ONE OPEN IS THE ARCHITECT'S** (three
documents moved; the code does not) · **§4 CLOSED AS A MEASUREMENT, OWED AS AN EDIT** (`index.mjs`'s comment to its
file's owner; `brief.md` to its own). **THE FULL RECORD — sites, figures, clauses and the two ledger tables — is
`docs/L1/open-items-2026-10-25.md`.**

**PUT TO THE ARCHITECT, IN ONE SENTENCE:** **does the kernel get a DECLARED CARRIER for the ops a repair landed — a
per-invocation landed-op record, or a repair `op` whose domain carries the store's `seq` — or is `PAR-C-8`'s *"not
the one it landed"* arm NARROWED to the identities a caller-side record can prove?**

---

### `D-36` — the client is presumed not to vandalize `Array.prototype`; the crate-minted reads are NOT debts

**DATE:** 2026-10-26. **BRANCH:** `main` (post-merge). **SOURCE:** the architect, closing the last question `D-35` left.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Presume the client isn't going to vandalize Array.prototype

**WHAT IT SETTLES.** **The ~8 sites that read arrays THE CRATE MINTED with prototype methods are not debts and are
not fixed.** `written.triggered.slice()` (`kernel-commit.mjs:144`), `attempt.write.triggered.map/includes`
(`kernel-terminal.mjs:82–83`), `record.pending.slice()` (`delivery.mjs:547`, `kernel-attempt.mjs:390`,
`kernel-registration.mjs:290`) and `record.pending.filter` (`kernel-attempt.mjs:560`) **keep their present form.**
**The premise is the realm's: the client will not delete or redefine `Array.prototype`'s members.**

**AND THE LINE IS NOW EXACT, WHICH IS WHAT THE PASS NEEDED.** **`D-35`'s parameter-access class is closed as
implemented**: a value **the caller supplied** is read by own-property forms, built by `appendOwn`, crossed as
**null-prototype wire nodes**, and refused by the six arms; **a value the package itself minted is read with the realm's
prototype methods**, which is ordinary JavaScript. **The distinction is provenance after all — but only because the
premise makes the chain trustworthy for the package's own data.**

**WHAT IT DOES NOT REOPEN, EACH NAMED SO THE RULING IS NOT READ WIDER THAN IT IS.**
- **The VERDICT-level mutation-independence stands** (`storeroom-json-crossing/contract.md`'s 2026-10-24 amendment,
  items 1–8): **pollution of this or a foreign realm's `Object.prototype`/`Array.prototype` must not change the
  admit/refuse verdict for a lawful value.** That clause is about a **caller's** value and it is unchanged.
- **The `F8-2` write-half work stands** (`appendOwn` at ~70 sites, `napi_define_properties` in the codec, the
  null-prototype wire nodes): it is what makes a **supplied** value safe.
- **The Rust-boundary work stands** (`D-35`'s second half): the carriers validate, the cast now receives
  null-prototype nodes, and `fail()` no longer rebuilds a refusal out of a caller's chain.

**THE ONE RESIDUAL IT ACCEPTS, STATED SO IT IS NOT DISCOVERED.** **A client who deletes or redefines
`Array.prototype.slice` gets a raw host `TypeError` out of a lawful `write`** — measured — **and that is accepted
behaviour rather than a defect**, because the premise is that the realm's builtins are intact. **`written.triggered`
is the most exposed of those sites and the one to name if the premise ever moves.**

**STATE OF THE DEBT LIST: EMPTY.** The five known debts were closed before this ruling (the read-side audit's 16
caller-supplied sites, `removeConstraint`'s declared member set, `errorMessage` measured sound, `E2E-C-2`'s title, and
the one skip explained), and **this ruling closes the sixth question rather than leaving it open.**

---

### `D-37` — `R14` IS DISCHARGED: the per-graph split is the MULTIPLE STORES

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on the downstream handoff's `R14` /
`UK-5` contradiction.

**THE ARCHITECT'S WORDS, VERBATIM:**

> Close the R14 demand, it is addressed by the multiple stores.

**WHAT `R14` ASKED, AND WHY IT IS WITHDRAWN.** The downstream catalogue files *"no per-graph / `secure` split at
all"* as a **question**, against its own binding `UK-5` — *"two registers, one per graph; a generic pass never
observes a `secure` commit and vice versa"*. **The question assumed the package's unit of isolation is the
REGISTER. It is the INSTANCE.**

- **A graph IS a store instance.** `storeCreate` is the one factory; each call builds an instance with **its own**
  constraint registry and **its own** attempt records. **Two graphs = two instances**, and *"a generic pass never
  observes a `secure` commit"* holds **by construction** — there is no shared structure to leak through.
- **And the isolation is STRONGER than a register split.** A split inside one store would be a discipline the
  package would have to enforce internally; separate instances share **nothing** — the per-instance kernel
  (`D-30`), the instance owning it (`D-46`), and a receiver guard that **refuses a foreign `this`** on twelve of
  the fourteen members. **No clause of this package has ever owed a graph, a scope or a `secure` register, and
  none is owed.**
- **So `'secure'` as a tier stays `OutOfDomainTier`, and that is CORRECT** rather than an absence: **`secure` is
  not a tier of this store; it is another store.** The consumer's `secureLoad`/`secureRead`/`secureWrite`/
  `secureListen`/`secureConstrain` are its own verbs over **its** secure instance, and none of them names a
  package verb.

**WHAT THE DOWNSTREAM SIDE MUST DO, AND IT IS NOTHING THE PACKAGE SHIPS.** Two `storeCreate` calls, one per graph;
the right instance passed to each verb (**the receiver guard now enforces this** — a detached call is refused and
moves no state); the `'secure-gated'` refusal at the consumer's own `K-GATE` (**that gate is the consumer's
`F3`/`R-5`, never this package's**); and the `secure*` spellings in the consumer's own vocabulary.

**THE ONE HONEST COST, NAMED BECAUSE IT INTERACTS WITH `R16`/`DEF-J`.** **N graphs now means N store instances, so
the resident set multiplies by the graph count** — and this package **declares no resident bound on any long-lived
structure** (`R16`, still a question, and `DEF-J`'s closed-attempt map has no deletion site). **Isolation by instance
buys the split at the price of one full retention set per graph**, and **that is the number the consumer's `R16`
question should be asked about.**

**TERMS: `R14` WITHDRAWN (`1`), `UK-5` DISCHARGED BY THE INSTANCE (`1`), the package's obligations unchanged (`0`),
the multi-store retention cost named and still undeclared (`1`).**

---

### `D-38` — three downstream demands ACCEPTED: the union is lawful, the reversal is judged, the refusal gets a status

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on the handoff's `DEF-P`, `DEF-W`, `DEF-H`.

**THE RULINGS, VERBATIM:**

> **`DEF-P`:** Accept a one-to-many handler/constraint addressing at package surface
> **`DEF-W`:** Assert the constraints on rollback
> **`DEF-H`:** Expand the returned fail-state list to include the refusal

**`DEF-P` — DECLARATIVE, and the code already agrees.** `index.d.ts` currently says *"the pair-local reuse of
one `id` at two addresses is NO LONGER LAWFUL"* and that the creation act takes *"a single address"* — **while the
runtime accepts the pair and unions its addresses.** **The architect's ruling settles it on the code's side: one id
at N addresses is LAWFUL, at every act.** **The declaration moves; no behaviour changes.** **And the coverage gap this
exposes is mine: `constraint-address-extension.test.mjs` drives the TWO-CALL union, never the single-call
multi-address pair the handoff filed** — **that cell is owed.**

**`DEF-W` — BEHAVIOURAL, and the check belongs at the TERMINAL STATE.** `index.mjs:486` passes the reversal
straight to the addon entry (`Reflect.apply(entryOf().rollback, this, args)`), so no constraint is consulted.
**A reversal must now be judged** — **at the state it leaves, never per unwinding step** (a per-step check is
unsound: an unwinding composition passes through intermediate states no constraint would approve — the handoff's own
`(f)` says this and it is right). **A reversal whose terminal state violates a registered constraint FAILS and says
so**; the declared arm and its status are owed by the same act as `DEF-H` below.

**`DEF-H` — the failure list GROWS.** A constraint refusal crosses today as **`FileCommitFailed`** — the store's own
SAVE code — with the kernel's `KC` token demoted to `log[].state`. **The architect rules the returned fail-state list
EXPANDS to carry the refusal.** **Read narrowly, and this reading is why the entry is written down: ONE status for
the refusal, not one per `KC` token** — the token continues to ride `log[].state` where it already does, and the
status stops lying about which layer failed. **Consequences, all of them real and none of them free:**
- **THE CLOSED SET MOVES `17 → 18`.** `src/error.rs`'s `CODES`, `index.d.ts`'s `StoreStatus`, the store contract's
  rank table and `A148`'s amendment all move together, **and the status-census cell — which derives both sides from
  `CODES` and the union — is the instrument that will catch any half-move.**
- **IT IS A BREAKING CHANGE TO A CLOSED UNION**: an exhaustive consumer's switch gains a member.
- **AND IT PAIRS WITH `DEF-W`**: a refused reversal needs a status too, and it must be a status a save path cannot
  mint, for the same reason.

**VERSION CONSEQUENCE, NAMED SO IT IS NOT DISCOVERED AT TAG TIME.** **`DEF-W` and `DEF-H` change shipped behaviour
and a closed union; `DEF-P` does not.** **The three cannot ship as `1.0.1`.** **The next release is at least `1.1.0`,
and `DEF-H`'s union expansion makes `2.0.0` the honest semver** — the architect decides which, and `D-36`/`D-35`'s
client-scope rulings do not reach it.

**TERMS: accepted (`3`), declarative-only (`1` = `DEF-P`), behavioural (`2` = `DEF-W` + `DEF-H`), owed cells (`2` =
the single-call multi-address pair, the refused-reversal arm), version consequence (`1` = at least `1.1.0`,
`2.0.0` if the union's expansion is read as breaking).**

---

### `D-39` — `DEF-V` is NOT a defect, `R16` is NOT a defect, `DEF-R` owes a deterministic order

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on three of the handoff's rows.

**THE RULINGS, VERBATIM:**

> **`DEF-V`:** refusal is correct, specific error code/message is a 'could have'
> **`DEF-R`:** add deterministic ordering
> **`R-16`:** Not a defect, constraints are lifetime-limited by the store instance

**`DEF-V` — CLOSED, NOT A DEFECT.** `write(h, ['a'], undefined, 1)` refuses, and **the refusal is correct**: a
supplied `undefined` tier is out of domain. **The status naming the address rather than the tier, and the message's
specificity, are a COULD-HAVE** — a refinement a consumer would like, **not a failure of the promise.** **No cell is
owed; no behaviour moves.** *(The handoff's own `(g)` asked that the status "never be an address code"; the architect
has ruled that ask away, and the ruling is the authority.)*

**`R16` — CLOSED, NOT A DEFECT.** **The bound IS declared, by the model rather than by a figure: a constraint's
lifetime is the STORE INSTANCE's lifetime.** A store owns its registry and its attempt records (`D-30`), it owns the
kernel that holds them (`D-46`), and **when the instance is released they go with it — there is nothing else to
declare.** **`DEF-J`'s "no deletion site" is therefore not a leak**: the deletion site is the instance's own
collection. **No bound, cap or eviction arm is owed, and `R16` asks a question the model has already answered.**

**`DEF-R` — ACCEPTED, and it is a BEHAVIOURAL change.** `constraints()` must emit in a **DECLARED, deterministic
order** — registration sequence, which is the order the pairs were registered and the one a consumer can reason
about. **The declaration currently says "no order" among its four exclusions; that exclusion is superseded and the
order becomes part of what the method promises.** **The cell is owed**: five snapshots across a pass, a refusal, a
toggle and a `rollback` must be element-wise equal.

**TERMS: closed as not-a-defect (`2` = `DEF-V`, `R16`), accepted and owed (`1` = `DEF-R`'s ordering + its cell),
behaviour moved (`1`), cells owed (`1`).**

---

### `D-40` — A FAILING REPAIR ROLLS BACK LIKE A CONSTRAINT REJECTION

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on `DEF-M`'s verified arm.

**THE ARCHITECT'S WORDS, VERBATIM:**

> A failing repair triggers a rollback like a constraint rejection

**WHAT IT DECLARES, AND IT SETTLES THE ARM THAT WAS UNDECLARED.** **The failing-repair arm is NOT a new outcome —
it is a ROLLBACK, and the SAME rollback a plain constraint rejection performs.** **And a plain rejection leaves the
PRE-ATTEMPT state**: the measured comparison arm — a repair returning `{ok: false}` — leaves the seeded `5`, and that
is the declared answer. **So a failing repair must leave `5` too.**

**AND THE MEASURED BEHAVIOUR CONTRADICTS IT.** Seed `5`, refused `9`, repair `1`: the repair lands as `op-3`, the
re-run refuses `1`, the write fails — **and `read(['a'])` answers `9`, the REJECTED value**, with the outcome's
message reading *"…met the store's own `RollbackCompacted` at `op-2`"*. **The composition rolled back to `op-2` —
the caller's own write — and left the rejected value standing.** **`DEF-M` is therefore a DEFECT against this
ruling, not an open question**: the rollback must reach the **attempt's floor**, not one op above it.

**WHAT THIS FIXES, IN ONE SENTENCE A READER CAN CARRY:** **a failed attempt leaves the store exactly as it found it,
whether the constraint refused outright or its repair failed on the re-run.**

**AND THE DECLARATION OWES THE SENTENCE.** The arm was undeclared; it is now declared, and the record must say so
where a consumer reads it — the same act as `D-38`'s fail-state expansion.

**TERMS: arm declared (`1` = failing repair ⇒ rollback ⇒ pre-attempt state), defect confirmed (`1` = `DEF-M`, the
composition stops at `op-2`), cells owed (`1` = the DEF-M cell re-derived to the declared outcome), declaration owed
(`1`).**

---

### `D-40`'s IMPLEMENTATION FINDING — the floor law, and TWENTY-TWO cells that encode the arm `D-40` overrules

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the implementer's stop, which refused a wrong write scope and
measured instead of guessing.

**1 · THE SITE IS `kernel-terminal.mjs:178–269` (`composeRollback`), NOT `kernel-attempt.mjs`.** Its only store call is
`:232`, `attempt.store.rollback(op.opId)`. **The brief named the wrong file; the implementer found the right one and
stopped rather than editing blind.** *(L0's error, recorded.)*

**2 · THE FLOOR LAW, WHICH IS THE REAL PRODUCT OF THIS PASS.** **The store's rollback scope is TEMPORALLY FLOORED at
the named op's own `seq` and ALL-OR-NOTHING at the compacted mark** (`src/store.rs:2374–2430`). Call `1` over `op-3`
reverses `op-3` and marks it compacted; call `2` over `op-2` then finds that compacted `op-3` in its candidate set →
`RollbackCompacted`, **undoes nothing**. **So a NEWEST-FIRST PER-OP WALK CAN NEVER REACH THE FLOOR ONCE A REPAIR OP
EXISTS.** **The cure is ONE CALL over the attempt's first op, which sweeps both.**

**3 · AND IT WAS MEASURED, THEN REVERTED.** With that single floor call: **failing arm `read` `9 → 5`** (exactly what
`D-40` requires), the comparison arm `5` unmoved, the passing arm's `op.after.value` still `9` against `read` `1`, and
the outcome's message moving from *"…`RollbackCompacted` at `op-2`"* to *"the repaired value is refused by the second
pair"* with `KC-8 → KC-3`.

**4 · ★ THE COST, AND IT IS A SYSTEMIC FINDING RATHER THAN A SIDE EFFECT.** **That fix reddens EIGHTEEN cells, because
they were RE-DERIVED ON 2026-10-25 TO ASSERT `KC-8`** — the very arm this ruling overrules — and `blind-constraints-
v2.mjs`'s `E2E-C-5` cells `1`, `4`, `6` and `9` assert `KC-8` too, which would redden `npm run greens`. **So TWENTY-TWO
cells across two files encode the outcome the architect has now ruled wrong.** **They are not stale by accident: a
2026-10-25 pass re-derived them to the observed behaviour and recorded that re-derivation as a correction.** **That is
the failure mode of re-deriving from the code instead of from a ruling, and it is the exact thing the blind set exists
to resist — the blind cells were authored from the clause and are the reason `DEF-M` could be filed at all.**

**5 · THE RETURNED-`op` HALF IS A SECOND CAUSE.** `index.mjs:419–427` builds the **store-leg record** and
`constraints.mjs:663–678` returns it, **discarding `runAttempt`'s report** — so the record describes the store leg and
not the attempt. **The fix is the one `DEF-M`'s own (f) already names: the passing arm must RETURN the report it
already builds.** No forgery of the op's `after` is admissible, and the implementer said so.

**WHAT THIS PASS DID NOT DO, AND WHY.** **The fix needs one behavioural change plus a RE-DERIVATION OF TWENTY-TWO
CELLS from the overruled arm to the declared one** — **a test-writer's act, not an implementer's, and not a one-file
edit.** **The tree is byte-identical to `HEAD`; nothing half-done ships.**

---

### `D-41` — THE DOWNSTREAM'S REVIEW OF `1.0.1`: my semver defence was wrong, and the restoration destroys data

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the adjacent consumer's regenerated handoff (47,194 bytes, ten
ranked rows) against the published `1.0.1`. **Two of its findings are mine, and one is a data-integrity defect L0
introduced while closing `DEF-W`.**

**1 · ★ THE VERSION IS THE HEADLINE AND L0 DEFENDED THE PATCH AGAINST ITS OWN RECORDED CONCLUSION.**
`D-38` says, in my words: *"The three cannot ship as `1.0.1`. The next release is at least `1.1.0`, and `DEF-H`'s union
expansion makes `2.0.0` the honest semver."* **When the architect chose `1.0.1`, L0 wrote a justification into the
prep brief — that `StoreStatus`'s open escape arm `(string & {})` makes an added member non-breaking — and that
argument is TRUE OF THE UNION AND OF NOTHING ELSE.** **Four behaviour changes shipped under a patch:** the emitted
vocabulary **17 → 20**; **a stored value moved `9 → 5`**; **a constraint-refused write's status changed**; and
**`rollback` went from total to partial — it now THROWS, where the `1.0.0` declaration promised a record and no
failure.** **The escape arm cannot reach any of the last three: a type-level arm does not cover a behaviour.** **The
consumer's consequence is concrete and correct: pin `<1.0.1` until the four are declared breaking.** **This is a semver
breach, it is on the release that is already published, and the remedy is a version-policy statement plus a release
note that names the four — not a silent patch.**

**2 · ★ THE COMPENSATING RESTORE DESTROYS DATA, WHICH IS WORSE THAN THE DEFECT IT CLOSES.** `restoreReversal` **clears
every tier and rewrites the captured standing at `mem`** — so **a `file`-tier value is destroyed by a REFUSAL that then
tells the consumer every address *"stands again at its pre-reversal state"*.** **And when the terminal value is absent
the restore cannot succeed while the message still claims *"the reversal was UNDONE"* — measured by the consumer at
`200` of `200` across `200` pairs.** **A refusal must not move data, and a message must not claim a restoration that
did not happen.** **This is the worst thing on the branch: `DEF-W`'s cure introduced a data-integrity class, and the
`F8-2`/`D-40` pattern repeats — a fix that closed one arm opened another.**

**3 · THE CONSERVATIVE DIRECTION IS THE PERMISSIVE ONE, AND TWO COMMIT SUBJECTS CLAIMED THE WINDOW CLOSED.**
`D-40`'s conjunction makes a reversal **inside an open commit unjudged**, so **its violating effect stands** — while the
identical call one frame out is refused **and restored**. **Zero judgement invocations inside a listener or constraint
body.** **The declaration says this** (`§2.6` item 1, at rest only); **the commit subjects did not.** **Whether to judge
inside a commit is a RULING, not a fix**: judging there invokes bodies mid-attempt, which is the danger `D-40` exists
to avoid — **so the trade is real and L0 does not choose it.**

**4 · AND THREE SMALLER MINE.** **A body that throws at the judgement refuses with `log: []` and NO UNDO.** **A
fabricated `seq: 1`** in the refused-reversal log entry. **The shipped guide names itself one version behind.**

**5 · THREE WITHDRAWALS ARRIVE FROM THE CONSUMER'S SIDE, AND TWO RECORD L0 SHOULD NOT HAVE FILED.** **`DEF-R` never
reproduced at either version** — five snapshots, a batch construction and a removal/re-add all in registration order,
byte-identically in both — **so it is withdrawn as UNPROVEN, even though `1.0.1` minted a registration sequence
anyway**. **`DEF-T`'s two spellings did not reproduce**; what stands is **four spellings across the fourteen members**,
so the row is re-scoped to the observation. **`DEF-V` drops to a diagnostic wish** by the ruling already given.
**Their own withdrawal — the retention demand — is pinned so no later pass re-files it.**

**6 · `DEF-U` IS DECLARED-ONLY AND THEY SAY SO RATHER THAN DRESSING IT UP:** *"the release record says green, but no
test ships in the tarball, so it can't be measured from the artifact."* **Correct — and it is the same reason the
package's suite cannot be the evidence for a consumer.**

**OWED, AND NOTHING ELSE: the two `STOREROOM-*` rows need re-measurement at `1.0.1`** — both read, both labelled not
re-measured, each naming its own owed measurement.

---

### `D-42` — the semver remedy is a MINOR, and an action inside an open commit RESTARTS the constraint check

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on `D-41`'s two open items.

**THE RULINGS, VERBATIM:**

> **Minor semver**
> **Actions inside of an open commit start the constraint check over again**

**1 · THE SEMVER BREACH IS ANSWERED BY A MINOR.** `1.0.1` shipped four behaviour changes under a patch — the
vocabulary `17 → 20`, a stored value `9 → 5`, a constraint-refused write's status, and **`rollback` going from total to
partial**. **The architect rules the remedy a MINOR: the next release is `1.1.0`**, and **the four are declared
breaking in the record and the release note.** **So `1.0.1` stands as published with a disclosed breach, and `1.1.0`
carries the declaration** — the consumer's *"pin `<1.0.1`"* is answered by naming the version that supersedes it, not by
pretending the patch was one.

**2 · AND THE UNJUDGED WINDOW IS CLOSED BY RESTARTING, NOT BY JUDGING THE STEP.** `D-40`'s gate makes a reversal
**inside an open commit** unjudged, so **its violating effect stands** — the conservative direction being the permissive
one, as the downstream measured. **The architect's answer is neither to judge the step nor to leave it: an action
performed INSIDE an open commit STARTS THE CONSTRAINT CHECK OVER AGAIN.** **The check the action invalidated is re-run
from its beginning against the state the action left** — so **no violating effect can stand unjudged**, and **no body is
invoked mid-unwind either**, because the restart is a fresh pass and not a judgement of a partial composition.

**TERMS: semver answered (`1` = minor, the four declared), the window closed by restart (`1`), the step still unjudged
(`1`, `D-40`'s gate stands), a restart cell and its cost measurement owed (`2`).**

---

### `D-43` — a listener's write is its OWN COMMIT; a delete is journaled and reversible; and the residue is a KNOWN FAIL-STATE with a defined exit

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on `D-42`'s four remaining windows.

**THE RULINGS, VERBATIM:**

> **1.** listener should trigger its own commit, because it's entering at the package surface
> **2.** Known fail-state, file reloads/client regenerates store to return to valid state
> **3.** Delete should be journaled and reversible
> **4.** (a question — answered below, not a ruling)

**1 · A LISTENER'S WRITE TRIGGERS ITS OWN COMMIT, AND THAT IS WHY IT NEEDS NO SPECIAL WINDOW.** **A listener body's write **IS** a write entering at the package surface** — so it gets **its own commit, its own attempt and its own constraint check**, exactly as a caller's write does. **That closes the descendant window by construction**: the ancestor pair is asked **by the listener's own pass**, not by the outer write's, and the restart machinery is not asked to reach upward at all. **The outer commit does not absorb it and the inner one does not hide inside it.**

**2 · THE RESIDUE IS A KNOWN FAIL-STATE WITH A DEFINED EXIT.** Where a window genuinely cannot be judged, **the answer is not a further reach into the machinery — it is a fail-state a consumer can leave: the FILE RELOADS, or the CLIENT REGENERATES THE STORE, and the state is valid again.** **So those windows are DECLARED, with their exit, rather than pursued.** **A known fail-state with a documented recovery is a specification; an unreachable window with no exit is a defect.** **And it is only honest because the file now records the restored state (`bd0fd8c`) — a reload returns to bytes that describe a judged state.**

**3 · A DELETE IS JOURNALED AND REVERSIBLE.** A delete **is a mutation and must be in the journal with an identity a reversal accepts** — the earlier measurement was that **delete op ids are not exposed** (`del` answers `{address, tiers, triggered}`), **so a delete could not be named and therefore could not be reversed.** **It is journaled now, and reversible**, which is what makes the kernel's unwinding able to reach a delete's effect at all.

**TERMS: closed by construction (`1` = the descendant window, via a listener's own commit), declared with its exit (`1` = the known fail-state), built (`1` = the journaled, reversible delete), answered rather than ruled (`1` = the `K-2`/`K-3` question).**

---

### `D-44` — NO CONSTRAINT CHECK WITHOUT AN OPEN COMMIT; an act that causes a check OPENS ONE FIRST

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on `D-43`'s item 4 and the window it left.

**THE RULING, VERBATIM:**

> There should be no state where a constraint is being checked without an open commit. Any action that would cause a
> constraint check should open a commit before beginning

**WHAT IT IS: AN INVARIANT, NOT A PATCH, AND IT EMPTIES THE CLASS RATHER THAN ITS CASES.** Every window left on this
branch's list was a variant of one state — **a check running where no commit was open**:

- **`D-42`'s window 1** (a listener body's write at a descendant): the listener's write is a write **entering at the
  package surface** (`D-43` item 1) and must **open its own commit** — so its check has a window and the ancestor pair
  is asked by the listener's own pass;
- **`D-42`'s window 4** (a pass driven by hand, `open=0`/`live=1`): **that state must not exist.** **A pass opens a
  commit before it begins**, wherever it was driven from, so **the restart's request always has a consumer** and the
  stale-pass hazard — a body reversing mid-pass, leaving every later pair answered against a state the body replaced —
  **cannot arise**;
- **the restart's own contract** (`D-42`): its request is consumed by the write's check path. **If every check has a
  commit, every request has a consumer**, and the consumer stops being a property of one call site.

**SO THE INVARIANT REPLACES THE CASE LIST.** `open commit` becomes the **precondition of the check**, not a
circumstance some call sites happen to satisfy. **And it is enforced where the check runs, not where it is called
from** — **a seam a driver can bypass is not an invariant.**

**TERMS: the invariant (`1` = check ⇒ open commit), the cases it empties (`3` = the descendant window, the direct-pass
window, the restart-consumer dependence), the enforcement point owed (`1` = at the check, with a seam the kernel may
use), and `D-43`'s two implementations unchanged and owed (`2`).**

---

### `D-45` — AN EXTERNAL CALLBACK'S CALL OPENS A NEW COMMIT; the join rule conflated internal nesting with external re-entry

**DATE:** 2026-10-26. **BRANCH:** `main`. **SOURCE:** the architect, on `D-43` item 1.

**THE ARCHITECT, VERBATIM:**

> For 43, how is a listener supposed to be able to reuse the outer verb's commit? The listener is an externally-passed
> function and should be making calls at the package surface. It should be opening a new commit by default of entering
> at the surface

**AND THE QUESTION IS THE ARGUMENT: THERE IS NO LAW THAT MAKES A LISTENER *ABLE* TO REUSE IT.** `state.mjs`'s rule —
*"COMMIT JOINS IT RATHER THAN OPENING A SECOND, which is what keeps the count exact under nesting"* — **was written to
keep a single act's machinery from double-counting itself.** **It conflates two different things:**

1. **INTERNAL NESTING** — the package's own machinery inside its own verb (a check inside a write, a save inside a
   commit). **One act, one commit; joining is right**, and the count stays exact.
2. **EXTERNAL RE-ENTRY** — **a caller's own function that the package invoked** (a listener body, a constraint body)
   **calling a verb.** **That is a DIFFERENT ACT BY A DIFFERENT AUTHOR, entering the package surface from outside**,
   and **it has no claim on the outer verb's commit at all.** **The outer commit is the outer act's; the callback is
   not the outer act's code.**

**SO THE RULE BECOMES:** **a call entering the surface from an externally-supplied function OPENS A NEW COMMIT by
default** — **because that is what "entering at the package surface" MEANS** — **and only the package's own internal
continuation joins.** **The discriminator is AUTHORSHIP, not depth.**

**WHAT IT CLOSES, AND IT IS `D-42`'s DESCENDANT WINDOW AT ITS ROOT.** With the listener's call owning its own commit,
**its check has a window, its pass runs, the ancestor pair is asked by the listener's own attempt**, and **the restart's
request has a consumer that is the listener's own scope.** **Three fixes that had been reaching for the ancestor
become unnecessary**, because the callback was never inside the outer act to begin with.

**TERMS: authorship replaces depth (`1` = the discriminator), the join rule narrowed (`1`), the descendant window
closed at its root (`1`), the external-entry marker and its sites owed (`2` = the marker's implementation, the cells
that prove a callback's commit is its own).**
