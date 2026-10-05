"""Generate each poster's light version: a WebP with the short side at most 720px (docs/event-browsing.md).

The hero wall and the list rows show the light version first; the rows near the screen, the detail sheet and the full
image preview switch to the original. Run after adding or replacing a poster, before scripts/build_page.py.
Needs cwebp (Homebrew: brew install webp).
"""
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'assets/posters/sources.json'
SHORT_SIDE = 720
QUALITY = 80


def main():
    cwebp = shutil.which('cwebp')
    if not cwebp:
        raise SystemExit('cwebp not found: brew install webp')
    manifest = json.loads(MANIFEST.read_text())
    for image in manifest['images']:
        source = ROOT / image['path']
        light = source.with_name(f'{source.stem}.thumb.webp')
        image['thumbnail'] = light.relative_to(ROOT).as_posix()
        if light.exists() and light.stat().st_mtime >= source.stat().st_mtime:
            continue
        # Only the short side is scaled, down to 720px (0 keeps the aspect ratio); smaller posters keep their size.
        width, height = image['width'], image['height']
        size = (str(SHORT_SIDE), '0') if width <= height else ('0', str(SHORT_SIDE))
        resize = ['-resize', *size] if min(width, height) > SHORT_SIDE else []
        subprocess.run([cwebp, '-quiet', '-q', str(QUALITY), *resize, str(source), '-o', str(light)], check=True)
        print(f'wrote {image["thumbnail"]}')
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main()
