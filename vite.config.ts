import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the size limit to 1MB (default is 500 KB)
    cssCodeSplit: true
  },
  base: "/capstone-ibm-frontend-developer-medical-booking-website/",
  plugins: [react()],
});
