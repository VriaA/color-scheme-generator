/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*html", "./dist/*js"],
  theme: {
    extend: {
      backgroundColor: ['group-checked'],
      fontFamily: {
        "inter": "'Inter', sans-serif",
        'playfair': "'Playfair Display', serif"
      },
      gridTemplateColumns: {
        "colors": "repeat(3, minmax(80px, 1fr) )",
        "colors-md": "repeat(auto-fit, minmax(100px, 1fr) )"
      },
      animation: {
        "blob1": "blob1 5s ease-in-out infinite alternate",
        "blob2": "blob2 4s ease-in-out infinite alternate",
      },
      keyframes: {
        "blob1": {
          "0%": {transform: 'translateY(0)', fill: '#ff0099'},
          "50%": {transform: 'translateY(15px)', fill: '#e5f244'},
          "100%": {transform: 'translateY(20px)', fill: '#9c56fd'}
        }, 
        "blob2": {
          "0%": {transform: 'translateY(0)', fill: '#00ffff'},
          "50%": {transform: 'translateY(13px)', fill: '#ff0000'},
          "100%": {transform: 'translateY(40px)', fill: '#0000ff'}
        }
      }, 
      boxShadow: {
        "inputShadow": '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        "btnHover": '-1px -1px 10px #ff8dff, 1px 1px 10px #0000ff'
      },
      dropShadow: {
        "settings": '3px 3px 5px #00ffff',
        "done": '2px 2px 0px #ffffff, 2px 2px 0px #ffffff'
      }
    },
  },
  plugins: [],
}

