// tests/e2e/blind-entry-module.test.mjs
//
// BLIND INSTRUMENT — THE ENTRY'S OWN MODULE SURFACE: the ONE module name, the ONE value-level export
// (`storeCreate`) against the twenty-one TYPE names the declaration carries, the four `StoreConfig` keys
// and which of them are optional, the absence of every non-export (no kernel item, no `version`, no
// `errorMessage`, no addon `register`/`call`), the declaration's own type surface as a consumer reads it,
// and the ONE `exports` arm's consequence — what a consumer can and cannot reach BY SPECIFIER.
//
// PROVENANCE. Every expectation in this file is authored from the DECLARED SURFACE and from nothing else:
//   · `bindings/js/index.d.ts` — the published declaration of record (primary input): its own head block
//     (three declared things and nothing else; ONE named export; FOURTEEN own members; the three-member
//     failure form), `Address`, `Tier`, `TierSet`, `StoreConfig`, `StoreStatus`, `LogEntry`, `StoreRefusal`,
//     `Handle`, `Listener`, `BaseState`, `JournalOp`, `WriteRecord`, `DeleteRecord`, `RollbackRecord`,
//     `AttemptRef`, `CommitRecord`, `StoreInstance`, `ConstraintPair`, `Constraint`, `ConstraintIdentity`
//   · `docs/specs/storeroom-publish/contract.md` §2.4 (the authored declaration, its `types` carriage and
//     the allowlist) · §2.1 (the allowlist) · §1.1 (the resolution) · `PUB-DD-3`, `PUB-DD-21`
//   · `archive/pre-strata-docs-2026-10-24/docs/specs/storeroom-js/package.md` §1.3 items 1–4 (the ONE
//     arms-bearing entry, the refused wildcard, the entry's own shape and the addon's FIVE INTERNAL names)
//   · `docs/specs/storeroom-js/contract.md` §2.9 item 1 (the module namespace's one name) and `DD-24`
//   · `docs/specs/storeroom-constraints/kernel-surface.md` §1 item 2's extent (`K-1`…`K-6`) — read at the
//     archive, where the extent's amended clause stands; and `docs/specs/storeroom-held-listener-identity/
//     contract.md` §2.7 item 9 (the FOURTEEN own members) and §2.9 item 3 (`K-6 remove(store, pair)`)
//
// One battery file WOULD have been read and was NOT: the six existing blind instances were read ONLY to
// avoid duplicating a cell (`blind-entry-surface.test.mjs` already drives the namespace's one name, the
// fourteen members and the four config keys' RUNTIME refusals; `blind-package-surface.test.mjs` already
// drives the `exports` arm's SHAPE and the allowlist). Nothing of theirs is re-authored here: this file
// reads the DECLARATION as a consumer reads it, and it drives what a consumer can reach BY SPECIFIER.
// NO byte of `bindings/js/index.mjs`, `bindings/js/src/**` or `src/**` was read, no other battery or runner
// under `tests/**` was read, and NO CELL OPENS A `docs/**` PATH AT RUNTIME (`D-17`): every expectation below
// is a LITERAL written here. The declaration file this file reads at runtime is THE ARTEFACT UNDER TEST —
// the hand-authored `index.d.ts` the package's `types` field reaches and its allowlist ships — and not a
// document.
//
// EACH CELL NAMES ITS CLAUSE AS `path §section`. A reader must be able to tell whether a cell was derived
// from the surface or inherited from the code.

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, symlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as entry from '../../bindings/js/index.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(here, '..', '..', 'bindings', 'js');
const DECLARATION = readFileSync(join(PACKAGE_DIR, 'index.d.ts'), 'utf8');

// ---------------------------------------------------------------------------------------------
// THE DECLARED LITERALS THIS FILE ASSERTS AGAINST — transcribed from the surface, never computed.
// ---------------------------------------------------------------------------------------------

