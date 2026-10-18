# RCA — HOW `DEF-M`'S PASSING-ARM DATA-INTEGRITY DEFECT PASSED EVERY GATE (2026-08..2026-10-17, supervisor)

**THE QUESTION, ASKED BY THE ARCHITECT: *"how DEF-M passed testing when it has such an obvious data integrity violation."* **THE ANSWER, TRACED AT THE BYTES: THE SUITE TESTS THE REPAIR'S OP AND THE REPAIR'S VALUE, AND NEVER TESTS A BODY THAT JUDGES THE REPAIRED VALUE. THE DEFECT LIVES ENTIRELY IN THAT GAP, AND THE GAP IS STRUCTURAL RATHER THAN AN OVERSIGHT.**

## THE DEFECT, RESTATED PRECISELY

**On the passing arm a write RETURNS SUCCESSFULLY while the store holds **THE VALUE THE CONSTRAINT REFUSED**.** **Supervisor-reproduced on installed `0.5.0`: seed `1`, register a constraint returning `{message, repair}` for value `9` (the repair writing `2`), write `9` → THE WRITE **RETURNS** A WRITE RESULT AND `read` ANSWERS `{"v":9}`.** **The write's contract-level outcome is unchanged and the store holds a refused value. Silent.**

## THE CELL THAT SHOULD HAVE CAUGHT IT, READ AT ITS OWN BYTES

**`bindings/js/test/constraint-kernel-repairop.test.mjs:137` — *"the declared success arm carries the op the caller's own verb answered"* — IS THE PASSING-ARM CELL, AND IT IS THOROUGH. IT ASSERTS:**
- the declared return shape `{ok, message, op}` — three members, read whole;
- `returned.op === landed`, where `landed` is **what the store's own `write` answered**, not a fabricated value;
- the op is the store's own `JournalOp`, carrying an `opId`;
- the kernel appends `returnValue.op` **exactly once**, and `attempt.ops.length === 2`;
- the `repair-run` entry names that op;
- **AND — THE LINE THAT MAKES THIS AN RCA RATHER THAN A COVERAGE GAP — `assert.equal(store.read(address), 'fixed')`, *"the caller's own write verb landed the value, and the attempt resolved on it."***

**⟶ SO THE SUITE **DOES** READ THE STORE BACK AFTER A PASSING REPAIR. THE VALUE IS CHECKED. THE DEFECT IS NOT THAT NOBODY LOOKED.**

## THE ACTUAL GAP, AND IT IS ONE LINE OF THE CELL

**THE CELL'S CONSTRAINT BODY IS:**
```js
passAtRegistration(() => {
  evaluations += 1;
  if (evaluations === 1) { return { repair: () => { ... }, message: 'x is invalid' }; }
  return true;                                  // <-- THE SECOND EVALUATION IS UNCONDITIONAL
})
```
**ITS SECOND EVALUATION RETURNS `true` **UNCONDITIONALLY** — IT DOES NOT READ THE REPAIRED VALUE.** **SO THE CELL PROVES THE REPAIR'S OP LANDED AND THE STORE HOLDS `'fixed'`, WHICH IS TRUE — AND IT CANNOT PROVE THE **CONSTRAINT ACCEPTED** WHAT LANDED, BECAUSE ITS BODY ACCEPTS ANYTHING.**
**⟹ THE DEFECT REQUIRES A BODY THAT **JUDGES** THE REPAIRED VALUE — one that refuses `9` and accepts `2` — AND **NO CELL IN THE SUITE HAS ONE.** **A SUPERVISOR GREP OVER ALL EIGHT REPAIR-BEARING FILES FOUND **ZERO** CELLS WITH A VALUE-DEPENDENT SECOND EVALUATION (`evaluations === 2` / `evaluations > 1` return nothing).** **EVERY PASSING-ARM REPAIR CELL FOLLOWS THE SAME SHAPE: repair, then accept unconditionally.** **THE SUITE VERIFIES THE **MECHANISM** OF REPAIR (an op is produced, carried, credited once) AND NEVER THE **JUDGEMENT** OF REPAIR (whether what landed satisfies the constraint that asked for it).**

## WHY THE GATES COULD NOT SEE IT — EACH GATE, NAMED, AND WHAT IT WOULD HAVE NEEDED

