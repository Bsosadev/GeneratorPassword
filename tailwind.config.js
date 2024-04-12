/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './node_modules/preline/dist/*.js',
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Mooli': ['Mooli', 'sans-serif'],
        'Lexend': ['Lexend', 'sans-serif'],
        'MavenPro': ['Maven Pro', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}