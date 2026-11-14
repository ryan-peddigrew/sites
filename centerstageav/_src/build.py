# Builds the Center Stage AV concept site. Run: python3 tools/build.py
import os, sys, html
sys.argv = [sys.argv[0], os.path.join(os.path.dirname(__file__), '..', 'site', 'brand')]
sys.path.insert(0, os.path.dirname(__file__))
import logos as L  # also regenerates brand SVGs
ROOT = os.path.join(os.path.dirname(__file__), '..', 'site')
E = html.escape

# ---------- icons (line, full size) ----------
I = {
 'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/></svg>',
 'quote': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
 'plus': '<svg class="pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v16M4 12h16"/></svg>',
 'l': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 'r': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
 'x': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 'menu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 'lr': '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg>',
 'play': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
 'mute': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>',
}
PILL = {  # four pillars, line icons
 'people': '<svg viewBox="0 0 40 40"><circle cx="14" cy="13" r="5"/><circle cx="27" cy="15" r="4"/><path d="M4 33c1-7 5-11 10-11s9 4 10 11M22 26c1-3 3-5 6-5 4 0 7 3 8 9"/></svg>',
 'client': '<svg viewBox="0 0 40 40"><path d="M20 35s-13-7-13-17a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 10-13 17-13 17z"/></svg>',
 'tech': '<svg viewBox="0 0 40 40"><rect x="4" y="7" width="32" height="20" rx="1"/><path d="M14 33h12M20 27v6M10 13h8M10 18h14"/></svg>',
 'service': '<svg viewBox="0 0 40 40"><path d="M20 4l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3L20 27.6l-9.3 4.9 1.8-10.3L5 14.9l10.4-1.5z"/></svg>',
}
SOC = {
 'Instagram': ('https://www.instagram.com/centerstage_av/', '<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2.5c-2.6 0-2.9 0-3.9.1-3.5.2-5.4 2-5.6 5.6-.1 1-.1 1.3-.1 3.8s0 2.9.1 3.9c.2 3.5 2 5.4 5.6 5.6 1 .1 1.3.1 3.9.1s2.9 0 3.9-.1c3.5-.2 5.4-2 5.6-5.6.1-1 .1-1.3.1-3.9s0-2.8-.1-3.8c-.2-3.5-2-5.4-5.6-5.6-1-.1-1.3-.1-3.9-.1zm0 1.7c2.5 0 2.8 0 3.8.1 2.6.1 3.8 1.3 3.9 3.9.1 1 .1 1.3.1 3.8s0 2.8-.1 3.8c-.1 2.6-1.3 3.8-3.9 3.9-1 .1-1.3.1-3.8.1s-2.8 0-3.8-.1c-2.6-.1-3.8-1.3-3.9-3.9-.1-1-.1-1.3-.1-3.8s0-2.8.1-3.8C4.4 5.5 5.6 4.3 8.2 4.2c1-.1 1.3-.1 3.8-.1z"/></svg>'),
 'LinkedIn': ('https://www.linkedin.com/company/center-stage-av/', '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/></svg>'),
 'YouTube': ('https://www.youtube.com/user/CenterStageAV', '<svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.8 3z"/></svg>'),
 'Facebook': ('https://facebook.com/Center-Stage-AV-105107545564643/', '<svg viewBox="0 0 24 24"><path d="M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.6V1.6L14 1.5c-4 0-4.9 3-4.9 4.9v2.1H6.8v4H9.1V22.5H14V12.5h3.3l.4-4z"/></svg>'),
}

