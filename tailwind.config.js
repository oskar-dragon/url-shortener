const { fontFamily } = require('tailwindcss/defaultTheme');

// const myTheme = {
//   primary: '#1f1f1f',
//   'primary-content': '#FFFFFF',
//   secondary: '#3C38FF',
//   'secondary-focus': '#504CFF',
//   'secondary-content': '#FFF',
//   accent: '#3C38FF',
//   'accent-focus': '#504CFF',
//   'accent-content': '#FFF',
//   neutral: '#1f1f1f',
//   'neutral-content': '#e5e5e5',
//   'base-100': '#F9FAFB',
//   info: '#3ABFF8',
//   success: '#36D399',
//   warning: '#FBBD23',
//   error: '#F87272',
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        royal: {
          500: '#7879f1',
          700: '#3c38ff',
          800: '#2e2bc4',
        },
        second: {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        success: '#14b8a6',
        warning: '#FBBD23',
        error: '#F87272',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      fontSize: {
        xs: '0.7rem',
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
  'tailwindCSS.experimental.classRegex': [['cva\\(([^)]*)\\)', '["\'`]([^"\'`]*).*?["\'`]']],
  // plugins: [require('daisyui')],
  // daisyui: {
  //   themes: [{ myTheme }],
  // },
};
