"""Generate each poster's light versions: WebPs with the short side at most 720px and 400px (docs/event-browsing.md,
docs/motion-performance.md).

The hero wall and the list rows show the 720px light version first (the wall picks the 400px one where it covers its tiles,
on low-density screens); the rows near the screen, the detail sheet and the full image preview switch to the full-size
version, a same-size WebP of a PNG or JPG original.
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
# The full-size version the page shows: the original's same-size WebP at high quality (docs/motion-performance.md Q34).
FULL_QUALITY = 90


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
        # Near the screen, in the detail sheet and in the preview the page shows the full-size version: a PNG or JPG
        # original as a WebP of the same size, keeping its colour profile; a WebP original is its own. The original file
        # stays as the source record. Should the WebP come out larger, the original is shown.
        if source.suffix == '.webp':
            image['full'] = image['path']
            continue
        full = source.with_name(f'{source.stem}.full.webp')
        if not (full.exists() and full.stat().st_mtime >= source.stat().st_mtime):
            # High quality, or losslessly where the manifest marks a poster whose fine colour grain lossy coding softens
            # (full_lossless; docs/motion-performance.md Q36).
            quality = ['-lossless'] if image.get('full_lossless') else ['-q', str(FULL_QUALITY)]
            subprocess.run([cwebp, '-quiet', *quality, '-m', '6', '-metadata', 'icc', str(source), '-o', str(full)], check=True)
            print(f'wrote {full.relative_to(ROOT).as_posix()}')
        image['full'] = (full if full.stat().st_size < source.stat().st_size else source).relative_to(ROOT).as_posix()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main()
