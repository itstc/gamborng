import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [eslint(), viteTsConfigPaths()],
});
