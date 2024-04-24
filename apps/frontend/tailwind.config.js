const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#51B7AF',
          secondary: '#A6E8AE',
          accent: '#564F93',
          neutral: '#F9F9F9',
          'base-100': '#222634',
          'base-200': '#818896',
          'base-300': '#D1D5DB',
          success: '#92E09B',
          'success-content': '#14532D',
          danger: '#F25C5C',
          'error-content': '#7F1D1D',
          warning: '#F2C85C',
          'warning-content': '#713F12',
        },
      },
    ],
  },
  theme: {
    colors: {
      white: '#FFFFFF',
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(-20%)' },
          '50%': { transform: 'translateY(20%)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(30px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        slideDown: 'slideDown 1s ease-in-out forwards',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Noto Sans', 'sans-serif'],
        serif: ['Roboto', 'sans-serif'],
      },
    },
  },
};
