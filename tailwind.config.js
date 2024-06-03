/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg': "url('/bg.png')",
        'bg_small': "url('/bg_small.png')",
        'inv_bg': "url('/inv_bg.png')",
      }
    },
  },
  plugins: [],
}