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
        xsm: '500px',
      },
      height: {
        unfull: '90%',
      },
      boxShadow: {
        '3xl': '0 0 15px 8px lightgray',
      },
    },
  },
  plugins: [],
};
