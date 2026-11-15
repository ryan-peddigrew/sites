# Round 3: dimensional Center Stage AV marks. Real extrusion, lit faces, bevels, gloss and soft shadows.
# Writes v3-{a,b,c}-{light,dark,icon}.svg ("light" = for dark backgrounds, "dark" = for light backgrounds).
import os, sys
_ARGV3 = list(sys.argv); sys.argv = [sys.argv[0], "/tmp/_ignore_logos"]
import logos2 as L2
sys.argv = _ARGV3
T = L2.T; lig = L2.lig
CR = '#D61045'; INK = '#0B0A0D'

class Doc:
    def __init__(self):
        self.defs = []; self.n = 0
    def id(self, p):
        self.n += 1; return f'{p}{self.n}'
    def lin(self, stops, x2=0, y2=1, units=None):
        i = self.id('g'); u = f' gradientUnits="{units}"' if units else ''
        s = ''.join(f'<stop offset="{o}" stop-color="{c}"{f" stop-opacity=" + chr(34) + str(a) + chr(34) if a is not None else ""}/>' for o, c, a in stops)
        self.defs.append(f'<linearGradient id="{i}" x1="0" y1="0" x2="{x2}" y2="{y2}"{u}>{s}</linearGradient>'); return i
    def rad(self, stops, cx=.5, cy=.5, r=.5, fx=None, fy=None):
        i = self.id('r'); f = f' fx="{fx}" fy="{fy}"' if fx is not None else ''
        s = ''.join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{a}"/>' for o, c, a in stops)
        self.defs.append(f'<radialGradient id="{i}" cx="{cx}" cy="{cy}" r="{r}"{f}>{s}</radialGradient>'); return i
    def clip(self, d, tr='', rule='nonzero'):
        i = self.id('c'); t = f' transform="{tr}"' if tr else ''
        self.defs.append(f'<clipPath id="{i}"><path d="{d}"{t} clip-rule="{rule}"/></clipPath>'); return i
    def shadow(self, blur, dy, op, col='#000', dx=0):
        i = self.id('f')
        self.defs.append(f'<filter id="{i}" x="-30%" y="-30%" width="160%" height="180%" color-interpolation-filters="sRGB">'
                         f'<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="o"/>'
                         f'<feFlood flood-color="{col}" flood-opacity="{op}"/><feComposite in2="o" operator="in"/>'
                         f'<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>'); return i
    def blur(self, b):
        i = self.id('b'); self.defs.append(f'<filter id="{i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="{b}"/></filter>'); return i
    def svg(self, W, H, body, bg=None):
        b = f'<rect width="{W:.0f}" height="{H:.0f}" fill="{bg}"/>' if bg else ''
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}">'
                f'<defs>{"".join(self.defs)}</defs>{b}{body}</svg>')

# material palettes: (face stops, side stops, bevel-light, bevel-dark)
def chrome(D):
    face = D.lin([(0, '#FFFFFF', None), (.42, '#E4E1E8', None), (.5, '#8E8995', None), (.56, '#C9C5CE', None), (1, '#FFFFFF', None)])
    side = D.lin([(0, '#6B6672', None), (1, '#2A2730', None)])
    return face, side, '#FFFFFF', '#3C3842'
def gunmetal(D):
    face = D.lin([(0, '#5C5763', None), (.45, '#2A2730', None), (.5, '#0B0A0D', None), (.58, '#24212A', None), (1, '#45404D', None)])
    side = D.lin([(0, '#0B0A0D', None), (1, '#000000', None)])
    return face, side, '#9A95A2', '#000000'
def crimson(D):
    face = D.lin([(0, '#FF4A78', None), (.48, '#E3144D', None), (1, '#A50B35', None)])
    side = D.lin([(0, '#7A0623', None), (1, '#3A0210', None)])
    return face, side, '#FF9DB6', '#5E0419'

