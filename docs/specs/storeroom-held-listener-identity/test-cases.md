# Part — `test-cases` (`U-STOREROOM-HELD-LISTENER-IDENTITY`, prefix `D-GP-SHLI`): a derived INVENTORY of the states and fail-states the contract already pins

**THIS FILE CONTAINS NO EXECUTABLE TESTS.** **It is a `view` part: an INVENTORY of cases that `contract.md` and its carrier parts ALREADY PIN, one row per case, each citing the `§n` that pins it.** **IT DECLARES NOTHING THE CONTRACT DOES NOT ALREADY CARRY.** **A row whose citation does not resolve to a pinning clause is a gate-2 finding; a case this file invented would be a finding of a second kind, so no case is invented.** `[CONTRACT]`

**Role.** `role_spec_writer`, gate 2. **No test code, no runner, no assertion API and no fixture is named as this change's own**: the red set is the TestWriter's act, authored FROM this inventory and from the contract, and **this file licenses nothing.** `[CONTRACT]`

**And the one thing this inventory is FOR.** **A TestWriter derives every state and every fail-state from the contract; this file's rows are the CHECK that it has, not a substitute for the derivation.** **Each row's `pins` cell names the clause; a row read without its clause has been read as a specification and it is not one.**

---

## §1. The inventory's census, printed with its terms

**`46` rows — `20` VALID/HAPPY-PATH states (`V-1`…`V-20`) + `13` FAIL states (`F-1`…`F-13`) + `13` INVARIANT probes (`I-1`…`I-13`), `20 + 13 + 13 = 46` ✓.** **AND THE THREE TERMS ARE READ FROM THE THREE TABLES BELOW, ONE ROW PER CASE, NO GAP AND NO DUPLICATE.** `[CENSUS]`

---

## §2. The VALID / HAPPY-PATH states

| # | The case | Its pins (the clause that declares it) | The strategy id it belongs to |
| --- | --- | --- | --- |
| `V-1` | a fresh store with an empty `listeners` array and no constraint | `contract.md §3` `S-1`; `docs/specs/storeroom-native/parameter-semantics.md §2.12` | — |
| `V-2` | `listen(h, [A])` writes the entry with `off` set; `register(h, fn)` clears it; the function invokes at a write at `A` | `contract.md §3` `S-2`; `listen-verb.md §4`; `identity-and-domain.md §4` item 2 | `P-HL-1`'s `S-ID-TYPE` |
| `V-3` | `listen(h, [A, B])` — one handle, two addresses, ONE entry, `off` set, two mirror rows | `contract.md §3` `S-3`; `listen-verb.md §2.2` item 1; `§6` item 4 | `P-HL-2`'s `S-PURGE-SET` |
| `V-4` | `listen(h, S1)` then `listen(h, S2)` — `S1` purged wholesale, `S2` installed | `contract.md §3` `S-4`; `listen-verb.md §3` item 1 | `P-HL-2`'s `S-PURGE-SET` |
| `V-5` | `listen(h, S1)` twice — idempotent IN EFFECT, one entry, one set | `contract.md §3` `S-5`; `P: docs/pending.md · (R1)` | `P-HL-2`'s `S-PURGE-SET` |
| `V-6` | `unlisten(h)` where `h` stands at one address — the store entry withdrawn, the map entry KEPT with `off` set | `contract.md §3` `S-6`; `listen-verb.md §4`; `docs/specs/storeroom-js/surface.md §2.3` item 4 | `P-HL-1`'s `S-ID-MONO` |
| `V-7` | `removeListener(h)` — the entry removed whole and its store entries withdrawn | `contract.md §3` `S-7`; `removal-members.md §2` | `P-HL-7`'s `S-REMOVE-WHOLE` |
| `V-8` | a boot whose `cfg.listeners` carries N entries for one handle — applied through the same `listen` verb | `contract.md §3` `S-8`; `listen-verb.md §6` | `P-HL-1`'s `S-ID-UNIQ` |
| `V-9` | `addConstraint(pair, fn)` at a fresh pair — one store entry, one identity, one `state.constraints` value | `contract.md §3` `S-9`; `constraint-identity.md §2` | `P-HL-6`'s `S-ID-STORE` |
| `V-10` | `addConstraint(pair, fn2)` at a HELD pair — validate → purge → add, and THE SAME identity answered | `contract.md §3` `S-10`; `constraint-sites.md §1`; `constraint-identity.md §2` item 2 | `P-HL-6`'s `S-ID-STORE` |
| `V-11` | `constraintOff` then `constraintOn` — each a purge-then-add, each `undefined`, `constraints()` unmoved | `contract.md §3` `S-11`; `constraint-sites.md §1` item 1 | `P-HL-6`'s `S-ID-STORE`; `P-HL-7`'s `S-REMOVE-ATOMIC` |
| `V-12` | `removeConstraint(pair)` — the four structures gone; `constraints()` shrinks by one | `contract.md §3` `S-12`; `removal-members.md §3`–`§4` | `P-HL-7`'s `S-REMOVE-WHOLE` |
| `V-13` | a write at `A` with a listener bound at `['a']` — `triggered` carries `{handle, address: ['a']}` and the argument is `['a','b','c']` | `contract.md §3` `S-13`; `trigger-and-pair.md §1` item 2 and §5 item 4 | `P-HL-3`'s `S-PAIR-DISTINCT` |
| `V-14` | a handle at two addresses both prefix-matching one write — ONE invocation | `contract.md §3` `S-14`; `trigger-and-pair.md §5` item 2 | `P-HL-5`'s `S-DEDUPE-HANDLE` |
| `V-15` | `K-2`'s record at its return — `triggered` and `pending` carry the same element identities | `contract.md §3` `S-15`; `trigger-and-pair.md §3` item 2 | `P-HL-3`'s `S-PAIR-TOTAL` |
| `V-16` | a check-off — the entry POPS from `pending`, nothing carried beside | `contract.md §3` `S-16`; `trigger-and-pair.md §3` items 3–4 | `P-HL-3`'s `S-PAIR-TOTAL` |
| `V-17` | a failed write's discard — that write's set leaves `pending`; another write's entry stands | `contract.md §3` `S-17`; `trigger-and-pair.md §4` item 1 | `P-HL-3`'s `S-PAIR-TOTAL` |
| `V-18` | a purged pair after an app `listen` at its address — STILL EVALUATES, delivery silent | `contract.md §3` `S-18`; `listen-verb.md §5` item 2; `kernel-selection.md §5` | `P-HL-2`'s `S-PURGE-ALL` |
| `V-19` | `K-6 remove(store, pair)` — the kernel's rows and the store's entries gone | `contract.md §3` `S-19`; `remove-member.md §4` item 1 | `P-HL-8`'s `S-K6-ANSWER` |
| `V-20` | a second `K-2` at a HELD address refused `KC-7`; at a DESCENDANT address admitted | `contract.md §3` `S-20`; `kernel-selection.md §4` item 2 | `P-HL-4`'s — (`S-K6` family's sibling); see `P-HL-2`'s `S-PURGE-ORDER` |

