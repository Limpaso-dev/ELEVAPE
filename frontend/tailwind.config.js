/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8A2BE2",
        secondary: "#FF00AA",
        accent: "#00CFFF",
        dark: "#0F0F1A",
      },
    },
  },
  plugins: [],
};