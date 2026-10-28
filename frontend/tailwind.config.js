/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          50:  "#6B8FAF",
          100: "#3E7686",
          300: "#345B5E",
          500: "#1F4D4F",
          900: "#003F3C",
        },
      },
    },
  },
  plugins: [],
};
