import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

// Server-rendered on Vercel functions through Nitro (docs/site-rewrite.md Q5).
// The CSS is shipped as written: the optimizer rewrites colours to 8-bit hex and folds `translate` into `transform`,
// which moves and tints things by fractions of a pixel against the page before the rewrite.
export default defineConfig({
  plugins: [tailwindcss({ optimize: false }), tanstackStart(), nitro(), viteReact()],
  build: { cssMinify: false },
})