SERVICES = [
 ('present', 'Presentation Technologies', 'Make your message stand out. We partner with meeting planners and blend audiovisual technology with set design, lighting, visuals and audio, so your vision takes centre stage and resonates long after the event ends.'),
 ('led', 'LED Technology', 'For over 20 years we have led the way in LED, turning any venue into a spectacular environment. From concept to installation, with precision engineering and dedicated on-site support.'),
 ('lighting', 'Lighting', 'LED lighting in millions of vibrant colours turns an ordinary room into something extraordinary. Our lighting designers help you choose the right look, eco-friendly and economical.'),
 ('audio', 'Audio', 'Professional audio is the foundation of any event: clarity, no feedback, no echoes, so the audience stays on the message. Great visuals attract attention; great audio reinforces it.'),
 ('set', 'Set Design', 'Corporate events are business theatre. Stock or fully custom set pieces transform a typical space into a vibrant centre of attention, however big or small, simple or complex.'),
 ('mapping', 'Projection Mapping', 'Turn any surface into a canvas. Using our Pandora\'s Box media servers, we project onto flat or irregular surfaces. Limited only by your imagination.'),
 ('stream', 'Live Streaming', 'Extend your event beyond the walls. Real-time, high-definition coverage optimized for clear audio and seamless streaming across platforms, with live audience engagement tools.'),
 ('signage', 'Digital Signage', 'Communicate with impact and cut printed waste. Touchscreens, digital podiums and banners, updated instantly across multi-day events.'),
]
EVENTS = [
 ('meetings', 'Meetings & Seminars', 'We mean business in the meeting business. Clear, engaging experiences that connect your brand with every attendee.'),
 ('conf', 'Conferences & Conventions', 'Flawless events for 20+ years, from a thousand attendees in a grand venue to an intimate room of one hundred.'),
 ('galas', 'Galas & Awards', 'Impress, inspire and influence. Multimedia, set design and décor that put your brand and your team in the spotlight.'),
 ('trade', 'Trade Shows & Exhibits', 'Make your exhibit unforgettable. Audiovisual and digital signage that draws people to your booth.'),
 ('social', 'Social & Entertainment', 'All the world is a stage, literally. Outdoor employee events with a band, weekend concerts, off-site parties.'),
 ('hybrid', 'Hybrid & Virtual', 'Bring everyone in. Streaming, polling and our Center Stage Virtual Studio connect presenters with audiences anywhere.'),
 ('prod', 'Production Services', 'Our in-house animators, designers, videographers, editors and producers create custom content for your show.'),
 ('consult', 'Technical Consultation', 'Creative and technical production management for events outside North America: budgets, 3D renderings, AutoCAD drawings, stage management.'),
]
QUOTES = [
 ('Thank you Richard and your team for a wonderful production! We look forward to working with you again for our future events’ needs.', 'Michelle'),
 ('The Convention was a huge success, really loved working with you and the crew. Helen was great! I look forward to a continued working relationship with Center Stage AV.', 'Sharon H.'),
 ('Professional, innovative, and on point every time. Wouldn’t work with anyone else.', 'Val K.'),
 ('These guys know their stuff. They did a wonderful job with our event. We will use them again in the future. Real pros!', 'Client review'),
 ('Awesome production, the best so far! And the vignettes, best I’ve seen in three years. Thanks again!', 'Valeria M.'),
 ('They respond fast and are reliable and always professional.', 'Marie-Louise A.'),
 ('I’ve left your contact information with my replacement with glowing reviews, so expect to be contacted for future events. Thanks again!', 'Sunday A.'),
]
LOGOS = ['TD-Bank.webp','Scotiabank.webp','Ford.webp','Canadian-Tire.webp','PWC.webp','Bayer.webp','Chanel.webp','Aramark.webp','GE-Capital.webp','Armani-Jeans.webp','Baycrest.webp','Arbonne.webp','MHICA.webp','Sofina.webp','Toronto.webp','ACA.webp','Inkeros.png','OntarioAerospaceCouncil.png']
WORK = [137,155,141,146,165,139,150,154,138,163,145,157,147,159,143,166,149,152,161,164,167,160]
TICK = ['Galas & Awards','Conferences','Product Launches','Trade Shows','Town Halls','Hybrid Broadcasts','Concerts','Projection Mapping','LED Walls','Seminars']

