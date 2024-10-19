const fillElements = new Set([
  'svg',
  'circle',
  'ellipse',
  'path',
  'polygon',
  'polyline',
  'rect',
  'text',
  'textPath',
  'tref',
  'tspan',
  'g',
]);

const strokeElements = new Set([
  'svg',
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'text',
  'textPath',
  'tref',
  'tspan',
]);

module.exports = {
  name: 'removeColor',
  description: 'remove colors from svg',
  fn: () => {
    return {
      element: {
        enter: (node, parentNode) => {
          if (
            fillElements.has(node.name) &&
            node.attributes.fill != null &&
            node.attributes.fill !== 'none' &&
            node.attributes.fill !== 'inherit'
          ) {
            node.attributes.fill = 'currentColor';
          }

          if (
            strokeElements.has(node.name) &&
            node.attributes.stroke != null &&
            node.attributes.stroke !== 'none' &&
            node.attributes.stroke !== 'inherit'
          ) {
            node.attributes.stroke = 'currentColor';
          }
        },
      },
    };
  },
};
