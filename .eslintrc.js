module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: ['react', 'import'],
  rules: {
    'comma-dangle': 0,
    'global-require': 0,
    'new-cap': [2, { capIsNewExceptions: ['List', 'Map', 'Set'] }],
    'no-alert': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,

    'indent': [2, 2, { SwitchCase: 1 }],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': ['error', 'never'],
    'import/default': 0,
    'import/extensions': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-danger': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'react/prop-types': 0,
    'require-jsdoc': 2,
    'jsx-a11y/href-no-hash': 0
  },
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src']
    }
  },
  globals: {
    __DEVTOOLS__: true
  }
}
