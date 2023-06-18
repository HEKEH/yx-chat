import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx()],
    envDir: resolve(__dirname, '../../'),
    envPrefix: 'PUBLIC_',
    resolve: {
      alias: {
        '~/assets': resolve(__dirname, './src/assets/'),
        '~/common': resolve(__dirname, './src/common/'),
        '~/components': resolve(__dirname, './src/components/'),
        '~/domain': resolve(__dirname, './src/domain/'),
        '~/infrastructure': resolve(__dirname, './src/infrastructure/'),
        '~/types': resolve(__dirname, './src/types/'),
        '~/utils': resolve(__dirname, './src/utils/'),
      },
    },
  };
});
