/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
       Bebas: ['Bebas Neue'],
      },
      maxHeight: {
        '128': '32rem',
        "100":"30rem"
      }
    },
  },
  plugins: [],
}
