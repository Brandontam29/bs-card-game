import { Card } from '../types';

const splitCards = (
    cardsArr: Card[],
    numOfPlayers: number,
): Array<Card[]> | undefined => {
    if (cardsArr.length !== 54) {
        throw Error('Please restart your game');
    }

    switch (numOfPlayers) {
        case 2: {
            // 2* 27
            return [cardsArr.slice(0, 27), cardsArr.slice(27)];
        }
        case 3: {
            // 3*18
            return [
                cardsArr.slice(0, 18),
                cardsArr.slice(18, 36),
                cardsArr.slice(36, 54),
            ];
        }
        case 4: {
            // 2 * 14 + 2 * 13
            return [
                cardsArr.slice(0, 14),
                cardsArr.slice(14, 28),
                cardsArr.slice(28, 41),
                cardsArr.slice(41, 54),
            ];
        }
        case 5: {
            // 4 * 11 + 1 * 10
            return [
                cardsArr.slice(0, 11),
                cardsArr.slice(11, 22),
                cardsArr.slice(22, 33),
                cardsArr.slice(33, 44),
                cardsArr.slice(44, 54),
            ];
        }
        case 6: {
            // 6 * 9
            return [
                cardsArr.slice(0, 9),
                cardsArr.slice(9, 18),
                cardsArr.slice(18, 27),
                cardsArr.slice(27, 36),
                cardsArr.slice(36, 45),
                cardsArr.slice(45, 54),
            ];
        }
        default: {
            throw Error('Please restart');
        }
    }
};

export { splitCards };
