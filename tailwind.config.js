/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d0d0f",
        text: "#ffffff",
        grid: "#18181c",
        accent: "#ff2a2a",
        marioRed: "#ff2a2a",
        marioBlue: "#00e5ff",
        marioSky: "#00e5ff",
        marioGold: "#fbd000",
        marioGreen: "#00ff66",
        marioDark: "#141417",
        marioCream: "#0d0d0f",
      },
      fontFamily: {
        heading: ['"Pixelify Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Inter"', 'sans-serif'],
        script: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['Silkscreen', 'cursive'],
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
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
