# Part — `js-unwrap` (`U-STOREROOM-ADDON-SURFACE`): the two wrappers' removal, and the sites that call them

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-surface/contract.md`. **REGENERATED 2026-10-18.**
- **Scope boundary.** No export set (`export-set-and-dispatch.md`), no receiver (`receiver-and-refusal.md`).
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

---

## §1. THE TWO WRAPPERS

**`bindings/js/index.mjs` HAS TWO ENTRY WRAPPERS, NOT ONE, AND BOTH ARE DELETED.**

| The wrapper | Its shape | Who reaches it |
| --- | --- | --- |
| **`call(state, verb, args)`** | generic — takes the verb as a string and forwards it | **nine call sites**, carrying eight distinct verb strings |
| **`writeCall(state, args, fault)`** | **specific to `write`** — it carries the fault record | **`write`, and only `write`** |

**`write` DOES NOT GO THROUGH `call`.** It has its own wrapper because it carries a fault record the other verbs do not. **A pass that reads only the generic wrapper will miscount the sites**, which is why both are named here. `[CONTRACT]`

---

## §2. THE SITES

**NINE `call(state, …)` SITES, CARRYING EIGHT DISTINCT VERB STRINGS — `listen` APPEARS TWICE.**

| # | The site | The verb |
| --- | --- | --- |
| 1 | the read member | `read` |
| 2 | the literal-read member | `readLiteral` |
| 3 | the version-removal member | `delete` |
| 4 | the rollback member | `rollback` |
| 5 | the listener-registration verb | `listen` |
| 6 | the withdrawal verb | `unlisten` |
| 7 | the whole-removal member | `removeListener` |
| 8 | the file-tier save | `commitFile` |
| 9 | **the construction's constraint batch** | `listen` **again** |

**AND ONE `writeCall` SITE** — the write member's own.

**THE COUNT IS STATED WITH ITS TERMS SO IT CAN BE CHECKED RATHER THAN INHERITED.** `[CENSUS]`

---

## §3. THE WRITE WRAPPER'S ARM

**`writeCall` IS NOT MERELY A FORWARDER — IT CARRIES AN ARM THAT MATTERS.**

**When the store refuses a value with `ValueNotAdmitted` at a point the boundary's own walk refused, the wrapper RE-RENDERS THE MESSAGE from the walk's own fault record.** **It throws; it is not a fault sink.** **The arm moves into the write member's own body and IS NOT DROPPED.** `P-SAS-8` drives it. `[CONTRACT]`

---

## §4. `state.id`'S THREE SITES

**The store's integer lives in three places, and they move together.**

| # | Where | Inside a wrapper? |
| --- | --- | --- |
| 1 | the generic wrapper's forwarding call | **yes** |
| 2 | the write wrapper's forwarding call | **yes** |
| 3 | **the registration path** | **NO — it is outside both** |

**SITE 3 IS NAMED BECAUSE A ONE-PASS EDIT THAT SWEEPS ONLY THE WRAPPERS WILL MISS IT.** `P-SAS-6` drives the disappearance of all three. `[CONTRACT]`

**AND SITE 3'S SUCCESSOR IS STATED, BECAUSE A DELETION WITH NO SUCCESSOR IS NOT A CLAUSE A DRIVE CAN READ — ADDED 2026-10-19 (`role_spec_writer`).** **THE REGISTRATION PATH DOES NOT STOP ADDRESSING A STORE; IT RESOLVES ONE A DIFFERENT WAY.** **It reaches `register`, one of the four standing exports, whose arity `2` is UNMOVED** (`export-set-and-dispatch.md §1`). **`register` is reached as a MEMBER of the store object the package returned, so the receiver is the store object itself — the same Node-API `this` every per-verb entry now resolves from** (`receiver-and-refusal.md §1`). **What the registration path loses is the integer it used to hand across: it hands NOTHING for the store's identity, because the call's own receiver IS the identity.** **So the site does not vanish from the code; its operand vanishes from the call.** **A drive asserts the pair: `register` answers at arity `2` with no integer passed, and a registration reaches the same store the caller's object names.** `[CONTRACT]`

---

## §5. WHAT THE MEMBERS BECOME

**EACH MEMBER CALLS ITS OWN VERTICAL ENTRY DIRECTLY.** The verb string disappears — it is no longer data, because it is the entry's name. **The member's own body keeps everything else it did**: the encoding, the arity read, the decode, and — for `write` — the fault arm.

**NO MEMBER'S ARITY, RETURN SHAPE OR REFUSAL MOVES.** That is `P-SAS-7`'s property, and it is the reason this unit is a refactor rather than a change.

---

## §6. WHAT THE UNWRAP BUYS

**A FRAME A DEVELOPER CAN READ.** Today a stack shows the package's member, then the generic wrapper, then the boundary's dispatcher — **and the verb only as a string**. After the unwrap it shows the package's member and the verb's own entry.

**AND IT IS A DEVELOPER-SIDE GAIN, NOT A CONSUMER-VISIBLE ONE.** The declared refusal carries no frames, and the failure messages already name the verb because **the package composes them**. **This clause states the bound so the gain is not claimed larger than it is.** `[CONTRACT]`
