# PROPOSAL — the crossing's codec carries the JSON value tree (`U-STOREROOM-JSON-CROSSING`)

**ONE WHOLE FILE, AND THE ONLY ONE A READER NEEDS.** It is **this unit's own filing**: it is **not a delta** on any
earlier proposal, and no operative content is cited from `…-addon-surface-proposal-v5.md`, `…-addon-surface-proposal.md`,
`…-addon-surface-proposal-v2.md` or `…-addon-surface-proposal-v3.md`, and a reader must never need any of them open.
Only documents a reader would legitimately open are cited: the code, `docs/decisions.md`, `docs/pending.md` and the specs.

**A FILING, NOT A CONTRACT.** It asserts no behaviour clause, no signature, no return shape and no fail-state. It takes
no ruling. It edits no byte of any other file. **The unit is at the PROPOSAL stage: nothing in the codebase moves because
of this document.**

**`§1`** the architect's words, verbatim · **`§2`** the ruling and the voided ground · **`§3`** the measurements ·
**`§4`** the unit, its two directions and its four landings · **`§5`** the open mechanics · **`§6`** the residue
sites · **`§7`** also carried, the step-0 dossier and the one-line pointer to the proposal-stage implementation plan, which now has its own file · **`§8`** provenance.

**THE CLAIM LEDGER, AND WHAT COUNTS AS A RESOLVING AUTHORITY IN THIS FILE.** Every claim below that a reader could
check against a file carries **ONE** resolving authority: `A1` — the code at its own file and line; `A2` — a spec
section; `A3` — a decision row in `docs/decisions.md`. **A cross-document reference names path AND `§`-number; a bare
`§n` across two documents is not a reference.** A claim with no resolving authority is a finding against this filing,
and none is left unadmitted: the one authority named in the brief that does not resolve in this tree is recorded in
`§8` and is cited nowhere.

---

## §1. THE ARCHITECT'S WORDS, VERBATIM — the unit's whole authority

> Make the codec JSON-compliant - again, it already has to translate to a JSON-saveable format

— the architect, 2026-10-21; the ruling as recorded in `docs/decisions.md` · `A143` `[A3 docs/decisions.md · A143 | the
ruling's own row]`.

> Codec still appears to use the tagging system, not the JSON conversion

— the architect, 2026-10-22, the observation that opened the park now recorded at `docs/pending.md` · `G-16` `[A3
docs/pending.md · G-16 | the park's own record]`.

> It extends to the crossing's codec

> Refuse them at the package's boundary

— the architect's two answers of 2026-10-22, given in the same session, recorded verbatim at `docs/decisions.md` ·
`A147` `[A3 docs/decisions.md · A147 | the ruling's own row]` and at `docs/pending.md` · `G-16` `[A3 docs/pending.md ·
G-16 | the park's own record]`.

**What each selects, so nothing is left to inference.** *"Make the codec JSON-compliant"* — the architect's words
reach **BOTH** codecs, and the corpus's former reading of them (that they reached the `file` tier's codec alone) is
**voided** — see `§2.2`. *"It extends to the crossing's codec"* — the crossing's VALUE TREE is the JSON value tree,
and the tagged form is retired on the JavaScript route. *"Refuse them at the package's boundary"* — the classes
OUTSIDE THE JSON VALUE TREE are refused **at the package's own boundary**, and **the store's own `ValueNotAdmitted` is
no longer the answer for them on the JavaScript route**. **THE COUNT IS EXACT AND IT IS THE CLASS SET, NOT THE MARKER
SET: THE NINE MARKERS SPELL **SIXTEEN** CLASSES (`§3.3`), AND `null` — ONE OF THEM — IS JSON-SPELLABLE AND IS REFUSED
ON THE STORE'S TAXONOMY GROUND, NOT ON A SPELLING GROUND (`§3.3`; `A140`'s own row).** The second answer is the
architect's **own choice between the two branches the park priced**: refuse at the boundary, or carry the class in a
side-channel `[A3 docs/pending.md · G-16 | the park's own record]`. **The side-channel branch was NOT taken**, and `§2.3`
names what that leaves standing.

**THE UNIT IS NAMED BY THE CORPUS, NOT BY THIS FILING:** `U-STOREROOM-JSON-CROSSING`, at the PROPOSAL stage, with
*"nothing in the crossing moves until its contract lands"* `[A3 docs/pending.md · G-16 | the park's own record]`.

---

## §2. THE RULING, AND THE GROUND THAT WAS VOIDED

### 2.1 THE GOVERNING ROW, BY NAME

**Cited by row name and never by line: that file's own head warns its anchors drift because the file is appended to.
(`§8.1` records the lines this pass OPENED, which is a record of what was read and not a form of citation.)**

- **`A147` (2026-10-22, ACTIVE)** — *"THE JSON RULE REACHES THE CROSSING'S CODEC: THE VALUE TREE IS THE JSON TREE,
  AND THE NINE CLASSES JSON CANNOT SPELL ARE REFUSED AT THE PACKAGE'S OWN BOUNDARY"* `[A3 docs/decisions.md · A147 |
  the ruling's own row]`. **THE ROW'S OWN HEADING LABEL IS A MARKER COUNT, AND ITS DATED DELTA OF 2026-10-22 CORRECTS
  IT TWICE — THE NINE MARKERS SPELL **SIXTEEN** CLASSES, AND `null` IS JSON-SPELLABLE AND IS REFUSED ON THE STORE'S
  TAXONOMY GROUND (`§3.3`; `A140`'s own row)** `[A3 docs/decisions.md · A147 (the row's dated delta) | the row's own
  amendment]`. **This filing CITES that row and does NOT restate its cells.** Where this file needs one of
  its holdings, it names the holding and cites the row; the row's own text is the authority and no sentence here
  paraphrases it into a clause.
- **`A143` (2026-10-21)** — the file tier's codec, by row name `[A3 docs/decisions.md · A143 | the ruling's own row]`.
- **`A145` (2026-10-21)** — the binding crate's dependency table, by row name: **`bindings/js/Cargo.toml`'s
  `[dependencies]` carries THREE entries … AND NO FOURTH ENTRY IS LAWFUL** `[A3 docs/decisions.md · A145 | the
  ruling's own row]`.
- **`A140` (2026-10-21)** — the binding's internal JSON-text route, by row name `[A3 docs/decisions.md · A140 | the
  ruling's own row]`. **Its intersection with this unit is an OPEN question and is not a resolution — see `§5.3`.**
- **`A141` · `A142` · `A144`** — the file tier's image, the number spelling and the commit's verification, by row
  name `[A3 docs/decisions.md · A141 · A142 · A144 | the rulings' own rows]`.

### 2.2 THE VOIDED GROUND — WHAT THE CORPUS'S FORMER READING SAID, AND WHY IT IS VOID

**`A143` read the 2026-10-21 ruling against the FILE TIER'S CODEC ALONE, and said so in its own words** — *"**NOT
PINS.** The crossing's own form (the structural walk, `A140`'s route) is untouched; the store's value model is
untouched."* `[A3 docs/pending.md · G-16 | the park's own record, quoting `A143`]`. **That reading is VOID on the one
point the architect ruled on, and `A143`'s own file-tier pins are unmoved** — *"the architect's reading GOVERNS, AND
`A143` IS AMENDED BY `A147` ON THAT POINT ALONE, WITH ITS OWN FILE-TIER PINS UNMOVED"* `[A3 docs/pending.md · G-16 |
the park's own record]`.

**THE VOIDED GROUND IS NAMED SO A READER DOES NOT RE-ARGUE IT: the "the crossing's own form is untouched" reading, and
the `A140` route it leaned on.** **`A140` itself is NOT voided and is NOT this unit's to void** — it is an ACTIVE row and
`§5.3` records its intersection with this unit as an OPEN question, not as a resolution.

### 2.3 WHAT THE PARK OWED, AND WHAT IT NOW DOES NOT

**The park was a question for the architect — not a defect, not a work item and not a ruling** — and it asked exactly
two questions `[A3 docs/pending.md · G-16 | the park's own record]`:

1. *"DOES THE 2026-10-21 JSON RULING EXTEND TO THE CROSSING'S CODEC, OR DOES IT STAND AS THE FILE TIER'S CODEC
   ALONE (as `A143` reads it)?"* — **ANSWERED** by *"It extends to the crossing's codec"*.
2. *"IF IT EXTENDS: DO THE OUTSIDE CLASSES STILL CROSS AND STILL ANSWER WITH THE STORE'S OWN CLASS — which needs a
   side-channel and is a NEW DECLARED FORM — OR DOES THE PACKAGE REFUSE THEM AT ITS OWN BOUNDARY, which changes the
   answer's status and is a SPEC CHANGE TO `crossing.md §1.2`/`§1.4` AND TO
   `docs/specs/storeroom-native/contract.md §1.4`?"* — **ANSWERED** by *"Refuse them at the package's boundary"*.

**THE PARK'S OWN REVISIT CONDITION IS SPENT, and its record stays in the corpus as the record of WHAT WAS ASKED**
`[A3 docs/pending.md · G-16 | the park's own record]`. **THE SPEC CHANGES QUESTION (2) NAMES ARE THIS UNIT'S SUBJECT
MATTER, and `§4.3` names them as NAMED, not as rewritten.**

---

## §3. THE MEASUREMENTS

**`MEASURED` this pass, at the bytes named, and nothing was run (`§8`).** Every figure below was taken by opening the
file it names; **no figure is carried from the brief without being re-read at the file the brief names.**

### 3.1 `M-1` — THE `file` TIER'S PERSISTENCE CODEC IS PURE JSON, IN BOTH DIRECTIONS

- **ENCODE.** `src/json.rs`'s `encode` (`src/json.rs:63`) drives a `serde_json::Serializer` (`src/json.rs:65`) over a
  `Serialize` impl whose arms are `serialize_str` (`src/json.rs:180`) · `serialize_bool` (`:181`) · `serialize_f64`
  (`:182`) · `serialize_map` (`:186`) · `serialize_seq` (`:193`) `[A1 src/json.rs:63–:67 · :180–:193 | the codec's own
  arms]`.
- **DECODE.** `src/json.rs`'s `decode` (`src/json.rs:82`) is `serde_json::from_str(text).map_err(|_| ())`
  (`src/json.rs:83`) `[A1 src/json.rs:82–:84 | the decoder's own body]`.
- **THE THREE CALL SITES.** The file tier's save writes it — `src/store.rs:1301`
  (`let text = json::encode(&self.file_snapshot());`) `[A1 src/store.rs:1301 | the save's own call]`. The loader reads
  it — `src/store.rs:1404` (`if let Ok(StoreValue::Object(members)) = json::decode(&text)`) `[A1 src/store.rs:1404 | the
  loader's own call]`. The commit's own verification re-decodes it — `src/store.rs:1305` (`if
  !matches!(json::decode(&text), Ok(StoreValue::Object(_)))`) `[A1 src/store.rs:1305 | the commit's own verification]`.

**⟶ THIS UNIT DOES NOT TOUCH THE FILE TIER, ITS BYTES, OR `A141`–`A144`.** `A147`'s own row states the file tier's
codec, its image and its pins unmoved `[A3 docs/decisions.md · A147 | the ruling's own row]`, and `§4.4` names the
file tier as a site this unit does NOT land on.

### 3.2 `M-2` — THE CROSSING STILL CARRIES A TAGGED TREE, AND THE TWO SIDES AGREE ON THE TAGS

- **THE JAVASCRIPT SIDE WRITES IT.** `bindings/js/index.mjs`'s `encodeValue` (`bindings/js/index.mjs:1016`) returns the
  tagged forms: `{ k: 's', v: value }` (`:1038`) · `{ k: 'b', v: value }` (`:1040`) · `{ k: 'n', v: value }` (`:1048`) ·
  `{ k: 'a', i: members }` (`:1081`) · `{ k: 'o', m: members, p: proto, acc: false, proxy: false }` (`:1112`) `[A1
  bindings/js/index.mjs:1038 · :1040 · :1048 · :1081 · :1112 | the encoder's own returned forms]`.
- **THE RUST SIDE READS THE SAME TAGS.** `bindings/js/src/codec.rs`'s `value_of` (`bindings/js/src/codec.rs:332`) reads
  the tag at `self.member(v, "k")` (`bindings/js/src/codec.rs:333`) and dispatches on it: `"s"` (`:338`) · `"b"` (`:343`)
  · `"n"` (`:352`) · `"g"` (`:359`) · `"F"` (`:364`) · `"z"` (`:371`) · `"u"` (`:372`) · `"f"` (`:373`) · `"y"` (`:374`) ·
  `"c"` (`:375`) · `"P"` (`:376`) · `"H"` (`:377`) · `"o"` (`:378`) · `"a"` (`:429`) · the fall-through `_` (`:437`) `[A1
  bindings/js/src/codec.rs:333–:437 | the codec's own tag arms]`.

- **AND THE COPY-OUT SPEAKS THE SAME TAGS THE OTHER WAY — THE HALF `M-2`'s FIRST TWO BULLETS DO NOT MEASURE.** **THE
  NATIVE HALF WRITES THE TAGGED TREE:** `bindings/js/src/codec.rs`'s `to_js_value` (`bindings/js/src/codec.rs:857`) —
  the copy-out's own frame at `bindings/js/src/codec.rs:855`–`:856` — mints the same tag set: `s` (`:859`) · `b` (`:860`)
  · `n` (`:861`) · `o` (`:883`) · `a` (`:893`) · `z` (`:897`) · `u` (`:898`) · `f` (`:899`) · `y` (`:900`) · `g` (`:901`)
  · `F` (`:902`) · `c` (`:903`) · `P` (`:904`) · `H` (`:905`) `[A1 bindings/js/src/codec.rs:857–:907 | the copy-out's own
  body]`. **ITS OWN CALLERS ARE THE ADDON'S TWO VALUE-BEARING ARMS** (`bindings/js/src/facade.rs:554` · `:586`) `[A1
  bindings/js/src/facade.rs:554 · :586 | the copy-out's own callers]`. **AND THE JAVASCRIPT SIDE READS THOSE TAGS
  BACK:** `bindings/js/index.mjs`'s `decodeValue` (`bindings/js/index.mjs:1801`) reads the tag at
  `bindings/js/index.mjs:1802` and maps it — `s` (`:1803`) · `b` (`:1805`) · `n` (`:1807`) · `g` (`:1809`) · `F` (`:1811`)
  · `z` (`:1813`) · `u` (`:1815`) · `a` (`:1817`) · `o` (`:1819`) — with the fall-through `default` (`:1824`) answering
  `undefined` `[A1 bindings/js/index.mjs:1801–:1827 | the copy-out's own decoder]`. **THE DECODER'S OWN CALLERS ARE
  THE PACKAGE'S READ, LITERAL-READ AND WRITE MEMBERS AND THE RECORD'S OWN MEMBER** (`bindings/js/index.mjs:1848` ·
  `:2293` · `:2299` · `:2312`) `[A1 bindings/js/index.mjs:1848 · :2293 · :2299 · :2312 | the decoder's own callers]`.
  **⟹ THE CROSSING IS **BIDIRECTIONAL** IN ITS VOCABULARY: THE SAME TAGS ARE WRITTEN AND READ IN BOTH DIRECTIONS, AND
  `§3`'s FIRST TWO BULLETS MEASURE THE COPY-IN HALF ALONE.**
- **AND THE COPY-OUT'S OUTSIDE ARMS ARE **UNPRODUCED** — `§3.8` PROVES IT AT THE STORE'S OWN BYTES.** **⟹ THE
  COPY-OUT'S OUTSIDE-ARM CHANGE IS BEHAVIOUR-NEUTRAL, AND WHAT REMAINS OPEN ON THE COPY-OUT IS ITS **FORM**, NOT ITS
  OUTSIDE CLASSES — `§5.7` (`OM-7`) NAMES IT AND THIS FILING DECIDES IT.**
- **AND THE OBJECT ARM CARRIES THREE OF THE WALK'S DECISIONS AS MEMBERS:** the member list `"m"`
  (`bindings/js/src/codec.rs:380`) · the prototype `"p"` (`:404`) · the accessor flag `"acc"` (`:415`) · the proxy flag
  `"proxy"` (`:419`) `[A1 bindings/js/src/codec.rs:380 · :404 · :415 · :419 | the object arm's own members]`. **THE
  ENCODER WRITES ALL THREE** — `p` at `bindings/js/index.mjs:1112`, `acc` and `proxy` at the same line `[A1
  bindings/js/index.mjs:1112 | the encoder's own object form]`. **`§5.4` names the question these three raise.**

### 3.3 `M-3` — THE NINE REFUSAL MARKERS, AT THEIR OWN LINES, IN THE ENCODER — **AND THE SIXTEEN CLASSES THEY SPELL**

**THE NINE MARKERS AND THE CLASS EACH SPELLS — **THE CLASS SET IS **SIXTEEN** CLASSES (`z` 1 · `u` 1 · `f` 1 · `y` 2 ·
`g` 1 · `F` 1 · `c` 4 · `P` 4 · `H` 1 = `16` ✓)** — EACH AT ITS OWN LINE IN `bindings/js/index.mjs`:**

| Marker | The class it spells | The site that writes it | Note |
| --- | --- | --- | --- |
| **`z`** | `null` | `bindings/js/index.mjs:1029` | `[A1 bindings/js/index.mjs:1029 | the encoder's own arm]` |
| **`u`** | `undefined` | `bindings/js/index.mjs:1031` | `[A1 bindings/js/index.mjs:1031 | the encoder's own arm]` |
| **`f`** | a function | `bindings/js/index.mjs:1050` | `[A1 bindings/js/index.mjs:1050 | the encoder's own arm]` |
| **`y`** | a `symbol` | `bindings/js/index.mjs:1051` | `[A1 bindings/js/index.mjs:1051 | the encoder's own arm]` |
| **`y`** | **an own `Symbol`-keyed property** | `bindings/js/index.mjs:753` | **THE MARKER IS SPELLED BY TWO CLASSES** — a symbol VALUE and a symbol-KEYED property share it `[A1 bindings/js/index.mjs:748–:753 | the accessor/symbol arm]` |
| **`g`** | a `bigint` | `bindings/js/index.mjs:1043` | `[A1 bindings/js/index.mjs:1043 | the encoder's own arm]` |
| **`F`** | a non-finite number | `bindings/js/index.mjs:1046` | `[A1 bindings/js/index.mjs:1046 | the encoder's own arm]` |
| **`c`** | **over the walk ceiling** | `bindings/js/index.mjs:1027` | the encoder's own ceiling is `ENCODER_CEILING = 65` (`bindings/js/index.mjs:992`) `[A1 bindings/js/index.mjs:992 · :1027 | the encoder's own bound and arm]` |
| **`c`** | **a lone surrogate** (value position) | `bindings/js/index.mjs:1036` | `[A1 bindings/js/index.mjs:1036 | the encoder's own arm]` |
| **`c`** | **a lone surrogate** (member-key position) | `bindings/js/index.mjs:1108` | **THE MARKER IS SPELLED BY FOUR CLASSES** `[A1 bindings/js/index.mjs:1102–:1108 | the encoder's own arm]` |
| **`c`** | a value that contains itself | `bindings/js/index.mjs:1056` | **AND THIS IS THE FOURTH** `[A1 bindings/js/index.mjs:1056 | the encoder's own arm]` |
| **`P`** | a `Proxy` | `bindings/js/index.mjs:1053` | `[A1 bindings/js/index.mjs:1053 | the encoder's own arm]` |
| **`P`** | a class extending `Array` | `bindings/js/index.mjs:1065` | `[A1 bindings/js/index.mjs:1065 | the encoder's own arm]` |
| **`P`** | a prototype-carrying object | `bindings/js/index.mjs:1085` | `[A1 bindings/js/index.mjs:1085 | the encoder's own arm]` |
| **`P`** | **an own accessor property** | `bindings/js/index.mjs:751` | **THE MARKER IS SPELLED BY FOUR CLASSES** `[A1 bindings/js/index.mjs:748–:753 | the accessor/symbol arm]` |
| **`H`** | a sparse array | `bindings/js/index.mjs:1069` | `[A1 bindings/js/index.mjs:1069 | the encoder's own arm]` |

**AND THE POSITION EACH CLASS FAILS AT: the VALUE position — every class in the table but the three below; the MEMBER
position — `y` (an own `Symbol`-keyed property, `:753`) and `P` (an own accessor property, `:751`); the KEY position —
`c` (a lone surrogate, member-key, `:1108`)** `[A1 bindings/js/index.mjs:751 · :753 · :1108 | the encoder's own arms]`.
**⟹ THE CONTRACT'S OWN SUBJECT IS THE **CLASS SET** — EACH CLASS, ITS ANSWER (`OM-2`'s subject, WHICH THIS FILING TAKES
NONE OF) AND THE POSITION IT FAILS AT — AND NOT THE MARKER SET** `[A3 docs/decisions.md · A147 (the row's dated delta) |
the row's own amendment]`.

