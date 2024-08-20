/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [    
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./apps/nextjs/src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
  plugins: [nextui()],
}
