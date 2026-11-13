/* MGC Hub Quote Builder (staff only). SAMPLE inventory. No prices are stored or invented:
   the rep types every rate. The finished quote only ever shows the selling company. */
(function () {
  const T = window.MACTOOLS, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const iso = d => d.toISOString().slice(0, 10);
  const fmt = d => new Date(d + "T12:00").toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  const cad = n => n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
  const BR = {
    mss: { n: "MAC Show Systems Inc.", a: "125 Bermondsey Rd, North York, ON", e: "info@macshowsystems.com", logo: "../img/logos/mss-logo-even.png", r: 1472 / 306, site: "mac" },
    psi: { n: "PSI · Production Service Industries", a: "255 Bunting Rd, St. Catharines, ON", e: "info@psi.show", logo: "../img/logos/psi-logo-bw.png", r: 1, site: "psi", img: true },
    ttl: { n: "Tour Trucking Logistics Inc.", a: "Address to confirm", e: "Email to confirm", logo: "../img/logos/ttl-logo-even.png", r: 2849 / 975, site: "tt" }
  };
  // Services each brand sells as its own line (sister-company work shows under the selling brand)
  const SVC = {
    mss: ["Delivery and pickup", "Show technician (per day)", "Set-up and strike crew", "Rush weekend prep"],
    psi: ["Audio engineer (per day)", "Lighting technician (per day)", "Stagehand (per day)", "Rigger (per day)", "Production manager"],
    ttl: ["53 ft air-ride trailer (per leg)", "26 ft straight truck (per leg)", "Team drivers", "Warehousing (per week)", "Lift-gate"]
  };
  const KEY = "mac_hubquote";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const S = load() || { b: "mss", client: "Sample client A", contact: "Planner name", ev: "Annual gala", venue: "Venue name, Toronto",
    a: iso(T.addDays(T.today, 21)), z: iso(T.addDays(T.today, 22)), lines: [{ id: "led", q: 1, r: "" }, { id: "spk", q: 2, r: "" }, { id: "mov", q: 12, r: "" }, { s: "Delivery and pickup", q: 1, r: "" }], no: 1047, tax: 13, note: "" };

  const inv = id => T.INV.find(i => i.id === id);
  const rangeD = () => ({ a: new Date(S.a + "T12:00"), b: new Date(S.z + "T12:00") });
  const days = () => Math.max(1, Math.round((rangeD().b - rangeD().a) / 864e5) + 1);

  function stock() {
    const d = rangeD(), q = ($("[data-find]").value || "").toLowerCase();
    $("[data-stock]").innerHTML = T.INV.filter(i => !q || (i.n + i.cat).toLowerCase().includes(q)).map(i => {
      const f = T.free(i.id, d.a, d.b);
      return `<div class="qb-it"><div><b>${i.n}</b><small>${i.cat}</small>${T.status(f, i.q)}</div><button class="mini" data-add="${i.id}" ${f ? "" : "data-wait"}>${f ? "Add" : "Waitlist"}</button></div>`;
    }).join("") || `<p class="mute">Nothing matches.</p>`;
    $("[data-svc]").innerHTML = SVC[S.b].map(s => `<button class="qb-chip" data-svcadd="${s}">+ ${s}</button>`).join("");
  }

  function flags() {
    const d = rangeD(), out = [];
    S.lines.forEach(l => { if (!l.id) return; const f = T.free(l.id, d.a, d.b); if (l.q > f) out.push(`<div class="qb-flag no"><b>${inv(l.id).n}</b>: ${l.q} on the quote, ${f} free on these dates. Offer the waitlist or move dates.</div>`); });
    const big = S.lines.some(l => l.id && ["stgo", "ledl", "spk", "sub"].includes(l.id));
    const hasDel = S.lines.some(l => l.s && /Delivery|trailer|truck/i.test(l.s));
    if (S.b === "mss" && big && !hasDel) out.push(`<div class="qb-flag">Large gear with no delivery line. Tour Trucking has a 53 ft trailer free on these dates. Add it as "Delivery and pickup": it shows under MAC Show Systems only.</div>`);
    if (S.b === "mss" && !S.lines.some(l => l.s && /technician|crew/i.test(l.s))) out.push(`<div class="qb-flag">No crew on this quote. PSI has technicians free on these dates. Add "Show technician": it shows under MAC Show Systems only.</div>`);
    if (S.b === "psi" && S.lines.some(l => l.id === "stgo") && T.free("stgo", d.a, d.b) === 0) out.push(`<div class="qb-flag">PSI's outdoor stage is booked. MAC Show Systems stock can cover it, billed by PSI.</div>`);
    if (S.b === "ttl") out.push(`<div class="qb-flag">Shipper moving show gear? MAC Show Systems can supply it on site. Staff note only, never on this quote.</div>`);
    $("[data-flags]").innerHTML = out.join("") || `<div class="qb-flag ok">No conflicts on these dates.</div>`;
  }

  function lines() {
    const d = rangeD();
    $("[data-lines]").innerHTML = S.lines.map((l, i) => {
      const nm = l.id ? inv(l.id).n : l.s, f = l.id ? T.free(l.id, d.a, d.b) : null;
      return `<div class="qb-ln ${f !== null && l.q > f ? "bad" : ""}"><div class="qb-nm">${nm}${f !== null ? `<small>${f} free on these dates</small>` : `<small>Service</small>`}</div>
        <div class="step"><button data-m="${i}" aria-label="Less">−</button><b>${l.q}</b><button data-p="${i}" aria-label="More">+</button></div>
        <label class="qb-rate"><span>Rate</span><input inputmode="decimal" placeholder="Your rate" value="${l.r}" data-r="${i}"></label>
        <button class="qb-x" data-x="${i}" aria-label="Remove">×</button></div>`;
    }).join("") || `<p class="mute">Add gear from the left, or a service.</p>`;
  }

  function doc() {
    const b = BR[S.b]; let sub = 0;
    const rows = S.lines.map(l => { const r = parseFloat(String(l.r).replace(/[^0-9.]/g, "")); const t = isNaN(r) ? null : r * l.q; if (t) sub += t;
      return `<tr><td>${l.id ? inv(l.id).n : l.s}</td><td>${l.q}</td><td>${isNaN(r) ? '<span class="todo">rate</span>' : cad(r)}</td><td>${t === null ? "" : cad(t)}</td></tr>`; }).join("");
    const tax = sub * S.tax / 100;
    const logo = b.img ? `<img src="${b.logo}" alt="" width="64" height="64">` : `<span class="mlogo" style="width:${S.b === "mss" ? 230 : 164}px;aspect-ratio:${b.r};-webkit-mask-image:url(${b.logo});mask-image:url(${b.logo})"></span>`;
    $("[data-doc]").innerHTML = `<div class="qd" data-site="${b.site}">
      <div class="qd-top">${logo}<div class="qd-co"><b>${b.n}</b><br>${b.a}<br>${b.e}</div></div>
      <div class="qd-h"><div><span class="qd-k">Quote</span><h3>#${S.no}</h3></div><div><span class="qd-k">Prepared for</span><b>${S.client}</b><br>${S.contact}</div><div><span class="qd-k">Event</span><b>${S.ev}</b><br>${S.venue}<br>${fmt(S.a)}${S.a !== S.z ? " to " + fmt(S.z) : ""}</div></div>
      <table><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="qd-tot"><div><span>Subtotal</span><b>${cad(sub)}</b></div><div><span>HST ${S.tax}%</span><b>${cad(tax)}</b></div><div class="g"><span>Total (CAD)</span><b>${cad(sub + tax)}</b></div></div>
      ${S.note ? `<p class="qd-note">${S.note.replace(/</g, "&lt;")}</p>` : ""}
      <p class="qd-fine">Dates are held for 48 hours from the date of this quote. ${days()} day${days() > 1 ? "s" : ""} on site. Sample quote for preview only.</p>
      <div class="qd-ok"><button class="cbtn" data-approve>Approve this quote</button><span>Clients approve from the email or their ${S.b === "ttl" ? "Track My Load" : S.b === "psi" ? "PSI" : "MAC Show Systems"} app.</span></div>
    </div>`;
  }

  function all() { save(); $("[data-qno]").textContent = "#" + S.no; stock(); lines(); flags(); doc(); }
  function fields() { $$("[data-f]").forEach(i => i.value = S[i.dataset.f]); $$("[data-b]").forEach(x => x.classList.toggle("on", x.dataset.b === S.b)); }

  document.addEventListener("input", e => {
    const t = e.target;
    if (t.dataset.f) { S[t.dataset.f] = t.dataset.f === "tax" ? +t.value || 0 : t.value; if (t.dataset.f === "z" && S.z < S.a) S.z = S.a; all(); }
    if (t.dataset.r) { S.lines[+t.dataset.r].r = t.value; save(); doc(); }
    if (t.matches("[data-find]")) stock();
  });
  document.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.b) { S.b = t.dataset.b; S.lines = S.lines.filter(l => l.id || SVC[S.b].includes(l.s)); fields(); return all(); }
    if (t.dataset.add) { if (t.hasAttribute("data-wait")) { toast("Client added to the waitlist. MGC Hub will flag it if stock frees up."); return; } const ex = S.lines.find(l => l.id === t.dataset.add); ex ? ex.q++ : S.lines.push({ id: t.dataset.add, q: 1, r: "" }); return all(); }
    if (t.dataset.svcadd) { S.lines.push({ s: t.dataset.svcadd, q: 1, r: "" }); return all(); }
    if (t.dataset.p) { S.lines[+t.dataset.p].q++; return all(); }
    if (t.dataset.m) { const l = S.lines[+t.dataset.m]; l.q = Math.max(1, l.q - 1); return all(); }
    if (t.dataset.x) { S.lines.splice(+t.dataset.x, 1); return all(); }
    if (t.hasAttribute("data-print")) return print();
    if (t.hasAttribute("data-hold")) return toast(`48-hour hold placed on ${S.lines.filter(l => l.id).length} items for quote #${S.no}.`);
    if (t.hasAttribute("data-new")) { S.no++; S.lines = []; S.client = "Sample client"; fields(); return all(); }
    if (t.hasAttribute("data-send")) {
      const b = BR[S.b];
      $("[data-mail]").innerHTML = `<div class="qb-mail"><div class="qd-k">Email preview · sent from ${b.e}</div><p><b>Subject:</b> Your quote #${S.no} from ${b.n.split(" ·")[0].replace(" Inc.", "")}</p><p>Hi ${S.contact.split(" ")[0]},</p><p>Here's your quote for ${S.ev} on ${fmt(S.a)}. Your dates are held for 48 hours. You can approve it in one tap from the link below.</p><p class="qd-k">Signed: your name, ${b.n}</p><p class="mute">Only ${b.n.split(" ·")[0]} appears on this email. Preview only, nothing is sent.</p></div>`;
      return toast("Email preview ready below. Nothing was sent.");
    }
    if (t.hasAttribute("data-approve")) return toast("In the real app, approval lands in MGC Hub and books the stock.");
  });
  let tt; function toast(m) { const el = $("#toast"); el.textContent = m; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("on"), 2600); }

  $$("[data-f='a'],[data-f='z']").forEach(i => i.min = iso(T.today));
  fields(); all();
})();
