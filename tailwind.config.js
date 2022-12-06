const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        royal: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#31290e',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730a3',
          900: '#06102b',
        },
        success: {
          50: '#ecfdf5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F59E0B',
          500: '#f59e0b',
          600: '#D97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        shades: {
          50: '#ffffff',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      fontSize: {
        xs: '0.7rem',
        sm: '0.75rem',
        base: '0.875rem',
        xl: '1rem',
        '2xl': [
          '1.25rem',
          {
            lineHeight: '1.3',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
        '3xl': '1.5rem',
        '4xl': '2.125rem',
        '5xl': '2.625rem',
        '6xl': [
          '3.125rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
        '7xl': [
          '3.75rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
        '8xl': [
          '4.5rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
        '9xl': [
          '5.125rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
      },
    },
  },
  'tailwindCSS.experimental.classRegex': [['cva\\(([^)]*)\\)', '["\'`]([^"\'`]*).*?["\'`]']],
};
