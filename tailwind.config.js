/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nav: "#1a202c",
        page: "#b4d9ef",
        card: "#fff",
        "nav-hover": "#2d3748",
        "card-hover": "#edf2f7",
        "default-text": "#718096",
        "blue-tint": "#4299e1",
        "blue-tint-hover": "#009fff",
      },
    },
  },
  plugins: [],
};
