import { eslintConfig } from './dist/index.js';

export default [
  {
    ignores: ['dist/'],
  },
  eslintConfig.md,
  eslintConfig.json,
  eslintConfig.jsonc,
  eslintConfig.js,
  eslintConfig.ts,
  eslintConfig.tests,
  ...eslintConfig.editorconfig,
  eslintConfig.prettier,
];
