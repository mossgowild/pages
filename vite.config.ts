import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

// Server-rendered on Vercel functions through Nitro (docs/site-rewrite.md Q5).
export default defineConfig({
  plugins: [tailwindcss(), tanstackStart(), nitro(), viteReact()],
})
