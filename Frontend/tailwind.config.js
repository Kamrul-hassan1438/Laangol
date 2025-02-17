/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '48.75rem',
      },
      width: {
        '96': '66rem',
        '81' : '26rem'
      },
      weight: {
        '96': '31.25rem',
      },
      backgroundImage: {
        'my-img': "url('src/assets/background.png')",
      },
      colors: {
        'primary': '#647233',
        'secondary': '#B0D52B',
        'lime': {
          50:'#F7F5ED',
          100:'#B0D52B',
          200: '#647233',
        }
      },
      fontFamily: {
        'sans': ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'lg': '1.25rem',
        'xl': '5.625rem',
        '2xl': '1.5rem',

      },
    },
  },
  plugins: [],
}