def loader_svg():
    W,H,cy=760,140,70
    d1,_=L.text('sync700','CENTER',W/2-86,cy+13,34,track=7,anchor='end')
    d2,_=L.text('sync700','STAGE',W/2+86,cy+13,34,track=7)
    s=1.0; cx=W/2; h=112*s; wv=124*s; top=cy-h*0.47
    dav,_=L.text('unb800','AV',cx,cy+18*s,50*s,track=-1*s,anchor='middle')
    return (f'<svg viewBox="0 0 {W} {H}" aria-label="Center Stage AV"><path class="w1" d="{d1}" fill="#fff"/><path class="w2" d="{d2}" fill="#fff"/>'
            f'<path class="tri" d="M{cx-wv/2:.1f} {top:.1f} L{cx+wv/2:.1f} {top:.1f} L{cx:.1f} {top+h:.1f} Z" fill="#fff"/>'
            f'<ellipse class="ell" cx="{cx}" cy="{cy}" rx="62" ry="40" transform="rotate(-10 {cx} {cy})" fill="{L.CR}"/>'
            f'<path class="av" d="{dav}" fill="#fff"/></svg>')

def head(title, desc, extra=''):
    return f'''<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{E(title)}</title><meta name="description" content="{E(desc)}"><meta name="robots" content="noindex,nofollow,noarchive,noimageindex">
<meta name="theme-color" content="#0B0A0D"><link rel="icon" href="/img/favicon-32.png"><link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<meta property="og:title" content="{E(title)}"><meta property="og:description" content="{E(desc)}"><meta property="og:image" content="/img/og.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&family=Unbounded:wght@700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/csav.css">{extra}
<script src="/wm.js" data-for="Center Stage AV"></script></head>'''

def btns(cls=''):
    return (f'<a class="btn btn-cr {cls}" href="#quote" data-quote>{I["quote"]}Build your quote</a>'
            f'<a class="btn btn-ln {cls}" href="#contact">{I["phone"]}Get in touch</a>')

