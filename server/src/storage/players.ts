import { Player } from '../types';

const players = new Map<string, Player>();

const newPlayer = (id: string, name: string, avatar: string) => {
    const user = { id, name, avatar };

    players.set(id, user);

    return user;
};

const getPlayer = (id: string) => {
    return players.get(id);
};

const deletePlayer = (id: string) => {
    players.delete(id);
};

export { newPlayer, getPlayer, deletePlayer };

module.exports = { newPlayer, getPlayer, deletePlayer };
