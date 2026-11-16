/* Sean Wells: concept by Chairlift. (c) 2026 Chairlift. Not for reuse or distribution. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var Q = new URLSearchParams(location.search);
  var TOUR = Q.get('tour') === '1';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DESK = matchMedia('(min-width:1081px)');

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

  /* ===== loader: once per visit ===== */
  var seen = false; try { seen = sessionStorage.getItem('sw-ld') === '1'; } catch (e) {}
  var ld = $('#loader');
  function ready() { document.body.classList.add('ready'); document.body.classList.remove('loading'); }
  if (seen || RM) { ld.remove(); ready(); }
  else {
    document.body.classList.add('loading');
    setTimeout(function () { ld.classList.add('out'); ready(); try { sessionStorage.setItem('sw-ld', '1'); } catch (e) {} }, 1400);
    setTimeout(function () { ld.remove(); }, 2300);
  }

  /* ===== header + dock ===== */
  var hdr = $('#hdr'), dock = $('#dock');
  function onScroll() {
    var y = scrollY;
    hdr.classList.toggle('solid', y > 40);
    dock.classList.toggle('on', y > innerHeight * .7);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ===== phone menu ===== */
  var mb = $('#menuBtn'), menu = $('#menu');
  function setMenu(o) { menu.hidden = !o; mb.setAttribute('aria-expanded', o); mb.textContent = o ? 'CLOSE' : 'MENU'; document.body.style.overflow = o ? 'hidden' : ''; }
  mb.addEventListener('click', function () { setMenu(menu.hidden); });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* ===== rotating hero word ===== */
  var words = ['STRATEGY', 'THE HARD PROJECTS', 'A SECOND OPINION', 'CLEAN HAND-OFFS', 'THE BIG MOMENTS'], wi = 0, rot = $('#rot');
  if (!RM) setInterval(function () {
    rot.classList.add('swap');
    setTimeout(function () { wi = (wi + 1) % words.length; rot.textContent = words[wi]; rot.classList.remove('swap'); }, 260);
  }, 2400);

  /* ===== pitch: words light up as you scroll ===== */
  var pt = $('#pitchText');
  var hot = /^(right|first|Sean|start|finish\.)/;
  pt.innerHTML = pt.textContent.split(' ').map(function (w) { return '<span class="w' + (hot.test(w) ? ' hw' : '') + '">' + w + '</span>'; }).join(' ');
  var pw = $$('.w', pt);
  function pitch() {
    var r = pt.getBoundingClientRect(), vh = innerHeight;
    var p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35)));
    var n = Math.round(p * pw.length);
    pw.forEach(function (s, i) { s.classList.toggle('on', i < n); s.classList.toggle('hot', i < n && s.classList.contains('hw')); });
  }
  addEventListener('scroll', pitch, { passive: true }); pitch();

  /* ===== offers: horizontal rail on desktop ===== */
  var off = $('#offers'), track = $('#offersTrack');
  function railSize() {
    if (DESK.matches && !RM) {
      off.classList.add('rail');
      var extra = Math.max(0, track.scrollWidth - innerWidth + 80);
      off.style.setProperty('--rail-h', (innerHeight + extra) + 'px');
      off.dataset.extra = extra;
    } else { off.classList.remove('rail'); off.style.removeProperty('--rail-h'); track.style.transform = ''; off.dataset.extra = 0; }
    rail();
  }
  function rail() {
    if (!off.classList.contains('rail')) return;
    var r = off.getBoundingClientRect(), ex = +off.dataset.extra || 0;
    var p = Math.min(1, Math.max(0, -r.top / Math.max(1, off.offsetHeight - innerHeight)));
    track.style.transform = 'translateX(' + (-p * ex) + 'px)';
  }
  addEventListener('scroll', rail, { passive: true });
  addEventListener('resize', railSize);
  addEventListener('load', railSize); railSize();

  /* ===== how it runs: sticky counter ===== */
  var steps = $$('.how-steps li'), hn = $('#howNum'), hb = $('#howBar');
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          steps.forEach(function (s) { s.classList.remove('on'); }); e.target.classList.add('on');
          var i = steps.indexOf(e.target); hn.textContent = '0' + (i + 1); hb.style.width = ((i + 1) / steps.length * 100) + '%';
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(function (s) { so.observe(s); });
  }

  /* ===== reveal on scroll ===== */
  var rvs = $$('.h-big,.h-mid,.offer,.tile,.about-photo,.facts,.qb,.contact-big,.words-quote');
  if ('IntersectionObserver' in window && !RM) {
    rvs.forEach(function (el) { if (!el.closest('.offers-track')) el.classList.add('rv'); });
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { threshold: .12 });
    $$('.rv').forEach(function (el) { ro.observe(el); });
  }

  /* ===== build your quote ===== */
  var qb = $('#qb'), cur = 1, N = 4, nx = $('#qbNext'), bk = $('#qbBack'), prog = $('#qbProg');
  var FIT = {
    session: ['STRATEGY SESSION', 'One focused sitting to untangle it, with a written plan after. Fixed fee, bookable online.'],
    project: ['PROJECT LEAD', 'Sean scopes it, runs it and hands it back clean. You get a fixed price after a short call.'],
    advisory: ['ON-CALL ADVISORY', 'A monthly retainer: set hours, priority replies, cancel any month.'],
    workshop: ['TEAM WORKSHOP', 'A working session built around your real projects, on site or online.'],
    unsure: ['START WITH A CONVERSATION', 'Sean will suggest the right fit after a short call. Often that is a strategy session first.']
  };
  function val(n) { var c = qb.querySelector('input[name="' + n + '"]:checked'); return c ? c.value : ''; }
  function show(n) {
    cur = n;
    $$('.qb-step', qb).forEach(function (s) { s.classList.toggle('is-on', +s.dataset.step === n); });
    prog.style.width = (n / N * 100) + '%';
    bk.hidden = n === 1; nx.textContent = n === N ? 'SEE MY STARTING POINT' : 'NEXT';
  }
  function canGo() {
    if (cur === 1) return !!val('need');
    if (cur === 2) return !!val('when');
    if (cur === 3) return !!val('budget');
    var ok = true;
    ['name', 'email'].forEach(function (f) { var i = qb.elements[f]; var bad = !i.value.trim() || (f === 'email' && !/.+@.+\..+/.test(i.value)); i.classList.toggle('bad', bad); if (bad) ok = false; });
    return ok;
  }
  nx.addEventListener('click', function () {
    if (!canGo()) { nx.animate && nx.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 260 }); return; }
    if (cur < N) return show(cur + 1);
    var f = FIT[val('need')] || FIT.unsure;
    $('#qbFit').textContent = f[0]; $('#qbWhy').textContent = f[1];
    $$('.qb-step', qb).forEach(function (s) { s.classList.remove('is-on'); });
    $('#qbDone').hidden = false; prog.style.width = '100%'; nx.hidden = true; bk.textContent = 'START OVER';
    bk.onclick = function () { qb.reset(); $('#qbDone').hidden = true; nx.hidden = false; bk.textContent = 'BACK'; bk.onclick = null; show(1); };
  });
  bk.addEventListener('click', function () { if (!bk.onclick && cur > 1) show(cur - 1); });
  qb.addEventListener('change', function (e) { if (e.target.type === 'radio' && cur < N) setTimeout(function () { show(cur + 1); }, 220); });
  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () { var r = qb.querySelector('input[name="need"][value="' + a.dataset.pick + '"]'); if (r) { r.checked = true; setTimeout(function () { show(2); }, 500); } });
  });
  show(1);

  /* ===== field notes ===== */
  $('#notesF').addEventListener('submit', function (e) { e.preventDefault(); if (/.+@.+\..+/.test($('#nEmail').value)) $('#notesOk').hidden = false; });

  /* ===== tour (?tour=1): single tap, auto-plays ===== */
  var TS = [
    { el: '#top', k: 'THE IDEA', h: 'Sean, this is your front door', p: 'Your name, big and bold, branded as an independent consultant. Built around you, not around any one company.', o: '<b>Why:</b> people hire a person, not a logo. Your name is the brand.' },
    { el: '.hero-btns', k: 'WHAT CHANGED', h: 'Two clear moves', p: 'Build your quote and Get in touch, side by side. On phones they ride along at the bottom of the screen.', o: '<b>Opportunity:</b> every visit has an obvious next step.' },
    { el: '.hero-photo', k: 'YOUR PHOTO', h: 'Your face, never covered', p: 'This frame holds a strong portrait of you. The text sits beside it, never on top of your face.', o: '<b>Needed from you:</b> one or two good photos.' },
    { el: '#pitch', k: 'POSITIONING', h: 'The pitch in one breath', p: 'It lights up as you scroll. The final wording comes from you once you settle on your focus.', o: '<b>Why:</b> visitors decide in seconds whether you are the right call.' },
    { el: '#offers', k: 'REVENUE', h: 'Four ways to hire you', p: 'Strategy session, project lead, on-call advisory and team workshops. Clear packages instead of “contact me for rates”.', o: '<b>Opportunity:</b> the strategy session can be booked and paid online, and the advisory retainer brings steady monthly income.' },
    { el: '#how', k: 'TRUST', h: 'How it runs, in four steps', p: 'Talk, scope, do the work, hand it off. No mystery about what happens after they reach out.', o: '<b>Why:</b> the unknown is what stops people from getting in touch.' },
    { el: '#work', k: 'PROOF', h: 'The receipts', p: 'Five tiles for real projects, told in your words with your own photos. Nothing here is invented: they stay blank until you fill them.', o: '<b>Needed from you:</b> three to five projects you can talk about.' },
    { el: '#about', k: 'ABOUT YOU', h: 'The person they actually get', p: 'A short story, where you are based, your focus and who hires you.', o: '' },
    { el: '#words', k: 'KIND WORDS', h: 'Real quotes only', p: 'One big quote from someone you have worked with, used only once they say yes.', o: '<b>Opportunity:</b> one strong quote does more than ten logos.' },
    { el: '#quote', k: 'REVENUE', h: 'Build your quote', p: 'Four taps: what they need, when, a rough budget in Canadian dollars, and where to reply. They get a suggested starting point right away.', o: '<b>Opportunity:</b> you only spend time on enquiries that already fit.' },
    { el: '#notes', k: 'REVENUE', h: 'Field notes', p: 'A short monthly email. Past clients and contacts hear from you, including when you have room for new work.', o: '<b>Opportunity:</b> repeat work and referrals without chasing.' },
    { el: '#contact', k: 'THAT’S THE TOUR', h: 'Your move, Sean', p: 'Send your photos, your focus in a sentence, a few projects and your prices, and this goes from concept to ready.', o: '' }
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
      var top;
      if (s.el === '.hero-btns' || s.el === '.hero-photo') top = 0;
      else if (s.el === '#offers' && off.classList.contains('rail')) top = off.offsetTop + (+off.dataset.extra || 0) * .35;
      else top = scrollY + el.getBoundingClientRect().top - 60;
      scrollTo({ top: top, behavior: RM ? 'auto' : 'smooth' });
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
  if (TOUR) setTimeout(startTour, seen || RM ? 600 : 1900);
})();
