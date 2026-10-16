#!/usr/bin/env python3
# Builds docs/specs/storeroom-constraints/live-greens-a112.md from the blind run's own record.
import json

d = json.load(open('blind-greens-a112-out.json'))
res = {r['id']: r for r in d['results']}

FIXES = [
    (" s own", "'s own"), (" s return", "'s return"), (" s body", "'s body"), (" s pass", "'s pass"),
    (" s log", "'s log"), (" s address", "'s address"), (" s count", "'s count"), (" s window", "'s window"),
    (" s member", "'s member"), (" s set", "'s set"), (" s state", "'s state"), (" s key", "'s key"),
    (" s two", "'s two"), (" s one", "'s one"), (" s reach", "'s reach"), (" s status", "'s status"),
    (" s arms", "'s arms"), (" s rows", "'s rows"), (" s carrier", "'s carrier"), (" s subject", "'s subject"),
    (" s floor", "'s floor"), (" s own act", "'s own act"), (" s function", "'s function"),
    (" s handle", "'s handle"), (" s handles", "'s handles"), (" s registry", "'s registry"),
    (" s home", "'s home"), (" s delivery", "'s delivery"), (" s order", "'s order"), (" s kind", "'s kind"),
    (" s answer", "'s answer"), (" s edit", "'s edit"), (" s verb", "'s verb"), (" s throwable", "'s throwable"),
    ("app s ", "app's "), ("store s ", "store's "), ("kernel s ", "kernel's "), ("listener s ", "listener's "),
    ("record s ", "record's "), ("pair s ", "pair's "), ("pair body s", "pair body's"), ("attempt s ", "attempt's "),
    ("caller s ", "caller's "), ("window s ", "window's "), ("body s ", "body's "),
]


def t(s):
    s = str(s)
    for a, b in FIXES:
        s = s.replace(a, b)
    return s


def obs(r):
    o = str(r['observed'])
    v = r['outcome']
    if v == 'NOT-EXERCISABLE':
        first, _, reason = o.partition(' || REASON: ')
        return ('- **' + v + '.** Observed: ' + t(first) + '.\n'
                '- **Which clause failed to pin what a blind driver needs.** ' + t(reason))
    return '- **' + v + '.** Observed: ' + t(o)


HEAD = open('greens-a112-head.md').read()
TAIL = open('greens-a112-tail.md').read()

GROUP_META = [
    ('A', 'GROUP A — the declared surfaces', "the five kernel items, the closed `8`-verb store namespace, the instance's three members, the adopted handle, the record shape"),
    ('B', 'GROUP B — `pending` IS THE WHOLE RETURNED SET; the CHECK-OFF; the `SIFT`\'s absence', "the member read as the caller reads it, the entry that leaves only by its own check-off, the entry no pass evaluated, the subtraction by mechanism"),
    ('C', 'GROUP C — the failed/discarded arm, and one delivery per evaluated pair', "the throwing arm, the discard question, per-pair delivery, the one comparable order"),
    ('D', 'GROUP D — the store invokes nothing; the two ordered layers', "the store's silence, the in-window instant, layer (b), the `N7` hand-off"),
    ('E', 'GROUP E — the hold/release edges, the repeat states and the repair states', "`KC-7` hold and release, `KC-5`, `KC-6`, `KC-4`, the body-throw arm, the `KC-8` floor"),
    ('F', 'GROUP F — the store\'s own channel and the five items\' boundary', "the two registration channels, the store's codes verbatim, the one failure form"),
    ('G', 'GROUP G — the composition, the floor stop, and the two named batteries', "the call list, the floor stop, `E2E-C-8`, `E2E-C-16`"),
    ('H', 'GROUP H — the message log and the readers', "`LogEntry`, `K-4`/`K-5`, `AttemptContext`"),
]

out = [HEAD, '\n---\n\n## THE CELLS\n']
for g, title, sub in GROUP_META:
    ids = [r['id'] for r in d['results'] if r['id'].split('-')[1].startswith(g)]
    ps = sum(1 for i in ids if res[i]['outcome'] == 'PASS')
    fs = sum(1 for i in ids if res[i]['outcome'] == 'FAIL')
    ns = sum(1 for i in ids if res[i]['outcome'] == 'NOT-EXERCISABLE')
    out.append('\n### ' + title + '\n')
    out.append('*' + sub + '* — ' + str(len(ids)) + ' cells: **' + str(ps) + ' PASS / ' + str(fs) + ' FAIL / ' + str(ns) + ' NOT-EXERCISABLE**.')
    for i in ids:
        r = res[i]
        out.append('\n#### `[' + i + ']` — **`' + r['outcome'] + '`**\n')
        out.append('- **Clause it rests on.** ' + t(r['clause']))
        out.append('- **The exact drive.** ' + t(r['drive']))
        out.append('- **The expected observable.** ' + t(r['expected']))
        out.append(obs(r))

out.append('\n---\n')
out.append(TAIL)
full = '\n'.join(out)
open('/tmp/full.md', 'w').write(full)
print('cells:', len(d['results']), 'bytes:', len(full))
