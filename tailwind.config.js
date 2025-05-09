/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        zafire: '#2459A7',
        mustard: '#F2C94C',
        softCoral: '#F2996E',
        nightBlue: '#2C3E50',
        blueNight: '#25313B',
        lightGray: '#F7F7F7',
        grayBg: '#f0f0f0',
        mediumGray: '#BDBDBD',
        softBlack: '#1A1A1A', 
        deepBlue: '#1B4079',
        alertRed: '#D94F4F',
        magicPurple: '#6A2C70',
        darkSectionGray: '#121212',
        darkGray: '#333333',
      },
      fontFamily: {
        sans: ['var(--font-satoshi)'],
        integral: ['var(--font-integral)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
} 