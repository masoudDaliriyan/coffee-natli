import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/coffee-shop/',
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, '/public'),
    },
  },
})
