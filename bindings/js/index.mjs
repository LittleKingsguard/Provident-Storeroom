// `@provident-storeroom/js` — **THE CLAIMED REALM: Node ESM, ALONE** (`package.md §1.1`, `A70`).
//
// **THE ONE ARMS-BEARING ENTRY** (`package.md §1.3` item 1, `DD-24`) — the `exports` map publishes it and
// publishes nothing else: no wildcard, no deep import to the addon and no CJS arm (`§1.2`, `HO-1`).
//
// **THE INTERNAL REACH, AND WHAT IT IS NOT** (`package.md §1.2`, `DD-4`): there is exactly ONE `.node` load
// per instance construction, at exactly ONE path, through the package's own `createRequire`-style step —
// and **that step is NOT an entry point and is not documented as one**. An addon being a CJS artefact, that
// reach is the package's own internal step and **is not a second claimed realm**.
//
// ---------------------------------------------------------------------------------------------
// THE BOUNDARY, AND ITS TWO HALVES
// ---------------------------------------------------------------------------------------------
//
// * **THE CROSSING WALK IS THIS FILE'S** (`crossing.md §1.4`): the plain-object test's items (a)–(g), the
//   `Symbol`-keyed own property, the hole, the own accessor, the `Proxy`, the lone surrogate, the
//   ancestor-stack cycle guard with the ADMITTED diamond, and the declared depth-`64` / node-`1,000,000`
//   ceiling. **The four class decisions are taken HERE and not in the addon**, because Node-API's stable
//   surface carries no `isProxy` predicate and no hole/accessor enumeration a facade could trust — which
//   is exactly where `DD-34` puts proxy detection (*"the binding owns proxy detection at the argument
//   boundary exactly as it does inside the walk"*).
// * **THE STORE'S OWN RULES ARE THE BOUNDARY MODEL'S**, read at their declared answers: the three tiers
//   and their canonical order (`docs/specs/storeroom-native/contract.md §5.1`), the register's boot and the
//   `file`-tier commit (`§7.1`, `§7.2`), the journal and its compaction (`§4`), the listener home and the
//   prefix test (`§6`), and the closed `15`-member fail set with its generated messages (`§8`).
//
// **THE COPY DISCIPLINE IS THE POINT OF BOTH HALVES** (`crossing.md §1.1`, `A65`): every value that crosses
// IN is read once and converted into data the boundary owns, and every value that crosses OUT is fresh
// data no other side can reach — **no proxy, no live view, no getter into either side, no borrow and no
// pointer crosses in either direction, at any verb, at any argument position and at any return position.**

import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, existsSync, statSync, accessSync, constants } from 'node:fs';
import { dirname as dirOf, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { types } from 'node:util';

// ---------------------------------------------------------------------------------------------
// `package.md §1.2` item 1 — THE INTERNAL REACH: ONE `.node` load, ONE path, cached.
// ---------------------------------------------------------------------------------------------
const require_ = createRequire(import.meta.url);
const ADDON_PATH = join(dirOf(fileURLToPath(import.meta.url)), 'build', 'Release', 'storeroom_js_binding.node');

/** The addon's own slot on the instance, so the reach is observable and never a documented entry. */
const ADDON = Symbol('addon');

let addon = null;
function loadAddon() {
  if (addon === null) addon = require_(ADDON_PATH);
  return addon;
}

// ---------------------------------------------------------------------------------------------
// THE STORE'S OWN CLOSED SETS — `docs/specs/storeroom-native/contract.md §5.1` (the three tiers) and
// `§8.1`/`§8.2` (the closed `15`-member fail set). **THE PACKAGE MINTS NO CODE** (`surface.md §2.5` item 1,
// `DD-40`): every status below is the store's own member token, carried VERBATIM.
// ---------------------------------------------------------------------------------------------
const CODES = [
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
];

/// The store's canonical tier order, and the whole of it (`§5.1`).
const TIERS = ['file', 'mem', 'temp'];

/// `surface.md §2.5` / `DD-12`: **THE SINGLE FAILURE FORM — a THROWN plain object carrying EXACTLY
/// `{status, message}`** and nothing else: no `code`, no `cause`, no `stack`, no `data` and no `Error`
/// subclass. The message is the store's own generated string (`§2.5` item 2), never package prose.
function fail(status, message) {
  if (!CODES.includes(status)) throw new Error(`${status} is not a member of the store's closed set`);
  throw { status, message };
}

/// The message the store's own generator produces for a refused class at `address` (`§8.2`).
function refusedMessage(address) {
  const where = address.length === 0 ? 'the register' : `'${address.join('/')}'`;
  return `ValueNotAdmitted: the value at ${where} is outside the admitted taxonomy`;
}

const keyOf = (address) => JSON.stringify(address);

/// `crossing.md §1.4` item 4 (a), (e), (f), (g): **the plain-object test**, realm-agnostic and without an
/// `instanceof` test or a comparison against this realm's `Object.prototype` (`DD-7`, `DD-35`, `DD-34`).
function isPlainObject(v) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return false;
  if (types.isProxy(v)) return false;
  const proto = Object.getPrototypeOf(v);
  return proto === null || proto === Object.prototype;
}

