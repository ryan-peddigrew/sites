(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var Q = new URLSearchParams(location.search);
  var EMBED = window.top !== window.self;
  var TOUR = Q.get('tour') === '1';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  if (EMBED) root.classList.add('embed');
  function theme() { return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  var tb = document.getElementById('themeB');
  if (tb) tb.addEventListener('click', function () {
    var t = theme() === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', t);
    try { localStorage.setItem('gs_theme', t); } catch (e) {}
    try { var u = new URL(location.href); u.searchParams.set('theme', t); history.replaceState(null, '', u); } catch (e) {}
  });
  var sc = document.querySelector('.aura .sc');
  if (sc && innerWidth > 760 && !matchMedia('(prefers-reduced-motion: reduce)').matches) addEventListener('scroll', function () { sc.style.setProperty('--sy', (scrollY * 0.12).toFixed(1)); }, { passive: true });
  (function () {
    var opt = (Q.get('wm') || '').toLowerCase(); if (!/^[abcdes]$/.test(opt)) opt = 's';
    var MARK = '<svg class="wl-m" viewBox="-1 -1 66 66" aria-hidden="true"><path d="M2 0H62A2 2 0 0 1 64 2V62A2 2 0 0 1 62 64H2A2 2 0 0 1 0 62V2A2 2 0 0 1 2 0Z" fill="#141B2A" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><rect x="10" y="42.5" width="20" height="7" rx="1.2" fill="#FFFFFF"/><rect x="22" y="29" width="20" height="7" rx="1.2" fill="#FFFFFF"/><rect x="34" y="15.5" width="20" height="7" rx="1.2" fill="#3DFFC1"/></svg>';
    var LOCK = '<span class="wl"><span class="wl-t">CONCEPT \u00b7 DESIGNED AND POWERED BY:</span>' + MARK + '<b class="wl-w">Chairlift</b></span>';
    if (opt === 's') LOCK = '<span class="wl"><span class="wl-t">POWERED BY</span>' + MARK + '<b class="wl-w">Chairlift</b></span>';
    if (opt === 'e') LOCK = '<span class="wl">' + MARK + '<b class="wl-w">Chairlift</b></span>';
    var wm = $('#wm'); wm.className = 'wm-' + opt; wm.style.backgroundImage = 'none';
    var rows = '', n = 22;
    for (var i = 0; i < n; i++) rows += '<div class="wr' + (i % 2 ? ' o' : '') + '">' + new Array(6).join(LOCK) + '</div>';
    var REF = document.documentElement.getAttribute('data-ref') || ((document.querySelector('meta[name=cl-ref]') || {}).content) || 'PREVIEW';
    window.__clref = REF;
    var HTML = (opt === 's' ? '<div class="wone">' + LOCK + '</div>' : '<div class="wg">' + rows + '</div>') + (opt === 'c' ? '<div class="wrib">' + LOCK + '</div>' : '') + '<div class="wref">CONFIDENTIAL CONCEPT \u00b7 REF ' + REF + '</div>';
    var CSSTXT = 'position:fixed;inset:0;z-index:2147483000;pointer-events:none;display:block;visibility:visible;opacity:1;transform:none;filter:none;clip-path:none';
    function paint() { wm.className = 'wm-' + opt; wm.setAttribute('style', CSSTXT); wm.innerHTML = HTML; if (wm.parentNode !== document.body || document.body.lastElementChild !== wm) document.body.appendChild(wm); }
    paint();
    document.documentElement.classList.add('wmok');
    function bad() { if (!document.body.contains(wm) || !wm.querySelector('.wl')) return true; var c = getComputedStyle(wm); return c.display === 'none' || c.visibility !== 'visible' || +c.opacity < 0.9; }
    var busy = false;
    function heal() { if (EMBED || busy || !bad()) return; busy = true; paint(); busy = false; }
    var q = 0; function soon() { if (q) return; q = requestAnimationFrame(function () { q = 0; heal(); }); }
    try { var mo = new MutationObserver(soon); mo.observe(document.body, { childList: true }); mo.observe(wm, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class', 'hidden'] }); mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] }); } catch (e) {}
    setInterval(heal, 1500);
  })();
  document.addEventListener('contextmenu', function (e) { if (!e.target.closest('input,textarea')) e.preventDefault(); });
  document.addEventListener('dragstart', function (e) { if (e.target.tagName === 'IMG') e.preventDefault(); });
  document.addEventListener('copy', function (e) {
    if (e.target.closest && e.target.closest('input,textarea')) return;
    e.preventDefault();
    if (e.clipboardData) e.clipboardData.setData('text/plain', 'Confidential concept preview designed and powered by Chairlift. Not for reuse. Ref ' + (window.__clref || 'PREVIEW') + '.');
  });
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === 's' || k === 'u' || k === 'p' || (e.shiftKey && (k === 'i' || k === 'j' || k === 'c')))) e.preventDefault();
    if (k === 'f12') e.preventDefault();
  });
  var loader = $('#loader');
  var seen = false; try { seen = sessionStorage.getItem('gs_ld') === '1'; sessionStorage.setItem('gs_ld', '1'); } catch (e) {}
  if (RM || seen || EMBED || Q.has('noload')) loader.classList.add('gone');
  else setTimeout(function () { loader.classList.add('out'); setTimeout(function () { loader.classList.add('gone'); }, 450); }, 1100);
  function onScroll() { root.classList.toggle('scrolled', scrollY > 60); root.classList.toggle('nbs', scrollY > 8); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $('.nb-x').addEventListener('click', function () { root.classList.add('nb-off'); });
  var mb = $('#menuB'), ov = $('#ov');
  function menu(o) { ov.hidden = !o; mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); root.classList.toggle('tourlock', o); }
  mb.addEventListener('click', function () { menu(ov.hidden); });
  $$('#ov a').forEach(function (a) {
    a.addEventListener('click', function () { menu(false); });
    a.addEventListener('mouseenter', function () { if (a.dataset.img) $('#ovImg').src = a.dataset.img; });
  });
  $$('.hw').forEach(function (w, i) { w.style.animationDelay = (RM ? 0 : (seen || EMBED ? 0.1 : 1.1) + i * 0.09) + 's'; });
  var reel = $$('#reel .rl'), bars = $$('#reel .rl-bars i'), ri = 0, vid = $('#rlv');
  function playVid() { try { vid.load(); var p = vid.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
  if (document.readyState === 'complete') playVid(); else addEventListener('load', playVid);
  function step() {
    var d = ri === 0 ? 9000 : 5000;
    bars.forEach(function (b, j) { b.classList.remove('run'); b.classList.toggle('done', j < ri); });
    void bars[ri].offsetWidth; bars[ri].style.setProperty('--d', d + 'ms'); bars[ri].classList.add('run');
    setTimeout(function () { reel[ri].classList.remove('on'); ri = (ri + 1) % reel.length; reel[ri].classList.add('on'); step(); }, d);
  }
  if (!RM) step();
  var film = $('#film'), fv = $('#filmV');
  $$('[data-film]').forEach(function (b) { b.addEventListener('click', function () { film.hidden = false; try { fv.play(); } catch (e) {} }); });
  $('#filmX').addEventListener('click', function () { fv.pause(); film.hidden = true; });
  $$('[data-lit]').forEach(function (p) {
    (function wrap(n) {
      $$(':scope > *', n).forEach(wrap);
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3 && c.textContent.trim()) {
          var f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) { if (!t) return; if (/^\s+$/.test(t)) f.appendChild(document.createTextNode(t)); else { var s = document.createElement('span'); s.className = 'w'; s.textContent = t; f.appendChild(s); } });
          n.replaceChild(f, c);
        }
      });
    })(p);
  });
  var lits = $$('.lit-p .w');
  function lit() { var h = innerHeight; lits.forEach(function (w) { var r = w.getBoundingClientRect(); w.classList.toggle('on', r.top < h * 0.72); }); }
  addEventListener('scroll', lit, { passive: true }); lit();
  var wl = $$('#waysList li'), wimg = $('#waysImg');
  wl.forEach(function (li) {
    function act() {
      if (li.classList.contains('on')) return;
      wl.forEach(function (x) { x.classList.remove('on'); }); li.classList.add('on');
      wimg.classList.add('sw'); setTimeout(function () { wimg.src = li.dataset.img; wimg.classList.remove('sw'); }, 250);
    }
    $('button', li).addEventListener('click', act);
    if (matchMedia('(hover:hover)').matches) $('button', li).addEventListener('mouseenter', act);
  });
  var chap = $('#system'), cls = $$('.chap-l'), cn = $$('.chap-n i');
  var CS = ['The strongest hotel sales strategies are proactive, measurable and system-driven.', 'Experienced hospitality sellers, many of them former Directors of Sales, with embedded leadership and coaching.', 'GillisOne, real-time reporting and a repeatable process that doesn’t depend on one person.'];
  var lastC = -1;
  function chapS() {
    var r = chap.getBoundingClientRect(), p = Math.min(0.999, Math.max(0, -r.top / (r.height - innerHeight)));
    var i = Math.floor(p * 3); if (i === lastC) return; lastC = i;
    cls.forEach(function (c, j) { c.classList.toggle('on', j <= i); }); cn.forEach(function (c, j) { c.classList.toggle('on', j === i); });
    $('#chapS').textContent = CS[i];
  }
  addEventListener('scroll', chapS, { passive: true }); chapS();
  var hv = $('#hv'), hr = $('.hv-r', hv);
  hr.addEventListener('input', function () { hv.style.setProperty('--x', hr.value + '%'); });
  var hvd = false;
  new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !hvd && !RM) { hvd = true; var t0 = performance.now(); (function f(t) { var p = Math.min(1, (t - t0) / 1600), v = 50 + Math.sin(p * Math.PI * 2) * 22 * (1 - p); hv.style.setProperty('--x', v + '%'); hr.value = v; if (p < 1) requestAnimationFrame(f); })(t0); } }); }, { threshold: 0.5 }).observe(hv);
  var AR = ['COVERAGE', 'PROSPECTING', 'GROUPS AND RFPS', 'FRONT DESK', 'VISIBILITY AND SKILLS'];
  var CQ = [
    [0, 'Does someone work on selling your hotel every single week?'],
    [0, 'Would your pipeline survive if your best salesperson left tomorrow?'],
    [1, 'Do you have a written plan for proactive prospecting this quarter?'],
    [1, 'Do you research the real decision maker before reaching out?'],
    [2, 'Is your RFP plan ready before August?'],
    [2, 'Do new group leads get a reply the same day?'],
    [3, 'Does your front desk know how to spot a sales lead and pass it on?'],
    [3, 'Does most of your base business come from somewhere other than OTAs?'],
    [4, 'Can you see sales activity and pipeline whenever you want?'],
    [4, 'Has your sales team had modern sales training in the last 12 months?']
  ];
  var FIX = [
    ['Start with coverage.', 'Your biggest gap is consistent selling. A dedicated seller with a system behind them closes it fastest.', 'solutions'],
    ['Go on the hunt.', 'Waiting for the phone to ring won’t grow your base business. A proactive prospecting plan is your first fix.', 'solutions'],
    ['Get ahead of RFP season.', 'Most RFPs are won before they arrive. Start with the RFP season playbook and a plan for August.', 'solutions'],
    ['Turn your front desk into a sales team.', 'Leads walk in every day. A short Front Desk Sells course helps your team catch them.', 'training'],
    ['See it, then sharpen it.', 'Real-time visibility and modern training help your team sell with confidence.', 'training']
  ];
  var TIP = [
    'Someone sells your hotel every week, with a system behind them, so the pipeline never depends on one person.',
    'A written prospecting plan and real research on the decision maker before every first call.',
    'An RFP plan in place by August, and same-day replies to every group lead.',
    'A front desk that spots leads and passes them to sales the same day.',
    'A clear view of pipeline and activity, and training that matches today\u2019s buyer.'
  ];
  var ci = 0, cans = [];
  var scLi = $$('#scAreas li');
  function ckShow() {
    $('#ckN').textContent = 'QUESTION ' + (ci + 1) + ' OF ' + CQ.length; $('#ckBar').style.width = (ci / CQ.length * 100) + '%';
    $('#ckA').textContent = AR[CQ[ci][0]];
    var q = $('#ckQ'); q.textContent = CQ[ci][1]; q.classList.remove('sw'); void q.offsetWidth; q.classList.add('sw');
    scLi.forEach(function (l, k) { l.classList.toggle('on', k === CQ[ci][0]); });
  }
  function ckEnd() {
    $('#ckBar').style.width = '100%'; $('#ckN').textContent = 'YOUR REPORT'; $('#ckA').textContent = ''; $('#ckQ').hidden = true; $('.ck-btns').hidden = true; $('#ckRes').hidden = false;
    var area = [0, 0, 0, 0, 0]; cans.forEach(function (a, i) { area[CQ[i][0]] += a; });
    var tot = Math.round(cans.reduce(function (x, y) { return x + y; }, 0) / (CQ.length * 2) * 100);
    var low = 0; area.forEach(function (v, k) { if (v < area[low]) low = k; });
    scLi.forEach(function (l, k) { l.classList.remove('on'); l.classList.add('done'); l.querySelector('s').style.width = (area[k] / 4 * 100) + '%'; });
    var el = $('#ckScore'), t0 = performance.now(); el.dataset.v = tot; (function f(t) { var p = RM ? 1 : Math.min(1, (t - t0) / 1100); el.textContent = Math.round(tot * p); if (p < 1) requestAnimationFrame(f); })(t0);
    var fx = tot >= 85 ? ['Strong foundation. Let’s find the next level.', 'You have the basics in place. A conversation with Tammy’s team can show where the next opportunities are hiding.', 'solutions'] : FIX[low];
    $('#ckH').textContent = fx[0]; $('#ckP').textContent = fx[1]; $('#ckGo').dataset.pre = fx[2];
    $('#ckRep').innerHTML = AR.map(function (n, k) { var v = area[k], lv = v >= 4 ? 'STRONG' : v >= 2 ? 'BUILDING' : 'GAP'; return '<li class="' + lv.toLowerCase() + (k === low && tot < 85 ? ' first' : '') + '"><b>' + n + '</b><em>' + lv + '</em><span>' + (v >= 4 ? 'In place. Keep it there.' : 'What good looks like: ' + TIP[k]) + '</span></li>'; }).join('');
  }
  window.__demoScore = function () {
    $('#ckRe').click(); var A = [2, 1, 2, 0, 0, 1, 1, 2, 2, 1], i = 0;
    (function nx() { if (i >= A.length) { setTimeout(function () { var r = $('#ckRes'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 1400); return; } var b = $('.ck-btns button[data-a="' + A[i] + '"]'); if (b) { b.classList.add('tap'); setTimeout(function () { b.classList.remove('tap'); b.click(); i++; setTimeout(nx, 650); }, 350); } })();
  };
  $$('.ck-btns button').forEach(function (b) { b.addEventListener('click', function () { cans.push(+b.dataset.a); ci++; if (ci >= CQ.length) ckEnd(); else ckShow(); }); });
  $('#ckRe').addEventListener('click', function () { ci = 0; cans = []; $('#ckQ').hidden = false; $('.ck-btns').hidden = false; $('#ckRes').hidden = true; scLi.forEach(function (l) { l.classList.remove('done'); l.querySelector('s').style.width = '0'; }); ckShow(); });
  ckShow();
  (function () {
    var el = $('#rfpCd'); if (!el) return;
    var now = new Date(), y = now.getFullYear(), m = now.getMonth();
    if (m >= 7 || m === 0) { el.innerHTML = '<b>RFP SEASON IS ON</b><span>Most negotiations run August to January.</span>'; return; }
    var d = Math.ceil((new Date(y, 7, 1) - now) / 864e5);
    el.innerHTML = '<b>' + d + ' DAYS</b><span>until RFP season opens on August 1.</span>';
  })();
  $$('.num b').forEach(function (b) { if (!window.__cio) window.__cio =new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (!e.isIntersecting) return; o.unobserve(e.target); var b = e.target, n = +b.dataset.n, s = b.dataset.s || '', t0 = performance.now(); (function f(t) { var p = RM ? 1 : Math.min(1, (t - t0) / 1400); b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + s; if (p < 1) requestAnimationFrame(f); })(t0); }); }, { threshold: 0.6 }); window.__cio.observe(b); });
  var fmt = 'IN-PERSON WORKSHOP';
  $$('.fmt button').forEach(function (b) { b.addEventListener('click', function () { $$('.fmt button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); fmt = b.dataset.f; }); });
  $$('[data-talk]').forEach(function (a) { a.addEventListener('click', function () { var s = $('#talkSel'); $$('option', s).forEach(function (o) { if (o.textContent.indexOf(a.dataset.talk) === 0) s.value = o.textContent; }); }); });
  var art = $('#bookArt');
  if (matchMedia('(hover:hover)').matches) art.addEventListener('mousemove', function (e) { var r = art.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; $('img', art).style.transform = 'rotateY(' + (x * 26) + 'deg) rotateX(' + (-y * 14) + 'deg)'; });
  art.addEventListener('mouseleave', function () { $('img', art).style.transform = ''; });
  var br = $('#bulkR');
  function bulk() { $('#bulkO').textContent = br.value + ' COPIES'; }
  br.addEventListener('input', bulk); bulk();
  var OP = ['Real-time reporting and pipeline visibility show what’s working, where the opportunities are and where performance can improve.', 'Repeatable systems, proactive outreach and a structured process create performance that doesn’t depend on one salesperson.', 'AI-powered technology and data-driven insights help identify high-value relationships and qualified opportunities with greater precision.', 'Less time on research, admin and reactive tasks. More time prospecting, building relationships and closing.', 'A complete sales engine that drives proactive business development and grows with your portfolio.'];
  $$('#oneTabs button').forEach(function (b) { b.addEventListener('click', function () { $$('#oneTabs button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); $('#oneP').textContent = OP[+b.dataset.i]; }); });
  new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); }); }, { threshold: 0.4 }).observe($('.scr'));
  var vf = $$('#vq figure'), vi = 0, vt;
  function vgo(i) { vf[vi].classList.remove('on'); vi = (i + vf.length) % vf.length; vf[vi].classList.add('on'); $('#vqN').textContent = (vi + 1) + ' / ' + vf.length; clearInterval(vt); vt = setInterval(function () { vgo(vi + 1); }, 9000); }
  $('#vqP').addEventListener('click', function () { vgo(vi - 1); }); $('#vqN2').addEventListener('click', function () { vgo(vi + 1); });
  if (!RM) vt = setInterval(function () { vgo(vi + 1); }, 9000);
  var bq = $('#bq'), bs = $$('.bq-s', bq), bl = $$('#bsteps li'), bi = 0, hN = 1;
  function bshow() { bs.forEach(function (s, j) { s.classList.toggle('on', j === bi); }); bl.forEach(function (l, j) { l.classList.toggle('on', j === bi); l.classList.toggle('done', j < bi); }); $('#bqB').style.visibility = bi ? 'visible' : 'hidden'; $('#bqN').textContent = bi === bs.length - 1 ? 'SEND MY REQUEST' : 'NEXT'; $('#bqErr').textContent = ''; }
  function val(n) { return $$('[name=' + n + ']:checked', bq).map(function (x) { return x.value; }); }
  function preset(p) {
    var map = { solutions: 'Sales solutions', training: 'Sales training', book: 'Room to Grow team copies', gillisone: 'GillisOne demo', speaking: 'Speaking' };
    $$('[name=need]', bq).forEach(function (x) { x.checked = x.value === map[p]; });
    bi = 0; $('#bqDone').hidden = true; $('#bqNav').hidden = false; bshow();
  }
  $$('[data-pre]').forEach(function (a) { a.addEventListener('click', function () { preset(a.dataset.pre); }); });
  $('#hM').addEventListener('click', function () { hN = Math.max(1, hN - 1); $('#hN').textContent = hN; });
  $('#hP').addEventListener('click', function () { hN = Math.min(50, hN + 1); $('#hN').textContent = hN === 50 ? '50+' : hN; });
  $('#bqB').addEventListener('click', function () { if (bi > 0) { bi--; bshow(); } });
  $('#bqN').addEventListener('click', function () {
    var err = '';
    if (bi === 0 && !val('need').length) err = 'Pick at least one.';
    if (bi === 2 && !val('ch').length) err = 'Pick the closest one.';
    if (bi === 3 && !val('when').length) err = 'Pick a timeframe.';
    if (bi === 4) { var bad = $$('.bq-s.on input[required]', bq).filter(function (i) { return !i.checkValidity(); }); if (bad.length) { err = 'Add your name, a valid email and your hotel or company.'; bad[0].focus(); } }
    if (err) { $('#bqErr').textContent = err; return; }
    if (bi < bs.length - 1) { bi++; bshow(); return; }
    var need = val('need'), types = val('type'), sum = [];
    sum.push('<b>For:</b> ' + need.join(', ') + (need.indexOf('Sales training') > -1 ? ' (' + fmt.toLowerCase() + ')' : '') + (need.indexOf('Room to Grow team copies') > -1 ? ' (' + br.value + ' copies' + ($('#bulkW').checked ? ' + book-club workshop' : '') + ')' : ''));
    sum.push('<b>Hotels:</b> ' + (hN === 50 ? '50+' : hN) + (types.length ? ', ' + types.join(', ').toLowerCase() : '') + ', ' + val('where')[0]);
    sum.push('<b>Main challenge:</b> ' + val('ch')[0]);
    sum.push('<b>Start:</b> ' + val('when')[0].toLowerCase());
    sum.push('<b>Next step:</b> a short discovery call, then a tailored proposal for your market.');
    $('#bqSum').innerHTML = sum.join('').replace(/<b>/g, '<li><b>').replace(/(<li>.*?)(?=<li>|$)/g, '$1</li>');
    bs.forEach(function (s) { s.classList.remove('on'); }); bl.forEach(function (l) { l.classList.add('done'); l.classList.remove('on'); });
    $('#bqDone').hidden = false; $('#bqNav').hidden = true;
    var bf = { 'Request': $('#bqSum').innerText.replace(/\n+/g, ' | ') }; $$('.bq-s:last-child input, .bq-s input[type=email], .bq-s input[type=text], .bq-s input[type=tel], .bq-s textarea', bq).forEach(function (i) { if (i.value) bf[i.getAttribute('aria-label') || i.name || i.placeholder || 'detail'] = i.value; });
    (window.__send || function () {})('form: Build your quote', bf);
  });
  $('#bqRe').addEventListener('click', function () { bq.reset(); hN = 1; $('#hN').textContent = 1; preset(''); });
  bshow();
  (function () {
    var d = $('#dlg'); if (!d) return; var c = $('.dlg-c', d), last = null;
    function shut() { d.hidden = true; root.classList.remove('dlg-open'); if (last) last.focus(); }
    $$('[data-dlg]').forEach(function (b) { b.addEventListener('click', function () { var t = $('#dlg-' + b.dataset.dlg); if (!t) return; last = b; c.innerHTML = ''; c.appendChild(t.content.cloneNode(true)); bindForms(c); d.hidden = false; root.classList.add('dlg-open'); d.scrollTop = 0; $('.dlg-x', d).focus(); }); });
    $('.dlg-x', d).addEventListener('click', shut);
    d.addEventListener('click', function (e) { if (e.target === d) shut(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && !d.hidden) shut(); });
  })();
  var LEAD = location.pathname.replace(/[^/]*$/, '') + '_lead';
  function send(kind, fields) {
    var body = JSON.stringify({ kind: kind, page: location.pathname + location.hash, fields: fields || {} });
    try { if (kind.indexOf('tour') === 0 && navigator.sendBeacon) { navigator.sendBeacon(LEAD, new Blob([body], { type: 'application/json' })); return; } } catch (e) {}
    try { fetch(LEAD, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true, credentials: 'same-origin' }).catch(function () {}); } catch (e) {}
  }
  window.__send = send;
  function fieldsOf(f) {
    var o = {}, n = 0;
    $$('input,select,textarea', f).forEach(function (i) {
      if (i.type === 'submit' || i.type === 'button') return;
      if ((i.type === 'checkbox' || i.type === 'radio') && !i.checked) return;
      var k = i.getAttribute('aria-label') || i.name || i.placeholder || ('field ' + (++n));
      var lab = i.closest('label'); if (lab && !i.getAttribute('aria-label')) k = (lab.textContent || k).trim().slice(0, 50);
      o[k] = o[k] ? o[k] + ', ' + i.value : (i.type === 'checkbox' && i.value === 'on' ? 'yes' : i.value);
    });
    return o;
  }
  function bindForms(scope) { $$('form[data-ok]', scope).forEach(function (f) {
    if (f.__b) return; f.__b = 1;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var sec = f.closest('section,.nbar,.dlg'), fl = fieldsOf(f);
      if (f.classList.contains('ck-f')) { fl['Scorecard score'] = ($('#ckScore').dataset.v || $('#ckScore').textContent) + ' / 100'; fl['Scorecard report'] = $$('#ckRep li').map(function (l) { return l.querySelector('b').textContent + ': ' + l.querySelector('em').textContent; }).join(' | '); }
      var nm = sec && sec.classList.contains('dlg') ? ($('#dlgT') || {}).textContent : sec && (sec.getAttribute('aria-label') || sec.id); send('form: ' + (nm || 'form'), fl);
      var p = document.createElement('p'); p.className = 'ok-msg'; p.textContent = f.dataset.ok + ' (Concept preview: this goes to Chairlift for the demo, not to your team.)';
      if (f.classList.contains('nb-f')) { f.hidden = true; $('.nb-ok').hidden = false; return; }
      f.replaceWith(p);
    });
  }); }
  bindForms(document);
  if (EMBED) {
    window.__hl = function (sel) {
      var old = $('.tour-hl'); if (old) old.remove();
      var el = sel && $(sel); if (!el) return;
      var y = el.getBoundingClientRect().top + scrollY - (innerWidth < 760 ? 70 : 90);
      scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      var h = document.createElement('div'); h.className = 'tour-hl'; document.body.appendChild(h);
      (function f() { if (!h.isConnected) return; var r = el.getBoundingClientRect(), H = innerHeight; var t = Math.max(r.top - 6, 70), b = Math.min(r.bottom + 6, H - 6); if (b - t < 30) h.style.opacity = 0; else { h.style.opacity = 1; h.style.top = t + 'px'; h.style.left = Math.max(r.left - 6, 4) + 'px'; h.style.width = Math.min(r.width + 12, innerWidth - 8) + 'px'; h.style.height = (b - t) + 'px'; } requestAnimationFrame(f); })();
    };
    return;
  }
  addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); window.__bip = e; });
  var BOOK = 'https://usechairlift.com/5min';
  var S = [
    { t: 'Before anything else', w: 'You teach hotels to stop pitch slapping, so this isn’t a pitch. We’re Chairlift. We help busy teams escape death by 1,000 tabs, so the work sits in one place and people get their time back. Here’s what we noticed on your site, a few ideas built from your own book and talks, and a couple of questions. Keep what’s useful.', y: 'About five minutes. Pause, go back or skip at any time.', s: 'Gillis Sales Podcast, “Stop Pitch Slapping Your Clients” (Oct 30, 2019)', el: '#top' },
    { t: 'Your buyer has changed', w: 'You’ve said the modern buyer no longer needs a salesperson for information. Your own buyers too: a GM or owner reads your site before they ever talk to you. A question for you: when a GM lands here late at night, how do they know which service is for them?', y: 'Everything that follows is built for that reader.', s: 'Gillis Sales press releases, “Selling to the Modern Buyer”', el: '#top' },
    { t: 'Your opening line, kept', w: '“Sales should never be left to chance” is your strongest line and the title of your book. It now opens the page, over your own film.', y: 'Visitors hear you in the first five seconds, before they read anything.', s: 'gillissales.com; Room to Grow (Page Two, 2021)', el: '#reel' },
    { t: 'Two clear next steps', w: 'Build your quote and Get in touch sit side by side at the top, and stay at the bottom of a phone screen the whole way down.', y: 'Fewer choices, more enquiries. Today a visitor has to hunt for the Contact page.', s: 'Your contact page and its form', el: '#heroBtns' },
    { t: 'Five ways in', w: 'You earn in five ways: sales solutions, training, speaking, the book and GillisOne. Each lived on its own page, so a GM had to open five tabs to see what you do. Now one list near the top lets each buyer pick their door.', y: 'An owner, a director of sales and an event planner each find their way in on the first screen.', s: 'Your site navigation', el: '#ways' },
    { t: 'One look, light or dark', w: 'Your current site jumps between white and dark blocks. Now it is one continuous look in your own colours, with a light and a dark version (the switch is at the top).', y: 'A consistent look reads as premium and keeps people scrolling.', s: 'Colours taken straight from your logo file', el: '#system' },
    { t: 'Try it: the Hotel Sales Scorecard', act: '__demoScore', dw: 24000, w: 'Watch a hotel take it now. Ten quick questions across five areas: coverage, prospecting, groups and RFPs, front desk, and visibility and skills. In about a minute they get a score, a report by area and the first thing to fix.', y: 'You teach that the seller’s job is to bring insight the buyer can’t get alone. This starts the first conversation with their situation, not your pitch: a relevant business conversation. And the best sales teams don’t chase, they notice. Chairlift reads the small signals from prospects and clients, a visit, a question, a quiet week, and nudges the right next step before the moment passes.', s: 'Podcast Ep. 1; Room to Grow; your contact form’s challenges', el: '#check' },
    { t: 'Your system, side by side', w: 'Your strongest argument is one salesperson versus a sales system. Visitors now drag a line to compare the two, in your own words.', y: 'It shows the difference instead of only saying it.', s: 'Your Sales Solutions page', el: '#halves' },
    { t: 'Your proof, up front', w: 'The numbers you already publish, plus the results you announced: $23M in actual revenue for clients in 2021 and 40% more new business.', y: 'Proof works best before the ask, not buried in a press room.', s: 'Your homepage and About page; Gillis Sales announcement, March 16, 2022', el: '#numbers' },
    { t: 'Training as its own product', w: 'Workshops, webinars and keynotes to choose from, the outcomes, and a Plan a training button.', y: 'Training becomes a sales line of its own, not a link in a menu.', s: 'Your Sales Training page', el: '#training' },
    { t: 'New: three more ways to learn', w: 'Gillis Certified for management companies, a short Front Desk Sells course, and a free monthly sales hour with you.', y: 'Room to Grow calls the front desk your most valuable business development tool. Certification gives portfolios a reason to train every team, every year.', s: 'Room to Grow; other hotel sales trainers run monthly webcasts and certify teams', el: '#paths' },
    { t: 'Book Tammy to speak', w: 'Your three talks side by side, each with what the room leaves with in your words, and a form that asks for the date first.', y: 'Event planners decide faster when they can see the outcome and check your date.', s: 'Your Speaking page', el: '#speaking' },
    { t: 'Room to Grow, for whole teams', w: 'Amazon links stay, and a team-copies option sits right beside them.', y: 'A hotel group buying copies for its sales team is a bigger order, and often leads to training.', s: 'Your Room to Grow page', el: '#book' },
    { t: 'New: the RFP season playbook', w: 'A countdown to August, the season month by month, and a playbook download with a live kickoff each August.', y: 'Your advice is to be proactive, not passive, and most negotiations run August to January. This puts you in their inbox right when it matters.', s: 'Gillis Sales Podcast, “RFP Best Practices for Best Results” (Nov 20, 2019)', el: '#rfp' },
    { t: 'GillisOne, shown', w: 'GillisOne gets its own stage: your five benefits with your titles unchanged, a sample screen and a demo request.', y: 'A GM can picture using it before asking for a demo.', s: 'Your GillisOne section and FAQ', el: '#gillisone' },
    { t: 'Your clients, in their words', w: 'Your four client quotes, unchanged and big enough to read on a phone.', y: 'Real names from real hotel companies carry more weight than anything we could write.', s: 'Your Testimonials page', el: '#voices' },
    { t: 'New: owners’ associations and referrals', w: 'Your IHG Owners Association partnership gets a page, with a way for other associations and brands to ask for a member offer. Below it, clients can introduce a fellow owner.', y: 'One association conversation can reach many hotels at once, and happy clients are your best introductions.', s: 'Gillis Sales announcement, February 2022', el: '#partners' },
    { t: 'An idea: your teaching, as an academy', w: 'You’ve already taught a full program across your book, talks, podcast and interviews. Picture a members’ academy in your brand: hotel teams learning your way of selling in short lessons, led by you.', y: 'Hotels that aren’t ready for managed sales can still start with your system, and your best ideas keep working when you’re not in the room.', s: 'Concept only: what your members would see', el: '#academy' },
    { t: 'What it could open up', w: 'Members who learn on their own time, hotel teams learning together, one-on-one time with you, and workshops that lead into your training. A question for you: which of these would your clients actually say yes to?', y: 'New ways to earn from work you’ve already done.', s: 'A concept to react to. How it would be built and run is something we’d walk through together', el: '#academy' },
    { t: 'Gillis Sales Insights, in their inbox', w: 'Your Insights button only leads to LinkedIn today. Here it becomes a monthly email with one good idea, plus an RFP-season edition.', y: 'A list you own, so every new talk, course or offer has somewhere to go.', s: 'Your homepage Insights section', el: '#insights' },
    { t: 'Build your quote', w: 'Five quick questions that land as a ready brief in your inbox.', y: 'Your team walks into the first meeting prepared, which is exactly what you ask of sellers.', s: 'The options on your current contact form', el: '#build' },
    { t: 'Your takeaway: room to grow, together', recap: ['A clearer path for hotels to find, try and book Gillis training.', 'New ways to earn between engagements: the scorecard, the programs, the monthly hour and the academy.', 'Every lead in one place, followed up the same day.'], w: 'That’s the whole idea behind Chairlift: no more death by 1,000 tabs, for your buyers or your team. You teach that sales should be proactive, not passive. So here is ours: 15 minutes to hear what you would keep, what you would change, and whether it is worth building together.', y: 'Pick a time that suits you. No slides and no pressure. Ryan will walk you through it live.', s: 'Ryan, Chairlift', el: '#contact', cta: true, dw: 30000 }
  ];
  var DW = 13500, ovl = null, fr = null, bar = null, timer = 0, idx = 0, mode = 'play', tbhMax = 0;
  function mk(h) { var d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstChild; }
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var I = { back: '<svg viewBox="0 0 24 24"><path d="M6 5h2.5v14H6zM20 5v14L9.5 12z"/></svg>', next: '<svg viewBox="0 0 24 24"><path d="M15.5 5H18v14h-2.5zM4 5v14l10.5-7z"/></svg>', pause: '<svg viewBox="0 0 24 24"><path d="M6 4h4.5v16H6zM13.5 4H18v16h-4.5z"/></svg>', play: '<svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>', list: '<svg viewBox="0 0 24 24"><path d="M4 6h16v2.5H4zM4 10.8h16v2.5H4zM4 15.5h16V18H4z"/></svg>', x: '<svg viewBox="0 0 24 24"><path d="M5.6 4 12 10.4 18.4 4 20 5.6 13.6 12 20 18.4 18.4 20 12 13.6 5.6 20 4 18.4 10.4 12 4 5.6z"/></svg>' };
  function vb(a, l, c) { return '<button type="button" class="vb' + (c ? ' ' + c : '') + '" data-a="' + a + '" aria-label="' + l + '">' + I[a === 'resume' ? 'play' : a] + '</button>'; }
  var maxI = -1, sentOpen = false, lastRep = -1;
  function report() { if (maxI <= lastRep) return; lastRep = maxI; (window.__send || function () {})('tour-progress', { 'Reached step': (maxI + 1) + ' of ' + S.length, 'Furthest step': S[maxI].t, 'Booking button shown': maxI === S.length - 1 ? 'yes' : 'no' }); }
  addEventListener('pagehide', report);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') report(); });
  function open() {
    if (ovl) return;
    if (!sentOpen) { sentOpen = true; (window.__send || function () {})('tour-open', { 'Device': innerWidth < 760 ? 'phone' : 'computer', 'Theme': theme() }); }
    ovl = mk('<div class="tourov" id="tourov"><iframe title="Site tour" src="' + location.pathname + '?embed=1&theme=' + theme() + '"></iframe><div class="tvglass"></div><div class="tvtag">CONCEPT BY CHAIRLIFT</div></div>');
    if (!RM) ovl.appendChild($('#doorScene').content.cloneNode(true));
    document.body.appendChild(ovl); fr = $('iframe', ovl); root.classList.add('tourlock');
    var ready = false, waited = false;
    fr.addEventListener('load', function () { ready = true; if (waited) go(0, 'play'); });
    setTimeout(function () { waited = true; if (ready) go(0, 'play'); }, RM ? 100 : 3500);
    setTimeout(function () { var t = $('.dr', ovl); if (t) t.remove(); }, 4200);
  }
  function close() { report(); clearTimeout(timer); if (ovl) { ovl.remove(); ovl = null; bar = null; } root.classList.remove('tourlock'); }
  function go(i, m) {
    clearTimeout(timer); idx = i; mode = m; if (i > maxI) maxI = i; draw();
    try { fr.contentWindow.__hl(S[i].el); if (S[i].act) setTimeout(function () { try { fr.contentWindow[S[i].act](); } catch (e) {} }, 1600); } catch (e) {}
    if (mode === 'play') { var tp = $('.tbp', bar); tp.style.transitionDuration = (S[idx].dw || DW) + 'ms'; requestAnimationFrame(function () { requestAnimationFrame(function () { tp.classList.add('run'); }); }); timer = setTimeout(function () { if (idx + 1 >= S.length) { mode = 'browse'; draw(); } else go(idx + 1, 'play'); }, S[idx].dw || DW); }
  }
  function draw() {
    var s = S[idx];
    var btns = '<div class="tvcr">' + (idx > 0 ? vb('back', 'Back') : '<span class="vb off"></span>') + (mode === 'play' ? vb('pause', 'Pause', 'main') : vb('resume', 'Play', 'main')) + (idx < S.length - 1 ? vb('next', 'Next') : '<span class="vb off"></span>') + '</div><div class="tvx">' + vb('list', 'See all') + vb('x', 'Exit') + '</div>';
    var cta = s.cta ? '<a class="tbook" href="' + BOOK + '" target="_blank" rel="noopener">BOOK 15 MINUTES</a><span class="tinst"><b>Keep this tour on your phone</b>' + (window.__bip ? '<button type="button" class="tinst-b" data-a="install">ADD TO HOME SCREEN</button>' : '') + '<span>iPhone: tap Share, then Add to Home Screen.</span><span>Android: tap the menu, then Add to Home screen or Install app.</span></span>' : '';
    var rc = s.recap ? '<ol class="trecap">' + s.recap.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ol>' : '';
    place('<aside class="tbar" role="region" aria-label="Site walkthrough"><div class="tbp"></div><div class="tbr"><div class="tbt"><span class="tbn">IDEAS FOR GILLIS \u00b7 ' + (idx + 1) + ' OF ' + S.length + '</span><b>' + esc(s.t) + '</b>' + rc + '<span class="tbx">' + emph(s.w) + '</span><span class="tbo"><em>' + (s.cta ? 'NEXT STEP' : 'WHY IT MIGHT HELP') + '</em>' + emph(s.y) + '</span><span class="tbs"><em>SOURCE</em>' + esc(s.s) + '</span>' + cta + '</div><div class="tbb">' + btns + '</div></div></aside>');
  }
  function emph(x) { return esc(x).replace(/death by 1,000 tabs/g, '<i>$&</i>'); }
  function list() {
    clearTimeout(timer); mode = 'done';
    var items = S.map(function (s, i) { return '<a href="#" data-i="' + i + '"><span>' + pad(i + 1) + '</span>' + esc(s.t) + '</a>'; }).join('');
    place('<aside class="tbar" role="region" aria-label="Site tour"><div class="tbr"><div class="tbt"><span class="tbn">THAT’S THE TOUR</span><b>Pick any part to take a closer look</b><a class="tbook" href="' + BOOK + '" target="_blank" rel="noopener">BOOK 15 MINUTES</a></div><div class="tbb"><button type="button" class="txt go" data-a="replay">PLAY AGAIN</button><button type="button" class="txt" data-a="x">CLOSE</button></div></div><div class="tbl">' + items + '</div></aside>');
  }
  function place(h) {
    if (bar) bar.remove(); bar = mk(h); ovl.appendChild(bar);
    tbhMax = Math.max(tbhMax, bar.offsetHeight); bar.style.minHeight = tbhMax + 'px'; ovl.style.setProperty('--tbh', tbhMax + 'px');
    bar.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a],a[data-i]'); if (!a) return; e.preventDefault();
      if (a.dataset.i !== undefined) return go(+a.dataset.i, 'browse');
      var k = a.dataset.a;
      if (k === 'x') close(); else if (k === 'pause') { clearTimeout(timer); mode = 'browse'; draw(); }
      else if (k === 'next') go(idx + 1, mode === 'play' ? 'play' : 'browse'); else if (k === 'back') go(Math.max(0, idx - 1), mode === 'play' ? 'play' : 'browse');
      else if (k === 'resume') go(idx, 'play'); else if (k === 'list') list(); else if (k === 'replay') go(0, 'play');
      else if (k === 'install' && window.__bip) { try { window.__bip.prompt(); } catch (e) {} window.__bip = null; }
    });
  }
  $('#tourbtn').addEventListener('click', open);
  $('#tourStart').addEventListener('click', function (e) { e.preventDefault(); open(); });
  if (TOUR) { try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {} setTimeout(open, seen ? 600 : 2500); }
})();
