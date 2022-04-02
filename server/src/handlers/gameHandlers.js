const { splitCards } = require('../utils/splitCards.js');
const { compareCards } = require('../utils/compareCards.js');

const { cardsToPile } = require('../deckOfCardsApi/cardsToPile.js');
const { drawAllCards } = require('../deckOfCardsApi/drawAllCards.js');
const { getNewDeck } = require('../deckOfCardsApi/getNewDeck.js');
const { rankPlayers } = require('../deckOfCardsApi/rankPlayers.js');
const { reshuffleDeck } = require('../deckOfCardsApi/reshuffleDeck.js');
const { getPile } = require('../deckOfCardsApi/getPile.ts');

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
} = require('../storage/histories.js');
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

const {
    newPlayerCardsLeft,
    setPlayerCardsLeft,
    getPlayerCardsLeft,
    deletePlayerCardsLeft,
} = require('../storage/remainings.ts');

const { getTurnPlayerId } = require('../utils/getTurnPlayerId.js');

const gameHandlers = (io, socket) => {
    const startGame = async (lobby) => {
        console.log('game:start', lobby);
        // Get new deck and distribute cards
        const getNewDeckResponse = await getNewDeck();
        const deck = newDeck(getNewDeckResponse.deck_id, lobby);
        console.log('deck_id', deck.id);
        const drawAllCardsResponse = await drawAllCards(deck.id);

        const players = getRoomUsers(lobby);
        const numOfPlayers = players.length;

        // Consider splitCards to return [[cards],[cards]] instead of {player1: [cards], player2: [cards]}
        // It was fun playing with objects
        const hands = splitCards(drawAllCardsResponse.cards, numOfPlayers);
        const handsArr = Object.values(hands);

        newPileRecord(lobby);

        // send the player hands and prepare player cards left info
        let playerCardsLeft = {};
        for (let i = 0; i < numOfPlayers; i++) {
            await cardsToPile(deck.id, players[i].id, handsArr[i]);
            console.log(players[i].id);
            playerCardsLeft[players[i].id] = handsArr[i].length;
            io.to(players[i].id).emit('get_hand', handsArr[i]);
        }

        // Get card clock
        const turnCard = getTurnCard(lobby);

        // Get turn player
        const turn = 0; // for testing purposes
        // const turn = Math.floor(Math.random() * numOfPlayers);
        const turnPlayerId = getTurnPlayerId(players, turn);

        // Set player cards left
        console.log(playerCardsLeft);
        newPlayerCardsLeft(lobby, playerCardsLeft);

        io.in(lobby).emit('update_player_cards_left', playerCardsLeft);
        io.in(lobby).emit('udpated_clock', turnCard);
        io.in(lobby).emit('udpated_turn', turnPlayerId);
        io.in(lobby).emit('started_game');
    };

    const getHand = async (lobby) => {
        console.log('game:get_hand');
        const deckId = getDeckId(lobby);
        const currentHand = await getPile(deckId, socket.id);

        io.to(socket.id).emit('get_hand', currentHand);
    };

    const playCard = async (cards) => {
        console.log('game:play_card', cards);
        // TODO add validation

        // Move the played cards
        const lobby = getCurrentUser(socket.id).lobby;
        const deckId = await getDeckId(lobby);
        const toPileResponse = await cardsToPile(deckId, 'center_pile', cards);
        const currentHand = await getPile(deckId, socket.id);

        // Check if they won the game
        if (currentHand.length === 0) {
            console.log('finished game');
            const players = getRoomUsers();
            const ranks = rankPlayers(deckId, players);

            io.in(lobby).emit('finished_game', ranks);

            deletePileRecord(lobby);
            return;
        }
        // Update cards left in hand
        const playerCardsLeft = setPlayerCardsLeft(lobby, currentHand.length);
        console.log(currentHand.length);

        // Add number of cards placed to record
        addRecord(lobby, cards.length);

        // Increment card clock
        incrementCardClock(lobby);
        const turnCard = getTurnCard(lobby);

        // Determine next turn
        const players = getRoomUsers(lobby);
        incrementTurn(lobby);
        const turn = getTurn(lobby);
        const turnPlayerId = getTurnPlayerId(players, turn);

        // Responses
        io.to(socket.id).emit('get_hand', currentHand);
        io.in(lobby).emit('update_player_cards_left', playerCardsLeft);
        io.in(lobby).emit('udpated_turn', turnPlayerId);
        io.in(lobby).emit('udpated_clock', turnCard);
    };

    const callout = async () => {
        console.log('game:callout');
        // Basic information needed
        const lobby = getCurrentUser(socket.id).lobby;
        const deckId = getDeckId(lobby);

        // Find the cards played last turn
        const numberOfCardsPlayedLastTurn = getLastRecord(lobby);
        const centerPileCards = await getPile(deckId, 'center_pile');
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
        const cardsToPileResponse = await cardsToPile(
            deckId,
            loserId,
            centerPileCards,
        );
        const loserHand = await getPile(deckId, loserId);

        // Determine next turn
        const loserTurn = players.findIndex((player) => (player.id = loserId));
        setTurn(loserTurn);

        // Increment card clock
        incrementCardClock(lobby);
        const turnCard = getTurnCard(lobby);

        // Update cards left in hand
        const playerCardsLeft = setPlayerCardsLeft(lobby, loserHand.length);

        // Responses
        io.in(lobby).emit('udpated_clock', turnCard);
        io.in(lobby).emit('udpated_turn', loserId);
        io.in(socket.id).emit('update_player_cards_left', playerCardsLeft);
        io.to(loserId).emit('get_hand', loserHand);
    };

    const restartGame = async (lobby) => {
        // add clock record and update player cards
        console.log('game:restart');
        const deckId = getDeckId(lobby);
        const reshuffleResponse = await reshuffleDeck(deckId);
        const drawAllCardsResponse = await drawAllCards(deckId);

        const players = getRoomUsers(lobby);
        const numOfPlayers = players.length;

        // Consider splitCards to return [[cards],[cards]] instead of {player1: [cards], player2: [cards]}
        // It was fun playing with objects
        const hands = splitCards(drawAllCardsResponse.cards, numOfPlayers);
        const handsArr = Object.values(hands);

        newPileRecord(lobby);

        for (i = 0; i < numOfPlayers; i++) {
            await cardsToPile(deckId, players[i].id, handsArr[i]);
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
