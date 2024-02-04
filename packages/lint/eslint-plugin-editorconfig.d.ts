import { Linter, Rule } from 'eslint';

declare module 'eslint-plugin-editorconfig' {
  export const configs: {
    all: Linter.Config;
  };

  export const rules: Record<string, Rule.RuleModule>;
}
