import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // disable warning unused vars
      "@next/next/no-img-element": "off",         // warning <img>
      "@typescript-eslint/no-explicit-any": 'off', // any warning
      "react/no-unescaped-entities": 'off', // ', ", >, <, & warning
      "@typescript-eslint/ban-ts-comment": 'off', // Include a description after the "@ts-expect-error"
      "react-hooks/rules-of-hooks": 'off', //WARNING !! SOLVE ASAP
      "react-hooks/exhaustive-deps": 'off', //WARNING !! SOLVE ASAP
    },
  },
];

export default eslintConfig;