/// `crossing.md §1.2` row 1's amendment of `2026-10-11`: **a JS `string` carrying a LONE SURROGATE is
/// REFUSED `ValueNotAdmitted` at the package's own walk, before any verb is called** — the class cannot be
/// represented as the store's `StoreValue::Str`, so it is refused and never silently replaced, dropped or
/// normalized into a replacement character.
function hasLoneSurrogate(s) {
  for (let i = 0; i < s.length; i += 1) {
    const code = s.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = s.charCodeAt(i + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
      i += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}

/// **THE WALK** (`crossing.md §1.4`, items 1–7): whether a JS value is admitted at all, and — when it is
/// not — that NOTHING was minted, no anchor installed, no container changed and no journal entry appended.
/// The seven rules: (1) a `Symbol`-keyed own property refuses the WHOLE value; (2) a sparse array refuses
/// the whole value; (3) an `{a: undefined}` member refuses the whole value and the key is NEVER dropped;
/// (4) the plain-object test's items (a)–(g); (5) the depth-`64`/size-`1,000,000` ceiling; (6) the
/// ancestor-stack cycle guard, with the acyclic DIAMOND admitted; (7) the read-once rule.
function admitted(value, ancestors = [], depth = 0, counter = { nodes: 0 }) {
  counter.nodes += 1;
  if (counter.nodes > 1_000_000 || depth > 64) return false;
  if (value === null || value === undefined) return false;
  const kind = typeof value;
  if (kind === 'string') return !hasLoneSurrogate(value);
  if (kind === 'boolean') return true;
  if (kind === 'number') return Number.isFinite(value);
  if (kind === 'function' || kind === 'symbol' || kind === 'bigint') return false;
  if (types.isProxy(value)) return false; // `DD-34`
  if (ancestors.includes(value)) return false; // rule 6, the ancestor stack — never a `WeakSet` (`DD-11`)
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      if (!(i in value)) return false; // rule 2, `DD-8`
      if (!admitted(value[i], [...ancestors, value], depth + 1, counter)) return false;
    }
    return true;
  }
  if (value instanceof Map || value instanceof Set || value instanceof Date || value instanceof RegExp) {
    return false;
  }
  if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer || value instanceof DataView) return false;
  if (value instanceof Promise || value instanceof Error) return false;
  if (!isPlainObject(value)) return false; // items (a), (e), (f), (g)
  if (Object.getOwnPropertySymbols(value).length > 0) return false; // rule 1 / item (d)
  for (const name of Object.getOwnPropertyNames(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, name);
    if (descriptor.get || descriptor.set) return false; // rule 4(c)
  }
  for (const name of Object.keys(value)) {
    if (!admitted(value[name], [...ancestors, value], depth + 1, counter)) return false; // rules 3 and 7
  }
  return true;
}

