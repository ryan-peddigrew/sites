# Logo page, round 2: current logo beside three bold new options. Run after build.py.
import os, sys
sys.argv = [sys.argv[0], '/tmp/_ignore_logos']
sys.path.insert(0, os.path.dirname(__file__))
import build as B
I, E, head = B.I, B.E, B.head
OUT = os.path.join(B.ROOT, 'brand')
OPTS = [
 ('a', 'Option A', 'Spotlight', 'Your crimson spotlight, made bold. A hand-built AV where the A and V share one stroke, so the two letters lock together like a single mark. Heavy, wide CENTER STAGE beside it. Closest to what people already know, much stronger.'),
 ('b', 'Option B', 'The Beam', 'The most cinematic. A crimson spotlight cone falls on centre stage and AV stands in the light. Tall, condensed CENTER STAGE underneath, like a film title. Owns the idea of the name.'),
 ('c', 'Option C', 'Headliner', 'The name leads, big and confident, and a tall crimson AV stands in its own pool of light beside it. Reads like a marquee from across a ballroom.'),
]
CSS = '''<style>.bp{padding:calc(var(--hdr) + 40px) 0 80px}.bp h1{font-size:clamp(34px,6.4vw,80px);font-weight:900;margin:10px 0 18px}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:32px 0 56px}.cmp>div{border:1px solid var(--line)}.cmp .t{padding:14px 18px;border-bottom:1px solid var(--line)}.cmp .t b{color:var(--cr2)}
.cmp .i{display:grid;place-items:center;padding:36px 22px;min-height:220px}.wh{background:#fff}.dk{background:#000}.cmp .i img{width:100%;max-width:460px;max-height:200px}.cmp .i img.old{max-width:434px}
.opt{padding:36px 0;border-top:1px solid var(--line)}.opt .lab{display:flex;justify-content:space-between;align-items:end;gap:18px;flex-wrap:wrap;margin-bottom:18px}
.opt h2{font-size:clamp(30px,4vw,52px);margin:8px 0 10px}.opt p{color:var(--mute);max-width:62ch}.opt .mono{color:var(--cr2)}
.sw{display:grid;grid-template-columns:1fr 1fr 220px;gap:12px}.sw>div{display:grid;place-items:center;padding:32px 22px;min-height:250px;border:1px solid var(--line)}.sw img{width:100%;max-width:440px;max-height:200px}.sw .ic img{width:150px;height:150px;border-radius:32px}
.hd{margin-top:12px;border:1px solid var(--line)}.hd .bar{display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 18px;background:#0B0A0Df2}.hd .bar img{height:44px;width:auto}.hd .bar .mn{display:flex;gap:18px;color:#E8E4EA;font-size:14px}
.hd .bar.lt{background:#fff;border-top:1px solid var(--line)}.hd .bar.lt .mn{color:var(--ink)}.hd .cap{padding:10px 18px;color:var(--mute)}
.r1{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px}.r1 div{background:#000;border:1px solid var(--line);padding:22px;display:grid;place-items:center}.r1 img{width:100%;max-height:90px}
@media(max-width:900px){.cmp,.sw{grid-template-columns:1fr}.sw .ic{min-height:200px}.r1{grid-template-columns:1fr}.hd .bar .mn{display:none}.hd .bar img{height:38px}}</style>'''

def hdr(back, label):
    return f'''<header class="hdr solid"><div class="wrap"><a class="brand" href="/" aria-label="Back to the site"><img src="/img/logo.svg" alt="Center Stage AV"></a><div class="acts" style="margin-left:auto"><a class="btn btn-ln" href="{back}">{label}</a></div><a class="burger" href="{back}" aria-label="{label}">{I['l']}</a></div></header>'''

def sets(k, n):
    hb = 44; hk = 'b-h' if k == 'b' else k
    return f'''<div class="sw"><div class="dk"><img src="/brand/v2-{k}-light.svg" alt="{n} on dark" draggable="false"></div><div class="wh"><img src="/brand/v2-{k}-dark.svg" alt="{n} on light" draggable="false"></div><div class="dk ic"><img src="/brand/v2-{k}-icon.svg" alt="{n} icon" draggable="false"></div></div>
<div class="hd"><div class="bar"><img src="/brand/v2-{hk}-light.svg" alt="" style="height:{hb}px" draggable="false"><span class="mn"><span>Services</span><span>Events</span><span>Our work</span></span></div><div class="bar lt"><img src="/brand/v2-{hk}-dark.svg" alt="" style="height:{hb}px" draggable="false"><span class="mn"><span>Services</span><span>Events</span><span>Our work</span></span></div><div class="cap mono">At header size, dark and light</div></div>'''

def index():
    opts = ''.join(f'''<section class="opt" id="{k}"><div class="lab"><div><span class="mono">{n}</span><h2>{t}</h2><p>{E(d)}</p></div><a class="btn btn-ln" href="/brand/{k}.html">Open {n} on its own</a></div>{sets(k, n)}</section>''' for k, n, t, d in OPTS)
    body = f'''<body>{hdr('/', 'Back to the site')}<main class="bp"><div class="wrap"><div class="kick mono">Logo refresh &middot; round 2</div><h1>Same name.<br>A mark to remember.</h1>
<p class="lead">Your logo is known, so every option keeps the crimson and the AV. What changes is the mark itself: hand-built, bold and sharp at any size, from a phone screen to a 40-foot LED wall. Today&rsquo;s logo first, then three directions.</p>
<div class="cmp"><div><div class="t mono">Today</div><div class="i wh"><img class="old" src="/img/current-logo.webp" alt="Current Center Stage AV logo" draggable="false"></div></div><div><div class="t mono"><b>New</b> &middot; Option A, Spotlight</div><div class="i dk"><img src="/brand/v2-a-light.svg" alt="Option A" draggable="false"></div></div></div>
{opts}
<section class="opt"><span class="mono" style="color:var(--mute)">Round 1 (earlier, for reference)</span><div class="r1"><div><img src="/brand/logo-a-light.svg" alt="" draggable="false"></div><div><img src="/brand/logo-b-light.svg" alt="" draggable="false"></div><div><img src="/brand/logo-c-light.svg" alt="" draggable="false"></div></div></section>
<p class="mono" style="color:var(--mute);margin-top:24px">Pick A, B or C, or mix parts. Final files come as vector (SVG, PDF) plus PNG in every size.</p></div></main></body></html>'''
    return head('Logo refresh | Center Stage AV', 'Center Stage AV logo refresh options', CSS) + body

def single(k, n, t, d):
    body = f'''<body>{hdr('/brand/', 'All options')}<main class="bp"><div class="wrap"><div class="kick mono">{n}</div><h1>{t}</h1><p class="lead">{E(d)}</p>
<div class="cmp"><div><div class="t mono">Today</div><div class="i wh"><img class="old" src="/img/current-logo.webp" alt="" draggable="false"></div></div><div><div class="t mono"><b>{n}</b></div><div class="i wh"><img src="/brand/v2-{k}-dark.svg" alt="" draggable="false"></div></div></div>
{sets(k, n)}<p style="margin-top:28px"><a class="btn btn-cr" href="/brand/">See all three options</a></p></div></main></body></html>'''
    return head(f'{n}: {t} | Center Stage AV logo', 'Logo option', CSS) + body

if __name__ == '__main__':
    open(os.path.join(OUT, 'index.html'), 'w').write(index())
    for o in OPTS: open(os.path.join(OUT, o[0] + '.html'), 'w').write(single(*o))
    print('brand built')
