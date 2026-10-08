"""Generate each poster's light versions: WebPs with the short side at most 720px and 400px (docs/event-browsing.md,
docs/motion-performance.md).

The hero wall and the list rows show the 720px light version first (the wall picks the 400px one where it covers its tiles,
on low-density screens); the rows near the screen, the detail sheet and the full image preview switch to the original.
Run after adding or replacing a poster, before scripts/build_page.py.
Needs cwebp (Homebrew: brew install webp).
"""
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'assets/posters/sources.json'
# Manifest field, file suffix and short side of each light version.
VERSIONS = (('thumbnail', 'thumb', 720), ('thumbnail_small', 'thumb-400', 400))
QUALITY = 80


def main():
    cwebp = shutil.which('cwebp')
    if not cwebp:
        raise SystemExit('cwebp not found: brew install webp')
    manifest = json.loads(MANIFEST.read_text())
    for image in manifest['images']:
        source = ROOT / image['path']
        width, height = image['width'], image['height']
        for field, suffix, short_side in VERSIONS:
            light = source.with_name(f'{source.stem}.{suffix}.webp')
            image[field] = light.relative_to(ROOT).as_posix()
            if light.exists() and light.stat().st_mtime >= source.stat().st_mtime:
                continue
            # Only the short side is scaled down (0 keeps the aspect ratio); smaller posters keep their size.
            size = (str(short_side), '0') if width <= height else ('0', str(short_side))
            resize = ['-resize', *size] if min(width, height) > short_side else []
            subprocess.run([cwebp, '-quiet', '-q', str(QUALITY), *resize, str(source), '-o', str(light)], check=True)
            print(f'wrote {image[field]}')
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main()
