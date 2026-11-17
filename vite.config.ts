import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site (dptspartan.github.io) is served from the domain root.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  // three.js is lazy-loaded with the hero scene, so its chunk never blocks first paint.
  build: { chunkSizeWarningLimit: 700 },
})
