import {
    SET_HAND,
    SELECT_CARD,
    DESELECT_CARD,
    DESELECT_ALL,
    SORT_HAND,
} from '../actions/handActions';

import { sortCards } from '../../lib/utils';

const initialState = { cards: [], selectedCards: [] };

const handReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HAND: {
            return {
                ...state,
                cards: action.payload,
            };
        }
        case SORT_HAND: {
            const sortedHand = state.cards.slice().sort(sortCards);

            return {
                ...state,
                cards: sortedHand,
            };
        }
        case SELECT_CARD: {
            return {
                ...state,
                selectedCards: [...state.selectedCards, action.payload],
            };
        }
        case DESELECT_CARD: {
            const difference = state.selectedCards.filter(
                (card) => card.code !== action.payload.code,
            );

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
