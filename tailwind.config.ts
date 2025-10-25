import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'calculator-bg': '#2d3748', // Darker gray for calculator body
        'display-bg': '#4a5568', // Even darker for display
        'button-bg': '#4299e1', // Blue for numbers/operators
        'button-hover': '#3182ce',
        'operator-bg': '#ed8936', // Orange for operators
        'operator-hover': '#dd6b20',
        'clear-bg': '#e53e3e', // Red for clear
        'clear-hover': '#c53030',
        'text-light': '#e2e8f0',
        'text-dark': '#1a202c',
      },
    },
  },
  plugins: [],
};
export default config;