/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#E7E8E9',
        ink: '#0E0E0E',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
