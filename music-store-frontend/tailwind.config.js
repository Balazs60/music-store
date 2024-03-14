/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/pages/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        customBlue: '#3490dc',
        customGreen: '#38c172',
        customRed: '#e3342f',
        customTurquise:'00C2C3',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}