def index():
    svc_items=''.join(f'''<li data-i="{i}"{' class="on"' if i==0 else ''}><button aria-expanded="{'true' if i==0 else 'false'}"><span class="n">0{i+1}</span><span class="t">{E(t)}</span>{I['plus']}</button>
<div class="bd"><div><img src="/img/svc-{k}.webp" alt="{E(t)} by Center Stage AV" loading="lazy" draggable="false"><p>{E(d)}</p></div></div></li>''' for i,(k,t,d) in enumerate(SERVICES))
    svc_pv=''.join(f'<img src="/img/svc-{k}.webp" alt="" loading="lazy" draggable="false"{" class=on" if i==0 else ""}>' for i,(k,t,d) in enumerate(SERVICES))
    posts=''.join(f'''<a class="post" href="#quote" data-quote="{E(t)}"><img src="/img/ev-{k}.webp" alt="{E(t)}" loading="lazy" draggable="false"><span class="num mono">0{i+1}</span><div class="in"><h3>{E(t)}</h3><p>{E(d)}</p></div></a>''' for i,(k,t,d) in enumerate(EVENTS))
    wall=''.join(f'<button data-n="{j}" aria-label="Open photo {j+1}"><img src="/img/work/w{n}.webp" alt="Center Stage AV production" loading="lazy" draggable="false"></button>' for j,n in enumerate(WORK))
    logos=''.join(f'<div><img src="/img/logos/{f}" alt="{E(f.rsplit(".",1)[0].replace("-"," "))}" loading="lazy" draggable="false"></div>' for f in LOGOS)
    qs=''.join(f'<figure{" class=on" if i==0 else ""}><blockquote>“{E(q)}”</blockquote><figcaption class="mono">{E(a)}</figcaption></figure>' for i,(q,a) in enumerate(QUOTES))
    qn=''.join(f'<button aria-label="Review {i+1}"{" class=on" if i==0 else ""}><i></i></button>' for i in range(len(QUOTES)))
    tick=''.join(f'<span>{E(t)}</span>' for t in TICK*2)
    evchips=''.join(f'<label class="chip"><input type="radio" name="type" value="{E(t)}"><span>{E(t)}</span></label>' for k,t,d in EVENTS[:6])+'<label class="chip"><input type="radio" name="type" value="Virtual Studio booking"><span>Virtual Studio booking</span></label><label class="chip"><input type="radio" name="type" value="Something else"><span>Something else</span></label>'
    svchips=''.join(f'<label class="chip"><input type="checkbox" name="svc" value="{E(t)}"><span>{E(t)}</span></label>' for k,t,d in SERVICES)
    soc=''.join(f'<a href="{u}" target="_blank" rel="noopener" aria-label="{n}">{s}</a>' for n,(u,s) in SOC.items())
    body=f'''<body>
<div id="ld" aria-hidden="true"><div class="beam"></div><div class="lg">{loader_svg()}</div></div>
<header class="hdr" id="hdr"><div class="wrap"><a class="brand" href="#top" aria-label="Center Stage AV home"><img src="/img/logo.svg" alt="Center Stage AV" width="760" height="140" draggable="false"></a>
<nav aria-label="Main"><a href="#services">Services</a><a href="#events">Events</a><a href="#work">Our work</a><a href="#story">Who we are</a><a href="#studio">Virtual Studio</a></nav>
<div class="acts">{btns()}</div><button class="burger" id="burger" aria-label="Open menu">{I['menu']}</button></div></header>
<div class="menu" id="menu" aria-hidden="true"><button class="x" id="mclose" aria-label="Close menu">{I['x']}</button>
<a class="big" href="#services">Services</a><a class="big" href="#events">Events</a><a class="big" href="#work">Our work</a><a class="big" href="#story">Who we are</a><a class="big" href="#studio">Virtual Studio</a>
<div class="acts">{btns()}</div></div>

<main id="top">
<section class="hero" id="hero"><div class="wrap">
 <div class="top"><h1><span class="ln"><span>Your brand.</span></span><span class="ln"><span>Your <span class="rot" id="rot"><b class="on">event.</b><b>gala.</b><b>summit.</b><b>launch.</b><b>expo.</b><b>show.</b></span></span></span><span class="ln"><span class="cr">Center stage.</span></span></h1>
 <div class="side"><p>Designing and delivering cutting-edge audiovisual solutions for live, hybrid and virtual events, anywhere in North America.</p><div class="acts">{btns()}</div></div></div>
 <div class="screen"><div class="truss"></div><div class="frame"><video id="reel" autoplay muted loop playsinline preload="metadata" poster="/img/reel-poster.jpg" disablepictureinpicture controlslist="nodownload noplaybackrate"><source src="/img/reel-sm.mp4" media="(max-width:760px)" type="video/mp4"><source src="/img/reel.mp4" type="video/mp4"></video></div><div class="pool"></div>
 <div class="bar mono"><span>Now showing: <b>the Center Stage reel</b></span><span><b id="clock">Mississauga</b> &middot; Fort Lauderdale &middot; San Diego</span></div></div>
</div></section>

<div class="tick" aria-hidden="true"><div class="tr">{tick}</div></div>

<section class="sec b2b" id="plan"><div class="wrap grid">
 <div class="rev-in"><div class="kick mono">How every show starts</div><h2>From the boardroom to the ballroom.</h2>
 <p class="lead" style="margin-top:20px">Our motto has always been that every successful event begins with careful planning in the boardroom before we get on-site to the ballroom.</p>
 <ul><li><span class="mono">Plan</span><span>2D and 3D set renderings, AutoCAD floor plans, show flow and critical path documents.</span></li>
 <li><span class="mono">Build</span><span>Set, screens, lighting and audio installed by our own crew, on budget and on time.</span></li>
 <li><span class="mono">Show</span><span>Technicians and stage management on-site, so you can focus on the big picture.</span></li></ul></div>
 <div class="rv rev-in" id="rv" style="--x:50%"><img src="/img/work/w160.webp" alt="Production desk during a Center Stage AV show" draggable="false"><img class="a" src="/img/ev-galas.webp" alt="Gala on show night" draggable="false">
 <span class="lb l mono">Show night</span><span class="lb r mono">Behind the desk</span><div class="h"><i>{I['lr']}</i></div></div>
</div></section>

<section class="sec svc" id="services"><div class="wrap">
 <div class="head"><div><div class="kick mono">Our services</div><h2>Eight ways<br>to own the room.</h2></div><p>The right solutions to fit any budget, anywhere in North America. From concept design to on-site delivery, we work closely with you to bring your ideas to life.</p></div>
 <div class="cols"><ol id="svc">{svc_items}</ol><div class="pv" id="svcpv">{svc_pv}<span class="cap mono" id="svccap">{E(SERVICES[0][1])}</span></div></div>
</div></section>

<section class="sec ev" id="events"><div class="wrap head"><div><div class="kick mono">What we do</div><h2>Every kind of stage.</h2></div><div class="nav"><button id="evl" aria-label="Previous">{I['l']}</button><button id="evr" aria-label="Next">{I['r']}</button></div></div>
 <div class="rail" id="rail">{posts}</div>
</section>

<section class="sec work" id="work"><div class="wrap">
 <div class="head"><div><div class="kick mono">Our work</div><h2>Twenty years<br>of show nights.</h2></div><p class="lead" style="max-width:44ch">A reflection of the dedication and high standards each of our associates brings to every event. Tap any photo to see it full size.</p></div>
 <div class="wall" id="wall">{wall}</div>
 <div style="margin-top:16px"><button class="btn btn-ln more" id="wallmore" style="width:100%">See all {len(WORK)} photos</button></div>
</div></section>

<section class="sec story" id="story"><div class="wrap">
 <div class="grid"><div class="ph rev-in"><img src="/img/who.webp" alt="Center Stage AV event" loading="lazy" draggable="false"><span class="tag">20 years of<br>audio visual excellence</span></div>
 <div class="rev-in"><div class="kick mono">Who we are</div><h2>One thing,<br>done well.</h2>
 <p class="lead" style="margin-top:22px">Center Stage AV was born out of a deep desire to provide a better way to get a message across to an audience. Today we are one of the fastest growing audio visual companies in Canada, with tailor-made solutions for thousands of events across North America.</p>
 <p class="q">We don’t believe in a one-size-fits-all solution. We tailor each event to your needs, budget and vision.</p>
 <p style="color:var(--mute)">Committed to sustainability too: energy-efficient LED lighting and digital signage reduce the footprint of every show.</p></div></div>
 <div class="pill4 rev-in"><div>{PILL['people']}<h3>Our people</h3><p>Professional, knowledgeable crews who see every event through.</p></div><div>{PILL['client']}<h3>Client-centric mindset</h3><p>We anticipate your needs and plan around your budget.</p></div><div>{PILL['tech']}<h3>Innovative technology</h3><p>Leading-edge presentation tools and state-of-the-art equipment.</p></div><div>{PILL['service']}<h3>Service excellence</h3><p>Better today than yesterday, better tomorrow than today.</p></div></div>
</div></section>

<section class="sec proof" id="proof"><div class="wrap">
 <div class="kick mono">Trusted by</div><h2>Brands that can’t<br>afford a bad show.</h2>
 <div class="logos">{logos}</div>
 <div class="quotes"><div class="big" aria-hidden="true">“</div><div><div class="kick mono">What our clients say</div><div class="qs" id="qs">{qs}</div><div class="qn" id="qn">{qn}</div></div></div>
</div></section>

<section class="sec studio" id="studio"><div class="bg"><img src="/img/studio.webp" alt="Center Stage Virtual Studio set" loading="lazy" draggable="false"></div><div class="wrap"><div class="card rev-in">
 <div class="kick mono">Center Stage Virtual Studio</div><h2>Your own<br>broadcast studio.</h2>
 <p class="lead" style="margin-top:18px">Like a live studio show with viewers at home. Book the studio for hybrid events, town halls, product launches and pre-recorded broadcasts.</p>
 <ul><li>Live streaming and recording</li><li>Polling, networking and collaboration tools</li><li>Multimedia sharing with remote presenters</li></ul>
 <a class="btn btn-cr" href="#quote" data-quote="Virtual Studio booking">{I['quote']}Ask about studio time</a></div></div></section>

<section class="sec qb" id="quote"><div class="wrap grid">
 <div><div class="kick mono">Build your quote</div><h2>Tell us about your show.</h2><p class="lead" style="margin-top:18px">Four quick steps. Our team comes back with options that fit your budget, usually within one business day.</p>
 <ol class="steps" id="qsteps"><li class="on"><b>01</b>Your event</li><li><b>02</b>What you need</li><li><b>03</b>Date, place and size</li><li><b>04</b>Your details</li></ol></div>
 <form class="form" id="qform" novalidate>
  <div class="st on" data-s="0"><h3>What are you planning?</h3><p class="hint">Pick the closest match.</p><div class="chips">{evchips}</div></div>
  <div class="st" data-s="1"><h3>What do you need?</h3><p class="hint">Choose any. Not sure? Leave it blank and we’ll recommend.</p><div class="chips">{svchips}</div></div>
  <div class="st" data-s="2"><h3>Date, place and size</h3><p class="hint">Rough is fine.</p><div class="fl">
   <label>Event date<input type="date" name="date"></label><label>Guests<select name="guests"><option value="">Choose</option><option>Under 100</option><option>100 to 300</option><option>300 to 1,000</option><option>1,000+</option></select></label>
   <label class="full">Venue or city<input name="venue" placeholder="e.g. Metro Toronto Convention Centre"></label>
   <label class="full">In person, hybrid or virtual?<select name="format"><option>In person</option><option>Hybrid</option><option>Virtual</option></select></label></div></div>
  <div class="st" data-s="3"><h3>Where should we send options?</h3><p class="hint">We only use this to reply to you.</p><div class="fl">
   <label>Name<input name="name" autocomplete="name" required></label><label>Company<input name="company" autocomplete="organization"></label>
   <label>Email<input type="email" name="email" autocomplete="email" required></label><label>Phone<input type="tel" name="phone" autocomplete="tel"></label>
   <label class="full">Anything else?<textarea name="notes" rows="3"></textarea></label></div></div>
  <div class="st done" data-s="4"><h3>Ready to send</h3><p class="hint">Here’s your request. Tap send and it opens in your email, addressed to our team.</p><pre id="qsum"></pre><a class="btn btn-cr" id="qsend" href="#">{I['quote']}Send my request</a></div>
  <div class="nav"><button type="button" class="btn btn-ln" id="qback">Back</button><button type="button" class="btn btn-cr" id="qnext">Next</button></div>
 </form>
</div></section>

<section class="sec ct" id="contact"><div class="wrap">
 <div class="kick mono">Get in touch</div><h2>Three cities.<br>One crew.</h2>
 <div class="grid"><div class="city"><span class="mono" style="color:var(--cr2)">Head office</span><h3>Toronto, ON</h3><p>6180 Kestrel Road<br>Mississauga, Ontario L5T 1Z2</p></div>
 <div class="city"><span class="mono" style="color:var(--cr2)">Florida</span><h3>Fort Lauderdale, FL</h3><p>3698 NW 16th St, Suite H<br>Lauderhill, FL 33311</p></div>
 <div class="city"><span class="mono" style="color:var(--cr2)">California</span><h3>San Diego, CA</h3><p>1425 30th Street, Suite A<br>San Diego, CA 92154</p></div></div>
 <div class="lines"><div><span class="mono">Toronto</span>416-621-9480</div><div><span class="mono">Mississauga</span>905-282-2444</div><div><span class="mono">Toll free</span>1-877-674-2828</div><div><span class="mono">Email</span><a href="mailto:info@centerstageav.com">info@centerstageav.com</a></div></div>
 <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:32px"><a class="btn btn-cr" href="#quote" data-quote>{I['quote']}Build your quote</a><a class="btn btn-ln" href="mailto:info@centerstageav.com">{I['phone']}Get in touch</a></div>
</div></section>
</main>

<footer><div class="wrap"><div class="top"><div><img class="f" src="/img/logo.svg" alt="Center Stage AV" draggable="false"><p style="color:var(--mute);margin-top:18px;max-width:36ch">Your brand. Your event. Center stage. Audio visual for live, hybrid and virtual events for over 20 years.</p><div class="soc">{soc}</div></div>
<div><h4>Explore</h4><ul><li><a href="#services">Services</a></li><li><a href="#events">Events</a></li><li><a href="#work">Our work</a></li><li><a href="#story">Who we are</a></li><li><a href="#studio">Virtual Studio</a></li></ul></div>
<div><h4>Next steps</h4><ul><li><a href="#quote" data-quote>Build your quote</a></li><li><a href="#contact">Get in touch</a></li><li><a href="/brand/">Logo refresh options</a></li><li><a href="/?tour=1" data-tour>Take a tour of what’s changed</a></li></ul></div></div>
<div class="bot mono"><span>© 2026 Center Stage AV. All rights reserved.</span><span>Concept preview</span></div></div></footer>

<button class="tourbtn" id="tourbtn" data-tour>{I['play']}Tour what’s changed</button>
<div class="lb" id="lb" role="dialog" aria-label="Photo viewer"><button class="c" id="lbc" aria-label="Close">{I['x']}</button><button class="p" id="lbp" aria-label="Previous">{I['l']}</button><img id="lbi" alt="" draggable="false"><button class="n" id="lbn" aria-label="Next">{I['r']}</button></div>
<div class="tour" id="tour" role="dialog" aria-live="polite"><div class="pg"><i id="tpg"></i></div><div class="bd"><div class="k mono"><span id="tk"></span><span id="tn"></span></div><h4 id="tt"></h4><p id="td"></p><div class="rev" id="tr"></div>
<div class="ctl"><button id="tb">Back</button><button id="tp">Pause</button><button id="tx">Close</button><button class="nx" id="tnx">Next</button></div></div></div>
<script src="/csav.js"></script>
</body></html>'''
    return head('Center Stage AV | Audio visual for live, hybrid and virtual events', 'Center Stage AV designs and delivers audiovisual production for meetings, conferences, galas, trade shows and hybrid events across North America.') + body

