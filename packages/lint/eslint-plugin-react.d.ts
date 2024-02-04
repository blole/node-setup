import { Linter, Rule } from 'eslint';

declare module 'eslint-plugin-react' {
  export const configs: {
    recommended: Linter.Config;
    'jsx-runtime': Linter.Config;
  };

  export const rules: Record<string, Rule.RuleModule>;
}
