const turns = new Map<string, number>();

const newTurn = (lobby: string) => {
    turns.set(lobby, 0);
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

export { newTurn, getTurn, incrementTurn, deleteTurn };

module.exports = { newTurn, getTurn, incrementTurn, deleteTurn };
