import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      // globals: globals.browser,
      globals: { ...globals.browser, ...globals.es2020, ...globals.node },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      ...reactRefresh.configs.vite.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-undef": "error",
      "react/prop-types": "off",
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      eqeqeq: "warn",
      "no-console": "warn",
      "no-constant-condition": "error",
      "no-dupe-else-if": "error",
      "no-dupe-class-members": "error",
    },
  },
]);
