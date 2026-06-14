/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#f9f5f0',
        blush: '#f8edeb',
        rose: '#e8cfc1',
        champagne: '#d8b4a0',
        cocoa: '#3e3232',
        'cocoa-light': 'rgba(62,50,50,0.12)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        flicker: 'flicker 0.8s infinite alternate',
        float: 'float 8s infinite ease-in-out',
        'float-delayed': 'float 8s 2s infinite ease-in-out',
        reveal: 'reveal 0.8s forwards',
        'smoke-up': 'smokeUp 1.45s ease-out forwards',
        'cut-trace': 'cutTrace 0.75s ease-in-out forwards',
      },
      keyframes: {
        flicker: {
          to: { transform: 'scale(1.15) translateY(-2px)', opacity: '0.84' },
        },
        float: {
          '50%': { transform: 'translateY(-26px) rotate(8deg)' },
        },
        reveal: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'none' },
        },
        smokeUp: {
          '0%': { opacity: '0', transform: 'translateX(-50%) translateY(0) scale(0.35)' },
          '20%': { opacity: '0.8' },
          '100%': { opacity: '0', transform: 'translateX(-50%) translateY(-58px) scale(2.3)' },
        },
        cutTrace: {
          '0%': { transform: 'rotate(10deg) scaleY(0)' },
          '100%': { transform: 'rotate(10deg) scaleY(1)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, #fff 0%, #f9f5f0 35%, #f8edeb 100%)',
      },
      boxShadow: {
        glass: '0 24px 70px rgba(62,50,50,0.12)',
        card: '0 20px 55px rgba(62,50,50,0.14)',
        'cake-layer': '0 24px 42px rgba(0,0,0,0.22)',
      },
      backdropBlur: {
        glass: '22px',
      },
    },
  },
  plugins: [],
};
