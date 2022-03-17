import { SET_NAME, SET_AVATAR, SET_CONNECTED } from '../actions/playerActions';

const initialState = {
    name: '',
    avatar: Math.floor(Math.random() * 10 ** 6).toString(),
    connected: false,
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case SET_AVATAR:
            return {
                ...state,
                avatar: action.payload,
            };
        case SET_CONNECTED:
            return {
                ...state,
                connected: action.payload,
            };
        default:
            return state;
    }
};

export default playerReducer;
