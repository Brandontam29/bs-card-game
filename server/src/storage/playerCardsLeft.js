const playerCardsLeft = new Map();

const setPlayerCardsLeft = (lobbyCode, obj) => {
    playerCardsLeft.set(lobbyCode, obj);
};
const getPlayerCardsLeft = (lobbyCode) => {
    playerCardsLeft.get(lobbyCode);
};

const deletePlayerCardsLeft = (lobbyCode) => {
    playerCardsLeft.delete(lobbyCode);
};

module.exports = {
    setPlayerCardsLeft,
    getPlayerCardsLeft,
    deletePlayerCardsLeft,
};
