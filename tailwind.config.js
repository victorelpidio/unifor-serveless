/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5f7',
          100: '#d9e3e8',
          200: '#c2d1d9',
          300: '#aabfca',
          400: '#93adbb',
          500: '#7b9bac',
          600: '#315b65',
          700: '#2a4e56',
          800: '#234147',
          900: '#1c3438',
          950: '#152729',
        },
        secondary: {
          50: '#f5f9f9',
          100: '#e6f0f0',
          200: '#d7e7e7',
          300: '#c8dede',
          400: '#b9d5d5',
          500: '#8cb7b8',
          600: '#5f9a9b',
          700: '#4d7c7d',
          800: '#3b5e5f',
          900: '#294041',
          950: '#172223',
        },
        tertiary: {
          50: '#f0f7f8',
          100: '#d9e9ec',
          200: '#c2dbe0',
          300: '#aacdd4',
          400: '#93bfc8',
          500: '#4f929d',
          600: '#3d737c',
          700: '#2b545b',
          800: '#19353a',
          900: '#071619',
          950: '#050f11',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}; 