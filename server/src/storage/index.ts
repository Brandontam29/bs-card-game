import { CardsLeft, Player } from '../types';
import {
    newCardsLeft,
    setCardsLeft,
    getCardsLeft,
    deleteCardsLeft,
} from './cardsLeft';
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

const initialize = (lobby: string) => {
    newCardsLeft(lobby);
    newClock(lobby);
    newDeck(lobby);
    newHistory(lobby);
    newRoomPlayers(lobby);
    newTurn(lobby);
};

const addPlayer = (lobby: string, player: Player) => {
    addRoomPlayer(lobby, player);
    newPlayerLobby(lobby, player.id);
};

const removePlayer = (lobby: string, id: string) => {
    removeRoomPlayer(lobby, id);
    deletePlayerLobby(id);
};

const roomPlayers = (lobby: string) => {
    return getRoomPlayers(lobby);
};

const reset = () => {};
export { initialize, addPlayer, removePlayer, roomPlayers };
