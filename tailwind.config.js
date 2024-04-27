/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    keyframes: {
      cardSkeleton: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(100%)" },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        black: "#04152d",
        black2: "#041226",
        black3: "#020c1b",
        blackLighter: "#1c4b91",
        blackLight: "#173d77",
        pink: "#da2f68",
        orange: "#f89e00",
      },
      backgroundImage: {
        gradient: "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)",
      },
    },
    plugins: [],
  },
};
