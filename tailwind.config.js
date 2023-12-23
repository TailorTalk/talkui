/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        tailorGrey: {
          100: "#F4F4F4",
          200: "#e3e3e3",
          300: "#c6c6c6",
          400: "#aaaaaa",
          500: "#717171", // Original color for subtext
          600: "#666666",
          700: "#5a5a5a",
          800: "#464646",
          900: "#444444",
        },

        tailorLightGrey: "#F4F4F4",
        tailorFont: "#717171",
        tailorFontDark: "#464646",
      },
      fontFamily: {
        tailorTalkFont: ["Roboto", "sans-serif"],
      },

      fontWeight: {
        normal: 400,
        medium: 400,
        semibold: 500,
        bold: 600,
      },
    },
  },
  plugins: [],
};
