const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8787/?tour=1');await p.waitForTimeout(4200);await p.screenshot({path:'t1.png'});
await p.click('#tnx');await p.click('#tnx');await p.waitForTimeout(1500);await p.screenshot({path:'t2.png'});
for(let i=0;i<5;i++)await p.click('#tnx');await p.waitForTimeout(1500);await p.screenshot({path:'t3.png'});
await p.click('#tx');await p.goto('http://localhost:8787/#quote');await p.waitForTimeout(800);await p.click('.chip >> text=Galas & Awards');await p.waitForTimeout(400);await p.click('#qnext');await p.click('#qnext');
await p.fill('[name=name]','Test');await p.fill('[name=email]','t@example.com');await p.click('#qnext');await p.waitForTimeout(400);console.log(await p.textContent('#qsum'));console.log('ERR',errs);await b.close()})()
