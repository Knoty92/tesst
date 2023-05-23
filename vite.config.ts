import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    server: { port: 4003 },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "./src"),
        }
    },
    css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "./src/assets/scss/common.scss";`
          }
        }
      },
    plugins: [vue()],
})
