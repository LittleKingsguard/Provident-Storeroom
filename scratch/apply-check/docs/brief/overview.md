# Provident-Storeroom — what it is, in one page

A structured tree of data that outlives the process that wrote it, keeps its own invariants, and tells you the truth about what happened. `use-cases.md` drives six of the things below and prints what each drive returned; `features.md` is the list a reader can check, with the command or the site behind every figure.

## The problem it solves

An application keeps state that is more than a blob: windows, tabs, documents, settings — each reachable by a path, each with rules that must hold (a ledger balances, a count stays in range, a key never points at a missing parent). Three demands come with that state.

**It must persist across processes.** The tree a process writes is the tree the next process reads; the application writes no serializer, no migration and no recovery path for it.

**It must keep its own invariants.** A rule belongs beside the data it is about, and it is asked on every edit that touches its address — not only in the one code path a programmer remembered to guard.

**It must tell you the truth about what happened.** A refused edit says what failed, why, the whole sequence of what was tried, and which act was refused, so a caller can decide rather than guess.

Provident-Storeroom is a small synchronous store for that shape: a tree of keys and lists, one value at each node, a tier of persistence you choose per write, constraints asked where the data lives, listeners that tell the world after the judgement, and one failure form for every refusal.

## The four ideas it is built on

1. **An address is a segment array, and `[]` is the register.** `['window','tabs',0]` is a path; segments are strings or non-negative integers; the empty array reads the whole register — `read([])` answered `{"window":{"tabs":{…}}}` on a store holding one branch. The register is the root of the same tree, at a tier fixed when the store is constructed (`file` when you name a `filePath`, `mem` otherwise).

2. **Values stand at tiers, and persistence is their order.** The three tokens are `mem`, `file` and `temp`, ordered `temp` < `mem` < `file`, and a child may not outrank its parent: a `file` value under a `mem` parent answered `ParentAnchorMonotonicityViolation`, *"a child anchor may not be more persistent than its parent"*. Only `file` survives a restart — a store reopened over its own `filePath` read `{"f":"file-value"}` and answered `AddressNotFound` for the `mem` and `temp` keys the previous process had written.

3. **A constraint pass judges every edit against the pairs that watch it; a repair is atomic with the write it repairs; a listener is discrete, runs after the pass, and is for telling the world.** A pair is an address plus a function. The pass asks the pairs at the act's address and at its ancestors, and a pair below the act when the act changes what stands there: a write of `{c:2}` at `['a','b']` asked the pair at `['a','b','c']` once and the pair at `['a','b','e']` zero times, while `{c:2,e:9}` asked both once. A refused write throws and its commit is rolled back. A pair may answer with a repair, whose write joins the same commit — the caller's write record carried the repair's own op. A listener is registered under the caller's own handle, runs once every constraint has passed, and is called with the act's address.

4. **One plain failure form says what failed, why, the whole story, and which act.** Every refusal is a thrown plain object with exactly four own members: `status` (a member of the store's closed twenty-code set), `message` (the store's own generated sentence), `log` (the commit's message entries, oldest first — `[]` where the cause had no attempt), and `address` (the act the refusal is about, or `null` where no address is nameable). **Compare `address` with the address you wrote**: equal means your own act was refused, different means a listener's was and your write stood.

## What it is not

- **No schema language.** No type declaration, no migration, no validator. A value is admitted by the store's own walk; a rule you want enforced is a function you register at an address.
- **No query language.** The readers are `read`, `readLiteral` and `constraints`; there is no selector, no filter, no projection, and no read-side enforcement of a constraint.
- **No network API.** The shipped modules import no socket, no HTTP client and no server; the store is a library in your process.
- **One process per store.** Two instances opened over one `filePath` did not see each other's writes, and the later writer's file replaced the earlier one's; the store coordinates across instances through no channel at all.

## The shape of an answer

A **write** answers its record — `{ op, watched, triggered }` — where `op` is the store's own journal record (`{opId, kind, address, tier, before, after, seq, compacted}`), `watched` is the listener addresses the act reached (`[["win"]]` with a listener standing at `['win']`, `[]` when no listener was in reach), and `triggered` is the `{handle, address}` pairs it fired. A **delete** answers `{ address, tiers, triggered, op }`, and a delete at a tier holding no version is a success with `tiers: []` and `op: null`.

A **refusal** throws four members, and the address the act wrote is as it stood before the refused act:

```
ConstraintPassRefused | address ["ledger","debits"] | log ["constraint-check","outcome/KC-3"]
  message: ledger must balance: 40 vs 0
```

## Where this set lives

These three documents live at `docs/brief/`, beside the specification tree and the consumer guide, and they are not packed into the published npm package: the manifest's allowlist names seven package-root paths, the packed artefact's twenty members include no path under `docs/`, and the shipped-document guard covers exactly the three documents staged at the package root. Putting this set into an install needs a landing copy at the package root and the assembly stage that produces it — a packaging change, and a separate act.

Every figure here was measured against this tree; `features.md` carries the site or the command beside each one, and names plainly what could not be measured.
