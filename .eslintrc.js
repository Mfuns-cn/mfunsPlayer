/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    semi: ["error", "never"], // [x]强制不使用分号
    quotes: ["error", "double"], // [x]强制使用双引号
    "no-unexpected-multiline": "error", // [x]禁止可能产生ASI危险的多行语句
    "linebreak-style": ["error", "unix"], // [x]强制使用Unix行尾(LF)

    camelcase: "error", // [x]强制标识符和属性使用camelCase
    "new-cap": "error", // [x]强制构造器函数/类使用PascalCase
    "no-underscore-dangle": "error", // [x]禁止标识符和属性前置/后置下划线
    "no-unneeded-ternary": "error", // [x]禁止不必要的三元运算符
    "nonblock-statement-body-position": "error", // [x]禁止非语句块控制语句换行
    "spaced-comment": "warn", // [!]警告注释未使用空格分隔

    "@typescript-eslint/no-unused-vars": "warn", // [!]警告未使用变量
    "@typescript-eslint/no-empty-function": "warn", // [!]警告空函数
    "@typescript-eslint/no-non-null-assertion": "off", // [o]允许非空断言
    "@typescript-eslint/no-extra-semi": "off", // [o]允许多余分号(与.prettierrc/semi:false冲突)
    "@typescript-eslint/ban-ts-comment": "warn", // [!]警告ts注释
  },
}
