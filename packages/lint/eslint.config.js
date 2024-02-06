import { eslintConfig } from './dist/index.js';

export default [
  {
    ignores: ['dist/', '@typescript-eslint/'],
  },
  eslintConfig.md,
  eslintConfig.json,
  eslintConfig.js,
  eslintConfig.ts,
  eslintConfig.tests,
  ...eslintConfig.editorconfig,
  eslintConfig.prettier,
];
