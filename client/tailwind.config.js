module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        gray: {
          700: '#19191B',
          800: '#2B2C33',
          900: '#202020'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
