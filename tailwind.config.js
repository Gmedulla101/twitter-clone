/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        ssm: '20rem',
      },
      screens: {
        sssm: '400px',
      },
      height: {
        unfull: '90%'
      }
    },
  },
  plugins: [],
};
