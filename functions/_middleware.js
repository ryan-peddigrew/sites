/* Chairlift private previews: passcode gate. Each prospect folder has its own code, set from SECRET.
   Open a link with ?k=CODE once and the browser remembers it. (c) 2026 Chairlift. */
const enc = new TextEncoder();
const OPEN = ['/_chairlift/', '/divine-furniture-rental/design/', '/divine-furniture-rental/img/']; // installable app whose contact already has the link

async function mk(secret, key) {
  const k = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const s = await crypto.subtle.sign('HMAC', k, enc.encode(key));
  return [...new Uint8Array(s)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 10);
}
const cname = f => 'clk_' + (f || 'root').replace(/[^a-z0-9]/gi, '_');
function cookies(req) {
  const o = {};
  (req.headers.get('Cookie') || '').split(/;\s*/).forEach(p => { const i = p.indexOf('='); if (i > 0) o[p.slice(0, i)] = p.slice(i + 1); });
  return o;
}
function setCookie(name, val) {
  return `${name}=${val}; Path=/; Max-Age=2592000; Secure; HttpOnly; SameSite=Lax`;
}
function gate(msg) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Private preview</title>
<style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#141B2A;color:#fff;font-family:"Hanken Grotesk",Arial,Helvetica,sans-serif;padding:24px}
main{width:100%;max-width:440px}small{display:block;letter-spacing:.2em;text-transform:uppercase;font-weight:700;font-size:12px;color:#ffffffaa}
h1{margin:14px 0 10px;font-size:34px;line-height:1.05;text-transform:uppercase;font-weight:800}p{color:#ffffffcc;font-size:17px;line-height:1.5;margin:0 0 22px}
input{width:100%;height:54px;font-size:18px;padding:0 14px;border:2px solid #fff;background:transparent;color:#fff;letter-spacing:.14em;text-transform:uppercase}
button{margin-top:12px;width:100%;height:54px;font-weight:700;font-size:14px;letter-spacing:.14em;text-transform:uppercase;background:#fff;color:#141B2A;border:0;cursor:pointer}
.e{color:#ffb4b4;margin:10px 0 0;font-size:15px}.f{margin-top:34px;font-size:13px;color:#ffffff99}.f b{color:#fff;font-weight:600}</style></head>
<body><main><small>Private preview</small><h1>Enter your code</h1><p>This preview was prepared for you. Type the code from your message to open it.</p>
<form method="post"><input name="code" autocomplete="off" autocapitalize="characters" autofocus aria-label="Preview code" placeholder="CODE"><button type="submit">Open preview</button>${msg ? '<p class="e">' + msg + '</p>' : ''}</form>
<div class="f">Prepared by <b>Chairlift</b></div></main></body></html>`;
  return new Response(html, { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}

export async function onRequest(ctx) {
  const { request, env, next } = ctx;
  const url = new URL(request.url);
  if (OPEN.some(p => url.pathname.startsWith(p))) return next();
  if (!env.SECRET) return gate('Preview is being set up. Please try again soon.');
  const folder = url.pathname.split('/')[1] || '';
  const want = await mk(env.SECRET, folder);
  const master = await mk(env.SECRET, '*master');
  const ck = cookies(request);
  const ok = c => c && (c === want || c === master);

  let given = (url.searchParams.get('k') || '').trim().toLowerCase();
  if (request.method === 'POST') {
    try { given = ((await request.formData()).get('code') || '').toString().trim().toLowerCase(); } catch (e) {}
    if (!ok(given)) return gate('That code does not match. Check it and try again.');
  }
  if (ok(given)) {
    url.searchParams.delete('k');
    const h = new Headers({ Location: url.pathname + url.search, 'Cache-Control': 'no-store' });
    h.append('Set-Cookie', setCookie(given === master ? 'clk_master' : cname(folder), given));
    return new Response(null, { status: 303, headers: h });
  }
  if (ok(ck[cname(folder)]) || ok(ck['clk_master'])) {
    const r = await next();
    const out = new Response(r.body, r);
    out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    out.headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
    return out;
  }
  return gate('');
}
