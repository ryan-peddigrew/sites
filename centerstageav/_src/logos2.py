# Round 2: bolder, hand-built Center Stage AV marks. Writes SVGs to argv[1].
import os, sys, math
sys.argv_saved = list(sys.argv); sys.argv = [sys.argv[0], '/tmp/_ignore_logos']
import logos as L
sys.argv = sys.argv_saved
CR = L.CR; INK = '#0B0A0D'
from fontTools.ttLib import TTFont
for _k in ['unb900','anton','arch900w']: L.FONTS[_k]=TTFont(os.path.join(L.F,_k+'.ttf'))
T = L.text
_uid = [0]
def uid():
    _uid[0] += 1; return f'k{_uid[0]}'

def _ix(p1, p2, p3, p4):
    (x1, y1), (x2, y2), (x3, y3), (x4, y4) = p1, p2, p3, p4
    d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d
    return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
def lig(x, y, h, col, w=None, bar=True):
    """Hand-built AV ligature: the A's right leg is the V's left arm. One outline, flat terminals, A counter cut out."""
    s = h / 100.0
    tx = (w / s if w else 25)
    a, b, c = 37, 76, 115
    def P_(px, py): return (x + px * s, y + py * s)
    LL = ((0, 100), (a - tx / 2, 0)); LR = ((tx, 100), (a + tx / 2, 0))
    SL = ((a - tx / 2, 0), (b - tx / 2, 100)); SR = ((a + tx / 2, 0), (b + tx / 2, 100))
    VL = ((b - tx / 2, 100), (c - tx / 2, 0)); VR = ((b + tx / 2, 100), (c + tx / 2, 0))
    N = _ix(*SR, *VL); I = _ix(*LR, *SL)
    def at(line, yy): (x1, y1), (x2, y2) = line; return (x1 + (x2 - x1) * (yy - y1) / (y2 - y1), yy)
    yb1, yb2 = 64, 64 + tx * 0.55
    outer = [(0, 100), (a - tx / 2, 0), (a + tx / 2, 0), N, (c - tx / 2, 0), (c + tx / 2, 0), (b + tx / 2, 100), (b - tx / 2, 100)]
    if bar:
        outer += [at(SL, yb2), at(LR, yb2)]
    else:
        outer += [I]
    outer += [(tx, 100)]
    d = 'M' + ' L'.join(f'{P_(*p)[0]:.2f} {P_(*p)[1]:.2f}' for p in outer) + ' Z'
    if bar and I[1] < yb1 - 4:
        hole = [I, at(SL, yb1), at(LR, yb1)]
        d += ' M' + ' L'.join(f'{P_(*p)[0]:.2f} {P_(*p)[1]:.2f}' for p in hole) + ' Z'
    return f'<path d="{d}" fill="{col}" fill-rule="evenodd"/>', (c + tx / 2) * s

def svg(W, H, body, bg=None):
    b = f'<rect width="{W}" height="{H}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}">{b}{body}</svg>'
def P(d, f): return f'<path d="{d}" fill="{f}"/>'

# ---------- Option A: SPOTLIGHT. AV ligature knocked out of a bold tilted crimson spotlight disc + heavy wide wordmark
def optA(ink):
    H = 200
    cx, cy = 118, 100
    ell = f'<ellipse cx="{cx}" cy="{cy}" rx="112" ry="78" transform="rotate(-12 {cx} {cy})" fill="{CR}"/>'
    g, lw = lig(0, 0, 84, '#fff')
    mark = ell + f'<g transform="translate({cx - 59:.1f} {cy - 42})">{g}</g>'
    d1, w1 = T('unb900', 'CENTER', 262, 94, 62, track=3)
    d2, w2 = T('unb900', 'STAGE', 262, 160, 62, track=3)
    W = 262 + max(w1, w2) + 12
    # thin crimson underline only under STAGE's baseline is NOT used (no decorative lines)
    return svg(W, H, mark + P(d1, ink) + P(d2, ink))

