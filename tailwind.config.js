/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        body: '#231934',
        primary: '#246bfd',
        secondary: '#f79193',
        accent: '#9ec97b',
      }
    },
  },
  plugins: [],
}