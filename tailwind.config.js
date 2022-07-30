/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/login/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
