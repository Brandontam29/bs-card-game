import { Message, Player } from '../types';
import ShortUniqueId from 'short-unique-id';
const currentTime = () => {
    const today = new Date();
    return today.getHours() + ':' + today.getMinutes();
};

export const formatMessage = (
    player: Player | 'system',
    text: string,
): Message => {
    const uid = new ShortUniqueId({ length: 10 });

    return {
        //@ts-ignore typescript stupid sometimes
        id: player.id || 'system', //@ts-ignore
        author: player.name || 'system',
        text,
        time: currentTime(),
        key: uid(),
    };
};

module.exports = { formatMessage };
