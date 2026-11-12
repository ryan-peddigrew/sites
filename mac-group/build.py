#!/usr/bin/env python3
"""Builds the MAC Group preview pages. Run: python3 build.py"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))

FONTS = {
    "group": "family=Archivo:wdth,wght@100..125,500..900&family=Manrope:wght@400;600;700&family=JetBrains+Mono:wght@500;600",
    "mac": "family=Big+Shoulders+Display:wght@700;800;900&family=Work+Sans:wght@400;600;700&family=DM+Mono:wght@500",
    "psi": "family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@500;600",
    "tt": "family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;600;700&family=JetBrains+Mono:wght@500;600",
    "hub": "family=Archivo:wdth,wght@100..125,500..900&family=Manrope:wght@400;600;700;800&family=JetBrains+Mono:wght@500;600",
}

I = {  # full-size line icons, 24 grid, drawn at 40px
    "phone": '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/>',
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "out": '<path d="M7 17 17 7M9 7h8v8"/>',
    "audio": '<rect x="6" y="2" width="12" height="20" rx="1"/><circle cx="12" cy="15" r="3.5"/><circle cx="12" cy="7" r="1.6"/>',
    "video": '<rect x="2" y="5" width="15" height="12" rx="1"/><path d="m17 9 5-3v10l-5-3"/>',
    "wall": '<rect x="2" y="4" width="20" height="12"/><path d="M2 8h20M2 12h20M7 4v12M12 4v12M17 4v12M8 20h8M12 16v4"/>',
    "proj": '<rect x="2" y="8" width="20" height="9" rx="1"/><circle cx="15" cy="12.5" r="2.5"/><path d="M5 12h4M5 20l2-3M19 20l-2-3"/>',
    "light": '<path d="M9 3h6l2 7H7z"/><path d="M8 10c0 3 1.8 5 4 5s4-2 4-5M12 15v6M8 21h8"/>',
    "stage": '<path d="M2 14h20v3H2zM4 17v4M20 17v4M12 17v4"/><path d="M6 14V8h12v6"/>',
    "podium": '<path d="M6 8h12l-1.5 13h-9z"/><path d="M4 5h16v3H4zM12 5V2"/>',
    "show": '<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M8 21h8M12 17v4M7 9h6M7 12h10"/>',
    "truck": '<path d="M2 6h12v10H2zM14 9h4l3 3v4h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
    "box": '<path d="M3 7 12 3l9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/>',
    "crew": '<circle cx="9" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4a3 3 0 0 1 0 6M18 14c2 .7 3 2.6 3 6"/>',
    "school": '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
    "star": '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    "calendar": '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    "layout": '<rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M9 9v12"/>',
    "route": '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/>',
    "tag": '<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    "map": '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    "wheel": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7M4.5 16.5 10.3 13M19.5 16.5 13.7 13"/>',
    "hub": '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="5" r="2"/><circle cx="20" cy="5" r="2"/><circle cx="12" cy="21" r="2"/><path d="m5.6 6.3 4.2 3.8M18.4 6.3l-4.2 3.8M12 15v4"/>',
    "app": '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
}
def icon(n, cls=""):
    return f'<svg class="icon {cls}" viewBox="0 0 24 24" aria-hidden="true">{I[n]}</svg>'

def head(site, page, root, title, desc):
    return f'''<!doctype html>
<html lang="en-CA" data-site="{site}" data-page="{page}" data-root="{root}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title><meta name="description" content="{desc}"><meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?{FONTS[site]}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{root}mac.css">
</head>
<body>
<div class="sample">Private preview · sample data is marked</div>
'''

def header(mark, links, quote_href, root):
    nav = "".join(f'<a href="{h}">{t}</a>' for t, h in links)
    return f'''<header class="top">
  {mark}
  <button class="menu-btn" aria-label="Menu" aria-expanded="false"><svg class="icon sm" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
  <nav class="nav">{nav}<a class="btn ghost" href="#contact">{icon("phone")}Get in touch</a><a class="btn" href="{quote_href}">Build your quote</a></nav>
</header>'''

def two_buttons(quote_href, ghost_light=False):
    return f'<div class="btns"><a class="btn" href="{quote_href}">Build your quote</a><a class="btn ghost" href="#contact">{icon("phone")}Get in touch</a></div>'

def foot(root, extra=""):
    return f'''<footer><div class="wrap">{extra}<div><a href="#" data-tour>Take a tour of what's changed</a></div></div></footer>
<script src="{root}mac.js"></script>
'''

def contact(title, line, addr, email, opts):
    o = "".join(f"<option>{x}</option>" for x in opts)
    return f'''<section id="contact" class="pad"><div class="wrap split">
  <div><span class="eyebrow">Get in touch</span><h2>{title}</h2><p class="lead" style="margin-top:22px">{line}</p>
  <p class="mute" style="margin-top:20px">{addr}<br>{email}</p></div>
  <form class="tool" data-form><div class="form-grid">
    <label class="field"><span>Name</span><input required></label><label class="field"><span>Company</span><input></label>
    <label class="field"><span>Email</span><input type="email" required></label><label class="field"><span>Phone</span><input type="tel"></label></div>
    <label class="field"><span>What do you need?</span><select>{o}</select></label>
    <label class="field"><span>Tell us about it</span><textarea rows="4"></textarea></label>
    <button class="btn">Send</button></form>
</div></section>'''

def write(path, html):
    p = os.path.join(HERE, path); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w").write(html)

STANDIN = '<span class="standin">Stand-in photo</span>'

# =====================================================================================
# MAC GROUP OF COMPANIES (parent)
# =====================================================================================
g_mark = '<a class="mark" href="index.html"><b>MAC</b><span>Group of Companies</span></a>'
group = head("group", "index.html", "", "MAC Group of Companies", "MAC Group of Companies: MAC Show Systems, PSI and Tour Trucking.") + header(
    g_mark, [("Our companies", "#companies"), ("Work with us", "#careers")], "#whole-event", "") + f'''
<main>
<section class="hero" id="hero">
  <div class="slides">
    <img src="img/mac-arena.jpg" alt="Arena concert with stage lighting" data-label="Live production">
    <img src="img/psi-olg-wall.jpg" alt="LED video wall on the OLG Stage at Fallsview" data-label="Installations">
    <img src="img/truck-mountain.jpg" alt="Transport truck on a mountain highway" data-label="On the road">
  </div>
  <div class="now">Now showing<br><b></b></div>
  <div class="wrap">
    <span class="eyebrow">MAC Group of Companies</span>
    <h1 data-lines='["Every show starts here.", "The gear. The crew. The trucks.", "From the warehouse to the stage."]'>Every show starts here.</h1>
    <p class="lede">MAC Group of Companies is the home of MAC Show Systems, PSI and Tour Trucking: production gear, the people who run it, and the trucks that move it.</p>
    {two_buttons("#whole-event")}
    <div class="ticker"><a href="#" data-tour>Take a tour of what's changed</a><span>North York and St. Catharines, Ontario</span></div>
  </div>
</section>

<section id="companies" class="cos cos3">
  <a class="co" href="show-systems/index.html"><img src="img/mac-phone-stage.jpg" alt="">
    <div class="in"><img class="co-logo" src="img/mac-logo.png" alt="MAC Show Systems" width="240" height="67">
    <p>Sound, lighting, video, LED and staging. Rentals, sales, setup and national tours.</p><span class="go">Visit MAC Show Systems {icon("arrow","sm")}</span></div></a>
  <a class="co" href="psi/index.html"><img src="img/psi-concert.jpg" alt="">
    <div class="in"><img class="co-logo sq" src="img/psi-webclip.png" alt="PSI" width="72" height="72">
    <p>Production Service Industries. Concerts, festivals, galas, technical staffing and training.</p><span class="go">Visit PSI {icon("arrow","sm")}</span></div></a>
  <a class="co" href="tour-trucking/index.html"><img src="img/truck-mountain.jpg" alt="">{STANDIN}
    <div class="in"><div class="tt-wm"><b>TOUR</b><span>TRUCKING</span></div>
    <p>Specialized transport for the entertainment industry. Full loads, partial loads and warehousing.</p><span class="go">Visit Tour Trucking {icon("arrow","sm")}</span></div></a>
</section>

<section id="behind" class="pad"><div class="wrap">
  <span class="owner-note">Owners only. This section explains the plan and won't appear on the live site.</span>
  <span class="eyebrow">Behind the scenes</span>
  <h2>Three front doors.<br>One system behind them.</h2>
  <div class="split" style="margin-top:40px;align-items:start">
    <p class="lead">Clients only ever see the company they deal with. A MAC Show Systems quote that needs a truck or extra crew still goes out as one MAC Show Systems quote. The connection lives in MAC Hub, which only your team sees.</p>
    <div class="extras" style="margin-top:0">
      <div>{icon("box")}<div><h3>One inventory</h3><p>Every item, every warehouse, one live count.</p></div></div>
      <div>{icon("calendar")}<div><h3>One calendar</h3><p>Every booking from every company, so availability is always true.</p></div></div>
      <div>{icon("crew")}<div><h3>One client list</h3><p>Your team sees the whole relationship. Clients don't have to.</p></div></div>
      <div>{icon("truck")}<div><h3>One truck schedule</h3><p>Trucks and crew become add-ons inside any quote.</p></div></div>
    </div>
  </div>
  <div class="btns" style="margin-top:36px"><a class="btn" href="hub/index.html">{icon("hub","sm")}Open MAC Hub (staff app)</a><a class="btn ghost" href="apps/index.html">{icon("app","sm")}See the client apps</a></div>
</div></section>

<section class="plan-band"><img src="img/psi-olg-wall.jpg" alt="OLG Stage video wall, Fallsview Casino">
  <div class="wrap"><span class="eyebrow">One group</span><h2 style="max-width:14ch">Gear, crew and trucks under one roof.</h2></div>
</section>

<section id="whole-event" class="pad"><div class="wrap split" style="align-items:start">
  <div><span class="eyebrow">Bring us your whole event</span><h2>Tell us once.</h2>
  <p class="lead" style="margin-top:22px">Gear, crew, trucks or all three. Send one request and the right team comes back to you.</p></div>
  <form class="tool" data-form>
    <p class="eyebrow" style="margin-bottom:10px">What do you need?</p>
    <label class="tick"><input type="checkbox"> Sound, lighting, video or staging</label>
    <label class="tick"><input type="checkbox"> A technical crew</label>
    <label class="tick"><input type="checkbox"> Trucking or storage</label>
    <div class="form-grid" style="margin-top:14px"><label class="field"><span>Event date</span><input type="date"></label><label class="field"><span>City</span><input></label>
    <label class="field"><span>Name</span><input required></label><label class="field"><span>Email</span><input type="email" required></label></div>
    <button class="btn">Send my request</button></form>
</div></section>

<section id="careers" class="about">
  <div class="ph"><img src="img/stage-lights.jpg" alt=""></div>
  <div class="tx"><span class="eyebrow">Work with us</span><h2>Build shows for a living.</h2>
  <div class="extras" style="grid-template-columns:1fr">
    <div>{icon("light")}<div><h3>Show technicians</h3><p>Audio, lighting, video and staging at MAC Show Systems.</p></div></div>
    <div>{icon("crew")}<div><h3>Crew and stagehands</h3><p>Concerts, festivals and galas with PSI.</p></div></div>
    <div>{icon("wheel")}<div><h3>Drivers</h3><p>Entertainment freight with Tour Trucking.</p></div></div>
  </div></div>
</section>

<section id="close" class="pad close"><div class="wrap">
  <h2>Got a show<br>in mind?</h2>{two_buttons("#whole-event")}
  <div class="owner-list"><span class="owner-note">For the owners: what we need to go live</span>
  <ol><li>Your real inventory list, in any format (spreadsheet or rental software export).</li><li>Photos of your own gear, crews, trucks and warehouse.</li><li>Logos as vector files (MAC Show Systems, PSI). Tour Trucking needs a logo.</li><li>A yes on the brand direction for MAC Group.</li><li>Where quote requests should go for each company.</li></ol></div>
</div></section>
</main>
''' + contact("Talk to MAC Group.", "For partnerships, large accounts and anything that spans more than one company.", "125 Bermondsey Rd, North York, ON", "info@macshowsystems.com <span class=\"todo\">confirm group email</span>", ["Gear for an event", "Crew", "Trucking", "Partnership", "Careers"]) + foot("", '<div><b class="wm" style="font-size:22px">MAC</b> Group of Companies<br><span class="mute">© 2026</span></div><div><a href="show-systems/index.html">MAC Show Systems</a><br><a href="psi/index.html">PSI</a><br><a href="tour-trucking/index.html">Tour Trucking</a></div>') + '''<script>document.querySelectorAll("[data-form]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();f.innerHTML='<h3>Got it.</h3><p>The right team will get back to you.</p><p class="mute">Preview only: nothing is sent yet.</p>'}));</script>
</body></html>'''
write("index.html", group)

# =====================================================================================
# MAC SHOW SYSTEMS
# =====================================================================================
R = "../"
m_mark = f'<a class="mark" href="index.html"><img class="logo-img" src="{R}img/mac-logo.png" alt="MAC Show Systems" width="190" height="53"></a>'
svc = [("audio", "Audio", "The best sound equipment available, tuned for your room."),
       ("video", "Video", "Video and projection to put your message in front of every seat."),
       ("wall", "Video walls", "LED walls for key content and sponsor moments."),
       ("proj", "LCD projectors", "Big, bright images for conferences, awards and presentations."),
       ("light", "Lighting", "From stage lighting to ambient lighting, any size of venue."),
       ("stage", "Staging", "Indoor stages, and outdoor stages of all sizes for concerts and festivals."),
       ("podium", "Podiums", "Designed to fit your event and your budget."),
       ("show", "Show management", "Strategy, content and show execution, start to finish.")]
svc_html = "".join(f'<div>{icon(i)}<div><h3>{t}</h3><p>{d}</p></div></div>' for i, t, d in svc)
mac = head("mac", "show-systems/index.html", R, "MAC Show Systems", "Sound, lighting, video, LED and staging rentals in Toronto.") + header(
    m_mark, [("What we do", "#services"), ("Availability", "#availability"), ("Plan your room", "#planner"), ("Buy gear", "#sales")], "#quote", R) + f'''
<main>
<section class="hero" id="hero">
  <div class="slides">
    <img src="{R}img/mac-arena.jpg" alt="Arena concert" data-label="Concerts">
    <img src="{R}img/mac-phone-stage.jpg" alt="Stage with LED screens" data-label="Video and LED">
    <img src="{R}img/room-screen.jpg" alt="Conference keynote with a large screen" data-label="Conferences">
  </div>
  <div class="now">Now showing<br><b></b></div>
  <div class="wrap">
    <span class="eyebrow">Toronto · Audio · Video · Lighting · Staging</span>
    <h1 data-lines='["Make your event.", "See what&#39;s free on your dates.", "Plan the room. Then book it."]'>Make your event.</h1>
    <p class="lede">Sound, lighting, video, LED and staging from a production company in Toronto. Check what's available on your dates, plan your room and build your quote in minutes.</p>
    {two_buttons("#quote")}
    <div class="ticker"><a href="#" data-tour>Take a tour of what's changed</a><span>Rentals · Sales · Setup · National tours</span></div>
  </div>
</section>

<section id="services" class="pad"><div class="wrap">
  <span class="eyebrow">What we do</span><h2 style="max-width:16ch">Everything the audience sees and hears.</h2>
  <div class="extras">{svc_html}</div>
</div></section>

<section id="availability" class="pad" style="padding-top:0"><div class="wrap split">
  <div><span class="eyebrow"><span class="live-dot"></span>Live availability</span><h2>See what's free on your dates.</h2>
  <p class="lead" style="margin-top:22px">Pick your dates and you'll see what's available right now. No prices, no waiting for a callback just to find out it's booked.</p>
  <div class="rows" id="peek"></div>
  <div class="btns" style="margin-top:24px"><a class="btn" href="#quote">Check everything</a></div></div>
  <div class="photo-tall"><img src="{R}img/stage-lights.jpg" alt="">{STANDIN}</div>
</div></section>

<section id="planner" class="pad" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Plan your room</span><h2>Drop it into your room before you book it.</h2>
  <p class="lead" style="margin-top:18px">Pick a room, tap gear to drop it in, and drag it into place. Everything you place goes straight into your quote.</p>
  <div class="tool"><span class="sample-tag">Sample inventory</span><div id="planner-tool"></div></div>
</div></section>

<section id="quote" class="pad" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Build your quote</span><h2>Your gear. Your dates.</h2>
  <div class="tool"><span class="sample-tag">Sample inventory for preview. Real stock connects once MAC shares its inventory list.</span><div id="quote-tool"></div></div>
</div></section>

<section class="plan-band"><img src="{R}img/mac-arena.jpg" alt="">
  <div class="wrap"><span class="eyebrow">National rentals and tours</span><h2 style="max-width:15ch">Any city. Same show.</h2>
  <p class="lead" style="margin-top:20px;color:#E6E2D8">Touring takes serious logistics. We plan it so the show runs the same way in every city.</p>{two_buttons("#quote")}</div>
</section>

<section id="sales" class="pad"><div class="wrap split" style="align-items:start">
  <div><span class="eyebrow">Equipment sales</span><h2>Buy the gear, too.</h2>
  <p class="lead" style="margin-top:22px">We supply high-end equipment from the best brands, and we install systems in commercial venues. Tell us what you need and we'll put together options.</p></div>
  <form class="tool" data-form><div class="form-grid">
    <label class="field"><span>What are you looking for?</span><select><option>Audio</option><option>Lighting</option><option>Video or LED</option><option>Staging</option><option>A full venue installation</option></select></label>
    <label class="field"><span>When do you need it?</span><input type="date"></label>
    <label class="field"><span>Name</span><input required></label><label class="field"><span>Email</span><input type="email" required></label></div>
    <label class="field"><span>Details</span><textarea rows="3" placeholder="Venue, size, brands you like"></textarea></label>
    <button class="btn">Request purchase options</button></form>
</div></section>
</main>
''' + contact("Let's make your event.", "Questions about gear, a venue install or a tour? Send us a note.", "125 Bermondsey Rd, North York, ON M4A 1X3", "info@macshowsystems.com", ["Rental", "Equipment purchase", "Venue installation", "National tour", "Show management"]) + foot(R, '<div><img src="../img/mac-logo.png" alt="MAC Show Systems" width="170" height="47"><br><span class="mute">© 2026 MAC Show Systems Inc.</span></div>') + f'''<script src="{R}tools.js"></script>
<script>
const T = window.MACTOOLS;
T.quote(document.getElementById("quote-tool"), {{ prefix: "mac" }});
T.planner(document.getElementById("planner-tool"), {{ prefix: "mac" }});
function peek() {{ const d = T.dates("mac"); document.getElementById("peek").innerHTML = ["led","spk","mov","stgo"].map(id => {{ const it = T.INV.find(i => i.id === id); return `<div class="row"><div><div class="nm">${{it.n}}</div><div class="ct">${{d.a.toLocaleDateString("en-CA",{{month:"short",day:"numeric"}})}} to ${{d.b.toLocaleDateString("en-CA",{{month:"short",day:"numeric"}})}}</div></div>${{T.status(T.free(id, d.a, d.b), it.q)}}</div>`; }}).join(""); }}
peek(); document.addEventListener("macdates", peek);
document.querySelectorAll("[data-form]").forEach(f => T.sendForm(f, "Our team will get back to you shortly."));
</script>
</body></html>'''
write("show-systems/index.html", mac)

# =====================================================================================
# PSI
# =====================================================================================
p_mark = f'<a class="mark" href="index.html"><img src="{R}img/psi-webclip.png" alt="PSI" width="48" height="48" class="psi-logo"><span>Production Service Industries</span></a>'
psi = head("psi", "psi/index.html", R, "PSI · Production Service Industries", "Concerts, festivals, galas, technical staffing and training in Ontario.") + header(
    p_mark, [("Services", "#services"), ("Projects", "#projects"), ("Book a crew", "#crew"), ("Training", "#training")], "#packages", R) + f'''
<main>
<section class="hero" id="hero">
  <div class="slides">
    <img src="{R}img/psi-olg-wall.jpg" alt="OLG Stage at Fallsview Casino, LED video wall" data-label="OLG Stage, Fallsview">
    <img src="{R}img/psi-concert.jpg" alt="Concert crowd in front of a lit stage" data-label="Concerts and festivals">
  </div>
  <div class="now">Featured<br><b></b></div>
  <div class="wrap">
    <span class="eyebrow">Concert and live event solutions</span>
    <h1 data-lines='["Breathe life into the show.", "Sound. Light. Crew.", "Ready when the doors open."]'>Breathe life into the show.</h1>
    <p class="lede">Audiovisual solutions, expert design and reliable staffing for concerts, festivals, galas and venues.</p>
    {two_buttons("#packages")}
    <div class="ticker"><a href="#" data-tour>Take a tour of what's changed</a><span>St. Catharines, Ontario</span></div>
  </div>
</section>

<section id="services" class="pad"><div class="wrap">
  <span class="eyebrow">Our services</span><h2 style="max-width:18ch">Built for the people who run the show.</h2>
  <div class="extras">
    <div>{icon("star")}<div><h3>Concerts and festivals</h3><p>Sound, lighting and video that lift the artistry and the experience.</p></div></div>
    <div>{icon("light")}<div><h3>Galas and special events</h3><p>Elegance and impact for the room and the people in it.</p></div></div>
    <div>{icon("crew")}<div><h3>Technical staffing and labour</h3><p>Skilled crews, sized to your call sheet.</p></div></div>
    <div>{icon("school")}<div><h3>Training and education</h3><p>Hands-on courses for the next generation of technicians.</p></div></div>
  </div>
</div></section>

<section id="projects" class="psi-proj">
  <figure class="pj big"><img src="{R}img/psi-olg-wall.jpg" alt="OLG Stage video wall"><figcaption><span class="eyebrow">Installations</span><h3>OLG Stage, Fallsview Casino</h3><p>A video wall installation that transformed the stage.</p></figcaption></figure>
  <figure class="pj"><img src="{R}img/psi-concert.jpg" alt=""><figcaption><span class="eyebrow">Production</span><h3>Cicada Music &amp; Arts Festival</h3><p>Sound and lighting production for an unforgettable festival.</p></figcaption></figure>
  <figure class="pj"><img src="{R}img/psi-taiwanfest.jpg" alt=""><figcaption><span class="eyebrow">Backline</span><h3>Harbourfront Centre Concert Stage</h3><p>Advanced sound systems and expert technical staffing.</p></figcaption></figure>
</section>
<div class="wrap" style="padding-top:18px"><p class="mute" style="font-size:14px">Photos from psi.show. <span class="todo">Confirm which photo belongs to which project</span></p></div>

<section id="crew" class="pad"><div class="wrap">
  <span class="eyebrow">Book a crew</span><h2>Your call sheet, filled.</h2>
  <p class="lead" style="margin-top:18px">Pick your dates, choose roles and headcount, and see who's free right now.</p>
  <div class="tool"><span class="sample-tag">Sample crew availability</span><div id="crew-tool"></div></div>
</div></section>

<section id="packages" class="pad" style="padding-top:0"><div class="wrap split" style="align-items:start">
  <div><span class="eyebrow">Build your quote</span><h2>Three questions. One package.</h2>
  <p class="lead" style="margin-top:22px">Tell us the kind of show, how many people and where. You get a starting package of stage, sound, light and crew to send to our team.</p></div>
  <div class="tool" id="pk-tool" style="margin-top:0"></div>
</div></section>

<section id="training" class="about">
  <div class="ph"><img src="{R}img/psi-concert.jpg" alt=""></div>
  <div class="tx"><span class="eyebrow">Training and education</span><h2>Learn it on real gear.</h2>
  <p class="lead" style="margin-top:16px">Save your seat in an upcoming course, or join the waitlist when a class is full.</p>
  <div class="rows" id="train-tool" style="margin-top:12px"></div></div>
</section>
</main>
''' + contact("Interested in hiring PSI?", "Tell us about your event or venue and we'll be in touch.", "255 Bunting Rd, St. Catharines, ON", "info@psi.show", ["Concert or festival", "Gala or special event", "Technical staffing", "Venue installation", "Training"]) + foot(R, f'<div><img src="{R}img/psi-webclip.png" alt="PSI" width="44" height="44" class="psi-logo"><br><span class="mute">© 2026 PSI</span></div><div><a href="https://www.instagram.com/psi.show/">Instagram</a><br><a href="https://www.facebook.com/PSIAV">Facebook</a></div>') + f'''<script src="{R}tools.js"></script>
<script>
const T = window.MACTOOLS;
T.crew(document.getElementById("crew-tool")); T.packages(document.getElementById("pk-tool")); T.training(document.getElementById("train-tool"));
document.querySelectorAll("[data-form]").forEach(f => T.sendForm(f, "The PSI team will get back to you shortly."));
</script>
</body></html>'''
write("psi/index.html", psi)

# =====================================================================================
# TOUR TRUCKING
# =====================================================================================
t_mark = '<a class="mark" href="index.html"><span class="tt-wm sm"><b>TOUR</b><span>TRUCKING</span></span></a>'
tt = head("tt", "tour-trucking/index.html", R, "Tour Trucking Logistics", "Specialized transport for the entertainment industry.") + header(
    t_mark, [("Services", "#services"), ("Request a route", "#route"), ("Space calculator", "#space"), ("Drive with us", "#drivers")], "#route", R) + f'''
<main>
<section class="hero" id="hero">
  <div class="slides">
    <img src="{R}img/truck-mountain.jpg" alt="Truck on a mountain highway" data-label="Cross-country">
    <img src="{R}img/warehouse.jpg" alt="Warehouse racking" data-label="Warehousing">
  </div>
  <span class="standin" style="z-index:3">Stand-in photos</span>
  <div class="now">On the road<br><b></b></div>
  <div class="wrap">
    <span class="eyebrow">Tour Trucking Logistics</span>
    <h1 data-lines='["No gear, no show.", "On time. Every time.", "Built for touring freight."]'>No gear, no show.</h1>
    <p class="lede">Specialized transport for an industry most carriers don't understand. If we can move a tour on time, we can move anything.</p>
    {two_buttons("#route")}
    <div class="ticker"><a href="#" data-tour>Take a tour of what's changed</a><span>Full loads · Partial loads · Warehousing</span></div>
  </div>
</section>

<section id="services" class="pad"><div class="wrap split" style="align-items:start">
  <div><span class="eyebrow">What we do</span><h2>A partner, not just a carrier.</h2>
  <p class="lead" style="margin-top:22px">Getting the gear there is where every show starts. We take that as seriously as our clients do, which is why they keep coming back.</p></div>
  <div class="extras" style="grid-template-columns:1fr;margin-top:0">
    <div>{icon("truck")}<div><h3>Full truckload</h3><p>A whole trailer for your show, door to door.</p></div></div>
    <div>{icon("box")}<div><h3>Less than a truckload</h3><p>Pay for the space you use when the load is smaller.</p></div></div>
    <div>{icon("map")}<div><h3>Warehousing and distribution</h3><p>Storage between legs and between seasons.</p></div></div>
  </div>
</div></section>

<section id="route" class="pad" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Build your quote</span><h2>One leg or a whole tour.</h2>
  <p class="lead" style="margin-top:18px">Add every stop and date, pick a trailer, and send it to dispatch in one go.</p>
  <div class="tool" id="route-tool"></div>
</div></section>

<section id="space" class="pad" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Truck space calculator</span><h2>How much truck do you need?</h2>
  <p class="lead" style="margin-top:18px">Add your cases and we'll estimate how many feet of trailer your show takes.</p>
  <div class="tool"><div id="space-tool"></div></div>
</div></section>

<section id="drivers" class="about">
  <div class="ph"><img src="{R}img/warehouse.jpg" alt="">{STANDIN}</div>
  <div class="tx"><span class="eyebrow">Careers</span><h2>Drive with us.</h2>
  <p class="lead" style="margin-top:16px">Haul the gear behind concerts, festivals and tours. Tell us about your experience and we'll be in touch.</p>
  <form data-form style="margin-top:10px"><div class="form-grid"><label class="field"><span>Name</span><input required></label><label class="field"><span>Email</span><input type="email" required></label>
  <label class="field"><span>Licence class</span><select><option>AZ</option><option>DZ</option><option>Other</option></select></label><label class="field"><span>Years driving</span><input inputmode="numeric"></label></div>
  <button class="btn">Apply to drive</button></form></div>
</section>
</main>
''' + contact("Talk to dispatch.", "Questions about a load, a tour or storage? Send us a note.", "125 Bermondsey Rd, North York, ON <span class=\"todo\">confirm address</span>", "<span class=\"todo\">Tour Trucking email needed</span>", ["One load", "A tour", "Storage", "Driving with us"]) + foot(R, '<div><span class="tt-wm sm"><b>TOUR</b><span>TRUCKING</span></span><br><span class="mute">© 2026 Tour Trucking Logistics Inc.</span></div>') + f'''<script src="{R}tools.js"></script>
<script>
const T = window.MACTOOLS;
T.route(document.getElementById("route-tool")); T.space(document.getElementById("space-tool"));
document.querySelectorAll("[data-form]").forEach(f => T.sendForm(f, "Our team will be in touch."));
</script>
</body></html>'''
write("tour-trucking/index.html", tt)
print("built")

# =====================================================================================
# MAC HUB (staff app demo)
# =====================================================================================
hub = head("hub", "hub/index.html", R, "MAC Hub", "Staff app for MAC Group of Companies.").replace('<div class="sample">', '<div class="sample" style="background:#7C9CFF;color:#0F1115">') + f'''
<div class="hub" id="hub">
  <aside class="hub-rail">
    <div class="hub-brand"><b>MAC</b> Hub<span>Staff only</span></div>
    <nav class="hub-tabs">
      <button class="on" data-v="today">{icon("calendar","sm")}Today</button>
      <button data-v="inv">{icon("box","sm")}Inventory</button>
      <button data-v="quotes">{icon("tag","sm")}Quotes</button>
      <button data-v="flags">{icon("hub","sm")}Cross-sell</button>
      <button data-v="clients">{icon("crew","sm")}Clients</button>
    </nav>
    <a class="hub-back" href="../index.html">Back to MAC Group</a>
  </aside>
  <main class="hub-main">
    <div class="hub-top"><div><span class="eyebrow">Sample data</span><h1 class="hub-h" data-title>Today</h1></div>
      <label class="field hub-as"><span>Working as</span><select data-as><option value="mac">MAC Show Systems</option><option value="psi">PSI</option><option value="tt">Tour Trucking</option><option value="all">All companies (owners)</option></select></label></div>
    <section data-view="today">
      <div class="kpis"><div><b>7</b><span>New quote requests</span></div><div><b>2</b><span>Holds ending in 24 hours</span></div><div><b>3</b><span>Waitlist matches</span></div><div><b>4</b><span>Trucks on the road</span></div></div>
      <h3 class="hub-sub">Incoming</h3><div class="hub-list" data-incoming></div>
    </section>
    <section data-view="inv" hidden>
      <div class="dates" data-hdates></div>
      <div class="hub-table" data-inv></div>
    </section>
    <section data-view="quotes" hidden>
      <div class="hub-split"><div class="hub-list" data-qlist></div><div class="hub-mail" data-mail></div></div>
    </section>
    <section data-view="flags" hidden><div class="hub-list" data-flags></div></section>
    <section data-view="clients" hidden><p class="mute">Past clients with no booking this season. One tap drafts a check-in, sent under the company they know.</p><div class="hub-list" data-clients></div></section>
  </main>
</div>
<script src="{R}mac.js"></script><script src="{R}tools.js"></script><script src="{R}hub.js"></script>
</body></html>'''
write("hub/index.html", hub)

# =====================================================================================
# CLIENT APPS
# =====================================================================================
apps = head("group", "apps/index.html", R, "Client apps", "One client app per brand, all running on MAC Hub.") + header(
    '<a class="mark" href="../index.html"><b>MAC</b><span>Group of Companies</span></a>', [("MAC Hub", "../hub/index.html")], "../index.html#whole-event", R).replace('href="#contact"', 'href="../index.html#contact"') + f'''
<main id="apps" class="pad" style="padding-top:150px"><div class="wrap">
  <span class="owner-note">Owners only. Clickable demos on sample data.</span>
  <span class="eyebrow">Client apps</span><h2 style="max-width:16ch">One app per brand. One system behind them.</h2>
  <p class="lead" style="margin-top:18px">Each app installs to a phone's home screen from the brand's own site. Clients only ever see that one brand. Everything they do lands in MAC Hub.</p>
  <div class="apps">
    <div class="app" data-site="mac" data-app="planner"><div class="app-cap"><b>MAC Show Systems Planner</b><span>For event planners</span></div><div class="scr" data-scr></div></div>
    <div class="app" data-site="psi" data-app="crew"><div class="app-cap"><b>PSI Crew Call</b><span>For PSI's freelance techs</span></div><div class="scr" data-scr></div></div>
    <div class="app" data-site="tt" data-app="track"><div class="app-cap"><b>Tour Trucking Track My Load</b><span>For shippers and tour managers</span></div><div class="scr" data-scr></div></div>
  </div>
</div></main>
<footer><div class="wrap"><div><a href="../index.html">MAC Group of Companies</a></div><div><a href="#" data-tour>Take a tour of what's changed</a></div></div></footer>
<script src="{R}mac.js"></script><script src="{R}tools.js"></script><script src="{R}apps.js"></script>
</body></html>'''
write("apps/index.html", apps)
print("built hub + apps")
