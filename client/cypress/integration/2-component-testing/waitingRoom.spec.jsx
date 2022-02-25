/// <reference types="cypress" />

import { mount } from '@cypress/react';
import { HelmetProvider } from 'react-helmet-async';

import { Provider as ReduxProvider, useDispatch } from 'react-redux';

import configureStore from '../../../src/redux/store/configureStore';
import { setPlayers, setLobbyCode } from '../../../src/redux/actions/lobbyActions';
import WaitingRoom from '../../../src/app/pages/lobby/waitingRoom/WaitingRoom';

// const dispatch = useDispatch();
describe('Test functions in utils (/src/lib/utils)', () => {
    const store = configureStore();
    before(() => {
        const players = [
            { id: '111111', name: 'Cypress_Bot', avatar: '111111', lobby: '111111' },
            { id: '222222', name: 'Cypress_Bot', avatar: '222222', lobby: '222222' },
            { id: '333333', name: 'Cypress_Bot', avatar: '333333', lobby: '333333' },
            { id: '444444', name: 'Cypress_Bot', avatar: '444444', lobby: '444444' },
        ];

        store.dispatch(setPlayers(players));
        store.dispatch(setLobbyCode('Cypress_Lobby'));
    });

    it('With players and a lobby code', () => {
        mount(
            <HelmetProvider>
                <ReduxProvider store={store}>
                    <WaitingRoom socket="none" />
                </ReduxProvider>
            </HelmetProvider>,
        );

        cy.get('ul').find('li').should('exist');
    });
});
