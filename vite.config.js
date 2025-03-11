import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'https://dtale.webc.in',
        changeOrigin: true,
        secure: true, // Keeps HTTPS intact
        ws: true, // In case you use WebSockets later
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
      },
    },
  },
})
