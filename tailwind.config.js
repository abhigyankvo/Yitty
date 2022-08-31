/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        textLight: "#CBD5E1",
        textDark: "#0D1933",
        darkPrimary: "#0D1933",
        darkSecondary: "#334155",
        buttonDark: "#0D1933",
        buttonLight: "#59BEF8",
        bgLight: "#ededed",
      },
    },
  },
  plugins: [],
};
