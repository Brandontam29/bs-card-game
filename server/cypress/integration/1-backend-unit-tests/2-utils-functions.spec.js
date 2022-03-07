const {
    compareCards,
    convertClockToCard,
    formatMessage,
    getTurnPlayerId,
    lobbyCodeGenerator,
    rankPlayers,
    splitCards,
} = require('../../../utils/index.js');

describe('All util functions', () => {
    before(() => {});

    it('compareCards', () => {});
    it('convertClockToCard', () => {});
    it('formatMessage', () => {});
    it('getTurnPlayerId', () => {});
    it('lobbyCodeGenerator', () => {
        const code = lobbyCodeGenerator();
        cy.expect(code).to.be.a('string');
        cy.expect(code).to.be.length(6);
    });
    it('rankPlayers', () => {
        // rankPlayers
    });
    it('splitCards', () => {});
});