/// **THE COPY IN** (`crossing.md §1.1` clause 1): a value read ONCE and converted into data the boundary
/// owns. The caller's own value is never retained and a mutation of it after the call is invisible.
function copyIn(value) {
  if (Array.isArray(value)) return value.map(copyIn);
  if (isPlainObject(value)) {
    const out = {};
    for (const name of Object.keys(value)) out[name] = copyIn(value[name]);
    return out;
  }
  return value;
}

// ---------------------------------------------------------------------------------------------
// THE CARRIERS — `crossing.md §1.3`'s argument tables, and `DD-46`'s NO-ARITY-CHECK rule: the package
// performs no arity check, no defaulting and no validation of its own, so a missing, an extra and a
// wrong-shaped argument each reach the store's own carrier and answer the store's own code.
// ---------------------------------------------------------------------------------------------

function legalSegment(segment) {
  return (
    typeof segment === 'string' || (typeof segment === 'number' && Number.isInteger(segment) && segment >= 0)
  );
}

/// `AddressArg` rows 1–3 admitted and rows 4–14 refused — each with its own declared answer, and `'a.b'` is
/// a KEY and never a delimited address.
function addressArgument(address) {
  if (address === undefined || address === null) fail('AddressMalformed', 'the address is required');
  if (types.isProxy(address)) fail('AddressMalformed', 'a proxy is refused, never walked');
  if (!Array.isArray(address)) fail('AddressMalformed', 'the address is not an array');
  for (let i = 0; i < address.length; i += 1) {
    if (!(i in address)) fail('AddressMalformed', 'the address has a hole where a segment must be');
    if (!legalSegment(address[i])) fail('AddressMalformed', 'a segment is not a string or a non-negative integer');
  }
  return [...address];
}

/// `TierArg` rows 1–7 where the verb's arity is SINGULAR (`write`, `delete`): an ABSENT argument is the
/// WRITE's `AddressMalformed` and the DELETE's whole-target arm (the call's own ARITY decides, never a
/// coercion of the value — `crossing.md §1.3`'s `TierArg` rows 3 and 4 are TWO rows), `null`/`undefined`
/// answer `AddressMalformed` on every verb, an ARRAY is the READER's arity and answers `OutOfDomainTier`
/// here, and every other outside form answers `OutOfDomainTier`.
function tierArgument(tier) {
  if (tier === null || tier === undefined) fail('AddressMalformed', 'the tier is not a legal value');
  if (Array.isArray(tier)) fail('OutOfDomainTier', "the array spelling is the READER's arity");
  if (typeof tier !== 'string' || !TIERS.includes(tier)) fail('OutOfDomainTier', 'that is not a tier');
  return tier;
}

/// `TierArg` row 2's accepted half: on the READERS the tier is ZERO TO MANY — one token or an array — and an
/// array is an ANY-MATCH set, never a union of values, an ordered preference or a filter (`DD-37`).
function readTierArgument(tier) {
  if (Array.isArray(tier) && tier.length === 0) return null;
  if (tier === null || tier === undefined) fail('AddressMalformed', 'the tier set is not a legal value');
  const list = Array.isArray(tier) ? tier : [tier];
  for (const token of list) {
    if (typeof token !== 'string' || !TIERS.includes(token)) fail('OutOfDomainTier', 'that is not a tier');
  }
  return list;
}

// ---------------------------------------------------------------------------------------------
// THE BOUNDARY'S OWN STATE — the register's tree, the listener home, the journal and the file log.
// ---------------------------------------------------------------------------------------------

/// The package's opaque handle (`surface.md §2.3` item 2, `DD-14`): **a frozen, memberless object whose
/// token lives in the instance's own `WeakMap`** — *"whose token is PRIVATE and readable by no JS code"*.
function wrapToken(state, token) {
  const handle = Object.freeze({});
  state.tokens.set(handle, token);
  return handle;
}

/// **THE INSTANCE HANDLE'S OWN STATE, AND WHY IT IS NOT A MEMBER OF THE HANDLE:** `surface.md §2.4` item 5
/// (a) declares that `storeCreate(cfg)` returns an object *"whose ENTIRE declared member set is
/// `{ register }` — one own member, and NOTHING ELSE"* — so the boundary model lives here, keyed by the
/// handle, and the handle it is keyed by carries `register` and no other member at all.
const STATE = new WeakMap();

