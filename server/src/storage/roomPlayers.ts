import { waitForDebugger } from 'inspector';
import { Player } from '../types';

const rooms = new Map<string, Player[]>();

const newRoomPlayers = (lobby: string, players?: Player[]) => {
    if (players) {
        rooms.set(lobby, players);
        return;
    }

    rooms.set(lobby, []);
};

const setRoomPlayers = (lobby: string, players: Player[]) => {
    rooms.set(lobby, players);
};

const getRoomPlayers = (lobby: string): Player[] | undefined => {
    return rooms.get(lobby);
};

const addRoomPlayer = (lobby: string, user: Player) => {
    const room = rooms.get(lobby);

    if (room === undefined) {
        rooms.set(lobby, []);
        return;
    }

    room.push(user);
};

const removeRoomPlayer = (lobby: string, id: string) => {
    const room = rooms.get(lobby);

    if (room === undefined) {
        return;
    }

    const newRoom = room.filter((player: Player) => player.id !== id);
    rooms.set(lobby, newRoom);
};

const deleteRoom = (lobby: string) => {
    rooms.delete(lobby);
};

export {
    newRoomPlayers,
    setRoomPlayers,
    getRoomPlayers,
    addRoomPlayer,
    removeRoomPlayer,
    deleteRoom,
};

module.exports = {
    newRoomPlayers,
    setRoomPlayers,
    getRoomPlayers,
    addRoomPlayer,
    deleteRoom,
};