/** `package.md §1.3 item 3`: the namespace's NAMED EXPORTS are the surface's verbs and the factory "and
 *  NOTHING ELSE" — read at `surface.md §2.9` item 1's `A127` clause as ONE name, `11 → 1` ✓. */
const ONE_VALUE_EXPORT = 'storeCreate';

/** Every `export type`/`export interface` the declaration carries, as a consumer imports them. Nothing
 *  here is a value: `index.d.ts`'s head declares the argument and answer SHAPES beside the one name. */
const DECLARED_TYPE_NAMES = [
  'Address',
  'Tier',
  'TierSet',
  'StoreConfig',
  'StoreStatus',
  'LogEntry',
  'StoreRefusal',
  'Handle',
  'Listener',
  'BaseState',
  'JournalOp',
  'WriteRecord',
  'TriggerPair',
  'DeleteRecord',
  'RollbackRecord',
  'AttemptRef',
  'CommitRecord',
  'StoreInstance',
  'ConstraintPair',
  'Constraint',
  'ConstraintIdentity',
];

/** `kernel-surface.md §1` item 2's amended extent: SIX items, `5 + 1 = 6` ✓ — `K-1` `register` · `K-2`
 *  `commit` · `K-3` `runAttempt` · `K-4` `log` · `K-5` `report` · `K-6` `remove` (`R-B2`). */
const KERNEL_ITEMS = ['register', 'commit', 'runAttempt', 'log', 'report', 'remove'];

/** `package.md §1.3` item 4: the internal addon's export set is EXACTLY FIVE NAMES AND NO SIXTH —
 *  `version` · `errorMessage` · `storeCreate` · `call` · `register`. Each is INTERNAL: none is a named
 *  export of the claimed ESM entry, and the artefact is reachable only through the entry's module-private
 *  key. */
const ADDON_NAMES = ['version', 'errorMessage', 'storeCreate', 'call', 'register'];

/** `held-listener contract.md §2.7` item 9: the member set `14`, `10 + 1 + 1 + 2 = 14` ✓. */
const FOURTEEN = [
  'read',
  'readLiteral',
  'write',
  'delete',
  'rollback',
  'listen',
  'unlisten',
  'addConstraint',
  'constraintOn',
  'constraintOff',
  'register',
  'constraints',
  'removeListener',
  'removeConstraint',
];

/** The store's closed set as the declaration enumerates it: TWENTY literals ranked `1`…`20`, with
 *  `ValueRefusedAtBoundary` at `17`, `ConstraintBodyThrew` at `18`, `ConstraintRefusedAtRegistration` at
 *  `19` and `ConstraintPassRefused` at `20` appended last, and the `(string & {})` escape arm after them.
 *
 *  **⟶ RE-DERIVED 2026-10-26 (`DEF-S`/`DEF-N`; the architect, verbatim: *"Expand the returned error set for
 *  both S/N"*).** The array's name, its figure and the cell's title move together, because a blind census
 *  that kept `17` would be asserting the superseded set: **no rank of `1`…`17` moves, and the two appended
 *  terms are the body-throw arm and the registration-verdict arm.**
 *
 *  **⟶ AND RE-DERIVED AGAIN 2026-10-26 (`DEF-H`/`DEF-W`; the architect, verbatim: *"Expand the returned
 *  fail-state list to include the refusal"* and *"Assert the constraints on rollback"*).** The name, the
 *  figure and the title move together again, for the same reason: the appended term is `ConstraintPassRefused`
 *  at rank `20` — the ONE member a CONSTRAINT REFUSAL answers with, at the write's attempt (`DEF-H`) and at a
 *  reversal whose terminal state a registered constraint refuses (`DEF-W`) — **no rank of `1`…`19` moves, and
 *  `FileCommitFailed` keeps rank `15` as the SAVE's code.** */
