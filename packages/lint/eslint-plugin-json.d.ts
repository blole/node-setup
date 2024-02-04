import { Linter } from 'eslint';

declare module 'eslint-plugin-json' {
  export const configs: Record<string, Linter.Config>;

  export const processors: {
    '.json': Linter.Processor<Linter.ProcessorFile>;
  };

  export const rules: Record<string, Rule.RuleModule>;
}
