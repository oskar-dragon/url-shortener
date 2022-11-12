const { fontFamily } = require('tailwindcss/defaultTheme');

const myTheme = {
  primary: '#2563eb',
  secondary: '#4f46e5',
  accent: '#1FB2A6',
  neutral: '#191D24',
  'base-100': '#2A303C',
  info: '#3ABFF8',
  success: '#36D399',
  warning: '#FBBD23',
  error: '#F87272',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      fontSize: {
        sm: '0.75rem',
        base: '0.875rem',
        xl: '1rem',
        '2xl': '1.24rem',
        '3xl': '1.563rem',
        '4xl': '1.953rem',
        '5xl': '2.441rem',
        '6xl': '3.052',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: true,
    themes: [{ myTheme }],
  },
};
