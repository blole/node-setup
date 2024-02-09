# @blole/node-setup-lint

Some default configs for linting react, typescript, javascript, json, markdown, etc.
Uses the [new eslint configuration file format](https://eslint.org/docs/latest/use/configure/configuration-files-new)

## Installation

1. Add the `devDependency` and a script

   ```
   {
     "scripts": {
       "lint": "eslint '**/*.{js,jsx,ts,tsx,json,md,html}' --max-warnings=0"
     },
     "devDependencies": {
       "@blole/node-setup-lint": "x.x.x"
     }
   }
   ```

2. Create a `eslint.config.js` like

   ```js
   import { eslintConfig } from '@blole/node-setup-lint';

   export default [
     eslintConfig.md,
     eslintConfig.json,
     eslintConfig.jsonc,
     eslintConfig.js,
     eslintConfig.ts,
     eslintConfig.tests,
     ...eslintConfig.editorconfig,
     eslintConfig.prettier,
   ];
   ```

3. Create a `prettier.config.js` like

   ```js
   import { prettierConfig } from '@blole/node-setup-lint';

   export default prettierConfig;
   ```

See [apps/linted-example/](../../apps/linted-example/) for an example.
