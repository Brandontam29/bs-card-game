import { ADD_CARDS, REMOVE_CARDS, SET_CARDS } from '../actions/handActions';

const initialState = { cards: [] };

const handReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARDS:
            return {
                ...state,
                cards: [...state.cards, ...action.payload],
            };
        case REMOVE_CARDS: {
            const toRemove = new Set(action.payload);
            const difference = state.cards.filter((x) => !toRemove.has(x));

            return {
                ...state,
                cards: difference,
            };
        }
        case SET_CARDS:
            return {
                ...state,
                cards: action.payload,
            };
        default:
            return state;
    }
};

export default handReducer;
