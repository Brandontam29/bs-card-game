import { splitCards } from '../utils/splitCards';
const { compareCards } = require('../utils/compareCards.js');

const { cardsToPile } = require('../deckOfCardsApi/cardsToPile.js');
const { drawAllCards } = require('../deckOfCardsApi/drawAllCards.js');
const { getNewDeck } = require('../deckOfCardsApi/getNewDeck.js');
const { rankPlayers } = require('../deckOfCardsApi/rankPlayers.js');
const { reshuffleDeck } = require('../deckOfCardsApi/reshuffleDeck.js');
const { getPile } = require('../deckOfCardsApi/getPile.ts');

import { Socket } from 'socket.io';
import * as game from '../storage';
import { Card } from '../types';

const { getTurnPlayerId } = require('../utils/getTurnPlayerId.js');

const gameHandlers = (io: Socket, socket: Socket) => {
    const startGame = async (lobby: string) => {
        try {
            console.log('game:start', lobby);

            // Get new deck and distribute cards
            const deckId = await getNewDeck();
            game.deck(lobby, deckId);

            const cards = await drawAllCards(deckId);

            const players = game.players(lobby);

            const numOfPlayers = players.length;
            const hands = splitCards(cards, numOfPlayers);
            if (hands === undefined) {
                return;
            }

            // send the player hands and prepare player cards left info
            for (let i = 0; i < numOfPlayers; i++) {
                await cardsToPile(deckId, players[i].id, hands[i]);
                game.remaining(lobby, players[i].id, hands[i].length);

                io.to(players[i].id).emit('get_hand', hands[i]);
            }

            // Get card clock
            const turnCard = game.turnCard(lobby);
            if (turnCard === undefined) {
                return;
            }

            const turnPlayer = game.turnPlayer(lobby);

            if (turnPlayer === undefined) {
                return;
            }

            io.in(lobby).emit(
                'update_player_cards_left',
                game.remaining(lobby),
            );
            io.in(lobby).emit('udpated_clock', turnCard);
            io.in(lobby).emit('udpated_turn', turnPlayer);
            io.in(lobby).emit('started_game');
        } catch (error) {
            io.in(lobby).emit('error', error.message);
            throw error;
        }
    };

    const playCard = async (cards: Card[]) => {
        console.log('game:play_card', cards);
        // TODO add validation

        // Move the played cards
        const lobby = game.lobby(socket.id);
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
    socket.on('game:play_card', playCard);
    socket.on('game:callout', callout);
    socket.on('game:restart_game', restartGame);
};

module.exports = gameHandlers;
