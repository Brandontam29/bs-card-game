const { splitCards } = require('../utils/splitCards.js');
const { compareCards } = require('../utils/compareCards.js');
const { rankPlayers } = require('../utils/rankPlayers.js');

const { cardsToPile } = require('../deckOfCardsApi/cardsToPile.js');
const { drawAllCards } = require('../deckOfCardsApi/drawAllCards.js');
const { getNewDeck } = require('../deckOfCardsApi/getNewDeck.js');
const { reshuffleDeck } = require('../deckOfCardsApi/reshuffleDeck.js');

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require('../storage/users.js');
const {
    newPileRecord,
    addRecord,
    getLastRecord,
    deletePileRecord,
} = require('../storage/stack.js');
const {
    newDeck,
    getDeckId,
    incrementTurn,
    setTurn,
    getTurn,
    incrementCardClock,
    getCardClock,
    getTurnCard,
    dumpDeck,
} = require('../storage/decks.js');
const { getTurnPlayerId } = require('../utils/getTurnPlayerId.js');

// Todo constant
/**
 * Implement taking only one callout (the fastest)
 * Implement individualized "Your callout was RIGHT"
 */

// Glossary (needs refactoring)
/**
 * centerPile: cards that are played face down
 * center_pile_records: history of the number of cards played each time
 * cardClock: counter that determines the turnCard
 * turnCard: card that needs to be played to the center_pile
 * turn: counter that determines the turn player
 * turnPlayer: player that needs to play a card
 * loser: the person who takes the cards after the callout
 * hand: cards of a player
 * ranks: players in order of least card when the game is finished
 */

// Naming Refactoring
/**
 * lobby vs code vs lobbyCode
 * center_pile => stack
 * center_pile_records => ???
 * cardClock => ???
 * turnCard =>???
 * turn => ???
 * turnPlayer => ???
 * loser => ???
 * ranks => ???
 */

// Structure Refactoring
/**
 * Differentiate API calls and util functions
 * Implement clear cache
 * Remove everything clumped into storage/deck
 * Rename /storage (to caching?)
 * Use hash map for efficiency
 * Inplement database for games played, results and analytics
 * Modularize even further
 */

const gameHandlers = (io, socket) => {
    const startGame = async (lobby) => {
        console.log('game:start');
        // Get new deck and distribute cards
        const getNewDeckResponse = await getNewDeck();
        console.log('game handler', getNewDeckResponse);
        const deck = newDeck(getNewDeckResponse.deck_id, lobby);
        const drawAllCardsResponse = await drawAllCards(deck_id);

        const players = getRoomUsers(lobby);
        const numOfPlayers = players.length;

        // Consider splitCards to return [[cards],[cards]] instead of {player1: [cards], player2: [cards]}
        // It was fun playing with objects
        const hands = splitCards(drawAllCardsResponse.cards, numOfPlayers);
        const handsArr = Object.values(hands);

        newPileRecord(lobby);
        for (i = 0; i < numOfPlayers; i++) {
            cardsToPile(deck.id, players[i].id, handsArr[i]);
            io.to(players[i].id).emit('get_hand', handsArr[i]);
        }

        // Get card clock
        const turnCard = getTurnCard(lobby);

        // Get turn player
        const turn = Math.floor(Math.random() * numOfPlayers);
        const turnPlayerId = getTurnPlayerId(players, turn);

        // Get center pile record

        io.in(lobby).emit('udpated_clock', turnCard);
        io.in(lobby).emit('udpated_turn', turnPlayerId);
        io.in(lobby).emit('started_game');
    };

    const getHand = (lobby) => {
        console.log('game:get_hand');
        const deckId = getDeckId(lobby);
        const currentHand = getPile(deckId, socket.id);

        io.to(socket.id).emit('get_hand', currentHand);
    };

    const playCard = (cards) => {
        console.log('game:play_card');
        // TODO add validation

        // Move the played cards
        const lobby = getCurrentUser(socket.id).id;
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

        // Increment card clock
        incrementCardClock();
        const turnCard = getTurnCard(lobby);

        // Determine next turn
        const players = getRoomUsers(lobby);
        incrementTurn();
        const turn = getTurn(lobby);
        const turnPlayerId = getTurnPlayerId(players, turn);

        // Responses
        io.to(socket.id).emit('get_hand', currentHand);
        io.in(lobby).emit('udpated_turn', turnPlayerId);
        io.in(lobby).emit('udpated_clock', turnCard);
    };

    const callout = (lobby) => {
        console.log('game:callout');
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

        // Increment card clock
        incrementCardClock();
        const turnCard = getTurnCard(lobby);

        // Responses

        io.in(lobby).emit('udpated_clock', turnCard);
        io.to(loserId).emit('get_hand', loserHand);
        io.in(lobby).emit('udpated_turn', loserId);
    };

    const restartGame = (lobby) => {
        console.log('game:restart');
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

module.exports = gameHandlers;
