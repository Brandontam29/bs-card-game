/// <reference types="cypress" />

import {
    newCardsLeft,
    setCardsLeft,
    getCardsLeft,
    deleteCardsLeft,
} from '../../../src/storage/cardsLeft';

import {
    newClock,
    getClock,
    incrementClock,
    deleteClock,
} from '../../../src/storage/clocks';
import {
    newDeck,
    setDeck,
    getDeck,
    deleteDeck,
} from '../../../src/storage/decks';

import {
    newHistory,
    addHistory,
    getLastHistory,
    deleteHistory,
} from '../../../src/storage/histories';

import {
    newPlayerLobby,
    setPlayerLobby,
    getPlayerLobby,
    deletePlayerLobby,
} from '../../../src/storage/playerLobbies';

// import {
//     newPlayer,
//     getPlayer,
//     deletePlayer,
// } from '../../../src/storage/players';

import {
    newRoomPlayers,
    getRoomPlayers,
    addRoomPlayer,
    setRoomPlayers,
    deleteRoom,
    removeRoomPlayer,
} from '../../../src/storage/roomPlayers';

import {
    newTurn,
    getTurn,
    incrementTurn,
    deleteTurn,
} from '../../../src/storage/turns';

describe('All util functions', () => {
    const lobby = 'cypress_test';
    it('cardsLeft', () => {
        const cardsLeft = { id1: 10, id2: 0 };
        newCardsLeft(lobby);

        expect(getCardsLeft(lobby)).to.eql({});

        setCardsLeft(lobby, cardsLeft);
        expect(getCardsLeft(lobby)).to.eql(cardsLeft);

        deleteCardsLeft(lobby);

        expect(getCardsLeft(lobby)).to.eql(undefined);
    });

    it('clock', () => {
        newClock(lobby);
        expect(getClock(lobby)).to.eql('ACE');

        incrementClock(lobby);
        expect(getClock(lobby)).to.eql('2');

        deleteClock(lobby);
        expect(getClock(lobby)).to.eql(undefined);
    });

    it('deck', () => {
        newDeck(lobby);
        expect(getDeck(lobby)).to.eql(null);

        setDeck(lobby, 'deck_id');
        expect(getDeck(lobby)).to.eql('deck_id');

        deleteDeck(lobby);
        expect(getDeck(lobby)).to.eql(undefined);
    });

    it('history', () => {
        newHistory(lobby);
        expect(getLastHistory(lobby)).to.eql(undefined);

        addHistory(lobby, 4);
        addHistory(lobby, 1);
        expect(getLastHistory(lobby)).to.eql(1);

        addHistory(lobby, 2);
        expect(getLastHistory(lobby)).to.eql(2);

        deleteHistory(lobby);
        expect(getLastHistory(lobby)).to.eql(undefined);
    });
    it('player lobby', () => {
        const id = 'player_id';
        const lobby2 = 'cypress_2';

        newPlayerLobby(id, lobby);

        expect(getPlayerLobby(id)).to.eql(lobby);

        setPlayerLobby(id, lobby2);
        expect(getPlayerLobby(id)).to.eql(lobby2);

        deletePlayerLobby(id);
        expect(getPlayerLobby(id)).to.eql(undefined);
    });

    // it('player', () => {
    //     newPlayer(lobby);
    //     getPlayer(lobby);
    //     deletePlayer(lobby);
    // });

    it('room players', () => {
        let bot1;
        let bot2;
        let bots;

        //not working for some reason...
        cy.fixture('bots').then(function (bots) {
            console.log(bots);
            bot1 = bots.bot1;
            bot2 = bots.bot2;
            bots = [bot1, bot2];
        });

        newRoomPlayers(lobby);
        expect(getRoomPlayers(lobby)).to.eql([]);

        addRoomPlayer(lobby, bot1);
        expect(getRoomPlayers(lobby)).to.eql([bot1]);

        setRoomPlayers(lobby, bots);
        expect(getRoomPlayers(lobby)).to.eql(bots);

        removeRoomPlayer(lobby, bot1.id);

        expect(getRoomPlayers(lobby)).to.have.length(1);

        deleteRoom(lobby);
        expect(getRoomPlayers(lobby)).to.eql(undefined);
    });

    it('turn ', () => {
        newTurn(lobby);

        expect(getTurn(lobby)).to.eql(0);

        incrementTurn(lobby);
        expect(getTurn(lobby)).to.eql(1);

        deleteTurn(lobby);
        expect(getTurn(lobby)).to.eql(undefined);
    });
});
