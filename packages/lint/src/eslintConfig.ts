import type { ESLint, Linter } from 'eslint';
import pluginMarkdown from 'eslint-plugin-markdown';
/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import _parserTs from '@typescript-eslint/parser';
// @ts-ignore
import _pluginTs from '@typescript-eslint/eslint-plugin';
// @ts-ignore
import _pluginEditorconfig from 'eslint-plugin-editorconfig';
// @ts-ignore
import _pluginImport from 'eslint-plugin-import';
// @ts-ignore
import _pluginJson from 'eslint-plugin-json';
// @ts-ignore
import _pluginJsxA11y from 'eslint-plugin-jsx-a11y';
// @ts-ignore
import _pluginReact from 'eslint-plugin-react';
// @ts-ignore
import _pluginReactHooks from 'eslint-plugin-react-hooks';
/* eslint-enable */

/**
 * I didn't manage to get the `.d.ts`-files to work and be included in
 *  the build, so I just declared the types like did this instead of e.g.
 * ```ts
 * // eslint-plugin-import.d.ts
 * declare module 'eslint-plugin-import' {
 *   export const configs: {};
 *   export const rules: {};
 * }
 * ```
 */
type NarrowedPlugin<Configs extends string, Processors extends string = never> = ESLint.Plugin & {
  configs: Record<Configs, ESLint.ConfigData<Record<Configs, Linter.RuleEntry>>>;
  processors: Record<Processors, Linter.Processor<Linter.ProcessorFile>>;
};

const parserTs = _parserTs as Linter.ParserModule;
const pluginTs = _pluginTs as NarrowedPlugin<'recommended' | 'eslint-recommended' | 'recommended-requiring-type-checking'>;
const pluginEditorconfig = _pluginEditorconfig as NarrowedPlugin<'all'>;
const pluginImport = _pluginImport as NarrowedPlugin<'react' | 'recommended' | 'typescript'>;
const pluginJson = _pluginJson as NarrowedPlugin<never, '.json'>;
const pluginJsxA11y = _pluginJsxA11y as NarrowedPlugin<'recommended'>;
const pluginReact = _pluginReact as NarrowedPlugin<'recommended' | 'jsx-runtime'>;
const pluginReactHooks = _pluginReactHooks as NarrowedPlugin<'recommended'>;

const tsFiles = [
  '*.ts',
  '*.tsx',
  '*.cts',
  '*.mts',
  '*.mtsx',
  'src/**/*.ts',
  'src/**/*.tsx',
  'src/**/*.cts',
  'src/**/*.mts',
  'src/**/*.mtsx',
] as const;

const jsFiles = [
  '*.js',
  '*.jsx',
  '*.cjs',
  '*.mjs',
  '*.mjsx',
  'src/**/*.js',
  'src/**/*.jsx',
  'src/**/*.cjs',
  'src/**/*.mjs',
  'src/**/*.mjsx',
] as const;

const jsoncFiles = ['tsconfig.json'] as const;

const languageOptions = {
  parser: parserTs,
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true, // react/recommended, import/react
    },
    sourceType: 'module', //@typescript-eslint/base, import/recommended
    jsxPragma: null, // react/jsx-runtime
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
} as const;

export const md = {
  files: ['*.md', 'src/**/*.md'],
  plugins: {
    markdown: pluginMarkdown,
  },
  processor: 'markdown/markdown',
} satisfies Linter.FlatConfig;

export const json = {
  files: ['*.json', 'src/**/*.json'],
  ignores: [...jsoncFiles],
  plugins: {
    json: pluginJson,
  },
  rules: {
    'json/*': ['error', { allowComments: true }],
  },
  processor: pluginJson.processors['.json'],
} satisfies Linter.FlatConfig;

export const jsonc = {
  files: [...jsoncFiles],
  ignores: [],
  plugins: {
    json: pluginJson,
  },
  rules: {
    'json/undefined': 'error',
    'json/enum-value-mismatch': 'error',
    'json/unexpected-end-of-comment': 'error',
    'json/unexpected-end-of-string': 'error',
    'json/unexpected-end-of-number': 'error',
    'json/invalid-unicode': 'error',
    'json/invalid-escape-character': 'error',
    'json/invalid-character': 'error',
    'json/property-expected': 'error',
    'json/comma-expected': 'error',
    'json/colon-expected': 'error',
    'json/value-expected': 'error',
    'json/comma-or-close-backet-expected': 'error',
    'json/comma-or-close-brace-expected': 'error',
    'json/trailing-comma': 'off',
    'json/duplicate-key': 'error',
    'json/comment-not-permitted': 'error',
    'json/schema-resolve-error': 'error',
    'json/unknown': 'off',
  },
  processor: pluginJson.processors['.json'],
} satisfies Linter.FlatConfig;

