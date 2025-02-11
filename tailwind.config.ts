import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        test: "#28A80E", // this is the background color from figma
        'apple': {
          '50': '#edfee7',
          '100': '#d8fccb',
          '200': '#b3f99d',
          '300': '#84f165',
          '400': '#5ae536',
          '500': '#39cb17',
          '600': '#28a80e',
          '700': '#1f7c0f',
          '800': '#1e6212',
          '900': '#1c5314',
          '950': '#092e05',
        },

      },
    },
  },
  plugins: [],
} satisfies Config;