const TWENTY = [
  'AddressMalformed',
  'AddressNotFound',
  'LeafHasNoDownstream',
  'TierNotFound',
  'OutOfDomainTier',
  'ParentAnchorMonotonicityViolation',
  'ContainerKindConflict',
  'ReadTargetIsBranch',
  'WriteParentNotLink',
  'JournalOpUnknown',
  'RollbackCompacted',
  'ConstructionArgumentMissing',
  'FilePathUnreachable',
  'ValueNotAdmitted',
  'FileCommitFailed',
  'ConstraintListInvalid',
  'ValueRefusedAtBoundary',
  // ⟶ APPENDED 2026-10-26 (`DEF-S`, `DEF-N`; the architect's ruling on the downstream claims).
  'ConstraintBodyThrew',
  'ConstraintRefusedAtRegistration',
  // ⟶ APPENDED 2026-10-26 (`DEF-H`, `DEF-W`; the ruling on the refusal and on the reversal).
  'ConstraintPassRefused',
];

// ---------------------------------------------------------------------------------------------
// THE DECLARATION READ AS A CONSUMER'S TEXT — three parsers, each stated so nothing is inferred.
// ---------------------------------------------------------------------------------------------

/** Every `export function|const|let|var|class NAME` — the VALUE-level exports, one line each. */
const valueExports = () => {
  const found = [];
  for (const line of DECLARATION.split('\n')) {
    const match = /^export (?:function|const|let|var|class)\s+([A-Za-z_$][\w$]*)/.exec(line);
    if (match) found.push(match[1]);
  }
  return found;
};

/** Every `export type|interface NAME` — the TYPE-level exports, one line each. */
const typeExports = () => {
  const found = [];
  for (const line of DECLARATION.split('\n')) {
    const match = /^export (?:type|interface)\s+([A-Za-z_$][\w$]*)/.exec(line);
    if (match) found.push(match[1]);
  }
  return found;
};

/** The member names of one `export interface NAME { … }` block: the lines at the block's own two-space
 *  depth, each carrying its optional marker where the declaration carries one. A nested inline object
 *  stands at four spaces and is therefore not a member of the outer record. */
const membersOf = (name) => {
  const lines = DECLARATION.split('\n');
  const open = lines.findIndex((line) => line.startsWith(`export interface ${name} {`));
  assert.notEqual(open, -1, `the declaration carries no \`export interface ${name}\``);
  const members = [];
  for (let i = open + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line === '}') break;
    const match = /^ {2}(?:readonly )?([A-Za-z_$][\w$]*)(\??)\s*(?::|\()/.exec(line);
    if (match) members.push({ name: match[1], optional: match[2] === '?' });
  }
  return members;
};

/** The `StoreStatus` union's literal arms, in the declaration's own order. */
const statusLiterals = () => {
  const lines = DECLARATION.split('\n');
  const open = lines.findIndex((line) => line.startsWith('export type StoreStatus ='));
  assert.notEqual(open, -1, 'the declaration carries no `export type StoreStatus`');
  const literals = [];
  for (let i = open + 1; i < lines.length; i += 1) {
    if (!lines[i].trim().startsWith('|')) break; // the union's arms are one `|`-led line each
    const match = /'([A-Za-z]+)'/.exec(lines[i]);
    if (match) literals.push(match[1]);
    if (/\(string & \{\}\)/.test(lines[i])) break; // the escape arm closes the literal run
  }
  return literals;
};

/** A temp install of the package under its OWN name, so a consumer's specifier is resolved by the map
 *  and by nothing else. The child process runs IN that directory, which is what makes the parent URL a
 *  consumer's and not this repository's. */
const withConsumerInstall = (run) => {
  const root = mkdtempSync(join(tmpdir(), 'entry-module-'));
  mkdirSync(join(root, 'node_modules'));
  symlinkSync(PACKAGE_DIR, join(root, 'node_modules', 'provident-storeroom'), 'dir');
  return run(root);
};

