// @ts-nocheck
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
];
const jsFiles = tsFiles.map((file) => file.replace('ts', 'js'));

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
};

export const configMd = {
  files: ['*.md', 'src/**/*.md'],
  plugins: {
    markdown: pluginMarkdown,
  },
  processor: 'markdown/markdown',
};

export const configJson = {
  files: ['*.json', 'src/**/*.json'],
  plugins: {
    json: pluginJson,
  },
  rules: {
    'json/*': ['error', { allowComments: true }],
  },
  processor: pluginJson.processors['.json'],
};

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
};

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
};

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
};

export const configEditorconfig = [
  {
    files: ['*', 'src/**/*'],
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
];

export const commonLintRules = [
  //{
  /*
    extends: [
      'eslint-config-airbnb-base/rules/best-practices',
      'eslint-config-airbnb-base/rules/errors',
      'eslint-config-airbnb-base/rules/node',
      'eslint-config-airbnb-base/rules/style',
      'eslint-config-airbnb-base/rules/variables',
      'eslint-config-airbnb-base/rules/es6',
      'eslint-config-airbnb/rules/react',
    ]
      //.map(require.resolve)
      .concat([
        'plugin:markdown/recommended',
        'plugin:json/recommended',
        'plugin:react-hooks/recommended',
        // This disables all stylistic rules from the above.
        'prettier',
      ]),*/
  /*env: {
      browser: true,
    },*/
  //plugins: ['prettier', 'import', '@typescript-eslint', 'editorconfig'],
  //parser: '@typescript-eslint/parser',
  /*settings: {
      'import/resolver': {
        // use <root>/tsconfig.json
        typescript: {},
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    */
  /*rules: {
      'prettier/prettier': 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
        },
      ],
      'max-lines': ['warn', { max: 300, skipComments: true, skipBlankLines: true }],

      'editorconfig/charset': 'error',
      'editorconfig/eol-last': 'error',
      'editorconfig/indent': 'error',
      'editorconfig/linebreak-style': 'error',
      'editorconfig/no-trailing-spaces': 'error',

      'import/no-extraneous-dependencies': ['error', { includeTypes: true, packageDir: './' }],

      'one-var': 'off',
      'one-var-declaration-per-line': 'off',
      'prefer-arrow-callback': 'off',
      strict: 'off',
      'no-use-before-define': ['off', { functions: false }],
      'no-underscore-dangle': 'off',
      'no-plusplus': 'off',

      // Enforce curly braces even for one-liners.
      curly: ['error', 'all'],

      // ESLint doesn't understand interfaces yet and marks them as undefined.
      'no-undef': 'off',

      // These core rules don't work well on TS code, use the ones from the plugin instead.
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      'no-redeclare': 'off',

      // This is noisy while refactoring.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // Allow `let { ignored, ...rest} = foo`.
          ignoreRestSiblings: true,
        },
      ],

      // Allow `constructor(private foo: number) {}`
      'no-useless-constructor': 'off',
      // Allow stateless class methods, instead of forcing them to be static.
      'class-methods-use-this': 0,

      'no-empty-function': ['error', { allow: ['constructors'] }],

      // TS will take care of this, and the rule disallows the following _valid_ pattern:
      // function(foo = 'bar', baz?: number) {}
      'default-param-last': 'off',

      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: '*', next: 'export' },
      ],

      /*
       * React specific
       */
  /*
      // Prefer types.
      'react/prop-types': 'off',
      // Prefer default arguments.
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/destructuring-assignment': 'off',

      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/prefer-stateless-function': 'off',
      'react/jsx-no-bind': 'off',
      'react/sort-comp': [
        'error',
        {
          order: [
            'displayName',
            'statics',
            'static-methods',
            'defaultProps',
            'state',
            'constructor',
            'render',
            '/^(_)?render.+$/', // any auxiliary render methods
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            '/^on[A-Z].+$/', // event handlers
            'everything-else',
            '/^_.+$/', // private methods
          ],
        },
      ],
      */
  /*
      // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // This is breaking a lot of my projects that use const Foo = () => {}. I
      // haven't noticed any name inference problems with that pattern, so I'll
      // leave this off for now.
      'react/function-component-definition': 'off',
      */
  //},
  //},
  //testRules,
  /*{
    files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
    extends: [
      'plugin:react/jsx-runtime',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],

    parserOptions: {
      tsconfigRootDir: '.',
      project: ['./tsconfig.json'],
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  */
  //prettier,
];
