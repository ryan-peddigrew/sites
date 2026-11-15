const {chromium}=require('playwright');(async()=>{const [u,sel,o,w,h]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:+w,height:+h}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto(u);await p.waitForTimeout(2800);await p.evaluate(s=>document.querySelector(s).scrollIntoView(),sel);await p.waitForTimeout(1500);await p.screenshot({path:o});console.log(errs.join('\n'));await b.close()})()
