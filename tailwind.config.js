/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        // 很多样式都继承spacing的配置，比如width、height、margin、padding
        spacing: {
            10: '10px',
            40: '40px',
            100: '100px',
            200: '200px',
            600: '600px',
            1000: '1000px',
        },
        width: {

        },
        height: {

        },
        margin: {

        },
        padding: {

        },
        flex: {
            2: 2
        },
        lineHeight: {
            100: '100px',
            200: '200px'
        }
    },
  },
  plugins: [],
}

