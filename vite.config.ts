import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build:{
    rollupOptions:{
      input: "./src/index.tsx"
    }
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
})
