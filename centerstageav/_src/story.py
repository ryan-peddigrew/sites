# Scroll story for the home page: one pinned stage, five scenes driven by scroll.
# Plan (floor plan draws) > Build (rig draws, real stage wipes in) > Show (beams, logo on screen)
# > Anywhere (map arcs) > Track record (console faders). Real photos and facts only.

def R(x, y, w, h):
    return f'M{x} {y}h{w}v{h}h{-w}Z'

def C(cx, cy, r):
    return f'M{cx-r} {cy}a{r} {r} 0 1 0 {2*r} 0a{r} {r} 0 1 0 {-2*r} 0'

def paths(lst, cls, var):
    n = len(lst)
    out = []
    for i, (d, extra) in enumerate(lst):
        k = round(i / max(1, n - 1), 3)
        out.append(f'<path d="{d}" pathLength="1" class="{cls}{" " + extra if extra else ""}" style="--k:{k}"/>')
    return ''.join(out)

def plan_art():
    p = [(R(60, 40, 680, 420), '')]
    p += [(R(270, 58, 260, 72), 'c')]
    p += [('M170 74L246 64', 'c'), ('M554 64L630 74', 'c')]
    for y in (215, 295, 375):
        for x in (170, 250, 330, 470, 550, 630):
            p.append((C(x, y, 21), ''))
    p += [(R(360, 410, 80, 32), 'c'), ('M400 410L300 130', 'c t'), ('M400 410L500 130', 'c t')]
    labels = ('<text x="400" y="100" class="lb">STAGE</text><text x="400" y="460" class="lb">FOH</text>'
              '<text x="208" y="54" class="lb">SCREEN</text><text x="592" y="54" class="lb">SCREEN</text>'
              '<text x="400" y="30" class="lb dim">BALLROOM &middot; 1:200</text>')
    return f'<g class="g-plan">{paths(p, "ln", "d0")}{labels}</g>'

def truss(x1, y1, x2, y2, step=22):
    # box truss as two chords plus zigzag lattice
    if y1 == y2:
        d = f'M{x1} {y1}H{x2}M{x1} {y1+22}H{x2}M{x1} {y1+22}'
        x, up = x1, True
        while x + step <= x2:
            x += step; d += f'L{x} {y1 if up else y1+22}'; up = not up
        return d
    d = f'M{x1} {y1}V{y2}M{x1+22} {y1}V{y2}M{x1} {y1}'
    y, lt = y1, True
    while y + step <= y2:
        y += step; d += f'L{x1+22 if lt else x1} {y}'; lt = not lt
    return d

def build_art():
    p = [('M92 400H708L760 462H40Z', ''),
         (truss(80, 400, 80, 60), ''), (truss(698, 400, 698, 60), ''), (truss(80, 60, 720, 60), ''),
         (R(240, 112, 320, 180), 'c'), (R(150, 138, 76, 132), ''), (R(574, 138, 76, 132), '')]
    for x in (112, 664):
        for j in range(4):
            p.append((f'M{x} {96+j*26}h24v24h-24Z', ''))
    for x in (280, 340, 400, 460, 520):
        p.append((f'M{x-9} 84v10a9 9 0 0 0 18 0v-10M{x-6} 103h12l3 10h-18Z', 'c'))
    p += [('M626 400v-62h34v62M620 338h46', '')]
    logo = '<image href="/img/logo.svg" x="262" y="176" width="276" height="51" class="scr"/>'
    beams = ''.join(f'<path class="bm" style="--o:{o}" d="M{x-7} 113L{x+o*40-58} 400H{x+o*40+58}L{x+7} 113Z"/>'
                    for x, o in ((280, -1), (400, 0), (520, 1)))
    return (f'<g class="g-beam">{beams}</g><g class="g-build">{paths(p, "ln", "d1")}</g>'
            f'<g class="g-scr">{logo}</g>')

