import type { Config } from "tailwindcss";

import baseConfig from "@saasfly/tailwind-config";

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    ...baseConfig.content,
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [baseConfig],
  darkMode: "class",
  plugins: [nextui()],
};
