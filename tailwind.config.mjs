import starlightPlugin from '@astrojs/starlight-tailwind';
import colors from 'tailwindcss/colors';

const accent = { 200: '#fab0c6', 600: '#c30067', 900: '#600030', 950: '#430922' };
const gray = { 100: '#f4f7f8', 200: '#eaeef1', 300: '#bdc3c6', 400: '#828d94', 500: '#505a60', 700: '#303a3f', 800: '#1f282d', 900: '#15191b' };

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent, // Make sure accent is available
        gray,
      },
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"'],
        mono: ['"IBM Plex Mono"'],
      },
    },
  },
  plugins: [starlightPlugin()],
};
