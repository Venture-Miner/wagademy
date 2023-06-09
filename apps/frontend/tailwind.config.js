const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
        mono: ['Noto Sans', ...defaultTheme.fontFamily.mono],
      },
    },
    colors: {
      primary: '#51B7AF',
      secondary: '#222634',
      neutral: {
        1: '#222634',
        2: '#575767',
        3: '#F6F7F9',
        4: '#FFFFFF',
        5: '#DADDEC',
        6: '#D1DED8',
      },
      danger: '#FF511A',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('invalid', '.ng-invalid.ng-touched > &');
    }),
  ],
};
