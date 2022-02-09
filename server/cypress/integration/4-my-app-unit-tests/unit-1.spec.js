/// <reference types="cypress" />

describe('End points of Deck Routes', () => {
    it('Create a deck', () => {
        cy.request({
            method: 'GET',
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
        }).should((response) => {
            expect(response).to.have.property('success');
            expect(response.success).to.eq(true);
        });
    });
});
