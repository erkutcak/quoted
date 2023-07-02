/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#E6E3DD',
        'ash-black': '#2B2B2B',
        'steel-blue': '#457EAC',
      },
      fontFamily: {
        archivoblack: ['Archivo Black'],
        montserrat: ['Montserrat']
      }
    },
  },
  plugins: [],
}

