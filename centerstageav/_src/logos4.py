# Round 4: Option A dialled back. Flat crimson disc + triangle + AV, three restraint levels.
# A1 lightest (flat, soft shadow), A2 (+ gentle gradient and faint edge highlight), A3 (+ slight thickness, faint sheen).
import os, sys
_ARGV4 = list(sys.argv); sys.argv = [sys.argv[0], "/tmp/_ignore_logos"]
import logos3 as L3
sys.argv = _ARGV4
Doc, T, av_d, ell_d = L3.Doc, L3.T, L3.av_d, L3.ell_d
CR = '#D61045'; INK = '#0B0A0D'

def emblem(D, cx, cy, s, lvl, mode):
    rx, ry = 118 * s, 80 * s
    rot = f'rotate(-10 {cx} {cy})'
    disc = ell_d(cx, cy, rx, ry)
    tw, th, t = 252 * s, 214 * s, 17 * s
    top = cy - th * .5
    o = [(cx - tw / 2, top), (cx + tw / 2, top), (cx, top + th)]
    i = [(cx - tw / 2 + t * 1.95, top + t), (cx + tw / 2 - t * 1.95, top + t), (cx, top + th - t * 2.25)]
    tri = 'M' + ' L'.join(f'{a:.1f} {b:.1f}' for a, b in o) + 'Z M' + ' L'.join(f'{a:.1f} {b:.1f}' for a, b in i[::-1]) + 'Z'
    tri_col = '#FFFFFF' if mode == 'l' else INK
    size = 96 * s
    _, w, cap = av_d(0, 0, size)
    avd, _, _ = av_d(cx - w / 2 - 2 * s, cy + cap / 2 + 2 * s, size)
    sh_op = {1: .28, 2: .34, 3: .42}[lvl] * (1.6 if mode == 'l' else 1)
    sh_disc = D.shadow({1: 6, 2: 7, 3: 9}[lvl] * s, {1: 5, 2: 6, 3: 8}[lvl] * s, min(sh_op, .7))
    out = f'<path id="Triangle" d="{tri}" fill="{tri_col}"/>'
    if lvl >= 2:
        out = f'<g filter="url(#{D.shadow(3 * s, 3 * s, .25 if mode == "d" else .5)})">{out}</g>'
    body = ''
    if lvl == 1:
        body = f'<path d="{disc}" fill="{CR}"/>'
    else:
        g = D.lin([(0, '#E8185A' if lvl == 2 else '#EE2160', None), (1, '#C70E41' if lvl == 2 else '#B80C3C', None)])
        if lvl == 3:
            body += f'<path d="{disc}" transform="translate(0 {4 * s})" fill="#8E0A2E"/>'
        body += f'<path d="{disc}" fill="url(#{g})"/>'
        c = D.clip(disc)
        hl = .28 if lvl == 2 else .38
        body += (f'<g clip-path="url(#{c})"><path d="{disc}" transform="translate(0 {1.6 * s:.2f})" fill="none" stroke="#fff" stroke-opacity="{hl}" stroke-width="{2.2 * s:.2f}"/>')
        if lvl == 3:
            gi = D.lin([(0, '#FFFFFF', .16), (1, '#FFFFFF', 0)])
            body += f'<path d="M{cx - rx} {cy - ry} H{cx + rx} V{cy - ry * .15} Q{cx} {cy + ry * .2} {cx - rx} {cy - ry * .15} Z" fill="url(#{gi})"/>'
        body += '</g>'
    out += f'<g id="Disc" filter="url(#{sh_disc})"><g transform="{rot}">{body}</g></g>'
    av = f'<path id="AV" d="{avd}" fill="#FFFFFF"/>'
    if lvl >= 2:
        av = f'<g filter="url(#{D.shadow(2.5 * s, 2.5 * s, .3 if lvl == 2 else .4, "#4A0016")})">{av}</g>'
    return out + av

def lockup(lvl, mode):
    D = Doc()
    size = 70
    ink = '#FFFFFF' if mode == 'l' else INK
    _, wL = T('arch900w', 'CENTER', 0, 0, size, track=2)
    _, wR = T('arch900w', 'STAGE', 0, 0, size, track=2)
    em_w, H, cy, x0 = 262, 250, 122, 10
    cxm = x0 + wL + 14 + em_w / 2
    base = cy + size * .344
    a, _ = T('arch900w', 'CENTER', x0, base, size, track=2)
    b, _ = T('arch900w', 'STAGE', cxm + em_w / 2 + 14, base, size, track=2)
    W = cxm + em_w / 2 + 14 + wR + 24
    return D.svg(W, H, f'<path id="CENTER" d="{a}" fill="{ink}"/><path id="STAGE" d="{b}" fill="{ink}"/>' + emblem(D, cxm, cy, 1, lvl, mode))

def icon(lvl):
    D = Doc()
    return D.svg(512, 512, f'<rect width="512" height="512" fill="{INK}"/>' + emblem(D, 256, 250, 1.6, lvl, 'l'))

if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for l in (1, 2, 3):
        open(f'{out}/v4-a{l}-light.svg', 'w').write(lockup(l, 'l'))
        open(f'{out}/v4-a{l}-dark.svg', 'w').write(lockup(l, 'd'))
        open(f'{out}/v4-a{l}-icon.svg', 'w').write(icon(l))
    import re
    for l in (1, 2, 3):
        for m in ('light', 'dark'):
            t = open(f'{out}/v4-a{l}-{m}.svg').read()
            t = re.sub(r' filter="url\(#[a-z0-9]+\)"', '', t)
            t = re.sub(r'<filter .*?</filter>', '', t)
            open(f'{out}/fig-a{l}-{m}.svg', 'w').write(t)
    print('ok4')
