const histories = new Map();

// Track number of cards placed in the center pile
const newHistory = (lobby: string) => {
    const history: number[] = [];
    histories.set(lobby, history);
};

const addHistory = (lobby: string, number: number) => {
    const history = histories.get(lobby);
    history.push(number);
};

// Get the  number of cards played by  the last player
const getLastHistory = (lobby: string) => {
    const history = histories.get(lobby);
    if (!history) return history;
    return history[history.length - 1];
};

// Remove the pile from memory
const deleteHistory = (lobby: string) => {
    histories.delete(lobby);
};

export { newHistory, addHistory, getLastHistory, deleteHistory };

module.exports = { newHistory, addHistory, getLastHistory, deleteHistory };
