import { readFileSync } from 'fs';
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

      const componentCode = `
        ${templateCode}
        export default { render: render }
      `;

      return {
        code: componentCode,
        map: null,
      };
    },
  };
}