**AND `null` IS JSON-SPELLABLE: IT IS REFUSED ON THE **STORE'S TAXONOMY GROUND**, NOT ON A SPELLING GROUND —
`StoreValue::Null` IS AN OUTSIDE VARIANT (`src/value.rs:25`) AND `is_admitted` ANSWERS `false` FOR IT
(`src/value.rs:45`), AND `A140`'s OWN ROW ALREADY SAYS `null` IS REFUSED ALTHOUGH JSON CAN SPELL IT** `[A1
src/value.rs:25 · :45 | the taxonomy's own variant and predicate]` · `[A3 docs/decisions.md · A140 | the ruling's own
row]`.

**AND THE ENCODER'S OWN REFUSAL FRAME, so the nine are not a bare marker list.** The walk **CLASSIFIES and RECORDS**
its first fault and returns the marker to the core (`bindings/js/index.mjs:1007`'s `refusedValue`; the record's own
fields at `:1008`–`:1011`) `[A1 bindings/js/index.mjs:1007–:1013 | the encoder's own refusal frame]`. The marker
reaches the Rust side as a `JsValue` and the store's own taxonomy names it.

### 3.4 `M-4` — THE STORE'S OWN `ValueNotAdmitted` DEPENDS ON THOSE MARKERS **CROSSING**

- **THE CROSSING MAPS THE MARKER ONTO THE STORE'S OWN TAXONOMY.** `bindings/js/src/crossing.rs:708` reads
  `JsValue::Undefined => StoreValue::Undefined` inside the copy-in's match, and the arm's neighbours are
  `JsValue::Null => StoreValue::Null` (`:707`) · `Function` (`:709`) · `Symbol` (`:710`) · `BigInt` (`:711`) ·
  `NonFinite` (`:712`) · `Cyclic` (`:713`) · `NonPlainCollection` (`:714`) · `SparseArray` (`:706`) `[A1
  bindings/js/src/crossing.rs:705–:715 | the conversion's own arms]`.
- **THE STORE'S OWN TAXONOMY CARRIES THE OUTSIDE CLASSES AS VARIANTS.** `src/value.rs`'s `StoreValue`
  (`src/value.rs:16`) holds the admitted `Str` (`:18`) · `Bool` (`:19`) · `Num` (`:21`) · `Object` (`:22`) · `Array`
  (`:23`) and the outside `Null` (`:25`) · `Undefined` (`:26`) · `Function` (`:27`) · `Symbol` (`:28`) · `BigInt` (`:29`)
  · `NonFinite` (`:30`) · `Cyclic` (`:31`) · `NonPlainCollection` (`:32`) `[A1 src/value.rs:16–:33 | the taxonomy's own
  variants]`.
- **THE STORE REFUSES THE VALUE WITH ITS OWN GENERATED MESSAGE.** `src/store.rs:1982` reads `if
  !value.is_admitted()` and `:1983` returns `Err(value_not_admitted(&segments))` `[A1 src/store.rs:1982–:1984 | the
  store's own refusal arm]`; `is_admitted` is `src/value.rs:39` `[A1 src/value.rs:39–:47 | the predicate's own body]`.

**⟶ THEREFORE THE ARCHITECT'S ANSWER (2) — REFUSE AT THE PACKAGE'S OWN BOUNDARY — REMOVES THE STORE'S OWN
`ValueNotAdmitted` FROM THE ANSWER FOR THAT CLASS SET (SIXTEEN CLASSES, `§3.3`) ON THE JAVASCRIPT ROUTE**, exactly as
`A147`'s own row
states `[A3 docs/decisions.md · A147 | the ruling's own row]`. **THE OUTSIDE CLASSES REMAIN DECLARED, AND THE STORE
STILL ANSWERS `ValueNotAdmitted` FOR THEM ON THE NATIVE ROUTE** — `§4.4` names that route as untouched.

### 3.5 `M-5` — THE ADDRESS CARRIERS ARE NOT TAGGED, SO THE CHANGE IS THE VALUE TREE ALONE

- **A SEGMENT CROSSES BARE.** `bindings/js/index.mjs`'s `encodeSegment` (`bindings/js/index.mjs:1149`) returns the
  segment itself: a `string` (`:1169`) and a `number` (`:1182`) are returned as they are, and every outside class is
  refused at the package's own boundary — a lone surrogate (`:1154`–`:1167`) · an integral segment above the carrier's
  range (`:1173`–`:1180`) — **and the encoder's own arms run to `:1203`, NOT TO `:1183`: the boolean arm is
  `bindings/js/index.mjs:1184` and the `null` · `undefined` · `function` · `symbol`/`bigint` · `array` · `object` arms
  are `bindings/js/index.mjs:1185`–`:1202`** `[A1 bindings/js/index.mjs:1149–:1203 | the segment encoder's own arms]`.
  **AND THE BOOLEAN IS REFUSED BY THE ADDRESS ENCODER, NOT BY `encodeSegment` ITSELF:** `encodeAddress` tests the
  class at `bindings/js/index.mjs:1401` and refuses it at `bindings/js/index.mjs:1406` `[A1 bindings/js/index.mjs:1401 ·
  :1406 | the address encoder's own refusal arm]`.
- **THE SEGMENT LIST IS CARRIED AS A LIST OF BARE SEGMENTS.** `bindings/js/index.mjs:1410` returns
  `{ k: 'L', s: segments }` where `segments` holds the bare values pushed at `:1408` `[A1 bindings/js/index.mjs:1393–
  :1410 | the address encoder's own arm]`.
- **THE CARRIER TABLE THAT DECLARES IT.** `docs/specs/storeroom-js/crossing.md §1.3`'s `AddressArg` table — rows `1`–`14`,
  with row `2` (a JS `string` segment) and row `3` (a JS non-negative integer `number` segment) the two admitted
  forms `[A2 docs/specs/storeroom-js/crossing.md §1.3 | the carrier table]`.
- **AND `A147` SAYS THE SAME IN ITS OWN WORDS** — *"THE ADDRESS CARRIERS ARE UNMOVED … ⇒ THE CHANGE IS THE VALUE TREE
  ALONE"* `[A3 docs/decisions.md · A147 | the ruling's own row]`.

**⟶ THE FOUR OTHER `member(·, "k")` ARMS ARE NOT THE VALUE TREE, AND THIS IS THE MEASUREMENT THAT MAKES THE
SCOPE A SCOPE.** `bindings/js/src/codec.rs` reads a `k` member at **five** sites, and **four of them carry a CARRIER,
not a value**: `value_of` (`bindings/js/src/codec.rs:333`, the VALUE tree) · `address_of` (`:485`, the `AddressArg`
carrier) · `tier_of` (`:562`, the `TierArg` carrier) · `op_id_of` (`:602`, the `OpIdArg` carrier) · `handle_arg_of`
(`:629`, the `JsHandleArg` carrier) `[A1 bindings/js/src/codec.rs:333 · :485 · :562 · :602 · :629 | the codec's own
five tag-reading sites]`. **THE FOUR CARRIER SITES ARE OUT OF THIS UNIT'S SCOPE, AND `§4.4` NAMES THEM AS SITES THE
CHANGE DOES NOT LAND ON.**

### 3.6 `M-6` — THE TWO CODECS NEVER MEET

- **THE TAG TREE IS NOT TEXT — IT CROSSES AS LIVE VALUES.** The encoder returns plain JS objects and arrays
  (`bindings/js/index.mjs:1038`–`:1112`) and the Rust side reads them as live Node-API values
  (`bindings/js/src/codec.rs:333`) `[A1 bindings/js/index.mjs:1038–:1112 · bindings/js/src/codec.rs:333 | the two
  sides' own shapes]`.
- **THE JAVASCRIPT PACKAGE NEVER READS THE FILE TIER'S IMAGE.** `bindings/js/index.mjs` imports `readFileSync` at
  `:79` and calls it at **exactly one site**, `:331`, which reads the package's own `package.json` for its `version`
  `[A1 bindings/js/index.mjs:79 · :331 | the file's own only read]`. **THAT IS THE WHOLE OF THE PACKAGE'S FILE READS
  — ONE CALL SITE — AND IT READS THE PACKAGE'S OWN MANIFEST.**
- **AND THE FILE TIER'S IMAGE IS A TEXT FILE, WRITTEN BY THE STORE.** `src/store.rs:1309` writes `text.as_bytes()` to
  the commit's temporary path `[A1 src/store.rs:1309 | the commit's own write]`.

### 3.7 `M-7` — THE RESIDUE CENSUS OF THE RAW TAGGED FORM, MEASURED

**THE SEARCHED SET: `bindings/js/test/*.test.mjs` (the JavaScript test tree), searched for the object-literal tagged
form — a `{` or `[` or `,` followed by `k` followed by `:` followed by a quoted tag.**

| File | Tagged-form occurrences | Lines carrying them |
| --- | --- | --- |
| `bindings/js/test/addon-surface.test.mjs` | **`14`** | `406` (×1) · `615` (×3) · `695` (×3) · `696` (×2) · `710` (×3) · `711` (×2) |
| `bindings/js/test/file-tier-save-properties.test.mjs` | **`6`** | `252` (×1) · `266` (×1) · `270` (×2) · `274` (×1) · `279` (×1) |
| `bindings/js/test/addon-adoption.test.mjs` | **`2`** | `1005` (×1, **inside a comment**) · `1079` (×1) |
| `bindings/js/test/a127-surface.test.mjs` | **`1`** | `273` (×1) |
| **TOTAL** | **`23`** | **`14` lines** |

`[A1 bindings/js/test/addon-surface.test.mjs:406 · :615 · :695 · :696 · :710 · :711; bindings/js/test/file-tier-save-properties.test.mjs:252 · :266 · :270 · :274 · :279; bindings/js/test/addon-adoption.test.mjs:1005 · :1079; bindings/js/test/a127-surface.test.mjs:273 | the census's own sites]`

**THE BREAKDOWN BY WHAT THE TAG SPELLS — THE PART THAT DECIDES WHAT THE CHANGE TOUCHES:**

| The tag | What it is | Occurrences | In this unit's scope? |
| --- | --- | --- | --- |
| **`s`** | the VALUE tree's string arm | **`7`** | **YES** — retired by `A147` |
| **`n`** | the VALUE tree's number arm | **`1`** | **YES** — retired by `A147` |
| **`L`** | the `AddressArg` carrier's list arm | **`6`** | **NO** — a carrier, unmoved |
| **`T`** | the `TierArg` carrier's token arm | **`8`** | **NO** — a carrier, unmoved |
| **`v`** | **not one of the codec's tags at all** | **`1`** | **NO** — an ordinary store value whose member is named `k` (`bindings/js/test/a127-surface.test.mjs:273` reads `whole` against `{ k: 'v' }`) |
| **TOTAL** | | **`23`** | **`8` are the value tree; `15` are not** |

`[A1 bindings/js/test/addon-surface.test.mjs:615 · :695 · :696 · :710 · :711; bindings/js/test/file-tier-save-properties.test.mjs:252 · :266 · :270 · :274 · :279; bindings/js/test/addon-adoption.test.mjs:1005 · :1079; bindings/js/test/a127-surface.test.mjs:273 | the breakdown's own sites]`

**AND THE FOURTH FILE THE BRIEF NAMES CARRIES NONE OF IT.** `bindings/js/test/constraint-kernel-states.test.mjs` holds
**NO** tagged form: a whole-file search for the `k` tag literal in that file returns **NO MATCH**, the file reaches no
addon at all (a whole-file search for `addon` returns **NO MATCH**), and its `tag(…)` helper calls (`:123`, `:229`,
`:280`, …) mint ordinary address SEGMENT labels, not wire tags `[A1 bindings/js/test/constraint-kernel-states.test.mjs
— whole-file searches, NO MATCH | the census's own searched set]`. **THE FILE LIST AND THE COUNT ARE RECORDED AS
MEASURED, AND THE DISAGREEMENT WITH THE BRIEF IS STATED IN `§8.2` RATHER THAN PAPERED OVER.**

### 3.8 `M-8` — THE RUST-SIDE ARMS THAT READ THE TAGS, AND THE `JsValue` ENUM'S OUTSIDE VARIANTS

- **THE RUST-SIDE TAG-READING ARMS ARE `M-2`'s fifteen arms** (`bindings/js/src/codec.rs:333`–`:437`) `[A1
  bindings/js/src/codec.rs:333–:437 | the codec's own arms]`.
- **THE `JsValue` ENUM.** `bindings/js/src/crossing.rs:130` declares it, with the admitted `Str` (`:131`) · `Bool`
  (`:132`) · `Num` (`:134`) · `Object` (`:135`) · `Array` (`:136`) and the outside `SparseArray` (`:139`) · `Null`
  (`:140`) · `Undefined` (`:141`) · `Function` (`:142`) · `Symbol` (`:143`) · `BigInt` (`:144`) · `NonFinite` (`:145`) ·
  `Cyclic` (`:147`) · `NonPlainCollection` (`:149`) — **`5` admitted + `9` outside = `14` variants, the ninth
  outside being the hole's own carrier and not one of the store's `8` outside classes** `[A1 bindings/js/src/crossing.rs:130–:150 | the enum's own variants]`. **THE
  NINE OUTSIDE VARIANTS ARE `SparseArray` · `Null` · `Undefined` · `Function` · `Symbol` · `BigInt` · `NonFinite` ·
  `Cyclic` · `NonPlainCollection`.**
- **AND THE EIGHT OF THEM THE STORE'S OWN TAXONOMY NAMES ARE THE `§1.2` OUTSIDE ROWS** — `Null` · `Undefined` ·
  `Function` · `Symbol` · `BigInt` · `NonFinite` · `Cyclic` · `NonPlainCollection`, rows `6`–`13` of the crossing table
  `[A2 docs/specs/storeroom-js/crossing.md §1.2 | the crossing table's own rows]`.

**⟶ THIS CHANGE MAKES THOSE NINE VARIANTS UNREACHABLE FROM THE **COPY-IN HALF** OF THE JAVASCRIPT ROUTE.** `bindings/js/src/crossing.rs` IS THE CRATE'S PURE-RUST HALF, AND ITS HEADER SAYS SO IN ITS OWN WORDS — *"IT IS PURE
RUST … no `napi` type, no `napi-rs` macro, no `#[napi]` attribute"* (`bindings/js/src/crossing.rs:4`) `[A1
bindings/js/src/crossing.rs:4 | the module's own purity declaration]`. **THE NINE VARIANTS REMAIN REACHABLE FROM THE
CRATE'S OWN RUST SURFACE, WHICH IS NOT THE JAVASCRIPT ROUTE** `[A2 docs/specs/storeroom-native/contract.md §1.4 | the
admitted taxonomy and its outside list]`.

**⟶ AND THE COPY-OUT'S OUTSIDE ARMS ARE **UNPRODUCED** — THE FACT THE BULLETS ABOVE MUST NOT BE READ AS COVERING, AND
THE FACT THAT CORRECTS A WORDING THIS FILING ONCE HELD.** The arms are there and `M-2`'s copy-out bullet measures each
of them: `to_js_value`'s nine marker arms (`bindings/js/src/codec.rs:897`–`:905`) · `decodeValue`'s own map
(`bindings/js/index.mjs:1809`–`:1825`) · `from_store_value`'s eight outside arms (`bindings/js/src/crossing.rs:731`–
`:738`) `[A1 bindings/js/src/codec.rs:897–:905; bindings/js/index.mjs:1809–:1825; bindings/js/src/crossing.rs:720–:740 | the copy-out's own arms]`. **BUT NO VALUE THE STORE RETURNS IS AN OUTSIDE VALUE, SO THE ARMS HAVE NO PRODUCER ON THE JAVASCRIPT ROUTE: the store's own value producers admit only admitted values — the loader's mint (`:1404`–`:1408`, under `is_admitted`) · the write's mint (`:2126`, after the refusal at `:1982`–`:1984`) · the rollback's re-mint (`:1615` · `:1660`) — and the two sites that spell an outside class are the assembly fallback (`:1207`, `Null`) and the journal's absent state (`:1688`, `Undefined`), and NEITHER IS A VALUE A READ RETURNS: a read answers `assemble` (`:1948`), whose arms answer `Ok` throughout (`Node` carries two variants, `:306`–`:309`; `assemble` at `:1141`–`:1208`), and a leaf carries a minted value** `[A1 src/store.rs:306–:309 · :1141–:1208 · :1207 · :1404–:1408 · :1615 · :1660 · :1688 · :1948 · :1982–:1984 · :2126 | the store's own producers and its two outside-spelling sites]`. **⟹ THE COPY-OUT'S OUTSIDE-ARM CHANGE IS **BEHAVIOUR-NEUTRAL** — NOTHING OBSERVABLE DEPENDS ON WHAT THOSE ARMS ANSWER — AND WHAT REMAINS OPEN ON THE COPY-OUT IS ITS **FORM** (WHETHER THE RULING REACHES ITS TWO SITES), WHICH `§5.7` NAMES AND THIS FILING DECIDES NOWHERE.**

### 3.9 `M-9` — THE GREENS SET'S CENSUS OF THE `ValueNotAdmitted` ANSWER

- **`bindings/js/greens/greens.mjs` — THE `JSG-04` SCENARIO.** The scenario's own header prints **67 assertions**
  (`bindings/js/greens/greens.mjs:457`) and the body emits them: the `refusal` helper at `:463`–`:486` emits **four**
  cells per call (`.i` at `:466` · `.ii` at `:467` · `.iii` at `:477` · `.iv` at `:480`), and the scenario makes
  **`14` calls** — `JSG-04.1` (`:488`) · `.2` (`:491`) · `.3` (`:494`) · `.4` (`:495`) · `.5` (`:499`) · `.6` (`:500`) ·
  `.7` (`:501`) · `.8` (`:502`) · `.9` (`:503`) · `.10` (`:504`) · `.11` (`:505`) · `.12` (`:506`) · `.13` (`:507`) ·
  `.14` (`:508`) — plus **three** `.v` cells (`:489` · `:492` · `:496`) and **eight** further cells `JSG-04.15`–`.22`
  (`:511` · `:520` · `:522` · `:526` · `:529` · `:531` · `:540` · `:542`); **`14 × 4 + 3 + 8 = 67` ✓** `[A1
  bindings/js/greens/greens.mjs:457 · :463–:486 · :488–:508 · :511–:542 | the scenario's own census]`.
- **THE `14` CELLS' STATUS LIMB IS THE STORE'S OWN `ValueNotAdmitted`.** `bindings/js/greens/greens.mjs:467` asserts
  *"the status is exactly 'ValueNotAdmitted'"* for every one of the fourteen, and `:480`–`:481` asserts the message
  carries the store's own clause *"is not an admitted value"*; `JSG-04.17` (`:522`–`:524`) asserts the same status for
  the `Array` subclass `[A1 bindings/js/greens/greens.mjs:467 · :480–:481 · :522–:524 | the status limb's own cells]`.
  **⟹ `15` CELLS ASSERT THE `ValueNotAdmitted` STATUS ON THE JAVASCRIPT ROUTE.**
- **THE FOURTEEN CLASSES THOSE CELLS COVER.** `bigint` · `symbol` · a `Symbol`-keyed own property · a class instance ·
  a class extending `Array` · a sparse array · an `{a: undefined}` member · a `Proxy` over a plain object · an own
  accessor property · a `Map` · a `Date` · a function · `NaN` · a cycle `[A1 bindings/js/greens/greens.mjs:488–:508 |
  the fourteen fixtures]`. **`null` IS NOT AMONG THEM.**
- **THE LIVE DRIVER'S PARALLEL SCENARIO.** `bindings/js/greens/live-drive.mjs`'s `LIVE-9` builds the **same fourteen**
  classes (`bindings/js/greens/live-drive.mjs:435`–`:450`) and `LIVE-9.6` (`:467`–`:468`) asserts that *"every one of
  the fourteen is refused in the ONE thrown form with status `ValueNotAdmitted`"* `[A1
  bindings/js/greens/live-drive.mjs:435–:450 · :467–:468 | the scenario's own cells]`.
- **AND THE CLOSED SET OF SIXTEEN STATUS CODES IS PRINTED IN THREE GREENS FILES** — `bindings/js/greens/greens.mjs:90`–
  `:99` · `bindings/js/greens/held-listener-identity-greens.mjs:37`–`:40` ·
  `bindings/js/greens/file-tier-save/scenarios.mjs:821`–`:824` — **and a FOURTH file, `bindings/js/greens/live-drive.mjs`, asserts against those same statuses without printing the
  set** (`:395`–`:396` · `:419` · `:467`–`:469` · `:682`) `[A1 bindings/js/greens/greens.mjs:90–:99; bindings/js/greens/held-listener-identity-greens.mjs:37–:40; bindings/js/greens/file-tier-save/scenarios.mjs:821–:824; bindings/js/greens/live-drive.mjs:395–:396 · :419 · :467–:469 · :682 | the closed sets' own sites]`.
  **THE SIXTEEN-MEMBER SET'S OWN HOME IS THE STORE** — `docs/specs/storeroom-native/contract.md §8.1`'s closed set
  `[A2 docs/specs/storeroom-native/contract.md §8.1 | the store's own closed set]`.

---

## §4. THE UNIT, AND ITS LANDINGS

### 4.0 WHAT THE UNIT ASKS — STATED FROM THE RULING, NOT RESTATED FROM IT

**THE UNIT'S ONE LINE:** the JavaScript↔native crossing carries the **JSON value tree** instead of the tagged
`{k,v}` tree, and the **classes outside the JSON value tree — the nine markers spell **sixteen** classes — are refused
at the package's own boundary** instead of crossing and being refused by the store. **THE AUTHORITY FOR BOTH HALVES IS
`A147`'s OWN ROW, CITED AND NOT RE-SPELLED** `[A3 docs/decisions.md · A147 | the ruling's own row]`.

**AND THE UNIT'S DIRECTION IS EXPLICIT, BECAUSE `§3` AND `§6` MEASURE ONE HALF OF IT: THE CROSSING IS
**BIDIRECTIONAL** — THE **COPY-IN** RUNS JAVASCRIPT → NATIVE AND THE **COPY-OUT** RUNS NATIVE → JAVASCRIPT — AND THE
TAGGED FORM IS CARRIED IN BOTH DIRECTIONS** (`M-2`'s four bullets) `[A1 bindings/js/index.mjs:1016–:1112;
bindings/js/src/codec.rs:332–:439 · :857–:907; bindings/js/index.mjs:1801–:1827 | the two directions' own sites]`.
**`§4.1` NAMES THE FOUR LANDINGS THAT FOLLOW FROM IT, AND `§5.7` NAMES WHAT THE RULING REACHES ON THE COPY-OUT AS AN
OPEN MECHANIC — THIS FILING DECIDES NEITHER.**

### 4.1 THE UNIT HAS **TWO DIRECTIONS AND FOUR LANDINGS**, AND EACH DIRECTION'S TWO HALVES ARE THE **SAME** EDIT AT THE TWO HALVES OF ONE CROSSING

**A FILING NAMES THE LANDINGS; IT DOES NOT DECIDE THE ORDER, THE MECHANICS OR THE ACCEPTANCE. THE PROPOSAL-STAGE
IMPLEMENTATION PLAN IS CARRIED IN ITS OWN FILE AT `docs/specs/storeroom-json-crossing-implementation-plan.md` (`§P.1`–`§P.8`), AND IT IS A PLAN: STEPS, ORDER AND VERIFICATION — **NO
BEHAVIOUR CLAUSE, NO SIGNATURE, NO RETURN SHAPE AND NO FAIL-STATE** — AND IT IS DISPOSED OF AS PLAN STEPS AND NEVER AS
THE CONTRACT'S PINNABLE CLAIMS.** **THE UNIT'S DIRECTION IS EXPLICIT (`§4.0`): THE COPY-IN RUNS JAVASCRIPT → NATIVE
AND THE COPY-OUT RUNS NATIVE → JAVASCRIPT, AND THE UNIT HAS A LANDING IN EACH DIRECTION AT EACH HALF.** The four
landings are:

1. **LANDING ONE — THE COPY-IN, THE JAVASCRIPT HALF: THE VALUE TREE THE ENCODER WRITES.** The site is `bindings/js/index.mjs`'s
   `encodeValue` (`bindings/js/index.mjs:1016`) and its returned forms (`:1038` · `:1040` · `:1048` · `:1081` · `:1112`)
   `[A1 bindings/js/index.mjs:1016–:1112 | the encoder's own body]`.
2. **LANDING TWO — THE COPY-IN, THE NATIVE HALF: THE VALUE TREE THE CODEC READS.** The site is `bindings/js/src/codec.rs`'s
   `value_of` (`bindings/js/src/codec.rs:332`) and its tag arm (`:333`) and its fifteen dispatch arms (`:338`–`:437`)
   `[A1 bindings/js/src/codec.rs:332–:439 | the codec's own body]`.
3. **LANDING THREE — THE COPY-OUT, THE NATIVE HALF: THE VALUE TREE THE CODEC WRITES.** The site is `bindings/js/src/codec.rs`'s
   `to_js_value` (`bindings/js/src/codec.rs:857`) — the copy-out's own frame at `bindings/js/src/codec.rs:855`–`:856` —
   and the tags it mints (`:859` · `:860` · `:861` · `:883` · `:893` · `:897` · `:898` · `:899` · `:900` · `:901` · `:902` ·
   `:903` · `:904` · `:905`) `[A1 bindings/js/src/codec.rs:857–:907 | the copy-out's own body]`.
4. **LANDING FOUR — THE COPY-OUT, THE JAVASCRIPT HALF: THE VALUE TREE THE PACKAGE READS.** The site is `bindings/js/index.mjs`'s
   `decodeValue` (`bindings/js/index.mjs:1801`) — its tag read at `bindings/js/index.mjs:1802` and its arms (`:1803`–`:1826`)
   `[A1 bindings/js/index.mjs:1801–:1827 | the copy-out's own decoder]`.

**⟶ AND THIS IS A SCOPE FINDING, NAMED AS ONE: THE UNIT'S SHAPE IS **WIDER** THAN THE "TWO LANDINGS" READING, BECAUSE
THE COPY-OUT HAS ITS OWN TWO LANDINGS AND THE MEASUREMENTS THAT FOLLOWED THE COPY-IN ALONE (`§3`, `§6`) DID NOT
MEASURE THEM.** **THE COPY-OUT'S TWO SITES ARE THE NATIVE HALF'S WRITER AND THE JAVASCRIPT HALF'S READER, AND BOTH
SPEAK THE TAGGED FORM** (`M-2`'s copy-out bullet) `[A1 bindings/js/src/codec.rs:857–:907;
bindings/js/index.mjs:1801–:1827 | the copy-out's own two sites]`.

**WHY EACH DIRECTION'S TWO HALVES ARE ONE EDIT AND NOT TWO, AND THE ANSWER IS A BYTE:** the two halves of a direction
read and write **the same tags** (`M-2`), and the tree one side writes is the tree the other side reads — **so a half
that moved alone would leave the two halves speaking different vocabularies, and the crossing would carry a tree no
half recognises.** **THE CLAUSE THIS FILING MAKES IS THE OBSERVATION, NOT A REQUIREMENT: the landing order is the
implementer's, and the PLAN AT `docs/specs/storeroom-json-crossing-implementation-plan.md §P.4` STATES THE ORDER IT TAKES AND HOW EACH STEP IS VERIFIED.**

### 4.2 THE CLASS SET'S REFUSAL SITE — **SIXTEEN CLASSES** — THE LANDING THE RULING'S SECOND ANSWER NAMES

**THE CLASS IS DECIDED AT THE PACKAGE'S WALK, AND THE PACKAGE'S WALK IS WHERE THE MARKERS ARE ALREADY WRITTEN**
(`M-3`): `bindings/js/index.mjs`'s `encodeValue` already decides every one of the sixteen classes and already refuses
them (`bindings/js/index.mjs:1027`–`:1108`) `[A1 bindings/js/index.mjs:1027–:1108 | the encoder's own refusal arms]`.
**THE STORE'S OWN `ValueNotAdmitted` IS NO LONGER THE ANSWER FOR THOSE CLASSES ON THE JAVASCRIPT ROUTE** `[A3
docs/decisions.md · A147 | the ruling's own row]` — **and `§5.2` NAMES THE OPEN QUESTION THIS LEAVES, WHICH THIS
FILING DOES NOT ANSWER.**

**THE PACKAGE'S OWN BOUNDARY REFUSAL FRAME ALREADY EXISTS AND IS THE SITE THE CLASSES WOULD BE REFUSED AT.**
`bindings/js/index.mjs`'s `boundaryReject` (`bindings/js/index.mjs:655`) is the frame the package's own edge uses
*"where the refusal is the BOUNDARY's own: a class the walk rejects BEFORE any verb is called"* — the file's own words
at `:629`–`:634` `[A1 bindings/js/index.mjs:629–:655 | the frame's own header and signature]`; the thrown form is
`fail`'s three-member object (`bindings/js/index.mjs:590`–`:596`) `[A1 bindings/js/index.mjs:590–:596 | the form's
own body]`.

### 4.3 THE SPECS THIS UNIT AMENDS — **NAMED, NOT REWRITTEN**

**THIS FILING REWRITES NO SPEC AND EDITS NO SPEC BYTE.** The specs the change bears on are named here so the reader
knows where the contract's text will have to move:

| The spec section | What it currently carries | Its own citation |
| --- | --- | --- |
| **`docs/specs/storeroom-js/crossing.md §1.2`** | the crossing table's **`13` rows** — `5` admitted (rows `1`–`5`) and **`8` outside (rows `6`–`13`)** — and the closing clause that every refused row answers the same code | `[A2 docs/specs/storeroom-js/crossing.md §1.2 | the crossing table's own rows]` |
| **`docs/specs/storeroom-js/crossing.md §1.4`** | the walk's own rules — the `9` items, from the `Symbol`-keyed property (item `1`, `:425`) through the plain-object test (item `4`, `:436`) and the depth/node ceiling (item `5`, `:451`) to the lone surrogate (item `9`, `:564`) | `[A2 docs/specs/storeroom-js/crossing.md §1.4 | the walk's own items]` |
| **`docs/specs/storeroom-native/contract.md §1.4`** | the admitted taxonomy — the closed set of **`4` admitted classes** (`:1401`–`:1406`) and the outside list (`:1408`–`:1411`) — and the kind-contradiction paragraph (`:1414`–`:1416`) | `[A2 docs/specs/storeroom-native/contract.md §1.4 | the admitted taxonomy and its outside list]` |

**AND THE PARK'S OWN SECOND QUESTION NAMES THE SAME THREE SECTIONS** — *"a SPEC CHANGE TO `crossing.md §1.2`/`§1.4` AND
TO `docs/specs/storeroom-native/contract.md §1.4`"* `[A3 docs/pending.md · G-16 | the park's own record]`.

### 4.4 WHAT THIS UNIT **DOES NOT** LAND ON — NAMED, SO THE SCOPE CANNOT BE READ WIDER

| Site | Why it is out of the scope | Citation |
| --- | --- | --- |
| **`src/json.rs`** | the file tier's codec is `serde_json` in both directions and its bytes do not move | `[A1 src/json.rs:63–:84 | the codec's own body]` · `[A3 docs/decisions.md · A147 | the ruling's own row]` |
| **`src/store.rs`'s save, loader and commit-verification** | the file tier's three `json` call sites, unmoved | `[A1 src/store.rs:1301 · :1305 · :1404 | the file tier's own call sites]` |
| **`A141` · `A142` · `A143` · `A144`** | the file tier's image, the number spelling, the JSON-conformance ruling and the commit's verification, all unmoved | `[A3 docs/decisions.md · A141 · A142 · A143 · A144 | the rulings' own rows]` |
| **THE FOUR CARRIER TAG SITES** — `address_of` · `tier_of` · `op_id_of` · `handle_arg_of` | the address, tier, op-id and handle carriers are CARRIERS, not the value tree | `[A1 bindings/js/src/codec.rs:485 · :562 · :602 · :629 | the codec's own four carrier arms]` |
| **THE ENCODER'S CARRIER ENCODERS** — `encodeAddress` · `encodeTier` · `encodeTierSetItem` · `encodeOpId` | the same reason, on the JavaScript half | `[A1 bindings/js/index.mjs:1351 · :1482 · :1546 · :1573 | the encoder's own carrier encoders]` |
| **THE STORE'S NATIVE API** | the native API can still be **CALLED** with an outside value, and **THE STORE REFUSES IT** there — `ValueNotAdmitted` is still the answer, and the store's own source produces no outside value for a read to return (`M-8`) | `[A2 docs/specs/storeroom-native/contract.md §1.4 | the admitted taxonomy and its outside list]` · `[A1 src/store.rs:1982–:1983 | the store's own refusal arm]` |
| **THE STORE'S OWN CLOSED STATUS SET, AND THE WIDENING OF IT** — `src/error.rs`'s `CODES` array (`src/error.rs:43`–`:60`) and the store contract's own set rows (`docs/specs/storeroom-native/contract.md §8.1` at `:4103` and `§8.2` at `:4279`) | **OUT OF THIS UNIT'S SCOPE: THE CLOSED SET IS THE STORE CONTRACT'S TO CLOSE, AND `A147` FORBIDS `ValueNotAdmitted` AS THE PACKAGE'S ANSWER — SO `OM-2`'s FIRST HALF MAY ROUTE TO A SET WIDENED TO `17`, AND THAT WIDENING IS A **STORE-SIDE** CHANGE TO `src/error.rs` AND TO THE STORE CONTRACT'S OWN ROWS. A STORE-SIDE CHANGE IS ANOTHER UNIT'S WORK; THIS FILING NAMES WHAT IS AT STAKE AND TAKES NO RULING. **AND IT IS **NOT** A ONE-FILE EDIT AND IT **COLLIDES WITH THE STORE'S OWN REGISTER ROW** (`P-TP-8`: *"a set of `15` or `17`"* — so **A `17`-MEMBER SET FAILS THAT ROW**); THE HOMES THAT PRINT THE `16` ARE NAMED AT `OM-2`** | `[A1 src/error.rs:43–:60 · :251–:254; A2 docs/specs/storeroom-native/contract.md §8.1 · §8.2 | the set's own array, the one value-class clause and the store's own rows]` · `[A2 docs/specs/storeroom-native/implementation-plan.md §10.9 row 8 | the store's own register row]` · `[A3 docs/decisions.md · A147 | the ruling's own row]` |
| **THE NINE `JsValue` OUTSIDE VARIANTS' DECLARED EXISTENCE** | they REMAIN DECLARED; only their reach from the **COPY-IN** half of the JavaScript route ends — and **THE COPY-OUT'S ARMS FOR THEM ARE UNPRODUCED** (`M-8`), so they stay reachable only from the crate's own Rust surface | `[A1 bindings/js/src/crossing.rs:130–:150 | the enum's own variants]` |

### 4.5 THE LAYER CLAUSE

**EVERY OBSERVABLE NAMED IN THIS FILE IS `ENVELOPE/PURE`** — the wire's value tree, the two codecs' arms, the markers,
the refusal's site and the residue census are all ENVELOPE artefacts of the crossing, measured in-process. **NO
`APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE FOR THIS UNIT** `[A2 docs/specs/storeroom-js/crossing.md §1.1 | the
copy discipline]`.

---

## §5. THE OPEN MECHANICS

**THIS FILING TAKES NONE OF THEM, AND EACH IS NAMED WITH ITS OWN SUBJECT, ITS OWN MEASURED GROUND AND WHAT A DECISION
WOULD HAVE TO TOUCH. THE SET IS THE **UNION** OF THE CORPUS'S OWN SET AND THIS FILING'S OWN, AND THE UNION IS
RECONCILED AND ENUMERATED AT `§5.8`.**

### 5.1 `OM-1` — **THE ADOPTION QUESTION: HOW THE NATIVE HALF READS A JSON TREE OUT OF LIVE NODE-API VALUES — OPEN, BOTH ROUTES PRICED, NEITHER TAKEN**

**THE QUESTION, STATED AS A QUESTION:** the native half must read a JSON value tree out of live Node-API values. **By
what route?** **THE GATE MUST SETTLE THIS AND THIS FILING TAKES NEITHER ROUTE.**

**THE CONSTRAINT THAT MAKES IT A QUESTION.** `bindings/js/Cargo.toml`'s `[dependencies]` table carries **exactly three
entries** — `storeroom-native = { path = "../.." }` (`:31`) · `napi = { version = "3.14", features = ["napi6",
"napi9", "compat-mode"] }` (`:54`) · `napi-derive = { version = "3" }` (`:65`) `[A1 bindings/js/Cargo.toml:30–:65 | the
manifest's own table]` — **and `P-ADA-1` PINS THAT COUNT: *"the crate's dependency table carries exactly the three
entries the manifest declares … and no fourth"*, with **"a FOURTH entry"** first in its failure list** `[A2
docs/specs/storeroom-addon-adoption/contract.md §5 | the register's own row]` — **AND `A145`, THE ROW THAT CREATED THE
THIRD ENTRY, SAYS IT IN ITS OWN WORDS: *"AND NO FOURTH ENTRY IS LAWFUL"*, with its failure list naming **a FOURTH
entry** and **a caret floor other than `"3"` on the derive** — AND NOT A FEATURE LIST** `[A3 docs/decisions.md · A145 |
the ruling's own row]`. **THE ROW'S OWN STRATEGY IS
`S-DEP-TABLE` — *"read `bindings/js/Cargo.toml`'s `[dependencies]`; assert exactly three entries with those keys and
those requirement strings"* — SO A FEATURE LIST ON AN EXISTING ENTRY IS NOT AN ENTRY, AND A FEATURE WIDENING IS
WITHIN `P-ADA-1`'S SUBJECT.**

**ROUTE (a) — A HAND-WRITTEN JSON-TREE READER OVER THE BOUNDARY'S OWN VALUES.**
- **THE HOUSE STYLE IT MATCHES IS MEASURED, NOT ASSERTED.** `src/value.rs`'s `StoreValue` carries a **hand-written
  `Visitor` rather than a derive**, and the file says why: *"A HAND-WRITTEN `Visitor` RATHER THAN A DERIVE, AND THE
  REASON IS THE `Object` ARM"* — the visitor keeps the outside classes unreachable from text
  (`src/value.rs:166`–`:174`), and the impl runs `deserializer.deserialize_any(ValueVisitor)`
  (`src/value.rs:257`) `[A1 src/value.rs:163–:258 | the decoder's own body]`.
- **THE PRICE, MEASURED:** the reader is new code at the boundary, and the crossing's native half is the crate's
  **PURE-RUST** module — *"IT IS PURE RUST … no `napi` type"* (`bindings/js/src/crossing.rs:4`) — **so a reader over
  live Node-API values CANNOT LIVE THERE; it must live at the boundary layer, `bindings/js/src/codec.rs`, which is
  the `napi`-typed half** `[A1 bindings/js/src/codec.rs:80–:88 | the boundary layer's own imports]` · `[A1
  bindings/js/src/crossing.rs:4 | the pure half's own declaration]`. **A reader that decides a class must decide it
  in the house style `M-3` records — the package's own walk — and a reader that reads the SAME value twice would
  break `docs/specs/storeroom-js/crossing.md §1.4` item `7`'s own rule that the walk reads each member ONCE** `[A2
  docs/specs/storeroom-js/crossing.md §1.4 | the walk's own items]`. **A HAND-WRITTEN READER IS ALSO A SECOND
  CLASS-DECISION SITE, and the question of which site decides is a question the contract must answer, not the
  implementer's.**

**ROUTE (b) — THE `napi` CRATE'S OWN `serde-json` CAPABILITY.**
- **THE CAPABILITY IS MEASURED IN THE ADOPTED CRATE'S OWN BYTES.** `napi 3.14.2` declares a `serde-json` feature
  (`napi-3.14.2/Cargo.toml:114`–`:117`) that enables the crate's own optional `serde` and `serde_json` dependencies
  (`napi-3.14.2/Cargo.toml:190`–`:196`) `[A1 .cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f/napi-3.14.2/Cargo.toml:114–:117 · :190–:196 | the adopted crate's own feature table]`. The crate's own conversion module carries `ToNapiValue`/`FromNapiValue`
  impls for `serde_json::Value` and `serde_json::Map<String, Value>`
  (`napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:48`–`:53`, `:118`–`:135`, `:295`–`:334`) and the crate exposes
  `De` and `Ser` under the same feature (`napi-3.14.2/src/js_values/mod.rs:71`–`:72`, `:86`–`:87`) `[A1
  .cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f/napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:48–:135 · :295–:334; napi-3.14.2/src/js_values/mod.rs:71–:72 · :86–:87 | the adopted crate's own capability]`.
- **IT IS A FEATURE WIDENING OF AN EXISTING ENTRY, NOT A FOURTH ENTRY.** The `napi` entry already carries a feature
  list (`bindings/js/Cargo.toml:54`), and **the corpus records a prior widening as a widening at that same line** —
  the `napi9` addition, whose own comment says *"THE WIDENING IS RECORDED BECAUSE IT IS A WIDENING"*
  (`bindings/js/Cargo.toml:40`–`:53`) `[A1 bindings/js/Cargo.toml:40–:54 | the manifest's own record]`. **AND
  `P-ADA-1`'s FAILURE LIST NAMES *"a FOURTH entry"* — NOT A FEATURE LIST** `[A2
  docs/specs/storeroom-addon-adoption/contract.md §5 | the register's own row]`.
- **THE PRICE, MEASURED — AND IT IS NOT ONE PRICE BUT THREE.**
  1. **THE CRATE'S OWN CONVERSION CARRIES TWO CEILINGS OF ITS OWN, AND NEITHER IS THE PACKAGE'S WALK'S.** The
     crate's `MAX_JSON_DEPTH` is **`128`** (`napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:18`) and its
     `MAX_JSON_NODES` is **`1,000,000`** (`:24`) `[A1 …/napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:18 · :24 |
     the adopted crate's own bounds]`. **THE PACKAGE'S OWN WALK'S DECLARED CEILINGS ARE DEPTH `64` AND
     `1,000,000`** — *"The walk refuses a value whose nesting depth exceeds `64` or whose visited-node count exceeds
     `1,000,000`"* `[A2 docs/specs/storeroom-js/crossing.md §1.4 | the walk's own items]` — **SO ROUTE (b) PUTS A
     SECOND, DIFFERENT DEPTH CEILING ON THE CROSSING, AND THE TWO FIGURES DIFFER (`128` against `64`).**
  2. **THE CRATE'S OWN CONVERSION REFUSES **THREE** OF THE SIXTEEN CLASSES BY A CLASS ARM — WITH THE CRATE'S OWN ERROR AND THE CRATE'S OWN
     MESSAGE TEXT, NOT AT THE PACKAGE'S OWN BOUNDARY.** Its `value_from_napi_value` returns `Err` with
     `Status::InvalidArg` and the crate's own strings for **a function (`:222`–`:227`), an `undefined` (`:228`–`:233`),
     a symbol (`:234`–`:239`) — THREE CLASS ARMS, AND THREE OF THE SIXTEEN** `[A1 …/napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:222–:239 | the adopted crate's own class arms]`. **AND THE RANGE ALSO SPANS TWO ARMS THAT ARE NOT CLASS ARMS FOR THE CLASS SET: an
      `external` (`:240`–`:245`) — WHICH IS **NOT** ONE OF THE SIXTEEN CLASSES — AND THE CATCH-ALL `_` (`:246`–`:251`),
      *"Unknown JS variables cannot be represented as a serde_json::Value"*** `[A1 …/napi-3.14.2/src/bindgen_runtime/
      js_values/serde.rs:240–:251 | the adopted crate's own remaining arms]`. **AND THE CLASS SET'S OTHER THIRTEEN ARE **NOT** ALL REFUSED BY A CLASS ARM:
      **A `bigint` IS **CONVERTED**, NOT REFUSED** — the crate's own `ValueType::BigInt` arm (`:202`–`:220`) reads the
      bigint and yields a **number** when the conversion is lossless and a **string** otherwise `[A1 …/napi-3.14.2/src/
      bindgen_runtime/js_values/serde.rs:202–:220 | the adopted crate's own bigint arm]`; **A `null` IS CONVERTED** —
      the crate's own `ValueType::Null` arm answers `Value::Null` (`:221`) `[A1 …/napi-3.14.2/src/bindgen_runtime/
      js_values/serde.rs:221 | the adopted crate's own null arm]`; **A NON-FINITE NUMBER IS REFUSED BY A
      **CONVERSION**, NOT BY A CLASS ARM** — the crate's own `Number` conversion answers `Err(Status::InvalidArg,
      "Failed to convert js number to serde_json::Number")` (`:375`–`:398`) `[A1 …/napi-3.14.2/src/bindgen_runtime/
      js_values/serde.rs:375–:398 | the adopted crate's own number conversion]`; **A CYCLE IS REFUSED BY A **BOUND**,
      NOT BY A CLASS ARM** — the crate's own depth ceiling answers at `…/serde.rs:171`–`:172` under `MAX_JSON_DEPTH`
      (`:18`) `[A1 …/napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:18 · :171–:172 | the adopted crate's own bound]`;
      **A SPARSE ARRAY IS REFUSED AS ITS HOLE, NOT AS A HOLE** — the crate reads the element and the read answers
      `undefined` (`:185`–`:189`), which the `undefined` arm then refuses `[A1 …/napi-3.14.2/src/bindgen_runtime/
      js_values/serde.rs:185–:189 | the adopted crate's own element read]`; **AND A `Proxy` AND A PROTOTYPE-CARRYING
      OBJECT HAVE **NO CLASS ARM AT ALL** — the crate's own conversion reads the members with `Object::keys` (`:273`)
      and tests no prototype, **where the package's own walk refuses a `Proxy` BEFORE reading any member**
      (`bindings/js/index.mjs:1052`–`:1053`) `[A1 …/napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:273;
      bindings/js/index.mjs:1052–:1053 | the two class decisions, side by side]`. **⟹ THE PRICE OF ROUTE (b) IS THEREFORE
      NOT "THE CRATE REFUSES THE CLASS SET": THE CRATE MAKES **THREE** CLASS DECISIONS FOR ITS OWN REASONS,
      **CONVERTS** TWO, AND REACHES FIVE MORE BY A BOUND, A CONVERSION OR A MEMBER READ (the over-the-walk ceiling
      being priced at item `1`) — SO THE CLASS DECISION IS THE CRATE'S, NOT THE PACKAGE'S, ON EVERY ARM.** **AND THE
      CLASS SET'S REMAINING FIVE — THE TWO LONE-SURROGATE POSITIONS · THE `Symbol`-KEYED PROPERTY · THE OWN ACCESSOR
      PROPERTY · THE CLASS EXTENDING `Array` — ARE NOT PRICED IN THIS LIST, AND THE CRATE'S OWN MATCH CARRIES **NO CLASS
      ARM** FOR ANY OF THEM** `[A1 …/napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:167–:251 | the crate's own match
      arms]`. **A147's SECOND ANSWER IS *"REFUSE THEM AT THE PACKAGE'S BOUNDARY"*, AND THE CRATE'S OWN ERROR IS NOT THE PACKAGE'S OWN BOUNDARY** `[A3 docs/decisions.md · A147 | the ruling's own row]`.
  3. **THE CRATE'S OWN CONVERSION READS THE JS VALUE'S OWN MEMBERS AND ITS OWN CLASS — so under route (b) the
     class decision and the member read would be the CRATE'S, over a value the package's own walk had already
     classified.** The crate reads the class with `type_of!` (`:165`) and the members with `Object::keys`
     (`:273`) `[A1 …/napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:165 · :273 | the adopted crate's own reads]`.
     **WHICH SITE DECIDES IS THE SAME QUESTION AS ROUTE (a)'s, AND IT IS NOT ANSWERED HERE.**
  4. **AND THE PRICE THAT IS A **SCOPE INTRUSION**: A `serde_json::Value` INTERMEDIATE WOULD SIT **BETWEEN THE TWO
     SCOPES THE CROSSING IS COMPILED AS** — the crate's **PURE-RUST** half (`bindings/js/src/crossing.rs:4` — *"IT IS
     PURE RUST … no `napi` type"*) and the **`napi`-TYPED** half (`bindings/js/src/codec.rs:80`–`:82`) — **PUTTING A
     THIRD CRATE'S VOCABULARY AT THE BOUNDARY THIS UNIT IS ABOUT** `[A1 bindings/js/src/crossing.rs:4;
     bindings/js/src/codec.rs:80–:82 | the two halves' own declarations]`. **A FACT TO PRICE, NOT A RULING.**
- **AND THE PRICE THAT IS NOT A PRICE:** the binding crate's lock is **not committed**
  (`bindings/js/.gitignore:6`) `[A1 bindings/js/.gitignore:6 | the ignore's own line]`, so a widening's transitive
  closure is **not pinned by this repository** — the same consequence the corpus already records for the third entry
  (`docs/specs/storeroom-addon-adoption/binding-crate-and-abi.md §1` — *"nothing in this repository pins the adopted
  library's closure, so the caret floor is the whole pin"*) `[A2
  docs/specs/storeroom-addon-adoption/binding-crate-and-abi.md §1 | the manifest's own clause]`.

**⟶ THE QUESTION IS NAMED AND NEITHER ROUTE IS TAKEN: WHICH OF (a) AND (b) THE NATIVE HALF READS A JSON TREE BY, AND
WHICH SITE DECIDES THE CLASS. THE GATE OWES THIS; THIS FILING OWES IT NO ANSWER.**

### 5.2 `OM-2` — **THE JAVASCRIPT-VISIBLE ANSWER FOR THE CLASS SET (SIXTEEN CLASSES): ITS STATUS (FIRST HALF) AND ITS MESSAGE'S PROVENANCE (SECOND HALF) — OPEN, AND THE STATUS HALF IS THE ARCHITECT'S TO SETTLE AND NOT THE CONTRACT'S**

**THE STATUS IS NOT A DETAIL HERE, BECAUSE EVERY REFUSAL THIS PACKAGE THROWS CARRIES ONE.** The package's thrown form
is `fail`'s three-member object — `status`, `message`, `log` — (`bindings/js/index.mjs:590`–`:596`) and the frame that
renders a boundary refusal **passes the status in as an argument rather than choosing it** — *"THE STATUS IS NEVER
MINTED"*, the file's own words at `bindings/js/index.mjs:634`–`:636` `[A1 bindings/js/index.mjs:590–:596 · :629–:655
| the form's own body and the frame's own rule]`. **AND THE STATUSES THE PACKAGE MAY USE ARE THE STORE'S CLOSED
SET — SIXTEEN MEMBERS** (`M-9`) — the store's own set, `docs/specs/storeroom-native/contract.md §8.1` `[A2
docs/specs/storeroom-native/contract.md §8.1 | the store's own closed set]`.

**⟶ `A147` MOVES THE ANSWER'S SITE FOR THE CLASS SET (SIXTEEN CLASSES, `§3.3`) ON THE JAVASCRIPT ROUTE AND SAYS THE
STORE'S OWN `ValueNotAdmitted` IS NO LONGER THAT ANSWER** `[A3 docs/decisions.md · A147 | the ruling's own row]`. **WHICH
MEMBER OF THE CLOSED SIXTEEN THE PACKAGE'S OWN BOUNDARY REFUSAL ANSWERS WITH FOR THAT CLASS SET IS **NOT** STATED BY
THE RULING, AND IT IS NOT STATED HERE.**

**⟶ AND THE STATUS HALF IS **THE ARCHITECT'S** TO SETTLE, NOT THE CONTRACT'S, AND THE REASON IS THE CLOSED SET'S OWN
MEMBERSHIP.** **THE CLOSED SET IS THE **STORE CONTRACT'S** TO CLOSE** — `docs/specs/storeroom-native/contract.md §8.1`'s
own set, whose size and algebra stand at `11 + 2 + 1 + 1 + 1 = 16` ✓ `[A2 docs/specs/storeroom-native/contract.md §8.1
| the store's own closed set]`. **AND WITHIN THAT SET, **ONLY ONE MEMBER'S GENERATED CLAUSE NAMES A *VALUE CLASS* AT
ALL**: `ValueNotAdmitted`'s own clause reads *"is not an admitted value, admitted values are strings, booleans, finite
numbers, plain objects and arrays"* (`src/error.rs:251`–`:254`) — **AND EVERY OTHER MEMBER'S CLAUSE NAMES AN ADDRESS, A
CONTAINER, A TIER, A JOURNAL OR A COMMIT** (`src/error.rs:43`–`:60`) `[A1 src/error.rs:43–:60 · :251–:254 | the set's own
array and the one value-class clause]`. **AND `A147` FORBIDS `ValueNotAdmitted` AS THE ANSWER** `[A3
docs/decisions.md · A147 | the ruling's own row]`. **⟹ THE ANSWER IS EITHER A MEMBER WHOSE GENERATED MESSAGE MISSTATES
THE SUBJECT, **OR** THE SET IS WIDENED TO `17` — AND THE WIDENING IS A **STORE-SIDE** CHANGE, NOT A PACKAGE-SIDE ONE:
`src/error.rs`'s own `CODES` array (`src/error.rs:43`–`:60`) and the store contract's own set rows
(`docs/specs/storeroom-native/contract.md §8.1` at `:4103` and `§8.2` at `:4279`) `[A1 src/error.rs:43–:60; A2
docs/specs/storeroom-native/contract.md §8.1 · §8.2 | the store-side set and its own rows]`. **`§4.4` NAMES THAT CHANGE
IN ITS SCOPE LIST, IN THIS FILING'S OWN WORDS AND AS A CONSEQUENCE TO BE SETTLED — AND THIS FILING TAKES NO RULING ON
IT.** **⟹ AND THE WIDENING'S BLAST RADIUS IS **WIDER THAN ONE FILE** AND IT **COLLIDES WITH THE STORE'S OWN REGISTER
ROW**: `P-TP-8`'s failure list names *"a set of `15` or `17`"*, so **A `17`-MEMBER SET FAILS THAT ROW** — and at least
**five** other homes print the `16`: `src/error.rs:43` · `tests/support/mod.rs:461` (`CLOSED_CODES`) ·
`docs/specs/storeroom-native/contract.md §8.1`/`:8.2` · `docs/specs/storeroom-js/surface.md:1570` (*"ALL `16` FAIL CODES
REMAIN REACHABLE FROM JS"*) · the JS greens' three printed arrays (`greens.mjs:90`–`:99` ·
`held-listener-identity-greens.mjs:37`–`:40` · `file-tier-save/scenarios.mjs:821`–`:824`) `[A2
docs/specs/storeroom-native/implementation-plan.md §10.9 row 8 | the store's own register row]` · `[A1
tests/support/mod.rs:461 | the drive-side census]` · `[A2 docs/specs/storeroom-js/surface.md §2.9 item 2 | the surface's
own reachability clause]`. **⟹ SO THE FIRST HALF IS A **BLAST-RADIUS** QUESTION, NOT A ONE-FILE EDIT — A FACT TO PRICE,
NOT A RULING.** **⟹ AND THE DIRECT OBSERVABLE IS UNCHANGED: the fifteen greens cells `M-9` measures assert
`ValueNotAdmitted` for those classes on this route** (`M-9`).

**⟶ AND THE SECOND HALF — THE MESSAGE'S PROVENANCE — HAS ITS OWN GROUND, AND IT IS A SEPARATE MECHANIC WITHIN THIS
ONE.** **THE PACKAGE'S OWN BOUNDARY REFUSAL RENDERS `${generated}, ${clause}`** — `bindings/js/index.mjs`'s
`boundaryReject` (`bindings/js/index.mjs:655`) builds `generated` from the **STORE'S OWN GENERATOR**
(`bindings/js/index.mjs:666`–`:668`, reached through the addon's `errorMessage`) and appends the package's own clause
beside it (`bindings/js/index.mjs:669`) `[A1 bindings/js/index.mjs:655–:669 | the frame's own body]`. **AND THE CORPUS'S
OWN RULE FOR THE MESSAGE'S AUTHORITY IS `docs/specs/storeroom-js/surface.md §2.5` ITEM 6 (d)**, whose own first words
are *"for a failure the store itself produces, `message` is the store's generated string verbatim"*
(`docs/specs/storeroom-js/surface.md:1213`–`:1215`) — **AND WHOSE NEXT SENTENCE ALREADY COVERS *"a refusal the PACKAGE'S
OWN WALK produces"*, THE MESSAGE BEING *"the string the store's own generator yields for the answering code at the
failing target"* (`docs/specs/storeroom-js/surface.md:1215`–`:1217`), WITH ITS OWN STATED GAP — *"this section declares
the AUTHORITY (the store's generator) and does not claim a byte-equality it cannot reach"* (`:1221`–`:1225`) `[A2
docs/specs/storeroom-js/surface.md §2.5 | the message's own rule]`. **⟹ SO THE AUTHORITY IS **STATED**; WHAT THE SECOND
HALF ASKS IS **WHICH** GENERATOR CLAUSE, **FOR WHICH** CODE, **RENDERS** FOR A CLASS THE STORE'S OWN TAXONOMY NEVER
CARRIED — AND THAT IS THE FIRST HALF'S ANSWER SEEN FROM THE MESSAGE'S SIDE, TOGETHER WITH THE COMPOSITE'S SECOND HALF
(`:669`) AND ITEM 6 (b)'s OWN REASON HALF (`docs/specs/storeroom-js/surface.md:1196`–`:1205`).** **THIS FILING NAMES
THE SECOND HALF AND ANSWERS NEITHER HALF.**

### 5.3 `OM-3` — **THE `A140` ROW'S OWN JSON-TEXT ROUTE AND ITS `{"e": <class-token>}` ENVELOPE, AGAINST `A147`'S SECOND ANSWER — OPEN**

**`A140` IS AN ACTIVE ROW AND IT IS NOT THIS UNIT'S TO VOID.** Its own words, as recorded: *"The binding's input and
output copies MAY cross through JSON text: `JSON.stringify` over the walk's own sanitized clone on the way in, and the
store's plain-JSON `serde` image on the way out"* — *"JSON text is BINDING-INTERNAL: no store verb accepts, returns or
exposes it"* — and of the wire: *"The value envelope is `{"v": <plain JSON>}`; a refusal is `{"e": <class-token>}`. The
class token is the walk's own fault class; the Rust bridge maps it to the representative outside `StoreValue` so the
store still produces `ValueNotAdmitted` from its own generator, and the path stays in JS."* `[A3 docs/decisions.md ·
A140 | the ruling's own row]`.

**THE INTERSECTION, STATED PRECISELY AND NOT DECIDED:**
- **`A140` IS A `MAY` AND IT ALREADY SANCTIONS A JSON-TEXT CROSSING** — a `{"v": <plain JSON>}` value envelope, which
  is **the JSON value tree in a wrapper** `[A3 docs/decisions.md · A140 | the ruling's own row]`.
- **`A140`'S `{"e": <class-token>}` ENVELOPE IS THE SIDE-CHANNEL BRANCH** — *"the Rust bridge maps it to the
  representative outside `StoreValue` so the store still produces `ValueNotAdmitted`"* — **AND `A147`'S SECOND ANSWER
  IS THE *OTHER* BRANCH** — refuse at the package's own boundary, and the store's own `ValueNotAdmitted` is no longer
  the answer for those classes on the JavaScript route `[A3 docs/decisions.md · A140 · A147 | the two rows]`.
- **AND THE PRICE OF THE TEXT ROUTE, MEASURED:** the store crate's JSON module is **PRIVATE** — `mod json;` at
  `src/lib.rs:26`, and `src/json.rs`'s `encode`/`decode` are `pub(crate)` (`src/json.rs:63` · `:82`) — **so the
  binding crate can reach neither of them** `[A1 src/lib.rs:24–:41 · src/json.rs:63 · :82 | the store crate's own
  module list]`. **THE `A140` ROUTE'S "THE STORE'S PLAIN-JSON `serde` IMAGE ON THE WAY OUT" WOULD NEED A STORE-SIDE
  EXPOSURE, WHICH `A140` ITSELF FORBIDS** (*"no store verb accepts, returns or exposes it"*) `[A3 docs/decisions.md ·
  A140 | the ruling's own row]`.

**⟶ THE QUESTION IS NAMED AND NOT DECIDED: FOR THE CLASS SET ON THE JAVASCRIPT ROUTE, IS `A140`'s `{"e":
<class-token>}` SIDE-CHANNEL STILL OPERATIVE, OR HAS `A147`'S SECOND ANSWER REPLACED IT? AND IF `A140`'s
BINDING-INTERNAL JSON-TEXT ROUTE IS TAKEN AS WELL, WHAT READS THE TEXT ON THE NATIVE HALF — THE SAME `OM-1`
QUESTION, IN A TEXT FLAVOUR.**

### 5.4 `OM-4` — **THE TAGGED OBJECT ARM'S THREE WALK-DECISION MEMBERS (`p` · `acc` · `proxy`) HAVE NO JSON SPELLING — OPEN**

**`M-2` MEASURED IT: THE TAGGED OBJECT FORM CARRIES THREE MEMBERS THAT ARE NOT VALUES BUT THE WALK'S OWN DECISIONS**
— the prototype class `p`, the accessor flag `acc` and the proxy flag `proxy` (`bindings/js/index.mjs:1112`; read at
`bindings/js/src/codec.rs:404` · `:415` · `:419`) `[A1 bindings/js/index.mjs:1112; bindings/js/src/codec.rs:404 · :415 ·
:419 | the two sides' own members]`. **A JSON OBJECT SPELLS NONE OF THEM** — and the classes they record are
`docs/specs/storeroom-js/crossing.md §1.4` item `4`'s own per-class decisions: the plain-object test's prototype half
(item `4` (e) and (f)) and its accessor half (item `4` (c)), and the `Proxy` refusal (item `4` (g)) `[A2
docs/specs/storeroom-js/crossing.md §1.4 | the walk's own items]`.

**⟶ THE QUESTION IS NAMED AND NOT DECIDED: DO THOSE THREE DECISIONS CROSS AT ALL, OR ARE THEY DECIDED AT THE PACKAGE'S
OWN BOUNDARY AND NOT CARRIED? **THE ANSWER HAS A DIRECT CONSEQUENCE FOR THE NATIVE HALF'S SHAPE — a JSON value tree
carries no `p`, no `acc` and no `proxy`, so a native reader that expects them finds nothing — AND IT IS A QUESTION
ABOUT THE CONTRACT'S TEXT, NOT ABOUT THE IMPLEMENTATION.**

**⟶ AND THIS IS A **COPY-IN-ONLY** QUESTION, AND THE COPY-OUT IS **INDIFFERENT** TO IT — AT ITS OWN BYTES.** The
copy-out's object form **already carries** the three members — `to_js_value` writes `p` (`bindings/js/src/codec.rs:885`) ·
`acc` (`:886`) · `proxy` (`:887`) — and **THE COPY-OUT'S OWN READER NEVER READS THEM**: `decodeValue` reads `k` · `v` ·
`i` · `m` and nothing else (`bindings/js/index.mjs:1801`–`:1827`), while the three are read **ONLY** by the copy-in's
`value_of` (`bindings/js/src/codec.rs:404` · `:415` · `:419`) `[A1 bindings/js/src/codec.rs:885–:887 · :404 · :415 · :419;
bindings/js/index.mjs:1801–:1827 | the writer's own members and the two readers]`. **⟹ WHATEVER `OM-4` IS ANSWERED, THE
COPY-OUT'S OWN FORM IS THE SAME — SO `OM-4` IS **A COPY-IN-ONLY QUESTION** AND THE COPY-OUT IS **INDIFFERENT** TO IT.**

### 5.5 `OM-5` — **THE COPY DISCIPLINE: THE CROSSING IS A DEEP COPY IN BOTH DIRECTIONS, AT EVERY DEPTH, WITH NO SHARED OWNERSHIP — OPEN**

**THE CORPUS'S OWN QUEUE ROW NAMES THIS MECHANIC AND THIS FILING'S OWN `OM-1`–`OM-4` DID NOT** (`N8` (c)) `[A3
docs/next-steps.md · N8 | the queue's own row]`. **THE DISCIPLINE ITSELF IS RULED AND IT IS NOT THIS UNIT'S TO RE-RULE:**
*"Input must deep-copy the external data into the store, and the output must deep-copy from the store into the JS
output. Neither the store nor the JS should be able to get a reference/pointer to data owned by the other"* —
`docs/specs/storeroom-js/crossing.md §1.1`'s own four clauses, at `:30`–`:45` `[A2 docs/specs/storeroom-js/crossing.md
§1.1 | the copy discipline]`. **THE QUESTION THE CORPUS'S ROW PUTS IS WHETHER THE RULING'S NEW VALUE TREE STILL BUILDS
A COPY — because a value tree that SHARED OWNERSHIP with the caller's own object would break the discipline even where
every other clause holds.**

**⟶ AND THE READ-ONCE RULE IS A CONSTRAINT ON ANY READER THE NATIVE HALF ADOPTS, WHICHEVER ROUTE `OM-1` TAKES:**
`docs/specs/storeroom-js/crossing.md §1.4` item `7` — *"THE WALK READS EACH MEMBER ONCE, AND THAT IS THE WHOLE OF THE
MUTATION ANSWER. No snapshot is taken and no argument is deep-copied twice"* (`:556`–`:557`) — **with the mutation answer
itself at `§1.1`'s third paragraph (`:52`–`:57`): *"a mutation that lands after a member has been visited is not
observed, and a mutation that lands on a member the walk has not yet reached IS observed — a single call is therefore a
sequence of read-once observations and never a snapshot"*** `[A2 docs/specs/storeroom-js/crossing.md §1.1 · §1.4 | the
copy discipline and the walk's own items]`. **A READER THAT READS A VALUE TWICE BREAKS THAT RULE, AND WHICH READER THE
NATIVE HALF ADOPTS IS `OM-1`'S OWN SUBJECT — SO THE READER IS CHOSEN AGAINST THIS RULE AND NOT AFTER IT.**

### 5.6 `OM-6` — **THE RESIDUE: THE TAGGED FORM'S OWN SITES, AND WHAT THE RULING DOES TO EACH — OPEN**

**THE CORPUS'S OWN QUEUE ROW NAMES THIS MECHANIC AND THIS FILING DID NOT** (`N8` (d)) `[A3 docs/next-steps.md · N8 |
the queue's own row]`. **THE RESIDUE SITES ARE THE ONES `§6` ENUMERATES, AT THEIR OWN BYTES** — the tagged form in the
JavaScript test tree (`§6.1`) · the Rust-side tag-reading arms (`§6.2`) · the `JsValue` enum's outside variants
(`§6.3`) · **the `ValueNotAdmitted` re-render arm (`§6.4`)** · the greens set's cells (`§6.5`) · the dependency table's
two spellings (`§6.6`) · the `PKGS` preflight (`§6.7`).

**THE QUESTION IS NOT "WHICH SITES MOVE" — `§4.1` NAMES THE MOVING ONES — BUT WHAT EACH RESIDUE SITE IS DISPOSED OF AS,
AND BY WHOSE HAND.** **A SITE IN ANOTHER UNIT'S OWN SPEC HOME IS NOT THIS FILING'S TO AMEND**: the `ValueNotAdmitted`
re-render arm's home is `docs/specs/storeroom-addon-surface/`'s own directory (`§6.4`) · the greens set's own cells are
the greens set's (`§6.5`) · the store's own closed status set is the store's (`§4.4`). **⟹ THE RESIDUE IS A SET OF
DISPOSITIONS OWED BY OTHER UNITS' OWN PASSES, AND THIS UNIT'S OWN PASS CANNOT DISPOSE OF THEM ALONE.**

### 5.7 `OM-7` — **THE COPY-OUT DIRECTION: WHAT THE UNIT'S RULING REACHES ON THE NATIVE → JAVASCRIPT HALF, AND THE COPY-OUT'S OWN FORM — OPEN**

**THE CORPUS'S OWN QUEUE ROW NAMES THIS MECHANIC AS THE SCOPE FINDING GATE 1 FOUND** (`N8` (e)) `[A3
docs/next-steps.md · N8 | the queue's own row]`. **`§4.1` RECORDS THE SCOPE FINDING: THE FILING'S "TWO LANDINGS" WERE
THE COPY-IN HALF ALONE, AND THE COPY-OUT HAS ITS OWN TWO** — the native half writes the tagged form
(`bindings/js/src/codec.rs`'s `to_js_value`, `:857`–`:907`) and the JavaScript half reads it (`bindings/js/index.mjs`'s
`decodeValue`, `:1801`–`:1827`) `[A1 bindings/js/src/codec.rs:857–:907; bindings/js/index.mjs:1801–:1827 | the
copy-out's own two sites]`.

**THE QUESTION, STATED AS A QUESTION: DOES THE RULING REACH THE COPY-OUT'S TWO SITES AS WELL, OR IS THE CROSSING'S
VALUE TREE CHANGED ON THE COPY-IN HALF ALONE?** **`A147`'s OWN ROW NAMES THE TAGGED FORM'S TWO **COPY-IN** SITES —
`bindings/js/index.mjs`'s `encodeValue` AND `bindings/js/src/codec.rs`'s `value_of` — AND **THE COPY-OUT IS NAMED
NOWHERE IN THE WHOLE FILE**: a WHOLE-FILE SEARCH of `docs/decisions.md` for `to_js_value` · `decodeValue` · `copy-out` ·
`COPY-OUT` returns **NO MATCH** `[A3 docs/decisions.md · A147 | the ruling's own row]` — **SO `OM-7` STANDS AGAINST THE
AUTHORITY'S **FULL TEXT** AND NOT AGAINST A SPAN, AND THE FILING'S EARLER "IN THE SPAN THIS PASS READ" IS CORRECTED TO
THE WHOLE-FILE FACT.** **AND IF THE RULING REACHES THEM, WHAT IS THE COPY-OUT'S OWN FORM** — the copy-out's nine marker
arms are **UNPRODUCED** (`M-8`), so its **outside-class** question is void and its **form** is what is open (`M-2`'s
copy-out bullet; `M-8`)?

**⟶ THIS FILING NAMES THE QUESTION AND DECIDES NEITHER HALF OF IT.**

### 5.8 THE OPEN LIST, CLOSED AND ENUMERATED — **THE UNION OF THE CORPUS'S OWN SET AND THIS FILING'S OWN**

**THE SET IS `7` MECHANICS (`OM-1` … `OM-7`), WITH `OM-2` CARRYING TWO NAMED HALVES, AND THE ARITHMETIC IS `4 + 3 = 7`
✓ — `4` FROM THIS FILING'S OWN SET (`OM-1` … `OM-4`) AND `3` FROM THE CORPUS'S OWN SET THAT THE FILING DID NOT NAME
(`OM-5` · `OM-6` · `OM-7`).** **NONE IS ANSWERED IN THIS FILING, AND NONE IS A BLOCKER ON THE FILING
ITSELF.**

| The corpus's own row | The corpus's own mechanic, in its own terms | This filing's mechanic | The same thing under two names? |
| --- | --- | --- | --- |
| **`N8` (a)** | the JavaScript-visible answer for the class set (sixteen classes) — **its code AND its message** | **`OM-2`** — the **status** (first half) and the **message's provenance** (second half) | **YES — THE SAME MECHANIC, IN TWO HALVES. THE CORPUS'S ROW NAMES BOTH HALVES IN ONE ROW; THIS FILING NAMES THEM AS `OM-2`'s TWO NAMED HALVES.** |
| **`N8` (b)** | the adoption question | **`OM-1`** | **YES — THE SAME MECHANIC, UNDER THE CORPUS'S AND THIS FILING'S TWO NAMES.** |
| **`N8` (c)** | the copy discipline | **`OM-5`** | **NO — THE FILING'S OWN `OM-1`–`OM-4` DID NOT NAME IT. IT IS NEW TO THE FILING, AND IT IS NAMED AT `§5.5`.** |
| **`N8` (d)** | the residue | **`OM-6`** | **NO — THE FILING'S `§6` LISTED THE RESIDUE **SITES** BUT DID NOT NAME THE RESIDUE AS AN OPEN MECHANIC. IT IS NEW TO THE FILING, AND IT IS NAMED AT `§5.6`.** |
| **`N8` (e)** | the copy-out direction | **`OM-7`** | **NO — NEW TO THE FILING, AND IT IS THE SCOPE FINDING `§4.1` RECORDS.** |
| — | — | **`OM-3`** — `A140`'s `{"e": <class-token>}` side-channel against `A147`'s second answer | **THE FILING'S OWN — NOT IN THE CORPUS'S SET.** |
| — | — | **`OM-4`** — the tagged object arm's three walk-decision members | **THE FILING'S OWN — NOT IN THE CORPUS'S SET.** |

**AND THE CORPUS'S OWN ROW REMAINS THE AUTHORITY FOR THE WHOLE SET, AND ITS OWN SPAN IS THE SPAN READ HERE: THE ROW
NAMES `(a)`–`(e)` IN THE TEXT THIS PASS READ, AND ITS OWN WORDS SAY THAT GATE 1'S STEPS ADDED FURTHER MEMBERS BEYOND
THOSE — **THE ROW'S TAIL WAS READ ONLY TO THE TRUNCATION POINT (`§8.3.6`), SO A MECHANIC NAMED IN THAT UNREAD TAIL IS A
MECHANIC THIS FILING CANNOT HAVE RECONCILED, AND THE ROW ITSELF — NOT THIS TABLE — IS THE AUTHORITY FOR IT.** **THE
TABLE ABOVE IS THEREFORE COMPLETE AGAINST THE SPAN READ AND IS NOT A CLOSURE OF THE CORPUS'S SET.** `[A3
docs/next-steps.md · N8 | the queue's own row]`

---

## §6. THE RESIDUE SITES

**A change that retires a wire form leaves that form's own residue in the tree, and each site below was opened this
pass. NONE is a defect claim: each is a site the change would leave behind, or a site whose declared text would move.**

### 6.1 THE TAGGED FORM IN THE JAVASCRIPT TEST TREE — `23` OCCURRENCES ACROSS `14` LINES AND `4` FILES

**`M-7`'s census, restated as a residue ledger, and SPLIT BY WHAT THE TAG SPELLS — because `8` of the `23` are the
value tree and `15` are carriers the change does not touch:**

| The tag | Occurrences | In scope? |
| --- | --- | --- |
| **`s`** (the value tree's string arm) | **`7`** | **YES** |
| **`n`** (the value tree's number arm) | **`1`** | **YES** |
| **`L`** (the address carrier) | **`6`** | **NO** |
| **`T`** (the tier carrier) | **`8`** | **NO** |
| **`v`** (not a codec tag) | **`1`** | **NO** |

**EVERY SITE IN THIS LEDGER IS `§3.7`'s OWN, AND IS NOT REPEATED HERE** — the per-tag sites are `§3.7`'s breakdown table
and the per-file sites are `§3.7`'s census table, and the whole set is one citation `[A1
bindings/js/test/addon-surface.test.mjs:406 · :615 · :695 · :696 · :710 · :711;
bindings/js/test/file-tier-save-properties.test.mjs:252 · :266 · :270 · :274 · :279;
bindings/js/test/addon-adoption.test.mjs:1005 · :1079; bindings/js/test/a127-surface.test.mjs:273 | the ledger's own
sites]`.

**AND THE FOURTH FILE NAMED IN THE BRIEF CARRIES NONE** — `bindings/js/test/constraint-kernel-states.test.mjs` holds
**NO** tagged form (§3.7's whole-file search, NO MATCH) `[A1 bindings/js/test/constraint-kernel-states.test.mjs — whole-
file searches, NO MATCH | the searched set]`. **THE DISAGREEMENT IS STATED IN `§8.2` AND IS NOT PAPERED OVER.**

### 6.2 THE RUST-SIDE ARMS THAT READ THE TAGS

**`bindings/js/src/codec.rs`'s `value_of` and its fifteen dispatch arms — `:333` (the tag read) · `:338` · `:343` ·
`:352` · `:359` · `:364` · `:371` · `:372` · `:373` · `:374` · `:375` · `:376` · `:377` · `:378` · `:429` · the
fall-through `_` at `:437`** — and the object arm's four members (`:380` · `:404` · `:415` · `:419`) `[A1
bindings/js/src/codec.rs:333–:439 | the codec's own arms]`. **AND THE FOUR CARRIER TAG SITES THAT SURVIVE UNCHANGED** —
`:485` · `:562` · `:602` · `:629` `[A1 bindings/js/src/codec.rs:485 · :562 · :602 · :629 | the codec's own carrier
arms]`.

### 6.3 THE `JsValue` ENUM'S NINE OUTSIDE VARIANTS

**`bindings/js/src/crossing.rs:130`–`:150` — `SparseArray` (`:139`) · `Null` (`:140`) · `Undefined` (`:141`) ·
`Function` (`:142`) · `Symbol` (`:143`) · `BigInt` (`:144`) · `NonFinite` (`:145`) · `Cyclic` (`:147`) ·
`NonPlainCollection` (`:149`)** `[A1 bindings/js/src/crossing.rs:130–:150 | the enum's own variants]`. **THEY LEAVE THE
**COPY-IN** HALF'S REACH AND REMAIN REACHABLE FROM THE CRATE'S OWN RUST SURFACE (`M-8`) — AND ON THE COPY-OUT THEIR ARMS
ARE **UNPRODUCED**: the copy-out's nine marker arms (`bindings/js/src/codec.rs:897`–`:905`) and the eight outside arms
(`bindings/js/src/crossing.rs:731`–`:738`) HAVE NO PRODUCER, because **the store's own native route can be **CALLED** with
an outside value and the store **REFUSES** it (`src/store.rs:1982`–`:1983`), and no read returns an outside value
(`M-8`)** `[A1 bindings/js/src/codec.rs:897–:905; bindings/js/src/crossing.rs:731–:738; src/store.rs:1982–:1983 | the copy-out's own arms and the store's own refusal]`. **⟹ THE VARIANTS' REACHABILITY IS A **DIRECTION-SPLIT** FACT, NOT A FLAT ONE, AND WHICH DIRECTION THE RULING REACHES IS NAMED AT `§5.7` AND DECIDED NOWHERE IN THIS FILING.**

### 6.4 THE `ValueNotAdmitted` RE-RENDER ARM — **A RESIDUE SITE WHOSE TRIGGER THE RULING MAKES DEAD FOR THE CLASS SET, AND WHICH IS NOT THIS UNIT'S TO DISPOSE OF**

**THE SITE, AT ITS OWN BYTES.** `bindings/js/index.mjs`'s `writeRefusal` (`bindings/js/index.mjs:2158`–`:2163`) re-renders
the message **only** when the store answered `ValueNotAdmitted` **AND** the walk recorded a fault
(`bindings/js/index.mjs:2159`), and it re-renders it by calling `valueReject` (`bindings/js/index.mjs:938`–`:944`),
which passes the store's own code and the failing target's own spelling to the boundary frame `[A1
bindings/js/index.mjs:938–:944 · :2158–:2163 | the re-render arm's own two sites]`. **THE ARM'S OWN HEADER SAYS WHY IT
IS REACHED ONLY AFTER THE STORE HAS CHOSEN** — *"this site is reached only AFTER the store has chosen which refusal
answers"*, and it records that *"every `ValueNotAdmitted` the walk did not produce (the conversion core's own depth and
node bounds, `§1.4` item 5), crosses VERBATIM"* (`bindings/js/index.mjs:2153`–`:2157`) `[A1
bindings/js/index.mjs:2149–:2157 | the arm's own header]`.

**THE SPEC HOME IS ANOTHER UNIT'S, AND IT IS NAMED AT ITS OWN BYTES:**
- **`docs/specs/storeroom-addon-surface/js-unwrap.md` §3** — *"THE WRITE WRAPPER'S ARM"*: *"When the store refuses a
  value with `ValueNotAdmitted` at a point the boundary's own walk refused, the wrapper RE-RENDERS THE MESSAGE from the
  walk's own fault record … The arm moves into the write member's own body and IS NOT DROPPED. `P-SAS-8` drives it"*
  (`docs/specs/storeroom-addon-surface/js-unwrap.md:44`–`:48`) `[A2 docs/specs/storeroom-addon-surface/js-unwrap.md §3 |
  the arm's own home]`.
- **`docs/specs/storeroom-addon-surface/contract.md`'s `P-SAS-8`** — *"THE WRITE WRAPPER'S ARM IS PRESERVED. Its
  `ValueNotAdmitted` arm is a **message re-render that throws** — not a fault sink — so it moves into the member's own
  body. **It must not be dropped**"* (`docs/specs/storeroom-addon-surface/contract.md:100`) and the register row that
  drives it (`docs/specs/storeroom-addon-surface/contract.md:126`) `[A2
  docs/specs/storeroom-addon-surface/contract.md §4 · §5 | the unit's own clauses and its own row]`.
- **`docs/specs/storeroom-addon-surface/parameter-semantics.md`** — the `fault` record the write path threads, whose
  referent is *"the `ValueNotAdmitted` re-render"* (`:19`), and the write entry wrapper, *"DELETED, WITH ITS ARM
  PRESERVED IN THE MEMBER'S BODY"* (`:28`) `[A2 docs/specs/storeroom-addon-surface/parameter-semantics.md §1 · §2 | the
  unit's own rows]`.
- **`docs/specs/storeroom-addon-surface/test-cases.md`** — `V-10` (`:23`) · `F-7` (`:38`) · `D-8` (`:53`) `[A2
  docs/specs/storeroom-addon-surface/test-cases.md | the unit's own cases]`.

**AND THE ARM'S OWN TEST CELLS, AT THEIR OWN BYTES.** `bindings/js/test/addon-surface.test.mjs:1371`–`:1386` — the cell
`sas_d8_s_fault_arm_a_value_the_walk_refuses_still_answers_ValueNotAdmitted_after_the_unwrap`, whose own assertion text
says *"**THIS IS THE ARM EXISTING AT ALL**: F-7's failure is the arm dropped"* — and
`bindings/js/test/addon-surface-properties.test.mjs:1078`–`:1084`, whose own census asserts that the **only** status
token asserted by that whole property layer is `ValueNotAdmitted` `[A1 bindings/js/test/addon-surface.test.mjs:1371–:1386;
bindings/js/test/addon-surface-properties.test.mjs:1078–:1084 | the arm's own test cells]`.

**⟶ AND WHAT THE RULING DOES TO IT — NAMED AS A CONSEQUENCE TO BE SETTLED, NOT AS A RULING THIS FILING TAKES.** **UNDER
THE RULING THE VALUE NEVER CROSSES: THE CLASS SET IS REFUSED AT THE PACKAGE'S OWN BOUNDARY, BEFORE ANY VERB IS
CALLED** (`§1`'s own words; `docs/decisions.md` · `A147`) `[A3 docs/decisions.md · A147 | the ruling's own row]` **— SO
THE STORE IS NEVER ASKED ABOUT THEM, THE STORE NEVER ANSWERS `ValueNotAdmitted` FOR THEM, AND **THIS ARM'S TRIGGER IS
DEAD FOR THE CLASS SET** (`bindings/js/index.mjs:2159`'s own condition).** **WHAT THE ARM STILL COVERS IS THE OTHER
ARM ITS OWN HEADER NAMES — the conversion core's own depth and node bounds (`bindings/js/index.mjs:2156`–`:2157`) — AND
THAT ARM IS **NOT** ONE OF THE CLASS SET.** **⟹ THE DISPOSITIONS OPENED ARE: (i) WHETHER THE ARM REMAINS FOR THE
BOUNDS ARM, AND (ii) WHETHER THE UNIT'S OWN RE-SPELLING OF THE CLASS SET'S ANSWER LEAVES THE ARM'S OWN CLAUSES AND
CELLS STANDING — AND BOTH ARE `docs/specs/storeroom-addon-surface/`'s OWN PASSES TO DISPOSE OF, BECAUSE THE ARM'S
SPEC HOME IS THAT UNIT'S AND NOT THIS ONE.** **THIS FILING NAMES THE SITE, ITS HOME, ITS CELLS AND THE CONSEQUENCE, AND
DECIDES NONE OF IT.**

### 6.5 THE GREENS SET — THE `ValueNotAdmitted` ANSWER, ASSERTED IN `15` CELLS ON THE JAVASCRIPT ROUTE

- **`bindings/js/greens/greens.mjs`'s `JSG-04`** — `67` assertions in all (`M-9`), of which **the fourteen `refusal`
  calls' `.ii` cells (`:467`) and `JSG-04.17` (`:522`–`:524`) ASSERT THE STATUS `ValueNotAdmitted`** — and the
  fourteen `.iv` cells (`:480`–`:481`) ASSERT THE MESSAGE CARRIES THE STORE'S OWN CLAUSE *"is not an admitted value"*
  `[A1 bindings/js/greens/greens.mjs:467 · :480–:481 · :522–:524 | the cells' own assertions]`. **`JSG-04.15` (`:511`–
  `:512`) ALSO ASSERTS `clean === 14` — THAT AFTER EVERY ONE OF THE FOURTEEN REFUSALS, `read(['v'])` ANSWERS
  `AddressNotFound`** `[A1 bindings/js/greens/greens.mjs:510–:512 | the census's own cell]`.
- **`bindings/js/greens/live-drive.mjs`'s `LIVE-9.6`** (`:467`–`:468`) — the same fourteen classes, the same status
  `[A1 bindings/js/greens/live-drive.mjs:467–:468 | the scenario's own cell]`.
- **THE CLOSED SET OF SIXTEEN STATUS CODES, PRINTED IN THREE GREENS FILES AND ASSERTED AGAINST IN A FOURTH** — the
  three printers are `bindings/js/greens/greens.mjs:90`–`:99` · `bindings/js/greens/held-listener-identity-greens.mjs:37`–`:40` ·
  `bindings/js/greens/file-tier-save/scenarios.mjs:821`–`:824` — **and the fourth file, `bindings/js/greens/live-drive.mjs`,
  asserts against those same statuses without printing the set** (`M-9`) — the set's own home is the store
  `[A1 bindings/js/greens/greens.mjs:90–:99; bindings/js/greens/held-listener-identity-greens.mjs:37–:40; bindings/js/greens/file-tier-save/scenarios.mjs:821–:824 | the three printers' own arrays]` · `[A2 docs/specs/storeroom-native/contract.md §8.1 | the store's own closed set]`.
- **AND THE DEPTH ARMS, WHICH ARE A DIFFERENT ARM OF THE SAME STATUS.** `bindings/js/greens/greens.mjs`'s `JSG-06.3`
  (`:634`–`:635`), `JSG-06.4` (`:637`–`:638`), `JSG-06.5` (`:644`–`:645`) and the sixth depth arm (`:653`) assert
  `ValueNotAdmitted` at walk-depths `65` and `66` `[A1 bindings/js/greens/greens.mjs:634–:653 | the depth arms' own
  cells]`; and `bindings/js/greens/json-acceptance-set-greens.mjs:520` asserts the same status for the depth-`65`
  and `66` arms `[A1 bindings/js/greens/json-acceptance-set-greens.mjs:520 | the cell's own assertion]`. **THE `c`
  MARKER IS ONE OF THE NINE, AND THE DEPTH ARM IS ONE OF ITS THREE SITES** (`M-3`).
- **AND THE OWNERSHIP IS RESOLVED AT `docs/specs/storeroom-json-crossing-implementation-plan.md §P.3` ROW 7: THE GREENS SET'S **PATHS** ARE THIS UNIT'S EDIT SCOPE; THE
  **CELLS'** DISPOSITIONS ARE NOT — A CELL'S DISPOSITION IS ANOTHER UNIT'S OWN CLAIM, AND `OM-6` CARRIES IT.**

### 6.6 THE DEPENDENCY TABLE'S TWO SPELLINGS — A SITE A DECISION ON `OM-1` WOULD MOVE

**THE CONTRACT'S PRINTED TABLE SPELLS THE ENTRY `napi = "3.14"`** (`docs/specs/storeroom-addon-adoption/binding-crate-and-abi.md §1`'s code
block, `:17`–`:22`) **AND THE MANIFEST SPELLS IT `napi = { version = "3.14", features = ["napi6", "napi9",
"compat-mode"] }`** (`bindings/js/Cargo.toml:54`) `[A2 docs/specs/storeroom-addon-adoption/binding-crate-and-abi.md §1 | the contract's own printed table]` · `[A1 bindings/js/Cargo.toml:54 | the manifest's own table]`. **THIS IS A MEASURED DIVERGENCE BETWEEN TWO FILES, IT IS NOT A FINDING AGAINST EITHER, AND IT IS NAMED HERE BECAUSE `OM-1`'s ROUTE (b) IS A WIDENING OF THAT EXACT ENTRY AND THE TABLE'S SPELLING IS WHAT A WIDENING MOVES.**

### 6.7 THE `PKGS` PREFLIGHT — **ALREADY REWRITTEN, AND WHAT IT NOW CHECKS**

**THE PREFLIGHT IS NOT THE COUNT-IS-ONE CHECK, AND A READER WHO CARRIES THE OLD FORM WILL MIS-READ ROUTE (b)'s PRICE.**
`scripts/publish.sh`'s `preflight_pkgs` (`scripts/publish.sh:391`–`:407`) loops over **`Cargo.toml` AND
`bindings/js/Cargo.toml`** (`:393`), reads **each manifest's OWN lock** (`:395`), and compares the lock's package set
against the resolver's own `packages` array (`:399`–`:406`) — and the file's own header says what the replacement
proves: *"THE REPLACEMENT PROVES THE SAME PROPERTY: each lock's package set EXACTLY MATCHES its manifests'
declarations"* (`scripts/publish.sh:382`–`:390`) `[A1 scripts/publish.sh:382–:407 | the preflight's own body]`. **⟹
A FEATURE WIDENING IS NOT A PREFLIGHT FAILURE: the property the preflight proves is set-equality between a lock
and its manifest, and a widening moves BOTH SIDES TOGETHER. **THE BINDING CRATE'S LOCK IS NOT COMMITTED**
(`bindings/js/.gitignore:6`) `[A1 bindings/js/.gitignore:6 | the ignore's own line]`, so the binding crate's lock is
the one the preflight's second iteration reads (`scripts/publish.sh:393`–`:396`) and it is untracked `[A1
scripts/publish.sh:393–:396 | the preflight's own loop]`.**

---

## §7. ALSO CARRIED

### 7.1 THE `A140` ROW STANDS, AND THIS FILING DOES NOT TOUCH IT

**`A140` IS AN ACTIVE ROW AND ITS OWN CLAUSES ARE NOT THIS UNIT'S TO AMEND.** Its binding-internal JSON-text route and
its `{"v": …}` / `{"e": …}` envelope are recorded at `§5.3` as the intersection with `A147`'s second answer, and
**the rest of the row — the walk's class decision before any text, the accepted domain, the `-0` normalization — is
unmoved by this filing** `[A3 docs/decisions.md · A140 | the ruling's own row]`.

### 7.2 THE FILE TIER'S FOUR PINS STAND EXACTLY AS THEY ARE

**`A141` · `A142` · `A143` · `A144` ARE UNMOVED BY THIS FILING AND BY THE RULING** — *"THE `file` TIER'S BYTES DO NOT
MOVE"* `[A3 docs/decisions.md · A147 | the ruling's own row]`. **`§3.1` MEASURED THE FILE TIER'S CODEC'S OWN ARMS AND
`§4.4` NAMES IT AS A SITE THE UNIT DOES NOT LAND ON.**

### 7.3 THE OUTSIDE CLASSES REMAIN DECLARED, ON BOTH ROUTES

**THE NATIVE API CAN STILL BE **CALLED** WITH AN OUTSIDE VALUE, AND THE STORE **REFUSES** IT, ANSWERING
`ValueNotAdmitted` THERE** — the
taxonomy's outside list stands (`docs/specs/storeroom-native/contract.md §1.4`) and the store's own refusal arm stands
(`src/store.rs:1982`–`:1983`) `[A2 docs/specs/storeroom-native/contract.md §1.4 | the admitted taxonomy and its
outside list]` · `[A1 src/store.rs:1982–:1983 | the store's own refusal arm]`. **THE NINE `JsValue` OUTSIDE VARIANTS
REMAIN DECLARED** (`M-8`) — **AND ONLY THEIR REACH FROM THE **COPY-IN** HALF OF THE JAVASCRIPT ROUTE ENDS: THE COPY-OUT'S
ARMS FOR THEM ARE **UNPRODUCED** (`M-8`), so they stay reachable only from the crate's own Rust surface** (`M-2`'s
copy-out bullet; `§6.3`; and the open question at `§5.7`).**

### 7.4 THE STORE'S OWN `ValueNotAdmitted` IS **NOT** THE ANSWER ON THE JAVASCRIPT ROUTE — AND **IS** STILL THE ANSWER ON THE NATIVE ONE

**THE RULING MOVES THE ANSWER'S SITE FOR THE CLASS SET (SIXTEEN CLASSES) ON ONE ROUTE ONLY.** `A147`'s own row is the authority `[A3
docs/decisions.md · A147 | the ruling's own row]`, and `§4.4` and `§7.3` name the routes the store still answers on.
**THE OBSERVABLE IS `M-9`'s `15` GREENS CELLS, AND `OM-2` NAMES THE QUESTION THEY WOULD SETTLE.**

### 7.5 THE STEP-0 ADOPTION DOSSIER — THE UNIT'S HOME, THE STEP OWED, AND WHETHER THE TRIGGER FIRES

**THE DOSSIER'S HOME IS `docs/specs/storeroom-json-crossing-adoption-dossier.md` — THE UNIT'S OWN ID IN THE CORPUS'S
OWN NAMING FORM**, and the precedents are the two existing dossiers: `docs/specs/storeroom-native-adoption-dossier.md`
for `U-STOREROOM-NATIVE` and `docs/specs/storeroom-js-adoption-dossier.md` for `U-STOREROOM-JS` `[A2
docs/specs/storeroom-native-implementation-plan.md; docs/specs/storeroom-js-adoption-dossier.md §0 | the precedent
dossiers' own homes]`.

**IT IS PRODUCED BY STEP 0 AND FOLDED INTO THE GATE'S VERDICT STEP** — `role_change_analysis`, STEP 0, *"folded into
gate 1 step 4"*, the role's own words at `docs/specs/storeroom-js-adoption-dossier.md:3` — **and the gate-1 record it
folds into is `docs/specs/storeroom-json-crossing-proposal-review.md`, the sibling the corpus's own queue row names** `[A2
docs/specs/storeroom-js-adoption-dossier.md §0 | the dossier's own role and its own production step]` · `[A3
docs/next-steps.md · N8 | the queue's own row]`.

**AND THE TRIGGER IS THE CORPUS'S OWN, STATED AT ITS OWN BYTES:** *"the dossier's EXISTENCE for a unit whose contract
names, parameters or vocabulary originate outside this project"* — and beside it the dossier's own schema: one row per
adopted identifier, each carrying its source citation and its `defined` / `undefined-until-answered` STATUS; a POPULATED
COLLISION BLOCK where the trigger fires; and no open row at the point a unit is reported green `[A3 docs/pending.md ·
G-2 | the corpus's own trigger rule and its own schema]`.

**⟹ WHETHER THE TRIGGER FIRES FOR THIS UNIT IS **NOT** DECIDED HERE, AND THIS FILING NAMES ONLY THE CANDIDATES A
READER CAN SEE AT THEIR OWN BYTES:**
1. **THE JSON GRAMMAR'S OWN VALUE CLASSES** — the value tree the unit adopts is spelled by a grammar that is not this
   project's own, and its value classes are the unit's vocabulary **if** the unit's contract names them `[A3
   docs/decisions.md · A147 | the ruling's own row]`.
2. **THE `napi` CRATE'S OWN `serde-json` CAPABILITY** — the adopted crate's own conversion, its own `serde_json` types
   and its own two ceilings (`MAX_JSON_DEPTH` `128` and `MAX_JSON_NODES` `1,000,000`) `[A1 …/napi-3.14.2/src/
   bindgen_runtime/js_values/serde.rs:18 · :24 | the adopted crate's own bounds]`.
3. **THE STORE'S OWN CLOSED STATUS SET** — the `16`-member set this project owns, printed at `src/error.rs:43`–`:60` and
   declared at `docs/specs/storeroom-native/contract.md §8.1` — **AND THIS ONE ORIGINATES INSIDE THIS PROJECT** `[A1
   src/error.rs:43–:60; A2 docs/specs/storeroom-native/contract.md §8.1 | the store's own set]`.

**⟹ TWO OF THE THREE CANDIDATES POINT OUTSIDE THIS PROJECT AND ONE POINTS INSIDE IT, AND **THIS FILING DRAWS NO
CONCLUSION** — THE TRIGGER IS THE VERDICT STEP'S DETERMINATION AND NOT THE FILING'S, AND THE DOSSIER IS THE VERDICT
STEP'S ARTEFACT.** **THE PLAN AT `docs/specs/storeroom-json-crossing-implementation-plan.md §P.4` STEPS THE DOSSIER AS ITS OWN FIRST STEP, AND THE VERDICT STEP CARRIES IT.**

**AND THE GATE CHAIN THIS FILING SITS IN IS THE CORPUS'S OWN** — proposal → `[role_validity ∥ role_critique]` →
`role_architecture_review` → `role_change_analysis` → `role_spec_writer` → … `[A3 docs/next-steps.md · N8 | the queue's
own row]`.

**⟶ `RCA-8(g)` ONE-LINE POINTER, 2026-10-22: THE PROPOSAL-STAGE IMPLEMENTATION PLAN MOVED OUT OF THIS FILING — IT NOW STANDS AT `docs/specs/storeroom-json-crossing-implementation-plan.md` (`§P.1`–`§P.8`), WHICH IS ITS OWN HOME, AND NO BYTE OF IT IS RE-EMITTED HERE; THE PLAN IS DRAFTED AT THE PROPOSAL STAGE AND IS RECONCILED TO THE CONTRACT ONCE THE CONTRACT LANDS.**

### 7.7 THE LAYER CLAUSE, RESTATED BECAUSE IT IS THE ONE CLAUSE A READER MAY NOT INFER

**EVERY OBSERVABLE NAMED IN THIS FILE IS `ENVELOPE/PURE`. NO `APP`-GREEN IS CLAIMED AND NONE IS AVAILABLE FOR THIS
UNIT** (`§4.5`).

---

## §8. PROVENANCE

### 8.1 WHAT WAS READ AT ITS OWN BYTES THIS PASS

**Every `file:line` cited in this document was opened at its own lines. Each figure printed in `§3` and `§6` was taken
by opening the file it names, and NO FIGURE WAS CARRIED FROM THE BRIEF WITHOUT BEING RE-READ.** Nothing was run — no
shell, no `cargo`, no `node`, no hashing verb.

- **`src/json.rs`** — `:60`–`:84` (the encode and decode bodies) · `:86`–`:117` (`canonical_number`) · `:119`–`:159`
  (the formatter's header).
- **`src/store.rs`** — `:1280`–`:1316` (`write_file`, with the save at `:1301` and the verification at `:1305`) ·
  `:1395`–`:1414` (the loader) · `:1965`–`:1994` (`write`, with the refusal at `:1982`–`:1983`).
- **`src/value.rs`** — `:1`–`:63` (`StoreValue`, `is_admitted`) · `:160`–`:259` (the hand-written `Visitor` and the
  `Deserialize` impl).
- **`src/lib.rs`** — `:24`–`:41` (the module list and the `pub use` list).
- **`bindings/js/index.mjs`** — `:79` · `:331` (the only `readFileSync` call) · `:585`–`:596` (`fail`) · `:629`–`:664`
  (`boundaryReject`) · `:683` (`hasLoneSurrogate`) · `:720`–`:754` (`protoClass`, `accessorOrSymbolArm`) ·
  `:766`–`:769` (`arrayClass`) · `:949` (`shapeArmClass`) · `:990`–`:1013` (`ENCODER_CEILING`, `refusedValue`) ·
  `:1016`–`:1113` (`encodeValue`, in full) · `:1149`–`:1203` (`encodeSegment`, in full) · `:1235`
  (`refuseOutsideSegment`) · `:1351`–`:1414` (`encodeAddress`) · `:1482`–`:1543` (`encodeTier`) · `:1573`–`:1585`
  (`encodeOpId`) · `:1797`–`:1827` (`decodeValue`, the copy-out's decoder) · `:2350`–`:2389`
  (the `write` entry, with the encoder call at `:2368`).
- **`bindings/js/src/codec.rs`** — `:1`–`:100` (the module header and the imports) · `:233`–`:302` (`member`,
  `string_of`, `bool_of`, `number_of`, `classed_value`, `kind_of`) · `:304`–`:330` (`kind_of`, `is_array`,
  `elements` — **NOT PART OF `value_of`**) · `:332`–`:439` (`value_of` in full) · `:441`–`:533`
  (`segment`, `address_of`) · `:535`–`:598` (`tier_set_item`, `tier_of`) · `:600`–`:625` (`op_id_of`) · `:627`–`:648`
  (`handle_arg_of`) · `:855`–`:907` (the copy-out's `to_js_value`).
- **`bindings/js/src/crossing.rs`** — `:1`–`:40` (the module header, with the purity declaration at `:4`) · `:120`–`:199`
  (the `JsValue`, `JsSegment`, `JsNonArray` and `JsAddressArg` declarations) · `:690`–`:740` (the copy in and the copy
  out) · `:746`–`:769` (`JsHandle`).
- **`bindings/js/Cargo.toml`** — the whole file (`65` lines), with the `[dependencies]` table at `:30`–`:65`.
- **`bindings/js/.gitignore`** — the whole file (`6` lines).
- **`bindings/js/test/**`** — searched whole for the tagged form; the `14` lines of `§3.7` and `§6.1` opened at their
  own lines; `bindings/js/test/constraint-kernel-states.test.mjs` searched whole for the tag literal, for `addon` and
  for `index.mjs` (three whole-file searches, NO MATCH each).
- **`bindings/js/greens/greens.mjs`** — `:1`–`:120` (the header and the declared sets) · `:450`–`:600` (the `JSG-03`
  tail, the whole `JSG-04` scenario and the `JSG-05` scenario) · the `JSG-06` and `JSG-10` cells at `:634`–`:653` and
  `:903` · and the whole tree searched for `ValueNotAdmitted` and for the tag literal.
- **`bindings/js/greens/live-drive.mjs`** — `:380`–`:470` (the `LIVE-7` and `LIVE-9` scenarios) · and the whole tree
  searched for `ValueNotAdmitted` and for the tag literal.
- **`bindings/js/greens/json-acceptance-set-greens.mjs`** — `:474` · `:485` · `:508` · `:520`.
- **`bindings/js/greens/file-tier-save/scenarios.mjs`** — `:821`–`:824`.
- **`bindings/js/greens/held-listener-identity-greens.mjs`** — `:37`–`:40`.
- **`docs/decisions.md`** — the `A143` row (`:58`) · the `A144` row (`:59`) · the `A142` row (`:60`) · the `A141` row
  (`:61`) · the `A140` row (`:62`) · the `A145` heading (`:196`) and row (`:198`) · the `A146` heading (`:200`) and
  row (`:202`) · the `A147` heading (`:204`) and row (`:206`).
- **`docs/pending.md`** — `:155`–`:158` · **`docs/pending.md` · `G-16` in full** (`:160`–`:172`).
- **`docs/specs/storeroom-js/crossing.md`** — `:1`–`:30` (the part's header) · `§1.1` (`:30`–`:60`) · **`§1.2` in full**
  (`:61`–`:120`, the `13`-row table and the lone-surrogate clause) · `§1.3` (`:121`–`:419`) · **`§1.4` in full**
  (`:420`–`:621`, items `1`–`9` and the two dated clauses) · `§1.5`–`§1.8` headings (`:622` · `:647` · `:704` · `:838`).
- **`docs/specs/storeroom-native/contract.md`** — `§1.4` (`:1396`–`:1455`).
- **`docs/specs/storeroom-addon-adoption/contract.md`** — `:9` · `:60` · `:90` · `:96` · `:130` · **`:132` (`P-ADA-1`)**.
- **`docs/specs/storeroom-addon-adoption/binding-crate-and-abi.md`** — `:1`–`:45` (`§1` in full).
- **`docs/specs/storeroom-js/contract.md`** — `:114` (the part map's `crossing` row) · `:192` (the file-set print) ·
  the `DD-` rows `:577`–`:618` · `:3319` (the corpus's own record that a path resolves nowhere in this tree).
- **THE FILES THIS PASS OPENED FOR THE CORRECTIONS, EACH AT ITS OWN BYTES:**
  - **`src/error.rs`** — `:30`–`:60` (the set's own `CODES` array and the generator's entry) · `:62`–`:107` (the
    `MessageArgs` record) · `:230`–`:261` (the clause table's own arms, with `ValueNotAdmitted` at `:251`–`:254`).
  - **`bindings/js/src/facade.rs`** — `:554` · `:586` (the copy-out's two value-bearing arms).
  - **`bindings/js/index.mjs`** — `:580`–`:596` (`fail`) · `:629`–`:669` (`boundaryReject`) · `:931`–`:944`
    (`valueReject`) · `:985`–`:1013` (the encoder's ceiling and `refusedValue`) · `:1016`–`:1113` (`encodeValue`) ·
    `:1149`–`:1203` (`encodeSegment`) · `:1390`–`:1414` (`encodeAddress`) · `:1797`–`:1827` (`decodeValue`).
  - **`bindings/js/test/addon-surface.test.mjs`** — `:1365`–`:1386` (the re-render arm's own cells).
  - **`bindings/js/test/addon-surface-properties.test.mjs`** — `:1074`–`:1087` (the asserted-token census).
  - **`docs/specs/storeroom-addon-surface/js-unwrap.md`** — `§3` in full (`:44`–`:48`).
  - **`docs/specs/storeroom-addon-surface/contract.md`** — `:95`–`:130` (`P-SAS-8` at `:100` and `:126`).
  - **`docs/specs/storeroom-addon-surface/parameter-semantics.md`** — `:19` · `:28`.
  - **`docs/specs/storeroom-addon-surface/test-cases.md`** — `:23` · `:38` · `:53` (`V-10` · `F-7` · `D-8`).
  - **`docs/specs/storeroom-js/surface.md`** — `§2.5` item 6 (`:1196`–`:1234`).
  - **`docs/specs/storeroom-native/contract.md`** — `§8.1` (`:4095`–`:4105`) · `§8.2` (`:4270`–`:4282`).
  - **`docs/specs/storeroom-native-implementation-plan.md`** — `§P.1`–`§P.6` and the pointer index (the house plan's
    shape).
  - **`docs/specs/storeroom-constraints/implementation-plan.md`** — `§0`–`§5` and the phase table (the house plan's
    shape).
  - **`docs/specs/storeroom-js-adoption-dossier.md`** — `:1`–`:20` (the dossier's own head and its role).
  - **`docs/next-steps.md`** — `:52`–`:56` (the gate topology) · the `N8` row (`:136`–`:142`).
  - **`docs/defects.md`** — `DEF-2026-10-22-G` (`:378`–`:388`).
  - **`docs/pending.md`** — the `G-2` cell (`:32`–`:44`).
- **THE FILES THIS PASS OPENED FOR THE ARCHITECTURE'S CORRECTIONS, EACH AT ITS OWN BYTES:** **`src/store.rs`** —
  `:306`–`:309` · `:1141`–`:1208` · `:1522`–`:1571` · `:1615` · `:1636` · `:1660` · `:1685`–`:1689` · `:1941`–`:1949` ·
  `:1952`–`:1968` · `:1975`–`:1984` · `:2126` · **`docs/decisions.md`** — the `A140` row (`:62`) · the `A147` heading
  (`:204`), row (`:206`) and **dated delta (`:208`)** · **the WHOLE FILE searched for `to_js_value` · `decodeValue` ·
  `copy-out` · `COPY-OUT` (NO MATCH)** · **`src/value.rs`** — `:14`–`:47` · **`tests/support/mod.rs`** — `:455`–`:472` ·
  **`docs/specs/storeroom-js/surface.md`** — `§2.9` (`:1560`–`:1573`) · **`docs/specs/storeroom-native/contract.md`** —
  `§8.1` (`:4098`–`:4105`) · `§8.2` (`:4274`–`:4281`) · **`docs/specs/storeroom-native/implementation-plan.md`** — the
  `§10.9` row `P-TP-8` (`:974`) · **`bindings/js/src/codec.rs`** — `:78`–`:88` · `:332`–`:439` · `:855`–`:907` ·
  **`bindings/js/src/crossing.rs`** — `:1`–`:20` · `:698`–`:740` · **`bindings/js/index.mjs`** — `:740`–`:779` ·
  `:1016`–`:1113` · `:1797`–`:1827` · **`napi-3.14.2/…/serde.rs`** — `:150`–`:349`.
- **`scripts/publish.sh`** — `:60`–`:67` · `:178`–`:191` · `:372`–`:407`.
- **THE ADOPTED CRATE, AT ITS OWN BYTES IN THE LOCAL REGISTRY CACHE** — `napi-3.14.2/Cargo.toml:49`–`:128` (the feature
  table) · `:185`–`:224` (the dependency table) · `napi-3.14.2/src/lib.rs:105`–`:204` and `:225`–`:280` (the module
  list and the prelude) · `napi-3.14.2/src/js_values/mod.rs:20`–`:119` · `napi-3.14.2/src/bindgen_runtime/js_values.rs:20`–`:64`
  · `napi-3.14.2/src/bindgen_runtime/js_values/serde.rs:1`–`:340` (the JSON conversion in full).

### 8.2 WHERE THIS PASS'S MEASUREMENT **DISAGREES** WITH THE BRIEF, STATED RATHER THAN PAPERED OVER

**ONE DISAGREEMENT, AND IT IS A FILE LIST, NOT A COUNT.** The brief gives the raw tagged form as *"`23` occurrences
across `5` JavaScript test files"* and names five files. **THIS PASS MEASURES `23` OCCURRENCES — THE COUNT HOLDS — ACROSS
`14` LINES AND `4` FILES.** The file the brief names that carries NONE of the tagged form is
`bindings/js/test/constraint-kernel-states.test.mjs`, and **that file
carries NONE of the tagged form**: a whole-file search for the `k` tag literal in it returns **NO MATCH**, a
whole-file search for `addon` returns **NO MATCH**, and its `tag(…)` calls are address-segment labels, not wire tags
`[A1 bindings/js/test/constraint-kernel-states.test.mjs — whole-file searches, NO MATCH | the searched set]`. **THE
`23` AND THE `4` ARE CARRIED; THE `5` IS NOT.**

**A SECOND, SMALLER DIVERGENCE — IN THE OBJECT FORM'S OWN SPELLING.** The brief describes the tagged object form as
`{k:'o',m:[[key,value],…],p}`; **the shipped form carries TWO FURTHER MEMBERS** — `acc` and `proxy` — so the object
arm is `{ k: 'o', m: members, p: proto, acc: false, proxy: false }` (`bindings/js/index.mjs:1112`) `[A1
bindings/js/index.mjs:1112 | the encoder's own object form]`. **`§5.4` NAMES WHAT THOSE TWO MEMBERS RAISE AS AN OPEN
MECHANIC, AND THE CARRIED FIGURE IS THE SHIPPED FORM'S.**

**A THIRD, IN THE ADOPTION QUESTION'S FRAMING — AND IT IS NOT A DISAGREEMENT ABOUT THE ANSWER.** The brief describes
route (b) as *"the `napi` crate's own `serde-json` capability"*, and **this pass confirms the capability exists in the
adopted crate's own bytes** (§5.1) — **and adds a price the brief does not name**: the crate's own JSON conversion
carries a depth ceiling of `128` and a node ceiling of `1,000,000`, and **it refuses **THREE** of the sixteen classes
**with the crate's own `Status::InvalidArg` and the crate's own message text — `function` · `undefined` · `symbol` —
while it **CONVERTS** `null` and `bigint` and reaches the other four of the nine through a bound, a conversion or a
member read rather than through a class arm** (§5.1's price list, route (b), items `1` and `2`).
**THE ROUTE IS CARRIED AS NAMED; ITS PRICE IS CARRIED AS MEASURED.**

### 8.3 WHAT THIS PASS COULD NOT VERIFY, AND WHAT IT DID NOT CITE

1. **THE `A147` ROW'S TAIL.** `docs/decisions.md`'s `A147` is a SINGLE LINE, and the reading instrument available to
   this pass truncates a line at **`2,000` characters**; the row's parts `(1)`–`(4)` and the OPENING of part `(5)`
   were read up to the truncation point, and **the row's closing text was NOT read.** **NO CLAIM IN THIS FILING RESTS ON
   THE UNREAD TAIL** — every hold of `A147` this file uses is one read at its own bytes in the visible span, and the
   row is cited BY NAME, never by a cell this pass did not read. **AND THE ONE QUESTION THE UNREAD TAIL COULD HAVE
   ANSWERED — WHETHER THE ROW NAMES THE COPY-OUT — IS NOW SETTLED BY A WHOLE-FILE SEARCH, WHICH IS NOT TRUNCATED: NO
   MATCH (`§5.7`).**
2. **THE `A4` AUTHORITY DOES NOT RESOLVE IN THIS TREE.** The brief names `docs/specs/spec-authoring-discipline.md
   §3.3` as the fourth resolving authority. **NO FILE EXISTS AT EITHER PATH THE CORPUS NAMES** — neither
   `docs/specs/spec-authoring-discipline.md` nor `docs/specs/spec-authoring-discipline/contract.md` is in this tree, and
   a search of `.opencode/**` in this project returns **NO FILES** `[A1 docs/specs/storeroom-js/contract.md:3319 | the
   corpus's own record of the path's status]`. **AND WHAT IS TRUE AT THE BYTES IS THIS: THE *STRING*
   `spec-authoring-discipline` OCCURS ON `46` MATCHING **LINES** ACROSS `20` FILES IN THIS TREE'S SEARCHED SET — `3`
   OF THEM IN THIS FILING ITSELF — **WHILE NO FILE AT THAT PATH EXISTS**; the corpus itself records that the path
   *"RESOLVES NOWHERE IN THIS TREE"* (`docs/specs/storeroom-js/contract.md:3319`) `[A1
   docs/specs/storeroom-js/contract.md:3319 | the corpus's own record of the path's status]`. **THE CORPUS'S OWN FIGURE
   FOR THIS DEFECT — WHICH COUNTS CITATIONS AND NOT LINES, AND WHICH SEARCHED THE ARCHIVED COPIES TOO — IS FILED AT
   `docs/defects.md` · `DEF-2026-10-22-G` AND IS NOT REPEATED HERE** `[A2 docs/defects.md · `DEF-2026-10-22-G` | the
   corpus's own defect row]`. **IT IS THEREFORE CITED NOWHERE IN THIS FILING, AND EVERY CLAIM IN THIS
   FILING RESOLVES AGAINST `A1`, `A2` OR `A3`.**
3. **NOTHING WAS RUN.** No `cargo`, no `node`, no build, no test, no hashing verb, no byte count. **THE BUILDED
   ARTEFACTS' EXISTENCE IS NOT OBSERVABLE FROM THIS ROLE, AND NO CLAIM IN THIS FILING DEPENDS ON IT** — every figure is
   a figure of the SOURCE, read at its own bytes.
4. **THE ADOPTED CRATE'S SOURCE IS IN THE LOCAL REGISTRY CACHE, NOT IN THE TRACKED TREE** — every `napi 3.14.2`
   citation in this filing names the path under `.cargo-home/registry/src/…`, which is a LOCAL CACHE PATH AND NOT A
   TRACKED PATH `[A1 .cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f/napi-3.14.2/Cargo.toml:114–:117 | the
   adopted crate's own feature table]`. **THE CRATE'S VERSION IS READ FROM THE CACHE DIRECTORY NAME, WHICH IS THE
   RESOLVED `3.14.2` INSIDE THE MANIFEST'S CARET FLOOR `"3.14"` (`bindings/js/Cargo.toml:54`)** `[A1
   bindings/js/Cargo.toml:54 | the manifest's own requirement]`.
5. **THIS FILING AUTHORED ONE FILE AND EDITED NO OTHER.** No tracker, no spec, no code byte and no test byte was
   written. **THE FILE IS `docs/specs/storeroom-json-crossing-proposal.md`.** **⟶ AND THE CORRECTIONS PASSED DOWN WITH
   GATE 1'S STEPS 1 AND 2 WERE APPLIED TO **THIS SAME FILE** ON 2026-10-22 — the same one file, the same path, and no
   other file was written or edited by that pass either. **⟶ AND THE ARCHITECTURE REVIEW'S (GATE 1 STEP 3) CORRECTIONS
   WERE APPLIED TO **THIS SAME FILE** ON 2026-10-22, AND NO OTHER FILE WAS WRITTEN OR EDITED BY THAT PASS EITHER.**
6. **THE `N8` ROW'S TAIL — THE SECOND TRUNCATED LINE THIS PASS READ.** `docs/next-steps.md`'s `N8` row
   (`docs/next-steps.md:136`–`:142`) is a **SINGLE LINE** whose length the reading instrument available to this pass
   truncates at **`2,000` characters**; the row's opening span was read, **and its closing text was NOT read.**
   **THE VISIBLE SPAN NAMES FIVE MECHANICS — `(a)` the JavaScript-visible answer's code and message · `(b)` the
   adoption question · `(c)` the copy discipline · `(d)` the residue · `(e)` the copy-out direction — AND THE ROW'S OWN
   WORDS SAY THAT GATE 1'S STEPS ADDED FURTHER MEMBERS BEYOND THOSE.** **⟹ THE UNREAD TAIL MAY NAME MECHANICS THIS
   FILING CANNOT HAVE RECONCILED, AND `§5.8`'s UNION IS COMPLETE AGAINST THE SPAN READ AND IS **NOT** A CLOSURE OF
   THE CORPUS'S SET — THE ROW ITSELF IS THE AUTHORITY FOR WHAT IT ADDS.** **NO CLAIM IN THIS FILING RESTS ON THE UNREAD
   TAIL, AND THE FIVE MECHANICS THE SPAN DOES NAME ARE THE ONES `§5.8`'s TABLE CARRIES** `[A3
   docs/next-steps.md · N8 | the queue's own row]`.
7. **AND THE 2026-10-22 SPLIT PASS AUTHORED A SECOND FILE — THE PLAN'S OWN, AT
   `docs/specs/storeroom-json-crossing-implementation-plan.md`.** **THE REASON: THIS FILING HAD REACHED `133,327` BYTES,
   OVER THE CORPUS'S `131,072`-BYTE PER-PATH LINE, AND THE REMEDY FOR AN OVER-LINE DOCUMENT IS A SPLIT OR AN ARCHIVAL PASS
   AND NEVER A WHOLE-FILE REWRITE** (`docs/defects.md` · `DEF-2026-10-02`) `[A3 docs/decisions.md · A131 · A146 | the
   corpus's own volume rules]`. **THE MOVED BYTES WERE MOVED VERBATIM — BYTE-EXACTLY, UNDER `RCA-8(g)` — AND THE CITATIONS
   WERE REPOINTED BOTH WAYS: THE FILING CARRIES A ONE-LINE POINTER AT THE VACATED `§7.6` SITE, AND THE PLAN'S OWN HEAD
   NAMES THE FILING'S PRE-MOVE ADDRESS** (`docs/specs/storeroom-json-crossing-proposal.md §7.6`).
