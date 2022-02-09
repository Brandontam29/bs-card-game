import {
    SET_IN_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    INCREMENT_ROUND,
    SET_ROUND,
    SET_LOBBY_ID,
} from '../actions/lobbyActions';

const initialState = {
    inGame: false,
    players: [],
    round: 0,
    lobbyId: '',
};

const lobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IN_GAME:
            return {
                ...state,
                inGame: action.payload,
            };
        case ADD_PLAYER:
            return {
                ...state,
                players: [state.players, action.payload],
            };
        case REMOVE_PLAYER: {
            const toRemove = new Set().add(action.payload);
            const difference = state.cards.filter((x) => !toRemove.has(x));

            return {
                ...state,
                players: difference,
            };
        }
        case INCREMENT_ROUND:
            return {
                ...state,
                round: state.round + 1,
            };
        case SET_ROUND:
            return {
                ...state,
                round: action.payload,
            };
        case SET_LOBBY_ID:
            return {
                ...state,
                lobbyId: action.payload,
            };
        default:
            return state;
    }
};

export default lobbyReducer;
