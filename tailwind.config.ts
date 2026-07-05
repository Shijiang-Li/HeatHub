import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17201b",
        paper: "#f8faf7",
        line: "#dbe3dc",
        heat: "#d94f32",
        mint: "#11856f",
        sun: "#f3b43f"
      },
      boxShadow: {
        soft: "0 16px 48px rgba(23, 32, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
