# Part — `export-set-and-dispatch` (`U-STOREROOM-ADDON-SURFACE`): the thirteen entries, and the dispatcher's end

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-surface/contract.md`. **REGENERATED 2026-10-18.**
- **Scope boundary.** No receiver (`receiver-and-refusal.md`), no JS unwrap (`js-unwrap.md`).
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

---

## §1. THE SET, CLOSED

**THE ADDON'S EXPORT SET MOVES `5 → 13`: `4` STANDING PLUS `9` PER-VERB — `4 + 9 = 13 ✓`.**

**THE FOUR THAT STAND, UNMOVED IN NAME AND ARITY:**

| Name | Its arity | What it is |
| --- | --- | --- |
| `version` | `0` | the artefact's own version string |
| `errorMessage` | `2`–`3` | the one message renderer the package calls |
| `storeCreate` | `1` | the construction |
| `register` | `2` | the listener-registration site |

**THE NINE THE SPLIT ADDS, ONE PER DISPATCHER ARM:**

| Name | Its arity | The verb |
| --- | --- | --- |
| `read` | `2` | the read |
| `readLiteral` | `2` | the literal read |
| `write` | `4` | the write — **it carries a fourth position the others do not** |
| `delete` | `2` | the version removal |
| `rollback` | `1` | the journal rollback |
| `listen` | `2` | the listener registration verb |
| `unlisten` | `1` | the withdrawal |
| `removeListener` | `1` | the whole removal |
| `commitFile` | `1` | the file-tier save |

**`9 + 4 = 13 ✓`.** `[CENSUS]`

---

## §2. THE THREE NAMES THAT ARE NOT ENTRIES, EACH NAMED SO ITS ABSENCE IS NOT READ AS AN OMISSION

**`call` IS DELETED.** It **was** the dispatcher: one entry taking `(instance, verb, args)` and matching the verb across nine arms. **The split is precisely its replacement, so it does not survive.**

**`commit` IS NOT AN ENTRY AND NEVER WAS AN ARM.** It is **`write`'s FOURTH POSITION** — the record a kernel-driven write carries — and it has no exported name at all.

**`constraints` IS NOT AN ADDON ENTRY.** It is a product member the package answers from its own read model; **the addon is never reached for it.**

**ALL THREE ARE STATED WITH THEIR REASON BECAUSE A READER COMPARING THE OLD TABLE TO THE NEW WILL LOOK FOR THEM.** `[CONTRACT]`

---

## §3. THE DISPATCHER'S END

**TODAY** the boundary carries one entry that parses `(index, verb, args)` and matches the verb as a **JS string** across nine arms. **Nothing below the entry shows the verb**: a debugger, a profile and a stack all see the dispatcher's own frame and the verb only as data.

**AFTER THE SPLIT** the verb **is** the frame's name. **That is the change's whole point, and it is a DEVELOPER-side gain and not a consumer-visible one** — see `failure-form.md`: the declared refusal carries no frames, and the failure messages already name the verb because the package composes them.

**SO WHAT MOVES, EXACTLY, AND WHAT DOES NOT:**

| Moves | Does not |
| --- | --- |
| the addon's own key set — five names to thirteen | any verb's answer, refusal or arity |
| the frame a developer sees | what a consumer observes |

**`P-SAS-1` drives the key set.** `[CONTRACT]`

---

## §4. THE ARITIES, AND WHY THEY ARE WHAT THEY ARE

**EACH ENTRY TAKES ITS VERB'S OWN ARGUMENTS AND NOTHING ELSE.** The instance position that once preceded them is gone — **it was removed before this unit and is not reintroduced** — and the store arrives by the receiver (`receiver-and-refusal.md`).

**THE ARITY FIGURES ABOVE COUNT ONLY THE ARGUMENTS A CALLER SUPPLIES.** They are the verb's declared positions, and **`P-SAS-2` drives each at its declared arity and at ±1.**

**⟶ RE-CUT 2026-10-21: BOTH SENTENCES ABOVE WERE FALSE OF THE CODE THAT STOOD, AND THIS EDIT IS WHAT MAKES THEM TRUE.** Measured before the cut, **every one of the nine per-verb entries declared ONE MORE POSITION THAN ITS CALL SHAPE CARRIES** — `read` `3` against a two-argument member, `readLiteral` `3` against two, `write` `5` against four, `delete` `3` against two, `rollback` `2` against one, `listen` `3` against two, `unlisten` `2` against one, `removeListener` `2` against one, `commitFile` `2` against one. **The surplus was uniform — exactly one per entry, the trailing parameter `_tail`** — and it was read by nothing and supplied by nothing: no entry's body called `position(&positions, n)` at the tail index, and the package's members build their argument arrays from `arguments.length` checks and `args.push` calls, so a trailing element was never constructed. **THE SURPLUS WAS THE RESIDUE OF THE ABANDONED ELEMENT-0 RECEIVER DESIGN** — the design whose withdrawal is recorded at `facade.rs`'s own entry-block comment and at `receiver-and-refusal.md §1`/`§5`, where an earlier shape took the receiver as the call array's first element and began each entry's declared positions at element ONE. **IT IS NOW REMOVED FROM ALL NINE, so the table equals the call shape.** **THE FOUR THAT STAND, AND THE FOUR STANDING ARITIES, ARE UNMOVED.**

**AND ONE ARITY IS NON-UNIFORM BY DESIGN: `write`'s four.** Its fourth position is the adopted record identity a kernel-driven write carries, **and a caller supply beyond the declared four is an unsupported anti-pattern that is neither refused by arity nor detected by a test.** The split preserves that exactly.

**⟶ AND `write`'s FOURTH POSITION IS DECLARED AND NOT READ — MEASURED, NOT ASSUMED.** `write`'s entry declares four positions, `address`, `tier`, `value` and `commit_identity`; **its body reads the first three and no more — no `position(&positions, 3)` call exists anywhere in `facade.rs`.** **THE RECORD IS CONSUMED IN THE MEMBER AND NOT IN THE ENTRY**: the kernel passes it to the **package** (`constraint-kernel.mjs`'s `store.write(address, tier, value, record)`), whose `write` member refuses a bad one at `commitPositionRefusal` and then spreads **three** encoded args — `address`, `tier`, `value` — to this entry. **THE FOURTH POSITION THEREFORE CARRIES THE VERB'S OWN DECLARED CALL SHAPE AND NOT A READ VALUE**: it stands because `§1` and this section declare the four-position call as the verb's own — `surface.md §2.2`'s `commit?` clause, `PAR-SAS-4` — so it is left in place while the surplus fifth alone was removed. **THE FIFTH, WHICH `§1` ONCE CALLED *"the position the others do not carry"*, WAS NOT THE RECORD'S: IT CARRIED NOTHING AT ALL.** `[CONTRACT]`
