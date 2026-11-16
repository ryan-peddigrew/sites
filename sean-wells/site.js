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
    g.addColorStop(0, 'rgba(235,235,235,.5)'); g.addColorStop(.4, 'rgba(200,200,200,.2)'); g.addColorStop(1, 'rgba(160,160,160,0)');
    p.fillStyle = g; p.fillRect(0, 0, 256, 256); })();

  var mist = [], sparks = [], mistLevel = HOME ? .9 : .55;
  function addPuff(x, y, r, vx, vy, life) { mist.push({ x: x, y: y, r: r, vx: vx, vy: vy, a: 0, life: life || 0, t: 0, rot: Math.random() * 6 }); }
  var BASE = PHONE ? 20 : 36;
  for (var i = 0; i < BASE; i++) addPuff(Math.random() * innerWidth, innerHeight * (.35 + Math.random() * .75), 160 + Math.random() * 260, (Math.random() - .5) * .25, -.05 - Math.random() * .12, 0);
  function burst(x, y, n, spd, col) {
    for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, s = spd * (.3 + Math.random());
      sparks.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - spd * .2, life: 0, max: 40 + Math.random() * 50, sz: .8 + Math.random() * 2.2, c: col || (Math.random() < .7 ? '240,240,240' : '200,200,200') }); }
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
  addEventListener('pointermove', function (e) { if (true) return; var n = performance.now(); if (n - lastM < 24) return; lastM = n;
    sparks.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * .6, vy: .2 + Math.random() * .5, life: 0, max: 34 + Math.random() * 20, sz: .6 + Math.random() * 1.6, c: Math.random() < .5 ? '240,240,240' : '200,200,200' }); }, { passive: true });
  addEventListener('pointerdown', function (e) { if (true) return; burst(e.clientX, e.clientY, 18, 2.4); }, { passive: true });


  var PR = {
    hat: [new Path2D('M14 76 C14 69 86 69 86 76 C86 84 14 84 14 76 Z M30 73 L33 27 C42 22 58 22 67 27 L70 73 M32 41 C44 46 56 46 68 41')],
    dove: [new Path2D('M18 62 C34 59 46 63 56 60 C64 57 70 53 76 50 L86 50 L78 55 C74 67 60 73 44 71 L24 76 L29 67 Z M48 61 C44 45 36 31 20 22 C36 26 49 37 57 53 M57 57 C59 41 67 26 84 17 C77 32 71 45 65 59')],
    saw: [(function () { var d = 'M8 44 L76 38 L78 56 L10 62 Z M10 62'; for (var i = 0; i < 9; i++) { var x = 12 + i * 7.4, y = 61.8 - i * .66; d += ' L' + (x + 3.7).toFixed(1) + ' ' + (y + 4.6).toFixed(1) + ' L' + (x + 7.4).toFixed(1) + ' ' + (y - .66).toFixed(1); } d += ' M76 37 L92 35 C97 35 97 59 92 59 L78 57 M83 43 L89 43 L89 51 L83 51 Z'; return new Path2D(d); })()],
    box: [new Path2D('M22 40 L58 31 L80 40 L44 49 Z M22 40 L22 75 L44 85 L44 49 M44 85 L80 75 L80 40 M33 58 L33 70 M38 60 L38 72 M58 62 L70 58')],
    wand: [new Path2D('M22 82 L74 26'), new Path2D('M70 30 L78 22')]
  };
  var KINDS = ['hat', 'saw', 'box', 'wand'], props = [], nextProp = 0, kindI = Math.floor(Math.random() * 4);
  function spawnProp(now) {
    var k = KINDS[kindI++ % KINDS.length], s = (PHONE ? 80 : 120) + Math.random() * (PHONE ? 40 : 90);
    var x = W * (.12 + Math.random() * .76), y = H * (.3 + Math.random() * .55);
    props.push({ k: k, x: x, y: y, s: s, r: (Math.random() - .5) * .6, vr: (Math.random() - .5) * .003, vx: (Math.random() - .5) * .25, vy: -.12 - Math.random() * .18, t: 0, life: 520 + Math.random() * 240 });
    smokeBurst(x, y, PHONE ? 3 : 5, 90); burst(x, y, 22, 2.6);
  }
  function drawProps() {
    var now = performance.now();
    if (now > nextProp && props.length < (PHONE ? 2 : 4)) { spawnProp(now); nextProp = now + 2600 + Math.random() * 2200; }
    cx.globalCompositeOperation = 'lighter'; cx.lineCap = 'round'; cx.lineJoin = 'round';
    for (var i = props.length - 1; i >= 0; i--) {
      var o = props[i]; o.t++; o.x += o.vx; o.y += o.vy + Math.sin(o.t / 60) * .15; o.r += o.vr;
      var k = o.t / o.life, a = k < .12 ? k / .12 : k > .85 ? Math.max(0, (1 - k) / .15) : 1;
      if (o.t > o.life) { smokeBurst(o.x, o.y, PHONE ? 3 : 5, 80); burst(o.x, o.y, 16, 2.2); props.splice(i, 1); continue; }
      cx.save(); cx.translate(o.x, o.y); cx.rotate(o.r); cx.scale(o.s / 100, o.s / 100); cx.translate(-50, -50);
      cx.globalAlpha = a * .5; cx.strokeStyle = 'rgba(201,184,255,1)'; cx.lineWidth = 5.5; PR[o.k].forEach(function (p) { cx.stroke(p); });
      cx.globalAlpha = a * .8; cx.strokeStyle = 'rgba(244,240,255,1)'; cx.lineWidth = 1.6; PR[o.k].forEach(function (p) { cx.stroke(p); });
      if (o.k === 'wand') { cx.globalAlpha = a; cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(78, 22, 2.4 + Math.sin(o.t / 8), 0, 6.283); cx.fill(); if (o.t % 6 === 0) sparks.push({ x: o.x + (28 * o.s / 100), y: o.y - (28 * o.s / 100), vx: (Math.random() - .5), vy: Math.random() * .6, life: 0, max: 40, sz: 1.2, c: '240,240,240' }); }
      cx.restore();
    }
    cx.globalCompositeOperation = 'source-over';
  }
  // a random poof now and then


  var running = !RM;
  function frame() {
    cx.clearRect(0, 0, W, H);
    // mist
    cx.globalCompositeOperation = 'source-over';
    for (var i = mist.length - 1; i >= 0; i--) {
      var m = mist[i]; m.t++; m.x += m.vx; m.y += m.vy; m.rot += .0008;
      if (m.life) { m.vx *= .985; m.vy *= .985; m.r += .9; var k = m.t / m.life; m.a = k < .15 ? k / .15 : Math.max(0, 1 - (k - .15) / .85); if (m.t > m.life) { mist.splice(i, 1); continue; } }
      else { m.a = Math.min(1, m.a + .01); if (m.y < -m.r) { m.y = H + m.r; m.x = Math.random() * W; } if (m.x < -m.r) m.x = W + m.r; if (m.x > W + m.r) m.x = -m.r; }
      cx.globalAlpha = m.a * (m.life ? .16 : .11 * mistLevel);
      cx.save(); cx.translate(m.x, m.y); cx.rotate(m.rot); cx.drawImage(puff, -m.r, -m.r, m.r * 2, m.r * 2); cx.restore();
    }
    cx.globalCompositeOperation = 'lighter';
    // flash
    if (flash > 0) { var fg = cx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * .7); fg.addColorStop(0, 'rgba(240,240,240,' + (flash * .55) + ')'); fg.addColorStop(1, 'rgba(150,150,150,0)'); cx.globalAlpha = 1; cx.fillStyle = fg; cx.fillRect(0, 0, W, H); flash *= .86; if (flash < .02) flash = 0; }
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

  /* ===== the wand: tap for a poof ===== */
  var wand = $('#wand');
  if (wand) wand.addEventListener('click', function () {
    var r = wand.getBoundingClientRect(), x = r.left + r.width * .8, y = r.top + r.height * .2;
    wand.classList.remove('tap'); void wand.offsetWidth; wand.classList.add('tap');
    if (RM) return; flash = .5; burst(x, y, PHONE ? 50 : 90, 4.5); smokeBurst(x, y + 30, PHONE ? 6 : 10, 120);
  });

  /* ===== GET IN TOUCH: a pop, a dove, then the email ===== */
  $$('#poof').forEach(function (b) {
    b.addEventListener('click', function (e) {
      if (document.body.classList.contains('touring')) e.preventDefault();
    });
  });

  /* ===== record page: entries materialise ===== */
  if (!HOME) {
    if ('IntersectionObserver' in window && !RM) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { threshold: .25 });
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

  function prog() { var r = story.getBoundingClientRect(); return Math.min(1, Math.max(0, -r.top / Math.max(1, story.offsetHeight - innerHeight))); }
  function render() {
    var p = prog(), seg = 1 / N;
    var pics = photo.children;
    var cur = Math.min(N - 1, Math.floor(p / seg));
    scs.forEach(function (el, i) {
      var u = (p - i * seg) / seg, o;
      if (u < -.05 || u > 1.05) { o = 0; }
      else { o = 1; if (i > 0 && u < .25) o = u / .25; if (i < N - 1 && u > .75) o = (1 - u) / .25; o = Math.max(0, Math.min(1, o)); }
      if (i === 0 && document.body.classList.contains('intro')) o = 0;
      el.style.opacity = o; el.classList.toggle('on', o > .01);
      if (pics[i]) { pics[i].style.opacity = i === 0 ? Math.max(o, 0) : o; var z = 1.18 - Math.max(0, Math.min(1, u)) * .16; pics[i].querySelector('.vp').style.transform = 'scale(' + z.toFixed(3) + ')'; var vv = pics[i].querySelector('video'); if (vv && i) { if (o > .01 && vv.paused) { vv.play().catch(function () {}); } else if (o <= .01 && !vv.paused) vv.pause(); } }
      var bl = (1 - o) * 10, sc = u < .5 ? .55 + o * .45 : 1 + (1 - o) * 1.6;
      el.style.filter = o > .99 ? 'none' : 'blur(' + bl.toFixed(1) + 'px)';
      el.style.transform = 'scale(' + sc.toFixed(3) + ')';
    });
    acts.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
    if (cur !== last) { last = cur; }
    // 1993: time rewinds into place
    bands.forEach(function (b, i) { b.style.transform = 'translateX(' + ((i % 2 ? -1 : 1) * (p * 1400 + bandT) - 700) + 'px)'; });
    hdr.classList.toggle('solid', p >= 1);
    mistLevel = .9 + lerpK([[0, .3], [.33, 0], [.44, .8], [1, .3]], p);
  }
  addEventListener('scroll', render, { passive: true }); addEventListener('resize', render);


  /* fly-through: Veld photos rush past the camera */
  var fly = $('#fly'), fls = $$('.fl'), FL = fls.map(function (el, i) {
    var a = i * 2.39996, r = .22 + (i % 5) * .07;
    return { el: el, x: Math.cos(a) * r, y: Math.sin(a) * r * .8, z: -i * 420 };
  });
  var DEPTH = fls.length * 420 + 900;
  function flyRender() {
    if (!fly) return;
    var r = fly.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / Math.max(1, fly.offsetHeight - innerHeight)));
    if (r.bottom < 0 || r.top > innerHeight) return;
    var cam = p * DEPTH;
    FL.forEach(function (f) {
      var z = f.z + cam, o = z > 600 ? 0 : z < -6000 ? 0 : Math.min(1, (z + 6000) / 2000) * (z > 200 ? 1 - (z - 200) / 400 : 1);
      f.el.style.opacity = Math.max(0, o).toFixed(2);
      f.el.style.transform = 'translate(-50%,-50%) translate3d(' + (f.x * innerWidth).toFixed(0) + 'px,' + (f.y * innerHeight).toFixed(0) + 'px,' + z.toFixed(0) + 'px)';
    });
  }
  addEventListener('scroll', flyRender, { passive: true }); addEventListener('resize', flyRender); flyRender();

  // rotating word
  var words = ['FESTIVALS', 'CONCERT TOURS', 'LIVE EVENTS', 'VIDEO FOR LIVE SHOWS'], wi = 0, rot = $('#rot');
  if (!RM) setInterval(function () { rot.classList.add('swap'); setTimeout(function () { wi = (wi + 1) % words.length; rot.textContent = words[wi]; rot.classList.remove('swap'); }, 350); }, 2200);

  // intro: a pop, the name out of the smoke (once per visit)
  var seen = false; try { seen = sessionStorage.getItem('sw-in') === '1'; } catch (e) {}
  if (!RM && (!seen || TOUR) && scrollY < 10) {
    document.body.classList.add('intro'); render();
    setTimeout(function () { document.body.classList.remove('intro'); scs[0].style.transition = 'opacity 1.4s, filter 1.4s'; render(); setTimeout(function () { scs[0].style.transition = ''; }, 1500); }, 1500);
    try { sessionStorage.setItem('sw-in', '1'); } catch (e) {}
  }
  render();

  /* ===== tour (?tour=1): single tap, auto-plays ===== */
  var TS = [
    { p: .02, k: 'THE IDEA', h: 'Sean, this is your stage', p2: 'Not a resume. A showcase of you, told the way you’d run a show: dark, smoky, and full of reveals.', o: '<b>Why:</b> a resume lists jobs. This makes people feel the work.' },
    { p: .25, k: 'ACT ONE', h: 'Now you see it', p2: 'Veld, the festival you run, rising out of the smoke as you scroll. Every scene sits on a real Veld photo.', o: '<b>Next:</b> a few more show photos make every scene hit harder.' },
    { p: .41, k: 'ACT TWO', h: 'Now you don’t', p2: 'The illusion is the brand: the crowd never sees the work, and that’s the whole point.', o: '<b>Why:</b> it says what you do without a wall of job titles.' },
    { p: .58, k: 'THE ILLUSIONIST', h: 'The hard part, gone', p2: 'Festivals, concert tours, live events, video for live shows. All pulled from your own profile.', o: '' },
    { p: .75, k: 'THE LONG GAME', h: '1993', p2: 'Watch the years rewind. Three decades, told in one number.', o: '<b>Why:</b> experience lands harder as a moment than as a bullet point.' },
    { p: .92, k: 'THE PRESTIGE', h: 'The record, one tap away', p2: 'Your roles, unions and certifications live on their own page, not on the front. Details for anyone who wants them.', o: '' },
    { el: '#fly', k: 'FLY-THROUGH', h: 'Every moment, by design', p2: 'Festival photos rush past the camera as you scroll. No single show named, so it speaks to all of your work.', o: '' },
    { el: '#contact', k: 'THE FINAL ACT', h: 'Dark Magic, front and centre', p2: 'Your sean@darkmagic.one address, big and bold. Tap Get in touch and a fresh email to you opens.', o: '<b>Opportunity:</b> a link you can drop into any email, pitch or bio.', poof: true },
    { el: '#contact', k: 'EVERYWHERE', h: 'Now you see it, now you don’t', p2: 'Every Veld photo appears out of the mist and dissolves into the next. Smoke drifts across the whole site.', o: '' },
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

/* background footage: play when on screen */
(function () {
  var vs = [].slice.call(document.querySelectorAll('video.cbg'));
  if (!vs.length || !('IntersectionObserver' in window)) { vs.forEach(function (v) { v.play && v.play().catch(function () {}); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.play().catch(function () {}); else e.target.pause(); }); });
  vs.forEach(function (v) { if (v.closest('.rec-bg')) v.play().catch(function () {}); else io.observe(v); });
})();
