/** @type {import('tailwindcss').config} */
export default{
    content: [".index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            // colors used in the project
            colors: {
                primary: "#2b85ff" ,
                secondary: "#ef86e3",
            },
        },
    } ,
    plugins : [],
};