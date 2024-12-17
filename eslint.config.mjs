import antfu from '@antfu/eslint-config';

export default antfu({
  rules: {
    'style/semi': 'off',
    'style/operator-linebreak': 'off',
    'style/arrow-parens': 'off',
    'style/brace-style': 'off',
    'style/member-delimiter-style': 'off',
    'style/multiline-ternary': 'off',
    'style/quote-props': 'off',
    'no-console': 'warn',
    'antfu/if-newline': 'off',
    'style/indent': 'off',
    'style/indent-binary-ops': 'off',
    'style/quotes': 'off',
  },
});
