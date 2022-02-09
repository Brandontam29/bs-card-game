import { useRef, useState, useEffect } from 'react';

const useElementOnScreen = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const observeCallback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const { current: container } = containerRef;
        if (!container) return undefined;

        if (!('IntersectionObserver' in window)) return undefined;

        const observer = new IntersectionObserver(observeCallback, options);
        observer.observe(container);

        return () => observer.unobserve(container);
    }, [containerRef, options]);

    return [containerRef, isVisible];
};

export default useElementOnScreen;
