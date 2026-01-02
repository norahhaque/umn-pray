import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // UMN Pray Color Palette
        "umn-green": "#737852",
        "umn-green-light": "#9BA37A",
        "umn-green-dark": "#5A5F3F",

        "umn-maroon": "#451616",
        "umn-maroon-light": "#6B2828",
        "umn-maroon-dark": "#2D0F0F",

        "umn-gray": "#818376",
        "umn-light-gray": "#E0E0DF",

        "umn-beige": "#CBC5AF",
        "umn-beige-light": "#E0DBCA",
        "umn-beige-dark": "#B0AA92",

        "umn-brown": "#8C8274",
        "umn-brown-light": "#A89D8F",
        "umn-brown-dark": "#6E6459",

        "umn-tan": "#B8B29A",
        "umn-olive": "#8B9056",
        "umn-sage": "#9B9E7E",
      },
    },
  },
  plugins: [],
};

export default config;
