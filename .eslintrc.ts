module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks", "tailwindcss", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
