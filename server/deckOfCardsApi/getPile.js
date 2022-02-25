import axios from 'axios';
import HttpError from '../models/http-error.js';

export const getPile = async (deck_id, pile_name) => {
    const response = await axios
        .get(
            `https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/list/`,
        )
        .then((res) => {
            const cardsArr = res.data.piles[pile_name].cards;

            return cardsArr;
        })
        .catch((err) => {
            const error = new HttpError(err.messsage, 500);
            return error;
        });

    return response;
};

// const exampleResponse = {
//     success: true,
//     deck_id: 'ojfgzb2v6qdz',
//     remaining: 0,
//     piles: {
//         haha: { // name of the pile
//             remaining: 2,
//             cards: [
//                 {
//                     code: '2C',
//                     image: 'https://deckofcardsapi.com/static/img/2C.png',
//                     images: {
//                         svg: 'https://deckofcardsapi.com/static/img/2C.svg',
//                         png: 'https://deckofcardsapi.com/static/img/2C.png',
//                     },
//                     value: '2',
//                     suit: 'CLUBS',
//                 },
//                 {
//                     code: '3C',
//                     image: 'https://deckofcardsapi.com/static/img/3C.png',
//                     images: {
//                         svg: 'https://deckofcardsapi.com/static/img/3C.svg',
//                         png: 'https://deckofcardsapi.com/static/img/3C.png',
//                     },
//                     value: '3',
//                     suit: 'CLUBS',
//                 },
//             ],
//         },
//         center: { remaining: 4 },
//     },
// };
