const lobbies = new Map<string, string>();

const newPlayerLobby = (playerId: string, lobby: string) => {
    lobbies.set(playerId, lobby);
};

const setPlayerLobby = (playerId: string, lobby: string) => {
    lobbies.set(playerId, lobby);
};

const getPlayerLobby = (playerId: string) => {
    return lobbies.get(playerId);
};

const deletePlayerLobby = (playerId: string) => {
    lobbies.delete(playerId);
};

export { newPlayerLobby, setPlayerLobby, getPlayerLobby, deletePlayerLobby };

module.exports = {
    newPlayerLobby,
    setPlayerLobby,
    getPlayerLobby,
    deletePlayerLobby,
};
