/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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
        "plb-dark-green": "#213126",
        "plb-green": "#5E7E67",
        "plb-light": "#EBF3ED",
        "plb-red": "#993B40",
        "plb-orange": "#D87F61",
      },
    },
  },
  plugins: [],
};
