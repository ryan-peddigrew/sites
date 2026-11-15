# Round 6: reimagined, icon-first. Keeps red/white/black, the tilted oval and the pointed AV, nothing else.
# R1 Ring: white oval ring, pointed AV breaking through it, on a crimson tile.
# R2 Spot: white AV on black, the A's crossbar is a small crimson oval (the old oval, as a spotlight).
# R3 Split: the oval cut along the A's slant: crimson half with a white A, black half with a crimson V.
import os, sys
_A6 = list(sys.argv); sys.argv = [sys.argv[0], "/tmp/_ignore_logos"]
import logos5 as L5
sys.argv = _A6
Doc, T, ell_d, av_paths, poly = L5.Doc, L5.T, L5.ell_d, L5.av_paths, L5.poly
CR = '#D61045'; INK = '#0B0A0D'; WH = '#FFFFFF'

def legs(h, w, f):
    """Pointed A legs only (no crossbar), apex at (0,0)."""
    ia = f * h / w
    return [(0, 0), (w, h), (w - f, h), (0, ia), (-(w - f), h), (-w, h)]

def vpts(vx, vy, h, w, f):
    return [(vx - w, vy), (vx - w + f, vy), (vx, vy + h - f * h / w), (vx + w - f, vy), (vx + w, vy), (vx, vy + h)]

def mv(P, dx, dy, s=1): return [(x * s + dx, y * s + dy) for x, y in P]

# ---------- R1 BLACK OVAL ON CRIMSON
def r1_mark(D, cx, cy, s, ring=WH, let=WH):
    rx, ry = 190 * s, 118 * s
    rot = f'rotate(-12 {cx} {cy})'
    h = 250 * s
    a, v, _ = av_paths(cx + 2 * s, cy + 2 * s, h, f=h * .2, gap=h * .05)
    return f'<g transform="{rot}"><path d="{ell_d(cx, cy, rx, ry)}" fill="{INK}"/></g><path d="{a}" fill="{let}"/><path d="{v}" fill="{let}"/>'

# ---------- R2 SPOT
def r2_mark(D, cx, cy, s, let=WH, dot=CR):
    h, w, f = 200 * s, 100 * s, 36 * s
    A = legs(h, w, f)
    vy = .28 * h; vx = w + vy * w / h + 10 * s
    V = vpts(vx, vy, h, w, f)
    tw = vx + w + w; th = vy + h
    dx, dy = cx - tw / 2 + w, cy - th / 2
    yb = .66 * h
    ox = dx; oy = dy + yb
    oval = f'<ellipse cx="{ox:.1f}" cy="{oy:.1f}" rx="{w * .56:.1f}" ry="{w * .3:.1f}" transform="rotate(-12 {ox:.1f} {oy:.1f})" fill="{dot}"/>'
    return f'<path d="{poly(mv(A, dx, dy))}" fill="{let}"/>' + oval + f'<path d="{poly(mv(V, dx, dy))}" fill="{let}"/>'

