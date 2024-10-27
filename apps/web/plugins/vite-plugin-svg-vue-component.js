import { readFileSync } from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import { compileTemplate } from '@vue/compiler-sfc';
import removeColor from './svgo-remove-color';

export default function svgVueComponentPlugin() {
  return {
    name: 'vite-plugin-svg-vue-component',
    transform(code, id) {
      if (!id.endsWith('.svg')) {
        return null;
      }

      const svg = readFileSync(id, 'utf8');
      const { data } = optimize(svg, {
        plugins: [
          'removeDoctype',
          'removeXMLProcInst',
          'removeComments',
          'removeMetadata',
          'removeEditorsNSData',
          'cleanupAttrs',
          'removeEmptyAttrs',
          removeColor,
        ],
      });

      const { code: templateCode } = compileTemplate({
        id: id,
        source: data,
        transformAssetUrls: false,
      });

      const fileName = path.basename(id, '.svg');
      const componentName = fileName.replace(/[^a-zA-Z0-9]/g, '');

      const componentCode = `
        ${templateCode}
        export default {
          name: '${componentName}Icon',
          render: render,
        }
      `;

      return {
        code: componentCode,
        map: null,
      };
    },
  };
}
