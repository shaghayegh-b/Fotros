/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazir', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1e88e5',
        text: '#042a50',
        textDark: '#e0e0e0',
        bgLight: "#fafafa",
        bgDark: "#051121",
        cart:"#f5f5f5",
        cartDark:"#0a1b2f",
        cartSm:"#bfdbfe",
        cartSmDark:"#e7ecf2"
      },
    },
  },
  plugins: [],
};
