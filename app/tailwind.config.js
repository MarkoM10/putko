/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
      },
    },
    colors: {
      primary: {
        100: "#75c7c3",
        200: "#61bfba",
        300: "#4eb7b2",
        400: "#3AAFA9",
        500: "#349e98",
        600: "#2e8c87",
        700: "#297a76",
        800: "#236965",
        900: "#1d5855",
      },
      secondary: "#17242A",
      background: "#F5F5F5",
      white: "#ffffff",
      black: "#000000",
      border: "#D9D9D9",
    },
    fontFamily: {
      josefin: ["Josefin Sans", "serif"],
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
