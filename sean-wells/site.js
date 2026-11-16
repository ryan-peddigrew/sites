/* Sean Wells: concept by Chairlift. (c) 2026 Chairlift. Not for reuse or distribution. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var Q = new URLSearchParams(location.search);
  var TOUR = Q.get('tour') === '1';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PHONE = matchMedia('(max-width:700px)').matches;
  var HOME = document.body.classList.contains('home');

  /* ===== watermark (prominent, tiled) ===== */
  (function () {
    var T = 'CONCEPT  ·  DESIGNED AND POWERED BY CHAIRLIFT';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="820" height="360"><g transform="rotate(-22 410 180)" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="17" letter-spacing="2.4">' +
      '<text x="60" y="130" fill="#ffffff" fill-opacity=".30" stroke="#0b1018" stroke-opacity=".30" stroke-width="2.2" paint-order="stroke">' + T + '</text>' +
      '<text x="-350" y="310" fill="#ffffff" fill-opacity=".30" stroke="#0b1018" stroke-opacity=".30" stroke-width="2.2" paint-order="stroke">' + T + '</text></g></svg>';
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

  /* ===== FX canvas: mist, sparks, the dove ===== */
  var cv = $('#fx'), cx = cv.getContext('2d'), W = 0, H = 0, DPR = Math.min(PHONE ? 1 : 1.5, devicePixelRatio || 1);
  function size() { W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; cx.setTransform(DPR, 0, 0, DPR, 0, 0); }
  size(); addEventListener('resize', size);

  // soft puff sprite
  var puff = document.createElement('canvas'); puff.width = puff.height = 256;
  (function () { var p = puff.getContext('2d'), g = p.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(214,204,255,.55)'); g.addColorStop(.4, 'rgba(170,150,240,.22)'); g.addColorStop(1, 'rgba(120,100,220,0)');
    p.fillStyle = g; p.fillRect(0, 0, 256, 256); })();

  var mist = [], sparks = [], mistLevel = HOME ? .9 : .55;
  function addPuff(x, y, r, vx, vy, life) { mist.push({ x: x, y: y, r: r, vx: vx, vy: vy, a: 0, life: life || 0, t: 0, rot: Math.random() * 6 }); }
  var BASE = PHONE ? 14 : 26;
  for (var i = 0; i < BASE; i++) addPuff(Math.random() * innerWidth, innerHeight * (.35 + Math.random() * .75), 160 + Math.random() * 260, (Math.random() - .5) * .25, -.05 - Math.random() * .12, 0);
  function burst(x, y, n, spd, col) {
    for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, s = spd * (.3 + Math.random());
      sparks.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - spd * .2, life: 0, max: 40 + Math.random() * 50, sz: .8 + Math.random() * 2.2, c: col || (Math.random() < .7 ? '230,222,255' : '175,150,255') }); }
  }
  function smokeBurst(x, y, n, big) { for (var i = 0; i < n; i++) addPuff(x + (Math.random() - .5) * 80, y + (Math.random() - .5) * 60, (big || 120) * (.6 + Math.random() * .8), (Math.random() - .5) * 2.2, -.4 - Math.random() * 1.2, 160 + Math.random() * 120); }
  var flash = 0;
  function pop(x, y) { flash = 1; burst(x, y, PHONE ? 70 : 130, 6); smokeBurst(x, y, PHONE ? 8 : 14, 150); }

  // dove made of light
  var DOVE = (function () {
    var c = document.createElement('canvas'); c.width = 200; c.height = 150; var g = c.getContext('2d'); g.fillStyle = '#fff';
    g.save(); g.translate(100, 98); g.rotate(-.18); g.beginPath(); g.ellipse(0, 0, 44, 15, 0, 0, 6.283); g.fill(); g.restore();
    g.beginPath(); g.arc(142, 84, 12, 0, 6.283); g.fill();
    g.beginPath(); g.moveTo(151, 81); g.lineTo(166, 86); g.lineTo(151, 90); g.fill();
    g.beginPath(); g.moveTo(64, 102); g.lineTo(18, 92); g.lineTo(22, 104); g.lineTo(16, 116); g.lineTo(66, 110); g.fill();
    g.beginPath(); g.moveTo(92, 94); g.bezierCurveTo(80, 60, 62, 34, 26, 14); g.bezierCurveTo(40, 30, 44, 40, 40, 44); g.bezierCurveTo(56, 52, 66, 70, 84, 98); g.fill();
    g.beginPath(); g.moveTo(104, 92); g.bezierCurveTo(106, 56, 118, 26, 150, 4); g.bezierCurveTo(144, 26, 146, 34, 152, 36); g.bezierCurveTo(132, 52, 126, 74, 120, 98); g.fill();
    var d = g.getImageData(0, 0, 200, 150).data, pts = [], step = PHONE ? 4 : 3;
    for (var y = 0; y < 150; y += step) for (var x = 0; x < 200; x += step) if (d[(y * 200 + x) * 4 + 3] > 128) pts.push([x - 100, y - 92]);
    return pts;
  })();
  var doves = [];
  function dove(x, y) {
    var s = Math.min(1.5, Math.max(.9, W / 900));
    doves.push({ x: x, y: y, t: 0, s: s, p: DOVE.map(function (q) { return { x: x + (Math.random() - .5) * 260, y: y + (Math.random() - .5) * 200, q: q, vx: 0, vy: 0, free: false }; }) });
  }

  // cursor spark trail (desktop) and tap sparks (phones)
  var lastM = 0;
  addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse' || RM) return; var n = performance.now(); if (n - lastM < 24) return; lastM = n;
    sparks.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * .6, vy: .2 + Math.random() * .5, life: 0, max: 34 + Math.random() * 20, sz: .6 + Math.random() * 1.6, c: Math.random() < .5 ? '230,222,255' : '175,150,255' }); }, { passive: true });
  addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse' || RM) return; burst(e.clientX, e.clientY, 18, 2.4); }, { passive: true });

  var running = !RM;
  function frame() {
    cx.clearRect(0, 0, W, H);
    // mist
    cx.globalCompositeOperation = 'source-over';
    for (var i = mist.length - 1; i >= 0; i--) {
      var m = mist[i]; m.t++; m.x += m.vx; m.y += m.vy; m.rot += .0008;
      if (m.life) { m.vx *= .985; m.vy *= .985; m.r += .9; var k = m.t / m.life; m.a = k < .15 ? k / .15 : Math.max(0, 1 - (k - .15) / .85); if (m.t > m.life) { mist.splice(i, 1); continue; } }
      else { m.a = Math.min(1, m.a + .01); if (m.y < -m.r) { m.y = H + m.r; m.x = Math.random() * W; } if (m.x < -m.r) m.x = W + m.r; if (m.x > W + m.r) m.x = -m.r; }
      cx.globalAlpha = m.a * (m.life ? .32 : .075 * mistLevel);
      cx.save(); cx.translate(m.x, m.y); cx.rotate(m.rot); cx.drawImage(puff, -m.r, -m.r, m.r * 2, m.r * 2); cx.restore();
    }
    cx.globalCompositeOperation = 'lighter';
    // flash
    if (flash > 0) { var fg = cx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * .7); fg.addColorStop(0, 'rgba(235,228,255,' + (flash * .55) + ')'); fg.addColorStop(1, 'rgba(120,90,255,0)'); cx.globalAlpha = 1; cx.fillStyle = fg; cx.fillRect(0, 0, W, H); flash *= .86; if (flash < .02) flash = 0; }
    // sparks
    for (i = sparks.length - 1; i >= 0; i--) {
      var s = sparks[i]; s.life++; s.x += s.vx; s.y += s.vy; s.vx *= .96; s.vy = s.vy * .96 + .03;
      var a = 1 - s.life / s.max; if (a <= 0) { sparks.splice(i, 1); continue; }
      cx.globalAlpha = a; cx.fillStyle = 'rgb(' + s.c + ')'; cx.beginPath(); cx.arc(s.x, s.y, s.sz * (.6 + a * .6), 0, 6.283); cx.fill();
    }
    // doves
    for (i = doves.length - 1; i >= 0; i--) {
      var d = doves[i]; d.t++;
      var T = d.t / 60, fly = Math.max(0, T - .55), ox = d.x + fly * fly * 90 * d.s + fly * 60, oy = d.y - fly * fly * 170 * d.s - fly * 40,
        flap = Math.cos(T * 11), rot = -.15 - fly * .12, sc = d.s * (1 + fly * .12), done = true;
      var cr = Math.cos(rot), sr = Math.sin(rot);
      cx.fillStyle = 'rgb(240,236,255)';
      for (var j = 0; j < d.p.length; j++) {
        var p = d.p[j];
        if (!p.free) {
          var qx = p.q[0], qy = p.q[1];
          if (qy < 0) qy = qy * (T < .55 ? 1 : flap);
          var tx = ox + (qx * cr - qy * sr) * sc, ty = oy + (qx * sr + qy * cr) * sc;
          var e = T < .55 ? .12 : .5; p.vx = tx - p.x; p.vy = ty - p.y; p.x += (tx - p.x) * e; p.y += (ty - p.y) * e;
          if (T > 1.9 + Math.random() * .6) { p.free = true; p.vx = (Math.random() - .5) * 2.4 + 1; p.vy = -Math.random() * 2.2; p.l = 0; }
          done = false; cx.globalAlpha = .85;
        } else {
          p.l++; p.x += p.vx; p.y += p.vy; p.vx *= .97; p.vy *= .97; var fa = 1 - p.l / 50; if (fa <= 0) continue; done = false; cx.globalAlpha = fa * .8;
          if (Math.random() < .004) addPuff(p.x, p.y, 70, p.vx * .3, -.5, 140);
        }
        cx.fillRect(p.x, p.y, 1.8, 1.8);
      }
      if (done) doves.splice(i, 1);
    }
    cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over';
    if (running) requestAnimationFrame(frame);
  }
  if (running) requestAnimationFrame(frame);

  /* ===== GET IN TOUCH: a pop, a dove, then the email ===== */
  $$('#poof').forEach(function (b) {
    b.addEventListener('click', function (e) {
      if (RM) return; e.preventDefault(); var r = b.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      pop(x, y); dove(x, y - 20);
      if (!document.body.classList.contains('touring')) setTimeout(function () { location.href = b.href; }, 1500);
    });
  });

  /* ===== record page: entries materialise ===== */
  if (!HOME) {
    if ('IntersectionObserver' in window && !RM) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); var r = en.target.getBoundingClientRect(); smokeBurst(r.left + 80, r.top + 40, 2, 90); io.unobserve(en.target); } }); }, { threshold: .25 });
      $$('.tl-i').forEach(function (el) { io.observe(el); });
    } else $$('.tl-i').forEach(function (el) { el.classList.add('in'); });
    return;
  }

  /* ===== HOME: the story ===== */
  var story = $('#story'), photo = $('#photo'), scs = $$('.sc'), acts = $$('#acts li'), N = scs.length, last = -1, hdr = $('#hdr');
  function lerpK(k, p) { for (var i = 1; i < k.length; i++) if (p <= k[i][0]) { var a = k[i - 1], b = k[i], u = (p - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * u; } return k[k.length - 1][1]; }
  var KO = [[0, 0], [.13, 0], [.22, 1], [.33, 1], [.43, .28], [.6, .16], [.74, .1], [.84, .55], [1, .45]];
  var KB = [[0, 10], [.2, 0], [.33, 0], [.44, 9], [.8, 9], [.86, 1], [1, 1]];
  var KG = [[0, 0], [.33, 0], [.44, .9], [.8, .9], [.86, 0], [1, 0]];
  var yr = $('#yr'), bands = $$('.band'), bandT = 0;
  if (!RM) (function bt() { bandT = (bandT + .35) % 1400; render(); requestAnimationFrame(bt); })();
  function prog() { var r = story.getBoundingClientRect(); return Math.min(1, Math.max(0, -r.top / Math.max(1, story.offsetHeight - innerHeight))); }
  function render() {
    var p = prog(), seg = 1 / N;
    photo.style.opacity = lerpK(KO, p);
    photo.style.filter = 'blur(' + lerpK(KB, p).toFixed(1) + 'px) grayscale(' + lerpK(KG, p).toFixed(2) + ')';
    photo.style.transform = 'scale(' + (1.12 - p * .12).toFixed(3) + ')';
    var cur = Math.min(N - 1, Math.floor(p / seg));
    scs.forEach(function (el, i) {
      var u = (p - i * seg) / seg, o;
      if (u < -.05 || u > 1.05) { o = 0; }
      else { o = 1; if (i > 0 && u < .25) o = u / .25; if (i < N - 1 && u > .75) o = (1 - u) / .25; o = Math.max(0, Math.min(1, o)); }
      if (i === 0 && document.body.classList.contains('intro')) o = 0;
      el.style.opacity = o; el.classList.toggle('on', o > .01);
      var bl = (1 - o) * 10, sc = u < .5 ? .55 + o * .45 : 1 + (1 - o) * 1.6;
      el.style.filter = o > .99 ? 'none' : 'blur(' + bl.toFixed(1) + 'px)';
      el.style.transform = 'scale(' + sc.toFixed(3) + ')';
    });
    acts.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
    if (cur !== last) { if (last >= 0 && !RM) { smokeBurst(W * (.3 + Math.random() * .4), H * .6, PHONE ? 4 : 7, 160); burst(W / 2, H * .55, 16, 3); } last = cur; }
    // 1993: time rewinds into place
    var u4 = (p - 4 * seg) / seg; if (u4 > -.1 && u4 < 1.1) { var k = Math.max(0, Math.min(1, (u4 + .05) / .45)); yr.textContent = Math.round(2026 - (2026 - 1993) * (1 - Math.pow(1 - k, 3))); }
    bands.forEach(function (b, i) { b.style.transform = 'translateX(' + ((i % 2 ? -1 : 1) * (p * 1400 + bandT) - 700) + 'px)'; });
    hdr.classList.toggle('solid', p >= 1);
    mistLevel = .9 + lerpK([[0, .3], [.33, 0], [.44, .8], [1, .3]], p);
  }
  addEventListener('scroll', render, { passive: true }); addEventListener('resize', render);

  // rotating word
  var words = ['FESTIVALS', 'CONCERT TOURS', 'LIVE EVENTS', 'VIDEO FOR LIVE SHOWS'], wi = 0, rot = $('#rot');
  if (!RM) setInterval(function () { rot.classList.add('swap'); setTimeout(function () { wi = (wi + 1) % words.length; rot.textContent = words[wi]; rot.classList.remove('swap'); }, 350); }, 2200);

  // intro: a pop, a dove of light, the name out of the smoke (once per visit)
  var seen = false; try { seen = sessionStorage.getItem('sw-in') === '1'; } catch (e) {}
  if (!RM && (!seen || TOUR) && scrollY < 10) {
    document.body.classList.add('intro'); render();
    setTimeout(function () { pop(W / 2, H * .5); dove(W / 2, H * .52); }, 450);
    setTimeout(function () { document.body.classList.remove('intro'); scs[0].style.transition = 'opacity 1.4s, filter 1.4s'; render(); setTimeout(function () { scs[0].style.transition = ''; }, 1500); }, 1500);
    try { sessionStorage.setItem('sw-in', '1'); } catch (e) {}
  }
  render();

  /* ===== tour (?tour=1): single tap, auto-plays ===== */
  var TS = [
    { p: .02, k: 'THE IDEA', h: 'Sean, this is your stage', p2: 'Not a resume. A showcase of you, told the way you’d run a show: dark, smoky, and full of reveals.', o: '<b>Why:</b> a resume lists jobs. This makes people feel the work.' },
    { p: .25, k: 'ACT ONE', h: 'Now you see it', p2: 'Your festival stage, straight from your LinkedIn, rising out of the smoke as you scroll.', o: '<b>Next:</b> a few more show photos make every scene hit harder.' },
    { p: .41, k: 'ACT TWO', h: 'Now you don’t', p2: 'The illusion is the brand: the crowd never sees the work, and that’s the whole point.', o: '<b>Why:</b> it says what you do without a wall of job titles.' },
    { p: .58, k: 'THE ILLUSIONIST', h: 'The hard part, gone', p2: 'Festivals, concert tours, live events, video for live shows. All pulled from your own profile.', o: '' },
    { p: .75, k: 'THE LONG GAME', h: '1993', p2: 'Watch the years rewind. Three decades, told in one number.', o: '<b>Why:</b> experience lands harder as a moment than as a bullet point.' },
    { p: .92, k: 'THE PRESTIGE', h: 'The record, one tap away', p2: 'Your roles, unions and certifications live on their own page, not on the front. Details for anyone who wants them.', o: '' },
    { el: '#contact', k: 'THE FINAL ACT', h: 'Dark Magic, front and centre', p2: 'Your sean@darkmagic.one address, big and bold. Tap Get in touch: a pop, a dove of light, then a fresh email to you.', o: '<b>Opportunity:</b> a link you can drop into any email, pitch or bio.', poof: true },
    { el: '#contact', k: 'EVERYWHERE', h: 'Mist, sparks and smoke', p2: 'On a laptop, sparks follow the cursor. On a phone, they burst wherever you tap. Every scene change lets out a little smoke.', o: '' },
    { el: '#contact', k: 'THAT’S THE SHOW', h: 'Built to grow with you', p2: 'Send a few more show photos and a line or two in your own words, and it’s ready to share.', o: '' }
  ];
  var tour = $('#tour'), ti = 0, paused = false, tt = null, DUR = 7000, t0 = 0, left = DUR, raf;
  function tick() { if (paused) return; var f = Math.min(1, (performance.now() - t0) / left); $('#tourBar').style.width = ((1 - left / DUR) + f * left / DUR) * 100 + '%'; if (f < 1) raf = requestAnimationFrame(tick); }
  function tgo(i) {
    clearTimeout(tt); cancelAnimationFrame(raf);
    if (i >= TS.length) return tend();
    ti = i; var s = TS[i];
    $('#tourK').textContent = s.k; $('#tourN').textContent = (i + 1) + ' / ' + TS.length; $('#tourH').textContent = s.h; $('#tourP').textContent = s.p2;
    $('#tourO').innerHTML = s.o; $('#tourO').hidden = !s.o;
    var top = s.el ? $(s.el).offsetTop - 40 : story.offsetTop + s.p * (story.offsetHeight - innerHeight);
    scrollTo({ top: top, behavior: RM ? 'auto' : 'smooth' });
    if (s.poof) setTimeout(function () { var b = $('#poof'); if (b) b.click(); }, 1800);
    left = DUR; t0 = performance.now(); $('#tourBar').style.width = '0';
    if (!paused) { tt = setTimeout(function () { tgo(ti + 1); }, DUR); raf = requestAnimationFrame(tick); }
  }
  function tend() { clearTimeout(tt); cancelAnimationFrame(raf); tour.hidden = true; document.body.classList.remove('touring'); }
  $('#tourNext').addEventListener('click', function () { tgo(ti + 1); });
  $('#tourEnd').addEventListener('click', tend);
  $('#tourPause').addEventListener('click', function () {
    paused = !paused; this.textContent = paused ? 'PLAY' : 'PAUSE';
    if (paused) { clearTimeout(tt); cancelAnimationFrame(raf); left = Math.max(400, left - (performance.now() - t0)); }
    else { t0 = performance.now(); tt = setTimeout(function () { tgo(ti + 1); }, left); raf = requestAnimationFrame(tick); }
  });
  $('#tourStart').addEventListener('click', function (e) { e.preventDefault(); startTour(); });
  function startTour() { tour.hidden = false; document.body.classList.add('touring'); paused = false; $('#tourPause').textContent = 'PAUSE'; tgo(0); }
  if (TOUR) setTimeout(startTour, 2600);
})();
