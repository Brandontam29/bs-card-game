/// <reference types="cypress" />
import '../../../src/index.css';
// import 'tailwindcss/dist/tailwind.min.css';

import { mount } from '@cypress/react';
import { HelmetProvider } from 'react-helmet-async';

import { Provider as ReduxProvider } from 'react-redux';

import Lobby from '../../../src/app/pages/lobby';

import configureStore from '../../../src/redux/store/configureStore';
import {
    setPlayers,
    setLobbyCode,
    setInGame,
    setMessages,
} from '../../../src/redux/actions/lobbyActions';
import { setAvatar, setConnected, setName } from '../../../src/redux/actions/playerActions';
import { setHand } from '../../../src/redux/actions/handActions';
import { setSocket } from '../../../src/redux/actions/siteActions';
import { setPlayerCardsLeft } from '../../../src/redux/actions/gameActions';

describe('Lobby component testing', () => {
    const store = configureStore();
    before(() => {
        store.dispatch(setLobbyCode('CODECY'));
        store.dispatch(setConnected(true));
        store.dispatch(setInGame(true));

        cy.fixture('bots.json').then((file) => {
            store.dispatch(setPlayers(file.players.slice(0, 6)));
            store.dispatch(setPlayerCardsLeft(file.playerCardsLeft));
        });

        cy.fixture('player.json').then((player) => {
            store.dispatch(setName(player.name));
            store.dispatch(setAvatar(player.avatar));
            store.dispatch(setHand(player.hand));
        });

        cy.fixture('socket.json').then((socket) => {
            store.dispatch(setSocket(socket));
        });

        cy.fixture('messages.json').then((file) => {
            store.dispatch(setMessages(file.messages));
        });
    });

    it('Normal Desktop Screen (1920 x 950)', () => {
        cy.viewport(1920, 950);
        mount(
            <HelmetProvider>
                <ReduxProvider store={store}>
                    <Lobby />
                </ReduxProvider>
            </HelmetProvider>,
        );
    });
});
