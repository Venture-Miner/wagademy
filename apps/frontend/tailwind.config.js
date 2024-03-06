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
          success: '#92E09B',
          danger: '#F25C5C',
          warning: '#F2C85C',
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
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Space-Grotesk', 'sans-serif'],
        mono: ['Noto-Sans', 'sans-serif'],
        serif: ['Roboto', 'sans-serif'],
      },
    },
  },
};