/** One child `import` of `specifier`, its namespace keys or its refusal code printed to stdout. */
const importFromConsumer = (root, specifier) => {
  const code = [
    `import(${JSON.stringify(specifier)})`,
    `  .then((m) => console.log('OK ' + JSON.stringify(Object.keys(m).sort())))`,
    `  .catch((e) => console.log('ERR ' + (e && e.code ? e.code : String(e))));`,
  ].join('\n');
  const child = spawnSync(process.execPath, ['--input-type=module', '-e', code], {
    cwd: root,
    encoding: 'utf8',
  });
  return child.stdout.trim();
};

// ---------------------------------------------------------------------------------------------
// THE CELLS
// ---------------------------------------------------------------------------------------------

test('entry-module · package.md §1.3 item 3 and §1.3 item 4 · THE VALUE-LEVEL EXPORT SET IS ONE NAME: `storeCreate`, and every other `export` the declaration carries is a TYPE', () => {
  assert.deepEqual(valueExports(), [ONE_VALUE_EXPORT]);
  assert.deepEqual(
    [...typeExports()].sort(),
    [...DECLARED_TYPE_NAMES].sort(),
    'the declaration declares twenty-one argument/answer shapes beside its one name',
  );
});

test('entry-module · package.md §1.3 item 3 · THE RUNTIME NAMESPACE CARRIES EXACTLY ONE OWN NAME — and the twenty-one declared type names are ERASED, because a type is not a value', () => {
  assert.deepEqual(Object.keys(entry), [ONE_VALUE_EXPORT]);
  for (const name of DECLARED_TYPE_NAMES) {
    assert.equal(entry[name], undefined, `${name} is a TYPE and must not be a runtime value`);
  }
  assert.equal(typeof entry[ONE_VALUE_EXPORT], 'function');
});

test('entry-module · kernel-surface.md §1 item 2 (the amended extent, `5 + 1 = 6`) · NOT ONE KERNEL ITEM IS A NAME OF THE ENTRY — the kernel is INTERNAL ORCHESTRATION and a consumer holding the entry holds no `register`, `commit`, `runAttempt`, `log`, `report` or `remove`', () => {
  for (const item of KERNEL_ITEMS) {
    assert.equal(entry[item], undefined, `the kernel item ${item} is not reachable through the entry`);
    assert.equal(item in entry, false, `${item} is not an own name of the module namespace`);
  }
  // The instance's own member `register` is NOT the kernel's `K-1`: a namespace name and a member name are
  // two positions, and the entry exposes no namespace-level `register`.
  assert.equal(FOURTEEN.includes('register'), true);
  assert.equal(Object.keys(entry).includes('register'), false);
});

test('entry-module · package.md §1.3 item 4 · THE ADDON\'S FIVE NAMES ARE ALL INTERNAL: `version`, `errorMessage`, `call` and the addon\'s own `storeCreate` reach a consumer NOWHERE, and no addon handle is exposed', () => {
  for (const name of ADDON_NAMES) {
    if (name === ONE_VALUE_EXPORT) continue; // the PACKAGE'S factory, and not the addon's internal one
    assert.equal(entry[name], undefined, `the addon's ${name} is internal and not a named export`);
  }
  for (const name of ['addon', 'native', 'binding', 'errorMessage', 'version', 'call']) {
    assert.equal(name in entry, false, `the entry exposes no ${name}`);
  }
});

test('entry-module · index.d.ts `StoreConfig` · THE CONFIG CARRIES FOUR DECLARED KEYS AND EXACTLY TWO OF THEM ARE REQUIRED — `journalLength` and `listeners`; `filePath` and `constraints` carry the optional marker', () => {
  assert.deepEqual(membersOf('StoreConfig'), [
    { name: 'journalLength', optional: false },
    { name: 'listeners', optional: false },
    { name: 'filePath', optional: true },
    { name: 'constraints', optional: true },
  ]);
});

test('entry-module · index.d.ts `StoreConfig.constraints` (`D-26`) · the batch ELEMENT is THREE members — `address`, `id`, `constraint` — and the FUNCTION is REQUIRED, so no element is admissible without its substance', () => {
  const block = DECLARATION.slice(DECLARATION.indexOf('readonly constraints?: readonly {'));
  const element = block.slice(0, block.indexOf('}[]'));
  assert.match(element, /readonly address: Address;/);
  assert.match(element, /readonly id: string;/);
  assert.match(element, /readonly constraint: Constraint;/);
  assert.equal(/constraint\?/.test(element), false, 'the constraint member is REQUIRED, not optional');
});

