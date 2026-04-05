/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'mars-red-deep': '#C95A4D',
        'mars-accent': '#FF8855',
        'bg-dark': '#120C18',
        'card-bg': '#1B212C',
        'nav-bg': '#1E293B',
        
        'text-main': 'var(--text)',
        'bg-main': 'var(--bg)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
      },
      boxShadow: {
        'mars-glow': '0 0 15px rgba(255, 136, 85, 0.4)',
        'mars-glow-lg': '0 0 25px rgba(255, 136, 85, 0.6)',
      }
    }
  },
  plugins: [],
}