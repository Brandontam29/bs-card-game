import lobbyCodeGenerator from '../util/lobbyCodeGenerator.js';
import formatMessage from '../util/formatMessage.js';
import { userJoin, userLeave, getRoomUsers } from '../storage/users.js';

const lobbyHandlers = (io, socket) => {
    const chatBot = 'Mr. BS';

    const createRoom = ({ name, avatar }) => {
        console.log('createRoom');
        const code = `${lobbyCodeGenerator()}`;
        console.log(code);
        userJoin(socket.id, name, avatar, code);
        console.log(getRoomUsers(code));
        socket.join(code);
        socket.emit('lobby_created', code);
        socket.emit('update_players', getRoomUsers(code));
    };

    const joinRoom = ({ name, avatar, lobby }) => {
        console.log('joinRoom');
        const user = userJoin(socket.id, name, avatar, lobby);
        socket.join(lobby);
        socket.emit(
            'receive_message',
            formatMessage(chatBot, 'Welcome to BS Card Game!'),
        );

        socket.broadcast
            .to(lobby)
            .emit(
                'receive_message',
                formatMessage(chatBot, `${user.name} has joined the chat`),
            );

        io.to(lobby).emit('update_players', getRoomUsers(user.lobby));
    };

    const disconnectRoom = () => {
        console.log('disconnectRoom');
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit(
                'receive_message',
                formatMessage(chatBot, `${user.username} has left the chat`),
            );

            // Send users and room info
            io.to(user.room).emit('update_players', getRoomUsers(user.room));
        }
    };

    socket.on('lobby:create', createRoom);
    socket.on('lobby:join', joinRoom);
    socket.on('lobby:disconnect', disconnectRoom);
};

export default lobbyHandlers;
