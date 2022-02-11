import { SET_NAME, SET_CONNECTED } from '../actions/playerActions';

const initialState = {
    name: '',
    // avatar: '010101',
    connected: false,
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
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
