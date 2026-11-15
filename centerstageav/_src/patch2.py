p='tools/build.py';s=open(p).read()
def rep(a,b):
    global s
    assert a in s, a[:90]
    s=s.replace(a,b,1)
rep("family=Unbounded:wght@700;800","family=Archivo:wdth,wght@100..125,600..900")
NAV='<a href="/#services">Services</a><a href="/#events">Events</a><a href="/#work">Our work</a><a href="/rentals/">Rentals</a><a href="/#story">Who we are</a>'
rep('<nav aria-label="Main"><a href="#services">Services</a><a href="#events">Events</a><a href="#work">Our work</a><a href="#story">Who we are</a><a href="#studio">Virtual Studio</a></nav>','<nav aria-label="Main">'+NAV+'</nav>')
rep('<a class="big" href="#services">Services</a><a class="big" href="#events">Events</a><a class="big" href="#work">Our work</a><a class="big" href="#story">Who we are</a><a class="big" href="#studio">Virtual Studio</a>',
 '<a class="big" href="/#services">Services</a><a class="big" href="/#events">Events</a><a class="big" href="/#work">Our work</a><a class="big" href="/rentals/">Rentals</a><a class="big" href="/#story">Who we are</a><a class="big" href="/#faq">FAQ</a><div class="mini"><a href="/quote/">Quote tool</a><a href="/portal/">Client portal</a><a href="/crew/">Crew portal</a><a href="/careers/">Careers</a></div>')
rep('<option>Virtual</option></select></label></div></div>',
 '<option>Virtual</option></select></label><label class="full chk"><input type="checkbox" name="visit" value="yes"> I’d like a site visit at the venue</label></div></div>')
TOOLS='''<section class="sec tools" id="tools"><div class="wrap">
 <div class="kick mono">Your toolkit</div><h2>Plan it, track it,<br>rebook it.</h2>
 <p class="lead" style="margin-top:18px">Everything a planner needs from us, in one place, on any phone.</p>
 <div class="tgrid">
  <a class="tcard" href="/quote/"><span class="mono">01 &middot; App</span><h3>Quote tool</h3><p>Event, date, size and needs in under two minutes. Our team checks crews and gear for your date and replies with options.</p><span class="go">Open the quote tool {I['r']}</span></a>
  <a class="tcard" href="/portal/"><span class="mono">02 &middot; Clients</span><h3>Client portal</h3><p>Your proposal, floor plans, renderings, show flow and invoices for every event, plus one-tap rebooking.</p><span class="go">See the client portal {I['r']}</span></a>
  <a class="tcard" href="/rentals/"><span class="mono">03 &middot; Rentals</span><h3>Rentals</h3><p>Audio, lighting, LED, projection and staging for your own team or venue, with or without our technicians.</p><span class="go">Browse rentals {I['r']}</span></a>
  <a class="tcard" href="/crew/"><span class="mono">04 &middot; Team</span><h3>Crew portal</h3><p>Call times, show documents, pull sheets and timesheets for our own crew, on their phones.</p><span class="go">See the crew portal {I['r']}</span></a>
 </div>
 <div class="venues"><div><div class="kick mono">Venue partners</div><h3>Planning at a venue we know?</h3><p>We work in hotels and venues across the GTA and North America. Partner venues get room specs, power and rigging details on file, so your quote comes back faster.</p></div>
 <div class="vgrid">{vph}</div></div>
 <p class="ph-line"><span class="ph-note">Placeholder</span> Venue partner names and logos to come from Center Stage AV.</p>
</div></section>
'''
NEWS='''<section class="sec faq" id="faq"><div class="wrap fgrid"><div><div class="kick mono">FAQ</div><h2>Good<br>questions.</h2><p class="lead" style="margin-top:18px">What planners ask us most. Something else? <a href="#contact">Get in touch</a>.</p></div><div>{faqh}</div></div></section>
<section class="sec news" id="news"><div class="wrap">
 <div class="kick mono">News &amp; insights</div><h2>From our crew.</h2>
 <div class="ngrid">
  <a class="art" href="https://www.centerstageav.com/bringing-purpose-to-production-how-smart-stage-design-and-show-flow-elevate-your-event-with-center-stage-av/" target="_blank" rel="noopener"><img src="/img/art-purpose.webp" alt="" loading="lazy" draggable="false"><span class="mono">Insight</span><h3>Bringing purpose to production: how smart stage design and show flow elevate your event</h3></a>
  <a class="art" href="https://www.centerstageav.com/why-team-composition-is-everything-in-event-production-the-center-stage-av-advantage/" target="_blank" rel="noopener"><img src="/img/art-team.webp" alt="" loading="lazy" draggable="false"><span class="mono">Insight</span><h3>Why team composition is everything in event production</h3></a>
  <form class="nl" id="nl"><span class="mono" style="color:var(--cr2)">Newsletter</span><h3>Show notes, once a month</h3><p>Stage ideas, new technology and planning tips for your next event. No spam.</p><input id="nle" type="email" aria-label="Email" placeholder="you@company.com" required autocomplete="email"><button class="btn btn-cr" type="submit">Subscribe</button><p class="ok" hidden>Thanks. You’re on the list.</p><p class="tiny"><span class="ph-note">Placeholder</span> Connects to Center Stage AV’s email tool once chosen.</p></form>
 </div></div></section>
'''
rep('<section class="sec qb" id="quote">',TOOLS+'<section class="sec qb" id="quote">')
rep('<section class="sec ct" id="contact">',NEWS+'<section class="sec ct" id="contact">')
rep('<div><h4>Explore</h4><ul><li><a href="#services">Services</a></li><li><a href="#events">Events</a></li><li><a href="#work">Our work</a></li><li><a href="#story">Who we are</a></li><li><a href="#studio">Virtual Studio</a></li></ul></div>',
 '<div><h4>Explore</h4><ul><li><a href="/#services">Services</a></li><li><a href="/#events">Events</a></li><li><a href="/#work">Our work</a></li><li><a href="/rentals/">Rentals</a></li><li><a href="/#studio">Virtual Studio</a></li><li><a href="/#faq">FAQ</a></li><li><a href="/careers/">Careers</a></li></ul></div>')