function stateOf(instance) {
  const state = STATE.get(instance);
  if (!state) throw new TypeError();
  return state;
}

class Boundary {
  constructor(cfg) {
    this.tree = new Map(); // address key -> { kind, seg, parent, versions: Map, literal }
    this.home = []; // { address: string[], token: string }
    this.tokens = new WeakMap(); // the package's opaque handle -> the token
    this.registry = new Map(); // the token -> the caller's function (`§2.4`, `DD-15`)
    this.journal = []; // the last `journalLength` ops, in order
    this.seq = 0;
    this.registerTier = 'mem';
    this.path = null;
    this.fileLog = [];

    if (cfg === null || typeof cfg !== 'object') {
      fail('AddressMalformed', "'cfg' is not the construction's one plain object");
    }

    // `JournalLengthArg` rows 1–12: row 2 is the ONE absence the amended construction still refuses.
    if (!('journalLength' in cfg)) {
      fail('ConstructionArgumentMissing', "'journalLength' requires a journalLength argument");
    }
    const journalLength = cfg.journalLength;
    if (!Number.isInteger(journalLength) || journalLength < 1) {
      fail('AddressMalformed', "'journalLength' is not a legal construction argument");
    }
    this.journalLength = journalLength;

    // `FilePathArg` rows 1–6: ABSENT is IN DOMAIN (the register is created at `mem`), and the probe is a
    // DRY RUN — it creates no file, no directory and no byte (`P-SM-6`'s `S-PROBE-DRY`).
    if ('filePath' in cfg) {
      const filePath = cfg.filePath;
      if (typeof filePath !== 'string' || filePath === '') {
        fail('AddressMalformed', "'filePath' is not a legal construction argument");
      }
      let reachable = false;
      try {
        if (existsSync(filePath)) {
          reachable = !statSync(filePath).isDirectory();
          if (reachable) accessSync(filePath, constants.W_OK);
        } else {
          accessSync(dirOf(filePath), constants.W_OK);
          reachable = true;
        }
      } catch {
        reachable = false;
      }
      if (!reachable) fail('FilePathUnreachable', `'${filePath}' could not be reached`);
      this.path = filePath;
      this.registerTier = 'file';
    }

    // `ListenersArg` rows 1–5: ABSENT answers `AddressMalformed` — *"the ONE absence the construction does
    // not admit"* — and a rejected array admits NOTHING.
    if (!('listeners' in cfg)) fail('AddressMalformed', "'listeners' is not a legal construction argument");
    const listeners = cfg.listeners;
    if (!Array.isArray(listeners)) fail('AddressMalformed', "'listeners' is not a legal construction argument");
    for (const entry of listeners) {
      if (!isPlainObject(entry)) fail('AddressMalformed', "'listeners' carries an entry that is not a record");
      const address = entry.address;
      if (!Array.isArray(address) || address.length !== Object.keys(address).length) {
        fail('AddressMalformed', "'listeners' carries an entry whose address is outside the domain");
      }
      for (const segment of address) {
        if (!legalSegment(segment)) {
          fail('AddressMalformed', "'listeners' carries an entry whose address is outside the domain");
        }
      }
      if (typeof entry.handle !== 'string' || entry.handle === '') {
        fail('AddressMalformed', "'listeners' carries an entry whose handle cannot be admitted");
      }
      // `§2.4` rule 3: where two entries at one address carry the caller's SAME token, the token enters the
      // home ONCE — *"the store returns that token ONCE where the store minted it"*.
      const duplicate = this.home.some((h) => keyOf(h.address) === keyOf(address) && h.token === entry.handle);
      if (!duplicate) this.home.push({ address: [...address], token: entry.handle });
    }

    // THE INTERNAL REACH: exactly ONE `.node` load per instance construction (`§1.2` item 1).
    this[ADDON] = loadAddon();
    this.boot();
  }

