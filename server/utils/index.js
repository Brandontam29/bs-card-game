const { splitCards } = require('./splitCards.js');
const { compareCards } = require('./compareCards.js');
const { getTurnPlayerId } = require('./getTurnPlayerId.js');
const { lobbyCodeGenerator } = require('./lobbyCodeGenerator.js');
const { formatMessage } = require('./formatMessage.js');
const { convertClockToCard } = require('./convertClockToCard.js');

module.exports = {
    splitCards,
    compareCards,
    getTurnPlayerId,
    lobbyCodeGenerator,
    formatMessage,
    convertClockToCard,
};
