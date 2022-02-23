import {
    SET_HAND,
    SELECT_CARD,
    DESELECT_CARD,
    DESELECT_ALL,
    SORT_HAND,
} from '../actions/handActions';

const initialState = { hand: [], selectedCards: [] };

const handReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HAND: {
            return {
                ...state,
                hand: action.payload,
            };
        }
        case SORT_HAND: {
            const sortedHand = state.hand.sort((a, b) => a - b);
            return {
                ...state,
                hand: sortedHand,
            };
        }
        case SELECT_CARD: {
            return {
                ...state,
                selectedCards: [...state.cards, action.payload],
            };
        }
        case DESELECT_CARD: {
            const difference = state.cards.filter((card) => card.code === action.payload.code);

            return {
                ...state,
                selectedCards: difference,
            };
        }
        case DESELECT_ALL: {
            return {
                ...state,
                selectedCards: [],
            };
        }
        default:
            return state;
    }
};

export default handReducer;
