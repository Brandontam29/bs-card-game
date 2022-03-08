/// <reference types="cypress" />

import { getNewDeck } from '../../../deckOfCardsApi/getNewDeck.js';
import { drawAllCards } from '../../../deckOfCardsApi/drawAllCards.js';
import { cardsToPile } from '../../../deckOfCardsApi/cardsToPile.js';
import { getPile } from '../../../deckOfCardsApi/getPile.js';
import { reshuffleDeck } from '../../../deckOfCardsApi/reshuffleDeck.js';

describe('Test functions in the folder deckOfCardsApi', () => {
    const pileName = 'cypress_pile';
    const cards = [{ code: 'AC' }, { code: '3S' }, { code: 'KH' }];

    it('getNewDeck', () => {
        const response = getNewDeck();

        cy.wrap(response).should('have.property', 'success');
        cy.wrap(response).its('success').should('be.true');

        cy.wrap(response).should(
            'have.keys',
            'success',
            'shuffled',
            'deck_id',
            'remaining',
        );
        cy.wrap(response).its('shuffled').should('be.true');
        cy.wrap(response).its('remaining').should('eq', 54);
        cy.wrap(response).its('deck_id').should('to.be.a', 'string');
    });

    it('other apis', () => {
        let deckId;
        cy.request({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
        })
            .then((res) => {
                deckId = res.body.deck_id;
            })
            .then(() => {
                cy.log('drawAllCards');
                const response = drawAllCards(deckId);
                cy.wrap(response).should('have.property', 'success');
                cy.wrap(response).its('success').should('be.true');

                cy.log('cardsToPile');
                const ctpResponse = cardsToPile(deckId, pileName, cards);
                cy.wrap(ctpResponse).should('have.property', 'success');
                cy.wrap(ctpResponse).its('success').should('be.true');

                cy.log('getPile');
                const gpResponse = getPile(deckId, pileName);
                cy.wrap(gpResponse).should('to.exist');

                cy.log('rank players (na)');

                cy.log('reshuffleDeck');
                const rdResponse = reshuffleDeck(deckId);
                cy.wrap(rdResponse).should('have.property', 'success');
                cy.wrap(rdResponse).its('success').should('be.true');
            });
    });
});
