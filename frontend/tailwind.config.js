/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryYellow: "#FFD700",
        primaryBlack: "#000000"
      },
      backdropBlur: {
        sm: '4px',
        md: '10px',
      }
    },
  },
  plugins: [],
}
