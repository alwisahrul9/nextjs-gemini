const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        aspectRatio: {
            '4/3': '4 / 3',
            '16/9': '16 / 9',
            '9/16': '9 / 16',
            '21/9': '21 / 9',
            '9/21': '9 / 21',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
