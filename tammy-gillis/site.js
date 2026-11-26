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
  if (sc && !matchMedia('(prefers-reduced-motion: reduce)').matches) addEventListener('scroll', function () { sc.style.setProperty('--sy', (scrollY * 0.12).toFixed(1)); }, { passive: true });
  (function () {
    var opt = (Q.get('wm') || '').toLowerCase(); if (!/^[abcdes]$/.test(opt)) opt = 's';
    var MARK = '<svg class="wl-m" viewBox="-1 -1 66 66" aria-hidden="true"><path d="M2 0H62A2 2 0 0 1 64 2V62A2 2 0 0 1 62 64H2A2 2 0 0 1 0 62V2A2 2 0 0 1 2 0Z" fill="#141B2A" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><rect x="10" y="42.5" width="20" height="7" rx="1.2" fill="#FFFFFF"/><rect x="22" y="29" width="20" height="7" rx="1.2" fill="#FFFFFF"/><rect x="34" y="15.5" width="20" height="7" rx="1.2" fill="#3DFFC1"/></svg>';
    var LOCK = '<span class="wl"><span class="wl-t">CONCEPT \u00b7 DESIGNED AND POWERED BY:</span>' + MARK + '<b class="wl-w">Chairlift</b></span>';
    if (opt === 's') LOCK = '<span class="wl"><span class="wl-t">POWERED BY:</span>' + MARK + '<b class="wl-w">Chairlift</b></span>';
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
    try { new MutationObserver(heal).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class', 'hidden'] }); } catch (e) {}
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
  else setTimeout(function () { loader.classList.add('out'); setTimeout(function () { loader.classList.add('gone'); }, 800); }, 2300);
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
  $$('.hw').forEach(function (w, i) { w.style.animationDelay = (RM ? 0 : (seen || EMBED ? 0.1 : 2.3) + i * 0.09) + 's'; });
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
  var CQ = [
    ['Do you have a dedicated salesperson working on your hotel every week?', 1],
    ['Would your pipeline survive if your best salesperson left tomorrow?', 1],
    ['Does most of your base business come from somewhere other than OTAs?', 1],
    ['Can you see your sales activity and pipeline in real time?', 1],
    ['Has your sales team had modern sales training in the last 12 months?', 1],
    ['Do you have a written plan for proactive prospecting this quarter?', 1]
  ];
  var ci = 0, cs = 0, cans = [];
  function ckShow() {
    $('#ckN').textContent = 'QUESTION ' + (ci + 1) + ' OF ' + CQ.length; $('#ckBar').style.width = (ci / CQ.length * 100) + '%';
    var q = $('#ckQ'); q.textContent = CQ[ci][0]; q.classList.remove('sw'); void q.offsetWidth; q.classList.add('sw');
  }
  function ckEnd() {
    $('#ckBar').style.width = '100%'; $('#ckN').textContent = 'YOUR RESULT'; $('#ckQ').hidden = true; $('.ck-btns').hidden = true; $('#ckRes').hidden = false;
    $('#ckScore').textContent = cs + ' OF ' + CQ.length + ' IN PLACE';
    var h, p, pre = 'solutions';
    if (!cans[0] || !cans[1]) { h = 'Start with a dedicated seller and a system behind them.'; p = 'Your biggest gap is coverage. A managed sales solution gives you a full-time effort, leadership and reporting without hiring in-house.'; }
    else if (!cans[4]) { h = 'Your team is in place. Give them a modern playbook.'; p = 'A workshop or keynote for your commercial team is the quickest lift. Many teams pair it with Room to Grow.'; pre = 'training'; }
    else if (!cans[2] || !cans[5]) { h = 'Time to take back your base business.'; p = 'A proactive prospecting plan reduces how much you lean on OTAs. Our sellers build that pipeline every week.'; }
    else if (!cans[3]) { h = 'You need to see what sales is doing.'; p = 'GillisOne gives owners real-time visibility into activity, pipeline and opportunities.'; pre = 'gillisone'; }
    else { h = 'Strong foundation. Let’s find the next level.'; p = 'You have the basics. A conversation with Tammy’s team can show where the next opportunities are hiding.'; }
    $('#ckH').textContent = h; $('#ckP').textContent = p; $('#ckGo').dataset.pre = pre;
  }
  $$('.ck-btns button').forEach(function (b) { b.addEventListener('click', function () { var a = +b.dataset.a; cans.push(a); cs += a; ci++; if (ci >= CQ.length) ckEnd(); else ckShow(); }); });
  $('#ckRe').addEventListener('click', function () { ci = 0; cs = 0; cans = []; $('#ckQ').hidden = false; $('.ck-btns').hidden = false; $('#ckRes').hidden = true; ckShow(); });
  ckShow();
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
  });
  $('#bqRe').addEventListener('click', function () { bq.reset(); hN = 1; $('#hN').textContent = 1; preset(''); });
  bshow();
  $$('form[data-ok]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); var p = document.createElement('p'); p.className = 'ok-msg'; p.textContent = f.dataset.ok + ' (Preview: nothing is sent yet.)'; if (f.classList.contains('nb-f')) { f.hidden = true; $('.nb-ok').hidden = false; return; } f.replaceWith(p); });
  });
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
  var BOOK = 'https://cal.com/chairlift/5min';
  var S = [
    { t: 'Welcome, Tammy', w: 'This is a concept redesign of gillissales.com, built by Chairlift from your own logo, colours, photos, video and words. This walkthrough shows what we changed, why, and how it helps Gillis win more hotels.', y: 'About three minutes. Pause, go back or skip at any time.', s: 'Your current site, gillissales.com', el: '#top' },
    { t: 'One flowing look, dark or light', w: 'Your current site jumps between white and dark blocks. Now the whole page is one continuous look in your teal, blue and purple, with a dark and a light version (the switch is at the top).', y: 'A consistent look reads as premium and keeps people scrolling instead of leaving.', s: 'Colours taken straight from your logo file', el: '#top' },
    { t: 'You lead the story', w: 'The page opens with your own interview footage, then your stage and training photos. Watch Tammy plays the full film.', y: 'Owners and GMs buy from people they trust. Your face and voice do more than a stock lobby photo.', s: 'Your video and photos on gillissales.com', el: '#reel' },
    { t: 'Two clear next steps', w: 'Build your quote and Get in touch sit side by side in the hero. On phones they stay at the bottom of the screen the whole way down.', y: 'Fewer choices means more enquiries. Today visitors have to hunt for the Contact page.', s: 'Your contact page and its form', el: '#heroBtns' },
    { t: 'The problem, in your words', w: 'Your opening message now lights up word by word as visitors scroll.', y: 'It actually gets read, and it frames everything that follows.', s: 'Your homepage copy, unchanged', el: '#pressure' },
    { t: 'Five ways to buy from Gillis', w: 'Sales Solutions, Sales Training, Speaking, Room to Grow and GillisOne, each with its own next step.', y: 'Every revenue stream gets its own path to a sale, instead of one general contact form.', s: 'Your Services menu, book page and GillisOne section', el: '#ways' },
    { t: 'Dedicated. Backed. Supported.', w: 'Your three-part promise now builds one line at a time over your own lobby photo.', y: 'It turns a tagline into a moment people remember.', s: 'Your homepage', el: '#system' },
    { t: 'One salesperson, or a sales system', w: 'Visitors drag a line between the old way and the Gillis way.', y: 'Your core difference, understood in two seconds.', s: '\u201cSustainable growth requires a proven sales system, not dependence on one salesperson.\u201d (your homepage)', el: '#halves' },
    { t: 'Sales Solutions, made clearer', w: 'Your four advantages, the hotel types you serve, the business segments you grow and your own line: \u201cWe\u2019ve made the investments, so you don\u2019t have to.\u201d', y: 'An owner can see in one screen whether Gillis fits their hotel.', s: 'Your Sales Solutions page and FAQ', el: '#solutions' },
    { t: 'New: two-minute health check', w: 'Six yes-or-no questions give a hotel an instant result and the right next step, then ask for an email to send it.', y: 'It captures owners who are not ready to talk yet, and tells your team where their gaps are before the first conversation.', s: 'Questions built from the challenges on your contact form', el: '#check' },
    { t: 'Your proof, up front', w: '30+ years, 350+ hotels, 90%+ client retention and 4x average ROI, counting up as they appear.', y: 'Proof works best before the ask, not buried on the About page.', s: 'Only numbers you already publish (homepage, About, Sales Solutions)', el: '#numbers' },
    { t: 'Training as its own product', w: 'Workshops, webinars and keynotes to choose from, the four outcomes, and a Plan a training button.', y: 'Training becomes a sales line of its own, not a link in a menu.', s: 'Your Sales Training page', el: '#training' },
    { t: 'Book Tammy to speak', w: 'Your three talks with their takeaways, a date request form and your headshot ready to download.', y: 'Event planners can request a date at midnight, without an email chain.', s: 'Your Speaking Engagements page', el: '#speaking' },
    { t: 'Room to Grow sells more than copies', w: 'Amazon.com and Amazon.ca buttons, plus team copies with a quantity slider and an optional book-club workshop with you.', y: 'One book order can become a group order and a training lead.', s: 'Your Room to Grow page and its reviews', el: '#book' },
    { t: 'GillisOne gets its own stage', w: 'The five benefits, a sample view and a demo request.', y: 'Your platform becomes a reason to reach out, not just a feature.', s: 'Your homepage GillisOne section and FAQ', el: '#gillisone' },
    { t: 'Your clients, in their own words', w: 'Realstar, Denham, Metropolitan and Prominence, one at a time and big enough to read on a phone.', y: 'Real names from real hotel companies carry more weight than anything we could write.', s: 'Your Testimonials page', el: '#voices' },
    { t: 'Meet Tammy', w: 'Your story, your recognitions, and a little Cape Breton and Butters.', y: 'Hotels hire Gillis because of you. Now the site says so.', s: 'Your Our Team bio and Speaking bio', el: '#tammy' },
    { t: 'Build your quote', w: 'Five taps: what they need, their hotels, their biggest challenge, timing and contact details.', y: 'Your team gets hotel count, type, challenge and timing before the first conversation. Better leads, faster proposals.', s: 'The options on your current contact form', el: '#build' },
    { t: 'Straight answers', w: 'Your FAQ, trimmed to the questions owners ask most.', y: 'It handles objections before they come up, and helps Google show your answers.', s: 'Your FAQ page', el: '#faq' },
    { t: 'What happens next', w: 'Everything here is a working concept. A few items, like book pricing and reply times, are left for your team to set, and nothing is live on your domain.', y: 'Let\u2019s walk through it together and decide what you would like to keep, change or launch first.', s: 'Prepared for Gillis Sales by Chairlift', el: '#contact', cta: true }
  ];
  var DW = 13500, ovl = null, fr = null, bar = null, timer = 0, idx = 0, mode = 'play', tbhMax = 0;
  function mk(h) { var d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstChild; }
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var I = { back: '<svg viewBox="0 0 24 24"><path d="M6 5h2.5v14H6zM20 5v14L9.5 12z"/></svg>', next: '<svg viewBox="0 0 24 24"><path d="M15.5 5H18v14h-2.5zM4 5v14l10.5-7z"/></svg>', pause: '<svg viewBox="0 0 24 24"><path d="M6 4h4.5v16H6zM13.5 4H18v16h-4.5z"/></svg>', play: '<svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>', list: '<svg viewBox="0 0 24 24"><path d="M4 6h16v2.5H4zM4 10.8h16v2.5H4zM4 15.5h16V18H4z"/></svg>', x: '<svg viewBox="0 0 24 24"><path d="M5.6 4 12 10.4 18.4 4 20 5.6 13.6 12 20 18.4 18.4 20 12 13.6 5.6 20 4 18.4 10.4 12 4 5.6z"/></svg>' };
  function vb(a, l, c) { return '<button type="button" class="vb' + (c ? ' ' + c : '') + '" data-a="' + a + '" aria-label="' + l + '">' + I[a === 'resume' ? 'play' : a] + '</button>'; }
  function open() {
    if (ovl) return;
    ovl = mk('<div class="tourov" id="tourov"><iframe title="Site tour" src="' + location.pathname + '?embed=1&theme=' + theme() + '"></iframe><div class="tvglass"></div><div class="tvtag">CONCEPT BY CHAIRLIFT</div></div>');
    if (!RM) ovl.appendChild($('#doorScene').content.cloneNode(true));
    document.body.appendChild(ovl); fr = $('iframe', ovl); root.classList.add('tourlock');
    var ready = false, waited = false;
    fr.addEventListener('load', function () { ready = true; if (waited) go(0, 'play'); });
    setTimeout(function () { waited = true; if (ready) go(0, 'play'); }, RM ? 100 : 3500);
    setTimeout(function () { var t = $('.dr', ovl); if (t) t.remove(); }, 4200);
  }
  function close() { clearTimeout(timer); if (ovl) { ovl.remove(); ovl = null; bar = null; } root.classList.remove('tourlock'); }
  function go(i, m) {
    clearTimeout(timer); idx = i; mode = m; draw();
    try { fr.contentWindow.__hl(S[i].el); } catch (e) {}
    if (mode === 'play') { var tp = $('.tbp', bar); tp.style.transitionDuration = DW + 'ms'; requestAnimationFrame(function () { requestAnimationFrame(function () { tp.classList.add('run'); }); }); timer = setTimeout(function () { if (idx + 1 >= S.length) list(); else go(idx + 1, 'play'); }, DW); }
  }
  function draw() {
    var s = S[idx];
    var btns = '<div class="tvcr">' + (idx > 0 ? vb('back', 'Back') : '<span class="vb off"></span>') + (mode === 'play' ? vb('pause', 'Pause', 'main') : vb('resume', 'Play', 'main')) + (idx < S.length - 1 ? vb('next', 'Next') : '<span class="vb off"></span>') + '</div><div class="tvx">' + vb('list', 'See all') + vb('x', 'Exit') + '</div>';
    var cta = s.cta ? '<a class="tbook" href="' + BOOK + '" target="_blank" rel="noopener">BOOK A MEETING WITH OUR TEAM</a>' : '';
    place('<aside class="tbar" role="region" aria-label="Site walkthrough"><div class="tbp"></div><div class="tbr"><div class="tbt"><span class="tbn">YOUR REDESIGN \u00b7 ' + (idx + 1) + ' OF ' + S.length + '</span><b>' + esc(s.t) + '</b><span class="tbx">' + esc(s.w) + '</span><span class="tbo"><em>WHY IT HELPS</em>' + esc(s.y) + '</span><span class="tbs"><em>SOURCE</em>' + esc(s.s) + '</span>' + cta + '</div><div class="tbb">' + btns + '</div></div></aside>');
  }
  function list() {
    clearTimeout(timer); mode = 'done';
    var items = S.map(function (s, i) { return '<a href="#" data-i="' + i + '"><span>' + pad(i + 1) + '</span>' + esc(s.t) + '</a>'; }).join('');
    place('<aside class="tbar" role="region" aria-label="Site tour"><div class="tbr"><div class="tbt"><span class="tbn">THAT’S THE TOUR</span><b>Pick any part to take a closer look</b></div><div class="tbb"><button type="button" class="txt go" data-a="replay">PLAY AGAIN</button><button type="button" class="txt" data-a="x">CLOSE</button></div></div><div class="tbl">' + items + '</div></aside>');
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
    });
  }
  $('#tourbtn').addEventListener('click', open);
  $('#tourStart').addEventListener('click', function (e) { e.preventDefault(); open(); });
  if (TOUR) { try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {} setTimeout(open, seen ? 600 : 2500); }
})();
