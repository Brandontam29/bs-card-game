/// <reference types="cypress" />

describe('One client from homepage to waiting room', () => {
    const name = 'Brandon Tam';
    const message = 'Hi how are you doing?';

    before(() => {});

    it('Visit Webpage', () => {
        cy.visit('/');

        cy.get('[data-cy=create_lobby]').should('exist');
        cy.get('[data-cy=join_lobby').should('exist');
    });

    it('Create Lobby', () => {
        cy.visit('/');

        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=create_lobby]').click();

        cy.url().should('include', 'lobby/');
        cy.get('[data-cy=lobbyCode]').invoke('text').should('have.length', 6);
        cy.get('ul li').last('li').should('include.text', name);
    });

    it('Send message', () => {
        cy.visit('/');

        cy.get('[data-cy=name').type(name);
        cy.get('[data-cy=create_lobby]').click();

        cy.get('[data-cy=message]').type(message);
        cy.get('[data-cy=send_message]').click();

        cy.get('div span').last('span').should('exist');
    });
});
