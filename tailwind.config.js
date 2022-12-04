/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1D1D1D',
        gray: '#E6E6E6',
        'gray-light': '#D1D1D1',
        'gray-dark-1': '#5A5A5A',
        'gray-dark-2': '#757575',
      },
      fontFamily: {
        'primary': 'Graphik',
        'secondary': 'Arial',
      },
      backgroundColor: {
        body: '#F4F5F7',
        overlay: 'rgba(0,0,0,0.3)',
        loading: 'rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
}
