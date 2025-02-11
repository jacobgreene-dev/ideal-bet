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
        'affair': {
          '50': '#faf7fc',
          '100': '#f5eef9',
          '200': '#ebdcf2',
          '300': '#dbc0e7',
          '400': '#c79ad8',
          '500': '#ad71c4',
          '600': '#8f51a4',
          '700': '#794289',
          '800': '#643771',
          '900': '#55315e',
          '950': '#34173b',
        },


      },
    },
  },
  plugins: [],
} satisfies Config;
