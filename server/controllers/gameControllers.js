const axios = require('axios');
const { randomLobbyCode } = require('../util/lobbyCodeGenerator');
const HttpError = require('../models/http-error');

module.exports = (io) => {
    const test = function (data) {
        console.log('test triggered');
        const socket = this;
        socket.emit('print', 'request has been received');
    };

    const createRoom = function (data) {
        const socket = this;
        const lobbyCode = randomLobbyCode();

        socket.join(lobbyCode);
        socket.emit('roomCreated', lobbyCode);
    };

    const joinRoom = function (data) {
        const socket = this;

        socket.join(data);
        socket.emit('joinedRoom');
        socket.to(data).emit('newPlayer');
    };

    const startGame = (io, data) => {};
    const playCard = (io, data) => {};
    const callBS = (io, data) => {};
    const winGame = (io, data) => {};
    const restartGame = (io, data) => {};

    const getNewDeck = async (req, res, next) => {
        console.log(req);
        axios
            .get({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
                // headers: { 'X-Requested-With': 'XMLHttpRequest' },
            })
            .then((response) => {
                const temp = response.data;
                let deck = {
                    success: temp.success,
                    deck_id: temp.deck_id,
                    remaining: temp.remaining,
                };

                res.json(JSON.stringify(deck));
            })
            .catch((err) => {
                const error = new HttpError(err.messsage, 500);
                return next(error);
            });
    };

    const dealCards = async (req, res, next) => {
        const deckId = req.body.data.deckId;
        axios
            .post(
                `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=54`,
            )
            .then((response) => {
                const temp = response.data;
                let deck = {
                    success: temp.success,
                    deckId: temp.deck_id,
                    remaining: temp.remaining,
                };

                res.json(JSON.stringify(deck));
            })
            .catch((err) => {
                const error = new HttpError(err.messsage, 500);
                return next(error);
            });
    };

    const reshuffleDeck = async (req, res, next) => {
        axios
            .post(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle`)
            .then((response) => {
                const temp = response.data;
                let deck = {
                    success: temp.success,
                    deckId: temp.deck_id,
                    remaining: temp.remaining,
                };

                res.json(JSON.stringify(deck));
            })
            .catch((err) => {
                const error = new HttpError(err.messsage, 500);
                return next(error);
            });
    };

    const createNewPile = async (req, res, next) => {
        res.json(JSON.stringify({ match }));
    };

    const addToPile = async (req, res, next) => {
        res.json(JSON.stringify({ match }));
    };

    const takePile = async (req, res, next) => {
        res.json(JSON.stringify({ match }));
    };

    return {
        test,
        createRoom,
        joinRoom,
        startGame,
        playCard,
        callBS,
        winGame,
        restartGame,
    };
};

// exports.test = test;
// exports.joinRoom = joinRoom;
// exports.startGame = startGame;
// exports.playCard = playCard;
// exports.callBS = callBS;
// exports.winGame = winGame;
// exports.restartGame = restartGame;
