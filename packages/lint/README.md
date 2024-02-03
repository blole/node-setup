# @blole/node-setup-lint

Uses the [new eslint configuration file format](https://eslint.org/docs/latest/use/configure/configuration-files-new)

## Installation

Can be installed into `eslint.config.js` like

```js
import { eslintConfig } from '@blole/node-setup-lint';

export default [
  eslintConfig.md,
  eslintConfig.json,
  eslintConfig.js,
  eslintConfig.ts,
  eslintConfig.tests,
  ...eslintConfig.editorconfig,
  eslintConfig.prettier,
];
```

And `prettier.config.js` like

```js
import { prettierConfig } from '@blole/node-setup-lint';

export default prettierConfig;
```
