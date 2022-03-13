/// <reference types="cypress" />

const io = require('socket.io-client');

const plugins = (on, config) => {
    let socket;
    let hand = [];
    on('task', {
        //Socket event emitters
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

        playCards(cards = hand[0]) {
            console.log(`Cypress is playing some cards`);
            socket.emit('game:play_card', cards);

            return null;
        },

        callout() {
            console.log(`Cypress is making a callout`);
            socket.emit('game:callout');

            return null;
        },
    });

    //  Socket listenners
    if (socket !== undefined) {
        socket.on('get_hand', (cards) => {
            console.log('Cypress get_hand', cards);
            hand = cards;
        });
    }

    return config; // IMPORTANT to return a config
};

module.exports = plugins;
