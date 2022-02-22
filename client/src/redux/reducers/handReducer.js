import { SET_HAND } from '../actions/handActions';

const initialState = { hand: [] };

const handReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ADD_CARDS: {
        //     return {
        //         ...state,
        //         cards: [...state.cards, ...action.payload],
        //     };
        // }
        // case REMOVE_CARDS: {
        //     const toRemove = new Set(action.payload);
        //     const difference = state.cards.filter((x) => !toRemove.has(x));

        //     return {
        //         ...state,
        //         cards: difference,
        //     };
        // }
        case SET_HAND: {
            return {
                ...state,
                hand: action.payload,
            };
        }
        default:
            return state;
    }
};

export default handReducer;