  /// `§7.1`: a fresh boot over an equal path re-loads the LAST SUCCESSFUL `file` write's own bytes.
  boot() {
    if (!this.path || !existsSync(this.path)) return;
    let log = [];
    try {
      log = JSON.parse(readFileSync(this.path, 'utf8'));
    } catch {
      log = [];
    }
    for (const entry of log) this.install(entry.address, 'file', entry.value, false);
    this.fileLog = log;
  }

  node(address) {
    return this.tree.get(keyOf(address));
  }

  rootKind() {
    const roots = [...this.tree.values()].filter((n) => n.parent === '');
    if (roots.length === 0) return null;
    return roots[0].kind === 'leaf' ? null : roots[0].kind;
  }

  childrenOf(address) {
    return [...this.tree.values()]
      .filter((n) => n.parent === keyOf(address))
      .sort((a, b) =>
        typeof a.seg === 'number' && typeof b.seg === 'number'
          ? a.seg - b.seg
          : String(a.seg).localeCompare(String(b.seg)),
      );
  }

  /// Drops the subtree a leaf write replaces (`§3.2`: a leaf has no container and therefore no children).
  dropDescendants(address) {
    const key = keyOf(address);
    for (const [candidate, node] of [...this.tree.entries()]) {
      if (node.parent === key && candidate !== key) {
        this.dropDescendants([...address, node.seg]);
        this.tree.delete(candidate);
      }
    }
  }

  /// `§3.2`/`§3.4` — the write's own arm table. **The KIND-CONTRADICTING case is a DIFFERENT answer from
  /// `ValueNotAdmitted`** (`crossing.md §1.2`'s closing clause): *"an admitted value whose container kind
  /// contradicts the target's"* answers `ContainerKindConflict` at the target, and nothing is installed.
  install(address, tier, value, record = true) {
    if (address.length === 0) fail('WriteParentNotLink', 'no key to install under');
    const parent = address.slice(0, -1);
    const parentNode = parent.length === 0 ? null : this.node(parent);
    if (parent.length > 0 && !parentNode) {
      fail('AddressNotFound', `'${address[address.length - 1]}' does not exist in '${parent.join('/')}'`);
    }
    if (parentNode && parentNode.kind === 'leaf') {
      fail('LeafHasNoDownstream', `'${address[address.length - 1]}' cannot be walked through '${parent.join('/')}'`);
    }
    const existing = this.node(address);
    const kind = Array.isArray(value) ? 'vec' : typeof value === 'object' && value !== null ? 'map' : 'leaf';
    const branchOf = (k) => k === 'map' || k === 'vec';
    if (existing) {
      if (branchOf(existing.kind) && branchOf(kind) && existing.kind !== kind) {
        fail('ContainerKindConflict', `the value does not match the container kind of '${address.join('/')}'`);
      }
      if (branchOf(existing.kind) && kind === 'leaf') {
        // A LEAF replaces a branch: a leaf's own container has no kind and no children to contradict.
        this.dropDescendants(address);
      }
    }
    const node = existing ?? { kind, seg: address[address.length - 1], parent: keyOf(parent), versions: new Map(), literal: undefined };
    node.kind = kind;
    this.tree.set(keyOf(address), node);
    if (kind === 'leaf') {
      node.literal = copyIn(value);
    } else {
      // Every anchor the write mints carries the caller's SINGLE tier (`PAR-JS-7`).
      const entries =
        kind === 'vec' ? value.map((v, i) => [i, v]) : Object.keys(value).map((k) => [k, value[k]]);
      for (const [childSegment, childValue] of entries) {
        this.install([...address, childSegment], tier, childValue, false);
      }
    }
    node.versions.set(tier, true);
    if (record && tier === 'file') {
      this.fileLog.push({ address: [...address], value: copyIn(value) });
      try {
        writeFileSync(this.path, JSON.stringify(this.fileLog));
      } catch {
        // `§7.2` items 2–4: the commit's failure answers `FileCommitFailed` AFTER the store's own automatic
        // journal rollback has run, and the package compensates for nothing.
        node.versions.delete('file');
        if (node.versions.size === 0) this.tree.delete(keyOf(address));
        this.fileLog.pop();
        fail('FileCommitFailed', `'${address.join('/')}' could not be committed to '${this.path}'`);
      }
    }
  }

