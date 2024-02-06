import prettier from 'eslint-config-prettier';
import { editorconfig, js, json, jsonc, md, tests, ts } from './eslintConfig.js';

export { prettierConfig } from './prettierConfig.js';

export const eslintConfig = {
  md,
  json,
  jsonc,
  js,
  ts,
  tests,
  editorconfig,
  prettier,
} as const;
