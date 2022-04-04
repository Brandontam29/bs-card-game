const turnHistories = new Map<string, string[]>();

// Logs the order of who played cards
const newTurnHistory = (lobby: string) => {
    turnHistories.set(lobby, []);
};

const getTurnHistory = (lobby: string): string[] | undefined => {
    const history = turnHistories.get(lobby);
    return history;
};

const addTurnHistory = (lobby: string, id: string) => {
    const turnHistory = turnHistories.get(lobby);
    if (turnHistory === undefined) {
        return;
    }

    turnHistory.push(id);
};

const deleteTurnHistory = (lobby: string) => {
    turnHistories.delete(lobby);
};

export { newTurnHistory, getTurnHistory, addTurnHistory, deleteTurnHistory };
