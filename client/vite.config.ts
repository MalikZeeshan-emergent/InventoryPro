import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
  css: {
    devSourcemap: true,
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://inventorypro-production-86d5.up.railway.app'),
  },
})