/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all React component files
    "./public/index.html"      // Scan the main HTML file
  ],
  theme: {
    extend: {}, // You can extend Tailwind's default theme here
  },
  plugins: [],
}
