import axios from 'axios';
import { HttpError } from '../errors/HttpError';

export const reshuffleDeck = async (deck_id: string) => {
    const response = await axios
        .post(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle`)
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
//     success: true,
//     deck_id: 'ojfgzb2v6qdz',
//     remaining: 54,
//     shuffled: true,
// };