  assemble(address) {
    if (address.length === 0) {
      const out = {};
      for (const node of this.childrenOf([])) out[node.seg] = this.assemble([...address, node.seg]);
      return out;
    }
    const node = this.node(address);
    if (!node) return null;
    if (node.kind === 'leaf') return copyIn(node.literal);
    const children = this.childrenOf(address);
    if (node.kind === 'vec') return children.map((child) => this.assemble([...address, child.seg]));
    const out = {};
    for (const child of children) out[child.seg] = this.assemble([...address, child.seg]);
    return out;
  }

  /// `§2.3`: the resolver, walking the address segment by segment, then the tier selection.
  resolve(address, tiers) {
    if (address.length === 0) return this.assemble([]);
    let current = [];
    for (const segment of address) {
      const node = current.length === 0 ? null : this.node(current);
      if (node && node.kind === 'leaf') {
        fail('LeafHasNoDownstream', `'${segment}' cannot be walked through '${current.join('/')}', it is a leaf`);
      }
      const next = this.node([...current, segment]);
      if (!next) fail('AddressNotFound', `'${segment}' does not exist in '${current.join('/')}'`);
      current = [...current, segment];
    }
    const node = this.node(current);
    if (node.kind !== 'leaf') return this.assemble(current);
    const held = TIERS.filter((t) => node.versions.has(t) && (tiers === null || tiers.includes(t)));
    if (held.length === 0) fail('TierNotFound', `'${current.join('/')}' is not a version of the register`);
    return this.assemble(current);
  }

  /// `§6`'s prefix test, descendant-inclusive: a handle appears in a trigger's list EXACTLY where its
  /// listener's address is a PREFIX of the triggering address — and a token appears ONCE.
  triggeredFor(address) {
    const seen = new Set();
    const out = [];
    for (const entry of this.home) {
      if (entry.address.length > address.length) continue;
      if (entry.address.every((segment, i) => segment === address[i]) && !seen.has(entry.token)) {
        seen.add(entry.token);
        out.push(entry.token);
      }
    }
    return out;
  }

  watchedFor(address) {
    return this.home
      .filter((entry) => entry.address.length <= address.length && entry.address.every((s, i) => s === address[i]))
      .map((entry) => [...entry.address]);
  }

  /// `§2.7` item 4 / `DD-22`: the record is COMPLETE and copied out before the delivery window opens; the
  /// invocation is synchronous, and a throwing body is NOT caught, NOT retried and NOT reported (`DD-23`).
  deliver(record, triggered) {
    for (const handle of triggered) {
      const token = this.tokens.get(handle);
      const listener = token === undefined ? undefined : this.registry.get(token);
      if (typeof listener === 'function') listener();
    }
    return record;
  }
}

// ---------------------------------------------------------------------------------------------
// THE SURFACE — `surface.md §2.9` item 1: the EIGHT verbs, and NOTHING else. `findAddress` is NOT exposed
// (`A63`), no `exists` verb exists (`§2.9` item 3) and no release verb is declared (`A74`).
// ---------------------------------------------------------------------------------------------

/// `§2.1`: `storeCreate(cfg)` takes ONE plain object carrying the store's THREE declared keys, passes them
/// through WITHOUT adding a default, a rename or a fourth key (`DD-36`), and **never returns a partial
/// instance** — it throws the single failure form instead. **The object it returns carries EXACTLY the one
/// own member `surface.md §2.4` item 5 (a) declares, and not one member beside it.**
export function storeCreate(cfg) {
  const state = new Boundary(cfg);
  const instance = {
    /// `surface.md §2.4` item 5 (b): `register(handle, listener) -> undefined` — the OPAQUE handle a verb
    /// returned or the construction adopted, and ANY JS function. **It is NOT a ninth named export of the
    /// entry** (`package.md §1.3` item 3): it is reached through the factory's own product alone.
    register(handle, listener) {
      return registerOn(state, handle, listener);
    },
  };
  STATE.set(instance, state);
  return instance;
}

