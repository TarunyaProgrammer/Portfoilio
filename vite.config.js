/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['nodemailer'],
      output: {
        manualChunks: {
          'vendor-animations': ['gsap', 'framer-motion'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.js"],
    css: false,
    include: ["src/__tests__/**/*.test.{js,jsx}"],
  },
});
