const decks = new Map<string, string | null>();

const newDeck = (lobby: string, deckId: string | null = null) => {
    decks.set(lobby, deckId);
};

const setDeck = (lobby: string, deckId: string) => {
    decks.set(lobby, deckId);
};

const getDeck = (lobby: string) => {
    const deck = decks.get(lobby);

    if (deck) {
        return deck;
    }

    return Error('You do not have a deck of cards');
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
