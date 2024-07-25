/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "bg-primary": "#0F172A",
      "text-primary": "#F3F4F6",
      "bg-secondary": "#1E293B",
      "text-emphasize": "#14B2EB",
      "text-nav": "#E5E7EB",
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    /* preflight: false, */
  },
};
