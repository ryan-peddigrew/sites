/* Placeholder art for the power washing template. Drawn in code so no outside photos are used.
   Replace with the client's own footage and photos when available. (c) 2026 Chairlift. */
(function () {
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function mk(w, h) { var c = document.createElement('canvas'); c.width = Math.max(1, w | 0); c.height = Math.max(1, h | 0); return c; }
  function soft(ctx, blur, fn) {
    if (!blur) { fn(ctx); return; }
    var c = ctx.canvas, L = mk(c.width, c.height), l = L.getContext('2d'); l.setTransform(ctx.getTransform()); fn(l);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'blur(' + Math.max(1, Math.round(blur)) + 'px)'; ctx.drawImage(L, 0, 0); ctx.restore();
  }
  function poly(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  function lg(ctx, x0, y0, x1, y1, stops) { var g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(function (s) { g.addColorStop(s[0], s[1]); }); return g; }
  function blobs(ctx0, R, n, x, y, w, h, col, rmin, rmax, amin, amax, blur) {
    soft(ctx0, blur, function (ctx) {
    for (var i = 0; i < n; i++) {
      var px = x + R() * w, py = y + R() * h, r = rmin + R() * (rmax - rmin);
      ctx.globalAlpha = amin + R() * (amax - amin); ctx.fillStyle = col;
      ctx.beginPath(); ctx.ellipse(px, py, r, r * (0.5 + R() * 0.8), R() * 3, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    });
  }
  function speckle(ctx, R, n, w, h, cols, s) {
    for (var i = 0; i < n; i++) { ctx.fillStyle = cols[(R() * cols.length) | 0]; ctx.globalAlpha = 0.25 + R() * 0.5; var z = s * (0.5 + R()); ctx.fillRect(R() * w, R() * h, z, z); }
    ctx.globalAlpha = 1;
  }
  function sky(ctx, W, y1) {
    ctx.fillStyle = lg(ctx, 0, 0, 0, y1, [[0, '#cfe0e6'], [0.6, '#f1e3bd'], [1, '#f7d79a']]); ctx.fillRect(0, 0, W, y1);
    var g = ctx.createRadialGradient(W * 0.08, y1 * 0.4, 0, W * 0.08, y1 * 0.4, W * 0.45); g.addColorStop(0, '#fff6d8cc'); g.addColorStop(1, '#fff6d800'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, y1);
  }
  function trees(ctx0, R, x, y, w, h, n) {
    soft(ctx0, Math.min(w, h) * 0.01, function (ctx) {
    for (var i = 0; i < n; i++) {
      var cx = x + R() * w, cy = y + R() * h, r = (0.25 + R() * 0.75) * Math.min(w, h) * 0.5;
      ctx.fillStyle = ['#3f5a24', '#56742c', '#6e8e33', '#2f4720', '#86a23c'][(R() * 5) | 0];
      ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fill();
      ctx.globalAlpha = 0.35; ctx.fillStyle = '#b9c94f'; ctx.beginPath(); ctx.arc(cx - r * 0.3, cy - r * 0.35, r * 0.45, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    });
  }
  function bushes(ctx, R, x, y, w, n, s) {
    for (var i = 0; i < n; i++) {
      var cx = x + (i + 0.5) * w / n + (R() - 0.5) * 8, r = s * (0.7 + R() * 0.5);
      ctx.fillStyle = R() < 0.22 ? '#b23a52' : ['#3c5a26', '#4d6e2b', '#5b7f30'][(R() * 3) | 0];
      ctx.beginPath(); ctx.ellipse(cx, y - r * 0.6, r, r * 0.8, 0, 0, 6.283); ctx.fill();
    }
  }
  function brick(ctx, R, x, y, w, h) {
    ctx.fillStyle = '#9b4632'; ctx.fillRect(x, y, w, h);
    var bh = Math.max(3, h / 40);
    ctx.globalAlpha = 0.25; ctx.fillStyle = '#d9b9a3';
    for (var yy = y; yy < y + h; yy += bh) ctx.fillRect(x, yy, w, Math.max(0.6, bh * 0.12));
    ctx.globalAlpha = 0.18;
    for (var j = 0; j < w * h / (bh * bh * 6); j++) { ctx.fillStyle = R() < 0.5 ? '#6f2a1e' : '#c0634a'; ctx.fillRect(x + R() * w, y + R() * h, bh * 2.4, bh * 0.85); }
    ctx.globalAlpha = 1;
  }
  function win(ctx, x, y, w, h) {
    ctx.fillStyle = '#20252b'; ctx.fillRect(x - w * 0.45, y, w * 0.38, h); ctx.fillRect(x + w * 1.07, y, w * 0.38, h);
    ctx.fillStyle = '#f4f2ec'; ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
    ctx.fillStyle = lg(ctx, x, y, x, y + h, [[0, '#8fa7b5'], [1, '#3e4c57']]); ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
    ctx.fillStyle = '#f4f2ec'; ctx.fillRect(x, y + h / 2 - 1, w, 2); ctx.fillRect(x + w / 2 - 1, y, 2, h);
  }
  function garage(ctx, x, y, w, h) {
    ctx.fillStyle = '#f1efe9'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#cfccc4'; ctx.lineWidth = Math.max(1, h / 60);
    for (var i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, y + h * i / 4); ctx.lineTo(x + w, y + h * i / 4); ctx.stroke(); }
    ctx.fillStyle = '#5a6670';
    for (var k = 0; k < 4; k++) ctx.fillRect(x + w * (0.08 + k * 0.23), y + h * 0.07, w * 0.15, h * 0.12);
  }

  /* concrete texture */
  function concrete(w, h, seed, dirty) {
    var R = rng(seed), c = mk(w, h), x = c.getContext('2d');
    x.fillStyle = dirty ? '#8d8676' : '#d4cfc4'; x.fillRect(0, 0, w, h);
    speckle(x, R, w * h / 60, w, h, dirty ? ['#6e6859', '#a49d8c', '#5d584c'] : ['#bfb9ad', '#e6e2d9', '#a9a397'], Math.max(1, w / 500));
    if (dirty) {
      blobs(x, R, 60, 0, 0, w, h, '#5f5a4a', w * 0.02, w * 0.09, 0.08, 0.2, w * 0.012);
      blobs(x, R, 40, 0, 0, w, h, '#3d4a2c', w * 0.01, w * 0.05, 0.05, 0.15, w * 0.008);
    }
    return c;
  }

  /* ---------- story chapters ---------- */
  function drivewayScene(W, H, dirty) {
    var R = rng(11), c = mk(W, H), x = c.getContext('2d');
    var hz = H * 0.56;
    sky(x, W, H * 0.3);
    trees(x, R, -W * 0.05, -H * 0.05, W * 0.25, H * 0.45, 14);
    trees(x, R, W * 0.78, -H * 0.05, W * 0.3, H * 0.5, 16);
    // roof
    x.fillStyle = '#4a4f57'; poly(x, [[W * 0.02, H * 0.2], [W * 0.1, H * 0.02], [W * 0.72, H * 0.02], [W * 0.8, H * 0.2]]); x.fill();
    if (dirty) { x.globalAlpha = 0.55; for (var s = 0; s < 18; s++) { var sx = W * (0.1 + R() * 0.62); x.fillStyle = lg(x, 0, H * 0.02, 0, H * 0.2, [[0, '#1d2024'], [1, '#1d202400']]); x.fillRect(sx, H * 0.02, W * 0.012 + R() * W * 0.02, H * 0.18); } x.globalAlpha = 1; }
    brick(x, R, W * 0.02, H * 0.2, W * 0.66, hz - H * 0.2);
    brick(x, R, W * 0.55, H * 0.0, W * 0.4, hz);
    x.fillStyle = '#efe9dc'; x.fillRect(W * 0.02, H * 0.2, W * 0.66, H * 0.025);
    garage(x, W * 0.12, H * 0.3, W * 0.22, hz - H * 0.3);
    garage(x, W * 0.37, H * 0.3, W * 0.22, hz - H * 0.3);
    win(x, W * 0.66, H * 0.06, W * 0.045, H * 0.1); win(x, W * 0.78, H * 0.06, W * 0.045, H * 0.1); win(x, W * 0.88, H * 0.06, W * 0.045, H * 0.1);
    // porch
    x.fillStyle = '#5a6068'; poly(x, [[W * 0.68, H * 0.3], [W * 0.96, H * 0.3], [W * 0.99, H * 0.35], [W * 0.66, H * 0.35]]); x.fill();
    x.fillStyle = '#f2efe8'; [0.69, 0.79, 0.93].forEach(function (p) { x.fillRect(W * p, H * 0.35, W * 0.012, hz - H * 0.35); });
    x.fillStyle = '#20252b'; x.fillRect(W * 0.81, H * 0.38, W * 0.05, hz - H * 0.38);
    // lawn
    x.fillStyle = lg(x, 0, hz, 0, H, [[0, '#6b8f2e'], [1, '#4f7424']]); x.fillRect(0, hz, W, H - hz);
    bushes(x, R, W * 0.0, hz + 2, W * 0.12, 2, H * 0.06);
    bushes(x, R, W * 0.62, hz + 2, W * 0.36, 7, H * 0.045);
    // driveway
    var dw = [[W * 0.1, hz], [W * 0.61, hz], [W * 1.05, H], [-W * 0.2, H]];
    x.save(); poly(x, dw); x.clip();
    x.drawImage(concrete(W, H - hz + 2, 3, dirty), 0, hz);
    var shade = lg(x, 0, hz, 0, H, [[0, '#00000030'], [1, '#00000000']]); x.fillStyle = shade; x.fillRect(0, hz, W, H - hz);
    x.strokeStyle = dirty ? '#3d3a31' : '#9d978b'; x.lineWidth = 2;
    [0.12, 0.3, 0.55].forEach(function (v) { var y = hz + (H - hz) * v; x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke(); });
    x.beginPath(); x.moveTo(W * 0.355, hz); x.lineTo(W * 0.42, H); x.stroke();
    if (dirty) {
      x.globalAlpha = 0.4; x.fillStyle = '#2f2c25';
      [[0.2, 0.0], [0.29, 0.1], [0.43, 0.6], [0.52, 0.72]].forEach(function (t) { poly(x, [[W * t[0], hz], [W * (t[0] + 0.025), hz], [W * (t[1] + 0.06), H], [W * t[1], H]]); x.fill(); });
      x.globalAlpha = 1;
      x.strokeStyle = '#5e7d2a'; x.lineWidth = 5; x.setLineDash([3, 6]); x.beginPath(); x.moveTo(W * 0.355, hz); x.lineTo(W * 0.42, H); x.stroke(); x.setLineDash([]);
    } else {
      x.fillStyle = lg(x, 0, hz, 0, H, [[0, '#ffffff10'], [0.5, '#ffffff30'], [1, '#ffffff08']]); x.fillRect(0, hz, W, H);
    }
    x.restore();
    return c;
  }
  function roofScene(W, H, dirty) {
    var R = rng(21), c = mk(W, H), x = c.getContext('2d');
    x.fillStyle = '#5a7a2c'; x.fillRect(0, 0, W, H);
    trees(x, R, -W * 0.1, -H * 0.1, W * 1.2, H * 0.4, 40);
    trees(x, R, W * 0.75, H * 0.2, W * 0.35, H * 0.9, 20);
    // brick wing on the right
    brick(x, R, W * 0.55, H * 0.42, W * 0.32, H * 0.6);
    win(x, W * 0.6, H * 0.55, W * 0.05, H * 0.12); win(x, W * 0.73, H * 0.55, W * 0.05, H * 0.12);
    x.fillStyle = '#4a4f57'; poly(x, [[W * 0.5, H * 0.43], [W * 0.62, H * 0.2], [W * 0.9, H * 0.22], [W * 0.9, H * 0.43]]); x.fill();
    // main roof plane
    var rp = [[W * -0.05, H * 0.58], [W * 0.2, H * 0.12], [W * 0.62, H * 0.2], [W * 0.5, H * 0.86]];
    x.save(); poly(x, rp); x.clip();
    x.fillStyle = '#585e67'; x.fillRect(0, 0, W, H);
    speckle(x, R, W * H / 120, W, H, ['#474c54', '#6a717b', '#3f444b'], Math.max(1, W / 600));
    x.strokeStyle = '#3c4148'; x.lineWidth = Math.max(1, H / 300);
    for (var i = 0; i < 26; i++) { var t = i / 26; x.beginPath(); x.moveTo(W * (0.2 - 0.25 * t), H * (0.12 + 0.46 * t)); x.lineTo(W * (0.62 - 0.12 * t), H * (0.2 + 0.66 * t)); x.stroke(); }
    if (dirty) {
      soft(x, Math.max(2, W * 0.004), function (x) { x.lineCap = 'round';
      for (var s = 0; s < 40; s++) {
        var u = R(), x0 = W * (0.2 + 0.42 * u), y0 = H * (0.12 + 0.08 * u), L = 0.35 + R() * 0.55;
        var x1 = x0 - W * 0.25 * L, y1 = H * 0.46 * L + y0;
        x.strokeStyle = lg(x, x0, y0, x1, y1, [[0, '#121417ee'], [0.7, '#12141788'], [1, '#12141700']]);
        x.lineWidth = W * (0.006 + R() * 0.022); x.globalAlpha = 0.45 + R() * 0.5;
        x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke();
      }
      });
    }
    x.restore();
    x.fillStyle = '#efe9dc'; poly(x, [[W * -0.05, H * 0.58], [W * 0.5, H * 0.86], [W * 0.5, H * 0.88], [W * -0.05, H * 0.6]]); x.fill();
    brick(x, R, W * -0.05, H * 0.88, W * 0.6, H * 0.2);
    return c;
  }
  function sidingScene(W, H, dirty) {
    var R = rng(31), c = mk(W, H), x = c.getContext('2d');
    sky(x, W, H * 0.2);
    trees(x, R, -W * 0.1, -H * 0.1, W * 0.3, H * 0.9, 18);
    var wx0 = W * 0.08, wx1 = W * 0.74;
    x.fillStyle = '#e9ebe8'; poly(x, [[wx0, H * 0.06], [wx1, H * 0.0], [wx1, H], [wx0, H]]); x.fill();
    x.strokeStyle = '#c4c8c6'; x.lineWidth = Math.max(1, H / 260);
    var n = 34; for (var i = 1; i < n; i++) { var y = H * i / n; x.beginPath(); x.moveTo(wx0, y + H * 0.06 * (1 - i / n) * 0.0); x.lineTo(wx1, y); x.stroke(); }
    x.fillStyle = lg(x, wx0, 0, wx1, 0, [[0, '#00000014'], [1, '#00000000']]); x.fillRect(wx0, 0, wx1 - wx0, H);
    if (dirty) {
      soft(x, W * 0.012, function (x) {
      for (var s = 0; s < 46; s++) { var sx = wx0 + R() * (wx1 - wx0) * 0.9; x.fillStyle = lg(x, 0, H * 0.1, 0, H, [[0, '#7d9a2a00'], [0.35, '#7d9a2a77'], [1, '#5f7a2299']]); x.globalAlpha = 0.35 + R() * 0.4; x.fillRect(sx, H * (0.05 + R() * 0.35), W * (0.008 + R() * 0.03), H); }
      });
      blobs(x, R, 900, wx0, H * 0.2, (wx1 - wx0) * 0.9, H * 0.8, '#6f8f22', W * 0.001, W * 0.006, 0.15, 0.45, W * 0.002);
      x.strokeStyle = '#4f6a1a66'; x.lineWidth = Math.max(1, H / 260); for (var i2 = 1; i2 < 34; i2++) { var y2 = H * i2 / 34; x.beginPath(); x.moveTo(wx0, y2); x.lineTo(wx1, y2); x.stroke(); }
    }
    // downspout + brick + garage on the right
    x.fillStyle = '#f5f5f2'; x.fillRect(wx1 - W * 0.02, 0, W * 0.016, H);
    brick(x, R, wx1, H * 0.12, W - wx1, H);
    garage(x, wx1 + W * 0.05, H * 0.42, W * 0.24, H * 0.6);
    x.fillStyle = '#efe9dc'; x.fillRect(wx1, H * 0.1, W - wx1, H * 0.03);
    x.fillStyle = '#2a2f33'; x.fillRect(wx1 + W * 0.015, H * 0.45, W * 0.014, H * 0.05);
    bushes(x, R, wx0, H * 1.02, W * 0.25, 3, H * 0.08);
    bushes(x, R, wx1 - W * 0.05, H * 1.02, W * 0.12, 2, H * 0.07);
    x.fillStyle = '#5a7d28'; x.fillRect(0, H * 0.97, W, H * 0.03);
    return c;
  }
  function houseScene(W, H, dirty, opt) {
    opt = opt || {};
    var R = rng(41), c = mk(W, H), x = c.getContext('2d');
    var g = H * 0.62;
    sky(x, W, g);
    trees(x, R, W * 0.6, -H * 0.05, W * 0.45, H * 0.55, 26);
    trees(x, R, -W * 0.05, H * 0.0, W * 0.12, H * 0.5, 8);
    // two-storey brick on the right
    x.fillStyle = '#4a4f57'; poly(x, [[W * 0.44, H * 0.2], [W * 0.5, H * 0.1], [W * 0.68, H * 0.1], [W * 0.74, H * 0.2]]); x.fill();
    brick(x, R, W * 0.45, H * 0.2, W * 0.28, g - H * 0.2);
    win(x, W * 0.49, H * 0.25, W * 0.025, H * 0.07); win(x, W * 0.56, H * 0.25, W * 0.025, H * 0.07); win(x, W * 0.63, H * 0.25, W * 0.025, H * 0.07);
    win(x, W * 0.49, H * 0.42, W * 0.025, H * 0.08); win(x, W * 0.665, H * 0.42, W * 0.025, H * 0.08);
    x.fillStyle = '#5a6068'; poly(x, [[W * 0.53, H * 0.38], [W * 0.66, H * 0.38], [W * 0.67, H * 0.41], [W * 0.52, H * 0.41]]); x.fill();
    x.fillStyle = '#f2efe8'; x.fillRect(W * 0.535, H * 0.41, W * 0.006, g - H * 0.41); x.fillRect(W * 0.645, H * 0.41, W * 0.006, g - H * 0.41);
    x.fillStyle = '#20252b'; x.fillRect(W * 0.57, H * 0.44, W * 0.03, g - H * 0.44);
    // garage wing with vinyl gable on the left
    x.fillStyle = '#e9ebe8'; poly(x, [[W * 0.12, H * 0.36], [W * 0.21, H * 0.15], [W * 0.3, H * 0.36], [W * 0.3, g], [W * 0.12, g]]); x.fill();
    x.strokeStyle = '#c4c8c6'; x.lineWidth = 1; for (var i = 0; i < 18; i++) { var y = H * 0.18 + i * (g - H * 0.18) / 18; x.beginPath(); x.moveTo(W * 0.12, y); x.lineTo(W * 0.3, y); x.stroke(); }
    if (dirty) blobs(x, R, 140, W * 0.12, H * 0.25, W * 0.18, g - H * 0.25, '#7d9a2a', W * 0.002, W * 0.012, 0.2, 0.5, W * 0.004);
    x.fillStyle = '#4f545c'; poly(x, [[W * 0.18, H * 0.36], [W * 0.27, H * 0.15], [W * 0.47, H * 0.15], [W * 0.47, H * 0.36]]); x.fill();
    if (dirty) { x.globalAlpha = 0.6; for (var s = 0; s < 16; s++) { x.fillStyle = '#1b1e22'; var sx = W * (0.26 + R() * 0.2); x.fillRect(sx, H * 0.16, W * (0.004 + R() * 0.01), H * 0.2); } x.globalAlpha = 1; }
    x.fillStyle = '#efe9dc'; x.fillRect(W * 0.18, H * 0.36, W * 0.27, H * 0.015);
    brick(x, R, W * 0.18, H * 0.375, W * 0.27, g - H * 0.375);
    garage(x, W * 0.2, H * 0.45, W * 0.11, g - H * 0.45); garage(x, W * 0.325, H * 0.45, W * 0.11, g - H * 0.45);
    // lawn, driveway, street
    x.fillStyle = lg(x, 0, g, 0, H, [[0, '#6f9330'], [1, '#527625']]); x.fillRect(0, g, W, H - g);
    bushes(x, R, W * 0.06, g + 2, W * 0.1, 2, H * 0.035); bushes(x, R, W * 0.45, g + 2, W * 0.27, 7, H * 0.028);
    x.save(); poly(x, [[W * 0.19, g], [W * 0.45, g], [W * 0.52, H * 0.88], [W * 0.15, H * 0.88]]); x.clip();
    x.drawImage(concrete(W, H, 5, dirty), 0, 0);
    if (dirty) { x.globalAlpha = 0.35; x.fillStyle = '#2f2c25'; x.fillRect(W * 0.22, g, W * 0.03, H); x.fillRect(W * 0.33, g, W * 0.03, H); x.fillRect(W * 0.38, g, W * 0.03, H); x.globalAlpha = 1; }
    x.restore();
    x.fillStyle = '#d9d5cc'; x.fillRect(0, H * 0.86, W, H * 0.025);
    x.fillStyle = lg(x, 0, H * 0.885, 0, H, [[0, '#8a8d8f'], [1, '#6d7073']]); x.fillRect(0, H * 0.885, W, H);
    // equipment trailer
    if (opt.trailer !== false) {
      var tx = W * 0.62, ty = H * 0.68;
      x.fillStyle = '#e8e8e4'; x.fillRect(tx, ty, W * 0.12, H * 0.11);
      x.strokeStyle = '#b8b8b2'; x.lineWidth = 2; x.strokeRect(tx, ty, W * 0.12, H * 0.11);
      x.fillStyle = '#25282c'; x.fillRect(tx + W * 0.165, ty - H * 0.005, W * 0.05, H * 0.1);
      x.strokeStyle = '#3a3e44'; x.lineWidth = 2; for (var hr = 0; hr < 6; hr++) { x.beginPath(); x.moveTo(tx + W * (0.17 + hr * 0.008), ty); x.lineTo(tx + W * (0.17 + hr * 0.008), ty + H * 0.09); x.stroke(); }
      x.fillStyle = '#c33'; x.fillRect(tx + W * 0.13, ty + H * 0.07, W * 0.03, H * 0.04);
      x.fillStyle = '#f0f0ee'; x.fillRect(tx - W * 0.01, ty + H * 0.11, W * 0.25, H * 0.02);
      x.fillStyle = '#1b1d20'; [0.06, 0.14].forEach(function (p) { x.beginPath(); x.arc(tx + W * p, ty + H * 0.14, H * 0.035, 0, 6.283); x.fill(); });
      x.fillStyle = '#ccc'; [0.06, 0.14].forEach(function (p) { x.beginPath(); x.arc(tx + W * p, ty + H * 0.14, H * 0.015, 0, 6.283); x.fill(); });
    }
    return c;
  }

  /* ---------- story controller ---------- */
  var CH = [
    { a: 0, b: 0.31, make: drivewayScene, mode: 'lanes' },
    { a: 0.31, b: 0.56, make: roofScene, mode: 'diag' },
    { a: 0.56, b: 0.88, make: sidingScene, mode: 'sweep' },
    { a: 0.88, b: 1.0, make: houseScene, mode: 'none' }
  ];
  function story(canvas) {
    var ctx = canvas.getContext('2d'), W = 0, H = 0, imgs = [];
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = Math.round(canvas.clientWidth * dpr); H = Math.round(canvas.clientHeight * dpr);
      canvas.width = W; canvas.height = H;
      // scenes are drawn at a landscape size and cropped to cover on tall screens
      var sw = Math.max(W, H * 1.25), sh = H;
      imgs = CH.map(function (c) { return { d: c.make(sw, sh, 1), c: c.make(sw, sh, 0) }; });
    }
    function cover(img, k, panX) {
      var s = k, dw = img.width * s, dh = img.height * s;
      var ox = (W - dw) / 2 + (panX || 0) * (dw - W) / 2, oy = (H - dh) / 2;
      return [ox, oy, dw, dh];
    }
    function clipFor(mode, p, r) {
      var ox = r[0], oy = r[1], dw = r[2], dh = r[3];
      ctx.beginPath();
      if (mode === 'lanes') {
        var hz = oy + dh * 0.56, L = 5, done = p * L;
        for (var k = 0; k < L; k++) {
          var f = Math.max(0, Math.min(1, done - k)); if (!f) continue;
          var u0 = k / L, u1 = (k + 1) / L;
          var tl = function (u, v) { var top = [ox + dw * (0.1 + 0.51 * u), hz], bot = [ox + dw * (-0.2 + 1.25 * u), oy + dh]; return [bot[0] + (top[0] - bot[0]) * v, bot[1] + (top[1] - bot[1]) * v]; };
          var a = tl(u0, 0), b = tl(u1, 0), c = tl(u1, f), d = tl(u0, f);
          ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath();
        }
      } else if (mode === 'diag') {
        var e = ox + dw * (-0.1 + 1.0 * p);
        ctx.moveTo(ox, oy); ctx.lineTo(e + dw * 0.15, oy);
        for (var i = 0; i <= 10; i++) ctx.lineTo(e - dw * 0.1 * i / 10 + Math.sin(i * 1.7) * dw * 0.01, oy + dh * i / 10);
        ctx.lineTo(ox, oy + dh); ctx.closePath();
      } else if (mode === 'sweep') {
        var ex = ox + dw * (0.02 + 0.8 * p);
        ctx.moveTo(ox, oy);
        for (var j = 0; j <= 14; j++) ctx.lineTo(ex + Math.sin(j * 2.1 + p * 6) * dw * 0.012, oy + dh * j / 14);
        ctx.lineTo(ox, oy + dh); ctx.closePath();
      }
    }
    function drawCh(i, t, alpha) {
      var c = CH[i], p = Math.max(0, Math.min(1, (t - c.a) / (c.b - c.a)));
      var img = imgs[i], k = Math.max(W / img.d.width, H / img.d.height) * (1.02 + 0.07 * p);
      var pan = i === 0 ? -0.1 : i === 2 ? 0.2 : 0;
      var r = cover(img.d, k, pan);
      ctx.globalAlpha = alpha;
      var cp = Math.max(0, Math.min(1, (p - 0.08) / 0.84));
      if (c.mode === 'none') { ctx.drawImage(img.c, r[0], r[1], r[2], r[3]); }
      else {
        ctx.drawImage(img.d, r[0], r[1], r[2], r[3]);
        if (cp > 0) { ctx.save(); clipFor(c.mode, cp, r); ctx.clip(); ctx.drawImage(img.c, r[0], r[1], r[2], r[3]); ctx.restore(); }
      }
      ctx.globalAlpha = 1;
    }
    function draw(t) {
      if (!W) return;
      ctx.clearRect(0, 0, W, H);
      var i = 0; while (i < CH.length - 1 && t >= CH[i].b) i++;
      drawCh(i, t, 1);
      var X = 0.025;
      if (i < CH.length - 1 && t > CH[i].b - X) drawCh(i + 1, CH[i + 1].a, (t - (CH[i].b - X)) / X);
    }
    return { resize: resize, draw: draw, chapter: function (t) { var i = 0; while (i < CH.length - 1 && t >= CH[i].b) i++; return i; } };
  }

  /* ---------- driveway game slab ---------- */
  var ZONES = [
    { id: 'mildew', label: 'Black mildew', x: .02, y: .02, w: .22, h: .38, tx: .06, ty: .2, c: 'y' },
    { id: 'weeds', label: 'Weeds in joints', x: .28, y: .13, w: .5, h: .1, tx: .42, ty: .2, c: 'b' },
    { id: 'oil', label: 'Oil drip', x: .45, y: .35, w: .14, h: .4, tx: .5, ty: .38, c: 'y' },
    { id: 'tires', label: 'Tire tracks', x: .14, y: .3, w: .3, h: .7, tx: .25, ty: .66, c: 'y' },
    { id: 'rust', label: 'Rust fan', x: .82, y: .2, w: .18, h: .62, tx: .85, ty: .42, c: 'b' }
  ];
  function slab(w, h) {
    var R = rng(7);
    var clean = concrete(w, h, 9, 0), cx = clean.getContext('2d');
    var dirt = mk(w, h), x = dirt.getContext('2d');
    function joints(ctx, col, lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; [.17, .87].forEach(function (v) { ctx.beginPath(); ctx.moveTo(0, h * v); ctx.lineTo(w, h * v + (R() - .5) * 4); ctx.stroke(); }); }
    joints(cx, '#6f6a60', Math.max(2, w / 300));
    x.drawImage(concrete(w, h, 13, 1), 0, 0);
    // tire tracks
    [.18, .34, .66, .8].forEach(function (u) {
      var tw = w * .07; x.globalAlpha = .38; x.fillStyle = '#2d2b25'; x.fillRect(w * u, 0, tw, h);
      x.globalAlpha = .18; x.fillStyle = '#181713'; for (var yy = 0; yy < h; yy += 7) x.fillRect(w * u, yy, tw, 2.5);
    });
    x.globalAlpha = 1;
    // mildew
    blobs(x, R, 260, w * .0, h * .0, w * .25, h * .42, '#1e2418', w * .006, w * .03, .2, .55, w * .006);
    // oil
    blobs(x, R, 12, w * .47, h * .4, w * .1, h * .2, '#16130f', w * .012, w * .035, .45, .8, w * .004);
    for (var i = 0; i < 18; i++) { x.globalAlpha = .5 + R() * .4; x.fillStyle = '#16130f'; x.beginPath(); x.arc(w * (.5 + (R() - .5) * .06), h * (.55 + R() * .22), w * (.003 + R() * .008), 0, 6.283); x.fill(); }
    // rust fan
    var g = x.createRadialGradient(w * 1.02, h * .52, 0, w * 1.02, h * .52, w * .2); g.addColorStop(0, '#b4561fdd'); g.addColorStop(.6, '#b4561f66'); g.addColorStop(1, '#b4561f00');
    x.globalAlpha = 1; x.fillStyle = g; x.fillRect(w * .75, 0, w * .25, h);
    blobs(x, R, 70, w * .86, h * .25, w * .14, h * .55, '#9a4316', w * .004, w * .015, .2, .5, w * .003);
    joints(x, '#2a271f', Math.max(3, w / 220));
    // weeds in joints
    [.17, .87].forEach(function (v) { for (var k = 0; k < 60; k++) { x.fillStyle = R() < .5 ? '#5f7f22' : '#7aa02c'; x.globalAlpha = .9; var px = R() * w; x.beginPath(); x.ellipse(px, h * v + (R() - .5) * 6, w * (.004 + R() * .008), w * .004, R() * 3, 0, 6.283); x.fill(); } });
    x.globalAlpha = 1;
    return { clean: clean, dirt: dirt, zones: ZONES };
  }

  window.Scenes = { story: story, house: houseScene, slab: slab, rng: rng };
})();
