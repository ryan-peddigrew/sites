const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const r=[];p.on('response',async x=>{try{const h=await x.headerValue('content-length');r.push([x.url().replace(/^https?:\/\/[^/]+/,''),+(h||0)])}catch(e){}});
const t=Date.now();await p.goto('http://localhost:8787/',{waitUntil:'load'});console.log('load ms',Date.now()-t);await p.waitForTimeout(1500);
r.sort((a,b)=>b[1]-a[1]);let s=0;r.forEach(x=>s+=x[1]);console.log('requests',r.length,'KB',Math.round(s/1024));r.slice(0,15).forEach(x=>console.log(Math.round(x[1]/1024)+'KB',x[0].slice(0,80)));await b.close()})()
