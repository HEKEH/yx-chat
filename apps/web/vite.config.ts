import type { AliasOptions } from 'vite';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig, loadEnv } from 'vite';
import svgVueComponentPlugin from './plugins/vite-plugin-svg-vue-component';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envPrefix = 'PUBLIC_';
  loadEnv(mode, '../../', envPrefix);
  // const env = loadEnv(mode, '../../', envPrefix);
  // let path = env.PUBLIC_SERVER_URL;
  const alias: AliasOptions = {
    '~': resolve(__dirname, './src/'),
    '@': resolve(__dirname, './'),
  };
  const packagesDir = resolve(__dirname, '../../packages/');
  if (mode === 'development') {
    // develop mode redirect
    alias['@yx-chat/i18n'] = resolve(packagesDir, './i18n/src');
    alias['@yx-chat/shared'] = resolve(packagesDir, './shared/src');
  }

  return {
    define: {
      // see https://stackoverflow.com/questions/66140411/you-are-running-the-esm-bundler-build-of-vue-i18n-it-is-recommended-to-configur
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    server: {
      watch: {
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          resolve(__dirname, '../!(web)/**'), // ignore all apps except web
        ],
      },
    },
    plugins: [vue(), vueJsx(), svgVueComponentPlugin()],
    envDir: resolve(__dirname, '../../'),
    envPrefix,
    resolve: {
      alias,
    },
  };
});
