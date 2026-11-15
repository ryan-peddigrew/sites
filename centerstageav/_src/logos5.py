# Round 5: back to their original. Tilted crimson oval, big pointed AV breaking out of it, no triangle.
# O1 Original, redrawn (outlined, like today) / O2 Clean (no outlines, soft lift) / O3 Inside the oval
import os, sys
_A5 = list(sys.argv); sys.argv = [sys.argv[0], "/tmp/_ignore_logos"]
import logos3 as L3
sys.argv = _A5
from fontTools.ttLib import TTFont
L3.L2.L.FONTS['michroma'] = TTFont(os.path.join(L3.L2.L.F, 'michroma.ttf'))
Doc, T, ell_d = L3.Doc, L3.T, L3.ell_d
CR = '#D61045'; INK = '#0B0A0D'

def poly(pts): return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + 'Z'

def av_paths(cx, cy, h, w=None, f=None, gap=None, vdrop=.3):
    """Pointed A and V, A on the left, V tucked beside it and dropped lower. Returns (A d, V d, bbox)."""
    w = w or h * .5; f = f or h * .2; gap = gap if gap is not None else h * .05
    # A, apex at (0,0)
    yb1, yb2 = h * .6, h * .6 + f * .62
    def ir(y): return w - f - (h - y) * w / h          # inner right leg x at y
    A = [(0, 0), (w, h), (w - f, h), (ir(yb2), yb2), (-ir(yb2), yb2), (-(w - f), h), (-w, h)]
    hole_apex = f * h / w
    hole = [(0, hole_apex + 2), (-ir(yb1), yb1), (ir(yb1), yb1)]
    vy = vdrop * h
    vx = w + vy * w / h + gap + f * .0
    V = [(vx - w, vy), (vx - w + f, vy), (vx, vy + h - f * h / w), (vx + w - f, vy), (vx + w, vy), (vx, vy + h)]
    tw = (vx + w) - (-w); th = vy + h
    ox, oy = cx - (-w + tw / 2), cy - th / 2
    mv = lambda P: [(x + ox, y + oy) for x, y in P]
    return poly(mv(A)) + ' ' + poly(mv(hole)[::-1]), poly(mv(V)), (cx - tw / 2, oy, tw, th)

def mark(D, cx, cy, s, style, mode):
    rx, ry = (112 * s, 66 * s) if style == 3 else (128 * s, 78 * s)
    disc = ell_d(cx, cy, rx, ry); rot = f'rotate(-12 {cx} {cy})'
    ink = INK
    if style == 3:
        a, v, _ = av_paths(cx, cy + 2 * s, 92 * s, vdrop=.14)
    else:
        a, v, _ = av_paths(cx + 2 * s, cy + 4 * s, 150 * s)
    o = ''
    if style in (1, 2):   # like today: outline round the oval and the letters, AV breaking out top and bottom
        rim = ink if mode == "d" else "#FFFFFF"
        if style == 1:
            o += f'<g transform="{rot}"><path d="{disc}" fill="{CR}" stroke="{rim}" stroke-width="{4.5 * s}"/></g>'
        else:
            g = D.lin([(0, '#E8185A', None), (1, '#C70E41', None)])
            o += f'<g filter="url(#{D.shadow(6 * s, 6 * s, .5 if mode == "l" else .3)})"><g transform="{rot}"><path d="{disc}" fill="url(#{g})" stroke="{rim}" stroke-width="{4 * s}"/></g></g>'
        sw = 6 * s
        let = (f'<path d="{a}" fill="#FFFFFF" stroke="{ink}" stroke-width="{sw}" stroke-linejoin="miter" paint-order="stroke"/>'
               f'<path d="{v}" fill="#FFFFFF" stroke="{ink}" stroke-width="{sw}" stroke-linejoin="miter" paint-order="stroke"/>')
        if style == 2:
            let = f'<g filter="url(#{D.shadow(3 * s, 4 * s, .4 if mode == "l" else .25, "#3A0011")})">{let}</g>'
        return o + let
    g = D.lin([(0, '#E8185A', None), (1, '#C70E41', None)])
    sh = D.shadow(6 * s, 6 * s, .5 if mode == 'l' else .3)
    c = D.clip(disc)
    o += (f'<g filter="url(#{sh})"><g transform="{rot}"><path d="{disc}" fill="url(#{g})"/>'
          f'<g clip-path="url(#{c})"><path d="{disc}" transform="translate(0 {1.6 * s:.1f})" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="{2.2 * s:.1f}"/></g></g></g>')
    lsh = D.shadow(3 * s, 4 * s, .45 if mode == 'l' else .3, '#3A0011')
    o += f'<g filter="url(#{lsh})"><path d="{a}" fill="#FFFFFF" fill-rule="evenodd"/><path d="{v}" fill="#FFFFFF"/></g>'
    return o

def lockup(style, mode):
    D = Doc()
    ink = '#FFFFFF' if mode == 'l' else INK
    font = 'arch900w'
    size = 66
    tr = 5 if style != 3 else 2
    cap = size * .688
    _, wL = T(font, 'CENTER', 0, 0, size, track=tr)
    _, wR = T(font, 'STAGE', 0, 0, size, track=tr)
    em, H, cy, x0 = (300 if style != 3 else 262), 230, 115, 8
    cxm = x0 + wL + 10 + em / 2
    base = cy + cap / 2
    a, _ = T(font, 'CENTER', x0, base, size, track=tr)
    b, _ = T(font, 'STAGE', cxm + em / 2 + 10, base, size, track=tr)
    W = cxm + em / 2 + 10 + wR + 12
    return D.svg(W, H, f'<path d="{a}" fill="{ink}"/><path d="{b}" fill="{ink}"/>' + mark(D, cxm, cy, 1, style, mode))

def icon(style):
    D = Doc()
    return D.svg(512, 512, f'<rect width="512" height="512" fill="{INK}"/>' + mark(D, 256, 256, 1.75, style, 'l'))

if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for st in (1, 2, 3):
        open(f'{out}/v5-o{st}-light.svg', 'w').write(lockup(st, 'l'))
        open(f'{out}/v5-o{st}-dark.svg', 'w').write(lockup(st, 'd'))
        open(f'{out}/v5-o{st}-icon.svg', 'w').write(icon(st))
    print('ok5')
