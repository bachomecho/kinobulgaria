import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.port || 8080

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `http://localhost:${PORT}`,
    },
  },
  build: {
    outDir: 'dist/app',
    emptyOutDir: true,
  },
});