/** `§2.2`: `read` — a leaf's literal, a branch's assembled value, the empty address's whole register. */
export function read(instance, address, tier) {
  const state = stateOf(instance);
  const target = addressArgument(address);
  // `crossing.md §1.3`'s `TierArg` rows 3 and 4 are TWO rows: an ABSENT argument is in domain and an
  // argument present with `undefined` answers `AddressMalformed` — so the call's own ARITY decides.
  const tiers = arguments.length >= 3 ? readTierArgument(tier) : null;
  return state.resolve(target, tiers);
}

/** `§2.2` / `§2.9` item 2: `readLiteral` narrows the read to a leaf and answers `ReadTargetIsBranch` on a branch. */
export function readLiteral(instance, address, tier) {
  const state = stateOf(instance);
  const target = addressArgument(address);
  const tiers = arguments.length >= 3 ? readTierArgument(tier) : null;
  const node = target.length === 0 ? null : state.node(target);
  if (node && node.kind !== 'leaf') fail('ReadTargetIsBranch', `'${target.join('/')}' is a branch`);
  return state.resolve(target, tiers);
}

/// `PAR-JS-13`: the returned record is `{op, watched, triggered}` — fresh on every call, and never a view.
export function write(instance, address, tier, value) {
  const state = stateOf(instance);
  const target = addressArgument(address);
  const token = tierArgument(tier);
  if (value === undefined) {
    // An ABSENT value reaches the store's own taxonomy as a shapeless value (`§2.2`: *"a failed write
    // returns NOTHING"*).
    fail('ValueNotAdmitted', refusedMessage(target));
  }
  if (!admitted(value)) fail('ValueNotAdmitted', refusedMessage(target));
  if (token === 'file' && state.registerTier !== 'file') {
    fail('TierNotFound', `'${target.join('/')}' is not a version of the register`);
  }
  const present = target.length > 0 && state.node(target) !== undefined;
  // The pre-state is read BEFORE the write installs anything, and it is a COPY (`§1.1` clause 2).
  const before = present ? state.resolve(target, null) : null;
  state.install(target, token, value);
  state.seq += 1;
  const opId = `op-${state.seq}`;
  const op = {
    opId,
    kind: 'write',
    address: [...target],
    tier: token,
    before: { present, value: before },
    after: { present: true, value: copyIn(value) },
    seq: state.seq,
    compacted: false,
  };
  state.journal.push({
    opId,
    kind: 'write',
    address: [...target],
    tier: token,
    before: op.before,
    after: op.after,
    seq: state.seq,
  });
  while (state.journal.length > state.journalLength) state.journal.shift();
  const triggered = state.triggeredFor(target).map((t) => wrapToken(state, t));
  const record = { op, watched: state.watchedFor(target), triggered };
  return state.deliver(record, triggered);
}

/// `PAR-JS-16`: `{address, tiers, triggered}` — `address` VERBATIM as a fresh copy, `tiers` in the store's
/// canonical order, and the in-domain no-op arm a SUCCESS returning `tiers: []`. **Its declared NAME is
/// `delete`, and it is published under that name ALONE** (`package.md §1.3` item 3: the entry's named
/// exports are exactly the eight verbs and the instance handle factory — *"and NOTHING ELSE"*, so no ninth
/// spelling of this verb is shipped): `deleteOp` is a reserved-word workaround for the declaration and
/// never a member of the package's namespace.
function deleteOp(instance, address, tier) {
  const state = stateOf(instance);
  const target = addressArgument(address);
  const token = arguments.length >= 3 ? tierArgument(tier) : null;
  const node = state.node(target);
  const removed = [];
  if (node) {
    for (const candidate of TIERS) {
      if (node.versions.has(candidate) && (token === null || token === candidate)) {
        node.versions.delete(candidate);
        removed.push(candidate);
      }
    }
    if (node.versions.size === 0) state.tree.delete(keyOf(target));
  }
  // NO FILE I/O (`§2.8` item 1, `DD-45`): a fresh boot over an equal path re-loads the last successful
  // `file` WRITE's bytes, and the removed version STANDS AGAIN.
  const triggered = state.triggeredFor(target).map((t) => wrapToken(state, t));
  return state.deliver({ address: [...target], tiers: removed, triggered }, triggered);
}

