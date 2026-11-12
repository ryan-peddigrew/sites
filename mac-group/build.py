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


LOGOS = {"mgc": ("logos/mgc-logo.png", 1277, 721, "MAC Group of Companies"), "mgcm": ("logos/mgc-monogram.png", 1189, 721, "MAC Group of Companies"),
         "mss": ("logos/mss-logo.png", 1472, 306, "MAC Show Systems"), "ttl": ("logos/ttl-logo.png", 2849, 975, "Tour Trucking Logistics")}
def mlogo(key, w, root, cls=""):
    """Client's own white logo shown in the text colour (CSS mask), never redrawn."""
    src, W, H, alt = LOGOS[key]
    return f'<span class="mlogo {cls}" role="img" aria-label="{alt}" style="width:{w}px;aspect-ratio:{W}/{H};-webkit-mask-image:url({root}img/{src});mask-image:url({root}img/{src})"></span>'
def psilogo(w, root):
    return f'<img class="psi-logo" src="{root}img/logos/psi-logo-bw.png" alt="PSI" width="{w}" height="{w}">'

def write(path, html):
    p = os.path.join(HERE, path); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w").write(html)

STANDIN = '<span class="standin">Stand-in photo</span>'

# =====================================================================================
# MAC GROUP OF COMPANIES (parent)
# =====================================================================================
g_mark = '<a class="mark" href="index.html">' + mlogo("mgc", 84, "") + '</a>'
group = head("group", "index.html", "", "MAC Group of Companies", "MAC Group of Companies: MAC Show Systems, PSI and Tour Trucking.") + header(
    g_mark, [("Our companies", "#companies"), ("Work with us", "#careers")], "#whole-event", "") + f'''
<main>
<section class="hero" id="hero">
  <div class="slides">
    <img src="img/mac-hero.webp" alt="MAC Show Systems outdoor stage at dusk" data-label="MAC Show Systems">
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
  <a class="co" href="show-systems/index.html"><img src="img/mac-venue-1.webp" alt="">
    <div class="in">{mlogo("mss", 260, "", "co-logo")}
    <p>Sound, lighting, video, LED and staging. Rentals, sales, setup and national tours.</p><span class="go">Visit MAC Show Systems {icon("arrow","sm")}</span></div></a>
  <a class="co" href="psi/index.html"><img src="img/psi-concert.jpg" alt="">
    <div class="in"><span class="co-logo">{psilogo(84, "")}</span>
    <p>Production Service Industries. Concerts, festivals, galas, technical staffing and training.</p><span class="go">Visit PSI {icon("arrow","sm")}</span></div></a>
  <a class="co" href="tour-trucking/index.html"><img src="img/truck-mountain.jpg" alt="">{STANDIN}
    <div class="in">{mlogo("ttl", 210, "", "co-logo")}
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
  <div class="ph"><img src="img/mac-work-2.webp" alt="Concert crowd under stage lights"></div>
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
  <ol><li>Your real inventory list, in any format (spreadsheet or rental software export).</li><li>Photos of your own gear, crews, trucks and warehouse.</li><li>Logos as vector files (MAC Show Systems, PSI). Tour Trucking: a larger logo file.</li><li>A yes on the brand direction for MAC Group.</li><li>Where quote requests should go for each company.</li></ol></div>
</div></section>
</main>
''' + contact("Talk to MAC Group.", "For partnerships, large accounts and anything that spans more than one company.", "125 Bermondsey Rd, North York, ON", "info@macshowsystems.com <span class=\"todo\">confirm group email</span>", ["Gear for an event", "Crew", "Trucking", "Partnership", "Careers"]) + foot("", '<div>' + mlogo("mgc", 110, "") + '<br><span class="mute">© 2026 MAC Group of Companies</span></div><div><a href="show-systems/index.html">MAC Show Systems</a><br><a href="psi/index.html">PSI</a><br><a href="tour-trucking/index.html">Tour Trucking</a></div>') + '''<script>document.querySelectorAll("[data-form]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();f.innerHTML='<h3>Got it.</h3><p>The right team will get back to you.</p><p class="mute">Preview only: nothing is sent yet.</p>'}));</script>
</body></html>'''
write("index.html", group)

