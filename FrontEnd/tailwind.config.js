module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveBackground: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-80%)' },
        },
      },
      animation: {
        moveBackground: 'moveBackground 60s linear infinite',
      },
    },
  },
  plugins: [],
};