test('entry-module · index.d.ts `Address` · `Tier` · `TierSet` · the three address shapes as a consumer compiles them: a segment is a string key OR a non-negative integer, the tier is the store\'s THREE tokens, and the reader\'s set is the token or an array of tokens', () => {
  assert.match(DECLARATION, /^export type Address = readonly \(string \| number\)\[\];$/m);
  assert.match(DECLARATION, /^export type Tier = 'mem' \| 'file' \| 'temp';$/m);
  assert.match(DECLARATION, /^export type TierSet = Tier \| readonly Tier\[\];$/m);
  // `TierSet` carries NO `undefined` member: the SUPPLIED-`undefined` distinction is a runtime one and the
  // declaration cannot express it.
  const tierSet = DECLARATION.match(/^export type TierSet = (.*);$/m);
  assert.equal(tierSet[1].includes('undefined'), false);
});

test('entry-module · index.d.ts `Handle` and `Listener` · the handle is a `string` the CALLER spells, and the listener takes the TRIGGERING ADDRESS as its ONE argument', () => {
  assert.match(DECLARATION, /^export type Handle = string;$/m);
  assert.match(DECLARATION, /^export type Listener = \(address: Address\) => void;$/m);
  // The listener's one position is an address and not a record, a handle or a pair.
  assert.equal(/Listener = \(address: Address\)/.test(DECLARATION), true);
});

// **⟶ THE TITLE MOVES WITH THE COUNT, 2026-10-26** (`DEF-S`/`DEF-N`; *"Expand the returned error set for both
// S/N"*): the set the declaration publishes is `19`; the cells below are the same reads and their
// expectations are the ruling's. **AND IT MOVES AGAIN WITH THE NEXT COUNT** (`DEF-H`/`DEF-W`; *"Expand the
// returned fail-state list to include the refusal"*): the declaration publishes `20`.
test('entry-module · index.d.ts `StoreStatus` · THE CLOSED SET READS TWENTY LITERALS RANKED `1`…`20`, the last three being `ConstraintBodyThrew`, `ConstraintRefusedAtRegistration` and `ConstraintPassRefused`, and the `(string & {})` ESCAPE ARM STANDS AFTER THEM', () => {
  assert.deepEqual(statusLiterals(), TWENTY);
  assert.equal(TWENTY.length, 20);
  assert.match(DECLARATION, /\| \(string & \{\}\);/);
});

test('entry-module · index.d.ts `StoreRefusal` and `LogEntry` · the failure form is THREE members and the log entry is SIX — `{seq, kind, id, message, opId, state}` — with `kind` the kernel\'s closed four-member set', () => {
  assert.deepEqual(
    membersOf('StoreRefusal').map((member) => member.name),
    ['status', 'message', 'log'],
  );
  assert.deepEqual(
    membersOf('LogEntry').map((member) => member.name),
    ['seq', 'kind', 'id', 'message', 'opId', 'state'],
  );
  assert.match(DECLARATION, /readonly kind: 'constraint-check' \| 'repair-run' \| 'commit' \| 'outcome';/);
});

test('entry-module · index.d.ts `WriteRecord` · `DeleteRecord` · `RollbackRecord` · the three verb records a consumer reads: three members on the write and the reversal, FOUR on the delete — its `op` beside the three — and `undoneOps` is the LIST of the ids the reversal undid', () => {
  assert.deepEqual(membersOf('WriteRecord').map((m) => m.name), ['op', 'watched', 'triggered']);
  // ⟶ **`D-43` ITEM 3 (`strata/decisions.md`, verbatim: *"Delete should be journaled and reversible"*): THE
  // DELETE RECORD GAINS `op`, THE MEMBER `WriteRecord` CARRIES AT THE SAME NAME** — one spelling for "the op
  // this act landed", so `rollback(record.op.opId)` reverses the delete. The fourteen instance members and
  // the closed status set are unmoved; this is a RECORD's shape.
  assert.deepEqual(membersOf('DeleteRecord').map((m) => m.name), ['address', 'tiers', 'triggered', 'op']);
  assert.deepEqual(membersOf('RollbackRecord').map((m) => m.name), ['opId', 'undoneOps', 'restoredTo']);
  assert.match(DECLARATION, /readonly undoneOps: readonly string\[\];/);
});

