const playerCardsLeft = new Map();

interface Data {
    [key:string]: number,
}
const newPlayerCardsLeft = (lobbyCode: string, obj: Data) => {
    playerCardsLeft.set(lobbyCode, obj);
};

const setPlayerCardsLeft = (lobbyCode: string, id: string, number: number) => {
    let obj = playerCardsLeft.get(lobbyCode);
    obj[id] = number;
    return obj;
};

const getPlayerCardsLeft = (lobbyCode:string) => {
    playerCardsLeft.get(lobbyCode);
};

const deletePlayerCardsLeft = (lobbyCode:string) => {
    playerCardsLeft.delete(lobbyCode);
};

module.exports = {
    newPlayerCardsLeft,
    setPlayerCardsLeft,
    getPlayerCardsLeft,
    deletePlayerCardsLeft,
};
