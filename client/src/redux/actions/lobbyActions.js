export const SET_IN_GAME = 'SET_IN_GAME';
export const SET_PLAYERS = 'SET_PLAYERS';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const INCREMENT_ROUND = 'INCREMENT_ROUND';
export const SET_ROUND = 'SET_ROUND';
export const SET_LOBBY_CODE = 'SET_LOBBY_CODE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGES';

export const setInGame = (payload) => ({
    type: SET_IN_GAME,
    payload,
});

export const setPlayers = (payload) => ({
    type: SET_PLAYERS,
    payload,
});

export const setLobbyCode = (payload) => ({
    type: SET_LOBBY_CODE,
    payload,
});

export const addMessage = (payload) => ({
    type: ADD_MESSAGE,
    payload,
});
export const setMessages = (payload) => ({
    type: SET_MESSAGES,
    payload,
});
