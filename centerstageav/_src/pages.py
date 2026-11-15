# Sub-pages: quote tool app, client portal, crew portal, rentals, careers. Run after build.py.
import os, sys
sys.argv = [sys.argv[0], '/tmp/_ignore_logos']
sys.path.insert(0, os.path.dirname(__file__))
import build as B
I, E, head, SOC = B.I, B.E, B.head, B.SOC
ROOT = B.ROOT
SAMPLE = '<span class="ph-note">Sample data</span>'

def shell(title, desc, main, app=False, extra=''):
    soc = ''.join(f'<a href="{u}" target="_blank" rel="noopener" aria-label="{n}">{s}</a>' for n, (u, s) in SOC.items())
    nav = '<a href="/#services">Services</a><a href="/#events">Events</a><a href="/#work">Our work</a><a href="/rentals/">Rentals</a><a href="/#faq">FAQ</a>'
    hdr = f'''<header class="hdr solid" id="hdr"><div class="wrap"><a class="brand" href="/" aria-label="Center Stage AV home"><img src="/img/logo.svg" alt="Center Stage AV" width="1050" height="230" draggable="false"></a>
<nav aria-label="Main">{nav}</nav><div class="acts"><a class="btn btn-cr" href="/quote/">{I["quote"]}Build your quote</a><a class="btn btn-ln" href="/#contact">{I["phone"]}Get in touch</a></div><a class="qmini" href="/quote/">Build your quote</a><button class="burger" id="burger" aria-label="Open menu">{I['menu']}</button></div></header>
<div class="menu" id="menu" aria-hidden="true"><button class="x" id="mclose" aria-label="Close menu">{I['x']}</button>
<a class="big" href="/">Home</a><a class="big" href="/#services">Services</a><a class="big" href="/rentals/">Rentals</a><a class="big" href="/quote/">Quote tool</a><a class="big" href="/portal/">Client portal</a><a class="big" href="/#faq">FAQ</a><div class="mini"><a href="/crew/">Crew portal</a><a href="/careers/">Careers</a><a href="/#contact">Get in touch</a></div>
<div class="acts"><a class="btn btn-cr" href="/quote/">{I["quote"]}Build your quote</a><a class="btn btn-ln" href="/#contact">{I["phone"]}Get in touch</a></div></div>'''
    foot = f'''<footer><div class="wrap"><div class="top"><div><img class="f" src="/img/logo.svg" alt="Center Stage AV" draggable="false"><div class="soc">{soc}</div></div>
<div><h4>Explore</h4><ul><li><a href="/">Home</a></li><li><a href="/rentals/">Rentals</a></li><li><a href="/careers/">Careers</a></li><li><a href="/#faq">FAQ</a></li></ul></div>
<div><h4>Tools</h4><ul><li><a href="/quote/">Quote tool</a></li><li><a href="/portal/">Client portal</a></li><li><a href="/crew/">Crew portal</a></li><li><a href="/brand/">Logo refresh options</a></li></ul></div></div>
<div class="bot mono"><span>&copy; 2026 Center Stage AV. All rights reserved.</span><span>Concept preview</span></div></div></footer>'''
    return head(title, desc, extra + '<link rel="stylesheet" href="/sub.css">') + f'<body class="sub{" appview" if app else ""}">{hdr}<main>{main}</main>{"" if app else foot}<script src="/app.js"></script></body></html>'

def hero(kick, h, p, img=None):
    bg = f'<div class="ph-bg"><img src="{img}" alt="" draggable="false"></div>' if img else ''
    return f'<section class="phero">{bg}<div class="wrap"><div class="kick mono">{kick}</div><h1>{h}</h1><p class="lead">{p}</p></div></section>'

