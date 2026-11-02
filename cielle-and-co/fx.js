/* Cielle & Co motion kit: loader, word splits, reveals, scroll scrubs, project starter form. ~4 KB, no libraries. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };

  /* split headlines into rising words */
  /* v5: letter-by-letter hero headline */
  $$('[data-chars]').forEach(function (el) {
    var txt = el.textContent.trim(), k = 0; el.setAttribute('aria-label', txt);
    el.innerHTML = txt.split(/\s+/).map(function (w) {
      return '<span class="w" aria-hidden="true">' + w.split('').map(function (c) { return '<span class="ch" style="--k:' + (k++) + '">' + c.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>'; }).join('') + '</span>';
    }).join(' ');
  });
  $$('[data-split]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function (w, i) {
      return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span></span>';
    }).join(' ');
  });
  /* split scrub paragraphs into words */
  $$('[data-scrub]').forEach(function (el) {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(function (w) { return '<span class="sw">' + w + '</span>'; }).join(' ');
  });

  /* loader: logo writes on, counter runs to 100, screen splits open */
  var ld = d.querySelector('.ld');
  function start() { root.classList.add('ready'); }
  if (ld && !reduce) {
    var done = false;
    var finish = function () {
      if (done) return; done = true;
      ld.classList.add('out'); setTimeout(start, 250);
      setTimeout(function () { ld.classList.add('gone'); }, 1000);
    };
    setTimeout(finish, 2750);
    ld.addEventListener('click', finish); // tap to skip
  } else { if (ld) ld.classList.add('gone'); start(); }

  /* reveal when scrolled into view */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }) : null;
  $$('[data-reveal],[data-split],[data-chars]').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  /* scroll-driven effects, one rAF per frame */
  var pars = $$('[data-par]'), zooms = $$('[data-zoom]'), hxs = $$('[data-hx]'), scrubs = $$('[data-scrub]'), pins = $$('[data-pin]'), prog = d.querySelector('.prog'), ticking = false;
  function frame() {
    ticking = false;
    var vh = window.innerHeight, sy = window.scrollY, max = d.body.scrollHeight - vh;
    root.classList.toggle('at-top', sy < vh * 0.55);
    if (prog) prog.style.setProperty('--p', max > 0 ? (sy / max).toFixed(4) : 0);
    pars.forEach(function (el) { var r = el.parentNode.getBoundingClientRect(); el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.par)).toFixed(1) + 'px,0)'; });
    zooms.forEach(function (el) { var r = el.parentNode.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - r.top / vh)); el.style.transform = 'scale(' + (1.25 - 0.25 * p).toFixed(3) + ')'; });
    hxs.forEach(function (el) { var r = el.parentNode.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))); el.style.transform = 'translate3d(' + (-(el.scrollWidth - el.parentNode.clientWidth) * p).toFixed(1) + 'px,0,0)'; });
    pins.forEach(function (sec) { var r = sec.getBoundingClientRect(), t = sec.querySelector('[data-track]'), p = Math.min(1, Math.max(0, -r.top / (r.height - vh))); var rg = sec.querySelector('.ring'); if (rg) rg.style.setProperty('--rot', (-p * 300).toFixed(1)); if (t) t.style.transform = 'translate3d(' + (-(t.scrollWidth - t.parentNode.clientWidth) * p).toFixed(1) + 'px,0,0)'; var b = sec.querySelector('[data-pinbar]'); if (b) b.style.transform = 'scaleX(' + p.toFixed(3) + ')'; });
    scrubs.forEach(function (el) {
      var r = el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      var ws = el.children, n = Math.round(p * ws.length);
      for (var i = 0; i < ws.length; i++) ws[i].classList.toggle('on', i < n);
    });
  }
  if (!reduce) {
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    window.addEventListener('resize', frame); frame();
  } else { scrubs.forEach(function (el) { $$('.sw', el).forEach(function (w) { w.classList.add('on'); }); }); }

  var ct = d.querySelector('#contact');
  if (ct && 'IntersectionObserver' in window) new IntersectionObserver(function (es) { root.classList.toggle('hide-fab', es[0].isIntersecting); }, { threshold: 0.15 }).observe(ct);

  /* project starter: step-by-step enquiry */
  $$('[data-starter]').forEach(function (f) {
    var steps = $$('.st-step', f), bar = f.querySelector('.st-bar i'), cnt = f.querySelector('.st-count'), sum = f.querySelector('.st-sum'), at = 0;
    function show(i) {
      at = i;
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      var last = i === steps.length - 1;
      f.querySelector('.st-nav [data-go="1"]').hidden = last;
      f.querySelector('.st-submit').hidden = !last;
      f.querySelector('.st-back').style.visibility = i ? 'visible' : 'hidden';
      if (bar) bar.style.transform = 'scaleX(' + ((i + 1) / steps.length) + ')';
      if (cnt) cnt.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
      if (sum) {
        var picks = $$('input:checked', f).map(function (x) { return x.value; });
        sum.textContent = picks.length ? 'You picked: ' + picks.join(' · ') : '';
      }
      var first = steps[i].querySelector('input,textarea,button');
      if (first && i > 0) first.focus({ preventScroll: true });
    }
    f.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]'); if (!b) return;
      e.preventDefault(); show(Math.max(0, Math.min(steps.length - 1, at + parseInt(b.dataset.go, 10))));
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault(); // preview only: the live site emails Carly
      if (!f.checkValidity()) { f.reportValidity(); return; }
      f.classList.add('sent');
    });
    show(0);
  });

  /* v3: live Toronto clock */
  var clk = $$('[data-clock-out]');
  if (clk.length) {
    var fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', hour12: false });
    var tick = function () { var t = fmt.format(new Date()); clk.forEach(function (el) { el.textContent = t; }); };
    tick(); setInterval(tick, 15000);
  }

  /* v3: typewriter paragraph */
  $$('[data-type]').forEach(function (el) {
    var txt = el.textContent.trim();
    if (reduce || !('IntersectionObserver' in window)) { el.classList.add('done'); return; }
    el.textContent = ''; el.setAttribute('aria-label', txt); el.classList.add('typing');
    new IntersectionObserver(function (es, o) {
      if (!es[0].isIntersecting) return; o.disconnect();
      var i = 0, step = function () {
        i += 2; el.textContent = txt.slice(0, i);
        if (i < txt.length) setTimeout(step, 14); else el.classList.replace('typing', 'done');
      }; step();
    }, { threshold: 0.3 }).observe(el);
  });

  /* v3: sortable services table */
  $$('[data-table]').forEach(function (tbl) {
    var tb = tbl.tBodies[0], btns = $$('[data-sort]', tbl.parentNode);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.sort, rows = $$('tr', tb);
        rows.sort(function (a, c) {
          var x = a.dataset[k], y = c.dataset[k];
          return k === 't' ? x.localeCompare(y) : k === 'k' ? (+y) - (+x) : (+x) - (+y);
        });
        rows.forEach(function (r) { tb.appendChild(r); r.classList.remove('flip'); void r.offsetWidth; r.classList.add('flip'); });
        btns.forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      });
    });
  });

  /* v3: hover image follower on the index list */
  $$('[data-hoverimg]').forEach(function (ul) {
    var fl = ul.parentNode.querySelector('.ix-float'); if (!fl || !window.matchMedia('(hover:hover)').matches) return;
    ul.addEventListener('mousemove', function (e) {
      var row = e.target.closest('[data-img]'); if (!row) return;
      if (fl.getAttribute('src') !== row.dataset.img) fl.setAttribute('src', row.dataset.img);
      fl.style.left = e.clientX + 'px'; fl.style.top = e.clientY + 'px'; fl.classList.add('on');
    });
    ul.addEventListener('mouseleave', function () { fl.classList.remove('on'); });
  });

  /* v3: active chapter / side nav */
  var chaps = $$('[data-chap]');
  if (chaps.length && 'IntersectionObserver' in window) {
    chaps.forEach(function (a) {
      var sc = d.getElementById(a.dataset.chap); if (!sc) return;
      new IntersectionObserver(function (es) { if (es[0].isIntersecting) chaps.forEach(function (o) { o.classList.toggle('on', o === a); }); }, { rootMargin: '-40% 0px -50% 0px' }).observe(sc);
    });
  }
  /* v4: notes sign-up (preview only) */
  $$('[data-notes]').forEach(function (f) { f.addEventListener('submit', function (e) { e.preventDefault(); if (!f.checkValidity()) { f.reportValidity(); return; } f.classList.add('sent'); }); });

  /* v5: live stage-beam hero (WebGL) + letter glow that follows the finger */
  $$('canvas[data-beams]').forEach(function (cv) {
    var gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }); if (!gl) { cv.remove(); return; }
    var cols = cv.dataset.beams.split('|').map(function (c) { return c.split(',').map(function (v) { return (+v) / 255; }); });
    var sec = cv.closest('section') || cv.parentNode, h1 = sec.querySelector('[data-chars]'), chs = h1 ? $$('.ch', h1) : [];
    var fs = ['precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;',
      'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
      'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}',
      'float fb(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}',
      'void main(){vec2 uv=gl_FragCoord.xy/r;float as=r.x/r.y;vec2 p=vec2(uv.x*as,uv.y);float hz=fb(p*2.2+vec2(t*.06,-t*.09));vec3 col=vec3(0.);',
      'for(int i=0;i<6;i++){float fi=float(i);vec2 o=vec2((fi+.5)/6.*as,1.1);vec2 dd=p-o;float a=atan(dd.x,-dd.y);float sg=mod(fi,2.)<.5?1.:-1.;',
      'float ang=sin(t*.33+fi*1.9)*.42+(m.x-.5)*.7*sg;float w=.05+.025*sin(fi*2.3+t*.2);float b=smoothstep(w,0.,abs(a-ang))*smoothstep(1.7,.1,length(dd));',
      'float k=mod(fi,3.);vec3 c=k<.5?c1:(k<1.5?c2:c3);col+=c*b*(.3+.9*hz)*.55;}',
      'vec2 mp=vec2(m.x*as,m.y);col+=mix(c2,c1,.4)*smoothstep(.5,0.,length(p-mp))*.35*(.5+.6*hz);',
      'col*=smoothstep(1.25,.25,length((uv-.5)*vec2(1.,1.2))*1.3);col+=(h(gl_FragCoord.xy+fract(t))-.5)*.03;gl_FragColor=vec4(col,1.);}'].join('\n');
    function sh(type, s) { var o = gl.createShader(type); gl.shaderSource(o, s); gl.compileShader(o); return o; }
    var pg = gl.createProgram(); gl.attachShader(pg, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}')); gl.attachShader(pg, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pg); gl.useProgram(pg);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pg, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = function (nm) { return gl.getUniformLocation(pg, nm); }, ur = U('r'), ut = U('t'), um = U('m');
    gl.uniform3fv(U('c1'), cols[0]); gl.uniform3fv(U('c2'), cols[1]); gl.uniform3fv(U('c3'), cols[2]);
    var scale = window.innerWidth < 700 ? .45 : .6, t0 = performance.now(), mx = .5, my = .6, smx = .5, smy = .6, auto = true, px = -999, py = -999, on = true, to;
    sec.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = 1 - (e.clientY - r.top) / r.height; px = e.clientX; py = e.clientY; auto = false; clearTimeout(to); to = setTimeout(function () { auto = true; }, 1800); }, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { on = es[0].isIntersecting; }).observe(sec);
    function draw() {
      var w = Math.round(cv.clientWidth * scale), h = Math.round(cv.clientHeight * scale);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
      var t = (performance.now() - t0) / 1000;
      if (auto) { mx = .5 + .3 * Math.sin(t / 2.4); my = .55 + .15 * Math.cos(t / 3.1); }
      smx += (mx - smx) * .06; smy += (my - smy) * .06;
      gl.uniform2f(ur, w, h); gl.uniform1f(ut, t); gl.uniform2f(um, smx, smy); gl.drawArrays(gl.TRIANGLES, 0, 3);
      var R = Math.pow(Math.max(70, window.innerWidth * .1), 2);
      chs.forEach(function (c, i) { var hot; if (auto) hot = Math.sin(t * 2.4 - i * .45) > .93; else { var b = c.getBoundingClientRect(), dx = b.left + b.width / 2 - px, dy = b.top + b.height / 2 - py; hot = dx * dx + dy * dy < R; } c.classList.toggle('hot', hot); });
    }
    if (reduce) { draw(); return; }
    (function loop() { if (on) draw(); requestAnimationFrame(loop); })();
  });
})();
