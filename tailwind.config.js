/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',    // Include all files in the 'pages' directory
    './src/components/**/*.{js,ts,jsx,tsx}', // Include all files in the 'components' directory
    './src/app.tsx',                        // Include the 'app.tsx' file directly
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

