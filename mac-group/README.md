# MAC Group of Companies preview (12 Nov 2026)

Private preview for Ryan. Nothing here is on the companies' real domains.

- MAC Group (parent): https://ryan-peddigrew.github.io/sites/mac-group/
- MAC Show Systems: .../mac-group/show-systems/ (live availability, floor planner, quote builder, equipment sales)
- PSI: .../mac-group/psi/ (book a crew, package builder, training sign-ups)
- Tour Trucking: .../mac-group/tour-trucking/ (multi-stop route request, truck space calculator, drive with us)
- MGC Hub staff app: .../mac-group/hub/
- Client apps (Planner, Crew Call, Track My Load): .../mac-group/apps/
- Tour of what changed: .../mac-group/?tour=1

Rules (Ryan): brands separate in public; clients only ever see the company they deal with. Only the parent links all three. Availability only, never prices. Edit build.py and run `python3 build.py`; tools in tools.js, hub.js, apps.js.

## Open before go-live
1. Real inventory list (all sample now), real crew roster, real course list for PSI.
2. Own photos: Tour Trucking, stage-lights, room-screen and warehouse photos are Unsplash stand-ins (marked).
3. Vector logos for MAC Show Systems and PSI; Tour Trucking has no logo (current site is another carrier's template). MAC Group mark is a typographic placeholder: logo options still to show Ryan.
4. Forms don't send yet. Need a destination email per company; Tour Trucking email and address to confirm.
5. Confirm which PSI photo goes with which project.

## Added 2026-11-12 (6:00 AM ET)
- Client dashboard apps (installable): apps/mss/, apps/psi/, apps/ttl/ (client-app.js, app.css). Sample data only.
- Staff Quote Builder: hub/quote.html (quote.js). Rep types every rate; no prices stored or invented. Branded PDF via Save as PDF.
- Chairlift watermark on every page (mac.js + mac.css `.wm`, `.wm-badge`). Remove before any hand-over.
- Tour order: MAC Group, MAC Show Systems (+ app), PSI (+ app), Tour Trucking (+ app), MGC Hub, Quote Builder, apps, next steps.
- Open: Ryan's logos carry "A Division of MAC Group of Companies", which conflicts with separate-in-public. Confirm which to use.
