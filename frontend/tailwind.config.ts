import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#000000",
          deep: "#02040f",
          base: "#050816",
        },
        signal: {
          blue: "#2E6FFF",
          cyan: "#3EF2E0",
          purple: "#7B4DFF",
          magenta: "#FF3ECF",
        },
        mist: "#EAF0FF",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(5,8,22,0) 0%, #050816 85%)",
        "signal-gradient":
          "linear-gradient(120deg, #2E6FFF 0%, #7B4DFF 45%, #FF3ECF 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(62, 242, 224, 0.35)",
        "glow-blue": "0 0 40px rgba(46, 111, 255, 0.4)",
        "glow-magenta": "0 0 40px rgba(255, 62, 207, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        drift: "drift 12s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;