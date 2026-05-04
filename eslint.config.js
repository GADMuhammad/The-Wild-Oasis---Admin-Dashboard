import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

export default [
  // تجاهل المجلدات (بديل لـ globalIgnores)
  { ignores: ["dist"] },
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: { react, "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      // ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/jsx-no-target-blank": "off",
      "no-undef": "error",
      "react/prop-types": "off",
      // "react/jsx-key": "warn",
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
      "no-dupe-keys": "error",
      "no-duplicate-case": "warn",
      "no-unsafe-finally": "warn",
      "no-obj-calls": "error",
      "no-unused-vars": "warn",

      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      // "react/destructuring-assignment": ["error", "always"],
    },
    settings: { react: { version: "detect" } },
  },
];