def solid(D, d, mat, depth, dx=.45, dy=1.0, bw=2.2, gloss=None, step=.6, rule='nonzero'):
    """Extruded body + lit face + inner bevel (+ optional gloss band clipped to the face)."""
    face, side, hl, sh = mat
    n = max(2, int(depth / step))
    ext = ''.join(f'<path d="{d}" transform="translate({dx * depth * k / n:.2f} {dy * depth * k / n:.2f})" fill="url(#{side})" fill-rule="{rule}"/>' for k in range(n, 0, -1))
    c = D.clip(d, rule=rule)
    bev = (f'<g clip-path="url(#{c})"><path d="{d}" transform="translate({bw * .55:.2f} {bw * .7:.2f})" fill="none" stroke="{hl}" stroke-opacity=".85" stroke-width="{bw}"/>'
           f'<path d="{d}" transform="translate({-bw * .55:.2f} {-bw * .7:.2f})" fill="none" stroke="{sh}" stroke-opacity=".55" stroke-width="{bw * 1.2:.2f}"/>')
    if gloss:
        x, y, w, h = gloss
        gi = D.lin([(0, '#FFFFFF', .55), (1, '#FFFFFF', .02)])
        bev += f'<path d="M{x} {y} H{x + w} V{y + h * .72} Q{x + w / 2} {y + h * 1.08} {x} {y + h * .72} Z" fill="url(#{gi})"/>'
    bev += '</g>'
    return f'{ext}<path d="{d}" fill="url(#{face})" fill-rule="{rule}"/>{bev}'

def ell_d(cx, cy, rx, ry):
    return f'M{cx - rx} {cy}a{rx} {ry} 0 1 0 {2 * rx} 0a{rx} {ry} 0 1 0 {-2 * rx} 0Z'

def lig_d(x, y, h):
    g, w = lig(x, y, h, '#000')
    return g.split('d="')[1].split('"')[0], w

def word(D, txt, x, y, size, track, mode, anchor='start', depth=None, font='arch900w'):
    d, w = T(font, txt, x, y, size, track=track, anchor=anchor)
    mat = chrome(D) if mode == 'l' else gunmetal(D)
    return solid(D, d, mat, depth if depth is not None else size * .085, bw=max(1.1, size * .028)), w


def av_d(x, base, size, font='arch900w', track=None):
    """Real A and V glyphs, tucked together (no overlap). Returns (d, width, cap height)."""
    if font == 'anton':
        tr = -.05 * size if track is None else track; cap = .86 * size
    else:
        tr = -.3 * size if track is None else track; cap = .688 * size
    d, w = T(font, 'AV', x, base, size, track=tr)
    return d, w, cap

# ---------- A: MARQUEE. Today's emblem (inverted triangle behind a crimson disc, AV on top) rebuilt in 3D
def emblem(D, cx, cy, s, mode='l'):
    rx, ry = 118 * s, 80 * s
    disc = ell_d(cx, cy, rx, ry)
    rot = f'rotate(-10 {cx} {cy})'
    tw, th, t = 252 * s, 214 * s, 17 * s
    top = cy - th * .5
    o = [(cx - tw / 2, top), (cx + tw / 2, top), (cx, top + th)]
    i = [(cx - tw / 2 + t * 1.95, top + t), (cx + tw / 2 - t * 1.95, top + t), (cx, top + th - t * 2.25)]
    tri = 'M' + ' L'.join(f'{a:.1f} {b:.1f}' for a, b in o) + 'Z M' + ' L'.join(f'{a:.1f} {b:.1f}' for a, b in i[::-1]) + 'Z'
    size = 96 * s
    _, w, cap = av_d(0, 0, size)
    d, _, _ = av_d(cx - w / 2 - 2 * s, cy + cap / 2 + 2 * s, size)
    glow = D.rad([(0, CR, .5), (1, CR, 0)])
    halo = f'<ellipse cx="{cx}" cy="{cy + 8 * s}" rx="{rx * 1.4:.1f}" ry="{ry * 1.5:.1f}" fill="url(#{glow})"/>' if mode == 'l' else ''
    tri_g = f'<g filter="url(#{D.shadow(5 * s, 6 * s, .5)})">{solid(D, tri, chrome(D), 11 * s, bw=2.4 * s)}</g>'
    disc_g = f'<g filter="url(#{D.shadow(9 * s, 12 * s, .55)})"><g transform="{rot}">{solid(D, disc, crimson(D), 16 * s, dx=.3, bw=3.2 * s, gloss=(cx - rx, cy - ry, 2 * rx, ry * 1.05))}</g></g>'
    av_g = f'<g filter="url(#{D.shadow(4 * s, 6 * s, .6, "#2A0010")})">{solid(D, d, chrome(D), 11 * s, bw=2.2 * s)}</g>'
    return halo + tri_g + disc_g + av_g