| Gate | Why it did not catch this |
|---|---|
| **3 — red/green** | **The suite was green because its cells assert what the implementation does.** **A green set can only be as strong as the assertions in it, and the missing assertion is the missing **scenario**, not a weakened one.** |
| **4 — adversarial + PBT audit** | **The audit reasons over the PROPERTY REGISTER's rows.** **No row's subject is *"the value that stands after a passing repair is one the constraint accepted"* — so the audit had no row to reason over and found no over-strength.** **THE PROPERTY LAYER'S OWN COVERAGE IS THE HOLE.** |
| **5 — blind greens** | **The greens were derived FROM THE DOCS, and the docs do not declare the property either: no clause of either unit states that a passing repair's landed value must satisfy the constraint that asked for it.** **A blind set cannot assert an undeclared property.** **⟹ THIS IS THE ROOT: THE PROPERTY IS **UNDECLARED**, SO NO DOCUMENT-DERIVED INSTRUMENT COULD TEST IT. |
| **6 — live scenarios** | **The live battery drives declared scenarios, and none of them has a value-judging repair.** |
| **11 — PBT** | **The register is the same instrument as gate 4: no row, no audit.** |
| **the upstream replay** | **The engine was adopted as a unit whose contract came with it; nothing re-derived ITS OWN completeness against what a repair is FOR.** |

**⟹ AND THE COMMON CAUSE IS ONE SENTENCE: **THE PROPERTY WAS NEVER DECLARED.** **The contract says a repair's op LANDS and the attempt RESOLVES — and every instrument faithfully tested that. It does not say the landed value must be one the constraint accepts, so no instrument could test what was never written.**

## WHY THE DOWNSTREAM PROJECT FOUND IT AND THIS PROJECT DID NOT

**THEY CAME AT IT FROM THE OTHER END: a constraint that returns `{message, repair}` for a value it refuses, then — on the re-reading — judges whether the repair ACTUALLY FIXED IT.** **THAT IS WHAT A CONSUMER DOES BY NATURE: they write a constraint that knows what it wants.** **The project's cells were written FROM THE CONTRACT'S OWN SHAPE — an op, a return, a count — and a contract that does not require the judgement cannot demand a cell for it.** **A CONSUMER'S REQUIREMENT IS THE INSTRUMENT THAT FOUND IT, WHICH IS EXACTLY THE ROLE THE DOWNSTREAM REPORTS HAVE PLAYED THROUGHOUT THIS SESSION.**

## WHAT TO DO ABOUT IT — AND THE CLASS, NOT JUST THE INSTANCE

1. **DECLARE THE PROPERTY FIRST — it is a spec act and it is the root.** **A clause must state that a passing repair's landed value satisfies the constraint that requested it, or state what happens when it does not (a refusal, a distinct terminal arm, a code).** **UNTIL IT IS DECLARED, EVERY DOCUMENT-DERIVED INSTRUMENT WILL KEEP MISSING IT.** **⟹ AND ALSO DECLARE WHETHER THE WRITE MAY RETURN SUCCESS WHILE A REFUSED VALUE STANDS — the current silence permits it, and it is the silence that makes it silent.**
2. **THEN THE PROPERTY REGISTER GAINS A ROW** — *"a passing repair leaves a value the constraint accepts"* — **which makes gate 4's audit and gate 11's layer have something to reason over.** **THIS IS THE STRUCTURAL REPAIR, AND IT IS THE ANSWER TO *"how did it pass"*: the register had no row for it.**
3. **THEN THE TEST WRITER ADDS THE CELL** — a value-judging body, in both spellings (context-threading and closure-only), **plus the negative arm: a repair whose landed value the constraint still refuses.** **The downstream's own reproduction is the model.**
4. **AND THE LESSON FOR THE GATE APPARATUS, RECORDED HERE SO IT IS NOT LOST: THE SUITE'S STRENGTH WAS MEASURED BY ITS OWN ASSERTIONS, AND THE MISSING COVERAGE WAS A MISSING **SCENARIO SHAPE** — a body that judges its subject.** **Every repair cell in the suite repairs and then accepts. The class is *"a cell whose subject is the mechanism rather than the judgement."*** **A LATER PASS SHOULD SEARCH FOR THAT SHAPE ACROSS OTHER FACETS — not only repairs — because this session has now found the same pattern four times: a green set asserting the mechanism the code has rather than the property the contract owes.**
