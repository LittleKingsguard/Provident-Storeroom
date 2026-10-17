# ARCHIVAL INTEGRITY MANIFEST — `A133` (adopted 2026-10-16, architect ruling: *"Use manifest for now"*)

**WHY THIS FILE EXISTS.** `RCA-8(g)` requires every archival move to be BYTE-EXACT, and `DEF-2026-10-16-P` records that this was an UNENFORCED ASSERTION: `archive/` is gitignored, so the pre-move state has no version-control history and no move's exactness could be verified after the fact. At least one entry is known-inexact and unrecoverable.

**WHAT IT PINS, FROM THIS DATE.** The `sha256` of every archival file as it stood when this manifest was taken, plus its byte length. **Any later change to an archived file is detectable by recomputing its hash against this baseline** — so the archives' integrity is verifiable from now on even though their pre-move provenance is not retroactively recoverable.

**THE DUTY THIS ESTABLISHES (supervisor-side, placed in every archival brief from this date):** every `RCA-8(g)` move records, in the archive's own head, a `sha256` of the region AS MOVED together with its source path and pre-move line range, taken by a shell-capable pass at the moment of the move. **No role holds a shell, so no role can take one — this is a supervisor duty, not a role duty, and a brief that omits it is incomplete.**

**STATUS OF PRIOR MOVES: ASSERTED, NOT VERIFIED.** The moves already made — the four `RCA-A12*` unit archives, `RCA-8D-RETIRED`, `ARCH-A131`, and the gate-1 record's eighteen sections — are recorded below as their CURRENT hashes; their byte-exactness against the pre-move bytes CANNOT be certified (`DEF-2026-10-16-P`). **The one known-inexact entry is the gate-1 record archive's `§37`, whose long sentence was truncated at the read limit and not reconstructible.**

**Baseline taken 2026-10-17 by the supervisor, shell-measured. Files pinned: `141`.**

