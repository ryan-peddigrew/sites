/* MAC Group preview tools. SAMPLE DATA ONLY.
   Public pages never show inventory, availability, counts, gear names or prices: clients send needs, staff match gear in MAC Hub. Requests are saved in this browser for the preview; nothing is sent. */
(function () {
  const { $, $$ } = window.MAC;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const iso = d => d.toISOString().slice(0, 10);
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const today = new Date(); today.setHours(12, 0, 0, 0);

  // Seeded random so every visitor sees the same sample bookings
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

  // ---------------- Sample inventory (MAC Show Systems categories from their own site) ----------------
  // w,d = floor footprint in metres for the planner; shape: rect | wedge | pole
  const INV = [
    { id: "stg", g: "Stage deck", cat: "Staging", q: 60, w: 2.4, d: 1.2, col: "#6B6B6B" },
    { id: "stgo", g: "Outdoor stage", cat: "Staging", q: 2, w: 12, d: 9, col: "#4A4A4A" },
    { id: "stair", g: "Stairs", cat: "Staging", q: 12, w: 1.2, d: 1.5, col: "#7A7A7A" },
    { id: "pod", g: "Podium", cat: "Podium", q: 8, w: .7, d: .6, col: "#9C7A54" },
    { id: "spk", g: "Speakers", cat: "Audio", q: 6, w: 1.4, d: .8, col: "#2B2B2B" },
    { id: "sub", g: "Bass speakers", cat: "Audio", q: 24, w: .8, d: .9, col: "#1F1F1F" },
    { id: "mon", g: "Stage monitor", cat: "Audio", q: 30, w: .6, d: .5, col: "#333" },
    { id: "mix", g: "Sound desk", cat: "Audio", q: 6, w: 2.0, d: 1.2, col: "#3A3F46" },
    { id: "mic", g: "Microphones", cat: "Audio", q: 40, w: 0, d: 0 },
    { id: "led", g: "LED wall", cat: "Video walls", q: 5, w: 4, d: .6, col: "#121A2E" },
    { id: "ledl", g: "Large LED wall", cat: "Video walls", q: 2, w: 6, d: .8, col: "#121A2E" },
    { id: "scr", g: "Screen", cat: "Projectors", q: 10, w: 3.2, d: .5, col: "#D9D9D9" },
    { id: "prj", g: "Projector", cat: "Projectors", q: 8, w: .6, d: .6, col: "#555" },
    { id: "tv", g: "Confidence monitor", cat: "Video", q: 14, w: .9, d: .6, col: "#2C2C2C" },
    { id: "cam", g: "Camera position", cat: "Video", q: 6, w: 1.2, d: 1.2, col: "#444" },
    { id: "mov", g: "Stage light", cat: "Lighting", q: 48, w: .5, d: .5, col: "#5A4A20" },
    { id: "wash", g: "Wash light", cat: "Lighting", q: 80, w: .4, d: .4, col: "#6A5A2A" },
    { id: "upl", g: "Uplight", cat: "Lighting", q: 120, w: .3, d: .3, col: "#7D6A30" },
    { id: "trs", g: "Truss", cat: "Lighting", q: 40, w: 3, d: .3, col: "#8C8C8C" },
    { id: "tow", g: "Truss tower", cat: "Lighting", q: 16, w: .5, d: .5, col: "#8C8C8C" }
  ];
  // Staff pages load inv-names.js (real item names). Public pages only ever see generic names.
  const NAMES = window.MACNAMES || null; INV.forEach(i => i.n = NAMES ? NAMES[i.id] : i.g);
  const PUBLIC = !NAMES;
  // Sample bookings over the next 150 days
  const BOOK = {};
  INV.forEach((it, idx) => {
    const r = rng(idx * 97 + 13); BOOK[it.id] = [];
    for (let n = 0; n < 10; n++) {
      const start = Math.floor(r() * 150), len = 1 + Math.floor(r() * 4);
      const qty = Math.max(1, Math.round(it.q * (r() < .25 ? 1 : r() * .7)));
      BOOK[it.id].push({ a: addDays(today, start), b: addDays(today, start + len), qty });
    }
  });
  function free(id, from, to) {
    const it = INV.find(i => i.id === id); let worst = 0;
    for (let d = new Date(from); d <= to; d = addDays(d, 1)) {
      const used = BOOK[id].filter(b => d >= b.a && d <= b.b).reduce((s, b) => s + b.qty, 0);
      worst = Math.max(worst, used);
    }
    return Math.max(0, it.q - worst);
  }
  function status(left, total) {
    if (left <= 0) return `<span class="st no">Booked on these dates</span>`;
    if (left <= Math.max(2, total * .2)) return `<span class="st lim">Limited · ${left} left</span>`;
    return `<span class="st ok">Available · ${left}</span>`;
  }
  const PAIRS = { prj: "scr", scr: "prj", led: "tv", spk: "sub", sub: "spk", mov: "trs", trs: "tow", stg: "stair", mix: "mic", pod: "mic", stgo: "spk" };

  // Shared dates + cart (one per brand)
  function dates(prefix) {
    const d = store.get(prefix + "_dates", null);
    if (d) return { a: new Date(d.a + "T12:00"), b: new Date(d.b + "T12:00") };
    return { a: addDays(today, 21), b: addDays(today, 22) };
  }
  function setDates(prefix, a, b) { store.set(prefix + "_dates", { a: iso(a), b: iso(b) }); document.dispatchEvent(new CustomEvent("macdates")); }
  function cart(prefix) { return store.get(prefix + "_cart", {}); }
  function setCart(prefix, c) { store.set(prefix + "_cart", c); document.dispatchEvent(new CustomEvent("maccart")); }

  function dateInputs(host, prefix) {
    const d = dates(prefix);
    host.innerHTML = `<label>Event starts<input type="date" min="${iso(today)}" value="${iso(d.a)}"></label><label>Event ends<input type="date" min="${iso(today)}" value="${iso(d.b)}"></label>`;
    const [a, b] = $$("input", host);
    const on = () => { let A = new Date(a.value + "T12:00"), B = new Date(b.value + "T12:00"); if (B < A) { B = A; b.value = a.value; } setDates(prefix, A, B); };
    a.addEventListener("change", on); b.addEventListener("change", on);
    document.addEventListener("macdates", () => { const x = dates(prefix); a.value = iso(x.a); b.value = iso(x.b); });
  }

  // ---------------- Request builder (public). Clients ask for what they need; we answer
  // "we have it" or "we have something that works". Never item names, models or counts. ----------------
  const SIZES = { S: "Small, up to 150 guests", M: "Medium, 150 to 600", L: "Large, 600 plus" };
  const NEEDS = [
    { k: "ostage", cat: "Staging", n: "Outdoor stage with a roof", s: { S: [["stgo", 1]], M: [["stgo", 1]], L: [["stgo", 1]] }, alt: { stgo: ["stg", 24] } },
    { k: "stage", cat: "Staging", n: "Indoor stage", s: { S: [["stg", 6]], M: [["stg", 12]], L: [["stg", 24]] } },
    { k: "podium", cat: "Staging", n: "Podium", s: { S: [["pod", 1]], M: [["pod", 1]], L: [["pod", 2]] } },
    { k: "speech", cat: "Sound", n: "Sound for speeches and presentations", s: { S: [["spk", 1], ["mic", 2]], M: [["spk", 1], ["mic", 4]], L: [["spk", 2], ["mic", 8]] } },
    { k: "concert", cat: "Sound", n: "Concert sound system", s: { S: [["spk", 1], ["sub", 2], ["mon", 4], ["mix", 1]], M: [["spk", 2], ["sub", 6], ["mon", 8], ["mix", 1]], L: [["spk", 4], ["sub", 12], ["mon", 12], ["mix", 2]] } },
    { k: "led", cat: "Video", n: "LED video wall", s: { S: [["led", 1]], M: [["led", 1]], L: [["ledl", 1]] }, alt: { led: ["ledl", 1], ledl: ["led", 2] } },
    { k: "proj", cat: "Video", n: "Projector and screen", s: { S: [["prj", 1], ["scr", 1]], M: [["prj", 2], ["scr", 2]], L: [["prj", 4], ["scr", 4]] }, alt: { prj: ["led", 1] } },
    { k: "conf", cat: "Video", n: "Confidence monitors for presenters", s: { S: [["tv", 1]], M: [["tv", 2]], L: [["tv", 4]] } },
    { k: "cam", cat: "Video", n: "Live camera to the screens", s: { S: [["cam", 1]], M: [["cam", 2]], L: [["cam", 3]] } },
    { k: "slight", cat: "Lighting", n: "Stage lighting", s: { S: [["mov", 6], ["trs", 4]], M: [["mov", 12], ["trs", 8]], L: [["mov", 24], ["trs", 12]] }, alt: { mov: ["wash", 2] } },
    { k: "uplight", cat: "Lighting", n: "Room uplighting and colour", s: { S: [["upl", 20]], M: [["upl", 40]], L: [["upl", 80]] }, alt: { upl: ["wash", 1] } },
    { k: "truss", cat: "Lighting", n: "Truss and rigging", s: { S: [["trs", 4], ["tow", 2]], M: [["trs", 10], ["tow", 4]], L: [["trs", 20], ["tow", 8]] } }
  ];
  function check(k, size, d) {
    const nd = NEEDS.find(x => x.k === k); let worst = 0;
    nd.s[size].forEach(([id, q]) => {
      if (free(id, d.a, d.b) >= q) return;
      const al = nd.alt && nd.alt[id];
      worst = Math.max(worst, al && free(al[0], d.a, d.b) >= q * al[1] ? 1 : 2);
    });
    return worst;
  }
  const VERDICT = [`<span class="st ok">We have it for your dates</span>`, `<span class="st lim">We have something that works</span>`, `<span class="st no">Our team will find you options</span>`];
  function quote(root, opts) {
    const P = opts.prefix;
    root.innerHTML = `
      <div class="q-head"><div class="dates" data-dates></div></div>
      <div class="q-two"><label class="field q-size"><span>Type of event</span><select data-type><option>Outdoor festival</option><option>Conference</option><option>Gala</option><option>Wedding</option><option>Something else</option></select></label>
      <label class="field q-size"><span>Event size</span><select data-size>${Object.entries(SIZES).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></label></div>
      <div class="chips" data-chips></div>
      <div class="q-grid">
        <div class="rows" data-rows></div>
        <aside class="q-cart">
          <span class="eyebrow">Your request</span>
          <div data-lines class="q-lines"></div>
          <label class="field"><span>Anything else you need?</span><input data-other placeholder="Describe it and we'll match it"></label>
          <div class="q-add">
            <label class="tick"><input type="checkbox" data-addon> Delivery and pickup</label>
            <label class="tick"><input type="checkbox" data-addon> Crew to set up and strike</label>
            <label class="tick"><input type="checkbox" data-addon> Show technician on the day</label>
            <label class="tick"><input type="checkbox" data-hold> Hold my dates for 48 hours</label>
          </div>
          <p class="q-note mute">Big or small, we have the capacity to handle it. Our team builds the right setup for your event and sends your quote, usually within <span class="todo">one business day?</span></p>
          <div class="btns"><button class="btn" data-send>Send my request</button><button class="btn ghost" data-share>Copy a link to this request</button></div>
          <div data-past></div>
        </aside>
      </div>
      <div class="q-modal" data-modal hidden></div>`;
    dateInputs($("[data-dates]", root), P);
    const cats = ["All", ...new Set(NEEDS.map(i => i.cat))]; let cat = "All";
    const chips = $("[data-chips]", root);
    chips.innerHTML = cats.map(c => `<button class="chip${c === cat ? " on" : ""}" data-c="${c}">${c}</button>`).join("");
    chips.addEventListener("click", e => { const c = e.target.dataset.c; if (!c) return; cat = c; $$(".chip", chips).forEach(x => x.classList.toggle("on", x.dataset.c === c)); draw(); });
    const sizeSel = $("[data-size]", root); sizeSel.value = store.get(P + "_size", "M");
    sizeSel.addEventListener("change", () => { store.set(P + "_size", sizeSel.value); draw(); });
    // Shared link (?need=key:size,key:size)
    const sp = new URLSearchParams(location.search).get("need");
    if (sp) { const c = {}; sp.split(",").forEach(p => { const [k, v] = p.split(":"); if (NEEDS.find(i => i.k === k)) c[k] = SIZES[v] ? v : "M"; }); setCart(P, c); }
    function draw() {
      const d = dates(P), c = cart(P), sz = sizeSel.value;
      $("[data-rows]", root).innerHTML = NEEDS.filter(i => cat === "All" || i.cat === cat).map(nd => {
        const on = !!c[nd.k];
        return `<div class="row q-row"><div><div class="nm">${esc(nd.n)}</div><div class="ct">${nd.cat}</div></div><button class="btn ${on ? "ghost" : ""} sm" data-tg="${nd.k}">${on ? "Added" : "Add"}</button></div>`;
      }).join("");
      const ks = Object.keys(c).filter(k => NEEDS.find(i => i.k === k));
      $("[data-lines]", root).innerHTML = ks.length ? ks.map(k => { const nd = NEEDS.find(i => i.k === k); return `<div class="q-line"><span>${esc(nd.n)}<br><small class="mute">${SIZES[c[k]]}</small></span><button class="q-x" data-tg="${k}" aria-label="Remove">×</button></div>`; }).join("") : `<p class="mute">Nothing added yet. Pick your dates, then add what your event needs.</p>`;
      const past = store.get(P + "_requests", []);
      $("[data-past]", root).innerHTML = past.length ? `<div class="q-past"><span class="eyebrow">Your past requests</span>${past.slice(-3).reverse().map((r, i) => `<button class="q-sug" data-rebook="${past.length - 1 - i}"><span>${esc(r.when)}</span>${Object.keys(r.cart).length} needs<em>Book again</em></button>`).join("")}</div>` : "";
    }
    root.addEventListener("click", e => {
      const t = e.target.closest("button"); if (!t) return;
      const c = cart(P);
      if (t.dataset.tg) { c[t.dataset.tg] ? delete c[t.dataset.tg] : c[t.dataset.tg] = sizeSel.value; setCart(P, c); }
      if (t.dataset.rebook) { const r = store.get(P + "_requests", [])[+t.dataset.rebook]; setCart(P, r.cart); }
      if (t.hasAttribute("data-share")) {
        const url = location.origin + location.pathname + "?need=" + Object.entries(c).map(([k, v]) => k + ":" + v).join(",") + "#quote";
        (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => { t.textContent = "Link copied"; }, () => prompt("Copy this link", url));
      }
      if (t.hasAttribute("data-send")) {
        if (!Object.keys(c).length && !$("[data-other]", root).value) { modal(`<h3>Add what you need first</h3><p>Pick your dates and add at least one thing.</p><button class="btn" data-ok>OK</button>`); return; }
        modal(`<h3>Your details</h3><div class="form-grid"><label class="field"><span>Name</span><input></label><label class="field"><span>Company</span><input></label><label class="field"><span>Email</span><input type="email"></label><label class="field"><span>Phone</span><input type="tel"></label></div><label class="field"><span>Venue and anything else we should know</span><textarea rows="3"></textarea></label><button class="btn" data-final>Send my request</button>`);
      }
      if (t.hasAttribute("data-final")) {
        const past = store.get(P + "_requests", []);
        past.push({ when: new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" }), cart: c });
        store.set(P + "_requests", past);
        modal(`<h3>Got it.</h3><p>Our team will build the right setup for your ${$("[data-type]", root).value.toLowerCase()} and send your quote. ${$("[data-hold]", root).checked ? "We've asked to hold your dates for 48 hours." : ""}</p><p class="mute">Preview only: requests are saved in this browser and not sent yet.</p><button class="btn" data-ok>Done</button>`);
      }
      if (t.hasAttribute("data-ok")) { $("[data-modal]", root).hidden = true; draw(); }
    });
    function modal(h) { const m = $("[data-modal]", root); m.innerHTML = `<div class="q-sheet">${h}</div>`; m.hidden = false; }
    document.addEventListener("macdates", draw); document.addEventListener("maccart", draw);
    const ty = new URLSearchParams(location.search).get("type"); if (ty) $("[data-type]", root).value = ty;
    draw();
  }
  // Generic verdict (staff use only now) for a need, used by client apps and the home page (no names, no counts)
  function needStatus(k, size, d) { return VERDICT[check(k, size || "M", d || dates("mac"))]; }

  // ---------------- Floor planner ----------------
  const ROOMS = {
    "Ballroom, 30 × 20 m": [30, 20], "Theatre, 24 × 16 m": [24, 16], "Conference room, 14 × 9 m": [14, 9], "Outdoor field, 50 × 35 m": [50, 35]
  };
  function planner(root, opts) {
    const P = opts.prefix;
    let roomKey = Object.keys(ROOMS)[0], items = store.get(P + "_layout", []), sel = -1;
    root.innerHTML = `
      <div class="pl-bar">
        <label class="field"><span>Room</span><select data-room>${Object.keys(ROOMS).map(k => `<option>${k}</option>`).join("")}</select></label>
        <div class="btns"><button class="btn ghost" data-rot>Rotate</button><button class="btn ghost" data-del>Remove</button><button class="btn ghost" data-clear>Start over</button><button class="btn" data-toq>Add to my quote</button></div>
      </div>
      <div class="pl-grid">
        <div class="pl-pal" data-pal></div>
        <div class="pl-stage"><svg data-svg role="img" aria-label="Room layout"></svg><p class="mute pl-help">Tap a piece of gear to drop it in, then drag it into place. Tap a piece to select it.</p></div>
      </div>`;
    const svg = $("[data-svg]", root);
    const placeable = INV.filter(i => i.w > 0);
    function pal() {
      const d = dates(P);
      $("[data-pal]", root).innerHTML = placeable.map(it => { const left = free(it.id, d.a, d.b); const used = items.filter(x => x.id === it.id).length; return PUBLIC ? `<button class="pl-item" data-add="${it.id}"><span class="sw" style="background:${it.col}"></span><span>${esc(it.n)}</span></button>` : `<button class="pl-item" data-add="${it.id}" ${used >= left ? "disabled" : ""}><span class="sw" style="background:${it.col}"></span><span>${esc(it.n)}<small>${used >= left ? "None left on your dates" : left - used + " free on your dates"}</small></span></button>`; }).join("");
    }
    function draw() {
      const [W, H] = ROOMS[roomKey];
      svg.setAttribute("viewBox", `-1 -1 ${W + 2} ${H + 2}`);
      let g = `<rect x="0" y="0" width="${W}" height="${H}" class="pl-floor"/>`;
      for (let x = 1; x < W; x++) g += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" class="pl-grid${x % 5 ? "" : " major"}"/>`;
      for (let y = 1; y < H; y++) g += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" class="pl-grid${y % 5 ? "" : " major"}"/>`;
      g += `<text x=".4" y="${H - .4}" class="pl-scale">Grid: 1 m</text>`;
      items.forEach((p, i) => {
        const it = INV.find(z => z.id === p.id);
        g += `<g transform="translate(${p.x} ${p.y}) rotate(${p.r})" data-i="${i}" class="pl-piece${i === sel ? " sel" : ""}"><rect x="${-it.w / 2}" y="${-it.d / 2}" width="${it.w}" height="${it.d}" fill="${it.col}"/>${it.w > 2 ? `<text y=".15" class="pl-lbl">${esc(it.n.split(",")[0])}</text>` : ""}</g>`;
      });
      svg.innerHTML = g; store.set(P + "_layout", items); pal();
    }
    function pt(e) { const m = svg.getScreenCTM().inverse(); const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m); return p; }
    let drag = null;
    svg.addEventListener("pointerdown", e => {
      const g = e.target.closest(".pl-piece"); if (!g) { sel = -1; draw(); return; }
      sel = +g.dataset.i; const p = pt(e); drag = { dx: items[sel].x - p.x, dy: items[sel].y - p.y };
      svg.setPointerCapture(e.pointerId); draw();
    });
    svg.addEventListener("pointermove", e => {
      if (!drag || sel < 0) return; const p = pt(e); const [W, H] = ROOMS[roomKey];
      items[sel].x = Math.max(0, Math.min(W, Math.round((p.x + drag.dx) * 4) / 4));
      items[sel].y = Math.max(0, Math.min(H, Math.round((p.y + drag.dy) * 4) / 4));
      const g = svg.querySelector(`[data-i="${sel}"]`); g.setAttribute("transform", `translate(${items[sel].x} ${items[sel].y}) rotate(${items[sel].r})`);
    });
    svg.addEventListener("pointerup", () => { if (drag) { drag = null; draw(); } });
    root.addEventListener("click", e => {
      const t = e.target.closest("button"); if (!t) return;
      const [W, H] = ROOMS[roomKey];
      if (t.dataset.add) { items.push({ id: t.dataset.add, x: W / 2 + (items.length % 5) - 2, y: H / 3 + (items.length % 3), r: 0 }); sel = items.length - 1; draw(); }
      if (t.hasAttribute("data-rot") && sel >= 0) { items[sel].r = (items[sel].r + 90) % 360; draw(); }
      if (t.hasAttribute("data-del") && sel >= 0) { items.splice(sel, 1); sel = -1; draw(); }
      if (t.hasAttribute("data-clear")) { items = []; sel = -1; draw(); }
      if (t.hasAttribute("data-toq")) {
        const c = cart(P); const sz = store.get(P + "_size", "M");
        items.forEach(p => { const nd = NEEDS.find(n => Object.values(n.s).some(l => l.some(([id]) => id === p.id))); if (nd && !c[nd.k]) c[nd.k] = sz; }); setCart(P, c);
        t.textContent = "Added. See your quote"; setTimeout(() => { location.hash = "quote"; t.textContent = "Add to my quote"; }, 700);
      }
    });
    $("[data-room]", root).addEventListener("change", e => { roomKey = e.target.value; draw(); });
    document.addEventListener("macdates", pal);
    if (!items.length) { // a starter layout so the first view isn't empty
      items = [];
      [12.6, 15, 17.4].forEach(x => [2.6, 3.8, 5].forEach(y => items.push({ id: "stg", x, y, r: 0 })));
      items.push({ id: "ledl", x: 15, y: 1.4, r: 0 }, { id: "spk", x: 10.2, y: 3.4, r: 0 }, { id: "spk", x: 19.8, y: 3.4, r: 0 }, { id: "pod", x: 17.8, y: 4.4, r: 0 }, { id: "stair", x: 15, y: 6.4, r: 0 }, { id: "mix", x: 15, y: 15, r: 0 }, { id: "tow", x: 9.4, y: 1.4, r: 0 }, { id: "tow", x: 20.6, y: 1.4, r: 0 }, { id: "scr", x: 4, y: 9, r: 90 }, { id: "scr", x: 26, y: 9, r: 90 }, { id: "cam", x: 15, y: 12.5, r: 0 });
    }
    draw();
  }

  // ---------------- Simple request forms used by PSI and Tour Trucking ----------------
  function sendForm(form, msg) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      form.innerHTML = `<div class="done"><h3>Got it.</h3><p>${msg}</p><p class="mute">Preview only: nothing is sent yet.</p></div>`;
    });
  }

  // PSI crew booking (sample crew pool)
  const ROLES = [["Audio engineer", 14], ["Lighting technician", 12], ["Video technician", 9], ["Stagehand", 40], ["Rigger", 8], ["Backline technician", 6], ["Show caller / stage manager", 4]];
  function crew(root) {
    const P = "psi";
    root.innerHTML = `<div class="dates" data-dates></div><div class="rows" data-rows></div><div class="btns" style="margin-top:22px"><button class="btn" data-send>Request this crew</button></div><div class="q-modal" data-modal hidden></div>`;
    dateInputs($("[data-dates]", root), P);
    const want = {};
    function draw() {
      const d = dates(P); const r = rng(d.a.getDate() * 31 + d.a.getMonth());
      $("[data-rows]", root).innerHTML = ROLES.map(([n, tot], i) => {
        const left = Math.max(0, Math.round(tot * (.25 + r() * .75)) - (i === 4 && d.a.getDay() === 6 ? tot : 0));
        const v = Math.min(want[n] || 0, left); want[n] = v;
        return `<div class="row q-row"><div><div class="nm">${n}</div>${status(left, tot)}</div>${left ? `<div class="step"><button data-m="${i}">−</button><b>${v}</b><button data-p="${i}" ${v >= left ? "disabled" : ""}>+</button></div>` : `<button class="btn ghost sm" data-wl>Join the waitlist</button>`}</div>`;
      }).join("");
    }
    root.addEventListener("click", e => {
      const t = e.target.closest("button"); if (!t) return;
      if (t.dataset.p) { const n = ROLES[+t.dataset.p][0]; want[n] = (want[n] || 0) + 1; draw(); }
      if (t.dataset.m) { const n = ROLES[+t.dataset.m][0]; want[n] = Math.max(0, (want[n] || 0) - 1); draw(); }
      if (t.hasAttribute("data-wl")) { t.textContent = "On the waitlist"; t.disabled = true; }
      if (t.hasAttribute("data-send")) {
        const total = Object.values(want).reduce((a, b) => a + b, 0);
        const m = $("[data-modal]", root);
        m.innerHTML = `<div class="q-sheet">${total ? `<h3>${total} crew requested.</h3><p>PSI will confirm names and call times.</p><p class="mute">Preview only: nothing is sent yet.</p>` : `<h3>Add at least one role.</h3>`}<button class="btn" data-ok>OK</button></div>`; m.hidden = false;
      }
      if (t.hasAttribute("data-ok")) $("[data-modal]", root).hidden = true;
    });
    document.addEventListener("macdates", draw); draw();
  }

  // PSI package builder
  function packages(root) {
    const qs = [
      ["What's the event?", ["Concert", "Festival", "Gala or awards", "Conference"]],
      ["How many people?", ["Under 300", "300 to 1,500", "1,500 to 5,000", "5,000 plus"]],
      ["Where?", ["Indoors", "Outdoors"]]
    ];
    const a = [];
    function draw() {
      if (a.length < qs.length) {
        const [q, opts] = qs[a.length];
        root.innerHTML = `<p class="eyebrow">Question ${a.length + 1} of ${qs.length}</p><h3 class="pk-q">${q}</h3><div class="pk-opts">${opts.map(o => `<button class="btn ghost" data-o="${o}">${o}</button>`).join("")}</div>`;
        return;
      }
      const big = a[1].includes("5,000") || a[1].includes("1,500"), out = a[2] === "Outdoors";
      const list = [
        out ? "Outdoor stage with roof" : "Stage decks sized to your room",
        big ? "Line array sound system with subwoofers" : "Speaker system with monitors",
        a[0] === "Gala or awards" ? "Ambient uplighting and stage wash" : "Moving lights, wash lights and truss",
        a[0] === "Conference" || a[0] === "Gala or awards" ? "Screens, projection and confidence monitors" : "LED video wall",
        "Audio, lighting and video technicians",
        big ? "Stagehands, riggers and a show caller" : "Stagehands for load-in and strike"
      ];
      root.innerHTML = `<p class="eyebrow">Your starting package</p><h3 class="pk-q">${a[0]}, ${a[1].toLowerCase()}, ${a[2].toLowerCase()}</h3><ul class="pk-list">${list.map(l => `<li>${l}</li>`).join("")}</ul><p class="mute">PSI's team tailors this to your show. No prices shown here.</p><div class="btns"><a class="btn" href="#contact">Send this package to PSI</a><button class="btn ghost" data-r>Start again</button></div>`;
    }
    root.addEventListener("click", e => { const t = e.target.closest("button"); if (!t) return; if (t.dataset.o) { a.push(t.dataset.o); draw(); } if (t.hasAttribute("data-r")) { a.length = 0; draw(); } });
    draw();
  }

  // PSI training (sample dates)
  function training(root) {
    const C = [["Course name from PSI", 14, 12], ["Course name from PSI", 35, 3], ["Course name from PSI", 56, 0]];
    root.innerHTML = C.map(([n, d, s], i) => `<div class="row q-row"><div><div class="nm">${n} <span class="todo">placeholder</span></div><div class="ct">${addDays(today, d).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })} · sample date</div>${status(s, 16).replace("Available", "Seats open").replace("Booked on these dates", "Full")}</div><button class="btn ${s ? "" : "ghost"} sm" data-t>${s ? "Save my seat" : "Join the waitlist"}</button></div>`).join("");
    root.addEventListener("click", e => { const t = e.target.closest("[data-t]"); if (t) { t.textContent = t.textContent.includes("seat") ? "Seat requested" : "On the waitlist"; t.disabled = true; } });
  }

  // Tour Trucking: multi-leg route request
  function route(root) {
    let legs = [{ f: "Toronto, ON", t: "" }];
    function draw() {
      root.querySelector("[data-legs]").innerHTML = legs.map((l, i) => `<div class="leg"><label class="field"><span>${i ? "Then from" : "Pick up in"}</span><input value="${esc(l.f)}" data-f="${i}" placeholder="City"></label><label class="field"><span>Deliver to</span><input value="${esc(l.t)}" data-t="${i}" placeholder="City"></label><label class="field"><span>Date</span><input type="date" min="${iso(today)}" value="${l.d || iso(addDays(today, 14 + i * 2))}" data-d="${i}"></label></div>`).join("");
    }
    root.innerHTML = `<form><div data-legs></div><div class="btns"><button type="button" class="btn ghost" data-leg>Add another stop</button></div><div class="form-grid" style="margin-top:20px"><label class="field"><span>Trailer</span><select><option>53 ft dry van</option><option>53 ft air-ride</option><option>26 ft straight truck</option><option>Not sure yet</option></select></label><label class="field"><span>Load</span><select><option>Full truckload</option><option>Less than a truckload</option></select></label><label class="field"><span>Name</span><input required></label><label class="field"><span>Email</span><input type="email" required></label></div><button class="btn">Request this route</button></form>`;
    root.addEventListener("input", e => { const t = e.target; if (t.dataset.f) legs[+t.dataset.f].f = t.value; if (t.dataset.t) { legs[+t.dataset.t].t = t.value; } if (t.dataset.d) legs[+t.dataset.d].d = t.value; });
    root.addEventListener("click", e => { if (e.target.closest("[data-leg]")) { const last = legs[legs.length - 1]; legs.push({ f: last.t, t: "" }); draw(); } });
    draw(); sendForm($("form", root), "Our dispatch team will confirm trucks and times for every stop.");
  }

  // Tour Trucking: truck space calculator (standard case sizes, feet)
  const CASES = [["Speaker / amp road case", 2, 2.5, 4], ["Lighting case", 2, 4, 3.5], ["LED panel case (6 panels)", 2.5, 2.5, 4], ["Truss section, 10 ft", 1, 10, 1], ["Cable trunk", 2, 4, 2.5], ["Stage deck, 4 × 8", 4, 8, .7], ["Wardrobe case", 2, 4, 5.5]];
  function space(root) {
    const n = {};
    function draw() {
      // floor length used across an 8 ft wide trailer, stacking to 9 ft where the case allows
      let ft2 = 0; CASES.forEach(([nm, w, l, h]) => { const c = n[nm] || 0; const stack = Math.max(1, Math.floor(9 / h)); ft2 += Math.ceil(c / stack) * w * l; });
      const linear = Math.ceil(ft2 / 8 * 1.12);
      const rec = linear === 0 ? "Add your gear to see how much trailer you need." : linear <= 22 ? "Fits a 26 ft straight truck." : linear <= 52 ? "Fits one 53 ft trailer." : `About ${Math.ceil(linear / 52)} × 53 ft trailers.`;
      root.innerHTML = `<div class="rows">${CASES.map(([nm, w, l, h]) => `<div class="row q-row"><div><div class="nm">${nm}</div><div class="ct">${w} × ${l} ft, ${h} ft tall</div></div><div class="step"><button data-m="${nm}">−</button><b>${n[nm] || 0}</b><button data-p="${nm}">+</button></div></div>`).join("")}</div>
      <div class="calc-out"><div class="big">${linear}<small> ft of trailer</small></div><div class="gauge"><i style="width:${Math.min(100, linear / 52 * 100)}%"></i></div><p>${rec}</p><a class="btn" href="#route">Book this truck</a><p class="mute" style="margin-top:12px">An estimate from standard case sizes. Dispatch confirms the real fit.</p></div>`;
    }
    root.addEventListener("click", e => { const t = e.target.closest("button"); if (!t) return; if (t.dataset.p) n[t.dataset.p] = (n[t.dataset.p] || 0) + 1; if (t.dataset.m) n[t.dataset.m] = Math.max(0, (n[t.dataset.m] || 0) - 1); draw(); });
    n["Speaker / amp road case"] = 12; n["Lighting case"] = 8; n["Truss section, 10 ft"] = 10; draw();
  }

  window.MACTOOLS = { INV, NEEDS, SIZES, needStatus, PUBLIC, free, quote, planner, crew, packages, training, route, space, sendForm, status, dates, today, addDays };
})();
