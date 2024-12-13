/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ['28px', { lineHeight: '32px' }],
        h2: ['18px', { lineHeight: '24px' }],
        h3: ['16px', { lineHeight: '22px' }],
        // h4: ['14px', { lineHeight: '18px' }],
        // h5: ['12px', { lineHeight: '16px' }],
        // h6: ['8px', { lineHeight: '12px' }],
        // body1: ['32px', { lineHeight: '35px' }],
      },
      fontFamily: {
        interLight: ['InterLight', 'sans-serif'],
        interRegular: ['InterRegular', 'sans-serif'],
        interMedium: ['InterMedium', 'sans-serif'],
        interBold: ['InterBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