def optA(mode):
    D = Doc()
    size = 70
    _, wL = T('arch900w', 'CENTER', 0, 0, size, track=2)
    _, wR = T('arch900w', 'STAGE', 0, 0, size, track=2)
    em_w, H, cy = 262, 250, 122
    x0 = 10
    cxm = x0 + wL + 14 + em_w / 2
    base = cy + size * .344
    a, _ = word(D, 'CENTER', x0, base, size, 2, mode)
    b, _ = word(D, 'STAGE', cxm + em_w / 2 + 14, base, size, 2, mode)
    W = cxm + em_w / 2 + 14 + wR + 24
    return D.svg(W, H, a + b + emblem(D, cxm, cy, 1, mode))

# ---------- B: CENTRE STAGE. A crimson 3D AV stands on a lit stage riser under a spotlight; wordmark beside
def stage_mark(D, x, y, s, mode='l'):
    cx = x + 130 * s
    cone = D.lin([(0, '#FF6A8E', .7 if mode == 'l' else .5), (1, CR, 0)])
    bl = D.blur(3 * s)
    beam = f'<path d="M{cx - 20 * s} {y} H{cx + 20 * s} L{cx + 128 * s} {y + 206 * s} H{cx - 128 * s} Z" fill="url(#{cone})" filter="url(#{bl})"/>'
    lamp = solid(D, f'M{cx - 26 * s} {y - 12 * s} h{52 * s} v{13 * s} h{-52 * s} Z', chrome(D) if mode == 'l' else gunmetal(D), 5 * s, bw=1.4 * s)
    rx, ry = 124 * s, 26 * s; ry0 = y + 206 * s
    deck_top = ell_d(cx, ry0, rx, ry)
    side = D.lin([(0, '#2B2730', None), (1, '#0B0A0D', None)])
    rim = D.lin([(0, '#FF2D63', None), (1, '#8E0A2E', None)])
    depth = 22 * s
    deck = (f'<path d="M{cx - rx} {ry0} V{ry0 + depth} A{rx} {ry} 0 0 0 {cx + rx} {ry0 + depth} V{ry0} Z" fill="url(#{side})"/>'
            f'<path d="M{cx - rx} {ry0 + 3 * s} A{rx} {ry} 0 0 0 {cx + rx} {ry0 + 3 * s}" fill="none" stroke="url(#{rim})" stroke-width="{2.4 * s}"/>')
    pool = D.rad([(0, '#FF5C84', .95), (.55, CR, .5), (1, CR, 0)])
    top_fill = D.lin([(0, '#3A3540' if mode == 'l' else '#4A4550', None), (1, '#16141A', None)])
    deck += f'<path d="{deck_top}" fill="url(#{top_fill})"/><ellipse cx="{cx}" cy="{ry0}" rx="{rx * .92:.1f}" ry="{ry * .85:.1f}" fill="url(#{pool})"/>'
    size = 168 * s
    _, w, cap = av_d(0, 0, size, 'anton')
    d, _, _ = av_d(cx - w / 2 - 6 * s, ry0 + 2 * s, size, 'anton')
    cs = D.blur(5 * s)
    contact = f'<ellipse cx="{cx + 10 * s}" cy="{ry0 + 2 * s}" rx="{w / 2 * 1.08:.1f}" ry="{9 * s:.1f}" fill="#000" opacity=".65" filter="url(#{cs})"/>'
    av = f'<g filter="url(#{D.shadow(5 * s, 4 * s, .5)})">{solid(D, d, crimson(D), 15 * s, dx=.55, bw=3 * s, gloss=(cx - w / 2 - 12 * s, ry0 - cap, w + 30 * s, cap * .55))}</g>'
    return beam + deck + contact + av + lamp

