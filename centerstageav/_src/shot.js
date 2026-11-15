// usage: node shot.js url out.png width height [full] [dsf]
const {chromium}=require('playwright');(async()=>{const [u,o,w,h,full,dsf]=process.argv.slice(2);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:+(dsf||1)});const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));
await p.goto(u,{waitUntil:'load'});await p.waitForTimeout(+(process.env.WAIT||800));if(full==='1'){await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0)});await p.waitForTimeout(800)}await p.screenshot({path:o,fullPage:full==='1'});if(errs.length)console.log('ERR',errs.join('\n'));await b.close()})()
