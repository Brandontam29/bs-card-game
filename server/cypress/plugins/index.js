/// <reference types="cypress" />

const io = require('socket.io-client');

const plugins = (on, config) => {
    let socket;
    on('task', {
        connect({ username, room }) {
            const avatar = '111111';

            socket = io('http://localhost:4000', {
                transports: ['websocket'],
            });

            console.log(
                `Cypress is connecting to socket server under name: ${username} to the room: ${room}`,
            );
            socket.emit('lobby:join', username, avatar, room);
            return null;
        },

        sendMessage(msg) {
            console.log(`Cypress is sending: "${msg}"`);
            socket.emit('message:send', msg);

            return null;
        },
    });
    return config; // IMPORTANT to return a config
};

module.exports = plugins;
