const decks = [];

// Join user to chat
const newDeck = (id, lobbyCode) => {
    const deck = { id, lobbyCode };

    decks.push(deck);

    return user;
};

// Get current user
const getDeckByLobby = (lobbyCode) => {
    return decks.find((deck) => deck.lobbyCode === lobbyCode);
};

// User leaves chat
const dumpDeck = (lobbyCode) => {
    const index = decks.findIndex((deck) => deck.lobbyCode === lobbyCode);
    if (index !== -1) {
        return decks.splice(index, 1)[0];
    }
};

export { newDeck, getDeckByLobby, dumpDeck };
