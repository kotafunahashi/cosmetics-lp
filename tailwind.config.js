/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '40rem'}, // 40rem以下向けの設定
        'ss': {'min': '40rem'}, // 40rem以上向けの設定（必要な場合）
      },
    },
  },
  plugins: [],
};