import {
    SET_TURN_PLAYER,
    SET_CARD_NEEDED,
    SET_CALLING_BS,
    SET_PLAYER_CARDS_LEFT,
    SET_RANKING,
} from '../actions/gameActions';

const initialState = {
    turnPlayer: 'someone',
    cardNeeded: 'none',
    callingBS: true,
    playerCardsLeft: {},
    ranking: [],
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TURN_PLAYER:
            return {
                ...state,
                turnPlayer: action.payload,
            };
        case SET_CARD_NEEDED:
            return {
                ...state,
                cardNeeded: action.payload,
            };
        case SET_CALLING_BS:
            return {
                ...state,
                callingBS: action.payload,
            };
        case SET_PLAYER_CARDS_LEFT:
            return {
                ...state,
                playerCardsLeft: action.payload,
            };
        case SET_RANKING:
            return {
                ...state,
                ranking: action.payload,
            };
        default:
            return state;
    }
};

export default gameReducer;
