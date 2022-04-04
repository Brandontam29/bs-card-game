import axios from 'axios';
import { HttpError } from '../errors/HttpError';
import { Card } from '../types';

export const cardsToPile = async (
    deck_id: string,
    pile_name: string,
    cards: Card[],
) => {
    let cardCodes = '';
    cards.forEach((card) => {
        cardCodes += `${card.code},`;
    });

    const pileName = pile_name.replaceAll('-', '_');
    const response = await axios
        .get(
            `https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pileName}/add/?cards=${cardCodes}`,
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            if (err instanceof Error) {
                console.error(err);
            }

            const error = new HttpError('API Error', 500);
            throw error;
        });

    return response;
};

// const exampleResponse = {
//     "success": true,
//     "deck_id": "3p40paa87x90",
//     "remaining": 12,
//     "piles": {
//         "discard": {
//             "remaining": 2
//         }
//     }
// }
