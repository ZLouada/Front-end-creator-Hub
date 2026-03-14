import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // This generates a temporary self-signed certificate
  ],
  server: {
    https: true, // Force HTTPS
    port: 5173,
  }
});