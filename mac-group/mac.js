/* Shared behaviour for the MAC Group previews: header, menu, reveals, hero, tour. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ROOT = document.documentElement.dataset.root || "";
  window.MAC = { $, $$, ROOT };

  // Header goes solid on scroll; phone menu
  const top = $(".top");
  if (top) {
    const hasHero = !!document.querySelector(".hero");
    const f = () => top.classList.toggle("solid", !hasHero || scrollY > 30);
    addEventListener("scroll", f, { passive: true }); f();
  }
  const mb = $(".menu-btn"), nav = $(".nav");
  if (mb && nav) {
    mb.addEventListener("click", () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
    $$("a", nav).forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }


  // Chairlift watermark on every page (preview protection)
  (function () {
    const t = "CHAIRLIFT CONCEPT · DO NOT COPY";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='520' height='300'><g transform='rotate(-24 260 150)' font-family='Arial,Helvetica,sans-serif' font-weight='800' text-anchor='middle'><text x='260' y='140' font-size='40' fill='rgba(128,128,128,.24)'>Chairlift</text><text x='260' y='172' font-size='13' letter-spacing='3' fill='rgba(128,128,128,.28)'>${t}</text></g></svg>`;
    const w = document.createElement("div"); w.className = "wm"; w.setAttribute("aria-hidden", "true");
    w.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    const b = document.createElement("div"); b.className = "wm-badge"; b.innerHTML = "Concept by <b>Chairlift</b> · usechairlift.com · Confidential";
    document.body.append(w, b);
    const sb = document.querySelector(".sample"); if (sb) sb.innerHTML = innerWidth < 600 ? "Chairlift concept · Confidential · Do not copy" : "Chairlift concept · Confidential · Do not copy · Sample data is marked";
    document.addEventListener("contextmenu", e => { if (e.target.closest("img,.mlogo,.hero,.co")) e.preventDefault(); });
  })();

  // Reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));

  // Hero: crossfading photos + rotating headline that rises in word by word
  const slides = $$(".hero .slides img");
  const h1 = $(".hero h1[data-lines]");
  const nowEl = $(".hero .now b");
  if (slides.length) {
    let i = 0; slides[0].classList.add("on");
    if (nowEl) nowEl.textContent = slides[0].dataset.label || "";
    setInterval(() => {
      slides[i].classList.remove("on"); i = (i + 1) % slides.length; slides[i].classList.add("on");
      if (nowEl) nowEl.textContent = slides[i].dataset.label || "";
    }, 5200);
  }
  if (h1) {
    const lines = JSON.parse(h1.dataset.lines); let k = 0;
    const show = t => {
      h1.classList.remove("in");
      h1.innerHTML = t.split(" ").map(w => `<span class="w"><span>${w}</span></span>`).join(" ");
      $$(".w > span", h1).forEach((s, n) => s.style.transitionDelay = (n * 70) + "ms");
      requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add("in")));
    };
    show(lines[0]);
    if (lines.length > 1) setInterval(() => { k = (k + 1) % lines.length; show(lines[k]); }, 5200);
  }

  // ---------- Tour of what's changed (?tour=1). One tour across every site and app. ----------
  const TOUR = [
    { p: "index.html", s: "#hero", k: "MAC Group of Companies", t: "One parent brand", d: "MAC Group of Companies gets its own home. It's for owners, hiring and big accounts, and it links out to all three companies. No selling happens here." },
    { p: "index.html", s: "#companies", k: "MAC Group of Companies", t: "Three companies, three front doors", d: "Each company keeps its own name, look, email and salespeople. Clients only ever see the company they deal with." },
    { p: "show-systems/index.html", s: "#hero", k: "MAC Show Systems", t: "A complete redesign", d: "The 2018 site is replaced with a photo-led site built around what planners want: a fast quote, and a look at what their room will look like." },
    { p: "show-systems/index.html", s: "#capacity", k: "MAC Show Systems", t: "Capacity, never inventory", d: "The site shows MAC can handle any size of event, indoors or out, without ever showing inventory, gear names, counts or prices." },
    { p: "show-systems/index.html", s: "#planner", k: "MAC Show Systems", t: "Floor planner to quote", d: "Drag stages, screens and speakers into a room. The layout drops straight into the quote request." },
    { p: "show-systems/index.html", s: "#quote", k: "MAC Show Systems", t: "Bigger quotes, automatically", d: "Every request offers delivery, crew and a show technician. A 48-hour hold locks dates before a competitor does." },
    { p: "show-systems/quote.html", s: "#hero", k: "MAC Show Systems", t: "Build your quote page", d: "Start from an outdoor festival, conference, gala or wedding, adjust what you need, lay out the room and send it. Your team matches the equipment." },
    { p: "show-systems/case-studies.html", s: "#hero", k: "MAC Show Systems", t: "Case studies", d: "MAC's own event photos with the brief, the gear and how it went. Names and results get filled in with MAC and each client's OK." },
    { p: "show-systems/venues.html", s: "#hero", k: "MAC Show Systems", t: "Venues and a venue partner program", d: "Planners pick their venue to start a plan. Venues apply to become partners, which brings a steady stream of referrals." },
    { p: "show-systems/planning.html", s: "#hero", k: "MAC Show Systems", t: "Planning help", d: "Planner questions answered, plus one form for a certificate of insurance, spec sheets, power and load-in plans." },
    { p: "show-systems/index.html", s: "#sales", k: "MAC Show Systems", t: "Equipment sales", d: "MAC Show Systems also sells gear. That now has its own request, so sales leads aren't buried in rental emails." },
    { p: "tour-trucking/index.html", s: "#hero", k: "Tour Trucking", t: "A real brand for Tour Trucking", d: "Tour Trucking keeps its logo and gets a site built around touring freight, with its own look and voice." },
    { p: "tour-trucking/index.html", s: "#route", k: "Tour Trucking", t: "Route and tour requests", d: "One leg or a whole multi-city tour in one request, with trailer size and dates." },
    { p: "tour-trucking/index.html", s: "#space", k: "Tour Trucking", t: "Truck space calculator", d: "Enter the gear and see how much trailer it needs. It turns a guess into a booking." },
    { p: "tour-trucking/index.html", s: "#drivers", k: "Tour Trucking", t: "Drive with us", d: "A proper recruiting page, because more drivers means more loads." },
    { p: "psi/index.html", s: "#hero", k: "PSI", t: "PSI, rebuilt around its work", d: "Real PSI projects lead the page: OLG Stage at Fallsview, Cicada, Harbourfront Centre." },
    { p: "psi/index.html", s: "#crew", k: "PSI", t: "Book a crew", d: "Pick dates, roles and headcount. Technical staffing is income PSI already earns, and now it books in a minute." },
    { p: "psi/index.html", s: "#packages", k: "PSI", t: "Package builder", d: "Concert, festival or gala: answer three questions and PSI gets a full stage, sound, light and crew request." },
    { p: "psi/index.html", s: "#training", k: "PSI", t: "Training sign-ups", d: "PSI's training and education gets dates, seats and a waitlist, so courses fill themselves." },
    { p: "index.html", s: "#behind", k: "MAC Group of Companies", t: "One system behind them", d: "Behind the scenes, one inventory, one calendar, one client list and one truck schedule. That's MGC Hub, and only your team sees it." },
    { p: "index.html", s: "#whole-event", k: "MAC Group of Companies", t: "Bring us your whole event", d: "One request form. Your team routes it to the right company behind the scenes, so no lead is lost between companies." },
    { p: "hub/index.html", s: "#hub", k: "MGC Hub · staff only", t: "One back office for all three", d: "Live stock across all three companies, quotes sent under the right brand, and flags when a job needs a sister company's trucks or crew." },
    { p: "hub/quote.html", s: "#quote", k: "MGC Hub · staff only", t: "Quotes, inside MGC Hub", d: "Pick the selling company, add gear checked live against stock, type your rates, and send a branded quote or PDF. Sister-company trucks and crew show under the selling brand only." },
    { p: "hub/connections.html", s: "#conn", k: "MGC Hub · staff only", t: "Connects to what MAC already uses", d: "BrightHR or ADP for staff and time off, Current RMS for inventory and orders, email, calendar and accounting. Ready to switch on once permissions are signed off." },
    { p: "apps/mss/index.html", s: "#cmain", k: "MAC Show Systems app", t: "A client dashboard for planners", d: "Next event with a countdown, run of show, gear list, quotes to approve in one tap, new requests, messages and documents. It installs on a phone." },
    { p: "apps/ttl/index.html", s: "#cmain", k: "Tour Trucking app", t: "Track my load", d: "Shippers and tour managers see where the truck is, when it arrives, every leg of the tour, paperwork and a line to dispatch." },
    { p: "apps/psi/index.html", s: "#cmain", k: "PSI app", t: "A client dashboard for producers", d: "Each show with its call times, crew confirmed role by role, quotes to approve and training seats. Only PSI appears." },
    { p: "brand/group.html", s: "#guide", k: "Brand guides", t: "A brand and style guide for every company", d: "Logo rules, colours, fonts, voice, photos and email signature for MAC Group, MAC Show Systems, PSI and Tour Trucking. Each company stays clearly its own." },
    { p: "brand/apps.html", s: "#guide", k: "Apps", t: "App names and icons", d: "Three separate client apps: MAC Show Systems, PSI and Tour Trucking. MGC Hub for staff, with Quotes inside it. Each installs on a phone or desktop." },
    { p: "apps/index.html", s: "#apps", k: "Apps", t: "Every app in one place", d: "Three client apps, one per brand, plus MGC Hub for your team. All of them run on the same system." },
    { p: "index.html", s: "#close", k: "Next", t: "What we need from you", d: "Real inventory list, photos of your trucks, and a yes on the brand direction. Then we connect everything for real." }
  ];
  const PAGE = document.documentElement.dataset.page || "index.html";
  const q = new URLSearchParams(location.search);
  let box, timer, paused = false, cur = -1;
  function el() {
    if (box) return box;
    box = document.createElement("div"); box.className = "tour"; box.setAttribute("role", "dialog");
    box.innerHTML = `<div class="bar"><i></i></div><div class="k"></div><h4></h4><p></p><div class="ctl"><button class="pri" data-a="next">Next</button><button data-a="pause">Pause</button><button data-a="close">Close</button></div>`;
    document.body.appendChild(box);
    box.addEventListener("click", e => {
      const a = e.target.dataset.a; if (!a) return;
      if (a === "next") go(cur + 1);
      if (a === "pause") { paused = !paused; e.target.textContent = paused ? "Play" : "Pause"; paused ? clearTimeout(timer) : arm(); }
      if (a === "close") { box.classList.remove("on"); clearTimeout(timer); $$(".tour-hi").forEach(x => x.classList.remove("tour-hi")); }
    });
    return box;
  }
  function arm() {
    clearTimeout(timer); const bar = $(".bar i", box);
    bar.style.transition = "none"; bar.style.width = "0";
    requestAnimationFrame(() => { bar.style.transition = "width 7.5s linear"; bar.style.width = "100%"; });
    timer = setTimeout(() => go(cur + 1), 7500);
  }
  function go(n) {
    if (n >= TOUR.length) { box.classList.remove("on"); return; }
    const st = TOUR[n];
    if (st.p !== PAGE) {
      location.href = ROOT + st.p + "?tour=1&step=" + n; return;
    }
    cur = n; el(); box.classList.add("on");
    $(".k", box).textContent = `${st.k}  ·  ${n + 1} of ${TOUR.length}`;
    $("h4", box).textContent = st.t; $("p", box).textContent = st.d;
    $(".ctl .pri", box).textContent = n === TOUR.length - 1 ? "Finish" : "Next";
    $$(".tour-hi").forEach(x => x.classList.remove("tour-hi"));
    const t = $(st.s);
    if (t) { t.scrollIntoView({ behavior: "smooth", block: "start" }); if (!["#hero", "#cmain", "#hub", "#quote", "#guide", "#conn"].includes(st.s)) t.classList.add("tour-hi"); }
    if (!paused) arm();
  }
  window.MAC.startTour = (n = 0) => { paused = false; go(n); };
  $$("[data-tour]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); location.href = ROOT + "index.html?tour=1&step=0"; }));
  if (q.get("tour") === "1") addEventListener("load", () => setTimeout(() => go(+(q.get("step") || 0)), 700));
})();
