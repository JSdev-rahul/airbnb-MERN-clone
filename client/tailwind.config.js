/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "red",
        primary: "#F5385D",
      },
    },
  },
  plugins: [],
};
