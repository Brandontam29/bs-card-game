/// <reference types="cypress" />

describe('One client from homepage to waiting room', () => {
    const name = 'Brandon Tam';
    const message = 'Hi how are you doing?';

    before(() => {});

    it('Visit Webpage', () => {
        cy.visit('/');

        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=create_lobby]').click();

        let lobbyCode;
        cy.get('[data-cy=lobbyCode]')
            .invoke('text')
            .then((text) => {
                cy.log(text);
                lobbyCode = text;
            });
        // .then(() => {
        // expect(lobbyCode).have.length(6);
        // });

        const name2 = 'Cypress_Bot';
        const message2 = 'I am the cypress bot';

        // Connect doesn't work yet
        cy.task('connect', { username: name2, room: lobbyCode });
        // cy.get('ul li').last('li').should('include.text', name2);

        // cy.get('[data-cy=message]').type(message);
        // cy.get('[data-cy=send_message]').click();

        // cy.task('sendMessage', message2);
        // cy.get('span').last().should('have.text', message2);
    });
});
