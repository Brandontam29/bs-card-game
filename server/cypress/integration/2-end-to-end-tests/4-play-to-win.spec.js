/// <reference types="cypress" />

describe('2 player plays one card at a time until they win', () => {
    const name = 'Brandon Tam';
    const message = 'Hi how are you doing?';

    const name2 = 'Cypress_Bot';
    const message2 = 'I am the cypress bot';

    it('Go to game room', () => {
        cy.visit('/');

        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=create_lobby]').click();

        let lobbyCode;

        cy.get('[data-cy=lobby_code]')
            .invoke('text')
            .then((text) => {
                cy.log(text);
                lobbyCode = text;
            });
        cy.wrap(null).then(() =>
            cy.task('connect', { username: name2, room: lobbyCode }),
        );

        cy.get('button[data-cy=start_game]').click();

        // Player plays one card
        cy.get('button > img[alt*="of"]').first().click();
        cy.get('button[data-cy=play_cards]').click();

        //Cypress plays one card
        cy.task('playCards');

        // Player plays one card
        cy.get('button > img[alt*="of"]').first().click();
        cy.get('button[data-cy=play_cards]').click();
    });
});
