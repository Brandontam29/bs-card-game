import { splitCards } from '../util/splitCards.js';
import { cardsToPile } from '../deckOfCardsApi/cardsToPile.js';
import { drawAllCards } from '../deckOfCardsApi/drawAllCards.js';
import { getNewDeck } from '../deckOfCardsApi/getNewDeck.js';
import { rankPlayers } from '../deckOfCardsApi/rankPlayers.js';
import { reshuffleDeck } from '../deckOfCardsApi/reshuffleDeck.js';
import { getTurnCard } from '../deckOfCardsApi/getTurnCard.js';
import { compareCards } from '../deckOfCardsApi/compareCards.js';
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
    setTurn,
    getTurn,
    dumpDeck,
} from '../storage/decks.js';
import { getTurnPlayerId } from '../util/getTurnPlayerId.js';

const gameHandlers = (io, socket) => {
    const startGame = (lobby) => {
        const getNewDeckResponse = getNewDeck();
        const deck = newDeck(getNewDeckResponse.deck_id, lobby);
        const drawAllCardsResponse = drawAllCards(deck_id);

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
        // TODO add validation

        // Move the played cards
        const toPileResponse = cardsToPile(deckId, 'center_pile', cards);
        const deckId = getDeckId(lobby);
        const currentHand = getPile(deckId, socket.id);

        // Check if they won the game
        if (currentHand.length === 0) {
            const players = getRoomUsers();
            const ranks = rankPlayers(deckId, players);

            io.in(lobby).emit('finished_game', ranks);

            deletePileRecord(lobby);
            return;
        }
        // Add number of cards placed to record
        addRecord(lobby, cards.length);

        // Determine next turn
        const players = getRoomUsers(lobby);
        incrementTurn();
        const turn = getTurn(lobby);
        const turnPlayerId = getTurnPlayerId(players, turn);

        // Responses
        io.to(socket.id).emit('get_hand', currentHand);
        io.in(lobby).emit('udpated_turn', turnPlayerId);
    };

    const callout = (lobby) => {
        // Basic information needed
        const deckId = getDeckId(lobby);

        // Find the cards played last turn
        const numberOfCardsPlayedLastTurn = getLastRecord(lobby);
        const centerPileCards = getPile(deckId, 'center_pile');
        const lastPlayedCards = centerPileCards.slice(
            centerPileCards.length - numberOfCardsPlayedLastTurn,
            centerPileCards.length,
        );
        // Find the card needed
        const lastTurn = getTurn(lobby) - 1;
        const lastTurnRightCard = getTurnCard(lastTurn);

        // Compare
        const right = compareCards(lastPlayedCards, lastTurnRightCard);

        //Determine who is the loser
        const players = getRoomUsers(lobby);

        let loserId = socket.id; // Assume caller is loser

        if (!right) {
            // Unless the revealed cards are wrong
            loserId = getTurnPlayerId(players, lastTurn);
        }

        // Loser gets the center pile
        const cardsToPileResponse = cardsToPile(
            deckId,
            loserId,
            centerPileCards,
        );
        const loserHand = getPile(deckId, loserId);

        // Determine next turn
        const loserTurn = players.findIndex((player) => (player.id = loserId));
        setTurn(loserTurn);

        // Responses
        io.to(loserId).emit('get_hand', loserHand);
        io.in(lobby).emit('udpated_turn', loserId);
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
