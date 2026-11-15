import os
p = os.path.join(os.path.dirname(__file__), '..', 'site', 'csav.js')
s = open(p).read()
js = r'''/* ---------- Scroll story: pinned stage, scenes driven by scroll ---------- */
var shw=$('#show'),stk=$('#stk');
if(shw&&stk){var scs=$$('.sc',stk),rls=$$('.rl li',stk),nms=$$('.ch .nm',stk),chs=$$('.ch',stk),cur=-1,tick2=false,N=5;
 function cl(v){return v<0?0:v>1?1:v}
 function sv(k,v){stk.style.setProperty(k,v.toFixed(4))}
 function story(){tick2=false;var r=shw.getBoundingClientRect(),vh=innerHeight;if(r.bottom<-50||r.top>vh+50)return;
  var hd=$('#hdr')?$('#hdr').offsetHeight:72,tot=shw.offsetHeight-(vh-hd),p=cl((hd-r.top)/tot),t=p*N*1.02;
  sv('--t',p);sv('--pr',p);
  sv('--d0',cl(t/.85));sv('--o0',1-cl((t-1)/.35));
  sv('--d1',cl((t-1)/.75));sv('--pl',cl((t-1.3)/.3)*(1-cl((t-1.85)/.2)));
  sv('--ph',cl((t-1.6)/.45));sv('--o1',cl((t-1)/.1)*(1-cl((t-2.05)/.35)*.55)*(1-cl((t-2.8)/.25)));
  sv('--sh',cl((t-2.05)/.35));sv('--bm',cl((t-2.1)/.25));sv('--sw',cl((t-2.1)/.75));sv('--lg',cl((t-2.25)/.3));sv('--pg',cl((t-2.35)/.25)*(1-cl((t-2.85)/.15)));
  var cw=cl((t-2)/.3)*(1-cl((t-2.85)/.25));sv('--cw',cw);stk.classList.toggle('red',cw>.5);
  sv('--om',cl((t-2.85)/.3)*(1-cl((t-3.9)/.25)));sv('--mp',cl((t-3.05)/.7));
  sv('--dk',cl((t-3.9)/.3));var fd=cl((t-4)/.25),fv=cl((t-4.05)/.6);sv('--fd',fd);
  chs.forEach(function(c){c.style.setProperty('--fv',fv.toFixed(3))});
  nms.forEach(function(n){var to=+n.dataset.to,v=Math.round(to*fv);n.textContent=(to>=1000?v.toLocaleString('en-CA'):v)+(fv>=1?n.dataset.suf:'')});
  var a=Math.min(N-1,Math.floor(t));if(a!==cur){cur=a;scs.forEach(function(x,j){x.classList.toggle('on',j===a)});rls.forEach(function(x,j){x.classList.toggle('on',j<=a)})}
  scs.forEach(function(x,j){x.style.setProperty('--hf',cl((t-j)/.45).toFixed(3))})}
 function q(){if(!tick2){tick2=true;requestAnimationFrame(story)}}
 addEventListener('scroll',q,{passive:true});addEventListener('resize',q);story()}
/* headlines fill with colour as they scroll in */
if(!RM&&window.CSS&&CSS.supports&&(CSS.supports('-webkit-background-clip','text')||CSS.supports('background-clip','text'))&&CSS.supports('color','color-mix(in srgb, red 20%, transparent)')){
 var fls=$$('main .sec h2').filter(function(h){return !h.closest('.qb')}),vis2=[],ft=false;
 fls.forEach(function(h){h.classList.add('fl');h.style.setProperty('--f','0')});
 var fio=new IntersectionObserver(function(es){es.forEach(function(e){var i=vis2.indexOf(e.target);if(e.isIntersecting&&i<0)vis2.push(e.target);else if(!e.isIntersecting&&i>=0)vis2.splice(i,1)});fq()});
 fls.forEach(function(h){fio.observe(h)});
 function fu(){ft=false;var vh=innerHeight;vis2.forEach(function(h){var r=h.getBoundingClientRect(),f=(vh*.92-r.top)/(vh*.45);h.style.setProperty('--f',(f<0?0:f>1?1:f).toFixed(3))})}
 function fq(){if(!ft){ft=true;requestAnimationFrame(fu)}}
 addEventListener('scroll',fq,{passive:true})}
'''
anchor = '/* ---------- Tour of what'
assert anchor in s
if '#stk' not in s:
    s = s.replace(anchor, js + anchor, 1)
old = " {s:'#plan',k:'Your motto',t:'From the boardroom to the ballroom',d:'Your motto is now something people play with: drag the handle between show night and behind the desk. Plan, build, show, in your words.',r:''},"
if old in s:
    new = (" {s:'#show',k:'Your story',t:'Plan, build, show, as you scroll',d:'Scrolling now tells your story: the floor plan draws itself, the rig goes up, the real stage appears, lights sweep, then your three offices and twenty years. Watch it play.',r:'A planner who scrolls through this understands how you work in fifteen seconds, without reading a page of text.'},\n"
           " {s:'#plan',k:'Your motto',t:'From the boardroom to the ballroom',d:'Your motto is now something people play with: drag the handle between show night and behind the desk.',r:''},")
    s = s.replace(old, new, 1)
old2 = "if(st.s!=='#hero'&&st.s!=='#hdr')el.classList.add('tour-hi')}"
if old2 in s:
    s = s.replace(old2, "if(st.s!=='#hero'&&st.s!=='#hdr'&&st.s!=='#show')el.classList.add('tour-hi')}\n cancelAnimationFrame(asr);if(st.s==='#show'&&el){var hh=($('#hdr')||{}).offsetHeight||72,y0=el.getBoundingClientRect().top+scrollY-hh,y1=y0+el.offsetHeight-innerHeight+hh,a0=performance.now()+900,DUR=D-1500;(function st2(n){if(paused){a0+=16;asr=requestAnimationFrame(st2);return}var k=Math.min(1,Math.max(0,(n-a0)/DUR));if(n>=a0)scrollTo({top:y0+(y1-y0)*(k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2),behavior:'instant'});if(k<1)asr=requestAnimationFrame(st2)})(performance.now())}", 1)
    s = s.replace("var box=$('#tour'),ti=0,", "var asr=0,box=$('#tour'),ti=0,", 1)
    s = s.replace("function end(){clearTimeout(tm);", "function end(){clearTimeout(tm);cancelAnimationFrame(asr);", 1)
open(p, 'w').write(s)
print('patched')
