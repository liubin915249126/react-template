module.exports = {
  extends: [
    "eslint:recommended",
    "airbnb",
    "prettier",
    "prettier/@typescript-eslint",
    // 'prettier/babel',
    // 'prettier/flowtype',
    "prettier/react",
    // 'prettier/standard',
    // 'prettier/unicorn',
    // 'prettier/vue',
    require.resolve('./eslint.js')
  ],
  plugins: ["react-hooks"],
  rules: {
    "no-redeclare": 2,
    "@typescript-eslint/no-unused-vars": 0,
    "no-unused-vars": ["error", { varsIgnorePattern: "^_$" }],
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/destructuring-assignment": "warn",
    "react/jsx-no-undef": [2, { allowGlobals: true }],
    "react/jsx-one-expression-per-line": 0,
    "jsx-control-statements/jsx-choose-not-empty": 1,
    "jsx-control-statements/jsx-for-require-each": 1,
    "jsx-control-statements/jsx-for-require-of": 1,
    "jsx-control-statements/jsx-if-require-condition": 1,
    "jsx-control-statements/jsx-otherwise-once-last": 1,
    "jsx-control-statements/jsx-use-if-tag": 1,
    "jsx-control-statements/jsx-when-require-condition": 1,
    "jsx-control-statements/jsx-jcs-no-undef": 1,
    "no-undef": 0, // 与jsx-jcs-no-undef 完全一致，所以设置为off

    "import/no-extraneous-dependencies": 0,

    // Disable all, as alias not easy to know in different project in global.
    "import/no-unresolved": 0,
    "react/jsx-props-no-spreading": 0,
    "no-param-reassign": [
      "error",
      { ignorePropertyModificationsFor: ["state"] },
    ],
    // _ is a placeholder symbol, no need to check
    "no-unused-vars": ["error", { varsIgnorePattern: "^_$" }],
    "prefer-promise-reject-errors": 0,
    camelcase: 0,
    /**
     * Disable a11y rules
     */
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/forbid-prop-types": [0],

    // customize
    "@typescript-eslint/naming-convention": 0,
    "import/prefer-default-export": 0,

    // note you must disable the base rule as it can report incorrect errors
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-loop-func": 0,
    "@typescript-eslint/no-redeclare": 0,
    "@typescript-eslint/no-shadow": 0,
    // 和 no-unused-vars 冲突
    "@typescript-eslint/no-unused-vars": 0,

    "no-redeclare": 2,

    "global-require": 0,

    // react-hooks
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
  },
};
