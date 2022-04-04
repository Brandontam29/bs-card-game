import { Player } from '../types';
import { getPile } from './getPile';

export const rankPlayers = async (deckId: string, players: Player[]) => {
    let rankedPlayers = [];

    for (let i = 0; i < players.length; i++) {
        const playerId = players[i].id;
        const cards = await getPile(deckId, playerId);
        rankedPlayers.push({
            name: players[i].name,
            remaining: cards.length,
        });
    }

    rankedPlayers.sort((a, b) => a.remaining - b.remaining);

    return rankedPlayers;
};
