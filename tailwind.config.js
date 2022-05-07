const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        primary: {
          500: "#facc15",
          600: "#eab308",
        },
        secondary: "#062c4b",
        neutral: {
          400: "#dddddd",
          500: "#999999",
          600: "#707070",
          700: "#333333",
          800: "#222222",
          900: "#111111",
        },
        success: "#22c55e",
        warning: "#fde047",
        error: "#ef4444",
      },
      backgroundImage: {},
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("is-active", "&.is-active");
    }),
  ],
};
