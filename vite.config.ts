import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.port || 8080

export default defineConfig({
  server: {
    proxy:{
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true
      }
    }
  },
  build:{
    outDir: "dist/app"
  },
  plugins: [react()],
})
