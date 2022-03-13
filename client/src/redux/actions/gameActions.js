export const SET_TURN_PLAYER = 'SET_TURN_PLAYER';
export const SET_CARD_NEEDED = 'SET_CARD_NEEDED';
export const SET_CALLING_BS = 'SET_CALLING_BS';
export const SET_PLAYER_CARDS_LEFT = 'SET_PLAYER_CARDS_LEFT';
export const SET_RANKING = 'SET_RANKING';

export const setTurnPlayer = (payload) => ({
    type: SET_TURN_PLAYER,
    payload,
});

export const setCardNeeded = (payload) => ({
    type: SET_CARD_NEEDED,
    payload,
});

export const setCallingBS = () => ({
    type: SET_CALLING_BS,
});

export const setPlayerCardsLeft = (payload) => ({
    type: SET_PLAYER_CARDS_LEFT,
    payload,
});

export const setRanking = () => ({
    type: SET_RANKING,
});
