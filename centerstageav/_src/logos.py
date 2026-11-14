# Generates Center Stage AV logo refresh options as pure-path SVGs.
import sys, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
F=os.path.join(os.path.dirname(__file__),'..','fonts')
FONTS={k:TTFont(os.path.join(F,k+'.ttf')) for k in ['unb800','unb600','sync700','kron']}
CR='#D61045'
def text(font,s,x,y,size,track=0,anchor='start'):
    f=FONTS[font]; gs=f.getGlyphSet(); cmap=f.getBestCmap(); upm=f['head'].unitsPerEm; sc=size/upm
    hm=f['hmtx']; w=0; items=[]
    for ch in s:
        g=cmap.get(ord(ch)); adv=hm[g][0]*sc
        items.append((g,w)); w+=adv+track
    w-=track
    if anchor=='middle': x-=w/2
    elif anchor=='end': x-=w
    pen=SVGPathPen(gs); d=[]
    for g,ox in items:
        sp=SVGPathPen(gs); tp=TransformPen(sp,(sc,0,0,-sc,x+ox,y)); gs[g].draw(tp); d.append(sp.getCommands())
    return ' '.join(d), w
def P(d,fill): return f'<path d="{d}" fill="{fill}"/>'
def mark(cx,cy,s,ink='#fff',tri='#fff',tri_on=True):
    # the downward point (from today's star) sits BEHIND a crimson stage-light ellipse; AV in white on top
    rx,ry=62*s,40*s
    o='<g>'
    if tri_on:
        h=112*s; wv=124*s; top=cy-h*0.47
        o+=f'<path d="M{cx-wv/2:.1f} {top:.1f} L{cx+wv/2:.1f} {top:.1f} L{cx:.1f} {top+h:.1f} Z" fill="{tri}"/>'
    o+=f'<ellipse cx="{cx}" cy="{cy}" rx="{rx:.1f}" ry="{ry:.1f}" transform="rotate(-10 {cx} {cy})" fill="{CR}"/>'
    d,w=text('unb800','AV',cx,cy+18*s,50*s,track=-1*s,anchor='middle')
    o+=P(d,'#fff')+'</g>'
    return o
def svg(w,h,body,bg=None):
    b=f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{b}{body}</svg>'
def optA(ink):  # Evolution: same layout as today, cleaned and redrawn crisp
    W,H=760,140; cy=70
    m=mark(W/2,cy,1.0,tri=ink)
    d1,_=text('sync700','CENTER',W/2-86,cy+13,34,track=7,anchor='end')
    d2,_=text('sync700','STAGE',W/2+86,cy+13,34,track=7)
    return svg(W,H,P(d1,ink)+m+P(d2,ink))
def optB(ink):  # Stacked: mark above, name in two weights, for square and social
    W,H=420,330
    m=mark(W/2,86,1.15,tri=ink)
    d1,w1=text('unb800','CENTER STAGE',W/2,232,40,track=1,anchor='middle')
    d2,_=text('unb600','AUDIO VISUAL',W/2,282,17,track=9,anchor='middle')
    bar=f'<rect x="{W/2-24}" y="252" width="48" height="4" fill="{CR}"/>'
    return svg(W,H,P(d1,ink)+bar+P(d2,ink)+m)
def optC(ink):  # Wordmark: CENTER STAGE with a spotlight pool under it, AV tag
    W,H=720,170
    d1,w=text('kron','CENTER',40,92,62,track=2)
    x2=40+w+28
    d2,w2=text('kron','STAGE',x2,92,62,track=2)
    W=int(x2+w2+40)
    pool=f'<ellipse cx="{x2+w2/2:.1f}" cy="110" rx="{w2/2+24:.1f}" ry="12" fill="{CR}"/>'

    d3,_=text('unb600','AUDIO VISUAL',42,118,14.5,track=6.2)
    return svg(W,H,pool+P(d1,ink)+P(d2,ink)+P(d3,ink))
def icon():
    return svg(512,512,mark(256,262,3.0,tri='#fff'),bg='#0B0A0D')
out=sys.argv[1]; os.makedirs(out,exist_ok=True)
for n,fn in [('a',optA),('b',optB),('c',optC)]:
    open(f'{out}/logo-{n}-light.svg','w').write(fn('#fff'))
    open(f'{out}/logo-{n}-dark.svg','w').write(fn('#0B0A0D'))
open(f'{out}/mark.svg','w').write(svg(160,130,mark(80,65,1.0,tri_on=False)))
open(f'{out}/icon.svg','w').write(icon())
print('ok')