# ---------- R3 SPLIT
def r3_mark(D, cx, cy, s, dark_half=INK, a_col=WH, v_col=CR, edge=None):
    rx, ry = 160 * s, 104 * s
    rot = f'rotate(-12 {cx} {cy})'
    disc = ell_d(cx, cy, rx, ry)
    h, w, f = 150 * s, 74 * s, 27 * s
    A = legs(h, w, f)
    # crossbar for the A
    yb1, yb2 = .62 * h, .62 * h + f * .6
    def ir(y): return w - f - (h - y) * w / h
    A = [(0, 0), (w, h), (w - f, h), (ir(yb2), yb2), (-ir(yb2), yb2), (-(w - f), h), (-w, h)]
    hole = [(0, f * h / w + 2 * s), (-ir(yb1), yb1), (ir(yb1), yb1)]
    gap = 22 * s
    vy = .22 * h; vx = w + vy * w / h + gap + 14 * s
    V = vpts(vx, vy, h, w, f)
    tw = vx + w + w; th = vy + h
    dx, dy = cx - tw / 2 + w, cy - th / 2
    # split line runs parallel to the A's right leg, centred in the gap between A and V
    k = w / h
    mid = lambda y: dx + w + gap / 2 + 7 * s + (y - dy - h) * k   # x on the split at y
    yT, yB = cy - 200 * s, cy + 200 * s
    left = [(cx - 400 * s, yT), (mid(yT), yT), (mid(yB), yB), (cx - 400 * s, yB)]
    right = [(mid(yT), yT), (cx + 400 * s, yT), (cx + 400 * s, yB), (mid(yB), yB)]
    cid = D.clip(disc, tr=rot)
    o = (f'<g clip-path="url(#{cid})"><path d="{poly(left)}" fill="{CR}"/><path d="{poly(right)}" fill="{dark_half}"/></g>')
    if edge:
        o += f'<g transform="{rot}"><path d="{disc}" fill="none" stroke="{edge}" stroke-width="{3 * s}"/></g>'
    o += f'<path d="{poly(mv(A, dx, dy))} {poly(mv(hole, dx, dy)[::-1])}" fill="{a_col}"/><path d="{poly(mv(V, dx, dy))}" fill="{v_col}"/>'
    return o

def tile(D, n, bg, s=1.0):
    c = 256
    if n == 1: m = r1_mark(D, c, c + 4, 1.0)
    elif n == 2: m = r2_mark(D, c, c, 1.12)
    else: m = r3_mark(D, c, c, 1.18, dark_half='#2E2B34')
    return f'<rect width="512" height="512" rx="112" fill="{bg}"/>' + m

def icon(n):
    D = Doc(); bg = {1: CR, 2: INK, 3: INK}[n]
    return D.svg(512, 512, tile(D, n, bg))

def lockup(n, mode):
    """Horizontal lockup: icon tile + CENTER STAGE / AUDIO VISUAL."""
    D = Doc()
    ink = WH if mode == 'l' else INK
    bg = {1: CR, 2: INK, 3: INK}[n]
    if n in (2, 3) and mode == 'l': bg = '#1C1A20'
    sc = 200 / 512
    ic = f'<g transform="translate(10 15) scale({sc:.4f})">{tile(D, n, bg)}</g>'
    size = 66
    a, w1 = T('arch900w', 'CENTER', 238, 105, size, track=4)
    b, w2 = T('arch900w', 'STAGE', 238, 183, size, track=4)
    sub, ws = T('unb600', 'AUDIO VISUAL', 241, 214, 15, track=9)
    W = 238 + max(w1, w2, ws) + 16
    return D.svg(W, 230, ic + f'<path d="{a}" fill="{ink}"/><path d="{b}" fill="{ink}"/><path d="{sub}" fill="{CR if mode == "d" else "#FF2D63"}"/>')

def wide(n, mode):
    """One-line header lockup: icon + CENTER STAGE."""
    D = Doc()
    ink = WH if mode == 'l' else INK
    bg = {1: CR, 2: INK, 3: INK}[n]
    if n in (2, 3) and mode == 'l': bg = '#1C1A20'
    sc = 120 / 512
    ic = f'<g transform="translate(4 4) scale({sc:.4f})">{tile(D, n, bg)}</g>'
    a, w1 = T('arch900w', 'CENTER STAGE', 148, 84, 50, track=3)
    return D.svg(148 + w1 + 10, 128, ic + f'<path d="{a}" fill="{ink}"/>')

if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for n in (1, 2, 3):
        open(f'{out}/v6-r{n}-icon.svg', 'w').write(icon(n))
        open(f'{out}/v6-r{n}-light.svg', 'w').write(lockup(n, 'l'))
        open(f'{out}/v6-r{n}-dark.svg', 'w').write(lockup(n, 'd'))
        open(f'{out}/v6-r{n}h-light.svg', 'w').write(wide(n, 'l'))
        open(f'{out}/v6-r{n}h-dark.svg', 'w').write(wide(n, 'd'))
    print('ok6')
