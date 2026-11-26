"""Build tammy-gillis/index.html from src/index.src.html, inlining Tammy's real logo SVG (unchanged paths)."""
import re, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
svg = (R / 'img/logo.svg').read_text()
paths = re.findall(r'<path d="([^"]+)" fill="([^"]+)"/>', svg)
cls = ['lg-tag', 'lg-w', 'lg-w', 'lg-w', 'lg-w', 'lg-w', 'lg-w', 'lg-p3', 'lg-p2', 'lg-p1']
def logo(extra=''):
    ps = ''.join(f'<path class="{c}" d="{d}" fill="{f}"/>' for (d, f), c in zip(paths, cls))
    return f'<svg class="lg {extra}" viewBox="0 0 313 80" role="img" aria-label="Gillis, Your Competitive Advantage"><title>Gillis</title>{ps}</svg>'
def mark(extra=''):
    ps = ''.join(f'<path class="{c}" d="{d}" fill="{f}"/>' for (d, f), c in zip(paths, cls) if c.startswith('lg-p'))
    return f'<svg class="mk {extra}" viewBox="-1 2 64 70" aria-hidden="true">{ps}</svg>'
src = (R / 'src/index.src.html').read_text()
src = re.sub(r'\{\{LOGO(?::([\w-]+))?\}\}', lambda m: logo(m.group(1) or ''), src)
src = re.sub(r'\{\{MARK(?::([\w-]+))?\}\}', lambda m: mark(m.group(1) or ''), src)
(R / 'index.html').write_text(src)
print('built', len(src))

# Shipped files carry no comments or notes: strip HTML, CSS and JS comments (sources stay in src/, which is never served).
import subprocess
html = (R / 'index.html').read_text()
html = re.sub(r'<!--(?!\[).*?-->\s*', '', html, flags=re.S)
(R / 'index.html').write_text(html)
css = (R / 'src/site.src.css').read_text()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = '\n'.join(l.rstrip() for l in css.splitlines() if l.strip()) + '\n'
(R / 'site.css').write_text(css)
subprocess.run(['node', str(R / 'src/strip.js'), str(R / 'src/site.src.js'), str(R / 'site.js')], check=True)
print('stripped comments from index.html, site.css, site.js')
