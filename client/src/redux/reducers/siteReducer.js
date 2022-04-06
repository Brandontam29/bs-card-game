import { SET_SOCKET, SET_ERROR, SET_PANNEL_OPEN, SET_PANNEL_CONTENT } from '../actions/siteActions';

const initialState = {
    socket: null,
    error: null,
    pannelOpen: false,
    pannelContent: 'none',
};

const siteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return {
                ...state,
                socket: action.payload,
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        case SET_PANNEL_OPEN:
            return {
                ...state,
                pannelOpen: action.payload,
            };

        case SET_PANNEL_CONTENT:
            return {
                ...state,
                pannelContent: action.payload,
            };
        default:
            return state;
    }
};

export default siteReducer;
