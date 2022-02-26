export const getTurnPlayerId = (playerArr, turn) => {
    const index = turn % playerArr.length;
    const turnPlayerId = playerArr[index].id;

    return turnPlayerId;
};

/*
    0 % 4 = 0
    1 % 4 = 1
    2 % 4 = 2
    3 % 4 = 3
    4 % 4 = 0
    5 % 4 = 1
    6 % 4 = 2

*/
