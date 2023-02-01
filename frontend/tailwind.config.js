/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'shorten-desktop': "url('/assets/images/bg-shorten-desktop.svg')",
        'shorten-mobile': "url('/assets/images/bg-shorten-mobile.svg')",
        'boost-desktop': "url('/assets/images/bg-boost-desktop.svg')",
        'boost-mobile': "url('/assets/images/bg-boost-mobile.svg')",
      },
      colors: {
        'primary-cyan': 'hsl(var(--primary-cyan))',
        'primary-dark-violet': 'hsl(var(--primary-dark-violet))',
        'secondary-red': 'hsl(var(--secondary-red))',
        'neutral-gray': 'hsl(var(--neutral-gray))',
        'neutral-grayfish-violet': 'hsl(var(--neutral-grayfish-violet))',
        'neutral-very-dark-blue': 'hsl(var(--neutral-very-darl-blue))',
        'neutral-very-dark-violet': 'hsl(var(--neutral-very-dark-violet))',
        'neutral-slate': 'rgb(239,241,247)',
        'neutral-white': 'hsl(var(--neutral-white))',
      },
    },
  },
  plugins: [],
};
