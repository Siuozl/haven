import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/haven/ on GitHub Pages.
  // For other hosts (Firebase, custom domain) set this back to '/'.
  base: '/haven/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
})
