# Web Vitals full audit

```
URL:        https://events.cardioravers.com/   (2026-10-06)
Build dir:  none — static site without a bundler output directory; bundle analysis skipped

Environment
-----------
Node:            v24.18.0
Lighthouse:      13.5.0 (via npx)
Chrome:          system 154.0.8037.98

Lighthouse results
==================
Desktop  Perf 78   LCP 1.5s [pass]  CLS 0.000 [pass]  INP n/a  TBT 272ms [warn]  TTI 1.5s [pass]
Mobile   Perf 74   LCP 5.3s [fail]  CLS 0.009 [pass]  INP n/a  TBT 128ms [pass]  TTI 5.3s [warn]

Top mobile fixes (prioritized by distance from pass)
----------------------------------------------------
1. Speed Index 5.2s [warn, 1.8s over] and LCP 5.3s [fail, 2.8s over]: the LCP is a hero-wall poster that
   hero.js requests only after building the wall (not in the initial document, no fetchpriority); hero.js runs
   after topography.js, whose init is a 178ms long task. Fix: run the wall first, init the terrain after it,
   serve wall tiles a 360px variant when that is enough.
2. TTI 5.3s [warn, 1.5s over]: 8.0s main-thread work, 5.9s attributed to topography.js (script 0.9s plus the
   style, layout and paint it triggers, incl. 55-64ms forced reflows from reading layout every frame).
   Fix: cache the positions it needs instead of reading layout each frame.
3. FCP 1.8s [warn, at the edge]: site.css blocks rendering (~150ms est.), hero.css adds a second blocking request.
4. TBT 272ms on desktop [warn, 72ms over]: terrain and wall init long tasks during load.

Bundle findings
---------------
Skipped: no dist/ or .next/; scripts are hand-written or single-file bun builds (topography.js bundles ogl).

Image findings
--------------
94 <img>: all sized, all WebP, all lazy (unsized-images passes)
Hero-wall LCP poster not discoverable / not high priority (lcp-discovery-insight fails)
~2.1MB (mobile) to ~2.5MB (desktop) saveable by serving display-sized images: light versions are 720px on the
short side while wall tiles are 150-380 CSS px

Font findings
-------------
4 @font-face, all font-display: swap; Syne latin subset preloaded; no external font service

Runtime (frame drops; beyond Lighthouse)
----------------------------------------
50 non-composited animations at load: collapsed rows transition the custom property --open
Headed Chrome, 120Hz display: all on, scrolling 101-114fps, opening a detail 97-104fps, filter panel ~93fps;
turning off backdrop blur alone brings all of them back to 120fps

Suggested next steps, in priority order
---------------------------------------
1. Frame drops (L1, no visual change): parallax measures only on-screen posters and reads before writing;
   terrain uses cached positions, caps at 60fps on 120Hz screens and pauses under panels and overlays; glass
   covered by a veil stops blurring and the veil fades instead of animating its blur; no --open transitions
   when the page becomes ready; off-screen divider stars pause.
2. Load (L2): hero.js before topography.js and terrain init after the wall starts its downloads; a 360px
   wall variant picked by tile width; hero.css inlined.
```
