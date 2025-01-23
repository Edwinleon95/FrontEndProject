/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ["'Pixelify Sans'", "sans-serif"],
      },
      animation: {
        'loading': 'loadingAnimation 1.5s infinite ease-in-out',
      },
      keyframes: {
        loadingAnimation: {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}

