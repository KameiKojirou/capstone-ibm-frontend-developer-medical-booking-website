import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/capstone-ibm-frontend-developer-medical-booking-website",
  plugins: [react()],
})
