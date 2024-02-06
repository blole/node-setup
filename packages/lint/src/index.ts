import prettier from 'eslint-config-prettier';
import {
  configEditorconfig,
  configJs,
  configJson,
  configJsonc,
  configMd,
  configTests,
  configTs,
} from './eslintConfig.js';

export { prettierConfig } from './prettierConfig.js';

export const eslintConfig = {
  md: configMd,
  json: configJson,
  jsonc: configJsonc,
  js: configJs,
  ts: configTs,
  tests: configTests,
  editorconfig: configEditorconfig,
  prettier,
} as const;
