module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '../.eslintrc.json',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh', 'jsx-a11y'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['**/*.stories.tsx', '**/*.stories.ts'],
      rules: { 'no-console': 'off' },
    },
    {
      files: ['**/services/**/*.ts'],
      excludedFiles: [
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/api.ts',
        '**/attachments.service.ts',
      ],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector:
              'Literal[value=/^\\/api\\/v1/]',
            message:
              'Do not include "/api/v1" prefix in service endpoint paths. ' +
              'apiService already prepends it automatically. ' +
              'Use relative paths like "/workflows/..." instead.',
          },
          {
            selector:
              'TemplateLiteral > TemplateElement[value.raw=/\\/api\\/v1/]',
            message:
              'Do not include "/api/v1" prefix in service endpoint paths. ' +
              'apiService already prepends it automatically. ' +
              'Use relative paths like "/workflows/..." instead.',
          },
        ],
      },
    },
  ],
};
