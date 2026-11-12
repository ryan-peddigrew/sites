/* Shared behaviour for the MAC Group previews: header, menu, reveals, hero, tour. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ROOT = document.documentElement.dataset.root || "";
  window.MAC = { $, $$, ROOT };

  // Header goes solid on scroll; phone menu
  const top = $(".top");
  if (top) {
    const f = () => top.classList.toggle("solid", scrollY > 30);
    addEventListener("scroll", f, { passive: true }); f();
  }
  const mb = $(".menu-btn"), nav = $(".nav");
  if (mb && nav) {
    mb.addEventListener("click", () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
    $$("a", nav).forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

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
    { p: "index.html", s: "#hero", k: "MAC Group", t: "One parent brand", d: "MAC Group of Companies gets its own home. It's for owners, hiring and big accounts, and it links out to all three companies. No selling happens here." },
    { p: "index.html", s: "#companies", k: "MAC Group", t: "Three companies, three front doors", d: "Each company keeps its own name, look, email and salespeople. Clients only ever see the company they deal with." },
    { p: "index.html", s: "#behind", k: "MAC Group", t: "One system behind them", d: "Behind the scenes, one inventory, one calendar, one client list and one truck schedule. That's MAC Hub, and only your team sees it." },
    { p: "index.html", s: "#whole-event", k: "Revenue", t: "Bring us your whole event", d: "One request form. Your team routes it to the right company behind the scenes, so no lead is lost between companies." },
    { p: "show-systems/index.html", s: "#hero", k: "MAC Show Systems", t: "A complete redesign", d: "The 2018 site is replaced with a photo-led site built around what planners want: what's free on my dates, and what my room will look like." },
    { p: "show-systems/index.html", s: "#availability", k: "Revenue", t: "Live availability, never prices", d: "Planners pick dates and see what's available right now. Booked items offer a waitlist, so a lost booking becomes a lead." },
    { p: "show-systems/index.html", s: "#planner", k: "Revenue", t: "Floor planner to quote", d: "Drag stages, screens and speakers into a room. The layout drops straight into the quote request." },
    { p: "show-systems/index.html", s: "#quote", k: "Revenue", t: "Bigger quotes, automatically", d: "Every quote suggests what's often booked together, plus delivery and crew. A 48-hour hold locks dates before a competitor does." },
    { p: "show-systems/index.html", s: "#sales", k: "Revenue", t: "Equipment sales", d: "MAC Show Systems also sells gear. That now has its own request, so sales leads aren't buried in rental emails." },
    { p: "psi/index.html", s: "#hero", k: "PSI", t: "PSI, rebuilt around its work", d: "Real PSI projects lead the page: OLG Stage at Fallsview, Cicada, Harbourfront Centre." },
    { p: "psi/index.html", s: "#crew", k: "Revenue", t: "Book a crew", d: "Pick dates, roles and headcount. Technical staffing is income PSI already earns, and now it books in a minute." },
    { p: "psi/index.html", s: "#packages", k: "Revenue", t: "Package builder", d: "Concert, festival or gala: answer three questions and PSI gets a full stage, sound, light and crew request." },
    { p: "psi/index.html", s: "#training", k: "Revenue", t: "Training sign-ups", d: "PSI's training and education gets dates, seats and a waitlist, so courses fill themselves." },
    { p: "tour-trucking/index.html", s: "#hero", k: "Tour Trucking", t: "A real brand for Tour Trucking", d: "The old site was a template from another carrier. Tour Trucking gets its own name, look and voice." },
    { p: "tour-trucking/index.html", s: "#route", k: "Revenue", t: "Route and tour requests", d: "One leg or a whole multi-city tour in one request, with trailer size and dates." },
    { p: "tour-trucking/index.html", s: "#space", k: "Revenue", t: "Truck space calculator", d: "Enter the gear and see how much trailer it needs. It turns a guess into a booking." },
    { p: "tour-trucking/index.html", s: "#drivers", k: "Growth", t: "Drive with us", d: "A proper recruiting page, because more drivers means more loads." },
    { p: "hub/index.html", s: "#hub", k: "Staff app", t: "MAC Hub", d: "Live stock across all three companies, quotes sent under the right brand, and flags when a job needs a sister company's trucks or crew." },
    { p: "apps/index.html", s: "#apps", k: "Client apps", t: "One app per brand", d: "MAC Show Systems Planner, PSI Crew Call and Tour Trucking Track My Load. Each one only shows its own brand, and all of them run on MAC Hub." },
    { p: "index.html", s: "#close", k: "Next", t: "What we need from you", d: "Real inventory list, photos of your own gear and trucks, logos as vector files, and a yes on the brand direction. Then we connect everything for real." }
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
    if (t) { t.scrollIntoView({ behavior: "smooth", block: "start" }); if (st.s !== "#hero") t.classList.add("tour-hi"); }
    if (!paused) arm();
  }
  window.MAC.startTour = (n = 0) => { paused = false; go(n); };
  $$("[data-tour]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); location.href = ROOT + "index.html?tour=1&step=0"; }));
  if (q.get("tour") === "1") addEventListener("load", () => setTimeout(() => go(+(q.get("step") || 0)), 700));
})();
