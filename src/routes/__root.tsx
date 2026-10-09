import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import heroCss from '../styles/hero.css?raw'
import appCss from '../styles/app.css?url'

// The page's own scripts still drawing the hero wall and the terrain until L3 replaces them (docs/site-rewrite.md). The
// wall's runs before the terrain's so its posters start downloading first (docs/motion-performance.md); both run before
// React hydrates, which leaves what they draw alone.
export const SCRIPTS = ['hero', 'topography']

export const Route = createRootRoute({ component: RootDocument })

function RootDocument() {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0b0b10" />
        <meta name="description" content="2026 大湾区国庆电音活动指南。按城市、场地、日期与音乐风格查找派对，浏览完整阵容、海报和购票入口。" />
        <HeadContent />
        <link rel="icon" href="assets/brand/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="assets/brand/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png" sizes="180x180" />
        <link rel="preload" href="assets/fonts/syne-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href={appCss} />
        {/* The hero wall's stylesheet, inlined so it does not block the first render as another stylesheet
            (docs/motion-performance.md), as components between the base and the utilities. */}
        <style dangerouslySetInnerHTML={{ __html: `@layer components{${heroCss.trim()}}` }} />
        {SCRIPTS.map(name => <script key={name} src={`assets/${name}.js`} defer />)}
        {/* The list takes its accordion look once the page has been parsed, as it did before the rewrite: the rows collapse
            over 0.6s then, alongside the wall and the terrain starting, rather than later when React has hydrated. */}
        <script type="module" dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('accordion-ready')" }} />
      </head>
      <body id="top">
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
