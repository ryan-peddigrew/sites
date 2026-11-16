/* Aventus Investigations: concept by Chairlift. (c) 2026 Chairlift. Not for reuse or distribution. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var Q = new URLSearchParams(location.search);
  var TOUR = Q.get('tour') === '1';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== watermark (prominent, tiled) ===== */
  (function () {
    var T = 'CONCEPT  ·  DESIGNED AND POWERED BY CHAIRLIFT';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="820" height="360"><g transform="rotate(-22 410 180)" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="17" letter-spacing="2.4">' +
      '<text x="60" y="130" fill="#ffffff" fill-opacity=".34" stroke="#0b1018" stroke-opacity=".30" stroke-width="2.2" paint-order="stroke">' + T + '</text>' +
      '<text x="-350" y="310" fill="#ffffff" fill-opacity=".34" stroke="#0b1018" stroke-opacity=".30" stroke-width="2.2" paint-order="stroke">' + T + '</text></g></svg>';
    $('#wm').style.backgroundImage = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  })();

  /* ===== anti-copying ===== */
  document.addEventListener('contextmenu', function (e) { if (!e.target.closest('input,textarea')) e.preventDefault(); });
  document.addEventListener('dragstart', function (e) { if (e.target.tagName === 'IMG') e.preventDefault(); });
  document.addEventListener('copy', function (e) {
    if (e.target.closest && e.target.closest('input,textarea')) return;
    e.preventDefault();
    if (e.clipboardData) e.clipboardData.setData('text/plain', 'Concept preview designed and powered by Chairlift. Not for reuse.');
  });
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === 's' || k === 'u' || k === 'p')) e.preventDefault();
  });

  /* ===== loader (from the real logo) ===== */
  var loader = $('#loader');
  function dropLoader() { loader.classList.add('out'); setTimeout(function () { loader.classList.add('gone'); }, 1000); }
  var seen = false; try { seen = sessionStorage.getItem('av_ld') === '1'; sessionStorage.setItem('av_ld', '1'); } catch (e) {}
  if (RM || seen) { loader.classList.add('gone'); } else { setTimeout(dropLoader, TOUR ? 1500 : 2100); }

  /* ===== quick exit ===== */
  function bail() { try { history.replaceState(null, '', '/'); } catch (e) {} location.replace('https://www.google.ca/search?q=weather+toronto'); }
  $('#qexit').addEventListener('click', bail);
  var escN = 0, escT; document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { escN++; clearTimeout(escT); escT = setTimeout(function () { escN = 0; }, 800); if (escN >= 2) bail(); } });

  /* ===== header + menu + dock ===== */
  var hdr = $('#hdr'), dock = $('#dock');
  function onScroll() {
    var y = scrollY;
    hdr.classList.toggle('solid', y > 40);
    dock.classList.toggle('show', y > innerHeight * 0.7 && !nearBuild());
  }
  function nearBuild() { var b = $('#build').getBoundingClientRect(), c = $('#contact').getBoundingClientRect(); return (b.top < innerHeight && b.bottom > 0) || (c.top < innerHeight * 0.6); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var menu = $('#menu'), burger = $('#burger');
  function setMenu(o) { menu.hidden = !o; burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; }
  burger.addEventListener('click', function () { setMenu(menu.hidden); });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* ===== hero: rotating line + slow photo change ===== */
  var lines = ['ON A PARTNER YOU DOUBT.', "ON A CLAIM THAT DOESN'T ADD UP.", "ON SOMEONE WHO'S HARD TO FIND.", "FOR YOUR CHILD'S SAKE.", 'WITHOUT ANYONE KNOWING.'];
  var rot = $('#rot'), li = 0;
  function typeLine(t) {
    rot.innerHTML = '';
    t.split(' ').forEach(function (w, wi) {
      var s = document.createElement('span'); s.className = 'ch'; s.style.animationDelay = (wi * 70) + 'ms'; s.textContent = w; rot.appendChild(s); rot.appendChild(document.createTextNode(' '));
    });
  }
  var hsv = $$('.hero-svc a'), MAPI = [1, 3, 4, 2, 0];
  function markSvc() { hsv.forEach(function (a, ai) { a.classList.toggle('on', ai === MAPI[li]); }); }
  markSvc();
  if (!RM) setInterval(function () { li = (li + 1) % lines.length; typeLine(lines[li]); markSvc(); }, 3200);
  hsv.forEach(function (a) { a.addEventListener('click', function () { showSvc(+a.dataset.i); }); });
  var hms = $$('.hm'), hi = 0;
  if (!RM) setInterval(function () {
    hms[hi].classList.remove('on'); hi = (hi + 1) % hms.length;
    var im = hms[hi].querySelector('img'); im.style.animation = 'none'; void im.offsetWidth; im.style.animation = '';
    hms[hi].classList.add('on');
  }, 7000);

  /* ===== services ===== */
  var SV = [
    { t: 'Surveillance', img: 'tail', h: 'SURVEILLANCE THAT HOLDS UP.', p: 'Movements, activities and meetings, documented with notes, photos and video where appropriate. Planned around the subject’s schedule and locations so it stays unnoticed.',
      l: ['Infidelity and relationship concerns', 'Custody and family-law disputes', 'WSIB and insurance claim checks', 'Employee misconduct', 'Civil litigation support', 'Cohabitation investigations'] },
    { t: 'Infidelity', img: 'camera', h: 'REPLACE SUSPICION WITH FACTS.', p: 'If something doesn’t feel right, you deserve to know what’s actually happening. We find out quietly, with no confrontation and no speculation, so you can decide what comes next.',
      l: ['Discreet physical surveillance', 'Photo and video documentation', 'Social media review', 'Open-source research', 'Movement and activity timelines', 'A clear written report'] },
    { t: 'Child custody or family law', img: 'talk', h: 'WHEN A CHILD’S WELL-BEING IS IN QUESTION.', p: 'Objective, lawfully gathered facts about parenting time, living arrangements or a child’s safety. Handled with discretion and compassion, and ready to hand to your lawyer.',
      l: ['Parenting time and access', 'Cohabitation and relationships', 'Background searches', 'Child safety concerns', 'Discreet surveillance', 'Reports for your legal team'] },
    { t: 'Corporate or WSIB', img: 'towers', h: 'PROTECT THE BUSINESS. QUIETLY.', p: 'Evidence-based work on questionable claims, suspected fraud and workplace misconduct, done without disrupting your operations or drawing attention.',
      l: ['Claimant surveillance', 'Employee activity', 'Background investigations', 'Activity and lifestyle documentation', 'Employment and income inquiries', 'Interviews and open-source research'] },
    { t: 'Skip trace or locate', img: 'crowd', h: 'FIND THE PERSON. MOVE THE FILE.', p: 'People move, change numbers or avoid contact. We locate tenants, debtors, witnesses and defendants for LTB, Small Claims and civil files, and help reconnect families with someone they’ve lost touch with.',
      l: ['Former tenants for the LTB', 'Defendants and respondents', 'Witnesses and plaintiffs', 'Service of legal documents', 'Missing family and old friends', 'Asset and property searches'] }
  ];
  var stage = $('#svcStage');
  function showSvc(i) {
    var s = SV[i];
    $$('.svc-list button').forEach(function (b, bi) { b.setAttribute('aria-selected', bi === i); });
    stage.innerHTML = '<article class="svc-card"><picture><source media="(max-width:760px)" srcset="img/' + s.img + '-m.webp"><img src="img/' + s.img + '.webp" alt=""></picture>' +
      '<h3>' + s.h + '</h3><p>' + s.p + '</p><ul>' + s.l.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<a class="btn" href="#build" data-svc="' + s.t + '">START A CASE ABOUT THIS</a></article>';
  }
  $$('.svc-list button').forEach(function (b) { b.addEventListener('click', function () { showSvc(+b.dataset.i); if (innerWidth < 900) stage.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }); });
  showSvc(0);

  /* ===== process: light steps as they pass ===== */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('lit'); }); }, { rootMargin: '0px 0px -35% 0px' });
  $$('.step').forEach(function (s) { io.observe(s); });

  /* ===== reviews (real Google reviews from the current site) ===== */
  var RV = [
    { q: 'I had the pleasure of dealing with Anthony for a very sensitive and personal matter. He was extremely helpful and understanding. My case was handled with care and I was offered precise and timely results within 1 business day.', n: 'NASREEN A.' },
    { q: 'From our very first conversation (thanks for not judging me for crying!), he was compassionate, understanding, and made me feel at ease right away. He kept me updated throughout the process, left no detail unchecked, and ultimately gave me the clarity I needed to move forward.', n: 'ASHLEY HARRISON' },
    { q: 'If you’re in need of a professional, confidential, and prompt private investigator, Aventus Investigations is the top choice. Their team is discreet and thorough, ensuring every detail is handled with care and expertise.', n: 'MARIOS GEKOPOULOS' },
    { q: 'Anthony and his team were very thorough in their investigation. They kept us in the loop every step of the way. They went over and beyond.', n: 'HONEYDOPAINTING' }
  ];
  var rs = $('#revStage'), rb = $('#revBars'), ri = 0, rt;
  rb.innerHTML = RV.map(function () { return '<i></i>'; }).join('');
  function showRev(i) {
    ri = (i + RV.length) % RV.length;
    rs.innerHTML = '<figure class="rq"><blockquote>“' + RV[ri].q + '”</blockquote><figcaption>' + RV[ri].n + '<span>Posted on Google</span></figcaption></figure>';
    $$('i', rb).forEach(function (b, bi) { b.className = bi < ri ? 'done' : bi === ri ? 'on' : ''; });
    clearTimeout(rt); if (!RM) rt = setTimeout(function () { showRev(ri + 1); }, 8000);
  }
  $('#revPrev').addEventListener('click', function () { showRev(ri - 1); });
  $('#revNext').addEventListener('click', function () { showRev(ri + 1); });
  showRev(0);

  /* ===== areas map: real places, highways, marker types ===== */
  var AR = [
    ['Toronto', -79.383, 43.653, 'r'], ['North York', -79.413, 43.770, 'b'], ['Scarborough', -79.231, 43.773, 'r'], ['Vaughan', -79.509, 43.838, 'b'],
    ['Richmond Hill', -79.437, 43.882, 't'], ['Markham', -79.263, 43.856, 't'], ['Pickering', -79.089, 43.838, 'b'], ['Ajax', -79.032, 43.851, 't'],
    ['Whitby', -78.943, 43.897, 't'], ['Oshawa', -78.865, 43.897, 'b']
  ];
  /* Past case areas: general areas only, never addresses. Anthony adds these, e.g. ['Ajax', -79.03, 43.85]. */
  var CASES = [];
  var NOTE = { Ajax: 'Where we work out of: 40 Hunt Street, Suite 207. Surveillance, family, corporate and locate work across the GTA and Southern Ontario.' };
  function X(lon) { return Math.round((lon + 79.62) * 1097); } function Y(lat) { return Math.round((44.02 - lat) * 1520); }
  function line(pts) { return pts.map(function (q, i) { return (i ? 'L' : 'M') + X(q[0]) + ' ' + Y(q[1]); }).join(' '); }
  var shore = [[-79.66, 43.575], [-79.52, 43.61], [-79.45, 43.625], [-79.38, 43.635], [-79.32, 43.655], [-79.25, 43.69], [-79.17, 43.74], [-79.10, 43.79], [-79.03, 43.815], [-78.95, 43.845], [-78.87, 43.862], [-78.76, 43.87]];
  var HW = [
    ['401', [[-79.66, 43.69], [-79.50, 43.72], [-79.40, 43.735], [-79.30, 43.765], [-79.20, 43.79], [-79.10, 43.828], [-79.03, 43.858], [-78.95, 43.877], [-78.86, 43.893], [-78.76, 43.905]], [-79.27, 43.776]],
    ['407', [[-79.66, 43.765], [-79.50, 43.805], [-79.40, 43.848], [-79.30, 43.872], [-79.20, 43.893], [-79.08, 43.915], [-78.95, 43.935], [-78.76, 43.95]], [-79.12, 43.913]],
    ['404', [[-79.35, 43.70], [-79.37, 43.80], [-79.40, 43.95]], [-79.385, 43.93]],
    ['400', [[-79.53, 43.72], [-79.545, 43.85], [-79.55, 43.95]], [-79.55, 43.93]]
  ];
  var EYE = 'M-15 0Q0-12 15 0Q0 12-15 0Z';
  var map = $('#map');
  map.setAttribute('viewBox', '0 100 900 540');
  var g = '<defs><linearGradient id="sw" x1="0" x2="1"><stop offset="0" stop-color="#E6CB86" stop-opacity="0"/><stop offset="1" stop-color="#E6CB86" stop-opacity=".28"/></linearGradient>' +
    '<clipPath id="mc"><rect x="0" y="100" width="900" height="540"/></clipPath></defs><g clip-path="url(#mc)">' +
    '<path class="lake" d="' + line(shore) + ' L 900 700 L 0 700 Z"/><path class="shore" d="' + line(shore) + '"/>';
  HW.forEach(function (h) { var lx = X(h[2][0]), ly = Y(h[2][1]); g += '<path class="hwy" d="' + line(h[1]) + '"/><g class="hwl"><rect x="' + (lx - 26) + '" y="' + (ly - 15) + '" width="52" height="30" rx="3"/><text x="' + lx + '" y="' + (ly + 7) + '" text-anchor="middle">' + h[0] + '</text></g>'; });
  g += '<text class="lake-l" x="560" y="560">LAKE ONTARIO</text>';
  var ox = X(-79.032), oy = Y(43.851);
  g += '<g class="sweep" style="transform-origin:' + ox + 'px ' + oy + 'px"><path d="M' + ox + ' ' + oy + ' L' + (ox + 700) + ' ' + (oy - 120) + ' A 710 710 0 0 1 ' + (ox + 700) + ' ' + (oy + 120) + ' Z" fill="url(#sw)"/></g>';
  AR.forEach(function (a, i) {
    var x = X(a[1]), y = Y(a[2]), off = a[0] === 'Ajax', lx = x, ly = y, anc = 'middle';
    if (a[3] === 'r') { lx = x + 26; ly = y + 10; anc = 'start'; }
    if (a[3] === 't') { ly = y - 24; }
    if (a[3] === 'b') { ly = y + 40; }
    g += '<g class="pt ' + (off ? 'office' : 'area') + '" data-i="' + i + '" data-k="' + (off ? 'office' : 'area') + '" tabindex="0" role="button" aria-label="' + a[0] + '" style="--d:' + (i * 0.37).toFixed(2) + 's">' +
      (off ? '<circle class="ring" cx="' + x + '" cy="' + y + '" r="16"/><circle class="ring r2" cx="' + x + '" cy="' + y + '" r="16"/>' : '') +
      '<circle class="h" cx="' + x + '" cy="' + y + '" r="34"/>' +
      '<g class="eye" transform="translate(' + x + ' ' + y + ') scale(' + (off ? 1.45 : 1) + ')"><path d="' + EYE + '"/><circle r="4.6"/></g>' +
      '<text class="lab" x="' + lx + '" y="' + ly + '" text-anchor="' + anc + '">' + a[0] + '</text></g>';
  });
  CASES.forEach(function (c) { var x = X(c[1]), y = Y(c[2]); g += '<g class="pt case" data-k="case"><g transform="translate(' + x + ' ' + y + ')"><circle cx="-7" r="7"/><circle cx="7" r="7"/><rect x="-3" y="-4" width="6" height="5"/></g></g>'; });
  g += '</g>';
  map.innerHTML = g;
  $('#areaChips').innerHTML =
    '<button type="button" data-f="all" aria-pressed="true">ALL</button>' +
    '<button type="button" data-f="office" aria-pressed="false"><svg viewBox="-17 -13 34 26"><path d="' + EYE + '"/><circle r="4.6"/></svg>WHERE WE WORK OUT OF</button>' +
    '<button type="button" data-f="area" aria-pressed="false"><svg class="o" viewBox="-17 -13 34 26"><path d="' + EYE + '"/><circle r="4.6"/></svg>ACTIVE AREAS</button>' +
    '<button type="button" data-f="case" aria-pressed="false"><svg class="b" viewBox="-16 -9 32 18"><circle cx="-7" r="7"/><circle cx="7" r="7"/></svg>PAST CASES</button>';
  $$('#areaChips button').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.f;
      $$('#areaChips button').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      map.setAttribute('data-f', f);
      if (f === 'case' && !CASES.length) $('#areaCard').innerHTML = '<h3>PAST CASES</h3><p>Anthony adds the general areas of closed cases here (never addresses), so visitors see where Aventus has already worked.</p>';
      else if (f === 'office') showArea(7);
    });
  });
  function showArea(i) {
    $$('.pt', map).forEach(function (p) { p.classList.toggle('on', +p.dataset.i === i); });
    var n = AR[i][0];
    $('#areaCard').innerHTML = '<h3>' + n.toUpperCase() + (n === 'Ajax' ? ' · OFFICE' : ' · ACTIVE') + '</h3><p>' + (NOTE[n] || 'Surveillance, infidelity, custody, WSIB and corporate investigations, skip trace and locates in ' + n + ' and nearby.') + '</p>';
  }
  $$('.pt[data-i]', map).forEach(function (p) {
    p.addEventListener('click', function () { showArea(+p.dataset.i); });
    p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showArea(+p.dataset.i); } });
  });
  showArea(7);

  /* ===== build your quote ===== */
  var bq = $('#bq'), step = 1, N = 5, data = {};
  $$('.chips', bq).forEach(function (c) {
    var one = c.hasAttribute('data-one');
    $$('button', c).forEach(function (b) {
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        if (one) $$('button', c).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', one ? 'true' : String(b.getAttribute('aria-pressed') !== 'true'));
        if (one && step < N) setTimeout(function () { go(step + 1); }, 220);
      });
    });
  });
  function vals(name) { return $$('.chips[data-name="' + name + '"] button[aria-pressed=true]', bq).map(function (b) { return b.textContent; }); }
  function ok(s) {
    if (s === 1) return vals('service').length; if (s === 2) return vals('area').length; if (s === 3) return vals('timing').length;
    if (s === 5) return bq.name.value.trim() && bq.reach.value.trim();
    return true;
  }
  function go(s) {
    if (s > step && !ok(step)) { bq.classList.remove('shake'); void bq.offsetWidth; bq.classList.add('shake'); return; }
    if (s > N) return finish();
    step = Math.max(1, s);
    $$('.bq-s', bq).forEach(function (f) { f.classList.toggle('on', +f.dataset.s === step); });
    $('#bqN').textContent = 'STEP ' + step + ' OF ' + N; $('#bqBar').style.width = (step / N * 100) + '%';
    $('#bqBack').disabled = step === 1; $('#bqNext').textContent = step === N ? 'REVIEW REQUEST' : 'NEXT';
  }
  function finish() {
    var rows = [['ABOUT', vals('service')], ['WHERE', vals('area')], ['WHEN', vals('timing')], ['YOU HAVE', vals('have')], ['NAME', [bq.name.value]], ['REACH', [bq.reach.value]], ['SAFE', vals('safe')]];
    var svc = (vals('service')[0] || 'Not sure yet'), when = vals('timing')[0] || '';
    var PLAN = {
      'Surveillance': 'Planned surveillance sessions around the subject\u2019s routine, with a written report after each.',
      'Infidelity': 'A consultation, then targeted surveillance on the days that matter most, with photo and video where appropriate.',
      'Child custody or family law': 'Documented observation of parenting time or living arrangements, reported in a form your lawyer can use.',
      'Corporate or WSIB': 'Claimant or employee activity checks, background research and an evidence-ready report.',
      'Skip trace or locate': 'Database, public-record and open-source research to confirm a current address and contact details.',
      'Countersurveillance (TSCM)': 'A sweep of the home, office or vehicle, plus physical countersurveillance if needed.',
      'Background check': 'Identity, history and public-record research, summarised in a short written report.',
      'Not sure yet': 'A free, confidential consultation to work out the right approach first.'
    };
    var fixed = ['Skip trace or locate', 'Background check', 'Countersurveillance (TSCM)', 'Surveillance'].indexOf(svc) > -1;
    $('#bqEst').innerHTML = '<b>LIKELY APPROACH</b><p>' + PLAN[svc] + '</p>' +
      '<b style="margin-top:12px">YOUR QUOTE</b><p>' + (fixed ? 'Set-scope service: from $&mdash; with a deposit to hold your dates.' : 'Custom quote from Anthony within one business day' + (when === 'As soon as possible' ? ', sooner for urgent files.' : '.')) + '</p>' +
      '<p class="ph">Concept: prices and deposits are placeholders for Aventus to set.</p>';
    $('#bqSum').innerHTML = rows.filter(function (r) { return r[1].length && r[1][0]; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + r[1].map(esc).join(', ') + '</dd>'; }).join('');
    $$('.bq-s', bq).forEach(function (f) { f.classList.remove('on'); });
    $('#bqDone').hidden = false; $('#bqN').textContent = 'DONE'; $('#bqBar').style.width = '100%';
    $('#bqNext').textContent = 'SEND & GET MY QUOTE'; $('#bqNext').onclick = function () { this.textContent = 'PREVIEW ONLY'; this.disabled = true; };
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  $('#bqNext').addEventListener('click', function () { if ($('#bqDone').hidden) go(step + 1); });
  $('#bqBack').addEventListener('click', function () { if (!$('#bqDone').hidden) { $('#bqDone').hidden = true; $('#bqNext').onclick = null; $('#bqNext').disabled = false; } go(step - 1); });
  // deep links from service cards preselect step 1
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-svc]'); if (!a) return;
    var want = a.dataset.svc.toLowerCase();
    $$('.chips[data-name="service"] button', bq).forEach(function (b) { b.setAttribute('aria-pressed', String(b.textContent.toLowerCase() === want)); });
    $('#bqDone').hidden = true; go(1); step = 1; go(2);
  });

  /* ===== being watched? self-check ===== */
  var cq = $$('#check li');
  cq.forEach(function (li) {
    $$('button', li).forEach(function (b) {
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { $$('button', li).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true'); scoreCheck(); });
    });
  });
  function scoreCheck() {
    var ans = cq.map(function (li) { var on = $('button[aria-pressed=true]', li); return on ? on.textContent : null; });
    var done = ans.filter(Boolean).length, yes = ans.filter(function (a) { return a === 'YES'; }).length, out = $('#checkOut');
    if (done < cq.length) { out.hidden = true; return; }
    out.hidden = false;
    var t = yes >= 3 ? ['WORTH A PROFESSIONAL LOOK.', 'Several signs line up. A sweep and a short countersurveillance check can confirm what\u2019s really going on.']
      : yes >= 1 ? ['KEEP AN EYE ON IT.', 'One or two signs can be coincidence. If it keeps happening, a confidential conversation costs nothing.']
      : ['NO STRONG SIGNS.', 'Nothing here points to surveillance. If something changes, we\u2019re open 24/7.'];
    out.innerHTML = '<b>' + t[0] + '</b><span>' + t[1] + '</span>' + (yes ? '<a class="btn btn-solid" href="#build" data-svc="Countersurveillance (TSCM)">BOOK A SWEEP</a>' : '');
  }

  /* ===== newsletter ===== */
  $$('#newsForm .chips button').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); b.addEventListener('click', function () { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); }); });
  $('#newsForm').addEventListener('submit', function (e) {
    e.preventDefault(); var em = this.email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { this.email.focus(); this.email.style.borderColor = '#E6CB86'; return; }
    $('#newsOk').hidden = false;
  });

  /* ===== Quentin: scripted answers from the site's own content ===== */
  var QA = [
    { k: ['legal', 'law', 'allowed', 'licen'], a: 'Yes. Aventus is a licensed Ontario agency (licence 11457769), and every investigation stays within the law and a code of ethics.' },
    { k: ['cheat', 'infidel', 'partner', 'spouse', 'husband', 'wife', 'affair'], a: 'Infidelity work is done quietly, with no confrontation: discreet surveillance, photo and video where appropriate, and a clear report. Want to <a href="#build" data-svc="Infidelity">start a quote</a>?' },
    { k: ['custody', 'child', 'kids', 'parent', 'family'], a: 'Custody and family-law files get objective, lawfully gathered facts your lawyer can use. <a href="#build" data-svc="Child custody or family law">Start a quote</a>.' },
    { k: ['wsib', 'claim', 'insur', 'employee', 'employer', 'corporate', 'fraud'], a: 'Corporate and WSIB work covers claimant surveillance, employee activity and background research, without disrupting your business. Lawyers and insurers can also ask about a <a href="#pros">retainer</a>.' },
    { k: ['find', 'locate', 'skip', 'tenant', 'ltb', 'missing', 'address', 'serve'], a: 'Locates and skip traces find people who have moved or are avoiding contact, for LTB, Small Claims, service of documents or family. <a href="#rates">See the rate card</a>.' },
    { k: ['watch', 'bug', 'track', 'follow', 'sweep', 'tscm', 'spy'], a: 'If you think you are being watched, try the <a href="#counter">six-question self-check</a>, or <a href="#build" data-svc="Countersurveillance (TSCM)">book a sweep</a> of your home, office or vehicle.' },
    { k: ['phone', 'hack', 'account', 'password', 'text messages'], a: 'No phone tracking or account access. Aventus only uses lawful methods: surveillance, public records, authorized databases and open-source research.' },
    { k: ['price', 'cost', 'how much', 'rate', 'fee', 'quote', 'charge'], a: 'Most cases are quoted after a free, confidential consultation. Set-scope work can be booked from the <a href="#rates">rate card</a>, or <a href="#build">build your quote</a> in five taps.' },
    { k: ['find out', 'know', 'discreet', 'secret', 'confiden', 'private'], a: 'Everything stays confidential, and fieldwork is planned to stay unnoticed. You can also tell us how it is safe to contact you: text only, no voicemail, and so on.' },
    { k: ['date', 'dating', 'online', 'romance', 'scam'], a: 'An online dating check confirms the person you met is who they say they are, before you meet or send money. <a href="#rates">See the rate card</a>.' },
    { k: ['where', 'area', 'toronto', 'ajax', 'durham', 'oshawa', 'whitby', 'pickering', 'markham', 'vaughan', 'scarborough', 'york', 'richmond'], a: 'Aventus works across the GTA and Southern Ontario, from the office at 40 Hunt Street, Suite 207, Ajax. <a href="#areas">See the map</a>.' },
    { k: ['hour', 'open', 'urgent', 'now', 'tonight', 'weekend', 'fast'], a: 'Aventus is open 24/7, 365 days a year, and replies to every request within one business day. Urgent? <a href="#contact">Get in touch</a> directly.' },
    { k: ['anthony', 'tony', 'who', 'owner', 'founder', 'experience'], a: 'Aventus was established by Anthony Fernandes, a licensed private investigator in Ontario for more than 15 years.' },
    { k: ['report', 'evidence', 'proof', 'court', 'photo', 'video'], a: 'You get a chronological report with dates, times, locations and observations, plus photos or video where appropriate.' },
    { k: ['newsletter', 'brief', 'email list', 'subscribe'], a: 'The Aventus Brief is a short monthly note. <a href="#brief">Sign up here</a>.' },
    { k: ['hi', 'hello', 'hey'], a: 'Hi. What can I help you with?' }
  ];
  var QUICK = ['Is this legal?', 'I think my partner is cheating', 'I need to find someone', 'Am I being watched?', 'How much does it cost?', 'Talk to a person'];
  var qb = $('#qbtn'), qc = $('#qchat'), qlog = $('#qlog'), qstarted = false;
  function qsay(t, who) { var m = document.createElement('div'); m.className = 'qm ' + who; m.innerHTML = t; qlog.appendChild(m); qlog.scrollTop = qlog.scrollHeight; return m; }
  function qanswer(t) {
    var low = t.toLowerCase(), hit = null;
    if (/person|human|talk to|call|speak/.test(low)) hit = 'Of course. <a href="#contact">Get in touch</a> any time, or <a href="#build">build your quote</a> and Anthony replies within one business day.';
    if (!hit) for (var i = 0; i < QA.length && !hit; i++) if (QA[i].k.some(function (k) { return low.indexOf(k) > -1; })) hit = QA[i].a;
    if (!hit) hit = 'Good question for Anthony. <a href="#build">Build your quote</a> or <a href="#contact">get in touch</a>, and you will hear back within one business day. Everything stays confidential.';
    var typing = qsay('. . .', 'b t');
    setTimeout(function () { typing.remove(); qsay(hit, 'b'); }, RM ? 0 : 650);
  }
  function qopen(o) {
    qc.hidden = !o; qb.setAttribute('aria-expanded', o);
    if (o && !qstarted) {
      qstarted = true;
      qsay('I’m Quentin, the Aventus case desk. Ask me anything about how an investigation works. It stays between us.', 'b');
      $('#qquick').innerHTML = QUICK.map(function (q) { return '<button type="button">' + q + '</button>'; }).join('');
      $$('#qquick button').forEach(function (b) { b.addEventListener('click', function () { qsay(b.textContent, 'u'); qanswer(b.textContent); }); });
    }
    if (o) setTimeout(function () { if (innerWidth > 999) $('#qin').focus(); }, 50);
  }
  qb.addEventListener('click', function () { qopen(qc.hidden); });
  $('#qx').addEventListener('click', function () { qopen(false); });
  $('#qform').addEventListener('submit', function (e) { e.preventDefault(); var v = $('#qin').value.trim(); if (!v) return; qsay(esc(v), 'u'); $('#qin').value = ''; qanswer(v); });
  qlog.addEventListener('click', function (e) { if (e.target.closest('a') && innerWidth < 1000) qopen(false); });

  /* ===== tour (?tour=1): single tap, auto-plays ===== */
  var TS = [
    { el: '#top', k: 'OPENING SCENE', h: 'Tony, roll the credits', p: 'Your black and gold, sharpened. Same logo, real night-time photography instead of the AI graphics, and one gold headline that cycles through what people come to you for.', o: '<b>Why:</b> like any good opening shot, it tells people exactly what kind of film this is in two seconds.' },
    { el: '.hero-btns', k: 'WHAT CHANGED', h: 'Two moves, side by side', p: 'Build your quote and Get in touch, always in reach. On phones they ride along in a bar at the bottom.', o: '<b>Opportunity:</b> more people start a case instead of leaving.' },
    { el: '#qexit', k: 'NEW', h: 'The clean getaway', p: 'Quick exit: one tap and the site is gone, swapped for a weather page. Smoother than anything Tony Trans could deliver.', o: '<b>Why:</b> half your clients are reading this on a phone someone else might pick up.' },
    { el: '#services', k: 'DIRECTOR’S CUT', h: 'Five services, one tap each', p: 'Your own pages, trimmed down to what matters. No wasted scenes.', o: '<b>Opportunity:</b> each one goes straight to a quote for that service.' },
    { el: '#rates', k: 'NEW · REVENUE', h: 'The menu', p: 'Locates, background checks, surveillance, bug sweeps, online dating checks and tenant screening, bookable with a deposit. You set the prices; we know you take a menu seriously.', o: '<b>Opportunity:</b> paid bookings at 2 a.m., not just enquiries.' },
    { el: '#process', k: 'IN FOUR CHAPTERS', h: 'How a case runs', p: 'Chapter one, the talk. Chapter two, the plan. Chapter three, the fieldwork. Chapter four, the report. Told in order, unlike some of your favourite films.', o: '<b>Why:</b> the unknown is what stops people from reaching out.' },
    { el: '#counter', k: 'NEW · REVENUE', h: '“Being watched?” self-check', p: 'Six yes-or-no questions with an instant answer, leading straight to booking a sweep.', o: '<b>Opportunity:</b> turns a worried visitor into a booked TSCM job.' },
    { el: '#pros', k: 'NEW · REVENUE', h: 'Lawyers and insurers on retainer', p: 'Priority scheduling, reports built for their files, one invoice a month. Steady work every month, like Sunday dinner.', o: '<b>Opportunity:</b> repeat clients you don’t have to win twice.' },
    { el: '#anthony', k: 'THE LEAD', h: 'You, front and centre', p: 'Every review mentions you by name, so you lead the About section. The photo is optional; a good PI knows when to stay off camera.', o: '' },
    { el: '#reviews', k: 'THE CRITICS', h: 'Your real reviews, easy to read', p: 'Your own Google reviews, one at a time, big enough to read on a phone. No paid critics required.', o: '' },
    { el: '#areas', k: 'NEW', h: 'Your turf', p: 'Every eye is a community you cover. Ajax HQ glows and the sweep keeps watch. Add the general areas of past cases and the binoculars show up.', o: '<b>Opportunity:</b> each area can get its own page for local search.' },
    { el: '#build', k: 'NEW · REVENUE', h: 'Build your quote', p: 'Five taps, including how it’s safe to reach them (text only, no voicemail), then a likely approach and how your quote works.', o: '<b>Opportunity:</b> better-prepared requests and faster quotes.' },
    { el: '#room', k: 'NEW', h: 'The secure client room', p: 'Clients upload documents, follow the case step by step and download the report. No sensitive photos sitting in anyone’s inbox.', o: '<b>Why:</b> privacy is the thing they worry about most.' },
    { el: '#faq', k: 'NEW', h: 'Straight answers', p: 'Is it legal? Will they find out? Can you hack a phone? (No, and now it says so.)', o: '<b>Opportunity:</b> answers that also help you show up on Google.' },
    { el: '#brief', k: 'NEW · REVENUE', h: 'The Aventus Brief', p: 'A short monthly note for lawyers, employers, landlords and everyone else. Keeps referral sources thinking of you every month.', o: '' },
    { el: '#qbtn', k: 'NEW', h: 'Meet Quentin', p: 'Your 24/7 case desk, named after a certain director you might know. He answers the common questions, and anything else goes straight to you.', o: '<b>Opportunity:</b> nobody leaves at midnight without an answer.' },
    { el: '#contact', k: 'THAT’S A WRAP', h: 'Roll credits, Tony Highkick', p: 'Everything here uses your own words, reviews and logo. Photos are stand-ins and prices are placeholders until you set them. Grazie, obrigado.', o: '' }
  ];
  var tourQ = false, tour = $('#tour'), ti = 0, paused = false, tt = null, hl = null, DUR = 7000, t0 = 0, left = DUR, raf;
  function tick() { if (paused) return; var f = Math.min(1, (performance.now() - t0) / left); $('#tourBar').style.width = ((1 - left / DUR) + f * left / DUR) * 100 + '%'; if (f < 1) raf = requestAnimationFrame(tick); }
  function tgo(i) {
    clearTimeout(tt); cancelAnimationFrame(raf); if (hl) hl.classList.remove('tour-hl');
    if (i >= TS.length) return tend();
    ti = i; var s = TS[i], el = $(s.el);
    $('#tourK').textContent = s.k; $('#tourN').textContent = (i + 1) + ' / ' + TS.length; $('#tourH').textContent = s.h; $('#tourP').textContent = s.p;
    $('#tourO').innerHTML = s.o; $('#tourO').hidden = !s.o;
    if (el) {
      var r = el.getBoundingClientRect(), top = scrollY + r.top - (s.el === '#qexit' ? 0 : 70);
      if (s.el !== '#qexit' && s.el !== '.hero-btns' && s.el !== '.facts' && s.el !== '#qbtn') scrollTo({ top: top, behavior: RM ? 'auto' : 'smooth' });
      else if (s.el !== '#qbtn') scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
      if (s.el === '#qbtn') { qopen(true); tourQ = true; } else if (tourQ) { qopen(false); tourQ = false; }
      if (s.el !== '#top') { hl = el; el.classList.add('tour-hl'); }
    }
    left = DUR; t0 = performance.now(); $('#tourBar').style.width = '0';
    if (!paused) { tt = setTimeout(function () { tgo(ti + 1); }, DUR); raf = requestAnimationFrame(tick); }
  }
  function tend() { clearTimeout(tt); cancelAnimationFrame(raf); if (hl) hl.classList.remove('tour-hl'); tour.hidden = true; document.body.classList.remove('touring'); }
  $('#tourNext').addEventListener('click', function () { tgo(ti + 1); });
  $('#tourEnd').addEventListener('click', tend);
  $('#tourPause').addEventListener('click', function () {
    paused = !paused; this.textContent = paused ? 'PLAY' : 'PAUSE';
    if (paused) { clearTimeout(tt); cancelAnimationFrame(raf); left = Math.max(400, left - (performance.now() - t0)); }
    else { t0 = performance.now(); tt = setTimeout(function () { tgo(ti + 1); }, left); raf = requestAnimationFrame(tick); }
  });
  $('#tourStart').addEventListener('click', function (e) { e.preventDefault(); startTour(); });
  function startTour() { tour.hidden = false; document.body.classList.add('touring'); paused = false; $('#tourPause').textContent = 'PAUSE'; tgo(0); }
  if (TOUR) setTimeout(startTour, 1700);
})();
