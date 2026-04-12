import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Tailwind v4 is configured via postcss.config.js with @tailwindcss/postcss
// For Storybook, the plugin is added dynamically in .storybook/main.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
