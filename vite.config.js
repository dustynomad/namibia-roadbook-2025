// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // <- GENAU dein Repo-Name:
  base: '/namibia-roadbook-2025/',
})