# =====================================================================================
# MAC SHOW SYSTEMS
# =====================================================================================
R = "../"
m_mark = '<a class="mark" href="index.html">' + mlogo("mss", 210, R) + '</a>'
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
    m_mark, [("What we do", "#services"), ("Case studies", "case-studies.html"), ("Venues", "venues.html"), ("Plan your event", "planning.html")], "quote.html", R) + f'''
<main>
<section class="hero" id="hero">
  <div class="slides">
    <img src="{R}img/mac-hero.webp" alt="Outdoor festival stage at dusk" data-label="Festivals">
    <img src="{R}img/mac-work-2.webp" alt="Concert crowd under stage lights" data-label="Concerts">
    <img src="{R}img/mac-venue-1.webp" alt="Gala dinner with stage lighting" data-label="Galas">
    <img src="{R}img/mac-solution-staging.webp" alt="Wedding with draping and truss" data-label="Staging and draping">
  </div>
  <div class="now">Now showing<br><b></b></div>
  <div class="wrap">
    <span class="eyebrow">Toronto · Audio · Video · Lighting · Staging</span>
    <h1 data-lines='["Make your event.", "Any size. Indoors or out.", "Plan the room. Then book it."]'>Make your event.</h1>
    <p class="lede">Sound, lighting, video, LED and staging from a production company in Toronto. Tell us what your event needs, plan your room and send your quote request in minutes.</p>
    {two_buttons("quote.html")}
    <div class="ticker"><a href="#" data-tour>Take a tour of what's changed</a><span>Rentals · Sales · Setup · National tours</span></div>
  </div>
</section>

<section id="services" class="pad"><div class="wrap">
  <span class="eyebrow">What we do</span><h2 style="max-width:16ch">Everything the audience sees and hears.</h2>
  <div class="extras">{svc_html}</div>
</div></section>

<section class="mac-gal" aria-label="Recent work">
  <figure><img src="{R}img/mac-venue-2.webp" alt="Wedding reception with floral installations"><figcaption>Weddings</figcaption></figure>
  <figure><img src="{R}img/mac-solution-video.webp" alt="Video screens over a stage in a historic venue"><figcaption>Video</figcaption></figure>
  <figure><img src="{R}img/mac-venue-3.webp" alt="Gala in a heritage building lit in purple"><figcaption>Galas</figcaption></figure>
  <figure><img src="{R}img/mac-solution-backline.webp" alt="Theatre stage lit in blue and red"><figcaption>Theatre</figcaption></figure>
  <figure><img src="{R}img/mac-work-3.webp" alt="Dance floor and screen at a reception"><figcaption>Receptions</figcaption></figure>
  <figure><img src="{R}img/mac-venue-4.webp" alt="Candlelit dinner with uplighting"><figcaption>Dinners</figcaption></figure>
</section>
<section id="capacity" class="pad" style="padding-top:0"><div class="wrap split">
  <div><span class="eyebrow">Capacity</span><h2>Built for big. Ready for small.</h2>
  <p class="lead" style="margin-top:22px">From a boardroom to a festival field, we have the gear, the space and the crew to handle it. Tell us what your event needs and we'll build the right setup.</p>
  <ul class="cap-list"><li><b>Everything under one roof</b>Audio, video, LED, lighting, staging and podiums.</li><li><b>Our own warehouse</b>Prepped, tested and loaded in North York.</li><li><b>Any size, indoors or out</b>Ballrooms, theatres, parks and festival sites.</li><li><b>Delivery to show day</b>Delivery, setup, show crew and strike.</li></ul>
  <div class="btns" style="margin-top:24px"><a class="btn" href="quote.html">Build your quote</a></div></div>
  <div class="photo-tall"><img src="{R}img/mac-solution-audio.webp" alt="Speakers on an outdoor stage"></div>
</div></section>

<section id="planner" class="pad" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Plan your room</span><h2>Drop it into your room before you book it.</h2>
  <p class="lead" style="margin-top:18px">Pick a room, tap gear to drop it in, and drag it into place. Everything you place goes straight into your quote.</p>
  <div class="tool"><span class="sample-tag">Preview</span><div id="planner-tool"></div></div>
</div></section>

<section id="quote" class="pad" style="padding-top:0"><div class="wrap">
  <span class="eyebrow">Build your quote</span><h2>Your gear. Your dates.</h2>
  <div class="tool"><span class="sample-tag">Preview: requests are not sent yet</span><div id="quote-tool"></div></div>
</div></section>

<section class="plan-band"><img src="{R}img/mac-work-1.webp" alt="Outdoor stage build in a park">
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
''' + contact("Let's make your event.", "Questions about gear, a venue install or a tour? Send us a note.", "125 Bermondsey Rd, North York, ON M4A 1X3", "info@macshowsystems.com", ["Rental", "Equipment purchase", "Venue installation", "National tour", "Show management"]) + foot(R, '<div>' + mlogo("mss", 200, R) + '<br><span class="mute">© 2026 MAC Show Systems Inc.</span></div>') + f'''<script src="{R}tools.js"></script>
<script>
const T = window.MACTOOLS;
T.quote(document.getElementById("quote-tool"), {{ prefix: "mac" }});
T.planner(document.getElementById("planner-tool"), {{ prefix: "mac" }});

document.querySelectorAll("[data-form]").forEach(f => T.sendForm(f, "Our team will get back to you shortly."));
</script>
</body></html>'''
write("show-systems/index.html", mac)

# =====================================================================================
# PSI
# =====================================================================================
p_mark = '<a class="mark" href="index.html">' + psilogo(52, R) + '<span>Production Service Industries</span></a>'
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
''' + contact("Interested in hiring PSI?", "Tell us about your event or venue and we'll be in touch.", "255 Bunting Rd, St. Catharines, ON", "info@psi.show", ["Concert or festival", "Gala or special event", "Technical staffing", "Venue installation", "Training"]) + foot(R, f'<div>{psilogo(64, R)}<br><span class="mute">© 2026 PSI</span></div><div><a href="https://www.instagram.com/psi.show/">Instagram</a><br><a href="https://www.facebook.com/PSIAV">Facebook</a></div>') + f'''<script src="{R}tools.js"></script>
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
t_mark = '<a class="mark" href="index.html">' + mlogo("ttl", 150, R) + '</a>'
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
''' + contact("Talk to dispatch.", "Questions about a load, a tour or storage? Send us a note.", "125 Bermondsey Rd, North York, ON <span class=\"todo\">confirm address</span>", "<span class=\"todo\">Tour Trucking email needed</span>", ["One load", "A tour", "Storage", "Driving with us"]) + foot(R, '<div>' + mlogo("ttl", 160, R) + '<br><span class="mute">© 2026 Tour Trucking Logistics Inc.</span></div>') + f'''<script src="{R}tools.js"></script>
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
hub = head("hub", "hub/index.html", R, "MAC Hub", "Staff app for MAC Group of Companies.").replace('<link rel="stylesheet"', '<link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="../icons/hub-180.png"><meta name="theme-color" content="#0F1115"><link rel="stylesheet"', 1).replace('<div class="sample">', '<div class="sample" style="background:#FFFFFF;color:#0F1115">') + f'''
<div class="hub" id="hub">
  <aside class="hub-rail">
    <div class="hub-brand">{mlogo("mgcm", 110, R)}<b>Hub</b><span>Staff only</span></div>
    <nav class="hub-tabs">
      <button class="on" data-v="today">{icon("calendar","sm")}Today</button>
      <button data-v="inv">{icon("box","sm")}Inventory</button>
      <button data-v="quotes">{icon("tag","sm")}Quotes</button>
      <a class="hub-tablink" href="quote.html">{icon("show","sm")}Quote Builder</a>
      <a class="hub-tablink" href="connections.html">{icon("hub","sm")}Connections</a>
      <button data-v="flags">{icon("hub","sm")}Cross-sell</button>
      <button data-v="clients">{icon("crew","sm")}Clients</button>
      <a class="hub-tablink" href="connections.html">{icon("hub","sm")}Connections</a>
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
<script src="{R}mac.js"></script><script src="{R}inv-names.js"></script><script src="{R}tools.js"></script><script src="{R}hub.js"></script>
</body></html>'''
write("hub/index.html", hub)

