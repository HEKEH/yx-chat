import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envPrefix = 'CLIENT_';
  const env = loadEnv(mode, '../../', envPrefix);
  const serverPath =
    env.CLIENT_SERVER_PATH ||
    (mode === 'development' ? 'http://localhost:9200' : '/');
  return {
    plugins: [vue(), vueJsx()],
    envDir: resolve(__dirname, '../../'),
    envPrefix,
    resolve: {
      alias: {
        '~': resolve(__dirname, './src/'),
      },
    },
    server: {
      proxy: {
        '/avatar': serverPath,
        '/GroupAvatar': serverPath,
        '/Avatar': {
          target: serverPath,
          rewrite: path => path.replace(/^\/Avatar/, '/avatar'),
        },
      },
    },
  };
});
