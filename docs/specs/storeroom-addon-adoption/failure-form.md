# Part — `failure-form` (`U-STOREROOM-ADDON-ADOPTION`): the one thrown form, and the obligation that keeps it

- **Status:** CARRIER PART of `docs/specs/storeroom-addon-adoption/contract.md`. **REGENERATED 2026-10-18.**
- **Scope boundary.** No verb's signature (`binding-crate-and-abi.md`), no teardown (`finalizer-and-teardown.md`).
- **The layer.** `ENVELOPE/PURE`. `[CONTRACT]`

---

## §1. THE FORM

**A refusal crossing this boundary is a THROWN PLAIN OBJECT carrying exactly three members — `status`, `message`, `log` — and nothing else.**

**IT IS NEVER AN `Error`.** Not an `Error` subclass, not a value with an `Error` prototype. **It carries no `code`, no `cause`, and no `name`.**

**AND NO CLAUSE FORBIDS A `stack`.** *"Never a `stack`"* appeared in the code's own header and in no clause; **it is an artefact of a plain object having none, not a rule.** **The header that stated it is a residue this unit corrects** (`S-4`). **`stack` is not forbidden; it is simply not part of the form, and nothing asserts its absence as a contract property.**

**THE MEMBER COUNT IS THREE AND THE CORRECTION IS ON RECORD.** The form was declared with two members in older text; **the third, `log`, is built at the JS boundary and never in Rust.** `R: the FOUR CLAUSES row`, adjudication (4). `[CONTRACT]`

---

## §2. WHAT IT CARRIES

| Member | Its unit and domain |
| --- | --- |
| `status` | a **string drawn from the store's closed status set** — a member, never minted at this layer |
| `message` | a **string** the store (or the boundary's own refusals) generates |
| `log` | an **array**, and `[]` when no attempt is in flight |

**THE STATUS IS A MEMBER OF A CLOSED SET AND THIS LAYER MINTS NO MEMBER OF IT.** An outside value is carried to the store's own argument type and **the store produces the code**; the boundary never invents one. `[CONTRACT]`

---

## §3. THE OBLIGATION THAT KEEPS IT

**THIS IS THE PART THAT MATTERS, BECAUSE THE LIBRARY'S IDIOMATIC PATH WOULD BREACH IT.**

**The adopted library's ergonomic error handling throws a real `Error`.** A `Result` arm carrying a library error maps to one. **Every refusal site on the boundary is therefore obliged to throw the value, not the error** — by the library's raw-value escape hatch, not by its typed error.

**A REFUSAL PATH THAT RETURNS A LIBRARY ERROR IS A DEFECT OF THIS UNIT**, and the cells that catch it are the ones asserting non-`Error`-ness. **The obligation is checkable at every refusal site**: the thrown value's own keys are exactly the three, its prototype is `Object`, and it is not an `Error`.

**`P-ADA-3` drives it.** `[CONTRACT]`

---

## §4. WHAT THIS UNIT DOES NOT CHANGE

**THE FORM IS UNCHANGED BY THIS UNIT AND BY THE NEXT.** The split moves how a verb is reached; **it does not move what a verb answers when it refuses.** The export set widens from five names to thirteen; **every one of them refuses in this same three-member form.**

**AND ONE CORRECTION MADE ELSEWHERE IS RECORDED HERE SO IT IS NOT EXPECTED: the `log` member is attached at the JS boundary and not in Rust.** A boundary that produced it in Rust would be a second home for it. `[CONTRACT]`
