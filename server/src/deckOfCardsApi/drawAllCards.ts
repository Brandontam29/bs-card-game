import axios from 'axios';
import { HttpError } from '../errors/HttpError';

export const drawAllCards = async (deck_id: string) => {
    const response = await axios
        .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=54`)
        .then((res) => {
            return res.data.cards;
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

// const exmapleResponse = {
//     "success": true,
//     "cards": [
//         {
//             "image": "https://deckofcardsapi.com/static/img/KH.png",
//             "value": "KING",
//             "suit": "HEARTS",
//             "code": "KH"
//         },
//         {
//             "image": "https://deckofcardsapi.com/static/img/8C.png",
//             "value": "8",
//             "suit": "CLUBS",
//             "code": "8C"
//         }
//     ],
//     "deck_id":"3p40paa87x90",
//     "remaining": 50,
//     "error": "Not enough cards remaining to draw 54 additional"} MAYBE THIS LINE
// }
