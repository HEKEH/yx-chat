import { resolve } from 'path';
import { AliasOptions, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode, 'mode');
  const envPrefix = 'PUBLIC_';
  const env = loadEnv(mode, '../../', envPrefix);
  let path = env.PUBLIC_SERVER_BASE_URL;
  if (path && env.PUBLIC_SERVER_PORT) {
    path = `${path}:${env.PUBLIC_SERVER_PORT}`;
  }
  const serverPath =
    path || (mode === 'development' ? 'http://localhost:6870' : '/');
  const alias: AliasOptions = {
    '~': resolve(__dirname, './src/'),
    '@': resolve(__dirname, './'),
  };
  return {
    plugins: [vue(), vueJsx()],
    envDir: resolve(__dirname, '../../'),
    envPrefix,
    resolve: {
      alias,
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