| sha256 | bytes | path |
|---|---|---|
| `7a49ac667283714c01764fb3966323820666421c2b7c51b0369ca861b4450a90` | 437 | `archive/decisions/2026-10-16-a127-superseded.md` |
| `acf3aea4d022dd126fc3a11dcb928ba73119fa5c0f93e8ded39efe2e637e564d` | 3936 | `archive/decisions/2026-10-16-d-gp-rel-0-1-3-succeeded.md` |
| `c4060a5c500ba77c83fb43348616c16edbd1edcf05c62ccdae225d528c41fb84` | 153748 | `archive/decisions/2026-10-16-superseded-rows.md` |
| `d1fe150cc8a314651a24fdcfa9b6893a58539ded7e47de6cb81d355038f1798a` | 26386 | `archive/defects/2026-10-16-closed-rows.md` |
| `0f19feed031b69f11a1724b740dc9b4882535ee6ab7401ad0760577911cf534c` | 4191 | `archive/demo/README.md` |
| `105e3280c24f652e36d4feaf25498f79622e14833aa2421be8319133c394520d` | 1563 | `archive/demo/node_modules/@auspicion/provident-storeroom-js-linux-x64-gnu/README.md` |
| `24580cd7cb1b96e8ef3dde87ed9a78d9e83d697fe330b22b01762a672fa9addf` | 11552 | `archive/demo/node_modules/provident-storeroom/README.md` |
| `114f0f6a8ab1292471665cc9338227b7237c2f52b56cae6b678f7fd9c4083341` | 23654 | `archive/gate1/storeroom-constraints-review/1-validity.md` |
| `a6a2528b5ee377ac7e17555c54db7f5d33aad455fe98b5fc1c30a757c1e6aa5c` | 24001 | `archive/gate1/storeroom-constraints-review/2-critique.md` |
| `39e5c25c7fe8fef1ce4a0a923bcc6ac385fcfd7676d82e00732c4fd015595a10` | 19138 | `archive/gate1/storeroom-constraints-review/2026-10-13-record-superseded-cells.md` |
| `cd616bcd9235979e3a888fab8ae2c5f0697c478f578111475d68c37e91bf429e` | 54288 | `archive/gate1/storeroom-constraints-review/3-architecture.md` |
| `d5ea632178c0d59725b88b196e8bd60d36ea7b8a9d08a870f731d3cf2d73a87d` | 1810 | `archive/gate1/storeroom-js-oop-0.3.0-review/1-validity.md` |
| `30ecd5140f0df6a28103d05ce973c3f85ce6e4ba3e836e0b0edf103d1505b4f1` | 2015 | `archive/gate1/storeroom-js-oop-0.3.0-review/2-critique.md` |
| `086513d0a6c57357b28eac4710e600eee95990c00927e320aab1bb32b8d4ff0b` | 76030 | `archive/gate1/storeroom-js-oop-0.3.0-review/2026-10-16-gate2-loop-runs-and-fix-passes.md` |
| `604f88d0dc0c1ceb5460a58c9e9458a4c28f07c14c4927c7b4aead30c5db8162` | 2135 | `archive/gate1/storeroom-js-oop-0.3.0-review/3-architecture.md` |
| `7a5233d0acfebc86e07489aa6afab2c01948c4c9aaa3223487b4789a77685986` | 11860 | `archive/gate1/storeroom-js-review/1-validity.md` |
| `dd7a274bc64cf5ecb8d53d4e964cd28ac8f09146c2adb94464e8443d42fa3503` | 13188 | `archive/gate1/storeroom-js-review/2-critique.md` |
| `21f3455371740c3d13bd4d7a3c73e0b653ffbba9cfdb973a98c5a24fcd4b5065` | 82549 | `archive/gate1/storeroom-js-review/3-architecture.md` |
| `004c828100e1c61fc7d2b7facb828820e36361534dde1c84f752793075664131` | 7396 | `archive/gate1/storeroom-listeners-review/1-validity.md` |
| `04fa5ea9123e6daad34dd071eff947b621c59ee5500ca5c4c47f3d68ed6953c1` | 7061 | `archive/gate1/storeroom-listeners-review/2-critique.md` |
| `229388569fdb48f5668cac7d71b0c6927cc81153dbd3e7c40934cde88c8b0589` | 77938 | `archive/gate1/storeroom-listeners-review/3-architecture.md` |
| `90b1a85e760f9382d3e0367f3c2dbc104d47b567ab5b2f29e9229ed0056357c4` | 235 | `archive/gate1/storeroom-listeners-review/README.md` |
| `3a022c4a93c16593c446d817b0de238e91ac7222ffb1b820ef1542efaaf95906` | 54947 | `archive/gate1/storeroom-native-review/1-validity.md` |
| `7b656c3316f6945fcfd4e1813ec6f6bc1c91c7eaaf4f27a9985694905a372e0f` | 56069 | `archive/gate1/storeroom-native-review/2-critique.md` |
| `050905d4e5724fe388df1c827f619da8d4ee4e0ff0a0888f41dba4b08618325d` | 97213 | `archive/gate1/storeroom-native-review/3-architecture.md` |
| `028012c19ae14edd34412eb0af06b1eed231ad36dc09fa8ce880f2039c496f8a` | 9657 | `archive/gate1/storeroom-publish-review/1-validity.md` |
| `52a739915cd89b5b9753e5cba9118756bf7e9dd1b4bf5fb2e76db2b52806e616` | 13287 | `archive/gate1/storeroom-publish-review/2-critique.md` |
| `43c78fa32dfdc34693aeb4532d5b0676b5a23dd1c868a7774cfd4f1c076cf07a` | 42861 | `archive/gate1/storeroom-publish-review/3-architecture.md` |
| `88aa3bad44e99f73de299bced0b5939f9bf20d042f0f1dcea7e7e49cbc80405f` | 72112 | `archive/gate2/storeroom-constraints-review/findings-register.md` |
| `b7a8baa1263de2e05fd26fcea5caa69f941246033d9b478dd9eea085052ed7a5` | 24359 | `archive/gate3/2026-10-13-u-storeroom-consumer-fix-red-set.md` |
| `dfbdf7d0dfe177dbd37c8562f1428a3592362bafb91c8663f94dd96a76e579e0` | 317432 | `archive/gate3/storeroom-js-red-set.md` |
| `4664fbfb462ad3c49d3f59ed8058a81e8f0cfff9f4c9d5b07c9ffc1a5418532d` | 354382 | `archive/gate3/storeroom-native-red-set.md` |
| `f026e805f148508054b2c81d1a32724902f8124c2e1e921b3403aa276f8fcae4` | 356747 | `archive/gate3/storeroom-publish-red-set.md` |
| `988ca028b2a445895489500ec47ef4103ab235c51a2a9ffd8418eb22aee4be5e` | 17870 | `archive/gate4/storeroom-js-adversarial.md` |
| `0ac4739ef50c52eda6e371ca20f42b57acb7ae0e42a8e3f873af6566c6e482c2` | 12693 | `archive/gate4/storeroom-js-convenience-adversarial.md` |
| `8618ca6cb92a8da403187718fb2aa2b54e75c33d12ec8375f6d5e966a0ac4565` | 62738 | `archive/gate4/storeroom-native-adversarial.md` |
| `14b9d28a4f42a1fbbfa47467de391aed4468b285f21b72e0bd4006e9a279974f` | 53357 | `archive/gate4/storeroom-native-amendment-adversarial.md` |
| `1dfe1e030b1de2e502d9e04dbfcaa80f4f63c8731ba5cb7d9804fc9a05f946d7` | 44310 | `archive/gate4/storeroom-publish-adversarial.md` |
| `73f11dc0e60974bdc1d2e91ee8c0fec0dd1ea126c930b2211a5353c3ea050d7a` | 1879 | `archive/gate5/storeroom-js-greens-run.md` |
| `f67c6e2d470891bc16d7dea02f24ca1b6cb783eb3cf9e6ec248d67c4e5350d2b` | 105435 | `archive/gate6/storeroom-js-live-determination.md` |
| `c360f1a54098a5e1b505adb0a444d3cba800620d07898a6145fa3c6e13075171` | 42177 | `archive/gate6/storeroom-native-amendment-live-determination.md` |
| `5e4f2bb5bb439a1e796e93b3b593497df5c874775e6fb7800d01f16d4e8ff698` | 38965 | `archive/gate6/storeroom-native-live-determination.md` |
| `db1e7aabecebb5befc07f252c5f3b893c3dfed7a5b960d1b253f2a9d3ef6b14b` | 2282 | `archive/incidents/2026-10-11-gate1-record-loss/README.md` |
| `600e2a9357b1d4c8ac5b1f25140bc05c87d1d83edb4e40e94e99b5e30d7ef049` | 229490 | `archive/incidents/2026-10-11-gate1-record-loss/recovered-partial-from-transcripts.md` |
| `46babf443469ee3b315ab864ec4de10e64e7743ef48d7fabb429f3bbe5ad6127` | 32948 | `archive/next-steps/2026-10-13-closed-unit-N1.md` |
| `fdaeae9f29fc10348f9b90fb81fc87be3fb4a69a2b606e4210dcff192967de9b` | 81830 | `archive/next-steps/2026-10-13-closed-unit-N2.md` |
| `3cfcb561ca5bc08ac04b494cb7ef246f2486ca2975b94de22b674ac337cad25c` | 16406 | `archive/next-steps/2026-10-13-closed-unit-N3.md` |
| `559ea65058384eeddcaa172dcd67a38a44757c67443b8fcce97a600c6af498c2` | 4059 | `archive/next-steps/2026-10-13-closed-unit-N4.md` |
| `14b3d3a0033ecf210a632560d254283a9ddb72095a173f99058545a427e0ae74` | 776 | `archive/next-steps/2026-10-13-closed-unit-N5.md` |
| `16bc9a8cc456cddcce866c890546a0e3fb844881ec7ab7968f4b47e2472665b4` | 17241 | `archive/next-steps/2026-10-13-closed-unit-N6.md` |
| `0dc2edaddb57e4f3e7deee18af7d45c1f883ed925b4089a2e1e6025e0e361a54` | 182049 | `archive/next-steps/2026-10-13-launch-pass-record.md` |
| `aff6d1358b71cdcaaa8e35e09da49da3d611c8f186679a06d5b179f01e4dace2` | 21704 | `archive/next-steps/2026-10-13-storeroom-constraints-gate-records.md` |
| `440b17d6440c640c2cbdc344753e8a7a0dc0cd902b13fc1c6cce5074910436d5` | 95300 | `archive/next-steps/2026-10-13-u-storeroom-consumer-fix-done.md` |
| `2b6c0c5ef62bb0abc49805a95e2bf457a80886fbbe875581847aef35847b8c1e` | 67926 | `archive/next-steps/2026-10-16-cycle-records-seam-and-pre-save.md` |
| `865a6ebb11fef9903826f5fdd328247312629883517550c9b50ee94620df3fc1` | 131131 | `archive/recovery/2026-10-13-kernel-surface.as-corrupted.md` |
| `06d17a060157ed53a451a8f96fb133b8e83b76d503a38b9fb48f9644c6c8fd34` | 174525 | `archive/recovery/2026-10-13-kernel-surface.dump-raw.md` |
| `b3e8f58a7d9aa7e1908141ec39a5da0012b4d6d652f42d5fc998f3508a33557f` | 176163 | `archive/recovery/2026-10-13-kernel-surface.recovered.md` |
| `b615c7f99934fe88453e809b3fc84ca61d582e33ba795446e41729a24686006c` | 26859 | `archive/reviews/2026-10-11-U-STOREROOM-JS-convenience-doc-review.md` |
| `7ad55885a5f980ce54033c4decb0528da64a4101b19cc7412cbbfcaf9076dc6d` | 48435 | `archive/reviews/2026-10-11-U-STOREROOM-JS-doc-review.md` |
| `7133d8326b4ccb631995231ec6dc771e506b79cf45e921fb02208d462be532ff` | 36898 | `archive/reviews/2026-10-11-U-STOREROOM-NATIVE-amendment-doc-review.md` |
| `738a900fce6a0cfbeca97943deb9cf87014effe44341c5b8023afb9f71b81e19` | 40809 | `archive/reviews/2026-10-11-U-STOREROOM-NATIVE-amendment-proofread.md` |
| `c46ce74fc959a5f31416f8f95031e9e674d215d86008ec33ac08e08618b404eb` | 47201 | `archive/reviews/2026-10-11-U-STOREROOM-NATIVE-doc-review.md` |
| `fd479c860efd89655e471426dc39799b81ec67c29503a1fe7ab2232a93679818` | 38045 | `archive/reviews/2026-10-11-U-STOREROOM-NATIVE-proofread.md` |
| `f0bec02a7e6b684de05cd7336213a31fb89c0c05612b4e81c444343dfa731bbc` | 29320 | `archive/reviews/2026-10-11-U-STOREROOM-PUBLISH-doc-review.md` |
| `65ff85435fcdf1085f12b7d7232e548775a70a8ae1e0a1848b4b681248a0397b` | 13438 | `archive/reviews/2026-10-11-structural-compliance.md` |
| `be929dbf6c320b269b3ac58e492c12a34fe51ebf7eb28dcb59966601c1fcf008` | 28067 | `archive/reviews/2026-10-13-U-STOREROOM-ACCESS-PROBE-doc-review.md` |
| `4574f7673f116f8110492f2124be168fc7eeb598f9d2bfd869d12e18a0d63b35` | 14530 | `archive/reviews/2026-10-13-storeroom-constraints-doc-review.md` |
| `5b9c13419729057868aadb36fae9333cb2fe8524fc2130ed59bae1db133d727d` | 21692 | `archive/reviews/2026-10-13-u-storeroom-consumer-fix-doc-review.md` |
| `dc0dde6e6042156f25cbda8cbf941551c213f599899856ee108a17d822f296ea` | 32459 | `archive/reviews/2026-10-15-a116-ordering-seam-doc-review.md` |
| `b60c7883acfd8005e1563b602e381fdc263ca2302f5a1421ce98b06fe070ec41` | 90425 | `archive/reviews/2026-10-16-constraints-publication-gate1.md` |
| `b83d66f90cfaecf4875f2e276814341dc104342966578045e1e1fcaeebc4fcf9` | 27580 | `archive/reviews/2026-10-16-file-tier-save-doc-review.md` |
| `57201a351efd7d8c31aaeeed707d046e3c480985ca82f56818eccb3e7df636b7` | 5167 | `archive/reviews/backups/2026-10-11-U-STOREROOM-JS-gate7-proofread/README.md` |
| `b51ecd42ac03efea43a51fefec8cce161b46e8980692966c955789e1998314c2` | 6563 | `archive/spec-history/2026-10-13-A109-repair-note.md` |
| `4c6cd01f94dd98690af7ea7a3cbfe48fd5dbc14e7009e2208a40d527c6b95474` | 18323 | `archive/spec-history/2026-10-13-a112-respell-superseded.md` |
| `76868741b219922898a01a680c50d09ded53a234223087b505dbb80fb6718121` | 4142 | `archive/spec-history/2026-10-13-contract-and-battery-provenance.md` |
| `05fe8c06982b480ef5ebbbebf924c912df269e2421ab80a36f3b1ba904636a0e` | 32349 | `archive/spec-history/2026-10-13-contract-respelling-record.md` |
| `0972a0625f0f650d04d0af3f8a972254ee3b3c087d6ae4a3ae410a1b1d08957c` | 15638 | `archive/spec-history/2026-10-13-e2e-and-respelling-provenance.md` |
| `e6f473803b127b6f6befa9afccf0a01d1d0263946668c31a99681a0790344507` | 4094 | `archive/spec-history/2026-10-13-e2e-battery-provenance.md` |
| `566758cb6c26fe634fdc94e53f1207cece24bfb6b980c3904e6c891fcc5aaf60` | 20446 | `archive/spec-history/2026-10-13-reconciliation-deltas-superseded.md` |
| `19e9c388e1cea74bf12633a7d7d94944beb603fbb0c55438d8d76fc6d4336094` | 35763 | `archive/spec-history/2026-10-13-recovered-provenance.md` |
| `44e7ac2e666084d1bdd3f9a74eefa52c5143feb1602f1f9f8d22ceb3b139ddc6` | 20700 | `archive/spec-history/2026-10-15-a115-respell-superseded.md` |
| `2d918e8069a2de71a6da918dd3955cbb381773dbfcff2e68dd00250c19a715cc` | 22331 | `archive/spec-history/2026-10-15-js-surface-volume-archival.md` |
| `bcfd059060b7b74706fae7155c7ad900655f514c1b9ad9753f32dc556eaeaa46` | 7214 | `archive/spec-history/2026-10-15-n7-ordering-archival.md` |
| `b04e44fac66845f22ac939b50b1cfbfd12bbbafeffe85a43c7c78d1ee38bd7f0` | 117456 | `archive/spec-history/2026-10-15-supplementary-passes-8-10-gate1-record.md` |
| `59838065ffb024fae7b11875c4d35c184f31289fe4ffc2f10aa2bc68350f0a1c` | 13138 | `archive/spec-history/2026-10-15-volume-archival-decisions-native-package.md` |
| `2e705d1e0c5aa2df54df3d00280096acb904705f92934b89bc5a2d4ecca53149` | 10786 | `docs/specs/storeroom-js/backup/A78-REHOMING-2026-10-11-manifest.md` |
| `477ea4e6792078fa5634a380b4631bb076ec484901415afb5ec0843b509e54d7` | 15338 | `docs/specs/storeroom-js/backup/A86-SCOPE-2026-10-11-manifest.md` |
| `a443ea8b6b85e6d0aeb7e923042b462f473a79e2e63afe8d81e3038ef688c20b` | 13825 | `docs/specs/storeroom-js/backup/ARCH-A131-2026-10-16-superseded.md` |
| `ad817074911cf505404b4f859db539156c12ab3685ffd51fd24be498f5631cb0` | 21477 | `docs/specs/storeroom-js/backup/CF-DUP1-2026-10-11-manifest.md` |
| `717bd9ce4c9183320d595c41f0c345eddd2a16c8a4aaf76845c58293b6b3c768` | 22875 | `docs/specs/storeroom-js/backup/CF-DUP3-LEDGER-2026-10-11-manifest.md` |
| `514c7d2105df169a7b2a32cf26111c401b6a42c6d908a8eb8060059eff9f7d4d` | 9501 | `docs/specs/storeroom-js/backup/CF-PASS-2026-10-11-manifest.md` |
| `ec0b8614103a8176c03ded7594947c34db8e7c9dc9d5454189cd942ae8fc3681` | 8740 | `docs/specs/storeroom-js/backup/CLOSEOUT-4ITEMS-2026-10-11-manifest.md` |
| `6624340fe25840f0ba4e5fa705247b8bed0cc3bc884a85c4b36d7507393041b5` | 12573 | `docs/specs/storeroom-js/backup/COMPLIANCE-CLOSE-2026-10-11-manifest.md` |
| `1ada92d49270858bb7277dccef8fb9964155fd1b4844ddc7f730f9679f83bcc0` | 4291 | `docs/specs/storeroom-js/backup/CONSUMER-FIX-2026-10-12-manifest.md` |
| `e8815db6c3d2a4c2ddc8ab615156f980cb3c4e327c5c2898c172c15d0a24c730` | 3073 | `docs/specs/storeroom-js/backup/CONSUMER-FIX-CLEANUP-2026-10-13-manifest.md` |
| `cc5b47c49feca2ca4481d7df44c17f4c695decf85f343444734eae12f43413c2` | 15721 | `docs/specs/storeroom-js/backup/CONVENIENCE-CLOSE-2026-10-11-manifest.md` |
| `4239947fa1361a9bbc26d87a268c5b4046f39c1cf795107a6d39291c76f06b57` | 8014 | `docs/specs/storeroom-js/backup/GATE2-FIFTH-CLOSE-2026-10-13-manifest.md` |
| `e345f50f179f97c8aa7fd3665758530bc3bc668c5de8da97213cb12fa4c60cc3` | 19252 | `docs/specs/storeroom-js/backup/GATE5-DOC-2026-10-11-manifest.md` |
| `89b065498243381a1612eb1f3a04a1f8b0ca70078f7446885beb2951c434a5dc` | 14569 | `docs/specs/storeroom-js/backup/P8-PROJECT-TOKEN-2026-10-11-manifest.md` |
| `94678b905eec6fe708b5b850aa138957a974e8dd7e55b51ec493bef32ffdb122` | 14631 | `docs/specs/storeroom-js/backup/Q1-CONTRACT-AMENDMENT-2026-10-11-manifest.md` |
| `ee63ad5ba3d68313206f011c2270477e3b203ba24a5c69acdd2de1d644ed5b1a` | 8764 | `docs/specs/storeroom-js/backup/Q7D-DOC-REVIEW-2026-10-11-manifest.md` |
| `823414dd7eb0572e7f30b6d0c4b13c632093f451cc05c22fa4e955407cc9cb46` | 3983 | `docs/specs/storeroom-js/backup/RCA-A122-2026-10-16-superseded.md` |
| `54a94699548649e9588740a7f880b9818f98fc99b666a354c00f2d06b28635fb` | 38193 | `docs/specs/storeroom-js/backup/RCA-A126-2026-10-16-superseded.md` |
| `d18c54b51e03c443ff446e756f4920d47562117938f9515f2cf308d4ec5dbbad` | 124040 | `docs/specs/storeroom-js/backup/RCA-A127-2026-10-16-superseded.md` |
| `4bfdbf2bde8938a4c967983e79a6cdf8288fb18943f2758c41c394f3b57baef6` | 5725 | `docs/specs/storeroom-js/backup/RELEASE-VERSION-2026-10-11-manifest.md` |
| `f7213b7b289f3d5700f475591a48a092c10302e8f7c51e6ca83866b023524c0c` | 9309 | `docs/specs/storeroom-js/backup/SEGMENT-BOUND-2026-10-11-manifest.md` |
| `88c705d6b9cf276f021ca9b0d798e768f37ec6c338d9187df6a4384d05af62ab` | 13003 | `docs/specs/storeroom-native/backup/COMPLIANCE-CLOSE-2026-10-11-manifest.md` |
| `10461ef313a8c07adefb3d1c630560ba45482f85d4bf15d43bf2cd005bf0a487` | 25140 | `docs/specs/storeroom-native/backup/SEGMENT-BOUND-2026-10-11-manifest.md` |
| `1a53e06aeabbb991a4f20589b89378b2be89dc4e156d78c5eb4bcc55de9e24f4` | 8968 | `docs/specs/storeroom-native/backup/STORE-CLOSE-2026-10-11-manifest.md` |
| `5a9ae86e084c64a0c9c68d7cb6877bedaf4934a5bd89bdc08e989240cc48bbd2` | 25473 | `docs/specs/storeroom-publish/backup/A86-SCOPE-2026-10-11-manifest.md` |
| `b9b8ff6806cee206f01e115e3a8a53c826511d20120a76691b933fadb7f1f664` | 8777 | `docs/specs/storeroom-publish/backup/ADVERSARIAL-CLOSE-2026-10-13-manifest.md` |
| `4b0858ac676eb6d3f711cc9ca28cf155a2926b6de024833ae86db4e5845c971f` | 22873 | `docs/specs/storeroom-publish/backup/BOOTSTRAP-CLAUSE-2026-10-11-manifest.md` |
| `9d461bde6c8a80823f9033512b8b046405e9cabead2bc5fa42954c68b4e7b073` | 13699 | `docs/specs/storeroom-publish/backup/CAP-RECUT-2026-10-12-manifest.md` |
| `432020937331e71f68980735d0f0d7637159354fe255bfd00159ccd2884099cd` | 22711 | `docs/specs/storeroom-publish/backup/CF-TWO-CLAUSE-2026-10-11-manifest.md` |
| `6ba2a701ec3f0ac181cc6e58343860ee7e193761abf65d6365b9a83e0aa589b0` | 15042 | `docs/specs/storeroom-publish/backup/CONSUMER-FIX-2026-10-12-manifest.md` |
| `f4945225e437620c118df1f58888bdae81362110819a8533221fa74de9b5e380` | 4432 | `docs/specs/storeroom-publish/backup/CONSUMER-FIX-CLEANUP-2026-10-13-manifest.md` |
| `367ea9c1ef2891948396b22bcd3822e3aa19276577042cbbce4dfe6e0b6ec06e` | 11723 | `docs/specs/storeroom-publish/backup/CONSUMER-FIX-RULING-A-2026-10-13-manifest.md` |
| `c226e7fc3eff831972a104b30da9dbda48e5c2ccdac8592e6eca50f51d7a84c9` | 12197 | `docs/specs/storeroom-publish/backup/DECLARED-RELEASE-RECUT-2026-10-13-manifest.md` |
| `6f0ecc46b322d18c2622bc42058c355decdb8633470dcef7150b52592d9f00df` | 16677 | `docs/specs/storeroom-publish/backup/DEF14-REPAIR-2026-10-11-manifest.md` |
| `62fb1993da4fda842b67ea7616df256f78ef112dc976758b58bb0af046bc9f14` | 5486 | `docs/specs/storeroom-publish/backup/DOCREVIEW-GATE8-2026-10-11-manifest.md` |
| `f29400145b9624d69b21f5f6064567389f30f30ba4ff7f9e7a0be55003bd9525` | 11971 | `docs/specs/storeroom-publish/backup/GATE2-EIGHT-CLOSE-2026-10-13-manifest.md` |
| `e725d5f8e3f8c8298a9c660a25d85279c5a48ea0b443d9c8ea19cf706ce4df62` | 16127 | `docs/specs/storeroom-publish/backup/GATE2-FIFTH-CLOSE-2026-10-13-manifest.md` |
| `558d566a6962c151aedbcb8ebb3a88b8adcdc3b0280675d9ae5ef80f9900d056` | 14053 | `docs/specs/storeroom-publish/backup/GATE3-OPENING-2026-10-13-manifest.md` |
| `020febf05d26fd821649ff7c86aa1d63a9ec46369dfde997aca10f2ed64880eb` | 18050 | `docs/specs/storeroom-publish/backup/METADATA-REVERSAL-2026-10-11-manifest.md` |
| `b4f1ca37e7da6cc91c8a1a0ba994e42eb70b688f20639b98458ef23e42509bbc` | 6736 | `docs/specs/storeroom-publish/backup/N2-AMBIGUITY-RECUT-2026-10-13-manifest.md` |
| `b4fa7fba8233f0f2cbadf96682943d40144e333ee7da56744b5940c73fc2b3e0` | 8952 | `docs/specs/storeroom-publish/backup/NO-FALSIFIER-RULING-2026-10-13-manifest.md` |
| `7df9fffd7083c1f83afdf5888a66bfc507661309aaca112144fff707f899f623` | 12966 | `docs/specs/storeroom-publish/backup/OOP-LABEL-2026-10-16-manifest.md` |
| `e443b5c1fe65d5f8a54b573715b7ab60027fe5e558e12c2ebe6bdb39689b7b71` | 27575 | `docs/specs/storeroom-publish/backup/P8-PROJECT-TOKEN-2026-10-11-manifest.md` |
| `e326a96459baa56a5828e42dbc43dfef8bd1f72bb4b66f38af4bf06eee56566c` | 8176 | `docs/specs/storeroom-publish/backup/Q1-CONTRACT-AUTHORING-2026-10-11-manifest.md` |
| `5d825c06233b30c482433690a2841d020dbc58e1ae7bed921e081527ef656084` | 30575 | `docs/specs/storeroom-publish/backup/RCA-8D-RETIRED-2026-10-16-move-out.md` |
| `dbeb641e120eafa5fc8d48d3c649dafb1743dac1923ce65c932605474ac880f0` | 5642 | `docs/specs/storeroom-publish/backup/RCA-A122-2026-10-16-superseded.md` |
| `8baef2c57752470855fc8594875a0effc52e33a2a8e9e33cffc68a2ba6a4081c` | 10142 | `docs/specs/storeroom-publish/backup/REFLOW-2000-2026-10-13-manifest.md` |
| `39a0a213915f287d38b2ba47005d85b966d6403e5fd707bc69fbcd6cf259c676` | 9644 | `docs/specs/storeroom-publish/backup/RELEASE-EXCEPTION-2026-10-11-manifest.md` |
| `e2c981cb80433f179d55292adebf388dbc8b722df62c1ea28c97c617f5ee964e` | 9270 | `docs/specs/storeroom-publish/backup/RELEASE-FAILURE-2026-10-11-manifest.md` |
| `e3912f19e85a759e5b19741a74772b2739bd6cb42176031822abbd09ca8cc5b2` | 18666 | `docs/specs/storeroom-publish/backup/RELEASE-VERSION-2026-10-11-manifest.md` |
| `a62020d97ee79a4b127c0305f5984aebe86465231ba6979563b443c6872fee16` | 15950 | `docs/specs/storeroom-publish/backup/RERUN-FALSIFIER-2026-10-13-manifest.md` |
| `f0b9a65b8e662d2c275369929e5bce233c1c67d6a268a4487054890972f8d9e0` | 5216 | `docs/specs/storeroom-publish/backup/RESIDUE-438-2026-10-13-manifest.md` |
| `9272048a838e47ce4ba3e8599992f32bf2cbcba0e708fc0b4d1b610eaccc4d9c` | 9560 | `docs/specs/storeroom-publish/backup/RUNNER-LABEL-2026-10-11-manifest.md` |
| `314fe78d141b360f684db5e03436d99a8161e4a5fcbd83fe7dfebade28c893cd` | 9502 | `docs/specs/storeroom-publish/backup/SELF-REPORT-LIFT-2026-10-13-manifest.md` |
| `2faef1dd8e513d3cd3b1d20167eaf331b9bbb92457f0cac8abe699ae5fc28e3a` | 19173 | `docs/specs/storeroom-publish/backup/SEVEN-CLOSE-2026-10-11-manifest.md` |
| `6b66a1d8df028c0bd8694d19b9e04c2fa72af9c70daaf33c08d881d478abe407` | 10804 | `docs/specs/storeroom-publish/backup/STAGED-RELEASE-2026-10-11-manifest.md` |

