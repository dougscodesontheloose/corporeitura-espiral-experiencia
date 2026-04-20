import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Crucial for GitHub Pages: ensures assets use relative paths (e.g., "./assets/index.js")
  // instead of absolute paths which break in subdirectories.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});