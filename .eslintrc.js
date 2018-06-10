module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'flowtype'],
  rules: {
    'react/prop-types': ['off'],
    'no-console': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['warn', { allow: ['info', 'error'] }],
    'arrow-parens': ['error', 'always'],
    'linebreak-style': ["error", "windows"],
    "flowtype/define-flow-type": 1,
    "flowtype/space-before-type-colon": [
      1,
      "never"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1,
    "flowtype/type-id-match": [
      2,
      "^([A-Z]+[a-z0-9A-Z]*)$"
    ]
  },
};