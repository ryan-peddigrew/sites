/* Power washing template, Chairlift. (c) 2026 Chairlift. */
(function () {
  /* ===== CONFIG: everything a client fills in ===== */
  var CONFIG = {
    storyVideo: 'media/story.mp4',       // optional: scroll-scrubbed footage; placeholder art shows until it exists
    // Pressure guide. Ranges are typical starting points: confirm every number with the client.
    surfaces: [
      { id: 'siding', name: 'Siding', lo: 40, hi: 100, method: 'Soft wash', tool: 'Low-pressure pump + soft brush', note: 'Vinyl scratches and seams leak when you blast them. The cleaning mix does the work, then a gentle rinse.' },
      { id: 'roof', name: 'Roof', lo: 40, hi: 100, method: 'Soft wash', tool: 'Low-pressure pump from the ground or ladder', note: 'Pressure strips the granules that protect shingles. Nobody walks your roof with a wand.' },
      { id: 'driveway', name: 'Driveway', lo: 3000, hi: 4000, method: 'Pressure wash', tool: '20" surface cleaner + wand edges', note: 'Concrete can take it. The surface cleaner keeps the pressure even, so you get lanes, not stripes.' },
      { id: 'deck', name: 'Deck', lo: 500, hi: 1200, method: 'Low pressure', tool: 'Wide fan tip, with the grain', note: 'Wood fibres lift if you push it. We keep it low and follow the boards.' },
      { id: 'gutters', name: 'Gutters', lo: 40, hi: 100, method: 'Soft wash + hand', tool: 'Brush and low-pressure rinse', note: 'The black lines on gutter faces come off by hand, not by force.' }
    ],
    defaultSurface: 'driveway',
    // PLACEHOLDER RATES (Canadian dollars). Replace with the client's real pricing.
    quote: {
      house: function (sq, st) { return 150 + sq * 0.09 * [1, 1, 1.15, 1.3][st]; },
      items: [
        { id: 'house', name: 'House wash', on: true },
        { id: 'roof', name: 'Roof soft wash', on: false, price: function (sq) { return 200 + sq * 0.12; } },
        { id: 'driveway', name: 'Driveway', on: true, price: function () { return 175; } },
        { id: 'deck', name: 'Deck or patio', on: false, price: function () { return 195; } },
        { id: 'gutters', name: 'Gutter faces', on: false, price: function (sq) { return 90 + sq * 0.02; } }
      ]
    },
    padCards: {
      oil: 'Degreaser first. We lighten it, we don\'t promise miracles.',
      tires: 'Rubber and road film baked into the surface.',
      mildew: 'Shade and humidity feed it. Pre-treat kills it at the root.',
      rust: 'Iron from irrigation water. Needs a rust treatment, not pressure.',
      weeds: 'Blasted out so the joints read crisp again.'
    }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var money = function (n) { return '$' + Math.round(n).toLocaleString('en-CA'); };

  /* ===== loader ===== */
  var loader = $('#loader');
  function hideLoader() { loader.classList.add('out'); $('#dock').classList.add('on'); }
  window.addEventListener('load', function () { setTimeout(hideLoader, RM ? 0 : 900); });
  setTimeout(hideLoader, 2600);

  /* ===== header + menu ===== */
  var hdr = $('.hdr'), menuBtn = $('.menu-btn'), nav = $('.nav');
  menuBtn.addEventListener('click', function () { var o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
  $$('.nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }); });

  /* ===== scroll story ===== */
  var storyEl = $('#story'), canvas = $('#storyCanvas'), video = $('#storyVideo');
  var art = Scenes.story(canvas), caps = $$('.cap'), useVideo = false;
  var meterNum = $('#meterNum'), meterArc = $('#meterArc'), meterCh = $('#meterCh'), meter = $('.meter');
  var KEYS = [[0, 38], [0.3, 68], [0.55, 80], [0.86, 95], [0.92, 99], [1, 99]];
  var CHN = ['1/4 · Driveway', '2/4 · Roof', '3/4 · Siding', '4/4 · Whole house'];
  function meterAt(t) { for (var i = 1; i < KEYS.length; i++) if (t <= KEYS[i][0]) { var a = KEYS[i - 1], b = KEYS[i]; return a[1] + (b[1] - a[1]) * (t - a[0]) / (b[0] - a[0]); } return 99; }
  function storyT() { var r = storyEl.getBoundingClientRect(); return Math.max(0, Math.min(1, -r.top / (r.height - innerHeight))); }
  var lastT = -1;
  function frame() {
    var t = storyT();
    if (t !== lastT) {
      lastT = t;
      if (useVideo) { if (video.duration) video.currentTime = t * (video.duration - 0.05); } else art.draw(t);
      caps.forEach(function (c) { c.classList.toggle('on', t >= +c.dataset.from && t < +c.dataset.to); });
      var m = Math.round(meterAt(t)); meterNum.textContent = m;
      meterArc.style.strokeDashoffset = (94.25 * (1 - m / 100)).toFixed(2);
      meter.classList.toggle('full', m >= 99);
      meterCh.textContent = CHN[art.chapter(t)];
      storyEl.classList.toggle('moved', t > 0.01);
    }
    var past = storyEl.getBoundingClientRect().bottom < 80;
    hdr.classList.toggle('solid', past || nav.classList.contains('open'));
    requestAnimationFrame(frame);
  }
  function sizeStory() { art.resize(); lastT = -1; }
  sizeStory();
  var rz; addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { sizeStory(); sizePad(true); sizeBA(); }, 180); });
  requestAnimationFrame(frame);
  if (CONFIG.storyVideo) {
    video.addEventListener('loadeddata', function () { useVideo = true; storyEl.classList.add('has-video'); lastT = -1; });
    video.src = CONFIG.storyVideo;
  }
  $$('[data-jump=roof]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); jumpStory(0.34); }); });
  function jumpStory(t) { var top = storyEl.offsetTop + t * (storyEl.offsetHeight - innerHeight); scrollTo({ top: top, behavior: RM ? 'auto' : 'smooth' }); }

  /* ===== clean this driveway ===== */
  var pad = $('#pad'), pc = $('#padClean'), pd = $('#padDirt'), dctx = pd.getContext('2d');
  var tagsEl = $('#padTags'), cardsEl = $('#padCards'), curEl = $('#toolCursor');
  var tool = 'cleaner', PW = 0, PH = 0, zones = [], started = 0, timer = null, pro = null, spraying = false, last = null, finished = false;
  var zoneOrder = ['oil', 'tires', 'mildew', 'rust', 'weeds'];
  function sizePad(keep) {
    var r = pad.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
    var w = Math.min(1400, Math.round(r.width * dpr)), h = Math.round(w * r.height / r.width);
    if (keep && Math.abs(w - PW) < 40) return;
    PW = w; PH = h;
    var s = Scenes.slab(w, h);
    pc.width = pd.width = w; pc.height = pd.height = h;
    pc.getContext('2d').drawImage(s.clean, 0, 0);
    dctx.globalCompositeOperation = 'source-over'; dctx.drawImage(s.dirt, 0, 0);
    zones = s.zones;
    tagsEl.innerHTML = ''; cardsEl.innerHTML = '';
    zones.forEach(function (z) {
      var t = document.createElement('span'); t.className = 'tag'; t.textContent = z.label; t.style.left = z.tx * 100 + '%'; t.style.top = z.ty * 100 + '%'; t.dataset.id = z.id; tagsEl.appendChild(t);
    });
    zoneOrder.forEach(function (id) {
      var z = zones.filter(function (q) { return q.id === id; })[0];
      var c = document.createElement('div'); c.className = 'c5'; c.dataset.id = id; c.innerHTML = '<h4>' + z.label + '</h4><p>' + CONFIG.padCards[id] + '</p>'; cardsEl.appendChild(c);
    });
    resetStats();
  }
  function resetStats() { started = 0; finished = false; $('#padPct').textContent = '0%'; $('#padTime').textContent = '0:00'; $('#padDone').hidden = true; $('#padReset').hidden = true; clearInterval(timer); timer = null; }
  function zoneAt(nx, ny) { for (var i = 0; i < zones.length; i++) { var z = zones[i]; if ((z.id === 'rust' || z.id === 'oil') && nx > z.x && nx < z.x + z.w && ny > z.y && ny < z.y + z.h) return z; } return null; }
  function stamp(x, y, ang) {
    var z = zoneAt(x / PW, y / PH), k = z ? 0.5 : 1;
    dctx.save(); dctx.globalCompositeOperation = 'destination-out';
    if (tool === 'cleaner') {
      var r = PW * (PW < 700 ? 0.1 : 0.06);
      var g = dctx.createRadialGradient(x, y, r * 0.55, x, y, r);
      g.addColorStop(0, 'rgba(0,0,0,' + 0.9 * k + ')'); g.addColorStop(1, 'rgba(0,0,0,0)');
      dctx.fillStyle = g; dctx.beginPath(); dctx.arc(x, y, r, 0, 6.283); dctx.fill();
    } else {
      var rw = PW * (PW < 700 ? 0.06 : 0.035);
      dctx.translate(x, y); dctx.rotate(ang || 0);
      var g2 = dctx.createRadialGradient(0, 0, 0, 0, 0, rw);
      g2.addColorStop(0, 'rgba(0,0,0,' + 0.55 * k + ')'); g2.addColorStop(1, 'rgba(0,0,0,0)');
      dctx.fillStyle = g2; dctx.scale(0.45, 1); dctx.beginPath(); dctx.arc(0, 0, rw, 0, 6.283); dctx.fill();
    }
    dctx.restore();
  }
  function sprayTo(x, y) {
    if (!last) { stamp(x, y, 0); last = [x, y]; return; }
    var dx = x - last[0], dy = y - last[1], d = Math.hypot(dx, dy), step = PW * 0.008, n = Math.max(1, Math.ceil(d / step)), a = Math.atan2(dy, dx) + Math.PI / 2;
    for (var i = 1; i <= n; i++) stamp(last[0] + dx * i / n, last[1] + dy * i / n, a);
    last = [x, y];
  }
  function startClock() {
    if (started) return; started = Date.now();
    timer = setInterval(function () { var s = Math.floor((Date.now() - started) / 1000); $('#padTime').textContent = Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); measure(); }, 250);
  }
  function measure() {
    var data = dctx.getImageData(0, 0, PW, PH).data, step = 10, tot = 0, cl = 0, zt = {}, zc = {};
    for (var y = 0; y < PH; y += step) for (var x = 0; x < PW; x += step) {
      var a = data[(y * PW + x) * 4 + 3], c = a < 70; tot++; if (c) cl++;
      var nx = x / PW, ny = y / PH;
      for (var i = 0; i < zones.length; i++) { var z = zones[i]; if (nx > z.x && nx < z.x + z.w && ny > z.y && ny < z.y + z.h) { zt[z.id] = (zt[z.id] || 0) + 1; if (c) zc[z.id] = (zc[z.id] || 0) + 1; } }
    }
    var pct = Math.round(cl / tot * 100); $('#padPct').textContent = pct + '%';
    zones.forEach(function (z) { var done = (zc[z.id] || 0) / (zt[z.id] || 1) > 0.7; var t = $('.tag[data-id=' + z.id + ']'), c = $('.c5[data-id=' + z.id + ']'); t && t.classList.toggle('done', done); c && c.classList.toggle('done', done); });
    if (pct > 2) $('#padReset').hidden = false;
    if (pct >= 93 && !finished) { finished = true; clearInterval(timer); $('#padDone').hidden = false; stopPro(); }
  }
  function local(e) { var r = pd.getBoundingClientRect(); return [(e.clientX - r.left), (e.clientY - r.top), r]; }
  function moveCursor(lx, ly) { curEl.style.transform = 'translate(' + lx + 'px,' + ly + 'px)'; }
  pd.addEventListener('pointerdown', function (e) {
    stopPro(); spraying = true; last = null; pd.setPointerCapture(e.pointerId); startClock(); noise(true);
    var p = local(e); curEl.classList.add('on', 'spray'); moveCursor(p[0], p[1]); sprayTo(p[0] * PW / p[2].width, p[1] * PH / p[2].height);
  });
  pd.addEventListener('pointermove', function (e) {
    var p = local(e); moveCursor(p[0], p[1]);
    if (e.pointerType === 'mouse') curEl.classList.add('on');
    if (spraying) sprayTo(p[0] * PW / p[2].width, p[1] * PH / p[2].height);
  });
  function up(e) { if (!spraying) return; spraying = false; last = null; curEl.classList.remove('spray'); if (e.pointerType !== 'mouse') curEl.classList.remove('on'); noise(false); measure(); }
  pd.addEventListener('pointerup', up); pd.addEventListener('pointercancel', up);
  pd.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && !spraying) curEl.classList.remove('on'); });
  $$('[data-tool]').forEach(function (b) { b.addEventListener('click', function () { tool = b.dataset.tool; $$('[data-tool]').forEach(function (q) { q.classList.toggle('on', q === b); }); curEl.classList.toggle('wand', tool === 'wand'); }); });
  $('#padReset').addEventListener('click', function () { stopPro(); sizePad(false); });
  function stopPro() { if (pro) { cancelAnimationFrame(pro); pro = null; curEl.classList.remove('on', 'spray'); noise(false); measure(); } }
  $('#padPro').addEventListener('click', function () {
    stopPro(); tool = 'cleaner'; $$('[data-tool]').forEach(function (q) { q.classList.toggle('on', q.dataset.tool === 'cleaner'); }); curEl.classList.remove('wand');
    startClock(); noise(true);
    var r = pd.getBoundingClientRect(), rad = PW * (PW < 700 ? 0.1 : 0.06), lane = rad * 1.5, lanes = Math.ceil(PH / lane), t0 = performance.now(), dur = 900 * lanes;
    last = null; curEl.classList.add('on', 'spray');
    function step(now) {
      var f = Math.min(1, (now - t0) / dur), L = f * lanes, i = Math.min(lanes - 1, Math.floor(L)), u = L - i;
      var y = Math.min(PH - rad * 0.5, rad * 0.6 + i * lane), x = (i % 2 ? 1 - u : u) * (PW + rad) - rad / 2;
      if (u < 0.02) last = null;
      sprayTo(x, y); moveCursor(x * r.width / PW, y * r.height / PH);
      if (f < 1) pro = requestAnimationFrame(step); else { pro = null; curEl.classList.remove('on', 'spray'); noise(false); measure(); }
    }
    pro = requestAnimationFrame(step);
  });
  /* spray sound */
  var AC = null, gain = null, soundOn = false;
  $('#soundBtn').addEventListener('click', function () {
    soundOn = !soundOn; this.textContent = 'Sound: ' + (soundOn ? 'on' : 'off'); this.setAttribute('aria-pressed', soundOn); this.classList.toggle('on', soundOn);
    if (soundOn && !AC) {
      try {
        AC = new (window.AudioContext || window.webkitAudioContext)();
        var buf = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate), d = buf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        var src = AC.createBufferSource(); src.buffer = buf; src.loop = true;
        var bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.6;
        gain = AC.createGain(); gain.gain.value = 0; src.connect(bp).connect(gain).connect(AC.destination); src.start();
      } catch (e) { AC = null; }
    }
  });
  function noise(on) { if (!AC || !gain) return; if (AC.state === 'suspended') AC.resume(); gain.gain.setTargetAtTime(on && soundOn ? 0.14 : 0, AC.currentTime, 0.05); }
  sizePad(false);

  /* ===== before / after ===== */
  var ba = $('#ba'), baA = $('#baAfter'), baB = $('#baBefore'), baWrap = $('#baBeforeWrap'), baLine = $('#baLine'), baRange = $('#baRange');
  function sizeBA() {
    var r = ba.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
    var w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    var sw = Math.max(w, h * 1.6), off = (w - sw) / 2;
    [[baA, 0], [baB, 1]].forEach(function (p) { p[0].width = w; p[0].height = h; p[0].getContext('2d').drawImage(Scenes.house(sw, h, p[1]), off, 0); });
  }
  function setBA(v) { baWrap.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)'; baLine.style.left = v + '%'; }
  baRange.addEventListener('input', function () { setBA(+baRange.value); });
  sizeBA(); setBA(50);
  // gentle hint sweep the first time it scrolls into view
  new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (!e.isIntersecting || RM) return; o.disconnect(); var t0 = performance.now(); (function s(n) { var f = Math.min(1, (n - t0) / 1600), v = 50 + Math.sin(f * Math.PI * 2) * 22; setBA(v); baRange.value = v; if (f < 1) requestAnimationFrame(s); else { setBA(50); baRange.value = 50; } })(t0); }); }, { threshold: 0.6 }).observe(ba);

  /* ===== pressure gauge ===== */
  var tabs = $('#surfTabs'), MAX = 4000;
  var ang = function (f) { return 153.43 + 233.13 * f; };
  var ticks = $('#gTicks'), ns = 'http://www.w3.org/2000/svg';
  ['0k', '1k', '2k', '3k', '4k'].forEach(function (l, i) { var a = ang(i / 4) * Math.PI / 180, t = document.createElementNS(ns, 'text'); t.setAttribute('x', 120 + Math.cos(a) * 112); t.setAttribute('y', 100 + Math.sin(a) * 112 + 3); t.textContent = l; ticks.appendChild(t); });
  var gArc = $('#gArc'); gArc.setAttribute('pathLength', 100);
  function showSurface(id) {
    var s = CONFIG.surfaces.filter(function (q) { return q.id === id; })[0];
    $$('button', tabs).forEach(function (b) { b.classList.toggle('on', b.dataset.id === id); b.setAttribute('aria-selected', b.dataset.id === id); });
    var lo = s.lo / MAX * 100, hi = Math.max(lo + 2.5, s.hi / MAX * 100);
    gArc.style.strokeDasharray = (hi - lo).toFixed(2) + ' 100'; gArc.style.strokeDashoffset = (-lo).toFixed(2);
    $('#gNeedle').style.transform = 'rotate(' + ang((lo + hi) / 200) + 'deg)';
    $('#gVal').textContent = s.lo.toLocaleString('en-CA') + '–' + s.hi.toLocaleString('en-CA');
    $('#gMethod').textContent = s.method; $('#gTool').textContent = s.tool; $('#gNote').textContent = s.note;
  }
  CONFIG.surfaces.forEach(function (s) { var b = document.createElement('button'); b.className = 'chip'; b.setAttribute('role', 'tab'); b.dataset.id = s.id; b.textContent = s.name; b.addEventListener('click', function () { showSurface(s.id); }); tabs.appendChild(b); });
  showSurface(CONFIG.defaultSurface);

  /* ===== instant quote ===== */
  var Q = CONFIG.quote, qSize = $('#qSize'), storeys = 2, qItems = $('#qItems');
  Q.items.forEach(function (it) { var b = document.createElement('button'); b.type = 'button'; b.className = 'chip' + (it.on ? ' on' : ''); b.dataset.id = it.id; b.textContent = it.name; b.setAttribute('aria-pressed', it.on); b.addEventListener('click', function () { it.on = !it.on; b.classList.toggle('on', it.on); b.setAttribute('aria-pressed', it.on); calc(); }); qItems.appendChild(b); });
  $$('#qStoreys .chip').forEach(function (b) { b.addEventListener('click', function () { storeys = +b.dataset.v; $$('#qStoreys .chip').forEach(function (q) { q.classList.toggle('on', q === b); }); calc(); }); });
  qSize.addEventListener('input', calc);
  var shown = 0, anim = null;
  function calc() {
    var sq = +qSize.value, lines = [], total = 0;
    $('#qSizeOut').textContent = sq.toLocaleString('en-CA') + ' sq ft';
    Q.items.forEach(function (it) { if (!it.on) return; var p = it.id === 'house' ? Q.house(sq, storeys) : it.price(sq); p = Math.round(p / 5) * 5; total += p; lines.push('<li><span>' + it.name + '</span><b>' + money(p) + '</b></li>'); });
    $('#estLines').innerHTML = lines.join('') || '<li><span>Pick at least one item</span><b>–</b></li>';
    var from = shown, t0 = performance.now(); cancelAnimationFrame(anim);
    (function s(n) { var f = Math.min(1, (n - t0) / 450), e = 1 - Math.pow(1 - f, 3); shown = from + (total - from) * e; $('#estNum').textContent = money(shown); if (f < 1) anim = requestAnimationFrame(s); })(t0);
    var msg = $('#cMsg'); if (msg && !msg.dataset.touched) msg.value = Q.items.filter(function (i) { return i.on; }).map(function (i) { return i.name; }).join(', ') + (total ? ' (estimate ' + money(total) + ', ' + sq.toLocaleString('en-CA') + ' sq ft, ' + storeys + ' storey)' : '');
  }
  $('#cMsg').addEventListener('input', function () { this.dataset.touched = 1; });
  $$('[data-pick]').forEach(function (a) { a.addEventListener('click', function () {
    var p = a.dataset.pick;
    Q.items.forEach(function (it) { it.on = p === 'all' ? it.id !== 'gutters' : it.id === p; var b = $('[data-id=' + it.id + ']', qItems); b.classList.toggle('on', it.on); b.setAttribute('aria-pressed', it.on); });
    calc();
  }); });
  calc();

  /* ===== reveals + dock ===== */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.15 });
  $$('.sec-head, .pad, .cards5, .ba, .two > *, .pk article').forEach(function (el, i) { el.classList.add('reveal'); el.style.transitionDelay = (el.matches('.pk article') ? (i % 3) * 90 : 0) + 'ms'; io.observe(el); });
  new IntersectionObserver(function (es) { es.forEach(function (e) { $('#dock').classList.toggle('hide', e.isIntersecting); $('#dock').style.transform = e.isIntersecting ? 'translate(-50%,140%)' : ''; }); }, { threshold: 0.2 }).observe($('#contact'));

  /* ===== tour (?tour=1) ===== */
  if (new URLSearchParams(location.search).get('tour') === '1') {
    var steps = [
      { t: 0.02, txt: 'A scroll story. As visitors scroll, the house gets cleaner and the curb appeal score climbs from 38 to 99.' },
      { t: 0.2, txt: 'Driveway first: each caption explains the method in plain words, then offers "Price my driveway".' },
      { t: 0.4, txt: 'The roof chapter explains soft washing, which answers the biggest worry before anyone asks.' },
      { t: 0.72, txt: 'Siding: low pressure and the right mix. Swap in the client\'s own footage and it scrubs the same way.' },
      { t: 0.95, txt: 'Welcome home: the finished house and a "Build your quote" button.' },
      { el: '#try', txt: 'Clean this driveway: a game visitors play with a finger or mouse. Each stain card lights up as it is cleaned.' },
      { el: '#compare', txt: 'Before and after: drag the line. Uses the client\'s own photos.' },
      { el: '#pressure', txt: 'The right pressure for every surface: tap a surface and the gauge swings to its range.' },
      { el: '#quote', txt: 'Instant quote: size, storeys and add-ons give a live estimate that fills in the contact form.' },
      { el: '#packages', txt: 'Packages with the client\'s prices.' },
      { el: '#contact', txt: 'Get in touch: "Build your quote" and "Get in touch" buttons, no phone number on show.' }
    ];
    var tour = $('#tour'), si = 0, paused = false, tt = null;
    tour.hidden = false;
    function go(i) {
      si = i; if (si >= steps.length) { tour.hidden = true; return; }
      var s = steps[si]; $('#tourStep').textContent = (si + 1) + ' / ' + steps.length; $('#tourText').textContent = s.txt;
      if (s.el) scrollTo({ top: $(s.el).offsetTop - 60, behavior: 'smooth' }); else jumpStory(s.t);
      clearTimeout(tt); if (!paused) tt = setTimeout(function () { go(si + 1); }, 5200);
    }
    $('#tourNext').addEventListener('click', function () { go(si + 1); });
    $('#tourPause').addEventListener('click', function () { paused = !paused; this.textContent = paused ? 'Play' : 'Pause'; clearTimeout(tt); if (!paused) tt = setTimeout(function () { go(si + 1); }, 2500); });
    $('#tourEnd').addEventListener('click', function () { clearTimeout(tt); tour.hidden = true; });
    setTimeout(function () { go(0); }, 1200);
  }
})();
