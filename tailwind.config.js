/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d12",
        text: "#f4f6fb",
        grid: "#1f2330",
        neon: "#c8ff00",
        sysblue: "#7dd3fc",
        signal: "#ff5470",
      },
      fontFamily: {
        heading: ["Clash Display", "Satoshi", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        32: "32px",
        48: "48px",
        64: "64px",
      },
      borderRadius: {
        card: "8px",
        panel: "20px",
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      transitionDuration: {
        short: "180ms",
        base: "360ms",
        long: "600ms",
      },
    },
  },
  plugins: [],
};