test('entry-module · index.d.ts `CommitRecord` · `AttemptRef` · `JournalOp` · `BaseState` · `ConstraintPair` · the kernel-side record the write\'s fourth position takes is FOUR members, the attempt identity is ONE, the journal op is EIGHT, and the pair is TWO', () => {
  assert.deepEqual(membersOf('CommitRecord').map((m) => m.name), ['attempt', 'op', 'triggered', 'pending']);
  assert.deepEqual(membersOf('AttemptRef').map((m) => m.name), ['id']);
  assert.deepEqual(membersOf('JournalOp').map((m) => m.name), [
    'opId',
    'kind',
    'address',
    'tier',
    'before',
    'after',
    'seq',
    'compacted',
  ]);
  assert.deepEqual(membersOf('BaseState').map((m) => m.name), ['present', 'value']);
  assert.deepEqual(membersOf('ConstraintPair').map((m) => m.name), ['address', 'id']);
});

test('entry-module · index.d.ts `StoreInstance` (held-listener contract.md §2.7 item 9) · THE INSTANCE DECLARES EXACTLY FOURTEEN OWN MEMBERS, and NOT ONE of them is a name of the module namespace', () => {
  const declared = membersOf('StoreInstance').map((m) => m.name);
  assert.equal(declared.length, 14);
  assert.deepEqual([...declared].sort(), [...FOURTEEN].sort());
  assert.equal(FOURTEEN.length, 14);
  const namespace = new Set(Object.keys(entry));
  for (const member of FOURTEEN) {
    assert.equal(namespace.has(member), false, `${member} is a member of the product and not a namespace name`);
  }
});

test('entry-module · package.md §1.3 item 1 (and its §1.3 item 4) · THE ONE `exports` ARM\'S CONSEQUENCE: the bare specifier resolves to the entry and NOTHING ELSE does — `index.mjs` and the declaration file are both refused by the map', () => {
  withConsumerInstall((root) => {
    assert.equal(importFromConsumer(root, 'provident-storeroom'), `OK ["${ONE_VALUE_EXPORT}"]`);
    assert.equal(importFromConsumer(root, 'provident-storeroom/index.mjs'), 'ERR ERR_PACKAGE_PATH_NOT_EXPORTED');
    assert.equal(importFromConsumer(root, 'provident-storeroom/index.d.ts'), 'ERR ERR_PACKAGE_PATH_NOT_EXPORTED');
    assert.equal(importFromConsumer(root, 'provident-storeroom/src/entry'), 'ERR ERR_PACKAGE_PATH_NOT_EXPORTED');
  });
});

test('entry-module · distribution.md §5.2 item 4 · THE DECLARATION DECLARES NO STORE TYPE, NO STORE VERB AND NO RELEASE VERB: `findAddress`, `dispose`, `close`, `flush`, `settle` and `constraintLog` are declared NOWHERE — not as an export and not as an instance member', () => {
  const declared = new Set([
    ...valueExports(),
    ...typeExports(),
    ...membersOf('StoreInstance').map((member) => member.name),
  ]);
  for (const forbidden of ['findAddress', 'dispose', 'close', 'flush', 'settle', 'constraintLog']) {
    assert.equal(declared.has(forbidden), false, `the declaration must not carry ${forbidden}`);
  }
  assert.equal((DECLARATION.match(/^export function/gm) ?? []).length, 1);
});
