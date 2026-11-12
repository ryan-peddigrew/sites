const C='divine-design-v62';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','icon-192.png','../img/logo-gold.png'].map(u=>new Request(u,{cache:'reload'})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  const same=new URL(e.request.url).origin===location.origin;
  const req=same&&(e.request.mode==='navigate'||/\.(js|webmanifest)$/.test(new URL(e.request.url).pathname))?new Request(e.request.url,{cache:'no-cache',credentials:'same-origin'}):e.request;
  e.respondWith(fetch(req).then(r=>{if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
