import { eslintConfig } from '../../packages/lint/src/index.js';

export default [
  eslintConfig.md,
  eslintConfig.json,
  eslintConfig.js,
  eslintConfig.ts,
  eslintConfig.tests,
  ...eslintConfig.editorconfig,
  eslintConfig.prettier,
];
