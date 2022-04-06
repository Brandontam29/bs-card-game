export const SET_SOCKET = 'SET_SOCKET';
export const SET_ERROR = 'SET_ERROR';
export const SET_PANNEL_OPEN = 'SET_PANNEL_OPEN';
export const SET_PANNEL_CONTENT = 'SET_PANNEL_CONTENT';

export const setSocket = (payload) => ({
    type: SET_SOCKET,
    payload,
});

export const setError = (payload) => ({
    type: SET_ERROR,
    payload,
});

export const setPannelOpen = (payload) => ({
    type: SET_PANNEL_OPEN,
    payload,
});

export const setPannelContent = (payload) => ({
    type: SET_PANNEL_CONTENT,
    payload,
});
