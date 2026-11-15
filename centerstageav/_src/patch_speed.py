import os
R = os.path.join(os.path.dirname(__file__), '..')
def edit(p, pairs):
    p = os.path.join(R, p); s = open(p).read()
    for a, b in pairs:
        if b in s and a not in s: continue
        assert a in s, (p, a[:60]); s = s.replace(a, b, 1)
    open(p, 'w').write(s)

# build: video waits for page load, lighter poster
edit('tools/build.py', [
 ('<video id="reel" autoplay muted loop playsinline preload="metadata" poster="/img/reel-poster.jpg"',
  '<video id="reel" muted loop playsinline preload="none" poster="/img/reel-poster.webp"'),
])
# story: shorter pinned run + plain fallback class hook
edit('tools/story.py', [('<section class="show" id="show"', '<section class="show" id="show" data-story')])

edit('site/csav.css', [
 ('body{background:var(--ink);color:var(--white);font:400 17px/1.6 var(--body);overflow-x:hidden}',
  'body{background:var(--ink);color:var(--white);font:400 17px/1.6 var(--body);overflow-x:hidden}@supports (overflow:clip){body{overflow-x:clip}}'),
 ('.show{position:relative;height:560vh;background:var(--ink)}', '.show{position:relative;height:420vh;background:var(--ink)}'),
 (' .show{height:520vh}', ' .show{height:380vh}'),
 ('.g-scr .scr{filter:drop-shadow(0 0 14px #D6104599)}', ''),
 (';mix-blend-mode:screen}', '}'),
 ('backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}', '}'),
 ('.stk{position:sticky;', '.stk{contain:layout paint;position:sticky;'),
])
open(os.path.join(R, 'site/csav.css'), 'a').write('''
/* plain story: reduced motion or very old browsers */
.show.plain{height:auto}
.show.plain .stk{position:relative;top:0;height:auto;contain:none;grid-template-rows:auto}
.show.plain .vis{min-height:56vh}
.show.plain .sc{position:static;opacity:1;transform:none;margin-bottom:36px;--hf:1}
.show.plain .scs{flex:none}.show.plain .rl,.show.plain .pb,.show.plain .hintsc{display:none}
.show.plain .txt .in{padding-bottom:40px}
#wm{transform:translateZ(0)}
''')

edit('site/csav.js', [
 ("setTimeout(function(){ld.classList.add('up');setTimeout(ready,350);setTimeout(function(){ld.remove()},1000)},1750)",
  "setTimeout(function(){ld.classList.add('up');setTimeout(ready,350);setTimeout(function(){ld.remove()},1000)},1150)"),
 ("var vid=$('#reel');if(vid){if(RM)vid.removeAttribute('autoplay');new IntersectionObserver(function(es){if(es[0].isIntersecting){if(!RM)vid.play().catch(function(){})}else vid.pause()}).observe(vid)}",
  "var vid=$('#reel');if(vid){var vOn=false,vIn=true;function vgo(){if(RM)return;vOn=true;vid.preload='auto';if(vIn)vid.play().catch(function(){})}"
  "if(document.readyState==='complete')setTimeout(vgo,300);else addEventListener('load',function(){setTimeout(vgo,300)});"
  "new IntersectionObserver(function(es){vIn=es[0].isIntersecting;if(vIn){if(vOn)vid.play().catch(function(){})}else vid.pause()}).observe(vid)}"),
 ("if(shw&&stk){var scs=", "if(shw&&stk&&RM){shw.classList.add('plain');['--d0','--d1','--ph','--sh','--bm','--lg','--o1'].forEach(function(k){stk.style.setProperty(k,'1')});stk.style.setProperty('--sw','.5');stk.style.setProperty('--o0','0');stk.style.setProperty('--o1','.45')}\nelse if(shw&&stk){var lastP=-1,scs="),
 ("p=cl((hd-r.top)/tot),t=p*N*1.02;", "p=cl((hd-r.top)/tot),t=p*N*1.02;if(Math.abs(p-lastP)<.0004)return;lastP=p;"),
])
print('ok')
