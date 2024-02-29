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
          danger: '#F25C5C',
          warning: '#F2C85C',
          white: '#FFFFFF',
        },
      },
    ],
  },
  theme: {
    colors: {},
    extend: {
      fontFamily: {
        sans: ['Space-Grotesk', 'sans-serif'],
        mono: ['Noto-Sans', 'sans-serif'],
        serif: ['Roboto', 'sans-serif'],
      },
    },
  },
  safelist: ['bg-neutral', 'bg-white'],
};
