import type { Config } from "tailwindcss";

const config: Config = {
  // This "src/**/*" pattern tells Tailwind: "Look in every single folder inside src"
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;