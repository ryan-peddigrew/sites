/* Client dashboard apps, one per brand. SAMPLE DATA ONLY. Each app shows one brand only.
   No inventory, availability, gear names or prices: quote totals live in the PDF the team sends. */
(function () {
  const T = window.MACTOOLS, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const BRAND = document.documentElement.dataset.app; // mss | psi | ttl
  const day = (n, o) => T.addDays(T.today, n).toLocaleDateString("en-CA", o || { weekday: "short", month: "short", day: "numeric" });
  const I = {
    home: '<path d="M3 11 12 4l9 7v9H3z"/><path d="M9 20v-6h6v6"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    quote: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>', box: '<path d="M3 7 12 3l9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>', doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/>', crew: '<circle cx="9" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4a3 3 0 0 1 0 6M18 14c2 .7 3 2.6 3 6"/>',
    truck: '<path d="M2 6h12v10H2zM14 9h4l3 3v4h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>', school: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    layout: '<rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M9 9v12"/>', back: '<path d="M15 5l-7 7 7 7"/>', check: '<path d="m5 12 5 5 9-10"/>', bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>'
  };
  const ic = (n, c = "") => `<svg class="ci ${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(BRAND + "_" + k)) ?? d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(BRAND + "_" + k, JSON.stringify(v)); } catch (e) {} } };

  // ---------------- Sample data per brand ----------------
  const RUN = (t) => t.map(([a, b]) => `<div class="tl"><b>${a}</b><span>${b}</span></div>`).join("");
  const DATA = {
    mss: {
      rep: "Your MAC Show Systems rep",
      events: [
        { id: "e1", d: 21, name: "Annual gala · sample", venue: "Venue name, Toronto", status: "Confirmed", img: "../../img/mac-venue-1.webp",
          run: [["7:00 AM", "Load-in"], ["2:00 PM", "Sound check"], ["6:00 PM", "Doors"], ["7:30 PM", "Show"], ["11:30 PM", "Strike"]],
          gear: [["led", 1], ["spk", 2], ["mov", 12], ["upl", 40], ["pod", 1], ["mic", 6]] },
        { id: "e2", d: 48, name: "Outdoor festival stage · sample", venue: "Park, Toronto", status: "Quote sent", img: "../../img/mac-hero.webp",
          run: [["Day before", "Stage build"], ["8:00 AM", "Load-in"], ["12:00 PM", "Line check"], ["2:00 PM", "Gates"], ["11:00 PM", "Strike"]],
          gear: [["stgo", 1], ["spk", 4], ["sub", 12], ["mon", 8], ["mix", 2], ["ledl", 1]] },
        { id: "e3", d: -340, name: "Last year's gala · sample", venue: "Venue name, Toronto", status: "Done", img: "../../img/mac-venue-4.webp", run: [], gear: [["led", 1], ["upl", 30], ["spk", 2]] }
      ],
      quotes: [{ id: "#1042", ev: "e2", st: "Waiting on you" }, { id: "#1031", ev: "e1", st: "Approved" }],
      docs: ["Quote #1042 (PDF)", "Quote #1031 (PDF)", "Floor plan, ballroom", "Certificate of insurance", "Event-day sheet, annual gala", "Invoice for #1031"],
      tabs: ["home", "events", "quotes", "avail", "chat", "docs"]
    },
    psi: {
      rep: "Your PSI producer",
      events: [
        { id: "e1", d: 9, name: "Summer concert series · sample", venue: "Outdoor stage, Niagara", status: "Crew confirmed", img: "../../img/psi-concert.jpg",
          run: [["6:00 AM", "Crew call"], ["7:00 AM", "Load-in"], ["1:00 PM", "Line check"], ["5:00 PM", "Doors"], ["11:00 PM", "Load-out"]], gear: [["spk", 4], ["sub", 8], ["mov", 24]] },
        { id: "e2", d: 30, name: "Gala dinner · sample", venue: "Ballroom, St. Catharines", status: "Quote sent", img: "../../img/psi-olg-wall.jpg", run: [["9:00 AM", "Crew call"], ["6:00 PM", "Doors"]], gear: [["upl", 50], ["led", 1]] }
      ],
      crew: [["Audio engineer", 2, 2], ["Lighting technician", 1, 1], ["Video technician", 1, 0], ["Stagehand", 10, 8], ["Rigger", 2, 2]],
      quotes: [{ id: "#P-208", ev: "e2", st: "Waiting on you" }, { id: "#P-201", ev: "e1", st: "Approved" }],
      docs: ["Quote #P-208 (PDF)", "Call sheet, concert series", "Stage plot", "Certificate of insurance", "Invoice for #P-201"],
      tabs: ["home", "events", "crew", "quotes", "chat", "train"]
    },
    ttl: {
      rep: "Tour Trucking dispatch",
      loads: [
        { id: "TT-2207", from: "Toronto, ON", to: "Montréal, QC", pct: 62, now: "Near Kingston, ON", eta: day(1) + ", 2:00 PM", trailer: "53 ft air-ride" },
        { id: "TT-2208", from: "Montréal, QC", to: "Québec City, QC", pct: 0, now: "Booked", eta: day(4) + ", 9:00 AM", trailer: "53 ft air-ride" },
        { id: "TT-2209", from: "Québec City, QC", to: "Ottawa, ON", pct: 0, now: "Booked", eta: day(7) + ", 10:00 AM", trailer: "53 ft air-ride" }
      ],
      quotes: [{ id: "#T-551", ev: null, st: "Waiting on you", label: "Ottawa to Halifax, 2 trailers" }, { id: "#T-540", ev: null, st: "Approved", label: "Fall tour, 4 legs" }],
      docs: ["Bill of lading TT-2207", "Pickup photos TT-2207 (6)", "Proof of delivery TT-2206", "Certificate of insurance", "Invoice for #T-540"],
      tabs: ["home", "loads", "tour", "quotes", "chat", "docs"]
    }
  }[BRAND];

  const TABS = {
    home: ["Home", "home"], events: ["Events", "cal"], quotes: ["Quotes", "quote"], avail: ["New request", "box"], chat: ["Messages", "chat"], docs: ["Documents", "doc"],
    crew: ["Crew", "crew"], train: ["Training", "school"], loads: ["Loads", "truck"], tour: ["Tour", "layout"]
  };
  const evById = id => (DATA.events || []).find(e => e.id === id);
  const inv = id => T.INV.find(i => i.id === id);

  // ---------------- Views ----------------
  function home() {
    if (BRAND === "ttl") {
      const l = DATA.loads[0];
      return `<p class="hello">Good to see you.</p>
      <div class="c-hero"><span class="k">On the road now · sample</span><h2>${l.from.split(",")[0]} → ${l.to.split(",")[0]}</h2>${route(l.pct)}<div class="row2"><span>Now</span><b>${l.now}</b></div><div class="row2"><span>Arrives</span><b>${l.eta}</b></div><button class="cbtn" data-go="loads">Track this load</button></div>
      ${needs([["Approve quote #T-551", "quotes"], ["Confirm dock time in Montréal", "chat"], ["Add your cases to size the next leg", "space"]])}
      <div class="quick">${[["truck", "Book a load", "book"], ["layout", "Plan a tour", "tour"], ["box", "Size my truck", "space"], ["chat", "Message dispatch", "chat"]].map(q => `<button data-go="${q[2]}">${ic(q[0])}${q[1]}</button>`).join("")}</div>`;
    }
    const e = DATA.events[0];
    return `<p class="hello">Good to see you.</p>
      <div class="c-hero img" style="background-image:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.85)),url(${e.img})"><span class="k">Next event · ${e.status}</span><h2>${e.name}</h2><div class="count"><b>${e.d}</b> days to go · ${day(e.d)}</div><button class="cbtn" data-ev="${e.id}">Open event</button></div>
      ${needs(BRAND === "mss" ? [["Approve quote #1042", "quotes"], ["Confirm load-in time for " + day(21, { month: "short", day: "numeric" }), "chat"], ["Send your venue's floor plan", "docs"]] : [["Approve quote #P-208", "quotes"], ["Confirm crew call for " + day(9, { month: "short", day: "numeric" }), "crew"], ["Send your stage plot", "docs"]])}
      <div class="quick">${(BRAND === "mss" ? [["box", "Request a quote", "avail"], ["layout", "Plan a room", "plan"], ["cal", "Rebook last year", "rebook"], ["bell", "Hold dates 48 h", "hold"]] : [["crew", "Book a crew", "crew"], ["box", "Build a package", "pkg"], ["school", "Training seats", "train"], ["cal", "Rebook a show", "rebook"]]).map(q => `<button data-go="${q[2]}">${ic(q[0])}${q[1]}</button>`).join("")}</div>`;
  }
  const needs = list => `<h3 class="sec">Needs you</h3><div class="list">${list.map(([t, g]) => `<button class="li" data-go="${g}"><span class="dot"></span>${t}<em>›</em></button>`).join("")}</div>`;
  const route = pct => `<svg class="route" viewBox="0 0 300 40"><line x1="10" y1="20" x2="290" y2="20"/><line class="done" x1="10" y1="20" x2="${10 + 2.8 * pct}" y2="20"/><rect x="${4 + 2.8 * pct}" y="13" width="14" height="14"/></svg>`;

  function events() {
    return `<div class="list">${DATA.events.map(e => `<button class="ev" data-ev="${e.id}" style="background-image:linear-gradient(90deg,rgba(0,0,0,.85),rgba(0,0,0,.2)),url(${e.img})"><span class="k">${e.d < 0 ? "Past" : day(e.d)}</span><b>${e.name}</b><span>${e.venue} · ${e.status}</span></button>`).join("")}</div>`;
  }
  function eventDetail(id) {
    const e = evById(id); const past = e.d < 0;
    return `<button class="back" data-go="events">${ic("back")}Events</button>
      <div class="c-hero img" style="background-image:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.85)),url(${e.img})"><span class="k">${past ? "Past event" : day(e.d)} · ${e.status}</span><h2>${e.name}</h2><p>${e.venue}</p></div>
      ${e.run.length ? `<h3 class="sec">Run of show</h3><div class="timeline">${RUN(e.run)}</div>` : ""}
      <h3 class="sec">On this event</h3><div class="list">${[...new Set(e.gear.map(([g]) => inv(g).cat))].map(cat => `<div class="li static"><span>${cat}</span><b class="mute">Included</b></div>`).join("")}</div><p class="mute">Your full equipment list is in your quote PDF.</p>
      ${BRAND === "mss" && !past ? `<div class="two"><a class="cbtn" href="../../show-systems/index.html#planner">${ic("layout")}Open floor plan</a><button class="cbtn ghost" data-go="chat">Message your rep</button></div>` : ""}
      ${past ? `<button class="cbtn" data-go="rebook">Book this again for next year</button>` : ""}`;
  }
  function quotes() {
    const st = store.get("qst", {});
    return `<div class="list">${DATA.quotes.map(q => { const s = st[q.id] || q.st; const e = q.ev && evById(q.ev); return `<div class="qcard"><div class="qh"><b>Quote ${q.id}</b><span class="pill ${s === "Approved" ? "ok" : "wait"}">${s}</span></div><p>${e ? e.name + " · " + day(e.d) : q.label}</p><p class="mute">Totals and terms are in the PDF your team sent.</p>${s !== "Approved" ? `<div class="two"><button class="cbtn" data-approve="${q.id}">${ic("check")}Approve</button><button class="cbtn ghost" data-go="chat">Ask for a change</button></div>` : `<button class="cbtn ghost" data-go="docs">View PDF</button>`}</div>`; }).join("")}</div>`;
  }
  function avail() {
    return `<p class="mute">Tell us what your next event needs. Big or small, your team builds the setup and sends your quote.</p>
      <div class="list">${T.NEEDS.map(n => `<div class="li static"><span>${n.n}<br><small class="mute">${n.cat}</small></span><button class="mini" data-add="${n.k}">Add</button></div>`).join("")}</div>
      <a class="cbtn" href="../../show-systems/quote.html#quote">Open the full request builder</a>`;
  }
  function chat() {
    const msgs = store.get("chat", [["them", "Hi! I'm here for anything you need on your events. (Sample conversation)"], ["me", "Can we move load-in to 8 AM?"], ["them", "Yes, 8 AM works. I've updated your event-day sheet."]]);
    return `<div class="chat">${msgs.map(([w, t]) => `<div class="msg ${w}">${t}</div>`).join("")}</div><form class="send" data-send><input placeholder="Message ${DATA.rep.toLowerCase().replace("your ", "your ")}" aria-label="Message"><button class="cbtn">Send</button></form>`;
  }
  function docs() { return `<div class="list">${DATA.docs.map(d => `<div class="li static">${ic("doc")}<span>${d}</span><em>Open</em></div>`).join("")}</div><p class="mute">Sample documents. Real files come from MAC Hub.</p>`; }
  function crew() {
    const e = DATA.events[0];
    return `<div class="c-hero"><span class="k">Call sheet · ${day(e.d)}</span><h2>${e.name}</h2><p>Crew call ${e.run[0][0]}</p></div>
      <div class="list">${DATA.crew.map(([r, need, ok]) => `<div class="li static"><span>${r}<br><small class="mute">${ok} of ${need} confirmed</small></span><div class="meter"><i style="width:${need ? ok / need * 100 : 0}%"></i></div></div>`).join("")}</div>
      <a class="cbtn" href="../../psi/index.html#crew">Add more crew</a>`;
  }
  function train() { return `<div class="list">${[[14, "Course name from PSI", "Seat saved"], [35, "Course name from PSI", "Waitlist #2"]].map(([d, n, s]) => `<div class="li static"><span>${n}<br><small class="mute">${day(d)} · sample</small></span><b>${s}</b></div>`).join("")}</div><a class="cbtn" href="../../psi/index.html#training">See all courses</a>`; }
  function loads() {
    return DATA.loads.map(l => `<div class="qcard"><div class="qh"><b>${l.id}</b><span class="pill ${l.pct ? "ok" : "wait"}">${l.pct ? "On the road" : "Booked"}</span></div><h3 class="lt">${l.from} → ${l.to}</h3>${route(l.pct)}<div class="row2"><span>Status</span><b>${l.now}</b></div><div class="row2"><span>Arrives</span><b>${l.eta}</b></div><div class="row2"><span>Trailer</span><b>${l.trailer}</b></div><div class="two"><button class="cbtn ghost" data-go="docs">Paperwork</button><button class="cbtn ghost" data-go="chat">Message dispatch</button></div></div>`).join("") + `<p class="mute">Sample loads. Live location comes from the trucks once connected.</p>`;
  }
  function tour() { return `<div class="timeline">${DATA.loads.map((l, i) => `<div class="tl"><b>${l.eta.split(",").slice(0, 2).join(",")}</b><span>${l.from.split(",")[0]} → ${l.to.split(",")[0]}${i === 0 ? " · on the road" : ""}</span></div>`).join("")}</div><a class="cbtn" href="../../tour-trucking/index.html#route">Add a leg</a>`; }

  const VIEWS = { home, events, quotes, avail, chat, docs, crew, train, loads, tour };
  const EXT = { plan: "../../show-systems/index.html#planner", space: "../../tour-trucking/index.html#space", book: "../../tour-trucking/index.html#route", pkg: "../../psi/index.html#packages" };

  function render(view, arg) {
    const main = $("#cmain");
    main.innerHTML = view === "event" ? eventDetail(arg) : VIEWS[view]();
    $("#ctitle").textContent = view === "event" ? "Event" : TABS[view][0];
    $$(".ctabs button").forEach(b => b.classList.toggle("on", b.dataset.go === view || (view === "event" && b.dataset.go === "events")));
    main.scrollTop = 0; scrollTo(0, 0);
  }
  function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 2200); }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-go],[data-ev],[data-approve],[data-add]"); if (!b) return;
    if (b.dataset.ev) return render("event", b.dataset.ev);
    if (b.dataset.approve) { const st = store.get("qst", {}); st[b.dataset.approve] = "Approved"; store.set("qst", st); toast("Quote approved. Your team has been told."); return render("quotes"); }
    if (b.dataset.add) { b.textContent = "Added"; b.disabled = true; return toast("Added to your next request."); }
    const g = b.dataset.go;
    if (EXT[g]) { location.href = EXT[g]; return; }
    if (g === "rebook") { toast("Request sent: same setup as last year. Your team will confirm."); return; }
    if (g === "hold") { toast("48-hour hold requested for your dates."); return; }
    if (VIEWS[g]) render(g);
  });
  document.addEventListener("submit", e => {
    if (!e.target.matches("[data-send]")) return; e.preventDefault();
    const v = e.target.querySelector("input").value.trim(); if (!v) return;
    const m = store.get("chat", null) || [["them", "Hi! I'm here for anything you need on your events. (Sample conversation)"], ["me", "Can we move load-in to 8 AM?"], ["them", "Yes, 8 AM works. I've updated your event-day sheet."]];
    m.push(["me", v]); m.push(["them", "Thanks, got it. (Demo reply: in the real app your rep answers from MAC Hub.)"]); store.set("chat", m); render("chat");
  });

  // Shell
  $("#ctabs").innerHTML = DATA.tabs.map(t => `<button data-go="${t}">${ic(TABS[t][1])}<span>${TABS[t][0]}</span></button>`).join("");
  render("home");
  // Add-to-home-screen hint
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if (!standalone) { const h = $("#install"); if (h) h.hidden = false; }
})();
