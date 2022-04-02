const { lobbyCodeGenerator } = require('../utils/lobbyCodeGenerator.js');
const { formatMessage } = require('../utils/formatMessage.js');
import { newPlayer, deletePlayer } from '../storage/players';
import { Player } from '../types';
import * as game from '../storage';
import { Socket } from 'socket.io';

const lobbyHandlers = (io: Socket, socket: Socket) => {
    const botName = 'Game';
    // Standard event emitter for creating and joining lobby
    const emit = (lobby: string, player: Player, players: Player[]) => {
        socket.join(lobby);
        io.in(lobby).emit('update_players', players);
        io.in(lobby).emit(
            'new_message',
            formatMessage(botName, `${player.name} has joined the chat`),
        );
        socket.emit('created_lobby', lobby);
    };

    const createLobby = (
        name: string,
        avatar: string,
        lobby: string | null = null,
    ) => {
        const lobbyCode = lobby ? lobby : lobbyCodeGenerator();
        const player = newPlayer(socket.id, name, avatar);

        game.initialize(lobbyCode);
        game.addPlayer(lobbyCode, player);
        const roomPlayers = game.roomPlayers(lobbyCode);

        emit(lobbyCode, player, roomPlayers);
    };

    const joinLobby = (name: string, avatar: string, lobby: string) => {
        const player = newPlayer(socket.id, name, avatar);

        game.addPlayer(lobby, player);
        const roomPlayers = game.roomPlayers(lobby);

        emit(lobby, player, roomPlayers);
    };

    const disconnectLobby = () => {
        const lobby = game.getLobby(socket.id);
        const player = game.getPlayer(socket.id);

        if (lobby) {
            const players = game.roomPlayers(lobby);
            io.in(lobby).emit('update_players', players);
        }

        if (player && lobby) {
            io.in(lobby).emit(
                'new_message',
                formatMessage(botName, `${player.name} has left the chat`),
            );
        }

        game.removePlayer(socket.id);
    };

    socket.on('lobby:create', createLobby);
    socket.on('lobby:join', joinLobby);
    socket.on('lobby:disconnect', disconnectLobby);
};

module.exports = lobbyHandlers;
