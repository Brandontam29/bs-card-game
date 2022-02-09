/// <reference types="cypress" />

describe('End points of Deck Routes', () => {
    it('Create a deck', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:4000/api/deck/getNewDeck',
        }).should((response) => {
            expect(response.body).to.have.property('success');
            expect(response.body.success).to.eq(true);
        });
    });

    t('Create a deck', () => {
        cy.request({
            method: 'GET',
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
        }).should((response) => {
            expect(response.body).to.have.property('success');
            expect(response.body.success).to.eq(true);
        });
    });
});
