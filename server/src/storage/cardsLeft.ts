import { CardsLeft as CardsLeftType } from '../types';

const cardsLeft = new Map();

const newCardsLeft = (lobby: string, obj: CardsLeftType | {} = {}) => {
    cardsLeft.set(lobby, obj);
};

const setCardsLeft = (lobby: string, obj: CardsLeftType) => {
    cardsLeft.set(lobby, obj);
};

const getCardsLeft = (lobby: string) => {
    return cardsLeft.get(lobby);
};

const deleteCardsLeft = (lobby: string) => {
    cardsLeft.delete(lobby);
};

export { newCardsLeft, setCardsLeft, getCardsLeft, deleteCardsLeft };

module.exports = {
    newCardsLeft,
    setCardsLeft,
    getCardsLeft,
    deleteCardsLeft,
};
