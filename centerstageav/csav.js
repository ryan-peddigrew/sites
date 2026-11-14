/* Center Stage AV concept. Prepared by Chairlift, (c) 2026. Not for reuse. */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var Q=new URLSearchParams(location.search),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* no casual copying */
document.addEventListener('contextmenu',function(e){if(e.target.closest('img,video,.wall,.rail,.screen'))e.preventDefault()});
document.addEventListener('dragstart',function(e){if(e.target.tagName==='IMG')e.preventDefault()});

/* loader: short, built from the logo; once per visit */
var ld=$('#ld'),seen=false;try{seen=sessionStorage.getItem('csav-ld')==='1'}catch(e){}
function heroGo(){$('#hero').classList.add('go')}
function ready(){heroGo();if(Q.get('tour')==='1')setTimeout(function(){tour.start(+(Q.get('step')||0))},900)}
if(!ld||seen||RM){if(ld)ld.remove();setTimeout(ready,60)}
else{setTimeout(function(){ld.classList.add('up');setTimeout(ready,350);setTimeout(function(){ld.remove()},1000)},1750);try{sessionStorage.setItem('csav-ld','1')}catch(e){}}

/* header */
var hdr=$('#hdr');function hs(){hdr.classList.toggle('solid',scrollY>40)}hs();addEventListener('scroll',hs,{passive:true});
var menu=$('#menu');function mt(on){menu.classList.toggle('on',on);menu.setAttribute('aria-hidden',!on);document.body.style.overflow=on?'hidden':''}
$('#burger').onclick=function(){mt(true)};$('#mclose').onclick=function(){mt(false)};$$('#menu a').forEach(function(a){a.addEventListener('click',function(){mt(false)})});

/* rotating headline word */
var rot=$$('#rot b'),ri=0;if(!RM)setInterval(function(){var a=rot[ri];a.classList.remove('on');a.classList.add('out');setTimeout(function(){a.classList.remove('out')},650);ri=(ri+1)%rot.length;rot[ri].classList.add('on')},2300);

/* live Toronto time in the hero bar */
var ck=$('#clock');function tick(){try{ck.textContent='Mississauga '+new Date().toLocaleTimeString('en-CA',{hour:'numeric',minute:'2-digit',timeZone:'America/Toronto'})}catch(e){}}tick();setInterval(tick,30000);

/* reveals */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});
$$('.rev-in').forEach(function(el){io.observe(el)});

/* boardroom/ballroom drag reveal */
var rv=$('#rv');if(rv){var drag=false;function setX(cx){var r=rv.getBoundingClientRect();var x=Math.max(4,Math.min(96,(cx-r.left)/r.width*100));rv.style.setProperty('--x',x+'%')}
rv.addEventListener('pointerdown',function(e){drag=true;setX(e.clientX)});addEventListener('pointermove',function(e){if(drag)setX(e.clientX)});addEventListener('pointerup',function(){drag=false});
var swept=false;new IntersectionObserver(function(es){if(es[0].isIntersecting&&!swept&&!RM){swept=true;var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/1800);rv.style.setProperty('--x',(50+38*Math.sin(p*Math.PI*2)*(1-p))+'%');if(p<1&&!drag)requestAnimationFrame(f)})(t0)}},{threshold:.5}).observe(rv)}

