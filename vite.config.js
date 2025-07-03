import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/QR_code_generator/',
  plugins: [react()]
})