# ---------- Option B: THE BEAM. A crimson spotlight cone falls on centre stage; AV stands in the light. Stacked lockup.
def optB(ink):
    W = 560; mx = W / 2
    top, bot, tw, bw = 6, 236, 70, 300
    beam = (f'<path d="M{mx - tw / 2} {top} H{mx + tw / 2} L{mx + bw / 2} {bot} Q{mx} {bot + 34} {mx - bw / 2} {bot} Z" fill="{CR}"/>')
    g, lw = lig(0, 0, 120, '#fff')
    mark = beam + f'<g transform="translate({mx - lw / 2:.1f} {bot - 134})">{g}</g>'
    d1, w1 = T('anton', 'CENTER STAGE', mx, 368, 96, track=5, anchor='middle')
    d2, w2 = T('unb600', 'AUDIO VISUAL', mx, 410, 19, track=14, anchor='middle')
    return svg(W, 428, mark + P(d1, ink) + P(d2, ink))

# ---------- Option C: HEADLINER. Wordmark-led; a tall crimson AV stands in its own pool of light beside the name
def optC(ink):
    d1, w1 = T('arch900w', 'CENTER', 0, 92, 104, track=0)
    d2, w2 = T('arch900w', 'STAGE', 0, 196, 104, track=0)
    tw = max(w1, w2)
    g, lw = lig(0, 0, 178, CR)
    lx = tw + 46; ly = 18
    W = lx + lw + 34
    pool = f'<ellipse cx="{lx + lw / 2:.1f}" cy="{ly + 186:.1f}" rx="{lw / 2 + 30:.1f}" ry="13" fill="{CR}"/>'
    return svg(W, 222, P(d1, ink) + P(d2, ink) + pool + f'<g transform="translate({lx:.1f} {ly})">{g}</g>')

def optBh(ink):  # horizontal lockup of B for headers
    top, bot, tw, bw = 4, 150, 46, 190; mx = bw / 2 + 2
    beam = f'<path d="M{mx - tw / 2} {top} H{mx + tw / 2} L{mx + bw / 2} {bot} Q{mx} {bot + 22} {mx - bw / 2} {bot} Z" fill="{CR}"/>'
    g, lw = lig(0, 0, 76, '#fff')
    d1, w1 = T('anton', 'CENTER STAGE', bw + 30, 122, 112, track=5)
    return svg(bw + 30 + w1 + 8, 172, beam + f'<g transform="translate({mx - lw / 2:.1f} {bot - 86})">{g}</g>' + P(d1, ink))

def icon(n):
    if n == 'b':
        g, lw = lig(0, 0, 190, '#fff')
        body = f'<path d="M206 40 H306 L470 410 Q256 470 42 410 Z" fill="{CR}"/>' + f'<g transform="translate({256 - lw / 2:.1f} 200)">{g}</g>'
        return svg(512, 512, body, bg=INK)
    if n == 'c':
        g, lw = lig(0, 0, 250, CR)
        body = f'<ellipse cx="256" cy="390" rx="{lw / 2 + 40:.1f}" ry="30" fill="{CR}"/>' + f'<g transform="translate({256 - lw / 2 + 8:.1f} 140)">{g}</g>'
        return svg(512, 512, body, bg=INK)
    g, lw = lig(0, 0, 190, '#fff')
    body = (f'<ellipse cx="256" cy="256" rx="236" ry="168" transform="rotate(-12 256 256)" fill="{CR}"/>'
            f'<g transform="translate({256 - lw / 2 + 6:.1f} {256 - 95})">{g}</g>')
    return svg(512, 512, body, bg=INK)

if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for n, fn in [('a', optA), ('b', optB), ('c', optC)]:
        open(f'{out}/v2-{n}-light.svg', 'w').write(fn('#fff'))
        open(f'{out}/v2-{n}-dark.svg', 'w').write(fn(INK))
        open(f'{out}/v2-{n}-icon.svg', 'w').write(icon(n))
    open(f'{out}/v2-b-h-light.svg', 'w').write(optBh('#fff')); open(f'{out}/v2-b-h-dark.svg', 'w').write(optBh(INK))
    print('ok')