/* services index */
var items=$$('#svc li'),pv=$$('#svcpv img'),cap=$('#svccap');
function svc(i){items.forEach(function(li,j){li.classList.toggle('on',j===i);li.querySelector('button').setAttribute('aria-expanded',j===i)});pv.forEach(function(im,j){im.classList.toggle('on',j===i)});cap.textContent=items[i].querySelector('.t').textContent}
items.forEach(function(li,i){li.querySelector('button').addEventListener('click',function(){svc(i)});li.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover) and (min-width:901px)').matches)svc(i)})});

/* events rail */
var rail=$('#rail');function step(d){var c=rail.querySelector('.post');rail.scrollBy({left:d*(c.offsetWidth+18),behavior:'smooth'})}$('#evl').onclick=function(){step(-1)};$('#evr').onclick=function(){step(1)};

/* work wall + lightbox */
var wb=$$('#wall button'),lb=$('#lb'),lbi=$('#lbi'),li=0;
function open(i){li=(i+wb.length)%wb.length;lbi.src=wb[li].querySelector('img').src;lb.classList.add('on');document.body.style.overflow='hidden'}
function close(){lb.classList.remove('on');document.body.style.overflow=''}
wb.forEach(function(b,i){b.onclick=function(){open(i)}});$('#lbc').onclick=close;$('#lbp').onclick=function(){open(li-1)};$('#lbn').onclick=function(){open(li+1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')open(li-1);if(e.key==='ArrowRight')open(li+1)});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)open(li+(d<0?1:-1))});
$('#wallmore').onclick=function(){$('#wall').classList.add('all');this.style.display='none'};

/* reviews */
var fs=$$('#qs figure'),qb=$$('#qn button'),qi=0,qt;
function q(i){qi=(i+fs.length)%fs.length;fs.forEach(function(f,j){f.classList.toggle('on',j===qi)});qb.forEach(function(b,j){b.classList.toggle('on',j===qi)})}
qb.forEach(function(b,i){b.onclick=function(){q(i);clearInterval(qt)}});if(!RM)qt=setInterval(function(){q(qi+1)},6500);

/* build your quote */
var form=$('#qform'),sts=$$('.st',form),ql=$$('#qsteps li'),si=0,bk=$('#qback'),nx=$('#qnext');
function show(i){si=i;sts.forEach(function(s,j){s.classList.toggle('on',j===i)});ql.forEach(function(l,j){l.classList.toggle('on',j===Math.min(i,3))});bk.style.visibility=i?'visible':'hidden';nx.style.display=i>=4?'none':'';nx.textContent=i===3?'Review my request':'Next'}
function val(n){var f=form.elements[n];return f?(f.value||'').trim():''}
function summary(){var t=(form.querySelector('[name=type]:checked')||{}).value||'Not chosen yet';var s=$$('[name=svc]:checked',form).map(function(c){return c.value}).join(', ')||'Please recommend';
return 'Event: '+t+'\nNeeds: '+s+'\nDate: '+(val('date')||'TBC')+'\nGuests: '+(val('guests')||'TBC')+'\nVenue or city: '+(val('venue')||'TBC')+'\nFormat: '+val('format')+'\n\nName: '+val('name')+'\nCompany: '+val('company')+'\nEmail: '+val('email')+'\nPhone: '+val('phone')+(val('notes')?'\n\nNotes: '+val('notes'):'')}
nx.onclick=function(){if(si===3){var e=form.elements.email,n=form.elements.name;if(!n.value.trim()){n.focus();n.reportValidity&&n.reportValidity();return}if(!e.value.trim()||!e.checkValidity()){e.focus();e.reportValidity&&e.reportValidity();return}
var s=summary();$('#qsum').textContent=s;$('#qsend').href='mailto:info@centerstageav.com?subject='+encodeURIComponent('Quote request: '+((form.querySelector('[name=type]:checked')||{}).value||'event'))+'&body='+encodeURIComponent(s)}show(si+1)};
bk.onclick=function(){show(Math.max(0,si-1))};show(0);
$$('[name=type]',form).forEach(function(r){r.addEventListener('change',function(){setTimeout(function(){if(si===0)show(1)},250)})});
$$('[data-quote]').forEach(function(a){a.addEventListener('click',function(){var v=a.getAttribute('data-quote');if(v){var m=$$('[name=type]',form).filter(function(r){return r.value===v||v.indexOf(r.value.split(' ')[0])===0})[0];if(m){m.checked=true;show(1)}}})});

/* video: keep it light */
var vid=$('#reel');if(vid){if(RM)vid.removeAttribute('autoplay');new IntersectionObserver(function(es){if(es[0].isIntersecting){if(!RM)vid.play().catch(function(){})}else vid.pause()}).observe(vid)}

/* ---------- Tour of what's changed (?tour=1): single tap, auto-plays ---------- */
var S=[
 {s:'#hero',k:'Welcome',t:'Richard, here’s your new site',d:'Your own reel now plays on a stage screen the moment the page opens, and the headline keeps your line: Your brand. Your event. Center stage. The event word changes, so every planner sees their kind of show.',r:'Planners decide in seconds. Leading with real show footage, not a slider, is what earns the first enquiry.'},
 {s:'#hdr',k:'Logo refresh',t:'A sharper version of your logo',d:'Same name, same crimson AV, redrawn crisp so it never looks soft on phones or LED walls. The site uses Option A. Options B and C are on the logo page, linked at the bottom.',r:''},
 {s:'#plan',k:'Your motto',t:'From the boardroom to the ballroom',d:'Your motto is now something people play with: drag the handle between show night and behind the desk. Plan, build, show, in your words.',r:''},
 {s:'#services',k:'Services',t:'Eight services, one tap each',d:'Instead of eight separate pages, each service opens in place with its photo and the essentials, so nobody gets lost.',r:'Every service ends one tap from Build your quote, so interest turns into a request.'},
 {s:'#events',k:'What we do',t:'Every kind of stage, on one swipe',d:'Meetings to galas to hybrid. Tap any poster and the quote builder opens with that event already picked.',r:''},
 {s:'#work',k:'Our work',t:'Your work, front and centre',d:'22 of your own show photos in one wall, full screen with a tap and swipeable on phones. Real work, not stock.',r:''},
 {s:'#proof',k:'Proof',t:'Trusted names and real words',d:'The client logos and reviews already on your site, presented so they actually get read. No new claims added.',r:'Proof next to the quote button is what moves a planner from browsing to asking.'},
 {s:'#studio',k:'New revenue',t:'Rent out the Virtual Studio',d:'Your Center Stage Virtual Studio was buried on the hybrid page. It now has its own section and booking request.',r:'Studio time sells between shows: town halls, launches, recorded broadcasts, training. Same space, extra bookings.'},
 {s:'#quote',k:'New revenue',t:'Build your quote',d:'Four quick steps: event, needs, date and size, contact. Your team gets a complete brief instead of “please call me”.',r:'Qualified requests arrive with dates and budgets, so your team quotes faster and wins more of them.'},
 {s:'#contact',k:'What’s next',t:'Three cities, one crew',d:'Toronto, Fort Lauderdale and San Diego, side by side. Pick a logo option, send me any notes, and we take this live on centerstageav.com.',r:''}
];
var box=$('#tour'),ti=0,tm=null,paused=false,D=9000,t0=0,raf;
function hi(){$$('.tour-hi').forEach(function(x){x.classList.remove('tour-hi')})}
function prog(){var p=Math.min(1,(performance.now()-t0)/D);$('#tpg').style.width=(p*100)+'%';if(p<1&&!paused)raf=requestAnimationFrame(prog)}
function go(i){if(i>=S.length){end();return}ti=Math.max(0,i);var st=S[ti],el=$(st.s);
 $('#tk').textContent=st.k;$('#tn').textContent=(ti+1)+' / '+S.length;$('#tt').textContent=st.t;$('#td').textContent=st.d;var r=$('#tr');r.textContent=st.r;r.style.display=st.r?'':'none';
 $('#tb').style.visibility=ti?'visible':'hidden';$('#tnx').textContent=ti===S.length-1?'Finish':'Next';
 hi();if(el){if(st.s==='#hdr')scrollTo({top:0,behavior:'smooth'});else el.scrollIntoView({behavior:'smooth',block:'start'});if(st.s!=='#hero'&&st.s!=='#hdr')el.classList.add('tour-hi')}
 box.classList.add('on');document.body.classList.add('touring');clearTimeout(tm);cancelAnimationFrame(raf);paused=false;$('#tp').textContent='Pause';t0=performance.now();prog();tm=setTimeout(function(){go(ti+1)},D)}
function end(){clearTimeout(tm);cancelAnimationFrame(raf);box.classList.remove('on');document.body.classList.remove('touring');hi();$('#tourbtn').style.display=''}
var tour={start:function(i){mt(false);$('#tourbtn').style.display='none';go(i||0)}};
$('#tnx').onclick=function(){go(ti+1)};$('#tb').onclick=function(){go(ti-1)};$('#tx').onclick=end;
$('#tp').onclick=function(){if(paused){paused=false;this.textContent='Pause';var left=D;t0=performance.now();prog();tm=setTimeout(function(){go(ti+1)},left)}else{paused=true;this.textContent='Play';clearTimeout(tm);cancelAnimationFrame(raf)}};
$$('[data-tour]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();tour.start(0)})});
})();
