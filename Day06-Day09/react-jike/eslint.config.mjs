import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import react from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  // React 插件配置
  {
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest", // 使用最新的 ECMAScript 标准
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // 启用 JSX 支持
        },
      },
    },
    settings: {
      react: {
        version: "detect", // 自动检测 React 版本
      },
    },
    rules: {
      // 关闭 react-in-jsx-scope，因为 React 17+ 不再需要显式引入 React
      "react/react-in-jsx-scope": "off",
    },
  },
];
