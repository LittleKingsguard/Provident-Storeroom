# Release notes — `provident-storeroom` `1.1.0`

**THE ONE THING THIS DOCUMENT IS FOR: `1.1.0` IS A MINOR, AND THIS IS WHERE ITS BREAKING CHANGES ARE
DECLARED.** `1.0.1` was published as a PATCH and it carried behaviour changes a patch may not carry. The
architect ruled the remedy a MINOR — *"the next release is `1.1.0`"* (`strata/decisions.md` · `D-42` item `1`)
— so **`1.0.1` stands as published with a disclosed breach, and `1.1.0` carries the declaration.** This file
is that declaration. **It is not a changelog of everything that happened; it is the list of things that can
break you, each with what it did before and what it does now.**

**WHERE IT BELONGS, AND WHY IT IS AT THE REPOSITORY ROOT.** This note is at the packaging root's PARENT, not
inside `bindings/js/`: the main manifest's `files` allowlist does not name it and must not, so **it ships in NO
tarball.** It addresses a consumer deciding whether to move off `1.0.1`, so it must be readable BEFORE an
install and must cover the six packages at once — the main package and the five platform packages share one
version and one decision.

**THE VERSION THIS RELEASE DECLARES IS `1.1.0` AT ELEVEN SITES, MOVING TOGETHER** — the main manifest's
`version`, its FIVE exact `optionalDependencies` pins, and the FIVE `platforms/*/package.json` versions. **The
artefact is stamped from the manifest by `bindings/js/build.rs`, so `version()` answers `1.1.0`** and that is
the value to assert against, not the crate's own `Cargo.toml` version.

---

## §0 · What to do if you are on `1.0.1`

1. **Re-read your refusal mapper.** Read §2 items `B-1`, `B-2` and `B-5` before you upgrade. **A status you
   branch on has changed meaning and one has changed value.** If your mapper treats `FileCommitFailed` as "a
   constraint refused my write", it is now WRONG: that code is the SAVE's alone.
2. **Wrap `rollback` in your throw path.** It throws now (§2 `B-3`) where a total function was declared.
3. **Stop assuming a refused attempt leaves the refused value.** It leaves the state before the attempt
   (§2 `B-4`).
4. **Add `op` to anything that reads a delete's record** (§2 `B-7`). The record grew a fourth member; a
   delete's reversal is now reachable by that member's id.
5. **Do not carry a handle, an address object or a store instance across the recovery exits in §3.** Those
   exits are the consumer's act, and the package does not perform them.
6. **If you pinned `<1.0.1`** — the answer to `1.0.1`'s breach — **`1.1.0` is the version that supersedes it.**
   Pin `1.1.0`, not `1.0.1`: the four items `B-1`…`B-4` reached `1.0.1`'s bytes UNDECLARED, and you get them
   either way.

**A NOTE ON `B-1`…`B-4` AND THE WORD "AT `1.0.1`".** Those four were already in `1.0.1`'s shipped bytes —
`src/error.rs`'s `CODES` reads `[&str; 20]` at the `v1.0.1` tag, not `17`. **So for each of them this file
gives the reading at `1.0.0` (what moved), the fact that `1.0.1` shipped the move UNDECLARED, and the
reading at `1.1.0` (which is the same behaviour, now declared).** A consumer already on `1.0.1` has absorbed
them; **`B-5` onward are what `1.1.0` changes under them.**

---

## §1 · The shape of the list, and where it exceeded the ruling's count

`D-42` item `1` named **FOUR** breaking changes. **Derived from the tree rather than from the ruling's count,
the list is ELEVEN.** Four were shipped in `1.0.1` (`B-1`…`B-4`); seven more land in `1.1.0` (`B-5`…`B-11`).
**The list exceeded `D-42`'s four at `B-5`**, and every addition below was measured at its own site — the
commits named beside each item are the ones that made the change.

