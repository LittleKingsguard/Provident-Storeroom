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
| `read` | `3` | the read |
| `readLiteral` | `3` | the literal read |
| `write` | `5` | the write — **it carries a fifth position the others do not** |
| `delete` | `3` | the version removal |
| `rollback` | `2` | the journal rollback |
| `listen` | `3` | the listener registration verb |
| `unlisten` | `2` | the withdrawal |
| `removeListener` | `2` | the whole removal |
| `commitFile` | `2` | the file-tier save |

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

**AND ONE ARITY IS NON-UNIFORM BY DESIGN: `write`'s five.** Its fifth position exists so that a repair write made by the kernel's own flow carries the record identity it joins, **and a caller supply is an unsupported anti-pattern that is neither refused by arity nor detected by a test.** The split preserves that exactly. `[CONTRACT]`