# =====================================================================================
# CLIENT APPS
# =====================================================================================
apps = head("group", "apps/index.html", R, "Client apps", "One client app per brand, all running on MAC Hub.") + header(
    '<a class="mark" href="../index.html">' + mlogo("mgc", 84, R) + '</a>', [("MAC Hub", "../hub/index.html")], "../index.html#whole-event", R).replace('href="#contact"', 'href="../index.html#contact"') + f'''
<main id="apps" class="pad" style="padding-top:150px"><div class="wrap">
  <span class="owner-note">Owners only. Clickable demos on sample data.</span>
  <span class="eyebrow">Client apps</span><h2 style="max-width:16ch">One app per brand. One system behind them.</h2>
  <p class="lead" style="margin-top:18px">Each app installs to a phone's home screen from the brand's own site. Clients only ever see that one brand. Everything they do lands in MAC Hub.</p>
  <div class="app-links">
    <a class="app-link" data-site="mac" href="mss/index.html"><img src="../icons/mss-192.png" alt="" width="72" height="72"><b>MAC Show Systems</b><span>For clients. Their events, quotes to approve, new requests, messages and documents. Only MAC Show Systems appears.</span><em>Open the app</em></a>
    <a class="app-link" data-site="psi" href="psi/index.html"><img src="../icons/psi-192.png" alt="" width="72" height="72"><b>PSI</b><span>For clients. Their shows, crew confirmed by role, quotes, training seats and messages. Only PSI appears.</span><em>Open the app</em></a>
    <a class="app-link" data-site="tt" href="ttl/index.html"><img src="../icons/ttl-192.png" alt="" width="72" height="72"><b>Tour Trucking</b><span>For shippers. Where the truck is, every leg of the tour, quotes, paperwork and dispatch. Only Tour Trucking appears.</span><em>Open the app</em></a>
    <a class="app-link" data-site="hub" href="../hub/quote.html"><img src="../icons/hub-192.png" alt="" width="72" height="72"><b>MAC Hub</b><span>For staff at all three companies. Requests, quoting, shared inventory and calendar, cross-company flags, and links to HR and rental software.</span><em>Open the app</em></a>
  </div>
  <p class="mute" style="margin-top:14px">Each one installs to a phone: open it, then Share and Add to Home Screen.</p>
  <h3 style="margin:56px 0 18px;font-size:28px">Phone previews</h3>
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

# =====================================================================================
# CLIENT DASHBOARD APPS (installable) + STAFF QUOTE BUILDER
# =====================================================================================
import json
def manifest(path, name, short, start, bg, theme, icon):
    m = {"name": name, "short_name": short, "start_url": start, "scope": "./", "display": "standalone", "background_color": bg, "theme_color": theme,
         "icons": [{"src": f"../../icons/{icon}-192.png", "sizes": "192x192", "type": "image/png"}, {"src": f"../../icons/{icon}-512.png", "sizes": "512x512", "type": "image/png"}]}
    write(path, json.dumps(m, indent=2))

CAPPS = [
    ("mss", "mac", "MAC Show Systems", "MAC Show Systems", "#0A0A0A", "#0A0A0A", lambda r: mlogo("mss", 210, r), "show-systems", "Your events, quotes and requests in one place."),
    ("psi", "psi", "PSI", "PSI", "#FFFFFF", "#0A0A0A", lambda r: psilogo(56, r), "psi", "Your shows, crew and quotes in one place."),
    ("ttl", "tt", "Tour Trucking", "Tour Trucking", "#0A0A0A", "#0A0A0A", lambda r: mlogo("ttl", 150, r), "tour-trucking", "Every load, every leg, live."),
]
RR = "../../"
for key, site, name, short, bg, theme, logo, sitedir, desc in CAPPS:
    manifest(f"apps/{key}/manifest.webmanifest", name, short, "./index.html", bg, theme, key)
    page = head(site, f"apps/{key}/index.html", RR, f"{name} app", desc).replace("<html ", f'<html data-app="{key}" ').replace(
        '<link rel="stylesheet"', f'<link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="{RR}icons/{key}-180.png"><meta name="theme-color" content="{theme}"><meta name="apple-mobile-web-app-capable" content="yes"><link rel="stylesheet"', 1).replace(
        "</head>", f'<link rel="stylesheet" href="{RR}app.css"></head>').replace("<body>", '<body class="capp-body">') + f'''
<div class="capp">
  <aside class="c-side">
    <a class="c-logo" href="{RR}{sitedir}/index.html">{logo(RR)}</a><span class="c-appname">Client app · sample account</span>
    <nav class="ctabs" id="ctabs"></nav>
    <a class="c-out" href="{RR}{sitedir}/index.html">Back to the {name} site</a>
  </aside>
  <main class="c-main">
    <div class="c-bar"><a class="c-logo" href="{RR}{sitedir}/index.html">{logo(RR)}</a><h1 id="ctitle">Home</h1><span class="c-acct">Sample account</span></div>
    <div id="cmain"></div>
    <p id="install" hidden><b>Put it on your home screen.</b> iPhone: tap Share, then Add to Home Screen. Android: tap the menu, then Install app.</p>
  </main>
