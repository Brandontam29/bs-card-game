const turns = new Map<string, number>();

// Determines who is the turn player
const newTurn = (lobby: string) => {
    turns.set(lobby, 0);
};
const setTurn = (lobby: string, turn: number) => {
    turns.set(lobby, turn);
};

const getTurn = (lobby: string) => {
    return turns.get(lobby);
};

const incrementTurn = (lobby: string) => {
    const turn = turns.get(lobby);
    if (turn === undefined) {
        return undefined;
    }

    turns.set(lobby, turn + 1);
};

const deleteTurn = (lobby: string) => {
    turns.delete(lobby);
};

export { newTurn, getTurn, incrementTurn, deleteTurn, setTurn };

module.exports = { newTurn, getTurn, incrementTurn, deleteTurn };