def optB(mode):
    D = Doc()
    mark = stage_mark(D, 4, 22, 1, mode)
    size = 76
    a, w1 = word(D, 'CENTER', 296, 132, size, 3, mode)
    b, w2 = word(D, 'STAGE', 296, 220, size, 3, mode)
    sub_d, sw = T('unb600', 'AUDIO VISUAL', 300, 262, 17, track=11)
    sub = f'<path d="{sub_d}" fill="{CR}"/>'
    W = 296 + max(w1, w2) + 26
    return D.svg(W, 290, mark + a + b + sub)

# ---------- C: HEADLINER SIGN. CENTER [AV] STAGE as dimensional channel letters on one line; AV lit crimson
def optC(mode):
    D = Doc()
    size, base = 88, 146
    _, wL = T('arch900w', 'CENTER', 0, 0, size, track=1)
    x0 = 14
    a, _ = word(D, 'CENTER', x0, base, size, 1, mode, depth=13)
    asz = 136
    ax = x0 + wL + 22
    d, aw, cap = av_d(ax, base, asz)
    glow = D.blur(16)
    bloom = f'<path d="{d}" fill="{CR}" opacity="{.85 if mode == "l" else .3}" filter="url(#{glow})" transform="translate(4 10)"/>'
    av = bloom + f'<g filter="url(#{D.shadow(7, 9, .55)})">{solid(D, d, crimson(D), 18, dx=.5, bw=3.2, gloss=(ax - 6, base - cap, aw + 24, cap * .52))}</g>'
    b, wR = word(D, 'STAGE', ax + aw + 22, base, size, 1, mode, depth=13)
    W = ax + aw + 22 + wR + 30
    wall = D.shadow(9, 12, .35 if mode == 'd' else .7)
    return D.svg(W, 196, f'<g filter="url(#{wall})">{a}{b}</g>' + av)

def icon(n):
    D = Doc()
    bgg = D.rad([(0, '#2A1018', 1), (.7, '#0B0A0D', 1), (1, '#0B0A0D', 1)], cx=.5, cy=.42, r=.7)
    bg = f'<rect width="512" height="512" fill="url(#{bgg})"/>'
    if n == 'a':
        return D.svg(512, 512, bg + emblem(D, 256, 252, 1.6))
    if n == 'b':
        return D.svg(512, 512, bg + stage_mark(D, 256 - 130 * 1.62, 66, 1.62))
    size = 250
    _, w, cap = av_d(0, 0, size)
    d, _, _ = av_d(256 - w / 2 - 8, 256 + cap / 2 - 6, size)
    glow = D.blur(26)
    body = (f'<path d="{d}" fill="{CR}" opacity=".8" filter="url(#{glow})" transform="translate(6 16)"/>'
            f'<g filter="url(#{D.shadow(12, 16, .6)})">{solid(D, d, crimson(D), 30, dx=.5, bw=6, gloss=(40, 256 - cap / 2, 440, cap * .52))}</g>')
    return D.svg(512, 512, bg + body)

if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for n, fn in [('a', optA), ('b', optB), ('c', optC)]:
        open(f'{out}/v3-{n}-light.svg', 'w').write(fn('l'))
        open(f'{out}/v3-{n}-dark.svg', 'w').write(fn('d'))
        open(f'{out}/v3-{n}-icon.svg', 'w').write(icon(n))
    print('ok')
