import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    INCREMENT_ROUND,
    SET_ROUND,
    SET_LOBBY_ID,
} from '../actions/gameActions';

const initialState = {
    players: [],
    round: 0,
    lobbyId: '',
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return {
                ...state,
                pannelOpen: action.payload,
            };
        case REMOVE_PLAYER:
            return {
                ...state,
                pannelContent: action.payload,
            };
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

export default gameReducer;
