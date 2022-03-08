const {
    compareCards,
    convertClockToCard,
    formatMessage,
    getTurnPlayerId,
    lobbyCodeGenerator,
    splitCards,
} = require('../../../utils/index.js');

describe('All util functions', () => {
    before(() => {});

    it('compareCards', () => {
        cy.fixtures('deck.json').then((deck) => {
            cy.expect(compareCards(deck.cards, 'JOKER')).to.be.true;
            cy.expect(compareCards(deck.cards, 'DNE')).to.be.false;
        });
    });

    it('convertClockToCard', () => {
        cy.expect(convertClockToCard(0)).to.be.eq('ACE');
        cy.expect(convertClockToCard(10)).to.be.eq('JACK');
        cy.expect(convertClockToCard(11)).to.be.eq('QUEEN');
        cy.expect(convertClockToCard(12)).to.be.eq('KING');
        cy.expect(convertClockToCard(13)).to.be.eq('ACE');
        cy.expect(convertClockToCard(99)).to.be.eq('9');
    });

    it('formatMessage', () => {
        const message = formatMessage(
            'Cypress Bot',
            'This is the message of Cypress Bot',
        );
        cy.expect(message).to.have.all.keys('name', 'text', 'time');
        cy.expect(message.name).to.equal('Cypress Bot');
        cy.expect(message.text).to.equal('THis is the message of Cypress Bot');
        cy.expect(message.time).to.be.a('string');
        cy.expect(message.time).to.include(':');
    });

    it('getTurnPlayerId', () => {
        cy.fixture('players.json').then((players) => {
            cy.expect(getTurnPlayerId(players.players, 0)).to.equal(
                players.players[0].id,
            );

            cy.expect(getTurnPlayerId(players.players, 6)).to.equal(
                players.players[2].id,
            );
        });
    });

    it('lobbyCodeGenerator', () => {
        const code = lobbyCodeGenerator();
        cy.expect(code).to.be.a('string');
        cy.expect(code).to.be.length(6);
    });

    it('splitCards', () => {
        cy.fixture('deck.json').then((deck) => {
            const splitCards2 = splitCards(deck.cards, 2);
            const splitCards3 = splitCards(deck.cards, 3);
            const splitCards4 = splitCards(deck.cards, 4);
            const splitCards5 = splitCards(deck.cards, 5);
            const splitCards6 = splitCards(deck.cards, 6);

            cy.expect(splitCards2).to.have.all.keys('player1', 'player2');
            cy.expect(splitCards2.player1).to.have.length(27);
            cy.expect(splitCards2.player2).to.have.length(27);

            cy.expect(splitCards3).to.have.all.keys(
                'player1',
                'player2',
                'player3',
            );

            cy.expect(splitCards4).to.have.all.keys(
                'player1',
                'player2',
                'player3',
                'player4',
            );
            cy.expect(splitCards4.player1).to.have.length(14);
            cy.expect(splitCards5).to.have.all.keys(
                'player1',
                'player2',
                'player3',
                'player4',
                'player5',
            );

            cy.expect(splitCards6).to.have.all.keys(
                'player1',
                'player2',
                'player3',
                'player4',
                'player5',
                'player6',
            );

            cy.expect(splitCards6.player1).to.have.length(9);
            cy.expect(splitCards6.player6).to.have.length(9);
        });
    });
});
