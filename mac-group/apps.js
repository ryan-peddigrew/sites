/* Client app demos. Sample data only. Each app shows one brand only. */
(function () {
  const { $, $$ } = window.MAC; const T = window.MACTOOLS;
  const day = n => T.addDays(T.today, n).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
  const APPS = {
    planner: {
      head: `<span class="mlogo" role="img" aria-label="MAC Show Systems" style="width:170px;aspect-ratio:1472/306;-webkit-mask-image:url(../img/logos/mss-logo.png);mask-image:url(../img/logos/mss-logo.png)"></span>`,
      tabs: {
        "My events": () => `<div class="a-card hero-card"><span class="a-k">Next event · sample</span><b>${day(21)}</b><p>Ballroom layout · 22 items</p><div class="a-row"><span>Load-in</span><b>7:00 AM</b></div><div class="a-row"><span>Crew lead</span><b>Name from MAC</b></div><div class="a-row"><span>Status</span><b class="ok">Confirmed</b></div></div>
          <button class="a-btn">Rebook last year's event</button><button class="a-btn ghost">Hold dates for 48 hours</button>`,
        "Availability": () => `<p class="a-k">${day(21)}</p>` + ["led", "spk", "mov", "pod", "prj"].map(id => { const it = T.INV.find(i => i.id === id); const d = T.dates("mac"); return `<div class="a-row col"><b>${it.n}</b>${T.status(T.free(id, d.a, d.b), it.q)}</div>`; }).join(""),
        "Documents": () => ["Quote #1042", "Floor plan, ballroom", "Certificate of insurance", "Event-day sheet"].map(x => `<div class="a-row"><span>${x}</span><b>Open</b></div>`).join("")
      }
    },
    crew: {
      head: `<img src="../img/logos/psi-logo.png" alt="PSI" width="40" height="40"><span class="a-name">Crew Call</span>`,
      tabs: {
        "Shifts": () => [[3, "Audio A2", "Concert, Niagara"], [6, "Stagehand", "Gala, Toronto"], [12, "Lighting tech", "Festival, Hamilton"]].map(([d, r, w]) => `<div class="a-card"><span class="a-k">${day(d)} · sample</span><b>${r}</b><p>${w}</p><div class="a-two"><button class="a-btn">Accept</button><button class="a-btn ghost">Pass</button></div></div>`).join(""),
        "My days": () => `<p class="a-k">Tap the days you're free</p><div class="a-cal">${Array.from({ length: 28 }, (_, i) => `<button class="${[2, 3, 6, 9, 10, 16, 17, 23].includes(i) ? "on" : ""}">${T.addDays(T.today, i).getDate()}</button>`).join("")}</div>`,
        "Hours": () => `<div class="a-row"><span>This week</span><b>18.5 h</b></div><div class="a-row"><span>Last shift</span><b>8 h</b></div><button class="a-btn">Log hours for today</button>`
      }
    },
    track: {
      head: `<span class="mlogo" role="img" aria-label="Tour Trucking Logistics" style="width:120px;aspect-ratio:2849/975;-webkit-mask-image:url(../img/logos/ttl-logo.png);mask-image:url(../img/logos/ttl-logo.png)"></span>`,
      tabs: {
        "My loads": () => `<div class="a-card hero-card"><span class="a-k">Load #TT-2207 · sample</span><b>Toronto → Montréal</b><div class="a-track"><i style="width:62%"></i></div><div class="a-row"><span>Now</span><b>Near Kingston, ON</b></div><div class="a-row"><span>Arrives</span><b>${day(1)}, 2:00 PM</b></div></div><button class="a-btn">Book the next leg</button>`,
        "Tour": () => [["Toronto", "Done"], ["Montréal", "On the way"], ["Québec City", day(4)], ["Ottawa", day(7)]].map(([c, s], i) => `<div class="a-row"><span>${c}</span><b class="${i === 0 ? "ok" : ""}">${s}</b></div>`).join(""),
        "Paperwork": () => ["Bill of lading", "Pickup photos (6)", "Delivery photos", "Invoice"].map(x => `<div class="a-row"><span>${x}</span><b>Open</b></div>`).join("")
      }
    }
  };
  $$(".app").forEach(app => {
    const A = APPS[app.dataset.app], scr = $("[data-scr]", app); const names = Object.keys(A.tabs);
    function show(n) {
      scr.innerHTML = `<div class="a-top">${A.head}</div><div class="a-body">${A.tabs[n]()}</div><nav class="a-tabs">${names.map(x => `<button class="${x === n ? "on" : ""}" data-t="${x}">${x}</button>`).join("")}</nav>`;
    }
    scr.addEventListener("click", e => {
      const t = e.target.closest("button"); if (!t) return;
      if (t.dataset.t) return show(t.dataset.t);
      if (t.closest(".a-cal")) return t.classList.toggle("on");
      if (t.classList.contains("a-btn")) { t.textContent = "Done (demo)"; t.disabled = true; }
    });
    show(names[0]);
  });
})();
