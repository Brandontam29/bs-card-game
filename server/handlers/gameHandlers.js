import axios from 'axios';
// import randomLobbyCode from '../util/lobbyCodeGenerator';
import HttpError from '../models/http-error.js';
import { splitCards } from '../util/splitCards.js';
import {
    getNewDeck,
    drawAllCards,
    handToPile,
} from '../deckOfCardsApi/handToPile.js';
import { newDeck, getDeckByLobby, dumpDeck } from '../storage/decks.js';
const gameHandlers = (io, socket) => {
    const startGame = (lobby) => {
        const getNewDeckResponse = getNewDeck();
        const deck = newDeck(getNewDeckResponse.deck_id, lobby);
        const drawAllCardsResponse = drawAllCards(deck.id);

        const players = getRoomUsers(lobby);
        const numOfPlayers = players.length;

        // Consider splitCards to return [[cards],[cards]] instead of {player1: [cards], player2: [cards]}
        // It was fun playing with objects
        const hands = splitCards(drawAllCardsResponse.cards, numOfPlayers);
        const handsArr = Object.values(hands);

        for (i = 0; i < numOfPlayers; i++) {
            handToPile(deckId, players[i].id, handsArr[i]);
            io.to(players[i].id).emit('receive_cards', handsArr[i]);
        }

        io.in(lobby).emit('started_game');
    };

    const getHand = (lobby) => {
        const deckId = getDeckByLobby(lobby).id;
        const currentHand = getPile(deckId, socket.id);

        io.to(socket.id).emit('receive_cards', currentHand);
    };

    const playCard = () => {};
    const callBS = () => {};
    const winGame = () => {};
    const restartGame = () => {};

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
    socket.on('game:get_hand', getHand);
    socket.on('game:play_card', playCard);
    socket.on('game:call_bs', callBS);
    socket.on('game:win_game', winGame);
    socket.on('game:restart_game', restartGame);
};

export default gameHandlers;
