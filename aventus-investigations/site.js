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
  if (!RM) setInterval(function () { li = (li + 1) % lines.length; typeLine(lines[li]); }, 3200);
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

  /* ===== areas map ===== */
  var AR = [
    ['Toronto', -79.383, 43.653], ['North York', -79.413, 43.770], ['Scarborough', -79.231, 43.773], ['Vaughan', -79.509, 43.838],
    ['Richmond Hill', -79.437, 43.882], ['Markham', -79.263, 43.856], ['Pickering', -79.089, 43.838], ['Ajax', -79.032, 43.851],
    ['Whitby', -78.943, 43.897], ['Oshawa', -78.865, 43.897]
  ];
  var NOTE = { Ajax: '40 Hunt Street, Suite 207. Surveillance, family, corporate and locate work across the GTA and Southern Ontario.' };
  function X(lon) { return (lon + 79.62) * 1090; } function Y(lat) { return (43.98 - lat) * 1050; }
  var shore = [[-79.66, 43.565], [-79.55, 43.59], [-79.47, 43.625], [-79.40, 43.632], [-79.33, 43.645], [-79.25, 43.69], [-79.17, 43.745], [-79.10, 43.79], [-79.03, 43.815], [-78.95, 43.845], [-78.87, 43.862], [-78.78, 43.87], [-78.76, 43.87]];
  var sp = shore.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(0) + ' ' + Y(p[1]).toFixed(0); }).join(' ');
  var map = $('#map');
  var g = '<path class="lake" d="' + sp + ' L 900 420 L 0 420 Z"/><path class="shore" d="' + sp + '"/><text class="lake-l" x="420" y="390">LAKE ONTARIO</text>';
  AR.forEach(function (a, i) {
    var x = X(a[1]), y = Y(a[2]), left = ['Vaughan', 'North York', 'Toronto'].indexOf(a[0]) > -1;
    var ly = a[0] === 'Pickering' ? y + 26 : a[0] === 'Ajax' ? y - 14 : a[0] === 'Scarborough' ? y + 24 : y + 5;
    var lx = left ? x - 12 : x + 12, anc = left ? 'end' : 'start';
    if (a[0] === 'Pickering') { lx = x - 6; anc = 'end'; }
    if (a[0] === 'Whitby') { ly = y - 14; lx = x - 4; anc = 'middle'; }
    if (a[0] === 'Oshawa') { ly = y + 26; lx = x + 4; anc = 'middle'; }
    if (a[0] === 'Richmond Hill') { ly = y - 12; lx = x; anc = 'middle'; }
    if (a[0] === 'Markham') { ly = y - 12; lx = x + 6; anc = 'middle'; }
    g += '<g class="pt" data-i="' + i + '" tabindex="0" role="button" aria-label="' + a[0] + '">' + (a[0] === 'Ajax' ? '<circle class="ring" cx="' + x + '" cy="' + y + '" r="10"/>' : '') +
      '<circle class="h" cx="' + x + '" cy="' + y + '" r="24"/><circle class="d" cx="' + x + '" cy="' + y + '" r="' + (a[0] === 'Ajax' ? 8 : 6) + '"/><text class="lab" x="' + lx + '" y="' + ly + '" text-anchor="' + anc + '">' + a[0] + '</text></g>';
  });
  map.innerHTML = g;
  $('#areaChips').innerHTML = AR.map(function (a, i) { return '<button type="button" data-i="' + i + '">' + a[0].toUpperCase() + '</button>'; }).join('');
  $$('#areaChips button').forEach(function (b) { b.addEventListener('click', function () { showArea(+b.dataset.i); }); });
  function showArea(i) {
    $$('#areaChips button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.i === i)); });
    $$('.pt', map).forEach(function (p) { p.classList.toggle('on', +p.dataset.i === i); });
    var n = AR[i][0];
    $('#areaCard').innerHTML = '<h3>' + n.toUpperCase() + (n === 'Ajax' ? ' · MAIN OFFICE' : '') + '</h3><p>' + (NOTE[n] || 'Surveillance, infidelity, custody, WSIB and corporate investigations, skip trace and locates in ' + n + ' and nearby.') + '</p>';
  }
  $$('.pt', map).forEach(function (p) {
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
    $('#bqSum').innerHTML = rows.filter(function (r) { return r[1].length && r[1][0]; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + r[1].map(esc).join(', ') + '</dd>'; }).join('');
    $$('.bq-s', bq).forEach(function (f) { f.classList.remove('on'); });
    $('#bqDone').hidden = false; $('#bqN').textContent = 'DONE'; $('#bqBar').style.width = '100%';
    $('#bqNext').textContent = 'SEND SECURELY'; $('#bqNext').onclick = function () { this.textContent = 'PREVIEW ONLY'; this.disabled = true; };
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

  /* ===== tour (?tour=1): single tap, auto-plays ===== */
  var TS = [
    { el: '#top', k: 'WHAT CHANGED', h: 'A calm, serious first impression', p: 'The gold-and-black graphics are gone. Real night-time photography, one bold headline and plain words: you get the facts, quietly.', o: '<b>Why:</b> people arrive anxious. This reads as trustworthy in two seconds.' },
    { el: '.hero-btns', k: 'WHAT CHANGED', h: 'Two clear next steps', p: 'Build your quote and Get in touch sit side by side, and follow you on phones in a bottom bar.', o: '<b>Opportunity:</b> more visitors start a case instead of leaving.' },
    { el: '#qexit', k: 'NEW', h: 'Quick exit', p: 'One tap (or Esc twice) leaves the site for a weather page and drops it from the back button.', o: '<b>Why:</b> someone checking on a partner may be on a shared phone. It shows you understand their situation.' },
    { el: '.facts', k: 'WHAT CHANGED', h: 'Proof up front', p: 'Licence number, 24/7 hours, one-business-day reply and the free consultation, all from the current site, now in the first screen instead of the footer.', o: '' },
    { el: '#services', k: 'WHAT CHANGED', h: 'Five services, one tap each', p: 'Long paragraphs became a short, scannable view for each service, rewritten in plain language from Anthony’s own pages.', o: '<b>Opportunity:</b> each one opens straight into a case request for that service.' },
    { el: '#process', k: 'NEW', h: 'How a case runs', p: 'Four steps, from the first confidential call to the final report.', o: '<b>Why:</b> fear of the unknown is what stops people from reaching out.' },
    { el: '#counter', k: 'NEW', h: 'Countersurveillance gets its own spotlight', p: 'TSCM sweeps were buried mid-page. Now they have a section and a Book a sweep button.', o: '<b>Opportunity:</b> a separate service line for people who think they’re being watched.' },
    { el: '#anthony', k: 'WHAT CHANGED', h: 'Anthony, up front', p: 'Reviews name Anthony again and again, so he leads the About section. The photo is optional.', o: '' },
    { el: '#reviews', k: 'WHAT CHANGED', h: 'Real reviews, easy to read', p: 'His own Google reviews, one at a time, large enough to read on a phone.', o: '' },
    { el: '#areas', k: 'NEW', h: 'Service area map', p: 'All ten communities on one map, with the Ajax office marked.', o: '<b>Opportunity:</b> each area can link to its own page for local search.' },
    { el: '#build', k: 'NEW', h: 'Build your quote', p: 'Five quick taps, including how it’s safe to reach them: email, calls, text only, no voicemail.', o: '<b>Opportunity:</b> better-prepared requests, including after hours.' },
    { el: '#contact', k: 'THAT’S THE TOUR', h: 'Ready when you are', p: 'Everything here uses Aventus’s own words, reviews and logo. Photos are stand-ins until we swap in his.', o: '' }
  ];
  var tour = $('#tour'), ti = 0, paused = false, tt = null, hl = null, DUR = 7000, t0 = 0, left = DUR, raf;
  function tick() { if (paused) return; var f = Math.min(1, (performance.now() - t0) / left); $('#tourBar').style.width = ((1 - left / DUR) + f * left / DUR) * 100 + '%'; if (f < 1) raf = requestAnimationFrame(tick); }
  function tgo(i) {
    clearTimeout(tt); cancelAnimationFrame(raf); if (hl) hl.classList.remove('tour-hl');
    if (i >= TS.length) return tend();
    ti = i; var s = TS[i], el = $(s.el);
    $('#tourK').textContent = s.k; $('#tourN').textContent = (i + 1) + ' / ' + TS.length; $('#tourH').textContent = s.h; $('#tourP').textContent = s.p;
    $('#tourO').innerHTML = s.o; $('#tourO').hidden = !s.o;
    if (el) {
      var r = el.getBoundingClientRect(), top = scrollY + r.top - (s.el === '#qexit' ? 0 : 70);
      if (s.el !== '#qexit' && s.el !== '.hero-btns' && s.el !== '.facts') scrollTo({ top: top, behavior: RM ? 'auto' : 'smooth' });
      else scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
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
