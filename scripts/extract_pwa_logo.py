from pathlib import Path
import re

source = Path('/home/ubuntu/alfurqan-school-management/client/src/pages/Home.tsx').read_text()
for pattern in (r'const logo[^;]{0,500};', r'const logoFallback[^;]{0,500};'):
    match = re.search(pattern, source)
    print(match.group(0) if match else f'NO MATCH: {pattern}')
