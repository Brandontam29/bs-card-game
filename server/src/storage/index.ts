import { Card, CardsLeft, Player } from '../types';
import {
    newRemaining,
    setPlayerRemaining,
    getRemaining,
    deleteRemaining,
} from './remainings';
import { newClock, getClock, incrementClock, deleteClock } from './clocks';
import { newDeck, setDeck, getDeck, deleteDeck } from './decks';
import {
    newHistory,
    addHistory,
    getLastHistory,
    deleteHistory,
} from './histories';
import {
    newPlayerLobby,
    setPlayerLobby,
    getPlayerLobby,
    deletePlayerLobby,
} from './playerLobbies';
import { newPlayer, getPlayer, deletePlayer } from './players';
import {
    newRoomPlayers,
    getRoomPlayers,
    addRoomPlayer,
    removeRoomPlayer,
    setRoomPlayers,
    deleteRoom,
} from './roomPlayers';
import { newTurn, getTurn, incrementTurn, deleteTurn, setTurn } from './turns';
import {
    newTurnHistory,
    getTurnHistory,
    addTurnHistory,
    deleteTurnHistory,
} from './turnHistories';
import { getTurnPlayerId } from '../utils/getTurnPlayerId';
import { compareCards, convertClockToCard } from '../utils';

export const initialize = (lobby: string) => {
    newRemaining(lobby);
    newClock(lobby);
    newHistory(lobby);
    newTurn(lobby);
    newTurnHistory(lobby);
    newDeck(lobby); //need to add
    newRoomPlayers(lobby); //need to add
};

export const deck = (lobby: string, id?: string) => {
    if (id) {
        newDeck(lobby, id);
    }

    const deckId = getDeck(lobby);

    if (deckId === undefined) {
        throw Error('No players in this lobby');
    }

    return deckId;
};

export const players = (lobby: string) => {
    const players = getRoomPlayers(lobby);

    if (players) {
        return players;
    }

    throw Error('No players in this lobby');
};

export const addPlayer = (lobby: string, player: Player) => {
    addRoomPlayer(lobby, player);
    newPlayerLobby(player.id, lobby);
};

export const removePlayer = (id: string) => {
    const lobby = getPlayerLobby(id);

    if (lobby) {
        removeRoomPlayer(lobby, id);
    }

    deletePlayerLobby(id);
};

export const lobby = (id: string) => {
    const lobby = getPlayerLobby(id);

    if (lobby === undefined) {
        throw Error('lobby');
    }

    return lobby;
};

export const player = (id: string) => {
    const player = getPlayer(id);

    if (player === undefined) {
        throw Error('Problem');
    }

    return player;
};

export const remaining = (lobby: string) => {
    const cardsLeft = getRemaining(lobby);

    if (cardsLeft == undefined) {
        throw Error;
    }
    return cardsLeft;
};

export const updateRemaining = (
    lobby: string,
    id: string,
    remaining: number,
) => {
    setPlayerRemaining(lobby, id, remaining);
};

export const turnCard = (lobby: string) => {
    const card = getClock(lobby);

    if (card === undefined) {
        throw Error;
    }

    return convertClockToCard(card);
};

export const turnPlayer = (lobby: string) => {
    const turn = getTurn(lobby);
    const players = getRoomPlayers(lobby);

    if (players === undefined || turn === undefined) {
        throw Error('Problem');
    }

    return getTurnPlayerId(players, turn);
};

export const setTurnPlayer = (lobby: string, id: string) => {
    const players = getRoomPlayers(lobby);

    if (players === undefined) {
        throw Error('Problem');
    }
    const turnIndex = players.findIndex((player) => player.id === id);

    if (turnIndex === -1) {
        throw Error('Problem');
    }

    setTurn(lobby, turnIndex);
};
export const lastHistoryCards = (lobby: string, cards: Card[]) => {
    const lastHistory = getLastHistory(lobby);

    if (lastHistory === undefined) {
        throw Error();
    }

    const lastHistoryCards = cards.slice(
        cards.length - lastHistory,
        cards.length,
    );

    return lastHistoryCards;
};

export const callout = (lobby: string) => {
    const deckId = getDeck(lobby);
    const lastHistory = getLastHistory(lobby);
    const clock = getClock(lobby);
    const turnHistory = getTurnHistory(lobby);
    const players = getRoomPlayers(lobby);

    if (
        deckId === undefined ||
        lastHistory === undefined ||
        turnHistory === undefined ||
        players == undefined ||
        clock === undefined
    ) {
        throw Error;
    }

    const response = {
        deckId,
        lastHistory,
        players,
        prevClockCard: convertClockToCard(clock - 1),
        lastTurnHistory: turnHistory[turnHistory.length - 1],
    };

    return response;
};

export const play = (
    lobby: string,
    id: string,
    remaining: number,
    history: number,
) => {
    setPlayerRemaining(lobby, id, remaining);
    addHistory(lobby, history);
    incrementClock(lobby);
};

export const lastHistory = (lobby: string) => {
    const lastHistory = getLastHistory(lobby);
    if (lastHistory === undefined) {
        throw Error;
    }
    return lastHistory;
};

export const reset = (lobby: string) => {
    newRemaining(lobby);
    newClock(lobby);
    newHistory(lobby);
    newTurn(lobby);
    newDeck(lobby); //need to add
    newRoomPlayers(lobby); //need to add
};
