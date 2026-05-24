/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- Tambahkan baris ini
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',
          light: '#F9FAFB',
          gray: '#6B7280'
        }
      }
    },
  },
  plugins: [],
}