/// <reference types="cypress" />

import { mount } from '@cypress/react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from '../../../src/redux/store/configureStore';
import CharacterCreation from '../../../src/app/sharedComponents/characterCreation/CharacterCreation';

describe('Character creation component', () => {
    it('Component stand-alone', () => {
        mount(
            <ReduxProvider store={configureStore()}>
                <CharacterCreation socket="none" />
            </ReduxProvider>,
        );
    });
});