---

## §3. The FAIL states

| # | The case | Its form | Its pins | The strategy id it belongs to |
| --- | --- | --- | --- | --- |
| `F-1` | `listen`'s handle position outside `HL-1`'s domain | the one thrown form, `AddressMalformed` | `contract.md §4` `F-1`; `listen-verb.md §8` `LF-1` | `P-HL-1`'s `S-ID-TYPE` |
| `F-2` | `listen`'s set position outside its domain | the same form | `contract.md §4` `F-2`; `listen-verb.md §2.2` item 2 and `§8` `LF-2` | `P-HL-2`'s `S-PURGE-ORDER` |
| `F-3` | `unlisten` over any outside value | NO THROW — a no-op success | `contract.md §4` `F-3`; `identity-and-domain.md §2` items 2–3 | `P-HL-1`'s `S-ID-TYPE` |
| `F-4` | `register` over an outside handle | the one thrown form, `AddressMalformed` | `contract.md §4` `F-4`; `identity-and-domain.md §2` item 2 | `P-HL-1`'s `S-ID-TYPE` |
| `F-5` | `register` over a non-function listener | the same form, naming the position and the class | `contract.md §4` `F-5`; `docs/specs/storeroom-js/surface.md §2.4` item 5 (d) | `P-HL-1`'s `S-ID-TYPE` |
| `F-6` | `removeListener` over any arm that is not a real removal | THROWN, with a verbose message | `contract.md §4` `F-6`; `removal-members.md §5` | `P-HL-7`'s `S-REMOVE-ATOMIC` |
| `F-7` | `removeConstraint` over an outside pair | the constraint methods' `TypeError`, `status` ABSENT | `contract.md §4` `F-7`; `removal-members.md §6` item 2 | `P-HL-7`'s `S-REMOVE-ATOMIC` |
| `F-8` | `removeConstraint` over a pair the entry does not carry | THROWN, with a verbose message | `contract.md §4` `F-8`; `removal-members.md §5` row `1` | `P-HL-7`'s `S-REMOVE-ATOMIC` |
| `F-9` | the constraint/listener CONFLICT at `register` | THROWN `TypeError`, `status` ABSENT, the message naming BOTH sides | `contract.md §4` `F-9`; `constraint-sites.md §5` items 4–5 | `P-HL-3`'s — (`S-PAIR-*` family's sibling); see `P-HL-7`'s `S-REMOVE-ATOMIC` |
| `F-10` | a refused registration at a HELD pair | the store's `ConstraintListInvalid`, in the one form with its `log` | `contract.md §4` `F-10`; `constraint-sites.md §4` item 1 | `P-HL-2`'s `S-PURGE-ORDER` |
| `F-11` | a constraint BODY that throws | THE BODY'S OWN THROWABLE, unconverted, no `KC` token | `contract.md §4` `F-11`; `docs/specs/storeroom-constraints/fail-surface.md §1.1` item 5 | `P-HL-4`'s sibling — the body's own arm |
| `F-12` | `K-6` over a pair the kernel holds no row for | `KC-2`, in the kernel's own form | `contract.md §4` `F-12`; `remove-member.md §4` item 2 (ii) | `P-HL-8`'s `S-K6-ANSWER` |
| `F-13` | `K-6`'s store-side refusal | THE STORE'S OWN CODE, at that call and unconverted | `contract.md §4` `F-13`; `remove-member.md §4` item 2 (iii) | `P-HL-8`'s `S-K6-ANSWER` |

