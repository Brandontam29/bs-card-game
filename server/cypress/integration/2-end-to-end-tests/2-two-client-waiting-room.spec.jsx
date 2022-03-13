/// <reference types="cypress" />

describe('Emulate two client events', () => {
    const name = 'Brandon Tam';
    const message = 'Hi how are you doing?';

    const name2 = 'Cypress_Bot';
    const message2 = 'I am the cypress bot';

    before(() => {});

    it('Client and Cypress in Waiting Room', () => {
        cy.visit('/');

        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=create_lobby]').click();

        let lobbyCode;
        cy.url().should('include', 'lobby/');
        cy.wrap(null).then(() =>
            cy
                .get('[data-cy=lobby_code]')
                .invoke('text')
                .then((text) => {
                    lobbyCode = text;
                    expect(text).have.length(6);
                }),
        );

        cy.wrap(null).then(() =>
            cy.task('connect', { username: name2, room: lobbyCode }),
        );

        cy.wrap(null).then(() => cy.task('sendMessage', message2));

        cy.get('ul[data-cy=players] li').last().should('include.text', name2);

        cy.get('ul[data-cy=messages] li')
            .last()
            .should('include.text', message2);
    });
});
