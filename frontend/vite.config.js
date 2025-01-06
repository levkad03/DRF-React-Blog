import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   include: ['@mui/material/Tooltip', '@emotion/styled', '@mui/material/Unstable_Grid2'],
  // },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
});