| # | the change | shipped in |
|---|---|---|
| `B-1` | the emitted vocabulary `17 → 20` | `1.0.1` (undeclared) |
| `B-2` | a constraint-refused write's status is no longer `FileCommitFailed` | `1.0.1` (undeclared) |
| `B-3` | `rollback` went from total to partial: **it throws** | `1.0.1` (undeclared) |
| `B-4` | a failing attempt leaves the pre-attempt state (`9 → 5`) | `1.0.1` (undeclared) |
| `B-5` | a refused reversal is RESTORED, and its restore WRITES the file | `1.1.0` |
| `B-6` | a constraint check always runs inside an open commit | `1.1.0` |
| `B-7` | `DeleteRecord` gained `op` — a record's shape grew | `1.1.0` |
| `B-8` | a delete's journal before-state was captured at the wrong home | `1.1.0` |
| `B-9` | an external callback's call opens its OWN commit | `1.1.0` |
| `B-10` | an action inside an open commit RESTARTS the constraint check | `1.1.0` |
| `B-11` | a directly driven pass reports a restart as a REPORT, not a throw | `1.1.0` |

---

## §2 · The breaking changes, one line of "before" and one of "now"

### `B-1` · The emitted status vocabulary grew `17 → 20`

**AT `1.0.0`:** `CODES` was `[&str; 17]` — ranks `1`…`17`, the last being `ValueRefusedAtBoundary`.
**`1.0.1` SHIPPED THREE MEMBERS UNDER A PATCH WITHOUT SAYING SO.**
**AT `1.1.0`:** the set is **`[&str; 20]`**, ranks `1`…`20`, and the three appended members are:

- **rank `18` `ConstraintBodyThrew`** — a constraint BODY threw, where the package's crossing used to answer
  the store's own code for a body that failed;
- **rank `19` `ConstraintRefusedAtRegistration`** — the store refused a pair AT REGISTRATION;
- **rank `20` `ConstraintPassRefused`** — the ONE status a constraint's refusal of a `write` answers, and of
  a `rollback` whose terminal state a pair refuses.

**WHAT BREAKS YOU:** a mapper with a closed `switch` over the seventeen old members now meets three values it
has no arm for, and `errorMessage(code, args)` resolves a clause for each. **NO RANK OF `1`…`17` MOVED**, so
an ordinal you already stored is still that member (`FileCommitFailed` is still rank `15`).
**ONE MEMBER IS NOT A CONSUMER'S TO SEE:** `ConstraintRefusedAtRegistration` is the store's and crosses only
where the store mints it.

### `B-2` · A constraint-refused write's status is `ConstraintPassRefused`, not `FileCommitFailed`

