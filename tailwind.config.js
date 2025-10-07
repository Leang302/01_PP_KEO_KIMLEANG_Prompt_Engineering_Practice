/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  safelist: [
    "bg-brand-500",
    "text-brand-600",
    "hover:bg-brand-600",
    "focus:ring-brand-500",
  ],
};
