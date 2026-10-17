import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#059669",
          dark: "#047857",
          light: "#10b981",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(5,150,105,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,150,105,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(5, 150, 105, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