**AT `1.0.0` (and under `1.0.1`'s undeclared change, before it):** a write a constraint refused crossed as
`FileCommitFailed` — **which is the STORE'S SAVE CODE, rank `15`** — so the status named a layer the failure
did not happen at.
**AT `1.1.0`:** the refusal crosses as **`ConstraintPassRefused`, rank `20`**, the pass's own member.
**`FileCommitFailed` STAYS the save's code and is produced by save failures ONLY.**
**WHAT BREAKS YOU:** the most likely break in this release. **A consumer who treated `FileCommitFailed` as
"a constraint said no" now reads a save failure as a constraint refusal.** The refusal's own `KC` token still
rides `log[].state`; it is one status for all eight tokens, not one per token.

### `B-3` · `rollback` went from total to partial, and it THROWS

**AT `1.0.1`'s DECLARATION:** `rollback(opId): RollbackRecord` — **a total function that answers a record and
fails never.** It was already untrue of `1.0.1`'s code; **this file declares it against the code, which is
where the truth is.**
**AT `1.1.0`:** a reversal is JUDGED. **A `rollback` whose TERMINAL state a registered pair refuses THROWS
`{status: 'ConstraintPassRefused', message, log}` at rank `20`.** A LAWFUL reversal is unchanged — same
`{opId, undoneOps, restoredTo}`, three members, no throw, no new member. **The judgement is of the state the
reversal LEFT, never a per-step approval** — an unwinding composition passes through intermediate states no
constraint would approve.
**WHAT BREAKS YOU:** a call you could not fail now throws a plain object literal (never an `Error` subclass).
**AND THE THROW IS NOT THE WHOLE OF IT — SEE `B-5`: THE REVERSAL IS ALSO UNDONE.**
**THE JUDGEMENT IS NOT A WALK AND NOT FREE:** it takes a pre-reversal standing of every enabled pair's every
address before the store call and asks the terminal state after it. A store that registered no constraint
reaches no read at all, and the member is what it was.

### `B-4` · A failing attempt leaves the PRE-ATTEMPT state, not the refused value

**AT `1.0.0`:** seed `5`, refused write `9`, repair `1` — **the store was left holding `9`, the value the
constraint REFUSED.** A per-op walk over the repair's op reversed it AND marked it compacted, so the second
call over the write's op was answered `RollbackCompacted` and undid nothing. **The floor law made the walk
unsound and the violation stood.**
**AT `1.1.0`:** the failing arm leaves **`5`** — the state before the attempt. **A plain rejection still
leaves it, a repair answering `{ok: false}` still leaves it, and a PASSING repaired write still lands its
repaired value and composes nothing.**
**WHAT BREAKS YOU:** if you compensated for the old residue in your own layer, **your compensation now
unwinds a state that is already unwound.** The composition reports one step per address it issued a call at,
and `report.rollback` carries what actually happened.

### `B-5` · A refused reversal is RESTORED, and its restore WRITES THE FILE

**AT `1.0.1`:** the compensating undo cleared every tier and rewrote at `mem` — **so a `file`-tier value was
DESTROYED by a refusal that then told you every address stood again at its pre-reversal state** (measured by
the downstream at 200 of 200), **and the restore was in memory only, so a re-boot read bytes describing the
PRE-restore state.** *(Commits `00f90df`, `9e16c0e`, `bd0fd8c`.)*
**AT `1.1.0`:** the restore puts back **exactly the per-tier standing it captured** — a present capture writes
each tier at its own tier, most persistent first, so a shadow reconstructs; an absent capture becomes ONE
untiered delete, where `AddressNotFound` **is** the owed state; **no tier that stood is ever cleared.** It
**verifies the result and counts an address restored only if it is exact**, so the message cannot claim what
did not happen — where it fails it names the address, what stands, what was owed, and how many of the
addresses it moved stand again. It restores **from the store's own journal** (`restoreMark`), not from a JS
capture, so a mixed-depth shadow and a higher tier whose parent the reversal moved below it are now reachable.
**AND `bd0fd8c` MAKES THE FILE AGREEMENT REAL:** the restore takes a `file`-tier snapshot before and after the
replay, and **where a version standing at `Tier::File` moved it SAVES the restored image** with the store's one
writer — so a re-boot returns to JUDGED bytes.
**WHAT BREAKS YOU — TWO THINGS, BOTH NEW BEHAVIOUR:**
- **THE BYTES AT `cfg.filePath` ARE NO LONGER "the last successful `file`-tier write's and no other state".**
  A refused reversal's restore is now a SECOND producer of them. **A consumer who diffs those bytes, hashes the
  file, or watches its inode/mtime will see it move on a path that used to write nothing** — and where no
  file-tier version moved, **no byte is touched and the inode and mtime stay put.**
- **THE ASYMMETRY, SAID PLAINLY RATHER THAN LEFT TO BE DISCOVERED: a SUCCESSFUL `rollback` persists NOTHING.**
  Measured: `file` `a=1`, `file` `a=2`, rollback the second — memory reads `1`, the bytes still say `{"a":2}`,
  and a fresh boot reads `2`. **A reversal writes no bytes; a restore now does.**
**AND A SAVE THAT CANNOT LAND IS REPORTED, NOT SWALLOWED.** `FileCommitFailed` propagates after the replay and
the refusal says the store restored its state IN MEMORY while its FILE WAS NOT UPDATED. **The status stays
`ConstraintPassRefused`; nothing is minted for it.** **A constraint BODY that throws at the judgement now fails
closed**: the reversal is restored and the log names the throwing pair, with the body's own rank-`18` status
crossing — the code says what happened, the treatment is the violation's.
**STILL NOT RESTORABLE, NAMED SO IT IS NOT ASSUMED:** mixed-depth shadows *(reached by `restoreMark` now)*; an
address whose parent the journal never resolved *(reported as residue rather than guessed)*; state changed by
an act the store does not journal; an entry a failed file-save removed.

### `B-6` · No constraint check without an open commit — a check always runs inside one

**AT `1.0.1`:** a CHECK could run where NO commit was open. That one state was every remaining window on this
branch's list — a listener body's write at a descendant, a pass driven by hand (`open=0`/`live=1`), and the
restart's dependence on the write path being the consumer. *(Commit `846f5ea`.)*
**AT `1.1.0`:** **an open commit is the PRECONDITION of the check**, enforced **where the check runs, not where
it is called from** — a seam a driver can bypass is not an invariant. `runAttempt` wraps its whole pass in the
store's own commit scope: **the scope opens one if none is open, joins the one that is, and closes only what it
opened.**
**WHAT BREAKS YOU:** **a store that carries no such channel is REFUSED, not run uncommitted** — the invariant
fails closed before status moves, before an entry, before any body, and without minting a token. **So a
consumer or a harness that hand-drives a pass over a store lacking that seam now gets a refusal where it used
to run.** **MEASURED: the production write's nesting is UNCHANGED** — the count during the pass is one at the
body's ask and one after its nested write. **A pass you drive directly now carries `open 1` where it carried
`0`**, opening exactly one commit itself and returning to zero.

### `B-7` · `DeleteRecord` gained `op` — a record's shape grew

**AT `1.0.1`:** `delete` answered **`{address, tiers, triggered}`** — three members, **and no identity.** The
act was already journalled and `rollback` already accepted its id, **but no caller could NAME the act, so no
caller could reverse it**: an act that cannot be named cannot be reversed. *(Commit `c25765c`.)*
**AT `1.1.0`:** `delete` answers **`{address, tiers, triggered, op}`** — `op` is the store's own `JournalOp`,
**the same member, at the same name and the same type, that `WriteRecord` carries**, so `rollback(record.op.opId)`
is the one route to reversing a delete.
**`op` IS `null` ON THE ARM THAT REMOVED NOTHING** (`tiers: []`): that arm appends no journal entry, so it names
no op — **`null` is the truth rather than a minted id no reversal could find.**
**WHAT BREAKS YOU:** an object-shape assertion (`Object.keys(...).length === 3`, a strict deep-equal, a
serializer with a closed schema) breaks. **And `null` does not fold to `undefined`** — it crosses as `null`
unchanged.

### `B-8` · A delete's journal before-state was captured at the wrong home

**AT `1.0.1`:** the entry's before-state was captured at the WRONG HOME — `pair_home` resolved the first
standing version's link — **so a STRUCTURED target journalled an EMPTY before-state and its reversal restored
NOTHING AT ALL.** Scalars looked healthy, which is why it went unseen; an EMPTY-ADDRESS delete had the same
fate. *(Commit `c25765c`, the defect the `B-7` exposure had been hiding.)*
**AT `1.1.0`:** the capture is at the correct home, and **an empty-address delete captures the register and
reverses too.**
**WHAT BREAKS YOU:** **code that worked around the old behaviour** — a manual re-write after reversing a
subtree delete — now restores over a correction that already happened. The reversal restores the values AND
their tiers, scalar and subtree alike. **A SECOND reversal of the same op answers `RollbackCompacted`**, which
is the existing floor and not a new rule.

### `B-9` · An external callback's call opens its OWN commit

**AT `1.0.1`:** the join rule said a nested call *"JOINS the extant commit rather than opening a second"* — it
was written to keep ONE ACT's machinery from double-counting itself, **and it conflated INTERNAL NESTING (the
package's machinery inside its own verb) with EXTERNAL RE-ENTRY (your function, which the package invoked,
calling back in).** A listener body's write reused the outer verb's commit, so a listener's write at a
DESCENDANT address left the ancestor pair unasked and the violating effect stood. *(Commits `98cb3ac`,
`835f09f`; rulings `D-45`, `D-46`.)*
**AT `1.1.0`:** **a listener body — and every one of the caller-code invocation sites — OPENS A NEW COMMIT**,
because that is what entering at the package surface means. **The discriminator is the COMMIT ID a call NAMES,
not an authorship the package infers:** a call that supplies a commit id **JOINS** that commit; **a call that
supplies none OPENS a new one.** `write`'s FOURTH position already carries the commit, so **the surface did not
grow a member — it grew a rule about one it has.**
**A REPAIR JOINS** — a repair is not a separate act at the surface, it is PART OF THE ATTEMPT BEING TRACKED, so
it stays inside the attempt's own commit and the commit's record still describes the repair it performed.
**WHAT BREAKS YOU — THE OBSERVABLE COUNTS MOVE:** a listener body's write now **opens a second commit**, so an
attempt-opened observer **fires TWICE where it fired once**, and the descendant address is now asked by the
listener's OWN attempt rather than the outer write's. **The outer commit's count is unchanged across the call
and the outer write's record is untouched.** An ordinary write with a pair body and a listener body inside it
still opens ONE commit. **ONE EXTERNAL FUNCTION STILL INHERITS, named rather than hidden: the attempt-opened
observer itself**, which is called inside the opening before it returns — marking it would let a self-writing
observer open a commit at every notification, unbounded.