**Amendment 2026-10-16 (post-`§46`): `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `0e2afb16b91ad2427b00fd536fbdafd0e3ff3052fd0accf67f543a23fc05cfdb` — the record grew by one live section after the baseline was taken, which is itself the first exercise of this manifest's purpose (a post-baseline change, disclosed and re-pinned).**

**Amendment 2026-10-16 post-`§47`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `b9959923d8bce64d07913635e94e998a5df21c5c4cfeb2bcebeb8a20b5404148`.**

**Amendment 2026-10-16 post-`§48`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `71bbfe32747a4b462ac410b2c04b7a3394b41ec97d584356706bde5e80bec2d1`.**

**Amendment 2026-10-16 post-`§49`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `75ef696742e1d3ea258ac7534a320793e9796587371ed635f078a2d89ff92ef5`.**

**Amendment post-`§51`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `530c31b0ca943eaca7789c6464e8d2ebc47aac058f784444ebb004048c287951`.**

**Amendment post-`§52`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `752b8a1c8a902776ea78625fcf914e74a798119f91497972080b105cf6317c83`.**

**Amendment post-`§53`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `cd30ed3b548807f5e31ac56f7feb2f3965195e0a06ba5b0d6c00ebd2f4d57902`.**

**Amendment post-`§54`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `755c9fd90ecc6faa7fbe121e338852d5abe9c93e9830839fe8fb14a2ea59c21e`.**

**Amendment post-`§55`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `33f207b2a7d28d5a0bc5108e1f58e495e0329f84a58d541fbb75f3a67f1c6569`.**

**Amendment post-`§56`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `843a1fa6be78efa64144df5cf11e4eba47e5ad842e7b0391d468ae4b10c14bd7`.**

**Amendment post-`§57`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `e4363f2ebd267352eb367ed5294e5ad32add4a57621e8eadff485cb0de39a681`.**

**Amendment post-`§58`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `bb5f04de3817434ffb45251f27c9c4be8d2caf995ddcdd6b72ebb4131cd9ed30`.**

**Amendment post-`§59`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `3f4ae5ad39ff2ad3429eb90fe7729408bd7e6936d0d5fff016cec72445ecea32`.**

**Amendment post-`§60`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `0cbcd8e0706c7bb2168451347d28f5348fbda1011c2913a24ffa63022caa8d57`.**

**Amendment post-`§61`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `7143a0c04a29e0db50382b328f2b6733d272344acd44c90cd3e6a04ec111170f`.**

**Amendment post-`§62`: `archive/reviews/2026-10-16-constraints-publication-gate1.md` = `54182df50b8749a0d009ee48e9d0051fc3a03d8c598ee8191d27112e88084df5`.**
