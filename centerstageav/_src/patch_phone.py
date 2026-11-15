import os
R = os.path.join(os.path.dirname(__file__), '..')
def edit(p, pairs):
    p = os.path.join(R, p); s = open(p).read()
    for a, b in pairs:
        if a not in s:
            assert b in s, (p, a[:70]); continue
        s = s.replace(a, b, 1)
    open(p, 'w').write(s)

QB = '<a class="qmini" href="/quote/">Build your quote</a>'
edit('tools/build.py', [
 ('''<div class="acts">{btns()}</div><button class="burger" id="burger"''', '''<div class="acts">{btns()}</div>''' + QB + '''<button class="burger" id="burger"'''),
 ('''<div class="mini"><a href="/quote/">Quote tool</a><a href="/portal/">Client portal</a><a href="/crew/">Crew portal</a><a href="/careers/">Careers</a></div>''',
  '''<div class="mini"><a href="/quote/">Quote tool</a><a href="/portal/">Client portal</a><a href="/crew/">Crew portal</a><a href="/careers/">Careers</a><a href="/#news">Newsletter</a></div>'''),
])
s = open(os.path.join(R, 'tools/pages.py')).read()
if 'qmini' not in s and '<button class="burger"' in s:
    s = s.replace('<button class="burger"', QB + '<button class="burger"', 1)
    open(os.path.join(R, 'tools/pages.py'), 'w').write(s)
s = open(os.path.join(R, 'tools/pages.py')).read()
if 'Newsletter</a></div>' not in s and 'Careers</a></div>' in s:
    s = s.replace('Careers</a></div>', 'Careers</a><a href="/#news">Newsletter</a></div>', 1)
    open(os.path.join(R, 'tools/pages.py'), 'w').write(s)

open(os.path.join(R, 'site/csav.css'), 'a').write('''
/* phone pass 15 Nov: no rail line, no overlap, tools easy to find */
.rl{display:none}
.qmini{display:none}
@media(max-width:1060px){.qmini{display:inline-flex;align-items:center;min-height:44px;margin-left:auto;margin-right:10px;padding:0 14px;background:var(--cr);color:#fff;font:600 14px var(--body);text-decoration:none;border-radius:2px;white-space:nowrap}.qmini+.burger{margin-left:0}}
@media(max-width:380px){.qmini{padding:0 10px;font-size:13px}}
.menu .mini{display:grid;grid-template-columns:1fr 1fr;gap:0 18px;margin-top:18px;border-top:1px solid var(--line)}
.menu .mini a{min-height:52px;color:#E8E4EA;font-weight:600;border-bottom:1px solid var(--line)}
@media(max-width:900px){
 .stk{grid-template-rows:40% 60%}
 .txt .top{display:none}
 .txt .in{padding:16px var(--pad) 104px}
 .sc h3{font-size:clamp(26px,7.4vw,40px);margin:8px 0 10px}
 .sc p{font-size:15px;line-height:1.5}
 .pb{position:absolute;left:var(--pad);right:var(--pad);bottom:96px;margin:0}
}
@media(max-width:900px) and (max-height:700px){.sc p{font-size:14px}.sc h3{font-size:clamp(24px,6.6vw,34px)}}
''')
print('ok')
