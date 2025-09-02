// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// aman buat environment ESM (lokal & serverless)
let __dirnameSafe;
try {
  const __filename = fileURLToPath(import.meta.url);
  __dirnameSafe = dirname(__filename);
} catch (err) {
  // fallback jika __dirname tidak tersedia (misal serverless)
  __dirnameSafe = undefined;
}

const compat = new FlatCompat({
  baseDirectory: __dirnameSafe,
});

const eslintConfig = [
  // extends Next.js default
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // custom rules
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