</div>
<div id="toast" role="status"></div>
<script src="{RR}mac.js"></script><script src="{RR}tools.js"></script><script src="{RR}client-app.js"></script>
</body></html>'''
    write(f"apps/{key}/index.html", page)

# Hub manifest + Quote Builder
write("hub/manifest.webmanifest", json.dumps({"id": "mac-hub", "name": "MAC Hub", "short_name": "MAC Hub", "start_url": "./index.html", "scope": "./", "display": "standalone",
      "background_color": "#0F1115", "theme_color": "#0F1115", "icons": [{"src": "../icons/hub-192.png", "sizes": "192x192", "type": "image/png"}, {"src": "../icons/hub-512.png", "sizes": "512x512", "type": "image/png"}]}, indent=2))
HUBHEAD = '<link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="../icons/hub-180.png"><meta name="theme-color" content="#0F1115"><meta name="apple-mobile-web-app-capable" content="yes"><link rel="stylesheet"'
write("hub/quote.webmanifest", json.dumps({"id": "mac-hub-quotes", "name": "MAC Hub Quotes", "short_name": "Quotes", "start_url": "./quote.html", "scope": "./", "display": "standalone",
      "background_color": "#0F1115", "theme_color": "#0F1115", "icons": [{"src": "../icons/options/quote-C-192.png", "sizes": "192x192", "type": "image/png"}, {"src": "../icons/options/quote-C.png", "sizes": "512x512", "type": "image/png"}]}, indent=2))
qhtml = head("hub", "hub/quote.html", R, "MAC Hub Quotes", "Staff quoting app.").replace('<link rel="stylesheet"', HUBHEAD, 1).replace("</head>", f'<link rel="stylesheet" href="{R}app.css"></head>').replace('<div class="sample">', '<div class="sample" style="background:#FFFFFF;color:#0F1115">') + f'''
<div class="hub" id="quote">
  <aside class="hub-rail">
    <div class="hub-brand">{mlogo("mgcm", 110, R)}<b>Hub</b><span>Staff only</span></div>
    <nav class="hub-tabs">
      <a class="hub-tablink" href="index.html">{icon("calendar","sm")}Today</a>
      <a class="hub-tablink on" href="quote.html">{icon("tag","sm")}Quote Builder</a>
      <a class="hub-tablink" href="index.html#inv">{icon("box","sm")}Inventory</a>
      <a class="hub-tablink" href="connections.html">{icon("hub","sm")}Connections</a>
    </nav>
    <a class="hub-back" href="../index.html">Back to MAC Group</a>
  </aside>
  <main class="hub-main">
    <div class="hub-top"><div><span class="eyebrow">Quote Builder · sample inventory</span><h1 class="hub-h">Quote <span data-qno></span></h1></div>
      <div class="qb-brands" role="group" aria-label="Selling company"><button data-b="mss">MAC Show Systems</button><button data-b="psi">PSI</button><button data-b="ttl">Tour Trucking</button></div></div>
    <div class="qb">
      <div class="qb-pane">
        <h3>Client and dates</h3>
        <div class="qb-grid">
          <label class="field wide"><span>Client</span><input data-f="client"></label>
          <label class="field"><span>Contact</span><input data-f="contact"></label>
          <label class="field"><span>Event</span><input data-f="ev"></label>
          <label class="field wide"><span>Venue</span><input data-f="venue"></label>
          <label class="field"><span>From</span><input type="date" data-f="a"></label>
          <label class="field"><span>To</span><input type="date" data-f="z"></label>
        </div>
        <h3>Live stock on these dates</h3>
        <label class="field"><span>Find gear</span><input data-find placeholder="LED, speaker, stage..."></label>
        <div class="qb-stock" data-stock></div>
        <div class="qb-chips" data-svc></div>
      </div>
      <div>
        <div class="qb-pane"><h3>Lines · you type every rate</h3><div data-lines></div>
          <div class="qb-grid" style="margin-top:14px"><label class="field"><span>Tax %</span><input inputmode="decimal" data-f="tax"></label><label class="field"><span>Note to client</span><input data-f="note" placeholder="Optional"></label></div>
          <h3 style="margin-top:18px">Staff flags · never shown to the client</h3><div data-flags></div></div>
        <div class="qb-acts"><button class="btn" data-send>Send to client</button><button class="btn ghost" data-print>Save as PDF</button><button class="btn ghost" data-hold>Hold stock 48 hours</button><button class="btn ghost" data-new>New quote</button></div>
        <div data-doc></div><div data-mail></div>
      </div>
    </div>
  </main>
