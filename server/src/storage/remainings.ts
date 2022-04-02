import { CardsLeft as CardsLeftType } from '../types';

const remainings = new Map<string, CardsLeftType>();

const newRemaining = (lobby: string, obj: CardsLeftType | {} = {}) => {
    remainings.set(lobby, obj);
};

const setPlayerRemaining = (lobby: string, id: string, numOfCards: number) => {
    const object = remainings.get(lobby);
    if (object === undefined) {
        return;
    }

    object.id = numOfCards;
};

const getRemaining = (lobby: string) => {
    return remainings.get(lobby);
};

const deleteRemaining = (lobby: string) => {
    remainings.delete(lobby);
};

export { newRemaining, setPlayerRemaining, getRemaining, deleteRemaining };

module.exports = {
    newRemaining,
    setPlayerRemaining,
    getRemaining,
    deleteRemaining,
};