# ---------------- Quote tool (app-style, date requests, never prices)
def quote():
    types = ['Meetings & Seminars', 'Conferences & Conventions', 'Galas & Awards', 'Trade Shows & Exhibits', 'Social & Entertainment', 'Hybrid & Virtual', 'Virtual Studio booking', 'Rental only', 'Something else']
    svcs = [t for k, t, d in B.SERVICES] + ['Content creation', 'Stage management', 'Technicians only']
    ch = lambda name, vals, kind: ''.join(f'<label class="chip"><input type="{kind}" name="{name}" value="{E(v)}"><span>{E(v)}</span></label>' for v in vals)
    main = f'''<section class="qapp"><div class="qa-top"><div class="wrap"><span class="mono">Quote tool</span><div class="qa-bar"><i id="qabar"></i></div><span class="mono" id="qastep">1 / 6</span></div></div>
<form class="wrap qa" id="qa" novalidate>
 <div class="qs on" data-s="0"><h1>What are you planning?</h1><p class="hint">Pick the closest match.</p><div class="chips">{ch('type', types, 'radio')}</div></div>
 <div class="qs" data-s="1"><h1>When is it?</h1><p class="hint">Our team checks crews and gear for your date and confirms within one business day.</p><div class="fl">
  <label>First day<input type="date" name="date"></label><label>Days<select name="days"><option>1</option><option>2</option><option>3</option><option>4+</option></select></label>
  <label class="full chk"><input type="checkbox" name="flex" value="yes"> Our dates are flexible</label></div></div>
 <div class="qs" data-s="2"><h1>Where and how big?</h1><p class="hint">Rough is fine.</p><div class="fl">
  <label class="full">Venue or city<input name="venue" placeholder="e.g. a hotel ballroom in Toronto"></label>
  <label>Guests<select name="guests"><option value="">Choose</option><option>Under 100</option><option>100 to 300</option><option>300 to 1,000</option><option>1,000+</option></select></label>
  <label>Format<select name="format"><option>In person</option><option>Hybrid</option><option>Virtual</option></select></label>
  <label class="full chk"><input type="checkbox" name="visit" value="yes"> I&rsquo;d like a site visit at the venue</label></div></div>
 <div class="qs" data-s="3"><h1>What do you need?</h1><p class="hint">Choose any. Not sure? Skip it and we&rsquo;ll recommend.</p><div class="chips">{ch('svc', svcs, 'checkbox')}</div></div>
 <div class="qs" data-s="4"><h1>Where do we send options?</h1><p class="hint">We only use this to reply to you.</p><div class="fl">
  <label>Name<input name="name" autocomplete="name" required></label><label>Company<input name="company" autocomplete="organization"></label>
  <label>Email<input type="email" name="email" autocomplete="email" required></label><label>Phone<input type="tel" name="phone" autocomplete="tel"></label>
  <label class="full">Anything else?<textarea name="notes" rows="3"></textarea></label></div></div>
 <div class="qs" data-s="5"><h1>Ready to send</h1><p class="hint">Tap send and it opens in your email, addressed to our team. Nothing is booked until we confirm.</p><pre id="qasum"></pre><a class="btn btn-cr" id="qasend" href="#">{I['quote']}Send my request</a></div>
 <div class="qa-nav"><button type="button" class="btn btn-ln" id="qaback">Back</button><button type="button" class="btn btn-cr" id="qanext">Next</button></div>
</form>
<p class="wrap tiny-note"><span class="ph-note">Placeholder</span> Sends by email today. Can connect to Center Stage AV&rsquo;s booking or CRM system so requests land as leads with the date held.</p></section>'''
    return shell('Quote tool | Center Stage AV', 'Request a quote from Center Stage AV in under two minutes.', main, app=True)

