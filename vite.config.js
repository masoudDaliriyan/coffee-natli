import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/coffee-shop/',
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, '/public'),
    },
  },
  build: {
    esbuild: {
      drop: ['console', 'debugger'], // removes console.* and debugger
    },
  },
})
