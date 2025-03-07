import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'https://dtale.webc.in',
        changeOrigin: true,
        secure: true, // if the target uses HTTPS
      },
    },
  },
})
