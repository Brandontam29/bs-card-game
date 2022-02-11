import {
    SET_TURN_PLAYER,
    SET_CARD_NEEDED,
    SET_CALLING_BS,
} from '../actions/gameActions';

const initialState = {
    turnPlayer: 'someone',
    cardNeeded: 'A',
    callingBS: true,
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

        default:
            return state;
    }
};

export default gameReducer;
