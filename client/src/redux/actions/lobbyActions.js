export const SET_IN_GAME = 'SET_IN_GAME';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const INCREMENT_ROUND = 'INCREMENT_ROUND';
export const SET_ROUND = 'SET_ROUND';
export const SET_LOBBY_ID = 'SET_LOBBY_ID';

export const setInGame = (payload) => ({
    type: SET_IN_GAME,
    payload,
});

export const addPlayer = (payload) => ({
    type: ADD_PLAYER,
    payload,
});

export const removePlayer = (payload) => ({
    type: REMOVE_PLAYER,
    payload,
});

export const incremementRound = () => ({
    type: INCREMENT_ROUND,
});

export const setRound = (payload) => ({
    type: SET_ROUND,
    payload,
});

export const setLobbyId = (payload) => ({
    type: SET_LOBBY_ID,
    payload,
});
