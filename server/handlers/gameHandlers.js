import { splitCards } from '../util/splitCards.js';
import { cardsToPile } from '../deckOfCardsApi/cardsToPile.js';
import { drawAllCards } from '../deckOfCardsApi/drawAllCards.js';
import { getNewDeck } from '../deckOfCardsApi/getNewDeck.js';
import { rankPlayers } from '../deckOfCardsApi/rankPlayers.js';
import { reshuffleDeck } from '../deckOfCardsApi/reshuffleDeck.js';
import {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} from '../storage/users.js';
import {
    newPileRecord,
    addRecord,
    getLastRecord,
    deletePileRecord,
} from '../storage/centerPiles.js';
import {
    newDeck,
    getDeckId,
    incrementTurn,
    getTurn,
    dumpDeck,
} from '../storage/decks.js';

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

        newPileRecord(lobby);
        for (i = 0; i < numOfPlayers; i++) {
            cardsToPile(deckId, players[i].id, handsArr[i]);
            io.to(players[i].id).emit('get_hand', handsArr[i]);
        }

        io.in(lobby).emit('started_game');
    };

    const getHand = (lobby) => {
        const deckId = getDeckId(lobby);
        const currentHand = getPile(deckId, socket.id);

        io.to(socket.id).emit('get_hand', currentHand);
    };

    const playCard = (lobby, cards) => {
        // Add validation

        const toPileResponse = cardsToPile(deckId, 'center_pile', cards);
        const deckId = getDeckId(lobby);

        const currentHand = getPile(deckId, socket.id);

        // Establish turn system
        incrementTurn(lobbyCode);
        io.to(socket.id).emit('get_hand', currentHand);
        io.to(socket.id).emit('finished_turn');

        io.in(lobbyCode).emit('started_turn');

        // Add number of cards placed to record
        addRecord(lobby, cards.length);

        // Check if they won the game
        if (currentHand.length === 0) {
            const players = getRoomUsers();
            const ranks = rankPlayers(deckId, players);

            io.in(lobby).emit('finished_game', ranks);

            deletePileRecord(lobby);
        }
    };

    const callout = () => {
        // check center pile
        // check card counter
        // compare
        // assign center pile to the right pile
        // Change turn
    };

    const restartGame = (lobby) => {
        const deckId = getDeckId(lobby);
        const reshuffleResponse = reshuffleDeck(deckId);
        const drawAllCardsResponse = drawAllCards(deckId);

        const players = getRoomUsers(lobby);
        const numOfPlayers = players.length;

        // Consider splitCards to return [[cards],[cards]] instead of {player1: [cards], player2: [cards]}
        // It was fun playing with objects
        const hands = splitCards(drawAllCardsResponse.cards, numOfPlayers);
        const handsArr = Object.values(hands);

        newPileRecord(lobby);

        for (i = 0; i < numOfPlayers; i++) {
            cardsToPile(deckId, players[i].id, handsArr[i]);
            io.to(players[i].id).emit('get_hand', handsArr[i]);
        }

        io.in(lobby).emit('started_game');
    };

    socket.on('game:start_game', startGame);
    socket.on('game:get_hand', getHand);
    socket.on('game:play_card', playCard);
    socket.on('game:callout', callout);
    socket.on('game:restart_game', restartGame);
};

export default gameHandlers;
