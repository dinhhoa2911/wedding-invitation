/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Bạn có thể định nghĩa màu sắc thiệp cưới ở đây để dùng class như text-wedding-primary
          'wedding-primary': '#545F1B',
          'wedding-accent': '#E6D0AF',
          'wedding-bg': '#FFFCF6',
        },
      },
    },
    plugins: [],
  }