import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    //   manifest: true,
    //   rollupOptions: {
    //     output: {
    //       entryFileNames: 'assets/[name]-[hash].js',
    //       chunkFileNames: 'assets/[name]-[hash].js',
    //       assetFileNames: 'assets/[name]-[hash].[ext]',
    //     },
    //   },
    outDir: './dist/wwwroot',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    // middlewareMode: true
    proxy: {
      '/api-cotacao': {
        target: 'https://economia.awesomeapi.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-cotacao/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/dist/css/bootstrap.min.css";`,
      },
    },
  },
});
