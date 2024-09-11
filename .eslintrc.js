module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort', 'flowtype', 'lingui'],
  rules: {
    'no-empty': 'off',
    'no-console': 'warn',
    'no-useless-escape': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'lingui/no-unlocalized-strings': [
      1,
      {
        ignoreFunction: ['test', 'makeStyles', 'withStyles'],
        ignoreAttribute: [
          'allow',
          'sx',
          'linearGradient',
          'rel',
          'labelClassName',
          'classes',
          'classNames',
        ],
        ignoreProperty: [
          'border',
          'background',
          'margin',
          'padding',
          'background',
          'backgroundClip',
          'backgroundImage',
          'backgroundPosition',
          'backgroundSize',
          'border',
          'borderImageSource',
          'borderColor',
          'borderTop',
          'borderLeft',
          'borderRight',
          'borderBottom',
          'borderRadius',
          'flexFlow',
          'transition',
          'transform',
          'filter',
          'rel',
        ],
      },
    ],
    'lingui/t-call-in-function': 2,
    'lingui/no-single-variables-to-translate': 2,
    'lingui/no-expression-in-message': 2,
    'lingui/no-single-tag-to-translate': 2,
    'lingui/no-trans-inside-trans': 2,
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'lingui/no-unlocalized-strings': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      files: [
        '*.test.ts',
        '*.spec.ts',
        '*.test.tsx',
        '*.spec.tsx',
        '*.stories.tsx',
      ],
      rules: {
        'lingui/no-unlocalized-strings': 'off',
      },
    },
  ],
};
