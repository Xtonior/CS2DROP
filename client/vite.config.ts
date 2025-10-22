import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    outDir: '../server/WebApi/wwwroot',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api':
      {
        target: 'http://localhost:5242',
        changeOrigin: true,
        secure: false,
      },
      '/images': 'http://localhost:5242'
    },
  },
})
