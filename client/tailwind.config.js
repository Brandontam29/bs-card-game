/* eslint-disable max-len */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                header: ['Nunito', 'arial', 'sans-serif'],
                sans: ['Nunito', 'arial', 'sans-serif'],
            },
            fontSize: {
                xs: 'clamp(12px,10.235294117647058px + 0.3676470588235294vw,14px)',
                sm: 'clamp(14px,12.235294117647058px + 0.3676470588235294vw,16px)',
                base: 'clamp(14px,12.235294117647058px + 0.3676470588235294vw,16px)',
                lg: 'clamp(16px,14.235294117647058px + 0.3676470588235294vw,18px)',
                xl: 'clamp(18px,16.235294117647058px + 0.3676470588235294vw,20px)',
                '2xl': 'clamp(20px,16.470588235294116px + 0.7352941176470588vw,24px)',
                '3xl': 'clamp(22px,14.941176470588236px + 1.4705882352941175vw,30px)',
                '4xl': 'clamp(24px,13.411764705882351px + 2.2058823529411766vw,36px)',
            },

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
