import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist", "node_modules", "build"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.es2020 },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-no-target-blank": "off",
      "no-undef": "error",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "react/jsx-key": "warn",
      eqeqeq: "warn",
      "no-console": "warn",
      "no-constant-condition": "error",
      "no-dupe-else-if": "error",
      "no-dupe-class-members": "error",
      "no-await-in-loop": "warn",
      "no-duplicate-imports": "warn",
      "no-self-compare": "warn",
      "valid-typeof": "error",
      "consistent-return": "error",
      "no-empty": "warn",
      "prefer-const": "warn",
      "no-implicit-coercion": "off",
      "no-unneeded-ternary": "warn",
      curly: "off",
      // "react/destructuring-assignment": ["error", "always"],
    },
  },
];