</div>
<div id="toast" role="status"></div>
<script src="{R}mac.js"></script><script src="{R}inv-names.js"></script><script src="{R}tools.js"></script><script src="{R}quote.js"></script>
</body></html>'''
write("hub/quote.html", qhtml)
print("built client apps + quote builder")

# =====================================================================================
# BRAND AND STYLE GUIDES (one per company) + APP ICON OPTIONS
# =====================================================================================
BG = [
  dict(key="group", site="group", name="MAC Group of Companies", file="group.html", logo=lambda r: mlogo("mgc", 260, r), logo_sm=lambda r: mlogo("mgcm", 120, r),
       role="The parent brand. For owners, hiring, partners and large accounts. It never sells to event clients directly.",
       colours=[("White", "#FFFFFF", "Page background"), ("Black", "#0A0A0A", "Text, logo, buttons"), ("Light grey", "#F2F2F2", "Panels"), ("Grey", "#5C5C5C", "Small print")],
       fonts=[("Archivo Expanded", "Headings, extra bold, in capitals", "Archivo", "font-stretch:125%;font-weight:800;text-transform:uppercase"), ("Manrope", "Body text and buttons", "Manrope", "font-weight:400"), ("JetBrains Mono", "Labels and small print", "JetBrains Mono", "font-weight:600;text-transform:uppercase;letter-spacing:.12em")],
       voice=["Calm and confident. We speak as the group, never as a salesperson.", "Name all three companies when we talk about the group, never just one.", "Short sentences. Canadian spelling."],
       photos=["mac-hero.webp", "psi-concert.jpg", "mac-work-2.webp"], app=None, site_link="../index.html"),
  dict(key="mss", site="mac", name="MAC Show Systems", file="mac-show-systems.html", logo=lambda r: mlogo("mss", 360, r), logo_sm=lambda r: f'<img src="{r}img/logos/mss-circle.png" alt="MAC Show Systems" width="120" height="120">',
       role="Audio, video, lighting and staging rental and sales for events. Planners deal only with MAC Show Systems.",
       colours=[("Black", "#0A0A0A", "Page background"), ("White", "#FFFFFF", "Text, logo, buttons"), ("Charcoal", "#161616", "Panels"), ("Grey", "#A3A3A3", "Small print")],
       fonts=[("Big Shoulders Display", "Headings, black weight, in capitals", "Big Shoulders Display", "font-weight:900;text-transform:uppercase"), ("Work Sans", "Body text and buttons", "Work Sans", "font-weight:400"), ("DM Mono", "Labels, availability counts", "DM Mono", "font-weight:500;text-transform:uppercase;letter-spacing:.12em")],
       voice=["Talk like a crew chief who has done this a thousand times: direct, specific, unflustered.", "Lead with what the event needs. Never show prices, gear lists or stock.", "Buttons say Build your quote and Get in touch."],
       photos=["mac-work-1.webp", "mac-venue-1.webp", "mac-solution-lighting.webp"], app=("MAC Show Systems app", "mss", "../apps/mss/index.html"), site_link="../show-systems/index.html"),
  dict(key="psi", site="psi", name="PSI · Production Service Industries", file="psi.html", logo=lambda r: psilogo(160, r), logo_sm=lambda r: psilogo(120, r),
       role="Concerts, galas, festivals, technical staffing and training. Producers deal only with PSI.",
       colours=[("White", "#FFFFFF", "Page background"), ("Black", "#0A0A0A", "Text, logo, buttons"), ("Light grey", "#F2F2F2", "Panels"), ("Grey", "#5C5C5C", "Small print")],
       fonts=[("Space Grotesk", "Headings, bold, sentence case", "Space Grotesk", "font-weight:700"), ("IBM Plex Sans", "Body text and buttons", "IBM Plex Sans", "font-weight:400"), ("IBM Plex Mono", "Labels, call times", "IBM Plex Mono", "font-weight:600;text-transform:uppercase;letter-spacing:.12em")],
       voice=["Warm, organised and people first. PSI is the team that runs the show.", "Name the work: real venues and projects, never invented ones.", "Sentence case headings. Canadian spelling."],
       photos=["psi-concert.jpg", "psi-olg-wall.jpg", "psi-taiwanfest.jpg"], app=("PSI app", "psi", "../apps/psi/index.html"), site_link="../psi/index.html"),
  dict(key="ttl", site="tt", name="Tour Trucking Logistics", file="tour-trucking.html", logo=lambda r: mlogo("ttl", 300, r), logo_sm=lambda r: mlogo("ttl", 150, r),
       role="Entertainment freight: full and partial loads, multi-city tours and warehousing. Shippers deal only with Tour Trucking.",
       colours=[("Black", "#0A0A0A", "Page background"), ("White", "#FFFFFF", "Text, logo, buttons"), ("Charcoal", "#161616", "Panels"), ("Grey", "#A3A3A3", "Small print")],
       fonts=[("Barlow Condensed", "Headings, extra bold, in capitals", "Barlow Condensed", "font-weight:800;text-transform:uppercase"), ("Barlow", "Body text and buttons", "Barlow", "font-weight:400"), ("JetBrains Mono", "Load numbers, times", "JetBrains Mono", "font-weight:600;text-transform:uppercase;letter-spacing:.12em")],
       voice=["Plain-spoken and on time. Every line answers: where is it, and when does it arrive.", "Use real cities and real trailer sizes.", "No hype. Canadian spelling."],
       photos=["truck-mountain.jpg", "warehouse.jpg"], app=("Tour Trucking app", "ttl", "../apps/ttl/index.html"), site_link="../tour-trucking/index.html"),
]
GFONTS = {"group": FONTS["group"], "mac": FONTS["mac"], "psi": FONTS["psi"], "tt": FONTS["tt"]}
def figs(k, n, w):
    out = ""
    for o in ("BW",):
        cur = ""
        out += f'<figure><img src="../icons/options/{k}-{o}.png" alt="{n} option {o}" width="{w}" height="{w}"><figcaption>Black and white</figcaption></figure>'
    return out
def guide_nav(cur):
    return '<nav class="bg-nav">' + "".join(f'<a class="{"on" if b["key"] == cur else ""}" href="{b["file"]}">{b["name"].split(" ·")[0]}</a>' for b in BG) + f'<a class="{"on" if cur == "apps" else ""}" href="apps.html">Apps</a></nav>'
for b in BG:
    sw = "".join(f'<div class="bg-sw"><i style="background:{h}"></i><b>{n}</b><code>{h}</code><span>{u}</span></div>' for n, h, u in b["colours"])
    ty = "".join(f'<div class="bg-ty"><span class="bg-k">{n} · {u}</span><p style="font-family:\'{fam}\';{css};font-size:{44 if i == 0 else 20}px;margin:6px 0 0;line-height:1.1">{"Every show starts here" if i == 0 else "Live availability for your dates, from the team that runs the show."}</p></div>' for i, (n, u, fam, css) in enumerate(b["fonts"]))
    ph = "".join(f'<img src="../img/{p}" alt="" loading="lazy">' for p in b["photos"])
    stand = '<p class="mute">Stand-in photos. Real truck and crew photos needed from Tour Trucking.</p>' if b["key"] == "ttl" else ""
    app = ""
    if b["app"]:
        an, ak, ah = b["app"]
        app = f'<section class="bg-sec"><span class="bg-k">05 · App</span><h2>{an}</h2><div class="bg-app">{figs(ak, an, 120)}</div><p>The client app shows only {b["name"].split(" ·")[0]}. <a href="{ah}">Open the app</a></p></section>'
    page = head(b["site"], "brand/" + b["file"], R, f'{b["name"]} brand guide', "Brand and style guide.").replace("</head>", f'<link rel="stylesheet" href="{R}brand.css"></head>') + f'''