def brand():
    opts=[('a','Option A','Evolution','Today’s layout, redrawn sharp. The point of your old star now sits behind a crimson stage-light, AV knocked out in white, CENTER and STAGE in a cleaner wide letter. Works at any size, no blur, no bevels. Default on the new site.'),
          ('b','Option B','Stacked','Mark on top, name underneath with AUDIO VISUAL. Made for square spaces: social profiles, trucks, road cases, staff shirts and the app icon.'),
          ('c','Option C','Spotlight wordmark','A bolder modern step: the name leads and the crimson ellipse becomes the spotlight pool STAGE stands on. Simplest to print and embroider.')]
    cards=''.join(f'''<section class="opt" id="{k}"><div class="lab"><span class="mono">{n}{' &middot; default on the new site' if k=='a' else ''}</span><h2>{t}</h2><p>{E(d)}</p><a class="btn btn-ln" href="/brand/{k}.html">Open {n} on its own</a></div>
<div class="sw dk"><img src="/brand/logo-{k}-light.svg" alt="{n} on dark" draggable="false"></div><div class="sw lt"><img src="/brand/logo-{k}-dark.svg" alt="{n} on light" draggable="false"></div></section>''' for k,n,t,d in opts)
    css='''<style>.bp{padding:calc(var(--hdr) + 40px) 0 80px}.bp h1{font-size:clamp(32px,6vw,72px);margin:10px 0 18px}.cmp{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:36px 0 64px}
.cmp>div{border:1px solid var(--line)}.cmp .t{padding:14px 18px;border-bottom:1px solid var(--line)}.cmp .t b{color:var(--cr2)}.cmp .i{display:grid;place-items:center;padding:40px 24px;min-height:220px}
.cmp .i.old{background:#fff}.cmp .i.old img{width:min(434px,100%)}.cmp .i.new{background:var(--ink)}.cmp .i.new img{width:min(520px,100%)}
.opt{display:grid;grid-template-columns:.8fr 1fr 1fr;gap:12px;padding:28px 0;border-top:1px solid var(--line)}.opt h2{font-size:clamp(24px,3vw,36px);margin:8px 0 10px}.opt p{color:var(--mute);margin-bottom:16px;font-size:16px}.opt .mono{color:var(--cr2)}
.sw{display:grid;place-items:center;padding:36px 22px;min-height:240px}.sw.dk{background:#000;border:1px solid var(--line)}.sw.lt{background:#fff}.sw img{width:100%;max-width:440px;max-height:180px}
.ic{display:flex;gap:24px;align-items:center;flex-wrap:wrap;padding:28px 0;border-top:1px solid var(--line)}.ic img{width:120px;height:120px;border-radius:26px}
@media(max-width:900px){.opt,.cmp{grid-template-columns:1fr}}</style>'''
    body=f'''<body><header class="hdr solid"><div class="wrap"><a class="brand" href="/" aria-label="Back to the site"><img src="/img/logo.svg" alt="Center Stage AV"></a><div class="acts"><a class="btn btn-ln" href="/">Back to the site</a></div><a class="burger" href="/" aria-label="Back to the site">{I['l']}</a></div></header>
<main class="bp"><div class="wrap"><div class="kick mono">Logo refresh</div><h1>Same name.<br>Sharper star.</h1><p class="lead">Your logo is recognised, so we kept what people know: CENTER, the crimson AV, STAGE. What changes is how cleanly it reproduces, from a phone screen to an LED wall. Here is today’s logo beside the refresh, then three options.</p>
<div class="cmp"><div><div class="t mono">Today</div><div class="i old"><img src="/img/current-logo.webp" alt="Current Center Stage AV logo" draggable="false"></div></div><div><div class="t mono"><b>Refresh</b> &middot; Option A</div><div class="i new"><img src="/brand/logo-a-light.svg" alt="Option A" draggable="false"></div></div></div>
{cards}
<div class="ic"><img src="/brand/icon.svg" alt="App and social icon" draggable="false"><div><span class="mono" style="color:var(--cr2)">Icon</span><h3 style="margin:6px 0">Profile and app icon</h3><p style="color:var(--mute);max-width:52ch">The mark alone, for Instagram, LinkedIn, YouTube and a phone home screen.</p></div></div>
<p class="mono" style="color:var(--mute);margin-top:30px">Pick A, B or C, or mix parts. Final files come as vector (SVG, PDF) plus PNG in every size.</p></div></main></body></html>'''
    out={'index.html': head('Logo refresh | Center Stage AV','Center Stage AV logo refresh options',css)+body}
    for k,n,t,d in opts:
        bg='#000'
        out[f'{k}.html']=head(f'{n}: {t} | Center Stage AV logo','Logo option',css)+f'''<body><header class="hdr solid"><div class="wrap"><a class="brand" href="/brand/" aria-label="All logo options"><img src="/img/logo.svg" alt="Center Stage AV"></a><div class="acts" style="margin-left:auto"><a class="btn btn-ln" href="/brand/">All options</a></div><a class="burger" href="/brand/" aria-label="All options">{I['l']}</a></div></header>
<main class="bp"><div class="wrap"><div class="kick mono">{n}{' &middot; default on the new site' if k=='a' else ''}</div><h1>{t}</h1><p class="lead">{E(d)}</p>
<div class="cmp"><div><div class="t mono">On dark</div><div class="i new"><img src="/brand/logo-{k}-light.svg" alt="" draggable="false"></div></div><div><div class="t mono">On light</div><div class="i old"><img src="/brand/logo-{k}-dark.svg" alt="" draggable="false"></div></div></div>
<div class="cmp"><div><div class="t mono">Today</div><div class="i old"><img src="/img/current-logo.webp" alt="" draggable="false"></div></div><div><div class="t mono">{n}</div><div class="i old"><img src="/brand/logo-{k}-dark.svg" alt="" draggable="false"></div></div></div>
<a class="btn btn-cr" href="/brand/">See all three options</a></div></main></body></html>'''
    return out

if __name__=='__main__':
    open(os.path.join(ROOT,'index.html'),'w').write(index())
    for f,s in brand().items(): open(os.path.join(ROOT,'brand',f),'w').write(s)
    print('built')
