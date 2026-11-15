// usage: node storyshots.js width height outprefix
const {chromium}=require('playwright');(async()=>{const [w,h,o]=process.argv.slice(2);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.addInitScript(()=>{try{sessionStorage.setItem('csav-ld','1')}catch(e){}});
await p.goto('http://localhost:8787/',{waitUntil:'load'});await p.waitForTimeout(600);
const pts=[0.02,0.12,0.27,0.36,0.47,0.55,0.66,0.76,0.9,0.99];
for(let i=0;i<pts.length;i++){await p.evaluate(f=>{const s=document.getElementById('show');const hd=72;const y0=s.getBoundingClientRect().top+scrollY-hd;const tot=s.offsetHeight-(innerHeight-hd);document.documentElement.style.scrollBehavior='auto';scrollTo(0,y0+tot*f)},pts[i]);await p.waitForTimeout(700);await p.screenshot({path:`${o}${i}.png`})}
const t0=Date.now();let frames=0;
if(errs.length)console.log('ERR',errs.join('\n'));await b.close()})()
