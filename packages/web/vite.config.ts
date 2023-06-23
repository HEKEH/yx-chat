import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx()],
    envDir: resolve(__dirname, '../../'),
    envPrefix: 'PUBLIC_',
    resolve: {
      alias: {
        '~': resolve(__dirname, './src/'),
      },
    },
  };
});
