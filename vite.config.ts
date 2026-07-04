import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { GITHUB_PAGES_BASE } from './src/config/site.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: GITHUB_PAGES_BASE,
})
