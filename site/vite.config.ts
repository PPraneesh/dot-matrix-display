import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dot-matrix-display/',
  plugins: [react()],
  build: {
    outDir: 'docs', // Ensure this is correctly set to 'docs' for GitHub Pages
  },
});
