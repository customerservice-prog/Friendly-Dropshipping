import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        navy: "#12263f",
        orange: "#f97316",
        sand: "#f7f5f1",
      },
      boxShadow: { soft: "0 18px 50px rgba(16,24,40,.08)" },
    },
  },
  plugins: [],
};
export default config;
