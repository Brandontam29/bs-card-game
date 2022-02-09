export const ADD_CARDS = 'ADD_CARDS';
export const REMOVE_CARDS = 'REMOVE_CARDS';
export const SET_CARDS = 'SET_CARDS';

export const addCards = (payload) => ({
    type: ADD_CARDS,
    payload,
});

export const removeCards = (payload) => ({
    type: REMOVE_CARDS,
    payload,
});

export const setCards = (payload) => ({
    type: SET_CARDS,
    payload,
});
