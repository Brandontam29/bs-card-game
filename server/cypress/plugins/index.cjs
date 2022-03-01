/// <reference types="cypress" />
const io = require('socket.io-client');

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    let socket;

    // on('task', {
    //     connect({ username, room }) {
    //         socket = io('http://localhost:3000');
    //         console.log(
    //             `Cypress is connecting to socket server under name: ${username} to the room: ${room}`,
    //         );
    //         socket.socketClient
    //             .emit('joinRoom', { username, room })
    //             .then(() => {
    //                 console.log('joinRoom - success ');
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //         return null;
    //     },
    //     sendMessage(msg) {
    //         console.log(`Cypress is sending: "${msg}"`);
    //         socket.socketClient
    //             .emit('chatMessage', msg)
    //             .then(() => {
    //                 console.log('joinRoom - success ');
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //         return null;
    //     },
    // });
    return config; // IMPORTANT to return a config
};