export const js = {
  files: [...jsFiles],
  languageOptions,
  plugins: {
    '@typescript-eslint': pluginTs,
    import: pluginImport,
    'jsx-a11y': pluginJsxA11y,
    react: pluginReact,
    'react-hooks': pluginReactHooks,
  },
  rules: {
    // eslint-disable-next-line import/no-named-as-default-member
    ...pluginTs.configs['recommended']?.rules,
    ...pluginImport.configs['recommended'].rules,
    ...pluginJsxA11y.configs['recommended'].rules,
    ...pluginReact.configs['recommended'].rules,
    ...pluginReact.configs['jsx-runtime'].rules,
    ...pluginReactHooks.configs['recommended'].rules,

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'import/namespace': 'off',
    'jsx-a11y/no-autofocus': 'off',
  },
  settings: {
    ...pluginImport.configs['react'].settings,

    react: {
      version: 'detect',
    },
  },
} as const; //satisfies Linter.FlatConfig;

export const ts = {
  files: [...tsFiles],
  languageOptions,
  plugins: {
    '@typescript-eslint': pluginTs,
    import: pluginImport,
    'jsx-a11y': pluginJsxA11y,
    react: pluginReact,
    'react-hooks': pluginReactHooks,
  },
  rules: {
    // ...(console.log(JSON.stringify(pluginTs.configs['recommended'].rules)) || {}), // useful for debugging
    // eslint-disable-next-line import/no-named-as-default-member
    ...pluginTs.configs['eslint-recommended']?.overrides?.[0]?.rules,
    // eslint-disable-next-line import/no-named-as-default-member
    ...pluginTs.configs['recommended']?.rules,
    // eslint-disable-next-line import/no-named-as-default-member
    ...pluginTs.configs['recommended-requiring-type-checking']?.rules,
    ...pluginImport.configs['recommended'].rules,
    ...pluginImport.configs['typescript'].rules,
    ...pluginJsxA11y.configs['recommended'].rules,
    ...pluginReact.configs['recommended'].rules,
    ...pluginReact.configs['jsx-runtime'].rules,
    ...pluginReactHooks.configs['recommended'].rules,

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/semi': ['warn', 'never'],
    'jsx-a11y/no-autofocus': 'off',
    //"@typescript-eslint/explicit-function-return-type": "warn",
  },
  settings: {
    ...pluginImport.configs['typescript'].settings,

    react: {
      version: 'detect',
    },

    // https://www.npmjs.com/package/eslint-import-resolver-typescript#installation
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        //project: ['./tsconfig.json', 'packages/*/tsconfig.json'],
        project: 'tsconfig.json',
      },
    },
  },
} as const; // satisfies Linter.FlatConfig;

export const tests = {
  files: [
    'src/**/tests/**/*.ts',
    'src/**/tests/**/*.tsx',
    'src/**/*.Test.tsx',
    'src/**/*.spec.ts',
    'src/**/*.test.tsx',
    'src/**/*.spec.tsx',
    'src/**/*.stories.tsx',
    'src/**/*.factory.ts',
    'src/**/setupTests.ts',
    'src/**/jest.config.js',
    'src/**/jest.config.ts',
  ],
  rules: {
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'no-console': 'off',
    'no-empty-function': 'off',
    'class-methods-use-this': 'off',
  },
} satisfies Linter.FlatConfig;

export const editorconfig = [
  {
    files: ['**'],
    ignores: [...tsFiles],
    plugins: {
      editorconfig: pluginEditorconfig,
    },
    rules: {
      ...pluginEditorconfig.configs['all'].rules,
    },
  },
  {
    files: [...tsFiles],
    plugins: {
      editorconfig: pluginEditorconfig,
    },
    rules: {
      ...pluginEditorconfig.configs['all'].rules,
      'editorconfig/indent': 'off', // broken for ts https://github.com/typescript-eslint/typescript-eslint/issues/1824
    },
  },
] satisfies Linter.FlatConfig[];
