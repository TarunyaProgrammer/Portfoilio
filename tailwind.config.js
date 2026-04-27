/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        text: "#000000",
        grid: "#F2F2F2",
        accent: "#000000",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        serif: ["Fraunces", "serif"],
        script: ["Pinyon Script", "cursive"],
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
        card: "0px",
        panel: "0px",
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
