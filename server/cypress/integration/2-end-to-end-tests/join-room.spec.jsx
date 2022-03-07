/// <reference types="cypress" />

describe('One client from homepage to waiting room', () => {
    const name = 'Cypress_Bot';
    const lobby = 'XXX';
    const message = 'I am the cypress bot';

    before(() => {});

    it('Join a room that is already created', () => {
        cy.visit('/');

        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=lobby_code]').type(lobby);
        cy.get('[data-cy=join_lobby]').click();

        cy.get('[data-cy=lobbyCode]').invoke('text').should('have.length', 3);

        cy.get('[data-cy=message]').type(message);
        cy.get('[data-cy=send_message]').click();

        cy.get('div span').last('span').should('include.text', message);

        // Connect doesn't work yet
        // cy.task('connect', { username: name2, room: lobbyCode });

        // cy.get('[data-cy=message]').type(message);
        // cy.get('[data-cy=send_message]').click();

        // cy.task('sendMessage', message2);
        // cy.get('span').last().should('have.text', message2);
    });
});
