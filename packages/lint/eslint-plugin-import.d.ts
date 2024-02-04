import { Linter, Rule } from 'eslint';

declare module 'eslint-plugin-import' {
  export const configs: {
    react: Linter.Config;
    recommended: Linter.Config;
    typescript: Linter.Config;
  };

  export const rules: Record<string, Rule.RuleModule>;
}