def map_art():
    def pt(lon, lat): return round((lon + 128) * 13), round((52 - lat) * 13)
    grid = ''.join(f'<path class="gr" d="M{x} 0V500"/>' for x in (104, 234, 364, 494, 624, 754))
    grid += ''.join(f'<path class="gr" d="M0 {y}H800"/>' for y in (26, 156, 286, 416))
    mx, my = pt(-79.64, 43.59); fx, fy = pt(-80.14, 26.12); sx, sy = pt(-117.16, 32.72)
    arcs = (f'<path class="arc" pathLength="1" style="--k:0" d="M{mx} {my}Q{mx+90} {(my+fy)//2} {fx} {fy}"/>'
            f'<path class="arc" pathLength="1" style="--k:.5" d="M{mx} {my}Q{(mx+sx)//2} {my-70} {sx} {sy}"/>')
    def pin(x, y, n, sub, anchor, dx, k):
        return (f'<g class="pin" style="--k:{k}"><circle cx="{x}" cy="{y}" r="16" class="pr"/><circle cx="{x}" cy="{y}" r="6" class="pd"/>'
                f'<text x="{x+dx}" y="{y-4}" text-anchor="{anchor}" class="cn">{n}</text><text x="{x+dx}" y="{y+16}" text-anchor="{anchor}" class="cs">{sub}</text></g>')
    pins = (pin(mx, my, 'Mississauga', 'Head office', 'end', -26, 0) + pin(fx, fy, 'Fort Lauderdale', 'Office', 'end', -26, .45)
            + pin(sx, sy, 'San Diego', 'Office', 'start', 26, .9))
    return f'<g class="g-map">{grid}{arcs}{pins}<text x="400" y="480" class="lb dim">NORTH AMERICA</text></g>'

SCENES = [
    ('01', 'Plan', 'It starts in the boardroom.', 'Every successful event begins with careful planning: 2D and 3D set renderings, AutoCAD floor plans, show flow and critical path documents.'),
    ('02', 'Build', 'Then our crew builds it.', 'Set, screens, lighting and audio, installed by our own technicians, on budget and on time.'),
    ('03', 'Show', 'Lights up. You&rsquo;re center stage.', 'Technicians and stage management stay on-site through the last cue, so you can focus on the big picture.'),
    ('04', 'Anywhere', 'Three offices. One standard.', 'Head office in Mississauga, with teams in Fort Lauderdale and San Diego, delivering shows anywhere in North America.'),
    ('05', 'Track record', 'Twenty years of show nights.', 'Tailor-made solutions for thousands of events, from the boardroom to the ballroom.'),
]
FADERS = [('20', '+', 'Years of show nights', .92), ('3', '', 'Offices', .58), ('8', '', 'Services', .74), ('1000', 's', 'Events delivered', 1)]

def story():
    sc = ''.join(f'<article class="sc{" on" if i == 0 else ""}" data-i="{i}"><div class="kick mono">{n} &middot; {k}</div><h3><span>{h}</span></h3><p>{d}</p></article>'
                 for i, (n, k, h, d) in enumerate(SCENES))
    rail = ''.join(f'<li{" class=on" if i == 0 else ""}><span class="mono">{k}</span></li>' for i, k in enumerate(['Plan', 'Build', 'Show', 'Anywhere', '20 years']))
    fad = ''.join(f'<div class="ch" style="--lv:{lv}"><b class="nm" data-to="{v}" data-suf="{s}">0{s}</b><div class="trk"><i class="fill"></i><i class="kn"></i></div><span class="mono">{l}</span></div>'
                  for v, s, l, lv in FADERS)
    pics = ('<picture class="ph p-stage"><source media="(max-width:760px)" srcset="/img/st-stage-sm.webp"><img src="/img/st-stage.webp" alt="Stage built by Center Stage AV" loading="lazy" draggable="false"></picture>'
            '<picture class="ph p-show"><source media="(max-width:760px)" srcset="/img/st-show-sm.webp"><img src="/img/st-show.webp" alt="Audience on show night" loading="lazy" draggable="false"></picture>'
            '<picture class="ph p-desk"><source media="(max-width:760px)" srcset="/img/st-desk-sm.webp"><img src="/img/st-desk.webp" alt="Center Stage AV control position" loading="lazy" draggable="false"></picture>')
    pops = ('<figure class="pop pop-load"><img src="/img/st-load-sm.webp" alt="Truss arriving for load-in" loading="lazy" draggable="false"><figcaption class="mono">Load-in &middot; our own crew</figcaption></figure>'
            '<figure class="pop pop-rig"><img src="/img/st-rig-sm.webp" alt="Moving lights on truss" loading="lazy" draggable="false"><figcaption class="mono">Lighting rig &middot; flown and focused</figcaption></figure>')
    svg = f'<svg class="art" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><linearGradient id="bmg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF2D63" stop-opacity=".75"/><stop offset="1" stop-color="#D61045" stop-opacity="0"/></linearGradient></defs>{plan_art()}{build_art()}{map_art()}</svg>'
    return f'''<section class="show" id="show" aria-label="How a Center Stage show comes together">
<div class="stk" id="stk">
 <div class="vis">{pics}<div class="shade"></div>{svg}{pops}<div class="fad">{fad}</div></div>
 <div class="txt"><div class="wp"></div><div class="in"><div class="top mono">How a show comes together</div><div class="scs">{sc}</div>
 <ol class="rl">{rail}</ol><div class="pb"><i></i></div><div class="hintsc mono">Scroll</div></div></div>
</div></section>'''

if __name__ == '__main__':
    print(story())
