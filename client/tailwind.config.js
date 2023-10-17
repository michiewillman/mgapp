/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/*.{.js,jsx}",
    "./src/components/*{.js,jsx}",
    "./src/assets/*.{.js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
    },
  },
  plugins: [],
};
