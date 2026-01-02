/** @type {import('tailwindcss').Config} */
export default {
  content:  ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Dongle-Regular', 'sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}

