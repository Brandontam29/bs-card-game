/// <reference types="cypress" />

import { mount } from '@cypress/react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from '../../../src/redux/store/configureStore';
import CharacterCreation from '../../../src/app/sharedComponents/characterCreation/CharacterCreation';

describe('Test functions in utils (/src/lib/utils)', () => {
    it('With players and a lobby code', () => {
        mount(
            <ReduxProvider store={configureStore()}>
                <CharacterCreation socket="none" />
            </ReduxProvider>,
        );

        // cy.get('ul').find('li').should('exist');
    });
});
