const formatMessage = require('../utils/formatMessage.js');
const { getCurrentUser } = require('../storage/users.js');

const messageHandlers = (io, socket) => {
    const sendMessage = (msg) => {
        console.log('message:send');
        const user = getCurrentUser(socket.id);

        io.in(user.lobby).emit('new_message', formatMessage(user.name, msg));
    };

    socket.on('message:send', sendMessage);
};

module.exports = messageHandlers;
