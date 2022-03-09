/// <reference types="cypress" />
import '../../../src/index.css';

import { mount } from '@cypress/react';
import { HelmetProvider } from 'react-helmet-async';

import { Provider as ReduxProvider } from 'react-redux';

import configureStore from '../../../src/redux/store/configureStore';

import Home from '../../../src/app/pages/home';

describe('Home component testing', () => {
    const store = configureStore();
    before(() => {});

    it('With players and a lobby code', () => {
        mount(
            <HelmetProvider>
                <ReduxProvider store={store}>
                    <Home socket="none" />
                </ReduxProvider>
            </HelmetProvider>,
        );
    });
});
