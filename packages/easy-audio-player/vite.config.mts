import { resolve } from 'path';
import { readFileSync } from 'fs';
import { AliasOptions, defineConfig, PluginOption, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig(() => {
  const pkg = JSON.parse(
    readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
  );

  const alias: AliasOptions = {
    '~': resolve(__dirname, './src/'),
    '@': resolve(__dirname, './'),
  };

  const config: UserConfig = {
    plugins: [
      vue() as PluginOption,
      vueJsx() as PluginOption,
      cssInjectedByJsPlugin(),
      dts({
        include: ['src/**/*.ts', 'src/**/*.vue'],
        outDir: 'dist',
        tsconfigPath: './tsconfig.app.json',
        rollupTypes: true,
      }),
    ],
    build: {
      minify: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'EasyAudioPlayer',
        formats: ['es', 'cjs'],
        fileName: format => `index.${format}.js`,
      },
      rollupOptions: {
        external: [
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.peerDependencies || {}),
        ],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      sourcemap: true,
    },
    resolve: {
      alias,
    },
  };
  return config;
});
