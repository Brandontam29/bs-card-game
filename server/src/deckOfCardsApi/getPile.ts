import axios from 'axios';
import { HttpError } from '../errors/HttpError';
import { Card } from '../types';

export const getPile = async (
    deck_id: string,
    pile_name: string,
): Promise<Card[]> => {
    // const deck = deck_id.parse()
    // const pile = pile_name.parse()

    const deck = deck_id;
    const pile = pile_name.replaceAll('-', '_');

    const response = await axios
        .get(`https://deckofcardsapi.com/api/deck/${deck}/pile/${pile}/list/`)
        .then((res) => {
            const cardsArr = res.data.piles[pile_name].cards;
            return cardsArr;
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
