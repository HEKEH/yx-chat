import { resolve } from 'path';
import { AliasOptions, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envPrefix = 'PUBLIC_';
  loadEnv(mode, '../../', envPrefix);
  // const env = loadEnv(mode, '../../', envPrefix);
  // let path = env.PUBLIC_SERVER_BASE_URL;
  // if (path && env.PUBLIC_SERVER_PORT) {
  //   path = `${path}:${env.PUBLIC_SERVER_PORT}`;
  // }
  const alias: AliasOptions = {
    '~': resolve(__dirname, './src/'),
    '@': resolve(__dirname, './'),
  };
  const packagesDir = resolve(__dirname, '../../packages/');
  if (mode === 'development') {
    alias['@yx-chat/i18n'] = resolve(packagesDir, './i18n/src'); // develop mode redirect
    alias['@yx-chat'] = packagesDir; // develop mode redirect
  }

  // const serverPath =
  //   path || (mode === 'development' ? 'http://localhost:6870' : '/');

  return {
    define: {
      // see https://stackoverflow.com/questions/66140411/you-are-running-the-esm-bundler-build-of-vue-i18n-it-is-recommended-to-configur
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    plugins: [vue(), vueJsx()],
    envDir: resolve(__dirname, '../../'),
    envPrefix,
    resolve: {
      alias,
    },
    // server: {
    //   proxy: {
    //     '/avatar': serverPath,
    //     '/GroupAvatar': serverPath,
    //     '/Avatar': {
    //       target: serverPath,
    //       rewrite: path => path.replace(/^\/Avatar/, '/avatar'),
    //     },
    //   },
    // },
  };
});
