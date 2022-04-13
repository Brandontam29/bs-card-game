import { Server, Socket } from 'socket.io';

import { formatMessage } from '../utils/formatMessage';

import * as game from '../storage';

export const messageHandlers = (io: Server, socket: Socket) => {
    const sendMessage = (msg: string) => {
        try {
            console.log('message:send');
            const player = game.player(socket.id);
            const lobby = game.lobby(socket.id);

            io.in(lobby).emit('new_message', formatMessage(player, msg));
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
        }
    };

    socket.on('message:send', sendMessage);
};
