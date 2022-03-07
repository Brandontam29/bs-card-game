/// <reference types="cypress" />

const MockedSocket = require('socket.io-mock');
const io = require('socket.io-client');

// eslint-disable-next-line no-unused-vars
const plugins = (on, config) => {
    let socket;
    on('task', {
        connect({ username, room }) {
            const avatar = '111111';
            // socket = new MockedSocket('http://localhost:4000', {
            //     transports: ['websocket'],
            // });
            socket = io('http://localhost:4000', {
                transports: ['websocket'],
            });

            console.log(
                `Cypress is connecting to socket server under name: ${username} to the room: ${room}`,
            );
            // socket.socketClient.emit('lobby:join', { username, room });
            socket.emit('lobby:join', username, avatar, room);
            return null;
        },
        sendMessage(msg) {
            console.log(`Cypress is sending: "${msg}"`);
            // socket.socketClient.emit('message:send', msg);
            socket.emit('message:send', msg);

            return null;
        },
    });
    return config; // IMPORTANT to return a config
};

module.exports = plugins;
