const turns = new Map();

const newTurn = (lobby: string) => {
    turns.set(lobby, 0);
};

const getTurn = (lobby: string) => {
    return turns.get(lobby);
};

const incrementTurn = (lobby: string) => {
    let turn = turns.get(lobby);
    turns.set(lobby, turn + 1);
};

const deleteTurn = (lobby: string) => {
    turns.delete(lobby);
};

export { newTurn, getTurn, incrementTurn, deleteTurn };

module.exports = { newTurn, getTurn, incrementTurn, deleteTurn };
