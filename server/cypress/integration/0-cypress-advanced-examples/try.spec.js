/// <reference types="cypress" />

import { cardsToPile } from '../../../deckOfCardsApi/cardsToPile.js';
import { drawAllCards } from '../../../deckOfCardsApi/drawAllCards.js';
import { getNewDeck } from '../../../deckOfCardsApi/getNewDeck.js';
import { getPile } from '../../../deckOfCardsApi/getPile.js';
import { reshuffleDeck } from '../../../deckOfCardsApi/reshuffleDeck.js';

describe('Test functions in the folder deckOfCardsApi', () => {
    beforeEach(() => {
        //   cy.visit('https://example.cypress.io/todo')
    });

    it('getNewDeck', () => {
        const response = getNewDeck();
        expect(response).to.have.property('success');
    });
    it('cardsToPile', () => {});

    it('drawAllCards', () => {});
});
