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
    colors: {
      lightBlue: "#29ABE2",
      lightBlue2: "#1E85A8",
      blue: "#4875AA",
      blue2: "#2E3192",
      darkBlue: "#152656",
      white: "#fff",
      black: "#000",
      lightGrey: "#F5F5F5",
      lightGrey2: "#B1B1B2",
      hoary: "#F2F2F2",
      grey: "#CCCCCC",
      grey2: "#898D9A",
      grey3: "#9d9d9d",
      darkGrey: "#D9D9D9",
      darkGrey2: "#808080 ",
      purple: "#434F74",
    },
    fontSize: {
      xs: ["1rem", "1rem"],
      sm: ["1.125rem", "1.125rem"],
      base: ["1.5rem", "1.5rem"],
      xl: ["2rem", "2rem"],
      "2xl": ["2.5rem", "2.5rem"],
      "3xl": ["3.75rem", "3.75rem"],
      "4xl": ["5rem", "5rem"],
    },
  },
  plugins: [],
};
