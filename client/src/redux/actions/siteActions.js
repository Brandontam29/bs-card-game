export const SET_PANNEL_OPEN = 'SET_PANNEL_OPEN';
export const SET_PANNEL_CONTENT = 'SET_PANNEL_CONTENT';

export const setPannelOpen = (payload) => ({
    type: SET_PANNEL_OPEN,
    payload,
});

export const setPannelContent = (payload) => ({
    type: SET_PANNEL_CONTENT,
    payload,
});
