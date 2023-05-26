/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "guiColor": "#333333",
        "btnColor": "#3c8dbc",
        "redColor": "#f56954",
      }
    }
  },
  plugins: []
};