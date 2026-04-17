/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'ocean-deep': '#0a1628',
        'jelly-turquoise': '#40e0d0',
        'jelly-blue': '#98d8e8',
        'jelly-lavender': '#b19cd9',
        'jelly-pink': '#ffd1dc',
        'jelly-aqua': '#7fffd4',
      }
    },
  },
  plugins: [],
}
