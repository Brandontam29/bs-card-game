import { useState, useEffect } from 'react';

const getWindowSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

const useWindowSize = (opts = {}) => {
    const { onChange = null } = opts;
    const [size, setSize] = useState(getWindowSize());

    useEffect(() => {
        const onResize = () => {
            const newSize = getWindowSize();
            setSize(newSize);
            if (onChange !== null) {
                onChange(newSize);
            }
        };

        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [window, onChange]);

    return {
        ...size,
    };
};

export default useWindowSize;
