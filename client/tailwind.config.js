module.exports = {
    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    theme: {
        extend: {
            animation: {
                spinSlow: 'spin 20s linear infinite',
                beat: 'beat 3s ease-in-out infinite',
                spinBeat:
                    'spin 10s linear infinite, beat2 3s ease-in-out infinite',
            },
            keyframes: {
                beat: {
                    '0,100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                },
                beat2: {
                    0: { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' },
                },
                spinBeat: {
                    '0%': { transform: 'scale(1) rotate(0deg)' },
                    '50%': { transform: 'scale(1.4) rotate(180deg)' },
                    '100%': { transform: 'scale(1) rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
};
