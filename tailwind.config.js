/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        surface: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          800: "#1a1a2e",
          900: "#0f0f1a",
          950: "#0a0a0f",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        glow: "glow 2s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        morph: "morph 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(59, 130, 246, 0.2), 0 0 60px rgba(59, 130, 246, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(59, 130, 246, 0.3), 0 0 100px rgba(59, 130, 246, 0.15)",
          },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(59, 130, 246, 0.15)",
        "glow-md": "0 0 40px rgba(59, 130, 246, 0.2)",
        "glow-lg":
          "0 0 60px rgba(59, 130, 246, 0.25), 0 0 120px rgba(59, 130, 246, 0.1)",
        card: "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 20px 60px -15px rgba(59, 130, 246, 0.15)",
      },
    },
  },
  plugins: [],
};
