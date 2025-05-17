/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F7F0',
          100: '#CCEFE1',
          200: '#99DFC3',
          300: '#66D0A4',
          400: '#33C086',
          500: '#00B36F', 
          600: '#00A065',
          700: '#008D5A',
          800: '#007A4F',
          900: '#005738'
        },
        secondary: {
          50: '#EFF1F9',
          100: '#DFE3F3',
          200: '#BFC7E7',
          300: '#9FABDB',
          400: '#7F8FCF',
          500: '#6F85D8',
          600: '#5A6CBE',
          700: '#4556A4',
          800: '#2F4089',
          900: '#1A2B6F'
        },
      }
    },
  },
  plugins: [],
} 