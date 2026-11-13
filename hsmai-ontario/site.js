/* HSMAI Ontario concept: shared header, footer, loader, reveal and tour */
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const R=document.body.dataset.root||'';
const here=document.body.dataset.page||'';
const I={
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
  ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 7h18v3a2 2 0 000 4v3H3v-3a2 2 0 000-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>'
};
const EMBED=new URLSearchParams(location.search).has('embed');if(EMBED)document.documentElement.classList.add('embed');
const navs=[['events','Events'],['awards','Awards'],['directory','Directory'],['membership','Membership'],['sponsors','Sponsors'],['ideas','Growth plan']];
const href=k=>({awards:R+'awards.html',directory:R+'directory.html',events:R+'events.html',membership:R+'index.html#membership',sponsors:R+'sponsor/',board:R+'index.html#board',ideas:R+'ideas.html'})[k];
const brand=`<a class="brand" href="${R}index.html" aria-label="HSMAI Ontario home"><img src="${R}img/hsmai-logo.png" alt="HSMAI" width="428" height="125"><span class="ch">Ontario Chapter</span></a>`;
const hd=document.createElement('header');hd.className='hd';
hd.innerHTML=`<div class="wrap">${brand}<nav class="nav" aria-label="Main">${navs.map(([k,t])=>`<a href="${href(k)}"${k===here?' aria-current="page"':''}>${t}</a>`).join('')}</nav><div class="acts"><a class="btn o hide-m" href="${R}sponsor/login.html">${I.key}Sponsor login</a><a class="btn g" href="${R}events.html#tickets">Get tickets</a><button class="mb" aria-label="Menu" aria-expanded="false">${I.menu}</button></div></div>`;
document.body.prepend(hd);
const dr=document.createElement('nav');dr.className='drawer';dr.setAttribute('aria-label','Menu');
dr.innerHTML=navs.map(([k,t])=>`<a href="${href(k)}">${t}</a>`).join('')+`<a class="btn w" href="${R}sponsor/login.html">Sponsor login</a><a class="btn g" href="${R}events.html#tickets">Get tickets</a>`;
hd.after(dr);
const mb=$('.mb',hd);mb.onclick=()=>{const o=dr.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
$$('a',dr).forEach(a=>a.onclick=()=>dr.classList.remove('open'));
let ly=0;addEventListener('scroll',()=>{const y=scrollY;hd.style.transform=(y>ly&&y>300&&!dr.classList.contains('open'))?'translateY(-100%)':'';ly=y},{passive:true});

/* footer */
const ft=document.createElement('footer');ft.className='ft';
ft.innerHTML=`<div class="wrap"><div class="grid">
<div><div class="lgw"><img src="${R}img/hsmai-logo.png" alt="HSMAI" width="428" height="125"><span class="ch">Ontario Chapter</span></div>
<p style="margin-top:18px;color:#ffffffb3;max-width:40ch">Ontario's resource for hospitality sales, marketing and revenue professionals. Part of HSMAI Americas.</p>
<div class="part"><img src="${R}img/partner-orhma.jpg" alt="ORHMA"><img src="${R}img/partner-tiao.png" alt="TIAO"></div></div>
<div><h4>Chapter</h4><a href="${R}events.html">Events</a><a href="${R}awards.html">Awards</a><a href="${R}directory.html">Directory</a><a href="${R}index.html#membership">Membership</a><a href="${R}index.html#board">Board</a><a href="${R}index.html#reads">Recommended reads</a></div>
<div><h4>Partners</h4><a href="${R}sponsor/">Sponsor the chapter</a><a href="${R}sponsor/login.html">Sponsor login</a><a href="${R}app/">Sponsor app</a><a href="${R}sponsor/dashboard.html">Sample dashboard</a><a href="${R}ideas.html">Growth plan</a></div>
<div><h4>Contact</h4><a href="mailto:communications@hsmaiontario.ca">communications@<wbr>hsmaiontario.ca</a><a href="mailto:sponsorship@hsmaiontario.ca">sponsorship@<wbr>hsmaiontario.ca</a><a href="https://www.linkedin.com/company/hsmai-ontario/" rel="noopener">LinkedIn</a><a href="https://www.facebook.com/hsmaiontario/" rel="noopener">Facebook</a></div>
</div><div class="fine"><span>&copy; HSMAI Ontario 2026. HSMAI name and logo used as supplied by HSMAI.</span><span>Concept preview by Chairlift. Not the live site.</span></div></div>`;
document.body.append(ft);

/* phone dock */
const dk=document.createElement('nav');dk.className='dock';dk.setAttribute('aria-label','Quick actions');
dk.innerHTML=`<a href="${R}events.html#tickets">${I.ticket}Tickets</a><a href="${R}sponsor/">Sponsor</a><a href="#" id="dtour">${I.play}Tour</a>`;
document.body.append(dk);

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));