rep('<div><h4>Next steps</h4><ul><li><a href="#quote" data-quote>Build your quote</a></li><li><a href="#contact">Get in touch</a></li>',
 '<div><h4>Next steps</h4><ul><li><a href="/quote/">Quote tool</a></li><li><a href="/portal/">Client portal</a></li><li><a href="/crew/">Crew portal</a></li><li><a href="/#contact">Get in touch</a></li>')
# vars in index()
rep("    tick=''.join(", '''    faqh=''.join(f'<details class="fq"><summary><span>{E(q)}</span>{I["plus"]}</summary><p>{E(a)}</p></details>' for q,a in FAQ)
    vph=''.join('<div><span class="ph-note">Venue logo</span></div>' for _ in range(6))
    tick=''.join(''')
FAQ='''FAQ=[('Where do you work?','Anywhere in North America, from our offices in Mississauga, Fort Lauderdale and San Diego. For events outside North America, we offer technical consultation and production management.'),
('Can you work within our budget?','Yes. We don\\u2019t believe in one size fits all. Every event is tailored to your needs, budget and vision, pairing budget-conscious planning with high-end execution.'),
('Do you handle hybrid and virtual events?','Yes. We stream in high definition across platforms, add polling and audience tools, and run our own Center Stage Virtual Studio for broadcasts.'),
('Can you create the content for our show?','Yes. Our in-house animators, graphic designers, videographers, editors and producers create custom content for your event.'),
('Will we see the room before show day?','Yes. We provide 2D and 3D set renderings, AutoCAD floor plans and show flow documents, so you can see the room before we load in.'),
('Can we book a site visit?','Yes. Tick \\u201cI\\u2019d like a site visit\\u201d in the quote builder and our team will arrange a time at your venue.'),
('How far ahead should we book?','[Placeholder: Center Stage AV to confirm typical lead times for meetings, conferences and galas.]'),
('Are your events eco-friendly?','We use energy-efficient LED lighting and digital signage, which cut power use and printed waste at every event.')]
'''
rep("def loader_svg():", FAQ+"\ndef loader_svg():")
open(p,'w').write(s); print('patched')
