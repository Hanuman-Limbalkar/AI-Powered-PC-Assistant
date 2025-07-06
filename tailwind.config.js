/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        'spin-very-slow': 'spin 40s linear infinite',
        'reverse-spin': 'reverse-spin 15s linear infinite',
        'reverse-spin-slower': 'reverse-spin 25s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      rotate: {
        'y-5': 'rotateY(5deg)',
        'x-45': 'rotateX(45deg)',
      },
      translate: {
        'z-2': 'translateZ(2px)',
        'z-4': 'translateZ(4px)',
        'z-8': 'translateZ(8px)',
        'z-16': 'translateZ(16px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};