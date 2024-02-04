import { Linter, Rule } from 'eslint';

declare module 'eslint-plugin-react-hooks' {
  export const configs: {
    recommended: Linter.Config;
  };

  export const rules: Record<string, Rule.RuleModule>;
}
