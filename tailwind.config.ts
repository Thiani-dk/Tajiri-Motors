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
        // The "Obsidian" Backgrounds
        obsidian: {
          DEFAULT: "#141416", // Deepest charcoal
          light: "#1e1e24",   // Slightly lighter for cards/inputs
          dark: "#0a0a0c",    // Almost black
        },
        // The "Bronze/Gold" Accents
        gold: {
          DEFAULT: "#b48e55", // Metallic Bronze (Main Action Color)
          hover: "#997641",   // Darker gold for hover states
          light: "#d4b483",   // Light gold for text highlights
          dim: "rgba(180, 142, 85, 0.1)", // For subtle backgrounds
        },
        // Neutral Grays for Text
        platinum: "#e6e6e6",
        zinc: {
          400: "#a1a1aa",
          500: "#71717a",
          800: "#27272a",
        }
      },
      fontFamily: {
        // "Rolex" Style Font Pairing
        sans: ['var(--font-montserrat)', 'sans-serif'], // Body text
        serif: ['var(--font-playfair)', 'serif'],       // Headings
      },
    },
  },
  plugins: [],
};
export default config;