<main class="bg" id="guide">
  {guide_nav(b["key"])}
  <header class="bg-hero"><span class="bg-k">Brand and style guide · draft for approval</span><div class="bg-logo">{b["logo"](R)}</div><h1>{b["name"]}</h1><p class="lead">{b["role"]}</p></header>
  <section class="bg-sec"><span class="bg-k">01 · Logo</span><h2>Use the logo as supplied</h2>
    <div class="bg-logos"><div class="bg-on dark">{b["logo"](R)}</div><div class="bg-on light">{b["logo"](R)}</div><div class="bg-on accent">{b["logo_sm"](R)}</div></div>
    <ul class="bg-rules"><li>Use the supplied files only. Never redraw, stretch, recolour outside this palette, or add effects.</li><li>Keep clear space around the logo equal to the height of its capital letters.</li><li>Smallest size: 120 px wide on screen, 30 mm in print.</li>{'' if b["key"] == "group" else '<li>Public-facing: never show another MAC company next to this logo. The line "A Division of MAC Group of Companies" is waiting on a decision.</li>'}</ul></section>
  <section class="bg-sec"><span class="bg-k">02 · Colour</span><h2>Palette</h2><div class="bg-sws">{sw}</div></section>
  <section class="bg-sec"><span class="bg-k">03 · Type</span><h2>Fonts</h2>{ty}<p class="mute">All free Google Fonts. Email uses Arial.</p></section>
  <section class="bg-sec"><span class="bg-k">04 · Voice and buttons</span><h2>How we sound</h2><ul class="bg-rules">{"".join(f"<li>{v}</li>" for v in b["voice"])}</ul>
    <div class="btns" style="margin-top:22px"><a class="btn" href="{b["site_link"]}">Build your quote</a><a class="btn ghost" href="{b["site_link"]}#contact">{icon("phone")}Get in touch</a></div>
    <div class="bg-photos">{ph}</div>{stand}</section>
  {app}
  <section class="bg-sec"><span class="bg-k">Email signature</span><h2>Only this company appears</h2><div class="bg-sig"><b>Your name</b><br>Your title<br>{b["name"]}<br><span class="mute">Phone · email · website</span></div></section>
</main>
<footer><div class="wrap"><div><a href="{b["site_link"]}">Open the {b["name"].split(" ·")[0]} site</a></div><div><a href="#" data-tour>Take a tour of what's changed</a></div></div></footer>
<script src="{R}mac.js"></script></body></html>'''
    write("brand/" + b["file"], page)

# App icon options side by side + index
APPS_OPT = [("MAC Show Systems", "mss", "Clients of MAC Show Systems", "../apps/mss/index.html"), ("PSI", "psi", "Clients of PSI", "../apps/psi/index.html"),
            ("Tour Trucking", "ttl", "Shippers and tour managers", "../apps/ttl/index.html"), ("MAC Hub", "hub", "Staff: employee dashboard, with Quotes inside", "../hub/index.html")]
rows = "".join(f'<div class="bg-arow"><div><h3>{n}</h3><p class="mute">{w}</p><a href="{h}">Open the app</a></div>{figs(k, n, 150)}</div>' for n, k, w, h in APPS_OPT)
appsg = head("group", "brand/apps.html", R, "App names and icons", "App icon options.").replace("</head>", f'<link rel="stylesheet" href="{R}brand.css"></head>') + f'''
<main class="bg" id="guide">
  {guide_nav("apps")}
  <header class="bg-hero"><span class="bg-k">Apps · black and white</span><h1>App names and icons</h1><p class="lead">Every app installs on a phone or a desktop with its own name and icon. Client apps carry one brand only. Staff apps carry MAC Group.</p></header>
  <section class="bg-sec">{rows}</section>
  <section class="bg-sec"><span class="bg-k">Install</span><h2>Put an app on a phone or desktop</h2><ul class="bg-rules"><li>iPhone: open the app link in Safari, tap Share, then Add to Home Screen.</li><li>Android: open it in Chrome, tap the menu, then Install app.</li><li>Desktop: open it in Chrome or Edge and click the install icon at the right of the address bar. On a Mac in Safari: File, then Add to Dock.</li></ul></section>
</main>
<script src="{R}mac.js"></script></body></html>'''
write("brand/apps.html", appsg)
write("brand/index.html", '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=group.html"><title>Brand guides</title><a href="group.html">Brand guides</a>')
print("built brand guides")

# =====================================================================================
# MAC SHOW SYSTEMS: extra pages (build your quote, rentals, case studies, venues, planning help)
# =====================================================================================
R = "../"
MNAV = [("What we do", "index.html#services"), ("Case studies", "case-studies.html"), ("Venues", "venues.html"), ("Plan your event", "planning.html")]
def mpage(fname, title, desc, img, alt, eyebrow, h1, lede, body, scripts=""):
    h = head("mac", f"show-systems/{fname}", R, f"{title} · MAC Show Systems", desc) + header(m_mark, MNAV, "quote.html", R) + f'''