# ---------------- Client portal (concept with sample data)
def portal():
    tl = [('Proposal approved', 'done'), ('Site visit', 'done'), ('Floor plan and 3D render', 'now'), ('Show flow sign-off', ''), ('Load-in', ''), ('Show day', '')]
    tlh = ''.join(f'<li class="{c}"><i></i><span>{E(t)}</span></li>' for t, c in tl)
    docs = [('Proposal', 'PDF'), ('AutoCAD floor plan', 'PDF'), ('3D set render', 'Image'), ('Show flow', 'Doc'), ('Deposit invoice', 'PDF')]
    dh = ''.join(f'<li><span>{E(n)}</span><span class="mono">{t}</span></li>' for n, t in docs)
    main = f'''{hero('Client portal', 'Every event,<br>one sign-in.', 'Proposals, floor plans, renderings, show flow, invoices and messages with your producer. Then rebook next year in one tap.')}
<section class="sec portal"><div class="wrap pgrid">
 <form class="signin" id="signin"><h3>Sign in</h3><label>Email<input type="email" placeholder="you@company.com" autocomplete="email"></label><label>Password<input type="password" autocomplete="current-password"></label><button class="btn btn-cr" type="button" id="demo">View the sample portal</button><p class="tiny">{SAMPLE} Sign-in is a demo. The live portal connects to Center Stage AV&rsquo;s event system.</p></form>
 <div class="dash on" id="dash"><div class="dh"><div><span class="mono">Next event {SAMPLE}</span><h3>Annual Awards Gala</h3><p class="mute">Saturday, 6 June 2027 &middot; Hotel ballroom, Toronto &middot; 400 guests</p></div><span class="count mono" id="count">204 days to go</span></div>
  <div class="cols3"><div class="box"><h4>Where things stand</h4><ol class="tl">{tlh}</ol></div>
  <div class="box"><h4>Documents</h4><ul class="docs">{dh}</ul></div>
  <div class="box"><h4>Your producer</h4><p class="mute">Questions, changes and approvals in one thread, with every file attached.</p><div class="msg"><b>Producer</b><p>Floor plan v2 is up. Stage moved 2 m back for the dance floor. Can you approve by Friday?</p></div><a class="btn btn-ln" href="/#contact">Message your producer</a></div></div>
  <div class="cols2"><div class="box up"><h4>Add to your show</h4><p class="mute">Live streaming for remote guests, a photo and video recap, a branded welcome loop on the screens.</p><a class="btn btn-cr" href="/quote/">Add to my quote</a></div>
  <div class="box up"><h4>Rebook for next year</h4><p class="mute">Same room, same crew, same look. We hold your date while you confirm.</p><a class="btn btn-cr" href="/quote/">Rebook this event</a></div></div>
 </div></div></section>'''
    return shell('Client portal | Center Stage AV', 'Center Stage AV client portal concept.', main)

# ---------------- Crew portal
def crew():
    shifts = [('Mon', 'Load-in, hotel ballroom, Toronto', '6:00 AM'), ('Tue', 'Conference day 1, convention centre', '6:30 AM'), ('Wed', 'Conference day 2', '7:00 AM'), ('Thu', 'Strike and load-out', '4:00 PM')]
    sh = ''.join(f'<li><span class="mono">{d}</span><span>{E(t)}</span><b>{c}</b></li>' for d, t, c in shifts)
    main = f'''{hero('Crew portal', 'Your shows,<br>in your pocket.', 'For the Center Stage AV crew: call times, venue details, show documents, pull sheets and timesheets. One login, on any phone.')}
<section class="sec portal"><div class="wrap">
 <div class="dash on"><div class="dh"><div><span class="mono">This week {SAMPLE}</span><h3>4 calls</h3></div><a class="btn btn-ln" href="#">Set my availability</a></div>
 <div class="cols3"><div class="box"><h4>Call times</h4><ul class="shifts">{sh}</ul></div>
 <div class="box"><h4>Today&rsquo;s show</h4><ul class="docs"><li><span>Venue access and parking</span><span class="mono">Map</span></li><li><span>Show flow</span><span class="mono">Doc</span></li><li><span>Pull sheet</span><span class="mono">List</span></li><li><span>Stage plot and patch</span><span class="mono">PDF</span></li><li><span>Producer contact</span><span class="mono">Chat</span></li></ul></div>
 <div class="box"><h4>Timesheet</h4><p class="mute">Clock in and out on site. Hours go straight to payroll.</p><div class="clock"><b>On site</b><span class="mono">6:02 AM</span></div><a class="btn btn-cr" href="#">Clock out</a></div></div>
 <div class="cols2"><div class="box"><h4>Safety and training</h4><p class="mute">Rigging, working at heights and venue rules, with sign-off when complete.</p></div><div class="box"><h4>Open shifts</h4><p class="mute">Extra calls posted by the office. Tap to request one.</p></div></div>
 </div><p class="tiny-note">{SAMPLE} Every name, venue and time here is an example. Connects to Center Stage AV&rsquo;s scheduling and payroll tools once chosen.</p></div></section>'''
    return shell('Crew portal | Center Stage AV', 'Center Stage AV crew portal concept.', main)

