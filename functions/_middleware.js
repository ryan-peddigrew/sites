/* Chairlift private previews: passcode gate. Each prospect folder has its own code, set from SECRET.
   Open a link with ?k=CODE once and the browser remembers it. (c) 2026 Chairlift. */
const enc = new TextEncoder();
const OPEN = ['/_chairlift/']; // shared watermark script only; no client content
// Easy-to-type codes that open ONE folder only (Ryan, 16 Nov 2026).
const EXTRA = { 'sean-wells': 'darkmagic1993', 'tammy-gillis': 'roomtogrow' };
// Per-recipient tracing (26 Nov 2026): each code carries a viewer reference that is shown in the
// watermark and hidden in the page, so a leaked copy says whose link it came from.
// To revoke a code, delete it from EXTRA. To end it on a date, add it to EXPIRES (YYYY-MM-DD, Eastern).
const LABELS = { roomtogrow: 'TG-01 TAMMY GILLIS', darkmagic1993: 'SW-01 SEAN WELLS' };
const EXPIRES = { roomtogrow: '2027-02-28' };
// Build files never leave the server: sources, scripts and notes return 404 even with a code.
const PRIVATE = /\/(src|tools)\/|\/README\.md$|\.(py|sh|md)$/i;

const MK = new Map(); // Speed (26 Nov 2026): remember codes so each request skips the crypto work.
async function mk(secret, key) {
  const id = secret + '\0' + key; if (MK.has(id)) return MK.get(id);
  const v = await mk0(secret, key); if (MK.size < 500) MK.set(id, v); return v;
}
async function mk0(secret, key) {
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

// Preview forms and view alerts (26 Nov 2026): demo submissions and client tour views go to Ryan only,
// server-side, so no address or service name appears in the page. Nothing is sent to the client or anyone else.
const LEAD_TO = 'https://formsubmit.co/ajax/ryan@usechairlift.com';
async function lead(request, url, folder, ref, team) {
  let d = {};
  try { const t = await request.text(); if (t.length > 6000) return new Response('Too large', { status: 413 }); d = JSON.parse(t || '{}'); } catch (e) { return new Response('Bad request', { status: 400 }); }
  const kind = String(d.kind || 'form').slice(0, 40);
  // View alerts only for client codes, never for the team's own views.
  if ((kind === 'tour-open' || kind === 'tour-progress' || kind === 'view') && team) return new Response(null, { status: 204 });
  const body = { _subject: `[Preview ${folder}] ${kind} · ref ${ref}`, _template: 'table', _captcha: 'false', preview: folder, ref, kind, page: String(d.page || '').slice(0, 200), time_utc: new Date().toISOString() };
  const f = d.fields && typeof d.fields === 'object' ? d.fields : {};
  Object.keys(f).slice(0, 25).forEach(k => { body[String(k).slice(0, 60)] = String(f[k]).slice(0, 800); });
  try {
    const r = await fetch(LEAD_TO, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json', Referer: url.origin + '/' + folder + '/', Origin: url.origin }, body: JSON.stringify(body) });
    return new Response(JSON.stringify({ ok: r.ok }), { status: r.ok ? 200 : 502, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch (e) { return new Response(JSON.stringify({ ok: false }), { status: 502, headers: { 'Content-Type': 'application/json' } }); }
}

export async function onRequest(ctx) {
  const { request, env, next } = ctx;
  const url = new URL(request.url);
  if (OPEN.some(p => url.pathname.startsWith(p))) return next();
  // Ryan's own wedding site on his domain: public, no gate, only the guest pages.
  if (/(^|\.)peddigrewsaysido\.com$/i.test(url.hostname)) {
    const p = url.pathname === '/' ? '/index.html' : /^\/rsvp\/?$/.test(url.pathname) ? '/rsvp.html' : url.pathname;
    if (!/^\/(index\.html|rsvp\.html|img\/[\w.-]+\.(jpg|webp|png))$/.test(p)) {
      return Response.redirect(url.origin + '/', 302);
    }
    // Pages serves /x.html at /x, so ask for the clean path and follow one internal redirect.
    const clean = p === '/index.html' ? '/' : p.replace(/\.html$/, '');
    let r = await env.ASSETS.fetch(new Request(new URL('/ryan-amanda-wedding' + clean, url), request));
    if (r.status >= 300 && r.status < 400 && r.headers.get('Location')) {
      r = await env.ASSETS.fetch(new Request(new URL(r.headers.get('Location'), url), request));
    }
    return r;
  }
  if (!env.SECRET) return gate('Preview is being set up. Please try again soon.');
  const folder = url.pathname.split('/')[1] || '';
  const want = await mk(env.SECRET, folder);
  const master = await mk(env.SECRET, '*master');
  const ck = cookies(request);
  const live = c => !EXPIRES[c] || new Date() <= new Date(EXPIRES[c] + 'T23:59:59-05:00');
  const ok = c => c && (c === want || c === master || (EXTRA[folder] && c === EXTRA[folder] && live(c)));
  if (PRIVATE.test(url.pathname)) return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex, nofollow' } });

  if (request.method === 'POST' && url.pathname === '/' + folder + '/_lead') {
    if (!(ok(ck[cname(folder)]) || ok(ck['clk_master']))) return new Response('Forbidden', { status: 403 });
    const code = ok(ck[cname(folder)]) ? ck[cname(folder)] : ck['clk_master'];
    const ref = (LABELS[code] || (code === master ? 'CL-TEAM' : 'CL-' + folder.toUpperCase().slice(0, 12)));
    return lead(request, url, folder, ref, !LABELS[code]);
  }
  const norm = v => (v || '').toString().replace(/[^a-z0-9]/gi, '').toLowerCase();
  let given = norm(url.searchParams.get('k'));
  if (request.method === 'POST') {
    try { given = norm((await request.formData()).get('code')); } catch (e) {}
    if (!ok(given)) return gate('That code does not match. Check it and try again.');
  }
  if (ok(given)) {
    url.searchParams.delete('k');
    const h = new Headers({ Location: url.pathname + url.search, 'Cache-Control': 'no-store' });
    h.append('Set-Cookie', setCookie(given === master ? 'clk_master' : cname(folder), given));
    return new Response(null, { status: 303, headers: h });
  }
  if (ok(ck[cname(folder)]) || ok(ck['clk_master'])) {
    const code = ok(ck[cname(folder)]) ? ck[cname(folder)] : ck['clk_master'];
    const ref = LABELS[code] || (code === master ? 'CL-TEAM' : 'CL-' + folder.toUpperCase().slice(0, 12));
    const r = await next();
    const out = new Response(r.body, r);
    out.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    // Speed (26 Nov 2026): photos and video stay on the viewer's device for a day, scripts and styles for 5 minutes; pages always fresh.
    const ext = (url.pathname.match(/\.(\w+)$/) || [])[1] || '';
    out.headers.set('Cache-Control', /^(webp|jpe?g|png|svg|mp4|woff2?)$/i.test(ext) ? 'private, max-age=86400' : /^(css|js)$/i.test(ext) ? 'private, max-age=300' : 'private, max-age=0, must-revalidate');
    out.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
    out.headers.set('X-Frame-Options', 'SAMEORIGIN');
    if (!(out.headers.get('Content-Type') || '').includes('text/html')) return out;
    const id = ref.split(' ')[0];
    return new HTMLRewriter()
      .on('head', { element(e) { e.prepend(`<meta name="cl-ref" content="${id}"><meta name="robots" content="noindex,nofollow,noarchive">`, { html: true }); } })
      .on('html', { element(e) { e.setAttribute('data-ref', id); } })
      .on('body', { element(e) { e.prepend(`<!-- CONFIDENTIAL CONCEPT. Designed and powered by Chairlift (usechairlift.com). Prepared privately; copying, scraping, rebuilding or removing the watermark is not permitted. Viewer reference: ${id}. -->`, { html: true }); } })
      .transform(out);
  }
  return gate('');
}
