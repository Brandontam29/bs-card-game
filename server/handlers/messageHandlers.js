import formatMessage from '../util/formatMessage.js';
import { getCurrentUser } from '../storage/users.js';

const messageHandlers = (io, socket) => {
    const sendMessage = (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(data.room).emit('receive_message', formatMessage(user.name, msg));
    };

    socket.on('message:send', sendMessage);
};

export default messageHandlers;
