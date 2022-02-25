import axios from 'axios';
import HttpError from '../models/http-error.js';

export const cardsToPile = async (deck_id, pile_name, cards) => {
    let cardCodes = '';
    cards.forEach((card) => {
        cardCodes += `${card.code},`;
    });

    const response = await axios
        .get(
            `https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/add/?cards=${cardCodes}`,
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const error = new HttpError(err.messsage, 500);
            return error;
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
