/* eslint-disable import/prefer-default-export */

export const calculateClamp = (minSize, maxSize, minWidth = 480, maxWidth = 1024) => {
    const slope = (maxSize - minSize) / (maxWidth - minWidth);
    const yAxisIntersection = minSize - slope * minWidth;
    const scaling = `${yAxisIntersection}px + ${slope * 100}vw`;
    const result = `clamp(${minSize}px, ${scaling}, ${maxSize}px)`;

    return result;
};

// calculateClamp(25, 50);
// calculateClamp(30, 60);
// calculateClamp(14, 16);
// calculateClamp(14, 20);
// calculateClamp(14, 16);
// calculateClamp(80, 160);
// calculateClamp(10, 20);

// console.log('xs');
// calculateClamp(12, 14);

// console.log('sm');
// calculateClamp(14, 16);

// console.log('base');
// calculateClamp(14, 16);

// console.log('lg');
// calculateClamp(16, 18);

// console.log('xl');
// calculateClamp(18, 20);

// console.log('2xl');
// calculateClamp(20, 24);

// console.log('3xl');
// calculateClamp(22, 30);

// console.log('4xl');
// calculateClamp(24, 36);

// min-width: 480px
// max-width: 1024px
// difference: 544px
// clamp vlaues: minSize | scaling | maxSize
// scaling: yAxisIntersection[rem] + (slope * 100)[vw]
// slope: (maxSize - minSize) / (maxWidth - minWidth)

// text-xs	font-size: 0.75rem; /* 12px */
// line-height: 1rem; /* 16px */

// text-sm	font-size: 0.875rem; /* 14px */
// line-height: 1.25rem; /* 20px */

// text-base	font-size: 1rem; /* 16px */
// line-height: 1.5rem; /* 24px */

// text-lg	font-size: 1.125rem; /* 18px */
// line-height: 1.75rem; /* 28px */

// text-xl	font-size: 1.25rem; /* 20px */
// line-height: 1.75rem; /* 28px */

// text-2xl	font-size: 1.5rem; /* 24px */
// line-height: 2rem; /* 32px */

// text-3xl	font-size: 1.875rem; /* 30px */
// line-height: 2.25rem; /* 36px */

// text-4xl	font-size: 2.25rem; /* 36px */
// line-height: 2.5rem; /* 40px */

// text-5xl	font-size: 3rem; /* 48px */
// line-height: 1;
