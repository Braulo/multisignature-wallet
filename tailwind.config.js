/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E84561",
        light: {
          secondary: "#B3ADB3",
          background: "#FFF",
        },
        dark: {
          secondary: "#121A2D",
          background: "#000",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

// Darkmode colors
// Primary: E84561
// Secondary: 2A1D31
// Background: black

// Lightmode colors
// Primary: E84561
// Secondary: F1E0C8
// Background: white
