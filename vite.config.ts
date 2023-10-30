import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
//import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //basicSsl(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
    })
  ]
})
