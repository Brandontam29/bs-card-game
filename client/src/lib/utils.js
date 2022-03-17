/* eslint-disable import/prefer-default-export */
export const add = (num1, num2) => {
    return num1 + num2;
};

export const sortCards = (a, b) => {
    const codeA = a.code;
    const codeB = b.code;
    if (codeA < codeB) return -1;
    if (codeA > codeB) return 1;
    return 0;
};