### `B-10` · An action inside an open commit RESTARTS the constraint check

**AT `1.0.1`:** a reversal issued INSIDE an open commit — from a listener body, from a constraint body — was
**UNJUDGED**, so its violating effect STOOD, **while the identical call one frame out was refused and
restored.** The conservative direction had become the permissive one. *(Commit `fd11eff`.)*
**AT `1.1.0`:** **an action performed inside an open commit STARTS THE CONSTRAINT CHECK OVER AGAIN** — the
check the action invalidated is **re-run from its FIRST pair against the state the action left**, so no
violating effect can stand unjudged and no body is invoked mid-unwind either, because the restart is a fresh
pass and not a judgement of a partial composition. **The step itself is still not judged at its instant**
(`D-40`'s gate stands: the watch keeps answering empty and no body runs there).
**WHAT BREAKS YOU:** **a violating reversal inside an open commit is now REFUSED and restored, where it used to
stand.** Measured: a listener body asked `[9,7,5]` and the write was REFUSED, store at `7`; a constraint body
the same; a LAWFUL act asked `[9,7,5]` with NO refusal and its effect stands. **TERMINATION IS BOUNDED RATHER
THAN ASSUMED: three restarts per terminal act**, the budget spent and not reset by actions raised inside a
restart, **and past it the check FAILS CLOSED in the same form.** **So a consumer whose body writes and
reverses in a loop now meets a refusal at the third restart instead of an unbounded pass.**

### `B-11` · A directly driven pass LEARNS a restart from the REPORT, not from a throw

**AT `1.0.1`:** the restart's request was consumed by the WRITE's frame, **so a body's `rollback` inside a
directly driven pass was neither judged at its instant nor restarted, and the request died with its window.**
*(Commit `0ade6b3`.)*
**AT `1.1.0`:** the request is a store-side fact and **its consumer is the store's own commit scope** — one
mechanism, not two. `runAttempt` drains it after its pass answers, inside the same scope. **And a directly
driven pass learns it from the REPORT rather than a throw: the outcome becomes `failed` and the refusal's own
constraint-check entry joins the attempt's log with its REAL ordinal**, so `K-3` does not throw while `K-5`
answers the same object.
**WHAT BREAKS YOU:** **a harness that drove a pass by hand and expected a THROW now gets none** — it must read
`report.outcome` and `report.log`. **The refusal's compensating restore runs before the report is amended**, so
your store stands restored; what you must READ is the report, never a throw.

---

## §3 · The two known fail-states, and their exits

**These are DECLARED, not fixed.** `D-43` item `2`, the architect, verbatim: *"Known fail-state, file reloads /
client regenerates store to return to valid state."* **A known fail-state with a documented recovery is a
specification; an unreachable window with no exit is a defect.** **The declaration of record is
`docs/specs/storeroom-js/contract.md`'s clause of 2026-10-27 and it is restated here because a consumer of the
tarball reads this file.**

**THE TWO WINDOWS.** Each holds a commit and **runs NO PASS**, so a request raised inside it has no consumer
and dies with that window:
1. **A `delete`'s listener delivery** — a delete consults no constraint, so the delivery runs with an open
   commit and no check; a `rollback` a listener body issues there is a step whose check never runs.
2. **A REGISTRATION's own evaluation** — `addConstraint`/`register` asks a pair's body inside the registering
   verb's own commit window, at an instant no `K-2`/`K-3` attempt stands at, so a `rollback` a registration
   body issues dies the same way.

**NEITHER WINDOW IS NEW, NEITHER IS A DEFECT, AND NEITHER IS AN UNREACHED CASE OF THE RESTART.**
**WHAT IS TRUE OF BOTH, SAID BEFORE THE EXIT: the reversal's own effect STANDS in the live instance — so the
absence of a refusal there is NOT an approval and must not be read as one.**

**EXIT 1 — RELOAD THE FILE.** **Construct a fresh instance over the same `cfg.filePath`.** The boot reads the
bytes at the path and nothing else. **AND SINCE `1.1.0` THIS RETURNS TO JUDGED BYTES RATHER THAN TO BYTES
DESCRIBING AN UNJUDGED STATE**: a restore that moved a version standing at `Tier::File` now SAVES the restored
image (§2 `B-5`). **What it does not carry:** the boot reads the last successful save and no other state — no
journal, no registration, no `mem` or `temp` version — and a reversal that moved only `mem`/`temp` nodes does
not save, so a reload does not carry it. **This exit is the store's declared boot semantics, not a general
undo.**

**EXIT 2 — REGENERATE THE STORE.** **Discard the instance and construct the store again from the same
configuration** — a `mem` register with no `filePath`, or a `file` register over the same path, which is exit
`1` as well. **The new instance is a judged state by construction**: no attempt, no open commit, no window
carried over.

**THE CONSUMER'S OBLIGATION IS THE SAME ON BOTH EXITS, AND IT IS THE POINT: the recovery is YOUR act; the
package neither performs it nor pretends to.**

---

## §4 · What did NOT break — so the reading is not taken wider than it is

- **THE FOURTEEN OWN MEMBERS ARE UNMOVED** — `{ read, readLiteral, write, delete, rollback, listen, unlisten,
  addConstraint, constraintOn, constraintOff, register, constraints, removeListener, removeConstraint }`.
  **No member was added and none was removed.** The module namespace keeps its ONE name, `storeCreate`.
- **NO POSITION, ARITY OR CLASS TEST MOVED.** `write`'s fourth position was READ for a new purpose and its
  class domain is unmoved: it accepts the commit RECORD and refuses everything else in the one `TypeError`.
- **THE THROWN FORM IS THE SAME ONE FORM** — a plain object literal `{status, message, log}`, never an `Error`
  subclass — and `ConstraintPassRefused` is a member of the SAME set, not a new shape.
- **REGISTRATION ORDER IS A GUARANTEE, NOT A LUCK.** `constraints()` emits by a MONOTONE REGISTRATION
  SEQUENCE, kept through overwrite, toggle and restore, so five snapshots are element-wise equal and equal to
  registration order. **This is new in `1.0.1` and it is a GUARANTEE, NOT A BREAK** — before it, *"no order is
  promised"* and a toggle could perturb it. It is declared here because a consumer diffing snapshots relies on
  it and because a later change would be a break.
- **NO TABLE ROW, RANK OR TRIGGER MOVED** inside ranks `1`…`17`.
- **THE CRATE'S VERSION IS NOT THE RELEASE VERSION.** `bindings/js/Cargo.toml` reads the crate's own `0.1.0`
  and `version()` answers the RELEASE's. They are deliberately distinct.

---

## §5 · Where the authority lives

- **The declaration of record** is the tree under `docs/specs/` — chiefly `storeroom-js/contract.md` (the
  package surface), `storeroom-native/contract.md` (the store), and `storeroom-publish/contract.md` (the six
  packages' coupling). **This note is a CONSUMER SUMMARY of them and yields to them.**
- **The rulings** are `strata/decisions.md` — `D-42` (the minor, the four, the restart), `D-43` (a listener's
  own commit, the known fail-state, a journaled and reversible delete), `D-44` (no check without an open
  commit), `D-45`/`D-46` (a callback opens, a repair joins, the commit id decides), `D-41`/`D-40` (the
  attempt's footprint and the step's gate).
- **The shipped guide** is `README.guide.md` INSIDE the main package — the assembly stages
  `docs/guides/package-use.md` there BYTE-FOR-BYTE, so when you read it from `node_modules/provident-storeroom/`
  it IS that document.

**THE SIX PACKAGES, ONE VERSION, ONE DECISION:** `provident-storeroom` and the five
`@auspicion/provident-storeroom-js-{linux-x64-gnu, linux-arm64-gnu, darwin-x64, darwin-arm64, win32-x64-msvc}`
all read **`1.1.0`**, and the main manifest's five `optionalDependencies` pins are EXACT `1.1.0` — no caret, no
tilde, no range. **A manifest that reads anything else anywhere is the wrong package.**

**STATUS OF THIS RELEASE'S OWN REHEARSAL:** the six tarballs were packed, a `1.1.0` install was driven in a
`/tmp` consumer with no repository in its ancestry, and `version()` answered `1.1.0` at the rebuilt artefact and
at the installed package. **No tag was cut, nothing was pushed, nothing was published, and no registry install
was witnessed** — a registry-installed `1.1.0` is described here from the manifest and from a locally packed,
installed artefact, and is still not witnessed as a registry download.
