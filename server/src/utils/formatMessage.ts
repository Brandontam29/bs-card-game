import { Message } from '../types';

const currentTime = () => {
    const today = new Date();
    return today.getHours() + ':' + today.getMinutes();
};

export const formatMessage = (author: string, text: string): Message => {
    return {
        author,
        text,
        time: currentTime(),
    };
};

module.exports = { formatMessage };
