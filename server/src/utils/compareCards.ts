import { Card } from '../types';

export const compareCards = (cardsArr: Card[], card: string) => {
    const index = cardsArr.findIndex((cardObj) => cardObj.value === card);
    return index !== -1;
};
