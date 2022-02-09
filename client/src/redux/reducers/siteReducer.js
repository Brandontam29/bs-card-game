import { SET_PANNEL_OPEN, SET_PANNEL_CONTENT } from '../actions/siteActions';

const initialState = {
    pannelOpen: false,
    pannelContent: 'none',
};

const siteReducer = (state = initialState, action) => {
    switch (action.type) {
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
