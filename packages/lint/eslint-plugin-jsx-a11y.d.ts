import { Linter, Rule } from 'eslint';

declare module 'eslint-plugin-jsx-a11y' {
  export const configs: {
    recommended: Linter.Config;
  };

  export const rules: Record<string, Rule.RuleModule>;
}
