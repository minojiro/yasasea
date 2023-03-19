/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"],
  },
}
