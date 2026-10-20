import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4242',
    },
  },
  build: {
    target: 'es2022',
    outDir: '../dist-ui',
    emptyOutDir: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          // three.js is only reachable through React.lazy, so it stays out of the initial load.
          if (id.includes('/three/')) return 'three';
          // React and the Radix/cmdk primitives import each other, so they share one vendor chunk.
          if (
            /[\\/](react|react-dom|scheduler)[\\/]/.test(id) ||
            id.includes('@radix-ui') ||
            id.includes('cmdk') ||
            id.includes('@floating-ui')
          ) {
            return 'vendor';
          }
          if (id.includes('@tanstack')) return 'query';
          return undefined;
        },
      },
    },
  },
});
