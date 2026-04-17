import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'icons/*.png', 'fonts/*.ttf', 'fonts/*.woff'],
      manifest: {
        name: 'Corporeitura: Espiral de Experiência',
        short_name: 'Corporeitura',
        description: 'Uma visualização imersiva da espiral de experiência.',
        theme_color: '#0a1628',
        background_color: '#0a1628',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});