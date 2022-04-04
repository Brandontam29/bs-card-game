const decks = new Map<string, string | undefined>();

const newDeck = (lobby: string, deckId: string | undefined = undefined) => {
    decks.set(lobby, deckId);
};

const setDeck = (lobby: string, deckId: string) => {
    decks.set(lobby, deckId);
};

const getDeck = (lobby: string) => {
    const deck = decks.get(lobby);

    return deck;
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
