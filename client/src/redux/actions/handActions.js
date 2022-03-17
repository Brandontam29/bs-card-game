export const SET_HAND = 'SET_HAND';
export const SORT_HAND = 'SORT_HAND';
export const SELECT_CARD = 'SELECT_CARD';
export const DESELECT_CARD = 'DESELECT_CARD';
export const DESELECT_ALL = 'DESELECT_ALL';

export const setHand = (payload) => ({
    type: SET_HAND,
    payload,
});

export const sortHand = () => ({
    type: SORT_HAND,
});

export const selectCard = (payload) => ({
    type: SELECT_CARD,
    payload,
});

export const deselectCard = (payload) => ({
    type: DESELECT_CARD,
    payload,
});

export const deselectAll = () => ({
    type: DESELECT_ALL,
});
