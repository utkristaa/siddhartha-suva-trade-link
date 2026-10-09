import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        studio: "#FAFAFA",
        charcoal: "#111111",
        slate: { paint: "#3E6A8A" },
        brick: "#C0553F",
        ochre: "#D9A441",
        sage: "#7E9C84",
        lilac: "#B9A4D9",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { editorial: "0.32em" },
    },
  },
  plugins: [],
};
export default config;
