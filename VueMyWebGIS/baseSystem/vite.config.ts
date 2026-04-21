import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueSetupExtend from "vite-plugin-vue-setup-extend"
// import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig(
  { 
    // base_URL:"/my-ap123131231312p/",
    server: {
      host: '0.0.0.0',
      port: 3001,
      open: true,
      proxy: {
        // '/api': {
        //     target: 'http://localhost:3002/api',
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, 'tttt'),
        // },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      // tailwindcss(),
      vueDevTools(),
      vueSetupExtend(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/assets/style/variables.scss" as *;',
            }
        }
    }
  });
