import { Antonio, Big_Shoulders_Display } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
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
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
         inconsolata: ["Inconsolata", "monospace"],
        Shoulders:["Big Shoulders","sans-serif"],
        anton: ["Anton", "sans-serif"],
      },
    },
  },
  plugins: [],
};
