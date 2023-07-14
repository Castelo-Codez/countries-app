/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                cardclr: "#2b3743",
                bgclr1: "#ffffff",
                textclrDark: "#ffffff",
            },
            gridTemplateColumns: {
                main: "repeat(auto-fill, minmax(200px, 1fr))",
            },
        },

        container: {
            center: true,
            padding: "10px",
            screens: {
                sm: "540px",
                md: "720px",
                lg: "960px",
                xl: "1140px",
                "2xl": "1320px",
            },
        },
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "2xl": "1400px",
        },
    },
    plugins: [],
};
