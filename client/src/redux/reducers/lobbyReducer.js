import {
    SET_IN_GAME,
    SET_PLAYERS,
    INCREMENT_ROUND,
    SET_ROUND,
    SET_LOBBY_CODE,
    ADD_MESSAGE,
    SET_MESSAGES,
} from '../actions/lobbyActions';

const initialState = {
    inGame: false,
    players: [],
    round: 0,
    lobbyCode: null,
    messages: [],
};

const lobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IN_GAME:
            return {
                ...state,
                inGame: action.payload,
            };
        case SET_PLAYERS:
            return {
                ...state,
                players: [state.players, action.payload],
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
        case SET_LOBBY_CODE:
            return {
                ...state,
                lobbyCode: action.payload,
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        default:
            return state;
    }
};

export default lobbyReducer;
