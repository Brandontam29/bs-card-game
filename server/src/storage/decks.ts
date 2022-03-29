const decks = new Map();

const newDeck = (lobby: string, deckId: string | null = null) => {
    decks.set(lobby, deckId);
};

const setDeck = (lobby: string, deckId: string) => {
    decks.set(lobby, deckId);
};

const getDeck = (lobby: string) => {
    return decks.get(lobby);
};

const deleteDeck = (lobby: string) => {
    decks.delete(lobby);
};

export { newDeck, setDeck, getDeck, deleteDeck };

module.exports = {
    newDeck,
    setDeck,
    getDeck,
    deleteDeck,
};
