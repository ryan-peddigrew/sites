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

# AV set in the same heavy wide face as the wordmark, so both letters read at a glance.
# Both the oval and the letters tilt -12 degrees, so they move in the same direction, as in the original.
TILT = -12
def glyph_av(cx, cy, size, fill=WH, tilt=TILT):
    d, _ = T('arch900w', 'AV', cx, cy + .344 * size, size, track=-.03 * size, anchor='middle')
    return f'<path d="{d}" fill="{fill}" transform="rotate({tilt} {cx} {cy})"/>'

def glyph_pair(cx, cy, size, fa, fv):
    dA, wA = T('arch900w', 'A', 0, 0, size)
    dV, wV = T('arch900w', 'V', 0, 0, size)
    gap = -.03 * size
    tot = wA + gap + wV
    x0 = cx - tot / 2
    dA, _ = T('arch900w', 'A', x0, cy + .344 * size, size)
    dV, _ = T('arch900w', 'V', x0 + wA + gap, cy + .344 * size, size)
    return (f'<path d="{dA}" fill="{fa}" transform="rotate({TILT} {cx} {cy})"/>'
            f'<path d="{dV}" fill="{fv}" transform="rotate({TILT} {cx} {cy})"/>')

# ---------- R1 BLACK OVAL ON CRIMSON, white AV standing in it
def r1_mark(D, cx, cy, s, ring=WH, let=WH):
    rx, ry = 186 * s, 112 * s
    oval = f'<path d="{ell_d(cx, cy, rx, ry)}" fill="{INK}" transform="rotate({TILT} {cx} {cy})"/>'
    return oval + glyph_av(cx, cy, 240 * s, fill=let)

# ---------- R2 SPOTLIGHT: white AV over a crimson oval
def r2_mark(D, cx, cy, s, let=WH, dot=CR):
    oval = f'<path d="{ell_d(cx, cy + 6 * s, 200 * s, 120 * s)}" fill="{dot}" transform="rotate({TILT} {cx} {cy})"/>'
    return oval + glyph_av(cx, cy, 236 * s, fill=let)

# ---------- R3 SPLIT: oval cut on the slant of the A; white A, crimson V
def r3_mark(D, cx, cy, s, dark_half=INK, a_col=WH, v_col=CR, edge=None):
    rx, ry = 186 * s, 112 * s
    rot = f'rotate({TILT} {cx} {cy})'
    disc = ell_d(cx, cy, rx, ry)
    cid = D.clip(disc, tr=rot)
    split = cx + 4 * s
    left = [(cx - 400 * s, cy - 300 * s), (split - 40 * s, cy - 300 * s), (split + 40 * s, cy + 300 * s), (cx - 400 * s, cy + 300 * s)]
    right = [(split - 40 * s, cy - 300 * s), (cx + 400 * s, cy - 300 * s), (cx + 400 * s, cy + 300 * s), (split + 40 * s, cy + 300 * s)]
    o = (f'<g clip-path="url(#{cid})"><path d="{poly(left)}" fill="{CR}"/><path d="{poly(right)}" fill="{dark_half}"/></g>')
    return o + glyph_pair(cx, cy, 236 * s, a_col, v_col)

def tile(D, n, bg, s=1.0):
    c = 256
    if n == 1: m = r1_mark(D, c, c + 4, 1.0)
    elif n == 2: m = r2_mark(D, c, c, 1.0)
    else: m = r3_mark(D, c, c, 1.0, dark_half='#2E2B34')
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
