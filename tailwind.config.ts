import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main_color: "#d7cdc7",
        secend_color: "#B4A095",
        disable_color: "#d9cfc9",
        textlight_color: "#d9cfc9",
        iconlight_color: "#d9cfc9",
        bglightbar: "#d9cfc9",
        bgbtn: "#d9cfc9",
        bglight: "#fff",
        main_dash: "#0f172a",
        secend_dash: "#1f2937",
        secend_text: "#94a3b8",
      },
    },
  },

  plugins: [],
};
export default config;