/* loader: first visit only per session */
const ld=$('#ld');if(EMBED&&ld){ld.style.display='none'}
if(EMBED){const st=document.createElement('style');st.textContent='.tourbtn,.tourbar,.dock{display:none!important}.rv{opacity:1!important;transform:none!important}';document.head.append(st)}
const ready=()=>{document.dispatchEvent(new Event('hsready'))};
if(EMBED)setTimeout(ready,50);else if(ld){let seen=false;try{seen=sessionStorage.getItem('hsld')}catch(e){}
  if(seen){ld.remove();setTimeout(ready,50)}
  else{try{sessionStorage.setItem('hsld',1)}catch(e){}setTimeout(()=>{ld.classList.add('done');ready();setTimeout(()=>ld.remove(),600)},1700)}}
else setTimeout(ready,50);

/* tour engine: page sets window.TOUR = [[selector, title, was, now, money?], ...] */
const T=window.TOUR;
if(!T){const d=$('#dtour');if(d)d.href=R+'index.html?tour=1';return}
const tb=document.createElement('button');tb.className='btn p tourbtn';tb.textContent='Take the tour';document.body.append(tb);
const bar=document.createElement('div');bar.className='tourbar';bar.hidden=true;
bar.innerHTML=`<div class="k"><span id="tk">Concept preview</span><span id="tn"></span></div><h5 id="th">What's new for HSMAI Ontario</h5><div id="tp"><p>A short guided tour. It plays by itself.</p></div><div class="ctl"><button class="go" id="tgo">Start the tour</button><button id="tpause" hidden>Pause</button><button id="tnext" hidden>Next</button><span class="sp"></span><button id="tx">Close</button></div><div class="pg"><i id="tpg"></i></div>`;
document.body.append(bar);
let ti=-1,tt=null,paused=false,t0=0,left=0;const DUR=10000;
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
const clr=()=>$$('.spot').forEach(e=>e.classList.remove('spot'));
const pg=$('#tpg',bar);
function anim(ms){pg.style.transition='none';pg.style.width=((DUR-ms)/DUR*100)+'%';requestAnimationFrame(()=>requestAnimationFrame(()=>{pg.style.transition=`width ${ms}ms linear`;pg.style.width='100%'}))}
function show(i){if(i>=T.length)return end();ti=i;clr();clearTimeout(tt);const [sel,h,was,now,rev]=T[i];const el=$(sel);
  if(el){el.classList.add('spot');const y=el.getBoundingClientRect().top+scrollY-84;scrollTo({top:Math.max(0,y),behavior:'smooth'})}
  $('#tk',bar).textContent='What changed';$('#tn',bar).textContent=`${i+1} / ${T.length}`;$('#th',bar).textContent=h;
  $('#tp',bar).innerHTML=(was?`<p><b class="was">Before:</b> ${esc(was)}</p>`:'')+`<p><b class="now">Now:</b> ${esc(now)}</p>`+(rev?`<p><b class="rev">Why it pays:</b> ${esc(rev)}</p>`:'');
  paused=false;$('#tpause',bar).textContent='Pause';left=DUR;run()}
function run(){t0=Date.now();anim(left);tt=setTimeout(()=>show(ti+1),left)}
function end(){clearTimeout(tt);clr();ti=-1;$('#tk',bar).textContent="That's the tour";$('#tn',bar).textContent='';$('#th',bar).textContent='Have a look around';
  $('#tp',bar).innerHTML=`<p>Everything uses HSMAI Ontario's own events, board, sponsors and awards. Yellow tags mark details the chapter still needs to confirm.</p><p><a href="${R}sponsor/dashboard.html" style="color:#E2C6FF;border-bottom:1px solid">Open the sample sponsor dashboard</a> &nbsp; <a href="${R}ideas.html" style="color:#E2C6FF;border-bottom:1px solid">See every growth idea</a></p>`;
  $('#tpause',bar).hidden=$('#tnext',bar).hidden=true;$('#tgo',bar).hidden=false;$('#tgo',bar).textContent='Replay';pg.style.transition='none';pg.style.width='0';scrollTo({top:0,behavior:'smooth'})}
$('#tgo',bar).onclick=()=>{$('#tgo',bar).hidden=true;$('#tpause',bar).hidden=$('#tnext',bar).hidden=false;show(0)};
$('#tnext',bar).onclick=()=>show(ti+1);
$('#tpause',bar).onclick=()=>{if(ti<0)return;if(!paused){paused=true;clearTimeout(tt);left-=Date.now()-t0;const w=getComputedStyle(pg).width;pg.style.transition='none';pg.style.width=w;$('#tpause',bar).textContent='Play'}else{paused=false;$('#tpause',bar).textContent='Pause';run()}};
const open=()=>{tb.hidden=true;bar.hidden=false;$('#tgo',bar).click()};
tb.onclick=open;const d=$('#dtour');if(d)d.onclick=e=>{e.preventDefault();open()};
$('#tx',bar).onclick=()=>{clearTimeout(tt);clr();bar.hidden=true;tb.hidden=false};
if(new URLSearchParams(location.search).get('tour')==='1'){let s=false;const go=()=>{if(!s){s=true;setTimeout(open,400)}};document.addEventListener('hsready',go);setTimeout(go,4000)}
})();
