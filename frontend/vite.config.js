import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Change 'localhost' to '127.0.0.1'
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
});