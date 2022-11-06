/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Can remove the extend for optimising production
    // to not ship tailwind default fonts
    // https://blog.logrocket.com/how-to-use-custom-fonts-tailwind-css/
    extend: {
      fontFamily: {
        ttinterfaces: ["ttinterfaces", "sans-serif"],
      },
      colors: {
        // Override Flowbite's override of Tailwind's colors
        // Fuck off flowbite ...
        gray: colors.coolGray,
        red: colors.red,
        yellow: colors.amber,
        green: colors.emerald,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.violet,
        pink: colors.pink,
        // Custom colors for the app theming
        "plb-dark-green": "#213126",
        "plb-green": "#5E7E67",
        "plb-light": "#EBF3ED",
        "plb-red": "#993B40",
        "plb-orange": "#D87F61",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};
