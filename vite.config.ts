import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  /* '/' locally and on a custom domain; the GitHub Pages workflow sets
     BASE_PATH to the repo subfolder (/Flexi-Travel-and-Safari-website-demo/). */
  base: process.env.BASE_PATH || '/',
})
