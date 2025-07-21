/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fef7f7',
          100: '#feeaea',
          200: '#fdd8da',
          300: '#fbb9bd',
          400: '#f78b94',
          500: '#FF6B6B',
          600: '#e73c53',
          700: '#c32243',
          800: '#a31e3e',
          900: '#8a1e3a',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#4ECDC4',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        sandy: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#F4E4BC',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};