# ---------------- Rentals
def rentals():
    cats = [('audio', 'Audio', 'Speakers, mixing consoles, wireless microphones and monitoring for rooms of any size.'),
            ('lighting', 'Lighting', 'LED wash and moving lights, uplighting and control, eco-friendly and economical.'),
            ('led', 'LED walls', 'Indoor LED video walls and processing, sized to your stage.'),
            ('mapping', 'Projection', 'Projectors, screens and media servers, including projection mapping.'),
            ('present', 'Presentation', 'Confidence monitors, switchers, laptops and clickers for flawless presentations.'),
            ('signage', 'Digital signage', 'Touchscreens, digital podiums and banners with content updated live.'),
            ('set', 'Staging and set', 'Stage decks, drape and set pieces, stock or custom.'),
            ('stream', 'Streaming kits', 'Cameras, encoders and audience tools for hybrid and virtual events.')]
    cards = ''.join(f'''<article class="rcat"><img src="/img/svc-{k}.webp" alt="{E(t)}" loading="lazy" draggable="false"><div><h3>{E(t)}</h3><p>{E(d)}</p>
<div class="rbtns"><a class="btn btn-cr" href="/quote/?type=Rental%20only&svc={E(t)}">Request {E(t if t.startswith("LED") else t.lower())}</a></div></div></article>''' for k, t, d in cats)
    main = f'''{hero('Rentals', 'Rent the gear.<br>Add the crew.', 'Running your own show? Rent from the same inventory we use for our productions, delivered and set up by our technicians, or ready for pickup in Mississauga.', '/img/work/w155.webp')}
<section class="sec"><div class="wrap"><div class="rgrid">{cards}</div>
<div class="howr"><div><span class="mono">01</span><h4>Tell us your date</h4><p>Pick categories and your event date in the quote tool.</p></div><div><span class="mono">02</span><h4>We check it&rsquo;s free</h4><p>Our team confirms availability and suggests what fits.</p></div><div><span class="mono">03</span><h4>Delivery or pickup</h4><p>Delivered and set up by our crew, or picked up from Mississauga.</p></div></div>
<p class="tiny-note"><span class="ph-note">Placeholder</span> Item lists, quantities and rental terms to come from Center Stage AV. No prices shown.</p></div></section>'''
    return shell('Rentals | Center Stage AV', 'Audio visual rentals from Center Stage AV.', main)

# ---------------- Careers
def careers():
    main = f'''{hero('Careers', 'Join the<br>crew.', 'Technicians, producers, designers and editors who care about getting every show right. If that sounds like you, we&rsquo;d like to hear from you.', '/img/work/w160.webp')}
<section class="sec"><div class="wrap cgrid"><div><h2>Why Center Stage</h2><ul class="why"><li>Shows across North America, from boardrooms to ballrooms</li><li>Latest LED, lighting, audio and streaming technology</li><li>An in-house team of animators, designers, videographers and producers</li></ul></div>
<div class="box"><h3>Open roles</h3><p class="mute" style="margin:10px 0 18px"><span class="ph-note">Placeholder</span> Current openings to come from Center Stage AV.</p>
<a class="btn btn-cr" href="mailto:info@centerstageav.com?subject=Joining%20the%20crew">Send us your resume</a></div></div></section>'''
    return shell('Careers | Center Stage AV', 'Careers at Center Stage AV.', main)

if __name__ == '__main__':
    for d, fn in [('quote', quote), ('portal', portal), ('crew', crew), ('rentals', rentals), ('careers', careers)]:
        os.makedirs(os.path.join(ROOT, d), exist_ok=True)
        open(os.path.join(ROOT, d, 'index.html'), 'w').write(fn())
    print('pages built')
