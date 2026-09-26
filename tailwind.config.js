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
       fontSize: {
        xs: "clamp(0.72rem, 0.68rem + 0.2vw, 0.78rem)",
        sm: "clamp(0.82rem, 0.78rem + 0.2vw, 0.88rem)",
        base: "clamp(0.9rem, 0.86rem + 0.25vw, 1rem)",
        md: "clamp(1rem, 0.94rem + 0.3vw, 1.1rem)",
        lg: "clamp(1.1rem, 1rem + 0.4vw, 1.25rem)",
        xl: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)",
        "2xl": "clamp(1.4rem, 1.2rem + 0.9vw, 1.85rem)",
        "3xl": "clamp(1.7rem, 1.35rem + 1.4vw, 2.4rem)",
      },
      spacing: {
        "section-sm": "1.5rem",
        "section-md": "2.5rem",
        "section-lg": "4rem",
      },
    },
  },
  plugins: [],
};
