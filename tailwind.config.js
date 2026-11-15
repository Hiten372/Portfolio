tailwind.config = {
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        ovo: ["Ovo", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        spin_slow: "spin 12s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse_slow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      colors: {
        darkTheme: "#09090b",
        darkSurface: "#111115",
        darkCard: "#16161e",
        darkBorder: "rgba(255, 255, 255, 0.08)",
        brand: {
          purple: "#9333ea",
          violet: "#8b5cf6",
          indigo: "#6366f1",
          pink: "#ec4899",
          amber: "#f59e0b",
        },
      },
      boxShadow: {
        black: "4px 4px 0 #000",
        white: "4px 4px 0 #fff",
        glow: "0 0 25px -5px rgba(139, 92, 246, 0.3)",
        glowLg: "0 0 50px -10px rgba(139, 92, 246, 0.35)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
        cardDark: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  darkMode: "class",
};
