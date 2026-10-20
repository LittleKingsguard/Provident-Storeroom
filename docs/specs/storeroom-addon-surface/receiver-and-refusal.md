# Part — `receiver-and-refusal` (`U-STOREROOM-ADDON-SURFACE`): the store's address, and what a call naming none answers

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-surface/contract.md`. **REGENERATED 2026-10-18.**
- **Scope boundary.** No export set (`export-set-and-dispatch.md`), no JS unwrap (`js-unwrap.md`). **The teardown itself is the sibling unit's** — this part says **what a call in the torn-down state does**; that unit says **why the state exists**.
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

---

## §1. THE CARRIER

**TODAY the store is found by an integer the package minted at construction and carried on every call.** **After the split each entry resolves its store from the Node-API `this` receiver** — the value already received at every entry and today discarded.

**THE RECEIVER IS A ROUTING CARRIER AND NOT AN AUTHORITY CARRIER.** The package has never validated that a caller holding a store object holds the *right* one; the integer was unforgeable only because the caller never saw it, **which is obscurity and not authority.** **Nothing in the supported surface needs the stronger guarantee.**

**`R: the SPLITS row`.** `[CONTRACT]`

---

## §2. ONE CONSTRUCTION, ONE STORE, ONE OBJECT

**The index is a slot in a lookup table, not a store identity.** **One `storeCreate` builds one store** with its own handle domain, and **two constructions remain two discrete stores in separate memory.** **The split does not change that**; the sibling unit's teardown depends on it and verifies it there. `[CONTRACT]`

---

## §3. THE REFUSAL — ONE ARM, ONE OBSERVABLE

**A CALL WHOSE RECEIVER NAMES NO LIVE STORE REFUSES, IN THE ONE DECLARED FORM.**

**IT COVERS TWO SITUATIONS THAT ARE THE SAME OBSERVABLE:**

| The situation | What happened |
| --- | --- |
| **a detached call** — `const { read } = layout; read(…)` | the method lost its object; there is no receiver |
| **a call on a collected store** | the receiver names an object whose store the finalizer freed |

**IN BOTH, THE RECEIVER NAMES NO LIVE STORE, SO ONE ARM SERVES BOTH.** **There is no second arm and no second observable.** `R: the TORN DOWN row`, part (6). `[CONTRACT]`

**AND THE FORM IS THE DECLARED ONE — the three-member object, never an `Error`.** See `failure-form.md`. `[CONTRACT]`

---

## §4. WHAT A LISTENER THAT IS A STORE MEMBER DOES: NOTHING, BECAUSE IT IS NOT SUPPORTED

**A listener that is itself a store member is NOT supported**, and this is stated because the alternatives below were rejected on that ground.

**SO THE PACKAGE'S OWN INVOCATION PATH NEEDS NO CHANGE.** The package invokes caller-registered functions; **it does not invoke its own members as listeners**, and therefore never hands a member a receiver it did not choose. **No binding, no wrapper thunk, and no call-site change in the delivery path.** `[CONTRACT]`

---

## §5. THE TWO REJECTED ALTERNATIVES, AND WHY

| Rejected | Why |
| --- | --- |
| **binding the members to the instance** | it exists only to support a listener that is a store member, **which is not supported** — and it would change what a deliberately re-bound receiver resolves to |
| **a `WeakMap` from receiver to store** | it resolves through the same `this` and so buys **only legibility**, not a guarantee; and it opens a lifetime question the per-object ownership already answers |

**A DELIBERATELY RE-BOUND RECEIVER IS STILL A RECEIVER: a caller who rebinds finds whichever store that receiver names, exactly as any other call in this section does.** **THIS IS THE SECTION'S STATEMENT ABOUT WHAT A RECEIVER IS — NOT A COST, NOT A CAPABILITY AND NOT A GUARD** — and it names no drive, because rebinding owes none. **The refusal fires only when the receiver names nothing at all.** *(This section is `V-6`'s routing clause and it is ROUTED FROM `§7`; **`§5` — this sentence — and not `§1` is that clause's home.** **CORRECTED 2026-10-19 (`role_spec_writer`): this parenthetical and `§7`'s close both read *"`§1` and not `§5` is that clause's home"*, and the sentence they routed is the one standing above, at `§5` — the rejected-alternatives table's own section — so a drive authoring `V-6` from `test-cases.md` was sent to `§1`, which carries the carrier's identity and this routing sentence nowhere.** **The clause STAYS where it stands, because `§5` is where the rejected alternatives make it necessary: it is the section that withdraws binding and the `WeakMap`, and the re-bound receiver is the case those two withdrawals must not be read as guarding.**)* `[CONTRACT]`

---

## §6. THE TABLE, AND ITS RETIREMENT

**THE TABLE REMAINS — something must hold the store — AND IT GAINS A RETIREMENT PATH.**

**WHY IT DID NOT NEED ONE BEFORE:** nothing was ever freed, so an entry could not go stale. **The sibling unit's finalizer changes that**, and an entry whose store has been freed must be **retired in the same act that frees the store** — otherwise the table holds a key naming nothing, which is the dangling the refusal arm would then have to absorb.

**THE RETIREMENT REMOVES EXACTLY ONE ENTRY — the freed instance's own — AND NEVER THE TABLE.**

**THE TABLE'S FORM AND ITS RETIREMENT MECHANISM ARE `OWED`** (see the contract's `§7`); the requirement is decided and is driven by `P-SAS-5`. `[OWED]`

---

## §7. THE DECLARED COST — ONE — AND THE ROUTING THE CARRIER PERFORMS

**THE FIRST, AND THE ONLY ONE: `const { read } = layout; read(…)` IS LEGAL TODAY AND THROWS AFTER THIS CHANGE.**

**THIS IS A REGRESSION AND IS NAMED AS ONE.** The closure made `this` irrelevant and the split does not. **The corpus never promised the detached form; the code happens to allow it because of how the members were written.** **A caller who detaches a member must be told, and this clause is where they are told.** `[CONTRACT]`

**AND THERE IS ONE DECLARED COST AND NO SECOND — REDUCED TO ONE LINE 2026-10-19 (`role_spec_writer`), ON THE ARCHITECT'S RULING: *"I know re-binding the JS surface is breaking behavior. Stop complaining about it. A consumer doesn't get to complain that they deliberately broke a package surface and it doesn't work right."*** **REBINDING A STORE'S FUNCTION IS UNSUPPORTED BREAKING BEHAVIOUR AND THE PACKAGE OWES NO GUARD FOR IT: no capability, no cost, no category-with-siblings, and no `V-6`/`V-12` pair of rows — the PAIR is gone in both of its members, `V-12` by deletion from the view and `V-6` by re-derivation into the view's row for the receiver's routing, carrying the property `P-SAS-2` and stating nothing about rebinding. The verbatim, the withdrawn capability-change reading and the itemised membership all stood here and are REMOVED. `docs/decisions.md`'s own row for the ruling stands and settles it. The detached call is NOT that and is not reduced with it — it is a working pattern that stops working, and a caller must be told.** **AND ONE SENTENCE IS THE WHOLE OF THIS DIRECTORY'S REBINDING MATERIAL — ADDED 2026-10-19 (`role_spec_writer`), closing the reduction at every site: it is the sentence above and no second one stands anywhere in this directory or in `docs/specs/storeroom-addon-surface/`.**

**AND A DRIVE ASSERTS THE ROUTING — NOT BECAUSE IT IS A COST, BUT BECAUSE IT IS WHAT THE CARRIER DOES: a call whose receiver names a live store — a re-bound receiver among them — lands at the store the receiver names** (`P-SAS-2`; `test-cases.md` `V-6`). **THE ROW IS NOT ABOUT REBINDING AND CARRIES NO GUARD, NO COST AND NO CATEGORY: rebinding is unsupported breaking behaviour and the sentence above is the whole of what this directory owes it — the row survives because it states THE CARRIER'S OWN PROPERTY, and that property holds for a re-bound receiver as it holds for any other.** **RE-SPELLED 2026-10-19 (`role_spec_writer`): this line routed by *"a re-bound call"* and cited `§5` of this part, and both spellings were the rebinding material the reduction above removed. The route is unchanged — `V-6` is now the view's row for the receiver's routing, carrying the property `P-SAS-2` (the view's own words in its census), and **`§5` carries it, at the re-bound-receiver sentence above** — **CORRECTED IN PLACE 2026-10-19 (`role_spec_writer`): this parenthesis read *"`§1` carries it"* and `§1` did not, so the route and its target now agree at `§5`, which is the same home `test-cases.md`'s `V-6` row now names.** `[CONTRACT]`
