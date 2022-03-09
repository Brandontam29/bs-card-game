/* eslint-disable max-len */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            header: ['arial', 'sans-serif'],
            body: ['roboto', 'serif'],
        },
        extend: {
            colors: {
                green: {
                    DEFAULT: '#79CF90',
                },
                brown: {
                    DEFAULT: '#302926',
                },
                red: {
                    DEFAULT: '#EF6B65',
                },
            },
            boxShadow: {
                rainbow:
                    '0 0 0 10px #ff0000,0 0 0 20px #ff7700,0 0 0 30px #FFDD00,0 0 0 40px #00FF00,0 0 0 50px #0000FF,0 0 0 60px #C77DF3,0 0 0 70px #8A2BE2',
            },
        },
    },
    plugins: [],
};
