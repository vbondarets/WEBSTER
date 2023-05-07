/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            textColor: {
                hover: "rgb(240 185 11)",
            },
            backgroundColor: {
                main: "rgb(30 30 40)",
            },
            colors: {
              mainColor: '#1f2029',
              mainFontColor: 'rgb(112, 160, 203)',
            },
        },
    },
    plugins: [],
};