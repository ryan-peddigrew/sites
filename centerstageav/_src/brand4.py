# Logo page, round 4: Option A at three restraint levels: current logo beside three bold new options. Run after build.py.
import os, sys
sys.argv = [sys.argv[0], '/tmp/_ignore_logos']
sys.path.insert(0, os.path.dirname(__file__))
import build as B
I, E, head = B.I, B.E, B.head
OUT = os.path.join(B.ROOT, 'brand')
OPTS = [
 ('a1', 'A1', 'Lightest', 'Today\u2019s disc, triangle and AV, redrawn clean and flat in your crimson. The only depth is a soft shadow under the disc. The most modern and the simplest to print, stitch or put on a lanyard.'),
 ('a2', 'A2', 'Balanced', 'A1 with a gentle top-to-bottom crimson, a faint highlight along the top edge of the disc, and soft shadows under the disc, triangle and AV. A little lift without looking 3D.'),
 ('a3', 'A3', 'Most lift', 'A2 plus a thin edge under the disc for a touch of thickness and a faint sheen. The closest to the feel of today\u2019s logo, still with no chrome or bevels.'),
]
CSS = '''<style>.bp{padding:calc(var(--hdr) + 40px) 0 80px}.bp h1{font-size:clamp(34px,6.4vw,80px);font-weight:900;margin:10px 0 18px}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:32px 0 56px}.cmp>div{border:1px solid var(--line)}.cmp .t{padding:14px 18px;border-bottom:1px solid var(--line)}.cmp .t b{color:var(--cr2)}
.cmp .i{display:grid;place-items:center;padding:36px 22px;min-height:220px}.wh{background:#fff}.dk{background:#000}.cmp .i img{width:100%;max-width:460px;max-height:200px}.cmp .i img.old{max-width:434px}
.opt{padding:36px 0;border-top:1px solid var(--line)}.opt .lab{display:flex;justify-content:space-between;align-items:end;gap:18px;flex-wrap:wrap;margin-bottom:18px}
.opt h2{font-size:clamp(30px,4vw,52px);margin:8px 0 10px}.opt p{color:var(--mute);max-width:62ch}.opt .mono{color:var(--cr2)}
.sw{display:grid;grid-template-columns:1fr 1fr 220px;gap:12px}.sw>div{display:grid;place-items:center;padding:32px 22px;min-height:250px;border:1px solid var(--line)}.sw img{width:100%;max-width:440px;max-height:200px}.sw .ic img{width:160px;height:160px;border-radius:34px;box-shadow:0 20px 40px -12px #000}
.hd{margin-top:12px;border:1px solid var(--line)}.hd .bar{display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 18px;background:#0B0A0Df2}.hd .bar img{height:44px;width:auto}.hd .bar .mn{display:flex;gap:18px;color:#E8E4EA;font-size:14px}
.hd .bar.lt{background:#fff;border-top:1px solid var(--line)}.hd .bar.lt .mn{color:var(--ink)}.hd .cap{padding:10px 18px;color:var(--mute)}
.r1{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px}.r1 div{background:#000;border:1px solid var(--line);padding:22px;display:grid;place-items:center}.r1 img{width:100%;max-height:90px}
@media(max-width:900px){.cmp,.sw{grid-template-columns:1fr}.sw .ic{min-height:200px}.r1{grid-template-columns:1fr}.hd .bar .mn{display:none}.hd .bar img{height:38px}}</style>'''

def hdr(back, label):
    return f'''<header class="hdr solid"><div class="wrap"><a class="brand" href="/" aria-label="Back to the site"><img src="/img/logo.svg" alt="Center Stage AV"></a><div class="acts" style="margin-left:auto"><a class="btn btn-ln" href="{back}">{label}</a></div><a class="burger" href="{back}" aria-label="{label}">{I['l']}</a></div></header>'''

def sets(k, n):
    hb = 44; hk = k
    return f'''<div class="sw"><div class="dk"><img src="/brand/v4-{k}-light.svg" alt="{n} on dark" draggable="false"></div><div class="wh"><img src="/brand/v4-{k}-dark.svg" alt="{n} on light" draggable="false"></div><div class="dk ic"><img src="/brand/v4-{k}-icon.svg" alt="{n} icon" draggable="false"></div></div>
<div class="hd"><div class="bar"><img src="/brand/v4-{hk}-light.svg" alt="" style="height:{hb}px" draggable="false"><span class="mn"><span>Services</span><span>Events</span><span>Our work</span></span></div><div class="bar lt"><img src="/brand/v4-{hk}-dark.svg" alt="" style="height:{hb}px" draggable="false"><span class="mn"><span>Services</span><span>Events</span><span>Our work</span></span></div><div class="cap mono">At header size, dark and light</div></div>'''

def index():
    opts = ''.join(f'''<section class="opt" id="{k}"><div class="lab"><div><span class="mono">{n}</span><h2>{t}</h2><p>{E(d)}</p></div><a class="btn btn-ln" href="/brand/{k}.html">Open {n} on its own</a></div>{sets(k, n)}</section>''' for k, n, t, d in OPTS)
    body = f'''<body>{hdr('/', 'Back to the site')}<main class="bp"><div class="wrap"><div class="kick mono">Logo refresh &middot; Option A, three levels</div><h1>Option A,<br>dialled back.</h1>
<p class="lead">Your disc, triangle and AV, clean and flat in your crimson, at three levels of depth from lightest to most lift. Each is sharp at any size, from a phone screen to a 40-foot LED wall. Today&rsquo;s logo first, then A1, A2 and A3.</p>
<div class="cmp"><div><div class="t mono">Today</div><div class="i wh"><img class="old" src="/img/current-logo.webp" alt="Current Center Stage AV logo" draggable="false"></div></div><div><div class="t mono"><b>New</b> &middot; A2, Balanced</div><div class="i dk"><img src="/brand/v4-a2-light.svg" alt="A2" draggable="false"></div></div></div>
{opts}
<section class="opt"><span class="mono" style="color:var(--mute)">Earlier rounds, for reference</span><div class="r1"><div><img src="/brand/v3-a-light.svg" alt="" draggable="false"></div><div><img src="/brand/v2-a-light.svg" alt="" draggable="false"></div><div><img src="/brand/logo-a-light.svg" alt="" draggable="false"></div></div></section>
<p class="mono" style="color:var(--mute);margin-top:24px">Pick A1, A2 or A3. Final files come as vector (SVG, PDF) plus PNG in every size.</p></div></main></body></html>'''
    return head('Logo refresh | Center Stage AV', 'Center Stage AV logo refresh options', CSS) + body

def single(k, n, t, d):
    body = f'''<body>{hdr('/brand/', 'All three levels')}<main class="bp"><div class="wrap"><div class="kick mono">{n}</div><h1>{t}</h1><p class="lead">{E(d)}</p>
<div class="cmp"><div><div class="t mono">Today</div><div class="i wh"><img class="old" src="/img/current-logo.webp" alt="" draggable="false"></div></div><div><div class="t mono"><b>{n}</b></div><div class="i wh"><img src="/brand/v4-{k}-dark.svg" alt="" draggable="false"></div></div></div>
{sets(k, n)}<p style="margin-top:28px"><a class="btn btn-cr" href="/brand/">See all three levels</a></p></div></main></body></html>'''
    return head(f'{n}: {t} | Center Stage AV logo', 'Logo option', CSS) + body

if __name__ == '__main__':
    open(os.path.join(OUT, 'index.html'), 'w').write(index())
    for o in OPTS: open(os.path.join(OUT, o[0] + '.html'), 'w').write(single(*o))
    print('brand built')
