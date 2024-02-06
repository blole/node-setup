import type { Linter } from 'eslint';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import pluginEditorconfig from 'eslint-plugin-editorconfig';
import pluginImport from 'eslint-plugin-import';
import pluginJson from 'eslint-plugin-json';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginMarkdown from 'eslint-plugin-markdown';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

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

export const configMd = {
  files: ['*.md', 'src/**/*.md'],
  plugins: {
    markdown: pluginMarkdown,
  },
  processor: 'markdown/markdown',
} satisfies Linter.FlatConfig;

export const configJson = {
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

export const configJsonc = {
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

export const configJs = {
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
    ...pluginTs.configs['recommended'].rules,
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

export const configTs = {
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
    ...pluginTs.configs['eslint-recommended'].overrides[0].rules,
    ...pluginTs.configs['recommended'].rules,
    ...pluginTs.configs['recommended-requiring-type-checking'].rules,
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

export const configTests = {
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

export const configEditorconfig = [
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
