import axios from 'axios';
// import randomLobbyCode from '../util/lobbyCodeGenerator';
import HttpError from '../models/http-error';

const gameHandlers = (io, socket) => {
    const startGame = (lobby) => {
        axios
            .get({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
                // headers: { 'X-Requested-With': 'XMLHttpRequest' },
            })
            .then((response) => {
                const temp = response.data;
                const deck = {
                    success: temp.success,
                    deck_id: temp.deck_id,
                    remaining: temp.remaining,
                };

                io.to(lobby).emit('game_start', deck);
            })
            .catch((err) => {
                const error = new HttpError(err.messsage, 500);
                io.to(lobby).emit('error', error);
            });
    };

    const playCard = (io, data) => {};
    const callBS = (io, data) => {};
    const winGame = (io, data) => {};
    const restartGame = (io, data) => {};

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
