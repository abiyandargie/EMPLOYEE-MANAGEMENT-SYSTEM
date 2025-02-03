// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Needed for resolving aliases

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define an alias for the 'src' folder for cleaner imports
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Optional: Configure the dev server
    port: 3000, // Default port for the dev server
    open: true, // Automatically open the browser
  },
  build: {
    // Optional: Build-specific configurations
    outDir: 'dist', // Output directory for production build
    sourcemap: true, // Enable sourcemaps for debugging
  },
});
