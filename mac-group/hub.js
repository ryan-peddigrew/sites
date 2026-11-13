/* MGC Hub demo. Sample data only: clients are labelled "Sample client" on purpose. */
(function () {
  const { $, $$ } = window.MAC; const T = window.MACTOOLS;
  const BR = { mac: "MAC Show Systems", psi: "PSI", tt: "Tour Trucking" };
  const SIG = {
    mac: `<b>Your name</b><br>MAC Show Systems<br>125 Bermondsey Rd, North York, ON<br>info@macshowsystems.com`,
    psi: `<b>Your name</b><br>PSI · Production Service Industries<br>255 Bunting Rd, St. Catharines, ON<br>info@psi.show`,
    tt: `<b>Your name</b><br>Tour Trucking Logistics<br><span class="todo">email needed</span>`
  };
  const REQ = [
    { id: 1042, b: "mac", c: "Sample client A", what: "LED wall, line array, 9 stage decks", when: 21, flag: "Needs delivery: a 53 ft trailer is free that day" },
    { id: 1043, b: "psi", c: "Sample client B", what: "Crew: 2 audio, 1 lighting, 8 stagehands", when: 9, flag: "" },
    { id: 1044, b: "tt", c: "Sample client C", what: "Toronto to Montréal to Québec City, 53 ft", when: 30, flag: "Show gear could come from MAC Show Systems stock" },
    { id: 1045, b: "mac", c: "Sample client D", what: "Projectors, screens, wireless mics", when: 5, flag: "Needs a show technician: PSI has 3 free" },
    { id: 1046, b: "psi", c: "Sample client E", what: "Festival package, outdoor, 5,000 plus", when: 60, flag: "Outdoor stage booked at PSI; MAC Show Systems has one free" }
  ];
  let as = "mac";
  const day = n => T.addDays(T.today, n).toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  const mine = () => REQ.filter(r => as === "all" || r.b === as);
  const chip = b => as === "all" ? `<span class="hub-chip">${BR[b]}</span>` : "";

  function draw() {
    $("[data-incoming]").innerHTML = mine().map(r => `<div class="hub-item"><div><b>#${r.id} · ${r.c}</b>${chip(r.b)}<p>${r.what}</p><span class="mute">Event ${day(r.when)}</span></div><button class="btn sm" data-open="${r.id}">Open</button></div>`).join("") || `<p class="mute">Nothing new.</p>`;
    // Inventory across locations
    const d = T.dates("hub");
    $("[data-inv]").innerHTML = `<div class="hub-tr hub-th"><span>Item</span><span>North York</span><span>St. Catharines</span><span>Free on your dates</span></div>` + T.INV.map((it, i) => {
      const left = T.free(it.id, d.a, d.b); const ny = Math.ceil(it.q * .62), sc = it.q - ny;
      return `<div class="hub-tr"><span><b>${it.n}</b><small>${it.cat}</small></span><span>${ny}</span><span>${sc}</span><span>${T.status(left, it.q)}</span></div>`;
    }).join("");
    // Quotes + branded email preview
    $("[data-qlist]").innerHTML = mine().map((r, i) => `<button class="hub-item hub-q${i ? "" : " on"}" data-q="${r.id}"><div><b>#${r.id} · ${r.c}</b>${chip(r.b)}<p>${r.what}</p></div></button>`).join("");
    mail(mine()[0]);
    $("[data-flags]").innerHTML = REQ.filter(r => r.flag && (as === "all" || r.b === as)).map(r => `<div class="hub-item flag"><div><b>#${r.id} · ${BR[r.b]}</b><p>${r.flag}</p><span class="mute">Added lines go out under ${BR[r.b]}. The client never sees a second company.</span></div><button class="btn sm" data-add>Add to quote</button></div>`).join("") || `<p class="mute">No cross-sell flags right now.</p>`;
    $("[data-clients]").innerHTML = ["F", "G", "H", "J"].map((x, i) => { const b = as === "all" ? ["mac", "psi", "tt", "mac"][i] : as; return `<div class="hub-item"><div><b>Sample client ${x}</b>${chip(b)}<p>Last booked ${["14", "11", "13", "12"][i]} months ago</p></div><button class="btn ghost sm" data-draft="${b}">Draft check-in</button></div>`; }).join("");
  }
  function mail(r) {
    const m = $("[data-mail]"); if (!r) { m.innerHTML = ""; return; }
    m.innerHTML = `<div class="mail"><div class="mail-h"><span>From: ${r.b === "mac" ? "you@macshowsystems.com" : r.b === "psi" ? "you@psi.show" : "you@tourtrucking.ca"}</span><span>To: ${r.c}</span><span>Subject: Your quote #${r.id}</span></div>
      <p>Hi,</p><p>Thanks for your request for ${day(r.when)}. Everything you asked for is available, and your quote is attached.</p>${r.flag ? `<p>We've also included delivery and crew so you don't have to arrange them separately.</p>` : ""}<p>Talk soon,</p><div class="sig">${SIG[r.b]}</div></div>
      <p class="mute" style="font-size:14px;margin-top:12px">Sent under ${BR[r.b]} only. No other company appears in the email, quote or signature.</p><button class="btn" data-sent>Send quote</button>`;
  }
  document.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.v) { $$(".hub-tabs button").forEach(b => b.classList.toggle("on", b === t)); $$("[data-view]").forEach(s => s.hidden = s.dataset.view !== t.dataset.v); $("[data-title]").textContent = t.textContent.trim(); }
    if (t.dataset.q) { $$(".hub-q").forEach(b => b.classList.toggle("on", b === t)); mail(REQ.find(r => r.id == t.dataset.q)); }
    if (t.dataset.open) { $$(".hub-tabs button")[2].click(); const b = $(`[data-q="${t.dataset.open}"]`); if (b) b.click(); }
    if (t.hasAttribute("data-add")) { t.textContent = "Added"; t.disabled = true; }
    if (t.hasAttribute("data-sent")) { t.textContent = "Sent (demo)"; t.disabled = true; }
    if (t.dataset.draft) { t.textContent = "Draft ready in " + BR[t.dataset.draft]; t.disabled = true; }
  });
  $("[data-as]").addEventListener("change", e => { as = e.target.value; draw(); });
  // Hub date inputs reuse the shared helper
  const host = $("[data-hdates]");
  const d = T.dates("hub"); const iso = x => x.toISOString().slice(0, 10);
  host.innerHTML = `<label>From<input type="date" value="${iso(d.a)}"></label><label>To<input type="date" value="${iso(d.b)}"></label>`;
  $$("input", host).forEach(inp => inp.addEventListener("change", () => { const [a, b] = $$("input", host).map(x => new Date(x.value + "T12:00")); localStorage.setItem("hub_dates", JSON.stringify({ a: iso(a), b: iso(b < a ? a : b) })); draw(); }));
  draw();
})();
