export const SET_NAME = 'SET_NAME';
export const SET_AVATAR = 'SET_AVATAR';
export const SET_CONNECTED = 'SET_CONNECTED';

export const setName = (payload) => ({
    type: SET_NAME,
    payload,
});

export const setAvatar = (payload) => ({
    type: SET_AVATAR,
    payload,
});

export const setConnected = (payload) => ({
    type: SET_CONNECTED,
    payload,
});
