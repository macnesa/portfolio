// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const baseDir = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: baseDir,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",     // disable warning unused vars
      "@next/next/no-img-element": "off",             // disable <img> warning
      "@typescript-eslint/no-explicit-any": "off",    // allow 'any' type
      "react/no-unescaped-entities": "off",           // disable ', ", >, <, & warning
      "@typescript-eslint/ban-ts-comment": "off",     // allow ts-expect-error without description
      "react-hooks/rules-of-hooks": "off",            // WARNING: use with caution
      "react-hooks/exhaustive-deps": "off",           // WARNING: use with caution
    },
  },
];

export default eslintConfig;
