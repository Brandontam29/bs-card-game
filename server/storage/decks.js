const decks = [];

// New Deck to track the deck_id by lobbyCode (don't want user to have access to the deck+_id)
const newDeck = (id, lobbyCode) => {
    const deck = { id, lobbyCode, turn: 0 };

    decks.push(deck);

    return user;
};

// Get deck_id
const getDeckId = (lobbyCode) => {
    const deck = decks.find((deck) => deck.lobbyCode === lobbyCode);
    return deck.id;
};

// Turns

const incrementTurn = (lobbyCode) => {
    const deck = decks.find((deck) => deck.lobbyCode === lobbyCode);
    deck.turn += 1;
};

const setTurn = (lobbyCode, number) => {
    const deck = decks.find((deck) => deck.lobbyCode === lobbyCode);
    deck.turn = number;
};

const getTurn = (lobbyCode) => {
    const deck = decks.find((deck) => deck.lobbyCode === lobbyCode);
    return deck.turn;
};

// Discard deck
const dumpDeck = (lobbyCode) => {
    const index = decks.findIndex((deck) => deck.lobbyCode === lobbyCode);
    if (index !== -1) {
        return decks.splice(index, 1)[0];
    }
};

export { newDeck, getDeckId, incrementTurn, setTurn, getTurn, dumpDeck };