<main>
<section class="hero short" id="hero"><div class="slides"><img src="{R}img/{img}" alt="{alt}" data-label=""></div>
  <div class="wrap"><span class="eyebrow">{eyebrow}</span><h1>{h1}</h1><p class="lede">{lede}</p></div></section>
{body}
</main>
''' + contact("Let's make your event.", "Questions about gear, a venue or a tour? Send us a note.", "125 Bermondsey Rd, North York, ON M4A 1X3", "info@macshowsystems.com", ["Rental", "Equipment purchase", "Venue installation", "National tour", "Show management"]) + foot(R, '<div>' + mlogo("mss", 200, R) + '<br><span class="mute">© 2026 MAC Show Systems Inc.</span></div>') + f'''<script src="{R}tools.js"></script>
<script>const T = window.MACTOOLS; document.querySelectorAll("[data-form]").forEach(f => T.sendForm(f, "Our team will get back to you shortly."));{scripts}</script>
</body></html>'''
    write(f"show-systems/{fname}", h.replace('href="index.html"', 'href="index.html"'))

STARTERS = [("Outdoor festival", "ostage:L,concert:L,slight:L,led:L", "mac-hero.webp"),
            ("Conference with keynote", "speech:M,proj:M,conf:M,podium:M,cam:S", "mac-solution-video.webp"),
            ("Gala dinner", "stage:M,speech:M,led:M,uplight:M,slight:S,podium:M", "mac-venue-1.webp"),
            ("Wedding reception", "speech:S,uplight:M,truss:S,slight:S", "mac-venue-2.webp")]
st = "".join(f'<a class="starter" href="quote.html?need={q}#quote"><img src="{R}img/{im}" alt=""><span>Start with</span><b>{n}</b></a>' for n, q, im in STARTERS)
mpage("quote.html", "Build your quote", "Build your quote request.", "mac-solution-staging.webp", "Stage with draping and truss", "Build your quote", "Your dates. Your gear. Your quote.",
  "Tell us your dates and what your event needs. Our team builds the right setup and sends your quote.", f'''
<section class="pad" style="padding-bottom:0"><div class="wrap"><span class="eyebrow">Step 1 · Start fast</span><h2>Start from an event like yours.</h2>
  <p class="lead" style="margin-top:16px">Pick a starting point and change anything. Or start from scratch below.</p><div class="starters">{st}</div></div></section>
<section id="quote" class="pad"><div class="wrap"><span class="eyebrow">Step 2 · Dates and needs</span><h2>Tell us what you need.</h2>
  <div class="tool"><span class="sample-tag">Preview: requests are not sent yet</span><div id="quote-tool"></div></div></div></section>
<section id="planner" class="pad" style="padding-top:0"><div class="wrap"><span class="eyebrow">Step 3 · Optional</span><h2>Lay out the room.</h2>
  <p class="lead" style="margin-top:16px">Drag stages, screens and speakers into your room. The layout goes with your request.</p>
  <div class="tool"><span class="sample-tag">Preview</span><div id="planner-tool"></div></div></div></section>''',
  'T.quote(document.getElementById("quote-tool"), { prefix: "mac" }); T.planner(document.getElementById("planner-tool"), { prefix: "mac" });')

CASES = [("mac-hero.webp", "Outdoor festival stage", "Festival", ["Outdoor stage", "Concert sound", "LED wall", "Stage lighting"]),
         ("mac-venue-1.webp", "Gala dinner", "Gala", ["Stage and podium", "LED wall", "Uplighting and floral lighting", "Wireless microphones"]),
         ("mac-venue-3.webp", "Gala in a heritage building", "Gala", ["Architectural uplighting", "Projection", "Audio for speeches"]),
         ("mac-solution-backline.webp", "Theatre production", "Theatre", ["Stage lighting", "Sound reinforcement", "Show operation"]),
         ("mac-venue-2.webp", "Wedding reception", "Wedding", ["Ambient lighting", "Dance floor audio", "Draping and truss"]),
         ("mac-solution-video.webp", "Video in a historic venue", "Video", ["Screens over the stage", "Projection", "Camera and switching"])]
cs = "".join(f'''<article class="case"><img src="{R}img/{im}" alt="{t}"><div class="case-b"><span class="eyebrow">{k}</span><h3>{t}</h3>
  <dl><dt>The brief</dt><dd><span class="todo">Client, venue and brief from MAC</span></dd><dt>What we brought</dt><dd>{", ".join(g)}</dd><dt>How it went</dt><dd><span class="todo">Result and quote from the client, with their OK</span></dd></dl>
  <a class="btn sm" href="quote.html?need=led:M,speech:M,slight:M#quote">Plan something like this</a></div></article>''' for im, t, k, g in CASES)
mpage("case-studies.html", "Case studies", "Events MAC Show Systems has produced.", "mac-work-2.webp", "Concert crowd under stage lights", "Case studies", "Shows we've made.",
  "Real MAC Show Systems events. Each one shows the brief, the gear and how it went, so planners can picture their own.", f'''
<section class="pad"><div class="wrap"><p class="owner-note">Owners only: photos are MAC's own. Project names, briefs and results are placeholders until MAC confirms each one and the client agrees to be named.</p><div class="cases">{cs}</div></div></section>''')

mpage("venues.html", "Venues", "Venue partners and in-house AV.", "mac-venue-4.webp", "Candlelit dinner with uplighting", "Venues", "Know the room before you walk in.",
  "We know these rooms: power, rigging points, load-in and what looks best. Planners get a faster quote. Venues get a partner their clients trust.", f'''
<section class="pad"><div class="wrap"><span class="eyebrow">Venues we work in</span><h2>Pick your venue. We'll start the plan.</h2>
  <div class="venues">{"".join(f'<a class="venue" href="quote.html#quote"><img src="{R}img/{im}" alt=""><b><span class="todo">Venue name from MAC</span></b><span>Room layouts and load-in notes on file</span></a>' for im in ["mac-venue-1.webp", "mac-venue-2.webp", "mac-venue-3.webp", "mac-venue-4.webp"])}</div></div></section>
<section class="plan-band"><img src="{R}img/mac-venue-3.webp" alt="Gala in a heritage building">
  <div class="wrap"><span class="eyebrow">For venues</span><h2 style="max-width:15ch">Become a venue partner.</h2>
  <p class="lead" style="margin-top:20px;color:#E6E2D8">Preferred-supplier status, your rooms pre-loaded in our floor planner, and a team that knows your building. Your clients get a faster, smoother event.</p>
  <div class="btns"><a class="btn" href="#partner">Apply to partner</a></div></div></section>
<section id="partner" class="pad"><div class="wrap split" style="align-items:start"><div><span class="eyebrow">Venue partner program</span><h2>Tell us about your venue.</h2><p class="lead" style="margin-top:18px">We'll visit, map your rooms and add them to the planner.</p></div>
  <form class="tool" data-form><div class="form-grid"><label class="field"><span>Venue</span><input required></label><label class="field"><span>City</span><input></label><label class="field"><span>Your name</span><input required></label><label class="field"><span>Email</span><input type="email" required></label></div>
  <label class="field"><span>Rooms and capacity</span><textarea rows="3"></textarea></label><button class="btn">Apply to partner</button></form></div></section>''')

