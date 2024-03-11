import { defineConfig } from 'vite'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: '3000'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve("./", 'index.html'),
        panel: resolve("./", 'panel/index.html'),
        caster: resolve("./", 'caster-screen/index.html')
      }
    }
  }
})
