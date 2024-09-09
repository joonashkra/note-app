/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        flash: 'flash 3s ease-in-out',
      },
      keyframes: {
        flash: {
          '50%': { backgroundColor: '#ffffff10' },
        },
      },
      fontFamily: {
        pjs: ["Plus Jakarta Sans", "sans-serif"]
      },
    },
    colors: {
      'white': '#F1EFEF',
      'light': '#5ebbe6',
      'mid': '#9a9a9a',
      'dark': '#191717',
      'black': '#101010',
      'gradient': 'linear-gradient(180deg, rgba(0,0,1,1) 0%, rgba(35,50,65,1) 27%, rgba(113,126,139,1) 100%)',
      'red': '#FF0000'
    },
  },
  plugins: [],
}