# Center Stage AV: 30-page brand and style guide for the existing logo, plus three new palette and logo options.
import os
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
CR, INK, WH, GREY, INK2 = '#D61045', '#0B0A0D', '#FFFFFF', '#9A97A3', '#1C1A20'
PAPER = '#F4F2F5'

def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= .03928 else ((x + .055) / 1.055) ** 2.4 for x in c]
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]
def ratio(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return (la + .05) / (lb + .05)

HEAD = '''<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} | Center Stage AV</title><meta name="robots" content="noindex,nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
:root{{--cr:{CR};--ink:{INK};--ink2:{INK2};--grey:{GREY};--paper:{PAPER};--disp:"Archivo",Arial Black,sans-serif;--body:"Instrument Sans",Arial,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace}}
*{{box-sizing:border-box}}html,body{{margin:0;background:#E9E6EC;color:var(--ink);font:400 16px/1.6 var(--body)}}
.sheet{{max-width:1040px;margin:0 auto;padding:16px}}
.pg{{background:#fff;border-radius:6px;padding:44px 40px;margin:0 0 28px;box-shadow:0 1px 3px #0002;position:relative;overflow:hidden}}
.pn{{position:absolute;right:22px;top:18px;font:500 12px var(--mono);color:#6b6772;letter-spacing:.08em}}
.kick{{font:500 12px var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--cr);margin:0 0 8px}}
h1,h2,h3{{font-family:var(--disp);font-stretch:125%;font-weight:800;text-transform:uppercase;line-height:1.05;margin:0 0 14px;letter-spacing:.01em}}
h1{{font-size:clamp(34px,6vw,64px)}}h2{{font-size:clamp(26px,4vw,40px)}}h3{{font-size:18px}}
p{{margin:0 0 12px;max-width:66ch}}.lead{{font-size:19px;line-height:1.5}}
.g2{{display:grid;grid-template-columns:1fr 1fr;gap:18px}}.g3{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}}.g4{{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}}
.tile{{border-radius:4px;padding:26px;display:flex;align-items:center;justify-content:center;min-height:150px;position:relative}}
.tile img{{max-width:100%;height:auto}}
.sw{{border-radius:4px;overflow:hidden;border:1px solid #0001}}.sw .c{{height:150px;padding:14px;display:flex;align-items:flex-end;font:500 12px var(--mono)}}
.sw .m{{padding:12px 14px;font:400 13px/1.6 var(--mono);background:#fff}}
table{{width:100%;border-collapse:collapse;font-size:14px}}td,th{{padding:9px 8px;border-bottom:1px solid #0001;text-align:left;vertical-align:top}}th{{font:500 12px var(--mono);letter-spacing:.06em;text-transform:uppercase;color:#6b6772}}
.btn{{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 22px;font:700 15px var(--disp);font-stretch:118%;text-transform:uppercase;letter-spacing:.03em;border-radius:2px;text-decoration:none}}
.btn.p{{background:var(--cr);color:#fff}}.btn.s{{border:2px solid var(--ink);color:var(--ink)}}
.do{{color:#0a7a3e;font-weight:600}}.dont{{color:#b00d3a;font-weight:600}}
.sheetA{{background:#fff;border:1px solid #0002;box-shadow:0 6px 18px #0002;aspect-ratio:210/297;padding:8% 9%;position:relative;font:400 clamp(7px,1.1vw,11px)/1.55 var(--body);color:#222;max-width:360px}}
.card{{background:var(--ink);color:#fff;border-radius:6px;aspect-ratio:3.5/2;padding:6%;position:relative;max-width:420px;width:100%}}
.sig{{font:400 14px/1.5 var(--body);border-left:4px solid var(--cr);padding:4px 0 4px 14px;max-width:460px;color:#222}}
.ic{{width:40px;height:40px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}}
.note{{font:400 13px/1.5 var(--mono);color:#6b6772}}
.toc{{columns:2;font-size:15px;line-height:2}}.toc a{{color:var(--ink);text-decoration:none}}
@media(max-width:760px){{.pg{{padding:30px 20px}}.g2,.g3,.g4{{grid-template-columns:1fr}}.toc{{columns:1}}}}
</style></head><body><div class="sheet">
'''
FOOT = '</div><script src="/wm.js"></script></body></html>'

def pg(n, kick, title, body):
    return f'<section class="pg" id="p{n}"><span class="pn">{n:02d} / 30</span><div class="kick">{kick}</div><h2>{title}</h2>{body}</section>\n'

def sw(name, hx, role, txt='#fff'):
    r, g, b = int(hx[1:3], 16), int(hx[3:5], 16), int(hx[5:7], 16)
    return (f'<div class="sw"><div class="c" style="background:{hx};color:{txt}">{name}</div>'
            f'<div class="m">{hx}<br>RGB {r} {g} {b}<br>CMYK approx. {role}</div></div>')

LOGO = '<img src="/img/logo.svg" alt="Center Stage AV logo" width="434" height="98">'
ICON_PHONE = '<svg class="ic" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>'
ICON_DOC = '<svg class="ic" viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h3"/></svg>'
ICON_MIC = '<svg class="ic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'
ICON_SPOT = '<svg class="ic" viewBox="0 0 24 24"><path d="M4 20l6-10 4 6 2-3 4 7z"/><circle cx="17" cy="6" r="2.5"/></svg>'

def pages():
    P = []
    # 1 cover
    P.append(f'''<section class="pg" id="p1" style="background:{INK};color:#fff;min-height:520px;display:flex;flex-direction:column;justify-content:space-between"><span class="pn" style="color:#bbb">01 / 30</span>
<div class="tile" style="background:transparent;min-height:auto;justify-content:flex-start"><img src="/img/logo.svg" alt="Center Stage AV" width="434" height="98" style="width:min(520px,90%)"></div>
<div><div class="kick" style="color:#FF2D63">Brand and style guide</div><h1>The existing<br>logo, in full</h1><p class="lead" style="color:#ddd">Version 1.0, November 2026. Prepared for Center Stage AV as a concept. Ideas only until approved.</p></div></section>\n''')
    # 2 contents
    titles = ['Cover','Contents','About this guide','Who we are','Brand personality','Our name','The logo','Clear space and construction','Minimum size','Logo on light and dark','Logo misuse','The AV emblem alone','Primary colours','Supporting colours','Contrast and balance','Display type','Text type and labels','Type scale','Capitals rules','Iconography','Photography','Grid and spacing','Buttons and calls to action','Voice and tone','Business card','Letterhead and envelope','Letter template','Email signature','Newsletter and proposal cover','Using this guide']
    toc = ''.join(f'<a href="#p{i+1}">{i+1:02d} &nbsp;{t}</a><br>' for i, t in enumerate(titles))
    P.append(pg(2, 'Inside', 'Contents', f'<div class="toc">{toc}</div>'))
    P.append(pg(3, 'Purpose', 'About this guide', '''<p class="lead">This guide shows how the existing Center Stage AV logo is used, and gives everyone who makes material for the company one set of rules.</p>
<p>It covers the logo, colours, type, imagery, buttons, and the everyday pieces: business cards, letterhead, letters, email signatures and the newsletter.</p>
<p>Keep to the rules here. Where a case is not covered, ask before making something new.</p>'''))
    P.append(pg(4, 'Company', 'Who we are', '''<p class="lead">Center Stage AV plans events, produces them on site, and rents audiovisual equipment.</p>
<div class="g3"><div><h3>Plan</h3><p>Concept, floor plans, rigging and show flow, from the boardroom to the ballroom.</p></div><div><h3>Produce</h3><p>Staging, lighting, sound, video and screens, installed and run by our own crew.</p></div><div><h3>Rent</h3><p>Audiovisual equipment for events of every size, delivered and supported.</p></div></div>
<p class="note">Facts from the current website: over 20 years of show nights, offices in Mississauga, Fort Lauderdale and San Diego.</p>'''))
    P.append(pg(5, 'Personality', 'Brand personality', '''<div class="g3"><div class="tile" style="background:var(--paper);display:block"><h3>Dependable</h3><p>On time, on budget, on the night. We say what we will do and do it.</p></div>
<div class="tile" style="background:var(--paper);display:block"><h3>Bold</h3><p>Big type, strong colour, a clear stage. We are not shy about being seen.</p></div>
<div class="tile" style="background:var(--paper);display:block"><h3>Hands on</h3><p>Real people, our own team, in the room with you. Never an answering machine.</p></div></div>'''))
    P.append(pg(6, 'Name', 'Our name', '''<p class="lead">Write the name the same way every time:</p>
<div class="g2"><div><p class="do">Correct</p><p>Center Stage AV</p><p>CENTER STAGE AV (in headlines and the logo only)</p></div>
<div><p class="dont">Not correct</p><p>Centre Stage AV, Center Stage A/V, CenterStage AV, Center Stage Audio Visual</p></div></div>
<p>Spell "Center" the American way, as the logo does, even in Canadian copy.</p>'''))
    P.append(pg(7, 'Logo', 'The logo', f'''<p>The logo has two parts: the wordmark <b>CENTER STAGE</b> and the <b>AV emblem</b>, a crimson oval with a white AV. Use the logo exactly as supplied. Never redraw it.</p>
<div class="tile" style="background:{INK}">{LOGO}</div><p class="note">Supplied file: /img/logo.svg (their own artwork, placed as an image).</p>'''))
    P.append(pg(8, 'Construction', 'Clear space and construction', f'''<p>Keep clear space around the logo equal to the height of the letter A in CENTER on every side. Nothing enters this space: no text, no photo edge, no other logo.</p>
<div class="tile" style="background:var(--paper);padding:60px"><div style="outline:1.5px dashed {CR};outline-offset:0;padding:0">{LOGO}</div></div>'''))
    P.append(pg(9, 'Size', 'Minimum size', '''<div class="g2"><div><h3>Print</h3><p>Logo at least 30 mm wide. The wordmark must stay readable at that size.</p></div>
<div><h3>Screen</h3><p>Logo at least 140 px wide on desktop and 110 px on phones. Use the largest file you have, and never stretch it.</p></div></div>
<p class="note">The supplied artwork is 434 px wide. Ask for a vector or a larger original before printing banners or signage.</p>'''))
    P.append(pg(10, 'Versions', 'Logo on light and dark', f'''<div class="g2"><div class="tile" style="background:{INK}">{LOGO}</div><div class="tile" style="background:{CR}">{LOGO}</div></div>
<p class="note">The approved versions are the full logo on Ink and on Crimson. A black version for white paper is still to be drawn and approved.</p>'''))
    P.append(pg(11, 'Misuse', 'Logo misuse', f'''<div class="g3">
<div><div class="tile" style="background:var(--paper);transform:scaleX(1.35)">{LOGO}</div><p class="dont">Do not stretch</p></div>
<div><div class="tile" style="background:var(--paper);transform:rotate(-8deg)">{LOGO}</div><p class="dont">Do not rotate</p></div>
<div><div class="tile" style="background:var(--paper);filter:drop-shadow(6px 8px 6px #0008)">{LOGO}</div><p class="dont">Do not add shadows or glows</p></div>
<div><div class="tile" style="background:#7BD389">{LOGO}</div><p class="dont">Do not place on other colours</p></div>
<div><div class="tile" style="background:var(--paper);-webkit-text-stroke:0">{LOGO}</div><p class="dont">Do not outline or recolour</p></div>
<div><div class="tile" style="background:var(--paper);transform:scaleY(-1)">{LOGO}</div><p class="dont">Do not flip or mirror</p></div></div>'''))
    P.append(pg(12, 'Emblem', 'The AV emblem alone', '''<p>Where space is tight, such as a favicon, app icon, social avatar or a stage screen corner, use the AV emblem alone. Crop it from the full logo; do not redraw it.</p>
<p class="note">Current status: the emblem crop for these uses is still to be made from the master artwork.</p>'''))
    P.append(pg(13, 'Colour', 'Primary colours', f'''<div class="g3">{sw("Crimson", CR, "0 92 55 0", "#fff")}{sw("Ink", INK, "70 60 50 90", "#fff")}{sw("White", WH, "0 0 0 0", INK)}</div>
<p class="note">CMYK values are approximate. Proof every print job on the press.</p>'''))
    P.append(pg(14, 'Colour', 'Supporting colours', f'''<div class="g4">{sw("Ink 2", INK2, "-", "#fff")}{sw("Crimson dark", "#B80D3C", "-", "#fff")}{sw("Grey", GREY, "-", INK)}{sw("Paper", PAPER, "-", INK)}</div>
<p>Use the supporting colours for panels and dividers only. Crimson is for one clear action or accent on each screen or page.</p>'''))
    rows = [('White on Ink', WH, INK), ('Crimson on White', CR, WH), ('White on Crimson', WH, CR), ('Ink on Paper', INK, PAPER), ('Grey on Ink', GREY, INK)]
    tr = ''.join(f'<tr><td>{n}</td><td><span style="display:inline-block;padding:4px 10px;background:{b};color:{f}">Sample text</span></td><td>{ratio(f,b):.1f} : 1</td><td>{"Pass (AA)" if ratio(f,b)>=4.5 else "Large text only"}</td></tr>' for n,f,b in rows)
    P.append(pg(15, 'Balance', 'Contrast and balance', f'''<p>Ink and White carry most of the page. Crimson is the accent. Aim for roughly 60 percent Ink or White, 30 percent neutral, and 10 percent Crimson.</p>
<table><tr><th>Pair</th><th>Sample</th><th>Ratio</th><th>Result</th></tr>{tr}</table>'''))
    P.append(pg(16, 'Type', 'Display type: Archivo', '''<p class="lead">Archivo, set in ExtraBold at an expanded width, is the headline voice. It is the same family as the wordmark.</p>
<div style="font:800 56px/1 Archivo,Arial Black,sans-serif;font-stretch:125%;text-transform:uppercase">Your gala.<br>Center stage.</div>
<p class="note">Google Fonts: Archivo, width 125%, weight 800. Fallback: Arial Black.</p>'''))
    P.append(pg(17, 'Type', 'Text type and labels', '''<div class="g2"><div><h3>Instrument Sans</h3><p style="font:400 18px/1.55 'Instrument Sans',Arial,sans-serif">Body copy, forms and email. Sentence case, 16 to 18 px, line height 1.6.</p></div>
<div><h3>JetBrains Mono</h3><p style="font:500 13px 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase">Labels, dates, figures</p><p class="note">Small caps labels only. Never for paragraphs.</p></div></div>'''))
    P.append(pg(18, 'Type', 'Type scale', '''<table><tr><th>Use</th><th>Font</th><th>Size (desktop / phone)</th></tr>
<tr><td>Headline</td><td>Archivo 800, expanded, caps</td><td>64 / 34 px</td></tr><tr><td>Section title</td><td>Archivo 800, expanded, caps</td><td>40 / 26 px</td></tr>
<tr><td>Sub title</td><td>Archivo 800, expanded, caps</td><td>22 / 18 px</td></tr><tr><td>Body</td><td>Instrument Sans 400</td><td>17 / 16 px</td></tr>
<tr><td>Label</td><td>JetBrains Mono 500, caps</td><td>12.5 / 12.5 px minimum</td></tr></table>'''))
    P.append(pg(19, 'Type', 'Capitals rules', '''<p>Use capitals for headlines, sub titles, menus and buttons. Keep body copy in sentence case. Never use italics on the brand type.</p>
<div class="g2"><div><p class="do">Correct</p><p style="font:800 22px Archivo;font-stretch:125%;text-transform:uppercase">Build your quote</p><p>We can help you plan the whole event.</p></div>
<div><p class="dont">Not correct</p><p style="font-style:italic">Build your quote in italics</p></div></div>'''))
    P.append(pg(20, 'Icons', 'Iconography', f'''<p>Icons are line icons at about 40 px, full size. They sit on their own, with no box or square around them.</p>
<div class="g4"><div class="tile" style="background:var(--paper);color:var(--ink);min-height:110px">{ICON_PHONE}</div><div class="tile" style="background:var(--paper);color:var(--ink);min-height:110px">{ICON_DOC}</div><div class="tile" style="background:var(--paper);color:var(--ink);min-height:110px">{ICON_MIC}</div><div class="tile" style="background:var(--paper);color:var(--ink);min-height:110px">{ICON_SPOT}</div></div>'''))
    P.append(pg(21, 'Imagery', 'Photography', '''<p>Use real photos from our own shows, stages, crew and equipment. Warm, high contrast, lit like a show. Stock clip art and generic icon tiles are not used.</p>
<div class="g3"><div class="tile" style="background:linear-gradient(120deg,#1a1a22,#5a0f24);min-height:130px;color:#fff;font:500 12px var(--mono)">Stage photo</div><div class="tile" style="background:linear-gradient(120deg,#2b2b33,#0b0a0d);min-height:130px;color:#fff;font:500 12px var(--mono)">Crew photo</div><div class="tile" style="background:linear-gradient(120deg,#0b0a0d,#D61045);min-height:130px;color:#fff;font:500 12px var(--mono)">Equipment photo</div></div>
<p class="note">Placeholders shown. Replace with real photos from Center Stage AV.</p>'''))
    P.append(pg(22, 'Layout', 'Grid and spacing', '''<div class="g2"><div><p>Use a 12-column grid on desktop and a single column on phones with a 16 px side gutter.</p><p>Space in steps of 8 px: 8, 16, 24, 40, 64.</p></div>
<div><p>Tap targets are at least 44 px tall. Nothing sits closer than 8 px to another target.</p></div></div>'''))
    P.append(pg(23, 'Buttons', 'Buttons and calls to action', f'''<div style="display:flex;gap:14px;flex-wrap:wrap"><span class="btn p">{ICON_DOC.replace('class="ic"','class="ic" style="width:22px;height:22px"')} Build your quote</span><span class="btn s">{ICON_PHONE.replace('class="ic"','class="ic" style="width:22px;height:22px"')} Get in touch</span></div>
<p style="margin-top:16px">Primary action is a Crimson button with white caps. Secondary is an outline. Put the two side by side. Never show a phone number on a button.</p>'''))
    P.append(pg(24, 'Voice', 'Voice and tone', '''<div class="g2"><div><p class="do">Say it like this</p><p>"We will have the stage built and tested before doors open."</p></div>
<div><p class="dont">Not like this</p><p>"Our solutions leverage best-in-class synergies for your event."</p></div></div>
<p>Plain English, confident, specific. Short sentences. No jargon, no hype.</p>'''))
    P.append(pg(25, 'Stationery', 'Business card', f'''<div class="g2"><div class="card" style="display:flex;flex-direction:column;justify-content:space-between"><div style="transform:scale(.7);transform-origin:left top;filter:brightness(1.1)"><img src="/img/logo.svg" alt="" width="434" height="98"></div><div style="font:500 11px var(--mono);letter-spacing:.08em">FIRST LAST &middot; TITLE<br>+1 000 000 0000 &middot; name@centerstageav.com</div></div>
<div class="card" style="background:{CR};display:flex;align-items:center;justify-content:center"><img src="/img/logo.svg" alt="" width="434" height="98" style="width:80%"></div></div>
<p class="note">Front (Ink) and back (Crimson). Name, title, phone and email are placeholders.</p>'''))
    P.append(pg(26, 'Stationery', 'Letterhead and envelope', f'''<div class="g2"><div class="sheetA"><img src="/img/logo.svg" alt="" width="434" height="98" style="width:60%;filter:invert(1) hue-rotate(180deg)"><div style="margin-top:28px;color:#666">Date<br><br>Recipient name<br>Address line<br><br>Dear Name,</div></div>
<div><div style="background:#fff;border:1px solid #0002;aspect-ratio:220/110;max-width:360px;padding:8%;position:relative;box-shadow:0 6px 18px #0002"><div style="background:{INK};height:30%;width:60%;margin-bottom:10%"></div><div style="width:40%;height:10%;background:#eee;margin-left:50%"></div></div><p class="note">Envelope (DL). Ink logo block at top left.</p></div></div>'''))
    P.append(pg(27, 'Stationery', 'Letter template', '''<div class="sheetA" style="max-width:520px"><div style="font:800 13px Archivo;font-stretch:125%;text-transform:uppercase;color:#D61045">Center Stage AV</div><div style="margin-top:14px;color:#555">[Date]<br><br>[Recipient name]<br>[Company]<br>[Address]</div><p style="margin-top:14px">Dear [Name],</p><p>[Opening: one line on why you are writing.]</p><p>[Body: the facts, the dates, the next step.]</p><p>Thank you,<br>[Name], [Title]<br>Center Stage AV</p></div>'''))
    P.append(pg(28, 'Email', 'Email signature', f'''<p>One signature for every employee. Name in bold, title and office below, then the phone and email line. The logo sits at the foot, small.</p>
<div class="sig"><b style="font:800 15px Archivo;font-stretch:118%;text-transform:uppercase">First Last</b><br>Title, Center Stage AV<br>Office, City &middot; +1 000 000 0000<br>name@centerstageav.com<br><img src="/img/logo.svg" alt="Center Stage AV" width="170" height="38" style="margin-top:8px"></div>
<p class="note">Placeholders only. Do not add quotes, emojis or social icons in signatures.</p>'''))
    P.append(pg(29, 'Email', 'Newsletter and proposal cover', f'''<div class="g2"><div class="tile" style="background:{INK};display:block;min-height:260px;color:#fff"><img src="/img/logo.svg" alt="" width="434" height="98" style="width:70%"><div class="kick" style="color:#FF2D63;margin-top:40px">Newsletter, Issue 01</div><h3 style="font-size:24px">What is coming up</h3></div>
<div class="tile" style="background:{CR};display:block;min-height:260px;color:#fff"><img src="/img/logo.svg" alt="" width="434" height="98" style="width:70%"><div class="kick" style="color:#fff;margin-top:40px">Proposal for [Client]</div><h3 style="font-size:24px">Event plan</h3></div></div>
<p class="note">Newsletter and proposal templates share the same cover. The newsletter sign-up is not yet connected to a mailing tool.</p>'''))
    P.append(pg(30, 'Use', 'Using this guide', '''<p>Questions about a piece not in this guide go to the brand owner before anything is printed or posted.</p>
<p>Master files, fonts and colour values are kept by Center Stage AV. Versions of this guide are numbered; always use the latest.</p>
<p class="note">Concept prepared by Chairlift. Designed and powered by Chairlift. Not for reuse or distribution.</p>'''))
    return P

def guide():
    body = ''.join(pages())
    return HEAD.format(title='Brand and style guide', CR=CR, INK=INK, INK2=INK2, GREY=GREY, PAPER=PAPER) + '<p class="note" style="margin:8px 4px 18px">Center Stage AV, brand and style guide, existing logo. 30 pages.</p>' + body + FOOT

if __name__ == '__main__':
    out = os.path.join(R, 'brand', 'guide'); os.makedirs(out, exist_ok=True)
    open(os.path.join(out, 'index.html'), 'w').write(guide())
    print('guide ok', len(pages()))

# ---- Three new palette and logo options (new marks, new colours), each on its own
OPTS = [
 dict(key='a', name='Option A: Spotlight', idea='A stage arch lit from above. Warm amber on midnight, calm and premium.',
      cols=[('Midnight', '#101828', 'Base'), ('Amber', '#F5A524', 'Accent'), ('Cream', '#F7F1E8', 'Paper')],
      bg='#101828', ink='#F7F1E8', acc='#F5A524',
      mark='<path d="M18 92 A42 42 0 0 1 102 92" fill="none" stroke="#F5A524" stroke-width="12" stroke-linecap="butt"/><rect x="10" y="98" width="100" height="8" fill="#F7F1E8"/><circle cx="60" cy="76" r="8" fill="#F7F1E8"/>'),
 dict(key='b', name='Option B: Truss', idea='A lighting truss grid with one live cell. Bold, technical, on-trend for tech-led shows.',
      cols=[('Graphite', '#1B1F24', 'Base'), ('Signal Blue', '#2D5BFF', 'Accent'), ('Steel', '#C9D1DB', 'Paper')],
      bg='#1B1F24', ink='#FFFFFF', acc='#2D5BFF',
      mark=''.join(f'<rect x="{18+i*34}" y="{18+j*34}" width="26" height="26" fill="{"#2D5BFF" if (i,j)==(1,1) else "none"}" stroke="#C9D1DB" stroke-width="4"/>' for i in range(3) for j in range(3))),
 dict(key='c', name='Option C: Proscenium', idea='A proscenium arch around a single gold spot. Classic theatre, modern colour.',
      cols=[('Plum', '#3A0F33', 'Base'), ('Gold', '#D9A441', 'Accent'), ('Ivory', '#FBF6EC', 'Paper')],
      bg='#3A0F33', ink='#FBF6EC', acc='#D9A441',
      mark='<path d="M16 100 V44 Q16 16 60 16 Q104 16 104 44 V100" fill="none" stroke="#D9A441" stroke-width="10"/><rect x="8" y="98" width="104" height="8" fill="#FBF6EC"/><circle cx="60" cy="58" r="11" fill="#D9A441"/>'),
]

def opt_block(o):
    mk = lambda bg, s, col: f'<svg viewBox="0 0 120 120" width="{s}" height="{s}" aria-hidden="true">{o["mark"]}</svg>'
    sw_html = ''.join(sw(n, h, r, '#fff' if i==0 else '#111') for i,(n,h,r) in enumerate([(a,b,c) for a,b,c in o['cols']]))
    lock = (f'<div style="display:flex;align-items:center;gap:16px">{mk(o["bg"],96,o["acc"])}'
            f'<div><div style="font:800 34px/1 Archivo,Arial Black,sans-serif;font-stretch:125%;color:{o["ink"]};letter-spacing:.01em">CENTER STAGE</div>'
            f'<div style="font:600 13px/1 \'JetBrains Mono\',monospace;letter-spacing:.42em;color:{o["acc"]};margin-top:8px">AUDIOVISUAL</div></div></div>')
    dark = f'<div class="tile" style="background:{o["bg"]};min-height:220px">{lock}</div>'
    light = f'<div class="tile" style="background:#fff;border:1px solid #0001;min-height:220px"><div style="display:flex;align-items:center;gap:14px"><svg viewBox="0 0 120 120" width="64" height="64">{o["mark"]}</svg><div style="font:800 22px/1 Archivo,Arial Black,sans-serif;font-stretch:125%;color:{o["bg"]}">CENTER STAGE<div style="font:600 10px \'JetBrains Mono\',monospace;letter-spacing:.4em;color:{o["bg"]};margin-top:6px;opacity:.8">AUDIOVISUAL</div></div></div></div>'
    card = (f'<div class="card" style="background:{o["bg"]};color:{o["ink"]};display:flex;flex-direction:column;justify-content:space-between">'
            f'<svg viewBox="0 0 120 120" width="34" height="34">{o["mark"]}</svg><div style="font:500 11px \'JetBrains Mono\',monospace;letter-spacing:.06em">FIRST LAST &middot; TITLE<br>name@centerstageav.com</div></div>')
    sig = (f'<div class="sig" style="border-left-color:{o["acc"]}"><b style="font:800 15px Archivo,sans-serif;font-stretch:118%;text-transform:uppercase">First Last</b><br>Title, Center Stage AV<br>Office, City &middot; +1 000 000 0000</div>')
    return (f'<section class="pg" id="{o["key"]}"><span class="pn">{o["key"].upper()}</span><div class="kick" style="color:{o["acc"]}">New option</div>'
            f'<h2>{o["name"]}</h2><p class="lead">{o["idea"]}</p>'
            f'<div class="g3">{sw_html}</div><div style="height:18px"></div>'
            f'{dark}<div style="height:12px"></div><div class="g2">{light}<div style="display:grid;gap:14px">{card}{sig}</div></div></section>\n')

def newopts():
    head = ('<section class="pg" style="background:#fff"><div class="kick">Three new directions</div><h2>Three new palettes and logos</h2>'
            '<p class="lead">Each option has its own palette, its own mark and its own lockup. Pick one direction; we then build the full guide on it.</p>'
            '<p class="note">Name shown: CENTER STAGE with AUDIOVISUAL underneath, which describes what they do: plan, produce and rent.</p></section>\n')
    return HEAD.format(title='New palette and logo options', CR=CR, INK=INK, INK2=INK2, GREY=GREY, PAPER=PAPER) + head + ''.join(opt_block(o) for o in OPTS) + FOOT

if __name__ == '__main__':
    out2 = os.path.join(R, 'brand', 'new'); os.makedirs(out2, exist_ok=True)
    open(os.path.join(out2, 'index.html'), 'w').write(newopts())
    print('new ok')
