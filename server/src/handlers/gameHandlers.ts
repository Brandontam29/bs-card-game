import { Server, Socket } from 'socket.io';

import { splitCards, compareCards } from '../utils';

import {
    cardsToPile,
    drawAllCards,
    getNewDeck,
    rankPlayers,
    reshuffleDeck,
    getPile,
} from '../deckOfCardsApi';

import * as game from '../storage';
import { Card } from '../types';
import { HttpError } from '../errors/HttpError';

export const gameHandlers = (io: Server, socket: Socket) => {
    const startGame = async () => {
        try {
            // Get new deck and distribute cards
            const lobby = game.lobby(socket.id);
            console.log('game:start', lobby);
            const deckId = await getNewDeck();
            game.deck(lobby, deckId);

            const cards = await drawAllCards(deckId);

            const players = game.players(lobby);
            const numOfPlayers = players.length;
            const hands = splitCards(cards, numOfPlayers);

            // send the player hands and prepare player cards left info
            for (let i = 0; i < numOfPlayers; i++) {
                await cardsToPile(deckId, players[i].id, hands[i]);
                game.updateRemaining(lobby, players[i].id, hands[i].length);

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
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);

                const lobby = game.lobby(socket.id);
                io.in(lobby).emit('error', err.message);
            }

            throw new HttpError('Server Error', 500);
        }
    };

    const playCard = async (cards: Card[]) => {
        try {
            console.log('game:play_card', cards);
            // Move the played cards
            const lobby = game.lobby(socket.id);
            const deckId = game.deck(lobby);

            // Move
            await cardsToPile(deckId, 'center_pile', cards);
            const hand = await getPile(deckId, socket.id);
            const cardsRemaining = hand.length;

            // Update cards left in hand, add history, increment clock
            game.play(lobby, socket.id, cardsRemaining, cards.length);

            const turnCard = game.turnCard(lobby);
            const turnPlayerId = game.turnPlayer(lobby);
            const remaining = game.remaining(lobby);

            // Responses
            io.to(socket.id).emit('get_hand', hand);
            io.in(lobby).emit('update_player_cards_left', remaining);

            io.in(lobby).emit('udpated_clock', turnCard);

            // Check if they won the game
            if (cardsRemaining === 0) {
                console.log('finished game');
                const players = game.players(lobby);
                const ranks = await rankPlayers(deckId, players);
                io.in(lobby).emit('finished_game', ranks);

                game.reset(lobby);
                return;
            }

            io.in(lobby).emit('udpated_turn', turnPlayerId);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);

                const lobby = game.lobby(socket.id);
                io.in(lobby).emit('error', err.message);
            }

            throw new HttpError('Error with Playing Cards', 500);
        }
    };

    const callout = async () => {
        console.log('game:callout');
        // Basic information needed
        const lobby = game.lobby(socket.id);
        const { deckId, prevClockCard, lastTurnHistory } = game.callout(lobby);

        // Find the cards played last turn
        const centerCards = await getPile(deckId, 'center_pile');
        const lastPlayedCards = game.lastHistoryCards(lobby, centerCards);

        // Find the card needed

        // Compare
        const right = compareCards(lastPlayedCards, prevClockCard);

        //Determine who is the loser
        let loserId = socket.id; // Assume caller is loser

        if (right) {
            // If caller was right
            loserId = lastTurnHistory;
        }

        // Loser gets the center pile
        await cardsToPile(deckId, loserId, centerCards);
        const loserHand = await getPile(deckId, loserId);

        // Determine next turn
        game.setTurnPlayer(lobby, loserId);

        // Increment card clock

        // Update cards left in hand
        game.updateRemaining(lobby, loserId, loserHand.length);
        const remaining = game.remaining(lobby);

        // Responses
        io.in(lobby).emit('udpated_turn', loserId);
        io.in(socket.id).emit('update_player_cards_left', remaining);
        io.to(loserId).emit('get_hand', loserHand);
    };

    const restartGame = async () => {
        console.log('game:restart');
        const lobby = game.lobby(socket.id);

        // add clock record and update player cards
        const deckId = game.deck(lobby);
        await reshuffleDeck(deckId);
        const drawAllCardsResponse = await drawAllCards(deckId);

        const players = game.players(lobby);
        const numOfPlayers = players.length;

        const hands = splitCards(drawAllCardsResponse.cards, numOfPlayers);
        const handsArr = Object.values(hands);

        for (let i = 0; i < numOfPlayers; i++) {
            await cardsToPile(deckId, players[i].id, handsArr[i]);
            io.to(players[i].id).emit('get_hand', handsArr[i]);
        }

        io.in(lobby).emit('started_game');
    };

    socket.on('game:start_game', startGame);
    socket.on('game:play_card', playCard);
    socket.off('game:callout', callout);
    socket.on('game:restart_game', restartGame);
};
