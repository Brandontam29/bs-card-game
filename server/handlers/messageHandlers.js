import formatMessage from '../utils/formatMessage.js';
import { getCurrentUser } from '../storage/users.js';

const messageHandlers = (io, socket) => {
    const sendMessage = (msg) => {
        console.log('message:send');
        const user = getCurrentUser(socket.id);

        io.in(user.lobby).emit('new_message', formatMessage(user.name, msg));
    };

    socket.on('message:send', sendMessage);
};

export default messageHandlers;
