# `@auspicion/provident-storeroom-js-darwin-arm64`

**THE PREBUILT PLATFORM ARTEFACT FOR `darwin` · `arm64`, ONE OF THE FIVE THE RESOLUTION RULE DECLARES**
(`docs/specs/storeroom-publish/resolution.md §3.1`; `§4.1`).

**IT CARRIES THE STORE'S OWN NODE-API ADDON, BUILT FOR THIS TARGET BY THE RELEASE'S OWN WORKFLOW**
(`/.github/workflows/publish.yml`, one runner per target). **It is a DELIVERABLE IN ITS OWN RIGHT and not
an option: the entry `require`s it by name as rung one for this runtime's key, and it is installable on
its own.**

**NO BINARY IS COMMITTED TO THIS DIRECTORY** (`docs/specs/storeroom-publish/distribution.md §3.1`): the
directory carries this manifest and this notice, and the `.node` beside them is the build's own output,
assembled by the release's own step.

**AND ITS OWN ALLOWLIST NAMES THAT BINARY, SO RUNG ONE HAS A DECLARED SOURCE**: this artefact's `files`
carries `storeroom_js_binding.node` beside its manifest and its licence copy — **an artefact whose
allowlist omitted its `.node` could not be loaded by rung one at all**, which is why the field names it
rather than leaving the binary's carriage to the release's assembly step alone
(`docs/specs/storeroom-publish/parameter-semantics.md §3.4`; `distribution.md §3.2` item 5).

**THE LICENCE COPY TRAVELS IN THE ARTEFACT'S OWN TARBALL** — the repository's `LICENSE`, copied
byte-for-byte at assembly, so an install of this artefact alone carries the licence text. **This artefact's
own manifest field and that copy agree**, and the copy is not a new declaration site.
