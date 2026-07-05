import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  esbuild: {
    // Strip debug noise from the production bundle; errors/warnings
    // still surface via the ErrorBoundary and error responses.
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
  build: {
    target: "esnext",
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
          "motion-vendor": ["gsap", "framer-motion", "lenis"],
        },
      },
    },
  },
});