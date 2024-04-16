/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mmd: '793px',
        mmmd: '831px',
        mdd: '895px',
        xs: '480px',
        xxs: '170px' 
      }
    },
  }, 
  plugins: [],
}

