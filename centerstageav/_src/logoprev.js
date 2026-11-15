// usage: node logoprev.js dir prefix out.png  -> sheet of prefix-{a,b,c} on dark, light, icon, and header size
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [dir,pre,out]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:900},deviceScaleFactor:1});
const u=f=>'data:image/svg+xml;base64,'+fs.readFileSync(path.join(dir,f)).toString('base64');
let h='<body style="margin:0;font:14px sans-serif;background:#888">';
for(const k of (process.env.KEYS||'a,b,c').split(',')){h+=`<div style="display:grid;grid-template-columns:1fr 1fr 220px;gap:6px;margin-bottom:6px">
<div style="background:#0B0A0D;display:grid;place-items:center;height:260px"><img src="${u(pre+'-'+k+'-light.svg')}" style="max-width:92%;max-height:200px"></div>
<div style="background:#fff;display:grid;place-items:center;height:260px"><img src="${u(pre+'-'+k+'-dark.svg')}" style="max-width:92%;max-height:200px"></div>
<div style="background:#0B0A0D;display:grid;place-items:center"><img src="${u(pre+'-'+k+'-icon.svg')}" style="width:180px;border-radius:36px"></div></div>
<div style="display:flex;gap:6px;margin-bottom:14px"><div style="background:#0B0A0D;padding:12px;flex:1"><img src="${u(pre+'-'+k+'-light.svg')}" style="height:44px"></div><div style="background:#fff;padding:12px;flex:1"><img src="${u(pre+'-'+k+'-dark.svg')}" style="height:44px"></div></div>`}
await p.setContent(h);await p.waitForTimeout(500);await p.screenshot({path:out,fullPage:true});await b.close()})()
