/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      height: {
        "screen-minus-16": "calc(100vh - 1rem)", // 4rem引く例
      },
      minHeight: {
        "screen-minus-16": "calc(100vh - 5rem)", // min-heightにも適用
      },
    },
  },
  plugins: [],
};
