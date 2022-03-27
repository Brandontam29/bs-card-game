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

export const convertClockToCard = (cardClock) => {
    const number = (cardClock % 13) + 1;

    switch (number) {
        case 1: {
            return 'ACE';
        }
        case 11: {
            return 'JACK';
        }
        case 12: {
            return 'QUEEN';
        }
        case 13: {
            return 'KING';
        }
        default:
            return `${number}`;
    }
};
