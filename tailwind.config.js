/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        colorblind: {
          primary: "#1E90FF",

          secondary: "#1E1E1E",

          accent: "#E0E0E0",

          neutral: "#333333",

          "base-100": "#121212",

          info: "#333333",

          success: "#4CAF50",

          warning: "#FFC107",

          error: "#FF4D4F",
        },
      },
      "light"
    ],
  },
  plugins: [require("daisyui")],
};
