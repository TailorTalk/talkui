/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tailorBlue: {
          100: "#a6b9ff",
          200: "#8d9eff",
          300: "#7484ff",
          400: "#5b6aff",
          500: "#4764FC", // Original color
          600: "#3c51e8",
          700: "#3346bf",
          800: "#2a3b9b",
          900: "#24314e",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
      },
    },
  },
  plugins: [],
};