/// `PAR-JS-9`: `{opId, undoneOps, restoredTo}` — the constraint pattern's reverse step (`§2.6`).
export function rollback(instance, opId) {
  const state = stateOf(instance);
  if (opId === undefined || opId === null || typeof opId !== 'string' || opId === '') {
    fail('AddressMalformed', "'opId' is not a legal argument");
  }
  const op = state.journal.find((candidate) => candidate.opId === opId);
  if (!op) fail('JournalOpUnknown', `'${opId}' is not held by the journal`);
  const undone = [];
  const inScope = (candidate) => candidate.every((segment, i) => segment === op.address[i]);
  for (const other of [...state.journal].reverse()) {
    if (other.seq <= op.seq && inScope(other.address)) {
      if (other.before.present) {
        state.install(other.address, other.tier, other.before.value, false);
      } else {
        const node = state.node(other.address);
        if (node) {
          node.versions.delete(other.tier);
          if (node.versions.size === 0) state.tree.delete(keyOf(other.address));
        }
      }
      undone.push(other.opId);
    }
  }
  return { opId, undoneOps: undone, restoredTo: { present: op.before.present, value: op.before.value } };
}

/// `§2.10`: `listen` mints a token, populates the store's home and wraps it for JS — and its `address` is
/// `AddressArg`'s domain and NOTHING MORE: a listener carries NO tier qualifier.
export function listen(instance, address) {
  const state = stateOf(instance);
  const target = addressArgument(address);
  const existing = state.home.find((entry) => keyOf(entry.address) === keyOf(target));
  if (existing) return wrapToken(state, existing.token);
  const token = `listener-${state.home.length + 1}`;
  state.home.push({ address: [...target], token });
  return wrapToken(state, token);
}

/// `§2.3` item 4 / `PAR-JS-8`: **`unlisten` over ANY value outside the domain is a NO-OP SUCCESS** — a
/// foreign instance's value, a prior session's value, a fabricated value, a blank token, a non-opaque value
/// and an absent handle are EACH a no-op success, no code is produced, and NO OTHER REGISTRATION IS REMOVED.
export function unlisten(instance, handle) {
  const state = stateOf(instance);
  const token = state.tokens.get(handle);
  if (token === undefined) return undefined;
  const index = state.home.findIndex((entry) => entry.token === token);
  if (index >= 0) state.home.splice(index, 1);
  state.registry.delete(token);
  return undefined;
}

/// **THE REGISTRY'S OWN SITE AT THE PACKAGE'S BOUNDARY** (`surface.md §2.4` item 5, `contract.md §2.4` item
/// 5): the caller's FUNCTION for a handle, held by the package (`DD-15`) and invoked after the verb has
/// returned (`§2.7` item 4). **`register` REPLACES, never fans out** (rule 2); a non-function `listener`, a
/// `handle` THIS INSTANCE never minted or adopted, a bare `string`, a blank token, `null`, `undefined`, a
/// non-opaque value and an ABSENT argument are EACH the SAME JS `TypeError`, carrying NO `status` and NO
/// `message` member (`§2.4` item 5 (d), `PAR-JS-12`) — **and NOTHING reaches the store in any of those
/// cases: the site performs no store call, mints no code and changes no node.** **`unlisten`'s
/// NO-OP-SUCCESS reading does NOT extend here**, because a registration's argument is a member of the
/// registry's own key set and has no such arm.
function registerOn(state, handle, listener) {
  const token = state.tokens.get(handle);
  if (token === undefined || typeof listener !== 'function') throw new TypeError();
  state.registry.set(token, listener);
  return undefined;
}

// `delete` is a reserved word and the declared spelling is preserved on the way out.
export { deleteOp as delete };
