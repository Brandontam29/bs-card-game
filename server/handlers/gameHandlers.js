const axios = require('axios');
const { randomLobbyCode } = require('../util/lobbyCodeGenerator');
const HttpError = require('../models/http-error');

const gameHandlers = (io, socket) => {
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
    socket.on('game:start_game', startGame);
    socket.on('game:play_card', playCard);
    socket.on('game:call_bs', callBS);
    socket.on('game:win_game', winGame);
    socket.on('game:restart_game', restartGame);
};

export default gameHandlers;
