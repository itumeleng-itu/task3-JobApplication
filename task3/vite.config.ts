import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Exposes the server to the network
    port: 5174, // Sets the desired port
    strictPort: true, // Ensures the server fails if the port is unavailable
    },
})
