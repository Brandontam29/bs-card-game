describe('End points of Deck Routes', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('https://example.cypress.io/todo');
    });
    it('Create a deck', () => {
        cy.request({
            method: 'GET',
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
        })
            .then((response) => {
                expect(response).to.have.property('sucess');
            })
            .then((response) => {
                expect(response.success).to.eq(true);
            });
    });
});
