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

  // 규칙 완화
  {
    rules: {
      // any 사용을 에러 → 경고로 완화
      "@typescript-eslint/no-explicit-any": "warn",

      // 미사용 변수 경고로 완화 + _ 프리픽스는 허용
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // 훅 의존성 경고 수준으로 낮추기
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
