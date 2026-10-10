from pathlib import Path
import base64
import re
from PIL import Image, ImageOps, ImageDraw
from io import BytesIO

project = Path('/home/ubuntu/alfurqan-school-management')
assets = Path('/home/ubuntu/webdev-static-assets')
assets.mkdir(parents=True, exist_ok=True)
source = (project / 'client/src/pages/Home.tsx').read_text()
match = re.search(r'const logo = "data:image/jpeg;base64,([^"]+)";', source)
if not match:
    raise SystemExit('Embedded academy logo was not found')
logo = Image.open(BytesIO(base64.b64decode(match.group(1)))).convert('RGBA')
logo.thumbnail((360, 360), Image.Resampling.LANCZOS)
for size, filename in ((192, 'alfurqan-icon-192.png'), (512, 'alfurqan-icon-512.png')):
    canvas = Image.new('RGBA', (size, size), '#29206f')
    draw = ImageDraw.Draw(canvas)
    margin = int(size * 0.08)
    draw.rounded_rectangle((margin, margin, size - margin, size - margin), radius=int(size * 0.18), fill='#5b3cc4')
    badge = Image.new('RGBA', (int(size * .72), int(size * .72)), '#ffffff')
    badge.putalpha(ImageOps.fit(Image.new('L', badge.size, 255), badge.size, centering=(0.5, 0.5)))
    bx = (size - badge.width) // 2
    by = (size - badge.height) // 2
    canvas.alpha_composite(badge, (bx, by))
    lx = (size - logo.width * size // 512) // 2
    scaled = logo.resize((max(1, logo.width * size // 512), max(1, logo.height * size // 512)), Image.Resampling.LANCZOS)
    lx = (size - scaled.width) // 2
    ly = (size - scaled.height) // 2
    canvas.alpha_composite(scaled, (lx, ly))
    canvas.save(assets / filename, 'PNG', optimize=True)
print('Created:', assets / 'alfurqan-icon-192.png', assets / 'alfurqan-icon-512.png')
