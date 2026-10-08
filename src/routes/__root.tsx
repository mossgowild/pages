import { createRootRoute, Outlet } from '@tanstack/react-router'
import heroCss from '../styles/hero.css?raw'
import appCss from '../styles/app.css?url'

// The page's own scripts until the rewrite replaces them with components (docs/site-rewrite.md L2, L3). The wall's runs
// before the terrain's so its posters start downloading first (docs/motion-performance.md).
export const SCRIPTS = ['hero', 'topography', 'filters', 'accordion', 'pickers', 'scroll-motion', 'glass', 'poster-preview', 'event-detail', 'copy-share']

export const Route = createRootRoute({ component: RootDocument })

// ponytail: no <HeadContent /> or <Scripts />, so React neither preloads nor hydrates its bundle while the scripts above
// still own the page's behaviour; L2 adds them back with the first interactive components.
function RootDocument() {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0b0b10" />
        <meta name="description" content="2026 大湾区国庆电音活动指南。按城市、场地、日期与音乐风格查找派对，浏览完整阵容、海报和购票入口。" />
        <link rel="icon" href="assets/brand/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="assets/brand/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png" sizes="180x180" />
        <link rel="preload" href="assets/fonts/syne-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href="assets/site.css" />
        <link rel="stylesheet" href={appCss} />
        {/* Inlined so it does not block the first render as another stylesheet (docs/motion-performance.md). */}
        <style dangerouslySetInnerHTML={{ __html: heroCss.trim() }} />
        {SCRIPTS.map(name => <script key={name} src={`assets/${name}.js`} defer />)}
      </head>
      <body id="top">
        <Outlet />
      </body>
    </html>
  )
}
