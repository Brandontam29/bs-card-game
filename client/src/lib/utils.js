/* eslint-disable import/prefer-default-export */
export const add = (num1, num2) => {
    return num1 + num2;
};

export const sortCards = (arr) => {
    const algo = (a, b) => {
        const codeA = a.value;
        const codeB = b.value;
        if (codeA < codeB) return -1;
        if (codeA > codeB) return 1;
        return 0;
    };

    return arr.slice().sort(algo);
};

export const capitalize = (str) => {
    if (typeof str === 'number') {
        return str;
    }

    if (typeof str !== 'string') {
        return 'Error';
    }

    if (str.length === 1) {
        return str;
    }

    return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
};
