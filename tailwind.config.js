module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      display: ['Montserrat', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      logo: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#eefbfa',
          100: '#d0f5f2',
          200: '#a4ebe4',
          300: '#6fd8d1',
          400: '#37beb7',
          500: '#189f99',
          600: '#0d827e',
          700: '#0d6967',
          800: '#0f5352',
          900: '#104544',
          950: '#02201f',
        },
        secondary: {
          50: '#f2f9fd',
          100: '#e4f0fa',
          200: '#c3e0f4',
          300: '#8ec8eb',
          400: '#53abde',
          500: '#2e90cd',
          600: '#1d73ae',
          700: '#195d8d',
          800: '#194e75',
          900: '#193f5f',
          950: '#112a42',
        },
        accent: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fdcfca',
          300: '#faaaa0',
          400: '#f77e6e',
          500: '#f15a45',
          600: '#e03a24',
          700: '#bf2f1d',
          800: '#9c291e',
          900: '#80291d',
          950: '#45110b',
        },
      },
      screens: {
        'xs': '475px',
        'mf': '990px',
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "slide-down": {
          "0%": {
            "-webkit-transform": "translateY(-10%)",
            transform: "translateY(-10%)",
            opacity: "0"
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            opacity: "1"
          },
        },
        "slide-up": {
          "0%": {
            "-webkit-transform": "translateY(10%)",
            transform: "translateY(10%)",
            opacity: "0"
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            opacity: "1"
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "1"
          },
          "50%": {
            opacity: "0.8"
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "pulse-slow": "pulse-slow 3s infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glass': '0 0 15px rgba(255, 255, 255, 0.05), 0 0 25px rgba(255, 255, 255, 0.05)',
        'glass-lg': '0 0 25px rgba(255, 255, 255, 0.1), 0 0 35px rgba(255, 255, 255, 0.05)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
