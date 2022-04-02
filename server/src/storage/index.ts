import { CardsLeft, Player } from '../types';
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
import { newTurn, getTurn, incrementTurn, deleteTurn } from './turns';

import { getTurnPlayerId } from '../utils/getTurnPlayerId';
import { getNewDeck } from '../deckOfCardsApi/getNewDeck';

// const start = async (lobby: string) => {
//     const deckId = await getNewDeck();
//     newDeck(lobby, deckId);
// };

const initialize = (lobby: string) => {
    newRemaining(lobby);
    newClock(lobby);
    newHistory(lobby);
    newTurn(lobby);
    newDeck(lobby); //need to add
    newRoomPlayers(lobby); //need to add
};

const deck = (lobby: string, deckId?: string) => {
    if (deckId) {
        newDeck(lobby, deckId);
        return;
    }

    return getDeck(lobby);
};

const players = (lobby: string) => {
    const players = getRoomPlayers(lobby);

    if (players) {
        return players;
    }

    throw Error('No players in this lobby');
};

const addPlayer = (lobby: string, player: Player) => {
    addRoomPlayer(lobby, player);
    newPlayerLobby(lobby, player.id);
};

const removePlayer = (id: string) => {
    const lobby = getPlayerLobby(id);

    if (lobby) {
        removeRoomPlayer(lobby, id);
    }

    deletePlayerLobby(id);
};

const lobby = (id: string) => {
    return getPlayerLobby(id);
};

const player = (id: string): Player | undefined => {
    return getPlayer(id);
};

const remaining = (lobby: string, id?: string, remaining?: number) => {
    if (id && remaining) {
        setPlayerRemaining(lobby, id, remaining);
        return;
    }

    return getRemaining(lobby);
};

const turnCard = (lobby: string) => {
    return getClock(lobby);
};

const turnPlayer = (lobby: string) => {
    const turn = getTurn(lobby);
    const players = getRoomPlayers(lobby);

    if (players === undefined || turn === undefined) {
        return undefined;
    }

    return getTurnPlayerId(players, turn);
};

const reset = () => {};

export {
    initialize,
    addPlayer,
    removePlayer,
    player,
    deck,
    players,
    lobby,
    player as getPlayer,
    remaining,
    turnCard,
    turnPlayer,
};
