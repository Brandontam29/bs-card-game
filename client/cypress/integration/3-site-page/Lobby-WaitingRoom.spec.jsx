/// <reference types="cypress" />
import '../../../src/index.css';
// import 'tailwindcss/dist/tailwind.min.css';

import { mount } from '@cypress/react';
import { HelmetProvider } from 'react-helmet-async';

import { Provider as ReduxProvider } from 'react-redux';

import Lobby from '../../../src/app/pages/lobby';

import configureStore from '../../../src/redux/store/configureStore';
import { setPlayers, setLobbyCode, setMessages } from '../../../src/redux/actions/lobbyActions';
import { setConnected } from '../../../src/redux/actions/playerActions';

describe('Lobby component testing', () => {
    const store = configureStore();
    before(() => {
        store.dispatch(setLobbyCode('Cypress_Lobby'));
        store.dispatch(setConnected(true));

        cy.fixture('bots.json').then((file) => {
            store.dispatch(setPlayers(file.players));
        });

        cy.fixture('messages.json').then((file) => {
            store.dispatch(setMessages(file.messages));
        });
    });

    it('With players and a lobby code', () => {
        mount(
            <HelmetProvider>
                <ReduxProvider store={store}>
                    <Lobby socket="none" />
                </ReduxProvider>
            </HelmetProvider>,
        );

        cy.get('ul').find('li').should('exist');
    });
});
