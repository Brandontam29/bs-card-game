const centerPiles = new Map();

// Track number of cards placed in the center pile
const newPileRecord = (lobbyCode) => {
    const history = [];
    centerPiles.set(lobbyCode, history);
    return history;
};
const addRecord = (lobbyCode, number) => {
    const history = centerPiles.get(lobbyCode);
    history.push(number);
};

// Get the  number of cards played by  the last player
const getLastRecord = (lobbyCode) => {
    const history = centerPiles.get(lobbyCode);
    return history[history.length - 1];
};

// Remove the pile from memory
const deletePileRecord = (lobbyCode) => {
    const success = centerPiles.delete(lobbyCode);
    return success;
};

module.exports = { newPileRecord, addRecord, getLastRecord, deletePileRecord };
