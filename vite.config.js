import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false
})
