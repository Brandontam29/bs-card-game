import { Player } from '../types';

const getTurnPlayerId = (players: Player[], turn: number) => {
    const index = turn % players.length;
    const turnPlayerId = players[index].id;

    return turnPlayerId;
};

export { getTurnPlayerId };

/*
    0 % 4 = 0
    1 % 4 = 1
    2 % 4 = 2
    3 % 4 = 3
    4 % 4 = 0
    5 % 4 = 1
    6 % 4 = 2

*/
