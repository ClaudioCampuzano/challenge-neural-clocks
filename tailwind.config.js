/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          60: 'hsl(346, 78%, 60%)',
          80: 'hsl(346, 78%, 80%)',
          90: 'hsl(346, 78%, 90%)',
          95: 'hsl(346, 78%, 95%)',
        },
        neutral: {
          20: 'hsl(236, 14%, 20%)',
          45: 'hsl(236, 14%, 45%)',
          70: 'hsl(236, 14%, 70%)',
          80: 'hsl(236, 14%, 80%)',
          95: 'hsl(236, 14%, 95%)'
        },
        white: '#ffffff',
        green: 'hsl(176, 84%, 45%)'
      },
    },
  },
  plugins: [],
}
