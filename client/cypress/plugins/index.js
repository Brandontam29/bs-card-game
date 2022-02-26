// import MockedSocket from 'socket.io-mock';
const MockedSocket = require('socket.io-mock');
const injectDevServer = require('@cypress/react/plugins/react-scripts');

/// <reference types="cypress" />
// https://on.cypress.io/plugins-guide

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    if (config.testingType === 'component') {
        injectDevServer(on, config);
    }
    const socket = new MockedSocket();
    on('task', {
        connect({ username, room }) {
            console.log(
                `Cypress is connecting to socket server under name: ${username} to the room: ${room}`,
            );
            socket.socketClient
                .emit('joinRoom', { username, room })
                .then(() => {
                    console.log('joinRoom - success ');
                })
                .catch((err) => {
                    console.error(err);
                });
            return null;
        },
        sendMessage(msg) {
            console.log(`Cypress is sending: "${msg}"`);
            socket.socketClient
                .emit('chatMessage', msg)
                .then(() => {
                    console.log('joinRoom - success ');
                })
                .catch((err) => {
                    console.error(err);
                });
            return null;
        },
    });
    return config; // IMPORTANT to return a config
};
