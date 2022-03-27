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

export const convertClockToCard = (cardClock) => {
    const number = (cardClock % 13) + 1;

    switch (number) {
        case 1: {
            return 'Ace';
        }
        case 11: {
            return 'Jack';
        }
        case 12: {
            return 'Queen';
        }
        case 13: {
            return 'King';
        }
        default:
            return `${number}`;
    }
};
