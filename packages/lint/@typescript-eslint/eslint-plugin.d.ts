import { Linter, Rule } from 'eslint';

declare module '@typescript-eslint/eslint-plugin' {
  export const configs: {
    'eslint-recommended': {
      overrides: [Linter.Config];
    };
    recommended: Linter.Config;
    'recommended-requiring-type-checking': Linter.Config;
  };

  export const rules: Record<string, Rule.RuleModule>;
}
