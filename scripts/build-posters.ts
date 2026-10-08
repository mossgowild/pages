// Generate each poster's light versions: WebPs with the short side at most 720px and 400px (docs/event-browsing.md,
// docs/motion-performance.md).
//
// The hero wall and the list rows show the 720px light version first (the wall picks the 400px one where it covers its
// tiles, on low-density screens); the rows near the screen, the detail sheet and the full image preview switch to the
// full-size version, a same-size WebP of a PNG or JPG original.
// Run after adding or replacing a poster: bun run posters. Needs cwebp (Homebrew: brew install webp).
import { $ } from 'bun'
import { existsSync, statSync } from 'node:fs'

const PUBLIC = new URL('../public/', import.meta.url).pathname
const MANIFEST = `${PUBLIC}assets/posters/sources.json`
// Manifest field, file suffix and short side of each light version.
const VERSIONS = [['thumbnail', 'thumb', 720], ['thumbnail_small', 'thumb-400', 400]] as const
const QUALITY = 80
// The full-size version the page shows: the original's same-size WebP at high quality (docs/motion-performance.md Q34).
const FULL_QUALITY = 90

if (!Bun.which('cwebp')) throw new Error('cwebp not found: brew install webp')
const modified = (path: string) => existsSync(path) ? statSync(path).mtimeMs : -Infinity
const manifest = await Bun.file(MANIFEST).json()
for (const image of manifest.images) {
  const source = PUBLIC + image.path
  const stem = image.path.replace(/\.[^./]+$/, '')
  for (const [field, suffix, shortSide] of VERSIONS) {
    image[field] = `${stem}.${suffix}.webp`
    const light = PUBLIC + image[field]
    if (modified(light) >= modified(source)) continue
    // Only the short side is scaled down (0 keeps the aspect ratio); smaller posters keep their size.
    const size = image.width <= image.height ? [shortSide, 0] : [0, shortSide]
    const resize = Math.min(image.width, image.height) > shortSide ? ['-resize', ...size] : []
    await $`cwebp -quiet -q ${QUALITY} ${resize} ${source} -o ${light}`
    console.log(`wrote ${image[field]}`)
  }
  // Near the screen, in the detail sheet and in the preview the page shows the full-size version: a PNG or JPG original
  // as a WebP of the same size, keeping its colour profile; a WebP original is its own. The original file stays as the
  // source record. Should the WebP come out larger, the original is shown.
  if (image.path.endsWith('.webp')) {
    image.full = image.path
    continue
  }
  const full = `${stem}.full.webp`
  if (modified(PUBLIC + full) < modified(source)) {
    // High quality, or losslessly where the manifest marks a poster whose fine colour grain lossy coding softens
    // (full_lossless; docs/motion-performance.md Q36).
    const quality = image.full_lossless ? ['-lossless'] : ['-q', FULL_QUALITY]
    await $`cwebp -quiet ${quality} -m 6 -metadata icc ${source} -o ${PUBLIC + full}`
    console.log(`wrote ${full}`)
  }
  image.full = statSync(PUBLIC + full).size < statSync(source).size ? full : image.path
}
await Bun.write(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
