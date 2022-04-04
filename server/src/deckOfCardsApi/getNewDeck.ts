import axios from 'axios';
import { HttpError } from '../errors/HttpError';

export const getNewDeck = async () => {
    const response = await axios
        .get(
            'https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=true',
        )
        .then((res) => {
            return res.data.deck_id;
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

// const exmaple_response = {
//     success: true,
//     deck_id: '29dj3x5w4nf1',
//     remaining: 54,
//     shuffled: true,
// };
