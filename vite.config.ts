import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署在 /ai_email_demo/ 路徑下
  base: '/ai_email_demo/',
});