FAQ = [("How far ahead should I book?", "As early as you can. Send a quote request any time; busy season fills first."),
       ("Do you deliver, set up and run the show?", "Yes. Delivery, setup, show technicians and strike can all be added to your quote."),
       ("Can I see the gear in my room first?", "Use the floor planner to lay out your room, and our team will check it against the venue."),
       ("Do I need power or rigging information?", "Send what you have from the venue. We'll confirm power and rigging before load-in."),
       ("Can I get a certificate of insurance?", "Yes. Request one below and we'll send it for your venue."),
       ("Do you work outside Toronto?", "Yes. We handle national rentals and tours.")]
faq = "".join(f"<details class='faq'><summary>{q}</summary><p>{a}</p></details>" for q, a in FAQ)
mpage("planning.html", "Plan your event", "Planning help, FAQ and documents.", "mac-work-3.webp", "Dance floor and screen at a reception", "Plan your event", "Everything you need before load-in.",
  "Answers to the questions planners ask most, plus the documents your venue will want.", f'''
<section class="pad"><div class="wrap split" style="align-items:start"><div><span class="eyebrow">Questions</span><h2>Planner questions, answered.</h2><p class="owner-note" style="margin-top:16px">Owners only: answers to confirm with MAC.</p></div><div>{faq}</div></div></section>
<section class="pad" style="padding-top:0"><div class="wrap split" style="align-items:start"><div><span class="eyebrow">Documents</span><h2>Get what your venue needs.</h2>
  <p class="lead" style="margin-top:18px">Certificate of insurance, gear spec sheets, power needs and a load-in plan, sent for your event.</p></div>
  <form class="tool" data-form><div class="form-grid"><label class="field"><span>What do you need?</span><select><option>Certificate of insurance</option><option>Spec sheets</option><option>Power requirements</option><option>Load-in plan</option></select></label>
  <label class="field"><span>Event date</span><input type="date"></label><label class="field"><span>Venue</span><input></label><label class="field"><span>Email</span><input type="email" required></label></div><button class="btn">Request documents</button></form></div></section>
<section class="pad" style="padding-top:0"><div class="wrap"><span class="eyebrow">Next step</span><h2>Ready when you are.</h2>{two_buttons("quote.html")}</div></section>''')
print("built MSS pages")

# MAC Hub: Connections (pitch mock-up; nothing is connected)
CONN = [("BrightHR or ADP", "HR and payroll", "Not connected · needs sign-off",
         ["Staff list, roles and who works for which company", "Time off and sick days block crew from being booked", "Hours from Crew Call go to payroll", "New hires get MAC Hub access automatically, and leavers lose it"]),
        ("Current RMS", "Rental software in use today", "Not connected · needs sign-off",
         ["Inventory and bookings stay in Current RMS: no double entry", "MAC Hub reads live stock for staff quotes", "Approved quotes become Current RMS orders", "Client apps show event status, never gear lists"]),
        ("Email and calendar", "Each company's own email", "Not connected · needs sign-off",
         ["Quotes go out from the selling company's own address", "Load-ins and shows land on the right calendars"]),
        ("Accounting", "Invoices and payments", "To confirm which system", ["Approved quotes become invoices under the right company"])]
cards = "".join(f'''<div class="cx"><div class="cx-h"><div><h3>{n}</h3><p class="mute">{w}</p></div><span class="pill wait">{st}</span></div><ul>{"".join(f"<li>{x}</li>" for x in l)}</ul><button class="btn ghost sm" data-req>Request access</button></div>''' for n, w, st, l in CONN)
chtml = head("hub", "hub/connections.html", R, "MAC Hub Connections", "Systems MAC Hub connects to.").replace('<link rel="stylesheet"', HUBHEAD, 1).replace("</head>", f'<link rel="stylesheet" href="{R}app.css"></head>').replace('<div class="sample">', '<div class="sample" style="background:#FFFFFF;color:#0F1115">') + f'''
<div class="hub" id="conn">
  <aside class="hub-rail">
    <div class="hub-brand">{mlogo("mgcm", 110, R)}<b>Hub</b><span>Staff only</span></div>
    <nav class="hub-tabs">
      <a class="hub-tablink" href="index.html">{icon("calendar","sm")}Today</a>
      <a class="hub-tablink" href="quote.html">{icon("tag","sm")}Quote Builder</a>
      <a class="hub-tablink" href="index.html#inv">{icon("box","sm")}Inventory</a>
      <a class="hub-tablink on" href="connections.html">{icon("hub","sm")}Connections</a>
    </nav>
    <a class="hub-back" href="../index.html">Back to MAC Group</a>
  </aside>
  <main class="hub-main">
    <div class="hub-top"><div><span class="eyebrow">Connections · ready to set up once approved</span><h1 class="hub-h">One hub. The systems you already use.</h1></div></div>
    <p class="mute" style="max-width:62ch">MAC Hub sits on top of what MAC already runs, so nobody changes how they work. Nothing is connected yet: each connection needs sign-off on permissions first, and only reads what it needs.</p>
    <div class="cxs">{cards}</div>
  </main>
</div>
<div id="toast" role="status"></div>
<script src="{R}mac.js"></script>
<script>document.addEventListener("click", e => {{ const b = e.target.closest("[data-req]"); if (!b) return; b.textContent = "Access request drafted (demo)"; b.disabled = true; }});</script>
</body></html>'''
write("hub/connections.html", chtml)
print("built connections")
