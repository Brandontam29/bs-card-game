const centerPiles = [];

// Track number of cards placed in the center pile
const newPileRecord = (lobbyCode) => {
    const pile = { lobbyCode, history: [] };

    centerPiles.push(pile);

    return pile;
};
const addRecord = (lobbyCode, number) => {
    const index = centerPiles.findIndex((pile) => pile.lobbyCode === lobbyCode);
    return centerPiles[index].history.push(number);
};

// Get the  number of cards played by  the last player
const getLastRecord = (lobbyCode) => {
    const pile = centerPiles.find((pile) => pile.lobbyCode === lobbyCode);
    return pile.history[pile.history.length - 1];
};

// Remove the pile from memory
const deletePileRecord = (lobbyCode) => {
    const index = centerPiles.findIndex((pile) => pile.lobbyCode === lobbyCode);
    if (index !== -1) {
        return decks.splice(index, 1)[0];
    }
};

module.exports = { newPileRecord, addRecord, getLastRecord, deletePileRecord };
