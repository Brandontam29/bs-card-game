/// <reference types="cypress" />

import { mount } from '@cypress/react';
import { HelmetProvider } from 'react-helmet-async';

import { Provider as ReduxProvider } from 'react-redux';

import configureStore from '../../../src/redux/store/configureStore';
import { setPlayers, setLobbyCode } from '../../../src/redux/actions/lobbyActions';
import WaitingRoom from '../../../src/app/pages/lobby/waitingRoom/WaitingRoom';

// const dispatch = useDispatch();
describe('Waiting room page with random players', () => {
    const store = configureStore();
    before(() => {
        const players = [
            { id: '111111', name: 'Cypress_Bot', avatar: '111111', lobby: 'ABCDEF' },
            { id: '222222', name: 'Cypress_Bot', avatar: '222222', lobby: 'ABCDEF' },
            { id: '333333', name: 'Cypress_Bot', avatar: '333333', lobby: 'ABCDEF' },
            { id: '444444', name: 'Cypress_Bot', avatar: '444444', lobby: 'ABCDEF' },
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