---

## §4. The INVARIANT probes — one per register row plus five class probes

**EACH PROBE NAMES THE REGISTER ROW IT DISCHARGES AND THE `§` THAT PINS IT. A probe with no row and no clause has no subject.**

| # | The probe | Its register row | Its pins |
| --- | --- | --- | --- |
| `I-1` | every listener entry names a non-empty string the caller supplied, and no two live entries name the same string | `P-HL-1` | `contract.md §5.1`; `identity-and-domain.md §1` |
| `I-2` | no minted handle exists anywhere in the instance's state | `P-HL-1` | `contract.md §5.1`; `identity-and-domain.md §1` item 2 |
| `I-3` | an entry with no function is not a lawful value, at any instant | `P-HL-1` | `identity-and-domain.md §2` item 5; `listen-verb.md §4` item 2 |
| `I-4` | every entry the old handle named is removed at every address, before the new element is installed | `P-HL-2` | `contract.md §5.2`; `listen-verb.md §3` item 1 |
| `I-5` | a refused pre-check leaves the old element whole — all four observables | `P-HL-2` | `contract.md §5.2`; `constraint-sites.md §1` item 3 |
| `I-6` | every element of `triggered` and of `pending` is a pair, at every instant | `P-HL-3` | `contract.md §5.3`; `trigger-and-pair.md §8` `TF-1`, `TF-7` |
| `I-7` | the pass's evaluated set is the pairs at the attempt's address, fixed when the pass begins | `P-HL-4` | `contract.md §5.4`; `kernel-selection.md §3` |
| `I-8` | one invocation per distinct handle per window, and the argument is the written address | `P-HL-5` | `contract.md §5.5`; `trigger-and-pair.md §5` |
| `I-9` | an identity is a store-side fact, deleted by exactly one act | `P-HL-6` | `contract.md §5.6`; `constraint-identity.md §3` |
| `I-10` | the product's own member set is the fourteen names, and no remove member is a module export | `P-HL-7` | `contract.md §5.7`; `removal-members.md §7` |
| `I-11` | the kernel's surface is six items, and `K-6` reaches the removal through the published member | `P-HL-8` | `contract.md §5.8`; `remove-member.md §2`, `§5` |
| `I-12` | a purge consults no count and enumerates no addresses — the CLASS probe | `P-HL-2` | `contract.md §5.2`; `listen-verb.md §3` item 2; `P: docs/pending.md · (Y-1)` |
| `I-13` | no bare handle stands in `pending` beside pairs — the CLASS probe for the retired union | `P-HL-3` | `contract.md §5.3`; `trigger-and-pair.md §3` item 3 |

---

## §5. What this inventory does NOT contain, stated so its absence is a decision

1. **IT CONTAINS NO CASE FOR A BEHAVIOUR THE CONTRACT DOES NOT PIN.** **Three subjects are explicitly UNSUPPORTED or `OWED` and hold NO row here: (i) a listener's or constraint's mid-window mutation of another entry — `UNSUPPORTED BEHAVIOUR`** (`P: docs/pending.md · (AA-6)`; `contract.md §2.2` item 9); **(ii) the state of `K-6` on a stale handle — `OWED`** (`contract.md §2.9` item 7); **(iii) the purge's numeric bound — no ruling states one** (`identity-and-domain.md §6`'s closing `NEGATIVE`). **A drive asserting any of the three would be asserting a behaviour the model declines to declare.** `[CONTRACT]`
2. **IT CONTAINS NO CASE THAT ASSERTS AN ORDER OVER `triggered` OR `pending`.** **`DD-37`/`DD-22` declare the order unobservable, and every row above that touches either list compares it as a SET** (`trigger-and-pair.md §8` `TF-5`; `docs/specs/storeroom-js/surface.md §2.7` item 3). `[NEGATIVE]`
3. **IT CONTAINS NO CASE THAT ASSERTS A COST.** **The `O(N_pairs)` scan `(AA-1)` accepts is a plan price and not an observable** (`implementation-plan.md §4`; `kernel-selection.md §6` item 1). `[NEGATIVE]`
4. **AND NO CASE HERE IS A GREEN.** **This file is a `view`: it declares no result, and its rows are checked against the contract's clauses and against nothing else.** `[CONTRACT]`
