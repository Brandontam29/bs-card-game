const { getPile } = require('../deckOfCardsApi/getPile.js');

const rankPlayers = (deckId, players) => {
    let rankedPlayers = [];

    for (let i = 0; i < players.length; i++) {
        const playerId = players[i].id;
        const cards = getPile(deckId, playerId);
        rankedPlayers.push({
            name: players[i].name,
            remaining: cards.length,
        });
    }

    rankedPlayers.sort((a, b) => a.remaining - b.remaining);

    return rankedPlayers;
};

module.exports = { rankPlayers };
